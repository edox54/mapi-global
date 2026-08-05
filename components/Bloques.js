'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { IconAerea, IconTerrestre, IconMaritima, iconos } from './Icons';
import { Reveal, LineaEntrada, useZoomLento } from './anim';

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

export function Cabecera({ eyebrow, titulo, texto }) {
  return (
    <header className="cabecera">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1>{titulo}</h1>
      {texto && <p className="cabecera__texto">{texto}</p>}
    </header>
  );
}

// Insignia "espacio para foto" — deja explícito que el fondo gris es un
// placeholder a reemplazar por fotografía real, no una pieza terminada.
export function InsigniaPlaceholder({ texto = 'Imagen pendiente' }) {
  return (
    <span className="ph-badge">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="14" rx="2" />
        <circle cx="12" cy="12.5" r="3.4" />
        <path d="M7.5 5.5l1.3-2h6.4l1.3 2" />
      </svg>
      {texto}
    </span>
  );
}

// Marco de imagen: zoom al pasar el cursor + insignia de placeholder.
// La clase "img-parallax" queda marcada para que simpleParallax la tome.
// zoom=true suma un Ken Burns continuo (GSAP) para las imágenes destacadas.
// zoom y simpleParallax animan el mismo transform del <img>: si zoom está
// activo, la imagen queda fuera del selector .img-parallax para que no compitan.
export function Medio({ src, alt = '', proporcion, posicion, className = '', placeholder = false, etiqueta, zoom = false, children }) {
  const imgRef = useRef(null);
  useZoomLento(imgRef, zoom);
  return (
    <figure className={`medio ${className}`} style={proporcion ? { aspectRatio: proporcion } : undefined}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" className={zoom ? '' : 'img-parallax'} style={posicion ? { objectPosition: posicion } : undefined} />
      <span className="medio__velo" aria-hidden="true" />
      {placeholder && <InsigniaPlaceholder texto={etiqueta} />}
      {children}
    </figure>
  );
}

export function Divisiones({ items, cta = false, columnas = 3 }) {
  return (
    <div className={`divisiones ${columnas === 4 ? 'divisiones--4' : ''}`}>
      {items.map((s, i) => {
        const Icono = iconos[s.slug];
        return (
          <Reveal key={s.slug} delay={i * 0.09} y={54}>
            <Link href={`/servicios/${s.slug}`} className="division">
              <div className="division__medio">
                <img src={s.imagen} alt="" loading="lazy" className="img-parallax" style={s.posicion ? { objectPosition: s.posicion } : undefined} />
                <span className="division__velo" aria-hidden="true" />
                <Icono className="division__icono" />
              </div>
              <div className="division__cuerpo">
                <h3>{s.titulo}</h3>
                <p>{s.resumen}</p>
                <span className="division__mas">Ver división</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
      {cta && (
        <Reveal delay={items.length * 0.09} y={54}>
          <Link href="/contacto" className="division division--cta">
            <div className="division__cuerpo">
              <h3>Solicitar información</h3>
              <p>Consultas sobre el alcance operativo de cualquiera de las divisiones del holding.</p>
              <span className="division__mas">Contactar</span>
            </div>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

export function CTA({ titulo = 'Solicitar información', texto, boton = 'Contactar' }) {
  return (
    <section className="cta">
      <div className="cta__fondo" aria-hidden="true" />
      <div className="contenedor cta__inner">
        <Reveal>
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/contacto" className="btn btn--acento">{boton}</Link>
        </Reveal>
      </div>
    </section>
  );
}

const rutas = [
  { Icono: IconAerea, titulo: 'Ruta Aérea', texto: 'Velocidad y alcance internacional. Carga de alto valor y plazos críticos.' },
  { Icono: IconTerrestre, titulo: 'Ruta Terrestre', texto: 'Capacidad de distribución de primera y última milla, con flota y ruta controlada.' },
  { Icono: IconMaritima, titulo: 'Ruta Marítima', texto: 'Movimiento de volumen masivo y comercio exterior, con gestión aduanera integrada.' },
];

export function Triada({ detallado = false }) {
  return (
    <div className="triada">
      {rutas.map(({ Icono, titulo, texto }, i) => (
        <Reveal key={titulo} delay={i * 0.14} y={54} className="triada__item">
          <span className="triada__num">0{i + 1}</span>
          <Icono className="triada__icono" />
          <h3>{titulo}</h3>
          <p>{detallado ? texto : texto.split('.')[0] + '.'}</p>
          <span className="triada__linea" aria-hidden="true" />
        </Reveal>
      ))}
    </div>
  );
}

// Cinta institucional en movimiento continuo.
export function Cinta({ palabras }) {
  const serie = [...palabras, ...palabras];
  return (
    <div className="cinta" aria-hidden="true">
      <div className="cinta__pista">
        {serie.map((p, i) => (
          <span key={i} className="cinta__item">
            {p}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

// Secuencia operativa numerada, con línea que se dibuja al entrar.
export function Proceso({ pasos }) {
  return (
    <ol className="proceso">
      {pasos.map((paso, i) => (
        <Reveal key={paso} delay={i * 0.12} y={40} as="li" className="proceso__paso">
          <span className="proceso__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{paso}</h3>
          <span className="proceso__linea" aria-hidden="true" />
        </Reveal>
      ))}
    </ol>
  );
}

// Encabezado de sección reutilizable con eyebrow + título animado.
export function TituloSeccion({ eyebrow, titulo, texto, claro = false }) {
  return (
    <div className="titulo-seccion">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <LineaEntrada className={`titulo ${claro ? '' : ''}`}>{titulo}</LineaEntrada>
      {texto && (
        <Reveal delay={0.15}>
          <p className="plomo" style={{ maxWidth: 660, marginTop: 20 }}>{texto}</p>
        </Reveal>
      )}
    </div>
  );
}
