// Ausführen: node --test web/tests
import test from "node:test";
import assert from "node:assert/strict";
import * as G from "../js/geld.js";
import { Zufall, pruefeBuchung, bewerte, satz, summe, THEMEN, loesungText } from "../js/kern.js";
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
  assert.ok(k.filter((f) => f.typ === "buchung").length >= 12);
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
  assert.deepEqual(e, { fach: 1, faellig: tagPlus(t0, 1) });
  assert.equal(new Date(e.faellig).getDate(), 20);
  assert.equal(new Date(e.faellig).getHours(), 0);
  const tage = [];
  for (let i = 0; i < 6; i++) { e = planen(e, true, t0); tage.push(e.fach); }
  assert.deepEqual(tage, [2, 3, 4, 5, 5, 5]);
  assert.equal(new Date(e.faellig).getMonth(), 10); // 35 Tage später → November
  assert.deepEqual(planen(e, false, t0), { fach: 1, faellig: tagPlus(t0, 1) });
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
  assert.deepEqual(aktiveModule().map((m) => m.id), ["bsr", "oer"]);
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
});
