// Klausur-Countdown: Klausurtermine je Modul (stat.termine = {id: {fach, titel, datum: "JJJJ-MM-TT", t, x?}}).
// Gelöschte Termine bleiben als Grabstein (x) stehen, damit das Löschen beim Geräteabgleich nicht verloren geht.

/** Ganze Kalendertage von heute bis zum Datum (heute = 0, gestern = −1). */
export function tageBis(datum, jetzt = Date.now()) {
  const [j, m, t] = String(datum).split("-").map(Number);
  const d = new Date(jetzt);
  return Math.round((Date.UTC(j, m - 1, t) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
}

/** Kommende Termine (heute eingeschlossen), nächster zuerst. faecher = erlaubte Module (z. B. die der Rolle). */
export function kommende(termine = {}, faecher = null, jetzt = Date.now()) {
  return Object.entries(termine || {})
    .filter(([, e]) => e && !e.x && e.datum && tageBis(e.datum, jetzt) >= 0 && (!faecher || faecher.includes(e.fach)))
    .map(([id, e]) => ({ id, ...e, tage: tageBis(e.datum, jetzt) }))
    .sort((a, b) => a.tage - b.tage);
}

/** Text für den Countdown. */
export const countdownText = (tage) => (tage === 0 ? "heute" : tage === 1 ? "morgen" : `in ${tage} Tagen`);

/**
 * Lernplan bis zur Klausur: wie viele noch nicht gefestigte Aufgabentypen pro Tag dran sein sollten,
 * damit vor der Klausur alles mindestens einmal gefestigt ist (ein Puffertag vor dem Termin).
 */
export function proTag(offen, tage) {
  if (offen <= 0) return 0;
  return Math.ceil(offen / Math.max(1, tage - 1));
}
