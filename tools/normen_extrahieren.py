"""Erzeugt web/js/oer/normen.js aus den Gesetzes-PDFs (Text via pdftotext).

Aufruf: python3 -I tools/normen_extrahieren.py GG.raw BWahlG.raw PartG.raw web/js/oer/normen.js
"""
import json, re, sys

AUSWAHL = {
    "GG": ["Präambel", "1", "19", "20", "20a", "21", "23", "28", "30", "31", "37", "38", "39", "40", "41", "42", "43",
           "44", "45", "45a", "45b", "45c", "45d", "46", "47", "48", "50", "51", "52", "53", "54", "55", "56", "57",
           "58", "59", "60", "61", "62", "63", "64", "65", "65a", "66", "67", "68", "69", "70", "79", "83", "97",
           "103", "116", "121", "145", "146", "29", "76", "77", "93"],
    "BWahlG": ["1", "4", "5", "6", "12", "13", "14", "15", "16", "18", "20", "27", "33", "34", "36", "39", "46"],
    "PartG": ["1", "2", "3", "4", "5", "6", "10", "15", "18", "32", "33"],
}

# pdftotext entfernt Bindestriche am Zeilenende auch bei echten Bindestrich-Wörtern
KORREKTUR = {"NordrheinWestfalen": "Nordrhein-Westfalen", "SchleswigHolstein": "Schleswig-Holstein",
             "SachsenAnhalt": "Sachsen-Anhalt", "Postund": "Post- und", "MecklenburgVorpommern": "Mecklenburg-Vorpommern",
             "BadenWürttemberg": "Baden-Württemberg", "RheinlandPfalz": "Rheinland-Pfalz"}

MUELL = [r"Ein Service des Bundesministerium.*", r"sowie des Bundesamts für Justiz.*", r"^- Seite \d+ von \d+ -$",
         r"^Justiz ‒ www\.gesetze-im-internet\.de$", r"^www\.gesetze-im-internet\.de$"]


def bereinigen(text):
    zeilen = []
    for z in text.split("\n"):
        z = z.strip()
        if any(re.search(m, z) for m in MUELL):
            continue
        z = z.replace("Justiz ‒ www.gesetze-im-internet.de", "").strip()
        zeilen.append(z)
    return zeilen


def absaetze(zeilen):
    """Fügt umbrochene Zeilen zusammen und trennt nach Absätzen (1), (2) …"""
    text = ""
    for z in zeilen:
        if not z:
            continue
        if re.match(r"^\(\d+[a-z]?\)", z) or re.match(r"^\d+\.$", z) or re.match(r"^[a-z]\)$", z):
            text += "\n" + z
        elif re.match(r"^\d+\.$|^[a-z]\)$", text.split("\n")[-1].strip()):
            text += " " + z
        else:
            text += (" " if text and not text.endswith("\n") else "") + z
    # Silbentrennung zusammenfügen – aber nicht bei Ergänzungsstrichen wie „Wohn- und Schlafräume“
    text = re.sub(r"(\S)-\s(?!(?:und|oder|sowie|bis|bzw\.|noch)\b)(?=[a-zäöüß])", r"\1", text)
    for falsch, richtig in KORREKTUR.items():
        text = text.replace(falsch, richtig)
    teile = re.split(r"\n(?=\(\d+[a-z]?\)\s)", text.strip())
    erg = []
    for t in teile:
        t = re.sub(r"\n(\d+\.|[a-z]\))\s*", r"\n\1 ", t).strip()
        m = re.match(r"^\((\d+[a-z]?)\)\s*(.*)$", t, re.S)
        erg.append({"abs": m.group(1) if m else "", "text": (m.group(2) if m else t).strip()})
    return erg


def gg(datei):
    zeilen = bereinigen(open(datei, encoding="utf-8").read())
    normen, cur = {}, None
    for z in zeilen:
        m = re.match(r"^Art (\d+[a-z]?)(?:\s+(.*))?$", z)
        if z == "Präambel":
            cur = normen.setdefault("Präambel", {"titel": "Präambel", "z": []}); continue
        if z.startswith("I.") and cur and cur["titel"] == "Präambel":
            cur = None; continue
        if m:
            titel = (m.group(2) or "").strip()
            cur = normen.setdefault(m.group(1), {"titel": titel, "z": []})
            if titel == "(weggefallen)":
                cur = None
            continue
        if re.match(r"^[IVX]+\s?[a-z]?\.$", z) or z.startswith("Anhang EV") or z == "Fußnote":
            cur = None; continue
        if cur is not None:
            cur["z"].append(z)
    return normen


def gesetz(datei, start):
    roh = open(datei, encoding="utf-8").read()
    # Erste Fundstelle, auf die der Normtext mit „(1)“ folgt (überspringt die Inhaltsübersicht)
    pos = [m.start() for m in re.finditer(re.escape(start), roh)
           if re.match(r"[^\n]*\n\s*\(1\)", roh[m.start():])]
    roh = roh[pos[0]:] if pos else roh
    zeilen = bereinigen(roh)
    normen, cur = {}, None
    for z in zeilen:
        m = re.match(r"^§ (\d+[a-z]?)(?:\s+(.*))?$", z)
        if m and not (m.group(2) or "").startswith(("Abs.", "Absatz ", "Satz ")) and m.group(1) not in normen:
            cur = normen.setdefault(m.group(1), {"titel": (m.group(2) or "").strip(), "z": []}); continue
        if z == "Fußnote" or re.match(r"^(Erster|Zweiter|Dritter|Vierter|Fünfter|Sechster|Siebter|Achter|Neunter) Abschnitt", z):
            cur = None; continue
        if cur is not None:
            cur["z"].append(z)
    return normen


def main():
    gg_d, bw_d, pa_d, ziel = sys.argv[1:5]
    quellen = {
        "GG": gg(gg_d),
        "BWahlG": gesetz(bw_d, "§ 1 Zusammensetzung des Deutschen Bundestages und Wahlrechtsgrundsätze"),
        "PartG": gesetz(pa_d, "§ 1 Verfassungsrechtliche Stellung"),
    }
    aus = []
    for g, nrn in AUSWAHL.items():
        for nr in nrn:
            n = quellen[g].get(nr)
            if not n:
                print("FEHLT", g, nr, file=sys.stderr); continue
            aus.append({"g": g, "nr": nr, "titel": n["titel"], "abs": absaetze(n["z"])})
    js = ("// Automatisch erzeugt aus den Gesetzestexten (tools/normen_extrahieren.py) – nicht von Hand ändern.\n"
          "// Quelle: www.gesetze-im-internet.de (GG Stand 22.3.2025, BWahlG Stand 3.7.2026, PartG).\n"
          "export const NORMEN = " + json.dumps(aus, ensure_ascii=False, indent=0) + ";\n")
    open(ziel, "w", encoding="utf-8").write(js)
    print(len(aus), "Normen geschrieben")


if __name__ == "__main__":
    main()
