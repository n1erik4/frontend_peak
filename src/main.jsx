// Punto de composición: aquí se elige la infraestructura y se inyecta en la aplicación.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { crearRepository } from "./infrastructure/createRepository";
import { preferenciasLocales } from "./infrastructure/preferencias";
import AppProvider from "./application/AppProvider";
import App from "./presentation/App";
import "@fontsource-variable/figtree";
import "./presentation/styles/global.css";

const { repo, origen } = crearRepository();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider repo={repo} origen={origen} preferencias={preferenciasLocales}>
      <App />
    </AppProvider>
  </StrictMode>,
);
