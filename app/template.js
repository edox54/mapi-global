'use client';

import { motion } from 'motion/react';

// Transición de página: fade sutil en cada cambio de ruta (template remonta por ruta).
export default function Template({ children }) {
  return (
    <motion.main
      id="contenido"
      className="pagina"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
