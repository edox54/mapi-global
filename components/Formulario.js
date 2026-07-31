'use client';

import { useState } from 'react';

// ponytail: solo UI — no hay envío. Conectar aquí un endpoint o servicio de formularios cuando exista.
export default function Formulario() {
  const [enviado, setEnviado] = useState(false);

  return (
    <form
      className="form"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
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

      <div>
        <button type="submit" className="btn">Enviar consulta</button>
      </div>

      <p className="form__nota">
        Los campos marcados son obligatorios. La información se utiliza únicamente para dar respuesta a
        la consulta.
      </p>

      {enviado && (
        <p className="form__aviso" role="status">
          Formulario de demostración: el envío no está conectado a ningún destinatario.
        </p>
      )}
    </form>
  );
}
