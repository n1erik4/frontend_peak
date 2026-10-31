// Infraestructura: implementación del puerto SombraRepository contra sombra-back.
import { normalizarCapas } from "../../domain/capas";
import { normalizarDiagnostico } from "../../domain/diagnostico";
import { normalizarCalle } from "../../domain/calle";

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

    async evaluarCalle(foto, { zona = "", demo = false } = {}) {
      const fd = new FormData();
      fd.append("foto", foto);
      fd.append("zona", zona);
      fd.append("demo", String(demo));
      return normalizarCalle(await http.postForm("/api/calle", fd));
    },
  };
}
