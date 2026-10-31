// Infraestructura: mismo puerto que apiRepository, con datos locales y espera simulada.
import { normalizarCapas } from "../../domain/capas";
import { normalizarDiagnostico } from "../../domain/diagnostico";
import { normalizarCalle } from "../../domain/calle";
import capas from "./data/capas.json";
import diagnostico from "./data/diagnostico.json";
import calle from "./data/calle.json";

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/** @returns {import("../../application/ports").SombraRepository} */
export function crearMockRepository({ demoraMs = 2000 } = {}) {
  return {
    async salud() {
      await esperar(150);
      return { ok: true, modelo: "gemma-4-e4b-it" };
    },
    async capas() {
      await esperar(250);
      return normalizarCapas(capas);
    },
    async diagnosticar() {
      await esperar(demoraMs);
      return normalizarDiagnostico(diagnostico);
    },
    async evaluarCalle() {
      await esperar(demoraMs);
      return normalizarCalle(calle);
    },
  };
}
