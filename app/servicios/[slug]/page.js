import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicios, getServicio } from '../../../lib/servicios';
import { iconos } from '../../../components/Icons';
import { Eyebrow, Triada, CTA, Divisiones, Medio } from '../../../components/Bloques';
import { Reveal, FondoZoom } from '../../../components/anim';

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getServicio(slug);
  return s ? { title: s.titulo, description: s.resumen } : {};
}

export default async function Servicio({ params }) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const Icono = iconos[servicio.slug];
  const otras = servicios.filter((s) => s.slug !== servicio.slug);

  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <FondoZoom src={servicio.imagen} duracion={22} />
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <p className="migas">
              <Link href="/servicios">Servicios</Link> — {servicio.titulo}
            </p>
            <Icono className="pagina-header__icono" width={40} height={40} />
            <h1 className="display" style={{ fontSize: 'clamp(32px, 5.4vw, 62px)' }}>{servicio.titulo}</h1>
            <p className="cabecera__texto" style={{ maxWidth: 640 }}>{servicio.resumen}</p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-columnas">
          <Reveal>
            <Eyebrow>Alcance</Eyebrow>
            <h2 className="subtitulo">Descripción institucional</h2>
          </Reveal>
          <div className="prosa">
            {servicio.descripcion.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} y={18}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion--gris seccion--linea">
        <div className="contenedor capacidades-bloque">
          <div>
            <Reveal>
              <Eyebrow>Alcance operativo</Eyebrow>
              <h2 className="titulo" style={{ marginBottom: 40 }}>Capacidades</h2>
            </Reveal>
            <div className="capacidades">
              {servicio.capacidades.map((c, i) => (
                <Reveal key={c.titulo} delay={i * 0.08} className="capacidad">
                  <span>0{i + 1}</span>
                  <h3>{c.titulo}</h3>
                  <p>{c.texto}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} y={30}>
            <Medio src={servicio.imagen} proporcion="3 / 4" className="capacidades-bloque__medio" />
          </Reveal>
        </div>
      </section>

      {servicio.triada && (
        <section className="seccion seccion--navy">
          <div className="contenedor">
            <Reveal>
              <Eyebrow>Tríada logística global</Eyebrow>
              <h2 className="titulo" style={{ marginBottom: 22 }}>Las tres rutas</h2>
              <p className="plomo" style={{ maxWidth: 660, marginBottom: 44 }}>
                Las tres líneas del isotipo corresponden a las tres vías sobre las que se sostiene la
                operación de transporte del holding.
              </p>
            </Reveal>
            <Triada detallado />
          </div>
        </section>
      )}

      <section className="seccion seccion--linea">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Otras divisiones</Eyebrow>
          </Reveal>
          <div style={{ marginTop: 32 }}>
            <Divisiones items={otras} columnas={4} />
          </div>
        </div>
      </section>

      <CTA
        titulo="Solicitar información"
        texto={`Consultas sobre la división de ${servicio.titulo.toLowerCase()} y su alcance operativo.`}
        boton="Contactar"
      />
    </>
  );
}
