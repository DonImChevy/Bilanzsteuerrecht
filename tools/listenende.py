#!/usr/bin/env python3
"""Erzeugt web/js/oer/listenende.js: wo in einem Absatz nach einer Aufzählung (Nr. 1, 2, …) wieder Sätze
des Absatzes folgen. Grundlage: XML-Fassungen von gesetze-im-internet.de (…/<kürzel>/xml.zip, entpackt).
Aufruf: python3 -I tools/listenende.py web/js/oer/listenende.js [--nur absaetze.json] GG=gg.xml AO=ao.xml …
(--nur: JSON-Liste der Absätze „AO 39 2“, die in der App eine Aufzählung haben; sonst alle)
Die App (normtext.js) bricht dort um, damit Satznummern richtig gezählt werden: Sätze innerhalb einer
Nummer zählen innerhalb der Nummer (§ 39 Abs. 2 Nr. 1 S. 2 AO), Sätze nach der Aufzählung zählen im Absatz weiter."""
import re, sys, json, html

def text(s):
    s = re.sub(r"<SUP[^>]*>.*?</SUP>", " ", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

def segmente(p):
    """Textstücke auf oberster Ebene, die nach einem </DL> beginnen."""
    out, tiefe, i = [], 0, 0
    for m in re.finditer(r"<(/?)DL\b[^>]*>", p):
        if m.group(1):
            tiefe -= 1
            if tiefe == 0:
                rest = p[m.end():]
                n = re.search(r"<DL\b", rest)
                stueck = text(rest[: n.start()] if n else rest)
                if re.search(r"[A-Za-zÄÖÜäöü]", stueck): out.append(stueck)
        else:
            tiefe += 1
    return out

def main():
    ziel, quellen, nur = sys.argv[1], sys.argv[2:], None
    if quellen[:1] == ["--nur"]:
        nur, quellen = set(json.load(open(quellen[1], encoding="utf-8"))), quellen[2:]
    erg = {}
    for q in quellen:
        g, datei = q.split("=", 1)
        x = open(datei, encoding="utf-8").read()
        for norm in re.findall(r"<norm\b.*?</norm>", x, re.S):
            m = re.search(r"<enbez>(?:§|Art)\s*([0-9]+[a-z]*)</enbez>", norm)
            if not m: continue
            nr = m.group(1)
            abs_ = ""
            for p in re.findall(r"<P>(.*?)</P>", norm, re.S):
                a = re.match(r"\s*\((\d+[a-z]?)\)", text(p))
                if a: abs_ = a.group(1)
                if nur is not None and f"{g} {nr} {abs_}".strip() not in nur: continue
                for s in segmente(p):
                    erg.setdefault(f"{g} {nr} {abs_}".strip(), []).append(" ".join(s.split()[:6]))
    with open(ziel, "w", encoding="utf-8") as f:
        f.write("// Automatisch erzeugt (tools/listenende.py) aus den XML-Fassungen von www.gesetze-im-internet.de – nicht von Hand ändern.\n")
        f.write("// Je Absatz die Anfänge der Sätze, die nach einer Aufzählung wieder zum Absatz gehören (nicht zur letzten Nummer).\n")
        f.write("export const LISTENENDE = " + json.dumps(erg, ensure_ascii=False, indent=0, sort_keys=True) + ";\n")
    print(len(erg), "Absätze")

main()
