import Link from 'next/link';
import Image from 'next/image';
import { servicios } from '../lib/servicios';
import { site } from '../lib/site';

export default function Footer() {
  return (
    <footer className="pie">
      <div className="contenedor pie__grid">
        <div className="pie__marca">
          <Image src="/isotipo-blanco.png" alt="MAPI GLOBAL" width={640} height={639} />
          <p className="pie__tagline">{site.tagline}</p>
        </div>

        <div>
          <h2 className="pie__titulo">Navegación</h2>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="pie__titulo">Divisiones</h2>
          <ul>
            {servicios.map((s) => (
              <li key={s.slug}><Link href={`/servicios/${s.slug}`}>{s.titulo}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="pie__titulo">Contacto</h2>
          <ul className="pie__datos">
            <li><a href={`mailto:${site.contacto.correo}`}>{site.contacto.correo}</a></li>
            <li><a href={`tel:${site.contacto.telefono.replace(/\s/g, '')}`}>{site.contacto.telefono}</a></li>
            <li>{site.contacto.direccion}</li>
            <li>{site.contacto.ciudad}</li>
          </ul>
        </div>
      </div>

      <div className="contenedor pie__base">
        <p>© {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.</p>
        <p>Holding empresarial internacional</p>
      </div>
    </footer>
  );
}
