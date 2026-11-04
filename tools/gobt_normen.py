"""Erzeugt web/js/oer/gobt.js (Geschäftsordnung des Bundestages, Auszug) aus der Textausgabe des Bundestages.

Aufruf:
  pdftotext 10080000.pdf GOBT.raw      (www.btg-bestellservice.de, „Geschäftsordnung des Deutschen Bundestages“)
  python3 -I tools/gobt_normen.py web/js/oer/gobt.js GOBT.raw
"""
import json, re, sys

AUSWAHL = ["1", "2", "2a", "4", "10", "10a", "45", "48", "57", "76", "78", "79", "81", "84", "86", "97", "98", "125", "126"]


def main():
    ziel, quelle = sys.argv[1:3]
    # Weiche Trennstriche am Zeilenende verbinden das Wort („Grundge\xad\nsetzes“), übrige entfallen
    roh = re.sub(r"\xad\s*\n\s*", "", open(quelle, encoding="utf-8").read()).replace("\xad", "").replace("\f", "\n")
    m = re.search(r"Stand:\s*([^\n]+)", roh)
    stand = m.group(1).strip() if m else ""
    # Textteil: ab dem Gesetzestext (nach den Inhaltsübersichten) bis zur Geschäftsordnung des Vermittlungsausschusses
    start = roh.index("in der Fassung der Bekanntmachung")
    ende = roh.index("Gemeinsame Geschäftsordnung des Vermittlungsausschusses", start)
    text = roh[start:ende]
    # Seitenkopf, der direkt an eine Textzeile angehängt ist („…beschlosseVIII. Vorlagen und ihre Behandlung 68“)
    # Dort war das Wort getrennt: Markierung \x00 = nächste Zeile ohne Leerzeichen anschließen
    roh_zeilen = [re.sub(r"(?<=[a-zäöüß])[IVX]+\.\s[A-ZÄÖÜ].*$", "\x00", z.strip()) for z in text.split("\n")]
    zeilen, i = [], 0
    while i < len(roh_zeilen):
        z = roh_zeilen[i]
        # Abschnittsüberschriften und Seitenköpfe („III.“ + Titelzeile bzw. „IV. Fraktionen“) gehören nicht zum Normtext
        if re.fullmatch(r"[IVX]+\.", z):
            i += 2; continue
        if z and not re.fullmatch(r"\d{1,3}", z) and not re.fullmatch(r"[IVX]+\.\s.*", z) and z not in ("Geschäftsordnung des Deutschen Bundestages", "Geschäftsordnung"):
            zeilen.append(z)
        i += 1
    normen, cur, i = {}, None, 0
    while i < len(zeilen):
        z = zeilen[i]
        m = re.fullmatch(r"§ ?(\d+[a-z]?)", z)
        if m and i + 1 < len(zeilen) and m.group(1) not in normen:
            cur = normen.setdefault(m.group(1), {"titel": zeilen[i + 1], "z": []}); i += 2; continue
        if cur is not None:
            cur["z"].append(z)
        i += 1
    aus = []
    for nr in AUSWAHL:
        n = normen.get(nr)
        if not n:
            print("FEHLT", nr, file=sys.stderr); continue
        absaetze, akt = [], None
        for z in n["z"]:
            m = re.match(r"\((\d+[a-z]?)\)\s*(.*)", z)
            if m:
                akt = {"abs": m.group(1), "text": m.group(2)}; absaetze.append(akt); continue
            if akt is None:
                akt = {"abs": "", "text": ""}; absaetze.append(akt)
            if akt["text"].endswith("\x00"):
                akt["text"] = akt["text"][:-1] + z
            elif re.match(r"(\d+\.|[a-z]\))\s", z):
                akt["text"] += "\n" + z
            elif akt["text"].endswith("-") and z[:1].islower() and not re.match(r"(und|oder|als|bzw\.|bis)\b", z):
                akt["text"] = akt["text"][:-1] + z
            else:
                akt["text"] = (akt["text"] + " " + z).strip()
        for a in absaetze:
            a["text"] = a["text"].replace("mehr Jaals Nein", "mehr Ja- als Nein")  # Trennstrich fehlt im PDF
        aus.append({"g": "GOBT", "nr": nr, "titel": n["titel"], "abs": absaetze})
    js = ("// Automatisch erzeugt aus der Textausgabe des Bundestages (tools/gobt_normen.py) – nicht von Hand ändern.\n"
          f"// Quelle: Geschäftsordnung des Deutschen Bundestages, Textausgabe Stand {stand} (Auszug).\n"
          "export const NORMEN_GOBT = " + json.dumps(aus, ensure_ascii=False, indent=0) + ";\n")
    open(ziel, "w", encoding="utf-8").write(js)
    print(len(aus), "Normen geschrieben")


if __name__ == "__main__":
    main()
