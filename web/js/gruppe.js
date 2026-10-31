// Lerngruppe mit Rangliste. Gespeichert wie ein Sync-Lernstand unter einem eigenen 16-stelligen Gruppen-Code
// (gleiche Server-Funktionen, kein Konto). Geteilt werden nur Spitzname, XP, Level und Talers Outfit – kein Lernstand.

export const MAX_MITGLIEDER = 50;

/** Eigenen Eintrag in die Gruppendaten übernehmen (neuere Einträge der anderen bleiben erhalten). */
export function eintragen(daten, id, eintrag) {
  const d = daten && daten.typ === "gruppe" ? { ...daten, mitglieder: { ...(daten.mitglieder || {}) } } : { v: 1, typ: "gruppe", name: eintrag.gruppenName || "Lerngruppe", mitglieder: {} };
  const { gruppenName, ...e } = eintrag;
  if (!d.mitglieder[id] && Object.keys(d.mitglieder).length >= MAX_MITGLIEDER) throw new Error("Die Gruppe ist voll.");
  d.mitglieder[id] = e;
  return d;
}
const VERWAIST = 14 * 24 * 3600 * 1000;
const nameSchluessel = (n) => String(n || "").trim().toLocaleLowerCase("de");
/**
 * Gleiche Namen bereinigen. Einträge ab dieser Version tragen `fest: 1` (stabile ID, wird beim Geräte-Abgleich
 * erhalten) – zwei Personen mit gleichem Namen bleiben so beide stehen. Alte Einträge ohne `fest` (verlorene IDs,
 * Geräte mit älterer App) gelten als Kopie: Gibt es zum Namen einen festen Eintrag oder den eigenen (`ich`), fallen
 * sie weg, sonst bleibt nur der mit den meisten XP. Feste Einträge, die 14 Tage länger als ein gleichnamiger nicht
 * aktualisiert wurden (z. B. nach Neuinstallation ohne Sync), zählen ebenfalls als Kopie. „Anonym“ und leere Namen bleiben unberührt.
 */
export function namenVereinen(mitglieder = {}, ich = null) {
  const gruppen = new Map();
  for (const [id, e] of Object.entries(mitglieder)) {
    const k = nameSchluessel(e.name);
    if (k && k !== "anonym") gruppen.set(k, [...(gruppen.get(k) || []), [id, e]]);
  }
  const weg = new Set();
  for (const liste of gruppen.values()) {
    const neuester = Math.max(...liste.map(([, e]) => e.t || 0));
    const alt = liste.filter(([id, e]) => id !== ich && (!e.fest || neuester - (e.t || 0) > VERWAIST));
    if (alt.length === liste.length) alt.sort(([, a], [, b]) => (b.xp || 0) - (a.xp || 0) || (b.t || 0) - (a.t || 0)).shift();
    for (const [id] of alt) weg.add(id);
  }
  return Object.fromEntries(Object.entries(mitglieder).filter(([id]) => !weg.has(id)));
}
/** Doppelte Einträge entfernen: eigene frühere IDs (aus dem Geräte-Abgleich) und alle Kopien mit gleichem Namen. */
export function doppelteEntfernen(daten, id, eintrag, frueher = []) {
  if (!daten?.mitglieder) return daten;
  const m = { ...daten.mitglieder };
  for (const andere of frueher) if (andere !== id) delete m[andere];
  return { ...daten, mitglieder: namenVereinen(m, id) };
}
/** Eigenen Eintrag entfernen (Gruppe verlassen). */
export function austragen(daten, id) {
  const m = { ...(daten?.mitglieder || {}) };
  delete m[id];
  return { ...daten, mitglieder: m };
}

/**
 * Rangliste: art "woche" (XP der laufenden Woche, nur Einträge dieser Woche zählen) oder "gesamt".
 * wocheVon = Montag der laufenden Woche ("JJJJ-MM-TT").
 */
export function rangliste(daten, art, wocheVon, ich = null) {
  const liste = Object.entries(namenVereinen(daten?.mitglieder || {}, ich)).map(([id, e]) => ({ id, ...e, wert: art === "woche" ? (e.wocheVon === wocheVon ? e.xpWoche || 0 : 0) : e.xp || 0 }));
  liste.sort((a, b) => b.wert - a.wert || (b.xp || 0) - (a.xp || 0) || String(a.name).localeCompare(String(b.name)));
  let platz = 0, vorher = null;
  return liste.map((e, i) => { if (e.wert !== vorher) { platz = i + 1; vorher = e.wert; } return { ...e, platz }; });
}

/** Mit dem Server abgleichen: holen, eintragen, mit Versionsprüfung speichern (bei Konflikt erneut). */
export async function gruppeSchreiben(server, code, aendern) {
  for (let versuch = 0; versuch < 4; versuch++) {
    const alt = await server.holen(code);
    const neu = aendern(alt?.daten || null);
    const v = await server.speichern(code, neu, alt?.version || 0);
    if (v != null) return neu;
  }
  throw new Error("Die Gruppe konnte gerade nicht gespeichert werden.");
}
