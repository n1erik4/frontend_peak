import { flushSync } from "react-dom";

/**
 * Cambia el tema con un círculo que se expande desde el botón (View Transitions API).
 * En navegadores sin soporte, o con "reducir movimiento", cambia directo.
 */
export function cambiarTemaConCirculo(boton, nuevoTema, setTema) {
  const raiz = document.documentElement;
  const sinMovimiento = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || sinMovimiento) {
    setTema(nuevoTema);
    return;
  }

  const r = boton.getBoundingClientRect();
  const x = Math.round(r.left + r.width / 2);
  const y = Math.round(r.top + r.height / 2);
  const radio = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  raiz.style.setProperty("--vt-x", `${x}px`);
  raiz.style.setProperty("--vt-y", `${y}px`);
  raiz.style.setProperty("--vt-r", `${radio}px`);

  document.startViewTransition(() => {
    // El DOM debe quedar con el tema nuevo dentro de esta llamada
    raiz.dataset.tema = nuevoTema;
    flushSync(() => setTema(nuevoTema));
  });
}
