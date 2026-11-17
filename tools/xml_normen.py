#!/usr/bin/env python3
"""Erzeugt web/js/oer/normen_zitiert.js: Texte der Normen, die ein Modul zitiert, die aber in keiner Normdatei stehen,
und die Liste der Normen, die zusätzlich im Normen-Tab eines Moduls erscheinen (Text liegt in einer anderen Datei).
Quelle: XML-Fassungen von www.gesetze-im-internet.de (…/<kürzel>/xml.zip, entpackt).
Aufruf: node tools/zitierte_normen.mjs > bedarf.json
        python3 -I tools/xml_normen.py bedarf.json web/js/oer/normen_zitiert.js GG=gg.xml AO=ao.xml …
Normen ohne XML-Quelle (z. B. EStR) landen in OHNE_QUELLE."""
import re, sys, json, html

def sauber(s):
    return re.sub(r"[ \t]+", " ", html.unescape(s)).strip()

def inhalt(p):
    """XML eines <P> → Text mit Aufzählungen in eigenen Zeilen („1. …“, „a) …“)."""
    p = re.sub(r"<SUP[^>]*>.*?</SUP>", "", p, flags=re.S)          # amtliche Satznummern
    p = re.sub(r"<FnR[^>]*/>|<FnR[^>]*>.*?</FnR>", "", p, flags=re.S)
    p = re.sub(r"<BR\s*/?>", "\n", p)
    teile, tiefe = [], 0
    for tok in re.split(r"(<[^>]+>)", p):
        if not tok: continue
        if tok.startswith("<"):
            name = re.match(r"</?\s*([A-Za-z]+)", tok)
            name = name.group(1).upper() if name else ""
            if name == "DL": tiefe += -1 if tok.startswith("</") else 1; teile.append("\n")
            elif name == "DT" and not tok.startswith("</"): teile.append("\n")
            elif name == "DT": teile.append(" ")
            elif name in ("ROW", "TR") and not tok.startswith("</"): teile.append("\n")
            elif name in ("ENTRY", "TD") and tok.startswith("</"): teile.append(" | ")
            continue
        teile.append(tok.replace("\n", " "))
    zeilen = [sauber(z).rstrip(" |").strip() for z in "".join(teile).split("\n")]
    return "\n".join(z for z in zeilen if z)

def lesen(datei, g):
    x = open(datei, encoding="utf-8").read()
    erg = {}
    for norm in re.findall(r"<norm\b.*?</norm>", x, re.S):
        m = re.search(r"<enbez>(?:§|Art)\s*([0-9]+[a-z]*)</enbez>", norm)
        if not m: continue
        nr = m.group(1)
        titel = re.search(r"<titel[^>]*>(.*?)</titel>", norm, re.S)
        titel = sauber(re.sub(r"<[^>]+>", " ", titel.group(1))) if titel else ""
        text = re.search(r"<textdaten>\s*<text[^>]*>(.*?)</text>", norm, re.S)
        if not text: continue
        absaetze, akt = [], None
        for p in re.findall(r"<P>(.*?)</P>", text.group(1), re.S):
            t = inhalt(p)
            if not t: continue
            a = re.match(r"\((\d+[a-z]?)\)\s*", t)
            if a:
                akt = {"abs": a.group(1), "text": t[a.end():].strip()}; absaetze.append(akt)
            elif akt is not None:
                akt["text"] += "\n" + t
            else:
                akt = {"abs": "", "text": t}; absaetze.append(akt)
        if absaetze and not re.fullmatch(r"\(?weggefallen\)?", absaetze[0]["text"].strip("- ")):
            erg[nr] = {"g": g, "nr": nr, "titel": titel, "abs": absaetze}
    return erg

def main():
    bedarf = json.load(open(sys.argv[1], encoding="utf-8"))
    ziel, quellen = sys.argv[2], dict(q.split("=", 1) for q in sys.argv[3:])
    cache = {}
    texte, im_tab, ohne = {}, {}, {}
    for fach, b in bedarf.items():
        if b["tab"]: im_tab[fach] = b["tab"]
        for ref in b["text"]:
            g, nr = ref.split(" ", 1)
            if g not in quellen: ohne.setdefault(fach, []).append(ref); continue
            if g not in cache: cache[g] = lesen(quellen[g], g)
            n = cache[g].get(nr)
            if not n: ohne.setdefault(fach, []).append(ref); continue
            e = texte.setdefault(ref, dict(n, faecher=[], zitiert=True))
            e["faecher"].append(fach)
    with open(ziel, "w", encoding="utf-8") as f:
        f.write("// Automatisch erzeugt (tools/zitierte_normen.mjs + tools/xml_normen.py) aus den XML-Fassungen von www.gesetze-im-internet.de – nicht von Hand ändern.\n")
        f.write("// Normen, die ein Modul zitiert: Texte, die sonst fehlen (NORMEN_ZITIERT), zusätzliche Einträge im Normen-Tab (IM_TAB)\n")
        f.write("// und Zitate ohne abrufbare Quelle (OHNE_QUELLE, z. B. Richtlinien).\n")
        f.write("export const NORMEN_ZITIERT = " + json.dumps(list(texte.values()), ensure_ascii=False, indent=0) + ";\n")
        f.write("export const IM_TAB = " + json.dumps(im_tab, ensure_ascii=False, indent=0) + ";\n")
        f.write("export const OHNE_QUELLE = " + json.dumps(ohne, ensure_ascii=False, indent=0) + ";\n")
    print(len(texte), "Texte,", sum(map(len, im_tab.values())), "Tab-Einträge, ohne Quelle:", ohne)

main()
