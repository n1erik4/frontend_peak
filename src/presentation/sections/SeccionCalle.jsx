import { INDICADORES } from "../../domain/calle";
import Cargando from "../components/Cargando";
import ErrorReintento from "../components/ErrorReintento";
import FuenteBadge from "../components/FuenteBadge";
import Indicador from "../components/Indicador";
import { useT } from "../i18n/useT";

export default function SeccionCalle({ calle, zonas = [] }) {
  const t = useT();
  const r = calle.resultado;
  const ocupado = calle.estado === "cargando";

  return (
    <section className="seccion" aria-labelledby="t-calle">
      <div className="seccion-cab">
        <span className="seccion-num">02</span>
        <div>
          <h2 id="t-calle">{t.calle.titulo}</h2>
          <p>{t.calle.descripcion}</p>
        </div>
      </div>

      <div className="calle-grid">
        <div className="calle-entrada">
          <label className={`foto-drop ${calle.preview ? "con-foto" : ""}`}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => calle.setFoto(e.target.files?.[0] || null)}
              disabled={ocupado}
            />
            {calle.preview ? (
              <img src={calle.preview} alt={t.calle.altFoto} />
            ) : (
              <span className="foto-vacia">
                <span className="foto-icono" aria-hidden="true">📷</span>
                {t.calle.subir}
              </span>
            )}
          </label>
          {calle.preview && <span className="cambiar">{t.calle.cambiar}</span>}

          <label className="selector">
            {t.calle.zona}
            <select value={calle.zona} onChange={(e) => calle.setZona(e.target.value)} disabled={ocupado}>
              <option value="">{t.calle.sinZona}</option>
              {zonas.map((z) => (
                <option key={z.nombre} value={z.nombre}>
                  {z.nombre}
                </option>
              ))}
            </select>
            {!zonas.length && <small>{t.calle.primero}</small>}
          </label>

          <button type="button" className="btn btn-calor" disabled={!calle.foto || ocupado} onClick={() => calle.evaluar()}>
            {t.calle.evaluar}
          </button>
        </div>

        <div className="calle-resultado">
          {calle.estado === "inactivo" && (
            <p className="pista-vacia">{t.calle.vacio}</p>
          )}
          {ocupado && <Cargando>{t.calle.cargando}</Cargando>}
          {calle.estado === "error" && <ErrorReintento error={calle.error} onReintentar={calle.reintentarEnDemo} />}

          {r && (
            <div className="respuesta">
              <div className="respuesta-cab">
                <h3 className="subtitulo">{t.calle.resultado}</h3>
                <FuenteBadge fuente={r.fuente} />
              </div>
              <div className="indicadores">
                {INDICADORES.map((campo) => (
                  <Indicador key={campo} campo={campo} valor={r[campo]} />
                ))}
              </div>
              {r.superficies.length > 0 && (
                <div className="superficies">
                  <span>{t.calle.superficies}</span>
                  {r.superficies.map((s) => (
                    <span key={s} className="etiqueta">{s}</span>
                  ))}
                </div>
              )}
              {r.recomendaciones.length > 0 && (
                <>
                  <h4 className="subtitulo">{t.calle.queHacer}</h4>
                  <ol className="recomendaciones">
                    {r.recomendaciones.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ol>
                </>
              )}
              {r.relacionSatelite && (
                <p className="relacion">
                  <span>{t.calle.relacion}</span>
                  {r.relacionSatelite}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
