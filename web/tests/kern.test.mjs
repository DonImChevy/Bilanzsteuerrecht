// Ausführen: node --test web/tests
import test from "node:test";
import assert from "node:assert/strict";
import * as G from "../js/geld.js";
import { Zufall, pruefeBuchung, bewerte, satz, summe, THEMEN, THEMA, loesungText } from "../js/kern.js";
import { ALLE, fragen, klausur, vorlagenFuer, LERNKARTEN, kartenFuer } from "../js/katalog.js";
import { norm } from "../js/oer/normtext.js";
import { NORMEN } from "../js/oer/normen.js";
import { KONTEN } from "../js/konten.js";
import { MC, alsMultipleChoice } from "../js/oer/mc.js";

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
      assert.ok(f.text && (f.erklaerung || f.typ === "offen"), ctx);
      for (const ref of f.normen || []) assert.ok(norm(ref), `Normverweis nicht auflösbar: ${ref} in ${ctx}`);
      if (f.grafik) assert.ok(!/undefined|NaN/.test(f.grafik), "Grafik fehlerhaft: " + ctx);
      assert.ok(!/undefined|NaN/.test(f.text + (f.erklaerung || "")), "Text fehlerhaft: " + ctx);
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
      } else if (f.typ === "offen") {
        assert.ok(f.antwort && f.antwort.length > 20, "Musterantwort fehlt: " + ctx);
        assert.equal(bewerte(f, { text: "" }).korrekt, null, ctx);
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
  assert.ok(k.filter((f) => f.typ === "buchung").length >= 8);
  // Bilanzrecht Teil I / Teil II: Klausur nur aus dem gewählten Skriptteil, „beide“ wie die Semesterklausur (ca. 25 % Teil I)
  const teilVon = (f) => THEMA[f.thema].teil;
  const k1 = klausur(20, new Zufall(42), "bsr", false, "1"), k2 = klausur(20, new Zufall(42), "bsr", false, "2");
  assert.ok(k1.every((f) => teilVon(f) === 1) && k1.filter((f) => f.typ === "buchung").length >= 12);
  assert.ok(k2.every((f) => teilVon(f) === 2) && k2.length === 20);
  assert.equal(k.filter((f) => teilVon(f) === 1).length, 5);
  const n = vorlagenFuer("buchfuehrungspflicht").length;
  assert.equal(new Set(fragen(["buchfuehrungspflicht"], n, new Zufall(7)).map((f) => f.id)).size, n);
});

test("Öffentliches Recht: Struktur", () => {
  const oer = ALLE.filter((v) => v.thema.startsWith("oer-"));
  const ue = oer.filter((v) => v.kategorie === "uebertragung");
  assert.ok(oer.length >= 120, "ÖR-Aufgaben: " + oer.length);
  assert.ok(ue.length >= 15, "Übertragungsaufgaben: " + ue.length);
  const k = klausur(20, new Zufall(5), "oer");
  assert.equal(k.length, 20);
  assert.equal(k.filter((f) => f.uebertragung).length, 5);
  assert.ok(k.every((f) => f.thema.startsWith("oer-")));
  assert.ok(klausur(20, new Zufall(5), "bsr").every((f) => !f.thema.startsWith("oer-")));
  assert.ok(kartenFuer("oer").length >= 80);
  assert.ok(NORMEN.length >= 80);
});

test("Normtext", () => {
  const n = norm("GG 51 2");
  assert.equal(n.label, "Art. 51 Abs. 2 GG");
  assert.match(n.absaetze[0].text, /mindestens drei Stimmen/);
  assert.equal(norm("BWahlG 12 1").label, "§ 12 Abs. 1 BWahlG");
  assert.equal(norm("GG 999"), null);
  assert.equal(norm("GG 51 9"), null);
  assert.match(norm("GG Präambel").absaetze[0].text, /Nordrhein-Westfalen/);
});

test("Mehrheiten in Übertragungsaufgaben", () => {
  // Kanzlerwahl: Erklärung nennt 316
  for (let seed = 0; seed < 50; seed++) {
    const f = ALLE.find((v) => v.id === "u-kanzlerwahl").erzeugen(new Zufall(seed));
    assert.match(f.erklaerung, /316/);
  }
  const q = ALLE.find((v) => v.id === "u-quorum");
  for (let seed = 0; seed < 100; seed++) {
    const f = q.erzeugen(new Zufall(seed));
    const M = Number((f.text.match(/(\d{3}) Mitglieder/) || [])[1]);
    const erlaubt = [Math.ceil(M / 4), Math.ceil(M / 3), Math.ceil(M / 10), Math.ceil((2 * M) / 3), Math.floor(M / 2) + 1];
    assert.ok(erlaubt.includes(f.loesung / 100), f.text + " → " + f.loesung);
  }
});

test("Multiple-Choice-Fassung für jede ÖR-Frage-Antwort-Aufgabe", () => {
  const offen = ALLE.map((v) => v.erzeugen(new Zufall(1))).filter((f) => f.typ === "offen");
  const ids = new Set(offen.map((f) => f.id));
  for (const id of Object.keys(MC)) assert.ok(ids.has(id), "MC ohne Aufgabe: " + id);
  for (const f of offen) {
    const d = MC[f.id];
    assert.ok(d, "Keine MC-Fassung: " + f.id);
    assert.ok(d.r.length >= 1 && d.f.length >= 3, f.id);
    const alle = [...d.r, ...d.f];
    assert.ok(alle.length >= 5 && alle.length <= 8, f.id + " hat " + alle.length + " Optionen");
    assert.equal(new Set(alle).size, alle.length, "Doppelte Option: " + f.id);
    // Jede Antwort muss für sich verständlich sein (die Reihenfolge wird gemischt)
    for (const t of alle) assert.ok(!/^(Sie|Er|Es|Ihre?|Dafür|Damit|Deshalb|Daher|Dazu|Ausnahme|Auch|Folge|Durch ihn)\b/.test(t) && !/\bdazu\b/.test(t), `${f.id}: „${t}“ bezieht sich auf eine andere Antwort`);
    const m = alsMultipleChoice(f, new Zufall(3));
    assert.equal(m.typ, "auswahl");
    assert.equal(m.richtig.length, d.r.length);
    assert.equal(bewerte(m, { gewaehlt: [...m.richtig] }).korrekt, true, f.id);
    assert.equal(bewerte(m, { gewaehlt: [m.optionen.findIndex((_, i) => !m.richtig.includes(i))] }).korrekt, false, f.id);
    assert.ok(m.antwort && m.normen);
  }
});

test("Wiederholung nach Lernintervallen", async () => {
  const { planen, faellige, naechste, tagPlus, nachholen } = await import("../js/wiederholung.js");
  const t0 = new Date(2026, 9, 19, 15, 30).getTime();
  // Einmaliges Nachholen: nur Fach 2+ aus den letzten 3 Tagen mit Termin nach mehr als 3 Tagen, verteilt auf 3 Tage
  const jetzt = new Date(2026, 10, 1, 10).getTime(), vor = (n) => jetzt - n * 86400000;
  const alt = { a: { fach: 3, faellig: tagPlus(vor(1), 7), t: vor(1) }, b: { fach: 2, faellig: tagPlus(vor(0), 3), t: vor(0) },
    c: { fach: 4, faellig: tagPlus(vor(2), 14), t: vor(2), falsch: true }, d: { fach: 3, faellig: tagPlus(vor(5), 7), t: vor(5) },
    e: { fach: 1, faellig: tagPlus(vor(0), 1), t: vor(0) }, g: { fach: 5, faellig: tagPlus(vor(0), 30), t: vor(0) }, h: { fach: 2, faellig: tagPlus(vor(1), 3), t: vor(1) } };
  const nh = JSON.parse(JSON.stringify(alt));
  assert.equal(nachholen(nh, jetzt), 3);
  assert.deepEqual(["a", "c", "g"].map((id) => [nh[id].fach, nh[id].faellig]), [[1, tagPlus(jetzt, 1)], [1, tagPlus(jetzt, 2)], [1, tagPlus(jetzt, 3)]]);
  assert.ok(nh.c.falsch);
  for (const id of ["b", "d", "e", "h"]) assert.deepEqual(nh[id], alt[id]);
  assert.equal(nachholen(nh, jetzt), 0, "zweiter Lauf ändert nichts");
  let e = planen(undefined, true, t0);
  assert.deepEqual(e, { fach: 1, faellig: tagPlus(t0, 1), t: t0 });
  assert.equal(new Date(e.faellig).getDate(), 20);
  assert.equal(new Date(e.faellig).getHours(), 0);
  // Jeden Tag einmal richtig: ein Fach weiter, Abstände 1 – 3 – 7 – 14 – 30
  const tage = [], tag = (n) => t0 + n * 86400000;
  for (let i = 1; i <= 6; i++) { e = planen(e, true, tag(i)); tage.push(e.fach); }
  assert.deepEqual(tage, [2, 3, 4, 5, 5, 5]);
  assert.equal(e.faellig, tagPlus(tag(6), 30));
  // Mehrfach am selben Tag richtig (gleiche Vorlage in einer Übung): bleibt in Fach 1, morgen wieder
  let m = planen(undefined, true, t0);
  m = planen(m, true, t0 + 60000); m = planen(m, true, t0 + 120000);
  assert.equal(m.fach, 1); assert.equal(m.faellig, tagPlus(t0, 1)); assert.equal(m.t, t0 + 120000);
  assert.deepEqual(planen(e, false, t0), { fach: 1, faellig: tagPlus(t0, 1), t: t0, falsch: true });
  // Fehler und am selben Tag richtig: bleibt Fehler; erst an einem späteren Tag behoben
  const f = planen(planen(e, false, t0), true, t0 + 60000);
  assert.ok(f.falsch && f.fach === 1, "am selben Tag korrigiert → bleibt unter „Meine Fehler“");
  assert.ok(!planen(f, true, tag(1)).falsch, "am nächsten Tag richtig → nicht mehr unter „Meine Fehler“");
  assert.ok(!planen(undefined, true, t0).falsch);
  const lern = { a: { fach: 1, faellig: t0 - 10 }, b: { fach: 2, faellig: t0 - 99 }, c: { fach: 3, faellig: t0 + 5 } };
  assert.deepEqual(faellige(lern, ["a", "b", "c", "d"], t0), ["b", "a"]);
  lern.a.falsch = true;
  assert.deepEqual(faellige(lern, ["a", "b", "c", "d"], t0), ["a", "b"], "Fehler zuerst");
  assert.equal(naechste(lern, ["a", "b", "c"], t0), t0 + 5);
});

test("Lernserie, Wochenverlauf und Module", async () => {
  const { serie, woche, tagSchluessel } = await import("../js/aktivitaet.js");
  const { MODULE, MODUL, aktiveModule } = await import("../js/module.js");
  const { ICON_NAMEN } = await import("../js/icons.js");
  const jetzt = new Date(2026, 9, 20, 9, 0).getTime();
  const tag = (n) => tagSchluessel(new Date(2026, 9, 20 - n, 12).getTime());
  assert.equal(tagSchluessel(jetzt), "2026-10-20");
  assert.equal(serie({}, jetzt), 0);
  assert.equal(serie({ [tag(0)]: 3, [tag(1)]: 5, [tag(2)]: 1 }, jetzt), 3);
  assert.equal(serie({ [tag(1)]: 5, [tag(2)]: 1 }, jetzt), 2, "heute noch nichts gelernt bricht die Serie nicht");
  assert.equal(serie({ [tag(0)]: 1, [tag(2)]: 1 }, jetzt), 1, "Lücke beendet die Serie");
  assert.equal(serie({ [tag(2)]: 4 }, jetzt), 0);
  const w = woche({ [tag(0)]: 7, [tag(6)]: 2 }, jetzt);
  assert.equal(w.length, 7);
  assert.deepEqual([w[0].n, w[6].n, w[6].heute, w[6].kurz], [2, 7, true, "Di"]);
  // Module: aktive haben Themen und Aufgaben, kommende nicht; Icons existieren
  assert.deepEqual(aktiveModule().map((m) => m.id), ["bsr", "oer", "est", "ust", "bbf", "ao", "bewr", "pr"]);
  assert.deepEqual(aktiveModule("studium").map((m) => m.id), ["bsr", "oer", "est", "ust", "ao", "bewr", "pr"]);
  assert.deepEqual(aktiveModule("ausbildung").map((m) => m.id), ["bbf"]);
  assert.ok(MODULE.length === 8 && !MODUL.asv && MODUL.ust.kurz === "USt" && MODUL.bsr.kurz === "BilR" && MODUL.bbf.kurz === "BilBf" && MODUL.pr.kurz === "PrivR");
  for (const m of MODULE) {
    assert.ok(ICON_NAMEN.includes(m.icon), m.id);
    assert.equal(THEMEN.some((t) => t.fach === m.id), !m.bald, m.id);
  }
});

test("Bilanzrecht: Gesetzestexte zu den Aufgaben", async () => {
  const { norm, normenAusText } = await import("../js/oer/normtext.js");
  assert.equal(norm("UStG 17 1").label, "§ 17 Abs. 1 UStG");
  assert.match(norm("UStG 15 1").absaetze[0].text, /Vorsteuerbeträge abziehen/);
  assert.match(norm("UStG 12 2").absaetze[0].text, /Wohn- und Schlafräumen/, "Ergänzungsstrich bleibt erhalten");
  assert.match(norm("UStG 4").absaetze[0].text, /Grunderwerbsteuergesetz[\s\S]*12\. a\) die Vermietung/);
  assert.ok(norm("UStG 4").auszug);
  assert.deepEqual(normenAusText("Ohne Option (§ 9 UStG) ist die Vermietung steuerfrei (§ 4 Nr. 12 UStG)."), ["UStG 9", "UStG 4"]);
  assert.deepEqual(normenAusText("§ 17 I 8 UStG"), ["UStG 17 1"]);
  // Jede BilR-Aufgabe, die das UStG zitiert, hat den Gesetzestext dabei
  for (const v of ALLE) {
    const f = v.erzeugen(new Zufall(1));
    if (!v.thema || f.thema.startsWith("oer-")) continue;
    if (/§[^§]*UStG/.test([f.text, f.erklaerung, f.quelle].join(" "))) assert.ok(f.normen?.some((r) => r.startsWith("UStG")), v.id);
    for (const r of f.normen || []) assert.ok(norm(r), `${v.id}: ${r}`);
  }
  assert.deepEqual(ALLE.find((v) => v.id === "wu-skonto-kunde").erzeugen(new Zufall(2)).normen, ["UStG 17 1"]);
  // HGB, AO, EStG: Überschriften und Inhalte stimmen
  assert.match(norm("AO 141 1").absaetze[0].text, /§ 19 Absatz 2 Satz 1 des Umsatzsteuergesetzes von mehr als 800 000 Euro/);
  assert.match(norm("HGB 241a").absaetze[0].text, /800 000 Euro Umsatzerlöse und jeweils 80 000 Euro Jahresüberschuss/);
  assert.equal(norm("HGB 257").titel, "Aufbewahrung von Unterlagen. Aufbewahrungsfristen");
  assert.match(norm("EStG 4 1").absaetze[0].text, /vermehrt um den Wert der Entnahmen/, "keine Fußnotenziffern im Text");
  assert.equal(norm("EStG 4").titel, "Gewinnbegriff im Allgemeinen");
  const grenzen = ALLE.find((v) => v.id === "bf-141-grenzen").erzeugen(new Zufall(1));
  assert.ok(grenzen.richtig.every((i) => !/Wirtschaftswert/.test(grenzen.optionen[i])), "Wirtschaftswert-Grenze ist weggefallen");
});

test("Hervorhebung: Zitate und Satzgrenzen", async () => {
  const { norm, zitate, saetze } = await import("../js/oer/normtext.js");
  assert.deepEqual(zitate("§ 141 I 1 Nr. 1, 4 AO")[0], { g: "AO", nr: "141", abs: "1", satz: "1", nummern: ["1", "4"] });
  assert.deepEqual(zitate("Art. 21 Abs. 1 Satz 1 GG: …")[0], { g: "GG", nr: "21", abs: "1", satz: "1", nummern: [] });
  assert.deepEqual(zitate("§ 4 Nr. 9a UStG")[0].nummern, ["9a"]);
  assert.deepEqual(zitate("Umsatz 800.000 € (§ 141 AO)"), []);
  const t141 = norm("AO 141 1").absaetze[0].text, s141 = saetze(t141);
  assert.equal(s141.length, 2);
  assert.match(t141.slice(...s141[1]), /^Die §§ 238, 240, 241/);
  const t17 = norm("UStG 17 1").absaetze[0].text;
  assert.match(t17.slice(...saetze(t17)[1]), /^Ebenfalls ist der Vorsteuerabzug/);
  const t21 = norm("GG 21 1").absaetze[0].text;
  assert.equal(t21.slice(...saetze(t21)[0]), "Die Parteien wirken bei der politischen Willensbildung des Volkes mit.");
});

test("Markierungen: jede Fundstelle trifft einen angezeigten Satz bzw. eine Nummer", async () => {
  const { norm, zitate, saetze } = await import("../js/oer/normtext.js");
  const { MARKIERUNG } = await import("../js/markierungen.js");
  for (const [id, z] of Object.entries(MARKIERUNG)) {
    const v = ALLE.find((x) => x.id === id);
    assert.ok(v, "unbekannte Aufgabe " + id);
    const f = v.erzeugen(new Zufall(1));
    for (const zz of zitate(z)) {
      const absaetze = f.normen.filter((r) => r.split(" ")[0] === zz.g && r.split(" ")[1] === zz.nr).flatMap((r) => norm(r).absaetze);
      const a = absaetze.find((x) => (zz.abs ? x.abs === zz.abs : x.abs === "" || absaetze.length === 1));
      assert.ok(a, `${id}: ${zz.g} ${zz.nr} Abs. ${zz.abs} wird nicht angezeigt`);
      if (zz.satz) assert.ok(saetze(a.text).length >= +zz.satz, `${id}: ${zz.g} ${zz.nr} Satz ${zz.satz} fehlt`);
      for (const nr of zz.nummern) assert.ok(new RegExp(`(^|\\n)${nr.replace(/[a-z]$/, "")}\\.\\s`).test(a.text), `${id}: Nr. ${nr} fehlt`);
    }
  }
  const t = norm("GG 56").absaetze[0].text;
  assert.equal(saetze(t).length, 2, "Eidesformel in Anführungszeichen zählt nicht als eigene Sätze");
});

test("ESt: Tarif 2026, Klausurstruktur und Gesamtfälle", async () => {
  const { grundtarif, splitting } = await import("../js/est/tarif.js");
  const werte = { 12348: 0, 12349: 0, 14500: 343, 17799: 1034, 41673: 7744, 52000: 11257, 69878: 18213, 88900: 26202, 200000: 72864, 300000: 115529 };
  for (const [x, st] of Object.entries(werte)) assert.equal(grundtarif(+x), st, "Grundtarif " + x);
  assert.equal(splitting(83346), 15488);
  assert.equal(splitting(96000), 2 * grundtarif(48000));
  const k = klausur(20, new Zufall(7), "est");
  assert.equal(k.length, 20);
  assert.equal(k.filter((f) => f.typ === "zahl").length, 10);
  const fall = (id) => ALLE.find((v) => v.id === id).erzeugen(new Zufall(1)).antwort;
  assert.match(fall("est-fall-ehepaar"), /83\.346 €[\s\S]*15\.488 €[\s\S]*Abschlusszahlung 2\.488 €/);
  assert.match(fall("est-fall-physio"), /96\.100 €[\s\S]*88\.900 €[\s\S]*26\.202 €[\s\S]*Abschlusszahlung: 18\.202 €/);
});

test("Frage-Antwort: automatische Prüfung nach Norm und Stichworten", async () => {
  const { pruefeOffen, pruefdaten, zitierteNummern } = await import("../js/offen.js");
  assert.deepEqual([...zitierteNummern("§§ 8, 9 AO und § 26; Art. 20a GG, Art 51 Abs. 2, nach 38 GG")].sort(), ["20a", "26", "38", "51", "8", "9"]);
  const offen = ALLE.map((v) => v.erzeugen(new Zufall(1))).filter((f) => f.typ === "offen");
  for (const f of offen) {
    assert.ok(pruefdaten(f), "Keine Stichworte: " + f.id);
    assert.equal(pruefeOffen(f, f.antwort).korrekt, true, "Musterantwort scheitert: " + f.id);
    assert.equal(pruefeOffen(f, "Weiß ich leider nicht.").korrekt, false, f.id);
    assert.equal(bewerte(f, { text: "" }).korrekt, null, f.id);
  }
  // Norm fehlt → falsch, auch wenn alle Begriffe stimmen
  const f = offen.find((x) => x.id === "est-unbeschraenkt");
  assert.equal(pruefeOffen(f, f.antwort.replace(/§\s*\d+[a-z]?|Abs\.|AO|EStG/g, "")).korrekt, false);
  assert.equal(pruefeOffen(f, "Unbeschränkt steuerpflichtig nach § 1 Abs. 1 EStG ist jede natürliche Person mit Wohnsitz oder gewöhnlichem Aufenthalt im Inland; besteuert wird das Welteinkommen.").korrekt, true);
});

test("ESt-Punktesammler: Kartei mit Satz und Punktzahl, § 1 BGB im Normen-Tab", async () => {
  const { PUNKTESAMMLER } = await import("../js/est/punkte.js");
  assert.ok(PUNKTESAMMLER.length >= 1);
  for (const p of PUNKTESAMMLER) assert.ok(p.titel && p.satz && p.punkte > 0 && p.punkte <= 60);
  assert.ok(norm("BGB 1"));
});

test("Multiple Choice bei Klausurfällen behält den Sachverhalt", () => {
  const faelle = ALLE.map((v) => v.erzeugen(new Zufall(1))).filter((f) => f.typ === "offen" && f.fall);
  assert.ok(faelle.length >= 14);
  for (const f of faelle) {
    const m = alsMultipleChoice(f, new Zufall(2));
    const sachverhalt = f.text.replace(/\n\nAufgabe:[\s\S]*$/, "");
    assert.ok(m.text.startsWith(sachverhalt) && m.text.length > sachverhalt.length + 10, "Sachverhalt fehlt: " + f.id);
    assert.ok(!/\n\nAufgabe:/.test(m.text), "Arbeitsanweisung doppelt: " + f.id);
  }
});

test("Multiple-Choice-Modus lässt Klausurfälle aus", async () => {
  const { FALL_IDS } = await import("../js/katalog.js");
  assert.ok(FALL_IDS.has("est-fall-physio") && FALL_IDS.has("oer-fall-art102"));
  const themen = THEMEN.filter((t) => t.fach !== "bsr").map((t) => t.id);
  assert.ok(!fragen(themen, 400, new Zufall(5), "qa", true).some((f) => f.fall));
  assert.ok(fragen(themen, 400, new Zufall(5), "qa").some((f) => f.fall));
  for (const fach of ["oer", "est"]) for (let s = 0; s < 20; s++) assert.ok(!klausur(30, new Zufall(s), fach, true).some((f) => f.fall), fach);
});

test("Synchronisierung: zwei Geräte, nichts doppelt, nichts verloren", async () => {
  const S = await import("../js/sync.js");
  const { planen } = await import("../js/wiederholung.js");
  // Ersatz-Server mit Versionsprüfung wie in server/supabase.sql
  const db = {};
  const server = {
    holen: async (c) => (db[c] ? JSON.parse(JSON.stringify(db[c])) : null),
    speichern: async (c, daten, v) => {
      if (v === 0) { if (db[c]) return null; db[c] = { daten, version: 1 }; return 1; }
      if (!db[c] || db[c].version !== v) return null;
      db[c] = { daten, version: v + 1 }; return v + 1;
    },
  };
  const leer = () => ({ proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, zuletzt: null });
  const antwort = (st, thema, id, ok, t) => {
    const z = st.proThema[thema] || { b: 0, r: 0 };
    st.proThema[thema] = { b: z.b + 1, r: z.r + (ok ? 1 : 0) };
    st.tage["2026-10-21"] = (st.tage["2026-10-21"] || 0) + 1;
    st.lern[id] = planen(st.lern[id], ok, t);
  };
  const code = S.neuerCode();
  assert.ok(S.codeGueltig(code) && S.codeGueltig(S.codeNormal(S.codeAnzeige(code).toLowerCase())));
  const sync = async (st, lok) => { const { ergebnis, lokal } = await S.abgleichen(st, lok, server, 1000); return [ergebnis(st), lokal]; };

  // Handy: 10 Antworten, dann Code erstellen
  let handy = leer(), lh = { code, geraet: "HANDY" };
  for (let i = 0; i < 10; i++) antwort(handy, "est-tarif", "a" + i, i % 2 === 0, 100 + i);
  handy.karten = ["k1"];
  [handy, lh] = await sync(handy, lh);
  // iPad hat vorher schon 5 Antworten gesammelt, verbindet sich dann
  let ipad = leer(), li = { code, geraet: "IPAD" };
  for (let i = 0; i < 5; i++) antwort(ipad, "est-tarif", "b" + i, true, 200 + i);
  [ipad, li] = await sync(ipad, li);
  assert.deepEqual(ipad.proThema["est-tarif"], { b: 15, r: 10 });
  assert.equal(ipad.tage["2026-10-21"], 15);
  assert.ok(ipad.karten.includes("k1"));
  // beide lernen offline weiter, a0 auf dem iPad später nochmal (neuer gewinnt)
  antwort(handy, "est-tarif", "a1", true, 300);
  antwort(ipad, "est-tarif", "a0", false, 400);
  handy.klausuren.push({ datum: 500, richtig: 7, offen: 0, gesamt: 10, sek: 60, fach: "est" });
  [handy, lh] = await sync(handy, lh);
  [ipad, li] = await sync(ipad, li);
  [handy, lh] = await sync(handy, lh);
  for (const st of [handy, ipad]) {
    assert.deepEqual(st.proThema["est-tarif"], { b: 17, r: 11 });
    assert.equal(st.tage["2026-10-21"], 17);
    assert.equal(st.klausuren.length, 1);
    assert.equal(st.lern.a0.t, 400);
    assert.equal(st.lern.a1.t, 300);
  }
  // wiederholter Abgleich ohne Änderungen zählt nichts doppelt
  [handy, lh] = await sync(handy, lh); [handy, lh] = await sync(handy, lh);
  assert.deepEqual(handy.proThema["est-tarif"], { b: 17, r: 11 });
  // Antwort während des Abgleichs geht nicht verloren
  const { ergebnis, lokal } = await S.abgleichen(handy, lh, server, 2000);
  const waehrend = JSON.parse(JSON.stringify(handy)); antwort(waehrend, "est-tarif", "c1", true, 600);
  handy = ergebnis(waehrend); lh = lokal;
  assert.deepEqual(handy.proThema["est-tarif"], { b: 18, r: 12 });
  [handy, lh] = await sync(handy, lh); [ipad, li] = await sync(ipad, li);
  assert.deepEqual(ipad.proThema["est-tarif"], { b: 18, r: 12 });
  assert.ok(ipad.lern.c1);
  // Lernpfad (beste Sterne je Block), Einstellungen und „Weiterlernen“ (jeweils der neueste Stand)
  handy.pfad = { ust: { system: { sterne: 2, t: 700 } } };
  ipad.pfad = { ust: { system: { sterne: 3, t: 650 }, unternehmer: { sterne: 1, t: 660 } }, bsr: { "b1-pflicht": { sterne: 3, t: 670 } } };
  handy.einstellungen = { ziel: "30", design: "dark", teil: "1", oerModus2: "mc", t: 800 };
  ipad.einstellungen = { ziel: "20", design: "system", teil: "beide", oerModus2: "qa", t: 0 };
  ipad.zuletzt = { fach: "ust", titel: "Vorsteuer", t: 900 };
  [handy, lh] = await sync(handy, lh); [ipad, li] = await sync(ipad, li); [handy, lh] = await sync(handy, lh);
  for (const st of [handy, ipad]) {
    assert.equal(st.pfad.ust.system.sterne, 3);
    assert.equal(st.pfad.ust.unternehmer.sterne, 1);
    assert.equal(st.pfad.bsr["b1-pflicht"].sterne, 3);
    assert.equal(st.einstellungen.ziel, "30");
    assert.equal(st.einstellungen.teil, "1");
    assert.equal(st.zuletzt.titel, "Vorsteuer");
  }
  assert.deepEqual(handy.proThema["est-tarif"], { b: 18, r: 12 }); // weiterhin nichts doppelt
});

test("Paare finden: Normen und Kurzerklärungen eindeutig", async () => {
  const { PAARE } = await import("../js/paare.js");
  for (const [fach, liste] of Object.entries(PAARE)) {
    assert.ok(liste.length >= 10, fach);
    assert.equal(new Set(liste.map(([n]) => n)).size, liste.length, "doppelte Norm in " + fach);
    assert.equal(new Set(liste.map(([, t]) => t)).size, liste.length, "doppelte Erklärung in " + fach);
    for (const [n, t] of liste) assert.ok(/^(§|Art\.)/.test(n) && t.length <= 45, n);
  }
});

test("Lernpfade aller Module: jeder Block in sich vollständig", async () => {
  const { PFADE } = await import("../js/lernpfad.js");
  for (const fach of ["ust", "est", "oer", "bsr1", "bsr2", "bbf", "ao", "pr", "bewr"]) assert.ok(PFADE[fach]?.bloecke.length >= 8, "Lernpfad fehlt: " + fach);
  const ids = new Set();
  for (const b of ["ust", "est", "oer", "bsr1", "bsr2", "bbf", "ao", "pr", "bewr"].flatMap((f) => PFADE[f].bloecke)) {
    assert.ok(!ids.has(b.id), "doppelt: " + b.id); ids.add(b.id);
    assert.ok(b.karten.length >= 3 && b.fragen.length >= 3, b.id + ": zu wenig Karten oder Fragen");
    for (const r of b.normen) assert.ok(norm(r), `${b.id}: Norm ${r} fehlt`);
    for (const k of b.karten) assert.ok(["merksatz", "erklaerung", "beispiel", "klausur", "begriffe"].includes(k.art) && k.titel && k.text, b.id);
    for (const q of b.fragen) {
      assert.ok(q.frage && q.erkl, b.id);
      if (q.art === "wahl") {
        assert.ok(q.optionen.length >= 3 && new Set(q.optionen).size === q.optionen.length, `${b.id}: Optionen`);
        assert.ok(Number.isInteger(q.richtig) && q.richtig >= 0 && q.richtig < q.optionen.length, `${b.id}: richtig`);
      } else assert.ok(q.art === "zahl" && Number.isInteger(q.cent), `${b.id}: Zahl`);
    }
  }
});

test("Kompaktwissen: jedes Thema hat eine vollständige Zusammenfassung", async () => {
  const { KOMPAKT, KLAUSURPLAN, kompaktInline, lesezeit } = await import("../js/kompakt.js");
  for (const t of THEMEN) {
    const k = KOMPAKT[t.id];
    assert.ok(k, `Zusammenfassung fehlt: ${t.id}`);
    assert.ok(k.satz?.length > 40, `${t.id}: Kernsatz fehlt`);
    assert.ok(k.punkte?.length >= 3, `${t.id}: zu wenige Punkte`);
    if (t.id !== "oer-zusatz") {
      assert.ok(k.fallen?.length >= 1, `${t.id}: typische Fehler fehlen`);
      assert.ok(k.beispiele.length >= 1, `${t.id}: Klausurbeispiel fehlt`);
    }
    for (const b of k.beispiele) {
      assert.ok(b.titel && b.sv?.length > 40 && b.loesung.length >= 1, `${t.id}: Beispiel unvollständig`);
      // Die Musterlösung stützt sich auf Normen – mindestens eine antippbare Vorschrift
      const html = b.loesung.map(kompaktInline).join("");
      assert.ok(/data-a="normDetail"/.test(html) || t.id.startsWith("kalkul") || ["bilanzveraenderungen", "bestandskonten", "warenkonten", "warenunterkonten", "abschluss", "inventurBilanz", "grundbegriffe", "erfolgskonten", "umsatzsteuer", "privatkonten"].includes(t.id), `${t.id}: Lösung „${b.titel}“ ohne Normzitat`);
      for (const text of [b.sv, b.aufgabe || "", ...b.loesung]) assert.ok(!kompaktInline(text).includes("*"), `${t.id}: unpaariges ** in Beispiel`);
    }
    for (const z of k.zahlen || []) assert.equal(z.length, 2, `${t.id}: Zahl ohne Bedeutung`);
    // **fett** muss paarig sein, sonst bleibt ein Sternchen stehen
    for (const text of [k.satz, ...(k.punkte || []), ...(k.fallen || []), ...(k.schema || [])])
      assert.ok(!kompaktInline(text).includes("*"), `${t.id}: unpaariges ** in „${text.slice(0, 50)}“`);
    assert.ok(lesezeit(k) >= 1);
  }
  for (const id of Object.keys(KOMPAKT)) assert.ok(THEMA[id], `Zusammenfassung ohne Thema: ${id}`);
  for (const fach of ["bsr", "oer", "est", "ust", "ao", "pr", "bewr"]) for (const id of KLAUSURPLAN[fach].top) assert.equal(THEMA[id].fach, fach);
  // Normzitate werden antippbar und zeigen auf vorhandene Vorschriften
  const html = kompaktInline("nach § 4 Nr. 12 a UStG und Art. 20 Abs. 3 GG");
  assert.match(html, /data-a="normDetail" data-v="UStG 4[^"]*"/);
  assert.match(html, /data-v="GG 20 3"/);
  for (const [, ref] of html.matchAll(/data-v="([^"]+)"/g)) assert.ok(norm(ref), ref);
});

test("Synchronisierung: gelesene Zusammenfassungen werden vereinigt", async () => {
  const { gelesenVereinen } = await import("../js/sync.js");
  assert.deepEqual(gelesenVereinen({ a: 1, b: 5 }, { b: 3, c: 2 }), { a: 1, b: 5, c: 2 });
  assert.deepEqual(gelesenVereinen(undefined, { x: 1 }), { x: 1 });
});

test("Eigene Karteikarten: anlegen, bearbeiten, lernen, löschen", async () => {
  const MK = await import("../js/meinekarten.js");
  assert.ok(!MK.entwurfOk({ v: "Frage", h: "  " }));
  let m = MK.speichernKarte({}, { v: " Witwensplitting? ", h: "Folgejahr (§ 32a Abs. 6 S. 1 Nr. 1 EStG)", f: "est", st: "" }, 1000);
  const [id] = Object.keys(m);
  assert.equal(m[id].v, "Witwensplitting?");
  assert.equal(m[id].st, MK.STANDARD_STAPEL);
  assert.deepEqual(MK.faelligeKarten(m, "est", 1000).map((k) => k.id), [id], "neue Karten sind sofort fällig");
  assert.equal(MK.kartenVon(m, "oer").length, 0);
  m = MK.bewerteKarte(m, id, true, 1000);
  assert.equal(m[id].l.fach, 1);
  assert.equal(MK.faelligeKarten(m, "est", 1000).length, 0, "nach „gewusst“ erst morgen wieder");
  m = MK.speichernKarte(m, { id, v: "Wann gilt das Witwensplitting?", h: m[id].h, st: "Fristen" }, 2000);
  assert.equal(m[id].l.fach, 1, "Bearbeiten behält den Lernstand");
  assert.equal(m[id].f, "est");
  assert.deepEqual(MK.stapelVon(m, "est", 2000).map((s) => s.name), ["Fristen"]);
  m = MK.loeschenKarte(m, id, 3000);
  assert.equal(MK.kartenVon(m).length, 0);
  assert.ok(m[id].x, "Grabstein bleibt für den Abgleich");
});

test("Eigene Karteikarten: Geräte-Abgleich verliert weder Bearbeitung noch Wiederholung", async () => {
  const MK = await import("../js/meinekarten.js");
  const basis = { a: { v: "A", h: "1", f: "bsr", st: "S", e: 1, t: 1 }, b: { v: "B", h: "2", f: "bsr", st: "S", e: 1, t: 1 } };
  // Handy bearbeitet a, PC wiederholt a; PC löscht b
  const handy = { ...basis, a: { ...basis.a, v: "A neu", t: 5 } };
  const pc = { ...MK.bewerteKarte(basis, "a", true, 6), b: { x: 1, t: 7 } };
  for (const g of [MK.meineVereinen(handy, pc), MK.meineVereinen(pc, handy)]) {
    assert.equal(g.a.v, "A neu");
    assert.equal(g.a.l.fach, 1);
    assert.ok(g.b.x);
  }
  // Abgleich über sync.js
  const S = await import("../js/sync.js");
  const db = {};
  const server = { holen: async (c) => db[c] ? JSON.parse(JSON.stringify(db[c])) : null,
    speichern: async (c, daten, v) => { if ((db[c]?.version || 0) !== v) return null; db[c] = { daten, version: v + 1 }; return v + 1; } };
  const leer = () => ({ proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, zuletzt: null, meineKarten: {} });
  const code = S.neuerCode();
  const h1 = { ...leer(), meineKarten: handy }, p1 = { ...leer(), meineKarten: pc };
  const r1 = await S.abgleichen(h1, { code, geraet: "H" }, server, 10);
  const r2 = await S.abgleichen(p1, { code, geraet: "P" }, server, 11);
  const pcNeu = r2.ergebnis(p1), handyNeu = (await S.abgleichen(r1.ergebnis(h1), r1.lokal, server, 12)).ergebnis(r1.ergebnis(h1));
  for (const st of [pcNeu, handyNeu]) {
    assert.deepEqual(MK.kartenVon(st.meineKarten).map((k) => k.v), ["A neu"]);
    assert.equal(st.meineKarten.a.l.fach, 1);
  }
});

test("Eigene Karteikarten: Export und Import (JSON, Anki-Text, Semikolon)", async () => {
  const MK = await import("../js/meinekarten.js");
  let m = MK.speichernKarte({}, { v: "**§ 26 EStG**", h: "Wahlrecht\nder Ehegatten", f: "est", st: "Ehe" }, 1);
  m = MK.speichernKarte(m, { v: "Art. 20 GG", h: "Staatsstrukturprinzipien", f: "oer" }, 2);
  const json = MK.exportJson(m);
  const leer = MK.importieren({}, json, { fach: "bsr" }, 10);
  assert.equal(leer.neu, 2);
  assert.deepEqual(MK.kartenVon(leer.meine, "est").map((k) => [k.v, k.h, k.st]), [["**§ 26 EStG**", "Wahlrecht\nder Ehegatten", "Ehe"]]);
  assert.equal(MK.importieren(leer.meine, json, { fach: "bsr" }, 20).doppelt, 2, "Doppelte werden übersprungen");
  const anki = MK.exportText(m, "est");
  assert.ok(anki.includes("<b>§ 26 EStG</b>\tWahlrecht<br>der Ehegatten"));
  const zurueck = MK.importieren({}, anki, { fach: "est" }, 30);
  assert.deepEqual(MK.kartenVon(zurueck.meine).map((k) => [k.v, k.h, k.f]), [["**§ 26 EStG**", "Wahlrecht\nder Ehegatten", "est"]]);
  const csv = MK.importieren({}, "Vorne;Hinten\n\"Frist\";\"31.07.\"\nnur eine Spalte\n", { fach: "ust", stapel: "CSV" }, 40);
  assert.equal(csv.neu, 2);
  assert.ok(MK.kartenVon(csv.meine).every((k) => k.f === "ust" && k.st === "CSV"));
  assert.equal(MK.importieren({}, "kein Inhalt", { fach: "ust" }).neu, 0);
});

test("Eigene Karteikarten: Entwürfe aus Kompaktwissen, Beispielen und Normen", async () => {
  const MK = await import("../js/meinekarten.js");
  const { KOMPAKT } = await import("../js/kompakt.js");
  assert.deepEqual(MK.ausPunkt("**Witwensplitting (§ 32a Abs. 6 S. 1 Nr. 1 EStG):** im Jahr nach dem Tod noch Splitting.", "X"),
    { v: "Witwensplitting (§ 32a Abs. 6 S. 1 Nr. 1 EStG)", h: "im Jahr nach dem Tod noch Splitting." });
  assert.equal(MK.ausPunkt("Ohne Stichwort.", "Tarif").v, "Tarif: Was gilt?");
  for (const k of Object.values(KOMPAKT)) for (const b of k.beispiele) {
    const e = MK.ausBeispiel(b);
    assert.ok(MK.entwurfOk(e) && e.h.length <= 2000, b.titel);
  }
  const e = MK.ausNorm(norm("EStG 26"));
  assert.ok(e.v.startsWith("§ 26 EStG") && e.h.includes("Ehegatten") && e.h.length <= 2000);
});

test("Übung: feste Aufgaben kommen je Durchgang nur einmal, erzeugte nicht direkt hintereinander", async () => {
  const { istFest } = await import("../js/katalog.js");
  for (let s = 0; s < 30; s++) {
    for (const thema of THEMEN.map((t) => t.id)) {
      const fr = fragen([thema], 10, new Zufall(s));
      const fest = fr.filter((f) => istFest(ALLE.find((v) => v.id === f.id))).map((f) => f.id);
      assert.equal(new Set(fest).size, fest.length, `${thema}: feste Aufgabe doppelt`);
      const erzeugt = vorlagenFuer(thema).filter((v) => !istFest(v)).length;
      for (let i = 1; i < fr.length; i++) if (erzeugt > 1) assert.notEqual(fr[i].id, fr[i - 1].id, `${thema}: zweimal hintereinander`);
      for (const id of new Set(fr.map((f) => f.id))) assert.ok(fr.filter((f) => f.id === id).length <= 3, `${thema}: ${id} mehr als dreimal`);
    }
  }
  // Ort der Leistung: zwei feste Frage-Antwort-Aufgaben + ein Fallgenerator → 10 Aufgaben ohne doppelte feste
  const ort = fragen(["ust-ort"], 10, new Zufall(7));
  assert.equal(ort.filter((f) => f.id === "ust-ort-lieferung").length, 1);
  assert.equal(fragen(["ust-ort"], 10, new Zufall(7), "qa", true).length, 2, "MC-Modus ohne Fälle: nur die zwei festen Aufgaben");
});

test("Ort der Leistung: jeder Fall kommt dran, bevor sich einer wiederholt; alle Normen auflösbar", () => {
  for (const [id, anzahl] of [["ust-ort-fall", 11], ["ust-ort-sonstige-fall", 5], ["ust-ort-sonder-fall", 13]]) {
    const v = ALLE.find((x) => x.id === id), r = new Zufall(3);
    // Nach höchstens zwei Durchläufen (angebrochener Stapel + ein voller) war jeder Fall dran
    const texte = Array.from({ length: 2 * anzahl }, () => v.erzeugen(r));
    assert.equal(new Set(texte.map((f) => f.text)).size, anzahl, id);
    for (const f of texte) { assert.equal(f.richtig.length, 1); for (const ref of f.normen) assert.ok(norm(ref), `${id}: Norm ${ref} fehlt`); }
  }
  const uebung = fragen(["ust-ort"], 10, new Zufall(1), null, true); // Thema üben im MC-Modus
  assert.equal(uebung.length, 10, "MC-Übung „Ort“ wieder mit 10 Aufgaben");
  assert.equal(new Set(uebung.map((f) => f.text)).size, 10, "keine Frage doppelt");
});

test("Keine doppelten Fragen: Übung je Thema, gemischt und Klausur in allen Modulen", () => {
  const schl = (fr) => fr.map((f) => f.text.replace(/\s+/g, " ").trim().toLowerCase());
  const ohneDoppelte = (name, fr) => { const t = schl(fr); assert.equal(new Set(t).size, t.length, `${name}: doppelte Frage`); };
  for (let s = 0; s < 12; s++) {
    for (const t of THEMEN) { ohneDoppelte(t.id, fragen([t.id], 10, new Zufall(s))); ohneDoppelte(t.id + " MC", fragen([t.id], 10, new Zufall(s), null, true)); }
    for (const fach of ["bsr", "oer", "est", "ust", "ao", "pr", "bewr"]) {
      const alle = THEMEN.filter((t) => t.fach === fach).map((t) => t.id);
      for (const f of [null, "qa", "rechnen", "fall", "buchung"]) ohneDoppelte(`${fach} ${f}`, fragen(alle, 20, new Zufall(s), f));
      for (const n of [20, 60]) { const k = klausur(n, new Zufall(s), fach); ohneDoppelte(`Klausur ${fach}`, k); assert.equal(k.length, n, `Klausur ${fach} ${n} vollständig`); }
    }
  }
  // Inhalte: kein Aufgabentext und keine Lernkarte doppelt angelegt
  const texte = ALLE.map((v) => v.erzeugen(new Zufall(1)).text.replace(/\s+/g, " ").trim());
  assert.equal(new Set(texte).size, texte.length, "zwei Vorlagen mit gleichem Aufgabentext");
  assert.equal(new Set(LERNKARTEN.map((k) => k.vorne)).size, LERNKARTEN.length, "Lernkarte doppelt");
});

test("Goodnotes-Lernset importieren (ZIP mit Änderungsprotokoll, wie beim Export)", async () => {
  const { goodnotesLesen } = await import("../js/goodnotes.js");
  const MK = await import("../js/meinekarten.js");
  // Mini-Protobuf-Encoder für den Aufbau der Testdatei
  const vi = (n) => { const o = []; do { let b = n % 128; n = Math.floor(n / 128); if (n) b |= 128; o.push(b); } while (n); return o; };
  const L = (f, inhalt) => { const b = typeof inhalt === "string" ? [...new TextEncoder().encode(inhalt)] : inhalt; return [...vi(f * 8 + 2), ...vi(b.length), ...b]; };
  const V = (f, n) => [...vi(f * 8), ...vi(n)];
  const seite = (...texte) => L(1, texte.flatMap((x) => L(1, [...L(1, x[0]), ...(x[1] != null ? L(2, x[1]) : [])])));
  const nachricht = (inhalt) => [...vi(inhalt.length), ...inhalt];
  const SET = "SET-1";
  const ev = [
    nachricht([...L(1, SET), ...L(30, [...L(1, SET), ...L(2, L(1, "BilR Fristen")), ...V(20, 24)])]),
    nachricht([...L(1, "K2"), ...L(151, [...L(1, "K2"), ...L(2, SET), ...L(4, L(1, "b")), ...L(5, seite(["text/plain"])), ...L(6, seite(["text/plain"]))])]),
    nachricht([...L(1, "K1"), ...L(151, [...L(1, "K1"), ...L(2, SET), ...L(4, L(1, "a")), ...L(5, seite(["text/plain"])), ...L(6, seite(["text/plain"]))])]),
    nachricht([...L(1, "K2"), ...L(152, [...L(1, "K2"), ...L(2, SET), ...L(3, L(1, "b")), ...L(4, seite(["text/plain", "Inventur"])), ...L(5, seite(["text/plain", "§ 240 HGB"]))])]),
    nachricht([...L(1, "K1"), ...L(152, [...L(1, "K1"), ...L(2, SET), ...L(3, L(1, "a")), ...L(4, seite(["text/plain", "Frist"])), ...L(5, seite(["text/plain", "alt"]))])]),
    nachricht([...L(1, "K1"), ...L(152, [...L(1, "K1"), ...L(2, SET), ...L(3, L(1, "a")), ...L(4, seite(["text/plain", "Frist ESt-Erklärung?"])), ...L(5, seite(["text/plain", "31.07."], ["text/plain", "des Folgejahres"]))])]),
    nachricht([...L(1, "K3"), ...L(152, [...L(1, "K3"), ...L(2, SET), ...L(3, L(1, "c")), ...L(4, seite(["image/png"])), ...L(5, seite(["text/plain", "nur Bild vorne"]))])]),
    nachricht([...L(1, SET), ...L(150, [...L(1, SET), ...L(2, "K1"), ...L(3, "DocumentEditor:x")])]),
  ].flat();
  // ZIP mit Deflate wie Goodnotes (plus ein leerer Eintrag davor)
  const roh = new Uint8Array(ev);
  const def = new Uint8Array(await new Response(new Blob([roh]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer());
  const teile = [], zentral = [];
  let pos = 0;
  for (const [name, daten, methode, groesse] of [["schema.pb", new Uint8Array([8, 24]), 0, 2], ["index.events.pb", def, 8, roh.length]]) {
    const n = new TextEncoder().encode(name), lokal = new Uint8Array(30 + n.length), d = new DataView(lokal.buffer);
    d.setUint32(0, 0x04034b50, true); d.setUint16(8, methode, true); d.setUint32(18, daten.length, true); d.setUint32(22, groesse, true); d.setUint16(26, n.length, true); lokal.set(n, 30);
    const z = new Uint8Array(46 + n.length), dz = new DataView(z.buffer);
    dz.setUint32(0, 0x02014b50, true); dz.setUint16(10, methode, true); dz.setUint32(20, daten.length, true); dz.setUint32(24, groesse, true); dz.setUint16(28, n.length, true); dz.setUint32(42, pos, true); z.set(n, 46);
    teile.push(lokal, daten); zentral.push(z); pos += lokal.length + daten.length;
  }
  const zl = zentral.reduce((a, z) => a + z.length, 0), ende = new Uint8Array(22), de = new DataView(ende.buffer);
  de.setUint32(0, 0x06054b50, true); de.setUint16(8, 2, true); de.setUint16(10, 2, true); de.setUint32(12, zl, true); de.setUint32(16, pos, true);
  const datei = await new Blob([...teile, ...zentral, ende]).arrayBuffer();

  const set = await goodnotesLesen(datei);
  assert.equal(set.titel, "BilR Fristen");
  assert.deepEqual(set.karten, [{ v: "Frist ESt-Erklärung?", h: "31.07.\ndes Folgejahres" }, { v: "Inventur", h: "§ 240 HGB" }, { v: "", h: "nur Bild vorne" }]);
  assert.equal(set.ohneText, 1);
  // Übernahme in die eigenen Karten: Stapel = Name des Lernsets, Karte ohne Text auf einer Seite fällt weg
  const { meine, neu } = MK.importieren({}, JSON.stringify({ karten: set.karten.map((k) => ({ vorne: k.v, hinten: k.h })) }), { fach: "bsr", stapel: set.titel });
  assert.equal(neu, 2);
  assert.ok(MK.kartenVon(meine, "bsr").every((k) => k.st === "BilR Fristen"));
  await assert.rejects(goodnotesLesen(new TextEncoder().encode("kein Lernset").buffer));
});

test("BilBf (Ausbildung FTA I): Themen, ausgeblendete Aufgaben, Übung und Klausur", async () => {
  const { themenFuer, NICHT_IN, vorlageIn } = await import("../js/kern.js");
  const { fragen, klausur, neueZiehung, ALLE } = await import("../js/katalog.js");
  const ids = themenFuer("bbf").map((t) => t.id);
  assert.ok(ids.length >= 12 && ids.includes("bbf-afa") && ids.includes("bestandskonten"));
  for (const raus of ["warenunterkonten", "kalkulation", "bsr-afa", "bsr-ak", "bsr-teilwert"]) assert.ok(!ids.includes(raus), raus);
  // jede ausgeblendete ID gibt es wirklich (Tippfehler fallen sonst nicht auf)
  for (const id of NICHT_IN.bbf) assert.ok(ALLE.some((v) => v.id === id), "unbekannte ID in NICHT_IN: " + id);
  for (const id of ids) assert.ok(ALLE.filter((v) => v.thema === id && vorlageIn(v, "bbf")).length >= 3, "zu wenig Aufgaben: " + id);
  const r = new Zufall(7);
  for (let i = 0; i < 20; i++) {
    const ue = fragen(ids, 15, r, null, false, neueZiehung("bbf"));
    const kl = klausur(30, r, "bbf");
    for (const f of [...ue, ...kl]) {
      assert.ok(ids.includes(f.thema), "fremdes Thema: " + f.thema);
      assert.ok(!NICHT_IN.bbf.has(f.id), "ausgeblendete Aufgabe gezogen: " + f.id);
    }
  }
});

test("Levelsystem: Kurve, Level aus XP, Erfolge", async () => {
  const L = await import("../js/level.js");
  // jedes Level braucht mehr XP als das vorige; Level 5 nach ca. einer Woche, Level 100 nach 2–3 Jahren
  for (let n = 1; n < 99; n++) assert.ok(L.bedarf(n + 1) > L.bedarf(n));
  assert.equal(L.xpFuerLevel(1), 0);
  assert.equal(L.xpFuerLevel(2), 250);
  assert.equal(L.xpFuerLevel(5), 1300);
  assert.equal(L.xpFuerLevel(100), 267300);
  let summe = 0; for (let n = 1; n < 100; n++) summe += L.bedarf(n);
  assert.equal(summe, L.xpFuerLevel(100));
  const woche = 4 * (30 * 9.5 + L.tagesBonus(30)); // 4 Lerntage à 30 Aufgaben, 75 % richtig
  assert.ok(L.xpFuerLevel(5) / woche <= 1.2, "Level 5 nach etwa einer Woche");
  const jahre = L.xpFuerLevel(100) / woche / 52;
  assert.ok(jahre >= 2 && jahre <= 4, `Level 100 nach ${jahre.toFixed(1)} Jahren`);
  assert.equal(L.levelAus(0).level, 1);
  assert.equal(L.levelAus(249).level, 1);
  assert.equal(L.levelAus(250).level, 2);
  assert.equal(L.levelAus(1e9).level, 100);
  assert.ok(L.levelAus(1e9).max);
  assert.equal(L.levelAus(1300).rang.id, "kupfer");
  assert.equal(L.levelAus(L.xpFuerLevel(10)).rang.id, "bronze");
  // Bonus: Buchungssatz und Serie (ab der 3. richtigen in Folge, max. +10)
  assert.equal(L.bonusFuerAntwort({ korrekt: true, typ: "auswahl", serie: 2 }), 0);
  assert.equal(L.bonusFuerAntwort({ korrekt: true, typ: "auswahl", serie: 3 }), 2);
  assert.equal(L.bonusFuerAntwort({ korrekt: true, typ: "buchung", serie: 20 }), 15);
  assert.equal(L.bonusFuerAntwort({ korrekt: false, typ: "buchung", serie: 0 }), 0);
  assert.equal(L.tagesBonus(9), 0); assert.equal(L.tagesBonus(25), 60); assert.equal(L.tagesBonus(80), 120);
  assert.equal(L.laengsteSerie({ "2026-02-27": 1, "2026-02-28": 3, "2026-03-01": 2, "2026-03-03": 5, "2026-03-04": 0 }), 3);
  // Erfolgs-Ids eindeutig, Level-Erfolge ohne XP
  const ids = L.ERFOLGE.map((e) => e.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(L.ERFOLGE.filter((e) => e.reihe === "level").every((e) => e.lohn === 0));
  // Rückwirkend: 120 richtige, 30 falsche an einem Tag → XP und Erfolge
  const stat = { proThema: { a: { b: 150, r: 120 } }, tage: { "2026-10-20": 150 }, klausuren: [], lern: {}, pfad: {}, rekorde: { serie: 12, bs: 4 }, xpBonus: 0 };
  const neu = L.erfolgePruefen(stat, ["nachteule"], 5);
  const frei = new Set(neu.map((e) => e.id));
  for (const id of ["richtig-10", "richtig-100", "serie-10", "buchung-3", "starkeTage-1", "nachteule", "level-5"]) assert.ok(frei.has(id), id);
  assert.ok(!frei.has("richtig-250") && !frei.has("serie-25") && !frei.has("fruehaufsteher"));
  assert.equal(L.erfolgePruefen(stat).length, 0, "nichts doppelt");
  const x = L.xpGesamt(stat);
  assert.equal(x.basis, 120 * 10 + 30 * 2 + 120);
  assert.ok(x.erfolge > 0 && x.gesamt === x.basis + x.erfolge);
  // Vereinen: frühester Zeitpunkt, Rekorde als Maximum
  assert.deepEqual(L.erfolgeVereinen({ a: 5, b: 9 }, { b: 3, c: 7 }), { a: 5, b: 3, c: 7 });
  assert.deepEqual(L.rekordeVereinen({ serie: 4, bs: 9 }, { serie: 7 }), { serie: 7, bs: 9 });
});

test("Synchronisierung: Bonus-XP, Erfolge und Rekorde ohne Doppelzählung", async () => {
  const S = await import("../js/sync.js");
  const db = {};
  const server = {
    holen: async (c) => (db[c] ? JSON.parse(JSON.stringify(db[c])) : null),
    speichern: async (c, daten, v) => { if ((db[c]?.version || 0) !== v) return null; db[c] = { daten, version: v + 1 }; return v + 1; },
  };
  const code = S.neuerCode();
  const sync = async (st, lok) => { const { ergebnis, lokal } = await S.abgleichen(st, lok, server, 1000); return [ergebnis(st), lokal]; };
  let a = { proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, xpBonus: 40, erfolge: { "richtig-10": 50 }, rekorde: { serie: 6 } }, la = { code, geraet: "A" };
  let b = { proThema: {}, klausuren: [], karten: [], lern: {}, tage: {}, xpBonus: 25, erfolge: { "richtig-10": 20, nachteule: 30 }, rekorde: { serie: 3, bs: 5 } }, lb = { code, geraet: "B" };
  [a, la] = await sync(a, la); [b, lb] = await sync(b, lb); [a, la] = await sync(a, la);
  for (const st of [a, b]) {
    assert.equal(st.xpBonus, 65);
    assert.deepEqual(st.erfolge, { "richtig-10": 20, nachteule: 30 });
    assert.deepEqual(st.rekorde, { serie: 6, bs: 5 });
  }
  a.xpBonus += 10;
  [a, la] = await sync(a, la); [a, la] = await sync(a, la); [b, lb] = await sync(b, lb);
  assert.equal(a.xpBonus, 75); assert.equal(b.xpBonus, 75);
});

test("Synchronisierung: Tagesprotokoll, Tageszeiten, Termine, Garderobe, Profil", async () => {
  const S = await import("../js/sync.js");
  const db = {};
  const server = {
    holen: async (c) => (db[c] ? JSON.parse(JSON.stringify(db[c])) : null),
    speichern: async (c, daten, v) => { if ((db[c]?.version || 0) !== v) return null; db[c] = { daten, version: v + 1 }; return v + 1; },
  };
  const code = S.neuerCode();
  const sync = async (st, lok) => { const { ergebnis, lokal } = await S.abgleichen(st, lok, server, 1000); return [ergebnis(st), lokal]; };
  const leer = () => ({ proThema: {}, klausuren: [], karten: [], lern: {}, tage: {} });
  let a = { ...leer(), log: { "2026-10-20": { t1: [3, 2] } }, stunden: { 9: 3 }, termine: { k1: { fach: "bsr", datum: "2027-02-01", t: 5 } },
    gekauft: { hut: 10 }, outfit: { kopf: "hut", t: 20 }, profil: { id: "AAA", name: "", t: 0 } }, la = { code, geraet: "A" };
  let b = { ...leer(), log: { "2026-10-20": { t1: [1, 1], t2: [2, 0] } }, stunden: { 9: 1, 22: 2 }, termine: { k1: { x: 1, t: 9 } },
    gekauft: { schal: 30 }, outfit: { kopf: "", t: 10 }, profil: { id: "BBB", name: "", t: 0 } }, lb = { code, geraet: "B" };
  [a, la] = await sync(a, la); [b, lb] = await sync(b, lb); [a, la] = await sync(a, la); [a, la] = await sync(a, la);
  for (const st of [a, b]) {
    assert.deepEqual(st.log["2026-10-20"], { t1: [4, 3], t2: [2, 0] });
    assert.deepEqual(st.stunden, { 9: 4, 22: 2 });
    assert.equal(st.termine.k1.x, 1, "Löschen gewinnt, weil neuer");
    assert.deepEqual(Object.keys(st.gekauft).sort(), ["hut", "schal"]);
    assert.equal(st.outfit.kopf, "hut");
    assert.equal(st.profil.id, "AAA", "das zuerst hochgeladene Profil bleibt");
  }
});

test("Duell: gleicher Startwert → gleiche Aufgaben, auch nach anderen Übungen; Link hin und zurück", async () => {
  const K = await import("../js/kern.js"), KA = await import("../js/katalog.js"), { alsMultipleChoice } = await import("../js/oer/mc.js"), D = await import("../js/duell.js");
  const satz = (fach, seed) => K.gleichbleibendErzeugen(() => {
    const r = new K.Zufall(seed);
    return KA.fragen(K.pruefungsThemen(fach).map((t) => t.id), 16, r, null, true, KA.neueZiehung(fach)).map((f) => alsMultipleChoice(f, r)).filter((f) => f.typ !== "offen").slice(0, 10).map((f) => f.text);
  });
  for (const fach of ["bsr", "oer", "est", "ust", "bbf", "ao", "pr", "bewr"]) {
    const a = satz(fach, 12345);
    // dazwischen „normal“ üben (verändert die Fallstapel)
    KA.fragen(K.pruefungsThemen(fach).map((t) => t.id), 30, new K.Zufall(), null, false, KA.neueZiehung(fach));
    assert.deepEqual(satz(fach, 12345), a, fach);
    assert.equal(a.length, 10, fach);
  }
  const d = { f: "bsr", s: 4000000000, n: "Alex 🙂", r: 7, z: 185, a: 300 };
  const l = D.duellLesen(D.duellLink("https://x.de/", d).split("#duell=")[1]);
  assert.equal(l.n, "Alex 🙂"); assert.equal(l.s, 4000000000); assert.equal(l.g, null);
  assert.equal(D.duellLesen("kaputt"), null);
  assert.equal(D.duellSieger({ r: 8, z: 300 }, { r: 7, z: 100 }), 1);
  assert.equal(D.duellSieger({ r: 7, z: 300 }, { r: 7, z: 100 }), -1);
  assert.equal(D.duellSieger({ r: 7, z: 100 }, { r: 7, z: 100 }), 0);
});

test("Neuigkeiten: eindeutige Einträge, nur Ungesehenes", async () => {
  const N = await import("../js/neuigkeiten.js");
  const ids = N.NEUIGKEITEN.map((n) => n.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const n of N.NEUIGKEITEN) { assert.match(n.datum, /^\d{4}-\d{2}-\d{2}$/); assert.ok(n.punkte.length && n.punkte.every((p) => p[1] && p[2])); }
  assert.deepEqual(N.ungesehen(N.NEUESTE), []);
  assert.deepEqual(N.ungesehen("").map((n) => n.id), [N.NEUESTE]);
  assert.deepEqual(N.ungesehen(ids[1]).map((n) => n.id), [ids[0]]);
  for (const n of N.NEUIGKEITEN) assert.ok(n.klein === undefined || n.klein === true, n.id);
});

test("Garderobe: jeder Hintergrund hat ein Muster in style.css, alle außer dem Standard kosten", async () => {
  const fs = await import("node:fs");
  const G = await import("../js/garderobe.js");
  const css = fs.readFileSync(new URL("../css/style.css", import.meta.url), "utf8");
  const hg = G.ARTIKEL.filter((a) => a.slot === "hintergrund");
  assert.ok(hg.length >= 20);
  for (const a of hg) {
    assert.ok(css.includes(`.hg-${a.id}`), `Muster fehlt: ${a.id}`);
    if (a.id !== G.STANDARD.hintergrund) assert.ok(a.preis > 0, `${a.id} kostet nichts`);
  }
  assert.equal(G.artikel("eigenesbild").preis, 1000);
  assert.ok(G.FARBWELTEN.some((f) => f.id === "rosa"));
  for (const f of G.FARBWELTEN) if (f.id !== "standard") assert.ok(css.includes(`[data-farbwelt="${f.id}"]`), f.id);
  // Gekauftes außerhalb des Besitzes fällt auf den Standard zurück
  assert.equal(G.outfitVon({ hintergrund: "neon" }, {}).hintergrund, "leuchten");
  assert.equal(G.outfitVon({ hintergrund: "neon" }, { neon: 1 }).hintergrund, "neon");
});

test("Gesetzestext: Satzgrenzen bei Verweisen („Satz 2.“), Sätzen mit § am Anfang und Abkürzungen", async () => {
  const NT = await import("../js/oer/normtext.js");
  const anzahl = (ref) => NT.saetze(NT.norm(ref).absaetze[0].text.replace(/^\(\d+[a-z]?\)\s*/, "")).length;
  assert.equal(anzahl("EStG 11 1"), 5);
  assert.equal(anzahl("UStG 18 1"), 4);
  assert.equal(anzahl("UStG 17 1"), 9); // „eingetreten ist“ steht in Satz 8
  const t4 = NT.norm("EStG 4 1").absaetze[0].text; // „(ABl. EU Nr. L 207 S. 1)“ beendet keinen Satz
  assert.match(t4.slice(...NT.saetze(t4)[7]), /^Einlagen sind alle Wirtschaftsgüter/);
  assert.equal(NT.saetze("Dazu gehören z. B. Mieten. Das gilt (z. B. Erbbaurecht) auch. Siehe BGBl. I S. 1.").length, 3);
  assert.equal(NT.saetze("Es gelten folgende Fälle: 1. erste Nr. 2 und\n2. zweite Nr.").length, 1);
});

test("Gesetzesfarben: Standard, Palette, eigene Farbe lesbar in hell und dunkel, Text-Format", async () => {
  const F = await import("../js/gesetzfarben.js");
  assert.deepEqual(F.farbeVon("hgb"), { hell: "#2b4f8c", dunkel: "#8fb2f0" });
  assert.equal(F.farbeVon("hgb", { hgb: "pink" }).hell, "#be185d");
  const gelb = F.farbeVon("estg", { estg: "#ffff00" }), schwarz = F.farbeVon("estg", { estg: "#000000" });
  assert.notEqual(gelb.hell, "#ffff00"); // zu hell für weiße Karten → abgedunkelt
  assert.notEqual(schwarz.dunkel, "#000000"); // zu dunkel für die dunkle Ansicht → aufgehellt
  assert.equal(F.schriftAuf("#ffffff"), "#12151d");
  assert.equal(F.schriftAuf("#2b4f8c"), "#ffffff");
  assert.deepEqual(F.farbenAusText("hgb=pink,estg=#1F7A4D,ao=quatsch,xy=rot"), { hgb: "pink", estg: "#1F7A4D" });
  assert.equal(F.farbenText({ hgb: "pink", ao: "nein" }), "hgb=pink");
  const css = F.farbenCss({ gg: "blau" });
  for (const g of F.GESETZE) assert.match(css, new RegExp(`--gz-${g.id}: #[0-9a-f]{6}; --gz-${g.id}-auf: #`));
  assert.match(css, /--gz-gg: #2b4f8c/);
  assert.equal(new Set(F.PALETTE.map((p) => p.id)).size, F.PALETTE.length);
  for (const g of F.GESETZE) assert.ok(F.PALETTE.some((p) => p.id === g.standard), g.id);
});

test("Buchungssätze: Lernfilter nach Form und Anlass", async () => {
  const K = await import("../js/katalog.js");
  const bsr = THEMEN.filter((t) => t.fach === "bsr").map((t) => t.id);
  const n = K.buchungsAnzahl(bsr, "bsr");
  for (const a of K.BUCHUNGS_ARTEN) assert.ok(n[a.id] > 0, "keine Aufgaben für " + a.id);
  assert.equal(K.BUCHUNGS_ARTEN.filter((a) => a.klausur).reduce((s, a) => s + a.klausur, 0), 100);
  const form = (f) => { const s = f.loesungen[0].soll.length, h = f.loesungen[0].haben.length; return s === 1 && h === 1 ? "einfach" : h === 1 ? "mehrsoll" : s === 1 ? "mehrhaben" : "viele"; };
  for (const art of ["einfach", "mehrsoll", "mehrhaben", "viele"]) {
    const fr = K.fragen(bsr, 12, new Zufall(5), "buchung:" + art);
    assert.ok(fr.length > 0, art);
    for (const f of fr) assert.equal(form(f), art, f.id);
  }
  for (const f of K.fragen(bsr, 8, new Zufall(2), "buchung:berichtigung")) assert.match(f.text, /Korrektur|Berichtigungsbuchung|voll als .* gebucht/i);
});

test("Garderobe: Set Make-up & Wimpern rechnet gekaufte Einzelteile an", async () => {
  const G = await import("../js/garderobe.js");
  assert.equal(G.preisFuer("glamour", {}), 300);
  assert.equal(G.preisFuer("glamour", { makeup: 1 }), 50);
  assert.equal(G.kasse(10000, { makeup: 1, glamour: 2 }).ausgegeben, 300);
  assert.equal(G.kasse(10000, { glamour: 1 }).ausgegeben, 300);
  assert.ok(G.besitzt("wimpern", { glamour: 1 }) && G.besitzt("glamour", { makeup: 1, wimpern: 1 }));
  assert.ok(!G.artikel("perlenkette"), "Perlenkette ist aus dem Katalog");
  for (const s of G.SLOTS) assert.ok(s.id in G.STANDARD, `Bereich ${s.id} fehlt in STANDARD`);
});

test("Garderobe: Nachtschwinge ist eine Maske – alte Metall-Auswahl wird übernommen", async () => {
  const G = await import("../js/garderobe.js");
  assert.equal(G.artikel("nachtschwinge").slot, "maske");
  const o = G.outfitVon({ metall: "nachtschwinge" }, { nachtschwinge: 1 });
  assert.equal(o.maske, "nachtschwinge"); assert.equal(o.metall, "gold");
  const t = G.outfitTeile({ ...G.STANDARD, maske: "nachtschwinge", gesicht: "glamour" });
  const svg = t.kappe("x", "offen");
  assert.ok(svg.includes("#ff5fb0") && svg.includes("#fdf2ff"), "rosa Augen und Wimpern");
  assert.ok(!G.outfitTeile({ ...G.STANDARD, maske: "nachtschwinge" }).kappe("x", "offen").includes("#ff5fb0"));
});

test("Handschrift: Striche kompakt kodieren, Karten mit Handschrift speichern, exportieren und importieren", async () => {
  const HS = await import("../js/handschrift.js");
  const MK = await import("../js/meinekarten.js");
  // Ein Strich mit 200 Punkten auf einer Geraden wird stark vereinfacht, Druck und Farbe bleiben
  const z = { g: "k", s: [{ w: "s", c: 2, p: Array.from({ length: 200 }, (_, i) => [10 + i * 2, 50 + i, 8]) }, { w: "m", c: 1, p: [[5, 300, 7], [500, 302, 7]] }] };
  const t = HS.kodieren(z), back = HS.dekodieren(t);
  assert.ok(t.length < 60, "kompakt: " + t.length);
  assert.equal(back.g, "k"); assert.equal(back.s.length, 2); assert.equal(back.s[0].c, 2); assert.equal(back.s[1].w, "m");
  assert.deepEqual(back.s[0].p[0], [10, 50, 8]); assert.deepEqual(back.s[0].p.at(-1), [408, 249, 8]);
  assert.equal(HS.kodieren({ g: "l", s: [] }), "");
  assert.ok(HS.svg(t).includes("<path"));
  // Karte: Vorderseite nur Handschrift, Rückseite Text
  assert.ok(MK.entwurfOk({ v: "", zv: t, h: "Antwort" }) && MK.entwurfOk({ v: "", zv: z, h: "x" }));
  assert.ok(!MK.entwurfOk({ v: "", zv: "", h: "Antwort" }));
  const m = MK.speichernKarte({}, { v: "", zv: t, h: "Antwort", f: "est" });
  const k = Object.values(m)[0];
  assert.equal(k.zv, t); assert.ok(!("zh" in k));
  const json = MK.exportJson(m);
  assert.ok(json.includes("handschriftVorne"));
  const imp = MK.importieren({}, json, { fach: "est" });
  assert.equal(imp.neu, 1); assert.equal(Object.values(imp.meine)[0].zv, t);
  assert.ok(MK.exportText(m).includes("(Handschrift – nur in der App)"));
});

test("Rangliste: Profil-ID geht beim Abgleich nicht verloren, Doppelungen werden entfernt", async () => {
  const { profilVereinen } = await import("../js/sync.js");
  const { doppelteEntfernen, eintragen } = await import("../js/gruppe.js");
  // Server kennt nur den Namen, das Gerät hat zusätzlich eine ID mit gleichem Zeitstempel → ID bleibt
  assert.equal(profilVereinen({ name: "Ben", t: 5 }, { name: "Ben", id: "g-b", t: 5 }).id, "g-b");
  assert.equal(profilVereinen({ name: "Ben", id: "g-b", t: 5 }, { name: "Ben", t: 9 }).id, "g-b");
  // Zwei Geräte mit verschiedenen IDs: beide landen bei derselben, die andere wird „frueher“
  const p1 = profilVereinen({ name: "Ben", id: "g-z", t: 5 }, { name: "Ben", id: "g-a", t: 6 });
  const p2 = profilVereinen({ name: "Ben", id: "g-a", t: 6 }, { name: "Ben", id: "g-z", t: 5 });
  assert.equal(p1.id, "g-a"); assert.equal(p2.id, "g-a"); assert.deepEqual(p1.frueher, ["g-z"]);
  // Gruppe mit vier Kopien von Ben (verlorene IDs) und einer anderen Person
  const ben = { name: "Ben", xp: 1360, level: 9, outfit: { metall: "gold" } };
  let d = { typ: "gruppe", name: "G", mitglieder: { x1: { ...ben }, x2: { ...ben }, x3: { ...ben, xp: 1200 }, mia: { name: "Mia", xp: 900, outfit: { metall: "gold" } }, ben2: { name: "Ben", xp: 5000, outfit: { metall: "gold" } } } };
  d = doppelteEntfernen(eintragen(d, "neu", ben), "neu", ben, ["alt"]);
  assert.deepEqual(Object.keys(d.mitglieder).sort(), ["mia", "neu"]);
  // Rangliste zeigt jeden Namen einmal (auch Kopien anderer, z. B. von alten App-Versionen): die mit den meisten XP
  const { rangliste, namenVereinen } = await import("../js/gruppe.js");
  const g = { mitglieder: { a: { name: "Lea", xp: 10 }, b: { name: "lea ", xp: 30 }, c: { name: "Anonym", xp: 1 }, d: { name: "Anonym", xp: 2 }, e: { name: "Tom", xp: 5 } } };
  assert.deepEqual(rangliste(g, "gesamt").map((e) => e.id), ["b", "e", "d", "c"]);
  assert.deepEqual(Object.keys(namenVereinen(g.mitglieder, "a")).sort(), ["a", "c", "d", "e"]);
  // Zwei echte Personen gleichen Namens mit aktueller App (fest) bleiben beide; alte Kopien ohne fest fallen weg
  const h = { mitglieder: { l1: { name: "Lisa", xp: 50, fest: 1 }, l2: { name: "Lisa", xp: 20, fest: 1 }, alt: { name: "lisa", xp: 90 } } };
  assert.deepEqual(rangliste(h, "gesamt").map((e) => e.id), ["l1", "l2"]);
  const tag = 24 * 3600 * 1000;
  const v = { mitglieder: { neu: { name: "Lisa", xp: 5, fest: 1, t: 30 * tag }, verwaist: { name: "Lisa", xp: 80, fest: 1, t: 10 * tag } } };
  assert.deepEqual(rangliste(v, "gesamt").map((e) => e.id), ["neu"]);
});

test("Vorlesen: Normen und Abkürzungen ausgeschrieben, jeder Überblick hat einen hörbaren Ablauf", async () => {
  const { sprechbar, hoerSegmente, saetze } = await import("../js/vorlesen.js");
  const { KOMPAKT } = await import("../js/kompakt.js");
  assert.equal(sprechbar("**§ 11 Abs. 2 S. 4 EStG**"), "Paragraf 11 Absatz 2 Satz 4 Einkommensteuergesetz");
  assert.equal(sprechbar("Art. 44 Abs. 1 GG i. V. m. §§ 187, 188 BGB"), "Artikel 44 Absatz 1 Grundgesetz in Verbindung mit Paragrafen 187, 188 Bürgerliches Gesetzbuch");
  assert.equal(sprechbar("EÜR, z. B. AfA"), "Einnahmenüberschussrechnung, zum Beispiel Absetzung für Abnutzung");
  assert.equal(sprechbar("R 2 Abs. 1 EStR"), "Richtlinie 2 Absatz 1 Einkommensteuer-Richtlinien");
  for (const [id, k] of Object.entries(KOMPAKT)) {
    const seg = hoerSegmente(k, THEMA[id]);
    assert.ok(seg.length > 3, id);
    for (const s of seg) {
      assert.ok(!/[§*]|\bAbs\.|\bNr\./.test(s.text), `${id}: ${s.text}`);
      for (const t of saetze(s.text)) assert.ok(t.length <= 400, `${id}: zu lang`);
    }
  }
});

test("Profi-Stimme: Audio nur bei passender Prüfsumme, Zeitmarken je Punkt", async () => {
  const { hoerSegmente, hoerGruppen, hoerHash, audioFuer, hoerInfo } = await import("../js/vorlesen.js");
  const { HOER_AUDIO } = await import("../js/hoeraudio.js");
  const { KOMPAKT } = await import("../js/kompakt.js");
  const fs = await import("node:fs");
  const seg = hoerSegmente(KOMPAKT["pr-stellvertretung"], THEMA["pr-stellvertretung"]);
  assert.equal(hoerHash(seg), hoerHash(seg));
  assert.notEqual(hoerHash(seg), hoerHash([...seg.slice(1)]));
  assert.ok(hoerGruppen(seg).length < seg.length && hoerGruppen(seg).every((g, i, a) => !i || a[i - 1].ziel !== g.ziel));
  assert.equal(audioFuer("pr-stellvertretung", seg.slice(1)), null);
  for (const [id, a] of Object.entries(HOER_AUDIO)) {
    assert.ok(KOMPAKT[id], "Audio ohne Thema: " + id);
    assert.ok(fs.existsSync(new URL(`../audio/${id}.m4a`, import.meta.url)), "Datei fehlt: " + id);
    assert.ok(a.d > 30 && a.m.length >= 3 && a.m.every((x, i, m) => !i || x[0] > m[i - 1][0]), id);
    const s = hoerSegmente(KOMPAKT[id], THEMA[id]);
    if (audioFuer(id, s)) assert.ok(hoerInfo(id, s).profi && a.m.every(([, z]) => s.some((x) => x.ziel === z)), id);
  }
});

test("Klausursimulation: Sachverhalte rechnen für jeden Startwert sauber, Notentabelle", async () => {
  const { SIM, inhalt, note, zahlStimmt } = await import("../js/klausursim.js");
  for (const [fach, d] of Object.entries(SIM)) for (const sv of d.pool) for (let seed = 1; seed <= (sv.fest ? 1 : 60); seed++) {
    const s = inhalt(fach, sv.id, seed, seed % 9);
    assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify([s.sv, s.loesung, s.bewertung, s.zahlen])), `${s.id}: Rechenfehler (Startwert ${seed})`);
    assert.ok(s.bewertung.length >= 2 && s.loesung.length >= 1 && s.aufgaben.length >= 1, s.id);
    for (const [, t, erw] of s.bewertung) assert.ok(t && erw && erw.length > 8, `${s.id}: Merkmal mit Erwartung – „${t}“`);
  }
  assert.deepEqual([100, 96, 90, 50, 49.9, 19].map(note), [15, 15, 13, 5, 4, 0]);
  assert.ok(zahlStimmt({ wert: 1234.5, toleranz: 1 }, "1.234,50") && !zahlStimmt({ wert: 1234.5, toleranz: 1 }, "1.240"));
});

test("Probeklausuren: vollständig, Zeit und Punkte stimmen, jeder Merkmal-Punkt mit Erwartung", async () => {
  const { SIM, neueSim, inhalt, hoechstpunkte, zahlStimmt } = await import("../js/klausursim.js");
  for (const [fach, d] of Object.entries(SIM)) {
    if (d.nurFest) assert.ok((d.klausuren || []).length >= (d.mindestKlausuren ?? 3), `${fach}: zu wenige Probeklausuren`);
    const benutzt = new Set();
    for (const x of d.klausuren || []) {
      const k = neueSim(fach, "k:" + x.id, 1);
      assert.equal(k.klausur, x.id); assert.equal(k.minuten, x.minuten);
      const svs = k.teile.map((id, i) => inhalt(fach, id, k.seed, i));
      assert.equal(svs.reduce((n, s) => n + s.min, 0), x.minuten, `${x.id}: Zeiten ergeben ${x.minuten} Min.`);
      assert.equal(new Set(k.teile).size, k.teile.length, `${x.id}: Aufgabe doppelt`);
      for (const s of svs) {
        benutzt.add(s.id);
        assert.ok(!/NaN|undefined|Infinity|\[object/.test(JSON.stringify([s.sv, s.aufgaben, s.loesung, s.bewertung, s.zahlen])), `${s.id}: Rechen- oder Textfehler`);
        assert.ok(s.bewertung.length >= 2 && s.loesung.length >= 1 && s.aufgaben.length >= 1, s.id);
        for (const [p, t, erw] of s.bewertung) {
          assert.ok(p > 0 && Number.isInteger(p * 2), `${s.id}: Punkte in halben Schritten (${p})`);
          assert.ok(t && erw && erw.length > 8, `${s.id}: Merkmal mit Erwartung – „${t}“`);
        }
        for (const z of s.zahlen || []) assert.ok(zahlStimmt(z, String(z.wert).replace(".", ",")), `${s.id}: Kontrollzahl ${z.frage}`);
      }
      const max = hoechstpunkte(fach, k);
      assert.ok(max >= x.minuten * 0.3 && max <= x.minuten * 0.8, `${x.id}: ${max} Punkte für ${x.minuten} Min.`);
      if (x.punkte) assert.equal(max, x.punkte, `${x.id}: Punktsumme`);
    }
    for (const s of d.pool.filter((p) => p.fest)) assert.ok(benutzt.has(s.id), `${fach}: Aufgabe ${s.id} in keiner Probeklausur`);
  }
});

test("Selbstkontrollbogen: Stichworte je Merkmal – vollständig und passend zur Bewertung", async () => {
  const { SIM, inhalt } = await import("../js/klausursim.js");
  const { STICHWORTE } = await import("../js/klausur_stichworte.js");
  const ids = new Set();
  for (const [fach, d] of Object.entries(SIM)) for (const sv of d.pool) {
    ids.add(sv.id);
    const s = inhalt(fach, sv.id, 1, 0), st = STICHWORTE[sv.id];
    assert.ok(Array.isArray(st), `${sv.id}: Stichworte fehlen`);
    assert.equal(st.length, s.bewertung.length, `${sv.id}: ${st.length} Stichwort-Zeilen für ${s.bewertung.length} Merkmale`);
    s.bewertung.forEach(([, t, erw, w]) => {
      if (/§|Art\.|Abschn\.|R \d/.test(erw)) assert.ok(w && w.length > 15, `${sv.id}: „${t}“ braucht Stichworte`);
      if (w) for (const teil of w.split(" · ")) assert.ok(teil.trim().length > 2, `${sv.id}: leeres Stichwort in „${t}“`);
    });
  }
  for (const id of Object.keys(STICHWORTE)) assert.ok(ids.has(id), `Stichworte für unbekannten Sachverhalt ${id}`);
});

test("Probeklausuren: Teilauswahl – gleiche Zahlen, Zeit und Punkte passen sich an", async () => {
  const { SIM, neueSim, inhalt, gewaehlt, auswahlSetzen, hoechstpunkte, punkte, simView } = await import("../js/klausursim.js");
  for (const [fach, d] of Object.entries(SIM)) for (const x of d.klausuren || []) {
    const k = neueSim(fach, "k:" + x.id, 1), voll = hoechstpunkte(fach, k);
    const svs = k.teile.map((id, i) => inhalt(fach, id, k.seed, i));
    assert.ok(auswahlSetzen(k, [0]), x.id);
    assert.equal(gewaehlt(k).length, k.teile.length - 1);
    assert.equal(k.minuten, x.minuten - svs[0].min, `${x.id}: Zeit ohne Teil 1`);
    const p0 = svs[0].bewertung.reduce((a, [p]) => a + p, 0);
    assert.equal(hoechstpunkte(fach, k), voll - p0, `${x.id}: Punkte ohne Teil 1`);
    // gleiche Zahlen wie in der vollständigen Klausur
    const [id1, i1] = gewaehlt(k)[0];
    assert.deepEqual(inhalt(fach, id1, k.seed, i1).sv, svs[1].sv);
    k.haken = { [svs[0].id]: { 0: true } };
    assert.equal(punkte(fach, k), 0, "abgewählter Teil zählt nicht");
    assert.ok(!auswahlSetzen(k, k.teile.map((_, i) => i)), "mindestens ein Teil bleibt");
    auswahlSetzen(k, []);
    assert.equal(k.minuten, x.minuten);
  }
  const h = { ic: () => "", esc: (t) => String(t), inline: (t) => t, loesungZeile: (t) => t, hs: { art: "s", farbe: 0, mfarbe: 0 }, modus: "text" };
  const k = neueSim("ust", "k:ust-a", 1);
  auswahlSetzen(k, [1, 2]);
  const deck = simView(k, h);
  assert.equal((deck.match(/data-a="ksimTeil"/g) || []).length, k.teile.length, "alle Teile wählbar");
  assert.ok(deck.includes("(Auswahl)") && deck.includes(`${k.minuten} Minuten`));
  const lauf = simView({ ...k, phase: "laufend", start: Date.now() }, h);
  assert.equal((lauf.match(/class="ks-blatt ks-sv"/g) || []).length, k.teile.length - 2);
  assert.ok(!lauf.includes(`id="ks-${k.teile[1]}"`), "abgewählter Teil fehlt");
  assert.ok(lauf.includes(">Sachverhalt 4<") && !lauf.includes(">Sachverhalt 2<"), "Nummern wie in der vollständigen Klausur");
});

test("Klausursimulation: Handschrift – Blätter je Sachverhalt, Auswertung zeigt die Zeichnung", async () => {
  const { simView, neueSim } = await import("../js/klausursim.js");
  const HS = await import("../js/handschrift.js");
  const { teile, seed } = neueSim("bsr", "k:bsr-b", 1), id = teile[0];
  const z = { g: "l", s: [{ w: "s", c: 1, p: [[10, 20, 7], [60, 25, 7], [120, 30, 7]] }] };
  const code = HS.kodieren(z);
  const h = { ic: () => "", esc: (t) => String(t), inline: (t) => t, loesungZeile: (t) => t, hs: { art: "s", farbe: 0, mfarbe: 0 }, modus: "text" };
  const k = { fach: "bsr", minuten: 180, seed, teile, phase: "laufend", start: 1, text: {}, zahlen: {}, haken: {}, modi: { [id]: "hand" }, hand: { [id]: [code, ""] } };
  const laufend = simView(k, h);
  assert.ok(laufend.includes(`data-ksim-hs="${id}|0"`) && laufend.includes(`data-ksim-hs="${id}|1"`), "zwei Blätter");
  assert.ok(laufend.includes(`data-a="ksimBlatt" data-v="${id}"`) && laufend.includes('data-a="hsWerkzeug"'));
  assert.ok(laufend.includes(`data-ksim-text="${teile[1]}"`), "übrige Sachverhalte bleiben im Tippmodus");
  const fertig = simView({ ...k, phase: "abgegeben", ende: 2 }, h);
  assert.equal((fertig.match(/ks-hs-bild/g) || []).length, 1, "nur das beschriebene Blatt erscheint");
  assert.ok(!fertig.includes("data-ksim-hs"));
});

test("Generalprobe Online-Test: 4 × 15 Fragen, rechnen sauber, Bewertung, drei Durchgänge ohne Wiederholung", async () => {
  const OT = await import("../js/bilr/onlinetest.js");
  assert.ok(OT.sichtbar(new Date(2026, 10, 9, 8)) && OT.sichtbar(new Date(2026, 10, 10, 23)) && !OT.sichtbar(new Date(2026, 10, 11, 0, 1)) && !OT.sichtbar(new Date(2026, 10, 8, 23)));
  // Wirkungen der Geschäftsvorfälle
  const w = OT.wirkung({ soll: [["Mietaufwand", 100], ["Entnahmen", 50]], haben: [["Bank", 150]] });
  assert.deepEqual([w.ek, w.guv, w.bilanz, w.zm, w.gv], [-150, -100, -150, -150, -150]);
  const t = OT.wirkung({ soll: [["Darlehen", 500]], haben: [["Bank", 500]] });
  assert.deepEqual([t.ek, t.guv, t.bilanz, t.zm, t.gv], [0, 0, -500, -500, 0]); // Auszahlung, aber keine Ausgabe
  const gesehen = new Set();
  for (let seed = 1; seed <= 150; seed++) {
    const fr = OT.testErzeugen(seed);
    assert.equal(fr.length, 60);
    for (const typ of ["sc", "mc", "luecke", "zahl"]) assert.equal(fr.filter((f) => f.typ === typ).length, OT.JE_TYP, typ);
    assert.equal(JSON.stringify(fr), JSON.stringify(OT.testErzeugen(seed)), "deterministisch");
    for (const f of fr) {
      gesehen.add(f.nr);
      assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(f)), `Frage ${f.nr}: Rechenfehler`);
      let a;
      if (f.typ === "sc") { a = f.richtig; assert.ok(f.optionen[a] && new Set(f.optionen).size === f.optionen.length, `Frage ${f.nr}: Optionen`); }
      else if (f.typ === "mc") { a = f.richtig; assert.ok(a.length >= 1 && a.length < f.optionen.length && new Set(f.optionen).size === f.optionen.length, `Frage ${f.nr}: MC`); }
      else if (f.typ === "zahl") { a = f.wert.toLocaleString("de-DE"); assert.ok(Number.isInteger(f.wert), `Frage ${f.nr}: Zahl`); }
      else {
        const s = (seite) => [...f.zeilen[seite]].reverse().map(([k, b], i) => [[`${seite}${i}k`, k], [`${seite}${i}b`, String(b)]]).flat();
        a = Object.fromEntries([...s("soll"), ...s("haben")]);
        const sum = (l) => l.reduce((x, [, b]) => x + b, 0);
        assert.equal(sum(f.zeilen.soll), sum(f.zeilen.haben), `Frage ${f.nr}: Soll ≠ Haben`);
        assert.ok(f.zeilen.soll.concat(f.zeilen.haben).every(([k, b]) => f.konten.includes(k) && f.betraege.includes(b) && b > 0), `Frage ${f.nr}: Auswahl fehlt`);
        const leer = `soll${f.zeilenZahl - 1}k`;
        if (f.zeilen.soll.length < f.zeilenZahl) assert.equal(OT.bewerten(f, { ...a, [leer]: "Kasse" }), f.punkte - 0.25);
      }
      assert.equal(OT.bewerten(f, a), f.punkte, `Frage ${f.nr}`);
      assert.equal(OT.bewerten(f, undefined), 0);
    }
  }
  // eine Runde (3 Durchgänge): keine feste Vorlage, kein Geschäftsvorfall-Lückentext und keine Aussage doppelt
  for (let seed = 1; seed <= 100; seed++) {
    let ohne = []; const aussagen = new Set();
    for (let d = 0; d < OT.RUNDE; d++) {
      const fr = OT.testErzeugen(seed * 3 + d, ohne, d), fest = fr.filter((f) => !f.familie && !(f.nr >= 140 && f.nr < 150)).map((f) => f.nr);
      assert.ok(fest.every((n) => !ohne.includes(n)), `Runde ${seed}, Durchgang ${d + 1}: Vorlage doppelt`);
      for (const f of fr) if (f.nr >= 140 && f.nr < 150) for (const o of f.optionen) { assert.ok(!aussagen.has(o), "Aussage doppelt: " + o); aussagen.add(o); }
      ohne = [...ohne, ...fr.map((f) => f.nr)];
      for (const f of fr) gesehen.add(f.nr);
    }
  }
  for (const v of OT.ALLE_VORLAGEN) assert.ok(gesehen.has(v.nr), "nie gezogen: " + v.nr);
  assert.equal(OT.zahlLesen("−2.500"), -2500);
  assert.equal(OT.zahlLesen("12.345,50 €"), 12345.5);
});

test("Denkfehler-Radar: verfälschte Musterlösungen lösen die passende Diagnose aus, richtige keine", async () => {
  const { diagnose } = await import("../js/denkfehler.js");
  const G = await import("../js/geld.js");
  const zeilen = (l, tausch = false) => [...l.soll.map(([k, c]) => ({ seite: tausch ? "haben" : "soll", konto: k, betrag: G.text(c) })), ...l.haben.map(([k, c]) => ({ seite: tausch ? "soll" : "haben", konto: k, betrag: G.text(c) }))];
  const r = new Zufall(7); let seiten = 0, brutto = 0, geprueft = 0;
  for (const v of ALLE) {
    const f = v.erzeugen(r); if (f.typ !== "buchung") continue;
    const l = f.loesungen[0]; geprueft++;
    assert.deepEqual(diagnose(zeilen(l), l), [], `${v.id}: Musterlösung ohne Diagnose`);
    const d = diagnose(zeilen(l, true), l);
    if (JSON.stringify([...l.soll].sort()) !== JSON.stringify([...l.haben].sort())) { assert.equal(d[0]?.id, "seiten", `${v.id}: vertauscht`); seiten++; }
    // Brutto statt netto: Vorsteuer weglassen und auf das erste andere Sollkonto schlagen
    const vst = l.soll.find(([k]) => k === "vorsteuer"), anderes = l.soll.find(([k]) => k !== "vorsteuer");
    if (vst && anderes && l.soll.filter(([k]) => k === anderes[0]).length === 1) {
      const fal = { soll: l.soll.filter(([k]) => k !== "vorsteuer").map(([k, c]) => [k, k === anderes[0] ? c + vst[1] : c]), haben: l.haben };
      assert.ok(diagnose(zeilen(fal), l).some((x) => x.id === "brutto"), `${v.id}: brutto`); brutto++;
    }
  }
  assert.ok(geprueft > 50 && seiten > 50 && brutto > 5, `${geprueft}/${seiten}/${brutto}`);
  // Privat als Aufwand
  const l = { soll: [["privatentnahmen", 12000]], haben: [["bank", 12000]] };
  assert.equal(diagnose([{ seite: "soll", konto: "telefon", betrag: "120,00" }, { seite: "haben", konto: "bank", betrag: "120,00" }], l)[0].id, "privat-als-aufwand");
});

test("Frag mich ab: geeignete Aufgaben lassen sich vollständig vorlesen", async () => {
  const AB = await import("../js/abfrage.js");
  const r = new Zufall(3); let n = 0;
  for (const v of ALLE) {
    const f = v.erzeugen(r); if (!AB.geeignet(f)) continue; n++;
    const t = AB.teile(f);
    assert.ok(t.frage.length > 10 && t.loesung.length > 5, v.id);
    assert.ok(!/§|Abs\\.|undefined|NaN/.test(t.frage + t.loesung), `${v.id}: ${t.loesung.slice(0, 80)}`);
  }
  assert.ok(n > 200, "geeignet: " + n);
});

test("Kalender-Export: Klausurtermine und tägliche Erinnerung als gültige .ics-Datei", async () => {
  const { icsErzeugen } = await import("../js/termine.js");
  const jetzt = new Date(2026, 10, 9, 12).getTime();
  const ics = icsErzeugen({ a: { fach: "bsr", titel: "Klausur", datum: "2026-11-18" }, b: { fach: "ao", datum: "2026-11-01" }, c: { fach: "ust", datum: "2026-12-01", x: 1 } }, { name: (f) => f.toUpperCase(), jetzt });
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/); assert.match(ics, /END:VCALENDAR\r\n$/);
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 2, "nur kommende, nicht gelöschte + Erinnerung");
  assert.match(ics, /DTSTART;VALUE=DATE:20261118\r\nDTEND;VALUE=DATE:20261119/);
  assert.match(ics, /RRULE:FREQ=DAILY;UNTIL=20261118T235959/);
  assert.match(ics, /SUMMARY:Klausur BSR/);
});

test("Suche: Fragewörter, Wortstämme und Normzitate ohne §", async () => {
  const S = await import("../js/suche.js");
  assert.equal(S.stamm("rueckstellungen"), "rueckstellung");
  assert.equal(S.stamm("abschreibungen"), "abschreibung");
  assert.equal(S.stamm("steuerpflichtigen"), "steuerpflichtig");
  assert.equal(S.stamm("afa"), "afa");
  assert.ok(["was", "ist", "wann", "welche", "gilt"].every((w) => S.STOPP.has(w)));
  assert.deepEqual(S.zitatAus("15 ustg"), { art: "§", nr: "15", gesetz: "ustg" });
  assert.deepEqual(S.zitatAus("§ 6 Abs. 2 EStG"), { art: "§", nr: "6", gesetz: "estg" });
  assert.deepEqual(S.zitatAus("Art. 63"), { art: "art", nr: "63", gesetz: "" });
  assert.equal(S.zitatAus("2026"), null);
  assert.ok(S.seltenheit(1, 1000) > S.seltenheit(500, 1000));
});

test("Schaubilder: gültige Themen, Knoten und Darstellung ohne Fehler", async () => {
  const S = await import("../js/schaubilder.js");
  const { KOMPAKT } = await import("../js/kompakt.js");
  let n = 0;
  for (const [id, liste] of Object.entries(S.SCHAUBILDER)) {
    assert.ok(THEMA[id], `Schaubild für unbekanntes Thema ${id}`);
    assert.ok(liste.length > 0, id);
    liste.forEach((s, i) => {
      assert.ok(s.knopf && s.titel && s.art, `${id}#${i}: knopf, titel, art`);
      if (s.art === "fluss") {
        const ids = new Set(s.knoten.map((k) => k.id));
        for (const p of s.pfeile || []) assert.ok(ids.has(p.von) && ids.has(p.nach), `${id}#${i}: Pfeil ${p.von} → ${p.nach}`);
        for (const k of s.knoten) assert.ok(k.x >= 0 && k.x <= (s.w || 360) && k.y >= 0 && k.y <= (s.h || 240), `${id}#${i}: Knoten ${k.id} außerhalb`);
      }
      const html = S.schaubildBlatt(id, i, (t) => t);
      assert.ok(html.length > 100 && !/undefined|NaN/.test(html), `${id}#${i}: Darstellung`);
      n++;
    });
    // nicht Teil des Vorlesens: keine data-hoer-Markierung, nicht in den Daten des Kompaktwissens
    assert.ok(!S.schaubildKnoepfe(id).includes("data-hoer"), `${id}: Schaubild-Knopf wird vorgelesen`);
    assert.ok(!("schaubilder" in KOMPAKT[id]), id);
  }
  assert.ok(n >= 60, `nur ${n} Schaubilder`);
});

test("Textsatz: Typografie, Listen, Nummerierung, Rechenweg – für alle Aufgaben ohne Textverlust", async () => {
  const S = await import("../js/satz.js");
  assert.equal(S.typografie("Kauf i.H.v. 500 € , z.B. bar"), "Kauf i. H. v. 500 €, z. B. bar");
  assert.equal(S.typografie("AB + Zugänge ./. Endbestand"), "AB + Zugänge − Endbestand");
  assert.equal(S.typografie("§ 2 Abs.1 S.1"), "§ 2 Abs. 1 S. 1");
  assert.equal(S.typografie("26.500 € - 4.500 €"), "26.500 € − 4.500 €");
  const h = S.satz("Vorspann: Text\n1. Erstens\n• a\n  – a1\n2. Zweitens\n\nA: 100 €\n+ B: 50 €\n= C: 150 €");
  assert.match(h, /ts-etikett">Vorspann:/); assert.match(h, /<ol class="ts-num">/); assert.match(h, /ts-unter/); assert.match(h, /ts-r summe/);
  const { ALLE } = await import("../js/katalog.js");
  const bz = (x) => (x.match(/[A-Za-zÄÖÜäöüß]/g) || []).length;
  for (const v of ALLE) {
    const f = v.erzeugen(new Zufall(3));
    for (const k of ["text", "antwort", "erklaerung"]) {
      if (typeof f[k] !== "string") continue;
      const out = S.satz(f[k]), offen = (out.match(/<(div|p|ul|ol|li|span|b)\b/g) || []).length, zu = (out.match(/<\/(div|p|ul|ol|li|span|b)>/g) || []).length;
      assert.equal(offen, zu, `${v.id}/${k}: Tags`);
      assert.ok(bz(out.replace(/<[^>]+>/g, "")) >= bz(f[k]) - 6, `${v.id}/${k}: Text verloren`);
    }
  }
});

test("Bewertungsrecht: Vervielfältiger (Anlage 21), Ertragswert, Härteausgleich, Verschonung", async () => {
  const R = await import("../js/bewr/rechnen.js");
  // Stichproben aus Anlage 21 BewG (Stand 2026): [Jahre, Zinssatz, Tabellenwert]
  for (const [n, z, w] of [[1, 1, 0.9901], [23, 4.5, 14.1478], [24, 4.5, 14.4955], [26, 3.5, 16.8904], [30, 5.5, 14.5337], [50, 3.5, 23.4556], [100, 10, 9.9993], [60, 5, 18.9293]])
    assert.equal(R.vervielfaeltiger(n, z), w, `Anlage 21: ${n} Jahre, ${z} %`);
  // Lösungsvorschlag Hauptklausur 2025 (Stichtag 2024): Bewirtschaftungskosten, Steuer mit Härteausgleich, Verschonung
  const e = R.ertragswert({ flaeche: 270, brw: 800, mieteWohnJahr: 68400, mieteGewerbeJahr: 25200, wohnungen: 6, wohnQm: 600, gewerbeQm: 200, baujahr: 1967, jahr: 2024, gnd: 80, liz: R.liegenschaftszins(600, 200), vpi: [117.8, 77.1] });
  assert.deepEqual([e.ix.verwaltungJeWohnung, e.ix.instandJeQm, e.bwk, e.reinertrag, e.verzinsung, e.gebaeudereinertrag, e.rndRegel, e.rndMin], [351, 13.8, 16278, 77322, 9720, 67602, 23, 24]);
  assert.equal(R.liegenschaftszins(600, 200), 4.5); assert.equal(R.liegenschaftszins(300, 450), 5); assert.equal(R.liegenschaftszins(400, 400), 4.5);
  assert.equal(R.grundstuecksart(480, 120), "gemischt"); assert.equal(R.grundstuecksart(481, 119), "mietwohn"); assert.equal(R.grundstuecksart(100, 900), "geschaeft");
  // Abbruchverpflichtung begrenzt die Restnutzungsdauer auch unter die 30-%-Mindestdauer (§ 185 Abs. 3 S. 7 BewG)
  assert.equal(R.ertragswert({ ...{ flaeche: 270, brw: 800, mieteWohnJahr: 68400, mieteGewerbeJahr: 25200, wohnungen: 6, wohnQm: 600, gewerbeQm: 200, baujahr: 1967, jahr: 2024, gnd: 80, liz: 4.5, vpi: [117.8, 77.1] }, abbruchGnd: 57 + 10 }).rnd, 10);
  assert.equal(R.erbst(75800, 1).steuer, 5650); assert.equal(R.erbst(1301300, 2).steuer, 390390); assert.equal(R.erbst(301000, 1).steuer, 33500);
  assert.equal(R.erbst(75000, 3).steuer, 22500); assert.equal(R.erbst(6000100, 3).steuer, 1800075);
  const v = R.verschonung(2100000, 450000);
  assert.deepEqual([v.unschaedlich, v.schaedlich, v.beguenstigt, v.abschlag, v.abzug, v.steuerpflichtig], [165000, 285000, 1815000, 1542750, 88875, 468375]);
  assert.equal(R.verschonung(1000000, 950000).steuerpflichtig, 1000000, "≥ 90 % Verwaltungsvermögen: nichts begünstigt");
  assert.equal(R.verschonung(1800000, 216000, { option: true }).steuerpflichtig, 57600);
  assert.equal(R.verschonung(1800000, 400000, { option: true }).option, false, "Option scheitert über 20 %");
  assert.equal(R.abrunden100(437880), 437800);
});

test("Selbstkontrollbogen: Teilpunkte – Bausteine passen, volle Punktzahl erreichbar, Summe begrenzt", async () => {
  const { SIM, inhalt, merkmalPunkte, punkte, neueSim } = await import("../js/klausursim.js");
  const { TEILPUNKTE } = await import("../js/klausur_teilpunkte.js");
  for (const [id, m] of Object.entries(TEILPUNKTE)) {
    const fach = Object.keys(SIM).find((f) => SIM[f].pool.some((s) => s.id === id));
    assert.ok(fach, "Teilpunkte für unbekannten Sachverhalt " + id);
    const s = inhalt(fach, id, 1, 0);
    for (const [j, tp] of Object.entries(m)) {
      const b = s.bewertung[j];
      assert.ok(b, `${id}: Merkmal ${j} fehlt`);
      assert.ok(tp.length >= 2, `${id} ${j}: mindestens zwei Bausteine`);
      for (const [text, w] of tp) assert.ok(text.length > 3 && w > 0 && w <= b[0] && Number.isInteger(w * 2), `${id} ${j}: Baustein „${text}“`);
      assert.ok(tp.reduce((a, [, w]) => a + w, 0) >= b[0], `${id} ${j}: volle Punktzahl nicht erreichbar`);
      assert.deepEqual(b[4], tp);
      const alle = { tp: { [id]: { [j]: tp.map((_, i) => i) } } };
      assert.equal(merkmalPunkte(alle, id, j, b), b[0], `${id} ${j}: alle Bausteine = volle Punkte`);
      assert.equal(merkmalPunkte({ tp: { [id]: { [j]: [0] } } }, id, j, b), Math.min(b[0], tp[0][1]));
    }
  }
  // Ganze Klausur: alles angetippt bzw. abgehakt ergibt die Höchstpunktzahl
  const k = neueSim("pr", "k:pr-a", 1);
  k.haken = {}; k.tp = {};
  k.teile.forEach((id, i) => inhalt("pr", id, k.seed, i).bewertung.forEach((b, j) => {
    if (b[4]) ((k.tp[id] ||= {})[j] = b[4].map((_, x) => x)); else ((k.haken[id] ||= {})[j] = true);
  }));
  assert.equal(punkte("pr", k), 70);
});

test("Begriffsverzeichnis: jede zitierte Fundstelle ist als Gesetzestext vorhanden, Überblicke und Lernpfad zeigen Begriffe", async () => {
  const B = await import("../js/begriffe.js"), N = await import("../js/oer/normtext.js"), L = await import("../js/lernpfad.js");
  for (const [fach, liste] of Object.entries(B.BEGRIFFE)) for (const [re, name, def] of liste) {
    assert.ok(re instanceof RegExp && name && def.length > 30, `${fach}: ${name}`);
    assert.ok(N.normenAusText(def).length > 0, `${fach}: ${name} ohne Fundstelle, die es in der App gibt`);
    for (const z of N.zitate(def)) {
      const x = N.norm([z.g, z.nr, z.abs].filter(Boolean).join(" "));
      assert.ok(x, `${fach}: ${name} zitiert ${z.g} ${z.nr} ${z.abs || ""} – Text fehlt in der App`);
      if (z.satz && x.absaetze.length === 1) assert.ok(Number(z.satz) <= N.saetze(x.absaetze[0].text).length, `${fach}: ${name} – Satz ${z.satz} gibt es in ${x.label} nicht`);
    }
  }
  assert.deepEqual(B.begriffeIm("ust", "Der Unternehmer liefert im Inland.").map((b) => b.name), ["Unternehmer", "Inland"]);
  assert.equal(B.begriffeIm("pr", "Der Unternehmer kauft ein.")[0].text.includes("§ 14 Abs. 1 BGB"), true, "Unternehmer im Privatrecht nach BGB");
  const block = L.PFADE.ust.bloecke[0];
  assert.equal(block.karten.at(-1).art, "begriffe");
});

test("Überblick ist mindestens so vollständig wie der Lernpfad: jeder im Lernpfad zitierte Paragraf steht auch in einem Überblick des Moduls", async () => {
  const L = await import("../js/lernpfad.js"), K = await import("../js/kompakt.js"), N = await import("../js/oer/normtext.js"), kern = await import("../js/kern.js");
  const para = (text) => new Set(N.normenAusText(text).map((r) => r.split(" ").slice(0, 2).join(" ")));
  for (const fach of ["ust", "est", "oer", "bsr", "bbf", "ao", "pr", "bewr"]) {
    const ids = kern.THEMEN.filter((t) => kern.themaIn(t.id, fach)).map((t) => t.id);
    const ueberblick = para(ids.map((i) => JSON.stringify(K.KOMPAKT[i] || "")).join(" "));
    for (const b of L.PFADE[fach].bloecke) {
      const text = JSON.stringify({ k: b.karten.filter((c) => c.art !== "begriffe"), f: b.fragen });
      const fehlt = [...para(text)].filter((r) => !ueberblick.has(r));
      assert.deepEqual(fehlt, [], `${fach}/${b.id}: im Lernpfad zitiert, in keinem Überblick`);
    }
  }
});
