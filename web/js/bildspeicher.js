// Eigenes Hintergrundbild: wird verkleinert (JPEG) und nur auf diesem Gerät in IndexedDB gespeichert
// (zu groß für localStorage und den Geräteabgleich).

const DB = "bsr-dateien", ABLAGE = "dateien", SCHLUESSEL = "hintergrund";

function oeffnen() {
  return new Promise((ok, fehler) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(ABLAGE);
    r.onsuccess = () => ok(r.result);
    r.onerror = () => fehler(r.error);
  });
}
async function vorgang(art, ...werte) {
  const db = await oeffnen();
  return new Promise((ok, fehler) => {
    const t = db.transaction(ABLAGE, art === "get" ? "readonly" : "readwrite"), r = t.objectStore(ABLAGE)[art](...werte);
    r.onsuccess = () => ok(r.result);
    r.onerror = () => fehler(r.error);
  });
}

export const bildLaden = () => vorgang("get", SCHLUESSEL).catch(() => null);
export const bildSpeichern = (daten) => vorgang("put", daten, SCHLUESSEL);
export const bildLoeschen = () => vorgang("delete", SCHLUESSEL).catch(() => null);

/** Bilddatei auf höchstens `max` Pixel Kantenlänge verkleinern → data-URL (JPEG). */
export async function bildVerkleinern(datei, max = 1600) {
  const url = URL.createObjectURL(datei);
  try {
    const img = await new Promise((ok, fehler) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => fehler(new Error("Das Bild konnte nicht geöffnet werden.")); i.src = url; });
    const f = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * f); c.height = Math.round(img.naturalHeight * f);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  } finally { URL.revokeObjectURL(url); }
}
