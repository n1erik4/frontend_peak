import "./Esqueleto.css";
export default function Esqueleto({ imagen = false }) {
  return <div className={`esqueleto ${imagen ? "esqueleto-imagen" : ""}`} aria-hidden="true">
    {imagen ? <div /> : <><div /><div /><div /></>}
  </div>;
}
