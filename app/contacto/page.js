import { Cabecera, Eyebrow } from '../../components/Bloques';
import { GraficoMapa } from '../../components/Graficos';
import Formulario from '../../components/Formulario';
import { Reveal, FondoZoom } from '../../components/anim';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Contacto',
  description: 'Canal corporativo de MAPI GLOBAL para consultas institucionales y operativas.',
};

export default function Contacto() {
  const { contacto } = site;

  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <FondoZoom src="/img/contacto.jpg" duracion={26} />
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Cabecera
              eyebrow="Canal corporativo"
              titulo="Contacto"
              texto="Las consultas institucionales, operativas y de alianzas se reciben por este canal."
            />
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor contacto">
          <Reveal>
            <Eyebrow>Formulario</Eyebrow>
            <h2 className="subtitulo" style={{ marginBottom: 32 }}>Solicitud de información</h2>
            <Formulario />
          </Reveal>

          <Reveal delay={0.15}>
            <Eyebrow>Datos institucionales</Eyebrow>
            <div className="datos">
              <div className="dato">
                <span>Correo</span>
                <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>
              </div>
              <div className="dato">
                <span>Teléfono</span>
                <a href={`tel:${contacto.telefono.replace(/\s/g, '')}`}>{contacto.telefono}</a>
              </div>
              <div className="dato">
                <span>Dirección</span>
                <p>{contacto.direccion}</p>
                <p>{contacto.ciudad}</p>
              </div>
              <div className="dato">
                <span>Horario de atención</span>
                <p>{contacto.horario}</p>
              </div>
            </div>
            <div className="mapa">
              <GraficoMapa />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
