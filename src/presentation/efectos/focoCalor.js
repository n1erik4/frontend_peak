/**
 * Punto de calor que sigue al mouse dentro de una sección.
 * Escribe --mx / --my / --foco en el elemento (sin re-renderizar React).
 */
export const focoCalor = {
  onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty("--foco", "1");
  },
  onMouseLeave(e) {
    e.currentTarget.style.setProperty("--foco", "0");
  },
};
