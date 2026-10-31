export default function Cargando({ children }) {
  return (
    <div className="cargando" role="status">
      <span className="radar" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
