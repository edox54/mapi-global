'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CURVA = 'power3.out';

function reducido() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ScrollTrigger marca isActive=true para un elemento que ya está en pantalla
// al crearse, pero no dispara onEnter retroactivamente. onRefresh sí corre
// tras cada recálculo de layout (incluida la creación), así que ahí se
// detecta con seguridad el caso "ya visible" sin depender de una medición
// síncrona puntual (que puede leer un viewport aún sin asentar).
function alEntrar(el, umbral, animar) {
  let jugado = false;
  const jugar = () => {
    if (!jugado) { jugado = true; animar(); }
  };
  return ScrollTrigger.create({
    trigger: el,
    start: `top ${umbral * 100}%`,
    once: true,
    onEnter: jugar,
    onRefresh: (self) => { if (self.isActive) jugar(); },
  });
}

// Revelado al entrar en viewport: fade + desenfoque + desplazamiento + escala.
// Motor: GSAP + ScrollTrigger (scroll reveal / fade-in / slide-in pedidos por el cliente).
export function Reveal({ children, delay = 0, y = 44, blur = 14, className, as = 'div', escala = 0.965 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducido()) { gsap.set(el, { opacity: 1 }); return; }
    gsap.set(el, { opacity: 0, y, scale: escala, filter: `blur(${blur}px)` });
    const animar = () => gsap.to(el, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.95, delay, ease: CURVA });
    const st = alEntrar(el, 0.9, animar);
    return () => st.kill();
  }, [delay, y, blur, escala]);

  const Tag = as;
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

// Titular que entra palabra por palabra desde abajo, con máscara (al montar, no al hacer scroll).
export function PalabrasEntrada({ texto, className, delay = 0, etiqueta = 'h1' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll('.palabra__int');
    if (reducido()) { gsap.set(spans, { opacity: 1, y: '0%' }); return; }
    const tw = gsap.fromTo(
      spans,
      { y: '110%', rotate: 6, opacity: 0 },
      { y: '0%', rotate: 0, opacity: 1, duration: 1.1, delay, stagger: 0.14, ease: CURVA }
    );
    return () => tw.kill();
  }, [texto, delay]);

  const Tag = etiqueta;
  return (
    <Tag ref={ref} className={className}>
      {texto.split(' ').map((palabra, i) => (
        <span key={i} className="palabra">
          <span className="palabra__int">{palabra}</span>
        </span>
      ))}
    </Tag>
  );
}

// Líneas de texto que se revelan detrás de una máscara al hacer scroll.
export function LineaEntrada({ children, className, delay = 0 }) {
  const contRef = useRef(null);
  const intRef = useRef(null);

  useEffect(() => {
    const cont = contRef.current;
    const inner = intRef.current;
    if (!cont || !inner) return;
    if (reducido()) { gsap.set(inner, { opacity: 1, y: '0%' }); return; }
    gsap.set(inner, { y: '110%', opacity: 0 });
    const animar = () => gsap.to(inner, { y: '0%', opacity: 1, duration: 1, delay, ease: CURVA });
    const st = alEntrar(cont, 0.92, animar);
    return () => st.kill();
  }, [delay]);

  return (
    <span className="linea-mask" ref={contRef}>
      <span className={`linea-mask__int ${className || ''}`} ref={intRef}>{children}</span>
    </span>
  );
}

// Contador que se anima al entrar en pantalla.
export function Contador({ valor, digitos = 2 }) {
  const ref = useRef(null);
  const [texto, setTexto] = useState(String(0).padStart(digitos, '0'));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducido()) { setTexto(String(valor).padStart(digitos, '0')); return; }
    const obj = { v: 0 };
    const animar = () => gsap.to(obj, {
      v: valor, duration: 1.4, ease: 'power2.out',
      onUpdate: () => setTexto(String(Math.round(obj.v)).padStart(digitos, '0')),
    });
    const st = alEntrar(el, 0.94, animar);
    return () => st.kill();
  }, [valor, digitos]);

  return <span ref={ref}>{texto}</span>;
}

// Línea que se dibuja (scaleX 0→1) al entrar en pantalla.
export function LineaAcento({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { transformOrigin: 'left center' });
    if (reducido()) { gsap.set(el, { scaleX: 1 }); return; }
    gsap.set(el, { scaleX: 0 });
    const animar = () => gsap.to(el, { scaleX: 1, duration: 1.2, ease: CURVA });
    const st = alEntrar(el, 0.96, animar);
    return () => st.kill();
  }, []);

  return <span ref={ref} className={`linea-acento ${className}`} aria-hidden="true" />;
}

// Zoom lento continuo (Ken Burns) sobre una imagen, vía GSAP yoyo infinito.
export function useZoomLento(ref, activo = true, duracion = 20) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !activo || reducido()) return;
    gsap.set(el, { scale: 1.03 });
    const tw = gsap.to(el, { scale: 1.14, duration: duracion, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    return () => tw.kill();
  }, [ref, activo, duracion]);
}
