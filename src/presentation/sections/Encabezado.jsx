import { useApp } from "../../application/hooks/useApp";
import { IDIOMAS } from "../../application/context";
import { useT } from "../i18n/useT";
import PapelPicado from "../components/PapelPicado";

function Sol() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${i * 45} 12 12)`} />
      ))}
    </svg>
  );
}

function Luna() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export default function Encabezado() {
  const { idioma, setIdioma, tema, setTema } = useApp();
  const t = useT();
  const oscuro = tema === "oscuro";

  return (
    <header className="encabezado">
      <PapelPicado />
      <div className="encabezado-fila">
        <div className="logo">
          <img className="logo-peak" src="/logo-peak.png" alt="Peak" />
          <span>
            Sombra <b>Oaxaca</b>
          </span>
        </div>

        <div className="ajustes">
          <div className="idiomas" role="group" aria-label={t.encabezado.idioma}>
            {IDIOMAS.map((i) => (
              <button
                key={i}
                type="button"
                className={idioma === i ? "activo" : ""}
                aria-pressed={idioma === i}
                onClick={() => setIdioma(i)}
              >
                {i.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`tema ${oscuro ? "tema-oscuro" : ""}`}
            role="switch"
            aria-checked={oscuro}
            aria-label={oscuro ? t.encabezado.aClaro : t.encabezado.aOscuro}
            title={oscuro ? t.encabezado.aClaro : t.encabezado.aOscuro}
            onClick={() => setTema(oscuro ? "claro" : "oscuro")}
          >
            <span className="tema-icono">
              <Sol />
            </span>
            <span className="tema-icono">
              <Luna />
            </span>
            <span className="tema-bola" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
