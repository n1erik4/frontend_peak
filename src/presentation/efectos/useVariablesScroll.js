import { useEffect } from "react";

/** Actualiza únicamente el indicador, sin invalidar estilos de toda la página. */
export function useVariablesScroll() {
  useEffect(() => {
    const indicador = document.querySelector('.termometro');
    if (!indicador) return;
    let frame = 0;
    let total = 1;
    const pintar = () => {
      frame = 0;
      indicador.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / total))})`;
    };
    const programar = () => { if (!frame) frame = requestAnimationFrame(pintar); };
    const medir = () => {
      total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      programar();
    };
    const observer = new ResizeObserver(medir);
    observer.observe(document.body);
    medir();
    window.addEventListener('scroll', programar, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', programar);
      window.removeEventListener('resize', medir);
    };
  }, []);
}
