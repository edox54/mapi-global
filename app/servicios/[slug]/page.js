import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicios, getServicio } from '../../../lib/servicios';
import { iconos } from '../../../components/Icons';
import { Eyebrow, Triada, CTA, Divisiones, Medio, Proceso, TituloSeccion, Cinta } from '../../../components/Bloques';
import { Reveal, LineaEntrada } from '../../../components/anim';
import Faq from '../../../components/Faq';

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
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <p className="migas">
              <Link href="/servicios">Servicios</Link> — {servicio.titulo}
            </p>
            <Icono className="pagina-header__icono" width={44} height={44} />
          </Reveal>
          <LineaEntrada className="display display--interior" delay={0.1}>{servicio.titulo}</LineaEntrada>
          <Reveal delay={0.3}>
            <p className="cabecera__texto" style={{ maxWidth: 640 }}>{servicio.resumen}</p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <span className="halo halo--acento" style={{ width: 400, height: 400, left: '-14%', top: '10%' }} aria-hidden="true" />
        <div className="contenedor dos-columnas">
          <Reveal>
            <Eyebrow>Alcance</Eyebrow>
            <h2 className="subtitulo">Descripción institucional</h2>
          </Reveal>
          <div className="prosa">
            {servicio.descripcion.map((p, i) => (
              <Reveal key={i} delay={i * 0.1} y={26}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion--clara seccion--linea">
        <div className="contenedor capacidades-bloque">
          <div>
            <TituloSeccion eyebrow="Alcance operativo" titulo="Capacidades" />
            <div className="capacidades" style={{ marginTop: 42 }}>
              {servicio.capacidades.map((c, i) => (
                <Reveal key={c.titulo} delay={i * 0.1} y={44} className="capacidad">
                  <span>0{i + 1}</span>
                  <h3>{c.titulo}</h3>
                  <p>{c.texto}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2} y={50} escala={0.92}>
            <Medio src={servicio.imagen} proporcion="3 / 4" posicion={servicio.posicion} className="capacidades-bloque__medio" />
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Metodología"
            titulo="Secuencia operativa"
            texto="Cada operación de la división recorre las mismas cuatro etapas, con documentación y control en cada una."
          />
          <div style={{ marginTop: 52 }}>
            <Proceso pasos={servicio.proceso} />
          </div>
        </div>
      </section>

      {servicio.triada && (
        <section className="seccion seccion--clara triada-seccion">
          <span className="triada-seccion__patron" aria-hidden="true" />
          <div className="contenedor" style={{ position: 'relative', zIndex: 1 }}>
            <TituloSeccion
              eyebrow="Tríada logística global"
              titulo="Las tres rutas"
              texto="Las tres líneas del isotipo corresponden a las tres vías sobre las que se sostiene la operación de transporte del holding."
            />
            <div style={{ marginTop: 48 }}>
              <Triada detallado />
            </div>
          </div>
        </section>
      )}

      <section className="seccion seccion--clara seccion--linea">
        <span className="halo halo--acento" style={{ width: 420, height: 420, right: '-12%', bottom: '0%' }} aria-hidden="true" />
        <div className="contenedor faq-bloque">
          <div>
            <TituloSeccion
              eyebrow="Preguntas frecuentes"
              titulo={`Sobre ${servicio.titulo.toLowerCase()}`}
              texto="Respuestas a las consultas recurrentes sobre el alcance y la operación de esta división."
            />
            <Reveal delay={0.25}>
              <div style={{ marginTop: 34 }}>
                <Link href="/contacto" className="btn btn--linea">Hacer otra consulta</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={50}>
            <Faq items={servicio.faqs} />
          </Reveal>
        </div>
      </section>

      <Cinta palabras={['Bienes Raíces', 'Refinación', 'Logística', 'Aeronaves', 'Construcción', 'Comercio Exterior']} />

      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion eyebrow="Otras divisiones" titulo="Continuar explorando" />
          <div style={{ marginTop: 42 }}>
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
