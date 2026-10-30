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
const nameSchluessel = (n) => String(n || "").trim().toLocaleLowerCase("de");
/**
 * Jeder Name nur einmal: Einträge mit gleichem Namen gelten als dieselbe Person (Kopien aus verlorenen IDs, alte
 * App-Versionen). Behalten wird `ich` (falls angegeben), sonst der mit den meisten XP, bei Gleichstand der neueste.
 * „Anonym“ und leere Namen werden nicht zusammengelegt.
 */
export function namenVereinen(mitglieder = {}, ich = null) {
  const best = new Map();
  for (const [id, e] of Object.entries(mitglieder)) {
    const k = nameSchluessel(e.name);
    if (!k || k === "anonym") continue;
    const b = best.get(k);
    if (!b || b.id !== ich && (id === ich || (e.xp || 0) > (b.e.xp || 0) || ((e.xp || 0) === (b.e.xp || 0) && (e.t || 0) > (b.e.t || 0)))) best.set(k, { id, e });
  }
  const m = {};
  for (const [id, e] of Object.entries(mitglieder)) {
    const k = nameSchluessel(e.name);
    if (!k || k === "anonym" || best.get(k).id === id) m[id] = e;
  }
  return m;
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
