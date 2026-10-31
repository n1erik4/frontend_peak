import { useEffect, useState } from "react";

/**
 * Id de la sección activa para el menú: la última cuyo inicio ya pasó el 40 % de la pantalla.
 * Se calcula con el scroll (no con IntersectionObserver) porque la portada es fija
 * y siempre "cruza" la pantalla.
 */
export function useSeccionActiva(ids) {
  const [activa, setActiva] = useState(ids[0]);
  const clave = ids.join(",");

  useEffect(() => {
    const lista = clave.split(",");
    let pendiente = false;
    const calcular = () => {
      pendiente = false;
      const limite = window.innerHeight * 0.4;
      let actual = lista[0];
      for (const id of lista.slice(1)) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= limite) actual = id;
      }
      setActiva(actual);
    };
    const alMover = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(calcular);
      }
    };
    calcular();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [clave]);

  return activa;
}
