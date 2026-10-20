// Tagesaktivität: Lernserie (Tage in Folge), Tagesziel, Wochenverlauf.
// tage = { "2026-10-20": 14, ... } (Anzahl beantworteter Aufgaben je Kalendertag, lokale Zeit)

export const tagSchluessel = (zeit = Date.now()) => {
  const d = new Date(zeit);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const vorTagen = (n, jetzt) => { const d = new Date(jetzt); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - n); return d.getTime(); };

/** Tage in Folge mit mindestens einer Aufgabe. Heute zählt mit, ein noch leerer heutiger Tag bricht die Serie nicht. */
export function serie(tage, jetzt = Date.now()) {
  let n = 0, i = tage[tagSchluessel(jetzt)] ? 0 : 1;
  while (tage[tagSchluessel(vorTagen(i, jetzt))]) { n += 1; i += 1; }
  return n;
}

/** Die letzten 7 Tage (ältester zuerst): [{key, n, kurz, heute}] */
export function woche(tage, jetzt = Date.now()) {
  const namen = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  return Array.from({ length: 7 }, (_, k) => {
    const t = vorTagen(6 - k, jetzt), key = tagSchluessel(t);
    return { key, n: tage[key] || 0, kurz: namen[new Date(t).getDay()], heute: k === 6 };
  });
}
