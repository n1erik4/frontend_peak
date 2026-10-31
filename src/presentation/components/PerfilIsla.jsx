// Perfil de una isla de calor: corte de la ciudad (campo → centro → parque → campo)
// con la curva de temperatura encima, coloreada con la paleta térmica.

const CURVA =
  "M0 178 C70 176 110 166 170 146 S280 84 350 72 S440 74 478 112 S520 140 544 134 S600 108 640 112 S730 166 800 172";

function Casa({ x, w = 34, h = 26 }) {
  return <path className="silueta" d={`M${x} 260 V${260 - h} L${x + w / 2} ${260 - h - 14} L${x + w} ${260 - h} V260 Z`} />;
}
function Torre({ x, w, h }) {
  return <rect className="silueta" x={x} y={260 - h} width={w} height={h} />;
}
function Arbolito({ x, r = 14 }) {
  return (
    <g className="silueta-arbol">
      <rect x={x - 2} y={260 - r - 10} width="4" height={r + 10} />
      <circle cx={x} cy={260 - r - 14} r={r} />
    </g>
  );
}

export default function PerfilIsla({ zonas, caliente, fresco }) {
  // Posiciones (x) de las etiquetas de zona
  const X = [62, 205, 375, 515, 625, 745];
  return (
    <svg className="perfil" viewBox="0 0 800 300" role="img" aria-label={zonas.join(" · ")}>
      <defs>
        <linearGradient id="perfil-termico" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4575b4" />
          <stop offset="0.18" stopColor="#abd9e9" />
          <stop offset="0.3" stopColor="#fdae61" />
          <stop offset="0.44" stopColor="#d73027" />
          <stop offset="0.56" stopColor="#f46d43" />
          <stop offset="0.67" stopColor="#74add1" />
          <stop offset="0.8" stopColor="#fdae61" />
          <stop offset="1" stopColor="#4575b4" />
        </linearGradient>
        <linearGradient id="perfil-desvanece" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="perfil-mascara">
          <rect width="800" height="300" fill="url(#perfil-desvanece)" />
        </mask>
      </defs>

      {/* Área bajo la curva */}
      <path className="perfil-area" d={`${CURVA} V260 H0 Z`} fill="url(#perfil-termico)" mask="url(#perfil-mascara)" />
      <path className="perfil-curva" d={CURVA} stroke="url(#perfil-termico)" pathLength="1" />

      {/* Marcas de máximo y mínimo */}
      <g className="perfil-marca">
        <circle cx="352" cy="72" r="7" fill="#d73027" />
        <text x="352" y="50" textAnchor="middle">{caliente}</text>
      </g>
      <g className="perfil-marca">
        <circle cx="540" cy="135" r="7" fill="#4575b4" />
        <text x="540" y="164" textAnchor="middle">{fresco}</text>
      </g>

      {/* Silueta de la ciudad */}
      <g>
        <Arbolito x={20} />
        <Casa x={40} />
        <Arbolito x={92} r={12} />
        <Casa x={150} />
        <Casa x={190} w={30} h={22} />
        <Casa x={228} />
        <Torre x={290} w={34} h={90} />
        <Torre x={328} w={46} h={130} />
        <Torre x={378} w={30} h={104} />
        <Torre x={412} w={40} h={76} />
        <Arbolito x={486} r={16} />
        <Arbolito x={516} r={20} />
        <Arbolito x={548} r={15} />
        <Casa x={580} />
        <Casa x={620} w={30} h={22} />
        <Casa x={656} />
        <Arbolito x={714} r={13} />
        <Arbolito x={746} r={16} />
        <Arbolito x={778} r={11} />
        <rect className="silueta" y="260" width="800" height="3" />
      </g>

      {zonas.map((z, i) => (
        <text key={i} className="perfil-zona" x={X[i]} y="286" textAnchor="middle">
          {z}
        </text>
      ))}
    </svg>
  );
}
