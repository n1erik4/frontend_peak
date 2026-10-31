// Aplicación: caso de uso "analizar un lugar elegido en el mapa".
import { useState } from "react";
import { dentroBbox } from "../../domain/lugar";
import { VALLES_CENTRALES } from "../../domain/oaxaca";
import { useApp } from "./useApp";
import { useTarea } from "./useTarea";

export function useLugar(bbox = VALLES_CENTRALES) {
  const { repo, demo } = useApp();
  const tarea = useTarea();
  const [punto, setPunto] = useState(null);
  const [fuera, setFuera] = useState(false);

  const analizar = (p, forzarDemo = false) =>
    tarea.ejecutar(() => repo.analizarLugar(p.lat, p.lon, { demo: demo || forzarDemo }));

  /** Se llama al tocar el mapa. Fuera del recuadro de estudio no se consulta al back. */
  const seleccionar = (lat, lon) => {
    if (!dentroBbox(lat, lon, bbox)) {
      setFuera(true);
      return;
    }
    const p = { lat, lon };
    setFuera(false);
    setPunto(p);
    analizar(p);
  };

  return {
    punto,
    fuera,
    seleccionar,
    estado: tarea.estado,
    resultado: tarea.datos,
    error: tarea.error,
    reintentarEnDemo: () => punto && analizar(punto, true),
  };
}
