import { useEffect, useState } from "react";
import MapaOaxaca from "./MapaOaxaca";
import { useT } from "../i18n/useT";

/**
 * Secuencia de la portada:
 *   cargando → girando (el planeta entra dando vueltas)
 *            → zoom (acercamiento hacia Oaxaca)
 *            → oaxaca (ilustración del estado con los Valles Centrales)
 * Las duraciones coinciden con las animaciones de global.css (planeta-girar, planeta-zoom/mapa-entrar).
 * Con "reducir movimiento" activado se salta directo al mapa.
 */
const DURACION_MS = { girando: 3000, zoom: 1850 };
const SIGUIENTE = { girando: "zoom", zoom: "oaxaca" };

const sinMovimiento = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function GloboOaxaca() {
  const t = useT();
  const [fase, setFase] = useState("cargando");

  useEffect(() => {
    const ms = DURACION_MS[fase];
    if (!ms) return;
    const id = setTimeout(() => setFase(SIGUIENTE[fase]), ms);
    return () => clearTimeout(id);
  }, [fase]);

  return (
    <div className="globo" data-fase={fase}>
      <img
        className="planeta"
        src="/img/planeta.webp"
        alt=""
        onLoad={() => setFase((f) => (f === "cargando" ? (sinMovimiento() ? "oaxaca" : "girando") : f))}
        onError={() => setFase("oaxaca")}
      />
      <div className="globo-mapa">
        <MapaOaxaca />
      </div>

      {fase === "oaxaca" && !sinMovimiento() && (
        <button type="button" className="globo-repetir" onClick={() => setFase("girando")} aria-label={t.portada.repetir} title={t.portada.repetir}>
          ↻
        </button>
      )}
    </div>
  );
}
