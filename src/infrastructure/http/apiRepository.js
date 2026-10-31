// Infraestructura: implementación del puerto SombraRepository contra sombra-back.
import { normalizarCapas } from "../../domain/capas";
import { normalizarDiagnostico } from "../../domain/diagnostico";
import { normalizarLugar } from "../../domain/lugar";
import { HttpError } from "./httpClient";

/** @returns {import("../../application/ports").SombraRepository} */
export function crearApiRepository(http) {
  return {
    async salud() {
      const r = await http.get("/api/health");
      return { ok: r.status === "ok", modelo: r.model || "" };
    },

    async capas() {
      const c = normalizarCapas(await http.get("/api/capas"));
      return { ...c, temperaturaUrl: http.url(c.temperaturaUrl), vegetacionUrl: http.url(c.vegetacionUrl) };
    },

    async diagnosticar(pregunta, { demo = false } = {}) {
      return normalizarDiagnostico(await http.postJson("/api/diagnostico", { pregunta, demo }));
    },

    async analizarLugar(lat, lon, { demo = false } = {}) {
      try {
        return normalizarLugar(await http.postJson("/api/zona", { lat, lon, demo }));
      } catch (e) {
        // 422 = el punto está fuera de los Valles Centrales
        if (e.status === 422) throw new HttpError("fuera_de_zona", 422);
        throw e;
      }
    },
  };
}
