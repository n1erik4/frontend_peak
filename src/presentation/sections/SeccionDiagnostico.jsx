import { useState } from "react";
import Esqueleto from "../components/Esqueleto";
import Cargando from "../components/Cargando";
import ErrorReintento from "../components/ErrorReintento";
import FuenteBadge from "../components/FuenteBadge";
import VisorCapas from "./VisorCapas";
import PanelPregunta from "./PanelPregunta";
import LineaAgente from "./LineaAgente";
import TarjetasZonas from "./TarjetasZonas";
import { useT } from "../i18n/useT";

export default function SeccionDiagnostico({ capas, diag }) {
  const t = useT();
  const [zonaActiva, setZonaActiva] = useState(null);
  const d = diag.diagnostico;
  const zonas = d?.zonas ?? [];

  return (
    <section className="seccion" id="diagnostico" aria-labelledby="t-diag">
      <div className="seccion-cab">
        <span className="seccion-num">01</span>
        <div>
          <h2 id="t-diag">{t.diag.titulo}</h2>
          <p>{t.diag.descripcion}</p>
        </div>
      </div>

      <div className="diag-grid">
        {!capas.datos && capas.estado !== "error" ? <Esqueleto imagen /> : <VisorCapas capas={capas} zonas={zonas} zonaActiva={zonaActiva} onZona={setZonaActiva} />}

        <div className="diag-panel">
          <PanelPregunta espera={diag.espera} onPreguntar={diag.preguntar} ocupado={diag.estado === "cargando"} />

          {diag.estado === "inactivo" && (
            <p className="pista-vacia">{t.diag.vacio}</p>
          )}
          {diag.estado === "cargando" && (
            <Cargando>{t.diag.cargando}</Cargando>
          )}
          {diag.estado === "error" && <ErrorReintento error={diag.error} onReintentar={diag.reintentarEnDemo} />}

          {d && (
            <div className="respuesta">
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

      {d && <TarjetasZonas zonas={zonas} zonaActiva={zonaActiva} onZona={setZonaActiva} />}
    </section>
  );
}
