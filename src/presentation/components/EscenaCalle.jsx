// Ilustración de una calle de Oaxaca. Los colores salen del CSS según el modo:
//   "normal"  → como la vemos
//   "termica" → como la "ve" un satélite térmico (paleta de los mapas de calor)

function Edificio({ x, y, w, h, muro, techo, ventanas = 3, pisos = 3 }) {
  const vw = (w - 16 * (ventanas + 1)) / ventanas;
  return (
    <g>
      <rect className={muro} x={x} y={y} width={w} height={h} />
      {techo === "lamina" ? (
        <path className="lamina" d={`M${x - 6} ${y + 2} L${x + w / 2} ${y - 14} L${x + w + 6} ${y + 2} Z`} />
      ) : (
        <rect className="techo-plano" x={x - 4} y={y - 8} width={w + 8} height={10} rx="2" />
      )}
      {Array.from({ length: pisos }, (_, p) =>
        Array.from({ length: ventanas }, (_, v) => (
          <rect
            key={`${p}-${v}`}
            className="ventana"
            x={x + 16 + v * (vw + 16)}
            y={y + 18 + p * 46}
            width={vw}
            height={26}
            rx="2"
          />
        )),
      )}
    </g>
  );
}

function Arbol({ x, s = 1 }) {
  return (
    <g transform={`translate(${x} 300) scale(${s})`}>
      <ellipse className="sombra" cx="10" cy="22" rx="62" ry="12" />
      <rect className="tronco" x="-6" y="-70" width="12" height="72" rx="3" />
      <circle className="copa" cx="0" cy="-92" r="40" />
      <circle className="copa-2" cx="-30" cy="-72" r="28" />
      <circle className="copa-2" cx="30" cy="-74" r="30" />
      <circle className="copa" cx="4" cy="-120" r="26" />
    </g>
  );
}

export default function EscenaCalle({ modo, etiquetas }) {
  return (
    <svg className={`escena escena-${modo}`} viewBox="0 0 800 420" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cielo-dia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd6ff" />
          <stop offset="1" stopColor="#e9f6ff" />
        </linearGradient>
      </defs>

      <rect className="escena-cielo" width="800" height="310" />
      <circle className="escena-sol" cx="96" cy="64" r="32" />
      <g className="cerros">
        <path d="M0 250 Q120 170 240 230 T480 220 T800 210 V310 H0 Z" />
      </g>

      {/* Zona construida: concreto y lámina */}
      <Edificio x={18} y={150} w={130} h={150} muro="muro" techo="lamina" ventanas={2} pisos={3} />
      <Edificio x={162} y={96} w={150} h={204} muro="muro-2" techo="plano" ventanas={3} pisos={4} />
      <Edificio x={326} y={172} w={120} h={128} muro="muro" techo="lamina" ventanas={2} pisos={2} />

      {/* Zona con árboles */}
      <rect className="pasto" x="452" y="262" width="348" height="40" />
      <Arbol x={520} s={1.05} />
      <Arbol x={640} s={0.95} />
      <Arbol x={750} s={1.1} />

      {/* Banqueta y calle */}
      <rect className="banqueta" y="300" width="800" height="24" />
      <rect className="asfalto" y="324" width="800" height="96" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} className="raya" x={20 + i * 92} y="368" width="48" height="6" rx="3" />
      ))}

      {/* Auto */}
      <g transform="translate(150 334)">
        <rect className="auto" x="0" y="14" width="150" height="34" rx="12" />
        <path className="auto" d="M28 16 L48 -6 H104 L126 16 Z" />
        <path className="auto-vidrio" d="M50 12 L60 0 H78 V12 Z M84 12 V0 H100 L112 12 Z" />
        <circle className="rueda" cx="34" cy="48" r="13" />
        <circle className="rueda" cx="118" cy="48" r="13" />
      </g>

      {/* Persona caminando a la sombra */}
      <g className="persona" transform="translate(636 266)">
        <circle cx="0" cy="0" r="8" />
        <path d="M-7 10 H7 L9 36 H3 L2 56 H-3 L-4 36 H-9 Z" />
      </g>

      {etiquetas && (
        <g className="etiquetas">
          {etiquetas.map((e) => (
            <g key={e.texto} transform={`translate(${e.x} ${e.y})`}>
              <rect x={-e.texto.length * 4.3 - 12} y="-15" width={e.texto.length * 8.6 + 24} height="28" rx="14" />
              <text textAnchor="middle" dy="5">
                {e.texto}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
