import { tonoIndicador } from "../../domain/calle";
import { useT } from "../i18n/useT";

export default function Indicador({ campo, valor }) {
  const t = useT();
  const tono = tonoIndicador(campo, valor);
  return (
    <div className={`indicador tono-${tono}`}>
      <span className="indicador-lbl">{t.calle.indicadores[campo]}</span>
      <span className="indicador-val">{valor ? t.calle.valores[valor] || valor : "—"}</span>
    </div>
  );
}
