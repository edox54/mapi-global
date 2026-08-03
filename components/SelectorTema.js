'use client';

import { useEffect, useState } from 'react';

// ponytail: herramienta temporal de aprobación de cliente — borrar este archivo
// y su <script>/<SelectorTema /> en app/layout.js cuando el cliente elija paleta final.
const TEMAS = [
  { id: 'cobre', nombre: 'Cobre / Ámbar (sugerida)', muestra: '#c9702f' },
  { id: 'esmeralda', nombre: 'Verde esmeralda', muestra: '#1f7a5c' },
  { id: 'dorado', nombre: 'Dorado (original)', muestra: '#c6a15b' },
  { id: 'acero', nombre: 'Azul acero', muestra: '#4d6f9a' },
  { id: 'plata', nombre: 'Plateado / Gris', muestra: '#93a1af' },
  { id: 'grafito', nombre: 'Grafito monocromo', muestra: '#5a6472' },
];

const CLAVE = 'mapi-tema';
const DEFECTO = 'cobre';

export default function SelectorTema() {
  const [abierto, setAbierto] = useState(false);
  const [tema, setTema] = useState(DEFECTO);

  useEffect(() => {
    setTema(document.documentElement.getAttribute('data-tema') || DEFECTO);
  }, []);

  const elegir = (id) => {
    setTema(id);
    document.documentElement.setAttribute('data-tema', id);
    window.localStorage.setItem(CLAVE, id);
    window.dispatchEvent(new Event('temacambio'));
  };

  return (
    <div className={`selector-tema ${abierto ? 'is-abierto' : ''}`}>
      {abierto && (
        <div className="selector-tema__panel">
          <p className="selector-tema__titulo">Vista previa de paleta</p>
          <p className="selector-tema__nota">Herramienta temporal para aprobación del cliente.</p>
          <ul>
            {TEMAS.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => elegir(t.id)}
                  className={tema === t.id ? 'is-activo' : ''}
                >
                  <span style={{ background: t.muestra }} />
                  {t.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="selector-tema__toggle"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label="Cambiar paleta de colores"
      >
        <span style={{ background: TEMAS.find((t) => t.id === tema)?.muestra }} />
      </button>
    </div>
  );
}
