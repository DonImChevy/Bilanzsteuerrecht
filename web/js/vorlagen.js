// Aufgabengeneratoren: jede Vorlage erzeugt bei jedem Aufruf neue Beträge.
import * as G from "./geld.js";
import { K } from "./konten.js";
import { satz, einfach, satzText, buchung, zahl } from "./kern.js";

const eur = G.euro;
const ust = (netto, s = 19) => G.prozent(netto, s);
const pt = (p) => G.prozentText(p * 100);

export const WIRKUNG = {
  aktivtausch: { titel: "Aktivtausch", text: "Nur die Aktivseite ändert sich, die Bilanzsumme bleibt gleich; erfolgsneutral." },
  passivtausch: { titel: "Passivtausch", text: "Nur die Passivseite ändert sich, die Bilanzsumme bleibt gleich; erfolgsneutral." },
  mehrung: { titel: "Aktiv-Passiv-Mehrung", text: "Aktiv- und Passivseite steigen; Bilanzsumme erhöht sich; erfolgsneutral." },
  minderung: { titel: "Aktiv-Passiv-Minderung", text: "Aktiv- und Passivseite sinken; Bilanzsumme vermindert sich; erfolgsneutral." },
  aufwand: { titel: "BV-Minderung – Aufwand (erfolgswirksam)", text: "Betrieblich veranlasste Minderung des Betriebsvermögens – mindert den Gewinn." },
  ertrag: { titel: "BV-Mehrung – Ertrag (erfolgswirksam)", text: "Betrieblich veranlasste Mehrung des Betriebsvermögens – erhöht den Gewinn." },
  entnahme: { titel: "BV-Minderung – Entnahme (privat veranlasst)", text: "Privat veranlasste BV-Minderung – i.d.R. erfolgsneutral (§ 4 I 2 EStG)." },
  einlage: { titel: "BV-Mehrung – Einlage (privat veranlasst)", text: "Privat veranlasste BV-Mehrung – i.d.R. erfolgsneutral (§ 4 I 8 EStG)." },
};

// Einfache Geschäftsvorfälle ohne USt – dienen als Buchungs- und als Klassifizierungsaufgabe.
export const VORFAELLE = [
  { id: "bareinzahlung", text: (b) => `Der Unternehmer zahlt ${eur(b)} aus der Geschäftskasse auf das betriebliche Bankkonto ein.`,
    satz: (b) => einfach("bank", "kasse", b), wirkung: "aktivtausch", erkl: "Bank (Aktivkonto) nimmt zu → Soll. Kasse (Aktivkonto) nimmt ab → Haben.", von: 200, bis: 5000 },
  { id: "barabhebung", text: (b) => `Barabhebung vom betrieblichen Bankkonto i.H.v. ${eur(b)} für die Geschäftskasse.`,
    satz: (b) => einfach("kasse", "bank", b), wirkung: "aktivtausch", erkl: "Kasse nimmt zu → Soll. Bank nimmt ab → Haben.", von: 200, bis: 3000 },
  { id: "kunde-zahlt", text: (b) => `Ein Kunde begleicht eine bereits gebuchte Forderung aus L.u.L. über ${eur(b)} durch Banküberweisung.`,
    satz: (b) => einfach("bank", "forderungenLuL", b), wirkung: "aktivtausch", erkl: "Bank nimmt zu → Soll. Die Forderung erlischt (Abgang Aktivkonto) → Haben.", von: 500, bis: 20000 },
  { id: "lieferant-bezahlen", text: (b) => `Eine Verbindlichkeit aus L.u.L. über ${eur(b)} wird per Banküberweisung beglichen.`,
    satz: (b) => einfach("verbindlichkeitenLuL", "bank", b), wirkung: "minderung", erkl: "Verbindlichkeit (Passivkonto) nimmt ab → Soll. Bank nimmt ab → Haben.", von: 500, bis: 20000 },
  { id: "darlehen-tilgen", text: (b) => `Ein Bankdarlehen wird i.H.v. ${eur(b)} durch Banküberweisung getilgt (Zinsen sind nicht angefallen).`,
    satz: (b) => einfach("darlehensverbindlichkeiten", "bank", b), wirkung: "minderung", erkl: "Darlehensverbindlichkeit nimmt ab → Soll. Bank nimmt ab → Haben. Die Tilgung ist kein Aufwand.", von: 1000, bis: 30000 },
  { id: "darlehen-aufnehmen", text: (b) => `Das Unternehmen nimmt ein Darlehen über ${eur(b)} auf; der Betrag wird dem Bankkonto gutgeschrieben.`,
    satz: (b) => einfach("bank", "darlehensverbindlichkeiten", b), wirkung: "mehrung", erkl: "Bank nimmt zu → Soll. Darlehensverbindlichkeit nimmt zu → Haben.", von: 5000, bis: 100000 },
  { id: "umschuldung", text: (b) => `Eine Verbindlichkeit aus L.u.L. über ${eur(b)} wird auf Wunsch des Lieferanten in ein langfristiges Darlehen umgewandelt.`,
    satz: (b) => einfach("verbindlichkeitenLuL", "darlehensverbindlichkeiten", b), wirkung: "passivtausch", erkl: "Verbindlichkeit aus L.u.L. nimmt ab → Soll. Darlehensverbindlichkeit nimmt zu → Haben.", von: 2000, bis: 30000 },
  { id: "darlehensschuldner", text: (b) => `Ein Darlehensschuldner des Unternehmens zahlt sein Darlehen über ${eur(b)} per Banküberweisung zurück.`,
    satz: (b) => einfach("bank", "darlehensforderungen", b), wirkung: "aktivtausch", erkl: "Bank nimmt zu → Soll. Die Darlehensforderung (Aktivkonto) erlischt → Haben.", von: 1000, bis: 20000 },
  { id: "grundstueck", text: (b) => `Kauf eines unbebauten Betriebsgrundstücks (Grund und Boden) für ${eur(b)} gegen Banküberweisung. Die Umsatzsteuer ist nicht zu berücksichtigen (§ 4 Nr. 9a UStG).`,
    satz: (b) => einfach("grundUndBoden", "bank", b), wirkung: "aktivtausch", erkl: "Grund und Boden (Anlagevermögen) nimmt zu → Soll. Bank nimmt ab → Haben.", von: 20000, bis: 200000 },
  { id: "zinsen-zahlen", text: (b) => `Darlehenszinsen i.H.v. ${eur(b)} werden per Banküberweisung gezahlt.`,
    satz: (b) => einfach("zinsaufwendungen", "bank", b), wirkung: "aufwand", erkl: "Zinsen sind Aufwand (Soll). Bank nimmt ab → Haben.", von: 100, bis: 3000 },
  { id: "zinsgutschrift", text: (b) => `Die Bank schreibt dem Geschäftskonto Zinsen i.H.v. ${eur(b)} gut.`,
    satz: (b) => einfach("bank", "zinsertraege", b), wirkung: "ertrag", erkl: "Bank nimmt zu → Soll. Zinserträge sind Ertrag → Haben.", von: 100, bis: 800 },
  { id: "barentnahme", text: (b) => `Der Inhaber entnimmt der Geschäftskasse ${eur(b)} für private Zwecke.`,
    satz: (b) => einfach("privatentnahmen", "kasse", b), wirkung: "entnahme", erkl: "Privatentnahmen (Unterkonto EK) im Soll. Kasse nimmt ab → Haben. Erfolgsneutral.", von: 100, bis: 5000 },
  { id: "geldeinlage", text: (b) => `Der Inhaber legt ${eur(b)} aus seinem Privatvermögen in die Geschäftskasse ein.`,
    satz: (b) => einfach("kasse", "privateinlagen", b), wirkung: "einlage", erkl: "Kasse nimmt zu → Soll. Privateinlagen (Unterkonto EK) im Haben. Erfolgsneutral.", von: 500, bis: 10000 },
  { id: "ladenmiete", text: (b) => `Die Ladenmiete i.H.v. ${eur(b)} wird vom Geschäftskonto überwiesen (umsatzsteuerfrei).`,
    satz: (b) => einfach("mietaufwendungen", "bank", b), wirkung: "aufwand", erkl: "Mietaufwendungen im Soll, Bank im Haben.", von: 500, bis: 4000 },
];

const V = (id, thema, erzeugen) => ({ id, thema, erzeugen });

// ---------------- Bestandskonten ----------------
const bestandIds = ["bareinzahlung", "barabhebung", "kunde-zahlt", "lieferant-bezahlen", "darlehen-tilgen",
  "darlehen-aufnehmen", "umschuldung", "darlehensschuldner", "grundstueck"];

const bestandskonten = [
  ...VORFAELLE.filter((v) => bestandIds.includes(v.id)).map((v) =>
    V("bk-" + v.id, "bestandskonten", (r) => {
      const b = r.betrag(v.von, v.bis, 100);
      return buchung("bk-" + v.id, "bestandskonten", v.text(b), v.satz(b), v.erkl);
    })),
  V("bk-teilzahlung", "bestandskonten", (r) => {
    const bar = r.betrag(100, 2000, 100), bank = r.betrag(500, 8000, 100);
    return buchung("bk-teilzahlung", "bestandskonten",
      `Ein Kunde begleicht unsere Forderung aus L.u.L. über ${eur(bar + bank)}: ${eur(bar)} bar und ${eur(bank)} per Banküberweisung.`,
      satz([["kasse", bar], ["bank", bank]], [["forderungenLuL", bar + bank]]),
      "Zusammengesetzter Buchungssatz: Summe Soll = Summe Haben. Kasse und Bank nehmen zu, die Forderung erlischt.",
      { quelle: "Skript Teil I, Zusammengesetzter Buchungssatz" });
  }),
  V("bk-anlage-ziel", "bestandskonten", (r) => {
    const [konto, gegenstand] = r.wahl([["bga", "eine Regalanlage für den Verkaufsraum"], ["maschinen", "eine Verpackungsmaschine"], ["fuhrpark", "einen Lieferwagen"]]);
    const netto = r.betrag(2000, 40000, 100), u = ust(netto);
    return buchung("bk-anlage-ziel", "bestandskonten",
      `Kauf auf Ziel: ${gegenstand} für ${eur(netto)} zzgl. 19 % USt (${eur(u)}).`,
      satz([[konto, netto], ["vorsteuer", u]], [["verbindlichkeitenLuL", netto + u]]),
      "Das Anlagegut wird mit den Anschaffungskosten (netto) aktiviert. Die abziehbare Vorsteuer ist eine Forderung gegenüber dem FA. Gegenkonto: Verbindlichkeiten aus L.u.L. (brutto).");
  }),
];

// ---------------- Bilanzveränderungen ----------------
const bilanzveraenderungen = [
  V("bv-klassifizieren", "bilanzveraenderungen", (r) => {
    const v = r.wahl(VORFAELLE);
    const b = r.betrag(v.von, v.bis, 100);
    const andere = r.mischen(Object.keys(WIRKUNG).filter((w) => w !== v.wirkung)).slice(0, 3);
    const optionen = r.mischen([v.wirkung, ...andere]);
    return {
      id: "bv-klassifizieren", thema: "bilanzveraenderungen", typ: "auswahl",
      text: `Wie wirkt sich der Geschäftsvorfall auf die Bilanz aus?\n\n${v.text(b)}`,
      optionen: optionen.map((w) => WIRKUNG[w].titel), richtig: [optionen.indexOf(v.wirkung)],
      erklaerung: `Buchungssatz: ${satzText(v.satz(b))}\n\n${WIRKUNG[v.wirkung].titel}: ${WIRKUNG[v.wirkung].text}`,
      quelle: "Skript Teil I, Kap. U – Übersicht Veränderungen des Bilanzbildes",
    };
  }),
  V("bv-erfolgswirksam", "bilanzveraenderungen", (r) => {
    const v = r.wahl(VORFAELLE);
    const b = r.betrag(v.von, v.bis, 100);
    const wirksam = v.wirkung === "aufwand" || v.wirkung === "ertrag";
    return {
      id: "bv-erfolgswirksam", thema: "bilanzveraenderungen", typ: "auswahl",
      text: `Ist der folgende Geschäftsvorfall erfolgswirksam?\n\n${v.text(b)}`,
      optionen: ["Ja, erfolgswirksam", "Nein, erfolgsneutral"], richtig: [wirksam ? 0 : 1],
      erklaerung: `${WIRKUNG[v.wirkung].titel}: ${WIRKUNG[v.wirkung].text}\n\nBuchungssatz: ${satzText(v.satz(b))}`,
      quelle: null,
    };
  }),
];

// ---------------- Erfolgskonten ----------------
function einfachMitUst(id, thema, text, aufwandKonto, gegen, netto, satzP, erkl, quelle) {
  const u = ust(netto, satzP);
  return buchung(id, thema, text(netto, u), satz([[aufwandKonto, netto], ["vorsteuer", u]], [[gegen, netto + u]]), erkl(netto, u), { quelle });
}

const erfolgskonten = [
  V("ek-zinsen", "erfolgskonten", (r) => {
    const b = r.betrag(100, 3000, 10);
    return buchung("ek-zinsen", "erfolgskonten", `Darlehenszinsen i.H.v. ${eur(b)} werden per Banküberweisung gezahlt.`,
      einfach("zinsaufwendungen", "bank", b), "Zinsen sind Aufwand → Soll. Bank nimmt ab → Haben. Zinsen sind umsatzsteuerlich irrelevant (keine Vorsteuer).");
  }),
  V("ek-zinsgutschrift", "erfolgskonten", (r) => {
    const b = r.betrag(10, 600, 5);
    return buchung("ek-zinsgutschrift", "erfolgskonten", `Die Bank schreibt Guthabenzinsen i.H.v. ${eur(b)} gut.`,
      einfach("bank", "zinsertraege", b), "Bank nimmt zu → Soll. Zinserträge → Haben.");
  }),
  V("ek-miete", "erfolgskonten", (r) => {
    const b = r.betrag(500, 4000, 50);
    return buchung("ek-miete", "erfolgskonten",
      `Die Ladenmiete für den laufenden Monat über ${eur(b)} wird vom Geschäftskonto überwiesen. Der Vermieter hat nicht zur Umsatzsteuer optiert.`,
      einfach("mietaufwendungen", "bank", b),
      "Mietaufwendungen → Soll, Bank → Haben. Ohne Option (§ 9 UStG) ist die Vermietung steuerfrei (§ 4 Nr. 12 UStG), es gibt keine Vorsteuer.");
  }),
  V("ek-miete-ust", "erfolgskonten", (r) => einfachMitUst("ek-miete-ust", "erfolgskonten",
    (n, u) => `Die Büromiete für Dezember wird per Bank überwiesen: ${eur(n)} zzgl. 19 % USt (${eur(u)}). Der Vermieter hat wirksam zur Umsatzsteuer optiert.`,
    "mietaufwendungen", "bank", r.betrag(500, 3000, 50), 19, () => "Aufwand in Höhe des Nettobetrags, die Vorsteuer ist abziehbar.", "Übung Wiederholung, Tz. 5")),
  V("ek-telefon", "erfolgskonten", (r) => einfachMitUst("ek-telefon", "erfolgskonten",
    (n, u) => `Die Telefonrechnung über ${eur(n)} zzgl. ${eur(u)} USt wird per Bank bezahlt.`,
    "telefon", "bank", r.betrag(40, 600, 10), 19, () => "Nettomethode: Aufwand (netto) und Vorsteuer werden getrennt gebucht.", "Übung USt-/Vorsteuerkonten, Tz. 2")),
  V("ek-kfz", "erfolgskonten", (r) => einfachMitUst("ek-kfz", "erfolgskonten",
    (n) => `Die Inspektion des betrieblichen Lieferwagens kostet ${eur(n)} zzgl. 19 % USt und wird bar bezahlt.`,
    "kfzKosten", "kasse", r.betrag(100, 1500, 10), 19, () => "Kfz-Kosten (Aufwand) netto im Soll, Vorsteuer im Soll, Kasse brutto im Haben.", "Skript Teil I, Auswirkungen von Buchungen – Beispiel 1")),
  V("ek-buero-brutto", "erfolgskonten", (r) => einfachMitUst("ek-buero-brutto", "erfolgskonten",
    (n, u) => `Büromaterial wird bar eingekauft. Der Kassenbon lautet über ${eur(n + u)} einschließlich 19 % USt.`,
    "buerobedarf", "kasse", r.betrag(20, 400, 10), 19,
    (n, u) => `Herausrechnen der USt: Brutto ÷ 1,19 = Netto (${eur(n)}); USt = Brutto × 19/119 (${eur(u)}).`)),
  V("ek-provision", "erfolgskonten", (r) => {
    const n = r.betrag(300, 5000, 50), u = ust(n);
    return buchung("ek-provision", "erfolgskonten",
      `Für eine Vermittlung erhält der Unternehmer eine Provision von ${eur(n)} zzgl. 19 % USt auf das Geschäftskonto.`,
      satz([["bank", n + u]], [["provisionserloese", n], ["umsatzsteuer", u]]),
      "Bank brutto im Soll; Provisionserlöse (netto) und Umsatzsteuer im Haben.");
  }),
  V("ek-anwalt", "erfolgskonten", (r) => einfachMitUst("ek-anwalt", "erfolgskonten",
    (n, u) => `Rechtsanwaltskosten über ${eur(n + u)} einschließlich 19 % USt werden durch Banküberweisung bezahlt.`,
    "rechtsBeratung", "bank", r.betrag(200, 3000, 100), 19,
    (n, u) => `Netto = ${eur(n + u)} ÷ 1,19 = ${eur(n)}; Vorsteuer ${eur(u)}.`, "Übung Buchungen – Auswirkungen auf GuV/BVV, Tz. 6")),
  V("ek-reparatur", "erfolgskonten", (r) => einfachMitUst("ek-reparatur", "erfolgskonten",
    (n) => `Ein Handwerker repariert die Ladeneinrichtung und stellt ${eur(n)} zzgl. 19 % USt in Rechnung. Die Rechnung wird erst im nächsten Monat bezahlt.`,
    "reparatur", "verbindlichkeitenLuL", r.betrag(150, 4000, 50), 19,
    () => "Erhaltungsaufwand → Reparaturaufwendungen. Noch nicht bezahlt → Verbindlichkeiten aus L.u.L.")),
  V("ek-energie", "erfolgskonten", (r) => einfachMitUst("ek-energie", "erfolgskonten",
    (n, u) => `Die Stromrechnung für die Geschäftsräume über ${eur(n)} zzgl. ${eur(u)} USt wird abgebucht.`,
    "energie", "bank", r.betrag(100, 2000, 10), 19, () => "Energieaufwendungen (netto) und Vorsteuer im Soll, Bank im Haben.")),
  V("ek-hotel", "erfolgskonten", (r) => einfachMitUst("ek-hotel", "erfolgskonten",
    (n) => `Auf einer Geschäftsreise zahlt der Unternehmer die Hotelübernachtung (ohne Frühstück) bar: ${eur(n)} zzgl. 7 % USt.`,
    "reisekosten", "kasse", r.betrag(80, 600, 10), 7,
    (n, u) => `Übernachtungsleistungen unterliegen dem ermäßigten Steuersatz von 7 % (§ 12 II Nr. 11 UStG). Vorsteuer = ${eur(u)}.`)),
  // Gehaltsabrechnung (Bruttolohnverfahren) – Klausur 10/23; Beträge der Lohnabrechnung sind vorgegeben
  V("ek-gehalt", "erfolgskonten", (r) => {
    const b = r.betrag(2400, 6000, 50), lst = G.prozent(b, r.zahl(9, 17)), kist = r.zahl(0, 2) ? G.prozent(lst, 9) : 0;
    const an = G.prozent(b, 21), ag = Math.round(b * 0.205), v = r.zahl(0, 1) ? r.betrag(200, 800, 50) : 0;
    const netto = b - lst - kist - an - v;
    return buchung("ek-gehalt", "erfolgskonten",
      `Lohnabrechnung einer Angestellten für Dezember: Bruttogehalt ${eur(b)}, Lohnsteuer ${eur(lst)}${kist ? `, Kirchensteuer ${eur(kist)}` : " (keine Kirchensteuer, kein Solidaritätszuschlag)"}, Sozialversicherung Arbeitnehmeranteil ${eur(an)}, Arbeitgeberanteil ${eur(ag)}.${v ? ` Im November hatte sie einen Gehaltsvorschuss von ${eur(v)} erhalten (gebucht als Forderung), der jetzt einbehalten wird.` : ""} Das Nettogehalt wird überwiesen; Steuern und Sozialversicherungsbeiträge sind noch nicht abgeführt.\n\nBilden Sie einen zusammengesetzten Buchungssatz einschließlich des Arbeitgeberanteils.`,
      satz([["loehne", b], ["sozialeAbgaben", ag]], [["bank", netto], ["verbindlichkeitenSteuern", lst + kist], ["verbindlichkeitenSV", an + ag], ...(v ? [["forderungenMitarbeiter", v]] : [])]),
      `Bruttolohnverfahren: Das Bruttogehalt ist Aufwand (Löhne und Gehälter ${eur(b)}), der Arbeitgeberanteil zusätzlicher Aufwand (Gesetzliche soziale Aufwendungen ${eur(ag)}). Die Lohnsteuer${kist ? " und die Kirchensteuer" : ""} behält der Arbeitgeber für Rechnung der Arbeitnehmerin ein (§ 38 Abs. 3 S. 1 EStG) und schuldet sie dem Finanzamt → Verbindlichkeiten aus Steuern und Abgaben ${eur(lst + kist)}. Arbeitnehmer- und Arbeitgeberanteil schuldet er der Krankenkasse → Verbindlichkeiten im Rahmen der sozialen Sicherheit ${eur(an + ag)}.${v ? ` Der Vorschuss wird verrechnet → Forderung im Haben ${eur(v)}.` : ""} Überwiesen wird nur das Netto: ${eur(b)} − ${eur(lst + kist)} − ${eur(an)}${v ? ` − ${eur(v)}` : ""} = ${eur(netto)}. Keine Umsatzsteuer. Gewinnminderung ${eur(b + ag)}.`);
  }),
  V("ek-gehalt-folge", "erfolgskonten", (r) => {
    const fall = r.zahl(0, 2), b = r.betrag(200, 3000, 50);
    const F = [
      [`Eine Angestellte erhält am 15.11. einen Gehaltsvorschuss von ${eur(b)} in bar; er wird mit dem Dezembergehalt verrechnet.`, einfach("forderungenMitarbeiter", "kasse", b),
        "Der Vorschuss ist noch kein Aufwand, sondern eine Forderung gegen die Mitarbeiterin (Aktivkonto → Soll). Aufwand entsteht erst mit der Gehaltsabrechnung, bei der die Forderung im Haben ausgebucht wird."],
      [`Die im Dezember einbehaltene Lohn- und Kirchensteuer von ${eur(b)} wird am 10.01. an das Finanzamt überwiesen.`, einfach("verbindlichkeitenSteuern", "bank", b),
        "Die Verbindlichkeit gegenüber dem Finanzamt erlischt (Passivkonto → Soll), Bank im Haben. Kein Aufwand – der ist schon mit dem Bruttogehalt gebucht. Fällig ist die Lohnsteuer spätestens am zehnten Tag nach Ablauf des Anmeldungszeitraums (§ 41a Abs. 1 S. 1 EStG)."],
      [`Die Sozialversicherungsbeiträge (Arbeitnehmer- und Arbeitgeberanteil) von ${eur(b)} werden von der Krankenkasse abgebucht.`, einfach("verbindlichkeitenSV", "bank", b),
        "Die Verbindlichkeit im Rahmen der sozialen Sicherheit erlischt (Soll), Bank im Haben. Erfolgsneutral – der Aufwand wurde bei der Gehaltsbuchung erfasst."],
    ][fall];
    return buchung("ek-gehalt-folge", "erfolgskonten", F[0], F[1], F[2]);
  }),
  V("ek-mietertrag", "erfolgskonten", (r) => {
    const b = r.betrag(300, 2500, 50);
    return buchung("ek-mietertrag", "erfolgskonten",
      `Ein Mieter überweist die Monatsmiete für eine zum Betriebsvermögen gehörende Wohnung über ${eur(b)} auf das Geschäftskonto (umsatzsteuerfrei).`,
      einfach("bank", "mietertraege", b), "Bank → Soll, Mieterträge → Haben. Wohnungsvermietung ist nach § 4 Nr. 12 UStG steuerfrei.");
  }),
];

// ---------------- Privatkonten ----------------
const privatkonten = [
  V("pk-barentnahme", "privatkonten", (r) => {
    const b = r.betrag(100, 5000, 50);
    return buchung("pk-barentnahme", "privatkonten", `Der Inhaber entnimmt für seinen Lebensunterhalt ${eur(b)} aus der Ladenkasse.`,
      einfach("privatentnahmen", "kasse", b), "Privat veranlasste BV-Minderung → Privatentnahmen (Soll). Erfolgsneutral.", { quelle: "Übung Einführung Privatkonten, Tz. 1" });
  }),
  V("pk-geldeinlage", "privatkonten", (r) => {
    const b = r.betrag(500, 10000, 100);
    const [konto, wohin] = r.wahl([["kasse", "in die Geschäftskasse"], ["bank", "auf das betriebliche Bankkonto"]]);
    return buchung("pk-geldeinlage", "privatkonten", `Der Inhaber zahlt ${eur(b)} aus seinem Privatvermögen ${wohin} ein.`,
      einfach(konto, "privateinlagen", b), "Privat veranlasste BV-Mehrung → Privateinlagen (Haben). Erfolgsneutral.");
  }),
  V("pk-krankenkasse", "privatkonten", (r) => {
    const b = r.betrag(200, 1200, 10);
    return buchung("pk-krankenkasse", "privatkonten",
      `Der Beitrag zur privaten Krankenversicherung des Inhabers über ${eur(b)} wird vom Geschäftskonto überwiesen.`,
      einfach("privatentnahmen", "bank", b), "Private Ausgaben, die vom Betriebskonto bezahlt werden, sind Entnahmen – keine Betriebsausgaben.",
      { quelle: "Übung Privatkonten – Journal/Konten, Tz. 3" });
  }),
  V("pk-est", "privatkonten", (r) => {
    const b = r.betrag(500, 8000, 100);
    return buchung("pk-est", "privatkonten",
      `Die Einkommensteuer-Vorauszahlung des Inhabers über ${eur(b)} wird vom betrieblichen Bankkonto an das Finanzamt überwiesen.`,
      einfach("privatentnahmen", "bank", b), "Die Einkommensteuer ist eine Personensteuer des Inhabers und damit privat (§ 12 Nr. 3 EStG) → Privatentnahme.");
  }),
  V("pk-miete-privat", "privatkonten", (r) => {
    const b = r.betrag(500, 4000, 100);
    return buchung("pk-miete-privat", "privatkonten",
      `Die (umsatzsteuerfreie) Büromiete über ${eur(b)} wird vom privaten Bankkonto des Inhabers überwiesen.`,
      einfach("mietaufwendungen", "privateinlagen", b), "Betrieblicher Aufwand, bezahlt mit privaten Mitteln → Gegenkonto Privateinlagen.",
      { quelle: "Übung Buchungen – Auswirkungen auf GuV/BVV, Tz. 5" });
  }),
  V("pk-benzin-privat", "privatkonten", (r) => einfachMitUst("pk-benzin-privat", "privatkonten",
    (n, u) => `Der Inhaber tankt den betrieblichen Lieferwagen und bezahlt mit privatem Geld: ${eur(n)} zzgl. ${eur(u)} USt (ordnungsgemäße Rechnung liegt vor).`,
    "kfzKosten", "privateinlagen", r.betrag(40, 150, 5), 19,
    () => "Betrieblicher Aufwand mit Vorsteuerabzug; bezahlt aus privaten Mitteln → Privateinlage in Höhe des Bruttobetrags.")),
  V("pk-provision-privat", "privatkonten", (r) => {
    const n = r.betrag(300, 3000, 100), u = ust(n);
    return buchung("pk-provision-privat", "privatkonten",
      `Eine betriebliche Vermittlungsprovision von ${eur(n)} zzgl. 19 % USt geht auf dem privaten Bankkonto des Inhabers ein.`,
      satz([["privatentnahmen", n + u]], [["provisionserloese", n], ["umsatzsteuer", u]]),
      "Betrieblicher Ertrag, das Geld fließt aber ins Privatvermögen → Gegenkonto Privatentnahmen (brutto).",
      { quelle: "Skript Teil I, Auswirkungen von Buchungen – Beispiel 2" });
  }),
  V("pk-warenentnahme", "privatkonten", (r) => {
    const n = r.betrag(50, 1500, 10), u = ust(n);
    return buchung("pk-warenentnahme", "privatkonten",
      `Der Inhaber entnimmt Waren für private Zwecke. Einkaufspreis (= Wiederbeschaffungskosten) netto: ${eur(n)}. Die Waren berechtigten beim Einkauf zum vollen Vorsteuerabzug.`,
      satz([["privatentnahmen", n + u]], [["warenentnahmen", n], ["umsatzsteuer", u]]),
      `Unentgeltliche Wertabgabe (§ 3 Ib Nr. 1 UStG), Bemessungsgrundlage = Einkaufspreis (§ 10 IV Nr. 1 UStG). Ertragskonto Warenentnahmen laut Kontenplan, USt ${eur(u)}.`);
  }),
];

// ---------------- Warenkonten ----------------
const warenkonten = [
  V("wk-einkauf-ziel", "warenkonten", (r) => einfachMitUst("wk-einkauf-ziel", "warenkonten",
    (n) => `Wareneinkauf auf Ziel: ${eur(n)} zzgl. 19 % USt.`, "wareneingang", "verbindlichkeitenLuL", r.betrag(500, 30000, 100), 19,
    () => "Wareneinkäufe werden zu Anschaffungskosten im Soll des WEK gebucht; Vorsteuer separat (Nettomethode).", "Skript Teil I, Vorsteuerkonto – Nettomethode")),
  V("wk-einkauf-bar", "warenkonten", (r) => einfachMitUst("wk-einkauf-bar", "warenkonten",
    (n) => `Waren werden bar eingekauft: ${eur(n)} zzgl. 19 % USt.`, "wareneingang", "kasse", r.betrag(100, 3000, 10), 19,
    () => "WEK und Vorsteuer im Soll, Kasse (brutto) im Haben.")),
  V("wk-verkauf-ziel", "warenkonten", (r) => {
    const n = r.betrag(500, 40000, 100), u = ust(n);
    return buchung("wk-verkauf-ziel", "warenkonten", `Warenverkauf auf Ziel: ${eur(n)} zzgl. 19 % USt.`,
      satz([["forderungenLuL", n + u]], [["umsatzerloese", n], ["umsatzsteuer", u]]),
      "Verkäufe werden zu Verkaufspreisen (netto) im Haben des WVK gebucht, die USt als Verbindlichkeit gegenüber dem FA.",
      { quelle: "Skript Teil I, Umsatzsteuerkonto – Nettomethode" });
  }),
  V("wk-verkauf-bank", "warenkonten", (r) => {
    const stueck = r.zahl(2, 25), preis = r.betrag(200, 5000, 100), n = preis * stueck, u = ust(n);
    return buchung("wk-verkauf-bank", "warenkonten",
      `Verkauf von ${stueck} Fahrrädern zum Stückpreis von ${eur(preis)} zzgl. 19 % USt gegen Banküberweisung.`,
      satz([["bank", n + u]], [["umsatzerloese", n], ["umsatzsteuer", u]]),
      `Nettoerlös ${stueck} × ${eur(preis)} = ${eur(n)}; USt ${eur(u)}.`, { quelle: "Übung Einführung USt-/Vorsteuerkonten, Tz. 2" });
  }),
  V("wk-verkauf-gemischt", "warenkonten", (r) => {
    const n = r.betrag(1000, 20000, 100), u = ust(n), brutto = n + u;
    const bar = G.prozent(brutto, r.wahl([20, 25, 50]));
    return buchung("wk-verkauf-gemischt", "warenkonten",
      `Warenverkauf über ${eur(n)} zzgl. 19 % USt. Der Kunde zahlt ${eur(bar)} sofort bar, der Rest wird ihm gestundet.`,
      satz([["kasse", bar], ["forderungenLuL", brutto - bar]], [["umsatzerloese", n], ["umsatzsteuer", u]]),
      `Zusammengesetzter Buchungssatz: Kasse ${eur(bar)} + Forderung ${eur(brutto - bar)} = Brutto ${eur(brutto)}.`);
  }),
  V("wk-bestandsveraenderung", "warenkonten", (r) => {
    const ab = r.betrag(5000, 80000, 1000);
    let eb = r.betrag(5000, 80000, 1000);
    if (eb === ab) eb += 200000;
    const mehrung = eb > ab, diff = Math.abs(eb - ab);
    return buchung("wk-bestandsveraenderung", "warenkonten",
      `Warenanfangsbestand lt. Eröffnungsbilanz: ${eur(ab)}. Warenendbestand lt. Inventur: ${eur(eb)}. Buchen Sie die Bestandsveränderung.`,
      mehrung ? einfach("warenbestand", "bestandsveraenderung", diff) : einfach("bestandsveraenderung", "warenbestand", diff),
      mehrung ? `Bestandsmehrung um ${eur(diff)}: WBK an BVK. Das BVK hat einen Habensaldo (Ertrag) und korrigiert den Wareneinsatz nach unten.`
        : `Bestandsminderung um ${eur(diff)}: BVK an WBK. Das BVK hat einen Sollsaldo (Aufwand) und erhöht den Wareneinsatz.`,
      { quelle: "Skript Teil I, Bestandsveränderungskonto" });
  }),
  V("wk-bvk-abschluss", "warenkonten", (r) => {
    const diff = r.betrag(1000, 30000, 500), mehrung = r.muenze();
    return buchung("wk-bvk-abschluss", "warenkonten",
      `Der Warenbestand hat sich im Wirtschaftsjahr um ${eur(diff)} ${mehrung ? "erhöht" : "vermindert"}; die Bestandsveränderung ist bereits gebucht. Schließen Sie das Bestandsveränderungskonto ab.`,
      mehrung ? einfach("bestandsveraenderung", "wareneingang", diff) : einfach("wareneingang", "bestandsveraenderung", diff),
      "Das BVK wird gegen das WEK abgeschlossen. " + (mehrung ? "Bei Mehrung steht der Saldo im Haben des BVK → BVK an WEK (Wareneinsatz sinkt)." : "Bei Minderung steht der Saldo im Soll des BVK → WEK an BVK (Wareneinsatz steigt)."),
      { quelle: "Skript Teil I, Bestandsveränderungskonto" });
  }),
  V("wk-wek-guv", "warenkonten", (r) => {
    const s = r.betrag(10000, 500000, 1000), wek = r.muenze();
    return buchung("wk-wek-guv", "warenkonten",
      wek ? `Das Wareneinkaufskonto weist nach allen vorbereitenden Abschlussbuchungen einen Saldo (Wareneinsatz) von ${eur(s)} aus. Schließen Sie das Konto ab.`
        : `Das Warenverkaufskonto weist nach allen vorbereitenden Abschlussbuchungen einen Saldo (Umsatzerlöse) von ${eur(s)} aus. Schließen Sie das Konto ab.`,
      wek ? einfach("guv", "wareneingang", s) : einfach("umsatzerloese", "guv", s),
      wek ? "Das WEK ist ein Aufwandskonto und wird über die GuV abgeschlossen: GuV an WEK." : "Das WVK ist ein Ertragskonto und wird über die GuV abgeschlossen: WVK an GuV.");
  }),
  V("wk-wareneinsatz", "warenkonten", (r) => {
    const ab = r.betrag(10000, 100000, 1000), zu = r.betrag(50000, 400000, 1000), eb = r.betrag(5000, 50000, 1000);
    const we = ab + zu - eb;
    return zahl("wk-wareneinsatz", "warenkonten",
      `Warenanfangsbestand ${eur(ab)}, Wareneinkäufe ${eur(zu)}, Warenendbestand lt. Inventur ${eur(eb)}. Wie hoch ist der Wareneinsatz?`, we,
      `Wareneinsatz = Anfangsbestand + Zugänge ./. Endbestand = ${eur(ab)} + ${eur(zu)} ./. ${eur(eb)} = ${eur(we)}.`,
      { quelle: "Skript Teil I, Kalkulation – Wareneinsatz" });
  }),
];

// ---------------- Warenunterkonten ----------------
function skonto(brutto, netto, u, p) {
  const sn = G.prozent(netto, p), su = G.prozent(u, p);
  return { sn, su, zahlung: brutto - sn - su };
}

const warenunterkonten = [
  V("wu-bezugskosten", "warenunterkonten", (r) => einfachMitUst("wu-bezugskosten", "warenunterkonten",
    (n) => `Für die Anlieferung von Waren zahlt der Unternehmer dem Spediteur bar ${eur(n)} Fracht zzgl. 19 % USt.`,
    "warenbezugskosten", "kasse", r.betrag(50, 1500, 10), 19,
    () => "Eingangsfrachten sind Anschaffungsnebenkosten der Ware (§ 255 I 2 HGB) → Unterkonto Warenbezugskosten; Abschluss: WEK an Warenbezugskosten.",
    "Skript Teil I, Warenbezugskosten")),
  V("wu-einkauf-fracht", "warenunterkonten", (r) => {
    const ware = r.betrag(800, 20000, 100), fracht = r.betrag(20, 300, 10), u = ust(ware + fracht);
    return buchung("wu-einkauf-fracht", "warenunterkonten",
      `Wareneinkauf auf Ziel: Warenwert netto ${eur(ware)} + Frachtkosten ${eur(fracht)} = ${eur(ware + fracht)} zzgl. 19 % USt ${eur(u)}.`,
      satz([["wareneingang", ware], ["warenbezugskosten", fracht], ["vorsteuer", u]], [["verbindlichkeitenLuL", ware + fracht + u]]),
      "Warenwert auf WEK, Fracht auf Warenbezugskosten, Vorsteuer auf den Gesamtbetrag.",
      { alternativen: [satz([["wareneingang", ware + fracht], ["vorsteuer", u]], [["verbindlichkeitenLuL", ware + fracht + u]])],
        quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 1" });
  }),
  V("wu-vertriebskosten", "warenunterkonten", (r) => einfachMitUst("wu-vertriebskosten", "warenunterkonten",
    (n) => `Für die Auslieferung von Waren an einen Kunden stellt der Spediteur ${eur(n)} zzgl. 19 % USt in Rechnung; die Rechnung wird sofort per Bank bezahlt.`,
    "warenvertriebskosten", "bank", r.betrag(50, 800, 10), 19,
    () => "Ausgangsfrachten sind Vertriebskosten – kein Unterkonto des WVK; Abschluss direkt über die GuV.", "Skript Teil I, Warenvertriebskosten")),
  V("wu-ruecksendung-lieferant", "warenunterkonten", (r) => {
    const n = r.betrag(100, 5000, 50), u = ust(n);
    return buchung("wu-ruecksendung-lieferant", "warenunterkonten",
      `Vor Bezahlung der Rechnung schickt der Unternehmer beschädigte Ware im Wert von ${eur(n)} netto (zzgl. 19 % USt) an den Lieferanten zurück.`,
      satz([["verbindlichkeitenLuL", n + u]], [["wareneingang", n], ["vorsteuer", u]]),
      "Rücksendungen werden direkt auf dem WEK storniert; die Vorsteuer ist nach § 17 I UStG zu berichtigen.",
      { quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 3a" });
  }),
  V("wu-ruecksendung-kunde", "warenunterkonten", (r) => {
    const n = r.betrag(100, 5000, 50), u = ust(n);
    return buchung("wu-ruecksendung-kunde", "warenunterkonten",
      `Ein Kunde schickt vor Zahlung fehlerhafte Ware im Wert von ${eur(n)} netto (zzgl. 19 % USt) zurück.`,
      satz([["umsatzerloese", n], ["umsatzsteuer", u]], [["forderungenLuL", n + u]]),
      "Rücksendungen werden direkt auf dem WVK storniert; die Umsatzsteuer wird nach § 17 I UStG berichtigt.",
      { quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 3b" });
  }),
  V("wu-nachlass-lieferant", "warenunterkonten", (r) => {
    const n = r.betrag(100, 2000, 50), u = ust(n);
    return buchung("wu-nachlass-lieferant", "warenunterkonten",
      `Der Lieferant gewährt aufgrund einer Mängelrüge einen Preisnachlass von ${eur(n)} zzgl. 19 % USt, der mit der noch offenen Verbindlichkeit verrechnet wird.`,
      satz([["verbindlichkeitenLuL", n + u]], [["preisnachlaesse", n], ["vorsteuer", u]]),
      "Preisnachlässe vom Lieferanten auf das Unterkonto Preisnachlässe (Abschluss: Preisnachlässe an WEK); Vorsteuerkorrektur nach § 17 UStG.",
      { quelle: "Übung USt-/Vorsteuerkonten – Warenunterkonten, Tz. 4" });
  }),
  V("wu-nachlass-kunde", "warenunterkonten", (r) => {
    const n = r.betrag(100, 2000, 50), u = ust(n);
    return buchung("wu-nachlass-kunde", "warenunterkonten",
      `Wegen eines Sachmangels gewährt der Unternehmer einem Kunden nachträglich einen Preisnachlass von ${eur(n)} zzgl. 19 % USt; die Forderung ist noch offen.`,
      satz([["erloesschmaelerungen", n], ["umsatzsteuer", u]], [["forderungenLuL", n + u]]),
      "Preisnachlässe an Kunden → Erlösschmälerungen (Abschluss: WVK an Erlösschmälerungen); USt-Korrektur nach § 17 UStG.",
      { quelle: "Skript Teil I, Preisnachlässe wegen Sachmängel" });
  }),
  V("wu-sofortrabatt", "warenunterkonten", (r) => {
    const liste = r.betrag(1000, 20000, 500), p = r.wahl([5, 10, 15, 20]);
    const rabatt = G.prozent(liste, p), n = liste - rabatt, u = ust(n);
    return buchung("wu-sofortrabatt", "warenunterkonten",
      `Wareneinkauf auf Ziel: Listenpreis ${eur(liste)} abzüglich ${pt(p)} Mengenrabatt, zzgl. 19 % USt.`,
      satz([["wareneingang", n], ["vorsteuer", u]], [["verbindlichkeitenLuL", n + u]]),
      `Sofortrabatte werden nicht gesondert gebucht – gebucht wird nur der Rechnungsbetrag nach Abzug des Rabatts: ${eur(liste)} ./. ${eur(rabatt)} = ${eur(n)}.`,
      { quelle: "Skript Teil I, Sofort-Rabatte" });
  }),
  V("wu-bonus-erhalten", "warenunterkonten", (r) => {
    const umsatz = r.betrag(10000, 100000, 1000), p = r.wahl([1, 2, 3, 5]), n = G.prozent(umsatz, p), u = ust(n);
    return buchung("wu-bonus-erhalten", "warenunterkonten",
      `Der Lieferant gewährt nachträglich einen Bonus von ${pt(p)} auf die im Jahr bezogenen Waren (netto ${eur(umsatz)}). Der Bonus zzgl. USt wird dem Bankkonto gutgeschrieben.`,
      satz([["bank", n + u]], [["erhalteneBoni", n], ["vorsteuer", u]]),
      `Bonus netto ${eur(n)} → Erhaltene Boni (Unterkonto WEK). Die Vorsteuer mindert sich um ${eur(u)} (§ 17 I UStG).`, { quelle: "Skript Teil I, Boni" });
  }),
  V("wu-bonus-gewaehrt", "warenunterkonten", (r) => {
    const n = r.betrag(100, 3000, 10), u = ust(n), brutto = n + u;
    return buchung("wu-bonus-gewaehrt", "warenunterkonten",
      `Der Unternehmer gewährt einem Großkunden nachträglich einen Bonus von ${eur(brutto)} brutto (inkl. 19 % USt) und überweist ihn sofort.`,
      satz([["gewaehrteBoni", n], ["umsatzsteuer", u]], [["bank", brutto]]),
      `Netto = ${eur(brutto)} ÷ 1,19 = ${eur(n)} → Gewährte Boni; USt-Minderung ${eur(u)}.`, { quelle: "Übung Wiederholung, Tz. 9" });
  }),
  V("wu-skonto-lieferant", "warenunterkonten", (r) => {
    const n = r.betrag(1000, 30000, 100), u = ust(n), brutto = n + u, p = r.wahl([2, 3]);
    const { sn, su, zahlung } = skonto(brutto, n, u, p);
    return buchung("wu-skonto-lieferant", "warenunterkonten",
      `Eine bereits gebuchte Lieferantenrechnung über ${eur(brutto)} (${eur(n)} + ${eur(u)} USt) wird innerhalb der Skontofrist unter Abzug von ${pt(p)} Skonto per Bank bezahlt.`,
      satz([["verbindlichkeitenLuL", brutto]], [["bank", zahlung], ["erhalteneSkonti", sn], ["vorsteuer", su]]),
      `Skonto brutto ${eur(sn + su)} = netto ${eur(sn)} (Erhaltene Skonti) + Vorsteuerkorrektur ${eur(su)}. Überweisung ${eur(zahlung)}.`,
      { quelle: "Skript Teil I, Entgeltsminderungen – Beispiel 1" });
  }),
  V("wu-skonto-kunde", "warenunterkonten", (r) => {
    const n = r.betrag(500, 20000, 100), u = ust(n), brutto = n + u, p = r.wahl([2, 3]);
    const { sn, su, zahlung } = skonto(brutto, n, u, p);
    return buchung("wu-skonto-kunde", "warenunterkonten",
      `Ein Kunde begleicht unsere Rechnung über ${eur(brutto)} (${eur(n)} + ${eur(u)} USt) unter Abzug von ${pt(p)} Skonto per Banküberweisung.`,
      satz([["bank", zahlung], ["gewaehrteSkonti", sn], ["umsatzsteuer", su]], [["forderungenLuL", brutto]]),
      `Gewährte Skonti (netto ${eur(sn)}) mindern die Erlöse; die USt wird um ${eur(su)} berichtigt. Zahlungseingang ${eur(zahlung)}.`,
      { quelle: "Skript Teil I, Entgeltsminderungen – Beispiel 1" });
  }),
  V("wu-skonto-anlage", "warenunterkonten", (r) => {
    const n = r.betrag(5000, 60000, 1000), u = ust(n), brutto = n + u;
    const [konto, gegenstand] = r.wahl([["fuhrpark", "einen Lkw"], ["bga", "eine Ladeneinrichtung"], ["maschinen", "eine Maschine"]]);
    const { sn, su, zahlung } = skonto(brutto, n, u, 2);
    return buchung("wu-skonto-anlage", "warenunterkonten",
      `Der Unternehmer hat ${gegenstand} für ${eur(n)} zzgl. ${eur(u)} USt auf Ziel gekauft (bereits gebucht). Er bezahlt jetzt unter Abzug von 2 % Skonto per Bank.`,
      satz([["verbindlichkeitenLuL", brutto]], [["bank", zahlung], [konto, sn], ["vorsteuer", su]]),
      "Beim Anlagevermögen wird kein Skontokonto geführt: Der Skonto mindert direkt die Anschaffungskosten auf dem Anlagekonto (§ 255 I 3 HGB).",
      { quelle: "Skript Teil I, Skonti – Hinweis Anlagevermögen" });
  }),
  V("wu-warenverlust", "warenunterkonten", (r) => {
    const b = r.betrag(100, 3000, 50);
    return buchung("wu-warenverlust", "warenunterkonten",
      `Bei einem Einbruch werden Waren mit Anschaffungskosten von ${eur(b)} gestohlen. Der Verlust soll gesondert erfasst werden.`,
      einfach("warenverluste", "wareneingang", b),
      "Warenverluste an WEK – so wird der Wareneinsatz zutreffend ermittelt. Diebstahl ist keine Lieferung und führt nicht zu einer USt-/Vorsteuerkorrektur.",
      { quelle: "Skript Teil I, Warenverluste durch Diebstahl, Schwund etc." });
  }),
  V("wu-anlage-nebenkosten", "warenunterkonten", (r) => {
    const preis = r.betrag(15000, 60000, 500), ueberf = r.betrag(300, 1200, 50), u = ust(preis + ueberf);
    return buchung("wu-anlage-nebenkosten", "warenunterkonten",
      `Kauf eines Lieferwagens auf Ziel: Kaufpreis ${eur(preis)} + Überführungskosten ${eur(ueberf)}, jeweils zzgl. 19 % USt (gesamt ${eur(u)} USt).`,
      satz([["fuhrpark", preis + ueberf], ["vorsteuer", u]], [["verbindlichkeitenLuL", preis + ueberf + u]]),
      "Anschaffungsnebenkosten beim Anlagevermögen werden direkt auf dem Anlagekonto aktiviert – kein Konto Bezugskosten.",
      { quelle: "Skript Teil I, Warenbezugskosten – Hinweis" });
  }),
  V("wu-vorbereitend", "warenunterkonten", (r) => {
    const b = r.betrag(100, 20000, 50);
    const [name, s, erkl] = r.wahl([
      ["Erhaltene Skonti", einfach("erhalteneSkonti", "wareneingang", b), "Erhaltene Skonti mindern die Anschaffungskosten → Abschluss über das WEK (Haben)."],
      ["Erhaltene Boni", einfach("erhalteneBoni", "wareneingang", b), "Erhaltene Boni mindern die Anschaffungskosten → Abschluss über das WEK."],
      ["Preisnachlässe", einfach("preisnachlaesse", "wareneingang", b), "Preisnachlässe der Lieferanten → Abschluss über das WEK."],
      ["Warenbezugskosten", einfach("wareneingang", "warenbezugskosten", b), "Bezugskosten erhöhen die Anschaffungskosten → WEK an Warenbezugskosten."],
      ["Gewährte Skonti", einfach("umsatzerloese", "gewaehrteSkonti", b), "Gewährte Skonti mindern die Erlöse → WVK an Gewährte Skonti."],
      ["Gewährte Boni", einfach("umsatzerloese", "gewaehrteBoni", b), "Gewährte Boni mindern die Erlöse → WVK an Gewährte Boni."],
      ["Erlösschmälerungen", einfach("umsatzerloese", "erloesschmaelerungen", b), "Erlösschmälerungen → WVK an Erlösschmälerungen."],
    ]);
    return buchung("wu-vorbereitend", "warenunterkonten",
      `Vorbereitende Abschlussbuchung: Das Konto „${name}“ weist einen Saldo von ${eur(b)} aus. Schließen Sie es über das zugehörige Hauptkonto ab.`,
      s, erkl, { quelle: "Skript Teil I, Buchungskreislauf – vorbereitende Abschlussbuchungen" });
  }),
];

// ---------------- Umsatzsteuer ----------------
const umsatzsteuer = [
  V("us-vorauszahlung", "umsatzsteuer", (r) => {
    const b = r.betrag(500, 20000, 10);
    return buchung("us-vorauszahlung", "umsatzsteuer",
      `Die Umsatzsteuer-Vorauszahlung laut Voranmeldung über ${eur(b)} wird an das Finanzamt überwiesen. Die Vorauszahlungen werden direkt auf dem Konto Umsatzsteuer gebucht.`,
      einfach("umsatzsteuer", "bank", b), "Die Zahlung mindert die Verbindlichkeit gegenüber dem FA → USt im Soll (Methode 1 im Skript).",
      { quelle: "Skript Teil I, Umsatzsteuer-Vorauszahlungen" });
  }),
  V("us-abschluss-zahllast", "umsatzsteuer", (r) => {
    const vst = r.betrag(5000, 50000, 10), u = vst + r.betrag(1000, 30000, 10), schritt = r.muenze();
    return buchung("us-abschluss-zahllast", "umsatzsteuer",
      `Saldo Vorsteuer: ${eur(vst)} (Soll). Saldo Umsatzsteuer: ${eur(u)} (Haben). ` +
        (schritt ? "Buchen Sie die Verrechnung der beiden Konten." : "Die Konten wurden bereits verrechnet. Schließen Sie das verbleibende Konto über das SBK ab."),
      schritt ? einfach("umsatzsteuer", "vorsteuer", vst) : einfach("umsatzsteuer", "sbk", u - vst),
      schritt ? `Das Konto mit dem kleineren Saldo wird auf das Konto mit dem größeren Saldo übertragen: USt an Vorsteuer ${eur(vst)}.`
        : `Verbleibende Zahllast ${eur(u - vst)} ist eine Verbindlichkeit → USt an SBK.`,
      { quelle: "Skript Teil I, Abschluss von Vorsteuer- und Umsatzsteuerkonto" });
  }),
  V("us-abschluss-erstattung", "umsatzsteuer", (r) => {
    const u = r.betrag(2000, 30000, 10), vst = u + r.betrag(500, 15000, 10), schritt = r.muenze();
    return buchung("us-abschluss-erstattung", "umsatzsteuer",
      `Saldo Vorsteuer: ${eur(vst)} (Soll). Saldo Umsatzsteuer: ${eur(u)} (Haben). ` +
        (schritt ? "Buchen Sie die Verrechnung der beiden Konten." : "Die Konten wurden bereits verrechnet. Schließen Sie das verbleibende Konto über das SBK ab."),
      schritt ? einfach("umsatzsteuer", "vorsteuer", u) : einfach("sbk", "vorsteuer", vst - u),
      schritt ? `Die USt ist kleiner: USt an Vorsteuer in Höhe des USt-Saldos (${eur(u)}).`
        : `Es verbleibt ein Vorsteuerüberhang (Forderung gegenüber dem FA) von ${eur(vst - u)} → SBK an Vorsteuer.`,
      { quelle: "Skript Teil I, Abschluss von Vorsteuer- und Umsatzsteuerkonto" });
  }),
  V("us-zahllast", "umsatzsteuer", (r) => {
    const u = r.betrag(40000, 150000, 100), vst = r.betrag(5000, 19000, 100), vz = r.betrag(1000, 10000, 100), rest = u - vst - vz;
    return zahl("us-zahllast", "umsatzsteuer",
      `Umsatzsteuer lt. Konto: ${eur(u)}; Vorsteuer: ${eur(vst)}; geleistete Vorauszahlungen (auf dem USt-Konto gebucht): ${eur(vz)}. Welcher Betrag ist zum Bilanzstichtag als USt-Verbindlichkeit auszuweisen?`,
      rest, `${eur(u)} ./. ${eur(vst)} ./. ${eur(vz)} = ${eur(rest)}.`);
  }),
  V("us-herausrechnen", "umsatzsteuer", (r) => {
    const s = r.wahl([19, 7]), n = r.betrag(100, 10000, 100), u = ust(n, s);
    return zahl("us-herausrechnen", "umsatzsteuer",
      `Ein Bruttobetrag von ${eur(n + u)} enthält ${pt(s)} Umsatzsteuer. Wie hoch ist die enthaltene Umsatzsteuer?`,
      u, `USt = Brutto × ${s}/${100 + s} = ${eur(u)}; Netto = ${eur(n)}.`);
  }),
];

// ---------------- Eröffnung & Abschluss ----------------
const abschluss = [
  V("ab-eroeffnung", "abschluss", (r) => {
    const b = r.betrag(1000, 80000, 100), aktiv = r.muenze();
    const konto = aktiv ? r.wahl(["kasse", "bank", "bga", "forderungenLuL", "warenbestand", "fuhrpark"]) : r.wahl(["darlehensverbindlichkeiten", "verbindlichkeitenLuL", "eigenkapital"]);
    const kn = K(konto).kurz;
    return buchung("ab-eroeffnung", "abschluss", `Eröffnungsbuchung: Laut Eröffnungsbilanz beträgt der Posten „${kn}“ ${eur(b)}.`,
      aktiv ? einfach(konto, "ebk", b) : einfach("ebk", konto, b),
      aktiv ? `Aktivkonten übernehmen den Anfangsbestand im Soll; Gegenkonto ist das EBK: ${kn} an EBK.`
        : `Passivkonten (und das Eigenkapital) übernehmen den Anfangsbestand im Haben: EBK an ${kn}.`,
      { quelle: "Skript Teil I, Eröffnungsbilanzkonto" });
  }),
  V("ab-sbk", "abschluss", (r) => {
    const b = r.betrag(1000, 80000, 100), aktiv = r.muenze();
    const konto = aktiv ? r.wahl(["kasse", "bank", "bga", "forderungenLuL", "warenbestand", "fuhrpark", "vorsteuer"]) : r.wahl(["darlehensverbindlichkeiten", "verbindlichkeitenLuL", "eigenkapital", "umsatzsteuer"]);
    const kn = K(konto).kurz;
    return buchung("ab-sbk", "abschluss", `Abschlussbuchung: Das Konto „${kn}“ weist einen Schlussbestand von ${eur(b)} aus. Schließen Sie es ab.`,
      aktiv ? einfach("sbk", konto, b) : einfach(konto, "sbk", b),
      aktiv ? `Aktivkonto: Der Endbestand steht im Haben des Kontos, die Gegenbuchung im Soll des SBK → SBK an ${kn}.`
        : `Passivkonto: Der Endbestand steht im Soll des Kontos, die Gegenbuchung im Haben des SBK → ${kn} an SBK.`,
      { quelle: "Skript Teil I, Schlussbilanzkonto" });
  }),
  V("ab-erfolgskonto", "abschluss", (r) => {
    const b = r.betrag(100, 30000, 50), aufwand = r.muenze();
    const konto = aufwand ? r.wahl(["mietaufwendungen", "zinsaufwendungen", "kfzKosten", "telefon", "buerobedarf", "afa", "warenvertriebskosten", "warenverluste"])
      : r.wahl(["zinsertraege", "provisionserloese", "mietertraege", "sonstigeErtraege"]);
    const kn = K(konto).kurz;
    return buchung("ab-erfolgskonto", "abschluss", `Das Konto „${kn}“ weist einen Saldo von ${eur(b)} aus. Schließen Sie es ab.`,
      aufwand ? einfach("guv", konto, b) : einfach(konto, "guv", b),
      aufwand ? `Aufwandskonten werden über die GuV abgeschlossen: GuV an ${kn}.` : `Ertragskonten werden über die GuV abgeschlossen: ${kn} an GuV.`,
      { quelle: "Skript Teil I, Aufwands- und Ertragskonten" });
  }),
  V("ab-guv", "abschluss", (r) => {
    const a = r.betrag(50000, 300000, 1000);
    let e = r.betrag(50000, 300000, 1000);
    if (e === a) e += 500000;
    const gewinn = e > a, diff = Math.abs(e - a);
    return buchung("ab-guv", "abschluss", `Im GuV-Konto stehen Aufwendungen von ${eur(a)} und Erträge von ${eur(e)}. Schließen Sie das GuV-Konto ab.`,
      gewinn ? einfach("guv", "eigenkapital", diff) : einfach("eigenkapital", "guv", diff),
      gewinn ? `Gewinn ${eur(diff)} erhöht das Eigenkapital → GuV an Eigenkapital.` : `Verlust ${eur(diff)} mindert das Eigenkapital → Eigenkapital an GuV.`,
      { quelle: "Skript Teil I, Abschluss der Unterkonten" });
  }),
  V("ab-privat", "abschluss", (r) => {
    const b = r.betrag(1000, 60000, 100), entnahme = r.muenze();
    return buchung("ab-privat", "abschluss",
      `Das Konto „${entnahme ? "Privatentnahmen" : "Privateinlagen"}“ weist zum Jahresende einen Saldo von ${eur(b)} aus. Schließen Sie es ab.`,
      entnahme ? einfach("eigenkapital", "privatentnahmen", b) : einfach("privateinlagen", "eigenkapital", b),
      entnahme ? "Entnahmen mindern das Eigenkapital → Eigenkapital an Privatentnahmen (vorbereitende Abschlussbuchung)." : "Einlagen erhöhen das Eigenkapital → Privateinlagen an Eigenkapital.",
      { quelle: "Skript Teil I, Privatkonten / Buchungskreislauf" });
  }),
];

// ---------------- Kalkulation ----------------
const prozentAufgabe = { einheit: "%", toleranz: 1 };
const kalkulation = [
  V("ka-rohgewinn", "kalkulation", (r) => {
    const we = r.betrag(100000, 2000000, 10000), a = r.wahl([20, 25, 30, 35, 40, 50, 60]), umsatz = we + G.prozent(we, a);
    return zahl("ka-rohgewinn", "kalkulation", `Wirtschaftlicher Umsatz: ${eur(umsatz)}; Wareneinsatz: ${eur(we)}. Wie hoch ist der Rohgewinn?`,
      umsatz - we, `Rohgewinn = Umsatz ./. Wareneinsatz = ${eur(umsatz - we)}.`, { quelle: "Skript Teil I, Kalkulation – Rohgewinn" });
  }),
  V("ka-ras", "kalkulation", (r) => {
    const we = r.betrag(100000, 2000000, 10000), a = r.wahl([20, 25, 30, 35, 40, 50, 60, 80]), umsatz = we + G.prozent(we, a);
    return zahl("ka-ras", "kalkulation", `Wirtschaftlicher Umsatz: ${eur(umsatz)}; Wareneinsatz: ${eur(we)}. Ermitteln Sie den Rohgewinnaufschlagsatz.`,
      a * 100, `Rohgewinnaufschlagsatz = Rohgewinn × 100 ÷ Wareneinsatz = ${eur(umsatz - we)} × 100 ÷ ${eur(we)} = ${pt(a)}.`,
      { ...prozentAufgabe, quelle: "Skript Teil I, Kalkulation – Rohgewinnaufschlagsatz" });
  }),
  V("ka-rgs", "kalkulation", (r) => {
    const we = r.betrag(100000, 2000000, 10000), a = r.wahl([20, 25, 30, 40, 50, 60, 100]), umsatz = we + G.prozent(we, a);
    const rgs = Math.round(((umsatz - we) * 10000) / umsatz);
    return zahl("ka-rgs", "kalkulation", `Wirtschaftlicher Umsatz: ${eur(umsatz)}; Wareneinsatz: ${eur(we)}. Ermitteln Sie den Rohgewinnsatz (auf zwei Nachkommastellen).`,
      rgs, `Rohgewinnsatz = Rohgewinn × 100 ÷ Umsatz = ${eur(umsatz - we)} × 100 ÷ ${eur(umsatz)} = ${G.prozentText(rgs)}.`,
      { ...prozentAufgabe, quelle: "Skript Teil I, Kalkulation – Rohgewinnsatz" });
  }),
  V("ka-umrechnung", "kalkulation", (r) => {
    const ras = r.wahl([20, 25, 40, 50, 60, 80, 100]), rgs = Math.round((ras * 10000) / (100 + ras));
    return zahl("ka-umrechnung", "kalkulation", `Der Rohgewinnaufschlagsatz beträgt ${pt(ras)}. Wie hoch ist der Rohgewinnsatz (auf zwei Nachkommastellen)?`,
      rgs, `Rohgewinnsatz = RAS × 100 ÷ (100 + RAS) = ${ras} × 100 ÷ ${100 + ras} = ${G.prozentText(rgs)}.`,
      { ...prozentAufgabe, quelle: "Skript Teil I, Kalkulation – Umrechnungsformeln" });
  }),
  V("ka-bestand-vk", "kalkulation", (r) => {
    const ak = r.betrag(20000, 300000, 1000), ras = r.wahl([20, 25, 40, 50, 60]);
    const vkNetto = ak + G.prozent(ak, ras), vkBrutto = vkNetto + ust(vkNetto);
    return zahl("ka-bestand-vk", "kalkulation",
      `Die Inventur wurde zu Verkaufspreisen einschließlich 19 % USt durchgeführt: ${eur(vkBrutto)}. Der durchschnittliche Rohgewinnaufschlagsatz beträgt ${pt(ras)}. Mit welchen Anschaffungskosten ist der Warenbestand anzusetzen?`,
      ak, `1. USt herausrechnen: ${eur(vkBrutto)} ÷ 1,19 = ${eur(vkNetto)}.\n2. Aufschlag herausrechnen: ${eur(vkNetto)} × 100 ÷ ${100 + ras} = ${eur(ak)}.`,
      { quelle: "Skript Teil I, Ermittlung des Warenbestandes; Übung Kalkulation Tz. 1" });
  }),
  V("ka-einstandspreis", "kalkulation", (r) => {
    const liste = r.betrag(500, 10000, 100), rp = r.wahl([10, 20, 25, 50]), sp = r.wahl([2, 3]), bezug = r.betrag(20, 300, 10);
    const ziel = liste - G.prozent(liste, rp), bar = ziel - G.prozent(ziel, sp), einstand = bar + bezug;
    return zahl("ka-einstandspreis", "kalkulation",
      `Einkaufskalkulation: Listenpreis ${eur(liste)}, Wiederverkäuferrabatt ${pt(rp)}, Skonto ${pt(sp)}, Bezugskosten ${eur(bezug)}. Wie hoch ist der Einstandspreis (Bezugspreis)?`,
      einstand, `Listenpreis ${eur(liste)} ./. Rabatt = Zieleinkaufspreis ${eur(ziel)} ./. Skonto = Bareinkaufspreis ${eur(bar)} + Bezugskosten = Einstandspreis ${eur(einstand)}.`,
      { quelle: "Skript Teil I, Einkaufskalkulation" });
  }),
  V("ka-verkaufspreis", "kalkulation", (r) => {
    const einstand = r.betrag(200, 5000, 100), gk = r.wahl([20, 25, 40, 50]), gw = r.wahl([10, 20, 25]);
    const selbst = einstand + G.prozent(einstand, gk), vk = selbst + G.prozent(selbst, gw);
    return zahl("ka-verkaufspreis", "kalkulation",
      `Verkaufskalkulation: Einstandspreis ${eur(einstand)}, Geschäftskostenzuschlag ${pt(gk)} (auf den Einstandspreis), Gewinnzuschlag ${pt(gw)} (auf die Selbstkosten). Wie hoch ist der Netto-Verkaufspreis?`,
      vk, `Selbstkostenpreis = ${eur(einstand)} + ${pt(gk)} = ${eur(selbst)}; Verkaufspreis = ${eur(selbst)} + ${pt(gw)} = ${eur(vk)}.`,
      { quelle: "Skript Teil I, Verkaufskalkulation" });
  }),
  V("ka-reingewinnsatz", "kalkulation", (r) => {
    const umsatz = r.betrag(200000, 3000000, 10000), s = r.wahl([4, 5, 8, 10, 12, 15]), rg = G.prozent(umsatz, s);
    return zahl("ka-reingewinnsatz", "kalkulation", `Wirtschaftlicher Umsatz: ${eur(umsatz)}; Reingewinn lt. GuV: ${eur(rg)}. Ermitteln Sie den Reingewinnsatz.`,
      s * 100, `Reingewinnsatz = Reingewinn × 100 ÷ wirtschaftlicher Umsatz = ${pt(s)}.`,
      { ...prozentAufgabe, quelle: "Skript Teil I, Kalkulation – Reingewinnsatz" });
  }),
];

// ---------------- Gewinnermittlung ----------------
const gewinnermittlung = [
  V("ge-bvv", "gewinnermittlung", (r) => {
    const ende = r.betrag(50000, 300000, 1000), vorjahr = r.betrag(50000, 300000, 1000), ent = r.betrag(10000, 80000, 1000), ein = r.betrag(0, 20000, 1000);
    const g = ende - vorjahr + ent - ein;
    return zahl("ge-bvv", "gewinnermittlung",
      `Betriebsvermögen 31.12.02: ${eur(ende)}; Betriebsvermögen 31.12.01: ${eur(vorjahr)}; Entnahmen 02: ${eur(ent)}; Einlagen 02: ${eur(ein)}. Ermitteln Sie den Gewinn 02 nach § 4 I 1 EStG (Verlust mit Minus).`,
      g, `BV Ende 02 ./. BV Ende 01 + Entnahmen ./. Einlagen = ${eur(ende)} ./. ${eur(vorjahr)} + ${eur(ent)} ./. ${eur(ein)} = ${eur(g)}.`,
      { quelle: "Skript Teil I, Betriebsvermögensvergleich; Übung Gewinnermittlung" });
  }),
  V("ge-reinvermoegen", "gewinnermittlung", (r) => {
    const av = r.betrag(50000, 200000, 500), uv = r.betrag(20000, 150000, 500), sch = r.betrag(5000, 60000, 500);
    return zahl("ge-reinvermoegen", "gewinnermittlung",
      `Anlagevermögen ${eur(av)}, Umlaufvermögen ${eur(uv)}, Schulden ${eur(sch)}. Wie hoch ist das Betriebsvermögen (Reinvermögen) i.S.v. § 4 I 1 EStG?`,
      av + uv - sch, `Reinvermögen = Vermögen ./. Schulden = ${eur(av + uv)} ./. ${eur(sch)} = ${eur(av + uv - sch)}.`,
      { quelle: "Skript Teil I, Inventar – Gliederung" });
  }),
  V("ge-auswirkung", "gewinnermittlung", (r) => {
    const n = r.betrag(100, 5000, 50), u = ust(n);
    const [text, wirkung, erkl] = r.wahl([
      [`Bezahlung einer Kfz-Reparatur bar: ${eur(n)} zzgl. ${eur(u)} USt.`, -n, `Kfz-Kosten −${eur(n)}; Vorsteuer und Kasse heben sich in Höhe der USt auf → Gewinnminderung ${eur(n)}.`],
      [`Der Inhaber entnimmt ${eur(n)} aus der Geschäftskasse für private Zwecke.`, 0, "Entnahmen sind erfolgsneutral: Die BV-Minderung wird durch die Hinzurechnung der Entnahme ausgeglichen."],
      [`Eine betriebliche Provision von ${eur(n)} zzgl. ${eur(u)} USt geht auf dem privaten Bankkonto ein.`, n, `Provisionserlöse +${eur(n)}. Privatentnahme und USt sind erfolgsneutral.`],
      [`Die Büromiete (umsatzsteuerfrei) über ${eur(n)} wird vom privaten Konto überwiesen.`, -n, `Mietaufwand −${eur(n)}; die Privateinlage ist erfolgsneutral.`],
      [`Tilgung eines Darlehens über ${eur(n)} per Bank.`, 0, "Aktiv-Passiv-Minderung – erfolgsneutral."],
      [`Wareneinkauf auf Ziel über ${eur(n)} zzgl. USt; die Ware ist am Bilanzstichtag noch vollständig vorhanden (Bestandsveränderung bereits erfasst).`, 0, `WEK −${eur(n)} wird durch die Bestandsmehrung (BVK +${eur(n)}) ausgeglichen → per Saldo erfolgsneutral.`],
      [`Der Inhaber entnimmt Waren (Einkaufspreis ${eur(n)} netto) für private Zwecke.`, n, `Ertragskonto Warenentnahmen +${eur(n)}; die Privatentnahme selbst ist erfolgsneutral.`],
    ]);
    return zahl("ge-auswirkung", "gewinnermittlung",
      `Wie wirkt sich der Vorfall auf den Gewinn aus? (Gewinnminderung mit Minus, keine Auswirkung = 0)\n\n${text}`, wirkung, erkl,
      { quelle: "Skript Teil I, Auswirkungen von Buchungen auf Gewinn und BV" });
  }),
];

export const VORLAGEN = [
  ...bestandskonten, ...bilanzveraenderungen, ...erfolgskonten, ...privatkonten, ...warenkonten,
  ...warenunterkonten, ...umsatzsteuer, ...abschluss, ...kalkulation, ...gewinnermittlung,
];
