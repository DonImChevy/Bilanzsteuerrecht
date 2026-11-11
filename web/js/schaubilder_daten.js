// Inhalte der Schaubilder je Thema (Thema-ID aus kern.js → Liste). Jedes Schaubild: knopf (Beschriftung des Knopfs),
// titel, text (ein Satz zur Regel, **fett** und Normzitate wie im Kompaktwissen), art + Daten (siehe schaubilder.js),
// optional merke und legende. Farben: a Indigo · b Grün · c Amber · d Rot · e Blau · f Violett · n Grau.
// Fachlich: nur, was auch im Kompaktwissen bzw. im Gesetz steht; Rechtsstand 2026.

const LG = [["b", "Leistung / Ware"], ["c", "Geld"]];

// Gemeinsam genutzt: AfA im Anschaffungsjahr (Bilanzrecht und Buchführung)
const AFA_MONATE = {
  knopf: "AfA im ersten Jahr", titel: "AfA monatsgenau",
  text: "Im Anschaffungsjahr gibt es die Jahres-AfA nur **zeitanteilig**: Der Monat der Lieferung zählt voll mit (§ 7 Abs. 1 S. 4 EStG).",
  art: "achse", min: 0, max: 12, pfeil: false,
  ticks: [[0, "Jan"], [3, "Apr"], [6, "Jul"], [9, "Okt"], [12, "31.12."]],
  reihen: [{ t: "Lieferung 10.07. · AK 12.000 € · ND 10 Jahre", spannen: [
    { a: 0, b: 6, t: "noch nicht im Betrieb", f: "n" }, { a: 6, b: 12, t: "6 Monate AfA", f: "b" }] }],
  marken: [{ v: 6, t: "Lieferung 10.07.", sub: "Juli zählt voll", f: "c" }, { v: 12, t: "AfA Jahr 1", sub: "1.200 € × 6/12 = 600 €", f: "b" }],
  merke: "Maßgeblich ist die **Lieferung** (Verschaffung der Verfügungsmacht), nicht Kaufvertrag oder Zahlung.",
};

export const SCHAUBILDER = {
  // =============================================================================================
  // Bilanzrecht / Buchführung
  grundbegriffe: [{
    knopf: "Zahlung ≠ Aufwand", titel: "Auszahlung, Ausgabe, Aufwand, Kosten",
    text: "Vier Begriffe, vier verschiedene Fragen: Fließt Geld? Sinkt das Geldvermögen? Sinkt das Eigenkapital? Ist es betrieblicher Werteverzehr?",
    art: "matrix", ecke: "Vorfall", spalten: ["Auszahlung", "Ausgabe", "Aufwand", "Kosten"],
    zeilen: [
      { t: "Maschine bar gekauft", zellen: [{ t: "✓", f: "b" }, { t: "✓", f: "b" }, { t: "✗", f: "n" }, { t: "✗", f: "n" }] },
      { t: "Maschine auf Ziel gekauft", zellen: [{ t: "✗", f: "n" }, { t: "✓", f: "b" }, { t: "✗", f: "n" }, { t: "✗", f: "n" }] },
      { t: "Darlehen per Bank getilgt", zellen: [{ t: "✓", f: "b" }, { t: "✗", f: "n" }, { t: "✗", f: "n" }, { t: "✗", f: "n" }] },
      { t: "AfA auf die Maschine", zellen: [{ t: "✗", f: "n" }, { t: "✗", f: "n" }, { t: "✓", f: "b" }, { t: "✓", f: "b" }] },
      { t: "Miete Dezember bar gezahlt", zellen: [{ t: "✓", f: "b" }, { t: "✓", f: "b" }, { t: "✓", f: "b" }, { t: "✓", f: "b" }] },
      { t: "Spende bar gezahlt", zellen: [{ t: "✓", f: "b" }, { t: "✓", f: "b" }, { t: "✓", f: "b" }, { t: "✗ neutral", f: "d" }] },
    ],
    merke: "Auszahlung = Kasse/Bank sinkt · Ausgabe = Geldvermögen (Zahlungsmittel + Forderungen − Verbindlichkeiten) sinkt · Aufwand = Eigenkapital sinkt (§ 242 Abs. 2 HGB).",
  }],
  buchfuehrungspflicht: [{
    knopf: "Muss er Bücher führen?", titel: "Buchführungspflicht prüfen",
    text: "Erst das Handelsrecht, dann das Steuerrecht: § 140 AO übernimmt die HGB-Pflicht, § 141 AO erfasst große Gewerbetreibende, die keine Kaufleute sind.",
    art: "stufen", schritte: [
      { t: "Ist er Kaufmann?", sub: "Istkaufmann (§ 1 HGB), Kannkaufmann (§ 2 HGB), Formkaufmann (GmbH, AG)", f: "a" },
      { zweig: [
        { titel: "Ja – Kaufmann", f: "a", schritte: ["Einzelkaufmann mit höchstens 800.000 € Umsatz und 80.000 € Jahresüberschuss an zwei Stichtagen? → befreit (§ 241a HGB)", "sonst Pflicht nach § 238 HGB", "→ gilt auch steuerlich (§ 140 AO)"] },
        { titel: "Nein – kein Kaufmann", f: "e", schritte: ["Gewerbe oder Land- und Forstwirtschaft mit Umsatz > 800.000 € oder Gewinn > 80.000 €? → Pflicht nach § 141 AO, ab dem Jahr nach der Mitteilung des Finanzamts", "Freiberufler: nie § 141 AO"] }] },
      { t: "Keine Pflicht?", sub: "Gewinn per Einnahmenüberschussrechnung (§ 4 Abs. 3 EStG)", f: "n" }],
  }],
  inventurBilanz: [{
    knopf: "Inventur → Inventar → Bilanz", titel: "Vom Zählen zur Bilanz",
    text: "Erst wird gezählt (Inventur), dann ausführlich aufgelistet (Inventar), dann knapp gegenübergestellt (Bilanz) – und links muss gleich rechts sein.",
    art: "fluss", w: 360, h: 236,
    knoten: [
      { id: "i", x: 64, y: 50, t: "Inventur", sub: "zählen, messen,\nwiegen (§ 240)", f: "e" },
      { id: "v", x: 180, y: 50, t: "Inventar", sub: "ausführliches\nVerzeichnis", f: "a" },
      { id: "b", x: 296, y: 50, t: "Bilanz", sub: "kurz, Kontoform\n(§ 242, § 266)", f: "b" },
      { id: "ak", x: 112, y: 182, t: "Aktiva", sub: "Mittelverwendung:\nVermögen", w: 132, f: "b" },
      { id: "pa", x: 248, y: 182, t: "Passiva", sub: "Mittelherkunft:\nEK + Schulden", w: 132, f: "b" }],
    pfeile: [{ von: "i", nach: "v", f: "a" }, { von: "v", nach: "b", f: "a" }, { von: "b", nach: "ak", f: "n", str: 1 }, { von: "b", nach: "pa", f: "n", str: 1 }],
    notizen: [{ x: 180, y: 182, t: "=", f: "b" }, { x: 180, y: 228, t: "Bilanzsumme links = Bilanzsumme rechts", klein: 1 }],
  }],
  bilanzveraenderungen: [{
    knopf: "Aktivtausch, Passivtausch & Co.", titel: "Die vier Bilanzveränderungen",
    text: "Jeder Geschäftsvorfall berührt **zwei Posten** – entweder auf derselben Seite (Tausch) oder auf beiden Seiten (Mehrung bzw. Minderung).",
    art: "bilanz", bilanzen: [
      { titel: "Aktivtausch", f: "e", aktiva: [["Maschinen", "+"], ["Bank", "−"]], passiva: [], summe: "bleibt gleich", bsp: "Maschine per Bank bezahlt" },
      { titel: "Passivtausch", f: "f", aktiva: [], passiva: [["Darlehen", "+"], ["Verb. aLuL", "−"]], summe: "bleibt gleich", bsp: "Lieferantenschuld in ein Darlehen umgewandelt" },
      { titel: "Aktiv-Passiv-Mehrung", f: "b", aktiva: [["Waren", "+"]], passiva: [["Verb. aLuL", "+"]], summe: "steigt", bsp: "Ware auf Ziel eingekauft" },
      { titel: "Aktiv-Passiv-Minderung", f: "d", aktiva: [["Bank", "−"]], passiva: [["Verb. aLuL", "−"]], summe: "sinkt", bsp: "Lieferantenrechnung per Bank bezahlt" }],
  }],
  bestandskonten: [{
    knopf: "Aktiv- und Passivkonto", titel: "Wo steht was im Bestandskonto?",
    text: "Der Anfangsbestand steht auf der Seite, auf der der Posten in der Bilanz steht. **Zugänge** kommen dazu, **Abgänge** auf die Gegenseite, der Schlussbestand gleicht aus.",
    art: "tkonten", konten: [
      { name: "Bank", art: "Aktivkonto", f: "b", soll: [["Anfangsbestand", "", "b"], ["+ Zugänge"]], haben: [["− Abgänge"], ["Schlussbestand (Saldo)", "", "n"]], unter: "Aktiva stehen in der Bilanz links → Zunahme im Soll" },
      { name: "Verbindlichkeiten", art: "Passivkonto", f: "d", soll: [["− Abgänge"], ["Schlussbestand (Saldo)", "", "n"]], haben: [["Anfangsbestand", "", "d"], ["+ Zugänge"]], unter: "Passiva stehen in der Bilanz rechts → Zunahme im Haben" }],
    merke: "Buchungssatz: zuerst **Soll**, dann **Haben** – „Soll an Haben“.",
  }],
  erfolgskonten: [{
    knopf: "Vom Erfolgskonto zum Eigenkapital", titel: "Aufwand und Ertrag laufen über die GuV",
    text: "Aufwands- und Ertragskonten sind Unterkonten des Eigenkapitals. Ihre Salden sammelt das GuV-Konto, dessen Saldo ins **Eigenkapital** geht (§ 242 Abs. 2 HGB).",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "a", x: 70, y: 46, t: "Aufwandskonten", sub: "Zugang im Soll", w: 124, f: "d" },
      { id: "e", x: 290, y: 46, t: "Ertragskonten", sub: "Zugang im Haben", w: 124, f: "b" },
      { id: "g", x: 180, y: 132, t: "GuV-Konto", sub: "Soll: Aufwand · Haben: Ertrag", w: 190, f: "a" },
      { id: "k", x: 180, y: 222, t: "Eigenkapital", sub: "Gewinn ↑ · Verlust ↓", w: 140, f: "e" }],
    pfeile: [{ von: "a", nach: "g", t: "GuV an Aufwand", f: "d", dx: -16 }, { von: "e", nach: "g", t: "Ertrag an GuV", f: "b", dx: 16 }, { von: "g", nach: "k", t: "Gewinn: GuV an EK\nVerlust: EK an GuV", f: "e", dx: 78 }],
  }],
  privatkonten: [{
    knopf: "Entnahme und Einlage", titel: "Privatkonten – Betrieb und Privatbereich",
    text: "Was der Inhaber herausnimmt oder hineingibt, ändert das Eigenkapital – ist aber **kein Gewinn und kein Verlust**. Darum laufen die Privatkonten über das Eigenkapital, nicht über die GuV.",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "b", x: 60, y: 60, t: "Betrieb", w: 96, f: "a" },
      { id: "p", x: 300, y: 60, t: "Privat-\nbereich", w: 96, f: "f" },
      { id: "k", x: 180, y: 140, t: "Privatkonten", sub: "Entnahmen · Einlagen", w: 140, f: "c" },
      { id: "e", x: 180, y: 224, t: "Eigenkapital", w: 140, f: "e" }],
    pfeile: [{ von: "b", nach: "p", t: "Entnahme: Geld,\nWaren, Nutzung", f: "d", b: -44 }, { von: "p", nach: "b", t: "Einlage: Geld, Sachen", f: "b", b: -36 },
      { von: "k", nach: "e", t: "Abschluss über das EK\n(nicht über die GuV)", f: "e", dx: 84 }],
    merke: "Gewinn = Eigenkapital Ende − Eigenkapital Anfang **+ Entnahmen − Einlagen** (§ 4 Abs. 1 S. 1 EStG).",
  }],
  warenkonten: [{
    knopf: "Viergeteiltes Warenkonto", titel: "So hängen WBK, BVK, WEK und WVK zusammen",
    text: "Das WBK zeigt nur Anfangs- und Schlussbestand. Die Differenz wandert über das BVK ins WEK – dort steht am Ende der **Wareneinsatz**, im WVK stehen die Erlöse.",
    art: "fluss", w: 360, h: 262,
    knoten: [
      { id: "wbk", x: 62, y: 46, t: "WBK", sub: "AB · SB lt. Inventur", w: 112, f: "e" },
      { id: "sbk", x: 300, y: 46, t: "SBK", sub: "Schlussbestand", w: 100, f: "n" },
      { id: "bvk", x: 58, y: 146, t: "BVK", sub: "Bestands-\nveränderung", w: 100, f: "f" },
      { id: "wek", x: 196, y: 146, t: "WEK", sub: "Einkäufe →\nWareneinsatz", w: 96, f: "d" },
      { id: "wvk", x: 310, y: 146, t: "WVK", sub: "Erlöse", w: 92, f: "b" },
      { id: "guv", x: 252, y: 236, t: "GuV", sub: "Rohgewinn = Erlöse − Einsatz", w: 196, f: "a" }],
    pfeile: [{ von: "wbk", nach: "sbk", t: "SBK an WBK", f: "n" }, { von: "wbk", nach: "bvk", t: "Mehr- oder\nMinderbestand", f: "f", dx: 44 },
      { von: "bvk", nach: "wek", t: "Saldo", f: "f" }, { von: "wek", nach: "guv", t: "GuV an WEK", f: "d", dx: -34 }, { von: "wvk", nach: "guv", t: "WVK an GuV", f: "b", dx: 34 }],
    merke: "Wareneinsatz = Anfangsbestand + Einkäufe − Schlussbestand. Ein **Minderbestand** erhöht den Wareneinsatz, ein Mehrbestand senkt ihn.",
  }],
  warenunterkonten: [{
    knopf: "Wohin gehören Nachlässe?", titel: "Unterkonten im Warenverkehr",
    text: "Bezugskosten verteuern den Einkauf, erhaltene Nachlässe verbilligen ihn – gewährte Nachlässe mindern die Erlöse. Die Unterkonten werden vor dem Abschluss über WEK bzw. WVK abgeschlossen.",
    art: "fluss", w: 360, h: 220,
    knoten: [
      { id: "bk", x: 58, y: 48, t: "Bezugskosten", sub: "Fracht, Verpackung", w: 108, f: "c" },
      { id: "ne", x: 178, y: 48, t: "Nachlässe\nerhalten", sub: "Skonto, Bonus,\nRücksendung", w: 108, f: "e" },
      { id: "ng", x: 300, y: 48, t: "Nachlässe\ngewährt", sub: "Skonto, Bonus,\nRücksendung", w: 108, f: "e" },
      { id: "wek", x: 118, y: 182, t: "WEK", sub: "Wareneinkauf", w: 110, f: "d" },
      { id: "wvk", x: 300, y: 182, t: "WVK", sub: "Warenverkauf", w: 108, f: "b" }],
    pfeile: [{ von: "bk", nach: "wek", t: "+ erhöht", f: "c", dx: -26 }, { von: "ne", nach: "wek", t: "− mindert", f: "e", dx: 30 }, { von: "ng", nach: "wvk", t: "− mindert", f: "e", dx: 32 }],
    merke: "Jede Änderung des Entgelts korrigiert auch die **Vorsteuer bzw. Umsatzsteuer** (§ 17 Abs. 1 UStG). Ein Sofortrabatt wird gar nicht gebucht.",
  }],
  umsatzsteuer: [{
    knopf: "Vorsteuer, Umsatzsteuer, Zahllast", titel: "Umsatzsteuer als durchlaufender Posten",
    text: "Beim Einkauf zahlt der Unternehmer Vorsteuer (Forderung ans Finanzamt), beim Verkauf kassiert er Umsatzsteuer (Schuld ans Finanzamt). Abgeführt wird nur die **Differenz**.",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "ek", x: 70, y: 44, t: "Einkauf", sub: "netto + 19 %", f: "n" },
      { id: "vk", x: 290, y: 44, t: "Verkauf", sub: "netto + 19 %", f: "n" },
      { id: "vst", x: 62, y: 138, t: "Vorsteuer", sub: "Forderung\nan FA", w: 100, f: "e" },
      { id: "ust", x: 298, y: 138, t: "Umsatz-\nsteuer", sub: "Verbindlichkeit\nan FA", w: 100, f: "d" },
      { id: "zl", x: 180, y: 226, t: "Zahllast", sub: "USt − VSt → Bank bzw. SBK", w: 190, f: "c" }],
    pfeile: [{ von: "ek", nach: "vst", t: "VSt im Soll", f: "e", dx: 38 }, { von: "vk", nach: "ust", t: "USt im Haben", f: "d", dx: -40 },
      { von: "vst", nach: "ust", t: "Abschluss:\nUSt an VSt", f: "a" }, { von: "ust", nach: "zl", t: "Saldo", f: "c", dx: 22 }],
  }],
  abschluss: [{
    knopf: "Kontenkreislauf", titel: "Vom Eröffnungs- zum Schlussbilanzkonto",
    text: "Der Abschluss läuft immer in derselben Reihenfolge – von den Unterkonten über die GuV ins Eigenkapital und von allen Bestandskonten ins SBK.",
    art: "fluss", w: 360, h: 270,
    knoten: [
      { id: "ebk", x: 72, y: 40, t: "EBK", sub: "Eröffnung", w: 112, f: "n" },
      { id: "bst", x: 72, y: 140, t: "Bestands-\nkonten", sub: "inkl. Eigenkapital", w: 116, f: "e" },
      { id: "sbk", x: 72, y: 240, t: "SBK", sub: "→ Schlussbilanz", w: 112, f: "n" },
      { id: "uk", x: 268, y: 40, t: "Unterkonten", sub: "Privat, Bezugskosten,\nNachlässe, BVK", w: 132, f: "f" },
      { id: "erf", x: 268, y: 140, t: "Erfolgs-\nkonten", sub: "Aufwand · Ertrag", w: 116, f: "c" },
      { id: "guv", x: 268, y: 240, t: "GuV", sub: "Saldo = Gewinn", w: 112, f: "a" }],
    pfeile: [{ von: "ebk", nach: "bst", t: "①", f: "n", dx: 12 }, { von: "uk", nach: "erf", t: "② in WEK/WVK", f: "f", dx: 44 }, { von: "uk", nach: "bst", t: "② Privat → EK", f: "f", b: -14, lp: 0.42 },
      { von: "erf", nach: "guv", t: "③ Salden", f: "c", dx: 36 }, { von: "guv", nach: "bst", t: "④ Gewinn → EK", f: "a", b: 14, lp: 0.55 }, { von: "bst", nach: "sbk", t: "⑤", f: "n", dx: 12 }],
    merke: "Aktivkonten: **SBK an Konto** · Passivkonten: **Konto an SBK**.",
  }],
  kalkulation: [{
    knopf: "Kalkulationsschema", titel: "Vom Listeneinkaufspreis zum Listenverkaufspreis",
    text: "Erst wird bis zum Einstandspreis gerechnet (Einkauf), dann über die Selbstkosten zum Verkaufspreis. Kundenskonto und Kundenrabatt werden **im Hundert** gerechnet.",
    art: "stufen", schritte: [
      { t: "Listeneinkaufspreis", f: "e" }, { op: "− Liefererrabatt" }, { t: "Zieleinkaufspreis", f: "e" }, { op: "− Liefererskonto" }, { t: "Bareinkaufspreis", f: "e" },
      { op: "+ Bezugskosten" }, { t: "Einstandspreis (Bezugspreis)", sub: "= Anschaffungskosten der Ware", f: "c", ergebnis: 1 },
      { op: "+ Handlungskosten" }, { t: "Selbstkosten", f: "c" }, { op: "+ Gewinn" }, { t: "Barverkaufspreis", f: "b" },
      { op: "+ Kundenskonto (im Hundert)" }, { t: "Zielverkaufspreis", f: "b" }, { op: "+ Kundenrabatt (im Hundert)" }, { t: "Listenverkaufspreis netto", sub: "+ Umsatzsteuer", f: "b", ergebnis: 1 }],
    merke: "Im Hundert: Barverkaufspreis ÷ (100 − Skontosatz) × 100.",
  }],
  gewinnermittlung: [{
    knopf: "Betriebsvermögensvergleich", titel: "Gewinn nach § 4 Abs. 1 EStG",
    text: "Der Gewinn ist der Zuwachs des Betriebsvermögens – aber nur der betrieblich verursachte. Private Vorgänge werden herausgerechnet.",
    art: "stufen", schritte: [
      { t: "Betriebsvermögen am Ende des Jahres", f: "e" }, { op: "− Betriebsvermögen am Ende des Vorjahres" }, { t: "Unterschiedsbetrag", f: "a" },
      { op: "+ Entnahmen", f: "b" }, { op: "− Einlagen" }, { t: "Gewinn bzw. Verlust", sub: "muss dem Saldo des GuV-Kontos entsprechen", f: "b", ergebnis: 1 }],
    merke: "Entnahmen haben das Betriebsvermögen gemindert, obwohl kein Verlust entstand → **hinzurechnen**. Einlagen haben es erhöht, ohne Gewinn → **abziehen**.",
  }],
  buecher: [{
    knopf: "Beleg → Grundbuch → Hauptbuch", titel: "Der Weg einer Buchung",
    text: "Keine Buchung ohne Beleg: Das Grundbuch ordnet zeitlich, das Hauptbuch sachlich nach Konten, die Nebenbücher liefern die Einzelheiten.",
    art: "fluss", w: 360, h: 210,
    knoten: [
      { id: "be", x: 58, y: 50, t: "Beleg", sub: "Rechnung,\nKontoauszug", w: 100, f: "n" },
      { id: "gb", x: 180, y: 50, t: "Grundbuch", sub: "zeitlich\n(Journal)", w: 104, f: "e" },
      { id: "hb", x: 302, y: 50, t: "Hauptbuch", sub: "sachlich\n(Konten)", w: 100, f: "a" },
      { id: "nb", x: 302, y: 168, t: "Nebenbücher", sub: "Kontokorrent,\nAnlagen, Lohn", w: 108, f: "f" }],
    pfeile: [{ von: "be", nach: "gb", f: "n" }, { von: "gb", nach: "hb", f: "e" }, { von: "hb", nach: "nb", t: "Details zu\nSammelkonten", f: "f", beide: 1, dx: -62 }],
  }],
  "bsr-gob": [{
    knopf: "Betriebs- oder Privatvermögen?", titel: "Zuordnung nach der betrieblichen Nutzung",
    text: "Ob ein Wirtschaftsgut zum Betriebsvermögen gehört, hängt bei gemischter Nutzung vom **betrieblichen Anteil** ab.",
    art: "achse", min: 0, max: 100, pfeil: false,
    ticks: [[0, "0 %"], [10, "10 %"], [50, "50 %"], [100, "100 %"]],
    reihen: [{ t: "Betriebliche Nutzung", spannen: [{ a: 0, b: 10, t: "PV", f: "d" }, { a: 10, b: 50, t: "gewillkürtes BV", f: "c" }, { a: 50, b: 100, t: "notwendiges BV", f: "b" }] }],
    marken: [{ v: 5, t: "unter 10 %", sub: "notwendiges Privatvermögen", f: "d" }, { v: 75, t: "über 50 %", sub: "zwingend Betriebsvermögen", f: "b", z: 1 }],
    merke: "Erst zuordnen, dann bewerten: Ist etwas gar kein Betriebsvermögen, stellt sich die Bewertungsfrage nicht.",
  }],
  "bsr-zurechnung": [{
    knopf: "Ab wann wird bilanziert?", titel: "Zugangszeitpunkt beim Grundstück",
    text: "Bilanziert wird ab dem Übergang von **Besitz, Gefahr, Nutzen und Lasten** – nicht ab Vertrag und nicht ab Grundbucheintrag.",
    art: "achse", min: 0, max: 5, pfeil: true,
    ticks: [[0, "Nov 01"], [1, "Dez"], [2, "Jan 02"], [3, "Feb"], [4, "März"]],
    reihen: [{ t: "Wer bilanziert das Grundstück?", spannen: [{ a: 0, b: 2, t: "noch der Verkäufer", f: "n" }, { a: 2, b: 5, t: "der Käufer", f: "b" }] }],
    marken: [{ v: 0.4, t: "Kaufvertrag", sub: "beim Notar", f: "n" }, { v: 2, t: "31.12.01 Stichtag", sub: "→ nicht beim Käufer", f: "d", z: 1 }, { v: 2.1, t: "Übergang Nutzen", sub: "und Lasten 02.01.", f: "b" }, { v: 4.3, t: "Grundbuch-", sub: "eintrag", f: "n" }],
    merke: "Bewegliche Wirtschaftsgüter: Zugang mit der **Lieferung** (§ 246 Abs. 1 S. 2 HGB, § 39 Abs. 2 Nr. 1 AO).",
  }],
  "bsr-ak": [{
    knopf: "Was gehört zu den AK?", titel: "Anschaffungskosten nach § 255 Abs. 1 HGB",
    text: "Alles, was aufgewendet wird, um das Wirtschaftsgut zu **erwerben und betriebsbereit** zu machen – abzüglich Minderungen.",
    art: "stufen", schritte: [
      { t: "Anschaffungspreis (netto)", f: "e" }, { op: "+ Anschaffungsnebenkosten (Transport, Montage, Notar, Grunderwerbsteuer)", f: "b" },
      { op: "− Anschaffungspreisminderungen (Rabatt, Skonto, Bonus)" }, { op: "+ nachträgliche Anschaffungskosten", f: "b" },
      { t: "= Anschaffungskosten", f: "a", ergebnis: 1 },
      { t: "Nicht dazu", sub: "abziehbare Vorsteuer (§ 9b Abs. 1 EStG) · Finanzierungskosten (Zinsen) · Gemeinkosten", f: "d" }],
  }],
  "bsr-grundstueck": [{
    knopf: "Kaufpreis aufteilen", titel: "Ein Grundstück – zwei Wirtschaftsgüter",
    text: "Kaufpreis und Nebenkosten werden im Verhältnis der Verkehrswerte auf **Grund und Boden** (keine AfA) und **Gebäude** (AfA) verteilt. Finanzierungskosten gehören nicht dazu.",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "kp", x: 180, y: 46, t: "Kaufpreis + Nebenkosten", sub: "Notar, Grundbuch, GrESt, Makler", w: 216, f: "e" },
      { id: "gb", x: 82, y: 146, t: "Grund und Boden", sub: "nicht abnutzbar\n→ keine AfA", w: 136, f: "n" },
      { id: "ge", x: 278, y: 146, t: "Gebäude", sub: "abnutzbar → AfA\n(§ 7 Abs. 4 EStG)", w: 136, f: "b" },
      { id: "fk", x: 180, y: 226, t: "Finanzierungskosten", sub: "Zinsen, Grundschuld → Aufwand", w: 216, f: "d" }],
    pfeile: [{ von: "kp", nach: "gb", t: "Anteil", f: "n", dx: -18 }, { von: "kp", nach: "ge", t: "Anteil", f: "b", dx: 18 }],
  }],
  "bsr-afa": [{
    knopf: "GWG, Sammelposten, AfA", titel: "Kleine Wirtschaftsgüter – welche Grenze gilt?",
    text: "Maßgeblich sind die **Anschaffungskosten ohne Vorsteuer**. Je nach Betrag gibt es Sofortabzug, GWG-Wahlrecht oder Sammelposten.",
    art: "achse", min: 0, max: 1350, pfeil: true,
    ticks: [[0, "0 €"], [250, "250 €"], [800, "800 €"], [1000, "1.000 €"]],
    reihen: [
      { t: "Sofortaufwand ohne Verzeichnis", spannen: [{ a: 0, b: 250, t: "bis 250 €", f: "b" }] },
      { t: "GWG: Sofortabschreibung wählbar (§ 6 Abs. 2)", spannen: [{ a: 250, b: 800, t: "über 250 € bis 800 €", f: "c" }] },
      { t: "oder Sammelposten: 5 Jahre × 20 % (§ 6 Abs. 2a)", spannen: [{ a: 250, b: 1000, t: "über 250 € bis 1.000 €", f: "e" }] },
      { t: "Nur AfA über die Nutzungsdauer (§ 7 Abs. 1)", spannen: [{ a: 1000, b: 1350, t: "über 1.000 €", f: "a" }] }],
    merke: "Wer den Sammelposten wählt, muss ihn für **alle** Wirtschaftsgüter des Jahres von 250 € bis 1.000 € nutzen.",
  }, AFA_MONATE],
  "bsr-teilwert": [{
    knopf: "Abschreiben auf den Teilwert?", titel: "Wertminderung – Handels- und Steuerbilanz",
    text: "Handelsrecht schützt die Gläubiger (Pflicht), Steuerrecht erlaubt die Abschreibung nur bei **voraussichtlich dauernder** Wertminderung (Wahlrecht).",
    art: "matrix", ecke: "Wertminderung", spalten: ["HGB", "Steuerrecht"],
    zeilen: [
      { t: "Anlagevermögen, dauernd", zellen: [{ t: "Pflicht (§ 253 Abs. 3 S. 5)", f: "b" }, { t: "Wahlrecht (§ 6 Abs. 1 Nr. 1 S. 2)", f: "c" }] },
      { t: "Anlagevermögen, vorübergehend", zellen: [{ t: "Verbot (Finanzanlagen: Wahlrecht)", f: "d" }, { t: "Verbot", f: "d" }] },
      { t: "Umlaufvermögen, dauernd", zellen: [{ t: "Pflicht (§ 253 Abs. 4)", f: "b" }, { t: "Wahlrecht (§ 6 Abs. 1 Nr. 2 S. 2)", f: "c" }] },
      { t: "Umlaufvermögen, vorübergehend", zellen: [{ t: "Pflicht (§ 253 Abs. 4)", f: "b" }, { t: "Verbot", f: "d" }] }],
    merke: "Faustregel abnutzbares Anlagevermögen: dauernd, wenn der Wert mindestens die **halbe Restnutzungsdauer** unter dem planmäßigen Buchwert bleibt.",
  }],
  "bsr-abgrenzung": [{
    knopf: "RAP oder sonstige Forderung?", titel: "Welcher Abgrenzungsposten?",
    text: "Zwei Fragen genügen: Liegt die **Zahlung** vor oder nach dem Stichtag – und geht es um **Aufwand** oder **Ertrag**?",
    art: "matrix", ecke: "", spalten: ["Aufwand", "Ertrag"],
    zeilen: [
      { t: "Zahlung im alten Jahr, Erfolg im neuen", zellen: [{ gross: "aktiver RAP", t: "Miete, Versicherung im Voraus gezahlt (§ 250 Abs. 1 HGB)", f: "e" }, { gross: "passiver RAP", t: "Miete im Voraus erhalten (§ 250 Abs. 2 HGB)", f: "f" }] },
      { t: "Erfolg im alten Jahr, Zahlung im neuen", zellen: [{ gross: "sonstige Verbindlichkeit", t: "Zinsen nachschüssig gezahlt", f: "d" }, { gross: "sonstige Forderung", t: "Dezembermiete im Januar erhalten", f: "b" }] }],
  }, {
    knopf: "Beispiel Versicherung", titel: "Aktiver RAP am Zeitstrahl",
    text: "Am 01.10.01 werden 1.200 € Versicherung für ein Jahr im Voraus gezahlt. Nur drei Monate betreffen das Jahr 01 – der Rest wird **aktiv abgegrenzt**.",
    art: "achse", min: 0, max: 15, pfeil: true,
    ticks: [[0, "01.10.01"], [3, "31.12.01"], [15, "30.09.02"]],
    reihen: [{ t: "Versicherung 1.200 € für 12 Monate, gezahlt 01.10.01", spannen: [{ a: 0, b: 3, t: "300 €", f: "c" }, { a: 3, b: 15, t: "900 € betreffen das Jahr 02", f: "e" }] }],
    marken: [{ v: 1.5, t: "Aufwand 01", sub: "300 €", f: "c" }, { v: 9, t: "aktiver RAP", sub: "900 € → Aufwand 02", f: "e" }],
    merke: "Buchung am 31.12.01: **ARAP 900 € an Versicherungsaufwand 900 €** (wenn bei Zahlung voll als Aufwand gebucht).",
  }],
  "bsr-entnahme-einlage": [{
    knopf: "Bewertung von Entnahme und Einlage", titel: "Was verlässt den Betrieb – was kommt hinein?",
    text: "Entnahmen und Einlagen werden grundsätzlich mit dem **Teilwert** bewertet. Bei der Einlage gibt es eine Obergrenze, wenn das Wirtschaftsgut erst kurz vorher privat angeschafft wurde.",
    art: "fluss", w: 360, h: 236,
    knoten: [
      { id: "b", x: 62, y: 116, t: "Betrieb", w: 100, f: "a" },
      { id: "p", x: 298, y: 116, t: "Privat", w: 100, f: "f" }],
    pfeile: [{ von: "b", nach: "p", t: "Entnahme: Teilwert\n(§ 6 Abs. 1 Nr. 4 EStG)", f: "d", b: -86 },
      { von: "p", nach: "b", t: "Einlage: Teilwert, höchstens AK,\nwenn binnen 3 Jahren angeschafft\n(§ 6 Abs. 1 Nr. 5 EStG)", f: "b", b: -86 }],
    merke: "Pkw zu mehr als 50 % betrieblich: private Nutzung mit **1 % des Bruttolistenpreises** je Monat (§ 6 Abs. 1 Nr. 4 S. 2 EStG).",
  }],
  "bbf-afa": [AFA_MONATE],

  // =============================================================================================
  // Öffentliches Recht
  "oer-staatsziele": [{
    knopf: "Staat und Art. 20 GG", titel: "Was macht Deutschland aus?",
    text: "Drei Elemente machen einen Staat, fünf Prinzipien prägen die Bundesrepublik – und die Grundsätze aus Art. 1 und Art. 20 GG sind **unabänderlich**.",
    art: "baum", wurzel: { t: "Bundesrepublik Deutschland", sub: "Verfassung: Grundgesetz", f: "a" },
    aeste: [
      { t: "Drei-Elemente-Lehre", sub: "Merkmale jedes Staates", f: "e", blaetter: ["Staatsgebiet", "Staatsvolk", "Staatsgewalt"] },
      { t: "Strukturprinzipien", sub: "Art. 20 GG", f: "b", blaetter: ["Republik", "Demokratie", "Sozialstaat", "Bundesstaat", "Rechtsstaat"] },
      { t: "Ewigkeitsklausel", sub: "Art. 79 Abs. 3 GG", f: "d", blaetter: ["Gliederung in Länder", "Mitwirkung der Länder bei der Gesetzgebung", "Grundsätze aus Art. 1 und 20 GG"] }],
    merke: "Verfassungsänderung sonst nur mit **zwei Dritteln** der Mitglieder des Bundestages und zwei Dritteln der Stimmen des Bundesrates (Art. 79 Abs. 2 GG).",
  }],
  "oer-demokratie": [{
    knopf: "Legitimationskette", titel: "Alle Staatsgewalt geht vom Volke aus",
    text: "Jede staatliche Entscheidung muss sich über eine **ununterbrochene Kette** auf das Volk zurückführen lassen (Art. 20 Abs. 2 GG).",
    art: "stufen", schritte: [
      { t: "Volk", sub: "wählt in Wahlen und Abstimmungen", f: "b" },
      { t: "Bundestag", sub: "unmittelbar gewählt (Art. 38 Abs. 1 GG)", f: "e" },
      { t: "Bundeskanzler", sub: "vom Bundestag gewählt (Art. 63 GG)", f: "a" },
      { t: "Bundesminister", sub: "auf Vorschlag des Kanzlers ernannt (Art. 64 GG)", f: "a" },
      { t: "Verwaltung", sub: "an Weisungen gebunden, Minister verantwortlich", f: "f" }],
  }],
  "oer-rechtsstaat": [{
    knopf: "Gewaltenteilung", titel: "Drei Gewalten, die sich kontrollieren",
    text: "Gesetzgebung, vollziehende Gewalt und Rechtsprechung sind getrennt (Art. 20 Abs. 2 S. 2 GG) – und alle sind an Recht und Gesetz gebunden (Art. 20 Abs. 3 GG).",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "l", x: 180, y: 44, t: "Legislative", sub: "Bundestag, Bundesrat", w: 150, f: "e" },
      { id: "x", x: 74, y: 206, t: "Exekutive", sub: "Regierung,\nVerwaltung", w: 124, f: "a" },
      { id: "j", x: 286, y: 206, t: "Judikative", sub: "Gerichte, BVerfG", w: 124, f: "f" }],
    pfeile: [{ von: "l", nach: "x", t: "Gesetze binden\n(Art. 20 Abs. 3)", f: "e", dx: -38 }, { von: "j", nach: "x", t: "Rechtsschutz\n(Art. 19 Abs. 4)", f: "f", dy: 22 },
      { von: "j", nach: "l", t: "Normenkontrolle\ndurch das BVerfG", f: "f", dx: 44 }],
  }, {
    knopf: "Echte und unechte Rückwirkung", titel: "Rückwirkung von Gesetzen",
    text: "Entscheidend ist, ob der Sachverhalt bei Verkündung **schon abgeschlossen** war. Dann ist die Rückwirkung grundsätzlich unzulässig.",
    art: "achse", min: 0, max: 10, pfeil: true,
    ticks: [[5, "Verkündung des Gesetzes"]],
    reihen: [
      { t: "Echte Rückwirkung – Sachverhalt abgeschlossen", spannen: [{ a: 0.6, b: 4, t: "grds. unzulässig", f: "d" }] },
      { t: "Unechte Rückwirkung – Sachverhalt läuft noch", spannen: [{ a: 2.5, b: 8.5, t: "grds. zulässig", f: "b" }] }],
    marken: [{ v: 5, t: "Gesetz verkündet", sub: "Vertrauensschutz ab hier?", f: "a" }],
    merke: "Im Strafrecht gilt ein **absolutes** Rückwirkungsverbot (Art. 103 Abs. 2 GG).",
  }],
  "oer-bundesstaat": [{
    knopf: "Bund und Länder", titel: "Wer ist zuständig?",
    text: "Grundsätzlich die **Länder** – der Bund nur, wo das Grundgesetz es ihm zuweist. Kommt es zum Widerspruch, gilt Bundesrecht.",
    art: "baum", wurzel: { t: "Bundesstaat", sub: "Bund und 16 Länder sind Staaten (Art. 20 Abs. 1 GG)", f: "a" },
    aeste: [
      { t: "Grundsatz", sub: "Art. 30 GG", f: "b", blaetter: ["Staatliche Aufgaben sind Sache der Länder", "soweit das GG nichts anderes regelt"] },
      { t: "Vorrang", sub: "Art. 31 GG", f: "d", blaetter: ["Bundesrecht bricht Landesrecht"] },
      { t: "Mitwirkung", sub: "Art. 50 GG", f: "e", blaetter: ["Länder wirken über den Bundesrat an Gesetzgebung und Verwaltung des Bundes mit"] }],
  }],
  "oer-wahl": [{
    knopf: "Erst- und Zweitstimme", titel: "So wird der Bundestag gewählt",
    text: "Die **Zweitstimme** entscheidet über die Sitzverteilung. Ein Wahlkreissieger bekommt seinen Sitz nur, wenn er durch Zweitstimmen gedeckt ist.",
    art: "fluss", w: 360, h: 264,
    knoten: [
      { id: "w", x: 180, y: 38, t: "Wähler", sub: "ab 18 Jahren", w: 120, f: "n" },
      { id: "e", x: 78, y: 134, t: "Erststimme", sub: "Wahlkreisbewerber\n(299 Wahlkreise)", w: 136, f: "e" },
      { id: "z", x: 282, y: 134, t: "Zweitstimme", sub: "Landesliste\neiner Partei", w: 136, f: "a" },
      { id: "s", x: 180, y: 236, t: "630 Sitze", sub: "nach Zweitstimmen (Sainte-Laguë)", w: 210, f: "b" }],
    pfeile: [{ von: "w", nach: "e", f: "e" }, { von: "w", nach: "z", f: "a" },
      { von: "z", nach: "s", t: "≥ 5 % oder\n3 Direktmandate", f: "a", dx: 46 }, { von: "e", nach: "s", t: "nur mit\nZweitstimmendeckung", f: "e", str: 1, dx: -52 }],
  }],
  "oer-bundesrat": [{
    knopf: "Stimmen je Land", titel: "Stimmenverteilung im Bundesrat",
    text: "Jedes Land hat mindestens drei Stimmen, große Länder mehr (Art. 51 Abs. 2 GG) – zusammen **69 Stimmen**, die je Land nur einheitlich abgegeben werden können.",
    art: "achse", min: 0, max: 10, pfeil: true,
    ticks: [[0, "0"], [2, "2 Mio."], [6, "6 Mio."], [7, "7 Mio."], [10, "Einwohner"]],
    reihen: [{ t: "Stimmen je Land nach Einwohnerzahl", spannen: [{ a: 0, b: 2, t: "3", f: "e" }, { a: 2, b: 6, t: "4 Stimmen", f: "a" }, { a: 6, b: 7, t: "5", f: "f" }, { a: 7, b: 10, t: "6 Stimmen", f: "b" }] }],
    marken: [{ v: 1, t: "z. B. Bremen", sub: "3 Stimmen", f: "e" }, { v: 9, t: "z. B. Bayern, NRW", sub: "6 Stimmen", f: "b" }],
    merke: "Beschluss mit mindestens **35 Stimmen** (absolute Mehrheit, Art. 52 Abs. 3 S. 1 GG) – Enthaltungen wirken wie Nein.",
  }],
  "oer-bundespraesident": [{
    knopf: "Wahl des Bundespräsidenten", titel: "Die Bundesversammlung wählt",
    text: "Gewählt wird ohne Aussprache durch die **Bundesversammlung** (Art. 54 GG) – bis zu drei Wahlgänge.",
    art: "stufen", schritte: [
      { t: "Bundesversammlung", sub: "Mitglieder des Bundestages + gleich viele Vertreter der Länderparlamente", f: "e" },
      { t: "1. Wahlgang", sub: "Mehrheit der Mitglieder nötig", f: "a", nr: "1" },
      { t: "2. Wahlgang", sub: "Mehrheit der Mitglieder nötig", f: "a", nr: "2" },
      { t: "3. Wahlgang", sub: "die meisten Stimmen genügen (relative Mehrheit)", f: "c", nr: "3" },
      { t: "Amtszeit 5 Jahre", sub: "einmal anschließend wiederwählbar · Mindestalter 40", f: "b", ergebnis: 1 }],
  }],
  "oer-bundesregierung": [{
    knopf: "Kanzlerwahl in drei Phasen", titel: "Wie wird der Bundeskanzler gewählt?",
    text: "Erst schlägt der Bundespräsident vor, dann darf der Bundestag selbst – je später die Phase, desto geringer die nötige Mehrheit (Art. 63 GG).",
    art: "stufen", schritte: [
      { t: "1. Phase", sub: "Vorschlag des Bundespräsidenten, Mehrheit der Mitglieder (316 von 630)", f: "a", nr: "1" },
      { t: "2. Phase", sub: "binnen 14 Tagen eigene Kandidaten des Bundestages, Mehrheit der Mitglieder", f: "a", nr: "2" },
      { t: "3. Phase", sub: "unverzüglich neuer Wahlgang – die meisten Stimmen", f: "c", nr: "3" },
      { zweig: [
        { titel: "Mehrheit der Mitglieder", f: "b", schritte: ["Bundespräsident muss binnen 7 Tagen ernennen"] },
        { titel: "nur relative Mehrheit", f: "d", schritte: ["Bundespräsident ernennt oder löst den Bundestag auf"] }] }],
  }, {
    knopf: "Misstrauensvotum oder Vertrauensfrage", titel: "Art. 67 und Art. 68 GG im Vergleich",
    text: "Beim Misstrauensvotum handelt der **Bundestag**, bei der Vertrauensfrage der **Kanzler**.",
    art: "matrix", ecke: "", spalten: ["Misstrauensvotum (Art. 67)", "Vertrauensfrage (Art. 68)"],
    zeilen: [
      { t: "Wer?", zellen: [{ t: "Bundestag", f: "e" }, { t: "Bundeskanzler", f: "a" }] },
      { t: "Mehrheit", zellen: [{ t: "Mehrheit der Mitglieder wählt einen Nachfolger", f: "e" }, { t: "Antrag findet keine Mehrheit der Mitglieder", f: "a" }] },
      { t: "Frist", zellen: [{ t: "48 Stunden bis zur Wahl", f: "n" }, { t: "48 Stunden bis zur Abstimmung", f: "n" }] },
      { t: "Folge", zellen: [{ t: "Bundespräsident muss entlassen und den Gewählten ernennen", f: "b" }, { t: "Bundespräsident kann binnen 21 Tagen auflösen", f: "c" }] }],
  }],
  "oer-bverfg": [{
    knopf: "Wer wählt die Richter?", titel: "Zusammensetzung des Bundesverfassungsgerichts",
    text: "16 Richter in zwei Senaten – je zur Hälfte von **Bundestag** und **Bundesrat** mit Zweidrittelmehrheit gewählt (Art. 94 Abs. 1 GG).",
    art: "fluss", w: 360, h: 230,
    knoten: [
      { id: "bt", x: 80, y: 44, t: "Bundestag", sub: "wählt 8 (⅔)", w: 126, f: "e" },
      { id: "br", x: 280, y: 44, t: "Bundesrat", sub: "wählt 8 (⅔)", w: 126, f: "a" },
      { id: "s1", x: 80, y: 186, t: "Erster Senat", sub: "8 Richter", w: 126, f: "f" },
      { id: "s2", x: 280, y: 186, t: "Zweiter Senat", sub: "8 Richter", w: 126, f: "f" }],
    pfeile: [{ von: "bt", nach: "s1", t: "4", f: "e", dx: -10 }, { von: "bt", nach: "s2", t: "4", f: "e", lp: 0.3 }, { von: "br", nach: "s1", t: "4", f: "a", lp: 0.3 }, { von: "br", nach: "s2", t: "4", f: "a", dx: 10 }],
    merke: "Amtszeit **12 Jahre**, keine Wiederwahl, Altersgrenze 68.",
  }],
  "oer-gesetzgebung": [{
    knopf: "Gesetzgebung & Vermittlungsausschuss", titel: "Der Weg eines Bundesgesetzes",
    text: "Nach dem Beschluss des Bundestages entscheidet die Art des Gesetzes, was der Bundesrat tun kann – der **Vermittlungsausschuss** sucht einen Kompromiss.",
    art: "stufen", schritte: [
      { t: "Gesetzesinitiative (Art. 76 Abs. 1 GG)", sub: "Bundesregierung, Bundesrat oder Mitte des Bundestages · Regierungsvorlagen zuerst zum Bundesrat (6 Wochen)", f: "e", nr: "1" },
      { t: "Beschluss im Bundestag (Art. 77 Abs. 1 GG)", sub: "nach drei Beratungen (Lesungen), Mehrheit der abgegebenen Stimmen", f: "a", nr: "2" },
      { t: "Bundesrat", sub: "Einspruchs- oder Zustimmungsgesetz?", f: "f", nr: "3" },
      { zweig: [
        { titel: "Einspruchsgesetz (Regelfall)", f: "e", schritte: ["Bundesrat kann binnen 3 Wochen den Vermittlungsausschuss anrufen (Art. 77 Abs. 2)", "danach Einspruch möglich (Art. 77 Abs. 3)", "Bundestag kann den Einspruch zurückweisen (Art. 77 Abs. 4)"] },
        { titel: "Zustimmungsgesetz", f: "c", schritte: ["nur, wenn das GG es ausdrücklich vorsieht", "auch Bundestag und Bundesregierung können den Vermittlungsausschuss anrufen", "ohne Zustimmung kein Gesetz"] }] },
      { t: "Zustandekommen (Art. 78 GG)", f: "b", nr: "4" },
      { t: "Gegenzeichnung, Ausfertigung, Verkündung", sub: "Art. 58, Art. 82 Abs. 1 GG · Bundespräsident prüft", f: "a", nr: "5" },
      { t: "Inkrafttreten (Art. 82 Abs. 2 GG)", sub: "am bestimmten Tag, sonst am 14. Tag nach Ausgabe des Bundesgesetzblatts", f: "b", nr: "6", ergebnis: 1 }],
  }, {
    knopf: "Wer darf das Gesetz machen?", titel: "Gesetzgebungskompetenzen",
    text: "Grundsätzlich die Länder (Art. 70 GG) – der Bund nur, wo das Grundgesetz es ihm zuweist.",
    art: "baum", wurzel: { t: "Gesetzgebungskompetenz", sub: "zuerst prüfen: Bund oder Land?", f: "a" },
    aeste: [
      { t: "Länder", sub: "Grundsatz, Art. 70 Abs. 1", f: "b", blaetter: ["Schulrecht", "Polizeirecht", "Kommunalrecht"] },
      { t: "Bund ausschließlich", sub: "Art. 71, 73", f: "e", blaetter: ["Auswärtiges, Verteidigung", "Währung, Zölle", "Staatsangehörigkeit"] },
      { t: "Konkurrierend", sub: "Art. 72, 74", f: "c", blaetter: ["Bürgerliches Recht, Strafrecht", "Recht der Wirtschaft", "Länder nur, solange der Bund nicht tätig wird"] },
      { t: "Steuern", sub: "Art. 105", f: "f", blaetter: ["Zölle: nur Bund", "übrige Steuern meist konkurrierend", "örtliche Verbrauch- und Aufwandsteuern: Länder"] }],
  }],

  // =============================================================================================
  // Einkommensteuer
  "est-grundlagen": [{
    knopf: "Wem steht die ESt zu?", titel: "Verteilung des Aufkommens",
    text: "Die Einkommensteuer ist eine **Gemeinschaftsteuer**: Bund, Länder und Gemeinden teilen sich das Aufkommen.",
    art: "balken", balken: [{ titel: "Einkommensteuer (ohne Abgeltungsteuer)", teile: [{ t: "Bund 42,5 %", wert: 42.5, f: "e" }, { t: "Länder 42,5 %", wert: 42.5, f: "a" }, { t: "15 %", wert: 15, f: "b" }], unter: "Bund und Länder je 42,5 % · Gemeinden 15 %" }],
    merke: "Erhoben wird teils **an der Quelle** (Lohnsteuer, Kapitalertragsteuer), teils durch **Veranlagung** nach Ablauf des Kalenderjahres.",
  }],
  "est-steuerpflicht": [{
    knopf: "Unbeschränkt oder beschränkt?", titel: "Persönliche Steuerpflicht",
    text: "Es kommt auf den **Wohnsitz** oder **gewöhnlichen Aufenthalt** im Inland an – nicht auf die Staatsangehörigkeit.",
    art: "stufen", schritte: [
      { t: "Natürliche Person mit Wohnsitz oder gewöhnlichem Aufenthalt im Inland?", sub: "gewöhnlicher Aufenthalt: mehr als 6 Monate (§ 9 S. 2 AO)", f: "a" },
      { zweig: [
        { titel: "Ja", f: "b", schritte: ["unbeschränkt steuerpflichtig (§ 1 Abs. 1 EStG)", "mit dem gesamten Welteinkommen"] },
        { titel: "Nein", f: "e", schritte: ["beschränkt steuerpflichtig (§ 1 Abs. 4 EStG)", "nur mit inländischen Einkünften (§ 49 EStG)", "auf Antrag fiktiv unbeschränkt, wenn mindestens 90 % der Einkünfte in Deutschland (§ 1 Abs. 3)"] }] }],
  }],
  "est-einkuenfte": [{
    knopf: "Die sieben Einkunftsarten", titel: "Gewinn- und Überschusseinkünfte",
    text: "Nur was unter eine der **sieben Einkunftsarten** fällt, ist steuerbar (§ 2 Abs. 1 EStG). Die Art entscheidet, wie die Einkünfte ermittelt werden.",
    art: "baum", wurzel: { t: "Einkünfte (§ 2 Abs. 1 EStG)", f: "a" },
    aeste: [
      { t: "Gewinneinkünfte", sub: "Einkünfte = Gewinn (§ 2 Abs. 2 Nr. 1)", f: "b", blaetter: ["1 Land- und Forstwirtschaft (§ 13)", "2 Gewerbebetrieb (§ 15)", "3 selbständige Arbeit (§ 18)"] },
      { t: "Überschusseinkünfte", sub: "Einnahmen − Werbungskosten (§ 2 Abs. 2 Nr. 2)", f: "e", blaetter: ["4 nichtselbständige Arbeit (§ 19)", "5 Kapitalvermögen (§ 20)", "6 Vermietung und Verpachtung (§ 21)", "7 sonstige Einkünfte (§ 22)"] }],
  }],
  "est-zve": [{
    knopf: "Vom Einkommen zum zvE", titel: "Schema bis zum zu versteuernden Einkommen",
    text: "Jede Stufe hat ihre eigenen Abzüge – **Werbungskosten** mindern schon die Einkünfte, **Sonderausgaben** erst den Gesamtbetrag der Einkünfte.",
    art: "stufen", schritte: [
      { t: "Einkünfte aus den 7 Einkunftsarten", f: "e" }, { t: "Summe der Einkünfte", sub: "nach Verlustausgleich", f: "e" },
      { op: "− Altersentlastungsbetrag, Entlastungsbetrag für Alleinerziehende" },
      { t: "Gesamtbetrag der Einkünfte (§ 2 Abs. 3)", f: "a" },
      { op: "− Verlustabzug, Sonderausgaben, außergewöhnliche Belastungen" },
      { t: "Einkommen (§ 2 Abs. 4)", f: "a" },
      { op: "− Freibeträge für Kinder (nur nach Günstigerprüfung), Härteausgleich" },
      { t: "zu versteuerndes Einkommen (§ 2 Abs. 5)", sub: "darauf der Tarif nach § 32a EStG", f: "b", ergebnis: 1 }],
  }],
  "est-tarif": [{
    knopf: "Tarifzonen 2026", titel: "Der Einkommensteuertarif",
    text: "Bis zum Grundfreibetrag fällt keine Steuer an, danach steigt der **Grenzsteuersatz** stufenlos – bis zum Spitzensteuersatz.",
    art: "achse", min: 0, max: 100, pfeil: true,
    ticks: [[0, "0 €"], [20, "12.348 €"], [58, "69.878 €"], [86, "277.826 €"]],
    reihen: [{ t: "Grenzsteuersatz (Grundtarif)", spannen: [
      { a: 0, b: 20, t: "0 %", f: "b" }, { a: 20, b: 58, t: "14 % → 42 %", f: "c" }, { a: 58, b: 86, t: "42 %", f: "d" }, { a: 86, b: 100, t: "45 %", f: "f" }] }],
    marken: [{ v: 10, t: "Grundfreibetrag", sub: "steuerfrei", f: "b" }, { v: 39, t: "Progressionszone", sub: "Satz steigt stufenlos", f: "c", z: 1 }, { v: 93, t: "Reichensteuer", sub: "ab 277.826 €", f: "f" }],
    merke: "Splittingtarif bei Zusammenveranlagung: Steuer auf das **halbe** gemeinsame zvE × 2 (§ 32a Abs. 5 EStG). Skala nicht maßstabsgetreu.",
  }],
  "est-einnahmen": [{
    knopf: "Freigrenze oder Freibetrag?", titel: "Freigrenze und Freibetrag im Vergleich",
    text: "Ein **Freibetrag** bleibt immer steuerfrei. Eine **Freigrenze** fällt komplett weg, sobald sie überschritten ist.",
    art: "balken", balken: [
      { titel: "Sachbezug 49 € im Monat – Freigrenze 50 € (§ 8 Abs. 2 S. 11)", teile: [{ t: "49 € steuerfrei", wert: 49, f: "b" }], max: 60 },
      { titel: "Sachbezug 51 € im Monat – Freigrenze überschritten", teile: [{ t: "51 € voll steuerpflichtig", wert: 51, f: "d" }], max: 60 },
      { titel: "Personalrabatt 1.500 € im Jahr – Freibetrag 1.080 € (§ 8 Abs. 3)", teile: [{ t: "1.080 € frei", wert: 1080, f: "b" }, { t: "420 € stpfl.", wert: 420, f: "d" }] }],
  }],
  "est-zufluss": [{
    knopf: "10-Tage-Regel am Jahreswechsel", titel: "Regelmäßig wiederkehrende Zahlungen",
    text: "Grundsätzlich zählt das Jahr des Zahlungsflusses. **Ausnahme:** Regelmäßig wiederkehrende Zahlungen, die innerhalb von 10 Tagen um den Jahreswechsel fällig und gezahlt werden, gehören in das Jahr, zu dem sie wirtschaftlich gehören (§ 11 Abs. 1 S. 2, Abs. 2 S. 2 EStG).",
    art: "achse", min: 0, max: 30, pfeil: true,
    ticks: [[5, "22.12."], [15, "31.12."], [25, "10.01."]],
    reihen: [{ t: "kurze Zeit um den Jahreswechsel", spannen: [{ a: 5, b: 25, t: "22.12. bis 10.01.", f: "c" }] }],
    marken: [{ v: 11, t: "28.12.: Januarmiete", sub: "→ neues Jahr", f: "e" }, { v: 19, t: "05.01.: Dezembermiete", sub: "→ altes Jahr", f: "b", z: 1 }, { v: 15, t: "", f: "n" }],
    merke: "Typische Fälle: Miete, Zinsen, **USt-Vorauszahlung** für Dezember (fällig am 10.01.).",
  }],
  "est-werbungskosten": [{
    knopf: "Pauschbetrag oder Nachweis?", titel: "Arbeitnehmer-Pauschbetrag",
    text: "Abgezogen wird der **höhere** Betrag: die nachgewiesenen Werbungskosten oder der Pauschbetrag von 1.230 € (§ 9a S. 1 Nr. 1 a EStG).",
    art: "balken", balken: [
      { titel: "Nachgewiesen 800 €", teile: [{ t: "800 €", wert: 800, f: "n" }], max: 2000, unter: "→ angesetzt wird der Pauschbetrag von 1.230 €" },
      { titel: "Pauschbetrag", teile: [{ t: "1.230 €", wert: 1230, f: "b" }], max: 2000 },
      { titel: "Nachgewiesen 2.000 €", teile: [{ t: "2.000 € – voller Abzug", wert: 2000, f: "e" }], max: 2000 }],
  }],
  "est-homeoffice": [{
    knopf: "Arbeitszimmer oder Tagespauschale?", titel: "Arbeiten zu Hause",
    text: "Das volle Arbeitszimmer gibt es nur als **Mittelpunkt der gesamten Tätigkeit** – sonst bleibt die Tagespauschale.",
    art: "stufen", schritte: [
      { t: "Häusliches Arbeitszimmer?", sub: "abgeschlossener, büromäßiger Raum, (fast) nur beruflich genutzt", f: "a" },
      { zweig: [
        { titel: "Mittelpunkt der gesamten Tätigkeit", f: "b", schritte: ["tatsächliche Kosten oder Jahrespauschale 1.260 € (§ 4 Abs. 5 S. 1 Nr. 6b)", "je Monat ohne Mittelpunkt − 1/12"] },
        { titel: "kein Mittelpunkt / Arbeitsecke", f: "e", schritte: ["Tagespauschale 6 € je Tag zu Hause (Nr. 6c)", "höchstens 1.260 € = 210 Tage", "nicht zusätzlich zur Nr. 6b"] }] }],
  }],
  "est-entfernung": [{
    knopf: "Entfernungspauschale berechnen", titel: "Wohnung – erste Tätigkeitsstätte",
    text: "Gezählt wird die **einfache Strecke** in vollen Kilometern – ab 2026 schon ab dem ersten Kilometer 0,38 €, egal mit welchem Verkehrsmittel.",
    art: "fluss", w: 360, h: 200,
    knoten: [
      { id: "w", x: 54, y: 50, t: "Wohnung", w: 92, f: "e" },
      { id: "t", x: 304, y: 50, t: "erste\nTätigkeits-\nstätte", w: 100, f: "a" },
      { id: "r", x: 180, y: 160, t: "23 km × 0,38 € × 220 Tage", sub: "= 1.922,80 € Werbungskosten", w: 236, f: "b" }],
    pfeile: [{ von: "w", nach: "t", t: "23,6 km → 23 volle km\n(kürzeste Straßenverbindung)", f: "e", dy: 34 }],
    merke: "Höchstens **4.500 €** im Jahr – außer mit eigenem oder überlassenem Pkw (§ 9 Abs. 1 S. 3 Nr. 4 S. 2 EStG).",
  }],
  "est-reisekosten": [{
    knopf: "Verpflegungspauschalen", titel: "Pauschalen nach Abwesenheitsdauer",
    text: "Verpflegung ist nur über **Pauschalen** abziehbar – nach der Dauer der Abwesenheit von Wohnung und erster Tätigkeitsstätte (§ 9 Abs. 4a EStG).",
    art: "achse", min: 0, max: 24, pfeil: true,
    ticks: [[0, "0 Std."], [8, "8 Std."], [24, "24 Std."]],
    reihen: [{ t: "Abwesenheit an einem Kalendertag", spannen: [{ a: 0, b: 8, t: "keine Pauschale", f: "n" }, { a: 8, b: 23, t: "mehr als 8 Std.: 14 €", f: "c" }, { a: 23, b: 24, t: "", f: "b" }] }],
    marken: [{ v: 24, t: "volle 24 Std.: 28 €", sub: "An- und Abreisetag: 14 €", f: "b" }],
    merke: "Gestellte Mahlzeiten kürzen: Frühstück **5,60 €**, Mittag- oder Abendessen **11,20 €**. Nach 3 Monaten an derselben Stelle keine Pauschale mehr.",
  }],
  "est-arbeitsmittel": [{
    knopf: "Sofort oder verteilt?", titel: "Arbeitsmittel des Arbeitnehmers",
    text: "Arbeitnehmer ziehen den **Bruttobetrag** ab. Bis 800 € netto (952 € brutto) sofort, darüber verteilt über die Nutzungsdauer.",
    art: "achse", min: 0, max: 1300, pfeil: true,
    ticks: [[0, "0 €"], [952, "952 € brutto"]],
    reihen: [{ t: "Anschaffungskosten (brutto)", spannen: [{ a: 0, b: 952, t: "sofort voll Werbungskosten", f: "b" }, { a: 952, b: 1300, t: "AfA", f: "a" }] }],
    marken: [{ v: 1150, t: "über die Nutzungsdauer", sub: "Computer, Software: 1 Jahr", f: "a" }],
  }],

  // =============================================================================================
  // Umsatzsteuer
  "ust-grundlagen": [{
    knopf: "Die Mehrwertkette", titel: "Wer trägt die Umsatzsteuer?",
    text: "Jeder Unternehmer führt nur die Steuer auf seinen **Mehrwert** ab – die volle Last trägt am Ende der private Verbraucher.",
    art: "fluss", w: 360, h: 276,
    knoten: [
      { id: "h", x: 62, y: 46, t: "Hersteller", sub: "ohne Vorleistung", w: 104, f: "a" },
      { id: "d", x: 180, y: 136, t: "Händler", w: 96, f: "a" },
      { id: "k", x: 298, y: 46, t: "Kunde", sub: "privat", w: 104, f: "d" },
      { id: "fa", x: 180, y: 246, t: "Finanzamt", sub: "erhält 19 + 9,50 = 28,50 €", w: 196, f: "n" }],
    pfeile: [{ von: "h", nach: "d", t: "100 €\n+ 19 € USt", f: "b" }, { von: "d", nach: "k", t: "150 €\n+ 28,50 € USt", f: "b" },
      { von: "h", nach: "fa", t: "19 €", f: "c", b: 34 }, { von: "d", nach: "fa", t: "28,50 − 19 VSt\n= 9,50 €", f: "c", dx: 58 }],
    notizen: [{ x: 300, y: 122, t: "trägt 28,50 €\nkein Vorsteuerabzug", f: "d", klein: 1 }],
    merke: "Das Finanzamt erhält insgesamt **19 % vom Endpreis** (150 € × 19 % = 28,50 €).",
    legende: LG,
  }],
  "ust-leistung": [{
    knopf: "Tausch & tauschähnlicher Umsatz", titel: "Tausch – Leistung gegen Leistung",
    text: "Beim Tausch wird nicht mit Geld bezahlt: **Jede Leistung ist das Entgelt für die andere** – beide Seiten führen einen steuerbaren Umsatz aus (§ 3 Abs. 12 UStG).",
    art: "fluss", w: 360, h: 262,
    knoten: [
      { id: "a", x: 66, y: 62, t: "Unternehmer A", sub: "gibt seinen Pkw", w: 116, f: "a" },
      { id: "b", x: 294, y: 62, t: "Unternehmer B", sub: "gibt eine Maschine", w: 116, f: "e" },
      { id: "c", x: 66, y: 200, t: "Händler", sub: "gibt einen Laptop", w: 116, f: "a" },
      { id: "d", x: 294, y: 200, t: "Webdesigner", sub: "erstellt Homepage", w: 116, f: "e" }],
    pfeile: [{ von: "a", nach: "b", t: "Lieferung", f: "b", b: -22 }, { von: "b", nach: "a", t: "Lieferung", f: "b", b: -22 },
      { von: "c", nach: "d", t: "Lieferung", f: "b", b: -22 }, { von: "d", nach: "c", t: "sonstige Leistung", f: "e", b: -22 }],
    notizen: [{ x: 180, y: 14, t: "Tausch (§ 3 Abs. 12 S. 1 UStG)", f: "a" }, { x: 180, y: 150, t: "Tauschähnlicher Umsatz (§ 3 Abs. 12 S. 2 UStG)", f: "e" }],
    merke: "Bemessungsgrundlage: Der **Wert jedes Umsatzes gilt als Entgelt für den anderen** (§ 10 Abs. 2 S. 2 UStG).",
  }, {
    knopf: "Lieferung oder sonstige Leistung?", titel: "Die Art der Leistung bestimmen",
    text: "Alles, was keine Lieferung ist, ist eine sonstige Leistung – davon hängen Ort, Steuersatz und Entstehung ab.",
    art: "baum", wurzel: { t: "Leistung", sub: "§ 1 Abs. 1 Nr. 1 UStG", f: "a" },
    aeste: [
      { t: "Lieferung", sub: "§ 3 Abs. 1: Verschaffung der Verfügungsmacht an einem Gegenstand", f: "b", blaetter: ["Verkauf von Ware", "Werklieferung: eigene Hauptstoffe (§ 3 Abs. 4)", "Entnahme eines Gegenstands (§ 3 Abs. 1b)"] },
      { t: "Sonstige Leistung", sub: "§ 3 Abs. 9: alles, was keine Lieferung ist", f: "e", blaetter: ["Beratung, Vermietung", "Werkleistung: nur Zutaten oder Nebensachen", "auch Unterlassen oder Dulden"] }],
  }],
  "ust-ort": [{
    knopf: "Ort der Leistung finden", titel: "Wo wird die Leistung ausgeführt?",
    text: "Erst die Art der Leistung, dann die passende Ortsregel – und zum Schluss: Liegt der Ort im **Inland**?",
    art: "stufen", schritte: [
      { t: "Lieferung oder sonstige Leistung?", f: "a" },
      { zweig: [
        { titel: "Lieferung", f: "b", schritte: ["befördert oder versendet → Beginn der Beförderung (§ 3 Abs. 6 S. 1)", "sonst → wo der Gegenstand bei Verschaffung ist (§ 3 Abs. 7 S. 1)"] },
        { titel: "Sonstige Leistung", f: "e", schritte: ["zuerst Sonderregeln: Grundstück, Kurzvermietung, Kultur (§ 3a Abs. 3, § 3b)", "an Unternehmer → Sitz des Empfängers (§ 3a Abs. 2)", "an Private → Sitz des Leistenden (§ 3a Abs. 1)"] }] },
      { t: "Ort im Inland? (§ 1 Abs. 2 UStG)", sub: "ja → steuerbar · nein → nicht steuerbar", f: "c", ergebnis: 1 }],
  }],
  "ust-entgelt": [{
    knopf: "Leistungsaustausch", titel: "Leistung gegen Entgelt – oder nicht?",
    text: "Ein Leistungsaustausch liegt vor, wenn Leistung und Gegenleistung **wirtschaftlich verknüpft** sind. Echter Schadensersatz ist keine Gegenleistung.",
    art: "fluss", w: 360, h: 264,
    knoten: [
      { id: "u", x: 66, y: 66, t: "Unternehmer", w: 116, f: "a" },
      { id: "k", x: 294, y: 66, t: "Kunde", w: 116, f: "e" },
      { id: "s", x: 66, y: 210, t: "Schädiger", w: 116, f: "n" },
      { id: "g", x: 294, y: 210, t: "Unternehmer", sub: "Geschädigter", w: 116, f: "a" }],
    pfeile: [{ von: "u", nach: "k", t: "Leistung", f: "b", b: -22 }, { von: "k", nach: "u", t: "Entgelt", f: "c", b: -22 },
      { von: "s", nach: "g", t: "Schadensersatz", f: "c" }],
    notizen: [{ x: 180, y: 14, t: "✓ Leistungsaustausch – steuerbar", f: "b" }, { x: 180, y: 156, t: "✗ keine Gegenleistung – nicht steuerbar", f: "d" }],
    legende: LG,
  }],
  "ust-befreiung": [{
    knopf: "Steuerfrei – oder Option?", titel: "Befreiung und Verzicht",
    text: "Die Befreiung schließt den **Vorsteuerabzug** aus. Mit der Option nach § 9 UStG holt sich der Unternehmer ihn zurück.",
    art: "stufen", schritte: [
      { t: "Umsatz steuerbar?", sub: "§ 1 Abs. 1 Nr. 1 UStG", f: "a", nr: "1" },
      { t: "Steuerbefreiung nach § 4 UStG?", sub: "z. B. Vermietung (Nr. 12), Heilbehandlung (Nr. 14)", f: "e", nr: "2" },
      { zweig: [
        { titel: "Keine Option", f: "d", schritte: ["steuerfrei", "Vorsteuer aus Eingangsleistungen ausgeschlossen (§ 15 Abs. 2 S. 1 Nr. 1)"] },
        { titel: "Option (§ 9 UStG)", f: "b", schritte: ["nur bei Umsatz an einen Unternehmer für dessen Unternehmen", "Grundstück: Mieter nutzt nur für vorsteuerunschädliche Umsätze (§ 9 Abs. 2)", "→ steuerpflichtig, Vorsteuerabzug möglich"] }] }],
  }],
  "ust-bmg": [{
    knopf: "Brutto, Netto, Steuer", titel: "Steuer aus dem Bruttobetrag herausrechnen",
    text: "Die Bemessungsgrundlage ist das **Nettoentgelt** – die Umsatzsteuer selbst gehört nicht dazu (§ 10 Abs. 1 S. 2 UStG).",
    art: "balken", balken: [
      { titel: "Bruttobetrag 119 € bei 19 %", teile: [{ t: "Netto 100 € = BMG", wert: 100, f: "b" }, { t: "USt 19 €", wert: 19, f: "d" }], unter: "Netto = 119 € ÷ 1,19 · Steuer = 119 € × 19/119" },
      { titel: "Bruttobetrag 107 € bei 7 %", teile: [{ t: "Netto 100 € = BMG", wert: 100, f: "b" }, { t: "7 €", wert: 7, f: "d" }], max: 119, unter: "Steuer = 107 € × 7/107" }],
  }],
  "ust-entstehung": [{
    knopf: "Entstehung am Zeitstrahl", titel: "Soll-Versteuerung mit Anzahlung",
    text: "Die Steuer entsteht mit **Ablauf des Monats**, in dem geleistet wird – bei einer Anzahlung schon mit Ablauf des Monats der Zahlung.",
    art: "achse", min: 0, max: 3.6, pfeil: true,
    ticks: [[0, "Feb"], [1, "März"], [2, "April"], [3, "Mai"]],
    reihen: [{ t: "Voranmeldungszeitraum = Monat", spannen: [{ a: 0, b: 1, t: "Anzahlung", f: "c" }, { a: 1, b: 2, t: "Lieferung", f: "b" }] }],
    marken: [{ v: 0.25, t: "08.02. Anzahlung", sub: "→ USt darauf: Feb", f: "c" }, { v: 1.55, t: "18.03. Lieferung", sub: "→ Rest-USt: März", f: "b", z: 1 }, { v: 2.32, t: "10.04. Voranmeldung", sub: "für März fällig", f: "a" }],
    merke: "Spätere Entgeltänderung (Skonto, Rücksendung) → Berichtigung im Monat der **Änderung** (§ 17 Abs. 1 UStG).",
  }],
  "ust-wertabgabe": [{
    knopf: "Was gilt als Umsatz?", titel: "Unentgeltliche Wertabgaben",
    text: "Was ohne Gegenleistung das Unternehmen verlässt, wird **wie ein Umsatz** besteuert – aber nur, wenn vorher Vorsteuer abgezogen wurde.",
    art: "fluss", w: 360, h: 268,
    knoten: [
      { id: "u", x: 72, y: 136, t: "Unternehmen", sub: "Vorsteuer bei\nAnschaffung gezogen", w: 128, f: "a" },
      { id: "p", x: 296, y: 36, t: "Unternehmer\nprivat", w: 112, f: "f" },
      { id: "k", x: 296, y: 236, t: "Personal\noder Kunden", w: 112, f: "e" }],
    pfeile: [{ von: "u", nach: "p", t: "Entnahme\n(§ 3 Abs. 1b Nr. 1)", f: "b", b: -40, lp: 0.45 }, { von: "u", nach: "p", t: "Privatnutzung\n(§ 3 Abs. 9a Nr. 1)", f: "e", b: 40, str: 1, lp: 0.6 },
      { von: "u", nach: "k", t: "Zuwendung, Geschenk\n(§ 3 Abs. 1b Nr. 2, 3)", f: "b", b: -24 }],
    merke: "Ausnahmen: Aufmerksamkeiten bis **60 € brutto** an Personal, Geschenke bis **50 € netto** je Empfänger und Jahr, Warenmuster.",
  }],
  "ust-sonder": [{
    knopf: "Kommission", titel: "Verkaufskommission (§ 3 Abs. 3 UStG)",
    text: "Der Kommissionär verkauft **im eigenen Namen für fremde Rechnung**. Umsatzsteuerlich liegen zwei Lieferungen vor.",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "a", x: 64, y: 44, t: "Kommittent", sub: "Eigentümer", w: 112, f: "a" },
      { id: "c", x: 296, y: 44, t: "Kunde", w: 112, f: "e" },
      { id: "b", x: 180, y: 168, t: "Kommissionär", sub: "eigener Name,\nfremde Rechnung", w: 124, f: "f" }],
    pfeile: [{ von: "a", nach: "b", t: "Lieferung ①", f: "b", b: 34, lp: 0.4 }, { von: "b", nach: "c", t: "Lieferung ②", f: "b", b: 34, lp: 0.6 },
      { von: "c", nach: "b", t: "Kaufpreis", f: "c", b: 34, lp: 0.4, str: 1 }, { von: "b", nach: "a", t: "Erlös −\nProvision", f: "c", b: 34, lp: 0.6, str: 1 }],
    notizen: [{ x: 180, y: 232, t: "Lieferung ① gilt erst mit Lieferung ② als ausgeführt", klein: 1 }],
    legende: LG,
  }, {
    knopf: "Reihengeschäft", titel: "Reihengeschäft (§ 3 Abs. 6a UStG)",
    text: "Mehrere Umsatzgeschäfte, aber die Ware gelangt **direkt** vom ersten zum letzten Abnehmer – nur **eine** Lieferung ist die bewegte.",
    art: "fluss", w: 360, h: 228,
    knoten: [
      { id: "a", x: 50, y: 62, t: "A", sub: "Hersteller", w: 84, f: "a" },
      { id: "b", x: 180, y: 62, t: "B", sub: "Großhändler", w: 84, f: "a" },
      { id: "c", x: 310, y: 62, t: "C", sub: "Einzelhändler", w: 84, f: "a" }],
    pfeile: [{ von: "a", nach: "b", t: "Lieferung 1", f: "b", dy: -32 }, { von: "b", nach: "c", t: "Lieferung 2", f: "b", dy: -32 },
      { von: "a", nach: "c", t: "Ware direkt von A zu C", f: "c", b: 96, str: 1 }],
    notizen: [{ x: 180, y: 206, t: "A befördert → Lieferung 1 ist die bewegte (Ort: Beginn, § 3 Abs. 6)\nLieferung 2 ruht (Ort: Ende der Beförderung, § 3 Abs. 7 S. 2 Nr. 2)", klein: 1 }],
  }, {
    knopf: "Reverse Charge (§ 13b)", titel: "Der Empfänger schuldet die Steuer",
    text: "Bei Bauleistungen an Bauunternehmer schuldet der **Leistungsempfänger** die Umsatzsteuer – und zieht sie zugleich als Vorsteuer ab.",
    art: "fluss", w: 360, h: 224,
    knoten: [
      { id: "s", x: 64, y: 58, t: "Subunternehmer", sub: "Bauleistung", w: 116, f: "a" },
      { id: "g", x: 252, y: 58, t: "Bauunternehmer", sub: "Empfänger", w: 120, f: "e" },
      { id: "fa", x: 252, y: 196, t: "Finanzamt", w: 120, f: "n" }],
    pfeile: [{ von: "s", nach: "g", t: "Rechnung netto, ohne USt", f: "b", dy: -32 }, { von: "g", nach: "fa", t: "schuldet USt\n(§ 13b Abs. 5)", f: "d", b: 52, lp: 0.32 }, { von: "fa", nach: "g", t: "zieht sie als Vorsteuer ab\n(§ 15 Abs. 1 S. 1 Nr. 4)", f: "b", b: 52, lp: 0.3 }],
    notizen: [{ x: 84, y: 178, t: "Ergebnis meist:\n0 € Zahllast", f: "n" }],
  }, {
    knopf: "Kleinunternehmer-Grenzen", titel: "Kleinunternehmer (§ 19 UStG)",
    text: "Beide Grenzen müssen passen: höchstens **25.000 €** im Vorjahr und höchstens **100.000 €** im laufenden Jahr.",
    art: "achse", min: 0, max: 120, pfeil: true,
    ticks: [[0, "0 €"], [25, "25.000 €"], [100, "100.000 €"]],
    reihen: [
      { t: "Gesamtumsatz im Vorjahr", spannen: [{ a: 0, b: 25, t: "≤ 25.000", f: "b" }, { a: 25, b: 120, t: "zu hoch – Regelbesteuerung", f: "d" }] },
      { t: "Gesamtumsatz im laufenden Jahr", spannen: [{ a: 0, b: 100, t: "bis 100.000 € steuerfrei", f: "b" }, { a: 100, b: 120, t: "darüber", f: "d" }] }],
    merke: "Folgen: **kein Steuerausweis, kein Vorsteuerabzug**. Verzicht möglich – Bindung 5 Jahre (§ 19 Abs. 3 UStG).",
  }],

  // =============================================================================================
  // Abgabenordnung
  "ao-grundlagen": [{
    knopf: "Steuer, Gebühr, Beitrag", titel: "Öffentliche Abgaben",
    text: "Entscheidend ist die **Gegenleistung**: Die Steuer hat keine – Gebühr und Beitrag schon.",
    art: "baum", wurzel: { t: "Öffentliche Abgaben", f: "a" },
    aeste: [
      { t: "Steuer", sub: "§ 3 Abs. 1 AO", f: "b", blaetter: ["Geldleistung", "keine Gegenleistung für eine besondere Leistung", "allen auferlegt, die den Tatbestand erfüllen"] },
      { t: "Gebühr", f: "e", blaetter: ["Gegenleistung für eine bestimmte Leistung", "z. B. Passgebühr"] },
      { t: "Beitrag", f: "f", blaetter: ["für das Bereitstellen einer Einrichtung", "auch ohne Nutzung, z. B. Kurbeitrag"] }],
    merke: "Verspätungs- und Säumniszuschläge, Zinsen, Zwangsgelder sind **steuerliche Nebenleistungen** (§ 3 Abs. 4 AO) – keine Steuern.",
  }],
  "ao-erklaerung": [{
    knopf: "Abgabefristen & Zuschlag", titel: "Steuererklärung für 2025",
    text: "Wer die Frist versäumt, riskiert einen Verspätungszuschlag – erst nach Ermessen, ab 14 Monaten nach Jahresende **zwingend** (§ 152 Abs. 2 AO).",
    art: "achse", min: 0, max: 18, pfeil: true,
    ticks: [[0, "01.01.26"], [7, "31.07.26"], [14, "Ende Feb. 27"]],
    reihen: [
      { t: "ohne Steuerberater", spannen: [{ a: 0, b: 7, t: "Abgabefrist", f: "b" }, { a: 7, b: 14, t: "Ermessen", f: "c" }, { a: 14, b: 18, t: "zwingend", f: "d" }] },
      { t: "mit Steuerberater", spannen: [{ a: 0, b: 14, t: "Abgabefrist (§ 149 Abs. 3)", f: "b" }, { a: 14, b: 18, t: "zwingend", f: "d" }] }],
    merke: "Höhe: **0,25 %** der festgesetzten Steuer je angefangenen Monat, mindestens 25 € je Monat, höchstens 25.000 € (§ 152 Abs. 5, 10 AO).",
  }],
  "ao-zwang": [{
    knopf: "Ablauf beim Zwangsgeld", titel: "Vom Verwaltungsakt zum Zwangsgeld",
    text: "Zwangsgeld ist **Beugemittel, keine Strafe**: Es soll die Handlung erzwingen und fällt weg, sobald sie erfüllt ist.",
    art: "stufen", schritte: [
      { t: "Verwaltungsakt mit Handlungspflicht", sub: "z. B. Steuererklärung abgeben (§ 328 Abs. 1 AO)", f: "e", nr: "1" },
      { t: "Schriftliche Androhung", sub: "angemessene Frist, bestimmte Höhe (§ 332 AO) – eigener Verwaltungsakt", f: "c", nr: "2" },
      { t: "Frist verstrichen → Festsetzung", sub: "§ 333 AO – eigener Verwaltungsakt, höchstens 25.000 €", f: "d", nr: "3" },
      { zweig: [
        { titel: "Pflicht erfüllt", f: "b", schritte: ["Vollzug einstellen (§ 335 AO)"] },
        { titel: "uneinbringlich", f: "d", schritte: ["Ersatzzwangshaft möglich (§ 334 AO)"] }] }],
  }],
  "ao-va": [{
    knopf: "Ist das ein Verwaltungsakt?", titel: "Die Merkmale des § 118 AO",
    text: "Fehlt **ein** Merkmal, liegt kein Verwaltungsakt vor – dann gibt es auch keinen Einspruch.",
    art: "stufen", schritte: [
      { t: "Hoheitliche Maßnahme einer Behörde", sub: "fehlt z. B. beim Kauf von Büromaterial (privatrechtlich)", f: "a", nr: "1" },
      { t: "auf dem Gebiet des öffentlichen Rechts", f: "a", nr: "2" },
      { t: "zur Regelung", sub: "fehlt bei schlichten Auskünften und Hinweisen", f: "a", nr: "3" },
      { t: "eines Einzelfalls", sub: "fehlt bei Richtlinien und BMF-Schreiben", f: "a", nr: "4" },
      { t: "mit Außenwirkung", sub: "fehlt bei innerdienstlichen Weisungen", f: "a", nr: "5" },
      { t: "= Verwaltungsakt", sub: "wird mit Bekanntgabe wirksam, ist mit dem Einspruch anfechtbar", f: "b", ergebnis: 1 }],
  }],
  "ao-wirksamkeit": [{
    knopf: "Fehlerhaft – und trotzdem wirksam?", titel: "Rechtswidrig ist nicht unwirksam",
    text: "Ein fehlerhafter Verwaltungsakt gilt, **bis er aufgehoben wird**. Nur der nichtige ist von Anfang an unwirksam (§ 124 Abs. 2, 3 AO).",
    art: "baum", wurzel: { t: "Bekannt gegebener Verwaltungsakt", sub: "wirksam ab Bekanntgabe (§ 124 Abs. 1 AO)", f: "a" },
    aeste: [
      { t: "rechtmäßig", f: "b", blaetter: ["wirksam"] },
      { t: "rechtswidrig", f: "c", blaetter: ["trotzdem wirksam", "Einspruch innerhalb eines Monats", "danach bestandskräftig"] },
      { t: "nichtig (§ 125 AO)", f: "d", blaetter: ["besonders schwerwiegender und offenkundiger Fehler", "unwirksam von Anfang an"] }],
  }],
  "ao-bekanntgabe": [{
    knopf: "Vier-Tages-Fiktion & Einspruchsfrist", titel: "Bescheid per Post",
    text: "Ein Bescheid per Post gilt am **vierten Tag** nach Aufgabe zur Post als bekannt gegeben. Fällt der Tag auf ein Wochenende, verschiebt er sich auf den nächsten Werktag.",
    art: "achse", min: 0, max: 38, pfeil: true,
    ticks: [[0, "Mi 04.03."], [12, "Mo 09.03."], [37, "Do 09.04."]],
    reihen: [{ t: "Bekanntgabe und Einspruchsfrist (nicht maßstäblich)", spannen: [{ a: 0, b: 9, t: "+ 4 Tage", f: "c" }, { a: 12, b: 37, t: "Einspruchsfrist 1 Monat", f: "e" }] }],
    marken: [{ v: 0, t: "Aufgabe zur Post", f: "n" }, { v: 9, t: "So 08.03.: 4. Tag", sub: "Sonntag → nächster Werktag", f: "c", z: 1 }, { v: 12, t: "Bekanntgabe Mo 09.03.", sub: "§ 122 Abs. 2, § 108 Abs. 3 AO", f: "b", z: 2 }, { v: 37, t: "Fristende 24 Uhr", sub: "§ 355 Abs. 1 AO", f: "e" }],
    merke: "Die Fiktion gilt nicht, wenn der Bescheid **später** zugeht – im Zweifel muss das Finanzamt den Zugang beweisen.",
  }],
  "ao-vorbehalt": [{
    knopf: "§ 164, § 165, § 168 im Vergleich", titel: "Vorbehalt, Vorläufigkeit, Anmeldung",
    text: "Der Vorbehalt hält den **ganzen** Fall offen, die Vorläufigkeit nur **einzelne Punkte**, die Anmeldung wirkt wie ein Vorbehalt.",
    art: "matrix", ecke: "", spalten: ["Vorbehalt § 164", "Vorläufig § 165", "Anmeldung § 168"],
    zeilen: [
      { t: "Wann?", zellen: [{ t: "Fall nicht abschließend geprüft", f: "e" }, { t: "Ungewissheit, anhängige Verfahren", f: "f" }, { t: "Steuer selbst berechnet (USt-VA, LSt)", f: "c" }] },
      { t: "Umfang", zellen: [{ t: "ganzer Bescheid", f: "e" }, { t: "nur soweit vorläufig", f: "f" }, { t: "wie eine Vorbehalts\u00adfestsetzung", f: "c" }] },
      { t: "Begründung", zellen: [{ t: "nicht nötig", f: "n" }, { t: "Umfang und Grund angeben", f: "n" }, { t: "–", f: "n" }] }],
  }],
  "ao-feststellung": [{
    knopf: "Grundlagen- und Folgebescheid", titel: "Gesonderte und einheitliche Feststellung",
    text: "Bei einer OHG wird der Gewinn **einmal** festgestellt und verteilt – das bindet die Einkommensteuerbescheide der Gesellschafter (§ 182 Abs. 1 AO).",
    art: "fluss", w: 360, h: 236,
    knoten: [
      { id: "f", x: 180, y: 46, t: "Betriebsfinanzamt der OHG", sub: "Feststellungsbescheid", w: 220, f: "a" },
      { id: "a", x: 76, y: 196, t: "Wohnsitz-FA\nGesellschafter A", sub: "ESt-Bescheid", w: 134, f: "e" },
      { id: "b", x: 284, y: 196, t: "Wohnsitz-FA\nGesellschafter B", sub: "ESt-Bescheid", w: 134, f: "e" }],
    pfeile: [{ von: "f", nach: "a", t: "Anteil A\nbindend", f: "a", dx: -26 }, { von: "f", nach: "b", t: "Anteil B\nbindend", f: "a", dx: 26 }],
    merke: "Einwendungen nur gegen den **Grundlagenbescheid** (§ 351 Abs. 2 AO).",
  }],
  "ao-zustaendigkeit": [{
    knopf: "Welches Finanzamt?", titel: "Örtliche Zuständigkeit",
    text: "Je nach Steuer knüpft die AO an einen anderen Ort an.",
    art: "matrix", breit: 1, spalten: ["zuständiges Finanzamt"],
    zeilen: [
      { t: "Einkommensteuer", zellen: [{ gross: "Wohnsitzfinanzamt", t: "§ 19 Abs. 1 AO", f: "e" }] },
      { t: "Körperschaftsteuer", zellen: [{ gross: "Ort der Geschäftsleitung", t: "§ 20 AO", f: "e" }] },
      { t: "Umsatzsteuer", zellen: [{ gross: "von wo aus das Unternehmen betrieben wird", t: "§ 21 AO", f: "e" }] },
      { t: "Gewerbesteuermessbetrag", zellen: [{ gross: "Betriebsfinanzamt", t: "§ 22 AO, § 18 Abs. 1 Nr. 2 AO", f: "a" }] },
      { t: "Gewinnfeststellung Gewerbe", zellen: [{ gross: "Betriebsfinanzamt", t: "§ 18 Abs. 1 Nr. 2 AO", f: "a" }] },
      { t: "Gewinnfeststellung freiberuflich", zellen: [{ gross: "Tätigkeitsfinanzamt", t: "§ 18 Abs. 1 Nr. 3 AO", f: "a" }] }],
    merke: "Ein Verstoß macht den Bescheid **rechtswidrig, nicht nichtig** (§ 125 Abs. 3 Nr. 1 AO).",
  }],
  "ao-fristen": [{
    knopf: "Monatsfrist berechnen", titel: "Beginn, Dauer, Ende",
    text: "Der Ereignistag zählt nicht mit. Die Monatsfrist endet am Tag mit **derselben Zahl** – fehlt dieser Tag, am letzten Tag des Monats.",
    art: "achse", min: 0, max: 31, pfeil: true,
    ticks: [[0, "Di 31.03."], [30, "Do 30.04."]],
    reihen: [{ t: "Einspruchsfrist: ein Monat", spannen: [{ a: 1, b: 30, t: "Frist läuft ab 01.04., 0 Uhr", f: "e" }] }],
    marken: [{ v: 0, t: "Bekanntgabe", sub: "zählt nicht mit (§ 187 Abs. 1 BGB)", f: "n" }, { v: 30, t: "Ende 30.04., 24 Uhr", sub: "kein 31.04. → § 188 Abs. 3 BGB", f: "d", z: 1 }],
    merke: "Endet die Frist an einem Samstag, Sonntag oder Feiertag, läuft sie bis zum **nächsten Werktag** (§ 108 Abs. 3 AO).",
  }],
  "ao-erhebung": [{
    knopf: "Fälligkeit & Säumniszuschlag", titel: "Wann wird es teuer?",
    text: "Wer bis zum Ablauf des Fälligkeitstags nicht zahlt, schuldet **kraft Gesetzes** Säumniszuschläge – bei Überweisung mit drei Tagen Schonfrist.",
    art: "achse", min: 0, max: 10, pfeil: true,
    ticks: [[0, "31.12.25"], [3, "10.06.26"], [6, "10.07."], [7, "13.07."]],
    reihen: [{ t: "Einkommensteuer 2025 – Abschlusszahlung", spannen: [{ a: 3, b: 6, t: "1 Monat", f: "e" }, { a: 6, b: 7, t: "", f: "c" }, { a: 7, b: 10, t: "1 % je Monat", f: "d" }] }],
    marken: [{ v: 0, t: "Entstehung", sub: "Ablauf des Jahres", f: "n" }, { v: 3, t: "Bekanntgabe", sub: "des Bescheids", f: "a", z: 1 }, { v: 6, t: "Fällig 10.07.", sub: "§ 36 Abs. 4 EStG", f: "e" }, { v: 8.5, t: "Säumniszuschlag", sub: "§ 240 Abs. 1 AO", f: "d", z: 1 }],
    merke: "Schonfrist bis 13.07. (3 Tage, § 240 Abs. 3 AO) – zahlt er später, zählen die Zuschläge ab Fälligkeit. Rückstand auf volle **50 €** abrunden.",
  }],

  // =============================================================================================
  // Privatrecht
  "pr-grundlagen": [{
    knopf: "Die fünf Bücher des BGB", titel: "Aufbau des BGB",
    text: "Das BGB ist vom Allgemeinen zum Besonderen aufgebaut – was im Allgemeinen Teil steht, gilt für alle anderen Bücher.",
    art: "stufen", schritte: [
      { t: "1. Allgemeiner Teil", sub: "§§ 1–240 BGB · Personen, Sachen, Rechtsgeschäfte, Fristen", f: "a", nr: "1" },
      { t: "2. Schuldrecht", sub: "§§ 241–853 BGB · AT bis § 432, BT ab § 433 (Kauf, Miete, Delikt)", f: "e", nr: "2" },
      { t: "3. Sachenrecht", sub: "§§ 854–1296 BGB · Besitz, Eigentum, Pfandrechte", f: "b", nr: "3" },
      { t: "4. Familienrecht", sub: "§§ 1297–1921 BGB", f: "f", nr: "4" },
      { t: "5. Erbrecht", sub: "§§ 1922–2385 BGB", f: "c", nr: "5" }],
  }, {
    knopf: "Privat oder öffentlich?", titel: "Gleichordnung oder Über- und Unterordnung",
    text: "Nicht wer handelt, entscheidet – sondern **wie**: auf Augenhöhe oder hoheitlich.",
    art: "fluss", w: 360, h: 236,
    knoten: [
      { id: "a", x: 66, y: 56, t: "Bürger", w: 110, f: "e" },
      { id: "b", x: 294, y: 56, t: "Bürger", w: 110, f: "e" },
      { id: "s", x: 180, y: 162, t: "Staat", sub: "hoheitlich", w: 110, f: "d" },
      { id: "c", x: 180, y: 226, t: "Bürger", w: 110, f: "e", h: 26 }],
    pfeile: [{ von: "a", nach: "b", t: "Vertrag – Privatrecht", f: "b", beide: 1 }, { von: "s", nach: "c", f: "d" }],
    notizen: [{ x: 300, y: 190, t: "öffentliches\nRecht", f: "d" }],
  }],
  "pr-anspruch": [{
    knopf: "Drei Prüfungsstufen", titel: "Anspruch prüfen",
    text: "Jeder Anspruch wird in drei Stufen geprüft – jede Stufe hat ihre eigenen Gegenrechte.",
    art: "stufen", schritte: [
      { t: "Anspruch entstanden?", sub: "rechtshindernde Einwendungen: §§ 105, 117, 125, 134, 138 BGB", f: "b", nr: "1" },
      { t: "Anspruch nicht erloschen?", sub: "rechtsvernichtende Einwendungen: Erfüllung § 362, Anfechtung § 142, Aufrechnung § 389 BGB", f: "c", nr: "2" },
      { t: "Anspruch durchsetzbar?", sub: "rechtshemmende Einreden: Verjährung § 214, §§ 273, 320 BGB", f: "e", nr: "3" },
      { t: "Ergebnis", sub: "„V hat gegen K einen Anspruch auf … aus § 433 Abs. 2 BGB.“", f: "a", ergebnis: 1 }],
    merke: "Einwendungen beachtet das Gericht von selbst – **Einreden** nur, wenn sich der Schuldner darauf beruft.",
  }],
  "pr-privatautonomie": [{
    knopf: "Vertragsfreiheit und Grenzen", titel: "Privatautonomie",
    text: "Jeder darf seine Rechtsverhältnisse selbst gestalten (Art. 2 Abs. 1 GG) – die Grenzen schützen den Schwächeren und die Rechtsordnung.",
    art: "baum", wurzel: { t: "Vertragsfreiheit", f: "a" },
    aeste: [
      { t: "Abschlussfreiheit", sub: "ob und mit wem", f: "b", blaetter: ["Grenze: Kontrahierungszwang, z. B. Grundversorgung"] },
      { t: "Inhaltsfreiheit", sub: "was", f: "e", blaetter: ["Grenze: Verbotsgesetz (§ 134 BGB)", "Grenze: Sittenwidrigkeit, Wucher (§ 138 BGB)"] },
      { t: "Formfreiheit", sub: "wie", f: "f", blaetter: ["Grenze: Formvorschriften, z. B. § 311b Abs. 1 BGB"] }],
  }],
  "pr-rechtssubjekte": [{
    knopf: "Wer ist rechtsfähig?", titel: "Rechtssubjekte",
    text: "Rechtsfähig ist, wer Träger von Rechten und Pflichten sein kann – Menschen ab der Geburt und Gebilde, denen das Gesetz Rechtsfähigkeit verleiht.",
    art: "baum", wurzel: { t: "Rechtssubjekte", f: "a" },
    aeste: [
      { t: "Natürliche Personen", sub: "ab Vollendung der Geburt (§ 1 BGB)", f: "b", blaetter: ["jeder Mensch"] },
      { t: "Juristische Personen", f: "e", blaetter: ["eingetragener Verein (mind. 7 Mitglieder)", "GmbH (25.000 € Stammkapital), AG", "öffentlich-rechtlich: Bund, Länder, Gemeinden"] },
      { t: "Rechtsfähige Personengesellschaften", f: "f", blaetter: ["GbR (§ 705 Abs. 2 BGB)", "oHG, KG"] }],
  }],
  "pr-rechtsobjekte": [{
    knopf: "Sachen, Rechte, Tiere", titel: "Rechtsobjekte",
    text: "Sachen sind nur **körperliche** Gegenstände (§ 90 BGB). Wesentliche Bestandteile teilen das Schicksal der Hauptsache.",
    art: "baum", wurzel: { t: "Gegenstände des Rechtsverkehrs", f: "a" },
    aeste: [
      { t: "Sachen (§ 90)", f: "b", blaetter: ["bewegliche Sachen", "Grundstücke", "wesentliche Bestandteile (§§ 93, 94) – nicht sonderrechtsfähig", "Zubehör (§ 97) – eigene Sache, im Zweifel mitverkauft"] },
      { t: "Rechte", f: "e", blaetter: ["Forderungen", "Patente, Urheberrechte"] },
      { t: "Tiere (§ 90a)", f: "c", blaetter: ["keine Sachen", "Vorschriften über Sachen gelten entsprechend"] }],
  }],
  "pr-geschaeftsfaehigkeit": [{
    knopf: "Altersstufen", titel: "Geschäfts- und Deliktsfähigkeit nach Alter",
    text: "Das BGB schützt Minderjährige vor **rechtlichen Nachteilen** – die Altersgrenzen unterscheiden sich bei Verträgen und bei unerlaubten Handlungen.",
    art: "achse", min: 0, max: 20, pfeil: true,
    ticks: [[0, "Geburt"], [7, "7"], [10, "10"], [18, "18"]],
    reihen: [
      { t: "Geschäftsfähigkeit", spannen: [{ a: 0, b: 7, t: "unfähig (§ 104)", f: "d" }, { a: 7, b: 18, t: "beschränkt (§ 106)", f: "c" }, { a: 18, b: 20, t: "voll", f: "b" }] },
      { t: "Deliktsfähigkeit (§ 828 BGB)", spannen: [{ a: 0, b: 7, t: "nicht (Abs. 1)", f: "d" }, { a: 7, b: 18, t: "bei Einsichtsfähigkeit (Abs. 3)", f: "c" }, { a: 18, b: 20, t: "voll", f: "b" }] },
      { t: "Unfall mit Kfz oder Bahn", spannen: [{ a: 7, b: 10, t: "nicht (Abs. 2)", f: "d" }] }],
    merke: "Beschränkt Geschäftsfähige brauchen die Einwilligung der Eltern – außer bei **lediglich rechtlichem Vorteil** (§ 107 BGB) oder Taschengeld (§ 110 BGB).",
  }],
  "pr-willenserklaerung": [{
    knopf: "Aufbau der Willenserklärung", titel: "Äußerer und innerer Tatbestand",
    text: "Außen ein erkennbares Verhalten, innen drei Willenselemente – fehlt der Handlungswille, liegt gar keine Erklärung vor.",
    art: "baum", wurzel: { t: "Willenserklärung", sub: "auf eine Rechtsfolge gerichtete Willensäußerung", f: "a" },
    aeste: [
      { t: "Äußerer Tatbestand", f: "e", blaetter: ["erkennbares Verhalten: Worte, Schrift, Handzeichen, schlüssiges Handeln"] },
      { t: "Innerer Tatbestand", f: "f", blaetter: [{ t: "Handlungswille", sub: "fehlt z. B. im Schlaf – dann keine Erklärung" }, { t: "Erklärungsbewusstsein", sub: "fehlt es, kann trotzdem eine Erklärung vorliegen" }, { t: "Geschäftswille", sub: "fehlt er → Anfechtung prüfen" }] }],
  }],
  "pr-rechtsgeschaefte": [{
    knopf: "Barkauf: drei Geschäfte", titel: "Trennungs- und Abstraktionsprinzip",
    text: "Beim Barkauf gibt es **drei Rechtsgeschäfte** mit sechs Willenserklärungen: Der Kaufvertrag verpflichtet nur, übereignet wird gesondert.",
    art: "fluss", w: 360, h: 246,
    knoten: [
      { id: "v", x: 62, y: 120, t: "Verkäufer", w: 104, f: "a" },
      { id: "k", x: 298, y: 120, t: "Käufer", w: 104, f: "e" }],
    pfeile: [{ von: "v", nach: "k", t: "① Kaufvertrag (§ 433)\nVerpflichtung", f: "a", beide: 1, b: 0, dy: -2 },
      { von: "v", nach: "k", t: "② Übereignung der Sache (§ 929)", f: "b", b: -70 },
      { von: "k", nach: "v", t: "③ Übereignung des Geldes (§ 929)", f: "c", b: -70 }],
    merke: "Ist der Kaufvertrag nichtig, bleibt die Übereignung wirksam – Rückabwicklung über **§ 812 BGB**.",
  }],
  "pr-vertragsschluss": [{
    knopf: "Angebot und Annahme", titel: "Wie kommt der Vertrag zustande?",
    text: "Die Ware im Schaufenster ist noch kein Angebot – erst der Kunde macht es, der Händler nimmt an.",
    art: "ablauf", links: "Händler", rechts: "Kunde", fl: "a", fr: "e",
    schritte: [
      { von: "l", t: "Ware im Schaufenster: invitatio ad offerendum", sub: "nur Aufforderung, ein Angebot abzugeben", f: "n", str: 1 },
      { von: "r", t: "Angebot (§ 145 BGB)", sub: "„Ich nehme die Jacke für 80 €.“", f: "e" },
      { von: "l", t: "Annahme (§ 147 BGB)", sub: "rechtzeitig und ohne Änderung", f: "a" }],
    ende: { t: "Vertrag geschlossen", f: "b" },
    merke: "Verspätete oder geänderte Annahme = **neues Angebot** (§ 150 BGB).",
  }],
  "pr-anfechtung": [{
    knopf: "Prüfung der Anfechtung", titel: "Anfechtung in vier Schritten",
    text: "Wirksam angefochten ist das Geschäft **von Anfang an nichtig** (§ 142 Abs. 1 BGB).",
    art: "stufen", schritte: [
      { t: "Anfechtungsgrund", sub: "Inhalts- oder Erklärungsirrtum (§ 119 Abs. 1), Eigenschaftsirrtum (§ 119 Abs. 2), Übermittlungsfehler (§ 120), Täuschung oder Drohung (§ 123)", f: "c", nr: "1" },
      { t: "Anfechtungserklärung", sub: "gegenüber dem Anfechtungsgegner (§ 143 BGB)", f: "e", nr: "2" },
      { t: "Anfechtungsfrist", sub: "Irrtum: unverzüglich (§ 121) · Täuschung, Drohung: 1 Jahr (§ 124)", f: "e", nr: "3" },
      { t: "Rechtsfolge: nichtig von Anfang an", sub: "bei Irrtum Ersatz des Vertrauensschadens (§ 122 BGB)", f: "d", ergebnis: 1 }],
  }],
  "pr-stellvertretung": [{
    knopf: "Vertretungsdreieck", titel: "Stellvertretung (§ 164 BGB)",
    text: "Der Vertreter gibt eine **eigene** Erklärung **im Namen** des Vertretenen ab – der Vertrag kommt zwischen Vertretenem und Drittem zustande.",
    art: "fluss", w: 360, h: 250,
    knoten: [
      { id: "g", x: 180, y: 40, t: "Vertretener", w: 120, f: "a" },
      { id: "v", x: 70, y: 206, t: "Vertreter", w: 112, f: "f" },
      { id: "d", x: 290, y: 206, t: "Dritter", w: 112, f: "e" }],
    pfeile: [{ von: "g", nach: "v", t: "Vertretungsmacht\n(Vollmacht § 167)", f: "f", dx: -46 }, { von: "v", nach: "d", t: "eigene WE im Namen\ndes Vertretenen", f: "a", dy: 16 },
      { von: "g", nach: "d", t: "Vertrag wirkt für\nund gegen ihn", f: "b", beide: 1, str: 1, dx: 46 }],
    merke: "Ohne Vertretungsmacht: schwebend unwirksam, Genehmigung nach **§ 177 BGB**. Boten übermitteln nur – sie brauchen keine Geschäftsfähigkeit.",
  }],
  "pr-schuldverhaeltnis": [{
    knopf: "Gläubiger und Schuldner", titel: "Das Schuldverhältnis",
    text: "Aus dem Schuldverhältnis kann der Gläubiger eine Leistung fordern (§ 241 Abs. 1 BGB) – mit der Leistung erlischt die Pflicht (§ 362 BGB).",
    art: "fluss", w: 360, h: 210,
    knoten: [
      { id: "g", x: 66, y: 82, t: "Gläubiger", w: 112, f: "b" },
      { id: "s", x: 294, y: 82, t: "Schuldner", w: 112, f: "d" },
      { id: "e", x: 180, y: 186, t: "entstanden durch Vertrag oder Gesetz", w: 260, f: "n", h: 30 }],
    pfeile: [{ von: "g", nach: "s", t: "Forderung (§ 241 Abs. 1)", f: "b", b: -24 }, { von: "s", nach: "g", t: "Leistung → Erfüllung (§ 362)", f: "d", b: -24 }],
  }],
  "pr-gesetzlich": [{
    knopf: "Nichtiger Vertrag – was jetzt?", titel: "Welche Anspruchsgrundlage hilft?",
    text: "Je nachdem, **was** unwirksam ist, holt man die Sache auf anderem Weg zurück.",
    art: "baum", wurzel: { t: "Vertrag nichtig", f: "a" },
    aeste: [
      { t: "Nur die Verpflichtung", sub: "Übereignung bleibt wirksam", f: "c", blaetter: ["Leistungskondiktion § 812 Abs. 1 S. 1 Alt. 1 BGB", "Herausgabe, sonst Wertersatz (§ 818 Abs. 2)"] },
      { t: "Auch die Übereignung", sub: "Eigentum nicht übergegangen", f: "e", blaetter: ["Herausgabe vom Besitzer § 985 BGB", "kein Recht zum Besitz (§ 986)"] },
      { t: "Rechtsgut verletzt", f: "d", blaetter: ["daneben Schadensersatz § 823 Abs. 1 BGB"] }],
  }],
  "pr-verjaehrung": [{
    knopf: "Regelverjährung am Zeitstrahl", titel: "Drei Jahre ab Jahresende",
    text: "Die regelmäßige Frist von **3 Jahren** beginnt erst mit dem **Schluss des Jahres**, in dem der Anspruch entstanden ist und der Gläubiger davon weiß (§§ 195, 199 Abs. 1 BGB).",
    art: "achse", min: 0, max: 4.4, pfeil: true,
    ticks: [[0.4, "15.05.26"], [1, "31.12.26"], [4, "31.12.29"]],
    reihen: [{ t: "Kaufpreisanspruch, fällig am 15.05.2026", spannen: [{ a: 0.4, b: 1, t: "", f: "n" }, { a: 1, b: 4, t: "Verjährungsfrist 3 Jahre", f: "e" }] }],
    marken: [{ v: 0.4, t: "Anspruch entsteht", sub: "Gläubiger weiß davon", f: "n" }, { v: 1, t: "Fristbeginn", sub: "mit Jahresende", f: "e", z: 1 }, { v: 4, t: "verjährt mit Ablauf", sub: "des 31.12.2029", f: "d" }],
    merke: "Nach Ablauf darf der Schuldner die Leistung **verweigern** (§ 214 Abs. 1 BGB) – der Anspruch besteht aber weiter.",
  }],
  "pr-kauf": [{
    knopf: "Mängelrechte des Käufers", titel: "Was kann der Käufer bei einem Mangel verlangen?",
    text: "Zuerst bekommt der Verkäufer eine zweite Chance: **Nacherfüllung** hat Vorrang (§ 437 Nr. 1, § 439 BGB).",
    art: "stufen", schritte: [
      { t: "Sachmangel bei Gefahrübergang", sub: "§§ 434, 446 BGB", f: "d", nr: "1" },
      { t: "Nacherfüllung nach Wahl des Käufers", sub: "Beseitigung des Mangels oder neue Sache (§ 439 BGB)", f: "b", nr: "2" },
      { t: "Frist erfolglos abgelaufen", sub: "oder Nacherfüllung fehlgeschlagen bzw. verweigert", f: "c", nr: "3" },
      { zweig: [
        { titel: "Rücktritt", f: "e", schritte: ["§§ 437 Nr. 2, 440, 323 BGB", "nicht bei unerheblichem Mangel"] },
        { titel: "oder Minderung", f: "e", schritte: ["§ 441 BGB", "Preis wird herabgesetzt"] },
        { titel: "daneben Schadensersatz", f: "a", schritte: ["§§ 437 Nr. 3, 280, 281 BGB", "Verschulden nötig"] }] }],
    merke: "Mängelansprüche verjähren in **2 Jahren ab Ablieferung** (§ 438 Abs. 1 Nr. 3 BGB).",
  }],
  "pr-sachenrecht": [{
    knopf: "Eigentum übertragen", titel: "Bewegliche Sache oder Grundstück?",
    text: "Eigentum geht nicht schon mit dem Kaufvertrag über – es braucht ein eigenes **Verfügungsgeschäft**.",
    art: "matrix", ecke: "", spalten: ["bewegliche Sache", "Grundstück"],
    zeilen: [
      { t: "Einigung", zellen: [{ t: "Einigung über den Eigentumsübergang (§ 929 S. 1)", f: "b" }, { t: "Auflassung vor dem Notar (§ 925)", f: "e" }] },
      { t: "Vollzug", zellen: [{ t: "Übergabe", f: "b" }, { t: "Eintragung ins Grundbuch (§ 873)", f: "e" }] },
      { t: "Form", zellen: [{ t: "formfrei", f: "n" }, { t: "Kaufvertrag notariell (§ 311b Abs. 1)", f: "n" }] },
      { t: "Vom Nichtberechtigten", zellen: [{ t: "gutgläubig nach § 932, nicht bei gestohlenen Sachen (§ 935)", f: "c" }, { t: "Vertrauen auf das Grundbuch (§ 892)", f: "c" }] }],
    merke: "**Besitz** ist die tatsächliche Herrschaft (§ 854), **Eigentum** die rechtliche (§ 903 BGB).",
  }],
};
