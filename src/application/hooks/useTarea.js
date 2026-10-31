// Aplicación: ejecuta una tarea asíncrona e ignora respuestas viejas si se lanza otra.
import { useCallback, useRef, useState } from "react";

/**
 * estado: "inactivo" | "cargando" | "listo" | "error"
 * error: { codigo, status } — la presentación decide el texto.
 */
export function useTarea() {
  const [s, setS] = useState({ estado: "inactivo", datos: null, error: null });
  const turno = useRef(0);

  const ejecutar = useCallback(async (fn) => {
    const mio = ++turno.current;
    setS({ estado: "cargando", datos: null, error: null });
    try {
      const datos = await fn();
      if (mio === turno.current) setS({ estado: "listo", datos, error: null });
    } catch (e) {
      if (mio === turno.current)
        setS({ estado: "error", datos: null, error: { codigo: e.codigo || "desconocido", status: e.status } });
    }
  }, []);

  const reiniciar = useCallback(() => {
    turno.current++;
    setS({ estado: "inactivo", datos: null, error: null });
  }, []);

  return { ...s, ejecutar, reiniciar };
}
