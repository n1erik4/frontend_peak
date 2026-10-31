// Infraestructura: fetch con timeout. Los errores llevan un código; la presentación los traduce.

export class HttpError extends Error {
  /** @param {"timeout"|"conexion"|"servidor"} codigo */
  constructor(codigo, status) {
    super(status ? `${codigo} (${status})` : codigo);
    this.name = "HttpError";
    this.codigo = codigo;
    this.status = status;
  }
}

export function crearHttpClient({ baseUrl, timeoutMs }) {
  async function request(path, opciones = {}) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(`${baseUrl}${path}`, { ...opciones, signal: ctrl.signal });
      if (!r.ok) throw new HttpError("servidor", r.status);
      return await r.json();
    } catch (e) {
      if (e instanceof HttpError) throw e;
      if (e.name === "AbortError") throw new HttpError("timeout");
      throw new HttpError("conexion");
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    url: (path) => (/^https?:\/\//.test(path) ? path : `${baseUrl}${path}`),
    get: (path) => request(path),
    postJson: (path, body) =>
      request(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
    postForm: (path, formData) => request(path, { method: "POST", body: formData }),
  };
}
