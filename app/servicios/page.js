import { servicios } from '../../lib/servicios';
import { Cabecera, Eyebrow, CTA, Divisiones } from '../../components/Bloques';
import { Reveal, FondoZoom } from '../../components/anim';

export const metadata = {
  title: 'Servicios',
  description:
    'Las cinco divisiones de MAPI GLOBAL: bienes raíces, refinación, logística, aeronaves y construcción.',
};

export default function Servicios() {
  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <FondoZoom src="/img/hero.jpg" duracion={26} />
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Cabecera
              eyebrow="Divisiones"
              titulo="Servicios"
              texto="Cinco divisiones operativas bajo una misma estructura de gobierno corporativo."
            />
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Índice de divisiones</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 40 }}>Alcance operativo</h2>
          </Reveal>
          <Divisiones items={servicios} cta />
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
