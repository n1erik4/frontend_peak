import { nombreModelo } from "../../domain/modelo";
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

/** Portada basada en el diseño de Canva: panel verde + planeta animado + título grande. */
export default function Portada({ modelo }) {
  const t = useT();
  return (
    <section className="portada">
      <span className="deco deco-arriba" aria-hidden="true" />
      <span className="deco deco-abajo" aria-hidden="true" />

      <div className="portada-panel">
        <Puntos />
        <GloboOaxaca />
        <Puntos />
      </div>

      <div className="portada-texto">
        <span className="pildora">{t.portada.pildora}</span>
        <span className="portada-esfera" aria-hidden="true" />
        <p className="antetitulo">{t.portada.antetitulo}</p>
        <h1>
          Sombra
          <br />
          Oaxaca
        </h1>
        <p className="portada-desc">{t.portada.descripcion}</p>
        <ul className="portada-datos">
          <li>
            <span className="icono-circulo" aria-hidden="true">✦</span>
            {modelo ? nombreModelo(modelo) : "Gemma 4"}
          </li>
          <li>
            <span className="icono-circulo" aria-hidden="true">→</span>
            NASA GIBS + POWER
          </li>
        </ul>
        <a className="btn btn-verde" href="#diagnostico">
          {t.portada.cta}
        </a>
      </div>
    </section>
  );
}
