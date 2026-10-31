import { useApp } from "../../application/hooks/useApp";
import { TEXTOS } from "./textos";

/** Textos de la interfaz en el idioma activo. */
export function useT() {
  const { idioma } = useApp();
  return TEXTOS[idioma] ?? TEXTOS.es;
}
