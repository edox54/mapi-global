import Link from 'next/link';
import Image from 'next/image';
import { servicios } from '../lib/servicios';
import { Eyebrow, Triada, CTA, Divisiones, Cinta, Medio } from '../components/Bloques';
import { GraficoADN } from '../components/Graficos';
import { Reveal, PalabrasEntrada, Contador, FondoZoom } from '../components/anim';
import Particulas from '../components/Particulas';

const cifras = [
  { valor: 5, etiqueta: 'Divisiones operativas' },
  { valor: 3, etiqueta: 'Rutas logísticas' },
  { valor: 1, etiqueta: 'Voz corporativa' },
];

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <div className="hero__fondo" aria-hidden="true">
          <FondoZoom src="/img/hero.jpg" className="hero__img" />
          <span className="hero__velo" />
          <span className="hero__patron" />
          <Particulas className="hero__particulas" cantidad={80} />
        </div>

        <div className="contenedor">
          <div className="hero__inner">
            <div>
              <Reveal delay={0.05} y={12}>
                <Eyebrow>Holding empresarial internacional</Eyebrow>
              </Reveal>
              <PalabrasEntrada texto="MAPI GLOBAL" className="display" delay={0.15} />
              <Reveal delay={0.5} y={14}>
                <p className="hero__tagline">
                  Marca institucional que agrupa operaciones de bienes raíces, refinación, logística,
                  aeronaves y construcción. Una sola estructura de gobierno sobre múltiples industrias.
                </p>
                <div className="hero__acciones">
                  <Link href="/servicios" className="btn btn--claro">Divisiones</Link>
                  <Link href="/nosotros" className="btn btn--fantasma">El holding</Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.35} y={30}>
              <Image src="/isotipo-blanco.png" alt="" width={640} height={639} className="hero__iso" priority />
            </Reveal>
          </div>

          <div className="hero__datos">
            {cifras.map((c, i) => (
              <Reveal key={c.etiqueta} delay={0.6 + i * 0.1} className="hero__dato">
                <strong><Contador valor={c.valor} /></strong>
                <span>{c.etiqueta}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <span className="hero__scroll" aria-hidden="true">
          <i />
        </span>
      </section>

      <Cinta palabras={['Bienes Raíces', 'Refinación', 'Logística', 'Aeronaves', 'Construcción', 'Comercio Exterior']} />

      <section className="seccion">
        <div className="contenedor">
          <div className="adn">
            <div>
              <Reveal>
                <Eyebrow>El ADN del holding</Eyebrow>
                <h2 className="titulo">Estabilidad y crecimiento</h2>
                <p className="plomo" style={{ marginTop: 24, marginBottom: 34 }}>
                  La identidad de MAPI GLOBAL se construye sobre dos capas. Una base sólida que contiene
                  el valor patrimonial, y una estructura dinámica de líneas ascendentes a 45 grados que
                  proyecta movimiento continuo.
                </p>
              </Reveal>
              <div className="adn__capas">
                <Reveal delay={0.1} className="capa">
                  <span className="capa__id">Capa 01</span>
                  <h3>El contenedor de valor</h3>
                  <p>
                    Evoca estabilidad absoluta, confianza institucional y seguridad patrimonial. Es el
                    ancla de un holding enfocado en infraestructura dura.
                  </p>
                </Reveal>
                <Reveal delay={0.2} className="capa">
                  <span className="capa__id">Capa 02</span>
                  <h3>La estructura dinámica</h3>
                  <p>
                    Líneas ascendentes a 45 grados que proyectan crecimiento continuo y movimiento
                    perpetuo hacia el futuro.
                  </p>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.15} y={34}>
              <GraficoADN />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="seccion seccion--linea">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Divisiones</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 40 }}>Cinco frentes, una estructura</h2>
          </Reveal>
          <Divisiones items={servicios} cta />
        </div>
      </section>

      <section className="mosaico-seccion">
        <div className="contenedor">
          <Reveal>
            <Eyebrow>Operación</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 18 }}>Infraestructura en movimiento</h2>
            <p className="plomo" style={{ maxWidth: 620, marginBottom: 46 }}>
              Activos, plantas, rutas y obra en ejecución bajo una misma estructura de control.
            </p>
          </Reveal>

          <div className="mosaico">
            <Reveal className="mosaico__grande" y={30}>
              <Link href="/servicios/logistica" className="mosaico__item">
                <Medio src="/img/logistica.jpg" />
                <div className="mosaico__texto">
                  <span>Logística</span>
                  <h3>Movimiento multimodal de carga</h3>
                  <p>Aérea, terrestre, fluvial, férrea y marítima, con gestión aduanera integrada.</p>
                </div>
              </Link>
            </Reveal>
            <div className="mosaico__columna">
              <Reveal delay={0.1} y={30}>
                <Link href="/servicios/construccion" className="mosaico__item">
                  <Medio src="/img/construccion.jpg" proporcion="16 / 9" />
                  <div className="mosaico__texto">
                    <span>Construcción</span>
                    <h3>Obra civil y desarrollos</h3>
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={0.2} y={30}>
                <Link href="/servicios/refinacion" className="mosaico__item">
                  <Medio src="/img/refinacion.jpg" proporcion="16 / 9" />
                  <div className="mosaico__texto">
                    <span>Refinación</span>
                    <h3>Procesamiento de materiales</h3>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion--navy triada-seccion">
        <div className="triada-seccion__fondo" aria-hidden="true">
          <FondoZoom src="/img/aeronaves.jpg" className="triada-seccion__img" duracion={24} />
          <span />
        </div>
        <div className="contenedor" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <Eyebrow>Tríada logística global</Eyebrow>
            <h2 className="titulo" style={{ marginBottom: 22 }}>Tres rutas, un mapa</h2>
            <p className="plomo" style={{ maxWidth: 640, marginBottom: 44 }}>
              El isotipo no solo proyecta crecimiento financiero: es un mapa literal de nuestras rutas de
              transportación.
            </p>
          </Reveal>
          <Triada />
          <Reveal delay={0.3}>
            <div style={{ marginTop: 44 }}>
              <Link href="/servicios/logistica" className="btn btn--claro">Ver división de logística</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        titulo="Solicitar información institucional"
        texto="Las consultas sobre operaciones, alianzas o participación en proyectos se atienden por el canal corporativo."
        boton="Ir a contacto"
      />
    </>
  );
}
