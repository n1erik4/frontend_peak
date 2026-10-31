import { TIPOS_PASO } from "../../domain/diagnostico";
import { useT } from "../i18n/useT";

export default function LineaAgente({ pasos }) {
  const t = useT();
  if (!pasos.length) return null;
  return (
    <div className="linea">
      <h3 className="subtitulo">{t.diag.pasosTitulo}</h3>
      <ol>
        {pasos.map((p, i) => {
          const txt = t.diag.tipos[p.tipo];
          return (
            <li key={i} className={`paso paso-${p.tipo}`}>
              <span className="paso-icono" aria-hidden="true">
                {TIPOS_PASO[p.tipo].icono}
              </span>
              <div>
                <span className="paso-tipo">
                  {txt.titulo} · <span>{txt.detalle}</span>
                </span>
                <p>{p.texto}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
