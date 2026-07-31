'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { servicios } from '../lib/servicios';
import { site } from '../lib/site';
import { IconCorreo, IconTelefono, IconPin, iconos } from './Icons';

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [compacta, setCompacta] = useState(false);
  const path = usePathname();
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const { contacto } = site;

  useEffect(() => {
    const alScroll = () => setCompacta(window.scrollY > 60);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  // Bloquea el scroll del documento mientras el panel móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [abierto]);

  const activo = (href) => (href === '/' ? path === '/' : path.startsWith(href));
  const cerrar = () => setAbierto(false);

  const enlaces = [
    { href: '/', texto: 'Inicio' },
    { href: '/nosotros', texto: 'Nosotros' },
  ];

  return (
    <>
    <header className={`nav ${compacta ? 'is-compacta' : ''}`}>
      <div className="barra">
        <div className="barra__inner">
          <a href={`mailto:${contacto.correo}`} className="barra__item">
            <IconCorreo /> <span>{contacto.correo}</span>
          </a>
          <a href={`tel:${contacto.telefono.replace(/\s/g, '')}`} className="barra__item">
            <IconTelefono /> <span>{contacto.telefono}</span>
          </a>
          <span className="barra__item barra__item--dir">
            <IconPin /> <span>{contacto.direccion} — {contacto.ciudad}</span>
          </span>
        </div>
      </div>

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

        {/* Menú de escritorio */}
        <nav className="nav__menu">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} className={activo(e.href) ? 'is-activo' : ''}>{e.texto}</Link>
          ))}

          <div className="nav__grupo">
            <Link href="/servicios" className={activo('/servicios') ? 'is-activo' : ''}>
              Servicios
              <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </Link>
            <div className="nav__desplegable">
              <p className="nav__desplegable-titulo">Divisiones del holding</p>
              {servicios.map((s) => {
                const Icono = iconos[s.slug];
                return (
                  <Link key={s.slug} href={`/servicios/${s.slug}`} className={path === `/servicios/${s.slug}` ? 'is-activo' : ''}>
                    <Icono width={22} height={22} />
                    <span>
                      <strong>{s.titulo}</strong>
                      <em>{s.resumen}</em>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link href="/contacto" className={`nav__cta ${activo('/contacto') ? 'is-activo' : ''}`}>Contacto</Link>
        </nav>
      </div>

      <motion.div className="nav__progreso" style={{ scaleX: progreso }} aria-hidden="true" />

    </header>

      {/* Panel móvil */}
      <AnimatePresence>
        {abierto && (
          <motion.nav
            className="panel"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="panel__inner"
              initial="oculto"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
            >
              {[...enlaces, { href: '/servicios', texto: 'Servicios' }].map((e) => (
                <motion.div key={e.href} variants={item}>
                  <Link href={e.href} onClick={cerrar} className={`panel__link ${activo(e.href) ? 'is-activo' : ''}`}>
                    <span>{e.texto}</span>
                    <i>→</i>
                  </Link>
                </motion.div>
              ))}

              <motion.ul className="panel__sub" variants={item}>
                {servicios.map((s) => {
                  const Icono = iconos[s.slug];
                  return (
                    <li key={s.slug}>
                      <Link href={`/servicios/${s.slug}`} onClick={cerrar} className={path === `/servicios/${s.slug}` ? 'is-activo' : ''}>
                        <Icono width={20} height={20} /> {s.titulo}
                      </Link>
                    </li>
                  );
                })}
              </motion.ul>

              <motion.div variants={item}>
                <Link href="/contacto" onClick={cerrar} className={`panel__link ${activo('/contacto') ? 'is-activo' : ''}`}>
                  <span>Contacto</span>
                  <i>→</i>
                </Link>
              </motion.div>

              <motion.div className="panel__datos" variants={item}>
                <a href={`tel:${contacto.telefono.replace(/\s/g, '')}`}><IconTelefono /> {contacto.telefono}</a>
                <a href={`mailto:${contacto.correo}`}><IconCorreo /> {contacto.correo}</a>
                <p><IconPin /> {contacto.direccion}, {contacto.ciudad}</p>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

const item = {
  oculto: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
