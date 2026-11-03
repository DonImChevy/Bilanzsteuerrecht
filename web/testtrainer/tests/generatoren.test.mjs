// Generator tests: many seeds per type and level. Checks that solutions are consistent,
// options are distinct, and no broken values (NaN, undefined, Infinity) reach the user.
import { test } from "node:test";
import assert from "node:assert/strict";
import { TYPEN, TYP_IDS, erzeuge, EINSTIEG_ANZAHL } from "../js/typen.js";
import { rng, zahl, euro, mc } from "../js/zufall.js";
import { auswerten } from "../js/vg.js";
import { SAETZE, SATZBAU, LUECKENTEXTE, TEXTSETS } from "../js/englisch.js";

const SEEDS = 400;
const kaputt = /NaN|undefined|Infinity|\[object Object\]|null/;
const sichtbar = (a) => [a.frage, a.text, a.aussage, a.satz, a.lesetext, a.tabelle, a.bild, ...(a.reihe || []), ...(a.optionen || []), ...(a.schritte || []), ...(a.texte || [])].filter(Boolean).join(" | ");

for (const typ of TYP_IDS) {
  test(`Typ ${typ}: ${SEEDS} Seeds je Stufe ohne Fehler`, () => {
    for (const stufe of TYPEN[typ].stufenlos ? [2] : [1, 2, 3]) {
      for (let s = 1; s <= SEEDS; s++) {
        const a = erzeuge(typ, s * 7919 + stufe, stufe);
        const n = a.optionen.length;
        assert.ok(n >= 2, `${typ}/${stufe}/${s}: zu wenige Optionen`);
        if (!a.vg && !a.logik) assert.equal(n, 4, `${typ}/${stufe}/${s}: ${n} Optionen`);
        assert.ok(Number.isInteger(a.richtig) && a.richtig >= 0 && a.richtig < n, `${typ}/${stufe}/${s}: Index ${a.richtig}`);
        assert.equal(new Set(a.optionen).size, n, `${typ}/${stufe}/${s}: doppelte Optionen ${JSON.stringify(a.optionen)}`);
        assert.ok(a.schritte?.length, `${typ}: Lösungsweg fehlt`);
        assert.ok(a.schema?.length, `${typ}: Schema fehlt`);
        assert.doesNotMatch(sichtbar(a), kaputt, `${typ}/${stufe}/${s}: kaputter Wert`);
      }
    }
  });
}

test("Gleicher Seed → gleiche Aufgabe (reproduzierbar)", () => {
  for (const typ of TYP_IDS) {
    const a = erzeuge(typ, 4242, 2), b = erzeuge(typ, 4242, 2);
    assert.deepEqual(a.optionen, b.optionen);
    assert.equal(a.richtig, b.richtig);
  }
});

test("Verarbeitungsgeschwindigkeit: Antwort passt zu den Werten der Legende", () => {
  for (let s = 1; s <= 2000; s++) {
    const st = (s % 3) + 1, a = erzeuge("vg", s, st);
    const wert = Object.fromEntries(a.legende);
    const l = auswerten(a.links, wert), r = auswerten(a.rechts, wert);
    assert.notEqual(l, r);
    assert.deepEqual(a.werte, [l, r]);
    const linksRichtig = a.frageArt === "groesser" ? l > r : l < r;
    assert.equal(a.richtig, linksRichtig ? 0 : 1);
    assert.equal(a.legende.length, 9);
    assert.deepEqual(a.legende.map((x) => x[1]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
  assert.equal(auswerten(["a", "+", "b", "×", "c"], { a: 2, b: 3, c: 4 }), 14, "Punkt vor Strich");
  assert.equal(auswerten(["a", "−", "b", "−", "c"], { a: 9, b: 3, c: 4 }), 2, "von links nach rechts");
});

test("Schlussfolgern: alle drei Antworten kommen vor und die Lösung ist begründet", () => {
  const z = { 0: 0, 1: 0, 2: 0 };
  for (let s = 1; s <= 900; s++) {
    const a = erzeuge("logik", s, (s % 3) + 1);
    z[a.richtig]++;
    assert.match(a.aussage, /Also gilt:/);
    assert.ok(a.schritte.some((x) => /richtig|falsch|unbestimmt/.test(x)));
  }
  for (const k of [0, 1, 2]) assert.ok(z[k] > 150, `Antwort ${k} zu selten: ${JSON.stringify(z)}`);
});

test("Zahlen glatt: Euro-Beträge höchstens zwei Nachkommastellen", () => {
  for (const typ of ["z-prozent", "z-zins", "z-dreisatz", "z-tabelle"]) {
    for (let s = 1; s <= 300; s++) {
      const a = erzeuge(typ, s, (s % 3) + 1);
      for (const o of a.optionen) assert.doesNotMatch(o, /,\d{3}\s*€/, `${typ}/${s}: ${o}`);
    }
  }
});

test("Einstiegstest: feste Lösungen", () => {
  const erwartet = ["127", "11", "100 €", "15 Tage", "5.408 €", "15 %", "20 l", "2 Stunden"];
  for (let i = 0; i < EINSTIEG_ANZAHL; i++) {
    const a = erzeuge("einstieg", i);
    assert.equal(a.optionen[a.richtig], erwartet[i]);
    assert.equal(new Set(a.optionen).size, 4);
  }
});

test("Englisch: Aufgabenbanken eindeutig und vollständig", () => {
  for (const s of SAETZE) { assert.equal(s.length, 6); assert.match(s[0], /___/); assert.equal(new Set(s.slice(1, 5)).size, 4); }
  for (const s of SATZBAU) { assert.equal(s.o.length, 4); assert.equal(new Set(s.o).size, 4); assert.ok(s.e); }
  for (const t of LUECKENTEXTE) {
    assert.equal(t.luecken.length, 5);
    for (let i = 1; i <= 5; i++) assert.ok(t.text.includes(`{${i}}`), `${t.titel}: Lücke ${i}`);
    for (const l of t.luecken) assert.equal(new Set(l.slice(0, 4)).size, 4);
  }
  for (const s of TEXTSETS) { assert.equal(s.texte.length, 4); for (const [, nr] of s.aussagen) assert.ok(nr >= 1 && nr <= 4); }
});

test("Hilfsfunktionen", () => {
  assert.equal(zahl(1234.5), "1.234,5");
  assert.equal(zahl(-3), "−3");
  assert.equal(euro(237.5), "237,50 €");
  assert.equal(euro(5408), "5.408 €");
  const r = rng(1);
  const m = mc(r, 10, [10, 12, 12, 8]);
  assert.equal(m.optionen.length, 4);
  assert.equal(new Set(m.optionen).size, 4);
  assert.equal(m.optionen[m.richtig], "10");
});
