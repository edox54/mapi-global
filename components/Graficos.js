import { servicios } from '../lib/servicios';

// Estabilidad (base sólida) + Crecimiento (líneas ascendentes a 45°).
// Paleta clara: el bloque de base ya no es un cuadro navy sólido, es plata/gris
// con una línea fina de contorno — el navy queda solo como texto/borde delgado.
export function GraficoADN() {
  return (
    <svg className="adn__grafico" viewBox="0 0 420 360" role="img" aria-label="Diagrama: base sólida y líneas ascendentes a 45 grados">
      <defs>
        <pattern id="rejilla" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="#e2e6ea" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="420" height="316" fill="url(#rejilla)" />

      <g stroke="var(--acento)" strokeWidth="1.2" strokeDasharray="4 4" fill="none">
        <path d="M236 302h118" />
        <path d="M296 302A60 60 0 0 0 278.4 259.6" />
      </g>

      <rect x="36" y="190" width="124" height="124" rx="27" fill="#dde2e7" stroke="var(--navy)" strokeWidth="1.5" />

      <g stroke="var(--acento)" strokeWidth="15" strokeLinecap="butt">
        <path d="M196 262L306 152" />
        <path d="M216 282L326 172" />
        <path d="M236 302L346 192" />
      </g>

      <g fill="var(--acento-oscuro)" fontSize="11" fontFamily="inherit" letterSpacing="1.5" fontWeight="700">
        <text x="36" y="344">CAPA 01 — ESTABILIDAD</text>
        <text x="384" y="344" textAnchor="end">CAPA 02 — CRECIMIENTO</text>
        <text x="300" y="288">45°</text>
      </g>
    </svg>
  );
}

// Un sello paraguas, múltiples industrias.
export function GraficoNodos() {
  const nodos = servicios.map((s, i) => ({
    x: 70 + i * 125,
    y: i % 2 === 0 ? 62 : 106,
    titulo: s.titulo,
  }));

  return (
    <div className="nodos-wrap">
    <svg viewBox="0 0 640 320" className="nodos" role="img" aria-label="MAPI GLOBAL como marca institucional sobre cinco industrias">
      <g stroke="var(--acento)" strokeWidth="1.5" fill="none">
        {nodos.map((n) => (
          <path key={n.titulo} d={`M320 214L${n.x} ${n.y + 15}`} />
        ))}
      </g>
      {nodos.map((n) => (
        <g key={n.titulo}>
          <circle cx={n.x} cy={n.y} r="15" fill="#ffffff" stroke="var(--grafito-claro)" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="5" fill="var(--acento)" />
          <text x={n.x} y={n.y - 26} textAnchor="middle" fontSize="11" fill="var(--grafito)" letterSpacing="1.3">
            {n.titulo.toUpperCase()}
          </text>
        </g>
      ))}
      <image href="/isotipo.png" x="284" y="214" width="72" height="72" />
      <text x="320" y="308" textAnchor="middle" fontSize="12" fill="var(--navy)" fontWeight="700" letterSpacing="2">
        MAPI GLOBAL
      </text>
    </svg>
    </div>
  );
}

// Bloque gráfico de ubicación — geométrico, sin API externa. Fondo plata claro,
// no navy: el mapa ya no es un bloque azul sólido.
export function GraficoMapa() {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-label="Representación esquemática de la ubicación corporativa">
      <rect width="480" height="300" fill="#eaeef1" />
      <g stroke="#d5dbe1" strokeWidth="1">
        {[...Array(11)].map((_, i) => <path key={`v${i}`} d={`M${i * 48} 0V300`} />)}
        {[...Array(7)].map((_, i) => <path key={`h${i}`} d={`M0 ${i * 50}H480`} />)}
      </g>
      <g stroke="var(--grafito-claro)" strokeWidth="6" fill="none">
        <path d="M0 220L120 100M60 300L220 140M200 300L360 140" />
      </g>
      <circle cx="240" cy="150" r="46" fill="none" stroke="var(--grafito-claro)" strokeWidth="1" />
      <circle cx="240" cy="150" r="26" fill="none" stroke="var(--acento)" strokeOpacity="0.9" strokeWidth="1.5" />
      <rect x="230" y="140" width="20" height="20" rx="6" fill="var(--acento)" />
      <text x="240" y="216" textAnchor="middle" fontSize="11" fill="var(--navy)" letterSpacing="2">
        SEDE CORPORATIVA
      </text>
    </svg>
  );
}
