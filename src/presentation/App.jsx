// Presentación: compone las secciones; toda la lógica viene de la capa de aplicación.
import { useInicio } from "../application/hooks/useInicio";
import { useDiagnostico } from "../application/hooks/useDiagnostico";
import { useCalle } from "../application/hooks/useCalle";
import Encabezado from "./sections/Encabezado";
import Portada from "./sections/Portada";
import SeccionDiagnostico from "./sections/SeccionDiagnostico";
import SeccionCalle from "./sections/SeccionCalle";
import { useT } from "./i18n/useT";

export default function App() {
  const t = useT();
  const inicio = useInicio();
  const diag = useDiagnostico();
  const calle = useCalle();

  return (
    <>
      <Encabezado />
      <Portada />

      <main>
        <SeccionDiagnostico capas={inicio.capas} diag={diag} />
        <SeccionCalle calle={calle} zonas={diag.diagnostico?.zonas} />
      </main>

      <footer className="pie">{t.pie(inicio.modelo || "gemma-4-e4b-it")}</footer>
    </>
  );
}
