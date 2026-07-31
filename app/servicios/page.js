import { servicios } from '../../lib/servicios';
import { Cabecera, Eyebrow, CTA, Divisiones } from '../../components/Bloques';

export const metadata = {
  title: 'Servicios',
  description:
    'Las cinco divisiones de MAPI GLOBAL: bienes raíces, refinación, logística, aeronaves y construcción.',
};

export default function Servicios() {
  return (
    <>
      <section className="pagina-header">
        <div className="contenedor">
          <Cabecera
            eyebrow="Divisiones"
            titulo="Servicios"
            texto="Cinco divisiones operativas bajo una misma estructura de gobierno corporativo."
          />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <Eyebrow>Índice de divisiones</Eyebrow>
          <h2 className="titulo" style={{ marginBottom: 40 }}>Alcance operativo</h2>
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
