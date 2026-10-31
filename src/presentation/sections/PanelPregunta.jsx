import { useState } from "react";
import { useT } from "../i18n/useT";

export default function PanelPregunta({ onPreguntar, ocupado, espera = 0 }) {
  const t = useT();
  const [texto, setTexto] = useState("");

  const enviar = (q) => {
    if (ocupado || espera > 0 || !q.trim()) return;
    setTexto(q);
    onPreguntar(q);
  };

  return (
    <div className="panel-pregunta">
      <form
        className="campo-pregunta"
        onSubmit={(e) => {
          e.preventDefault();
          enviar(texto);
        }}
      >
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={t.diag.placeholder}
          aria-label={t.diag.ariaPregunta}
          disabled={ocupado}
        />
        <button className="btn btn-calor" disabled={ocupado || espera > 0 || !texto.trim()}>
          {t.diag.analizar}
        </button>
      </form>
      {espera > 0 && <p role="status">{t.locale.startsWith("es") ? `Podrás enviar otra pregunta en ${espera} s.` : `You can send another question in ${espera} s.`}</p>}
      <div className="sugeridas">
        {t.diag.sugeridas.map((q) => (
          <button key={q} type="button" className="sugerida" onClick={() => enviar(q)} disabled={ocupado || espera > 0}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
