import { useEffect } from "react";

/**
 * Publica el scroll como variables CSS en <html> (sin re-renderizar React):
 *   --barrido:  0 → 1 durante la primera pantalla (la portada se encoge y se desvanece)
 *   --progreso: 0 → 1 en toda la página (termómetro del encabezado)
 */
export function useVariablesScroll() {
  useEffect(() => {
    const raiz = document.documentElement;
    let pendiente = false;

    const actualizar = () => {
      pendiente = false;
      const y = window.scrollY;
      const alto = window.innerHeight;
      const total = Math.max(1, raiz.scrollHeight - alto);
      raiz.style.setProperty("--barrido", Math.min(y / alto, 1).toFixed(4));
      raiz.style.setProperty("--progreso", Math.min(y / total, 1).toFixed(4));
    };
    const alMover = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
      }
    };

    actualizar();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, []);
}
