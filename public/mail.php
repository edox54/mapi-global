<?php
// Receptor del formulario de contacto. Vive en la raíz del hosting (cPanel,
// sin Node) porque el sitio es un export estático — esta es la única pieza
// con lógica de servidor.

header('Content-Type: application/json; charset=utf-8');

$origenesPermitidos = ['https://mapiglobal.us', 'https://www.mapiglobal.us'];
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origen, $origenesPermitidos, true)) {
    header("Access-Control-Allow-Origin: $origen");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function responder($ok, $mensaje, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode(['ok' => $ok, 'mensaje' => $mensaje]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido.', 405);
}

// Honeypot: campo oculto que un humano nunca completa.
if (!empty($_POST['sitio_web'] ?? '')) {
    responder(true, 'Consulta enviada.'); // spam: fingimos éxito, no enviamos nada
}

$nombre = trim($_POST['nombre'] ?? '');
$empresa = trim($_POST['empresa'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $correo === '' || $mensaje === '') {
    responder(false, 'Faltan campos obligatorios.', 422);
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'Correo inválido.', 422);
}

// Evitar inyección de encabezados vía saltos de línea en campos de una sola línea.
$limpiar = fn($s) => str_replace(["\r", "\n"], '', $s);
$nombre = $limpiar($nombre);
$empresa = $limpiar($empresa);
$correo = $limpiar($correo);

$destino = 'contacto@mapiglobal.us';
$asunto = 'Nueva consulta desde mapiglobal.us';
$cuerpo = "Nombre: $nombre\n" .
    "Empresa: " . ($empresa !== '' ? $empresa : '—') . "\n" .
    "Correo: $correo\n\n" .
    "Mensaje:\n$mensaje\n";

$cabeceras = "From: MAPI GLOBAL <no-responder@mapiglobal.us>\r\n" .
    "Reply-To: $nombre <$correo>\r\n" .
    "Content-Type: text/plain; charset=UTF-8";

$enviado = mail($destino, $asunto, $cuerpo, $cabeceras);

if ($enviado) {
    responder(true, 'Consulta enviada correctamente.');
} else {
    responder(false, 'No se pudo enviar. Intenta nuevamente o escribe directamente a ' . $destino . '.', 500);
}
