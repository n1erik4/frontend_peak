// Aplicación: inyección del repositorio y estado global (modo demo, idioma, tema).
import { useEffect, useMemo, useState } from "react";
import { AppContext, IDIOMAS, TEMAS } from "./context";

export default function AppProvider({ repo, origen, preferencias, children }) {
  const iniciales = useMemo(() => preferencias?.leer() ?? {}, [preferencias]);
  const [demo, setDemo] = useState(false);
  const [idioma, setIdioma] = useState(IDIOMAS.includes(iniciales.idioma) ? iniciales.idioma : "es");
  const [tema, setTema] = useState(TEMAS.includes(iniciales.tema) ? iniciales.tema : "claro");

  // Refleja las preferencias en <html> y las guarda.
  useEffect(() => {
    document.documentElement.lang = idioma;
    document.documentElement.dataset.tema = tema;
    preferencias?.guardar({ idioma, tema });
  }, [idioma, tema, preferencias]);

  const valor = useMemo(
    () => ({ repo, origen, demo, setDemo, idioma, setIdioma, tema, setTema }),
    [repo, origen, demo, idioma, tema],
  );
  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}
