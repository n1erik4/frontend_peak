import { useT } from "../i18n/useT";

/** error: { codigo, status } que viene de la capa de aplicación. */
export default function ErrorReintento({ error, onReintentar }) {
  const t = useT();
  const codigo = error?.codigo;
  const mensaje = codigo === "servidor" ? t.error.servidor(error.status) : t.error[codigo] || t.error.desconocido;
  return (
    <div className="error" role="alert">
      <p>
        <strong>{t.error.titulo}</strong> {mensaje}
      </p>
      <button type="button" className="btn btn-borde" onClick={onReintentar}>
        {t.error.reintentar}
      </button>
    </div>
  );
}
