import { useState } from "react";
import { formatearFecha, proyectar } from "../../domain/capas";
import { useT } from "../i18n/useT";

const MODOS = [
  { valor: 100, clave: "temperatura" },
  { valor: 50, clave: "comparar" },
  { valor: 0, clave: "vegetacion" },
];

/**
 * Un solo recuadro con las dos capas superpuestas: el deslizador revela la
 * vegetación (derecha) sobre la temperatura (izquierda). Las zonas del
 * diagnóstico se dibujan como marcadores usando el bbox.
 */
export default function VisorCapas({ capas, zonas = [], zonaActiva, onZona }) {
  const t = useT();
  const [corte, setCorte] = useState(50);
  const [fallo, setFallo] = useState(false);

  if (capas.estado === "error") {
    return <div className="visor visor-vacio">{t.visor.errorCapas}</div>;
  }
  const c = capas.datos;
  if (!c) return <div className="visor visor-vacio">{t.visor.cargando}</div>;

  return (
    <figure className="visor-wrap">
      <div className="visor" style={{ "--corte": `${corte}%` }}>
        {fallo ? (
          <div className="visor-vacio">{t.visor.sinImagenes}</div>
        ) : (
          <>
            <img className="capa-img" src={c.temperaturaUrl} alt={t.visor.altTemp} onError={() => setFallo(true)} />
            <img className="capa-img capa-veg" src={c.vegetacionUrl} alt={t.visor.altVeg} onError={() => setFallo(true)} />
            {corte > 0 && corte < 100 && <span className="divisor" aria-hidden="true" />}
          </>
        )}
        <span className="etiqueta-capa izq">{t.visor.temperatura}</span>
        <span className="etiqueta-capa der">{t.visor.vegetacion}</span>

        {zonas.map((z) => {
          const p = proyectar(z.lat, z.lon, c.bbox);
          if (!p) return null;
          return (
            <button
              key={z.nombre}
              type="button"
              className={`marcador ${zonaActiva === z.nombre ? "activo" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => onZona?.(z.nombre)}
              aria-label={t.diag.zonaAria(z.prioridad, z.nombre)}
            >
              {z.prioridad}
            </button>
          );
        })}
      </div>

      <div className="visor-controles">
        <input
          type="range"
          min="0"
          max="100"
          value={corte}
          onChange={(e) => setCorte(Number(e.target.value))}
          aria-label={t.visor.ariaRango}
        />
        <div className="modos">
          {MODOS.map((m) => (
            <button
              key={m.valor}
              type="button"
              className={`modo ${corte === m.valor ? "activo" : ""}`}
              onClick={() => setCorte(m.valor)}
            >
              {t.visor[m.clave]}
            </button>
          ))}
        </div>
      </div>

      <figcaption className="leyendas">
        <span>
          <i className="escala escala-calor" /> {t.visor.leyendaCalor}
        </span>
        <span>
          <i className="escala escala-veg" /> {t.visor.leyendaVeg}
        </span>
        <span className="fecha">NASA GIBS · {formatearFecha(c.fecha, t.locale)}</span>
      </figcaption>
    </figure>
  );
}
