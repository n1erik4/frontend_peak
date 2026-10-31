// Presentación: mapa de OpenStreetMap con las capas NASA encima. Tocar el mapa elige un lugar.
import { useState } from "react";
import { CircleMarker, ImageOverlay, MapContainer, Polygon, Rectangle, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import { COLOR_RIESGO, limitesLeaflet } from "../../domain/lugar";
import { CIUDAD } from "../../domain/oaxaca";
import { useT } from "../i18n/useT";

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATRIB = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · NASA GIBS';

function CapturaClic({ onSeleccion }) {
  useMapEvents({ click: (e) => onSeleccion(e.latlng.lat, e.latlng.lng) });
  return null;
}

/**
 * capas: datos de /api/capas (temperaturaUrl, vegetacionUrl, bbox)
 * punto: {lat, lon} elegido; resultado: análisis normalizado; zonasRegion: zonas del diagnóstico regional
 */
export default function MapaInteractivo({ capas, punto, resultado, zonasRegion = [], onSeleccion }) {
  const t = useT();
  const [capa, setCapa] = useState("temperatura");
  const [opacidad, setOpacidad] = useState(0.55);

  const bbox = capas?.bbox;
  const limites = bbox ? limitesLeaflet(bbox) : null;
  const margen = bbox ? limitesLeaflet([bbox[0] - 0.4, bbox[1] - 0.4, bbox[2] + 0.4, bbox[3] + 0.4]) : undefined;
  const urlCapa = capa === "temperatura" ? capas?.temperaturaUrl : capa === "vegetacion" ? capas?.vegetacionUrl : null;
  // En modo demo el back responde un lugar fijo: se marca el punto que vino en la respuesta.
  const marca = resultado?.punto ?? punto;
  const color = COLOR_RIESGO[resultado?.riesgo] ?? COLOR_RIESGO.medio;

  return (
    <figure className="mapa-wrap">
      <div className="mapa-interactivo">
        <MapContainer
          center={[CIUDAD.lat, CIUDAD.lon]}
          zoom={11}
          minZoom={9}
          maxZoom={16}
          maxBounds={margen}
          scrollWheelZoom={false}
          className="mapa-leaflet"
        >
          <TileLayer url={OSM_URL} attribution={OSM_ATRIB} />
          {limites && urlCapa && <ImageOverlay url={urlCapa} bounds={limites} opacity={opacidad} />}
          {limites && (
            <Rectangle bounds={limites} pathOptions={{ color: "#2b6cb0", weight: 2, dashArray: "6 6", fill: false }} interactive={false} />
          )}

          {resultado?.poligono?.length > 2 && (
            <Polygon positions={resultado.poligono} pathOptions={{ color, weight: 3, fillColor: color, fillOpacity: 0.28 }}>
              <Tooltip sticky>{resultado.lugar || t.lugar.zonaMarcada}</Tooltip>
            </Polygon>
          )}

          {zonasRegion
            .filter((z) => z.lat != null && z.lon != null)
            .map((z) => (
              <CircleMarker
                key={z.nombre}
                center={[z.lat, z.lon]}
                radius={9}
                pathOptions={{ color: "#fff", weight: 2, fillColor: "#7b3fa0", fillOpacity: 0.9 }}
                eventHandlers={{ click: () => onSeleccion(z.lat, z.lon) }}
              >
                <Tooltip>{t.diag.zonaAria(z.prioridad, z.nombre)}</Tooltip>
              </CircleMarker>
            ))}

          {marca && (
            <CircleMarker
              center={[marca.lat, marca.lon]}
              radius={8}
              pathOptions={{ color: "#fff", weight: 3, fillColor: "#1a202c", fillOpacity: 1 }}
            />
          )}

          <CapturaClic onSeleccion={onSeleccion} />
        </MapContainer>
      </div>

      <div className="visor-controles">
        <div className="modos" role="group" aria-label={t.lugar.capa}>
          {["temperatura", "vegetacion", "ninguna"].map((c) => (
            <button key={c} type="button" className={`modo ${capa === c ? "activo" : ""}`} onClick={() => setCapa(c)}>
              {t.lugar.capas[c]}
            </button>
          ))}
        </div>
        <label className="opacidad">
          {t.lugar.opacidad}
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={opacidad}
            onChange={(e) => setOpacidad(Number(e.target.value))}
            disabled={capa === "ninguna"}
          />
        </label>
      </div>

      <figcaption className="leyendas">
        <span>
          <i className="escala escala-calor" /> {t.visor.leyendaCalor}
        </span>
        <span>
          <i className="escala escala-veg" /> {t.visor.leyendaVeg}
        </span>
        <span className="fecha">{t.lugar.leyendaRecuadro}</span>
      </figcaption>
    </figure>
  );
}
