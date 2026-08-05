import { Eyebrow } from '../../components/Bloques';
import { Reveal, LineaEntrada } from '../../components/anim';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Términos de Servicio',
  description: `Condiciones de uso del sitio web de ${site.nombre}.`,
};

export default function Terminos() {
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
          <LineaEntrada className="display display--interior" delay={0.1}>Términos de Servicio</LineaEntrada>
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
                Estos Términos de Servicio ("Términos") rigen el acceso y uso del sitio web de{' '}
                {site.nombre} ({site.url}). Al acceder o utilizar este sitio, usted acepta quedar
                vinculado por estos Términos. Si no está de acuerdo, le pedimos no utilizar el sitio.
              </p>

              <h2>1. Uso del sitio</h2>
              <p>
                Este sitio tiene fines informativos: presenta al holding, sus divisiones operativas y un
                canal de contacto institucional. Usted se compromete a utilizarlo de forma lícita y a no
                interferir con su funcionamiento, intentar acceder sin autorización a sistemas
                relacionados, ni utilizar el formulario de contacto para enviar contenido fraudulento,
                difamatorio, malicioso o no solicitado (spam).
              </p>

              <h2>2. Naturaleza informativa del contenido</h2>
              <p>
                La información publicada sobre el holding, sus divisiones, capacidades y procesos tiene
                carácter descriptivo e institucional. No constituye una oferta vinculante, asesoría legal,
                financiera o de inversión, ni garantía de disponibilidad, precio o condiciones de ningún
                servicio. Toda operación comercial se formaliza mediante acuerdos específicos entre las
                partes, fuera de este sitio.
              </p>

              <h2>3. Propiedad intelectual</h2>
              <p>
                El nombre, isotipo, textos, gráficos, imágenes y demás contenido de este sitio son
                propiedad de {site.nombre} o se utilizan bajo licencia, y están protegidos por las leyes de
                propiedad intelectual aplicables. No se autoriza su reproducción, distribución o uso
                comercial sin consentimiento previo por escrito.
              </p>

              <h2>4. Formulario de contacto</h2>
              <p>
                Al enviar el formulario de contacto, usted declara que la información proporcionada
                (nombre, correo, empresa y mensaje) es veraz y que cuenta con autorización para
                proporcionarla. Consulte nuestra{' '}
                <a href="/privacidad">Política de Privacidad</a> para conocer cómo se trata esa
                información.
              </p>

              <h2>5. Enlaces a terceros</h2>
              <p>
                Este sitio puede contener enlaces a sitios de terceros (por ejemplo, redes sociales o
                correo). No somos responsables del contenido, políticas o prácticas de sitios que no
                administramos directamente.
              </p>

              <h2>6. Disponibilidad del sitio</h2>
              <p>
                Procuramos mantener el sitio disponible y actualizado, pero no garantizamos acceso
                ininterrumpido ni libre de errores. Podemos suspender, modificar o retirar contenido del
                sitio en cualquier momento sin previo aviso.
              </p>

              <h2>7. Limitación de responsabilidad</h2>
              <p>
                En la máxima medida permitida por la ley aplicable, {site.nombre} no será responsable por
                daños directos, indirectos, incidentales o consecuentes que resulten del uso o la
                imposibilidad de uso de este sitio.
              </p>

              <h2>8. Modificaciones a estos Términos</h2>
              <p>
                Podemos actualizar estos Términos periódicamente. La fecha de la última actualización se
                indica al inicio de esta página. El uso continuado del sitio después de una modificación
                constituye la aceptación de los Términos actualizados.
              </p>

              <h2>9. Ley aplicable</h2>
              <p>
                Estos Términos se rigen por las leyes del Estado de Florida, Estados Unidos, sin perjuicio
                de sus disposiciones sobre conflicto de leyes, dado que la sede corporativa del holding se
                encuentra en {site.contacto.ciudad}.
              </p>

              <h2>10. Contacto</h2>
              <p>
                Para consultas sobre estos Términos, escríbanos a{' '}
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
