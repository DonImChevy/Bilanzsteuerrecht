"""Erzeugt web/js/bilr/normen.js (Gesetzestexte für Bilanzrecht) aus Gesetzes-PDFs (Text via pdftotext).

Aufruf (beliebige Teilmenge der Gesetze):
  pdftotext UStG.pdf UStG.raw
  python3 -I tools/bilr_normen.py web/js/bilr/normen.js UStG=UStG.raw HGB=HGB.raw AO=AO.raw EStG=EStG.raw
  python3 -I tools/bilr_normen.py --est web/js/est/normen.js EStG=EStG.raw AO=AO.raw LStDV=LStDV.raw
  python3 -I tools/bilr_normen.py --ao web/js/ao/normen.js AO=AO.raw BGB=BGB.raw VwZG=VwZG.raw
  python3 -I tools/bilr_normen.py --pr web/js/pr/normen.js BGB=BGB.raw HGB=HGB.raw GmbHG=GmbHG.raw AO=AO.raw

Lange Paragrafen werden als Auszug übernommen: nur die Absätze bzw. Nummern, die in den Aufgaben vorkommen.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from normen_extrahieren import absaetze, bereinigen  # noqa: E402

# Paragraf → None (ganz) oder Liste von Absätzen; "2|1,11" = Abs. 2 nur mit Einleitung und Nr. 1 und 11,
# "|9,12" = Paragraf ohne Absätze, nur Einleitung und Nr. 9 und 12
AUSWAHL = {
    "HGB": {"1": None, "2": None, "3": None, "6": None, "238": None, "239": None, "240": None, "241a": None,
            "242": None, "243": None, "245": None, "246": ["1"], "247": None, "250": None, "252": ["1"],
            "253": ["1", "3", "4", "5"], "255": ["1", "2"], "256a": None, "257": None, "264": ["1"],
            "268": ["5"], "277": ["1"], "241": None, "249": ["1"]},
    "AO": {"39": None, "140": None, "141": None, "146": ["1"], "147": ["1", "3"]},
    "EStG": {"4": ["1", "3"], "5": ["1", "5"], "6": ["1|1,2,3,4,5", "2", "2a"], "7": ["1", "4"], "9b": ["1"],
             "12": None, "13a": ["1"], "18": ["1"], "4a": ["1"]},
    "UStG": {"1": ["1"], "3": ["1", "1b", "9"], "4": [""], "9": ["1"], "10": ["1", "4"],
             "12": ["1", "2|1,11"], "15": ["1"], "17": ["1", "2"], "19": ["1"]},
}
# Einkommensteuer (Aufruf mit --est als erstem Argument → web/js/est/normen.js, Export NORMEN_EST)
AUSWAHL_EST = {
    "EStG": {"1": ["1", "2", "3", "4"], "2": None, "3": ["|15,16,26,26a,51,62"], "3c": ["1"], "4": ["1", "3", "4", "5|6,6b,6c"],
             "6": ["1|4", "2"], "7": ["1"], "8": ["1", "2", "3"], "9": ["1", "2", "4", "4a", "5"], "9a": None, "11": None, "12": None,
             "25": ["1", "3"], "26": None, "26a": ["1"], "26b": None, "32a": ["1", "5", "6"], "36": ["1", "2", "4"],
             "46": ["2", "4"], "15": ["1", "2"], "19": ["1", "2"], "20": ["1|7"], "21": ["1", "3"], "23": ["1|1", "3"],
             "24b": ["1", "2"], "31": None, "33": ["1", "2"], "37": ["1"], "38": ["1"], "38a": ["1"], "43": ["5"], "49": ["1|4"],
             "10": ["1|2,3,4"], "10c": None, "32b": ["1"], "33b": ["1"], "43a": ["1"],
             "10b": ["1"], "24a": None, "32": ["1", "3", "4", "6"], "22": None},
    "AO": {"8": None, "9": None, "149": ["2"], "169": ["2"]},
    "LStDV": {"1": None, "2": None},
}
# Umsatzsteuer (Aufruf mit --ust → web/js/ust/normen.js, Export NORMEN_UST)
AUSWAHL_UST = {
    "UStG": {"1": ["1", "2"], "2": ["1", "2"], "3": ["1", "1b", "3", "4", "6", "6a", "7", "9", "9a", "12"], "3a": ["1", "2", "3", "4"],
             "4": [""], "9": ["1", "2"], "10": ["1", "2", "4", "5"], "12": ["1", "2|1,11,15"], "13": ["1"], "13a": ["1"],
             "14": ["1", "2", "4"], "14c": None, "15": ["1", "1a", "2", "3", "4"], "17": ["1", "2"], "19": ["1", "2", "3"],
             "3b": ["1"], "13b": ["2", "5"], "16": ["1"], "18": ["1", "2"], "20": None, "25a": ["1", "3"], "14a": ["1"]},
}
# Abgabenordnung (Aufruf mit --ao → web/js/ao/normen.js, Export NORMEN_AO)
AUSWAHL_AO = {
    "AO": {"1": ["1"], "3": None, "7": None, "8": None, "9": None, "10": None, "11": None, "12": None, "15": None,
           "17": None, "18": ["1"], "19": ["1", "3", "4"], "20": ["1"], "21": ["1"], "22": ["1"], "24": None, "25": None,
           "26": None, "28": ["1"], "29": None, "30": ["1", "2", "3", "4", "5"], "31": ["1"], "31a": ["1"], "31b": ["1"], "33": None, "34": None, "35": None,
           "37": ["1"], "38": None, "45": ["1"], "78": None, "79": ["1"], "80": ["1", "2", "4", "5", "6"], "82": ["1"],
           "85": None, "86": None, "88": ["1", "2"], "90": ["1"], "91": None, "92": None, "93": ["1", "2"], "97": ["1"],
           "101": ["1"], "102": ["1"], "103": None, "104": ["1", "2"], "108": None, "109": ["1", "2"], "110": None,
           "118": None, "119": None, "120": None, "121": None, "122": ["1", "2", "5", "6", "7"], "122a": ["1", "4"],
           "124": None, "125": None, "126": ["1", "2", "3"], "127": None, "149": ["1", "2", "3", "4"],
           "150": ["1", "2", "3", "4", "7"], "152": None, "153": ["1"], "155": ["1", "3"], "157": None, "162": ["1"],
           "164": None, "165": ["1", "2", "3"], "168": None, "171": ["10"], "175": ["1"], "179": None, "180": ["1", "3"],
           "181": ["1", "2"], "182": ["1"], "183": ["1"], "183a": ["1"], "218": ["1"], "220": None, "240": ["1", "3"],
           "328": None, "329": None, "332": None, "333": None, "334": ["1"], "335": None, "347": ["1"], "351": ["2"], "355": ["1"],
           "36": None, "44": ["1", "2"], "98": ["1"], "167": ["1"],
           "5": None, "6": ["1", "2"], "29c": ["1"], "249": ["1"], "356": None, "393": ["1"]},
    "BGB": {"112": None, "113": ["1"], "187": None, "188": None, "193": None, "1922": ["1"], "839": ["1"]},
    "VwZG": {"2": None, "8": None},
}
# Privatrecht (Aufruf mit --pr → web/js/pr/normen.js, Export NORMEN_PR): alle im Modul zitierten Paragrafen
AUSWAHL_PR = {
    "BGB": {"1": None, "2": None, "13": None, "14": None, "21": None, "22": None, "24": None, "26": None, "31": None, 
            "53": None, "54": None, "56": None, "80": None, "90": None, "90a": None, "91": None, "92": None, "93": None, 
            "94": None, "95": None, "97": None, "98": None, "104": None, "105": None, "105a": None, "106": None, 
            "107": None, "108": None, "109": None, "110": None, "111": None, "112": None, "113": None, "116": None, 
            "117": None, "118": None, "119": None, "120": None, "121": None, "122": None, "123": None, "124": None, 
            "125": None, "126": None, "126a": None, "126b": None, "128": None, "129": None, "130": None, "131": None, 
            "133": None, "134": None, "138": None, "139": None, "142": None, "143": None, "144": None, "145": None, 
            "146": None, "147": None, "148": None, "150": None, "151": None, "153": None, "154": None, "155": None, 
            "156": None, "157": None, "158": None, "164": None, "165": None, "166": None, "167": None, "170": None, 
            "172": None, "177": None, "178": None, "179": None, "180": None, "181": None, "184": None, "187": None, 
            "194": None, "195": None, "196": None, "197": None, "199": None, "201": None, "203": None, "204": None, 
            "205": None, "207": None, "209": None, "212": None, "214": None, "227": None, "228": None, "241": None, 
            "241a": None, "242": None, "243": None, "249": None, "251": None, "252": None, "253": None, "254": None, 
            "269": None, "270": None, "271": None, "273": None, "274": None, "275": None, "276": None, "280": None, 
            "281": None, "283": None, "284": None, "305": None, "311": None, "311b": None, "311c": None, "314": None, 
            "320": None, "322": None, "323": None, "326": None, "331": None, "346": None, "355": None, "362": None, 
            "364": None, "372": None, "387": None, "388": None, "389": None, "397": None, "398": None, "399": None, 
            "404": None, "407": None, "414": None, "415": None, "421": None, "426": None, "433": None, "434": None, 
            "435": None, "437": None, "438": None, "439": None, "440": None, "441": None, "442": None, "444": None, 
            "446": None, "447": None, "449": None, "474": None, "475": None, "476": None, "477": None, "480": None, 
            "488": None, "518": None, "535": None, "542": None, "581": None, "598": None, "611": None, "611a": None, 
            "620": None, "621": None, "622": None, "626": None, "631": None, "677": None, "705": None, "721": None, 
            "740": None, "741": None, "747": None, "765": None, "766": None, "771": None, "812": None, "816": None, 
            "818": None, "823": None, "826": None, "827": None, "828": None, "829": None, "831": None, "832": None, 
            "840": None, "844": None, "854": None, "855": None, "857": None, "868": None, "872": None, "873": None, 
            "892": None, "903": None, "904": None, "925": None, "926": None, "929": None, "930": None, "931": None, 
            "932": None, "935": None, "985": None, "986": None, "987": None, "1629": None, "1923": None, "1937": None, 
            "2058": None, "2064": None, "2247": None},
    "HGB": {"1": None, "15": None, "48": None, "49": None, "50": None, "52": None, "53": None, "54": None, "56": None, 
            "105": None, "126": None, "161": None, "171": None, "350": None, "362": None, "377": None},
    "GmbHG": {"2": None, "5": None, "6": None, "7": None, "11": None, "13": None, "15": None, "35": None, "60": None},
    "AO": {"39": None, "40": None, "41": None, "44": None, "47": None, "93": None, "226": None, "228": None, "232": None},
}
# Bewertungsrecht und Erbschaftsteuer (Aufruf mit --bew → web/js/bewr/normen.js, Export NORMEN_BEW)
AUSWAHL_BEW = {
    "ErbStG": {"1": None, "2": None, "3": ["1"], "7": ["1"], "9": ["1"], "14": ["1"], "10": ["1", "5", "6", "6a", "6b", "8"], "11": None,
               "12": ["1", "2", "3", "7"], "13": ["1|1,4a,4b,4c,10,14", "2"], "13a": ["1", "2", "10"], "13b": ["1", "2", "4", "6", "7"],
               "13d": None, "15": ["1"], "16": ["1", "2"], "17": ["1", "2"], "19": None, "20": ["1"], "22": None},
    "BewG": {"1": None, "2": None, "9": None, "10": None, "11": ["1", "2"], "12": ["1"], "31": None, "121": None,
             "151": ["1"], "157": ["1", "3"], "176": None, "177": None, "178": None, "179": None, "180": None, "181": None,
             "182": None, "183": None, "184": None, "185": None, "186": None, "187": None, "188": None, "198": None},
}
# Paragrafen ohne amtliche Überschrift: Titel des Abschnitts
TITEL = {("EStG", "20"): "Einkünfte aus Kapitalvermögen", ("EStG", "10"): "Sonderausgaben", ("EStG", "3"): "Steuerfreie Einnahmen", ("EStG", "11"): "Vereinnahmung und Verausgabung",
         ("EStG", "12"): "Nicht abzugsfähige Ausgaben", ("EStG", "9b"): "Umsatzsteuerrechtlicher Vorsteuerabzug",
         # HGB-Paragrafen ohne amtliche Überschrift (Privatrecht): Titel nach dem Inhalt
         ("HGB", "1"): "Istkaufmann", ("HGB", "15"): "Publizität des Handelsregisters", ("HGB", "48"): "Erteilung der Prokura",
         ("HGB", "49"): "Umfang der Prokura", ("HGB", "50"): "Beschränkung der Prokura", ("HGB", "52"): "Widerruf der Prokura",
         ("HGB", "53"): "Anmeldung der Prokura", ("HGB", "54"): "Handlungsvollmacht", ("HGB", "56"): "Angestellte in Läden",
         ("HGB", "161"): "Kommanditgesellschaft", ("HGB", "171"): "Haftung des Kommanditisten", ("HGB", "350"): "Formfreiheit der Bürgschaft",
         ("HGB", "362"): "Schweigen auf Anträge", ("HGB", "377"): "Untersuchungs- und Rügeobliegenheit"}
# Im PDF über einen Seitenumbruch verschobene Textteile (gehören zu § 3 Nr. 13 EStG)
# § 3a Abs. 3 UStG: Im PDF stehen die Nummern 1/2 und 3a/4 vertauscht vor dem Text – Nummern wieder an die richtige Stelle setzen
TEXT_KORREKTUR = {("UStG", "3a"): [(r"\n1\. 2\. Eine sonstige", "\n1. Eine sonstige"),
                                    (r" (Die kurzfristige Vermietung eines Beförderungsmittels)", r"\n2. \1"),
                                    (r"\n4\. a\) die Abgabe von Speisen", "\na) die Abgabe von Speisen"),
                                    (r" (Eine Vermittlungsleistung an einen Empfänger)", r"\n4. \1")],
                  ("UStG", "12"): [(r" -+\*\).*?(?=\n…)", "")],
                  # Überschrift des folgenden Unterabschnitts hängt am letzten Absatz
                  ("AO", "110"): [(r" \d\. Unterabschnitt .*$", "")], ("AO", "335"): [(r" \d\. Unterabschnitt .*$", "")],
                  ("AO", "92"): [(r" II\. Beweis durch .*$", "")],
                  # § 30 Abs. 4: Im PDF steht „5.“ vor Buchst. a von Nr. 4 statt vor dem Text von Nr. 5
                  ("AO", "30"): [(r"die Kenntnisse\n5\. a\) in einem", "die Kenntnisse\na) in einem"),
                                 (r"erlangt worden sind, für sie ein zwingendes", "erlangt worden sind,\n5. für sie ein zwingendes")],
                  # § 180 Abs. 1: Nummern 1 und 2 stehen im PDF vor dem Text von Nr. 1
                  ("AO", "180"): [(r"\n1\. 2\. (die Grundsteuerwerte[^\n]*)\na\)", r"\n1. \1\n2. a)")],
                  # Überschrift über zwei Zeilen: zweite Zeile steht am Anfang des Textes
                  ("AO", "103"): [(r"^Ordnungswidrigkeit ", "")],
                  ("BGB", "193"): [(r" Abschnitt 5 Verjährung.*$", ""), (r"Erklärungsoder", "Erklärungs- oder")],
                  # § 9 Abs. 1 EStG: Fortsetzung von Nr. 1 steht im PDF in der Spalte hinter Nr. 4; „Satz 8.“ in Abs. 4a nicht als Nummer lesen
                  ("EStG", "9"): [(r"(Lasten, soweit)(\n2\. .*?im Sinne) (sie mit einer Einkunftsart .*?bb ergibt;) (des Absatzes 4\.)", r"\1 \3\2 \4"),
                                  (r"Kürzungsbetrag nach Satz\n8\. ", "Kürzungsbetrag nach Satz 8. ")],
                  ("EStG", "3"): [(r"Trennungsgelder\. Die als Reisekostenvergütungen .*?abziehbaren Aufwendungen nicht übersteigen; ", "")]}
# Überschriften, die im PDF umbrochen oder verstümmelt sind
TITEL_KORREKTUR = {("AO", "103"): "Auskunftsverweigerungsrecht bei Gefahr der Verfolgung wegen einer Straftat oder einer Ordnungswidrigkeit",
                   ("AO", "20"): "Steuern vom Einkommen und Vermögen der Körperschaften, Personenvereinigungen, Vermögensmassen"}
START = {"HGB": "§1\n(1) Kaufmann im Sinne", "AO": "§ 1 Anwendungsbereich", "EStG": "§ 1 Steuerpflicht",
         "UStG": "§ 1 Steuerbare Umsätze", "LStDV": "§ 1 Arbeitnehmer, Arbeitgeber",
         "BGB": "§ 1 Beginn der Rechtsfähigkeit", "ErbStG": "§ 1 Steuerpflichtige Vorgänge", "BewG": "§ 1 Geltungsbereich", "VwZG": "§ 1 Anwendungsbereich", "GmbHG": "§ 1 Zweck; Gründerzahl"}
STAND = {}


def schluessel(nr):
    m = re.match(r"(\d+)([a-z]*)", nr)
    return (int(m.group(1)), m.group(2))


# Überschriften, die im PDF an einer Fußnotenzeile hängen
ROH_KORREKTUR = {"ErbStG": [(r" (§ 2 Persönliche Steuerpflicht)\n", r"\n\1\n")]}


def gesetz(datei, start, g=""):
    roh = open(datei, encoding="utf-8").read()
    for muster, ersatz in ROH_KORREKTUR.get(g, []):
        roh = re.sub(muster, ersatz, roh)
    m = re.search(r"zuletzt\s+durch\s+(.*?)\s+geändert\s+worden\s+ist", roh, re.S)
    STAND[datei] = re.sub(r"\s+", " ", m.group(1)) if m else ""
    # Erste Fundstelle, auf die Normtext folgt (überspringt die Inhaltsübersicht)
    pos = [m.start() for m in re.finditer(re.escape(start), roh) if re.match(r"[^\n]*\n\s*[\(\wÄÖÜ]", roh[m.start():])
           and not re.match(r"[^\n]*\n§ \d", roh[m.start():])]
    roh = roh[pos[0]:] if pos else roh
    normen, cur, letzter = {}, None, (0, "")
    for z in bereinigen(roh):
        if re.fullmatch(r"\d{1,2}", z):
            continue  # hochgestellte Fußnotenziffern (EStG)
        m = re.match(r"^§ ?(\d+[a-z]?)(?:\s+(.*))?$", z)
        # Nur fortlaufende Überschriften akzeptieren – Verweise im Text („§ 108 …“) sind keine neuen Paragrafen
        titel = (m.group(2) or "") if m else ""
        # Überschriften beginnen groß („§ 18j teilnimmt.“ ist ein umbrochener Verweis im Text)
        if m and not titel.startswith(("Abs.", "Absatz ", "Satz ", "Nr.")) and not re.match(r"[a-zäöüß]", titel):
            k = schluessel(m.group(1))
            if letzter < k and m.group(1) not in normen:
                letzter = k
                cur = normen.setdefault(m.group(1), {"titel": (m.group(2) or "").strip(), "z": []}); continue
        if z == "Fußnote" or re.match(r"^(Erster|Zweiter|Dritter|Vierter|Fünfter|Sechster|Siebter|Achter|Neunter|Zehnter|Elfter) (Abschnitt|Buch|Teil|Unterabschnitt|Titel)", z) \
                or re.match(r"^(Erstes|Zweites|Drittes|Viertes|Fünftes|Sechstes|Siebentes) Buch$", z):
            cur = None; continue
        if cur is not None:
            cur["z"].append(z)
    return normen


def bindestriche(zeilen):
    """„Wohn-“ + „und …“ am Zeilenende: Bindestrich behalten (sonst entsteht „Wohnund“)."""
    aus = list(zeilen)
    for i in range(len(aus) - 1):
        if aus[i].endswith("-") and re.match(r"(und|oder|sowie|bzw\.|bis)\b", aus[i + 1]):
            aus[i] += "\u200b"
    return aus


def ustg_4(roh):
    """§ 4 Nr. 9 und 12 UStG – im PDF über einen Seitenumbruch zerstückelt, daher über den Wortlaut ausgeschnitten."""
    def zwischen(anfang, ende):
        i = roh.index(anfang); j = roh.index(ende, i)
        return absaetze(bindestriche(bereinigen(roh[i:j])))[0]["text"]
    nr9 = zwischen("a)\n\ndie Umsätze, die unter das Grunderwerbsteuergesetz fallen", "\na)\n\ndie Leistungen auf Grund eines Versicherungsverhältnisses")
    nr12 = zwischen("12.\n\na)\n\ndie Vermietung und die Verpachtung von Grundstücken", "\n13.\n")
    nr12 = re.sub(r"^12\.\s*", "", nr12)
    return [{"abs": "", "text": "Von den unter § 1 Abs. 1 Nr. 1 fallenden Umsätzen sind steuerfrei:\n…\n9. " + nr9 + "\n…\n12. " + nr12 + "\n…"}]


def ustg_4_ust(roh):
    """§ 4 UStG für das USt-Modul: Nr. 9, 12, 14 a und 28 über den Wortlaut ausgeschnitten (enthält den BilR-Auszug)."""
    def zwischen(anfang, ende):
        i = roh.index(anfang); j = roh.index(ende, i)
        return absaetze(bindestriche(bereinigen(roh[i:j])))[0]["text"]
    nr12 = re.sub(r"^12\.\s*", "", zwischen("12.\n\na)\n\ndie Vermietung und die Verpachtung von Grundstücken", "\n13.\n"))
    nr14 = zwischen("a)\n\nHeilbehandlungen im Bereich der Humanmedizin", "\nb)\n") + "\nb) …"
    nr28 = re.sub(r"^28\.\s*", "", zwischen("28.\n\ndie Lieferungen von Gegenständen, für die der Vorsteuerabzug", "\n29.\n"))
    nr9 = zwischen("a)\n\ndie Umsätze, die unter das Grunderwerbsteuergesetz fallen", "\na)\n\ndie Leistungen auf Grund eines Versicherungsverhältnisses")
    return [{"abs": "", "text": "Von den unter § 1 Abs. 1 Nr. 1 fallenden Umsätzen sind steuerfrei:\n…\n9. " + nr9 + "\n…\n12. " + nr12 + "\n…\n14. " + nr14 + "\n…\n28. " + nr28 + "\n…"}]


def estg_19_tabelle(roh):
    """Tabelle in § 19 Abs. 2 S. 3 EStG als eine Zeile je Jahr. Die Werte folgen dem Aufbau des Gesetzes
    (Höchstbetrag = Prozentsatz × 75 €, Zuschlag = 30 % des Höchstbetrags) und werden Zeile für Zeile
    im Gesetzestext nachgewiesen – fehlt eine, bricht die Erzeugung ab."""
    i = roh.index("Tabelle zu entnehmen:"); j = roh.index("Bemessungsgrundlage für den Versorgungsfreibetrag ist", i)
    tab = re.sub(r"\s+", " ", roh[i:j])
    zeilen, pos, pz = [], 0, 400
    for jahr in ["bis 2005", "ab 2006", *map(str, range(2007, 2059))]:
        pz = 400 if jahr == "bis 2005" else pz - (16 if int(jahr[-4:]) <= 2020 else 8 if int(jahr[-4:]) <= 2022 else 4)
        hb = pz * 75 // 10; zs = hb * 3 // 10
        tsd = lambda x: f"{x // 1000} {x % 1000:03d}" if x >= 1000 else str(x)
        werte = [jahr, f"{pz // 10},{pz % 10}", tsd(hb), tsd(zs)]
        m = re.compile(r"\s+".join(re.escape(w) for w in werte)).search(tab, pos)
        if not m:
            raise SystemExit(f"§ 19 Abs. 2 EStG: Tabellenzeile {werte} nicht gefunden")
        pos = m.end()
        zeilen.append(" | ".join(werte))
    return ("Jahr des Versorgungsbeginns | Versorgungsfreibetrag in % der Versorgungsbezüge | Höchstbetrag in Euro | "
            "Zuschlag zum Versorgungsfreibetrag in Euro\n" + "\n".join(zeilen))


def erbstg_19_tabelle(roh):
    """Steuersatztabelle § 19 Abs. 1 ErbStG als Zeilen „Wert | I | II | III“ – jede Zeile wird im Gesetzestext nachgewiesen."""
    i = roh.index("Prozentsatz in der Steuerklasse"); tab = re.sub(r"\s+", " ", roh[i:i + 600])
    zeilen, pos = [], 0
    for wert, *saetze in [("75 000", 7, 15, 30), ("300 000", 11, 20, 30), ("600 000", 15, 25, 30), ("6 000 000", 19, 30, 30),
                          ("13 000 000", 23, 35, 50), ("26 000 000", 27, 40, 50), ("über 26 000 000", 30, 43, 50)]:
        m = re.compile(r"\s+".join([re.escape(wert), *map(str, saetze)]) + r"\b").search(tab, pos)
        if not m:
            raise SystemExit(f"§ 19 ErbStG: Zeile {wert} nicht gefunden")
        pos = m.end(); zeilen.append(" | ".join([wert, *map(str, saetze)]))
    return ("Wert des steuerpflichtigen Erwerbs (§ 10) bis einschließlich … Euro | Steuerklasse I (%) | Steuerklasse II (%) | Steuerklasse III (%)\n"
            + "\n".join(zeilen))


def nummern(text, auswahl):
    """Behält aus einer Aufzählung (1. … 2. …) nur die Einleitung und die gewählten Nummern.
    Eine neu beginnende Zählung (1. nach 4.) ist eine Aufzählung innerhalb der Nummer und bleibt bei ihr,
    solange sie fortläuft (§ 6 Abs. 1 Nr. 4 EStG enthält zwei solche Listen bis „5.“)."""
    teile = re.split(r"\n(?=\d+[a-z]?\.\s)", text)
    einleitung, punkte, letzte, innen = teile[0], [], 0, None
    for t in teile[1:]:
        nr = re.match(r"(\d+[a-z]?)\.", t).group(1)
        z = int(re.match(r"\d+", nr).group())
        if punkte and (nr == "1" and letzte >= 1 or innen is not None and nr == str(innen + 1)):
            punkte[-1][1] += "\n" + t; innen = z  # Aufzählung innerhalb der Nummer
        elif z > letzte or (punkte and z == letzte and nr != punkte[-1][0]):  # 26a, 26b … nach 26
            punkte.append([nr, t]); letzte, innen = z, None
        elif punkte:
            punkte[-1][1] += "\n" + t
        else:
            einleitung += "\n" + t
    behalten = [t for nr, t in punkte if nr in auswahl]
    return "\n".join([einleitung.strip(), *behalten, "…"]).strip()


# Vor der Nummernauswahl: im PDF verrutschte Nummern (§ 6 Abs. 1 Nr. 4 EStG steht hinter „f)“ von Nr. 3a)
VOR_KORREKTUR = {("EStG", "6"): [(r"\nf\) 4\. (bei der Bewertung sind die Wertverhältnisse am Bilanzstichtag maßgebend; künftige Preis- und "
                                 r"Kostensteigerungen dürfen nicht berücksichtigt werden\.) (Entnahmen des Steuerpflichtigen)", r"\nf) \1\n4. \2")]}


def paragraf(n, filter_, vor=()):
    abs_ = absaetze(bindestriche(n["z"]))
    for muster, ersatz in vor:
        for a in abs_:
            a["text"] = re.sub(muster, ersatz, a["text"])
    titel = n["titel"]
    # Überschrift über zwei Zeilen: Rest steht im ersten, unnummerierten Absatz
    if abs_ and abs_[0]["abs"] == "" and len(abs_) > 1 and len(abs_[0]["text"]) < 90 and not abs_[0]["text"].endswith("."):
        rest = abs_[0]["text"]
        # „Aufbewahrung von Unterlagen“ + „Aufbewahrungsfristen“ → amtlich mit Punkt; „… innergemeinschaftliche“ + „Erwerbe“ ohne
        trenner = ". " if titel.split()[-1][:1].isupper() else " "
        titel = f"{titel}{trenner}{rest}".strip()
        abs_ = abs_[1:]
    if filter_ is None:
        return titel, abs_, False
    erg = []
    for f in filter_:
        nr, _, nrn = f.partition("|")
        a = next((x for x in abs_ if x["abs"] == nr), None)
        if a is None:
            raise SystemExit(f"Absatz {nr!r} fehlt")
        erg.append({"abs": a["abs"], "text": nummern(a["text"], nrn.split(",")) if nrn else a["text"]})
    return titel, erg, True


def main():
    global AUSWAHL
    args = sys.argv[1:]
    name = "NORMEN_BILR"
    if args[0] == "--est":
        AUSWAHL, name, args = AUSWAHL_EST, "NORMEN_EST", args[1:]
    if args[0] == "--ust":
        AUSWAHL, name, args = AUSWAHL_UST, "NORMEN_UST", args[1:]
    if args[0] == "--ao":
        AUSWAHL, name, args = AUSWAHL_AO, "NORMEN_AO", args[1:]
    if args[0] == "--bew":
        AUSWAHL, name, args = AUSWAHL_BEW, "NORMEN_BEW", args[1:]
    if args[0] == "--pr":
        AUSWAHL, name, args = AUSWAHL_PR, "NORMEN_PR", args[1:]
    ziel, *quellen = args
    aus, staende = [], []
    for q in quellen:
        g, datei = q.split("=", 1)
        normen = gesetz(datei, START[g], g)
        staende.append(f"{g}: zuletzt geändert durch {STAND[datei]}")
        for nr, filter_ in AUSWAHL[g].items():
            if nr not in normen:
                print("FEHLT", g, nr, file=sys.stderr); continue
            titel, abs_, auszug = paragraf(normen[nr], filter_, VOR_KORREKTUR.get((g, nr), ()))
            if (g, nr) == ("UStG", "4"):
                abs_ = ustg_4_ust(open(datei, encoding="utf-8").read()) if name == "NORMEN_UST" else ustg_4(open(datei, encoding="utf-8").read())
            if (g, nr) == ("EStG", "19"):
                tabelle = estg_19_tabelle(open(datei, encoding="utf-8").read())
                for a in abs_:
                    a["text"] = re.sub(r"(zu entnehmen:) .*?Jahr des Versorgungsbeginns (Bemessungsgrundlage für den)",
                                       lambda m: f"{m.group(1)}\n{tabelle}\n{m.group(2)}", a["text"], flags=re.S)
            if (g, nr) == ("ErbStG", "19"):
                tabelle = erbstg_19_tabelle(open(datei, encoding="utf-8").read())
                for a in abs_:
                    if a["abs"] == "1":
                        a["text"] = "Die Erbschaftsteuer wird nach folgenden Prozentsätzen erhoben:\n" + tabelle
            titel = TITEL_KORREKTUR.get((g, nr)) or titel or TITEL.get((g, nr), "")
            for muster, ersatz in TEXT_KORREKTUR.get((g, nr), []):
                for a in abs_:
                    a["text"] = re.sub(muster, ersatz, a["text"], flags=re.S)
            aus.append({"g": g, "nr": nr, "titel": titel, "abs": abs_, **({"auszug": True} if auszug else {})})
    for n in aus:
        for a in n["abs"]:
            a["text"] = a["text"].replace("\u200b", "")
    if name in ("NORMEN_PR", "NORMEN_BEW"):
        # Am Ende des letzten Absatzes hängen im PDF oft Gliederungsüberschriften, Fußnoten oder weggefallene Paragrafen
        for n in aus:
            if not n["abs"]:
                continue
            letzter = n["abs"][-1]
            for muster in (r"\s*\*\) Amtlicher Hinweis:.*$", r"\s+§§ \d+[a-z]? (?:bis|und) \d+[a-z]? \(weggefallen\).*$",
                           r"\s+(?:Untertitel|Kapitel|Abschnitt|Titel) \d+ [A-ZÄÖÜ].*$"):
                letzter["text"] = re.sub(muster, "", letzter["text"], flags=re.S)
            n["titel"] = n["titel"].replace("*)", "").strip().rstrip(".").strip()
    js = ("// Automatisch erzeugt aus den Gesetzestexten (tools/bilr_normen.py) – nicht von Hand ändern.\n"
          "// Quelle: www.gesetze-im-internet.de. " + " · ".join(staende) + "\n"
          "export const " + name + " = " + json.dumps(aus, ensure_ascii=False, indent=0) + ";\n")
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    open(ziel, "w", encoding="utf-8").write(js)
    print(len(aus), "Normen geschrieben")


if __name__ == "__main__":
    main()
