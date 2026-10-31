// Dominio: forma y reglas del diagnóstico regional. Sin React ni red.

/** Tipos de paso del agente y su ícono. Los textos viven en la capa de presentación. */
export const TIPOS_PASO = {
  vision: { icono: "👁" },
  herramienta: { icono: "🛰" },
  sintesis: { icono: "✦" },
};

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const txt = (v) => (typeof v === "string" ? v : "");

function normalizarZona(z = {}, i) {
  return {
    nombre: txt(z.nombre) || `Zona ${i + 1}`,
    lat: num(z.lat),
    lon: num(z.lon),
    causa: txt(z.causa),
    accion: txt(z.accion),
    prioridad: num(z.prioridad) ?? i + 1,
    datos: {
      tMaxProm: num(z.datos?.t_max_prom),
      diasSobre30: num(z.datos?.dias_sobre_30C),
    },
  };
}

/** Convierte la respuesta de /api/diagnostico en un modelo seguro y ordenado. */
export function normalizarDiagnostico(raw = {}) {
  const pasos = Array.isArray(raw.pasos)
    ? raw.pasos.map((p) => ({ tipo: TIPOS_PASO[p?.tipo] ? p.tipo : "sintesis", texto: txt(p?.texto) }))
    : [];
  const zonas = (Array.isArray(raw.zonas) ? raw.zonas : [])
    .map(normalizarZona)
    .sort((a, b) => a.prioridad - b.prioridad);
  return { pasos, zonas, resumen: txt(raw.resumen), fuente: raw.fuente === "gemma" ? "gemma" : "cache" };
}

export const formatearTemp = (t) => (t == null ? "—" : `${t.toFixed(1)} °C`);
