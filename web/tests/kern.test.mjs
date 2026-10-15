// Ausführen: node --test web/tests
import test from "node:test";
import assert from "node:assert/strict";
import * as G from "../js/geld.js";
import { Zufall, pruefeBuchung, bewerte, satz, summe, THEMEN, loesungText } from "../js/kern.js";
import { ALLE, fragen, klausur, vorlagenFuer } from "../js/katalog.js";
import { LERNKARTEN } from "../js/lernkarten.js";
import { KONTEN } from "../js/konten.js";

test("Geld lesen", () => {
  assert.equal(G.lesen("1.234,56"), 123456);
  assert.equal(G.lesen("1234,56"), 123456);
  assert.equal(G.lesen("1234.56"), 123456);
  assert.equal(G.lesen("1.000"), 100000);
  assert.equal(G.lesen("12.500.000"), 1250000000);
  assert.equal(G.lesen("-500"), -50000);
  assert.equal(G.lesen("−500"), -50000);
  assert.equal(G.lesen("1.190 €"), 119000);
  assert.equal(G.lesen(" 25 % "), 2500);
  assert.equal(G.lesen("0,5"), 50);
  assert.equal(G.lesen(",5"), 50);
  assert.equal(G.lesen("41,666"), 4167);
  assert.equal(G.lesen(""), null);
  assert.equal(G.lesen("abc"), null);
  assert.equal(G.lesen("1-2"), null);
});

test("Geld formatieren", () => {
  assert.equal(G.text(123450), "1.234,50");
  assert.equal(G.euro(120000), "1.200 €");
  assert.equal(G.euro(4167), "41,67 €");
  assert.equal(G.prozentText(2500), "25 %");
  assert.equal(G.prozentText(4444), "44,44 %");
  assert.equal(G.prozent(9500, 3), 285);
});

const loesung = satz([["wareneingang", 100000], ["vorsteuer", 19000]], [["verbindlichkeitenLuL", 119000]]);
const z = (id, seite, konto, betrag) => ({ id, seite, konto, betrag });

test("Prüfer: Reihenfolge egal, gleiche Konten addiert", () => {
  assert.ok(pruefeBuchung([z(1, "haben", "verbindlichkeitenLuL", "1.190,00"), z(2, "soll", "vorsteuer", "190"), z(3, "soll", "wareneingang", "1000")], [loesung]).korrekt);
  assert.ok(pruefeBuchung([z(1, "soll", "wareneingang", "600"), z(2, "soll", "wareneingang", "400"), z(3, "soll", "vorsteuer", "190"), z(4, "haben", "verbindlichkeitenLuL", "1190")], [loesung]).korrekt);
});

test("Prüfer: Fehler erkennen", () => {
  const b = pruefeBuchung([z(1, "soll", "wareneingang", "1190"), z(2, "haben", "verbindlichkeitenLuL", "1190")], [loesung]);
  assert.equal(b.korrekt, false);
  assert.equal(b.status[1], "betrag");
  assert.deepEqual(b.fehlend.map((f) => f[1]), ["vorsteuer"]);
  assert.equal(pruefeBuchung([z(1, "haben", "wareneingang", "1000")], [loesung]).status[1], "konto");
  assert.equal(pruefeBuchung([], [loesung]).korrekt, false);
  assert.equal(pruefeBuchung([z(1, "soll", null, "")], [loesung]).korrekt, false);
});

test("Eindeutige IDs, gültige Konten, genug Aufgaben je Thema", () => {
  const ids = ALLE.map((v) => v.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(LERNKARTEN.map((k) => k.id)).size, LERNKARTEN.length);
  for (const t of THEMEN) assert.ok(vorlagenFuer(t.id).length >= 3, t.id);
  for (const k of LERNKARTEN) assert.ok(THEMEN.some((t) => t.id === k.thema), k.id);
});

test("Alle Vorlagen erzeugen lösbare Aufgaben", () => {
  for (const v of ALLE) {
    for (let seed = 0; seed < 300; seed++) {
      const f = v.erzeugen(new Zufall(seed));
      const ctx = `${v.id} seed ${seed}`;
      assert.equal(f.thema, v.thema, ctx);
      assert.ok(f.text && f.erklaerung, ctx);
      if (f.typ === "buchung") {
        for (const l of f.loesungen) {
          assert.equal(summe(l.soll), summe(l.haben), "Soll ≠ Haben: " + ctx);
          assert.ok(l.soll.length && l.haben.length, ctx);
          for (const [k, c] of [...l.soll, ...l.haben]) {
            assert.ok(KONTEN[k], ctx);
            assert.ok(Number.isInteger(c) && c > 0, "Betrag ungültig: " + ctx);
          }
          const zeilen = [...l.soll.map(([k, c], i) => z("s" + i, "soll", k, G.text(c))), ...l.haben.map(([k, c], i) => z("h" + i, "haben", k, G.text(c)))];
          assert.ok(bewerte(f, { zeilen }).korrekt, "Musterlösung nicht akzeptiert: " + ctx);
        }
        assert.equal(bewerte(f, { zeilen: [] }).korrekt, false, ctx);
      } else if (f.typ === "auswahl") {
        assert.ok(f.optionen.length >= 2 && f.richtig.length >= 1, ctx);
        assert.ok(f.richtig.every((i) => i >= 0 && i < f.optionen.length), ctx);
        assert.equal(new Set(f.optionen).size, f.optionen.length, ctx);
        assert.ok(bewerte(f, { gewaehlt: f.richtig }).korrekt, ctx);
        const falsch = f.optionen.map((_, i) => i).filter((i) => !f.richtig.includes(i));
        if (falsch.length) assert.equal(bewerte(f, { gewaehlt: falsch }).korrekt, false, ctx);
      } else {
        assert.ok(Number.isInteger(f.loesung), ctx);
        assert.ok(bewerte(f, { text: G.text(f.loesung) }).korrekt, "Lösung nicht akzeptiert: " + ctx + " " + loesungText(f));
        assert.equal(bewerte(f, { text: G.text(f.loesung + 100) }).korrekt, false, ctx);
      }
    }
  }
});

test("Klausur und Übung", () => {
  const k = klausur(20, new Zufall(42));
  assert.equal(k.length, 20);
  assert.ok(k.filter((f) => f.typ === "buchung").length >= 12);
  const n = vorlagenFuer("buchfuehrungspflicht").length;
  assert.equal(new Set(fragen(["buchfuehrungspflicht"], n, new Zufall(7)).map((f) => f.id)).size, n);
});
