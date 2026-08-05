import Link from 'next/link';
import { Cabecera, Eyebrow, CTA, Medio, Proceso, TituloSeccion, Cinta } from '../../components/Bloques';
import { GraficoNodos } from '../../components/Graficos';
import { Reveal, Contador, LineaEntrada, LineaAcento } from '../../components/anim';
import Faq from '../../components/Faq';
import { faqsHolding } from '../../lib/faqs';
import { servicios } from '../../lib/servicios';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Nosotros',
  description:
    'MAPI GLOBAL opera como marca institucional sobre múltiples industrias: solidez patrimonial, alcance internacional y precisión operativa. Sede corporativa en Doral, Florida.',
};

const valores = [
  {
    titulo: 'Solidez',
    texto: 'Las decisiones se toman sobre criterios patrimoniales conservadores. El holding prioriza la permanencia del activo sobre el rendimiento de corto plazo.',
  },
  {
    titulo: 'Alcance internacional',
    texto: 'La operación se estructura para cruzar jurisdicciones: transporte, aduana y titularidad de activos en distintos marcos regulatorios.',
  },
  {
    titulo: 'Precisión operativa',
    texto: 'Cada división reporta bajo el mismo estándar de medición. La desviación se informa en el período en que ocurre.',
  },
  {
    titulo: 'Disciplina de marca',
    texto: 'Un solo sello institucional sobre todos los sectores. La consistencia del signo es parte del control interno del holding.',
  },
];

const gobierno = [
  {
    titulo: 'Marco único de gobierno',
    texto: 'Las cinco divisiones responden al mismo órgano de decisión. No existen políticas paralelas por sector.',
  },
  {
    titulo: 'Estándar de reporte común',
    texto: 'Toda división mide y reporta bajo el mismo formato, lo que permite comparar desempeño entre industrias distintas.',
  },
  {
    titulo: 'Control documental',
    texto: 'Trazabilidad completa de origen, titularidad y cadena de custodia en cada operación que ingresa al holding.',
  },
  {
    titulo: 'Umbrales de riesgo definidos',
    texto: 'Ningún activo se incorpora al portafolio sin cumplir los parámetros de exposición fijados por el holding.',
  },
];

export default function Nosotros() {
  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Eyebrow>El holding</Eyebrow>
          </Reveal>
          <LineaEntrada className="display display--interior" delay={0.1}>Nosotros</LineaEntrada>
          <Reveal delay={0.3}>
            <p className="cabecera__texto" style={{ maxWidth: 700 }}>
              Una estructura corporativa construida para sostener operaciones en industrias distintas
              bajo una misma disciplina.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <span className="halo halo--acento" style={{ width: 420, height: 420, left: '-14%', top: '12%' }} aria-hidden="true" />
        <div className="contenedor perfil">
          <div>
            <TituloSeccion eyebrow="Posicionamiento" titulo="Estructura y mandato" />
            <div className="prosa" style={{ marginTop: 30 }}>
              <Reveal delay={0.05} y={26}>
                <p>
                  MAPI GLOBAL es un holding empresarial internacional que agrupa operaciones de bienes
                  raíces, refinación de materiales, logística multimodal, comercialización de aeronaves y
                  construcción. La estructura fue conformada para administrar activos de infraestructura
                  dura con horizonte de largo plazo.
                </p>
              </Reveal>
              <Reveal delay={0.14} y={26}>
                <p>
                  El holding no opera como conglomerado de marcas independientes. Cada división responde a
                  un mismo marco de gobierno, un mismo estándar de reporte y una misma identidad
                  institucional. Esa uniformidad permite trasladar capacidad entre sectores: la red
                  logística sirve a la refinación, la construcción sirve al portafolio inmobiliario, y la
                  división de aeronaves incorpora equipo a la operación de transporte.
                </p>
              </Reveal>
              <Reveal delay={0.22} y={26}>
                <p>
                  La posición del holding es la de un contenedor de valor: una base estable sobre la cual
                  se ejecutan operaciones de crecimiento sostenido. Esa lectura es explícita en la marca y
                  es el criterio con el que se evalúa cada incorporación al portafolio.
                </p>
              </Reveal>
            </div>

            <div className="cifras">
              {[
                { v: 5, t: 'Divisiones operativas' },
                { v: 3, t: 'Rutas logísticas' },
                { v: 1, t: 'Marca institucional' },
              ].map((c, i) => (
                <Reveal key={c.t} delay={0.1 + i * 0.12} y={34} className="cifra">
                  <strong><Contador valor={c.v} /></strong>
                  <span>{c.t}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} y={60} escala={0.9}>
            <Medio src="/img/bienes-raices.webp" proporcion="3 / 4" etiqueta="Sede corporativa" />
          </Reveal>
        </div>
      </section>

      <Cinta palabras={['Solidez patrimonial', 'Alcance internacional', 'Precisión operativa', 'Disciplina de marca', 'Infraestructura dura']} />

      <section className="seccion seccion--clara">
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Arquitectura de marca"
            titulo="Un sello paraguas, múltiples industrias"
            texto="La estructura dinámica de MAPI GLOBAL no se ata a un solo sector. Funciona como un faro de confianza institucional: impreso en un contrato de bienes raíces o pintado en un buque de carga, el signo proyecta una sola voz corporativa."
          />
          <Reveal delay={0.2} y={50} escala={0.94}>
            <div style={{ marginTop: 52 }}>
              <GraficoNodos />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="seccion seccion--clara seccion--linea">
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Gobierno corporativo"
            titulo="Cómo se administra el holding"
            texto="Cuatro mecanismos sostienen la operación conjunta de cinco divisiones en industrias distintas."
          />
          <div className="gobierno" style={{ marginTop: 52 }}>
            {gobierno.map((g, i) => (
              <Reveal key={g.titulo} delay={i * 0.12} y={50} className="gobierno__item">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.titulo}</h3>
                <p>{g.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion
            eyebrow="Metodología"
            titulo="De la evaluación a la operación"
            texto="Toda incorporación al portafolio del holding recorre la misma secuencia, sin excepción por sector."
          />
          <div style={{ marginTop: 52 }}>
            <Proceso pasos={['Evaluación del activo', 'Debida diligencia', 'Estructuración', 'Incorporación', 'Control y reporte']} />
          </div>
        </div>
      </section>

      <section className="seccion seccion--clara seccion--linea">
        <span className="halo halo--acento" style={{ width: 400, height: 400, right: '-10%', top: '20%' }} aria-hidden="true" />
        <div className="contenedor">
          <TituloSeccion eyebrow="Valores corporativos" titulo="Criterios de operación" />
          <div className="valores" style={{ marginTop: 46 }}>
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 0.1} y={46} className="valor">
                <span>0{i + 1}</span>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor sede">
          <Reveal y={44}>
            <Eyebrow>Presencia</Eyebrow>
            <LineaEntrada className="titulo">Sede corporativa</LineaEntrada>
            <div style={{ maxWidth: 200, margin: '24px 0 28px' }}><LineaAcento /></div>
            <p className="plomo" style={{ marginBottom: 30 }}>
              La administración central del holding opera desde {site.contacto.ciudad.split(',')[0]}, Florida,
              punto de conexión entre los mercados de América del Norte, el Caribe y América del Sur.
            </p>
            <ul className="sede__datos">
              <li><strong>Dirección</strong><span>{site.contacto.direccion}</span></li>
              <li><strong>Ciudad</strong><span>{site.contacto.ciudad}</span></li>
              <li><strong>Teléfono</strong><a href={`tel:${site.contacto.telefono.replace(/\s/g, '')}`}>{site.contacto.telefono}</a></li>
              <li><strong>Correo</strong><a href={`mailto:${site.contacto.correo}`}>{site.contacto.correo}</a></li>
            </ul>
            <div style={{ marginTop: 34 }}>
              <Link href="/contacto" className="btn btn--acento">Ir a contacto</Link>
            </div>
          </Reveal>
          <Reveal delay={0.18} y={56} escala={0.92}>
            <Medio src="/img/contacto.webp" proporcion="4 / 5" />
          </Reveal>
        </div>
      </section>

      <section className="seccion seccion--clara seccion--linea">
        <div className="contenedor faq-bloque">
          <div>
            <TituloSeccion
              eyebrow="Preguntas frecuentes"
              titulo="Sobre el holding"
              texto="Consultas recurrentes sobre la estructura, el alcance y la forma de operar de MAPI GLOBAL."
            />
            <Reveal delay={0.25}>
              <div style={{ marginTop: 34 }}>
                <Link href="/servicios" className="btn btn--linea">Ver divisiones</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={50}>
            <Faq items={faqsHolding} />
          </Reveal>
        </div>
      </section>

      <CTA
        titulo="Consultas institucionales"
        texto={`Para información sobre la estructura del holding o cualquiera de sus ${servicios.length} divisiones, utilice el canal corporativo.`}
        boton="Contactar"
      />
    </>
  );
}
