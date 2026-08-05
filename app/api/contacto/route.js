import nodemailer from 'nodemailer';

// Credenciales SMTP del propio hosting — se configuran como variables de
// entorno en cPanel (Setup Node.js App → Environment variables), nunca en
// el código.
function crearTransportador() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function POST(request) {
  const datos = await request.formData();

  // Honeypot: campo oculto que un humano nunca completa.
  if ((datos.get('sitio_web') || '').toString().trim() !== '') {
    return Response.json({ ok: true, mensaje: 'Consulta enviada.' });
  }

  const nombre = (datos.get('nombre') || '').toString().trim();
  const empresa = (datos.get('empresa') || '').toString().trim();
  const correo = (datos.get('correo') || '').toString().trim();
  const mensaje = (datos.get('mensaje') || '').toString().trim();

  if (!nombre || !correo || !mensaje) {
    return Response.json({ ok: false, mensaje: 'Faltan campos obligatorios.' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return Response.json({ ok: false, mensaje: 'Correo inválido.' }, { status: 422 });
  }

  const destino = process.env.MAIL_TO || 'contacto@mapiglobal.us';

  try {
    await crearTransportador().sendMail({
      from: `MAPI GLOBAL <${process.env.SMTP_USER}>`,
      to: destino,
      replyTo: `${nombre} <${correo}>`,
      subject: 'Nueva consulta desde mapiglobal.us',
      text: `Nombre: ${nombre}\nEmpresa: ${empresa || '—'}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}\n`,
    });
    return Response.json({ ok: true, mensaje: 'Consulta enviada correctamente.' });
  } catch (err) {
    console.error('Error enviando correo de contacto:', err);
    return Response.json(
      { ok: false, mensaje: `No se pudo enviar. Intenta nuevamente o escribe directamente a ${destino}.` },
      { status: 500 }
    );
  }
}
