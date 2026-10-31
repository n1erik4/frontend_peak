import { formatearTemp } from "../../domain/diagnostico";
import { useT } from "../i18n/useT";

export default function TarjetasZonas({ zonas, zonaActiva, onZona }) {
  const t = useT();
  if (!zonas.length) return null;
  return (
    <div className="zonas-bloque">
      <h3 className="subtitulo">{t.diag.zonasTitulo}</h3>
      <div className="zonas">
        {zonas.map((z) => (
          <article
            key={z.nombre}
            className={`zona ${zonaActiva === z.nombre ? "activa" : ""}`}
            onMouseEnter={() => onZona(z.nombre)}
            onFocus={() => onZona(z.nombre)}
            tabIndex={0}
          >
            <header>
              <span className="zona-num">{z.prioridad}</span>
              <h4>{z.nombre}</h4>
            </header>
            <div className="zona-datos">
              <div>
                <b>{formatearTemp(z.datos.tMaxProm)}</b>
                <span>{t.diag.maxProm}</span>
              </div>
              <div>
                <b>{z.datos.diasSobre30 ?? "—"}</b>
                <span>{t.diag.dias}</span>
              </div>
            </div>
            {z.causa && (
              <p className="zona-causa">
                <span>{t.diag.porQue}</span>
                {z.causa}
              </p>
            )}
            {z.accion && (
              <p className="zona-accion">
                <span>{t.diag.queHacer}</span>
                {z.accion}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
