// Aplicación: caso de uso "evaluar la foto de mi calle".
import { useEffect, useState } from "react";
import { useApp } from "./useApp";
import { useTarea } from "./useTarea";

export function useCalle() {
  const { repo, demo } = useApp();
  const tarea = useTarea();
  const [foto, setFotoState] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zona, setZona] = useState("");

  // Libera la URL de la vista previa al cambiarla o al desmontar.
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const setFoto = (f) => {
    setFotoState(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    tarea.reiniciar();
  };

  const evaluar = ({ forzarDemo = false } = {}) => {
    if (!foto) return;
    tarea.ejecutar(() => repo.evaluarCalle(foto, { zona, demo: demo || forzarDemo }));
  };

  return {
    foto,
    preview,
    setFoto,
    zona,
    setZona,
    estado: tarea.estado,
    resultado: tarea.datos,
    error: tarea.error,
    evaluar,
    reintentarEnDemo: () => evaluar({ forzarDemo: true }),
  };
}
