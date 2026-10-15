import Foundation

/// Art eines Kontos – bestimmt, auf welcher Seite Zugänge gebucht werden.
public enum Kontoart: String, Codable, CaseIterable {
    case aktiv
    case passiv
    case eigenkapital
    case privat
    case aufwand
    case ertrag
    case erfolg
    case abschluss

    public var bezeichnung: String {
        switch self {
        case .aktiv: return "Aktives Bestandskonto"
        case .passiv: return "Passives Bestandskonto"
        case .eigenkapital: return "Eigenkapitalkonto"
        case .privat: return "Privatkonto (Unterkonto EK)"
        case .aufwand: return "Aufwandskonto"
        case .ertrag: return "Ertragskonto"
        case .erfolg: return "Erfolgskonto (Aufwand oder Ertrag)"
        case .abschluss: return "Abschlusskonto"
        }
    }

    public var kurz: String {
        switch self {
        case .aktiv: return "Aktiv"
        case .passiv: return "Passiv"
        case .eigenkapital: return "EK"
        case .privat: return "Privat"
        case .aufwand: return "Aufwand"
        case .ertrag: return "Ertrag"
        case .erfolg: return "Erfolg"
        case .abschluss: return "Abschluss"
        }
    }
}

/// Konten laut Kontenplan des Skripts (Kontenklassen 0–5) plus Abschlusskonten.
public enum Konto: String, CaseIterable, Identifiable, Codable, Hashable {
    // Kontenklasse 0 – Anlagevermögen
    case immaterielleVG
    case grundUndBoden
    case gebaeude
    case fuhrpark
    case maschinen
    case bga
    case gwg
    case beteiligungen
    case wertpapiere
    case darlehensforderungen

    // Kontenklasse 1 – Umlaufvermögen
    case warenbestand
    case geleisteteAnzahlungen
    case forderungenLuL
    case forderungenGewSt
    case sonstigeForderungen
    case vorsteuer
    case nichtVerrechenbareVorsteuer
    case kasse
    case bank
    case arap

    // Kontenklasse 2 – Eigenkapitalkonten
    case eigenkapital
    case privatentnahmen
    case privateinlagen

    // Kontenklasse 3 – Fremdkapitalkonten
    case darlehensverbindlichkeiten
    case erhalteneAnzahlungen
    case verbindlichkeitenLuL
    case verbindlichkeitenSteuern
    case sonstigeVerbindlichkeiten
    case umsatzsteuer
    case nichtFaelligeUmsatzsteuer
    case prap

    // Kontenklasse 4 – Betriebliche Erträge
    case umsatzerloese
    case erloesschmaelerungen
    case gewaehrteSkonti
    case gewaehrteBoni
    case mietertraege
    case zinsertraege
    case provisionserloese
    case sonstigeErtraege
    case ertraegeZuschreibung
    case ertraegeAbgangAV
    case warenentnahmen
    case privateKfzNutzung

    // Kontenklasse 5 – Betriebliche Aufwendungen
    case wareneingang
    case bestandsveraenderung
    case warenbezugskosten
    case preisnachlaesse
    case erhalteneSkonti
    case erhalteneBoni
    case warenverluste
    case warenvertriebskosten
    case afa
    case ausserplanmaessigeAbschreibung
    case afaa
    case sofortabschreibungGWG
    case aufwendungenAbgangAV
    case provisionsaufwendungen
    case sonstigeAufwendungen
    case avk
    case mietaufwendungen
    case raumkosten
    case energie
    case reparatur
    case kfzKosten
    case reisekosten
    case telefon
    case buerobedarf
    case zinsaufwendungen
    case rechtsBeratung

    // Abschlusskonten
    case ebk
    case sbk
    case guv

    public var id: String { rawValue }

    public var name: String {
        switch self {
        case .immaterielleVG: return "Immaterielle Vermögensgegenstände"
        case .grundUndBoden: return "Grund und Boden"
        case .gebaeude: return "Gebäude"
        case .fuhrpark: return "Fuhrpark"
        case .maschinen: return "Technische Anlagen und Maschinen"
        case .bga: return "Betriebs- und Geschäftsausstattung (BGA)"
        case .gwg: return "Geringwertige Wirtschaftsgüter (GWG)"
        case .beteiligungen: return "Beteiligungen"
        case .wertpapiere: return "Wertpapiere"
        case .darlehensforderungen: return "Darlehensforderungen"

        case .warenbestand: return "Warenbestandskonto (WBK)"
        case .geleisteteAnzahlungen: return "Geleistete Anzahlungen"
        case .forderungenLuL: return "Forderungen aus L.u.L."
        case .forderungenGewSt: return "Forderungen aus Gewerbesteuerüberzahlungen"
        case .sonstigeForderungen: return "Sonstige Forderungen"
        case .vorsteuer: return "Vorsteuer"
        case .nichtVerrechenbareVorsteuer: return "Noch nicht verrechenbare Vorsteuer"
        case .kasse: return "Kasse"
        case .bank: return "Bank"
        case .arap: return "Aktive Rechnungsabgrenzung (ARAP)"

        case .eigenkapital: return "Eigenkapital"
        case .privatentnahmen: return "Privatentnahmen"
        case .privateinlagen: return "Privateinlagen"

        case .darlehensverbindlichkeiten: return "Darlehensverbindlichkeiten"
        case .erhalteneAnzahlungen: return "Erhaltene Anzahlungen"
        case .verbindlichkeitenLuL: return "Verbindlichkeiten aus L.u.L."
        case .verbindlichkeitenSteuern: return "Verbindlichkeiten aus Steuern und Abgaben"
        case .sonstigeVerbindlichkeiten: return "Sonstige Verbindlichkeiten"
        case .umsatzsteuer: return "Umsatzsteuer"
        case .nichtFaelligeUmsatzsteuer: return "Noch nicht fällige Umsatzsteuer"
        case .prap: return "Passive Rechnungsabgrenzung (PRAP)"

        case .umsatzerloese: return "Umsatzerlöse (WVK)"
        case .erloesschmaelerungen: return "Erlösschmälerungen"
        case .gewaehrteSkonti: return "Gewährte Skonti"
        case .gewaehrteBoni: return "Gewährte Boni"
        case .mietertraege: return "Mieterträge"
        case .zinsertraege: return "Zinserträge"
        case .provisionserloese: return "Provisionserlöse"
        case .sonstigeErtraege: return "Sonstige betriebliche Erträge"
        case .ertraegeZuschreibung: return "Erträge aus Zuschreibung des AV"
        case .ertraegeAbgangAV: return "Erträge aus Abgängen des AV"
        case .warenentnahmen: return "Entnahmen für Zwecke außerhalb des Unternehmens (Warenentnahmen)"
        case .privateKfzNutzung: return "Verwendung von Gegenständen für Zwecke außerhalb des Unternehmens (private Kfz-Nutzung)"

        case .wareneingang: return "Wareneingang (WEK)"
        case .bestandsveraenderung: return "Bestandsveränderungskonto (BVK)"
        case .warenbezugskosten: return "Warenbezugskosten"
        case .preisnachlaesse: return "Preisnachlässe"
        case .erhalteneSkonti: return "Erhaltene Skonti"
        case .erhalteneBoni: return "Erhaltene Boni"
        case .warenverluste: return "Warenverluste"
        case .warenvertriebskosten: return "Warenvertriebskosten"
        case .afa: return "Absetzungen für Abnutzung (AfA)"
        case .ausserplanmaessigeAbschreibung: return "Außerplanmäßige Abschreibungen"
        case .afaa: return "AfaA"
        case .sofortabschreibungGWG: return "Sofortabschreibung GWG"
        case .aufwendungenAbgangAV: return "Aufwendungen aus Abgängen des AV"
        case .provisionsaufwendungen: return "Provisionsaufwendungen"
        case .sonstigeAufwendungen: return "Sonstige betriebliche Aufwendungen"
        case .avk: return "Allgemeine Verwaltungskosten (AVK)"
        case .mietaufwendungen: return "Mietaufwendungen"
        case .raumkosten: return "Raumkosten"
        case .energie: return "Energieaufwendungen"
        case .reparatur: return "Reparaturaufwendungen"
        case .kfzKosten: return "Kfz-Kosten"
        case .reisekosten: return "Reisekosten"
        case .telefon: return "Telefon"
        case .buerobedarf: return "Bürobedarf"
        case .zinsaufwendungen: return "Zinsaufwendungen"
        case .rechtsBeratung: return "Rechts- und Beratungskosten"

        case .ebk: return "Eröffnungsbilanzkonto (EBK)"
        case .sbk: return "Schlussbilanzkonto (SBK)"
        case .guv: return "Gewinn- und Verlustkonto (GuV)"
        }
    }

    /// Kurzname für kompakte Darstellung im Buchungssatz.
    public var kurzname: String {
        switch self {
        case .bga: return "BGA"
        case .gwg: return "GWG"
        case .warenbestand: return "WBK"
        case .arap: return "ARAP"
        case .prap: return "PRAP"
        case .umsatzerloese: return "WVK"
        case .wareneingang: return "WEK"
        case .bestandsveraenderung: return "BVK"
        case .avk: return "AVK"
        case .afa: return "AfA"
        case .ebk: return "EBK"
        case .sbk: return "SBK"
        case .guv: return "GuV"
        case .warenentnahmen: return "Warenentnahmen"
        case .privateKfzNutzung: return "Private Kfz-Nutzung"
        case .forderungenGewSt: return "Forderungen GewSt"
        case .ertraegeZuschreibung: return "Erträge Zuschreibung AV"
        default: return name
        }
    }

    /// Kontenklasse laut Kontenplan; Abschlusskonten = 9.
    public var klasse: Int {
        switch self {
        case .immaterielleVG, .grundUndBoden, .gebaeude, .fuhrpark, .maschinen, .bga, .gwg,
             .beteiligungen, .wertpapiere, .darlehensforderungen:
            return 0
        case .warenbestand, .geleisteteAnzahlungen, .forderungenLuL, .forderungenGewSt,
             .sonstigeForderungen, .vorsteuer, .nichtVerrechenbareVorsteuer, .kasse, .bank, .arap:
            return 1
        case .eigenkapital, .privatentnahmen, .privateinlagen:
            return 2
        case .darlehensverbindlichkeiten, .erhalteneAnzahlungen, .verbindlichkeitenLuL,
             .verbindlichkeitenSteuern, .sonstigeVerbindlichkeiten, .umsatzsteuer,
             .nichtFaelligeUmsatzsteuer, .prap:
            return 3
        case .umsatzerloese, .erloesschmaelerungen, .gewaehrteSkonti, .gewaehrteBoni, .mietertraege,
             .zinsertraege, .provisionserloese, .sonstigeErtraege, .ertraegeZuschreibung,
             .ertraegeAbgangAV, .warenentnahmen, .privateKfzNutzung:
            return 4
        case .ebk, .sbk, .guv:
            return 9
        default:
            return 5
        }
    }

    public var art: Kontoart {
        switch klasse {
        case 0, 1: return .aktiv
        case 2: return self == .eigenkapital ? .eigenkapital : .privat
        case 3: return .passiv
        case 4: return .ertrag
        case 9: return .abschluss
        default: return self == .bestandsveraenderung ? .erfolg : .aufwand
        }
    }

    /// Ergänzender Hinweis zur Buchungsregel bei Korrektur- und Unterkonten.
    public var hinweis: String? {
        switch self {
        case .erloesschmaelerungen, .gewaehrteSkonti, .gewaehrteBoni:
            return "Unterkonto des WVK – mindert die Erlöse, daher Buchung im Soll. Abschluss: WVK an \(kurzname)."
        case .preisnachlaesse, .erhalteneSkonti, .erhalteneBoni:
            return "Unterkonto des WEK – mindert den Wareneinsatz, daher Buchung im Haben. Abschluss: \(kurzname) an WEK."
        case .warenbezugskosten:
            return "Unterkonto des WEK (Anschaffungsnebenkosten, § 255 I 2 HGB). Abschluss: WEK an Warenbezugskosten."
        case .warenvertriebskosten:
            return "Kein Unterkonto des WVK – wird direkt über die GuV abgeschlossen."
        case .bestandsveraenderung:
            return "Mehrung: WBK an BVK; Minderung: BVK an WBK. Abschluss über das WEK."
        case .warenbestand:
            return "Im Laufe des Jahres keine Buchungen – nur Anfangsbestand und Inventur-Endbestand."
        case .vorsteuer:
            return "Forderung gegenüber dem Finanzamt."
        case .umsatzsteuer:
            return "Verbindlichkeit gegenüber dem Finanzamt."
        case .privatentnahmen:
            return "Mindert das Eigenkapital. Abschluss: Eigenkapital an Privatentnahmen."
        case .privateinlagen:
            return "Mehrt das Eigenkapital. Abschluss: Privateinlagen an Eigenkapital."
        case .warenentnahmen, .privateKfzNutzung:
            return "Unentgeltliche Wertabgabe – Ertragskonto, Gegenbuchung i.d.R. Privatentnahmen; USt beachten."
        case .ebk:
            return "Gegenkonto der Eröffnungsbuchungen (Spiegelbild der Eröffnungsbilanz)."
        case .sbk:
            return "Gegenkonto der Abschlussbuchungen aller Bestandskonten."
        case .guv:
            return "Sammelt die Salden der Erfolgskonten; Abschluss über das Eigenkapital."
        default:
            return nil
        }
    }

    /// Merkregel: Wo wird ein Zugang / eine Mehrung gebucht?
    public var buchungsregel: String {
        switch art {
        case .aktiv: return "Anfangsbestand und Zugänge im Soll, Abgänge im Haben"
        case .passiv: return "Anfangsbestand und Zugänge im Haben, Abgänge im Soll"
        case .eigenkapital: return "Anfangsbestand und Mehrungen im Haben, Minderungen im Soll"
        case .privat: return self == .privatentnahmen ? "Entnahmen im Soll" : "Einlagen im Haben"
        case .aufwand: return "Aufwendungen im Soll"
        case .ertrag: return "Erträge im Haben"
        case .erfolg: return "Bestandsmehrung im Haben (Ertrag), Bestandsminderung im Soll (Aufwand)"
        case .abschluss: return "Gegenkonto der Eröffnungs- bzw. Abschlussbuchungen"
        }
    }

    public static func klassenTitel(_ klasse: Int) -> String {
        switch klasse {
        case 0: return "Kontenklasse 0 – Anlagevermögen"
        case 1: return "Kontenklasse 1 – Umlaufvermögen"
        case 2: return "Kontenklasse 2 – Eigenkapitalkonten"
        case 3: return "Kontenklasse 3 – Fremdkapitalkonten"
        case 4: return "Kontenklasse 4 – Betriebliche Erträge"
        case 5: return "Kontenklasse 5 – Betriebliche Aufwendungen"
        default: return "Abschlusskonten"
        }
    }

    public static let klassen: [Int] = [0, 1, 2, 3, 4, 5, 9]

    public static func konten(inKlasse klasse: Int) -> [Konto] {
        allCases.filter { $0.klasse == klasse }
    }
}
