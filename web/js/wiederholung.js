// Verteilte Wiederholung (Lernkartei nach Leitner mit wachsenden Abständen).
// Jede Aufgabe wandert bei richtiger Antwort ein Fach weiter und kommt nach immer längeren Pausen wieder;
// bei einem Fehler fällt sie zurück in Fach 1 und ist am nächsten Tag wieder dran. Pro Tag rückt eine Aufgabe höchstens
// ein Fach vor – wer dieselbe Vorlage in einer Übung mehrfach richtig löst, sieht sie trotzdem morgen wieder.

/** Abstand in Tagen bis zur nächsten Wiederholung, Index = Fach (1–5). */
export const INTERVALLE = [0, 1, 3, 7, 14, 30];
export const FAECHER_MAX = 5;

/** Mitternacht (lokale Zeit) des Tages von `zeit` plus `tage` Tage. */
export function tagPlus(zeit, tage) {
  const d = new Date(zeit);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + tage);
  return d.getTime();
}

const gleicherTag = (a, b) => a != null && tagPlus(a, 0) === tagPlus(b, 0);

/**
 * Neuer Eintrag nach einer Antwort (t = Zeitpunkt der Antwort, für den Abgleich zwischen Geräten).
 * falsch: zuletzt falsch beantwortet (Stapel „Meine Fehler“) – Fach 1 allein reicht dafür nicht,
 * dort landet auch eine Aufgabe, die beim ersten Mal richtig gelöst wurde.
 * Am selben Tag schon beantwortet und jetzt richtig: Fach, Termin und „falsch“ bleiben – ein Fehler gilt erst als
 * behoben, wenn die Aufgabe an einem späteren Tag richtig gelöst wird.
 */
export function planen(eintrag, korrekt, jetzt = Date.now()) {
  if (!korrekt) return { fach: 1, faellig: tagPlus(jetzt, INTERVALLE[1]), t: jetzt, falsch: true };
  if (eintrag?.fach && gleicherTag(eintrag.t, jetzt)) return { ...eintrag, t: jetzt };
  const fach = Math.min(FAECHER_MAX, (eintrag?.fach || 0) + 1);
  return { fach, faellig: tagPlus(jetzt, INTERVALLE[fach]), t: jetzt };
}

/**
 * Einmalige Korrektur (Nov. 2026): Vorher rückte eine Aufgabe bei jeder richtigen Antwort vor, auch mehrfach am
 * selben Tag. Was in den letzten 3 Tagen beantwortet wurde und dadurch Fach 2+ mit einem Termin nach mehr als 3 Tagen
 * hat, kommt zurück in Fach 1 – verteilt auf die nächsten 3 Tage. Gibt die Zahl der geänderten Einträge zurück.
 */
export function nachholen(lern, jetzt = Date.now()) {
  const ids = Object.keys(lern).filter((id) => {
    const e = lern[id];
    return e && e.fach >= 2 && e.t >= tagPlus(jetzt, -2) && e.faellig > tagPlus(jetzt, 3);
  }).sort();
  ids.forEach((id, i) => { lern[id] = { ...lern[id], fach: 1, faellig: tagPlus(jetzt, 1 + (i % 3)), t: jetzt }; });
  return ids.length;
}

/** Fällige Aufgaben-IDs: Fehler zuerst, sonst die am längsten überfälligen. */
export function faellige(lern, ids, jetzt = Date.now()) {
  return ids.filter((id) => lern[id] && lern[id].faellig <= jetzt)
    .sort((a, b) => (lern[b].falsch ? 1 : 0) - (lern[a].falsch ? 1 : 0) || lern[a].faellig - lern[b].faellig);
}

/** Nächster Fälligkeitstermin in der Zukunft (oder null). */
export function naechste(lern, ids, jetzt = Date.now()) {
  const t = ids.map((id) => lern[id]?.faellig).filter((f) => f > jetzt);
  return t.length ? Math.min(...t) : null;
}
