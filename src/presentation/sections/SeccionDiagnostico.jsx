import { useState } from "react";
import Esqueleto from "../components/Esqueleto";
import Cargando from "../components/Cargando";
import ErrorReintento from "../components/ErrorReintento";
import FuenteBadge from "../components/FuenteBadge";
import MapaInteractivo from "../components/MapaInteractivo";
import SeccionLugar from "./SeccionLugar";
import { useApp } from "../../application/hooks/useApp";
import PanelPregunta from "./PanelPregunta";
import LineaAgente from "./LineaAgente";
import TarjetasZonas from "./TarjetasZonas";
import { useT } from "../i18n/useT";
import { focoCalor } from "../efectos/focoCalor";

export default function SeccionDiagnostico({ capas, diag, lugar }) {
  const t = useT();
  const { idioma } = useApp();
  const [vista, setVista] = useState("region");
  const seleccionar = (lat, lon) => { lugar.seleccionar(lat, lon); setVista("lugar"); };
  const [zonaActiva, setZonaActiva] = useState(null);
  const d = diag.diagnostico;
  const zonas = d?.zonas ?? [];

  return (
    <section className="seccion" id="diagnostico" aria-labelledby="t-diag" {...focoCalor}>
      <div className="seccion-cab aparece">
        <span className="seccion-num">01</span>
        <div>
          <h2 id="t-diag">{t.diag.titulo}</h2>
          <p>{t.diag.descripcion}</p>
        </div>
      </div>

      <div className="diag-grid">
        <div className="explorador-mapa">
          <p className="mapa-ayuda">{idioma === "en" ? "Click a place to explore its heat, vegetation and recommendations." : "Haz clic en un lugar para conocer su calor, vegetación y recomendaciones."}</p>
          {!capas.datos && capas.estado !== "error" ? <Esqueleto imagen /> : capas.estado === "error" ? <p role="alert">{t.visor.errorCapas}</p> : <MapaInteractivo capas={capas.datos} punto={lugar.punto} resultado={lugar.resultado} zonasRegion={zonas} onSeleccion={seleccionar} />}
        </div>
        <div className="diag-panel">
          <div className="analisis-tabs" role="group" aria-label={idioma === "en" ? "Analysis view" : "Vista del análisis"}>
            <button type="button" aria-pressed={vista === "region"} onClick={() => setVista("region")}>{idioma === "en" ? "Regional diagnosis" : "Diagnóstico regional"}</button>
            <button type="button" aria-pressed={vista === "lugar"} onClick={() => setVista("lugar")}>{idioma === "en" ? "Selected place" : "Lugar seleccionado"}</button>
          </div>
          <div hidden={vista !== "lugar"} aria-live="polite"><SeccionLugar lugar={lugar} /></div>
          <div hidden={vista !== "region"}>

          <PanelPregunta espera={diag.espera} onPreguntar={diag.preguntar} ocupado={diag.estado === "cargando"} />

          {diag.estado === "inactivo" && (
            <p className="pista-vacia">{t.diag.vacio}</p>
          )}
          {diag.estado === "cargando" && (
            <Cargando>{t.diag.cargando}</Cargando>
          )}
          {diag.estado === "error" && <ErrorReintento error={diag.error} onReintentar={diag.reintentarEnDemo} />}

          {d && (
            <div className="respuesta aparece">
              <div className="respuesta-cab">
                <span className="pregunta-hecha">“{diag.pregunta}”</span>
                <FuenteBadge fuente={d.fuente} />
              </div>
              {d.resumen && <p className="resumen">{d.resumen}</p>}
              <LineaAgente pasos={d.pasos} />
            </div>
          )}
          </div>
        </div>
      </div>

      {d && <TarjetasZonas zonas={zonas} zonaActiva={zonaActiva} onZona={setZonaActiva} />}
    </section>
  );
}
