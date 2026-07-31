'use client';

import { usePathname } from 'next/navigation';

// ponytail: remount por ruta = la animación CSS se reinicia sola, sin librería de transiciones.
export default function Fade({ children }) {
  return <main key={usePathname()} className="fade">{children}</main>;
}
