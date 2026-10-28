// Levelsystem: XP für jede bearbeitete Aufgabe, Level 1–100 und Erfolge („Münzalbum“).
//
// Balance (Ziel: Level 5 nach etwa einer Lernwoche, Level 100 erst nach 2–3 Jahren regelmäßigen Lernens):
// • Level n → n + 1 braucht 200 + 50 · n XP (250, 300, 350 … 5.150). Bis Level 100 sind es 267.300 XP.
// • Typische Lernwoche: 4 Tage à 30 Aufgaben ≈ 1.700 XP → Level 5 (1.300 XP) nach ca. einer Woche,
//   Level 10 nach ca. 3 Wochen, Level 25 nach ca. 3 Monaten, Level 50 nach ca. 10 Monaten, Level 100 nach ca. 3 Jahren
//   (mit intensiven Klausurphasen eher 2–2,5 Jahre).
//
// Fast alle XP werden aus dem Lernstand abgeleitet (Aufgaben je Thema, Tage, Lernpfad-Sterne, Klausuren, Erfolge) –
// so zählen bisherige Aufgaben rückwirkend mit und beim Geräteabgleich wird nichts doppelt gezählt.
// Nur Boni, die sich daraus nicht ablesen lassen (Serien, Buchungssätze, Lernpfad-Fragen, Paare), laufen über den
// Zähler `stat.xpBonus`, der wie die Aufgabenzähler pro Gerät summiert wird.

export const MAX_LEVEL = 100;

/** Die XP-Matrix – so steht sie auch in der App („So sammelst du XP“). */
export const XP = {
  richtig: 10, // jede richtig gelöste Aufgabe
  falsch: 2, // bearbeitet, aber falsch – dranbleiben zählt auch
  buchung: 5, // Buchungssatz richtig: zusätzlich
  serieAb: 3, // ab der 3. richtigen Antwort in Folge …
  serieSchritt: 2, // … +2 XP je weiterer, …
  serieMax: 10, // … höchstens +10 XP je Aufgabe
  pfadFrage: 5, // Frage im Lernpfad richtig
  pfadStern: 20, // je Stern (Bestwert) eines Lernpfad-Blocks
  tag: [[10, 20], [25, 40], [50, 60]], // Tagesbonus: ab 10 / 25 / 50 Aufgaben an einem Tag (kumulativ 20 / 60 / 120)
  klausur: 50, // Klausur abgegeben
  klausurGut: 50, // zusätzlich bei mindestens 80 % richtig
  paare: 30, // Runde „Paare finden“ geschafft
  paareFehlerfrei: 20, // zusätzlich ohne Fehler
  duellSieg: 30, // Duell gewonnen
};

/** XP, die man für den Schritt von Level n auf n + 1 braucht. */
export const bedarf = (n) => 200 + 50 * n;
/** Gesamt-XP, ab denen Level n erreicht ist (Level 1 = 0 XP). */
export const xpFuerLevel = (n) => (n - 1) * 200 + 25 * n * (n - 1);

/** Ränge in Zehnerschritten – je Rang ein Münzmetall (Farbe über --rang-<id> in style.css). */
export const RAENGE = [
  { ab: 1, id: "kupfer", name: "Kupfer" },
  { ab: 10, id: "bronze", name: "Bronze" },
  { ab: 20, id: "silber", name: "Silber" },
  { ab: 30, id: "gold", name: "Gold" },
  { ab: 40, id: "platin", name: "Platin" },
  { ab: 50, id: "jade", name: "Jade" },
  { ab: 60, id: "saphir", name: "Saphir" },
  { ab: 70, id: "rubin", name: "Rubin" },
  { ab: 80, id: "amethyst", name: "Amethyst" },
  { ab: 90, id: "diamant", name: "Diamant" },
  { ab: 100, id: "taler", name: "Goldener Taler" },
];
export const rangVon = (level) => [...RAENGE].reverse().find((r) => level >= r.ab);

/** Level aus Gesamt-XP: {level, xp, imLevel (XP seit Levelbeginn), noetig (XP für das nächste Level), anteil 0–1, rang, max}. */
export function levelAus(xp) {
  xp = Math.max(0, Math.floor(xp || 0));
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpFuerLevel(level + 1)) level += 1;
  const max = level >= MAX_LEVEL, imLevel = xp - xpFuerLevel(level), noetig = max ? 0 : bedarf(level);
  return { level, xp, imLevel, noetig, anteil: max ? 1 : imLevel / noetig, rang: rangVon(level), max };
}

/** Bonus-XP für eine bearbeitete Aufgabe (zusätzlich zu den 10 bzw. 2 XP, die aus den Zählern folgen). */
export function bonusFuerAntwort({ korrekt, typ, serie }) {
  if (!korrekt) return 0;
  let b = typ === "buchung" ? XP.buchung : 0;
  if (serie >= XP.serieAb) b += Math.min(XP.serieMax, XP.serieSchritt * (serie - XP.serieAb + 1));
  return b;
}

/** Tagesbonus für n Aufgaben an einem Tag. */
export const tagesBonus = (n) => XP.tag.reduce((s, [ab, xp]) => s + (n >= ab ? xp : 0), 0);

/** Längste Serie aufeinanderfolgender Lerntage in tage = {"JJJJ-MM-TT": n}. */
export function laengsteSerie(tage = {}) {
  const tagNr = (k) => { const [j, m, t] = k.split("-").map(Number); return Math.round(Date.UTC(j, m - 1, t) / 864e5); };
  const nr = Object.entries(tage).filter(([, n]) => n > 0).map(([k]) => tagNr(k)).sort((a, b) => a - b);
  let best = 0, lauf = 0;
  nr.forEach((x, i) => { lauf = i && x === nr[i - 1] + 1 ? lauf + 1 : 1; best = Math.max(best, lauf); });
  return best;
}

// ---------------------------------------------------------------- Erfolge

const tausend = (n) => n.toLocaleString("de-DE");
/** Belohnung je Stufe einer Reihe (Stufe 0 = erste). */
const LOHN = [25, 50, 100, 150, 250, 400, 600, 800, 1000, 1500];

/**
 * Erfolgs-Reihen: je Reihe ein Messwert (aus Lernstand und Rekorden) und Stufen.
 * Level-Erfolge bringen keine XP (sonst würde das Level sich selbst hochziehen).
 */
export const REIHEN = [
  { id: "richtig", titel: "Richtig gelöst", icon: "haken", wert: (k) => k.richtig, text: (n) => `${tausend(n)} Aufgaben richtig gelöst`,
    stufen: [[10, "Erste Schritte"], [25, "Warmgelaufen"], [50, "Fünfzig"], [100, "Hunderter"], [250, "Fleißig"], [500, "Halbes Tausend"], [1000, "Tausender"], [2500, "Profi"], [5000, "Meister"], [10000, "Legende"]] },
  { id: "serie", titel: "In Folge richtig", icon: "flamme", wert: (k) => k.serieMax, text: (n) => `${n} Aufgaben am Stück richtig`,
    stufen: [[5, "Im Fluss"], [10, "Zehner-Serie"], [25, "Unaufhaltsam"], [50, "Fehlerlos"], [100, "Perfektionist"]] },
  { id: "buchung", titel: "Buchungssätze am Stück", icon: "tkonto", wert: (k) => k.bsMax, text: (n) => `${n} Buchungssätze am Stück richtig`,
    stufen: [[3, "Soll an Haben"], [5, "Sauber gebucht"], [10, "Journal-Profi"], [25, "Hauptbuch-Held"], [50, "Bilanzsicher"]] },
  { id: "tage", titel: "Lerntage in Folge", icon: "kalender", wert: (k) => k.tageMax, text: (n) => `${n} Tage in Folge gelernt`,
    stufen: [[3, "Dranbleiber"], [7, "Eine Woche"], [14, "Zwei Wochen"], [30, "Ein Monat"], [60, "Gewohnheit"], [100, "Hundert Tage"], [365, "Ein ganzes Jahr"]] },
  { id: "starkeTage", titel: "Starke Tage", icon: "blitz", wert: (k) => k.starkeTage, text: (n) => `${n === 1 ? "Einen Tag" : `${n} Tage`} mit mindestens 25 Aufgaben`,
    stufen: [[1, "Großer Tag"], [10, "Zehn starke Tage"], [50, "Lernmaschine"], [100, "Marathon"]] },
  { id: "pfad", titel: "Lernpfad mit 3 Sternen", icon: "stern", wert: (k) => k.pfadDrei, text: (n) => `${n} Lernpfad-${n === 1 ? "Block" : "Blöcke"} mit 3 Sternen`,
    stufen: [[1, "Erster Stern"], [10, "Sternensammler"], [25, "Sternenhimmel"], [50, "Milchstraße"], [100, "Galaxie"]] },
  { id: "klausur", titel: "Klausuren", icon: "klausur", wert: (k) => k.klausuren, text: (n) => `${n} ${n === 1 ? "Klausur" : "Klausuren"} abgegeben`,
    stufen: [[1, "Prüfungsluft"], [5, "Routiniert"], [20, "Klausurerprobt"], [50, "Prüfungsprofi"]] },
  { id: "gefestigt", titel: "Gefestigt", icon: "karten", wert: (k) => k.gefestigt, text: (n) => `${n} Aufgabentypen in der Lernkartei gefestigt`,
    stufen: [[10, "Fundament"], [50, "Gut sortiert"], [150, "Wissensspeicher"], [300, "Archiv"]] },
  { id: "level", titel: "Level", icon: "pokal", ohneXp: true, wert: (k) => k.level, text: (n) => `Level ${n} erreicht`,
    stufen: [[5, "Level 5"], [10, "Level 10"], [25, "Level 25"], [50, "Level 50"], [75, "Level 75"], [100, "Level 100"]] },
];

/** Einzelne Erfolge, die an einem Moment hängen (werden beim Ereignis freigeschaltet). */
export const EINZELN = [
  { id: "klausur80", titel: "Klausurreif", icon: "pokal", text: "Eine Klausur mit mindestens 80 % abgegeben", lohn: 150, wert: (k) => k.klausurBest >= 0.8 },
  { id: "klausur100", titel: "Volle Punktzahl", icon: "pokal", text: "Eine Klausur (mind. 10 Aufgaben) komplett richtig", lohn: 400, wert: (k) => k.klausurVoll },
  { id: "paareFehlerfrei", titel: "Gutes Gedächtnis", icon: "paare", text: "„Paare finden“ ohne Fehler geschafft", lohn: 100, moment: true },
  { id: "nachteule", titel: "Nachteule", icon: "mond", text: "Nach 23 Uhr eine Aufgabe gelöst", lohn: 50, moment: true },
  { id: "fruehaufsteher", titel: "Frühaufsteher", icon: "sonne", text: "Vor 7 Uhr eine Aufgabe gelöst", lohn: 50, moment: true },
  { id: "duellsieg", titel: "Duellant", icon: "blitz", text: "Ein Duell gewonnen", lohn: 100, moment: true },
];

/** Alle Erfolge als flache Liste: {id, titel, text, icon, lohn, reihe?, ziel?, stufe?}. */
export const ERFOLGE = [
  ...REIHEN.flatMap((r) => r.stufen.map(([ziel, titel], i) => ({ id: `${r.id}-${ziel}`, reihe: r.id, stufe: i, ziel, titel, text: r.text(ziel), icon: r.icon, lohn: r.ohneXp ? 0 : LOHN[i] }))),
  ...EINZELN.map((e) => ({ ...e })),
];
const ERFOLG = Object.fromEntries(ERFOLGE.map((e) => [e.id, e]));
export const erfolgVon = (id) => ERFOLG[id];

/** Messwerte für die Erfolge aus dem Lernstand. */
export function kennzahlen(stat, level = 1) {
  const pt = Object.values(stat.proThema || {});
  const pfadBloecke = Object.values(stat.pfad || {}).flatMap((f) => Object.values(f || {}));
  const kl = stat.klausuren || [];
  return {
    richtig: pt.reduce((s, z) => s + (z.r || 0), 0),
    bearbeitet: pt.reduce((s, z) => s + (z.b || 0), 0),
    serieMax: stat.rekorde?.serie || 0,
    bsMax: stat.rekorde?.bs || 0,
    tageMax: laengsteSerie(stat.tage),
    starkeTage: Object.values(stat.tage || {}).filter((n) => n >= 25).length,
    pfadDrei: pfadBloecke.filter((b) => b.sterne >= 3).length,
    pfadSterne: pfadBloecke.reduce((s, b) => s + (b.sterne || 0), 0),
    klausuren: kl.length,
    klausurBest: kl.reduce((m, k) => Math.max(m, k.gesamt ? k.richtig / k.gesamt : 0), 0),
    klausurVoll: kl.some((k) => k.gesamt >= 10 && k.richtig === k.gesamt),
    gefestigt: Object.values(stat.lern || {}).filter((e) => e?.fach >= 3).length,
    level,
  };
}

/** XP ohne Erfolgs-Belohnungen (Grundlage für die Level-Erfolge). */
function xpOhneErfolge(stat, k) {
  const tag = Object.values(stat.tage || {}).reduce((s, n) => s + tagesBonus(n), 0);
  const klausur = (stat.klausuren || []).reduce((s, x) => s + XP.klausur + (x.gesamt && x.richtig / x.gesamt >= 0.8 ? XP.klausurGut : 0), 0);
  return k.richtig * XP.richtig + (k.bearbeitet - k.richtig) * XP.falsch + tag + k.pfadSterne * XP.pfadStern + klausur + (stat.xpBonus || 0);
}

/** Gesamt-XP mit Aufschlüsselung. */
export function xpGesamt(stat) {
  const k = kennzahlen(stat);
  const basis = xpOhneErfolge(stat, k);
  const erfolge = Object.keys(stat.erfolge || {}).reduce((s, id) => s + (ERFOLG[id]?.lohn || 0), 0);
  return { gesamt: basis + erfolge, basis, erfolge };
}

/** Fortschritt einer Erfolgs-Stufe: {wert, ziel, anteil}. */
export function fortschritt(e, k) {
  if (e.reihe) { const w = REIHEN.find((r) => r.id === e.reihe).wert(k); return { wert: Math.min(w, e.ziel), ziel: e.ziel, anteil: Math.min(1, w / e.ziel) }; }
  const ok = e.wert ? !!e.wert(k) : false;
  return { wert: ok ? 1 : 0, ziel: 1, anteil: ok ? 1 : 0 };
}

/**
 * Neue Erfolge feststellen und in stat.erfolge eintragen ({id: Zeitpunkt}).
 * momente = Ids von Moment-Erfolgen, die gerade eingetreten sind. Gibt die neu freigeschalteten Erfolge zurück.
 * Läuft in Runden, weil Belohnungen ein Level-Erfolg auslösen können.
 */
export function erfolgePruefen(stat, momente = [], jetzt = Date.now()) {
  stat.erfolge ||= {};
  const neu = [];
  for (const id of momente) if (ERFOLG[id] && !stat.erfolge[id]) { stat.erfolge[id] = jetzt; neu.push(ERFOLG[id]); }
  for (let runde = 0; runde < 5; runde++) {
    const k = kennzahlen(stat, levelAus(xpGesamt(stat).gesamt).level);
    let dazu = 0;
    for (const e of ERFOLGE) {
      if (stat.erfolge[e.id] || e.moment) continue;
      if (fortschritt(e, k).anteil >= 1) { stat.erfolge[e.id] = jetzt; neu.push(e); dazu += 1; }
    }
    if (!dazu) break;
  }
  return neu;
}

/** Erfolge zweier Geräte vereinen: freigeschaltet ist, was irgendwo freigeschaltet wurde (frühester Zeitpunkt). */
export function erfolgeVereinen(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [id, t] of Object.entries(b || {})) if (!out[id] || t < out[id]) out[id] = t;
  return out;
}
/** Rekorde (längste Serien) vereinen: je Wert das Maximum. */
export function rekordeVereinen(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) out[k] = Math.max(out[k] || 0, v || 0);
  return out;
}
