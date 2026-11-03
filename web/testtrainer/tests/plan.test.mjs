// Plan and progress logic (pure functions, no browser needed).
import { test } from "node:test";
import assert from "node:assert/strict";
import { phase, tagesplan, tageBisTest } from "../js/plan.js";
import * as S from "../js/speicher.js";
import { erzeuge } from "../js/typen.js";

test("Phasen bis zum Präsenztest", () => {
  assert.equal(phase("2026-11-03").id, "verstehen");
  assert.equal(phase("2026-11-09").id, "verstehen");
  assert.equal(phase("2026-11-10").id, "tempo");
  assert.equal(phase("2026-11-17").id, "simulation");
  assert.equal(phase("2026-11-22").id, "final");
  assert.equal(phase("2026-11-23").id, "test");
  assert.equal(phase("2026-11-24").id, "danach");
  assert.equal(tageBisTest("2026-11-03"), 20);
});

test("Tagesplan: Schwerpunkte täglich, Wechselbereich nach Wochentag", () => {
  const di = tagesplan("2026-11-03").map((x) => x.id);
  assert.deepEqual(di.slice(0, 2), ["sprint", "e-fokus"]);
  assert.ok(di.includes("w-zahlen"), "Dienstag = Zahlen");
  assert.ok(tagesplan("2026-11-02").some((x) => x.id === "w-logik"), "Montag = Schlussfolgern");
  assert.ok(tagesplan("2026-11-08").some((x) => x.id === "w-sim"), "Sonntag = Simulation");
  assert.equal(tagesplan("2026-11-12")[1].start.modus, "tempo");
  assert.ok(tagesplan("2026-11-18", { fehler: 3 }).some((x) => x.id === "fehler"));
  assert.equal(tagesplan("2026-11-23").length, 1);
  assert.match(tagesplan("2026-11-03", { schwach: ["z-zins"] }).at(-1).text, /Zinsrechnung/);
});

test("Erfassen, Fehlerprotokoll und Lernkartei auf Typ-Ebene", () => {
  S.zuruecksetzen();
  const a = erzeuge("z-prozent", 12345, 2);
  const tag1 = new Date("2026-11-03T10:00:00");
  assert.equal(S.erfassen(a, (a.richtig + 1) % 4, 20000, tag1), false);
  assert.equal(S.offeneFehler().length, 1);
  assert.equal(S.stat.boxen["z-prozent"].fach, 1);
  assert.equal(S.stat.boxen["z-prozent"].faellig, "2026-11-04");
  // correct and fast on a later day → next box
  assert.equal(S.erfassen(a, a.richtig, 20000, new Date("2026-11-04T10:00:00")), true);
  assert.equal(S.stat.boxen["z-prozent"].fach, 2);
  // too slow counts like an error
  S.erfassen(a, a.richtig, 999000, new Date("2026-11-05T10:00:00"));
  assert.equal(S.stat.boxen["z-prozent"].fach, 1);
  S.fehlerErledigt(a);
  assert.equal(S.offeneFehler().length, 0);
  assert.equal(S.stat.typen["z-prozent"].n, 3);
});

test("Export und Import", () => {
  const text = S.exportText();
  S.zuruecksetzen();
  S.importText(text);
  assert.equal(S.stat.typen["z-prozent"].n, 3);
  assert.throws(() => S.importText("{kaputt"));
});
