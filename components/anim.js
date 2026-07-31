'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// Revelado al entrar en viewport: fade + desenfoque + desplazamiento.
export function Reveal({ children, delay = 0, y = 24, blur = true, className, as = 'div' }) {
  const reducido = useReducedMotion();
  const Componente = motion[as] || motion.div;
  return (
    <Componente
      className={className}
      initial={reducido ? { opacity: 0 } : { opacity: 0, y, filter: blur ? 'blur(6px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  );
}

// Titular que entra palabra por palabra.
export function PalabrasEntrada({ texto, className, delay = 0 }) {
  const reducido = useReducedMotion();
  if (reducido) return <h1 className={className}>{texto}</h1>;
  return (
    <motion.h1
      className={className}
      initial="oculto"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {texto.split(' ').map((palabra, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.22em' }}
          variants={{
            oculto: { opacity: 0, y: '0.35em', filter: 'blur(10px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {palabra}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// Contador que se anima al entrar en pantalla.
export function Contador({ valor, digitos = 2 }) {
  const ref = useRef(null);
  const enVista = useInView(ref, { once: true, margin: '-40px' });
  const reducido = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 90 });
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
      initial={{ scale: 1.02 }}
      animate={reducido ? { scale: 1.02 } : { scale: 1.12 }}
      transition={{ duration: duracion, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );
}
