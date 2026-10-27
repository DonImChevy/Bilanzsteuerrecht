// BilBf (Ausbildung, FTA I): Kompaktwissen für das eigene Thema „AfA – Grundzüge“ und der Klausurplan.
// Die übrigen Themen teilt BilBf mit Bilanzrecht Teil I – deren Zusammenfassungen stehen in bilr/kompakt.js.

export const KOMPAKT_BBF = {
  "bbf-afa": {
    satz: "Abnutzbares Anlagevermögen wird linear über die Nutzungsdauer abgeschrieben – im Anschaffungsjahr monatsgenau ab der Lieferung; Computer und Software dürfen sofort voll abgeschrieben werden (§ 7 Abs. 1 S. 1, 4 EStG).",
    zahlen: [["AK ÷ ND", "Jahres-AfA (linear)"], ["Monat zählt voll", "Anschaffungsmonat im 1. Jahr"], ["1 Jahr", "Digital-AfA für Hard- und Software"], ["1 €", "Erinnerungswert nach Ablauf der ND"]],
    schema: [
      "Abnutzbares Wirtschaftsgut des Anlagevermögens, Nutzung länger als ein Jahr?",
      "Anschaffungszeitpunkt = Lieferung (nicht Bestellung, nicht Zahlung)",
      "Anschaffungskosten ohne abziehbare Vorsteuer",
      "Jahres-AfA = AK ÷ betriebsgewöhnliche Nutzungsdauer (AfA-Tabelle)",
      "Anschaffungsjahr: × Monate ab Liefermonat ÷ 12",
      "Buchung: Abschreibungen an Anlagekonto; Abschluss über GuV",
    ],
    punkte: [
      "**Wozu AfA?** Der Wertverzehr abnutzbarer Wirtschaftsgüter wird als Aufwand auf die Jahre der Nutzung verteilt. Angesetzt werden sie mit den Anschaffungskosten **abzüglich AfA** (§ 6 Abs. 1 Nr. 1 EStG).",
      "**Lineare AfA (§ 7 Abs. 1 S. 1 EStG):** gleiche Jahresbeträge – Anschaffungskosten geteilt durch die betriebsgewöhnliche Nutzungsdauer laut amtlicher AfA-Tabelle.",
      "**Anschaffungsjahr (§ 7 Abs. 1 S. 4 EStG):** nur zeitanteilig; der Monat der Anschaffung zählt **voll**, egal an welchem Tag geliefert wurde.",
      "**Nicht abgeschrieben** werden Grund und Boden (nutzt sich nicht ab) und das Umlaufvermögen (Waren, Forderungen, Bank).",
      "**Digital-AfA (BMF-Schreiben vom 22.02.2022):** Für Computerhardware samt Peripherie und für Software darf eine Nutzungsdauer von **einem Jahr** angesetzt werden – ohne zeitanteilige Kürzung, also voller Abzug im Anschaffungsjahr.",
      "**Buchung:** **Abschreibungen an Anlagekonto** (z. B. Fuhrpark, BGA). Das Aufwandskonto „Abschreibungen“ wird über das GuV-Konto abgeschlossen, der Restbuchwert geht ins SBK.",
      "**Erinnerungswert:** Ist ein Wirtschaftsgut voll abgeschrieben, aber noch im Betrieb, wird es üblicherweise mit **1 €** weitergeführt (gesetzlich nicht vorgeschrieben).",
    ],
    fallen: [
      "Ab Bestellung oder Bezahlung abschreiben – maßgeblich ist die Lieferung (§ 9a EStDV).",
      "Im Anschaffungsjahr die volle Jahres-AfA ansetzen – richtig ist zeitanteilig, der Anschaffungsmonat zählt voll (§ 7 Abs. 1 S. 4 EStG).",
      "Die Vorsteuer in die AfA-Bemessungsgrundlage einrechnen – abziehbare Vorsteuer gehört nicht zu den Anschaffungskosten (§ 9b Abs. 1 EStG).",
    ],
  },
};

export const BEISPIELE_BBF = {
  "bbf-afa": [
    {
      titel: "Lieferwagen und Notebook",
      sv: "Einzelhändlerin H bestellt am 20.08.01 einen Lieferwagen für 36.000 € zzgl. 6.840 € USt; geliefert wird am 03.10.01 (Nutzungsdauer 6 Jahre). Am 12.11.01 kauft sie ein Notebook für 1.500 € zzgl. 285 € USt (Nutzungsdauer laut AfA-Tabelle 3 Jahre). H möchte einen möglichst niedrigen Gewinn 01.",
      aufgabe: "Ermitteln und buchen Sie die AfA für 01.",
      loesung: [
        "Lieferwagen: angeschafft mit Lieferung im Oktober; AK 36.000 € (§ 9b Abs. 1 EStG).",
        "Jahres-AfA 36.000 € ÷ 6 = 6.000 € (§ 7 Abs. 1 S. 1 EStG); 01 zeitanteilig Oktober–Dezember: 6.000 € × 3/12 = **1.500 €** (§ 7 Abs. 1 S. 4 EStG).",
        "BS: Abschreibungen 1.500 € an Fuhrpark 1.500 € → GuV −1.500 € · BVV −1.500 €",
        "Notebook: Digital-AfA (BMF-Schreiben vom 22.02.2022), Nutzungsdauer 1 Jahr, keine zeitanteilige Kürzung → **1.500 €**.",
        "BS: Abschreibungen 1.500 € an BGA 1.500 € → GuV −1.500 € · BVV −1.500 €",
      ],
    },
  ],
};

export const KLAUSUR_BBF = {
  titel: "BilBf-Klausur: so holst du die Punkte",
  aufbau: [
    "**90 Minuten, zwei bis drei Teile:** zuerst Wissens- und Kurzfragen (ca. 15–25 Min.), dann Buchungstechnik am Gesamtfall (ca. 60–65 Min.).",
    "**Wissensfragen:** Buchführungspflicht nach HGB und AO mit Beginn (Mitteilung des Finanzamts), Inventur und Inventurarten mit Fortschreibung des Warenbestands, Arten von Geschäftsvorfällen (BV-Umschichtung oder BV-Änderung).",
    "**Gesamtfall:** Konten eröffnen → Buchungssätze ins Journal → Hauptbuch → AfA berechnen → vorbereitende Abschlussbuchungen (USt, Warenkonten, Privat) → GuV-Konto und SBK → Gewinn durch Betriebsvermögensvergleich.",
  ],
  top: ["bestandskonten", "erfolgskonten", "warenkonten", "umsatzsteuer", "abschluss", "buchfuehrungspflicht", "bilanzveraenderungen", "bbf-afa"],
  tipps: [
    "Buchungssätze immer mit Datum und vollständig: erst alle Soll-, dann alle Haben-Konten – Summe Soll = Summe Haben.",
    "Bei jedem Geschäftsvorfall prüfen: Umsatzsteuer oder Vorsteuer? Betrieblich oder privat veranlasst?",
    "Rechtsgrundlagen nennen, wo gefragt: § 238 HGB, §§ 140, 141 AO, § 240 HGB, § 7 Abs. 1 EStG, § 4 Abs. 1 S. 1 EStG.",
  ],
};
