import Foundation

public struct Lernkarte: Identifiable, Hashable {
    public let id: String
    public let thema: Thema
    public let vorderseite: String
    public let rueckseite: String
}

/// Lernkarten zu Merksätzen, Definitionen und Fristen aus dem Skript.
public enum Lernkarten {

    private static func k(_ id: String, _ thema: Thema, _ vorne: String, _ hinten: String) -> Lernkarte {
        Lernkarte(id: id, thema: thema, vorderseite: vorne, rueckseite: hinten)
    }

    public static let alle: [Lernkarte] = [
        // Buchführungspflicht
        k("lk-238", .buchfuehrungspflicht, "§ 238 I 1 HGB", "Jeder Kaufmann ist verpflichtet, Bücher zu führen und darin seine Handelsgeschäfte und die Lage seines Vermögens nach den GoB ersichtlich zu machen."),
        k("lk-istkaufmann", .buchfuehrungspflicht, "Istkaufmann (§ 1 HGB)", "Wer ein Handelsgewerbe betreibt – jeder Gewerbebetrieb, es sei denn, er erfordert nach Art oder Umfang keinen kaufmännisch eingerichteten Geschäftsbetrieb. Eintragung nur deklaratorisch."),
        k("lk-kannkaufmann", .buchfuehrungspflicht, "Kaufmann kraft Eintragung (§ 2 HGB)", "Kleingewerbetreibender wird durch Eintragung Kaufmann (konstitutiv). Er kann die Löschung jederzeit beantragen."),
        k("lk-lufkaufmann", .buchfuehrungspflicht, "Land- und Forstwirt (§ 3 HGB)", "Kann sich eintragen lassen (Kannkaufmann), ist dann aber an die Option gebunden – Löschung nur nach den allgemeinen Vorschriften."),
        k("lk-formkaufmann", .buchfuehrungspflicht, "Formkaufmann (§ 6 HGB)", "Handelsgesellschaften (OHG, KG, GmbH, AG) sind kraft Rechtsform Kaufleute → stets buchführungspflichtig."),
        k("lk-241a", .buchfuehrungspflicht, "§ 241a HGB – Befreiung", "Einzelkaufleute mit an zwei aufeinanderfolgenden Stichtagen jeweils ≤ 800.000 € Umsatzerlösen UND ≤ 80.000 € Jahresüberschuss. Neugründung: erster Stichtag genügt."),
        k("lk-140", .buchfuehrungspflicht, "§ 140 AO", "Abgeleitete Buchführungspflicht: Wer nach anderen Gesetzen (HGB) Bücher führen muss, hat diese Pflicht auch für die Besteuerung zu erfüllen."),
        k("lk-141", .buchfuehrungspflicht, "§ 141 I AO – Grenzen", "Gewerbliche Unternehmer und LuF: Umsatz > 800.000 € oder Gewinn > 80.000 € (LuF zusätzlich Wirtschaftswert > 25.000 €). Beginn: Wj nach Mitteilung des FA."),

        // Inventur, Inventar, Bilanz
        k("lk-inventur", .inventurBilanz, "Inventur", "Mengen- und wertmäßige Bestandsaufnahme aller Vermögensgegenstände und Schulden (§ 240 HGB). Ausgeweitet: ±10 Tage um den Stichtag (R 5.3 I EStR)."),
        k("lk-inventar", .inventurBilanz, "Inventar", "Ausführliches Verzeichnis aller VG und Schulden nach Art, Menge und Wert; Gliederung: Vermögen (AV, UV) – Schulden (lang-, kurzfristig) – Reinvermögen."),
        k("lk-bilanz", .inventurBilanz, "Bilanz", "Kurz gefasste Gegenüberstellung von Vermögen (Aktiva = Mittelverwendung) und Kapital (Passiva = Mittelherkunft) in Kontenform. Unterschrift nach § 245 HGB."),
        k("lk-aufbewahrung", .inventurBilanz, "Aufbewahrungsfristen", "Bücher, Inventare, Bilanzen: 10 Jahre. Buchungsbelege: 8 Jahre (seit 2025). Handels-/Geschäftsbriefe: 6 Jahre. §§ 257 HGB, 147 AO."),
        k("lk-av", .inventurBilanz, "Anlagevermögen (§ 247 II HGB)", "Gegenstände, die dazu bestimmt sind, dem Betrieb dauernd zu dienen (Gebrauchsgüter)."),
        k("lk-gleichung", .inventurBilanz, "Bilanzgleichungen", "Aktiva = Passiva · Vermögen = EK + FK · EK = Vermögen ./. FK · FK = Vermögen ./. EK"),

        // Bilanzveränderungen
        k("lk-aktivtausch", .bilanzveraenderungen, "Aktivtausch", "Nur Aktivposten ändern sich, Bilanzsumme bleibt gleich. Beispiel: Wareneinkauf gegen Barzahlung."),
        k("lk-passivtausch", .bilanzveraenderungen, "Passivtausch", "Nur Passivposten ändern sich, Bilanzsumme bleibt gleich. Beispiel: Umwandlung einer Lieferantenschuld in ein Darlehen."),
        k("lk-mehrung", .bilanzveraenderungen, "Aktiv-Passiv-Mehrung", "Beide Seiten steigen. Beispiel: Wareneinkauf auf Ziel."),
        k("lk-minderung", .bilanzveraenderungen, "Aktiv-Passiv-Minderung", "Beide Seiten sinken. Beispiel: Bezahlung einer Verbindlichkeit per Bank."),

        // Konten
        k("lk-aktivkonto", .bestandskonten, "Aktivkonto", "AB und Zugänge im Soll, Abgänge im Haben, Saldo (Endbestand) im Haben → SBK an Aktivkonto."),
        k("lk-passivkonto", .bestandskonten, "Passivkonto", "AB und Zugänge im Haben, Abgänge im Soll, Saldo im Soll → Passivkonto an SBK."),
        k("lk-sollhaben", .bestandskonten, "Soll an Haben", "Jeder Buchungssatz nennt zuerst die Soll-, dann (mit „an“) die Habenbuchung. Summe Soll = Summe Haben. Keine Buchung ohne Gegenbuchung!"),
        k("lk-erfolg", .erfolgskonten, "Aufwand / Ertrag", "Unterkonten des Eigenkapitals. Aufwand im Soll, Ertrag im Haben. Abschluss über die GuV (§ 242 II HGB), GuV über das Eigenkapital."),
        k("lk-privat", .privatkonten, "Entnahmen / Einlagen", "Privat veranlasste BV-Änderungen, erfolgsneutral. Entnahmen im Soll, Einlagen im Haben. Abschluss: EK an Privatentnahmen; Privateinlagen an EK."),

        // Waren
        k("lk-vier", .warenkonten, "Viergeteiltes Warenkonto", "WBK (Bestand), WEK (Einkäufe zu AK, Aufwand), BVK (Bestandsveränderung), WVK (Verkäufe zu VK-Preisen, Ertrag)."),
        k("lk-bvk", .warenkonten, "Bestandsveränderung buchen", "Mehrung: WBK an BVK → BVK an WEK. Minderung: BVK an WBK → WEK an BVK."),
        k("lk-wareneinsatz", .warenkonten, "Wareneinsatz", "AB + Einkäufe (inkl. Bezugskosten, ./. Nachlässe) ./. EB ./. Warenverluste ./. Warenentnahmen."),
        k("lk-bezug", .warenunterkonten, "Warenbezugskosten", "Eingangsfrachten, Rollgeld, Zölle = Anschaffungsnebenkosten (§ 255 I 2 HGB). Unterkonto WEK. Abschluss: WEK an Warenbezugskosten. Beim AV direkt aktivieren!"),
        k("lk-vertrieb", .warenunterkonten, "Warenvertriebskosten", "Ausgangsfrachten, Provisionen, Werbung. Kein Unterkonto des WVK – Abschluss direkt über die GuV."),
        k("lk-skonto-ek", .warenunterkonten, "Lieferantenskonto", "Verbindlichkeiten (brutto) an Bank / Erhaltene Skonti (netto) / Vorsteuer (Korrektur). Abschluss: Erhaltene Skonti an WEK."),
        k("lk-skonto-vk", .warenunterkonten, "Kundenskonto", "Bank / Gewährte Skonti (netto) / USt (Korrektur) an Forderungen (brutto). Abschluss: WVK an Gewährte Skonti."),
        k("lk-boni", .warenunterkonten, "Boni", "Nachträglicher Rabatt (Umsatzvergütung). Erhalten: … an Erhaltene Boni / VSt. Gewährt: Gewährte Boni / USt an …"),
        k("lk-ruecksendung", .warenunterkonten, "Rücksendungen", "Direkt auf WEK bzw. WVK stornieren (mit USt-/VSt-Korrektur nach § 17 UStG)."),

        // USt
        k("lk-netto", .umsatzsteuer, "Nettomethode", "Entgelt und USt werden bei jedem Geschäftsvorfall auf getrennten Konten gebucht."),
        k("lk-ustabschluss", .umsatzsteuer, "Abschluss USt/VSt", "Kleineren Saldo auf größeren übertragen (USt an VSt). Zahllast: USt an SBK. Erstattungsanspruch: SBK an VSt."),
        k("lk-17", .umsatzsteuer, "§ 17 I UStG", "Ändert sich die Bemessungsgrundlage (Skonto, Bonus, Nachlass, Rücksendung), sind USt beim Leistenden und VSt beim Empfänger zu berichtigen."),

        // Abschluss
        k("lk-kreislauf", .abschluss, "Buchungskreislauf", "1. Eröffnungsbuchungen (EBK) 2. laufende Buchungen 3. vorbereitende Abschlussbuchungen 4. Abschlussbuchungen (GuV, SBK)."),
        k("lk-vorbereitend", .abschluss, "Vorbereitende Abschlussbuchungen", "Nachträge, Abschreibungen, Rückstellungen, RAP, Abschluss der Privatkonten und der Unterkonten (Skonti, Boni, Bezugskosten …)."),

        // Kalkulation
        k("lk-ras", .kalkulation, "Rohgewinnaufschlagsatz", "Rohgewinn × 100 ÷ Wareneinsatz (= Kalkulationszuschlag)."),
        k("lk-rgs", .kalkulation, "Rohgewinnsatz", "Rohgewinn × 100 ÷ wirtschaftlicher Umsatz (= Handelsspanne)."),
        k("lk-umrechnung", .kalkulation, "Umrechnung", "RAS = RGS × 100 ÷ (100 − RGS)\nRGS = RAS × 100 ÷ (100 + RAS)"),
        k("lk-reingewinn", .kalkulation, "Reingewinnsatz / -aufschlagsatz", "Reingewinn × 100 ÷ Umsatz bzw. Reingewinn × 100 ÷ Wareneinsatz."),
        k("lk-einkauf", .kalkulation, "Einkaufskalkulation", "Listenpreis ./. Rabatt = Zieleinkaufspreis ./. Skonto = Bareinkaufspreis + Bezugskosten = Einstandspreis (AK)."),

        // Gewinnermittlung
        k("lk-bvv", .gewinnermittlung, "Betriebsvermögensvergleich (§ 4 I 1 EStG)", "BV Ende Wj ./. BV Ende Vorjahr + Entnahmen ./. Einlagen = Gewinn; ± außerbilanzielle Korrekturen = steuerlicher Gewinn."),
        k("lk-mehrweniger", .gewinnermittlung, "Bilanzpostenmethode", "Gewinnerhöhend: Aktiva ↑, Passiva ↓, Entnahmen ↑, Einlagen ↓. Gewinnmindernd: jeweils umgekehrt."),

        // Grundbegriffe
        k("lk-begriffe", .grundbegriffe, "Auszahlung – Ausgabe – Aufwand – Kosten", "Auszahlung: Abfluss von Zahlungsmitteln. Ausgabe: Minderung des Geldvermögens. Aufwand: betrieblich veranlasste BV-Minderung. Kosten: Werteverzehr für die Leistungserstellung."),
        k("lk-kostenarten", .grundbegriffe, "Neutraler Aufwand / Zusatz- / Anderskosten", "Neutraler Aufwand: Aufwand ohne Kosten (betriebsfremd, periodenfremd, außerordentlich). Zusatzkosten: Kosten ohne Aufwand (kalk. Unternehmerlohn). Anderskosten: anders bewertet (kalk. AfA)."),

        // Bücher
        k("lk-buecher", .buecher, "Grund-, Haupt-, Nebenbücher", "Grundbuch: chronologisch (Journal, Kassenbuch). Hauptbuch: sachlich (Sachkonten). Nebenbücher: Kontokorrent, Anlagenkartei, Lager, Lohnkonten, Wechselbuch."),
    ]

    public static func karten(themen: Set<Thema>) -> [Lernkarte] {
        alle.filter { themen.contains($0.thema) }
    }
}
