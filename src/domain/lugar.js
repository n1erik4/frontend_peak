// Dominio: análisis de un lugar elegido en el mapa (respuesta de POST /api/zona). Sin React ni red.
import { TIPOS_PASO } from "./diagnostico";

const RIESGOS = ["bajo", "medio", "alto"];
const FUENTES = ["gemma", "reglas", "cache"];

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const txt = (v) => (typeof v === "string" ? v : "");
const esCoord = (p) => Array.isArray(p) && p.length === 2 && p.every((n) => num(n) !== null);

/** Convierte la respuesta de /api/zona en un modelo seguro. */
export function normalizarLugar(raw = {}) {
  const sat = raw.satelite || {};
  const datos = raw.datos || null;
  const ent = raw.entorno || null;
  return {
    lugar: txt(raw.lugar),
    punto: num(raw.punto?.lat) !== null && num(raw.punto?.lon) !== null ? { lat: raw.punto.lat, lon: raw.punto.lon } : null,
    poligono: Array.isArray(raw.poligono) ? raw.poligono.filter(esCoord) : [],
    satelite: {
      calor: num(sat.calor_relativo),
      vegetacion: num(sat.vegetacion_relativa),
      zonaCaliente: sat.zona_caliente === true,
      areaKm2: num(sat.area_km2),
    },
    datos: datos && {
      tProm: num(datos.t_prom),
      tMaxProm: num(datos.t_max_prom),
      diasSobre30: num(datos.dias_sobre_30C),
    },
    entorno: ent && {
      edificios: num(ent.edificios),
      calles: num(ent.calles),
      areasVerdes: num(ent.areas_verdes),
      radioM: num(ent.radio_m) ?? 500,
    },
    pasos: Array.isArray(raw.pasos)
      ? raw.pasos.map((p) => ({ tipo: TIPOS_PASO[p?.tipo] ? p.tipo : "sintesis", texto: txt(p?.texto) }))
      : [],
    riesgo: RIESGOS.includes(raw.riesgo) ? raw.riesgo : null,
    causa: txt(raw.causa),
    recomendaciones: Array.isArray(raw.recomendaciones) ? raw.recomendaciones.filter((x) => typeof x === "string" && x) : [],
    resumen: txt(raw.resumen),
    fuente: FUENTES.includes(raw.fuente) ? raw.fuente : "cache",
  };
}

/** bbox = [lonMin, latMin, lonMax, latMax] */
export function dentroBbox(lat, lon, [lonMin, latMin, lonMax, latMax]) {
  return lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax;
}

/** Límites en formato Leaflet: [[latSur, lonOeste], [latNorte, lonEste]] */
export const limitesLeaflet = ([lonMin, latMin, lonMax, latMax]) => [
  [latMin, lonMin],
  [latMax, lonMax],
];

export const porcentaje = (v) => (v == null ? "—" : `${Math.round(v * 100)} %`);

/** Tono semántico de un indicador: "malo" | "regular" | "bueno". */
export function tonoIndicador(campo, valor) {
  if (valor == null) return "regular";
  if (campo === "riesgo") return { alto: "malo", medio: "regular", bajo: "bueno" }[valor] ?? "regular";
  if (campo === "calor") return valor >= 0.66 ? "malo" : valor >= 0.4 ? "regular" : "bueno";
  if (campo === "vegetacion") return valor < 0.3 ? "malo" : valor < 0.6 ? "regular" : "bueno";
  return "regular";
}

/** Color del polígono según el riesgo (valores de las variables CSS del tema). */
export const COLOR_RIESGO = { alto: "#e4572e", medio: "#f29e4c", bajo: "#2e9e5b" };
