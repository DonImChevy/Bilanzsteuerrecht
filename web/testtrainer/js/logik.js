// "Angewandtes Schlussfolgern": rule texts with a statement "… Also …" → richtig / unbestimmt / falsch.
// Correctness is not hand-written: every scenario lists all possible cases ("worlds"), the rule text
// defines the outcome (or restricts the worlds), and the answer is computed by checking every case
// that fits the premises:
//   conclusion holds in all of them → richtig, in none → falsch, in some → unbestimmt.
// The explanation shows concrete example cases with numbers.

import { zahl } from "./zufall.js";

const ANTWORTEN = ["richtig", "unbestimmt", "falsch"];

/** Cartesian product of variable domains. */
function welten(dom, filter = () => true) {
  let w = [{}];
  for (const [k, werte] of Object.entries(dom)) w = w.flatMap((x) => werte.map((v) => ({ ...x, [k]: v })));
  return w.filter(filter);
}

// atom = { v: variable, s: sentence, f: world → bool, n?: negated sentence, kern?: bool }
const B = (v, s, n, f, kern = false) => ({ v, s, n, f, kern });
const zahlAtome = (v, werte, schwellen, satz) => [
  ...werte.map((x) => ({ v, s: satz("=", x), f: (w) => w[v] === x })),
  ...schwellen.flatMap((x) => [{ v, s: satz(">=", x), f: (w) => w[v] >= x }, { v, s: satz("<", x), f: (w) => w[v] < x }]),
];

// ------------------------------------------------------------------ scenarios
const SZENARIEN = [
  function kredit(r) {
    const E1 = r.pick([2000, 2500, 3000]), E2 = E1 + r.pick([500, 1000]);
    const ek = [E1 - 500, E1, (E1 + E2) / 2, E2, E2 + 500];
    const bew = (w) => (w.fest ? w.ek >= E1 : w.ek >= E2 || (w.sich && w.ek >= E1));
    return {
      titel: "Kredit",
      text: `Eine Bank bewilligt einen Ratenkredit, wenn das monatliche Nettoeinkommen mindestens ${zahl(E1)} € beträgt und die antragstellende Person unbefristet angestellt ist. Ohne unbefristete Anstellung wird der Kredit erst ab einem Nettoeinkommen von ${zahl(E2)} € bewilligt, es sei denn, es wird eine zusätzliche Sicherheit gestellt. Dann genügen auch ohne unbefristete Anstellung ${zahl(E1)} €.`,
      welten: welten({ ek, fest: [true, false], sich: [true, false] }),
      atome: [
        ...zahlAtome("ek", ek, [E1, E2], (o, x) => (o === "=" ? `Das Nettoeinkommen beträgt ${zahl(x)} €.` : o === ">=" ? `Das Nettoeinkommen beträgt mindestens ${zahl(x)} €.` : `Das Nettoeinkommen liegt unter ${zahl(x)} €.`)),
        B("fest", "Die Person ist unbefristet angestellt.", "Die Person ist nicht unbefristet angestellt.", (w) => w.fest),
        B("sich", "Es wird eine zusätzliche Sicherheit gestellt.", "Es wird keine zusätzliche Sicherheit gestellt.", (w) => w.sich),
        B("bew", "Der Kredit wird bewilligt.", "Der Kredit wird nicht bewilligt.", bew, true),
      ],
      regeln: [`unbefristet angestellt → Kredit ab ${zahl(E1)} €`, `nicht unbefristet → Kredit erst ab ${zahl(E2)} €`, `nicht unbefristet, aber mit Sicherheit → Kredit ab ${zahl(E1)} €`],
      fall: (w) => `${zahl(w.ek)} €, ${w.fest ? "unbefristet" : "nicht unbefristet"}, ${w.sich ? "mit" : "ohne"} Sicherheit → ${bew(w) ? "bewilligt" : "nicht bewilligt"}`,
    };
  },

  function treuepunkte(r) {
    const R1 = r.pick([25, 50]), R2 = R1 * 2;
    const rate = [R1 - 10, R1, (R1 + R2) / 2, R2, R2 + 50];
    const pkt = (w) => 1 + (w.rate >= R2 ? 2 : w.rate >= R1 ? 1 : 0) + (w.neu ? (w.online ? 2 : 0) : 1);
    const pAtome = [];
    for (let n = 1; n <= 5; n++) pAtome.push({ v: "pkt", s: `Die Person erhält genau ${n} ${n === 1 ? "Punkt" : "Punkte"}.`, f: (w) => pkt(w) === n, kern: true });
    for (const n of [3, 4]) pAtome.push({ v: "pkt", s: `Die Person erhält mindestens ${n} Punkte.`, f: (w) => pkt(w) >= n, kern: true });
    pAtome.push({ v: "pkt", s: "Die Person erhält höchstens zwei Punkte.", f: (w) => pkt(w) <= 2, kern: true });
    return {
      titel: "Treuepunkte",
      text: `Eine Sparkasse vergibt beim Abschluss eines Sparplans Treuepunkte. Jeder Kunde erhält einen Punkt. Bei einer monatlichen Sparrate von mindestens ${R1} € gibt es einen weiteren Punkt, ab ${R2} € stattdessen zwei weitere. Bestandskunden erhalten zusätzlich einen Punkt. Neukunden erhalten dagegen zwei zusätzliche Punkte, allerdings nur, wenn sie den Sparplan online abschließen.`,
      welten: welten({ rate, neu: [true, false], online: [true, false] }),
      atome: [
        ...zahlAtome("rate", rate, [R1, R2], (o, x) => (o === "=" ? `Die monatliche Sparrate beträgt ${x} €.` : o === ">=" ? `Die monatliche Sparrate beträgt mindestens ${x} €.` : `Die monatliche Sparrate liegt unter ${x} €.`)),
        B("neu", "Die Person ist Neukunde.", "Die Person ist Bestandskunde.", (w) => w.neu),
        B("online", "Der Sparplan wird online abgeschlossen.", "Der Sparplan wird nicht online abgeschlossen.", (w) => w.online),
        ...pAtome,
      ],
      regeln: ["Grundpunkt: 1", `Sparrate ab ${R1} €: +1, ab ${R2} €: +2 (nicht +3)`, "Bestandskunde: +1", "Neukunde: +2, aber nur online (sonst +0)"],
      fall: (w) => `${w.rate} €, ${w.neu ? "Neukunde" : "Bestandskunde"}, ${w.online ? "online" : "nicht online"} → 1 + ${w.rate >= R2 ? 2 : w.rate >= R1 ? 1 : 0} + ${w.neu ? (w.online ? 2 : 0) : 1} = ${pkt(w)} Punkte`,
    };
  },

  function fonds(r) {
    const K = r.pick([2, 3]), K2 = r.pick([4, 5]);
    const kurs = [-(K2 + 2), -K2, -(K2 - 1), -1, 0, 1, K, K + 1, K + 3];
    const handel = (w) => (w.kurs > K ? 10 : w.kurs >= 0 ? (w.zins ? -10 : 0) : w.kurs <= -K2 ? -30 : -20);
    const kAtome = [
      ...kurs.map((x) => ({ v: "kurs", s: x > 0 ? `Der Kurs ist um ${x} % gestiegen.` : x === 0 ? "Der Kurs ist unverändert geblieben." : `Der Kurs ist um ${-x} % gefallen.`, f: (w) => w.kurs === x })),
      { v: "kurs", s: "Der Kurs ist gestiegen.", f: (w) => w.kurs > 0 },
      { v: "kurs", s: "Der Kurs ist gefallen.", f: (w) => w.kurs < 0 },
      { v: "kurs", s: `Der Kurs ist um mehr als ${K} % gestiegen.`, f: (w) => w.kurs > K },
      { v: "kurs", s: `Der Kurs ist um mindestens ${K2} % gefallen.`, f: (w) => w.kurs <= -K2 },
      { v: "kurs", s: "Der Kurs ist nicht gefallen.", f: (w) => w.kurs >= 0 },
    ];
    return {
      titel: "Fonds",
      text: `Eine Fondsmanagerin prüft am Monatsende die Kursentwicklung einer Aktie. Steigt der Kurs um mehr als ${K} %, kauft sie 10 Stück nach. Steigt er um höchstens ${K} % oder bleibt er unverändert, unternimmt sie nichts, es sei denn, die Zentralbank hat in diesem Monat den Leitzins erhöht. Dann verkauft sie 10 Stück. Fällt der Kurs, verkauft sie 20 Stück, bei einem Rückgang um mindestens ${K2} % sogar 30 Stück.`,
      welten: welten({ kurs, zins: [true, false] }),
      atome: [
        ...kAtome,
        B("zins", "Die Zentralbank hat den Leitzins erhöht.", "Die Zentralbank hat den Leitzins nicht erhöht.", (w) => w.zins),
        B("h", "Sie kauft Aktien nach.", "Sie kauft keine Aktien nach.", (w) => handel(w) > 0, true),
        B("h", "Sie verkauft Aktien.", "Sie verkauft keine Aktien.", (w) => handel(w) < 0, true),
        B("h", "Sie unternimmt nichts.", "Sie handelt mit der Aktie.", (w) => handel(w) === 0, true),
        { v: "h", s: "Sie verkauft genau 10 Stück.", f: (w) => handel(w) === -10, kern: true },
        { v: "h", s: "Sie verkauft mindestens 20 Stück.", f: (w) => handel(w) <= -20, kern: true },
        { v: "h", s: "Sie verkauft 30 Stück.", f: (w) => handel(w) === -30, kern: true },
      ],
      regeln: [`mehr als +${K} % → 10 kaufen`, `0 bis +${K} % → nichts, außer Leitzins erhöht → 10 verkaufen`, `gefallen → 20 verkaufen, ab −${K2} % → 30 verkaufen`, "Der Leitzins zählt nur, wenn der Kurs nicht gefallen und nicht stark gestiegen ist"],
      fall: (w) => { const h = handel(w); return `Kurs ${w.kurs > 0 ? "+" : w.kurs < 0 ? "−" : "±"}${Math.abs(w.kurs)} %, Leitzins ${w.zins ? "erhöht" : "nicht erhöht"} → ${h > 0 ? "kauft 10" : h === 0 ? "nichts" : "verkauft " + -h}`; },
    };
  },

  function training(r) {
    const T1 = r.pick([10, 12]), T2 = T1 + r.pick([4, 6]);
    const temp = [T1 - 4, T1 - 1, T1, T1 + 1, T2 - 1, T2, T2 + 3];
    const ort = (w) => ((w.temp >= T1 && !w.regen) || (w.temp >= T2 && w.regen) ? "draussen" : w.halle ? "aus" : "halle");
    return {
      titel: "Sportverein",
      text: `Ein Sportverein trainiert draußen, wenn es mindestens ${T1} °C warm ist und nicht regnet. Bei Regen trainiert er nur dann draußen, wenn es mindestens ${T2} °C warm ist. Kann nicht draußen trainiert werden, weicht der Verein in die Sporthalle aus, sofern diese nicht belegt ist. Andernfalls fällt das Training aus.`,
      welten: welten({ temp, regen: [true, false], halle: [true, false] }),
      atome: [
        ...zahlAtome("temp", temp, [T1, T2], (o, x) => (o === "=" ? `Es ist ${x} °C warm.` : o === ">=" ? `Es ist mindestens ${x} °C warm.` : `Es ist kälter als ${x} °C.`)),
        B("regen", "Es regnet.", "Es regnet nicht.", (w) => w.regen),
        B("halle", "Die Sporthalle ist belegt.", "Die Sporthalle ist nicht belegt.", (w) => w.halle),
        B("ort", "Es wird draußen trainiert.", "Es wird nicht draußen trainiert.", (w) => ort(w) === "draussen", true),
        B("ort", "Es wird in der Sporthalle trainiert.", "Es wird nicht in der Sporthalle trainiert.", (w) => ort(w) === "halle", true),
        B("ort", "Das Training fällt aus.", "Das Training findet statt.", (w) => ort(w) === "aus", true),
      ],
      regeln: [`trocken: draußen ab ${T1} °C`, `Regen: draußen erst ab ${T2} °C`, "sonst Halle – wenn belegt, fällt das Training aus"],
      fall: (w) => `${w.temp} °C, ${w.regen ? "Regen" : "trocken"}, Halle ${w.halle ? "belegt" : "frei"} → ${{ draussen: "draußen", halle: "Sporthalle", aus: "fällt aus" }[ort(w)]}`,
    };
  },

  function einladung(r) {
    const P1 = r.pick([60, 70]), P0 = P1 - 10, P2 = P1 + r.pick([10, 20]);
    const pkt = [P0 - 10, P0, P0 + 5, P1, P1 + 5, P2, P2 + 10];
    const ein = (w) => (w.prakt && w.pkt >= P0) || (w.erf ? w.pkt >= P1 : w.pkt >= P2);
    return {
      titel: "Auswahltag",
      text: `Ein Unternehmen lädt Bewerberinnen und Bewerber zum Auswahltag ein, wenn sie im Online-Test mindestens ${P1} Punkte erreichen. Bewerber ohne Berufserfahrung brauchen dafür mindestens ${P2} Punkte. Wer bereits ein Praktikum im Unternehmen absolviert hat, wird dagegen immer eingeladen, sofern er mindestens ${P0} Punkte erreicht.`,
      welten: welten({ pkt, erf: [true, false], prakt: [true, false] }),
      atome: [
        ...zahlAtome("pkt", pkt, [P0, P1, P2], (o, x) => (o === "=" ? `Die Person erreicht ${x} Punkte.` : o === ">=" ? `Die Person erreicht mindestens ${x} Punkte.` : `Die Person erreicht weniger als ${x} Punkte.`)),
        B("erf", "Die Person hat Berufserfahrung.", "Die Person hat keine Berufserfahrung.", (w) => w.erf),
        B("prakt", "Die Person hat ein Praktikum im Unternehmen absolviert.", "Die Person hat kein Praktikum im Unternehmen absolviert.", (w) => w.prakt),
        B("ein", "Die Person wird eingeladen.", "Die Person wird nicht eingeladen.", ein, true),
      ],
      regeln: [`mit Berufserfahrung: ab ${P1} Punkten`, `ohne Berufserfahrung: ab ${P2} Punkten`, `mit Praktikum im Unternehmen: immer ab ${P0} Punkten`],
      fall: (w) => `${w.pkt} Punkte, ${w.erf ? "mit" : "ohne"} Berufserfahrung, ${w.prakt ? "mit" : "ohne"} Praktikum → ${ein(w) ? "eingeladen" : "nicht eingeladen"}`,
    };
  },

  function filialen(r) {
    const G = r.pick([2, 3]), X = r.pick([10, 12]), M = 8, S = r.pick([10, 12]);
    const ma = [4, 6, 8, 9, 10, 11, 12, 14], ga = [1, 2, 3, 4, 5];
    const gilt = (w) => (w.reg !== "Nord" || (w.ga >= G && w.ma < X)) && (w.reg !== "Mitte" || w.ma <= M || w.ga <= 2) && (w.reg !== "Süd" || w.ga >= 3 || w.ma >= S);
    const regAtome = ["Nord", "Mitte", "Süd"].map((reg) => B("reg", `Die Filiale liegt in der Region ${reg}.`, `Die Filiale liegt nicht in der Region ${reg}.`, (w) => w.reg === reg, true));
    return {
      titel: "Bankfilialen",
      text: `Eine Bank betreibt Filialen in den Regionen Nord, Mitte und Süd. In der Region Nord hat jede Filiale mindestens ${G === 2 ? "zwei" : "drei"} Geldautomaten und weniger als ${X} Mitarbeitende. In der Region Mitte haben alle Filialen mit mehr als ${M} Mitarbeitenden höchstens zwei Geldautomaten. In der Region Süd haben dagegen alle Filialen mit weniger als drei Geldautomaten mindestens ${S} Mitarbeitende. Jede Filiale der Bank hat mindestens vier Mitarbeitende.`,
      welten: welten({ reg: ["Nord", "Mitte", "Süd"], ma, ga }, gilt),
      atome: [
        ...regAtome,
        ...ma.map((x) => ({ v: "ma", s: `Die Filiale hat ${x} Mitarbeitende.`, f: (w) => w.ma === x })),
        { v: "ma", s: `Die Filiale hat mindestens ${X} Mitarbeitende.`, f: (w) => w.ma >= X },
        { v: "ma", s: `Die Filiale hat weniger als ${S} Mitarbeitende.`, f: (w) => w.ma < S },
        { v: "ma", s: `Die Filiale hat mehr als ${M} Mitarbeitende.`, f: (w) => w.ma > M },
        { v: "ma", s: `Die Filiale hat höchstens ${M} Mitarbeitende.`, f: (w) => w.ma <= M },
        ...ga.map((x) => ({ v: "ga", s: `Die Filiale hat ${x === 1 ? "einen Geldautomaten" : x + " Geldautomaten"}.`, f: (w) => w.ga === x })),
        { v: "ga", s: "Die Filiale hat höchstens zwei Geldautomaten.", f: (w) => w.ga <= 2 },
        { v: "ga", s: "Die Filiale hat mindestens drei Geldautomaten.", f: (w) => w.ga >= 3 },
      ],
      regeln: [`Nord: mindestens ${G} Automaten und weniger als ${X} Mitarbeitende`, `Mitte: mehr als ${M} Mitarbeitende → höchstens 2 Automaten (umgekehrt gilt nichts)`, `Süd: weniger als 3 Automaten → mindestens ${S} Mitarbeitende (umgekehrt gilt nichts)`, "Alle Filialen: mindestens 4 Mitarbeitende"],
      fall: (w) => `Region ${w.reg}, ${w.ma} Mitarbeitende, ${w.ga} ${w.ga === 1 ? "Automat" : "Automaten"} – mit allen Regeln vereinbar`,
      nurBedingungen: true,
    };
  },

  function versicherung(r) {
    const KM = r.pick([10000, 15000]), A = r.pick([25, 30]);
    const km = [KM - 5000, KM, KM + 5000], unf = [0, 1, 2, 3], alter = [A - 5, A, A + 10];
    const gilt = (w) => (!(w.tele && w.km < KM) || w.unf === 0) && (w.unf <= 1 || w.alter < A);
    return {
      titel: "Kfz-Versicherung",
      text: `Eine Versicherung hat die Kfz-Verträge des letzten Jahres ausgewertet. Dabei stellte sie fest: Alle Versicherten, die einen Telematik-Tarif nutzen und weniger als ${zahl(KM)} km im Jahr fahren, hatten keinen Unfall. Alle Versicherten mit mehr als einem Unfall sind jünger als ${A} Jahre.`,
      welten: welten({ tele: [true, false], km, unf, alter }, gilt),
      atome: [
        B("tele", "Die Person nutzt einen Telematik-Tarif.", "Die Person nutzt keinen Telematik-Tarif.", (w) => w.tele),
        { v: "km", s: `Die Person fährt weniger als ${zahl(KM)} km im Jahr.`, f: (w) => w.km < KM },
        { v: "km", s: `Die Person fährt mindestens ${zahl(KM)} km im Jahr.`, f: (w) => w.km >= KM },
        { v: "km", s: `Die Person fährt ${zahl(KM - 5000)} km im Jahr.`, f: (w) => w.km === KM - 5000 },
        { v: "unf", s: "Die Person hatte keinen Unfall.", f: (w) => w.unf === 0, kern: true },
        { v: "unf", s: "Die Person hatte mindestens einen Unfall.", f: (w) => w.unf >= 1, kern: true },
        { v: "unf", s: "Die Person hatte genau einen Unfall.", f: (w) => w.unf === 1, kern: true },
        { v: "unf", s: "Die Person hatte mehr als einen Unfall.", f: (w) => w.unf > 1, kern: true },
        { v: "alter", s: `Die Person ist jünger als ${A} Jahre.`, f: (w) => w.alter < A },
        { v: "alter", s: `Die Person ist mindestens ${A} Jahre alt.`, f: (w) => w.alter >= A },
        { v: "alter", s: `Die Person ist ${A + 10} Jahre alt.`, f: (w) => w.alter === A + 10 },
      ],
      regeln: [`Telematik UND unter ${zahl(KM)} km → kein Unfall (umgekehrt gilt nichts)`, `mehr als ein Unfall → jünger als ${A} (umgekehrt gilt nichts)`, `daraus: mindestens ${A} Jahre alt → höchstens ein Unfall`],
      fall: (w) => `${w.tele ? "Telematik" : "ohne Telematik"}, ${zahl(w.km)} km, ${w.unf} ${w.unf === 1 ? "Unfall" : "Unfälle"}, ${w.alter} Jahre – mit allen Regeln vereinbar`,
      nurBedingungen: true,
    };
  },
];

export const SZENARIO_ANZAHL = SZENARIEN.length;

const lit = (a, ja) => ({ a, ja, s: ja ? a.s : a.n, f: ja ? a.f : (w) => !a.f(w) });

/** Classify a statement over all worlds of a scenario. */
export function bewerten(sz, praemissen, schluss) {
  const passend = sz.welten.filter((w) => praemissen.every((p) => p.f(w)));
  if (!passend.length) return null;
  const ja = passend.filter((w) => schluss.f(w)), nein = passend.filter((w) => !schluss.f(w));
  return { antwort: !nein.length ? "richtig" : !ja.length ? "falsch" : "unbestimmt", passend, ja, nein };
}

export function schlussfolgern(r, stufe = 2, szIndex = null) {
  const sz = SZENARIEN[szIndex ?? r.int(0, SZENARIEN.length - 1)](r);
  const literale = sz.atome.flatMap((a) => (a.n ? [lit(a, true), lit(a, false)] : [lit(a, true)]));
  const ziel = r.pick(ANTWORTEN);
  const anzVars = new Set(sz.atome.map((a) => a.v)).size;
  const nP = Math.min(anzVars - 1, stufe === 1 ? 1 : stufe === 2 ? r.pick([1, 2, 2]) : r.pick([2, 2, 3]));
  let reserve = null;
  for (let versuch = 0; versuch < 500; versuch++) {
    const schluss = r.pick(literale);
    const pool = literale.filter((l) => l.a.v !== schluss.a.v);
    const praemissen = [];
    for (const l of r.shuffle(pool)) {
      if (praemissen.length >= nP) break;
      if (!praemissen.some((p) => p.a.v === l.a.v)) praemissen.push(l);
    }
    if (praemissen.length < nP) continue;
    if (!schluss.a.kern && !praemissen.some((p) => p.a.kern)) continue;
    const e = bewerten(sz, praemissen, schluss);
    if (!e) continue;
    // a premise alone must not already be the whole answer for "richtig" via pure repetition
    const kandidat = { sz, praemissen, schluss, e };
    if (e.antwort === ziel) return baue(r, kandidat);
    if (!reserve) reserve = kandidat;
  }
  return reserve ? baue(r, reserve) : schlussfolgern(r, stufe, szIndex);
}

function baue(r, { sz, praemissen, schluss, e }) {
  const bsp = (liste, n = 1) => r.shuffle(liste).slice(0, n);
  const schritte = [
    `<b>Regeln aus dem Text</b><ul>${sz.regeln.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    `<b>Gegeben:</b> ${praemissen.map((p) => p.s).join(" ")}`,
  ];
  if (e.antwort === "richtig") {
    schritte.push(`In <b>jedem</b> Fall, der dazu passt, gilt: „${schluss.s.replace(/\.$/, "")}“ → <b>richtig</b>.`);
    schritte.push(...bsp(e.passend, Math.min(3, e.passend.length)).map((w) => `Beispiel: ${sz.fall(w)}`));
  } else if (e.antwort === "falsch") {
    schritte.push(`In <b>keinem</b> passenden Fall gilt: „${schluss.s.replace(/\.$/, "")}“ → <b>falsch</b>.`);
    schritte.push(...bsp(e.passend, Math.min(2, e.passend.length)).map((w) => `Beispiel: ${sz.fall(w)}`));
  } else {
    schritte.push(`Beides ist möglich → <b>unbestimmt</b>:`);
    schritte.push(`Fall 1: ${sz.fall(bsp(e.ja)[0])} → die Aussage stimmt`);
    schritte.push(`Fall 2: ${sz.fall(bsp(e.nein)[0])} → die Aussage stimmt nicht`);
  }
  return {
    logik: true,
    szenario: sz.titel,
    text: sz.text,
    aussage: `${praemissen.map((p) => p.s).join(" ")} Also gilt: ${schluss.s}`,
    praemissen: praemissen.map((p) => p.s), schluss: schluss.s,
    frage: "Beurteilen Sie die Aussage in Bezug auf die vorliegenden Informationen.",
    optionen: ANTWORTEN.slice(), richtig: ANTWORTEN.indexOf(e.antwort), festeReihenfolge: true,
    schritte,
    schema: ["Bedingungen und Folgen markieren („wenn“, „nur dann“, „es sei denn“, „alle … haben …“)", "Grenzwerte genau lesen: mindestens = ≥, mehr als = >, unter = <", "„Alle A sind B“ heißt nicht „alle B sind A“ (kein Umkehrschluss)", "Gilt die Folge in JEDEM passenden Fall → richtig, in KEINEM → falsch, mal so, mal so → unbestimmt"],
  };
}
