import { useT } from "../i18n/useT";
import { CIUDAD, VALLES_CENTRALES, aVista, formatearCoord, rectVista, trazoContorno } from "../../domain/oaxaca";

const CONTORNO = trazoContorno();
const [PX, PY] = aVista(CIUDAD.lon, CIUDAD.lat);
const VALLES = rectVista(VALLES_CENTRALES);
const GRADOS_LON = [-98, -97, -96, -95, -94];
const GRADOS_LAT = [15, 16, 17, 18, 19];

/** Ilustración de Oaxaca (perímetro INEGI) con el estilo del planeta: halos blancos sobre verde. */
export default function MapaOaxaca() {
  const t = useT();
  return (
    <div className="mapa">
      <svg viewBox="0 0 100 100" role="img" aria-label={t.mapa.aria}>
        <defs>
          <radialGradient id="mapa-fondo" cx="45%" cy="40%" r="70%">
            <stop offset="0" className="mapa-c1" />
            <stop offset="0.6" className="mapa-c2" />
            <stop offset="1" className="mapa-c3" />
          </radialGradient>
          <linearGradient id="mapa-estado" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="mapa-e1" />
            <stop offset="1" className="mapa-e2" />
          </linearGradient>
          <pattern id="mapa-bosque" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.55" className="mapa-punto" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill="url(#mapa-fondo)" />

        {/* Retícula de coordenadas */}
        <g className="mapa-reticula">
          {GRADOS_LON.map((lon) => {
            const [x] = aVista(lon, 17);
            return <line key={lon} x1={x} y1="0" x2={x} y2="100" />;
          })}
          {GRADOS_LAT.map((lat) => {
            const [, y] = aVista(-96, lat);
            return <line key={lat} x1="0" y1={y} x2="100" y2={y} />;
          })}
        </g>

        {/* Halo: contornos concéntricos alrededor del perímetro, como curvas de nivel */}
        <g className="mapa-halo">
          {[9, 6, 3.5].map((w) => (
            <path key={w} d={CONTORNO} strokeWidth={w} />
          ))}
        </g>

        <text className="mapa-mar" x="30" y="88">{t.mapa.oceano}</text>
        <text className="mapa-vecino" x="62" y="22">Veracruz</text>
        <text className="mapa-vecino" x="22" y="18">Puebla</text>

        {/* Estado */}
        <path className="mapa-estado" d={CONTORNO} pathLength="1" />
        <path className="mapa-estado-textura" d={CONTORNO} />

        {/* Zona de estudio */}
        <rect className="mapa-valles" x={VALLES.x} y={VALLES.y} width={VALLES.w} height={VALLES.h} rx="1.2" />

        {/* Ciudad */}
        <g transform={`translate(${PX} ${PY})`}>
          <g className="mapa-pin">
            <circle className="pin-onda" r="2" />
            <circle className="pin-onda pin-onda-2" r="2" />
            <circle className="pin-punto" r="1.5" />
          </g>
        </g>
      </svg>

      <span className="mapa-barrido" aria-hidden="true" />

      <div className="mapa-etiqueta" style={{ left: `${PX + 9}%`, top: `${PY - 4}%` }}>
        <b>{CIUDAD.nombre}</b>
        <span>{formatearCoord(CIUDAD.lat, CIUDAD.lon, t.oeste)}</span>
      </div>
      <div className="mapa-etiqueta mapa-etiqueta-valles" style={{ left: `${VALLES.x - 2}%`, top: `${VALLES.y + VALLES.h + 2}%` }}>
        <span>{t.mapa.valles}</span>
      </div>
    </div>
  );
}
