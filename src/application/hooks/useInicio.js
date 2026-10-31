// Aplicación: datos que se cargan al abrir la página (modelo y capas).
import { useEffect } from "react";
import { useApp } from "./useApp";
import { useTarea } from "./useTarea";

export function useInicio() {
  const { repo } = useApp();
  const salud = useTarea();
  const capas = useTarea();
  const { ejecutar: cargarSalud } = salud;
  const { ejecutar: cargarCapas } = capas;

  useEffect(() => {
    cargarSalud(() => repo.salud());
    cargarCapas(() => repo.capas());
  }, [repo, cargarSalud, cargarCapas]);

  return {
    modelo: salud.datos?.modelo || null,
    conectado: salud.estado === "listo" ? true : salud.estado === "error" ? false : null,
    capas,
    reintentarCapas: () => cargarCapas(() => repo.capas()),
  };
}
