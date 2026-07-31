import Link from 'next/link';
import { IconAerea, IconTerrestre, IconMaritima, iconos } from './Icons';
import { Reveal } from './anim';

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

// Marco de imagen con tratamiento duotono navy y zoom al pasar el cursor.
export function Medio({ src, alt = '', proporcion, className = '', children }) {
  return (
    <figure className={`medio ${className}`} style={proporcion ? { aspectRatio: proporcion } : undefined}>
      <img src={src} alt={alt} loading="lazy" />
      <span className="medio__velo" aria-hidden="true" />
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
          <Reveal key={s.slug} delay={i * 0.07}>
            <Link href={`/servicios/${s.slug}`} className="division">
              <div className="division__medio">
                <img src={s.imagen} alt="" loading="lazy" />
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
        <Reveal delay={items.length * 0.07}>
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
          <Link href="/contacto" className="btn btn--claro">{boton}</Link>
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
        <Reveal key={titulo} delay={i * 0.1} className="triada__item">
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
