import { useT } from "../i18n/useT";

// Transparencia en la demo: ¿la respuesta vino de Gemma en vivo, de reglas sin IA o de la caché?
export default function FuenteBadge({ fuente }) {
  const t = useT();
  if (!fuente) return null;
  const vivo = fuente === "gemma";
  return (
    <span className={`badge ${vivo ? "badge-vivo" : "badge-cache"}`}>
      <span className="punto" aria-hidden="true" />
      {t.fuente[fuente] ?? t.fuente.cache}
    </span>
  );
}
