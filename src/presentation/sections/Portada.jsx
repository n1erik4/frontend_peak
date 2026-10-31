import GloboOaxaca from "../components/GloboOaxaca";
import { useT } from "../i18n/useT";

function Puntos() {
  return (
    <span className="puntos" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

const ICONOS = [
  // Mapa del calor
  <svg key="mapa" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>,
  // Las causas
  <svg key="causas" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </svg>,
  // Tu calle
  <svg key="calle" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>,
];
const DESTINOS = ["#diagnostico", "#diagnostico", "#calle"];

/** Portada: panel con el planeta que viaja a Oaxaca + mensaje para la gente. */
export default function Portada() {
  const t = useT();
  return (
    <section className="portada" id="inicio">
      <span className="deco deco-abajo" aria-hidden="true" />

      <div className="portada-panel">
        <Puntos />
        <GloboOaxaca />
        <Puntos />
      </div>

      <div className="portada-texto">
        <span className="portada-esfera" aria-hidden="true" />
        <p className="antetitulo">{t.portada.antetitulo}</p>
        <h1>
          Sombra
          <br />
          Oaxaca
        </h1>
        <p className="lema">{t.portada.lema}</p>
        <p className="portada-desc">{t.portada.descripcion}</p>

        <ul className="portada-puntos">
          {t.portada.puntos.map((p, i) => (
            <li key={p.titulo}>
              <a href={DESTINOS[i]}>
                <span className="punto-icono">{ICONOS[i]}</span>
                <b>{p.titulo}</b>
                <span>{p.texto}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a className="desliza" href="#diagnostico">
        <span>{t.portada.desliza}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
