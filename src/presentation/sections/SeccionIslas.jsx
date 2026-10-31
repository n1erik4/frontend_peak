import { useState } from "react";
import EscenaCalle from "../components/EscenaCalle";
import PerfilIsla from "../components/PerfilIsla";
import { useT } from "../i18n/useT";
import { focoCalor } from "../efectos/focoCalor";

// Íconos de línea para "¿Cómo nos afecta?"
const ICONOS_AFECTA = {
  salud: (
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z M8 11h2l1-2 2 4 1-2h2" />
  ),
  noches: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z M15 4l.5 1.5L17 6l-1.5.5L15 8l-.5-1.5L13 6l1.5-.5Z" />,
  agua: <path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z M10 15a2 2 0 0 0 2 2" />,
  aire: <path d="M3 9h11a3 3 0 1 0-3-3 M3 13h15a3 3 0 1 1-3 3 M3 17h7" />,
};

function Comparador({ t }) {
  const [corte, setCorte] = useState(50);
  const e = t.islas.etiquetas;
  const etiquetas = [
    { texto: e.lamina, x: 112, y: 118 },
    { texto: e.concreto, x: 236, y: 62 },
    { texto: e.asfalto, x: 470, y: 398 },
    { texto: e.sombra, x: 650, y: 336 },
    { texto: e.pasto, x: 735, y: 250 },
  ];
  return (
    <figure className="comparador">
      <div className="comparador-vista" style={{ "--corte": `${corte}%` }}>
        <EscenaCalle modo="normal" />
        <div className="comparador-termica">
          <EscenaCalle modo="termica" etiquetas={etiquetas} />
        </div>
        <span className="comparador-linea" aria-hidden="true">
          <i />
        </span>
        <span className="comparador-chip izq">{t.islas.vistaNormal}</span>
        <span className="comparador-chip der">{t.islas.vistaTermica}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={corte}
          onChange={(ev) => setCorte(Number(ev.target.value))}
          aria-label={t.islas.ariaComparar}
        />
      </div>
      <figcaption>
        <span className="escala-termica" aria-hidden="true" />
        <span>{t.islas.fresco}</span>
        <span className="comparador-pista">{t.islas.pista}</span>
        <span>{t.islas.caliente}</span>
      </figcaption>
    </figure>
  );
}

export default function SeccionIslas() {
  const t = useT();
  const s = t.islas;
  return (
    <section className="seccion islas" id="islas" aria-labelledby="t-islas" {...focoCalor}>
      <div className="seccion-cab aparece">
        <span className="seccion-num">03</span>
        <div>
          <h2 id="t-islas">{s.titulo}</h2>
          <p>{s.descripcion}</p>
        </div>
      </div>

      {/* ¿Qué es un mapa de calor? */}
      <div className="islas-intro">
        <div className="islas-texto aparece">
          <p className="antetitulo">{s.antetitulo}</p>
          <h3>{s.queEs}</h3>
          {s.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="aparece" data-retraso="150">
          <Comparador t={t} />
        </div>
      </div>

      {/* Perfil de una isla de calor */}
      <div className="islas-perfil aparece">
        <div className="islas-perfil-texto">
          <h3>{s.perfilTitulo}</h3>
          <p>{s.perfilTexto}</p>
        </div>
        <PerfilIsla zonas={s.zonas} caliente={s.masCaliente} fresco={s.masFresco} />
      </div>

      {/* ¿Cómo nos afecta? */}
      <h3 className="islas-subtitulo aparece" id="afecta">
        {s.afectaTitulo}
      </h3>
      <div className="afecta">
        {s.afecta.map((a, i) => (
          <article key={a.clave} className={`afecta-tarjeta aparece afecta-${a.clave}`} data-retraso={i * 110}>
            <span className="afecta-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {ICONOS_AFECTA[a.clave]}
              </svg>
            </span>
            <h4>{a.titulo}</h4>
            <p>{a.texto}</p>
          </article>
        ))}
      </div>

      {/* Qué la calienta / qué la refresca */}
      <div className="balanza">
        <div className="balanza-col calienta aparece">
          <h4>{s.calientaTitulo}</h4>
          <ul>
            {s.calienta.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="balanza-col refresca aparece" data-retraso="120">
          <h4>{s.refrescaTitulo}</h4>
          <ul>
            {s.refresca.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
