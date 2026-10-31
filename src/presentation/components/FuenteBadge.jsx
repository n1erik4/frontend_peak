import { useT } from "../i18n/useT";

// Transparencia en la demo: ¿la respuesta vino de Gemma en vivo o de la caché?
export default function FuenteBadge({ fuente }) {
  const t = useT();
  if (!fuente) return null;
  const vivo = fuente === "gemma";
  return (
    <span className={`badge ${vivo ? "badge-vivo" : "badge-cache"}`}>
      <span className="punto" aria-hidden="true" />
      {vivo ? t.fuente.gemma : t.fuente.cache}
    </span>
  );
}
