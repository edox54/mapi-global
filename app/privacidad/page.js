import { Eyebrow } from '../../components/Bloques';
import { Reveal, LineaEntrada } from '../../components/anim';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Política de Privacidad',
  description: `Cómo ${site.nombre} recopila, usa y protege la información enviada a través de este sitio.`,
};

export default function Privacidad() {
  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Eyebrow>Legal</Eyebrow>
          </Reveal>
          <LineaEntrada className="display display--interior" delay={0.1}>Política de Privacidad</LineaEntrada>
          <Reveal delay={0.3}>
            <p className="cabecera__texto" style={{ maxWidth: 700 }}>
              Última actualización: 5 de agosto de 2026.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <Reveal y={30}>
            <div className="prosa">
              <p>
                Esta política describe cómo {site.nombre} ("el holding", "nosotros") recopila, utiliza y
                protege la información que los visitantes proporcionan a través de este sitio web
                ({site.url}). Al utilizar este sitio, usted acepta las prácticas descritas a continuación.
              </p>

              <h2>1. Información que recopilamos</h2>
              <p>
                Recopilamos únicamente la información que usted nos proporciona voluntariamente a través
                del formulario de contacto: nombre, empresa (opcional), correo electrónico y el contenido
                del mensaje. No recopilamos información financiera, contraseñas ni datos sensibles a
                través de este sitio.
              </p>
              <p>
                Este sitio no utiliza cookies de seguimiento ni herramientas de analítica de terceros al
                momento de esta publicación. Si en el futuro se incorporan (por ejemplo, para medir
                tráfico o mejorar el sitio), esta política se actualizará para reflejarlo.
              </p>

              <h2>2. Uso de la información</h2>
              <p>La información enviada a través del formulario de contacto se utiliza exclusivamente para:</p>
              <ul>
                <li>Responder a la consulta o solicitud realizada.</li>
                <li>Dar seguimiento a comunicaciones institucionales, operativas o comerciales relacionadas con la solicitud.</li>
              </ul>
              <p>No utilizamos esta información con fines de marketing no solicitado ni la vendemos a terceros.</p>

              <h2>3. Cómo se procesa el mensaje</h2>
              <p>
                Al enviar el formulario, los datos se transmiten de forma segura al servidor del holding y
                se reenvían por correo electrónico a la casilla institucional ({site.contacto.correo}) para
                su atención. No se almacena una copia adicional del mensaje en una base de datos del sitio.
              </p>

              <h2>4. Compartición con terceros</h2>
              <p>
                No compartimos, vendemos ni alquilamos su información personal a terceros, salvo que sea
                requerido por ley, orden judicial o autoridad competente, o cuando sea necesario para
                proteger los derechos, la seguridad o la propiedad del holding.
              </p>

              <h2>5. Seguridad</h2>
              <p>
                La transmisión del formulario se realiza mediante conexión cifrada (HTTPS). Aplicamos
                medidas razonables para proteger la información contra accesos no autorizados; sin embargo,
                ningún sistema de transmisión por internet es completamente infalible.
              </p>

              <h2>6. Conservación de datos</h2>
              <p>
                Los mensajes recibidos se conservan en la casilla de correo institucional el tiempo
                necesario para dar respuesta y mantener el historial de la relación comercial, salvo que
                usted solicite su eliminación conforme a la sección siguiente.
              </p>

              <h2>7. Sus derechos</h2>
              <p>
                Puede solicitar acceso, corrección o eliminación de la información que nos haya
                proporcionado escribiendo a{' '}
                <a href={`mailto:${site.contacto.correo}`}>{site.contacto.correo}</a>. Atenderemos la
                solicitud dentro de un plazo razonable.
              </p>

              <h2>8. Menores de edad</h2>
              <p>
                Este sitio está dirigido a un público corporativo y no está diseñado para recopilar
                información de menores de edad. No solicitamos deliberadamente datos de menores de 18 años.
              </p>

              <h2>9. Cambios a esta política</h2>
              <p>
                Podemos actualizar esta política periódicamente. La fecha de la última actualización se
                indica al inicio de esta página. El uso continuado del sitio después de una actualización
                constituye la aceptación de los cambios.
              </p>

              <h2>10. Contacto</h2>
              <p>
                Para consultas sobre esta política, escríbanos a{' '}
                <a href={`mailto:${site.contacto.correo}`}>{site.contacto.correo}</a> o a la dirección{' '}
                {site.contacto.direccion}, {site.contacto.ciudad}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
