'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Transición de página: cortina clara con filo de acento + entrada del contenido.
export default function Template({ children }) {
  // simpleParallax pedido por el cliente para el efecto de scroll parallax en
  // imágenes. Template remonta en cada navegación (a diferencia de layout.js),
  // así que reinicializar aquí cubre todas las imágenes de la página nueva.
  // Import dinámico: el paquete toca `document` en su nivel superior, y un
  // import estático se evalúa también durante el SSR de este componente
  // 'use client' (SSR + hidratación siguen aplicando), lo que rompía el
  // render entero con "document is not defined". Dentro del useEffect nunca
  // se ejecuta en servidor, así que el import() aquí es seguro.
  // El refresh() de ScrollTrigger corrige posiciones si algo (imagen, fuente)
  // desplaza el layout después de que los Reveal ya calcularon su disparador.
  useEffect(() => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => {
      const tarea = reducido
        ? Promise.resolve()
        : import('simple-parallax-js/vanilla').then(({ default: simpleParallax }) => {
            const imagenes = document.querySelectorAll('.img-parallax');
            if (imagenes.length) new simpleParallax(imagenes, { scale: 1.25, delay: 0.5, overflow: false, orientation: 'up' });
          });
      tarea.finally(() => ScrollTrigger.refresh());
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div
        className="cortina"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      />
      <motion.main
        id="contenido"
        className="pagina"
        initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
