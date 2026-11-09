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

/**
 * Kalender-Datei (.ics): alle kommenden Klausurtermine als ganztägige Termine (Erinnerung am Vortag)
 * und optional eine tägliche Lernerinnerung bis zum letzten Termin. name(fach) liefert den Modulnamen.
 */
export function icsErzeugen(termine, { name = (f) => f, uhrzeit = "18:00", taeglich = true, jetzt = Date.now() } = {}) {
  const l = kommende(termine, null, jetzt), d = (s) => s.replace(/-/g, ""), stamp = new Date(jetzt).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const naechster = (s) => { const [j, m, t] = s.split("-").map(Number); const x = new Date(Date.UTC(j, m - 1, t + 1)); return x.toISOString().slice(0, 10).replace(/-/g, ""); };
  const esc = (t) => String(t).replace(/[\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const z = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Finanzwirt-Trainer//DE", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const t of l) z.push("BEGIN:VEVENT", `UID:klausur-${t.id}@finanzwirt-trainer`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${d(t.datum)}`, `DTEND;VALUE=DATE:${naechster(t.datum)}`,
    `SUMMARY:${esc(`${t.titel || "Klausur"} ${name(t.fach)}`)}`, "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(`Morgen: ${t.titel || "Klausur"} ${name(t.fach)}`)}`, "TRIGGER:-PT12H", "END:VALARM", "END:VEVENT");
  if (taeglich && l.length) {
    const [h, m] = uhrzeit.split(":"), heute = new Date(jetzt), start = `${heute.getFullYear()}${String(heute.getMonth() + 1).padStart(2, "0")}${String(heute.getDate()).padStart(2, "0")}T${h}${m}00`;
    z.push("BEGIN:VEVENT", "UID:lernen-taeglich@finanzwirt-trainer", `DTSTAMP:${stamp}`, `DTSTART:${start}`, "DURATION:PT15M", `RRULE:FREQ=DAILY;UNTIL=${d(l[l.length - 1].datum)}T235959`,
      "SUMMARY:Finanzwirt-Trainer: Wiederholungen", "DESCRIPTION:Taler wartet – deine fälligen Wiederholungen dauern nur ein paar Minuten.", "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Zeit für deine Wiederholungen", "TRIGGER:PT0M", "END:VALARM", "END:VEVENT");
  }
  z.push("END:VCALENDAR");
  return z.join("\r\n") + "\r\n";
}
