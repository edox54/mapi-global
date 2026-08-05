'use client';

import { useState } from 'react';

export default function Formulario() {
  const [estado, setEstado] = useState('inicial'); // inicial | enviando | ok | error
  const [error, setError] = useState('');

  async function enviar(e) {
    e.preventDefault();
    setEstado('enviando');
    setError('');

    const datos = new FormData(e.target);

    try {
      const res = await fetch('/mail.php', { method: 'POST', body: datos });
      const json = await res.json();
      if (json.ok) {
        setEstado('ok');
        e.target.reset();
      } else {
        setEstado('error');
        setError(json.mensaje || 'No se pudo enviar la consulta.');
      }
    } catch {
      setEstado('error');
      setError('No se pudo conectar con el servidor. Intenta nuevamente.');
    }
  }

  return (
    <form className="form" noValidate={false} onSubmit={enviar}>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" autoComplete="name" required maxLength={120} />
      </div>
      <div className="campo">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" name="empresa" type="text" autoComplete="organization" maxLength={120} />
      </div>
      <div className="campo">
        <label htmlFor="correo">Correo</label>
        <input id="correo" name="correo" type="email" autoComplete="email" required maxLength={160} />
      </div>
      <div className="campo">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" required maxLength={2000} />
      </div>

      {/* Honeypot anti-spam: oculto para personas, los bots suelen completarlo. */}
      <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

      <div>
        <button type="submit" className="btn" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
        </button>
      </div>

      <p className="form__nota">
        Los campos marcados son obligatorios. La información se utiliza únicamente para dar respuesta a
        la consulta.
      </p>

      {estado === 'ok' && (
        <p className="form__aviso" role="status">
          Consulta enviada correctamente. Te responderemos a la brevedad.
        </p>
      )}
      {estado === 'error' && (
        <p className="form__aviso" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
