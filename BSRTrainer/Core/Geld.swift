import Foundation

/// Hilfsfunktionen für Geldbeträge. Es wird durchgängig `Decimal` verwendet,
/// damit keine Rundungsfehler wie bei `Double` entstehen.
public enum Geld {

    /// Rundet kaufmännisch auf zwei Nachkommastellen.
    public static func runden(_ wert: Decimal, stellen: Int = 2) -> Decimal {
        var eingabe = wert
        var ergebnis = Decimal()
        NSDecimalRound(&ergebnis, &eingabe, stellen, .plain)
        return ergebnis
    }

    /// `prozent` Prozent von `basis`, auf Cent gerundet.
    public static func prozent(_ basis: Decimal, _ prozent: Decimal) -> Decimal {
        runden(basis * prozent / 100)
    }

    /// Betrag aus Cent, z. B. `cent(285)` = 2,85.
    public static func cent(_ cent: Int) -> Decimal {
        Decimal(cent) / 100
    }

    private static let formatierer: NumberFormatter = {
        let f = NumberFormatter()
        f.locale = Locale(identifier: "de_DE")
        f.numberStyle = .decimal
        f.usesGroupingSeparator = true
        f.groupingSeparator = "."
        f.decimalSeparator = ","
        f.minimumFractionDigits = 2
        f.maximumFractionDigits = 2
        return f
    }()

    /// "1.234,50"
    public static func text(_ wert: Decimal) -> String {
        formatierer.string(from: runden(wert) as NSDecimalNumber) ?? "\(wert)"
    }

    /// "1.234,50 €" bzw. "1.200 €" bei ganzen Beträgen.
    public static func euro(_ wert: Decimal) -> String {
        let gerundet = runden(wert)
        if gerundet == runden(gerundet, stellen: 0) {
            let f = formatierer.copy() as! NumberFormatter
            f.minimumFractionDigits = 0
            f.maximumFractionDigits = 0
            return (f.string(from: gerundet as NSDecimalNumber) ?? "\(gerundet)") + " €"
        }
        return text(gerundet) + " €"
    }

    /// Prozentangabe, z. B. "25 %" oder "44,44 %".
    public static func prozentText(_ wert: Decimal) -> String {
        let gerundet = runden(wert)
        if gerundet == runden(gerundet, stellen: 0) {
            return "\(NSDecimalNumber(decimal: gerundet).intValue) %"
        }
        return text(gerundet) + " %"
    }

    /// Liest eine Benutzereingabe im deutschen oder englischen Format.
    /// Akzeptiert z. B. "1.234,56", "1234,56", "1234.56", "1.000", "-500", "1 000 €".
    public static func lesen(_ eingabe: String) -> Decimal? {
        var s = eingabe.trimmingCharacters(in: .whitespacesAndNewlines)
        for zeichen in ["€", "EUR", "%", " ", "\u{00A0}", "+"] {
            s = s.replacingOccurrences(of: zeichen, with: "")
        }
        s = s.replacingOccurrences(of: "−", with: "-")
        guard !s.isEmpty else { return nil }

        if s.contains(",") {
            // Deutsches Format: Punkte sind Tausendertrenner.
            s = s.replacingOccurrences(of: ".", with: "")
            s = s.replacingOccurrences(of: ",", with: ".")
        } else if s.contains(".") {
            // Nur Punkte: "1.000" / "12.500.000" = Tausendertrenner, sonst Dezimalpunkt.
            let ohneVorzeichen = s.hasPrefix("-") ? String(s.dropFirst()) : s
            let teile = ohneVorzeichen.split(separator: ".", omittingEmptySubsequences: false)
            let istTausender = teile.count >= 2
                && (1...3).contains(teile[0].count)
                && teile.dropFirst().allSatisfy { $0.count == 3 }
            if istTausender {
                s = s.replacingOccurrences(of: ".", with: "")
            }
        }

        let erlaubt = CharacterSet(charactersIn: "-0123456789.")
        guard s.unicodeScalars.allSatisfy({ erlaubt.contains($0) }),
              s.filter({ $0 == "." }).count <= 1,
              s.dropFirst().contains("-") == false
        else { return nil }

        return Decimal(string: s, locale: Locale(identifier: "en_US_POSIX"))
    }
}
