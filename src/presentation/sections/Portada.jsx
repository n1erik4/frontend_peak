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
  // Islas de calor: termómetro
  <svg key="islas" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z" />
    <path d="M12 9v6" />
  </svg>,
  // Cómo nos afecta: ciudad
  <svg key="afecta" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 21h18M5 21V10l5-3v14M10 21V4l6 3v14M16 21v-8l3-2v10" />
  </svg>,
];
const DESTINOS = ["#diagnostico", "#islas", "#afecta"];

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
