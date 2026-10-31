// Infraestructura: decide qué implementación del puerto usar según la configuración.
import { config } from "./config";
import { crearHttpClient } from "./http/httpClient";
import { crearApiRepository } from "./http/apiRepository";
import { crearMockRepository } from "./mock/mockRepository";

export function crearRepository() {
  if (config.usarMocks) return { repo: crearMockRepository(), origen: "mocks" };
  const http = crearHttpClient({ baseUrl: config.apiUrl, timeoutMs: config.timeoutMs });
  return { repo: crearApiRepository(http), origen: config.apiUrl };
}
