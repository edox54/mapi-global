'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';

const CURVA = [0.16, 1, 0.3, 1];

// Revelado al entrar en viewport: fade + desenfoque + desplazamiento + escala.
export function Reveal({ children, delay = 0, y = 44, blur = 14, className, as = 'div', escala = 0.965 }) {
  const reducido = useReducedMotion();
  const Componente = motion[as] || motion.div;
  return (
    <Componente
      className={className}
      initial={reducido ? { opacity: 0 } : { opacity: 0, y, scale: escala, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.95, delay, ease: CURVA }}
    >
      {children}
    </Componente>
  );
}

// Contenedor que escalona la entrada de sus hijos <Item>.
export function Grupo({ children, className, escalonado = 0.11, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ visible: { transition: { staggerChildren: escalonado, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className, y = 46 }) {
  const reducido = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        oculto: reducido ? { opacity: 0 } : { opacity: 0, y, scale: 0.96, filter: 'blur(12px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.9, ease: CURVA }}
    >
      {children}
    </motion.div>
  );
}

// Titular que entra palabra por palabra desde abajo, con máscara.
export function PalabrasEntrada({ texto, className, delay = 0, etiqueta = 'h1' }) {
  const reducido = useReducedMotion();
  const Tag = motion[etiqueta] || motion.h1;
  if (reducido) return <Tag className={className}>{texto}</Tag>;
  return (
    <Tag
      className={className}
      initial="oculto"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: delay } } }}
    >
      {texto.split(' ').map((palabra, i) => (
        <span key={i} className="palabra">
          <motion.span
            className="palabra__int"
            variants={{
              oculto: { y: '110%', rotate: 6, opacity: 0 },
              visible: { y: '0%', rotate: 0, opacity: 1 },
            }}
            transition={{ duration: 1.1, ease: CURVA }}
          >
            {palabra}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Líneas de texto que se revelan detrás de una máscara.
// El observador va en el contenedor: si se pusiera en el hijo, el overflow:hidden
// lo recortaría por completo y `whileInView` nunca dispararía.
export function LineaEntrada({ children, className, delay = 0 }) {
  const reducido = useReducedMotion();
  if (reducido) return <div className={className}>{children}</div>;
  return (
    <motion.span
      className="linea-mask"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.span
        className={`linea-mask__int ${className || ''}`}
        variants={{ oculto: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1 } }}
        transition={{ duration: 1, delay, ease: CURVA }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

// Contador que se anima al entrar en pantalla.
export function Contador({ valor, digitos = 2 }) {
  const ref = useRef(null);
  const enVista = useInView(ref, { once: true, margin: '-40px' });
  const reducido = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 80 });
  const [texto, setTexto] = useState(String(0).padStart(digitos, '0'));

  useEffect(() => {
    if (enVista) mv.set(valor);
  }, [enVista, valor, mv]);

  useEffect(() => spring.on('change', (v) => setTexto(String(Math.round(v)).padStart(digitos, '0'))), [spring, digitos]);

  if (reducido) return <span>{String(valor).padStart(digitos, '0')}</span>;
  return <span ref={ref}>{texto}</span>;
}

// Imagen de fondo con zoom lento continuo (Ken Burns).
export function FondoZoom({ src, alt = '', className = '', duracion = 18 }) {
  const reducido = useReducedMotion();
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ scale: 1.04 }}
      animate={reducido ? { scale: 1.04 } : { scale: 1.16 }}
      transition={{ duration: duracion, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );
}

// Desplazamiento diferencial al hacer scroll.
export function Parallax({ children, distancia = 90, className }) {
  const ref = useRef(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distancia, -distancia]);
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={reducido ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

// Línea que se dibuja al entrar en pantalla.
export function LineaOro({ className = '' }) {
  return (
    <motion.span
      className={`linea-oro ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: CURVA }}
      aria-hidden="true"
    />
  );
}
