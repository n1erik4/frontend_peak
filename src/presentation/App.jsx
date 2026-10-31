// Presentación: compone las secciones; toda la lógica viene de la capa de aplicación.
import { useInicio } from "../application/hooks/useInicio";
import { useDiagnostico } from "../application/hooks/useDiagnostico";
import { useLugar } from "../application/hooks/useLugar";
import Encabezado from "./sections/Encabezado";
import Portada from "./sections/Portada";
import SeccionDiagnostico from "./sections/SeccionDiagnostico";
import SeccionLugar from "./sections/SeccionLugar";
import SeccionIslas from "./sections/SeccionIslas";
import { useT } from "./i18n/useT";
import { useVariablesScroll } from "./efectos/useVariablesScroll";
import { useAparecer } from "./efectos/useAparecer";

export default function App() {
  const t = useT();
  const inicio = useInicio();
  const diag = useDiagnostico();
  const lugar = useLugar(inicio.capas.datos?.bbox);
  useVariablesScroll();
  const contenido = useAparecer();

  return (
    <>
      <Encabezado />
      <Portada />

      {/* La "hoja" que sube sobre la portada; su orilla superior es un frente de calor */}
      <main ref={contenido} className="hoja">
        <span className="isla isla-calor" aria-hidden="true" />
        <span className="isla isla-verde" aria-hidden="true" />
        {/* Primero los mapas, después la información sobre islas de calor */}
        <SeccionDiagnostico capas={inicio.capas} diag={diag} />
        <SeccionLugar capas={inicio.capas} lugar={lugar} zonasRegion={diag.diagnostico?.zonas} />
        <SeccionIslas />
      </main>

      <footer className="pie">{t.pie(inicio.modelo || "gemma-4-e4b-it")}</footer>
    </>
  );
}
