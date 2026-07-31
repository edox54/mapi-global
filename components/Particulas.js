'use client';

import { useEffect, useRef } from 'react';

// ponytail: canvas mínimo — puntos a la deriva que se apartan del cursor.
export default function Particulas({ cantidad = 70, color = '255,255,255', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const raton = { x: -999, y: -999 };
    let puntos = [];
    let raf;

    const medir = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      puntos = Array.from({ length: cantidad }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.5,
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        a: 0,
        meta: Math.random() * 0.45 + 0.12,
        tx: 0,
        ty: 0,
      }));
    };

    const mover = (e) => {
      const r = canvas.getBoundingClientRect();
      raton.x = e.clientX - r.left;
      raton.y = e.clientY - r.top;
    };

    const pintar = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const p of puntos) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = p.x + p.tx - raton.x;
        const dy = p.y + p.ty - raton.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          const f = (90 - dist) / 90;
          p.tx += (dx / dist) * f * 1.6;
          p.ty += (dy / dist) * f * 1.6;
        } else {
          p.tx -= p.tx / 24;
          p.ty -= p.ty / 24;
        }

        p.a += (p.meta - p.a) * 0.02;
        ctx.beginPath();
        ctx.arc(p.x + p.tx, p.y + p.ty, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(pintar);
    };

    medir();
    pintar();
    window.addEventListener('resize', medir);
    window.addEventListener('mousemove', mover);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', medir);
      window.removeEventListener('mousemove', mover);
    };
  }, [cantidad, color]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
