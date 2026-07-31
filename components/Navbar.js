'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'motion/react';
import { servicios } from '../lib/servicios';

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [compacta, setCompacta] = useState(false);
  const path = usePathname();
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const alScroll = () => setCompacta(window.scrollY > 40);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  const activo = (href) => (href === '/' ? path === '/' : path.startsWith(href));
  const cerrar = () => setAbierto(false);

  return (
    <header className={`nav ${compacta ? 'is-compacta' : ''}`}>
      <div className="nav__inner">
        <Link href="/" className="nav__marca" onClick={cerrar} aria-label="MAPI GLOBAL — Inicio">
          <Image src="/isotipo.png" alt="" width={640} height={639} priority />
          <span>MAPI GLOBAL</span>
        </Link>

        <button
          className="nav__toggle"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={abierto ? 'is-x' : ''} />
        </button>

        <nav className={`nav__menu ${abierto ? 'is-abierto' : ''}`}>
          <Link href="/" onClick={cerrar} className={activo('/') ? 'is-activo' : ''}>Inicio</Link>
          <Link href="/nosotros" onClick={cerrar} className={activo('/nosotros') ? 'is-activo' : ''}>Nosotros</Link>

          <div className="nav__grupo">
            <Link href="/servicios" onClick={cerrar} className={activo('/servicios') ? 'is-activo' : ''}>
              Servicios
              <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </Link>
            <div className="nav__desplegable">
              {servicios.map((s) => (
                <Link key={s.slug} href={`/servicios/${s.slug}`} onClick={cerrar} className={path === `/servicios/${s.slug}` ? 'is-activo' : ''}>
                  {s.titulo}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contacto" onClick={cerrar} className={`nav__cta ${activo('/contacto') ? 'is-activo' : ''}`}>Contacto</Link>
        </nav>
      </div>
      <motion.div className="nav__progreso" style={{ scaleX: progreso }} aria-hidden="true" />
    </header>
  );
}
