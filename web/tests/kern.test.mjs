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
  assert.deepEqual(aktiveModule().map((m) => m.id), ["bsr", "oer", "est", "ust"]);
  assert.ok(MODULE.length === 7 && !MODUL.asv && MODUL.ust.kurz === "USt" && MODUL.bsr.kurz === "BilR" && MODUL.pr.kurz === "PrivR");
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
  handy.einstellungen = { ziel: "30", design: "dark", teil: "1", oerModus: "mc", t: 800 };
  ipad.einstellungen = { ziel: "20", design: "system", teil: "beide", oerModus: "qa", t: 0 };
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
  for (const fach of ["ust", "est", "oer", "bsr1", "bsr2"]) assert.ok(PFADE[fach]?.bloecke.length >= 8, "Lernpfad fehlt: " + fach);
  const ids = new Set();
  for (const b of ["ust", "est", "oer", "bsr1", "bsr2"].flatMap((f) => PFADE[f].bloecke)) {
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
