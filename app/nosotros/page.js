import { Cabecera, Eyebrow, CTA, Medio } from '../../components/Bloques';
import { GraficoNodos } from '../../components/Graficos';
import { Reveal, Contador, FondoZoom } from '../../components/anim';

export const metadata = {
  title: 'Nosotros',
  description:
    'MAPI GLOBAL opera como marca institucional sobre múltiples industrias: solidez patrimonial, alcance internacional y precisión operativa.',
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

export default function Nosotros() {
  return (
    <>
      <section className="pagina-header">
        <div className="pagina-header__fondo" aria-hidden="true">
          <FondoZoom src="/img/holding.jpg" duracion={26} />
          <span />
        </div>
        <div className="contenedor">
          <Reveal y={14}>
            <Cabecera
              eyebrow="El holding"
              titulo="Nosotros"
              texto="Una estructura corporativa construida para sostener operaciones en industrias distintas bajo una misma disciplina."
            />
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor perfil">
          <div>
            <Reveal>
              <Eyebrow>Posicionamiento</Eyebrow>
              <h2 className="titulo" style={{ marginBottom: 28 }}>Estructura y mandato</h2>
            </Reveal>
            <div className="prosa">
              <Reveal delay={0.05} y={18}>
                <p>
                  MAPI GLOBAL es un holding empresarial internacional que agrupa operaciones de bienes
                  raíces, refinación de materiales, logística multimodal, comercialización de aeronaves y
                  construcción. La estructura fue conformada para administrar activos de infraestructura
                  dura con horizonte de largo plazo.
                </p>
              </Reveal>
              <Reveal delay={0.12} y={18}>
                <p>
                  El holding no opera como conglomerado de marcas independientes. Cada división responde a
                  un mismo marco de gobierno, un mismo estándar de reporte y una misma identidad
                  institucional. Esa uniformidad permite trasladar capacidad entre sectores: la red
                  logística sirve a la refinación, la construcción sirve al portafolio inmobiliario, y la
                  división de aeronaves incorpora equipo a la operación de transporte.
                </p>
              </Reveal>
              <Reveal delay={0.18} y={18}>
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
                <Reveal key={c.t} delay={0.1 + i * 0.08} className="cifra">
                  <strong><Contador valor={c.v} /></strong>
                  <span>{c.t}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} y={34}>
            <Medio src="/img/bienes-raices.jpg" proporcion="3 / 4" />
          </Reveal>
        </div>
      </section>

      <section className="seccion seccion--gris seccion--linea">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Arquitectura de marca</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 22 }}>Un sello paraguas, múltiples industrias</h2>
            <p className="plomo" style={{ maxWidth: 720, marginBottom: 48 }}>
              La estructura dinámica de MAPI GLOBAL no se ata a un solo sector. Funciona como un faro de
              confianza institucional: impreso en un contrato de bienes raíces o pintado en un buque de
              carga, el signo proyecta una sola voz corporativa.
            </p>
          </Reveal>
          <Reveal delay={0.15} y={30}>
            <GraficoNodos />
          </Reveal>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Valores corporativos</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 40 }}>Criterios de operación</h2>
          </Reveal>
          <div className="valores">
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 0.08} className="valor">
                <span>0{i + 1}</span>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        titulo="Consultas institucionales"
        texto="Para información sobre la estructura del holding o sus divisiones, utilice el canal corporativo."
        boton="Contactar"
      />
    </>
  );
}
