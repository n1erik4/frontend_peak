import { formatearTemp } from "../../domain/diagnostico";
import { porcentaje, tonoIndicador } from "../../domain/lugar";
import { formatearCoord } from "../../domain/oaxaca";
import Cargando from "../components/Cargando";
import ErrorReintento from "../components/ErrorReintento";
import FuenteBadge from "../components/FuenteBadge";
import Indicador from "../components/Indicador";
import MapaInteractivo from "../components/MapaInteractivo";
import LineaAgente from "./LineaAgente";
import { useT } from "../i18n/useT";

export default function SeccionLugar({ capas, lugar, zonasRegion }) {
  const t = useT();
  const r = lugar.resultado;

  return (
    <section className="seccion" id="lugar" aria-labelledby="t-lugar">
      <div className="seccion-cab">
        <span className="seccion-num">02</span>
        <div>
          <h2 id="t-lugar">{t.lugar.titulo}</h2>
          <p>{t.lugar.descripcion}</p>
        </div>
      </div>

      <div className="lugar-grid">
        {capas.estado === "error" ? (
          <div className="visor-vacio">{t.visor.errorCapas}</div>
        ) : (
          <MapaInteractivo
            capas={capas.datos}
            punto={lugar.punto}
            resultado={r}
            zonasRegion={zonasRegion}
            onSeleccion={lugar.seleccionar}
          />
        )}

        <div className="lugar-panel">
          {lugar.fuera && (
            <p className="aviso" role="status">
              {t.lugar.fuera}
            </p>
          )}
          {lugar.estado === "inactivo" && !lugar.fuera && <p className="pista-vacia">{t.lugar.vacio}</p>}
          {lugar.estado === "cargando" && <Cargando>{t.lugar.cargando}</Cargando>}
          {lugar.estado === "error" && <ErrorReintento error={lugar.error} onReintentar={lugar.reintentarEnDemo} />}

          {r && (
            <div className="respuesta">
              <div className="respuesta-cab">
                <div>
                  <h3 className="lugar-nombre">{r.lugar || t.lugar.sinNombre}</h3>
                  {r.punto && <span className="lugar-coord">{formatearCoord(r.punto.lat, r.punto.lon, t.oeste)}</span>}
                </div>
                <FuenteBadge fuente={r.fuente} />
              </div>

              <div className="indicadores">
                <Indicador etiqueta={t.lugar.calor} valor={porcentaje(r.satelite.calor)} tono={tonoIndicador("calor", r.satelite.calor)} />
                <Indicador
                  etiqueta={t.lugar.vegetacion}
                  valor={porcentaje(r.satelite.vegetacion)}
                  tono={tonoIndicador("vegetacion", r.satelite.vegetacion)}
                />
                <Indicador etiqueta={t.lugar.riesgo} valor={r.riesgo ? t.lugar.niveles[r.riesgo] : "—"} tono={tonoIndicador("riesgo", r.riesgo)} />
              </div>
              <p className="nota">
                {t.lugar.escala}
                {r.satelite.zonaCaliente && r.satelite.areaKm2 != null && ` ${t.lugar.area(r.satelite.areaKm2)}`}
              </p>

              {r.datos && (
                <div className="zona-datos">
                  <div>
                    <b>{formatearTemp(r.datos.tMaxProm)}</b>
                    <span>{t.diag.maxProm} · NASA POWER 2025</span>
                  </div>
                  <div>
                    <b>{r.datos.diasSobre30 ?? "—"}</b>
                    <span>{t.diag.dias}</span>
                  </div>
                </div>
              )}

              <div className="superficies">
                <span>{t.lugar.entorno}</span>
                {r.entorno ? (
                  <>
                    <span className="etiqueta">{t.lugar.edificios(r.entorno.edificios)}</span>
                    <span className="etiqueta">{t.lugar.calles(r.entorno.calles)}</span>
                    <span className="etiqueta">{t.lugar.areasVerdes(r.entorno.areasVerdes)}</span>
                  </>
                ) : (
                  <small>{t.lugar.sinEntorno}</small>
                )}
              </div>

              {r.causa && (
                <p className="zona-causa">
                  <span>{t.diag.porQue}</span>
                  {r.causa}
                </p>
              )}

              {r.recomendaciones.length > 0 && (
                <>
                  <h4 className="subtitulo">{t.diag.queHacer}</h4>
                  <ol className="recomendaciones">
                    {r.recomendaciones.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ol>
                </>
              )}

              <LineaAgente pasos={r.pasos} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
