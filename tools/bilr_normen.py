"""Erzeugt web/js/bilr/normen.js (Gesetzestexte für Bilanzrecht) aus Gesetzes-PDFs (Text via pdftotext).

Aufruf (beliebige Teilmenge der Gesetze):
  pdftotext UStG.pdf UStG.raw
  python3 -I tools/bilr_normen.py web/js/bilr/normen.js UStG=UStG.raw HGB=HGB.raw AO=AO.raw EStG=EStG.raw

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
            "268": ["5"], "277": ["1"]},
    "AO": {"39": None, "140": None, "141": None, "146": ["1"], "147": ["1", "3"]},
    "EStG": {"4": ["1", "3"], "5": ["1", "5"], "6": ["1|1,2,3,4,5", "2", "2a"], "7": ["1", "4"], "9b": ["1"],
             "12": None, "13a": ["1"], "18": ["1"]},
    "UStG": {"1": ["1"], "3": ["1", "1b", "9"], "4": [""], "9": ["1"], "10": ["1", "4"],
             "12": ["1", "2|1,11"], "15": ["1"], "17": ["1", "2"], "19": ["1"]},
}
# Einkommensteuer (Aufruf mit --est als erstem Argument → web/js/est/normen.js, Export NORMEN_EST)
AUSWAHL_EST = {
    "EStG": {"1": ["1", "4"], "2": None, "3": ["|15,26,26a,51,62"], "3c": ["1"], "4": ["4", "5|6b,6c"],
             "6": ["2"], "7": ["1"], "8": ["1"], "9": ["1", "2", "4"], "9a": None, "11": None, "12": None,
             "25": ["1", "3"], "26": None, "26a": ["1"], "26b": None, "32a": ["1", "5", "6"], "36": ["1", "2", "4"],
             "46": ["2", "4"]},
    "AO": {"8": None, "9": None},
}
# Umsatzsteuer (Aufruf mit --ust → web/js/ust/normen.js, Export NORMEN_UST)
AUSWAHL_UST = {
    "UStG": {"1": ["1", "2"], "2": ["1"], "3": ["1", "1b", "3", "4", "6", "6a", "7", "9", "9a", "12"], "3a": ["1", "2", "3|1,3"],
             "4": [""], "9": ["1", "2"], "10": ["1", "4", "5"], "12": ["1", "2|1,15"], "13": ["1"], "13a": ["1"],
             "14": ["1", "4"], "14c": None, "15": ["1", "1a", "2", "3", "4"], "17": ["1"], "19": ["1"]},
}
# Paragrafen ohne amtliche Überschrift: Titel des Abschnitts
TITEL = {("EStG", "3"): "Steuerfreie Einnahmen", ("EStG", "11"): "Vereinnahmung und Verausgabung",
         ("EStG", "12"): "Nicht abzugsfähige Ausgaben", ("EStG", "9b"): "Umsatzsteuerrechtlicher Vorsteuerabzug"}
# Im PDF über einen Seitenumbruch verschobene Textteile (gehören zu § 3 Nr. 13 EStG)
TEXT_KORREKTUR = {("UStG", "3a"): [(r"\n1\. 2\. Eine sonstige", "\n1. Eine sonstige"),
                                    (r" Die kurzfristige Vermietung eines Beförderungsmittels.*?(?=\n3\.)", "")],
                  ("UStG", "12"): [(r" -+\*\).*?(?=\n…)", "")],
                  ("EStG", "3"): [(r"Trennungsgelder\. Die als Reisekostenvergütungen .*?abziehbaren Aufwendungen nicht übersteigen; ", "")]}
START = {"HGB": "§1\n(1) Kaufmann im Sinne", "AO": "§ 1 Anwendungsbereich", "EStG": "§ 1 Steuerpflicht",
         "UStG": "§ 1 Steuerbare Umsätze"}
STAND = {}


def schluessel(nr):
    m = re.match(r"(\d+)([a-z]*)", nr)
    return (int(m.group(1)), m.group(2))


def gesetz(datei, start):
    roh = open(datei, encoding="utf-8").read()
    m = re.search(r"zuletzt\s+durch\s+(.*?)\s+geändert worden ist", roh, re.S)
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


def nummern(text, auswahl):
    """Behält aus einer Aufzählung (1. … 2. …) nur die Einleitung und die gewählten Nummern."""
    teile = re.split(r"\n(?=\d+[a-z]?\.\s)", text)
    einleitung, rest = teile[0], teile[1:]
    behalten = [t for t in rest if re.match(r"(\d+[a-z]?)\.", t).group(1) in auswahl]
    return "\n".join([einleitung.strip(), *behalten, "…"]).strip()


def paragraf(n, filter_):
    abs_ = absaetze(bindestriche(n["z"]))
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
    ziel, *quellen = args
    aus, staende = [], []
    for q in quellen:
        g, datei = q.split("=", 1)
        normen = gesetz(datei, START[g])
        staende.append(f"{g}: zuletzt geändert durch {STAND[datei]}")
        for nr, filter_ in AUSWAHL[g].items():
            if nr not in normen:
                print("FEHLT", g, nr, file=sys.stderr); continue
            titel, abs_, auszug = paragraf(normen[nr], filter_)
            if (g, nr) == ("UStG", "4"):
                abs_ = ustg_4_ust(open(datei, encoding="utf-8").read()) if name == "NORMEN_UST" else ustg_4(open(datei, encoding="utf-8").read())
            titel = titel or TITEL.get((g, nr), "")
            for muster, ersatz in TEXT_KORREKTUR.get((g, nr), []):
                for a in abs_:
                    a["text"] = re.sub(muster, ersatz, a["text"], flags=re.S)
            aus.append({"g": g, "nr": nr, "titel": titel, "abs": abs_, **({"auszug": True} if auszug else {})})
    for n in aus:
        for a in n["abs"]:
            a["text"] = a["text"].replace("\u200b", "")
    js = ("// Automatisch erzeugt aus den Gesetzestexten (tools/bilr_normen.py) – nicht von Hand ändern.\n"
          "// Quelle: www.gesetze-im-internet.de. " + " · ".join(staende) + "\n"
          "export const " + name + " = " + json.dumps(aus, ensure_ascii=False, indent=0) + ";\n")
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    open(ziel, "w", encoding="utf-8").write(js)
    print(len(aus), "Normen geschrieben")


if __name__ == "__main__":
    main()
