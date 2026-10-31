// Infraestructura: única lectura de variables de entorno.
export const config = {
  apiUrl: (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, ""),
  usarMocks: import.meta.env.VITE_USE_MOCKS === "true",
  // El back corta a los 90 s y responde con caché; damos margen extra.
  timeoutMs: 120_000,
};
