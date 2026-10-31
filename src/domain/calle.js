// Dominio: evaluación de "Mi calle".

const NIVELES = ["baja", "media", "alta"];
const RIESGOS = ["bajo", "medio", "alto"];

const nivel = (v) => (NIVELES.includes(v) ? v : null);
const lista = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === "string" && x) : []);

/** Convierte la respuesta de /api/calle en un modelo seguro. */
export function normalizarCalle(raw = {}) {
  return {
    sombra: nivel(raw.sombra),
    vegetacion: nivel(raw.vegetacion),
    riesgo: RIESGOS.includes(raw.riesgo) ? raw.riesgo : null,
    superficies: lista(raw.superficies),
    recomendaciones: lista(raw.recomendaciones),
    relacionSatelite: typeof raw.relacion_satelite === "string" ? raw.relacion_satelite : "",
    fuente: raw.fuente === "gemma" ? "gemma" : "cache",
  };
}

/**
 * Tono semántico de un indicador: "malo" | "regular" | "bueno".
 * Para el riesgo, "alto" es malo; para sombra y vegetación, "baja" es malo.
 */
export function tonoIndicador(campo, valor) {
  if (!valor) return "regular";
  if (campo === "riesgo") return { alto: "malo", medio: "regular", bajo: "bueno" }[valor];
  return { baja: "malo", media: "regular", alta: "bueno" }[valor];
}

/** Indicadores que se muestran como tarjetas, en orden. */
export const INDICADORES = ["sombra", "vegetacion", "riesgo"];
