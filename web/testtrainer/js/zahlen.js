// "Umgang mit Zahlen": parametric generators. Each returns
// { frage, bild?, optionen, richtig, schritte[], schema[] } – solutions are computed, never hard-coded.
// Numbers are chosen so the tasks are solvable without a calculator.

import { rund, zahl, euro, prozent, mc, mcText, ggt, esc } from "./zufall.js";

const fr = (z, n) => { const g = ggt(z, n); return [z / g, n / g]; };
const bruch = ([z, n]) => (n === 1 ? zahl(z) : `<span class="bruch"><sup>${z}</sup>⁄<sub>${n}</sub></span>`);
const bruchText = ([z, n]) => (n === 1 ? String(z) : `${z}/${n}`);

// ============================ Zahlenreihen ============================
const op = (t, f) => ({ t, f });
const plus = (d) => op(d >= 0 ? `+${d}` : `−${-d}`, (x) => x + d);
const mal = (q) => op(`×${q}`, (x) => x * q);

function reiheMitOps(start, ops) {
  const w = [start];
  ops.forEach((o) => w.push(o.f(w[w.length - 1])));
  return w;
}

const REIHEN = {
  konstant(r) {
    const d = r.pick([3, 4, 5, 6, 7, 8, 9, 11, 12, 15]) * (r.chance(0.3) ? -1 : 1);
    const start = d < 0 ? r.int(70, 130) : r.int(2, 40);
    return { werte: reiheMitOps(start, Array(6).fill(plus(d))), ops: Array(6).fill(plus(d).t), regel: `Jedes Glied ist um ${Math.abs(d)} ${d > 0 ? "größer" : "kleiner"} als das vorige.` };
  },
  mal(r) {
    const q = r.pick([2, 2, 3]);
    const start = q === 2 ? r.int(1, 6) : r.int(1, 2);
    return { werte: reiheMitOps(start, Array(6).fill(mal(q))), ops: Array(6).fill(`×${q}`), regel: `Jedes Glied ist das ${q === 2 ? "Doppelte" : "Dreifache"} des vorigen.` };
  },
  quadrat(r) {
    const n0 = r.int(1, 6);
    const werte = Array.from({ length: 7 }, (_, i) => (n0 + i) ** 2);
    return { werte, ops: werte.slice(1).map((v, i) => `+${v - werte[i]}`), regel: `Quadratzahlen: ${n0}², ${n0 + 1}², ${n0 + 2}², … – die Abstände wachsen jeweils um 2.` };
  },
  wechsel(r) {
    const a = r.pick([2, 2, 3]), b = r.int(1, 6), erst = r.chance(0.5);
    const o1 = mal(a), o2 = r.chance(0.7) ? plus(-b) : plus(b);
    const ops = Array.from({ length: 6 }, (_, i) => ((i % 2 === 0) === erst ? o1 : o2));
    const start = a === 3 ? r.int(2, 5) : r.int(b + 1, 9);
    return { werte: reiheMitOps(start, ops), ops: ops.map((o) => o.t), regel: `Zwei Rechenschritte wechseln sich ab: ${ops[0].t} und ${ops[1].t}.` };
  },
  malplus(r) {
    const c = r.pick([1, 1, 2, 3, -1]);
    const o = op(`×2${c > 0 ? "+" + c : "−" + -c}`, (x) => 2 * x + c);
    const start = r.int(c < 0 ? 2 : 1, 5);
    return { werte: reiheMitOps(start, Array(6).fill(o)), ops: Array(6).fill(o.t), regel: `Jedes Glied wird verdoppelt und dann ${c > 0 ? `um ${c} erhöht` : `um ${-c} vermindert`}.` };
  },
  diffdiff(r) {
    const d0 = r.int(1, 5), k = r.int(1, 4), start = r.int(1, 20);
    const ops = Array.from({ length: 6 }, (_, i) => plus(d0 + i * k));
    return { werte: reiheMitOps(start, ops), ops: ops.map((o) => o.t), regel: `Die Abstände wachsen jeweils um ${k}: ${ops.map((o) => o.t).join(", ")}.` };
  },
  verschachtelt(r) {
    const a0 = r.int(1, 20), d1 = r.pick([2, 3, 4, 5, 6]) * (r.chance(0.3) ? -1 : 1), b0 = r.int(2, 9);
    const zweiteMal = r.chance(0.5), d2 = r.pick([3, 5, 7, 10]);
    const A = Array.from({ length: 4 }, (_, i) => (d1 < 0 ? a0 + 30 : a0) + i * d1);
    const B = Array.from({ length: 3 }, (_, i) => (zweiteMal ? b0 * 2 ** i : b0 + i * d2));
    const werte = [A[0], B[0], A[1], B[1], A[2], B[2], A[3]];
    return {
      werte, verschachtelt: true, A, B,
      regel: `Zwei Reihen sind ineinander geschoben: Stellen 1, 3, 5, 7 rechnen ${d1 > 0 ? "+" : "−"}${Math.abs(d1)}, Stellen 2, 4, 6 rechnen ${zweiteMal ? "×2" : "+" + d2}.`,
      opA: d1 > 0 ? `+${d1}` : `−${-d1}`, opB: zweiteMal ? "×2" : `+${d2}`,
    };
  },
  fibo(r) {
    const w = [r.int(1, 5), r.int(1, 6)];
    while (w.length < 7) w.push(w[w.length - 1] + w[w.length - 2]);
    return { werte: w, fibo: true, regel: "Jedes Glied ist die Summe der beiden vorigen." };
  },
};

const REIHEN_STUFE = { 1: ["konstant", "mal", "quadrat"], 2: ["wechsel", "malplus", "diffdiff"], 3: ["verschachtelt", "fibo", "wechsel", "diffdiff"] };

export function zahlenreihe(r, stufe) {
  const art = r.pick(REIHEN_STUFE[stufe]);
  const R = REIHEN[art](r);
  const sicht = R.werte.slice(0, 6), loes = R.werte[6];
  const schritte = [];
  if (R.verschachtelt) {
    schritte.push(`Ungerade Stellen: ${R.A.slice(0, 3).map(zahl).join(" → ")} (jeweils ${R.opA})`);
    schritte.push(`Gerade Stellen: ${R.B.map(zahl).join(" → ")} (jeweils ${R.opB})`);
    schritte.push(`Die 7. Zahl gehört zur ersten Reihe: ${zahl(R.A[2])} ${R.opA} = <b>${zahl(loes)}</b>`);
  } else if (R.fibo) {
    schritte.push(sicht.slice(2).map((v, i) => `${zahl(sicht[i])} + ${zahl(sicht[i + 1])} = ${zahl(v)}`).join(" · "));
    schritte.push(`Nächste Zahl: ${zahl(sicht[4])} + ${zahl(sicht[5])} = <b>${zahl(loes)}</b>`);
  } else {
    schritte.push(`Übergänge: ${sicht.map((v, i) => (i < 5 ? `${zahl(v)} <span class="op">${R.ops[i]}</span> ` : zahl(v))).join("")}`);
    schritte.push(`Nächster Schritt: ${zahl(sicht[5])} ${R.ops[5]} = <b>${zahl(loes)}</b>`);
  }
  const letzteDiff = sicht[5] - sicht[4];
  const kand = [sicht[5] + letzteDiff, loes + 1, loes - 1, loes + (sicht[5] - sicht[4]) - (sicht[4] - sicht[3]), loes + 2, loes - 2];
  return {
    frage: "Welche Zahl setzt die Reihe sinnvoll fort?",
    reihe: [...sicht.map(zahl), "?"],
    ...mc(r, loes, kand, zahl, 4, { positiv: false }),
    schritte: [R.regel, ...schritte],
    schema: ["Abstände (Differenzen) zwischen den Zahlen bilden", "Kein festes Muster? Quotienten (×, ÷) prüfen", "Wechselnde Rechenarten oder zwei verschachtelte Reihen prüfen", "Regel auf das letzte Glied anwenden"],
  };
}

// ============================ Prozentrechnung ============================
const PROZ_SCHEMA = ["Grundwert (100 %) bestimmen – worauf bezieht sich die Prozentangabe?", "Prozentwert = Grundwert × p / 100", "Mehrere Änderungen: nacheinander multiplizieren (×1,2 · ×0,8), nicht addieren", "Rückrechnung: Endwert ÷ Faktor"];

export function prozentrechnung(r, stufe) {
  const art = r.pick({ 1: ["wert", "grund", "satz"], 2: ["folge", "wachstum", "satz"], 3: ["rueck", "mwst", "folge"] }[stufe]);
  const p = r.pick([5, 10, 12, 15, 20, 25, 30, 40, 60, 75]);
  const einheit = 100 / ggt(p, 100); // G must be a multiple of this for integer W
  if (art === "wert") {
    const G = einheit * r.int(2, Math.max(3, Math.floor(600 / einheit))), W = (G * p) / 100;
    return {
      frage: `Ein Kunde legt ${euro(G)} an. ${p} % davon fließen in einen Aktienfonds. Wie viel Euro sind das?`,
      ...mc(r, W, [G - W, (G * p) / 10, W * 2, W + p], euro),
      schritte: [`Grundwert G = ${euro(G)}, Prozentsatz p = ${p} %`, `1 % von ${euro(G)} = ${euro(G / 100)}`, `${p} % = ${zahl(p)} × ${euro(G / 100)} = <b>${euro(W)}</b>`],
      schema: PROZ_SCHEMA,
    };
  }
  if (art === "grund") {
    const G = einheit * r.int(2, Math.max(3, Math.floor(800 / einheit))), W = (G * p) / 100;
    return {
      frage: `${p} % der Mitarbeitenden einer Filiale arbeiten in Teilzeit. Das sind ${zahl(W)} Personen. Wie viele Mitarbeitende hat die Filiale insgesamt?`,
      ...mc(r, G, [W + (W * p) / 100, G - W, W * p, (W * 100) / (100 - p)].map((v) => (Number.isInteger(v) ? v : null)), zahl),
      schritte: [`${p} % entsprechen ${zahl(W)} Personen`, `1 % entspricht ${zahl(W)} ÷ ${p} = ${zahl(W / p)}`, `100 % = ${zahl(W / p)} × 100 = <b>${zahl(G)}</b>`],
      schema: PROZ_SCHEMA,
    };
  }
  if (art === "satz") {
    const G = r.pick([40, 50, 80, 120, 160, 200, 250, 400, 500, 800]), W = (G * p) / 100;
    if (!Number.isInteger(W)) return prozentrechnung(r, stufe);
    return {
      frage: `Von ${zahl(G)} Kreditanträgen wurden ${zahl(W)} abgelehnt. Wie viel Prozent der Anträge wurden abgelehnt?`,
      ...mc(r, p, [100 - p, rund((W / (G - W)) * 100, 1), p / 10, p * 2], prozent),
      schritte: [`Prozentsatz = Teil ÷ Ganzes × 100`, `${zahl(W)} ÷ ${zahl(G)} = ${zahl(W / G)}`, `${zahl(W / G)} × 100 = <b>${p} %</b>`],
      schema: PROZ_SCHEMA,
    };
  }
  if (art === "wachstum") {
    const alt = r.pick([80, 120, 160, 200, 240, 300, 400, 500]), q = r.pick([5, 10, 15, 20, 25, -10, -20, -25]);
    const neu = alt * (1 + q / 100);
    if (!Number.isInteger(neu)) return prozentrechnung(r, stufe);
    const diff = neu - alt;
    return {
      frage: `Der Ertrag einer Bank ist von ${zahl(alt)} Mio. € auf ${zahl(neu)} Mio. € ${q > 0 ? "gestiegen" : "gesunken"}. Um wie viel Prozent hat er sich verändert?`,
      ...mc(r, Math.abs(q), [rund((Math.abs(diff) / neu) * 100, 1), Math.abs(diff), Math.abs(q) * 2, Math.abs(q) + 5], (v) => `${q > 0 ? "+" : "−"}${prozent(v)}`),
      schritte: [`Veränderung: ${zahl(neu)} − ${zahl(alt)} = ${zahl(diff)} Mio. €`, `Bezug ist immer der <b>alte</b> Wert: ${zahl(Math.abs(diff))} ÷ ${zahl(alt)} = ${zahl(Math.abs(diff) / alt)}`, `${zahl(Math.abs(diff) / alt)} × 100 = <b>${q > 0 ? "+" : "−"}${Math.abs(q)} %</b>`],
      schema: PROZ_SCHEMA,
    };
  }
  if (art === "folge") {
    const a = r.pick([10, 20, 25, 50]), b = r.pick([10, 20, 25]), G = r.pick([200, 400, 800, 1000, 1200]);
    const z = G * (1 + a / 100), E = z * (1 - b / 100);
    if (!Number.isInteger(z * 100) || !Number.isInteger(E * 100)) return prozentrechnung(r, stufe);
    return {
      frage: `Eine Aktie kostet ${euro(G)}. Ihr Kurs steigt zuerst um ${a} % und fällt danach um ${b} %. Wie hoch ist der Kurs danach?`,
      ...mc(r, E, [G * (1 + (a - b) / 100), G, z, G * (1 - b / 100)], euro),
      schritte: [`Nach dem Anstieg: ${euro(G)} × ${zahl(1 + a / 100)} = ${euro(z)}`, `Der Rückgang bezieht sich auf den <b>neuen</b> Wert: ${euro(z)} × ${zahl(1 - b / 100)} = <b>${euro(E)}</b>`, `Falle: ${a} % − ${b} % = ${a - b} % auf den Ursprungswert gerechnet ergibt ${euro(G * (1 + (a - b) / 100))} – das ist falsch.`],
      schema: PROZ_SCHEMA,
    };
  }
  if (art === "rueck") {
    const a = r.pick([20, 25, 50]), b = r.pick([10, 20, 25]), G = r.pick([100, 200, 400, 800]);
    const E = G * (1 + a / 100) * (1 - b / 100);
    if (!Number.isInteger(E * 100)) return prozentrechnung(r, stufe);
    const faktor = rund((1 + a / 100) * (1 - b / 100), 4);
    return {
      frage: `Ein Preis wurde zuerst um ${a} % erhöht und danach um ${b} % gesenkt. Jetzt beträgt er ${euro(E)}. Wie hoch war der ursprüngliche Preis?`,
      ...mc(r, G, [E * (1 - a / 100) * (1 + b / 100), E / (1 + (a - b) / 100), E, E * (1 - (a - b) / 100)].map((v) => rund(v, 2)), euro),
      schritte: [`Ursprungspreis x: x × ${zahl(1 + a / 100)} × ${zahl(1 - b / 100)} = ${euro(E)}`, `Gesamtfaktor: ${zahl(1 + a / 100)} × ${zahl(1 - b / 100)} = ${zahl(faktor)}`, `x = ${euro(E)} ÷ ${zahl(faktor)} = <b>${euro(G)}</b>`, `Probe: ${euro(G)} → ${euro(G * (1 + a / 100))} → ${euro(E)} ✓`],
      schema: PROZ_SCHEMA,
    };
  }
  // mwst: gross back to net
  const netto = r.int(2, 30) * 100, brutto = netto * 1.19;
  return {
    frage: `Ein Laptop kostet einschließlich 19 % Umsatzsteuer ${euro(brutto)}. Wie hoch ist der Nettopreis?`,
    ...mc(r, netto, [rund(brutto * 0.81, 2), rund(brutto - netto * 0.1, 2), rund(brutto / 1.1, 2), rund(brutto * 0.9, 2)], euro),
    schritte: [`Der Bruttopreis entspricht 119 % (Netto 100 % + 19 % Steuer)`, `1 % = ${euro(brutto)} ÷ 119 = ${euro(brutto / 119)}`, `100 % = <b>${euro(netto)}</b>`, `Falle: 19 % vom Bruttopreis abziehen (${euro(rund(brutto * 0.81, 2))}) ist falsch – die 19 % beziehen sich auf den Nettopreis.`],
    schema: PROZ_SCHEMA,
  };
}

// ============================ Dreisatz ============================
const DREI_SCHEMA = ["Prüfen: je mehr …, desto mehr (proportional) oder desto weniger (antiproportional)?", "Auf eine Einheit zurückrechnen (÷ bzw. ×)", "Auf die gesuchte Menge hochrechnen", "Zusammengesetzt: jede Größe einzeln nacheinander umrechnen"];

export function dreisatz(r, stufe) {
  const art = r.pick({ 1: ["prop", "prop", "anti"], 2: ["anti", "etappe", "prop"], 3: ["zus", "zus", "etappe"] }[stufe]);
  if (art === "prop") {
    const a = r.int(3, 9), preis = r.pick([2, 3, 4, 5, 6, 8, 12, 15, 1.5, 2.5]), b = r.int(4, 20);
    if (a === b) return dreisatz(r, stufe);
    const Pa = rund(a * preis, 2), Pb = rund(b * preis, 2);
    return {
      frage: `${a} Ordner kosten ${euro(Pa)}. Wie viel kosten ${b} Ordner?`,
      ...mc(r, Pb, [rund((Pa * a) / b, 2), Pa + (b - a), rund(Pb + preis, 2), rund(Pb - preis, 2)], euro),
      schritte: [`Je mehr Ordner, desto teurer → proportional`, `1 Ordner: ${euro(Pa)} ÷ ${a} = ${euro(preis)}`, `${b} Ordner: ${b} × ${euro(preis)} = <b>${euro(Pb)}</b>`],
      schema: DREI_SCHEMA,
    };
  }
  if (art === "anti") {
    const gesamt = r.pick([24, 36, 48, 60, 72, 90, 120]);
    const teiler = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15].filter((t) => gesamt % t === 0 && gesamt / t >= 2);
    const w1 = r.pick(teiler);
    let w2 = r.pick(teiler);
    if (w1 === w2) w2 = teiler[(teiler.indexOf(w1) + 1) % teiler.length];
    const d1 = gesamt / w1, d2 = gesamt / w2;
    return {
      frage: `${w1} Mitarbeitende brauchen für die Prüfung aller Akten ${d1} Tage. Wie viele Tage brauchen ${w2} Mitarbeitende bei gleichem Tempo?`,
      ...mc(r, d2, [rund((d1 * w2) / w1, 2), d1 + (w1 - w2), d1 - (w1 - w2), d2 + 1], (v) => `${zahl(v)} Tage`),
      schritte: [`Mehr Leute → weniger Tage: antiproportional`, `Gesamtarbeit: ${w1} × ${d1} = ${gesamt} Personentage`, `${gesamt} ÷ ${w2} = <b>${zahl(d2)} Tage</b>`],
      schema: DREI_SCHEMA,
    };
  }
  if (art === "etappe") {
    const t1 = r.int(4, 8), t2 = r.pick([2, 3, 4, 5, 6].filter((x) => x !== t1));
    const neu = r.int(12, 40), gesamt = neu * t2, proTag = gesamt / t1;
    if (!Number.isInteger(rund(proTag * 10, 6))) return dreisatz(r, stufe);
    return {
      frage: `Eine Wanderin legt an ${t1} Tagen jeweils ${zahl(proTag)} km zurück. Wie viele Kilometer muss sie durchschnittlich pro Tag gehen, um die gleiche Strecke in ${t2} Tagen zu schaffen?`,
      ...mc(r, neu, [rund((proTag * t2) / t1, 2), rund(gesamt / t1, 2), rund(proTag + (t1 - t2), 2), rund(proTag / t1, 2)], (v) => `${zahl(v)} km`),
      schritte: [`Gesamtstrecke: ${t1} × ${zahl(proTag)} km = ${zahl(gesamt)} km`, `Auf ${t2} Tage verteilen: ${zahl(gesamt)} ÷ ${t2} = <b>${zahl(neu)} km</b>`],
      schema: DREI_SCHEMA,
    };
  }
  // compound rule of three
  const m1 = r.pick([2, 3, 4, 5, 6]), h1 = r.pick([2, 4, 5, 6, 8]), proMh = r.pick([5, 10, 12, 15, 20, 25]);
  const m2 = r.pick([2, 3, 4, 6, 8, 9, 10].filter((x) => x !== m1)), h2 = r.pick([3, 4, 6, 7, 8, 10].filter((x) => x !== h1));
  const n1 = m1 * h1 * proMh, n2 = m2 * h2 * proMh;
  return {
    frage: `${m1} Zählmaschinen prüfen in ${h1} Stunden ${zahl(n1)} Geldscheinbündel. Wie viele Bündel prüfen ${m2} Maschinen in ${h2} Stunden?`,
    ...mc(r, n2, [rund((n1 * m2) / m1, 0), rund((n1 * h2) / h1, 0), rund((n1 * m1 * h2) / (m2 * h1), 0), n2 + proMh * m2], zahl),
    schritte: [`1 Maschine in 1 Stunde: ${zahl(n1)} ÷ ${m1} ÷ ${h1} = ${proMh} Bündel`, `${m2} Maschinen in 1 Stunde: ${m2} × ${proMh} = ${m2 * proMh}`, `in ${h2} Stunden: ${m2 * proMh} × ${h2} = <b>${zahl(n2)}</b>`],
    schema: DREI_SCHEMA,
  };
}

// ============================ Zinsrechnung ============================
const ZINS_SCHEMA = ["Jahreszins: K × p / 100", "Monate: × m / 12 · Tage (30/360): × t / 360", "Zinseszins: K × (1 + p/100) je Jahr – Zinsen werden mitverzinst", "Genau lesen: Zinsen oder Endkapital gefragt?"];

export function zinsrechnung(r, stufe) {
  const art = r.pick({ 1: ["einfach", "einfach", "monat"], 2: ["monat", "tag", "einfach"], 3: ["zinseszins", "zinseszins", "tag"] }[stufe]);
  if (art === "einfach") {
    const K = r.pick([1000, 2000, 2500, 4000, 5000, 8000, 10000, 12000]), p = r.pick([1, 1.5, 2, 2.5, 3, 4, 5]), t = r.int(1, 4);
    const Z = rund((K * p * t) / 100, 2);
    return {
      frage: `${euro(K)} werden ${t} ${t === 1 ? "Jahr" : "Jahre"} zu ${prozent(p)} pro Jahr angelegt (ohne Zinseszins). Wie viel Zinsen fallen insgesamt an?`,
      ...mc(r, Z, [rund((K * p) / 100, 2), rund(K + Z, 2), rund((K * p * t) / 1000, 2), rund(Z * 2, 2)], euro),
      schritte: [`Zinsen für 1 Jahr: ${euro(K)} × ${zahl(p)} / 100 = ${euro((K * p) / 100)}`, `für ${t} ${t === 1 ? "Jahr" : "Jahre"}: ${euro((K * p) / 100)} × ${t} = <b>${euro(Z)}</b>`],
      schema: ZINS_SCHEMA,
    };
  }
  if (art === "monat") {
    const K = r.pick([1200, 2400, 3600, 4800, 6000, 12000]), p = r.pick([2, 3, 4, 5, 6]), m = r.pick([1, 2, 3, 4, 5, 6, 8, 9]);
    const Z = rund((K * p * m) / 1200, 2);
    return {
      frage: `Ein Kredit über ${euro(K)} wird nach ${m} ${m === 1 ? "Monat" : "Monaten"} zurückgezahlt. Der Zinssatz beträgt ${p} % pro Jahr. Wie viel Zinsen sind zu zahlen?`,
      ...mc(r, Z, [rund((K * p) / 100, 2), rund((K * p * m) / 100, 2), rund((K * p * m) / 360, 2), rund(Z + (K * p) / 1200, 2)], euro),
      schritte: [`Jahreszins: ${euro(K)} × ${p} / 100 = ${euro((K * p) / 100)}`, `pro Monat: ${euro((K * p) / 100)} ÷ 12 = ${euro((K * p) / 1200)}`, `${m} Monate: ${m} × ${euro((K * p) / 1200)} = <b>${euro(Z)}</b>`],
      schema: ZINS_SCHEMA,
    };
  }
  if (art === "tag") {
    const K = r.pick([3600, 7200, 9000, 18000, 36000]), p = r.pick([2, 3, 4, 5]), t = r.pick([30, 45, 60, 90, 120, 180, 270]);
    const Z = rund((K * p * t) / 36000, 2);
    return {
      frage: `${euro(K)} liegen ${t} Tage auf einem Tagesgeldkonto zu ${p} % pro Jahr (Zinstage 30/360). Wie viel Zinsen gibt es?`,
      ...mc(r, Z, [rund((K * p * t) / 36500, 2), rund((K * p) / 100, 2), rund((K * p * t) / 3600, 2), rund(Z * 2, 2)], euro),
      schritte: [`Formel: Z = K × p × t / (100 × 360)`, `Jahreszins: ${euro(K)} × ${p} / 100 = ${euro((K * p) / 100)}`, `Anteil ${t}/360 = ${bruchText(fr(t, 360))}: ${euro((K * p) / 100)} × ${bruchText(fr(t, 360))} = <b>${euro(Z)}</b>`],
      schema: ZINS_SCHEMA,
    };
  }
  const v = r.pick([{ p: 4, K: [5000, 10000, 2500], n: 2 }, { p: 5, K: [4000, 8000, 2000], n: 2 }, { p: 10, K: [1000, 2000, 5000], n: 3 }, { p: 5, K: [8000, 16000], n: 3 }, { p: 2, K: [5000, 10000], n: 2 }, { p: 3, K: [10000, 20000], n: 2 }]);
  const K = r.pick(v.K), n = v.n, q = 1 + v.p / 100;
  const werte = [K];
  for (let i = 0; i < n; i++) werte.push(rund(werte[i] * q, 2));
  const E = werte[n];
  const nurZinsen = r.chance(0.3);
  const ziel = nurZinsen ? rund(E - K, 2) : E;
  return {
    frage: `${euro(K)} werden ${n} Jahre zu ${v.p} % angelegt. Die Zinsen werden jedes Jahr mitverzinst. ${nurZinsen ? "Wie viel Zinsen bringt die Anlage insgesamt?" : "Wie hoch ist das Guthaben nach " + n + " Jahren?"}`,
    ...mc(r, ziel, nurZinsen ? [rund((K * v.p * n) / 100, 2), E, rund(ziel - (K * v.p) / 100, 2), rund((K * v.p) / 100, 2)] : [rund(K * (1 + (v.p * n) / 100), 2), rund(E - K, 2), rund(werte[n - 1], 2), rund(E + (K * v.p) / 100, 2)], euro),
    schritte: [
      ...werte.slice(1).map((w, i) => `Jahr ${i + 1}: ${euro(werte[i])} × ${zahl(q)} = ${euro(w)}`),
      nurZinsen ? `Zinsen = ${euro(E)} − ${euro(K)} = <b>${euro(ziel)}</b>` : `Guthaben nach ${n} Jahren: <b>${euro(E)}</b>`,
      `Ohne Zinseszins wären es nur ${euro(rund(K * (1 + (v.p * n) / 100), 2))}.`,
    ],
    schema: ZINS_SCHEMA,
  };
}

// ============================ Textaufgaben ============================
export function textaufgabe(r, stufe) {
  const art = r.pick({ 1: ["durchschnitt", "verteilung", "mischung"], 2: ["mischung", "bewegung", "arbeit"], 3: ["bewegung", "arbeit", "alter", "gegenverkehr"] }[stufe]);
  if (art === "durchschnitt") {
    const n = r.int(4, 6), ziel = r.int(40, 90);
    const w = Array.from({ length: n - 1 }, () => ziel + r.int(-15, 15));
    const summeSoll = ziel * n, letzter = summeSoll - w.reduce((a, b) => a + b, 0);
    if (letzter < 10 || letzter > 140) return textaufgabe(r, stufe);
    return {
      frage: `Eine Filiale zählt an ${n - 1} Tagen ${w.join(", ")} Kunden. Wie viele Kunden müssen am ${n}. Tag kommen, damit der Durchschnitt genau ${ziel} Kunden pro Tag beträgt?`,
      ...mc(r, letzter, [ziel, rund(w.reduce((a, b) => a + b, 0) / (n - 1), 0), letzter + n, letzter - n], zahl),
      schritte: [`Benötigte Summe: ${n} Tage × ${ziel} = ${summeSoll}`, `Bisher: ${w.join(" + ")} = ${w.reduce((a, b) => a + b, 0)}`, `Fehlt: ${summeSoll} − ${w.reduce((a, b) => a + b, 0)} = <b>${letzter}</b>`],
      schema: ["Durchschnitt × Anzahl = benötigte Summe", "Bisherige Werte addieren", "Differenz = fehlender Wert"],
    };
  }
  if (art === "verteilung") {
    const teile = [r.int(1, 4), r.int(1, 5), r.int(2, 6)], summeT = teile[0] + teile[1] + teile[2];
    const proTeil = r.pick([500, 1000, 1500, 2000, 2500, 4000]), G = proTeil * summeT, gefragt = r.int(0, 2), namen = ["A", "B", "C"];
    return {
      frage: `Drei Gesellschafter A, B und C teilen einen Gewinn von ${euro(G)} im Verhältnis ${teile.join(" : ")}. Wie viel erhält ${namen[gefragt]}?`,
      ...mc(r, teile[gefragt] * proTeil, [rund(G / 3, 2), teile[gefragt] * 1000, rund((G * teile[gefragt]) / 10, 2), (teile[gefragt] + 1) * proTeil], euro),
      schritte: [`Teile insgesamt: ${teile.join(" + ")} = ${summeT}`, `1 Teil = ${euro(G)} ÷ ${summeT} = ${euro(proTeil)}`, `${namen[gefragt]}: ${teile[gefragt]} × ${euro(proTeil)} = <b>${euro(teile[gefragt] * proTeil)}</b>`],
      schema: ["Alle Teile addieren", "Gesamtbetrag ÷ Summe der Teile = Wert eines Teils", "× Anzahl Teile der gefragten Person"],
    };
  }
  if (art === "mischung") {
    const neu = r.pick([5, 8, 10, 12, 15, 20, 25]), alt = r.pick([10, 15, 20, 25, 30, 40, 50].filter((x) => x > neu));
    const V = r.pick([10, 20, 30, 40, 50, 60, 80, 100, 120]), stoff = (V * alt) / 100, gesamtNeu = (stoff * 100) / neu, wasser = gesamtNeu - V;
    if (!Number.isInteger(stoff * 10) || !Number.isInteger(gesamtNeu) || gesamtNeu > 400) return textaufgabe(r, stufe);
    return {
      frage: `${zahl(V)} Liter einer Reinigungslösung enthalten ${alt} % Konzentrat. Wie viele Liter Wasser muss man hinzufügen, damit der Anteil auf ${neu} % sinkt?`,
      ...mc(r, wasser, [gesamtNeu, rund((V * (alt - neu)) / 100, 2), rund((V * alt) / neu - stoff, 2), wasser + V / 2], (v) => `${zahl(v)} l`),
      schritte: [`Konzentrat bleibt gleich: ${alt} % von ${zahl(V)} l = ${zahl(stoff)} l`, `Neue Gesamtmenge: ${zahl(stoff)} l sind ${neu} % → ${zahl(stoff)} ÷ ${zahl(neu / 100)} = ${zahl(gesamtNeu)} l`, `Wasser: ${zahl(gesamtNeu)} − ${zahl(V)} = <b>${zahl(wasser)} l</b>`],
      schema: ["Menge des Stoffes bestimmen (bleibt gleich)", "Neue Gesamtmenge = Stoff ÷ neuer Anteil", "Differenz = hinzuzufügende Menge"],
    };
  }
  if (art === "bewegung") {
    const v1 = r.pick([40, 50, 60, 80, 90]), dv = r.pick([10, 20, 30, 40]), v2 = v1 + dv, h = r.pick([0.5, 1, 1.5, 2]);
    const vorsprung = v1 * h, t = vorsprung / dv;
    if (!Number.isInteger(t * 4)) return textaufgabe(r, stufe);
    const zeit = (x) => (x === Math.floor(x) ? `${zahl(x)} ${x === 1 ? "Stunde" : "Stunden"}` : `${zahl(x)} Stunden`);
    return {
      frage: `Ein Geldtransporter fährt mit ${v1} km/h los. ${h === 1 ? "Eine Stunde" : zahl(h) + " Stunden"} später folgt ein zweiter Wagen auf derselben Strecke mit ${v2} km/h. Nach wie vielen Stunden Fahrt holt der zweite Wagen den ersten ein?`,
      ...mc(r, t, [t + h, rund(vorsprung / v2, 2), rund(vorsprung / v1, 2), t * 2], zeit),
      schritte: [`Vorsprung: ${v1} km/h × ${zahl(h)} h = ${zahl(vorsprung)} km`, `Der zweite Wagen holt pro Stunde ${v2} − ${v1} = ${dv} km auf`, `${zahl(vorsprung)} km ÷ ${dv} km/h = <b>${zeit(t)}</b> (Fahrzeit des zweiten Wagens)`],
      schema: ["Vorsprung = Geschwindigkeit × Vorlaufzeit", "Aufholgeschwindigkeit = Differenz der Geschwindigkeiten", "Zeit = Vorsprung ÷ Differenz"],
    };
  }
  if (art === "gegenverkehr") {
    const v1 = r.pick([60, 70, 80, 90, 100]), v2 = r.pick([40, 50, 60, 80, 120]), t = r.pick([1.5, 2, 2.5, 3]);
    const s = (v1 + v2) * t;
    return {
      frage: `Zwei Züge fahren gleichzeitig in zwei ${zahl(s)} km voneinander entfernten Städten los und fahren aufeinander zu – der eine mit ${v1} km/h, der andere mit ${v2} km/h. Nach wie vielen Stunden begegnen sie sich?`,
      ...mc(r, t, [rund(s / Math.abs(v1 - v2 || 10), 2), rund(s / v1, 2), rund(s / v2, 2), t + 0.5], (v) => `${zahl(v)} Stunden`),
      schritte: [`Gegenverkehr: Die Geschwindigkeiten addieren sich: ${v1} + ${v2} = ${v1 + v2} km/h`, `${zahl(s)} km ÷ ${v1 + v2} km/h = <b>${zahl(t)} Stunden</b>`],
      schema: ["Aufeinander zu: Geschwindigkeiten addieren", "Gleiche Richtung: Geschwindigkeiten subtrahieren", "Zeit = Strecke ÷ (gemeinsame) Geschwindigkeit"],
    };
  }
  if (art === "arbeit") {
    const [a, b] = r.pick([[3, 6], [4, 12], [6, 12], [10, 15], [12, 24], [20, 30], [6, 3], [12, 4], [8, 24], [5, 20], [15, 30]]);
    const t = (a * b) / (a + b);
    return {
      frage: `Eine Pumpe füllt ein Becken allein in ${a} Stunden, eine zweite allein in ${b} Stunden. Wie lange brauchen beide zusammen?`,
      ...mc(r, t, [(a + b) / 2, a + b, Math.abs(a - b), rund(Math.min(a, b) / 2, 2)], (v) => `${zahl(v)} Stunden`),
      schritte: [`Pumpe 1 schafft pro Stunde ${bruchText([1, a])} des Beckens, Pumpe 2 ${bruchText([1, b])}`, `Zusammen: ${bruchText([1, a])} + ${bruchText([1, b])} = ${bruchText(fr(a + b, a * b))} pro Stunde`, `Dauer: 1 ÷ ${bruchText(fr(a + b, a * b))} = <b>${zahl(t)} Stunden</b>`, `Kurzformel: ${a} × ${b} ÷ (${a} + ${b}) = ${a * b} ÷ ${a + b} = ${zahl(t)}`],
      schema: ["Leistung pro Stunde = 1 ÷ Zeit allein", "Leistungen addieren", "Gemeinsame Zeit = 1 ÷ Summe (oder a·b ÷ (a+b))"],
    };
  }
  // age puzzle: father is k times as old as child; in n years he is m times as old
  const kind = r.int(4, 14), k = r.int(3, 6), vater = kind * k, m = r.int(2, k - 1);
  const n = (vater - m * kind) / (m - 1);
  if (!Number.isInteger(n) || n <= 0 || n > 30) return textaufgabe(r, stufe);
  return {
    frage: `Eine Mutter ist heute ${k}-mal so alt wie ihre Tochter. In ${n} Jahren ist sie nur noch ${m}-mal so alt. Wie alt ist die Tochter heute?`,
    ...mc(r, kind, [kind + n, vater, kind + 2, kind - 2], (v) => `${v} Jahre`),
    schritte: [`Tochter heute x, Mutter heute ${k}x`, `In ${n} Jahren: ${k}x + ${n} = ${m} × (x + ${n})`, `${k}x + ${n} = ${m}x + ${m * n} → ${k - m}x = ${m * n - n} → x = <b>${kind}</b>`, `Probe: heute ${kind} und ${vater}; in ${n} Jahren ${kind + n} und ${vater + n} = ${m} × ${kind + n} ✓`],
    schema: ["Unbekanntes Alter als x ansetzen", "Beide Personen altern gleich schnell (+n)", "Gleichung aufstellen und nach x auflösen", "Probe machen"],
  };
}

// ============================ Tabellen & Diagramme ============================
const PRODUKTE = [["Drucker", ["Office 24", "Profi B200", "Kompakt 2-30", "Laser XL"]], ["Tablets", ["Tab S", "Note Pro", "Pad Mini", "Slate 10"]], ["Bürostühle", ["Ergo 1", "Komfort Plus", "Basic Line", "Chef 3"]]];

function tabelleHtml(kopf, zeilen) {
  return `<table class="tt-tabelle"><thead><tr>${kopf.map((k) => `<th>${k}</th>`).join("")}</tr></thead><tbody>${zeilen.map((z) => `<tr>${z.map((c, i) => `<td${i ? ' class="zahl"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

export function tabelle(r, stufe) {
  if (stufe >= 2 && r.chance(0.5)) return diagramm(r, stufe);
  const [ding, namen] = r.pick(PRODUKTE);
  const n = r.pick([20, 25, 30, 40, 50]);
  let modelle;
  const gleich = stufe === 3 && r.chance(0.3);
  if (gleich) {
    // three different list prices that cost the same after discount
    const ziel = r.pick([180, 240, 270, 300, 360]);
    const paare = [];
    for (const rab of [5, 10, 15, 20, 25, 40, 50]) {
      const preis = (ziel * 100) / (100 - rab);
      if (Number.isInteger(preis / 5)) paare.push([preis, rab]);
    }
    if (paare.length < 3) return tabelle(r, stufe);
    modelle = r.shuffle(paare).slice(0, 3).map(([p, rab]) => ({ preis: p, rab }));
  } else {
    modelle = Array.from({ length: 3 }, () => ({ preis: r.int(4, 12) * 50, rab: r.pick([5, 10, 15, 20, 25, 30]) }));
  }
  const nm = r.shuffle(namen).slice(0, 3);
  modelle.forEach((m, i) => { m.name = nm[i]; m.netto = rund((m.preis * (100 - m.rab)) / 100, 2); m.lager = r.int(n + 10, 800); });
  const nettos = modelle.map((m) => m.netto);
  if (!gleich && new Set(nettos).size < 3) return tabelle(r, stufe);
  const sortiert = modelle.slice().sort((a, b) => a.netto - b.netto);
  let falle = false;
  if (!gleich && stufe >= 2 && r.chance(0.5)) { sortiert[0].lager = r.int(5, n - 5); falle = true; }
  const gewinner = gleich ? null : falle ? sortiert[1] : sortiert[0];
  const GLEICH = "Mit Rabatt sind die Kosten für alle drei Modelle gleich.";
  const labels = [...modelle.map((m) => m.name), GLEICH];
  const richtigLabel = gleich ? GLEICH : gewinner.name;
  return {
    frage: `Ein Händler bietet folgende ${ding} an. Auf jedes Modell gibt es einen Rabatt; vorrätig ist jeweils nur die angegebene Stückzahl. Sie benötigen ${n} Stück. Welches Modell bestellen Sie, wenn Sie möglichst wenig Geld ausgeben möchten?`,
    tabelle: tabelleHtml(["Modell", "Preis (€)", "Rabatt (%)", "Stückzahl"], modelle.map((m) => [esc(m.name), zahl(m.preis), zahl(m.rab), zahl(m.lager)])),
    optionen: labels, richtig: labels.indexOf(richtigLabel), festeReihenfolge: true,
    schritte: [
      ...modelle.map((m) => `${esc(m.name)}: ${euro(m.preis)} × ${zahl((100 - m.rab) / 100)} = ${euro(m.netto)} je Stück${m.lager < n ? ` – <b>nur ${m.lager} vorrätig</b>` : ""}`),
      gleich ? `Alle drei kosten nach Rabatt <b>${euro(nettos[0])}</b> je Stück.` : falle ? `${esc(sortiert[0].name)} wäre am günstigsten, ist aber nicht in ausreichender Menge vorrätig → <b>${esc(gewinner.name)}</b>` : `Am günstigsten: <b>${esc(gewinner.name)}</b> (${n} Stück = ${euro(gewinner.netto * n)})`,
    ],
    schema: ["Preis nach Rabatt je Stück: Preis × (1 − Rabatt)", "Nur Modelle mit genügend Stückzahl berücksichtigen", "Günstigstes vergleichen – die Stückzahl ist oft nur Ablenkung"],
  };
}

function balkenSvg(jahre, werte, titel) {
  const B = 300, H = 170, l = 30, u = 22, o = 14, max = Math.max(...werte) * 1.15, bw = (B - l - 10) / jahre.length;
  const y = (v) => H - u - ((H - u - o) * v) / max;
  return `<svg class="tt-diagramm" viewBox="0 0 ${B} ${H}" role="img" aria-label="${esc(titel)}">
    <line x1="${l}" y1="${H - u}" x2="${B - 4}" y2="${H - u}" class="achse"/>
    ${werte.map((v, i) => { const x = l + 6 + i * bw; return `<rect x="${x}" y="${y(v)}" width="${bw - 12}" height="${H - u - y(v)}" rx="4" class="balken-d"/><text x="${x + (bw - 12) / 2}" y="${y(v) - 4}" class="wert">${zahl(v)}</text><text x="${x + (bw - 12) / 2}" y="${H - 6}" class="jahr">${jahre[i]}</text>`; }).join("")}
  </svg>`;
}

function diagramm(r, stufe) {
  const titel = r.pick(["Zinsüberschuss in Mio. €", "Neukredite in Mio. €", "Kontoeröffnungen in Tausend", "Provisionserträge in Mio. €"]);
  const jahre = [2021, 2022, 2023, 2024, 2025];
  const art = r.pick(stufe === 3 ? ["wachstum", "schnitt", "anteil"] : ["wachstum", "differenz", "schnitt"]);
  const w = [r.int(5, 15) * 20];
  for (let i = 1; i < 5; i++) w.push(Math.max(40, w[i - 1] + r.int(-3, 4) * 20));
  const pick2 = r.int(0, 3);
  if (art === "wachstum") {
    const q = r.pick([5, 10, 15, 20, 25, 30, -10, -20, -25]);
    w[pick2 + 1] = w[pick2] * (1 + q / 100);
    if (!Number.isInteger(w[pick2 + 1])) return diagramm(r, stufe);
    const a = w[pick2], b = w[pick2 + 1];
    return {
      frage: `Das Diagramm zeigt: ${titel}. Um wie viel Prozent hat sich der Wert von ${jahre[pick2]} auf ${jahre[pick2 + 1]} verändert?`,
      bild: balkenSvg(jahre, w, titel),
      ...mc(r, q, [rund(((b - a) / b) * 100, 1), b - a, -q, q + (q > 0 ? 5 : -5)], (v) => `${v > 0 ? "+" : "−"}${prozent(Math.abs(v))}`, 4, { positiv: false }),
      schritte: [`${jahre[pick2]}: ${zahl(a)}, ${jahre[pick2 + 1]}: ${zahl(b)}`, `Veränderung: ${zahl(b)} − ${zahl(a)} = ${zahl(b - a)}`, `Bezogen auf das Ausgangsjahr: ${zahl(b - a)} ÷ ${zahl(a)} × 100 = <b>${q > 0 ? "+" : "−"}${Math.abs(q)} %</b>`],
      schema: ["Werte ablesen", "Differenz bilden", "Durch den Ausgangswert (älteres Jahr) teilen × 100"],
    };
  }
  if (art === "schnitt") {
    const rest = w.slice(0, 4).reduce((a, b) => a + b, 0);
    const ziel = Math.ceil(rest / 4 / 20) * 20;
    w[4] = ziel * 5 - rest;
    if (w[4] < 40) return diagramm(r, stufe);
    const s = w.reduce((a, b) => a + b, 0);
    return {
      frage: `Das Diagramm zeigt: ${titel}. Wie hoch ist der Durchschnitt der fünf Jahre?`,
      bild: balkenSvg(jahre, w, titel),
      ...mc(r, s / 5, [rund(s / 4, 2), (Math.max(...w) + Math.min(...w)) / 2, w[2], s / 5 + 20], zahl),
      schritte: [`Summe: ${w.map(zahl).join(" + ")} = ${zahl(s)}`, `Durchschnitt: ${zahl(s)} ÷ 5 = <b>${zahl(s / 5)}</b>`],
      schema: ["Alle Werte addieren", "Durch die Anzahl der Werte teilen"],
    };
  }
  if (art === "anteil") {
    const s0 = w.reduce((a, b) => a + b, 0);
    const kand = [5, 10, 20, 25].filter((p) => true);
    // force jahre[pick2] share to be a nice percent of the 5-year total
    const p = r.pick(kand);
    const others = s0 - w[pick2];
    const x = (p * others) / (100 - p);
    if (!Number.isInteger(x) || x < 20) return diagramm(r, stufe);
    w[pick2] = x;
    const s = w.reduce((a, b) => a + b, 0);
    return {
      frage: `Das Diagramm zeigt: ${titel}. Welchen Anteil hat das Jahr ${jahre[pick2]} an der Summe aller fünf Jahre?`,
      bild: balkenSvg(jahre, w, titel),
      ...mc(r, p, [20, rund((x / others) * 100, 1), p + 5, p * 2], prozent),
      schritte: [`Summe aller Jahre: ${zahl(s)}`, `Anteil: ${zahl(x)} ÷ ${zahl(s)} = ${zahl(x / s)}`, `${zahl(x / s)} × 100 = <b>${p} %</b>`],
      schema: ["Gesamtsumme bilden", "Teil ÷ Gesamt × 100"],
    };
  }
  const mx = Math.max(...w), mn = Math.min(...w);
  return {
    frage: `Das Diagramm zeigt: ${titel}. Wie groß ist der Unterschied zwischen dem höchsten und dem niedrigsten Wert?`,
    bild: balkenSvg(jahre, w, titel),
    ...mc(r, mx - mn, [w[4] - w[0], mx, mx - mn + 20, Math.abs(w[1] - w[0])], zahl),
    schritte: [`Höchster Wert: ${zahl(mx)} (${jahre[w.indexOf(mx)]})`, `Niedrigster Wert: ${zahl(mn)} (${jahre[w.indexOf(mn)]})`, `Differenz: ${zahl(mx)} − ${zahl(mn)} = <b>${zahl(mx - mn)}</b>`],
    schema: ["Extremwerte ablesen", "Differenz bilden – nicht erstes und letztes Jahr verwechseln"],
  };
}

// ============================ Kopfrechnen ============================
export function kopfrechnen(r, stufe) {
  const art = r.pick({ 1: ["bruchplus", "dezimal"], 2: ["ueberschlag", "bruchplus", "dezimal"], 3: ["bruchvon", "ueberschlag", "division"] }[stufe]);
  if (art === "bruchplus") {
    const n1 = r.pick([2, 3, 4, 5, 6]), n2 = r.pick([3, 4, 6, 8, 10, 12].filter((x) => x !== n1));
    const z1 = r.int(1, n1 - 1), z2 = r.int(1, n2 - 1), minus = stufe === 2 && r.chance(0.5) && z1 / n1 > z2 / n2;
    const er = fr(minus ? z1 * n2 - z2 * n1 : z1 * n2 + z2 * n1, n1 * n2);
    const kgv = (n1 * n2) / ggt(n1, n2);
    const f1 = fr(minus ? Math.abs(z1 - z2) || 1 : z1 + z2, n1 + n2), f2 = fr(er[0] + 1, er[1]), f3 = fr(minus ? z1 * z2 : z1 * n2 + z2 * n1, n1 * n2 * 2);
    const opts = mcText(r, bruchText(er), [f1, f2, f3, fr(er[0], er[1] + 1), fr(er[0] + 2, er[1]), fr(er[0], er[1] * 2)].map(bruchText).filter((s, i, a) => s !== bruchText(er) && a.indexOf(s) === i).slice(0, 3));
    return {
      frage: `Berechnen Sie: ${bruch([z1, n1])} ${minus ? "−" : "+"} ${bruch([z2, n2])}`,
      optionen: opts.optionen.map((s) => bruch(s.split("/").map(Number).concat(s.includes("/") ? [] : [1]).slice(0, 2))), richtig: opts.richtig,
      schritte: [`Gemeinsamer Nenner: ${kgv}`, `${bruchText([z1, n1])} = ${bruchText([(z1 * kgv) / n1, kgv])}, ${bruchText([z2, n2])} = ${bruchText([(z2 * kgv) / n2, kgv])}`, `${(z1 * kgv) / n1} ${minus ? "−" : "+"} ${(z2 * kgv) / n2} = ${minus ? (z1 * kgv) / n1 - (z2 * kgv) / n2 : (z1 * kgv) / n1 + (z2 * kgv) / n2} → ${bruchText([minus ? (z1 * kgv) / n1 - (z2 * kgv) / n2 : (z1 * kgv) / n1 + (z2 * kgv) / n2, kgv])} = <b>${bruchText(er)}</b>`],
      schema: ["Hauptnenner (kgV) suchen", "Brüche erweitern", "Zähler addieren/subtrahieren, Nenner bleibt", "Kürzen"],
    };
  }
  if (art === "dezimal") {
    const [d, f] = r.pick([[0.25, 4], [0.5, 2], [0.2, 5], [0.75, 4 / 3], [0.125, 8], [1.5, 2 / 3], [2.5, 0.4]]);
    const basis = d === 0.75 ? r.int(2, 30) * 4 : d === 1.5 ? r.int(2, 40) * 2 : d === 0.125 ? r.int(2, 20) * 8 : r.int(4, 60) * (d === 2.5 ? 2 : 4);
    const erg = rund(basis * d, 2);
    return {
      frage: `Berechnen Sie im Kopf: ${zahl(d)} × ${zahl(basis)}`,
      ...mc(r, erg, [rund(basis / d, 2), rund(basis * d * 10, 2), erg + 1, rund(erg / 10, 2)], zahl),
      schritte: [`${zahl(d)} = ${d === 0.25 ? "¼" : d === 0.5 ? "½" : d === 0.2 ? "⅕" : d === 0.75 ? "¾" : d === 0.125 ? "⅛" : d === 1.5 ? "1½" : "2½"}`, `${zahl(basis)} × ${zahl(d)} = <b>${zahl(erg)}</b>`],
      schema: ["Dezimalzahl als Bruch denken (0,25 = ¼, 0,125 = ⅛)", "Durch den Nenner teilen, mit dem Zähler malnehmen"],
    };
  }
  if (art === "ueberschlag") {
    const a = r.int(2, 9) * 100 + r.pick([-3, -2, -1, 1, 2, 3]), b = r.int(11, 49);
    const E = a * b, ord = 10 ** (Math.floor(Math.log10(E)) - 1), st = 2 * ord;
    const basis = Math.round(E / st) * st;
    if (Math.abs(E - basis) >= ord * 0.8) return kopfrechnen(r, stufe);
    return {
      frage: `Schätzen Sie ohne genaue Rechnung: Welcher Wert liegt am nächsten an ${zahl(a)} × ${zahl(b)}?`,
      ...mc(r, basis, [basis + st, basis - st, basis + 2 * st, basis * 10], zahl),
      schritte: [`Runden: ${zahl(a)} ≈ ${zahl(Math.round(a / 100) * 100)}`, `${zahl(Math.round(a / 100) * 100)} × ${b} = ${zahl(Math.round(a / 100) * 100 * b)}`, `Genau wären es ${zahl(E)} → am nächsten: <b>${zahl(basis)}</b>`],
      schema: ["Auf glatte Zahlen runden", "Im Kopf multiplizieren", "Größenordnung prüfen (Anzahl der Stellen)"],
    };
  }
  if (art === "division") {
    const d = r.pick([0.5, 0.25, 0.2, 0.05, 1.5, 0.4]), erg = r.int(4, 60) * (d === 1.5 ? 2 : d === 0.4 ? 5 : 1), a = rund(erg * d, 2);
    return {
      frage: `Berechnen Sie im Kopf: ${zahl(a)} ÷ ${zahl(d)}`,
      ...mc(r, erg, [rund(a * d, 3), rund(erg / 10, 2), erg * 10, erg + 2], zahl),
      schritte: [`Komma in beiden Zahlen verschieben: ${zahl(a)} ÷ ${zahl(d)} = ${zahl(rund(a * 100, 0))} ÷ ${zahl(rund(d * 100, 0))}`, `= <b>${zahl(erg)}</b>`, `Merke: Teilen durch eine Zahl kleiner 1 macht das Ergebnis größer.`],
      schema: ["Kommas gleich weit verschieben, bis der Teiler ganz ist", "Normal teilen", "Plausibilität: ÷ 0,5 = × 2"],
    };
  }
  const [a, b] = r.pick([[[3, 4], [2, 3]], [[2, 5], [3, 4]], [[5, 6], [3, 5]], [[3, 8], [2, 3]], [[4, 5], [5, 8]]]);
  const nenner = a[1] * b[1], G = nenner * r.int(2, 12), erg = (G * a[0] * b[0]) / nenner;
  return {
    frage: `Wie viel sind ${bruch(a)} von ${bruch(b)} von ${zahl(G)}?`,
    ...mc(r, erg, [(G * b[0]) / b[1], (G * a[0]) / a[1], rund((G * (a[0] / a[1] + b[0] / b[1])) / 2, 2), erg * 2], zahl),
    schritte: [`${bruchText(b)} von ${zahl(G)} = ${zahl(G)} ÷ ${b[1]} × ${b[0]} = ${zahl((G * b[0]) / b[1])}`, `${bruchText(a)} davon = ${zahl((G * b[0]) / b[1])} ÷ ${a[1]} × ${a[0]} = <b>${zahl(erg)}</b>`],
    schema: ["„von“ heißt mal", "Von innen nach außen rechnen", "Erst teilen, dann malnehmen (bleibt ganzzahlig)"],
  };
}

// ============================ Ableitungen ============================
const HOCH = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const hoch = (n) => String(n).split("").map((c) => HOCH[c]).join("");
const term = (k, e, v = "x") => {
  if (k === 0) return "";
  const kk = Math.abs(k) === 1 && e > 0 ? (k < 0 ? "−" : "") : zahl(k);
  return e === 0 ? zahl(k) : e === 1 ? `${kk}${v}` : `${kk}${v}${hoch(e)}`;
};
/** polynomial from [[coef, exp], …] as text with proper signs */
const poly = (terme, v = "x") => {
  const t = terme.filter(([k]) => k !== 0);
  if (!t.length) return "0";
  return t.map(([k, e], i) => (i === 0 ? term(k, e, v) : `${k < 0 ? " − " : " + "}${term(Math.abs(k), e, v)}`)).join("");
};

const ABL_SCHEMA = ["Potenzregel: (xⁿ)′ = n·xⁿ⁻¹, Konstanten fallen weg", "Kettenregel: äußere Ableitung × innere Ableitung", "Produktregel: (u·v)′ = u′·v + u·v′", "„Geschwindigkeit/Änderungsrate“ = Ableitung, „Bestand aus Rate“ = Stammfunktion"];

export function ableitung(r, stufe) {
  if (stufe === 1) {
    const n = r.int(3, 5), a = r.int(1, 6) * (r.chance(0.3) ? -1 : 1), b = r.int(1, 9) * (r.chance(0.4) ? -1 : 1), c = r.int(1, 12) * (r.chance(0.5) ? -1 : 1), d = r.int(2, 40);
    const f = poly([[a, n], [b, 2], [c, 1], [d, 0]]);
    const richtig = poly([[a * n, n - 1], [2 * b, 1], [c, 0]]);
    const falsch = [poly([[a * n, n], [2 * b, 2], [c, 1]]), poly([[a * n, n - 1], [2 * b, 1], [c, 0], [d, 0]]), poly([[a, n - 1], [b, 1], [c, 0]]), poly([[a * n, n - 1], [b, 1], [c, 0]])];
    return {
      frage: `Bilden Sie die erste Ableitung von f(x) = ${f}.`,
      ...mcText(r, `f′(x) = ${richtig}`, falsch.map((s) => `f′(x) = ${s}`).filter((s) => s !== `f′(x) = ${richtig}`).slice(0, 3)),
      schritte: [`${term(a, n)} → ${n} × ${zahl(a)} x${hoch(n - 1)} = ${term(a * n, n - 1)}`, `${term(b, 2)} → 2 × ${zahl(b)} x = ${term(2 * b, 1)}`, `${term(c, 1)} → ${zahl(c)}`, `${d} → 0 (Konstante fällt weg)`, `<b>f′(x) = ${richtig}</b>`],
      schema: ABL_SCHEMA,
    };
  }
  if (stufe === 2) {
    const a = r.pick([1, 1, 2, 3]), b = r.int(2, 6), c = r.int(1, 9) * (r.chance(0.6) ? -1 : 1), m = r.int(2, 4), d = r.pick([100, 200, 300, 500, 700, 800]);
    const kontext = r.pick([["b(t)", "den Bestand einer Bakterienkultur in Abhängigkeit von der Zeit t in Stunden", "die Wachstumsgeschwindigkeit der Kultur"], ["K(t)", "die Kosten eines Projekts in Tausend € nach t Monaten", "die momentane Kostenänderung"], ["s(t)", "den zurückgelegten Weg eines Fahrzeugs nach t Sekunden", "die Geschwindigkeit des Fahrzeugs"]]);
    const name = kontext[0][0], innen = poly([[b, 2], [c, 0]], "t");
    const vor = (k) => (k === 1 ? "" : zahl(k));
    const f = `${vor(a)}(${innen})${hoch(m)} + ${d}`;
    const K = a * m * 2 * b;
    const exp = (e) => (e === 1 ? "" : hoch(e));
    const richtig = `${name}′(t) = ${zahl(K)}t(${innen})${exp(m - 1)}`;
    const falsch = [`${name}′(t) = ${vor(a * m)}(${innen})${exp(m - 1)}`, `${name}′(t) = ${vor(a * m)}(${innen})${exp(m)}`, `${name.toUpperCase()}(t) = ${a === 1 ? "" : zahl(a) + "·"}<sup>1</sup>⁄<sub>${m + 1}</sub>(${innen})${hoch(m + 1)} + ${d}t`, `${name}′(t) = ${zahl(K)}t(${innen})${exp(m)}`];
    return {
      frage: `Die Funktion ${kontext[0]} = ${f} beschreibt ${kontext[1]}. Gesucht ist die Funktion, die ${kontext[2]} angibt.`,
      ...mcText(r, richtig, r.shuffle(falsch).slice(0, 3)),
      schritte: [`Gesucht ist die Änderungsrate → <b>Ableitung</b> (nicht die Stammfunktion)`, `Äußere Ableitung: ${vor(a)}${a === 1 ? "" : " · "}${m}(${innen})${exp(m - 1)}`, `Innere Ableitung: (${innen})′ = ${zahl(2 * b)}t`, `Zusammen: ${a === 1 ? "" : zahl(a) + " · "}${m} · ${zahl(2 * b)}t · (${innen})${exp(m - 1)} = <b>${zahl(K)}t(${innen})${exp(m - 1)}</b>`, `Die Konstante +${d} fällt weg.`],
      schema: ABL_SCHEMA,
    };
  }
  const a = r.int(1, 4), b = r.int(1, 5) * (r.chance(0.5) ? -1 : 1), c = r.pick([2, 3, -1, -2]);
  const ex = `e${c === 1 ? "ˣ" : c === -1 ? "⁻ˣ" : (c < 0 ? "⁻" : "") + hoch(Math.abs(c)) + "ˣ"}`;
  const lin = (k, k0) => `(${poly([[k, 1], [k0, 0]])})`;
  const richtig = `f′(x) = ${lin(a * c, a + b * c)}·${ex}`;
  const falsch = [`f′(x) = ${zahl(a * c)}·${ex}`, `f′(x) = ${lin(a * c, b * c)}·${ex}`, `f′(x) = ${zahl(a)}·${ex}`, `f′(x) = ${lin(a, a + b)}·${ex}`];
  if (a + b * c === 0) return ableitung(r, stufe);
  return {
    frage: `Bilden Sie die erste Ableitung von f(x) = ${lin(a, b)}·${ex}.`,
    ...mcText(r, richtig, falsch.filter((s) => s !== richtig).slice(0, 3)),
    schritte: [`Produktregel mit u = ${poly([[a, 1], [b, 0]])} und v = ${ex}`, `u′ = ${zahl(a)}, v′ = ${zahl(c)}·${ex} (Kettenregel)`, `f′ = u′v + uv′ = ${zahl(a)}·${ex} + ${lin(a, b)}·${zahl(c)}·${ex}`, `e-Funktion ausklammern: (${zahl(a)} + ${zahl(c)}·${lin(a, b)})·${ex} = <b>${lin(a * c, a + b * c)}·${ex}</b>`],
    schema: ABL_SCHEMA,
  };
}

// ============================ Ableitungsgraph ============================
const polyWert = (k, x) => k.reduce((s, c, i) => s + c * x ** i, 0); // k[i] = coefficient of x^i
const mulPoly = (p, q) => { const e = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { e[i + j] += a * b; })); return e; };
const abl = (k) => k.slice(1).map((c, i) => c * (i + 1));
const stamm = (k) => [0, ...k.map((c, i) => c / (i + 1))];

function ticks(min, max, n = 4) {
  const roh = (max - min) / n, p = 10 ** Math.floor(Math.log10(roh)), s = [1, 2, 5, 10].map((m) => m * p).find((m) => m >= roh) || 10 * p;
  const out = [];
  for (let v = Math.ceil(min / s) * s; v <= max + 1e-9; v += s) out.push(rund(v, 6));
  return out;
}

export function plotSvg(k, { b = 230, h = 150, klein = false } = {}) {
  const xs = Array.from({ length: 121 }, (_, i) => -6 + i * 0.1), ys = xs.map((x) => polyWert(k, x));
  let mn = Math.min(...ys), mx = Math.max(...ys);
  if (mx - mn < 1e-6) { mn -= 1; mx += 1; }
  const pad = (mx - mn) * 0.08; mn -= pad; mx += pad;
  const l = klein ? 26 : 34, u = klein ? 16 : 20, o = 6, rr = 6;
  const X = (x) => l + ((x + 6) / 12) * (b - l - rr), Y = (y) => o + ((mx - y) / (mx - mn)) * (h - o - u);
  const fs = klein ? 8 : 10;
  const yt = ticks(mn, mx, klein ? 3 : 4);
  return `<svg class="tt-plot${klein ? " klein" : ""}" viewBox="0 0 ${b} ${h}" aria-hidden="true">
    <rect x="${l}" y="${o}" width="${b - l - rr}" height="${h - o - u}" class="rahmen"/>
    ${mn < 0 && mx > 0 ? `<line x1="${l}" x2="${b - rr}" y1="${Y(0)}" y2="${Y(0)}" class="xachse"/>` : ""}
    ${[-6, -4, -2, 0, 2, 4, 6].map((t) => `<text x="${X(t)}" y="${h - u + fs + 3}" font-size="${fs}" class="tick" text-anchor="middle">${t < 0 ? "−" + -t : t}</text>`).join("")}
    ${yt.map((t) => `<text x="${l - 3}" y="${Y(t) + fs / 3}" font-size="${fs}" class="tick" text-anchor="end">${zahl(t)}</text>`).join("")}
    <path d="${xs.map((x, i) => `${i ? "L" : "M"}${X(x).toFixed(1)} ${Y(ys[i]).toFixed(1)}`).join("")}" class="kurve"/>
  </svg>`;
}

export function ableitungsgraph(r, stufe) {
  let nst;
  do {
    nst = stufe === 1 ? r.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 2) : r.shuffle([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 3);
    nst.sort((a, b) => a - b);
  } while (nst.some((v, i) => i && v - nst[i - 1] < 2));
  const s = r.chance(0.5) ? 1 : -1;
  let fs = [s * 0.2];
  nst.forEach((n0) => { fs = mulPoly(fs, [-n0, 1]); });
  const f = stamm(fs), f2 = abl(fs);
  const neg = (k) => k.map((c) => -c);
  const kandidaten = [{ k: fs, t: "f′ (richtig)" }, { k: neg(fs), t: "−f′ (Vorzeichen vertauscht)" }, { k: f2, t: "f″ (zweite Ableitung)" }];
  if (stufe === 3) {
    // f' shifted by 1 → zero points do not match the extrema
    const versch = nst.map((n0) => n0 + 1);
    let g = [s * 0.2];
    versch.forEach((n0) => { g = mulPoly(g, [-n0, 1]); });
    kandidaten.push({ k: g, t: "verschoben (Nullstellen passen nicht)" });
  } else kandidaten.push({ k: neg(f2), t: "−f″" });
  const reihenfolge = r.shuffle([0, 1, 2, 3]);
  const vorzeichen = (x) => (polyWert(fs, x) > 0 ? "steigt" : "fällt");
  const grenzen = [-6, ...nst, 6];
  const abschnitte = grenzen.slice(1).map((g, i) => { const m = (g + grenzen[i]) / 2; return `${i === 0 ? "links von " + zahl(nst[0]) : i === grenzen.length - 2 ? "rechts von " + zahl(nst[nst.length - 1]) : "zwischen " + zahl(grenzen[i]) + " und " + zahl(g)}: f ${vorzeichen(m)} → f′ ${polyWert(fs, m) > 0 ? "positiv (über der x-Achse)" : "negativ (unter der x-Achse)"}`; });
  return {
    frage: "Welcher Ableitungsgraph gehört zu dem gegebenen Graphen von f?",
    bild: plotSvg(f),
    optionen: reihenfolge.map((i) => plotSvg(kandidaten[i].k, { b: 170, h: 112, klein: true })),
    optionenRoh: true,
    richtig: reihenfolge.indexOf(0),
    schritte: [
      `f hat waagerechte Tangenten (Hoch-/Tiefpunkte) bei x = ${nst.map(zahl).join(", x = ")} → dort muss f′ <b>Nullstellen</b> haben.`,
      ...abschnitte,
      `Nur ein Graph hat genau diese Nullstellen und Vorzeichen.`,
      `Die anderen: ${reihenfolge.filter((i) => i !== 0).map((i) => kandidaten[i].t).join(" · ")}`,
    ],
    schema: ["Extrempunkte von f suchen → Nullstellen von f′", "f steigt → f′ über der x-Achse, f fällt → f′ darunter", "Wendepunkte von f → Extrempunkte von f′", "Grad: Ableitung ist eine Stufe niedriger (Parabel → Gerade, Kubik → Parabel)"],
  };
}
