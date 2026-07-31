import Link from 'next/link';
import { IconAerea, IconTerrestre, IconMaritima, iconos } from './Icons';

export function Divisiones({ items, cta = false, columnas = 3 }) {
  return (
    <div className={`divisiones ${columnas === 4 ? 'divisiones--4' : ''}`}>
      {items.map((s) => {
        const Icono = iconos[s.slug];
        return (
          <Link key={s.slug} href={`/servicios/${s.slug}`} className="division">
            <Icono className="division__icono" />
            <h3>{s.titulo}</h3>
            <p>{s.resumen}</p>
            <span className="division__mas">Ver división</span>
          </Link>
        );
      })}
      {cta && (
        <Link href="/contacto" className="division division--cta">
          <h3>Solicitar información</h3>
          <p>Consultas sobre el alcance operativo de cualquiera de las divisiones del holding.</p>
          <span className="division__mas">Contactar</span>
        </Link>
      )}
    </div>
  );
}

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

export function CTA({ titulo = 'Solicitar información', texto, boton = 'Contactar' }) {
  return (
    <section className="cta">
      <div className="contenedor cta__inner">
        <div>
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
        </div>
        <Link href="/contacto" className="btn btn--claro">{boton}</Link>
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
        <article key={titulo} className="triada__item">
          <span className="triada__num">0{i + 1}</span>
          <Icono className="triada__icono" />
          <h3>{titulo}</h3>
          <p>{detallado ? texto : texto.split('.')[0] + '.'}</p>
        </article>
      ))}
    </div>
  );
}
