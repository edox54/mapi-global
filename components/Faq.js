'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Acordeón + datos estructurados FAQPage (schema.org) para resultados enriquecidos.
export default function Faq({ items, titulo = 'Preguntas frecuentes' }) {
  const [abierta, setAbierta] = useState(0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };

  return (
    <div className="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ul className="faq__lista">
        {items.map((f, i) => {
          const activa = abierta === i;
          return (
            <li key={f.p} className={`faq__item ${activa ? 'is-abierta' : ''}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={activa}
                  onClick={() => setAbierta(activa ? -1 : i)}
                >
                  <span>{f.p}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {activa && (
                  <motion.div
                    className="faq__respuesta"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p>{f.r}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <span className="sr-only">{titulo}</span>
    </div>
  );
}
