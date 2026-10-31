// Infraestructura: persistencia de preferencias de interfaz (idioma y tema) en localStorage.
const CLAVE = "sombra-oaxaca:preferencias";

export const preferenciasLocales = {
  leer() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || {};
    } catch {
      return {};
    }
  },
  guardar(prefs) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(prefs));
    } catch {
      /* modo privado o sin espacio: se ignora */
    }
  },
};
