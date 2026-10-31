// Aplicación: caso de uso "pedir diagnóstico regional a Gemma".
import { useState } from "react";
import { useApp } from "./useApp";
import { useTarea } from "./useTarea";

export function useDiagnostico() {
  const { repo, demo } = useApp();
  const tarea = useTarea();
  const [pregunta, setPregunta] = useState("");

  const preguntar = (q, { forzarDemo = false } = {}) => {
    const limpia = q.trim();
    if (!limpia) return;
    setPregunta(limpia);
    tarea.ejecutar(() => repo.diagnosticar(limpia, { demo: demo || forzarDemo }));
  };

  return {
    pregunta,
    estado: tarea.estado,
    diagnostico: tarea.datos,
    error: tarea.error,
    preguntar,
    reintentarEnDemo: () => preguntar(pregunta, { forzarDemo: true }),
  };
}
