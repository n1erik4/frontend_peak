# Sombra Oaxaca — Frontend

Sombra Oaxaca es un agente con **Gemma 4** que detecta islas de calor en los Valles Centrales de Oaxaca con imágenes satelitales de la NASA, explica por qué se calientan y da recomendaciones, desde la región hasta la foto de una calle.

![Captura de pantalla](docs/captura.png)

## Modelo

**Gemma 4 E4B (`gemma-4-e4b-it`)** vía la API de Gemini. El ID real se lee de `GET /api/health` del backend y se muestra en la insignia del encabezado.

## Qué hace

1. **Diagnóstico regional**: muestra lado a lado la temperatura de superficie (MODIS) y la vegetación (NDVI) de NASA GIBS. El usuario hace una pregunta; Gemma compara las imágenes, consulta NASA POWER y devuelve los pasos que siguió, las zonas priorizadas y un resumen.
2. **Mi calle**: el usuario sube o toma una foto; Gemma evalúa sombra, vegetación, superficies y riesgo usando el diagnóstico regional como contexto.

La etiqueta "Respuesta guardada" indica que la respuesta vino de la caché de respaldo y no de Gemma en vivo. El interruptor "Modo demo" fuerza esas respuestas guardadas (funciona sin internet).

Backend: [sombra-back](https://github.com/<org>/sombra-back)

## Cómo correrlo

```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev
```

- `VITE_USE_MOCKS=true` usa los mocks de `src/mocks/` sin backend (2 s de espera simulada).
- Para usarlo desde el celular: `npm run dev -- --host`, el back con `--host 0.0.0.0`, misma red Wi-Fi y `VITE_API_URL=http://<IP-de-la-laptop>:8000`.

Stack: React + Vite, CSS simple, sin librerías de estado.

## Licencia

MIT
