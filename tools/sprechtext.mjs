// Sprechtext für die Profi-Stimme (tools/vorlesen_audio.mjs): baut den Text aus sprechbar() (web/js/vorlesen.js) so um,
// dass die Stimme ihn ohne Stocken liest – Zahlen ausgeschrieben, Zitatlisten mit „und“, keine Satzzeichen-Reste.
// Die Gerätestimme in der App nutzt das nicht (ihr Text und damit die Prüfsummen der vorhandenen Audios bleiben gleich).

const EINER = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf",
  "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const ZEHNER = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

function bis99(n, ende) {
  if (n < 20) return n === 1 && !ende ? "ein" : EINER[n];
  const e = n % 10, z = ZEHNER[Math.floor(n / 10)];
  return e ? (e === 1 ? "ein" : EINER[e]) + "und" + z : z;
}
function bis999(n, ende = true) {
  const h = Math.floor(n / 100), r = n % 100;
  return (h ? (h === 1 ? "" : bis99(h, false)) + "hundert" : "") + (r ? bis99(r, ende) : "");
}
/** Pfeile im Kompaktwissen vor sprechbar() kennzeichnen (sprechbar macht aus „→“ sonst einen Doppelpunkt). */
export const pfeileMarkieren = (k) => JSON.parse(JSON.stringify(k).replace(/→/g, "⟶"));

/** Ganze Zahl → Zahlwort (bis unter eine Billion). */
export function zahlwort(n) {
  n = Number(n);
  if (n === 0) return "null";
  const teile = [];
  const mrd = Math.floor(n / 1e9), mio = Math.floor(n / 1e6) % 1000, tsd = Math.floor(n / 1000) % 1000, rest = n % 1000;
  if (mrd) teile.push(mrd === 1 ? "eine Milliarde" : bis999(mrd) + " Milliarden");
  if (mio) teile.push(mio === 1 ? "eine Million" : bis999(mio) + " Millionen");
  let w = "";
  if (tsd) w += (tsd === 1 ? "" : bis999(tsd, false)) + "tausend";
  if (rest) w += bis999(rest);
  if (w) teile.push(w);
  return teile.join(" ");
}
/** Ordnungszahl-Stamm: 1 → „erst“, 3 → „dritt“, 20 → „zwanzigst“. */
export function ordnungsstamm(n) {
  n = Number(n);
  const besonders = { 1: "erst", 3: "dritt", 7: "siebt", 8: "acht" };
  if (n < 20) return besonders[n] || zahlwort(n) + "t";
  const r = n % 100;
  if (r && r < 20 && n > 100) return zahlwort(n - r).replace(/eins$/, "ein") + ordnungsstamm(r);
  return zahlwort(n) + "st";
}
// Endung der Ordnungszahl nach dem Wort davor: „am vierten Tag“, „der vierte Tag“, sonst „vierter Tag“.
const EN = /\b(am|im|vom|zum|beim|dem|den|des|zur|bis|ab|seit|nach|vor|zu|einem|eines)\s*$/i;
const E = /\b(der|die|das)\s*$/i;
const endung = (vorher) => EN.test(vorher) ? "en" : E.test(vorher) ? "e" : "er";

/** Dezimalzahl „0,25“ → „null Komma zwei fünf“ (Nachkommastellen einzeln). */
const komma = (ganz, nach) => `${zahlwort(ganz.replace(/\./g, ""))} Komma ${[...nach].map((z) => EINER[z]).join(" ")}`;
/** Jahreszahl vorlesen: 1999 → „neunzehnhundertneunundneunzig“, 2026 → „zweitausendsechsundzwanzig“. */
const jahr = (j) => { const n = Number(j); return n >= 1100 && n < 2000 ? bis99(Math.floor(n / 100), true) + "hundert" + (n % 100 ? bis99(n % 100, true) : "") : zahlwort(n); };

const ZITATWORT = "(?:Paragraf|Paragrafen|Absatz|Absätze|Satz|Sätze|Nummer|Nummern|Artikel|Buchstabe|Richtlinie|Hinweis|Abschnitt)";

/** Text aus sprechbar() → flüssiger Sprechtext für die Profi-Stimme. */
export function fuerStimme(text) {
  let s = String(text);
  // Monatskürzel; Trenner „·“ (aus sprechbar als „. klein“) als Komma
  s = s.replace(/\b(Jan|Feb|Aug|Sept?|Okt|Nov|Dez)\./g, (m, k) => ({ Jan: "Januar", Feb: "Februar", Aug: "August", Sep: "September", Sept: "September", Okt: "Oktober", Nov: "November", Dez: "Dezember" })[k]);
  s = s.replace(/(\p{L})\. (?=\p{Ll})/gu, "$1, ");
  // Pfeile kommen als „⟶“ (pfeileMarkieren): Ketten „A → B → C“ → „A, dann B, dann C“, einzelner Pfeil → Doppelpunkt
  s = s.replace(/[^.,;:?!⟶]*(?:⟶[^.,;:?!⟶]*){2,}/g, (m) => m.replace(/\s*⟶\s*/g, ", dann ")).replace(/\s*⟶\s*/g, ": ");
  // 1. Satzzeichen-Reste aus Klammern („(§ 3 AO): …“ → „Paragraf 3 Abgabenordnung, : …“)
  s = s.replace(/:\s*:/g, ":").replace(/\s*,\s*([:;?!])/g, "$1").replace(/([?!])\s*[.,:]/g, "$1").replace(/([.:;])\s*,/g, "$1")
    .replace(/:\s*\?/g, "?").replace(/\s+([,.;:?!])/g, "$1").replace(/,{2,}/g, ",").replace(/\.{2,}(?!\.)/g, ".")
    .replace(/…/g, " und so weiter").replace(/\s*≠\s*/g, " ungleich ").replace(/\s*×\s*,?\s*/g, " mal ")
    .replace(/\s+[−–]\s+/g, " minus ").replace(/(\p{L})-\/(\p{L})/gu, "$1- oder $2");
  // 2. Aufzählungen wie „(1) … (2) …“ → „erstens … zweitens …“ (nur einzelne Ziffern zwischen Kommas, ohne Zitatwort davor)
  const ORD = ["", "erstens", "zweitens", "drittens", "viertens", "fünftens", "sechstens", "siebtens", "achtens", "neuntens"];
  s = s.replace(new RegExp(`(^|[,:]\\s*)(?<!${ZITATWORT}\\s)(\\d)\\s*,\\s+(?=\\p{L})`, "gu"), (m, a, d) => `${a.trim() ? a.trim() + " " : ""}${ORD[d]} `);
  // 3. Zitatlisten: „Paragrafen 1, 3 Abgabenordnung“ → „… 1 und 3 …“, „Buchstabe a, b“ → „a und b“; „a–c“ → „a bis c“
  s = s.replace(/(\d+(?: [a-z])?|(?<!\p{L})[a-z]) ?[–-] ?(?=\d|[a-z](?!\p{L}))/gu, "$1 bis ");
  s = s.replace(new RegExp(`(${ZITATWORT} )((?:\\d+(?: [a-z](?![\\p{L}]))?(?: bis \\d+(?: [a-z](?![\\p{L}]))?)?(?: folgende)?|[a-z](?![\\p{L}]))(?:, (?:\\d+(?: [a-z](?![\\p{L}]))?(?: bis \\d+(?: [a-z](?![\\p{L}]))?)?(?: folgende)?|[a-z](?![\\p{L}])))+)`, "gu"),
    (m, wort, liste) => { const t = liste.split(", "); return wort + t.slice(0, -1).join(", ") + " und " + t[t.length - 1]; });
  s = s.replace(/\bAbschn\./g, "Abschnitt").replace(/\bRz\./g, "Randziffer").replace(/\bTz\./g, "Textziffer");
  // Gliederungsnummern „Richtlinie 4.2“, „Abschnitt 3.10“ → „vier Punkt zwei“
  s = s.replace(/\b(Richtlinie|Richtlinien|Hinweis|Abschnitt|Abschnitte|Randnummer|Randziffer|Textziffer) (\d+(?: ?[a-z])?(?:\.\d+)+)(?!\d)/g, (m, w, n) => `${w} ${n.split(".").join(" Punkt ")}`);
  // 4. Daten: „31.12.2026“, „01.08.02“, „31.07.“ → „einunddreißigster Juli …“
  s = s.replace(/(^|[^\d.,])(\d{1,2})\.(\d{1,2})\.(\d{4}|\d{2}(?!\d))?(?!\d)(?!,\d)/g, (m, a, t, mo, j, pos, ganz) => {
    if (Number(mo) < 1 || Number(mo) > 12 || Number(t) < 1 || Number(t) > 31) return m;
    const vorher = ganz.slice(0, pos) + a;
    const jw = j ? " " + (j.length === 2 ? [...j].map((z) => EINER[z]).join(" ") : jahr(j)) : "";
    const satzende = /^\s*(?:\p{Lu}|$)/u.test(ganz.slice(pos + m.length)) && !j ? "." : "";
    return `${a}${ordnungsstamm(t)}${endung(vorher)} ${MONATE[mo - 1]}${jw}${satzende}`;
  });
  // 5. Beträge, Prozent, Dezimalzahlen, Tausenderpunkte
  s = s.replace(/(\d{1,3}(?:\.\d{3})+|\d+),(\d+)\s?€/g, (m, g, c) => `${zahlwort(g.replace(/\./g, ""))} Euro ${c.length === 2 ? zahlwort(c) : komma("0", c)}`)
    .replace(/(\d{1,3}(?:\.\d{3})+|\d+)\s?€/g, (m, g) => `${zahlwort(g.replace(/\./g, ""))} Euro`)
    .replace(/(\d{1,3}(?:\.\d{3})+|\d+),(\d+)/g, (m, g, n) => komma(g, n))
    .replace(/\s?%/g, " Prozent").replace(/€/g, "Euro")
    .replace(/(\d{1,3}(?:\.\d{3})+)(?!\d)/g, (m) => zahlwort(m.replace(/\./g, "")));
  // 6. Ordnungszahlen „10. Tag“ (Punkt nach Zahl, danach kleiner Satzanfang oder Substantiv mitten im Satz)
  s = s.replace(/(^|\D)(\d{1,3})\.(?= (?:\p{Ll}|Tag|Monat|Jahr|Woche|Quartal|Kalender|Werktag|Stufe|Klasse|Fach|Ebene|Lebensjahr|Juli|Januar|Februar|März|April|Mai|Juni|August|September|Oktober|November|Dezember))/gu,
    (m, a, n, pos, ganz) => `${a}${ordnungsstamm(n)}${endung(ganz.slice(0, pos) + a)}`);
  // 7. „17-jährige“, „3-monatig“
  s = s.replace(/(\d+)-(\p{Ll})/gu, (m, n, b) => zahlwort(n) + b);
  // 8. Übrige Zahlen: Jahreszahlen und Grundzahlen (nach Zitatwörtern immer Grundzahl)
  s = s.replace(/\d+/g, (m, pos, ganz) => {
    const vorher = ganz.slice(Math.max(0, pos - 12), pos);
    if (m.length === 4 && /^(1[1-9]|20)/.test(m) && !new RegExp(`${ZITATWORT}\\s$`).test(vorher)) return jahr(m);
    return zahlwort(m);
  });
  // Zahlwort am Satzende: „Paragraf 3 eins“ bleibt „eins“; „ein“ vor Substantiv: „1 Tag“ → „ein Tag“, „1 Monat“
  s = s.replace(/\beins (?=(?:Tag|Monat|Jahr|Woche|Euro|Prozent)\b)/g, "ein ").replace(/\beins (?=Million|Milliarde)/g, "eine ");
  // 9. Zitatketten zum selben Gesetz: „Paragraf 1 Abgabenordnung, Paragraf 2 Abgabenordnung“ → „Paragraf 1 sowie Paragraf 2 Abgabenordnung“
  const KETTE = /(Paragraf(?:en)? [^,.;:?!]*?) (\p{Lu}[\p{L}-]*(?: \p{Lu}[\p{L}-]*)?), (?:sowie |und )?(Paragraf(?:en)? [^,.;:?!]*? )\2(?=[\s,.;:?!]|$)/u;
  for (let alt = ""; alt !== s;) { alt = s; s = s.replace(KETTE, "$1 sowie $3$2"); }
  s = s.replace(/\s{2,}/g, " ").replace(/\s+([,.;:?!])/g, "$1").trim();
  // Satzanfänge groß („… Abgabenordnung. null Komma …“ ließ die Stimme nach „null“ stocken)
  return s.replace(/(^|[.!?]\s+|\n\s*)(\p{Ll})/gu, (m, a, b) => a + b.toUpperCase());
}
