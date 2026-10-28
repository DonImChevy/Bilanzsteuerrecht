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
  const { planen, faellige, naechste, tagPlus } = await import("../js/wiederholung.js");
  const t0 = new Date(2026, 9, 19, 15, 30).getTime();
  let e = planen(undefined, true, t0);
  assert.deepEqual(e, { fach: 1, faellig: tagPlus(t0, 1), t: t0 });
  assert.equal(new Date(e.faellig).getDate(), 20);
  assert.equal(new Date(e.faellig).getHours(), 0);
  const tage = [];
  for (let i = 0; i < 6; i++) { e = planen(e, true, t0); tage.push(e.fach); }
  assert.deepEqual(tage, [2, 3, 4, 5, 5, 5]);
  assert.equal(new Date(e.faellig).getMonth(), 10); // 35 Tage später → November
  assert.deepEqual(planen(e, false, t0), { fach: 1, faellig: tagPlus(t0, 1), t: t0, falsch: true });
  assert.ok(!planen(planen(e, false, t0), true, t0).falsch, "richtig beantwortet → nicht mehr unter „Meine Fehler“");
  assert.ok(!planen(undefined, true, t0).falsch);
  const lern = { a: { fach: 1, faellig: t0 - 10 }, b: { fach: 2, faellig: t0 - 99 }, c: { fach: 3, faellig: t0 + 5 } };
  assert.deepEqual(faellige(lern, ["a", "b", "c", "d"], t0), ["b", "a"]);
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
  assert.deepEqual(aktiveModule().map((m) => m.id), ["bsr", "oer", "est", "ust", "bbf"]);
  assert.deepEqual(aktiveModule("studium").map((m) => m.id), ["bsr", "oer", "est", "ust"]);
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
  for (const fach of ["ust", "est", "oer", "bsr1", "bsr2", "bbf"]) assert.ok(PFADE[fach]?.bloecke.length >= 8, "Lernpfad fehlt: " + fach);
  const ids = new Set();
  for (const b of ["ust", "est", "oer", "bsr1", "bsr2", "bbf"].flatMap((f) => PFADE[f].bloecke)) {
    assert.ok(!ids.has(b.id), "doppelt: " + b.id); ids.add(b.id);
    assert.ok(b.karten.length >= 3 && b.fragen.length >= 3, b.id + ": zu wenig Karten oder Fragen");
    for (const r of b.normen) assert.ok(norm(r), `${b.id}: Norm ${r} fehlt`);
    for (const k of b.karten) assert.ok(["merksatz", "erklaerung", "beispiel", "klausur"].includes(k.art) && k.titel && k.text, b.id);
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
  for (const fach of ["bsr", "oer", "est", "ust"]) for (const id of KLAUSURPLAN[fach].top) assert.equal(THEMA[id].fach, fach);
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
    for (const fach of ["bsr", "oer", "est", "ust"]) {
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
  for (const fach of ["bsr", "oer", "est", "ust", "bbf"]) {
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
