import { Eyebrow, TituloSeccion } from '../../components/Bloques';
import { GraficoMapa } from '../../components/Graficos';
import Formulario from '../../components/Formulario';
import Faq from '../../components/Faq';
import { Reveal, LineaEntrada } from '../../components/anim';
import { IconCorreo, IconTelefono, IconPin } from '../../components/Icons';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Contacto',
  description:
    'Canal corporativo de MAPI GLOBAL. Sede en 8180 NW 36 St, Suite 406, Doral, FL 33166. Teléfono +1 305 763 2397.',
};

const faqsContacto = [
  {
    p: '¿Cuál es el tiempo de respuesta habitual?',
    r: 'Las consultas recibidas en días hábiles se responden dentro de las 48 horas siguientes, en el orden en que ingresan al canal corporativo.',
  },
  {
    p: '¿Qué información conviene incluir en la consulta?',
    r: 'La división de interés, el alcance del requerimiento, origen y destino cuando corresponda, y el plazo estimado. Con esos datos se estructura una propuesta preliminar.',
  },
  {
    p: '¿Atienden consultas de otros países?',
    r: 'Sí. La estructura del holding está preparada para operar a través de jurisdicciones. La sede corporativa se encuentra en Doral, Florida, Estados Unidos.',
  },
  {
    p: '¿Se puede coordinar una reunión presencial?',
    r: 'Sí, con cita previa en la oficina de Doral. La solicitud se realiza por el mismo formulario o por teléfono.',
  },
];

export default function Contacto() {
  const { contacto } = site;

  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Eyebrow>Canal corporativo</Eyebrow>
          </Reveal>
          <LineaEntrada className="display display--interior" delay={0.1}>Contacto</LineaEntrada>
          <Reveal delay={0.3}>
            <p className="cabecera__texto" style={{ maxWidth: 660 }}>
              Las consultas institucionales, operativas y de alianzas se reciben por este canal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <span className="halo halo--acento" style={{ width: 440, height: 440, right: '-12%', top: '18%' }} aria-hidden="true" />
        <div className="contenedor">
          <div className="tarjetas-contacto">
            {[
              { Icono: IconTelefono, etiqueta: 'Teléfono', valor: contacto.telefono, href: `tel:${contacto.telefono.replace(/\s/g, '')}` },
              { Icono: IconCorreo, etiqueta: 'Correo', valor: contacto.correo, href: `mailto:${contacto.correo}` },
              { Icono: IconPin, etiqueta: 'Sede corporativa', valor: `${contacto.direccion}, ${contacto.ciudad}` },
            ].map((c, i) => (
              <Reveal key={c.etiqueta} delay={i * 0.12} y={46} className="tarjeta-contacto">
                <c.Icono width={26} height={26} />
                <span>{c.etiqueta}</span>
                {c.href ? <a href={c.href}>{c.valor}</a> : <p>{c.valor}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion--clara seccion--linea">
        <div className="contenedor contacto">
          <Reveal y={44}>
            <Eyebrow>Formulario</Eyebrow>
            <h2 className="subtitulo" style={{ marginBottom: 32 }}>Solicitud de información</h2>
            <Formulario />
          </Reveal>

          <Reveal delay={0.18} y={50}>
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

      <section className="seccion">
        <div className="contenedor faq-bloque">
          <TituloSeccion
            eyebrow="Preguntas frecuentes"
            titulo="Antes de escribir"
            texto="Respuestas rápidas sobre tiempos, alcance y coordinación de reuniones."
          />
          <Reveal delay={0.15} y={50}>
            <Faq items={faqsContacto} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
