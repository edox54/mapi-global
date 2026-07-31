'use client';

import { motion } from 'motion/react';

// Transición de página: cortina navy con filo dorado + entrada del contenido.
export default function Template({ children }) {
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
