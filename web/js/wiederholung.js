// Verteilte Wiederholung (Lernkartei nach Leitner mit wachsenden Abständen).
// Jede Aufgabe wandert bei richtiger Antwort ein Fach weiter und kommt nach immer längeren Pausen wieder;
// bei einem Fehler fällt sie zurück in Fach 1 und ist am nächsten Tag wieder dran.

/** Abstand in Tagen bis zur nächsten Wiederholung, Index = Fach (1–5). */
export const INTERVALLE = [0, 1, 3, 7, 16, 35];
export const FAECHER_MAX = 5;

/** Mitternacht (lokale Zeit) des Tages von `zeit` plus `tage` Tage. */
export function tagPlus(zeit, tage) {
  const d = new Date(zeit);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + tage);
  return d.getTime();
}

/** Neuer Eintrag nach einer Antwort. */
export function planen(eintrag, korrekt, jetzt = Date.now()) {
  const fach = korrekt ? Math.min(FAECHER_MAX, (eintrag?.fach || 0) + 1) : 1;
  return { fach, faellig: tagPlus(jetzt, INTERVALLE[fach]) };
}

/** Fällige Aufgaben-IDs, am längsten überfällige zuerst. */
export function faellige(lern, ids, jetzt = Date.now()) {
  return ids.filter((id) => lern[id] && lern[id].faellig <= jetzt).sort((a, b) => lern[a].faellig - lern[b].faellig);
}

/** Nächster Fälligkeitstermin in der Zukunft (oder null). */
export function naechste(lern, ids, jetzt = Date.now()) {
  const t = ids.map((id) => lern[id]?.faellig).filter((f) => f > jetzt);
  return t.length ? Math.min(...t) : null;
}
