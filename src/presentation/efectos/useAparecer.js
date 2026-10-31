import { useEffect, useRef } from "react";

/**
 * Hace aparecer los elementos con clase `.aparece` cuando entran en pantalla.
 * El retraso se toma de `data-retraso` (ms). También detecta elementos que se
 * agregan después (resultados de Gemma, tarjetas de zonas).
 */
export function useAparecer() {
  const ref = useRef(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.style.transitionDelay = `${Math.min(120, Number(e.target.dataset.retraso || 0))}ms`;
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );

    // Registro local a este montaje (en StrictMode el efecto corre dos veces)
    const observados = new WeakSet();
    const observarNuevos = () =>
      raiz.querySelectorAll(".aparece:not(.visible)").forEach((el) => {
        if (observados.has(el)) return;
        observados.add(el);
        io.observe(el);
      });

    observarNuevos();
    const mo = new MutationObserver((cambios) => {
      for (const cambio of cambios) for (const nodo of cambio.addedNodes) {
        if (!(nodo instanceof Element)) continue;
        const elementos = [...nodo.querySelectorAll(".aparece:not(.visible)")];
        if (nodo.matches(".aparece:not(.visible)")) elementos.push(nodo);
        for (const el of elementos) {
          if (observados.has(el)) continue;
          observados.add(el);
          io.observe(el);
        }
      }
    });
    mo.observe(raiz, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return ref;
}
