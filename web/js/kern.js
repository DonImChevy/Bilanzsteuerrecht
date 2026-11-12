import { K } from "./konten.js";
import * as G from "./geld.js";
import { pruefeOffen } from "./offen.js";
import { diagnose } from "./denkfehler.js";

export const THEMEN = [
  { id: "buchfuehrungspflicht", titel: "Buchführungspflicht", unter: "Handelsrecht, derivative und originäre Pflicht, Beginn und Ende · §§ 238, 241a HGB, §§ 140, 141 AO", icon: "📕", fach: "bsr", teil: 1 },
  { id: "inventurBilanz", titel: "Inventur, Inventar & Bilanz", unter: "Inventurverfahren, Inventar, Gliederung der Bilanz · §§ 240, 242, 247, 266 HGB", icon: "📋", fach: "bsr", teil: 1 },
  { id: "bilanzveraenderungen", titel: "Bilanzveränderungen", unter: "Aktivtausch, Passivtausch, Aktiv-Passiv-Mehrung und -Minderung", icon: "⇄", fach: "bsr", teil: 1 },
  { id: "bestandskonten", titel: "Bestandskonten", unter: "Aktivkonten, Passivkonten, Buchungssatz, Eröffnung", icon: "🗂️", fach: "bsr", teil: 1 },
  { id: "erfolgskonten", titel: "Erfolgskonten", unter: "Aufwandskonten, Ertragskonten, Abschluss über die GuV", icon: "📈", fach: "bsr", teil: 1 },
  { id: "privatkonten", titel: "Privatkonten", unter: "Entnahmen, Einlagen, Gewinnformel · § 4 Abs. 1 EStG", icon: "👤", fach: "bsr", teil: 1 },
  { id: "warenkonten", titel: "Viergeteiltes Warenkonto", unter: "Warenbestand, Wareneinkauf, Warenverkauf, Rohgewinn", icon: "📦", fach: "bsr", teil: 1 },
  { id: "warenunterkonten", titel: "Rabatte, Skonti, Boni & Co.", unter: "Bezugskosten, Rücksendungen, Skonti und Boni, Sofortrabatte", icon: "％", fach: "bsr", teil: 1 },
  { id: "umsatzsteuer", titel: "Umsatzsteuer & Vorsteuer", unter: "Nettomethode, Entgeltsminderungen, Abschluss der Steuerkonten", icon: "€", fach: "bsr", teil: 1 },
  { id: "abschluss", titel: "Eröffnung & Abschluss", unter: "Eröffnungsbilanzkonto, Schlussbilanzkonto, GuV-Konto, vorbereitende Buchungen", icon: "✅", fach: "bsr", teil: 1 },
  { id: "kalkulation", titel: "Kalkulation", unter: "Einstandspreis, Kalkulationszuschlag und -faktor, Handelsspanne", icon: "🧮", fach: "bsr", teil: 1 },
  { id: "gewinnermittlung", titel: "Gewinnermittlung & GuV/BVV", unter: "Betriebsvermögensvergleich, GuV-Rechnung, Mehr- und Weniger-Rechnung · § 4 Abs. 1 EStG", icon: "Σ", fach: "bsr", teil: 1 },
  { id: "grundbegriffe", titel: "Grundbegriffe", unter: "Auszahlung, Ausgabe, Aufwand, Kosten – und ihre Gegenstücke", icon: "📖", fach: "bsr", teil: 1 },
  { id: "buecher", titel: "Grund-, Haupt- & Nebenbücher", unter: "Grundbuch, Hauptbuch, Nebenbücher, Belegprinzip · §§ 238, 239 HGB", icon: "📚", fach: "bsr", teil: 1 },
  // Bilanzsteuerrecht Teil II (Übungen Teil II, Semesterklausuren)
  { id: "bsr-gob", titel: "GoB, Betriebsvermögen & Bewertung", unter: "Maßgeblichkeit, Bewertungsgrundsätze, Betriebsvermögen · § 252 HGB, § 5 Abs. 1 EStG", icon: "🧭", fach: "bsr", teil: 2 },
  { id: "bsr-zurechnung", titel: "Zurechnung & Zugangszeitpunkt", unter: "Wirtschaftliches Eigentum, Eigentumsvorbehalt, Zugangszeitpunkt · § 39 AO, § 246 HGB", icon: "🔑", fach: "bsr", teil: 2 },
  { id: "bsr-ak", titel: "Anschaffungskosten", unter: "Anschaffungsnebenkosten, Minderungen, Vorsteuer · § 255 Abs. 1 HGB, § 9b EStG", icon: "🏷️", fach: "bsr", teil: 2 },
  { id: "bsr-grundstueck", titel: "Grundstückserwerb & Gebäude-AfA", unter: "Grund und Boden und Gebäude, Nebenkosten, Gebäude-AfA · § 255 HGB, § 7 Abs. 4 EStG", icon: "🏠", fach: "bsr", teil: 2 },
  { id: "bsr-afa", titel: "Abschreibungen & GWG", unter: "Lineare und degressive AfA, GWG, Sammelposten · § 253 Abs. 3 HGB, §§ 6, 7 EStG", icon: "📉", fach: "bsr", teil: 2 },
  { id: "bsr-teilwert", titel: "Teilwert & Wertaufholung", unter: "Teilwert, Niederstwertprinzip, Wertaufholung · § 253 Abs. 3–5 HGB, § 6 Abs. 1 EStG", icon: "⚖️", fach: "bsr", teil: 2 },
  { id: "bsr-abgrenzung", titel: "Rechnungsabgrenzung & Verbindlichkeiten", unter: "Aktive und passive RAP, sonstige Forderungen und Verbindlichkeiten, Disagio · § 250 HGB, § 5 Abs. 5 EStG", icon: "📆", fach: "bsr", teil: 2 },
  // Ausbildung (FTA I): Buchführung und Bilanzwesen – eigene Themen; die übrigen Themen teilt BilBf mit Bilanzrecht Teil I (THEMEN_BBF)
  { id: "bbf-afa", titel: "AfA – Grundzüge", unter: "Lineare AfA, Anschaffungsjahr, Digital-AfA, Buchung · § 7 Abs. 1 EStG", icon: "📉", fach: "bbf" },
  { id: "bsr-entnahme-einlage", titel: "Entnahmen & Einlagen", unter: "Sach- und Nutzungsentnahmen, Pkw-Privatnutzung, Einlagen · § 4 Abs. 1, § 6 Abs. 1 Nr. 4, 5 EStG", icon: "🔄", fach: "bsr", teil: 2 },
  // Öffentliches Recht (Unterrichtsskript ÖR GS I – Kapitel 1 Staatsrecht und 2 Gesetzgebung)
  { id: "oer-staatsziele", titel: "Staat & Staatsformmerkmale", unter: "Drei-Elemente-Lehre, Verfassungsänderung, Ewigkeitsklausel · Art. 20, 79 GG", icon: "📜", fach: "oer" },
  { id: "oer-republik", titel: "Republik, Sozialstaat & Staatsziele", unter: "Art. 20 Abs. 1, Art. 20a GG", icon: "🏛️", fach: "oer" },
  { id: "oer-demokratie", titel: "Demokratie", unter: "Volkssouveränität, Legitimationskette, Mehrheitsprinzip · Art. 20 Abs. 2 GG", icon: "🗳️", fach: "oer" },
  { id: "oer-rechtsstaat", titel: "Rechtsstaat", unter: "Gewaltenteilung, Vorbehalt des Gesetzes, Rückwirkung, Verhältnismäßigkeit", icon: "⚖️", fach: "oer" },
  { id: "oer-bundesstaat", titel: "Bundesstaat", unter: "Kompetenzverteilung, Kollisionsregel, Bundeszwang · Art. 30, 31, 37 GG", icon: "🗺️", fach: "oer" },
  { id: "oer-parteien", titel: "Die Parteien", unter: "Parteibegriff, Parteienprivileg, Chancengleichheit · Art. 21 GG, PartG", icon: "🎗️", fach: "oer" },
  { id: "oer-bundestag", titel: "Bundestag, Abgeordnete & Fraktionen", unter: "Freies Mandat, Indemnität und Immunität, Kontrollrechte · Art. 38–48 GG", icon: "🏢", fach: "oer" },
  { id: "oer-wahl", titel: "Wahl zum Bundestag", unter: "Wahlgrundsätze, Wahlsystem, Sperrklausel · Art. 38 GG, BWahlG", icon: "✉️", fach: "oer" },
  { id: "oer-bundesrat", titel: "Bundesrat", unter: "Zusammensetzung, Stimmenverteilung, Beschlüsse · Art. 50–53 GG", icon: "🤝", fach: "oer" },
  { id: "oer-bundespraesident", titel: "Bundespräsident", unter: "Wahl, Prüfungsrecht, Gegenzeichnung · Art. 54–61, 82 GG", icon: "🎖️", fach: "oer" },
  { id: "oer-bundesregierung", titel: "Bundesregierung", unter: "Kanzlerwahl, Organisationsprinzipien, Misstrauensvotum · Art. 62–69 GG", icon: "👥", fach: "oer" },
  { id: "oer-bverfg", titel: "Verfassungsorgane & BVerfG", unter: "Organstreit, Normenkontrolle, Verfassungsbeschwerde · Art. 92–94, 100 GG", icon: "🏛", fach: "oer" },
  { id: "oer-gesetzgebung", titel: "Gesetzgebung", unter: "Gesetzgebungskompetenz, Verfahren, Einspruch und Zustimmung · Art. 70–82 GG", icon: "📝", fach: "oer" },
  { id: "oer-zusatz", titel: "Zusatzwissen", unter: "Hintergrund – nicht klausurrelevant", icon: "➕", fach: "oer", zusatz: true },
  // Einkommensteuer (Skripte und Folien GS I, Rechtsstand 2026)
  { id: "est-grundlagen", titel: "Einführung in die ESt", unter: "Einordnung, Rechtsgrundlagen, Erhebungsformen, Zuschlagsteuern", icon: "📘", fach: "est" },
  { id: "est-steuerpflicht", titel: "Persönliche Steuerpflicht", unter: "Unbeschränkte, erweiterte, fiktive und beschränkte Steuerpflicht · § 1 EStG, §§ 8, 9 AO", icon: "🧑", fach: "est" },
  { id: "est-einkuenfte", titel: "Einkunftsarten", unter: "Gewinn- und Überschusseinkünfte, Dualismus, nicht steuerbare Vorgänge · § 2 Abs. 1, 2 EStG", icon: "🧾", fach: "est" },
  { id: "est-zve", titel: "Zu versteuerndes Einkommen", unter: "Verlustausgleich, Sonderausgaben, außergewöhnliche Belastungen, Kinder · § 2 Abs. 3–5 EStG", icon: "Σ", fach: "est" },
  { id: "est-veranlagung", titel: "Veranlagung", unter: "Ehegattenwahlrecht, Zusammen- und Einzelveranlagung, Pflichtveranlagung · §§ 25, 26, 46 EStG", icon: "💍", fach: "est" },
  { id: "est-tarif", titel: "Tarif & festzusetzende ESt", unter: "Tarifzonen, Splittingverfahren, Progressionsvorbehalt, Anrechnung · §§ 32a, 32b, 36 EStG", icon: "📊", fach: "est" },
  { id: "est-einnahmen", titel: "Einnahmen & Steuerbefreiungen", unter: "Sachbezüge, Übungsleiter- und Ehrenamtspauschale, Versorgungsbezüge · §§ 3, 8, 19 Abs. 2 EStG", icon: "💶", fach: "est" },
  { id: "est-ausgaben", titel: "Nicht abziehbare Ausgaben", unter: "Kosten der Lebensführung, gemischte Aufwendungen, Berufskleidung · § 12 EStG", icon: "🚫", fach: "est" },
  { id: "est-zufluss", titel: "Zu- und Abfluss", unter: "Zufluss, Abfluss, regelmäßig wiederkehrende Zahlungen · § 11 EStG", icon: "📅", fach: "est" },
  { id: "est-werbungskosten", titel: "Werbungskosten", unter: "Begriff, Katalog, Pauschbeträge · §§ 9, 9a EStG", icon: "💼", fach: "est" },
  { id: "est-arbeitsmittel", titel: "Arbeitsmittel", unter: "Berufskleidung, gemischte Nutzung, Sofortabzug oder AfA · § 9 Abs. 1 S. 3 Nr. 6, 7 EStG", icon: "💻", fach: "est" },
  { id: "est-homeoffice", titel: "Arbeitszimmer & Home-Office", unter: "Häusliches Arbeitszimmer, Tagespauschale, Wahlrecht · § 4 Abs. 5 S. 1 Nr. 6b, 6c EStG", icon: "🏠", fach: "est" },
  { id: "est-entfernung", titel: "Entfernungspauschale", unter: "Erste Tätigkeitsstätte, Höchstbetrag, Abgeltungswirkung · § 9 Abs. 1 S. 3 Nr. 4, Abs. 2 EStG", icon: "🚗", fach: "est" },
  { id: "est-reisekosten", titel: "Reisekosten", unter: "Auswärtstätigkeit, Fahrtkosten, Verpflegung, Übernachtung · § 9 Abs. 1 S. 3 Nr. 4a, 5a, Abs. 4a EStG", icon: "🧳", fach: "est" },
  { id: "est-gewinn", titel: "Gewinnermittlung § 4 Abs. 3", unter: "Zu- und Abfluss, Anlagevermögen, Entnahmen, private Pkw-Nutzung · § 4 Abs. 3 EStG", icon: "🧮", fach: "est" },
  // Umsatzsteuer (Skript GS I, Klausurtechnik, Semesterklausuren; Rechtsstand 2026)
  { id: "ust-grundlagen", titel: "System & Unternehmer", unter: "System der Umsatzsteuer, Unternehmer, Rahmen des Unternehmens · §§ 1, 2 UStG", icon: "🏢", fach: "ust" },
  { id: "ust-leistung", titel: "Lieferung & sonstige Leistung", unter: "Lieferung, sonstige Leistung, Werklieferung, Nebenleistungen · § 3 Abs. 1, 4, 9 UStG", icon: "📦", fach: "ust" },
  { id: "ust-ort", titel: "Ort der Leistung", unter: "Bewegte und unbewegte Lieferung, B2B- und B2C-Grundregel, Grundstücke · §§ 3, 3a UStG", icon: "📍", fach: "ust" },
  { id: "ust-entgelt", titel: "Leistungsaustausch & Prüfschema", unter: "Leistungsaustausch, Tausch, Innenumsätze, Schadensersatz · § 1 Abs. 1 Nr. 1 UStG", icon: "🔁", fach: "ust" },
  { id: "ust-befreiung", titel: "Steuerbefreiungen & Option", unter: "Vermietung, Heilbehandlung, Option zur Steuerpflicht · §§ 4, 9 UStG", icon: "🏠", fach: "ust" },
  { id: "ust-bmg", titel: "Bemessungsgrundlage & Steuersatz", unter: "Entgelt, durchlaufende Posten, Mindestbemessungsgrundlage, ermäßigter Satz · §§ 10, 12 UStG", icon: "％", fach: "ust" },
  { id: "ust-entstehung", titel: "Entstehung & Änderung", unter: "Soll- und Istversteuerung, Anzahlungen, Änderung der Bemessungsgrundlage · §§ 13, 17 UStG", icon: "📅", fach: "ust" },
  { id: "ust-vorsteuer", titel: "Vorsteuer & Rechnungen", unter: "Rechnungsangaben, Kleinbetragsrechnung, Vorsteuerabzug, Zuordnung · §§ 14, 14c, 15 UStG", icon: "🧾", fach: "ust" },
  { id: "ust-wertabgabe", titel: "Unentgeltliche Wertabgaben", unter: "Entnahme, Zuwendungen, private Verwendung, Bemessungsgrundlage · § 3 Abs. 1b, 9a UStG", icon: "🎁", fach: "ust" },
  { id: "ust-sonder", titel: "Sonderfälle & Kleinunternehmer", unter: "Kleinunternehmer, Reverse Charge, Kommission, Reihengeschäft · §§ 3, 13b, 19 UStG", icon: "🧩", fach: "ust" },
  // Abgabenordnung (Skript GS I Modul 1 und Unterricht; Rechtsstand 2026)
  { id: "ao-grundlagen", titel: "Grundlagen & Steuerbegriff", unter: "Anwendungsbereich, Steuerbegriff, Einteilung, Nebenleistungen · §§ 1, 3 AO", icon: "📘", fach: "ao" },
  { id: "ao-steuergeheimnis", titel: "Steuergeheimnis", unter: "Amtsträger, geschützte Daten, Offenbarungsbefugnisse · §§ 7, 30 AO", icon: "🤫", fach: "ao" },
  { id: "ao-beteiligte", titel: "Beteiligte & Vertreter", unter: "Beteiligte, Handlungsfähigkeit, Bevollmächtigte, Gesamtschuldner · §§ 33–36, 44, 78–80 AO", icon: "👥", fach: "ao" },
  { id: "ao-ermittlung", titel: "Ermittlungsverfahren", unter: "Untersuchungsgrundsatz, Mitwirkungspflichten, Auskunftsverweigerung · §§ 85, 88, 90–104 AO", icon: "🔎", fach: "ao" },
  { id: "ao-erklaerung", titel: "Steuererklärung & Verspätungszuschlag", unter: "Erklärungspflicht, Fristen, Berichtigung, Verspätungszuschlag · §§ 149–153 AO", icon: "📝", fach: "ao" },
  { id: "ao-zwang", titel: "Zwangsgeld & Schätzung", unter: "Zwangsmittel, Androhung, Zwangsgeld, Schätzung · §§ 162, 328–335 AO", icon: "⚖️", fach: "ao" },
  { id: "ao-va", titel: "Verwaltungsakt & Steuerbescheid", unter: "Begriff, Form und Begründung, Steuerbescheid, Nebenbestimmungen · §§ 118–121, 155, 157 AO", icon: "📄", fach: "ao" },
  { id: "ao-wirksamkeit", titel: "Wirksamkeit & Nichtigkeit", unter: "Wirksamkeit, Nichtigkeit, Heilung, Unbeachtlichkeit · §§ 124–127 AO", icon: "🧪", fach: "ao" },
  { id: "ao-bekanntgabe", titel: "Bekanntgabe", unter: "Bekanntgabeadressat, Ehegatten und Erben, Zeitpunkt, Zustellung · §§ 122, 122a, 183 AO", icon: "📬", fach: "ao" },
  { id: "ao-vorbehalt", titel: "Vorbehalt, Vorläufigkeit, Anmeldung", unter: "Vorbehalt der Nachprüfung, Vorläufigkeit, Steueranmeldung · §§ 164, 165, 167, 168 AO", icon: "⏳", fach: "ao" },
  { id: "ao-feststellung", titel: "Gesonderte Feststellung", unter: "Feststellungsfälle, Verfahren, Grundlagen- und Folgebescheid · §§ 179–182 AO", icon: "🧩", fach: "ao" },
  { id: "ao-zustaendigkeit", titel: "Örtliche Zuständigkeit", unter: "Wohnsitz-, Betriebs- und Geschäftsleitungsfinanzamt, Großstadtregelung · §§ 17–29 AO", icon: "🗺️", fach: "ao" },
  { id: "ao-fristen", titel: "Fristen & Wiedereinsetzung", unter: "Fristberechnung, Ereignisfrist, Wiedereinsetzung · §§ 108–110 AO, §§ 187, 188 BGB", icon: "📅", fach: "ao" },
  { id: "ao-erhebung", titel: "Entstehung, Fälligkeit, Säumnis", unter: "Entstehung, Fälligkeit, Säumniszuschlag, Schonfrist · §§ 38, 218, 220, 240 AO", icon: "💶", fach: "ao" },
  // Privatrecht (GS I, Kapitel 1–12 der Lernlandkarte bis zur Klausur)
  { id: "pr-grundlagen", titel: "Privatrecht im Rechtssystem", unter: "Abgrenzung zum öffentlichen Recht, Aufbau des BGB, Bezug zum Steuerrecht", icon: "🏛️", fach: "pr" },
  { id: "pr-anspruch", titel: "Anspruchsaufbau & Gutachtenstil", unter: "Anspruchsgrundlage, Prüfungsreihenfolge, Einwendungen und Einreden, Gutachtenstil", icon: "🧭", fach: "pr" },
  { id: "pr-privatautonomie", titel: "Privatautonomie & Grenzen", unter: "Vertragsfreiheit, Abschluss-, Inhalts- und Formfreiheit, Grenzen · §§ 125, 134, 138 BGB", icon: "🗽", fach: "pr" },
  { id: "pr-rechtssubjekte", titel: "Rechtssubjekte", unter: "Natürliche und juristische Personen, Personengesellschaften · §§ 1, 21 ff., 705 BGB", icon: "👤", fach: "pr" },
  { id: "pr-rechtsobjekte", titel: "Rechtsobjekte", unter: "Sachen, wesentliche Bestandteile, Zubehör, Tiere · §§ 90–97 BGB", icon: "📦", fach: "pr" },
  { id: "pr-geschaeftsfaehigkeit", titel: "Geschäfts- und Deliktsfähigkeit", unter: "Minderjährige, Taschengeldparagraf, Deliktsfähigkeit · §§ 104–113, 827–829 BGB", icon: "🧒", fach: "pr" },
  { id: "pr-willenserklaerung", titel: "Willenserklärung", unter: "Tatbestand, Abgabe und Zugang, Auslegung, Schweigen · §§ 130, 133, 157 BGB", icon: "💬", fach: "pr" },
  { id: "pr-rechtsgeschaefte", titel: "Rechtsgeschäfte, Form, Nichtigkeit", unter: "Trennungs- und Abstraktionsprinzip, Form, Nichtigkeit · §§ 116 ff., 125 ff. BGB", icon: "🧾", fach: "pr" },
  { id: "pr-vertragsschluss", titel: "Vertragsschluss", unter: "Angebot, Annahme, verspätete Annahme, Versteigerung · §§ 145–157 BGB", icon: "🤝", fach: "pr" },
  { id: "pr-anfechtung", titel: "Anfechtung", unter: "Inhalts-, Erklärungs- und Eigenschaftsirrtum, Frist, Folgen · §§ 119–124, 142 BGB", icon: "↩️", fach: "pr" },
  { id: "pr-stellvertretung", titel: "Stellvertretung", unter: "Bote oder Vertreter, Vollmacht, Vertreter ohne Vertretungsmacht, Prokura · §§ 164–181 BGB", icon: "🧑‍💼", fach: "pr" },
  { id: "pr-schuldverhaeltnis", titel: "Schuldverhältnis – Grundlagen", unter: "Entstehung, Leistungspflichten, Gesamtschuld, Erlöschen · § 241 BGB", icon: "🔗", fach: "pr" },
  { id: "pr-gesetzlich", titel: "Delikt, Bereicherung, Herausgabe", unter: "Unerlaubte Handlung, ungerechtfertigte Bereicherung, Herausgabe · §§ 823, 812, 985 BGB", icon: "🚲", fach: "pr" },
  { id: "pr-verjaehrung", titel: "Verjährung", unter: "Regelmäßige Verjährung, Hemmung, Neubeginn · §§ 194–218 BGB", icon: "⌛", fach: "pr" },
  { id: "pr-kauf", titel: "Kaufvertrag & Mängelrechte", unter: "Pflichten, Sachmangel, Gefahrübergang, Mängelrechte · §§ 433–479 BGB", icon: "🛒", fach: "pr" },
  { id: "pr-sachenrecht", titel: "Sachenrecht", unter: "Besitz, Eigentumserwerb, gutgläubiger Erwerb, Grundstücke · §§ 854, 873, 925, 929 ff. BGB", icon: "🏠", fach: "pr" },
];
export const THEMA = Object.fromEntries(THEMEN.map((t) => [t.id, t]));

export const FAECHER = {
  bsr: { id: "bsr", titel: "Bilanzsteuerrecht", kurz: "BSR" },
  bbf: { id: "bbf", titel: "Bilanz und Buchführung", kurz: "BilBf" },
  oer: { id: "oer", titel: "Öffentliches Recht", kurz: "ÖR" },
  est: { id: "est", titel: "Einkommensteuer", kurz: "ESt" },
  ust: { id: "ust", titel: "Umsatzsteuer", kurz: "USt" },
  ao: { id: "ao", titel: "Abgabenordnung", kurz: "AO" },
  pr: { id: "pr", titel: "Privatrecht", kurz: "PrivR" },
};
/**
 * BilBf (Ausbildung FTA I) nutzt die Buchführungsthemen aus Bilanzrecht Teil I mit – in der Reihenfolge des Lehrplans,
 * teils mit angepasstem Titel. Aufgaben, die über den Lehrplan hinausgehen, blendet NICHT_IN aus.
 */
const THEMEN_BBF = [
  ["buchfuehrungspflicht", { unter: "§§ 238, 241a HGB, §§ 140, 141 AO · Beginn und Ende" }],
  ["buecher", { unter: "Grundbuch, Hauptbuch, Belege, Kassenbericht" }],
  ["grundbegriffe", { unter: "Auszahlung, Ausgabe, Aufwand" }],
  ["inventurBilanz", { unter: "§§ 240, 241, 242, 247, 257 HGB · Inventurarten" }],
  ["bilanzveraenderungen", { titel: "Bilanzveränderungen", unter: "BV-Umschichtung und BV-Änderung" }],
  ["bestandskonten"], ["erfolgskonten"],
  ["privatkonten", { unter: "Entnahmen und Einlagen von Geld" }],
  ["umsatzsteuer", { unter: "Umsatzsteuer, Vorsteuer, Abschluss (Grundfälle)" }],
  ["warenkonten"], ["bbf-afa"], ["abschluss"],
  ["gewinnermittlung", { titel: "Betriebsvermögensvergleich", unter: "§ 4 I 1 EStG · Gewinnbegriff" }],
];
export const themenFuer = (fach) => fach === "bbf"
  ? THEMEN_BBF.map(([id, anders]) => ({ ...THEMA[id], ...(anders || {}) }))
  : THEMEN.filter((t) => t.fach === fach);
/** Gehört das Thema (auch) zu diesem Modul? */
export const themaIn = (themaId, fach) => THEMA[themaId]?.fach === fach || (fach === "bbf" && THEMEN_BBF.some(([id]) => id === themaId));
/** Aufgaben gemeinsamer Themen, die über den Lehrplan des Moduls hinausgehen (FTA I: z. B. Skonto, Kostenrechnung, RAP). */
export const NICHT_IN = {
  bbf: new Set([
    "bf-av-verkauf", "ib-aufstellung", "ib-rap", "ib-zinsschuld", "ib-sonstige-ford",
    "gb-zusatzkosten", "gb-neutral", "gb-anderskosten",
    "pk-warenentnahme",
    "us-17", "us-maengel-rueck", "us-skonto-einzelhaendler", "us-skonto-grosshaendler", "us-skonto-r", "us-zahllastkonto",
    "ge-regeln", "ge-methoden", "ge-5-1", "ko-korrektur-kuli", "ko-korrektur-provision", "ko-korrektur-verkauf", "ge-scott",
  ]),
};
/** Vorlage (Aufgabe) gehört zum Modul: Thema passt und sie ist dort nicht ausgeblendet. */
export const vorlageIn = (v, fach) => themaIn(v.thema, fach) && !NICHT_IN[fach]?.has(v.id);
/** Themen für Klausur und gemischte Übungen – ohne „Zusatzwissen“. */
export const pruefungsThemen = (fach) => themenFuer(fach).filter((t) => !t.zusatz);
/** Bilanzrecht ist in Teil I (Buchführung) und Teil II (Bilanzierung und Bewertung) geteilt; teil = "1", "2" oder "beide". */
export const imTeil = (thema, teil = "beide") => teil === "beide" || !thema.teil || String(thema.teil) === String(teil);

// ---------- Zufall (mulberry32, reproduzierbar) ----------
/** Zieht Elemente reihum aus einem gemischten Stapel: jedes kommt dran, bevor sich eines wiederholt (Fallgeneratoren). */
export function reihum(liste) {
  let stapel = [];
  return (r) => {
    if (gleichbleibend) return liste[r.zahl(0, liste.length - 1)]; // Duell: nur vom Startwert abhängig
    if (!stapel.length) stapel = r.mischen(liste.map((_, i) => i));
    return liste[stapel.pop()];
  };
}
let gleichbleibend = false;
/** fn so ausführen, dass erzeugte Aufgaben nur vom Zufallsstartwert abhängen (gleiche Aufgaben auf allen Geräten). */
export function gleichbleibendErzeugen(fn) {
  gleichbleibend = true;
  try { return fn(); } finally { gleichbleibend = false; }
}

export class Zufall {
  constructor(seed) {
    this.s = (seed ?? Math.floor(Math.random() * 2 ** 32)) >>> 0;
  }
  next() {
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  zahl(von, bis) {
    return von + Math.floor(this.next() * (bis - von + 1));
  }
  /** Glatter Betrag in Cent: betrag(500, 20000, 100) = 500…20.000 € im 100-€-Raster */
  betrag(von, bis, raster = 100) {
    return this.zahl(Math.floor(von / raster), Math.floor(bis / raster)) * raster * 100;
  }
  wahl(a) {
    return a[Math.floor(this.next() * a.length)];
  }
  muenze() {
    return this.next() < 0.5;
  }
  mischen(a) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }
}

// ---------- Buchungssatz ----------
/** satz([["wareneingang", c], ["vorsteuer", c]], [["verbindlichkeitenLuL", c]]) */
export function satz(soll, haben) {
  for (const [k] of [...soll, ...haben]) K(k);
  return { soll, haben };
}
export const einfach = (s, h, c) => satz([[s, c]], [[h, c]]);

export const summe = (posten) => posten.reduce((a, [, c]) => a + c, 0);

export function satzText(s) {
  const f = (p) => p.map(([k, c]) => `${K(k).kurz} ${G.text(c)}`).join(" / ");
  return `${f(s.soll)} an ${f(s.haben)}`;
}

function normalisiert(s) {
  const m = new Map();
  for (const [k, c] of s.soll) m.set("soll|" + k, (m.get("soll|" + k) || 0) + c);
  for (const [k, c] of s.haben) m.set("haben|" + k, (m.get("haben|" + k) || 0) + c);
  return m;
}

/**
 * zeilen: [{id, seite: "soll"|"haben", konto: id|null, betrag: "1.190,00"}]
 * Ergebnis: {korrekt, status: {zeilenId: "richtig"|"betrag"|"konto"|"unvollstaendig"}, erwartet: {zeilenId: cent}, fehlend: [[seite,konto,cent]], loesung}
 */
export function pruefeBuchung(zeilen, loesungen) {
  const ergebnisse = loesungen.map((l) => pruefeEine(zeilen, l));
  const richtig = ergebnisse.find((e) => e.korrekt);
  if (richtig) return richtig;
  const fehler = (e) => Object.values(e.status).filter((s) => s !== "richtig").length + e.fehlend.length;
  return ergebnisse.reduce((a, b) => (fehler(b) < fehler(a) ? b : a));
}

function pruefeEine(zeilen, loesung) {
  const soll = normalisiert(loesung);
  const summen = new Map();
  const unvollstaendig = new Set();
  for (const z of zeilen) {
    const c = G.lesen(z.betrag);
    if (!z.konto || c == null) {
      if (z.konto || (z.betrag && z.betrag.trim())) unvollstaendig.add(z.id);
      continue;
    }
    const key = z.seite + "|" + z.konto;
    summen.set(key, (summen.get(key) || 0) + c);
  }
  const status = {};
  const erwartet = {};
  for (const z of zeilen) {
    if (unvollstaendig.has(z.id)) { status[z.id] = "unvollstaendig"; continue; }
    if (!z.konto) continue;
    const key = z.seite + "|" + z.konto;
    if (soll.has(key)) {
      status[z.id] = summen.get(key) === soll.get(key) ? "richtig" : "betrag";
      erwartet[z.id] = soll.get(key);
    } else {
      status[z.id] = "konto";
    }
  }
  const fehlend = [...soll.entries()]
    .filter(([key]) => !summen.has(key))
    .map(([key, c]) => [...key.split("|"), c]);
  const werte = Object.values(status);
  return { korrekt: werte.length > 0 && werte.every((s) => s === "richtig") && fehlend.length === 0, status, erwartet, fehlend, loesung };
}

// ---------- Fragen ----------
export function leereAntwort(frage) {
  if (frage.typ === "buchung") return { zeilen: [neueZeile("soll"), neueZeile("haben")] };
  if (frage.typ === "auswahl") return { gewaehlt: [] };
  return { text: "" };
}

/** Offene Fragen: automatisch geprüft (Norm + Stichworte) oder selbst bewertet – korrekt = true/false, null = noch nicht bewertet. */
export const istOffen = (frage) => frage.typ === "offen";

let zeilenZaehler = 0;
export function neueZeile(seite) {
  return { id: "z" + ++zeilenZaehler, seite, konto: null, betrag: "" };
}

export function istLeer(frage, antwort) {
  if (frage.typ === "buchung") return antwort.zeilen.every((z) => !z.konto && !z.betrag.trim());
  if (frage.typ === "auswahl") return antwort.gewaehlt.length === 0;
  if (frage.typ === "offen") return false;
  return !antwort.text.trim();
}

export function bewerte(frage, antwort) {
  if (frage.typ === "buchung") {
    const b = pruefeBuchung(antwort.zeilen || [], frage.loesungen);
    return { korrekt: b.korrekt, buchung: b, denkfehler: b.korrekt ? [] : diagnose(antwort.zeilen || [], b.loesung) };
  }
  if (frage.typ === "auswahl") {
    const g = [...(antwort.gewaehlt || [])].sort();
    const r = [...frage.richtig].sort();
    return { korrekt: g.length === r.length && g.every((v, i) => v === r[i]) };
  }
  if (frage.typ === "offen") {
    const p = pruefeOffen(frage, antwort.text);
    return p ? { korrekt: p.korrekt, offen: true, auto: p } : { korrekt: null, offen: true };
  }
  const wert = G.lesen(antwort.text);
  if (wert == null) return { korrekt: false, lesbar: false };
  return { korrekt: Math.abs(wert - frage.loesung) <= frage.toleranz, lesbar: true };
}

export function loesungText(frage) {
  if (frage.ganz) return String(frage.loesung / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + frage.einheit;
  return frage.einheit === "%" ? G.prozentText(frage.loesung) : G.text(frage.loesung) + " " + frage.einheit;
}

export function typBezeichnung(frage) {
  if (frage.typ === "buchung") return "Buchungssatz";
  if (frage.typ === "auswahl") return frage.richtig.length > 1 ? "Mehrfachauswahl" : "Auswahl";
  if (frage.typ === "offen") return frage.fall ? "Klausurfall" : "Frage – Antwort";
  return "Berechnung";
}

// Fabriken für Fragen
export function buchung(id, thema, text, loesung, erklaerung, { alternativen = [], quelle = null } = {}) {
  return { id, thema, typ: "buchung", text, loesungen: [loesung, ...alternativen], erklaerung, quelle };
}
export function zahl(id, thema, text, loesung, erklaerung, { einheit = "€", toleranz = 1, quelle = null, ganz = false } = {}) {
  return { id, thema, typ: "zahl", text, loesung, einheit, toleranz, erklaerung, quelle, ganz };
}
export function auswahl(id, thema, text, optionen, richtig, erklaerung, r, { quelle = null } = {}) {
  const reihenfolge = r.mischen(optionen.map((_, i) => i));
  return {
    id, thema, typ: "auswahl", text,
    optionen: reihenfolge.map((i) => optionen[i]),
    richtig: reihenfolge.map((i, neu) => (richtig.includes(i) ? neu : -1)).filter((i) => i >= 0),
    erklaerung, quelle,
  };
}
