import Link from 'next/link';
import Image from 'next/image';
import { servicios } from '../lib/servicios';
import { Eyebrow, Triada, CTA, Divisiones } from '../components/Bloques';
import { GraficoADN } from '../components/Graficos';

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <div className="hero__patron" aria-hidden="true" />
        <div className="contenedor">
          <div className="hero__inner">
            <div>
              <Eyebrow>Holding empresarial internacional</Eyebrow>
              <h1 className="display">MAPI GLOBAL</h1>
              <p className="hero__tagline">
                Marca institucional que agrupa operaciones de bienes raíces, refinación, logística,
                aeronaves y construcción. Una sola estructura de gobierno sobre múltiples industrias.
              </p>
              <div className="hero__acciones">
                <Link href="/servicios" className="btn btn--claro">Divisiones</Link>
                <Link href="/nosotros" className="btn btn--claro" style={{ background: 'transparent', color: '#fff' }}>El holding</Link>
              </div>
            </div>
            <Image src="/isotipo-blanco.png" alt="" width={640} height={639} className="hero__iso" priority />
          </div>

          <div className="hero__datos">
            <div className="hero__dato">
              <strong>05</strong>
              <span>Divisiones operativas</span>
            </div>
            <div className="hero__dato">
              <strong>03</strong>
              <span>Rutas logísticas</span>
            </div>
            <div className="hero__dato">
              <strong>01</strong>
              <span>Voz corporativa</span>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <div className="adn">
            <div>
              <Eyebrow>El ADN del holding</Eyebrow>
              <h2 className="titulo">Estabilidad y crecimiento</h2>
              <p className="plomo" style={{ marginTop: 24, marginBottom: 34 }}>
                La identidad de MAPI GLOBAL se construye sobre dos capas. Una base sólida que contiene
                el valor patrimonial, y una estructura dinámica de líneas ascendentes a 45 grados que
                proyecta movimiento continuo.
              </p>
              <div className="adn__capas">
                <article className="capa">
                  <span className="capa__id">Capa 01</span>
                  <h3>El contenedor de valor</h3>
                  <p>
                    Evoca estabilidad absoluta, confianza institucional y seguridad patrimonial. Es el
                    ancla de un holding enfocado en infraestructura dura.
                  </p>
                </article>
                <article className="capa">
                  <span className="capa__id">Capa 02</span>
                  <h3>La estructura dinámica</h3>
                  <p>
                    Líneas ascendentes a 45 grados que proyectan crecimiento continuo y movimiento
                    perpetuo hacia el futuro.
                  </p>
                </article>
              </div>
            </div>
            <GraficoADN />
          </div>
        </div>
      </section>

      <section className="seccion seccion--linea">
        <div className="contenedor">
          <Eyebrow>Divisiones</Eyebrow>
          <h2 className="titulo" style={{ marginBottom: 40 }}>Cinco frentes, una estructura</h2>
          <Divisiones items={servicios} cta />
        </div>
      </section>

      <section className="seccion seccion--navy">
        <div className="contenedor">
          <Eyebrow>Tríada logística global</Eyebrow>
          <h2 className="titulo" style={{ marginBottom: 22 }}>Tres rutas, un mapa</h2>
          <p className="plomo" style={{ maxWidth: 640, marginBottom: 44 }}>
            El isotipo no solo proyecta crecimiento financiero: es un mapa literal de nuestras rutas de
            transportación.
          </p>
          <Triada />
          <div style={{ marginTop: 44 }}>
            <Link href="/servicios/logistica" className="btn btn--claro">Ver división de logística</Link>
          </div>
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
