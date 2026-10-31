// Dominio: nombre legible del modelo. "gemma-4-e4b-it" -> "Gemma 4 E4B"
export function nombreModelo(id = "") {
  const m = id.match(/^gemma-(\d+)-([a-z0-9-]+?)(?:-it)?$/i);
  return m ? `Gemma ${m[1]} ${m[2].toUpperCase()}` : id;
}
