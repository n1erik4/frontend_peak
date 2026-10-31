// Guirnalda decorativa de papel picado (Día de Muertos), semitransparente.
// Colgada como en un tendedero: el cordel se vence entre clavos y las banderas ondean con el viento.
// Cada bandera (150×100, horizontal, borde festoneado) se recorta con <mask>: blanco = papel, negro = hueco.

const MOTIVOS = ["calavera", "flor", "cuatro"];

// ----- Geometría del tendedero (unidades del viewBox) -----
const ALTO = 100;
const POSTE = 320; // distancia entre clavos
const ANCHO = POSTE * 8; // ancho de sobra; se recorta a los lados en pantallas menores
const PASO = 80; // separación entre banderas (4 por tramo)
const CORDEL_Y = 7;
const CAIDA = 12; // cuánto se vence el cordel a la mitad de cada tramo
const ESCALA = 0.38; // bandera de diseño (150×100) → tamaño real

/** Altura y pendiente (grados) del cordel en x: parábola por tramo. */
function cordelEn(x) {
  const t = (x % POSTE) / POSTE;
  return {
    y: CORDEL_Y + CAIDA * 4 * t * (1 - t),
    grados: (Math.atan((CAIDA * 4 * (1 - 2 * t)) / POSTE) * 180) / Math.PI,
  };
}

const CORDEL = Array.from({ length: ANCHO / POSTE }, (_, k) => {
  const x0 = k * POSTE;
  return `${k ? "" : `M0 ${CORDEL_Y} `}Q${x0 + POSTE / 2} ${CORDEL_Y + CAIDA * 2} ${x0 + POSTE} ${CORDEL_Y}`;
}).join(" ");
const CLAVOS = Array.from({ length: ANCHO / POSTE + 1 }, (_, k) => k * POSTE);

// Variación determinista: misma pose en cada carga
const azar = (n) => {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
};

const BANDERAS = Array.from({ length: ANCHO / PASO }, (_, i) => {
  const x = PASO / 2 + i * PASO;
  const { y, grados } = cordelEn(x);
  return {
    i,
    motivo: MOTIVOS[i % MOTIVOS.length],
    tono: i % 2 ? "negra" : "blanca",
    // Posición sobre el cordel + leve inclinación por el viento (de izquierda a derecha)
    base: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(grados * 0.6 - 3 - azar(i + 1) * 4).toFixed(1)})`,
    forma: `skewX(${(-3 - azar(i + 31) * 4).toFixed(1)}) scale(${ESCALA}) translate(-75 -2)`,
    // La ráfaga recorre el cordel de izquierda a derecha
    estilo: { animationDelay: `${(-i * 0.22).toFixed(2)}s`, animationDuration: `${(3 + azar(i + 7) * 1.2).toFixed(2)}s` },
  };
});

// ----- Silueta: doblez arriba y festón (semicírculos) en lados y abajo -----
const R = 5;
const festonDerecha = Array.from({ length: 9 }, (_, k) => `A${R} ${R} 0 0 1 150 ${15 + k * 10}`).join(" ");
const festonAbajo = Array.from({ length: 15 }, (_, k) => `A${R} ${R} 0 0 1 ${140 - k * 10} 95`).join(" ");
const festonIzquierda = Array.from({ length: 9 }, (_, k) => `A${R} ${R} 0 0 1 0 ${85 - k * 10}`).join(" ");
const SILUETA = `M0 5 H150 ${festonDerecha} ${festonAbajo} ${festonIzquierda} Z`;

// ----- Calados -----
const N = "#000"; // hueco
const P = "#fff"; // papel

function Hoja({ x, y, rot, s = 1 }) {
  return (
    <path
      d="M0 0 C5 -5 14 -4 18 2 C12 7 4 6 0 0 Z"
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
      fill={N}
    />
  );
}

function Rama({ x, y, rot, s = 1 }) {
  // Tallo con tres pares de hojitas
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill={N}>
      <rect x="0" y="-0.9" width="22" height="1.8" rx="0.9" />
      {[5, 11, 17].map((d) => (
        <g key={d}>
          <path d={`M${d} 0 c1 -6 5 -8 8 -8 c-1 4 -4 7 -8 8 Z`} />
          <path d={`M${d} 0 c1 6 5 8 8 8 c-1 -4 -4 -7 -8 -8 Z`} />
        </g>
      ))}
      <path d="M22 0 c3 -3 7 -3 8 0 c-1 3 -5 3 -8 0 Z" />
    </g>
  );
}

function Roseta({ x, y, r = 7 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 6 }, (_, k) => {
        const a = (k * 60 * Math.PI) / 180;
        return <circle key={k} cx={Math.cos(a) * r * 0.6} cy={Math.sin(a) * r * 0.6} r={r * 0.5} fill={N} />;
      })}
      <circle r={r * 0.45} fill={P} />
      <circle r={r * 0.2} fill={N} />
    </g>
  );
}

function Marco() {
  return (
    <>
      {/* Hojas en las esquinas apuntando hacia dentro */}
      <Hoja x={10} y={12} rot={30} />
      <Hoja x={140} y={12} rot={150} />
      <Hoja x={10} y={86} rot={-30} />
      <Hoja x={140} y={86} rot={-150} />
      {/* Puntos en los lados */}
      {[30, 40, 50, 60, 70].map((y) => (
        <g key={y} fill={N}>
          <circle cx="11" cy={y} r="2" />
          <circle cx="139" cy={y} r="2" />
        </g>
      ))}
      {/* Fila de puntos arriba */}
      {Array.from({ length: 9 }, (_, k) => (
        <circle key={k} cx={43 + k * 8} cy="13" r="1.6" fill={N} />
      ))}
    </>
  );
}

function Motivo({ tipo }) {
  if (tipo === "calavera") {
    const craneo = "M-26 -4 a26 25 0 1 1 52 0 c0 11 -6 16 -12 18 v11 h-28 v-11 c-6 -2 -12 -7 -12 -18 Z";
    return (
      <g transform="translate(75 50)">
        {/* Contorno del cráneo: anillo calado */}
        <path d={craneo} fill={N} />
        <path d={craneo} transform="scale(0.84)" fill={P} />
        {/* Ojos con florecita */}
        {[-10, 10].map((x) => (
          <g key={x} transform={`translate(${x} -2)`}>
            <ellipse rx="7.5" ry="8.5" fill={N} />
            {Array.from({ length: 5 }, (_, k) => {
              const a = ((k * 72 - 90) * Math.PI) / 180;
              return <circle key={k} cx={Math.cos(a) * 3} cy={Math.sin(a) * 3} r="1.5" fill={P} />;
            })}
          </g>
        ))}
        {/* Nariz de corazón invertido */}
        <path d="M0 13 C-5 8 -4 4 -1.5 4 C-0.5 4 0 5 0 6 C0 5 0.5 4 1.5 4 C4 4 5 8 0 13 Z" fill={N} />
        {/* Dientes */}
        {[-8, -3, 2, 7].map((x) => (
          <rect key={x} x={x - 0.5} y="20" width="2.6" height="5" rx="1" fill={N} />
        ))}
        {/* Puntos en la frente */}
        {[-12, -6, 0, 6, 12].map((x, k) => (
          <circle key={x} cx={x} cy={-17 - (k === 2 ? 2 : 0)} r="1.6" fill={N} />
        ))}
      </g>
    );
  }

  if (tipo === "flor") {
    return (
      <g>
        {/* Rama de hojas arriba */}
        <Rama x={75} y={24} rot={180} s={1.1} />
        <Rama x={75} y={24} rot={0} s={1.1} />
        <path d="M75 17 l-4 7 h8 Z" fill={N} />
        {/* Flor grande en capas */}
        <g transform="translate(75 58)">
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k * 45 * Math.PI) / 180;
            return <circle key={k} cx={Math.cos(a) * 13} cy={Math.sin(a) * 13} r="8" fill={N} />;
          })}
          <circle r="14" fill={N} />
          {Array.from({ length: 8 }, (_, k) => {
            const a = ((k * 45 + 22.5) * Math.PI) / 180;
            return <circle key={k} cx={Math.cos(a) * 9} cy={Math.sin(a) * 9} r="4.6" fill={P} />;
          })}
          <circle r="9" fill={P} />
          <circle r="6" fill={N} />
          <circle r="2.4" fill={P} />
        </g>
        {/* Rosetas laterales y hojitas */}
        <Roseta x={34} y={52} />
        <Roseta x={116} y={52} />
        <Hoja x={42} y={70} rot={-15} s={0.8} />
        <Hoja x={108} y={70} rot={195} s={0.8} />
      </g>
    );
  }

  // "cuatro": flor de cuatro pétalos con ramitas
  return (
    <g>
      <g transform="translate(75 52)">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} d="M0 -5 C-9 -12 -9 -26 0 -30 C9 -26 9 -12 0 -5 Z" transform={`rotate(${r})`} fill={N} />
        ))}
        {[45, 135, 225, 315].map((r) => (
          <path key={r} d="M0 -6 C-4 -10 -4 -16 0 -19 C4 -16 4 -10 0 -6 Z" transform={`rotate(${r})`} fill={N} />
        ))}
        <circle r="3.5" fill={N} />
        {[0, 90, 180, 270].map((r) => (
          <circle key={r} cx="0" cy="-18" r="2.4" transform={`rotate(${r})`} fill={P} />
        ))}
      </g>
      <Rama x={30} y={30} rot={35} s={0.75} />
      <Rama x={120} y={30} rot={145} s={0.75} />
      <Rama x={30} y={74} rot={-35} s={0.75} />
      <Rama x={120} y={74} rot={-145} s={0.75} />
      {[
        [40, 52],
        [110, 52],
        [75, 88],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill={N} />
      ))}
    </g>
  );
}

export default function PapelPicado() {
  return (
    <div className="papel-picado" aria-hidden="true">
      {/* Un solo SVG ancho; en pantallas menores se recorta a los lados (slice) sin deformarse */}
      <svg className="guirnalda" viewBox={`0 0 ${ANCHO} ${ALTO}`} preserveAspectRatio="xMidYMin slice">
        <defs>
          {MOTIVOS.map((m) => (
            <mask key={m} id={`calado-${m}`} maskUnits="userSpaceOnUse" x="-8" y="0" width="166" height="104">
              <rect x="-8" width="166" height="104" fill={P} />
              <Marco />
              <Motivo tipo={m} />
            </mask>
          ))}
          {/* Pliegues del papel */}
          <linearGradient id="tela" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="0.3" stopColor="#000" stopOpacity="0.08" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="0.8" stopColor="#000" stopOpacity="0.07" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        <path className="cordel" d={CORDEL} />
        {CLAVOS.map((x) => (
          <circle key={x} className="clavo" cx={x} cy={CORDEL_Y} r="2.4" />
        ))}

        {BANDERAS.map((b) => (
          <g key={b.i} transform={b.base}>
            <g className={`bandera bandera-${b.tono}`} style={b.estilo}>
              <g transform={b.forma}>
                <path className="cuerpo" d={SILUETA} mask={`url(#calado-${b.motivo})`} />
                <path className="tela" d={SILUETA} mask={`url(#calado-${b.motivo})`} />
                <rect className="pliegue" x="-2" y="0" width="154" height="5" rx="1" />
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
