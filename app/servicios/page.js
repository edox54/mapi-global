import Link from 'next/link';
import { servicios } from '../../lib/servicios';
import { faqsServicios } from '../../lib/faqs';
import { Eyebrow, CTA, Divisiones, Proceso, TituloSeccion, Cinta } from '../../components/Bloques';
import { Reveal, LineaEntrada } from '../../components/anim';
import Faq from '../../components/Faq';

export const metadata = {
  title: 'Servicios',
  description:
    'Las cinco divisiones de MAPI GLOBAL: bienes raíces, refinación, logística multimodal, aeronaves y construcción, bajo una misma estructura de gobierno corporativo.',
};

export default function Servicios() {
  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Eyebrow>Divisiones</Eyebrow>
          </Reveal>
          <LineaEntrada className="display display--interior" delay={0.1}>Servicios</LineaEntrada>
          <Reveal delay={0.3}>
            <p className="cabecera__texto" style={{ maxWidth: 660 }}>
              Cinco divisiones operativas bajo una misma estructura de gobierno corporativo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <span className="halo halo--acento" style={{ width: 440, height: 440, left: '-12%', top: '14%' }} aria-hidden="true" />
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Índice de divisiones"
            titulo="Alcance operativo"
            texto="Cada división puede contratarse de forma independiente. La integración entre ellas es lo que reduce tiempos y costos en operaciones complejas."
          />
          <div style={{ marginTop: 52 }}>
            <Divisiones items={servicios} cta />
          </div>
        </div>
      </section>

      <Cinta palabras={['Multimodal', 'Aduanas', 'Obra civil', 'Activos', 'Refinado', 'Aviación', 'Comercio Exterior']} />

      <section className="seccion seccion--clara">
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Cómo trabajamos"
            titulo="Una sola secuencia para todo el holding"
            texto="Sin importar la división, el recorrido de un requerimiento es el mismo, y cada etapa deja registro documental."
          />
          <div style={{ marginTop: 52 }}>
            <Proceso pasos={['Consulta y alcance', 'Evaluación técnica', 'Propuesta estructurada', 'Ejecución', 'Cierre y reporte']} />
          </div>
        </div>
      </section>

      <section className="seccion seccion--linea">
        <span className="halo halo--acento" style={{ width: 420, height: 420, right: '-12%', bottom: '4%' }} aria-hidden="true" />
        <div className="contenedor faq-bloque">
          <div>
            <TituloSeccion
              eyebrow="Preguntas frecuentes"
              titulo="Sobre las divisiones"
              texto="Consultas habituales antes de iniciar una operación con el holding."
            />
            <Reveal delay={0.25}>
              <div style={{ marginTop: 34 }}>
                <Link href="/nosotros" className="btn btn--linea">Conocer el holding</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={50}>
            <Faq items={faqsServicios} />
          </Reveal>
        </div>
      </section>

      <CTA
        titulo="Solicitar información"
        texto="Indique la división de interés y el alcance de la consulta."
        boton="Contactar"
      />
    </>
  );
}
