// Aplicación: puerto que cualquier fuente de datos debe implementar.
// Lo implementan infrastructure/http/apiRepository.js y infrastructure/mock/mockRepository.js.

/**
 * @typedef {Object} SombraRepository
 * @property {() => Promise<{ok: boolean, modelo: string}>} salud
 * @property {() => Promise<{temperaturaUrl: string, vegetacionUrl: string, bbox: number[], fecha: string}>} capas
 * @property {(pregunta: string, opciones?: {demo?: boolean}) => Promise<Object>} diagnosticar
 * @property {(foto: File, opciones?: {zona?: string, demo?: boolean}) => Promise<Object>} evaluarCalle
 */

export {};
