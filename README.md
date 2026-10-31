# Sombra Oaxaca — Frontend

Sombra Oaxaca es un agente con **Gemma 4** que detecta islas de calor en los Valles Centrales de Oaxaca con imágenes satelitales de la NASA, explica por qué se calientan y da recomendaciones, desde la región hasta un punto que la persona toca en el mapa.

![Captura de pantalla](docs/captura.png)

## Modelo

**Gemma 4 E4B (`gemma-4-e4b-it`)** vía la API de Gemini. El ID real se lee de `GET /api/health` del backend y se muestra en la insignia del encabezado.

## Qué hace

1. **Diagnóstico regional**: muestra lado a lado la temperatura de superficie (MODIS) y la vegetación (NDVI) de NASA GIBS. El usuario hace una pregunta; Gemma compara las imágenes, consulta NASA POWER y devuelve los pasos que siguió, las zonas priorizadas y un resumen.
2. **Analiza un lugar**: un mapa de **OpenStreetMap** (Leaflet) con la capa de temperatura o de vegetación de la NASA encima. La persona toca un punto dentro de los Valles Centrales y el front manda `lat/lon` a `POST /api/zona`. El back responde con el **polígono de la zona caliente** (calculado con los píxeles de MODIS), el nombre del lugar (Nominatim), los datos de NASA POWER, el uso de suelo (Overpass) y el análisis de Gemma: causa, riesgo, acciones y los pasos que siguió. El front dibuja el polígono, coloreado por riesgo, y llena el panel. Si se toca fuera del recuadro, se avisa sin llamar al back. Las zonas del diagnóstico regional también aparecen en el mapa como puntos morados, y al tocarlos se analizan.

La etiqueta "Respuesta guardada" indica que la respuesta vino de la caché de respaldo, y "Análisis automático sin IA" que Gemma no respondió y el back armó el texto con reglas a partir de los datos reales. El interruptor "Modo demo" fuerza esas respuestas guardadas (funciona sin internet).

Backend: [sombra-back](https://github.com/<org>/sombra-back)

## Cómo correrlo

```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev
```

- `VITE_USE_MOCKS=true` usa los mocks de `src/infrastructure/mock/data/` sin backend (2 s de espera simulada).
- Para usarlo desde el celular: `npm run dev -- --host`, el back con `--host 0.0.0.0`, misma red Wi-Fi y `VITE_API_URL=http://<IP-de-la-laptop>:8000`.

Stack: React + Vite, CSS simple, sin librerías de estado. Mapa con `leaflet` + `react-leaflet`. Tiles y datos © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright).

## Arquitectura

```
src/domain/           reglas y forma de los datos (sin React ni red): diagnostico.js, lugar.js, capas.js, oaxaca.js
src/application/      casos de uso (hooks): useDiagnostico, useLugar, useInicio; ports.js define el repositorio
src/infrastructure/   http/apiRepository.js (back real), mock/mockRepository.js (VITE_USE_MOCKS), config.js
src/presentation/     App, secciones (SeccionDiagnostico, SeccionLugar), componentes (MapaInteractivo, ...)
```

## Licencia

MIT
