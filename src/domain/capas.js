// Dominio: capas satelitales y geometría del recuadro.

/** bbox = [lonMin, latMin, lonMax, latMax] (EPSG:4326, como en el contrato). */
export function normalizarCapas(raw = {}) {
  const bbox = Array.isArray(raw.bbox) && raw.bbox.length === 4 ? raw.bbox.map(Number) : [-97.1, 16.6, -96.3, 17.4];
  return {
    temperaturaUrl: raw.temperatura_url || "",
    vegetacionUrl: raw.vegetacion_url || "",
    bbox,
    fecha: raw.fecha || "",
  };
}

/**
 * Proyecta lat/lon a porcentaje dentro de la imagen (proyección equirectangular,
 * igual que la WMS de GIBS en EPSG:4326). Devuelve null si cae fuera del recuadro.
 */
export function proyectar(lat, lon, bbox) {
  if (lat == null || lon == null) return null;
  const [lonMin, latMin, lonMax, latMax] = bbox;
  const x = ((lon - lonMin) / (lonMax - lonMin)) * 100;
  const y = ((latMax - lat) / (latMax - latMin)) * 100;
  if (x < 0 || x > 100 || y < 0 || y > 100) return null;
  return { x, y };
}

export function formatearFecha(iso, locale = "es-MX") {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}
