import { useState } from "react";
import { useT } from "../i18n/useT";

export default function PanelPregunta({ onPreguntar, ocupado }) {
  const t = useT();
  const [texto, setTexto] = useState("");

  const enviar = (q) => {
    if (ocupado || !q.trim()) return;
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
        <button className="btn btn-calor" disabled={ocupado || !texto.trim()}>
          {t.diag.analizar}
        </button>
      </form>
      <div className="sugeridas">
        {t.diag.sugeridas.map((q) => (
          <button key={q} type="button" className="sugerida" onClick={() => enviar(q)} disabled={ocupado}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
