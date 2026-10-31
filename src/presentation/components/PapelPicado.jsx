// Guirnalda decorativa de papel picado (Día de Muertos), en blanco y negro semitransparente.
// Cada bandera es un rectángulo con calados hechos con <mask>: blanco = papel, negro = hueco.

const MOTIVOS = ["calavera", "flor", "cruz", "corazon"];
const BANDERAS = 30;

// Borde inferior en picos
const PICOS = Array.from({ length: 10 }, (_, k) => 9 - k)
  .map((i) => `L${i * 10 + 5} 128 L${i * 10} 120`)
  .join(" ");
const SILUETA = `M0 6 H100 V120 ${PICOS} Z`;

function Marco() {
  // Calados del marco: rombos en los lados y círculos arriba/abajo
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={`a${i}`} cx={10 + i * 11.5} cy="15" r="2.4" fill="#000" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={`b${i}`} cx={10 + i * 11.5} cy="110" r="2.4" fill="#000" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <g key={`l${i}`} fill="#000">
          <path d={`M8 ${25 + i * 11.5} l3 4 l-3 4 l-3 -4 Z`} />
          <path d={`M92 ${25 + i * 11.5} l3 4 l-3 4 l-3 -4 Z`} />
        </g>
      ))}
      <rect x="16" y="22" width="68" height="82" rx="6" fill="none" stroke="#000" strokeWidth="1.6" strokeDasharray="4 3" />
    </>
  );
}

function Motivo({ tipo }) {
  switch (tipo) {
    case "calavera":
      return (
        <g transform="translate(50 62)">
          <path d="M-17 -4 a17 17 0 1 1 34 0 c0 8 -4 12 -8 14 v9 h-18 v-9 c-4 -2 -8 -6 -8 -14 Z" fill="#000" />
          {/* ojos, nariz y dientes quedan de papel */}
          <circle cx="-7" cy="-2" r="5.2" fill="#fff" />
          <circle cx="7" cy="-2" r="5.2" fill="#fff" />
          <circle cx="-7" cy="-2" r="2" fill="#000" />
          <circle cx="7" cy="-2" r="2" fill="#000" />
          <path d="M0 5 l-3 5 h6 Z" fill="#fff" />
          {[-6, -2, 2, 6].map((x) => (
            <rect key={x} x={x - 1} y="13" width="2" height="5" fill="#fff" />
          ))}
          {/* flores en la frente */}
          <circle cx="0" cy="-13" r="2.6" fill="#fff" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 4.4} cy={-13 + Math.sin((a * Math.PI) / 180) * 4.4} r="1.5" fill="#fff" />
          ))}
        </g>
      );
    case "flor": // cempasúchil
      return (
        <g transform="translate(50 62)">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return <ellipse key={i} cx={Math.cos(a) * 15} cy={Math.sin(a) * 15} rx="6" ry="3.6" transform={`rotate(${i * 30} ${Math.cos(a) * 15} ${Math.sin(a) * 15})`} fill="#000" />;
          })}
          <circle r="9" fill="#000" />
          <circle r="4.5" fill="#fff" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(a) * 26} cy={Math.sin(a) * 26} r="1.8" fill="#000" />;
          })}
        </g>
      );
    case "cruz":
      return (
        <g transform="translate(50 62)" fill="#000">
          <path d="M-4 -26 h8 v14 h14 v8 h-14 v26 h-8 v-26 h-14 v-8 h14 Z" />
          <circle cx="-17" cy="16" r="3" />
          <circle cx="17" cy="16" r="3" />
          <path d="M-20 -22 l4 4 l-4 4 l-4 -4 Z" />
          <path d="M20 -22 l4 4 l-4 4 l-4 -4 Z" />
        </g>
      );
    default: // corazón con llamas de vela
      return (
        <g transform="translate(50 64)">
          <path d="M0 18 C-26 2 -20 -18 -8 -18 C-3 -18 0 -14 0 -10 C0 -14 3 -18 8 -18 C20 -18 26 2 0 18 Z" fill="#000" />
          <path d="M0 8 C-12 0 -9 -10 -4 -10 C-2 -10 0 -8 0 -6 C0 -8 2 -10 4 -10 C9 -10 12 0 0 8 Z" fill="#fff" />
          <path d="M-14 -30 q-4 6 0 9 q4 -3 0 -9 Z M14 -30 q-4 6 0 9 q4 -3 0 -9 Z M0 -34 q-4 6 0 9 q4 -3 0 -9 Z" fill="#000" />
        </g>
      );
  }
}

export default function PapelPicado() {
  return (
    <div className="papel-picado" aria-hidden="true">
      {/* Definición de los calados, compartida por todas las banderas */}
      <svg width="0" height="0" className="papel-defs">
        <defs>
          {MOTIVOS.map((m) => (
            <mask key={m} id={`calado-${m}`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="130">
              <rect width="100" height="130" fill="#fff" />
              <Marco />
              <Motivo tipo={m} />
            </mask>
          ))}
        </defs>
      </svg>

      <svg className="papel-cordel" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 3 Q50 7 100 3" />
      </svg>

      <ul className="papel-banderas">
        {Array.from({ length: BANDERAS }, (_, i) => {
          // Rota el motivo para que cada uno aparezca en banderas blancas y negras
          const motivo = MOTIVOS[(i + Math.floor(i / 4)) % MOTIVOS.length];
          const tono = i % 2 ? "negra" : "blanca";
          return (
            <li key={i} className={`bandera bandera-${tono}`} style={{ "--retraso": `${(i % 5) * -0.7}s` }}>
              <svg viewBox="0 0 100 130">
                <path d={SILUETA} mask={`url(#calado-${motivo})`} />
                <rect className="pliegue" x="0" y="0" width="100" height="6" />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
