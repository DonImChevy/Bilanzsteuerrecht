// Klausursimulation Bilanzrecht: Einzelsachverhalte im Stil der Semesterklausur (GS I) mit empfohlener Bearbeitungszeit,
// gewürfelten Zahlen, knapper Musterlösung (Würdigung → AK/AfA → Buchung mit Gewinnauswirkung) und Bewertungsbogen.
// Eigene Sachverhalte – Aufbau und Problemkreise wie in der Klausur, kein Klausurtext übernommen. Rechtsstand 2026, WJ = KJ 2026.
// Format je Sachverhalt: { id, titel, teil: 1|2, min, erzeugen(r) → { sv, aufgaben[], loesung[], bewertung: [[Punkte, Text]], zahlen? } }
// zahlen: [{ frage, wert, einheit, toleranz, p }] – prüft die App selbst; alles andere hakt man am Bewertungsbogen ab.

const r2 = (x) => Math.round(x * 100) / 100;
export const e = (x) => r2(x).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const g = (x) => (Math.abs(x) < 0.005 ? "±0" : (x > 0 ? "+" : "−") + e(Math.abs(x)));
const BS = (text, guv, bvv = guv) => `BS: ${text} → GuV ${g(guv)} · BVV ${g(bvv)}`;
const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const tag = (t, m) => `${String(t).padStart(2, "0")}.${String(m).padStart(2, "0")}.2026`;
const NAMEN = [["Frieda Fuchs", "F"], ["Bernd Brandt", "B"], ["Lena Lorenz", "L"], ["Tarek Tamm", "T"], ["Merle Marx", "M"], ["Henrik Hansen", "H"], ["Selin Sommer", "S"], ["Jonas Jäger", "J"]];
const BRANCHE = ["E-Bikes", "Kaffeemaschinen", "Gartengeräte", "Outdoor-Ausrüstung", "Musikinstrumente", "Büromöbel"];

export const VORBEMERKUNGEN = [
  "Die genannten Kaufleute betreiben im Inland ein Gewerbe und ermitteln ihren Gewinn durch Betriebsvermögensvergleich nach § 5 Abs. 1 i. V. m. § 4 Abs. 1 S. 1 EStG. Wirtschaftsjahr = Kalenderjahr 2026.",
  "Wahlrechte sind so auszuüben, dass sich für 2026 der niedrigste Gewinn ergibt; auf die degressive AfA ist nicht einzugehen. Bei Gebäuden wird handelsrechtlich der steuerliche AfA-Satz übernommen.",
  "Die Kaufleute sind Unternehmer, versteuern nach vereinbarten Entgelten, geben monatlich Voranmeldungen ab und sind voll zum Vorsteuerabzug berechtigt; die Voraussetzungen des Vorsteuerabzugs liegen vor. Gebucht wird nach dem Nettoverfahren (Konten Vorsteuer und Umsatzsteuer).",
  "Erforderliche Belege, Verzeichnisse und Anträge liegen vor. Niedrigere Teilwerte bestehen zum 31.12.2026 nicht. Beträge dürfen kaufmännisch gerundet werden; Rechenwege sind nachvollziehbar darzustellen.",
];
export const AUFGABE_TEIL2 = [
  "Würdigen Sie die Sachverhalte unter Angabe der handels- und steuerrechtlichen Vorschriften und Verwaltungsanweisungen; gehen Sie auf die Umsatzsteuer angemessen ein.",
  "Bilden Sie die noch erforderlichen Buchungs- bzw. Berichtigungssätze für 2026 und geben Sie die Auswirkungen auf den Gewinn lt. GuV und lt. Betriebsvermögensvergleich an.",
  "Stellen Sie, soweit verlangt, die Bilanzansätze zum 31.12.2026 dar.",
];

// =========================================================================================== Teil I
const warenkonten = {
  id: "bsr-k-waren", titel: "Warenkonten fortführen und abschließen", teil: 1, min: 45,
  erzeugen(r) {
    let x;
    for (let versuch = 0; versuch < 50; versuch++) {
      x = { ab: r.zahl(60, 99) * 1000, b1: r.zahl(30, 60) * 1000, v1: r.zahl(20, 45) * 1000, h1: r.zahl(2, 6) * 1000,
        f1: r.zahl(70, 110) * 1000, f2: r.zahl(35, 60) * 1000, s1: r.zahl(3, 8) * 1000,
        E: r.zahl(12, 25) * 1000, F: r.zahl(3, 9) * 100, VN: r.zahl(10, 20) * 1000, RN: r.zahl(15, 30) * 100,
        d: r.wahl([-1, 1]) * r.zahl(3, 14) * 1000 };
      x.sb = x.ab + x.d;
      x.VB = r2(x.VN * 1.19); x.RB = r2(x.VB - x.RN * 1.19); x.SkB = r2(x.RB * 0.02); x.SkN = r2(x.SkB / 1.19); x.SkU = r2(x.SkB - x.SkN);
      x.NP = x.b1 + x.v1 + x.E + x.F - x.h1; x.BV = x.ab - x.sb; x.WE = x.NP + x.BV;
      x.UE = r2(x.f1 + x.f2 + x.VN - x.s1 - x.RN - x.SkN); x.RG = r2(x.UE - x.WE);
      if (x.RG > x.WE * 0.06 && x.RG < x.WE * 0.6) break;
    }
    const [name, k] = r.wahl(NAMEN), quote = r2((x.RG / x.WE) * 100);
    const mehr = x.BV < 0, bv = Math.abs(x.BV);
    return {
      sv: `Für das Einzelhandelsgeschäft von ${name} (${k}) liegen für 2026 folgende Warenkonten vor (Beträge netto):\n` +
        `• Warenbestand: Anfangsbestand (EBK) ${e(x.ab)}\n` +
        `• Wareneinkauf (WEK): Soll – Bank ${e(x.b1)}, Verbindlichkeiten aLL ${e(x.v1)}; Haben – Verbindlichkeiten aLL (Rücksendung) ${e(x.h1)}\n` +
        `• Warenverkauf (WVK): Soll – Forderungen aLL (Rücksendung) ${e(x.s1)}; Haben – Forderungen aLL ${e(x.f1)}, Bank ${e(x.f2)}\n` +
        `Bis zum Jahresende kommen hinzu:\n` +
        `a) Einkauf von Waren auf Ziel, netto ${e(x.E)}.\n` +
        `b) Für die Lieferung aus a) zahlt ${k} dem Spediteur bar ${e(x.F)} zzgl. 19 % USt.\n` +
        `c) Verkauf von Waren auf Ziel für brutto ${e(x.VB)}.\n` +
        `d) Der Kunde aus c) schickt Waren im Wert von netto ${e(x.RN)} zurück.\n` +
        `e) Der Kunde überweist den Rest aus c) unter Abzug von 2 % Skonto.\n` +
        `f) Die Inventur zum 31.12.2026 ergibt einen Warenschlussbestand von ${e(x.sb)}.`,
      aufgaben: ["Bilden Sie die Buchungssätze zu a) bis f).", "Führen Sie die Warenkonten mit Unterkonten (Bezugskosten, gewährte Skonti, Bestandsveränderung) und das GuV-Konto; nennen Sie die vorbereitenden Abschlussbuchungen und die Abschlussbuchungen.", "Ermitteln Sie Wareneinsatz, Warenrohgewinn und Rohgewinnaufschlagsatz."],
      loesung: [
        `BS: a) WEK ${e(x.E)}, Vorsteuer ${e(x.E * 0.19)} an Verbindlichkeiten aLL ${e(x.E * 1.19)}`,
        `BS: b) Bezugskosten ${e(x.F)}, Vorsteuer ${e(x.F * 0.19)} an Kasse ${e(x.F * 1.19)}`,
        `BS: c) Forderungen aLL ${e(x.VB)} an WVK ${e(x.VN)}, Umsatzsteuer ${e(x.VB - x.VN)}`,
        `BS: d) WVK ${e(x.RN)}, Umsatzsteuer ${e(x.RN * 0.19)} an Forderungen aLL ${e(x.RN * 1.19)}`,
        `BS: e) Bank ${e(x.RB - x.SkB)}, gewährte Skonti ${e(x.SkN)}, Umsatzsteuer ${e(x.SkU)} an Forderungen aLL ${e(x.RB)} (Skonto 2 % von ${e(x.RB)} = ${e(x.SkB)} brutto)`,
        `BS: f) SBK ${e(x.sb)} an Warenbestand ${e(x.sb)}`,
        `Vorbereitende Abschlussbuchungen: WEK an Bezugskosten ${e(x.F)} · WVK an gewährte Skonti ${e(x.SkN)} · ${mehr
          ? `Bestandsmehrung: Warenbestand an Bestandsveränderung ${e(bv)}, Bestandsveränderung an WEK ${e(bv)}`
          : `Bestandsminderung: Bestandsveränderung an Warenbestand ${e(bv)}, WEK an Bestandsveränderung ${e(bv)}`}.`,
        `Abschlussbuchungen: GuV an WEK ${e(x.WE)} · WVK an GuV ${e(x.UE)} · GuV an Eigenkapital ${e(x.RG)}.`,
        `Wareneinsatz = Anfangsbestand ${e(x.ab)} + Einkäufe netto (inkl. Bezugskosten, abzgl. Rücksendungen) ${e(x.NP)} − Schlussbestand ${e(x.sb)} = ${e(x.WE)}.`,
        `Warenrohgewinn = Nettoerlöse ${e(x.UE)} − Wareneinsatz ${e(x.WE)} = ${e(x.RG)}.`,
        `Rohgewinnaufschlagsatz = Rohgewinn × 100 / Wareneinsatz = ${quote.toLocaleString("de-DE")} %.`,
      ],
      bewertung: [[1, "a) Einkauf mit Vorsteuer"], [1.5, "b) Bezugskosten als eigenes Unterkonto, Vorsteuer"], [1, "c) Verkauf mit USt"], [1.5, "d) Rücksendung mindert WVK und USt"],
        [3, "e) Skonto: Bruttobetrag, Aufteilung netto/USt, Bankbetrag"], [1, "f) Schlussbestand an SBK"], [1, "Bezugskosten über WEK abgeschlossen"], [1, "gewährte Skonti über WVK abgeschlossen"],
        [2, "Bestandsveränderung richtig (Richtung und Betrag) über WEK"], [4, "Konten vollständig geführt und abgeschlossen (WEK, WVK, Warenbestand, GuV)"], [2, "GuV-Saldo an Eigenkapital"],
        [2, "Wareneinsatz"], [1, "Warenrohgewinn"], [2, "Rohgewinnaufschlagsatz"]],
      zahlen: [{ frage: "Wareneinsatz", wert: x.WE, einheit: "€", toleranz: 1, p: 0 }, { frage: "Warenrohgewinn", wert: x.RG, einheit: "€", toleranz: 1, p: 0 }, { frage: "Rohgewinnaufschlagsatz", wert: quote, einheit: "%", toleranz: 0.05, p: 0 }],
    };
  },
};

const kennzahlen = {
  id: "bsr-k-guv", titel: "Erfolgskennzahlen aus dem GuV-Konto", teil: 1, min: 10,
  erzeugen(r) {
    const W = r.zahl(180, 320) * 1000, U = W + r.zahl(80, 200) * 1000, P = r.zahl(40, 70) * 1000, A = r.zahl(8, 25) * 1000, S = r.zahl(10, 30) * 1000, Z = r.zahl(2, 9) * 1000;
    const RG = U - W, GW = RG - P - A - S - Z, auf = r2((RG / W) * 100), spanne = r2((RG / U) * 100);
    return {
      sv: `Das GuV-Konto eines Großhändlers weist für 2026 aus: Umsatzerlöse ${e(U)}, Wareneinsatz ${e(W)}, Personalaufwand ${e(P)}, Abschreibungen ${e(A)}, sonstige betriebliche Aufwendungen ${e(S)}, Zinsaufwand ${e(Z)}.`,
      aufgaben: ["Ermitteln Sie Warenrohgewinn, Reingewinn, Rohgewinnaufschlagsatz und Handelsspanne.", "Wie lautet der Buchungssatz zum Abschluss des GuV-Kontos?"],
      loesung: [`Warenrohgewinn = ${e(U)} − ${e(W)} = ${e(RG)}.`, `Reingewinn = ${e(RG)} − ${e(P)} − ${e(A)} − ${e(S)} − ${e(Z)} = ${e(GW)}.`,
        `Rohgewinnaufschlagsatz = ${e(RG)} × 100 / ${e(W)} = ${auf.toLocaleString("de-DE")} %.`, `Handelsspanne = ${e(RG)} × 100 / ${e(U)} = ${spanne.toLocaleString("de-DE")} %.`,
        `BS: GuV ${e(GW)} an Eigenkapital ${e(GW)}`],
      bewertung: [[1, "Warenrohgewinn"], [1.5, "Reingewinn (alle Aufwendungen abgezogen)"], [1.5, "Rohgewinnaufschlagsatz (Bezug: Wareneinsatz)"], [1, "Handelsspanne (Bezug: Umsatz)"], [1, "Abschlussbuchung GuV an Eigenkapital"]],
      zahlen: [{ frage: "Reingewinn", wert: GW, einheit: "€", toleranz: 1, p: 0 }, { frage: "Rohgewinnaufschlagsatz", wert: auf, einheit: "%", toleranz: 0.05, p: 0 }],
    };
  },
};

const lohn = {
  id: "bsr-k-lohn", titel: "Gehaltsabrechnung mit Vorschuss", teil: 1, min: 15,
  erzeugen(r) {
    const B = r.zahl(32, 55) * 100, l = r2(B * r.zahl(10, 16) / 100), ki = r2(l * 0.09), an = r2(B * 0.2105), ag = r2(B * 0.2085), V = r.zahl(3, 8) * 100;
    const aus = r2(B - l - ki - an - V);
    return {
      sv: `Die Angestellte Clara C. erhält für Dezember 2026 ein Bruttogehalt von ${e(B)}. Abzuziehen sind Lohnsteuer ${e(l)}, Kirchensteuer ${e(ki)} und der Arbeitnehmeranteil zur Sozialversicherung ${e(an)}. Der Arbeitgeberanteil zur Sozialversicherung beträgt ${e(ag)}. Im November hatte Clara einen Gehaltsvorschuss von ${e(V)} erhalten (zutreffend als sonstige Forderung gebucht), der jetzt einbehalten wird. Das Gehalt wird am 30.12.2026 überwiesen; Steuern und Beiträge werden erst im Januar abgeführt.`,
      aufgaben: ["Bilden Sie den Buchungssatz zur Gehaltsabrechnung und geben Sie die Gewinnauswirkung an."],
      loesung: [`Auszahlungsbetrag = ${e(B)} − ${e(l)} − ${e(ki)} − ${e(an)} − ${e(V)} = ${e(aus)}.`,
        BS(`Gehälter ${e(B)}, gesetzliche soziale Aufwendungen ${e(ag)} an Verbindlichkeiten gegenüber Finanzbehörden ${e(l + ki)}, Verbindlichkeiten gegenüber Sozialversicherungsträgern ${e(an + ag)}, sonstige Forderungen ${e(V)}, Bank ${e(aus)}`, -(B + ag))],
      bewertung: [[1.5, "Bruttogehalt als Aufwand"], [1.5, "Arbeitgeberanteil als eigener Aufwand"], [1.5, "Lohn- und Kirchensteuer als Verbindlichkeit ggü. Finanzamt"], [1.5, "AN- und AG-Anteil als Verbindlichkeit ggü. SV-Trägern"], [1, "Vorschuss mit sonstiger Forderung verrechnet"], [1, "Auszahlungsbetrag und Gewinnauswirkung"]],
      zahlen: [{ frage: "Auszahlungsbetrag", wert: aus, einheit: "€", toleranz: 1, p: 0 }],
    };
  },
};

// =========================================================================================== Teil II
const warenkauf = {
  id: "bsr-k-wareneinlage", titel: "Wareneinkauf mit Rabatt, Fracht und Zahlung vom Privatkonto", teil: 2, min: 20,
  erzeugen(r) {
    const [name, k] = r.wahl(NAMEN), ware = r.wahl(BRANCHE), n1 = r.zahl(4, 12), p1 = r.zahl(6, 18) * 100, n2 = r.zahl(2, 6), p2 = r.zahl(12, 30) * 100, q = r.wahl([5, 8, 10]);
    const L = n1 * p1 + n2 * p2, R = r2(L * q / 100), N = L - R, fr = r.zahl(15, 45) * 10, m = r.zahl(3, 7);
    return {
      sv: `${name} (${k}) handelt mit ${ware}. Am ${tag(r.zahl(3, 25), m)} wird eine Lieferung angeliefert und berechnet: ${n1} Stück zu ${e(p1)} und ${n2} Stück zu ${e(p2)} = ${e(L)}, abzüglich ${q} % Händlerrabatt ${e(R)} = ${e(N)}, zzgl. 19 % USt ${e(N * 0.19)} = ${e(N * 1.19)}.\nDie Rechnung wird im ${MONAT[m]} vom privaten Bankkonto von ${k} bezahlt. Der Spediteur erhielt bei Anlieferung bar ${e(fr)} zzgl. 19 % USt; ${k} buchte: sonstiger betrieblicher Aufwand ${e(fr * 1.19)} an Kasse ${e(fr * 1.19)}. Weitere Buchungen fehlen. Die Ware ist bis zum Jahresende vollständig verkauft; die Verkäufe sind zutreffend gebucht.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `Mit der Lieferung wird ${k} Eigentümer (§ 246 Abs. 1 S. 2 HGB, § 39 Abs. 1 AO); Anschaffungszeitpunkt ist die Lieferung (§ 9a EStDV). Die Waren sind notwendiges Betriebsvermögen und Umlaufvermögen (§ 247 Abs. 2 HGB im Umkehrschluss, R 6.1 Abs. 2 EStR).`,
        `Anschaffungskosten (§ 255 Abs. 1 HGB, § 6 Abs. 1 Nr. 2 S. 1 EStG): Listenpreis ${e(L)} − Rabatt ${e(R)} (Anschaffungspreisminderung, § 255 Abs. 1 S. 3 HGB) + Fracht ${e(fr)} (Nebenkosten, § 255 Abs. 1 S. 2 HGB) = ${e(N + fr)}. Die Vorsteuer gehört nicht zu den AK (§ 9b Abs. 1 EStG) und ist abziehbar (§ 15 Abs. 1 S. 1 Nr. 1 UStG).`,
        BS(`WEK ${e(N)}, Vorsteuer ${e(N * 0.19)} an Verbindlichkeiten aLL ${e(N * 1.19)}`, -N),
        BS(`Bezugskosten ${e(fr)}, Vorsteuer ${e(fr * 0.19)} an sonstige betriebliche Aufwendungen ${e(fr * 1.19)}`, r2(fr * 0.19)),
        `Die Zahlung vom privaten Konto ist eine Einlage (§ 4 Abs. 1 S. 8 EStG), bewertet mit dem Teilwert (§ 6 Abs. 1 Nr. 5 EStG) = Nennwert der getilgten Schuld.`,
        BS(`Verbindlichkeiten aLL ${e(N * 1.19)} an Privateinlagen ${e(N * 1.19)}`, 0),
      ],
      bewertung: [[1, "Eigentum und Anschaffungszeitpunkt mit Normen"], [1, "notwendiges BV, Umlaufvermögen"], [2, "AK-Berechnung, Rabatt mindert AK"], [1.5, "Fracht als Anschaffungsnebenkosten"], [1, "Vorsteuer keine AK, abziehbar"],
        [1, "Buchung Wareneinkauf mit Gewinnauswirkung"], [1.5, "Berichtigung der Frachtbuchung mit Gewinnauswirkung"], [1, "Privatzahlung als Einlage mit Bewertung"], [1, "Buchung der Einlage, GuV/BVV ±0"]],
    };
  },
};

const umtausch = {
  id: "bsr-k-umtausch", titel: "Rückgabe wegen Mangels und Ersatzkauf", teil: 2, min: 10,
  erzeugen(r) {
    const n1 = r.zahl(18, 35) * 100, n2 = n1 - r.zahl(4, 10) * 100, m = r.zahl(2, 10), t1 = r.zahl(2, 12), t2 = t1 + r.zahl(5, 14);
    const diff = n1 - n2;
    return {
      sv: `Ein Kunde kaufte am ${tag(t1, m)} ein Gerät für ${e(n1 * 1.19)} brutto und zahlte bar; der Verkauf ist zutreffend gebucht. Am ${tag(t2, m)} bringt er es wegen eines Mangels zurück. Man einigt sich: Er erhält stattdessen ein einfacheres Modell für ${e(n2)} zzgl. 19 % USt und die Differenz von ${e(diff * 1.19)} bar zurück. Gebucht wurde dazu nichts.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `Die Rückgabe macht die erste Lieferung rückgängig und mindert Erlös und Bemessungsgrundlage (vgl. § 17 Abs. 2 Nr. 3 UStG; Rückgabe im selben Voranmeldungszeitraum). Die Lieferung des Ersatzgeräts ist steuerbar und steuerpflichtig (§ 1 Abs. 1 Nr. 1 UStG).`,
        `Im Ergebnis mindern sich die Umsatzerlöse um ${e(diff)} und die Umsatzsteuer um ${e(diff * 0.19)}.`,
        BS(`WVK (Umsatzerlöse) ${e(diff)}, Umsatzsteuer ${e(diff * 0.19)} an Kasse ${e(diff * 1.19)}`, -diff),
      ],
      bewertung: [[1.5, "Rückgängigmachung mindert Erlös und Umsatzsteuer"], [1.5, "Ersatzlieferung steuerbar und steuerpflichtig"], [1.5, "Differenzbetrag richtig ermittelt"], [1.5, "Buchung mit Gewinnauswirkung"]],
    };
  },
};

const grundstueck = {
  id: "bsr-k-grundstueck", titel: "Erwerb eines bebauten Betriebsgrundstücks", teil: 2, min: 60,
  erzeugen(r) {
    const [name, k] = r.wahl(NAMEN), K = r.zahl(35, 90) * 10000, p = r.wahl([20, 25, 30, 35, 40]) / 100, m = r.zahl(4, 9), mv = m - r.zahl(1, 2);
    const M = r2(K * r.wahl([2, 2.5, 3]) / 100), NK = r.zahl(9, 18) * 100, NG = r.zahl(3, 7) * 100, GE = r.zahl(6, 14) * 100, GG = r.zahl(2, 6) * 100, GrESt = r2(K * 0.055), jahr = r.zahl(1990, 2015);
    const anteil = (b) => [r2(b * p), r2(b - r2(b * p))];
    const [kG, kB] = anteil(K), [mG, mB] = anteil(M), [nG, nB] = anteil(NK), [gG, gB] = anteil(GE), [sG, sB] = anteil(GrESt);
    const AKgrund = r2(kG + mG + nG + gG + sG), AKgeb = r2(kB + mB + nB + gB + sB), monate = 13 - m, afa = r2(AKgeb * 0.03 * monate / 12);
    return {
      sv: `${name} (${k}) erwirbt für den Betrieb ein bebautes Grundstück (Lager mit Büro, ausschließlich betrieblich genutzt). Der notarielle Kaufvertrag wird am ${tag(r.zahl(5, 25), mv)} geschlossen; Nutzen und Lasten gehen am ${tag(1, m)} über, an diesem Tag wird der Kaufpreis von ${e(K)} überwiesen. Die Grundbuchumschreibung erfolgt im November. Auf den Grund und Boden entfallen unstreitig ${Math.round(p * 100)} %. Der Bauantrag wurde ${jahr} gestellt.\n${k} buchte: Aufwendungen für Grundstücke ${e(K)} an Bank ${e(K)}.\nNoch nicht gebucht sind:\n• Maklerprovision ${e(M)} zzgl. 19 % USt, von ${k} vom privaten Konto bezahlt;\n• Notarrechnung: Beurkundung Kaufvertrag ${e(NK)}, Bestellung einer Grundschuld für das Finanzierungsdarlehen ${e(NG)}, jeweils zzgl. 19 % USt (Bank);\n• Gerichtskosten: Eigentumsumschreibung ${e(GE)}, Eintragung der Grundschuld ${e(GG)} (Bank);\n• Grunderwerbsteuer laut Bescheid ${e(GrESt)} (Bank).`,
      aufgaben: [...AUFGABE_TEIL2, "Stellen Sie die Bilanzansätze für Grund und Boden und Gebäude dar."],
      loesung: [
        `Mit dem Kaufvertrag liegt zunächst ein schwebendes Geschäft vor (kein Ausweis, R 5.7 Abs. 7 EStR). Angeschafft ist das Grundstück mit Übergang von Nutzen und Lasten am ${tag(1, m)} – wirtschaftliches Eigentum (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 HGB; § 9a EStDV); auf die Grundbuchumschreibung kommt es nicht an.`,
        `Grund und Boden und Gebäude sind zwei Wirtschaftsgüter des notwendigen Betriebsvermögens (R 4.2 Abs. 7 EStR) und Anlagevermögen (§ 247 Abs. 2 HGB, R 6.1 Abs. 1 EStR); Bewertung mit den AK (§ 253 Abs. 1 S. 1 HGB; § 6 Abs. 1 Nr. 1, 2 EStG), Aufteilung im Verhältnis ${Math.round(p * 100)} : ${Math.round((1 - p) * 100)}.`,
        `AK (§ 255 Abs. 1 HGB): Kaufpreis ${e(K)} + Makler ${e(M)} + Notar Kaufvertrag ${e(NK)} + Gericht Umschreibung ${e(GE)} + Grunderwerbsteuer ${e(GrESt)}. Davon Grund und Boden ${e(AKgrund)}, Gebäude ${e(AKgeb)}. Die Vorsteuer gehört nicht dazu (§ 9b Abs. 1 EStG).`,
        `Notar- und Gerichtskosten der Grundschuld (${e(NG)} + ${e(GG)}) sind Geldbeschaffungskosten, keine AK – sofort Aufwand. Die privat bezahlte Maklerrechnung ist eine Einlage (§ 4 Abs. 1 S. 8, § 6 Abs. 1 Nr. 5 EStG).`,
        BS(`Grund und Boden ${e(kG)}, Gebäude ${e(kB)} an Aufwendungen für Grundstücke ${e(K)}`, K),
        BS(`Grund und Boden ${e(mG)}, Gebäude ${e(mB)}, Vorsteuer ${e(M * 0.19)} an Privateinlagen ${e(M * 1.19)}`, 0),
        BS(`Grund und Boden ${e(nG)}, Gebäude ${e(nB)}, Nebenkosten des Geldverkehrs ${e(NG)}, Vorsteuer ${e((NK + NG) * 0.19)} an Bank ${e((NK + NG) * 1.19)}`, -NG),
        BS(`Grund und Boden ${e(gG)}, Gebäude ${e(gB)}, Nebenkosten des Geldverkehrs ${e(GG)} an Bank ${e(GE + GG)}`, -GG),
        BS(`Grund und Boden ${e(sG)}, Gebäude ${e(sB)} an Bank ${e(GrESt)}`, 0),
        `AfA: Bauantrag nach dem 31.03.1985, Betriebsgebäude → 3 % (§ 7 Abs. 4 S. 1 Nr. 1 EStG), zeitanteilig ${monate}/12 (vgl. § 7 Abs. 1 S. 4 EStG): ${e(AKgeb)} × 3 % × ${monate}/12 = ${e(afa)}. Grund und Boden ist nicht abnutzbar.`,
        BS(`AfA Gebäude ${e(afa)} an Gebäude ${e(afa)}`, -afa),
        `Bilanzansätze 31.12.2026: Grund und Boden ${e(AKgrund)} (§ 6 Abs. 1 Nr. 2 EStG), Gebäude ${e(AKgeb)} − ${e(afa)} = ${e(AKgeb - afa)} (§ 253 Abs. 3 HGB, § 6 Abs. 1 Nr. 1 EStG).`,
      ],
      bewertung: [[1.5, "Schwebendes Geschäft bis Übergang Nutzen/Lasten"], [2, "Anschaffungszeitpunkt = wirtschaftliches Eigentum mit Normen"], [2, "Zwei WG, notwendiges BV, Anlagevermögen"],
        [1, "Kaufpreis als AK"], [1.5, "Maklerprovision als AK"], [1.5, "Notar Kaufvertrag als AK"], [1.5, "Gericht Umschreibung als AK"], [1.5, "Grunderwerbsteuer als AK"], [1, "Vorsteuer keine AK"],
        [2, "Grundschuldkosten als Geldbeschaffungskosten (Aufwand)"], [2, "Aufteilung Grund und Boden / Gebäude"], [1.5, "Makler: Einlage mit Bewertung"],
        [2, "AfA-Satz 3 % mit Norm"], [1.5, "Zeitanteilige AfA"], [1, "AfA-Betrag"], [2, "Bilanzansätze"], [1.5, "Berichtigung der Aufwandsbuchung"], [3, "Übrige Buchungen mit Gewinnauswirkung"]],
      zahlen: [{ frage: "AK Gebäude", wert: AKgeb, einheit: "€", toleranz: 2, p: 0 }, { frage: "AfA Gebäude 2026", wert: afa, einheit: "€", toleranz: 2, p: 0 }],
    };
  },
};

const darlehen = {
  id: "bsr-k-darlehen", titel: "Fälligkeitsdarlehen mit Damnum und Zinsabgrenzung", teil: 2, min: 20,
  erzeugen(r) {
    const D = r.zahl(10, 40) * 10000, z = r.wahl([3, 3.5, 4, 4.5, 5]), d = r.wahl([1, 2, 3]), n = r.wahl([5, 8, 10]), m = r.zahl(3, 10);
    const dam = r2(D * d / 100), monate = 13 - m, aufl = r2(dam * monate / (n * 12)), zins = r2(D * z / 100 * monate / 12);
    return {
      sv: `Zur Finanzierung einer Lagerhalle nimmt ein Kaufmann am ${tag(1, m)} ein Fälligkeitsdarlehen über ${e(D)} auf (Laufzeit ${n} Jahre, Zinssatz ${String(z).replace(".", ",")} % p. a., Zinsfestschreibung für die gesamte Laufzeit). Die Bank zahlt ${100 - d} % aus. Die Zinsen sind jährlich nachschüssig fällig, erstmals am ${tag(1, m).replace("2026", "2027")}.\nGebucht wurde: Bank an Darlehen ${e(D - dam)}.`,
      aufgaben: [...AUFGABE_TEIL2, "Geben Sie die Bilanzansätze zum 31.12.2026 an."],
      loesung: [
        `Verbindlichkeiten sind mit dem Erfüllungsbetrag anzusetzen (§ 253 Abs. 1 S. 2 HGB, § 6 Abs. 1 Nr. 3 EStG): ${e(D)}.`,
        `Das Damnum von ${e(dam)} ist steuerlich als aktiver Rechnungsabgrenzungsposten auszuweisen (§ 5 Abs. 5 S. 1 Nr. 1 EStG; handelsrechtlich Wahlrecht § 250 Abs. 3 HGB, H 6.10 „Damnum“ EStH) und über die Zinsfestschreibung linear aufzulösen: ${e(dam)} × ${monate}/${n * 12} = ${e(aufl)}.`,
        `Die Zinsen für ${tag(1, m).slice(0, 5)}.–31.12. (${monate} Monate) sind 2026 wirtschaftlich verursacht, aber erst 2027 fällig → sonstige Verbindlichkeit (antizipativer Posten): ${e(D)} × ${String(z).replace(".", ",")} % × ${monate}/12 = ${e(zins)}.`,
        BS(`aktiver RAP ${e(dam)} an Darlehen ${e(dam)}`, 0),
        BS(`Zinsaufwand ${e(aufl)} an aktiver RAP ${e(aufl)}`, -aufl),
        BS(`Zinsaufwand ${e(zins)} an sonstige Verbindlichkeiten ${e(zins)}`, -zins),
        `Bilanzansätze: Darlehen ${e(D)}, aktiver RAP ${e(dam - aufl)}, sonstige Verbindlichkeiten ${e(zins)}.`,
      ],
      bewertung: [[2, "Darlehen mit Erfüllungsbetrag"], [2, "Damnum als aktiver RAP mit Normen"], [2, "Auflösung zeitanteilig"], [2, "Zinsabgrenzung als sonstige Verbindlichkeit"], [1.5, "Buchungen mit Gewinnauswirkung"], [1.5, "Bilanzansätze"]],
      zahlen: [{ frage: "Auflösung Damnum 2026", wert: aufl, einheit: "€", toleranz: 1, p: 0 }, { frage: "Zinsabgrenzung", wert: zins, einheit: "€", toleranz: 1, p: 0 }],
    };
  },
};

const firmenwagen = {
  id: "bsr-k-firmenwagen", titel: "Kauf eines Firmenwagens", teil: 2, min: 30,
  erzeugen(r) {
    const LP = r.zahl(32, 60) * 1000, Rab = r.zahl(2, 6) * 1000, Ue = r.zahl(5, 12) * 100, Z = r.zahl(28, 45), KZ = r.zahl(20, 40) * 1.19, KS = r.zahl(40, 120), Tank = r.zahl(60, 110), m = r.zahl(3, 11), t = r.zahl(2, 26);
    const netto = LP - Rab + Ue, KZn = r2(KZ / 1.19), AK = r2(netto + Z + KZn), monate = 13 - m, afa = r2(AK / 6 * monate / 12);
    return {
      sv: `Am ${tag(t, m)} kauft ein Großhändler unter Eigentumsvorbehalt einen neuen Pkw, der ausschließlich betrieblich genutzt wird (Nutzungsdauer 6 Jahre). Rechnung: Listenpreis ${e(LP)} − Rabatt ${e(Rab)} + Überführung ${e(Ue)} = ${e(netto)} zzgl. 19 % USt ${e(netto * 0.19)}; bezahlt mit der betrieblichen Girocard.\nBar bezahlt wurden: Zulassungsgebühren ${e(Z)}, Kennzeichen ${e(KZ)} inkl. USt und die erste Tankfüllung ${e(Tank * 1.19)} inkl. USt. Die Kfz-Steuer für 2026 (${e(KS)}) wird im ${MONAT[Math.min(11, m)]} vom Bankkonto abgebucht. Gebucht wurde bisher nichts.`,
      aufgaben: [...AUFGABE_TEIL2, "Stellen Sie den Bilanzansatz des Pkw dar."],
      loesung: [
        `Trotz Eigentumsvorbehalt ist der Händler wirtschaftlicher Eigentümer (§ 39 Abs. 2 Nr. 1 AO, § 246 Abs. 1 S. 2 HGB). Der Pkw ist notwendiges Betriebsvermögen (R 4.2 Abs. 1 EStR), abnutzbares bewegliches Anlagevermögen (§ 247 Abs. 2 HGB).`,
        `AK (§ 255 Abs. 1 HGB, § 6 Abs. 1 Nr. 1 EStG): ${e(LP)} − ${e(Rab)} + Überführung ${e(Ue)} + Zulassung ${e(Z)} + Kennzeichen netto ${e(KZn)} = ${e(AK)}. Rabatt mindert die AK; Überführung, Zulassung und Kennzeichen sind Nebenkosten. Vorsteuer keine AK (§ 9b Abs. 1 EStG). Kfz-Steuer und Tankfüllung sind laufender Aufwand.`,
        `AfA linear (§ 7 Abs. 1 S. 1, 2 EStG), zeitanteilig ab ${MONAT[m - 1]} (§ 7 Abs. 1 S. 4 EStG): ${e(AK)} / 6 × ${monate}/12 = ${e(afa)}.`,
        BS(`Pkw ${e(netto)}, Vorsteuer ${e(netto * 0.19)} an Bank ${e(netto * 1.19)}`, 0),
        BS(`Pkw ${e(Z + KZn)}, Kfz-Kosten ${e(Tank)}, Vorsteuer ${e(r2(KZ - KZn) + Tank * 0.19)} an Kasse ${e(Z + KZ + Tank * 1.19)}`, -Tank),
        BS(`Kfz-Steuer ${e(KS)} an Bank ${e(KS)}`, -KS),
        BS(`AfA ${e(afa)} an Pkw ${e(afa)}`, -afa),
        `Bilanzansatz 31.12.2026: ${e(AK)} − ${e(afa)} = ${e(AK - afa)} (§ 253 Abs. 3 HGB, § 6 Abs. 1 Nr. 1 EStG).`,
      ],
      bewertung: [[2, "Wirtschaftliches Eigentum trotz Eigentumsvorbehalt"], [1.5, "Notwendiges BV, abnutzbares AV"], [1, "Rabatt mindert AK"], [2, "Überführung, Zulassung, Kennzeichen als Nebenkosten"], [1, "Vorsteuer keine AK"],
        [2, "Kfz-Steuer und Tankfüllung kein AK, laufender Aufwand"], [2, "AfA linear, zeitanteilig"], [1, "AfA-Betrag"], [3, "Buchungen mit Gewinnauswirkung"], [1.5, "Bilanzansatz"]],
      zahlen: [{ frage: "Anschaffungskosten Pkw", wert: AK, einheit: "€", toleranz: 1, p: 0 }, { frage: "AfA 2026", wert: afa, einheit: "€", toleranz: 1, p: 0 }],
    };
  },
};

const gwg = {
  id: "bsr-k-gwg", titel: "Notebook und Büroschrank – geringwertiges Wirtschaftsgut", teil: 2, min: 20,
  erzeugen(r) {
    const a = r.zahl(45, 79) * 10, b = r.zahl(150, 320) * 10, m = r.zahl(2, 10), monate = 13 - m, afa = r2(b / 13 * monate / 12);
    return {
      sv: `Im ${MONAT[m - 1]} 2026 kauft ein Einzelhändler für sein Büro ein Notebook für ${e(a)} und einen Büroschrank für ${e(b)}, jeweils zzgl. 19 % USt (Nutzungsdauer Schrank laut AfA-Tabelle 13 Jahre). Beide Gegenstände sind selbständig nutzbar. Gebucht wurde: Betriebs- und Geschäftsausstattung ${e((a + b) * 1.19)} an Bank ${e((a + b) * 1.19)}.`,
      aufgaben: [...AUFGABE_TEIL2.slice(0, 2), "Geben Sie den Bilanzansatz der Betriebs- und Geschäftsausstattung an."],
      loesung: [
        `Beide Gegenstände sind abnutzbare bewegliche Wirtschaftsgüter des Anlagevermögens (§ 247 Abs. 2 HGB). AK sind die Nettobeträge; die Vorsteuer ist herauszubuchen (§ 9b Abs. 1 EStG, § 15 Abs. 1 S. 1 Nr. 1 UStG).`,
        `Notebook: AK ${e(a)} ≤ 800 € und selbständig nutzbar → geringwertiges Wirtschaftsgut, Sofortabzug (§ 6 Abs. 2 S. 1, 2 EStG) – das ergibt den niedrigsten Gewinn; ein Sammelposten (§ 6 Abs. 2a EStG) wird daher nicht gebildet.`,
        `Schrank: AK ${e(b)} > 800 € → lineare AfA über 13 Jahre, zeitanteilig (§ 7 Abs. 1 S. 1, 4 EStG): ${e(b)} / 13 × ${monate}/12 = ${e(afa)}.`,
        BS(`Vorsteuer ${e((a + b) * 0.19)} an Betriebs- und Geschäftsausstattung ${e((a + b) * 0.19)}`, 0),
        BS(`Aufwand GWG ${e(a)} an Betriebs- und Geschäftsausstattung ${e(a)}`, -a),
        BS(`AfA ${e(afa)} an Betriebs- und Geschäftsausstattung ${e(afa)}`, -afa),
        `Bilanzansatz BGA 31.12.2026: ${e(b - afa)}.`,
      ],
      bewertung: [[1.5, "AV, AK netto, Vorsteuer herausbuchen"], [2.5, "Notebook: GWG mit Voraussetzungen und Norm, Sofortabzug"], [1, "Kein Sammelposten (Wahlrecht begründet)"], [2, "Schrank: lineare AfA zeitanteilig"], [2, "Buchungen mit Gewinnauswirkung"], [1, "Bilanzansatz"]],
      zahlen: [{ frage: "AfA Schrank 2026", wert: afa, einheit: "€", toleranz: 1, p: 0 }],
    };
  },
};

const anzahlung = {
  id: "bsr-k-anzahlung", titel: "Anzahlung eines Kunden vor dem Jahreswechsel", teil: 2, min: 15,
  erzeugen(r) {
    const N = r.zahl(8, 40) * 500, t = r.zahl(5, 20);
    return {
      sv: `Ein Kunde bestellt im Dezember eine Maschine, die im Februar 2027 geliefert werden soll. Am ${tag(t, 12)} überweist er vereinbarungsgemäß eine Anzahlung von ${e(N * 1.19)}. Der Händler buchte: Bank an Umsatzerlöse ${e(N * 1.19)}.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `Bis zur Lieferung liegt ein schwebendes Geschäft vor; ein Gewinn darf erst mit Lieferung ausgewiesen werden (Realisationsprinzip, § 252 Abs. 1 Nr. 4 HGB). Die Anzahlung ist als erhaltene Anzahlung (Verbindlichkeit, § 266 Abs. 3 C. Nr. 3 HGB) auszuweisen.`,
        `Umsatzsteuerlich entsteht die Steuer bereits mit Vereinnahmung der Anzahlung (§ 13 Abs. 1 Nr. 1 Buchst. a S. 4 UStG): ${e(N * 0.19)}.`,
        BS(`Umsatzerlöse ${e(N * 1.19)} an erhaltene Anzahlungen ${e(N)}, Umsatzsteuer ${e(N * 0.19)}`, -N * 1.19),
      ],
      bewertung: [[2, "Schwebendes Geschäft, keine Gewinnrealisierung"], [2, "Ausweis als erhaltene Anzahlung"], [2, "USt entsteht mit Vereinnahmung (Norm)"], [2, "Berichtigungsbuchung mit Gewinnauswirkung"]],
    };
  },
};

const rap = {
  id: "bsr-k-rap", titel: "Versicherung und Mieteinnahme über den Jahreswechsel", teil: 2, min: 15,
  erzeugen(r) {
    const V = r.zahl(12, 48) * 100, m = r.zahl(4, 11), M = r.zahl(6, 20) * 100, vor = r2(V * (m - 1) / 12);
    return {
      sv: `a) Am ${tag(1, m)} zahlt ein Kaufmann die Betriebshaftpflichtversicherung für zwölf Monate ab dem ${tag(1, m)} im Voraus: ${e(V)}; gebucht: Versicherungen an Bank ${e(V)}.\nb) Ein Teil des Lagers ist umsatzsteuerfrei vermietet. Der Mieter überweist am 28.12.2026 die Miete für Januar 2027 von ${e(M)}; gebucht: Bank an Mieterträge ${e(M)}.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `a) Ausgabe vor dem Stichtag für Aufwand einer bestimmten Zeit danach → aktiver Rechnungsabgrenzungsposten (§ 250 Abs. 1 HGB, § 5 Abs. 5 S. 1 Nr. 1 EStG): ${e(V)} × ${m - 1}/12 = ${e(vor)}.`,
        BS(`aktiver RAP ${e(vor)} an Versicherungen ${e(vor)}`, vor),
        `b) Einnahme vor dem Stichtag für Ertrag einer bestimmten Zeit danach → passiver Rechnungsabgrenzungsposten (§ 250 Abs. 2 HGB, § 5 Abs. 5 S. 1 Nr. 2 EStG). Die Vermietung ist steuerfrei (§ 4 Nr. 12 S. 1 Buchst. a UStG).`,
        BS(`Mieterträge ${e(M)} an passiver RAP ${e(M)}`, -M),
      ],
      bewertung: [[1.5, "a) aktiver RAP mit Normen"], [1.5, "a) Betrag zeitanteilig"], [1, "a) Buchung mit Gewinnauswirkung"], [1.5, "b) passiver RAP mit Normen"], [1, "b) Steuerfreiheit"], [1.5, "b) Buchung mit Gewinnauswirkung"]],
    };
  },
};

const rueckstellung = {
  id: "bsr-k-rueckstellung", titel: "Drohender Rechtsstreit", teil: 2, min: 10,
  erzeugen(r) {
    const X = r.zahl(25, 90) * 100;
    return {
      sv: `Ein Kunde hat im November 2026 Klage auf Schadensersatz erhoben. Der Anwalt des Kaufmanns schätzt zum 31.12.2026 die Gerichts- und Anwaltskosten für die erste Instanz auf ${e(X)} (netto); ob der Kunde gewinnt, ist offen. Gebucht wurde nichts.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `Für die Prozesskosten ist eine Rückstellung für ungewisse Verbindlichkeiten zu bilden (§ 249 Abs. 1 S. 1 HGB, § 5 Abs. 1 S. 1 EStG, R 5.7 Abs. 2 EStR): Die Klage ist erhoben, die Kosten sind wirtschaftlich 2026 verursacht. Anzusetzen sind nur die Kosten der bereits angerufenen Instanz.`,
        `Bewertung mit dem Erfüllungsbetrag nach vernünftiger kaufmännischer Beurteilung (§ 253 Abs. 1 S. 2 HGB, § 6 Abs. 1 Nr. 3a EStG): ${e(X)}; die Vorsteuer ist später abziehbar.`,
        BS(`sonstige betriebliche Aufwendungen ${e(X)} an sonstige Rückstellungen ${e(X)}`, -X),
      ],
      bewertung: [[2, "Rückstellung für ungewisse Verbindlichkeiten mit Normen"], [1.5, "Nur Kosten der angerufenen Instanz"], [1.5, "Bewertung Erfüllungsbetrag (netto)"], [1, "Buchung mit Gewinnauswirkung"]],
    };
  },
};

const entnahme = {
  id: "bsr-k-entnahme", titel: "Warenentnahme für private Zwecke", teil: 2, min: 10,
  erzeugen(r) {
    const EK = r.zahl(3, 15) * 100, VK = r2(EK * r.wahl([1.4, 1.5, 1.6])), t = r.zahl(3, 22);
    return {
      sv: `Am ${tag(t, 12)} nimmt ein Elektrohändler einen Fernseher aus dem Lager für sein Wohnzimmer. Der Einkaufspreis betrug ${e(EK)} netto und entspricht dem aktuellen Wiederbeschaffungspreis; im Laden kostet das Gerät ${e(VK)} netto. Gebucht wurde nichts.`,
      aufgaben: AUFGABE_TEIL2.slice(0, 2),
      loesung: [
        `Entnahme (§ 4 Abs. 1 S. 2 EStG), bewertet mit dem Teilwert (§ 6 Abs. 1 Nr. 4 S. 1 EStG) = Wiederbeschaffungskosten ${e(EK)} – nicht dem Verkaufspreis.`,
        `Umsatzsteuer: unentgeltliche Wertabgabe, einer Lieferung gegen Entgelt gleichgestellt (§ 3 Abs. 1b S. 1 Nr. 1 UStG); Bemessungsgrundlage Einkaufspreis (§ 10 Abs. 4 S. 1 Nr. 1 UStG): ${e(EK)} × 19 % = ${e(EK * 0.19)}.`,
        BS(`Privatentnahmen ${e(EK * 1.19)} an unentgeltliche Wertabgaben ${e(EK)}, Umsatzsteuer ${e(EK * 0.19)}`, EK),
      ],
      bewertung: [[1.5, "Entnahme mit Norm"], [1.5, "Bewertung mit Teilwert (Einkaufspreis)"], [1.5, "USt: § 3 Abs. 1b, BMG § 10 Abs. 4"], [1.5, "Buchung mit Gewinnauswirkung"]],
    };
  },
};

export const SV_BSR = [warenkonten, kennzahlen, lohn, warenkauf, umtausch, grundstueck, darlehen, firmenwagen, gwg, anzahlung, rap, rueckstellung, entnahme];
