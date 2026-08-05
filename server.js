// Servidor de producción para Passenger (cPanel "Setup Node.js App").
// Sirve el export estático de `out/` con Express y atiende el formulario
// de contacto directamente aquí — nunca se levanta el runtime de Next.js
// (next start / next()), que en este hosting revienta con
// "WebAssembly.instantiate(): Out of memory" (undici/fetch bajo Passenger).
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const outDir = path.join(__dirname, 'out');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function crearTransportador() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

app.post('/api/contacto', async (req, res) => {
  const datos = req.body || {};

  // Honeypot: campo oculto que un humano nunca completa.
  if ((datos.sitio_web || '').toString().trim() !== '') {
    return res.json({ ok: true, mensaje: 'Consulta enviada.' });
  }

  const nombre = (datos.nombre || '').toString().trim();
  const empresa = (datos.empresa || '').toString().trim();
  const correo = (datos.correo || '').toString().trim();
  const mensaje = (datos.mensaje || '').toString().trim();

  if (!nombre || !correo || !mensaje) {
    return res.status(422).json({ ok: false, mensaje: 'Faltan campos obligatorios.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return res.status(422).json({ ok: false, mensaje: 'Correo inválido.' });
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
    res.json({ ok: true, mensaje: 'Consulta enviada correctamente.' });
  } catch (err) {
    console.error('Error enviando correo de contacto:', err);
    res.status(500).json({ ok: false, mensaje: `No se pudo enviar. Intenta nuevamente o escribe directamente a ${destino}.` });
  }
});

app.use('/_next', express.static(path.join(outDir, '_next'), { maxAge: '1y', immutable: true }));
app.use(express.static(outDir, { index: false, redirect: false, maxAge: '1h' }));

// Next export con trailingSlash:true genera /ruta/index.html — se resuelve
// a mano para que /ruta (sin barra) también sirva ese archivo.
app.use((req, res) => {
  const pathname = req.path.replace(/\/$/, '') || '/';

  const dirIndex = path.join(outDir, pathname, 'index.html');
  if (fs.existsSync(dirIndex)) return res.sendFile(dirIndex);

  const exact = path.join(outDir, pathname + '.html');
  if (fs.existsSync(exact)) return res.sendFile(exact);

  const notFound = path.join(outDir, '404.html');
  if (fs.existsSync(notFound)) return res.status(404).sendFile(notFound);

  res.status(404).send('Not Found');
});

app.listen(Number(PORT), () => {
  console.log(`Listo en el puerto ${PORT}`);
});
