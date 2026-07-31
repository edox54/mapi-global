// Iconografía lineal, trazo uniforme, sin relleno. viewBox 32x32.
const base = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
};

export function IconBienesRaices(p) {
  return (
    <svg {...base} {...p}>
      <path d="M3 29h26M6 29V13l10-7 10 7v16" />
      <path d="M12 29v-8h8v8M12 15h3M17 15h3" />
    </svg>
  );
}

export function IconRefinacion(p) {
  return (
    <svg {...base} {...p}>
      <path d="M4 29h24M7 29V12h11v17M18 18h7v11M7 12l5.5-9L18 12" />
      <path d="M11 17h3M11 22h3M21 22h1" />
    </svg>
  );
}

export function IconLogistica(p) {
  return (
    <svg {...base} {...p}>
      <path d="M28 4L16 16l12 12M22 4L10 16l12 12M16 4L4 16l12 12" />
    </svg>
  );
}

export function IconAeronaves(p) {
  return (
    <svg {...base} {...p}>
      <path d="M2 18l28-9-6 12-8 1-4 7-2-6-8-5z" />
      <path d="M12 22l4-4" />
    </svg>
  );
}

export function IconConstruccion(p) {
  return (
    <svg {...base} {...p}>
      <path d="M3 29h26M7 29V5h14M7 5l18 6M25 11v6M25 17l-4 4M7 12l10 3.5" />
    </svg>
  );
}

export function IconAerea(p) {
  return (
    <svg {...base} {...p}>
      <path d="M2 18l28-9-6 12-8 1-4 7-2-6-8-5z" />
    </svg>
  );
}

export function IconTerrestre(p) {
  return (
    <svg {...base} {...p}>
      <path d="M2 8h16v14H2zM18 13h6l4 5v4h-10z" />
      <circle cx="9" cy="24" r="2.5" />
      <circle cx="23" cy="24" r="2.5" />
    </svg>
  );
}

export function IconMaritima(p) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20h24l-3 7H7l-3-7zM8 20V12h16v8M12 12V7h8v5" />
      <path d="M12 16h8" />
    </svg>
  );
}

export const iconos = {
  'bienes-raices': IconBienesRaices,
  refinacion: IconRefinacion,
  logistica: IconLogistica,
  aeronaves: IconAeronaves,
  construccion: IconConstruccion,
};

export function IconCorreo(p) {
  return (
    <svg {...base} width="16" height="16" viewBox="0 0 24 24" strokeWidth={1.6} {...p}>
      <path d="M2 5h20v14H2zM2 6l10 7 10-7" />
    </svg>
  );
}

export function IconTelefono(p) {
  return (
    <svg {...base} width="16" height="16" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinejoin="round" {...p}>
      <path d="M7 2H3v4c0 8.8 7.2 16 16 16h2v-4l-5-2-2 3a17 17 0 0 1-7-7l3-2-2-5z" />
    </svg>
  );
}

export function IconPin(p) {
  return (
    <svg {...base} width="16" height="16" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinejoin="round" {...p}>
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
