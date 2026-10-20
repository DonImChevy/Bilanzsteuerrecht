// Öffentliches Recht – Übertragungsaufgaben mit Grafiken (Zahlen werden bei jedem Aufruf neu gewürfelt).
import { auswahl, zahl } from "../kern.js";
import { balken, halbkreis, tabelle, stimmzettel, zeitstrahl, STIMMFARBE, FARBEN } from "./grafik.js";

const Z = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const mehrheit = (m) => Math.floor(m / 2) + 1;            // Mehrheit der Mitglieder (Art. 121 GG)
const anteil = (m, z, n) => Math.ceil((m * z) / n);       // mindestens z/n von m
const ganz = (n) => n * 100;                              // Zahlaufgaben rechnen in Hundertsteln

const U = (id, thema, erzeugen) => ({ id, thema, kategorie: "uebertragung", erzeugen });

function mcFrage(r, id, thema, text, optionen, richtig, erklaerung, { grafik = "", normen = [] } = {}) {
  return { ...auswahl(id, thema, text, optionen, richtig, erklaerung, r), grafik, normen, uebertragung: true };
}
function zahlFrage(id, thema, text, n, einheit, erklaerung, { grafik = "", normen = [] } = {}) {
  return { ...zahl(id, thema, text, ganz(n), erklaerung, { einheit, toleranz: 0, ganz: true }), grafik, normen, uebertragung: true };
}

function stimmenBalken(ja, nein, enth, mitglieder, { titel, linie, jaLabel = "Ja" }) {
  const fehlt = mitglieder - ja - nein - enth;
  return balken([
    { label: jaLabel, wert: ja, farbe: STIMMFARBE.ja },
    { label: "Nein", wert: nein, farbe: STIMMFARBE.nein },
    { label: "Enthaltung", wert: enth, farbe: STIMMFARBE.enthaltung },
    { label: "nicht abgestimmt", wert: fehlt, farbe: STIMMFARBE.fehlt },
  ], { titel, max: mitglieder * 0.62, linie, fuss: `Mitglieder des Bundestages: ${Z(mitglieder)}` });
}

// ------------------------------------------------------------------ Kanzlerwahl (Art. 63)
const kanzlerwahl = U("u-kanzlerwahl", "oer-bundesregierung", (r) => {
  const M = 630, need = mehrheit(M);
  const phase = r.wahl([1, 2, 3]);
  const ja = r.zahl(need - 30, need + 25);
  if (phase < 3) {
    const enth = r.zahl(0, 25), nein = r.zahl(150, M - ja - enth - 5);
    const gewaehlt = ja >= need;
    const opt = [
      "Gewählt – der Bundespräsident muss sie ernennen",
      "Nicht gewählt – der Bundestag kann binnen 14 Tagen mit der Mehrheit seiner Mitglieder einen Kanzler wählen",
      "Nicht gewählt – im nächsten Wahlgang genügen die meisten Stimmen",
      "Gewählt, weil sie mehr Ja- als Nein-Stimmen erhalten hat – der Bundespräsident kann sie ernennen",
    ];
    if (phase === 2) opt[1] = "Nicht gewählt – innerhalb der 14 Tage sind weitere Wahlgänge möglich; danach entscheidet ein Wahlgang mit relativer Mehrheit";
    const richtig = gewaehlt ? 0 : 1;
    const lage = phase === 1
      ? "Der Bundespräsident hat Frau A. als Bundeskanzlerin vorgeschlagen. Ergebnis des ersten Wahlgangs:"
      : "Die vom Bundespräsidenten Vorgeschlagene ist gescheitert. Eine Woche später kandidiert Frau A. auf Vorschlag aus der Mitte des Bundestages. Ergebnis:";
    return mcFrage(r, "u-kanzlerwahl", "oer-bundesregierung", `${lage}\n\nIst Frau A. gewählt? Welche Rechtsfolge tritt ein?`, opt, [richtig],
      `Erforderlich ist die Mehrheit der Mitglieder des Bundestages (Art. 63 Abs. ${phase === 1 ? 2 : 3}, Art. 121 GG): mehr als 315, also mindestens ${need} Stimmen. Frau A. hat ${ja} Stimmen → ${gewaehlt ? "gewählt; der Bundespräsident muss sie ernennen (Art. 63 Abs. 2 Satz 2)." : phase === 1 ? "nicht gewählt. Phase 2: Wahl binnen 14 Tagen mit Mehrheit der Mitglieder (Art. 63 Abs. 3)." : "nicht gewählt. Kommt binnen 14 Tagen keine Wahl zustande, folgt unverzüglich ein Wahlgang, in dem die meisten Stimmen genügen (Art. 63 Abs. 4)."} Auf Ja gegenüber Nein kommt es nicht an.`,
      { grafik: stimmenBalken(ja, nein, enth, M, { titel: `Kanzlerwahl – ${phase}. Phase`, linie: { wert: need, label: `Mehrheit der Mitglieder: ${need}` }, jaLabel: "Ja (Frau A.)" }), normen: ["GG 63", "GG 121"] });
  }
  // Phase 3: mehrere Kandidaten, meiste Stimmen
  const a = r.zahl(need - 40, need + 15), b = r.zahl(150, Math.min(a - 10, 250)), enth = r.zahl(5, M - a - b - 40);
  const opt = [
    "Gewählt – der Bundespräsident muss sie binnen sieben Tagen ernennen",
    "Gewählt – der Bundespräsident muss sie binnen sieben Tagen ernennen oder den Bundestag auflösen",
    "Nicht gewählt, weil sie nicht die Mehrheit der Mitglieder erreicht hat",
    "Gewählt – der Bundestag ist automatisch aufgelöst",
  ];
  const richtig = a >= need ? 0 : 1;
  return mcFrage(r, "u-kanzlerwahl", "oer-bundesregierung",
    "Nach der Wahl hat der Bundestag binnen 14 Tagen keinen Kanzler gewählt. Im sofort angesetzten neuen Wahlgang treten Frau A. und Herr B. an:\n\nWelche Rechtsfolge tritt ein?", opt, [richtig],
    `Dritte Phase (Art. 63 Abs. 4): Gewählt ist, wer die meisten Stimmen erhält → Frau A. (${a} vor ${b}). ${a >= need ? `Sie hat zugleich die Mehrheit der Mitglieder (${need}) → der Bundespräsident muss sie binnen sieben Tagen ernennen.` : `Sie verfehlt die Mehrheit der Mitglieder (${need}) → der Bundespräsident muss binnen sieben Tagen entweder sie ernennen oder den Bundestag auflösen (Minderheitsregierung oder Neuwahl).`}`,
    { grafik: balken([
        { label: "Frau A.", wert: a, farbe: FARBEN[0] }, { label: "Herr B.", wert: b, farbe: FARBEN[3] },
        { label: "Enthaltung", wert: enth, farbe: STIMMFARBE.enthaltung }, { label: "nicht abgestimmt", wert: M - a - b - enth, farbe: STIMMFARBE.fehlt },
      ], { titel: "Kanzlerwahl – 3. Phase", max: M * 0.62, linie: { wert: need, label: `Mehrheit der Mitglieder: ${need}` }, fuss: "Mitglieder des Bundestages: 630" }),
      normen: ["GG 63 4", "GG 121"] });
});

// ------------------------------------------------------------------ Konstruktives Misstrauensvotum (Art. 67)
const misstrauen = U("u-misstrauen", "oer-bundesregierung", (r) => {
  const M = 630, need = mehrheit(M);
  const fall = r.wahl(["ok", "stimmen", "frist"]);
  const ja = fall === "stimmen" ? r.zahl(need - 15, need - 1) : r.zahl(need, need + 20);
  const nein = r.zahl(200, M - ja - 15), enth = r.zahl(0, Math.min(20, M - ja - nein));
  const wahlZeit = fall === "frist" ? r.wahl(["Mittwoch, 9:00 Uhr", "Dienstag, 16:00 Uhr"]) : r.wahl(["Mittwoch, 11:00 Uhr", "Donnerstag, 9:00 Uhr"]);
  const opt = [
    "Ja – der Bundespräsident muss den Kanzler entlassen und Herrn N. ernennen",
    `Nein – Herr N. hat nicht die Mehrheit der Mitglieder (${need}) erreicht`,
    "Nein – zwischen Antrag und Wahl liegen keine 48 Stunden",
    "Ja – der Bundespräsident kann nach seinem Ermessen über die Entlassung entscheiden",
  ];
  const richtig = { ok: 0, stimmen: 1, frist: 2 }[fall];
  return mcFrage(r, "u-misstrauen", "oer-bundesregierung",
    `Die Opposition beantragt am Montag um 10:00 Uhr, dem Bundeskanzler das Misstrauen auszusprechen und Herrn N. zum Nachfolger zu wählen. Abstimmung am ${wahlZeit}: ${ja} Abgeordnete stimmen für Herrn N.\n\nIst der Bundeskanzler wirksam abgelöst?`, opt, [richtig],
    `Art. 67 GG verlangt: Wahl eines Nachfolgers mit der Mehrheit der Mitglieder (mindestens ${need}) und mindestens 48 Stunden zwischen Antrag und Wahl (Montag 10 Uhr → frühestens Mittwoch 10 Uhr). ${fall === "ok" ? "Beides ist erfüllt; der Bundespräsident muss dem Ersuchen entsprechen – er hat kein Ermessen." : fall === "stimmen" ? `${ja} Stimmen reichen nicht.` : `Die Abstimmung am ${wahlZeit} liegt weniger als 48 Stunden nach dem Antrag.`}`,
    { grafik: zeitstrahl([{ datum: "Mo 10:00", text: "Antrag nach Art. 67 GG" }, { datum: "Mi 10:00", text: "frühestmöglicher Wahltermin (48 h)" },
      { datum: wahlZeit.replace("Mittwoch, ", "Mi ").replace("Dienstag, ", "Di ").replace("Donnerstag, ", "Do ").replace(" Uhr", ""), text: `Abstimmung: ${ja} Ja / ${nein} Nein / ${enth} Enth.` }], { titel: "Ablauf" }),
      normen: ["GG 67", "GG 121"] });
});

// ------------------------------------------------------------------ Vertrauensfrage (Art. 68)
const vertrauen = U("u-vertrauen", "oer-bundesregierung", (r) => {
  const M = 630, need = mehrheit(M);
  const ja = r.zahl(need - 40, need + 20), nein = r.zahl(150, M - ja - 30), enth = r.zahl(0, 30);
  const erfolgreich = ja >= need;
  const opt = [
    "Das Vertrauen ist ausgesprochen – eine Auflösung des Bundestages nach Art. 68 ist nicht möglich",
    "Der Bundespräsident kann auf Vorschlag des Kanzlers binnen 21 Tagen den Bundestag auflösen – er muss es aber nicht",
    "Der Bundestag ist automatisch aufgelöst; Neuwahl binnen 60 Tagen",
    "Der Bundeskanzler ist automatisch entlassen",
  ];
  return mcFrage(r, "u-vertrauen", "oer-bundesregierung",
    "Der Bundeskanzler stellt die Vertrauensfrage. Die Abstimmung findet 48 Stunden nach dem Antrag statt:\n\nWelche Rechtsfolge ergibt sich?", opt, [erfolgreich ? 0 : 1],
    `Art. 68 Abs. 1 GG: Maßgeblich ist die Zustimmung der Mehrheit der Mitglieder (${need}). Mit ${ja} Ja-Stimmen ist die Vertrauensfrage ${erfolgreich ? "erfolgreich." : "gescheitert. Der Bundespräsident KANN auf Vorschlag des Kanzlers binnen 21 Tagen auflösen (Ermessen). Das Recht erlischt, sobald der Bundestag mit Mehrheit seiner Mitglieder einen anderen Kanzler wählt."}`,
    { grafik: stimmenBalken(ja, nein, enth, M, { titel: "Vertrauensfrage", linie: { wert: need, label: `Mehrheit der Mitglieder: ${need}` } }), normen: ["GG 68", "GG 121"] });
});

// ------------------------------------------------------------------ Bundesrat: Stimmenzahl (Art. 51 Abs. 2)
const brStimmenFuer = (e) => (e > 7e6 ? 6 : e > 6e6 ? 5 : e > 2e6 ? 4 : 3);
const brStimmen = U("u-br-stimmen", "oer-bundesrat", (r) => {
  const namen = r.mischen(["Nordland", "Südmark", "Westerburg", "Ostheide", "Mittelgau", "Seeland"]).slice(0, 5);
  const grenzfall = r.wahl([2_000_000, 6_000_000, 7_000_000]);
  const werte = r.mischen([grenzfall, r.zahl(5, 19) * 100_000, r.zahl(21, 59) * 100_000, r.zahl(61, 69) * 100_000, r.zahl(71, 180) * 100_000]);
  const i = r.zahl(0, 4);
  const land = namen[i], e = werte[i], s = brStimmenFuer(e);
  return zahlFrage("u-br-stimmen", "oer-bundesrat",
    `Ein (fiktiver) Bundesstaat hat die Länder aus der Tabelle. Wie viele Stimmen hat das Land ${land} im Bundesrat?`, s, "Stimmen",
    `Art. 51 Abs. 2 GG: mindestens 3; MEHR ALS 2 Mio. → 4; mehr als 6 Mio. → 5; mehr als 7 Mio. → 6 Stimmen. ${land} hat ${Z(e)} Einwohner → ${s} Stimmen.${e === grenzfall ? " Achtung Grenzfall: genau " + Z(e) + " ist nicht „mehr als“ – daher die niedrigere Stufe." : ""}`,
    { grafik: tabelle(["Land", "Einwohner"], namen.map((n, k) => [n, Z(werte[k])]), { rechts: [1], hervor: i }), normen: ["GG 51 2"] });
});

// ------------------------------------------------------------------ Bundesrat: Beschluss (Art. 51 Abs. 3, 52 Abs. 3)
const LAENDER = [["Baden-Württemberg", 6], ["Bayern", 6], ["Berlin", 4], ["Brandenburg", 4], ["Bremen", 3], ["Hamburg", 3],
  ["Hessen", 5], ["Mecklenburg-Vorpommern", 3], ["Niedersachsen", 6], ["Nordrhein-Westfalen", 6], ["Rheinland-Pfalz", 4],
  ["Saarland", 3], ["Sachsen", 4], ["Sachsen-Anhalt", 4], ["Schleswig-Holstein", 4], ["Thüringen", 4]];

function brAbstimmung(r) {
  for (;;) {
    const geteilt = r.muenze() ? r.zahl(0, 15) : -1;
    const z = LAENDER.map(([n, s], i) => {
      if (i === geteilt) return { n, s, v: "geteilt" };
      const x = r.next();
      return { n, s, v: x < 0.5 ? "ja" : x < 0.75 ? "nein" : "enthaltung" };
    });
    const ja = z.filter((l) => l.v === "ja").reduce((a, l) => a + l.s, 0);
    if (ja >= 30 && ja <= 40) return { z, ja, geteilt };
  }
}
const vText = (l) => ({ ja: "Ja", nein: "Nein", enthaltung: "Enthaltung", geteilt: `uneinheitlich (${Math.ceil(l.s / 2)} Ja, ${Math.floor(l.s / 2)} Nein)` }[l.v]);

const brBeschluss = U("u-br-beschluss", "oer-bundesrat", (r) => {
  const { z, ja, geteilt } = brAbstimmung(r);
  const gefasst = ja >= 35;
  const geteiltText = geteilt >= 0 ? ` Die Stimmen von ${z[geteilt].n} sind wegen uneinheitlicher Abgabe ungültig (Art. 51 Abs. 3 Satz 2).` : "";
  return mcFrage(r, "u-br-beschluss", "oer-bundesrat",
    "Der Bundesrat stimmt über einen Antrag ab. Die Länder haben wie in der Tabelle abgestimmt.\n\nIst der Beschluss gefasst?",
    ["Ja – die erforderliche Mehrheit ist erreicht", "Nein – die erforderliche Mehrheit ist nicht erreicht"], [gefasst ? 0 : 1],
    `Art. 52 Abs. 3 Satz 1 GG: mindestens die Mehrheit seiner Stimmen, d. h. 35 von 69. Gültige Ja-Stimmen: ${ja}.${geteiltText} Enthaltungen wirken wie Nein-Stimmen. → ${gefasst ? "Beschluss gefasst." : "Beschluss nicht gefasst."}`,
    { grafik: tabelle(["Land", "Stimmen", "Abstimmung"], z.map((l) => [l.n, String(l.s), vText(l)]), { rechts: [1] }), normen: ["GG 52 3", "GG 51 3", "GG 51 2"] });
});

const brJaZahl = U("u-br-jastimmen", "oer-bundesrat", (r) => {
  const { z, ja, geteilt } = brAbstimmung(r);
  return zahlFrage("u-br-jastimmen", "oer-bundesrat",
    "Wie viele gültige Ja-Stimmen hat der Antrag im Bundesrat erhalten? (Abstimmungsverhalten siehe Tabelle)", ja, "Stimmen",
    `Addiert werden nur die Länder mit „Ja“.${geteilt >= 0 ? ` ${z[geteilt].n} hat uneinheitlich abgestimmt → alle Stimmen dieses Landes sind ungültig (Art. 51 Abs. 3 Satz 2).` : ""} Ergebnis: ${ja} Ja-Stimmen; erforderlich für einen Beschluss wären 35 (Art. 52 Abs. 3).`,
    { grafik: tabelle(["Land", "Stimmen", "Abstimmung"], z.map((l) => [l.n, String(l.s), vText(l)]), { rechts: [1] }), normen: ["GG 51 3", "GG 52 3"] });
});

// ------------------------------------------------------------------ Bundestag: einfacher Beschluss (Art. 42 Abs. 2)
const btBeschluss = U("u-bt-beschluss", "oer-bundestag", (r) => {
  const M = 630;
  const ja = r.zahl(220, 330), nein = r.zahl(180, Math.min(320, M - ja - 5)), enth = r.zahl(0, Math.min(90, M - ja - nein));
  if (ja === nein) return btBeschluss.erzeugen(r);
  const angenommen = ja > nein;
  return mcFrage(r, "u-bt-beschluss", "oer-bundestag",
    "Der Bundestag stimmt über einen Gesetzentwurf (einfaches Gesetz) ab. Ist der Gesetzesbeschluss gefasst?",
    ["Ja – Mehrheit der abgegebenen Stimmen", "Nein – die Mehrheit der Mitglieder (316) ist nicht erreicht", "Nein – es fehlt eine Zweidrittelmehrheit", "Nein – mehr als die Hälfte hat nicht mit Ja gestimmt"],
    [angenommen ? 0 : 3],
    `Art. 42 Abs. 2 GG: Mehrheit der abgegebenen Stimmen (einfache Mehrheit) genügt – eine absolute Mehrheit ist für einfache Gesetze nicht erforderlich. Enthaltungen werden nach der Praxis des Bundestages nicht mitgezählt. Ja ${ja} gegenüber Nein ${nein} → ${angenommen ? "angenommen." : "abgelehnt, weil die Ja-Stimmen nicht überwiegen."}`,
    { grafik: stimmenBalken(ja, nein, enth, M, { titel: "Abstimmung im Bundestag" }), normen: ["GG 42 2"] });
});

// ------------------------------------------------------------------ Grundgesetzänderung (Art. 79)
const gg79 = U("u-gg-aenderung", "oer-staatsziele", (r) => {
  const fall = r.wahl(["ok", "bt", "br", "ok", "ewig"]);
  const bt = fall === "bt" ? r.zahl(390, 419) : r.zahl(420, 480);
  const br = fall === "br" ? r.zahl(38, 45) : r.zahl(46, 60);
  const gegenstand = fall === "ewig"
    ? "Das Gesetz soll die Länder abschaffen und Deutschland in einen Einheitsstaat umwandeln."
    : r.wahl(["Das Gesetz fügt ein neues Staatsziel „Sport“ als Art. 20b in das GG ein.", "Das Gesetz ändert die Zusammensetzung des Bundesverfassungsgerichts.", "Das Gesetz senkt das Wahlalter in Art. 38 Abs. 2 GG auf 16 Jahre."]);
  const opt = ["Ja, die Änderung ist wirksam zustande gekommen", "Nein – im Bundestag fehlt die Zweidrittelmehrheit der Mitglieder",
    "Nein – im Bundesrat fehlt die Zweidrittelmehrheit der Stimmen", "Nein – die Änderung verstößt gegen Art. 79 Abs. 3 GG"];
  const richtig = { ok: 0, bt: 1, br: 2, ewig: 3 }[fall];
  return mcFrage(r, "u-gg-aenderung", "oer-staatsziele",
    `${gegenstand} Im Bundestag (630 Mitglieder) stimmen ${bt} Abgeordnete zu, im Bundesrat (69 Stimmen) ${br} Stimmen.\n\nIst die Grundgesetzänderung zulässig zustande gekommen?`, opt, [richtig],
    `Art. 79 Abs. 2: zwei Drittel der Mitglieder des Bundestages (630 × 2/3 = 420) und zwei Drittel der Stimmen des Bundesrates (69 × 2/3 = 46). Bundestag ${bt} ${bt >= 420 ? "✓" : "✗"}, Bundesrat ${br} ${br >= 46 ? "✓" : "✗"}.${fall === "ewig" ? " Aber: Die Gliederung des Bundes in Länder ist nach Art. 79 Abs. 3 unabänderlich – die Änderung ist trotz der Mehrheiten unzulässig." : ""}`,
    { grafik: balken([{ label: "Bundestag (Ja)", wert: bt, farbe: FARBEN[0], text: `${bt} von 630` }, { label: "Bundesrat (Ja)", wert: Math.round((br * 630) / 69), farbe: FARBEN[4], text: `${br} von 69` }],
      { titel: "Zustimmung", max: 630, linie: { wert: 420, label: "2/3-Marke" } }), normen: ["GG 79"] });
});

// ------------------------------------------------------------------ Sitzverteilung (§§ 4, 5 BWahlG)
function sainteLague(stimmen, sitze) {
  const s = stimmen.map(() => 0);
  for (let k = 0; k < sitze; k++) {
    let best = -1, bestQ = -1;
    stimmen.forEach((v, i) => { const q = v / (2 * s[i] + 1); if (q > bestQ) { bestQ = q; best = i; } });
    s[best] += 1;
  }
  // Prüfen, ob ein gültiger Divisor existiert (kein Gleichstand an der Grenze)
  const unten = Math.max(...stimmen.map((v, i) => v / (s[i] + 0.5)));
  const oben = Math.min(...stimmen.map((v, i) => (s[i] > 0 ? v / (s[i] - 0.5) : Infinity)));
  return { s, unten, oben, eindeutig: unten < oben };
}

function wahlergebnis(r) {
  const namen = ["Partei A", "Partei B", "Partei C", "Partei D", "Partei E", "Partei F"];
  for (;;) {
    const anteile = [r.zahl(240, 330), r.zahl(160, 240), r.zahl(90, 150), r.zahl(55, 95), r.zahl(40, 49), r.zahl(30, 48)];
    const rest = 1000 - anteile.reduce((a, b) => a + b, 0);
    if (rest < 20 || rest > 120) continue;
    const gesamt = 2_000_000;
    const parteien = namen.map((n, i) => ({ n, v: (anteile[i] * gesamt) / 1000, p: anteile[i] / 10, farbe: FARBEN[i] }));
    // Grundmandate: E hat 3 Wahlkreissiege (zieht trotz < 5 % ein), F nur 1
    parteien[4].wk = r.wahl([3, 4]); parteien[5].wk = r.wahl([0, 1, 2]);
    parteien.forEach((p) => { p.dabei = p.p >= 5 || (p.wk || 0) >= 3; });
    const dabei = parteien.filter((p) => p.dabei);
    const sitze = 100;
    const sl = sainteLague(dabei.map((p) => p.v), sitze);
    if (!sl.eindeutig) continue;
    dabei.forEach((p, i) => { p.sitze = sl.s[i]; });
    const divisor = Math.ceil(sl.unten / 100) * 100 < sl.oben ? Math.ceil(sl.unten / 100) * 100 : (sl.unten + sl.oben) / 2;
    return { parteien, sonstige: rest / 10, sitze, divisor, gesamt };
  }
}

const sperrklausel = U("u-sperrklausel", "oer-wahl", (r) => {
  const w = wahlergebnis(r);
  const opt = w.parteien.map((p) => p.n);
  return mcFrage(r, "u-sperrklausel", "oer-wahl",
    "Ergebnis einer Bundestagswahl (gültige Zweitstimmen bundesweit; in Klammern: Zahl der Wahlkreise, in denen Bewerber der Partei die meisten Erststimmen erhielten). Keine der Parteien ist eine Partei einer nationalen Minderheit.\n\nWelche Parteien werden bei der Sitzverteilung berücksichtigt? (Mehrfachauswahl)",
    opt, w.parteien.map((p, i) => (p.dabei ? i : -1)).filter((i) => i >= 0),
    `§ 4 Abs. 2 Satz 2 Nr. 2 BWahlG: Parteien unter 5 % werden nicht berücksichtigt – nach der Maßgabe des BVerfG (Fußnote zu § 4 BWahlG) aber nur, wenn ihre Bewerber in weniger als drei Wahlkreisen die meisten Erststimmen erhalten haben.\n${w.parteien.map((p) => `• ${p.n}: ${p.p.toLocaleString("de-DE")} %, ${p.wk || 0} Wahlkreise → ${p.dabei ? "berücksichtigt" : "nicht berücksichtigt"}`).join("\n")}`,
    { grafik: balken(w.parteien.map((p) => ({ label: `${p.n} (${p.wk || 0} WK)`, wert: p.p, farbe: p.farbe, text: p.p.toLocaleString("de-DE") + " %" }))
      .concat([{ label: "Sonstige", wert: w.sonstige, farbe: STIMMFARBE.fehlt, text: w.sonstige.toLocaleString("de-DE") + " %" }]),
      { titel: "Zweitstimmen in %", max: 36, linie: { wert: 5, label: "5 %" } }), normen: ["BWahlG 4 2"] });
});

const sitzverteilung = U("u-sitzverteilung", "oer-wahl", (r) => {
  const w = wahlergebnis(r);
  const dabei = w.parteien.filter((p) => p.dabei);
  const ziel = r.wahl(dabei);
  const zeilen = w.parteien.map((p) => [p.n, Z(p.v), p.dabei ? "ja" : "nein"]);
  return zahlFrage("u-sitzverteilung", "oer-wahl",
    `Vereinfachte Modellrechnung: In einem Parlament mit ${w.sitze} Sitzen werden die Sitze nach § 5 BWahlG (Divisorverfahren mit Standardrundung) auf die berücksichtigten Parteien verteilt. Wie viele Sitze erhält ${ziel.n}?`, ziel.sitze, "Sitze",
    `Summe der berücksichtigten Stimmen ÷ ${w.sitze} ergibt den Startdivisor; er wird so angepasst, dass genau ${w.sitze} Sitze vergeben werden (§ 5 Abs. 2). Ein passender Divisor ist z. B. ${Z(Math.round(w.divisor))}.\n${dabei.map((p) => `• ${p.n}: ${Z(p.v)} ÷ ${Z(Math.round(w.divisor))} = ${(p.v / w.divisor).toLocaleString("de-DE", { maximumFractionDigits: 2 })} → ${p.sitze} Sitze`).join("\n")}\nRundung nach § 5 Abs. 3: unter 0,5 ab, über 0,5 auf.`,
    { grafik: tabelle(["Partei", "Zweitstimmen", "berücksichtigt"], zeilen, { rechts: [1] }),
      normen: ["BWahlG 5", "BWahlG 4 2"] });
});

const sitzbild = U("u-sitzbild", "oer-bundestag", (r) => {
  const w = wahlergebnis(r);
  const dabei = w.parteien.filter((p) => p.dabei);
  const sitze = dabei.map((p) => Math.round((p.sitze * 630) / 100));
  sitze[0] += 630 - sitze.reduce((a, b) => a + b, 0);
  const koal = r.wahl([[0, 2], [0, 3], [1, 2, 3], [0, 1], [1, 2]].filter((k) => k.every((i) => i < dabei.length)));
  const summe = koal.reduce((a, i) => a + sitze[i], 0);
  const frage = r.wahl(["kanzler", "verfassung"]);
  const need = frage === "kanzler" ? 316 : 420;
  const reicht = summe >= need;
  const namen = koal.map((i) => dabei[i].n).join(" + ");
  return mcFrage(r, "u-sitzbild", "oer-bundestag",
    `Sitzverteilung im Bundestag (630 Sitze) siehe Grafik. Die Fraktionen ${namen} wollen gemeinsam ${frage === "kanzler" ? "im ersten Wahlgang eine Kanzlerin wählen" : "das Grundgesetz ändern (nur Bundestag betrachtet)"} – alle ihre Abgeordneten stimmen geschlossen mit Ja, alle übrigen mit Nein.\n\nReicht das?`,
    [`Ja – ${summe} Stimmen genügen`, `Nein – ${summe} Stimmen genügen nicht`], [reicht ? 0 : 1],
    `${frage === "kanzler" ? "Kanzlerwahl: Mehrheit der Mitglieder (Art. 63 Abs. 2, Art. 121) = 316." : "Grundgesetzänderung: zwei Drittel der Mitglieder (Art. 79 Abs. 2) = 420."} ${namen}: ${koal.map((i) => sitze[i]).join(" + ")} = ${summe} Sitze → ${reicht ? "reicht." : "reicht nicht."}`,
    { grafik: halbkreis(dabei.map((p, i) => ({ label: p.n, n: sitze[i], farbe: p.farbe })), { titel: "Sitze im Bundestag" }), normen: frage === "kanzler" ? ["GG 63 2", "GG 121"] : ["GG 79 2"] });
});

// ------------------------------------------------------------------ Zweitstimmendeckung (§ 6 Abs. 1 BWahlG)
const zweitstimmendeckung = U("u-zweitstimmendeckung", "oer-wahl", (r) => {
  const n = r.zahl(5, 9);
  const sitze = r.zahl(3, n + 2);
  const anteile = r.mischen(Array.from({ length: 40 }, (_, i) => 24 + i)).slice(0, n).map((x) => x + r.zahl(0, 9) / 10).sort((a, b) => b - a);
  const kandidaten = anteile.map((a, i) => ({ wk: `WK ${r.zahl(1, 299)}`, name: ["Arndt", "Becker", "Celik", "Dorn", "Ebert", "Fuchs", "Gruber", "Hahn", "Ilić"][i], a }));
  const gemischt = r.mischen(kandidaten);
  const leer = Math.max(0, n - sitze);
  const variante = r.wahl(["leer", "liste"]);
  const text = `Partei P stehen im Land L nach der Unterverteilung ${sitze} Sitze zu. ${n} ihrer Bewerber haben ihren Wahlkreis gewonnen (meiste Erststimmen). Erststimmenanteile siehe Tabelle.\n\n`;
  const erkl = `§ 6 Abs. 1 BWahlG: Die Wahlkreissieger werden nach fallendem Erststimmenanteil gereiht und erhalten in dieser Reihenfolge die ${sitze} Sitze (Zweitstimmendeckung). Reihenfolge: ${kandidaten.map((k) => `${k.name} ${k.a.toLocaleString("de-DE")} %`).join(", ")}.`;
  if (variante === "leer") {
    return zahlFrage("u-zweitstimmendeckung", "oer-wahl", text + "Wie viele Wahlkreissieger der Partei P erhalten KEINEN Sitz?", leer, "Bewerber",
      erkl + (leer ? ` Die letzten ${leer} (${kandidaten.slice(sitze).map((k) => k.name).join(", ")}) gehen leer aus – ihr Wahlkreis ist dann nicht durch einen Wahlkreisabgeordneten vertreten.` : " Alle Wahlkreissieger erhalten einen Sitz."),
      { grafik: tabelle(["Wahlkreis", "Bewerber", "Erststimmenanteil"], gemischt.map((k) => [k.wk, k.name, k.a.toLocaleString("de-DE") + " %"]), { rechts: [2] }), normen: ["BWahlG 6 1", "BWahlG 1 3"] });
  }
  return zahlFrage("u-zweitstimmendeckung", "oer-wahl", text + "Wie viele Sitze der Partei P gehen an Bewerber der Landesliste?", Math.max(0, sitze - n), "Sitze",
    erkl + ` Verbleibende Sitze gehen nach § 6 Abs. 4 an die Listenbewerber in der Reihenfolge der Landesliste: ${Math.max(0, sitze - n)}.`,
    { grafik: tabelle(["Wahlkreis", "Bewerber", "Erststimmenanteil"], gemischt.map((k) => [k.wk, k.name, k.a.toLocaleString("de-DE") + " %"]), { rechts: [2] }), normen: ["BWahlG 6 1", "BWahlG 6 4"] });
});

// ------------------------------------------------------------------ Wahl des Bundespräsidenten (Art. 54 Abs. 6)
const bpWahl = U("u-bp-wahl", "oer-bundespraesident", (r) => {
  const M = 1260, need = mehrheit(M);
  const gang = r.wahl([1, 2, 3]);
  const a = r.zahl(need - 60, need + 30), b = r.zahl(350, Math.min(a - 20, 520)), c = r.zahl(40, Math.min(120, M - a - b - 10));
  const enth = r.zahl(5, Math.max(6, M - a - b - c - 5));
  const gewaehlt = a >= need || gang === 3;
  return mcFrage(r, "u-bp-wahl", "oer-bundespraesident",
    `Die Bundesversammlung hat 1.260 Mitglieder. Ergebnis des ${gang}. Wahlgangs:\n\nIst Kandidatin A gewählt?`,
    ["Ja", "Nein – es folgt ein weiterer Wahlgang"], [gewaehlt ? 0 : 1],
    `Art. 54 Abs. 6 GG: In den ersten beiden Wahlgängen ist die Mehrheit der Mitglieder nötig (mindestens ${need}); im dritten Wahlgang genügen die meisten Stimmen. A hat ${a} Stimmen im ${gang}. Wahlgang → ${gewaehlt ? "gewählt." : "nicht gewählt."}`,
    { grafik: balken([{ label: "Kandidatin A", wert: a, farbe: FARBEN[0] }, { label: "Kandidat B", wert: b, farbe: FARBEN[3] }, { label: "Kandidat C", wert: c, farbe: FARBEN[4] }, { label: "Enthaltung", wert: enth, farbe: STIMMFARBE.enthaltung }],
      { titel: `Bundesversammlung – ${gang}. Wahlgang`, max: M * 0.6, linie: { wert: need, label: `Mehrheit der Mitglieder: ${need}` } }), normen: ["GG 54 6", "GG 54 3"] });
});

// ------------------------------------------------------------------ Minderheitenrechte & Quoren
function quoren(M) {
  return [
    { was: "einen Untersuchungsausschuss zu erzwingen (Antrag)", n: anteil(M, 1, 4), norm: "GG 44 1", erkl: "Art. 44 Abs. 1: ein Viertel der Mitglieder" },
    { was: "die Einberufung des Bundestages zu verlangen", n: anteil(M, 1, 3), norm: "GG 39 3", erkl: "Art. 39 Abs. 3 Satz 3: ein Drittel der Mitglieder" },
    { was: "den Ausschluss der Öffentlichkeit zu beantragen", n: anteil(M, 1, 10), norm: "GG 42 1", erkl: "Art. 42 Abs. 1 Satz 2: ein Zehntel der Mitglieder" },
    { was: "die Anklage gegen den Bundespräsidenten zu beantragen", n: anteil(M, 1, 4), norm: "GG 61 1", erkl: "Art. 61 Abs. 1 Satz 2: ein Viertel der Mitglieder" },
    { was: "die Anklage gegen den Bundespräsidenten zu beschließen", n: anteil(M, 2, 3), norm: "GG 61 1", erkl: "Art. 61 Abs. 1 Satz 3: zwei Drittel der Mitglieder" },
    { was: "eine Bundeskanzlerin im ersten Wahlgang zu wählen", n: mehrheit(M), norm: "GG 63 2", erkl: "Art. 63 Abs. 2, Art. 121: Mehrheit der Mitglieder" },
    { was: "dem Grundgesetz zuzustimmen (Änderung)", n: anteil(M, 2, 3), norm: "GG 79 2", erkl: "Art. 79 Abs. 2: zwei Drittel der Mitglieder" },
  ];
}
const quorum = U("u-quorum", "oer-bundestag", (r) => {
  const M = r.wahl([630, 630, 630, 634, 636]);
  const q = r.wahl(quoren(M));
  const zusatz = M !== 630 ? ` Wegen § 4 Abs. 4 BWahlG hat der Bundestag in dieser Wahlperiode ${M} Mitglieder.` : " Der Bundestag hat 630 Mitglieder.";
  return zahlFrage("u-quorum", "oer-bundestag", `Wie viele Abgeordnete sind mindestens erforderlich, um ${q.was}?${zusatz}`, q.n, "Abgeordnete",
    `${q.erkl}. Bezugsgröße ist die gesetzliche Mitgliederzahl (Art. 121): ${M} → mindestens ${q.n}. Bei Bruchteilen wird aufgerundet, weil das Quorum sonst nicht erreicht ist.`,
    { grafik: balken([{ label: "Mitglieder", wert: M, farbe: FARBEN[7] }, { label: "Quorum", wert: q.n, farbe: FARBEN[0], text: "?" }], { titel: "Quorum", max: M * 1.05 }), normen: [q.norm, "GG 121"] });
});

const minderheit = U("u-minderheit", "oer-bundestag", (r) => {
  const M = 630, need = anteil(M, 1, 4);
  const opp = r.zahl(need - 12, need + 15);
  const pflicht = opp >= need;
  return mcFrage(r, "u-minderheit", "oer-bundestag",
    `Die beiden Oppositionsfraktionen verfügen zusammen über ${opp} der 630 Sitze. Sie beantragen geschlossen die Einsetzung eines Untersuchungsausschusses zu einem Steuerskandal. Die Regierungsmehrheit lehnt ab.\n\nMuss der Bundestag den Ausschuss einsetzen?`,
    ["Ja – auf Antrag eines Viertels der Mitglieder besteht eine Pflicht", "Nein – der Antrag erreicht nicht ein Viertel der Mitglieder; die Einsetzung steht im Ermessen der Mehrheit", "Ja – jede Fraktion kann einen Untersuchungsausschuss erzwingen", "Nein – Untersuchungsausschüsse kann nur die Bundesregierung beantragen"],
    [pflicht ? 0 : 1],
    `Art. 44 Abs. 1 GG: Recht des Bundestages und auf Antrag eines Viertels seiner Mitglieder Pflicht. 630 ÷ 4 = 157,5 → mindestens 158 Abgeordnete. Die Opposition hat ${opp} → ${pflicht ? "Pflicht zur Einsetzung (Minderheitenrecht)." : "keine Pflicht."}`,
    { grafik: halbkreis([{ label: "Opposition", n: opp, farbe: FARBEN[1] }, { label: "Regierungsfraktionen", n: M - opp, farbe: FARBEN[0] }], { titel: "Sitze" }), normen: ["GG 44 1"] });
});

// ------------------------------------------------------------------ Wahlperiode & Fristen (Art. 39 GG, § 16 BWahlG)
const WT = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const dat = (d) => `${WT[d.getUTCDay()]}, ${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}`;
const plusMonate = (d, m) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + m, d.getUTCDate()));
const plusTage = (d, t) => new Date(d.getTime() + t * 86400000);
const naechsterSonntag = (d) => plusTage(d, (7 - d.getUTCDay()) % 7);

const wahlperiode = U("u-wahlperiode", "oer-bundestag", (r) => {
  const beginn = new Date(Date.UTC(r.zahl(2025, 2030), r.zahl(0, 11), r.zahl(1, 28)));
  const frueh = plusMonate(beginn, 46), spaet = plusMonate(beginn, 48);
  const drin = naechsterSonntag(plusTage(frueh, r.zahl(14, 40)));
  const zuFrueh = naechsterSonntag(plusTage(frueh, -r.zahl(30, 70)));
  const zuSpaet = naechsterSonntag(plusTage(spaet, r.zahl(10, 40)));
  const samstag = plusTage(naechsterSonntag(plusTage(frueh, r.zahl(10, 45))), -1);
  const opt = [dat(drin), dat(zuFrueh), dat(zuSpaet), dat(samstag)];
  return mcFrage(r, "u-wahlperiode", "oer-bundestag",
    `Der Bundestag ist am ${dat(beginn)} erstmals zusammengetreten (Beginn der Wahlperiode). Der Bundespräsident möchte den Termin der nächsten regulären Bundestagswahl festlegen.\n\nWelcher Termin ist zulässig?`, opt, [0],
    `Art. 39 Abs. 1 Satz 3 GG: Neuwahl frühestens 46, spätestens 48 Monate nach Beginn der Wahlperiode → zwischen ${dat(frueh)} und ${dat(spaet)}. § 16 BWahlG: Wahltag muss ein Sonntag oder gesetzlicher Feiertag sein. Zulässig ist daher nur ${dat(drin)}; ${dat(samstag)} ist ein Samstag.`,
    { grafik: zeitstrahl([{ datum: dat(beginn).slice(-10), text: "Zusammentritt (Beginn Wahlperiode)" }, { datum: dat(frueh).slice(-10), text: "+ 46 Monate: frühester Wahltermin" }, { datum: dat(spaet).slice(-10), text: "+ 48 Monate: spätester Wahltermin" }], { titel: "Wahlperiode" }),
      normen: ["GG 39 1", "BWahlG 16"] });
});

const zusammentritt = U("u-zusammentritt", "oer-bundestag", (r) => {
  const wahltag = naechsterSonntag(new Date(Date.UTC(r.zahl(2025, 2033), r.zahl(0, 11), r.zahl(1, 28))));
  const spaetestens = plusTage(wahltag, 30);
  return mcFrage(r, "u-zusammentritt", "oer-bundestag",
    `Die Bundestagswahl findet am ${dat(wahltag)} statt. Bis wann muss der neu gewählte Bundestag spätestens zusammentreten?`,
    [dat(spaetestens), dat(plusTage(wahltag, 60)), dat(plusTage(wahltag, 14)), dat(plusTage(wahltag, 45))], [0],
    `Art. 39 Abs. 2 GG: spätestens am dreißigsten Tage nach der Wahl → ${dat(spaetestens)}. Mit dem Zusammentritt endet die Wahlperiode des alten Bundestages (Art. 39 Abs. 1 Satz 2) und das Amt des Kanzlers und der Minister (Art. 69 Abs. 2).`,
    { normen: ["GG 39 2", "GG 69 2"] });
});

// ------------------------------------------------------------------ Wahlberechtigung (§§ 12, 13, 15 BWahlG)
const PERSONEN = [
  { p: "Lena, 17 Jahre (wird drei Wochen nach der Wahl 18), Deutsche, wohnt in Hamburg", wb: false, erkl: "§ 12 Abs. 1 Nr. 1: Das 18. Lebensjahr muss am Wahltag vollendet sein." },
  { p: "Marco, 34 Jahre, italienischer Staatsangehöriger, lebt seit 12 Jahren in Kiel", wb: false, erkl: "Nur Deutsche i.S.d. Art. 116 Abs. 1 GG sind wahlberechtigt (§ 12 Abs. 1). EU-Bürger dürfen nur bei Kommunal- (Art. 28 Abs. 1 Satz 3 GG) und Europawahlen wählen." },
  { p: "Jonas, 25 Jahre, Deutscher, Wohnung in Lübeck seit seiner Geburt", wb: true, erkl: "Alle Voraussetzungen des § 12 Abs. 1 sind erfüllt." },
  { p: "Petra, 52 Jahre, Deutsche, lebt seit 20 Jahren in Spanien; bis zu ihrem 32. Lebensjahr wohnte sie in Bremen", wb: true, erkl: "§ 12 Abs. 2 Satz 1 Nr. 1: nach dem 14. Lebensjahr mindestens drei Monate in Deutschland gewohnt, und das liegt nicht länger als 25 Jahre zurück." },
  { p: "Klaus, 60 Jahre, Deutscher, lebt seit 35 Jahren in Kanada; zuletzt wohnte er mit 25 Jahren in Deutschland; besondere Bindungen an die deutsche Politik bestehen nicht", wb: false, erkl: "§ 12 Abs. 2 Satz 1 Nr. 1 scheidet aus, weil der Aufenthalt länger als 25 Jahre zurückliegt; Nr. 2 (persönliche und unmittelbare Vertrautheit) ist nicht erfüllt." },
  { p: "Sven, 41 Jahre, Deutscher, Wohnung in Kiel; ein Strafgericht hat ihm rechtskräftig das Wahlrecht aberkannt", wb: false, erkl: "§ 13 BWahlG: Ausgeschlossen ist, wer infolge Richterspruchs das Wahlrecht nicht besitzt." },
  { p: "Aylin, 19 Jahre, deutsche und türkische Staatsangehörige, Wohnung in Berlin", wb: true, erkl: "Mit deutscher Staatsangehörigkeit ist sie Deutsche i.S.d. Art. 116 Abs. 1 GG – eine weitere Staatsangehörigkeit schadet nicht." },
  { p: "Tom, 18 Jahre, Deutscher, hat 15 Jahre in den USA gelebt und vor sechs Wochen eine Wohnung in Dresden bezogen; früher hat er nie in Deutschland gewohnt", wb: false, erkl: "§ 12 Abs. 1 Nr. 2: Erst seit sechs Wochen (nicht drei Monaten) eine Wohnung in Deutschland; § 12 Abs. 2 Nr. 1 scheidet aus, weil er nach dem 14. Lebensjahr nie drei Monate in Deutschland gewohnt hat." },
];
const wahlrecht = U("u-wahlrecht", "oer-wahl", (r) => {
  const x = r.wahl(PERSONEN);
  return mcFrage(r, "u-wahlrecht", "oer-wahl", `Ist die folgende Person bei der Bundestagswahl wahlberechtigt?\n\n${x.p}`,
    ["Ja, wahlberechtigt", "Nein, nicht wahlberechtigt"], [x.wb ? 0 : 1], x.erkl, { normen: ["BWahlG 12 1", "BWahlG 12 2", "BWahlG 13"] });
});

// ------------------------------------------------------------------ Wahlrechtsgrundsätze (Art. 38 Abs. 1 GG)
const GRUNDSAETZE = ["allgemein", "unmittelbar", "frei", "gleich", "geheim"];
const VERSTOESSE = [
  { s: "Ein neues Wahlgesetz bestimmt, dass nur wählen darf, wer im Vorjahr Einkommensteuer gezahlt hat.", g: "allgemein" },
  { s: "Die Wähler sollen künftig Wahlmänner bestimmen, die dann ihrerseits die Abgeordneten wählen.", g: "unmittelbar" },
  { s: "Nach der Wahl darf der Parteivorstand die Reihenfolge der Landesliste ändern und so bestimmen, wer in den Bundestag einzieht.", g: "unmittelbar" },
  { s: "Ein Arbeitgeber droht seinen Beschäftigten mit Kündigung, falls sie nicht Partei X wählen.", g: "frei" },
  { s: "Die Stimmen von Hochschulabsolventen sollen doppelt zählen.", g: "gleich" },
  { s: "Ein Wahlkreis hat 45 % mehr Einwohner als der Durchschnitt aller Wahlkreise; eine Neuabgrenzung unterbleibt.", g: "gleich" },
  { s: "Im Wahllokal gibt es keine Wahlkabine; die Wahlhelfer können sehen, wo man das Kreuz setzt.", g: "geheim" },
  { s: "Die Gemeinde veröffentlicht nach der Wahl, wer wen gewählt hat.", g: "geheim" },
  { s: "Frauen über 70 Jahre sollen vom Wahlrecht ausgeschlossen werden.", g: "allgemein" },
];
const grundsaetze = U("u-grundsaetze", "oer-wahl", (r) => {
  const v = r.wahl(VERSTOESSE);
  return mcFrage(r, "u-grundsaetze", "oer-wahl", `Gegen welchen Wahlrechtsgrundsatz wird verstoßen?\n\n${v.s}`,
    ["Allgemeinheit der Wahl", "Unmittelbarkeit der Wahl", "Freiheit der Wahl", "Gleichheit der Wahl", "Geheimheit der Wahl"],
    [GRUNDSAETZE.indexOf(v.g)],
    {
      allgemein: "Allgemeinheit: Grundsätzlich alle Staatsbürger dürfen wählen; Ausschlüsse nach Einkommen, Geschlecht oder Alter (über 18) sind unzulässig.",
      unmittelbar: "Unmittelbarkeit: Zwischen Wählern und Gewählten darf keine fremde Willensentscheidung treten (keine Wahlmänner, keine nachträgliche Änderung der Liste).",
      frei: "Freiheit: Die Wahlentscheidung muss ohne Zwang oder unzulässigen Druck getroffen werden.",
      gleich: "Gleichheit: Jede Stimme hat den gleichen Zählwert und grundsätzlich den gleichen Erfolgswert; Wahlkreise müssen ähnlich groß sein (§ 3 Abs. 1 Nr. 3 BWahlG: Neuabgrenzung ab mehr als 15 % Abweichung).",
      geheim: "Geheimheit: Niemand darf erfahren können, wie jemand gewählt hat (§ 33 BWahlG).",
    }[v.g],
    { normen: ["GG 38 1"] });
});

// ------------------------------------------------------------------ Stimmzettel (§ 39 BWahlG)
const STIMMZETTEL_FAELLE = [
  { kE: [1], kZ: [2], erg: 0, erkl: "Je ein eindeutiges Kreuz – beide Stimmen sind gültig." },
  { kE: [0], kZ: [0, 3], erg: 1, erkl: "Zwei Kreuze bei der Zweitstimme: Der Wille ist nicht zweifelsfrei erkennbar (§ 39 Abs. 1 Satz 1 Nr. 4) → Zweitstimme ungültig; die Erststimme bleibt gültig." },
  { kE: [2], kZ: [], erg: 1, erkl: "Nur eine Stimme abgegeben: Die nicht abgegebene Zweitstimme ist ungültig (§ 39 Abs. 1 Satz 4); die Erststimme ist gültig." },
  { kE: [], kZ: [1], erg: 2, erkl: "Nur die Zweitstimme ist gekennzeichnet → Zweitstimme gültig, die nicht abgegebene Erststimme ungültig (§ 39 Abs. 1 Satz 4)." },
  { kE: [], kZ: [], erg: 3, erkl: "Der Stimmzettel enthält keine Kennzeichnung (§ 39 Abs. 1 Satz 1 Nr. 2) → beide Stimmen ungültig (Satz 2)." },
  { kE: [0, 1], kZ: [3], erg: 2, erkl: "Zwei Kreuze bei der Erststimme → Erststimme ungültig (Wille nicht zweifelsfrei, Nr. 4); die Zweitstimme ist gültig." },
];
const stimmzettelAufgabe = U("u-stimmzettel", "oer-zusatz", (r) => {
  const f = r.wahl(STIMMZETTEL_FAELLE);
  const erst = [{ name: "Anna Albers", partei: "Partei A" }, { name: "Bernd Berger", partei: "Partei B" }, { name: "Cem Coşkun", partei: "Partei C" }, { name: "Dana Dietz", partei: "Partei D" }];
  const zweit = [{ partei: "Partei A" }, { partei: "Partei B" }, { partei: "Partei C" }, { partei: "Partei D" }];
  return mcFrage(r, "u-stimmzettel", "oer-zusatz", "Der Wahlvorstand findet bei der Auszählung den abgebildeten amtlichen Stimmzettel aus diesem Wahlkreis. Wie ist er zu werten?",
    ["Beide Stimmen gültig", "Nur die Erststimme gültig", "Nur die Zweitstimme gültig", "Beide Stimmen ungültig"], [f.erg], f.erkl,
    { grafik: stimmzettel({ erst, zweit, kreuzE: f.kE, kreuzZ: f.kZ }), normen: ["BWahlG 39 1", "BWahlG 34 2"] });
});

export const OER_UEBERTRAGUNG = [
  kanzlerwahl, misstrauen, vertrauen, brStimmen, brBeschluss, brJaZahl, btBeschluss, gg79, sperrklausel, sitzverteilung, sitzbild,
  zweitstimmendeckung, bpWahl, quorum, minderheit, wahlperiode, zusammentritt, wahlrecht, grundsaetze, stimmzettelAufgabe,
];
