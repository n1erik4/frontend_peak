/** Tarjeta de un indicador. tono: "malo" | "regular" | "bueno" (lo decide el dominio). */
export default function Indicador({ etiqueta, valor, tono = "regular" }) {
  return (
    <div className={`indicador tono-${tono}`}>
      <span className="indicador-lbl">{etiqueta}</span>
      <span className="indicador-val">{valor ?? "—"}</span>
    </div>
  );
}
