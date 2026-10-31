import { useApp } from "../../application/hooks/useApp";
import { IDIOMAS } from "../../application/context";
import { useT } from "../i18n/useT";
import PapelPicado from "../components/PapelPicado";
import { cambiarTemaConCirculo } from "../efectos/transicionTema";
import { useSeccionActiva } from "../efectos/useSeccionActiva";

/** Selector de idioma: globo + pista con indicador que se desliza. */
function SelectorIdioma() {
  const { idioma, setIdioma } = useApp();
  const t = useT();
  return (
    <div className="lengua" role="group" aria-label={t.encabezado.idioma}>
      <svg className="lengua-globo" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18" />
      </svg>
      <div className="lengua-pista" data-pos={IDIOMAS.indexOf(idioma)}>
        <span className="lengua-indicador" aria-hidden="true" />
        {IDIOMAS.map((i) => (
          <button key={i} type="button" aria-pressed={idioma === i} onClick={() => setIdioma(i)}>
            {i.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Interruptor de tema: cielo de día (sol y nubes) ↔ cielo de noche (luna y estrellas). */
function InterruptorCielo() {
  const { tema, setTema } = useApp();
  const t = useT();
  const noche = tema === "oscuro";
  const etiqueta = noche ? t.encabezado.aClaro : t.encabezado.aOscuro;
  return (
    <button
      type="button"
      className={`cielo ${noche ? "noche" : ""}`}
      role="switch"
      aria-checked={noche}
      aria-label={etiqueta}
      title={etiqueta}
      onClick={(e) => cambiarTemaConCirculo(e.currentTarget, noche ? "claro" : "oscuro", setTema)}
    >
      <span className="cielo-estrellas" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="cielo-nubes" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="astro" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

const SECCIONES = ["inicio", "diagnostico", "lugar", "islas"];

/** Menú con la sección activa marcada por una "mancha de calor" debajo. */
function Navegacion() {
  const t = useT();
  const activa = useSeccionActiva(SECCIONES);
  return (
    <nav className="nav" aria-label={t.encabezado.menu}>
      {SECCIONES.map((id) => (
        <a key={id} href={`#${id}`} className={activa === id ? "activa" : ""} aria-current={activa === id ? "true" : undefined}>
          {t.encabezado.nav[id]}
        </a>
      ))}
    </nav>
  );
}

export default function Encabezado() {
  return (
    <header className="encabezado">
      <PapelPicado />
      <div className="encabezado-fila">
        <a className="logo" href="#inicio">
          <img className="logo-peak" src="/logo-peak.png" alt="Peak" />
          <span>
            Sombra <b>Oaxaca</b>
          </span>
        </a>
        <Navegacion />
        <div className="ajustes">
          <SelectorIdioma />
          <InterruptorCielo />
        </div>
      </div>
      {/* Termómetro: avance de la página con la paleta de los mapas de calor */}
      <span className="termometro" aria-hidden="true" />
    </header>
  );
}
