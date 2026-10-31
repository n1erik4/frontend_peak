// Aplicación: caso de uso "pedir diagnóstico regional a Gemma".
import { useEffect, useRef, useState } from "react";
import { useApp } from "./useApp";
import { useTarea } from "./useTarea";

export function useDiagnostico() {
  const { repo, demo } = useApp();
  const tarea = useTarea();
  const [pregunta, setPregunta] = useState("");

  const bloqueo = useRef({ ocupado: false, hasta: 0 });
  const [espera, setEspera] = useState(0);
  useEffect(() => {
    if (!espera) return;
    const id = setInterval(() => setEspera(Math.max(0, Math.ceil((bloqueo.current.hasta - Date.now()) / 1000))), 250);
    return () => clearInterval(id);
  }, [espera]);

  const preguntar = (q, { forzarDemo = false } = {}) => {
    const limpia = q.trim();
    if (!limpia || bloqueo.current.ocupado || Date.now() < bloqueo.current.hasta) return;
    bloqueo.current = { ocupado: true, hasta: Date.now() + 10_000 };
    setEspera(10);
    setPregunta(limpia);
    tarea.ejecutar(async () => {
      try { return await repo.diagnosticar(limpia, { demo: demo || forzarDemo }); }
      finally { bloqueo.current.ocupado = false; }
    });
  };

  return {
    pregunta,
    espera,
    estado: tarea.estado,
    diagnostico: tarea.datos,
    error: tarea.error,
    preguntar,
    reintentarEnDemo: () => preguntar(pregunta, { forzarDemo: true }),
  };
}
