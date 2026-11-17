#!/usr/bin/env python3
"""Erzeugt das Gesetzbuch der App: vollständige Gesetze als web/gesetze/<Kürzel>.json und das Verzeichnis
web/js/gesetzbuch_index.js. Quelle: XML-Fassungen von www.gesetze-im-internet.de (…/<kürzel>/xml.zip, entpackt).
Aufruf: python3 -I tools/gesetzbuch.py AO=ao.xml EStG=estg.xml …

Datei je Gesetz: {g, titel, stand, gl: [[ebene, bezeichnung, titel], …],
                  n: [[nr, titel, glIndex, [[abs, text, enden], …]], …]}
enden = Stellen im Text, an denen nach einer Aufzählung wieder der Absatz weitergeht (für satzMarken)."""
import re, sys, json, html, os, hashlib

MARKE = "\u0003"

def sauber(s):
    return re.sub(r"[ \t]+", " ", html.unescape(s)).strip()

def inhalt(p):
    p = re.sub(r"<SUP[^>]*>.*?</SUP>", "", p, flags=re.S)
    p = re.sub(r"<FnR[^>]*/>|<FnR[^>]*>.*?</FnR>", "", p, flags=re.S)
    p = re.sub(r"<BR\s*/?>", "\n", p)
    teile, tiefe = [], 0
    for tok in re.split(r"(<[^>]+>)", p):
        if not tok: continue
        if tok.startswith("<"):
            m = re.match(r"</?\s*([A-Za-z]+)", tok)
            name = m.group(1).upper() if m else ""
            zu = tok.startswith("</")
            if name == "DL":
                tiefe += -1 if zu else 1
                teile.append("\n" + (MARKE if zu and tiefe == 0 else ""))
            elif name == "DT": teile.append(" " if zu else "\n")
            elif name in ("ROW", "TR") and not zu: teile.append("\n")
            elif name in ("ENTRY", "TD") and zu: teile.append(" | ")
            elif name == "LA" and zu: teile.append(" ")
            continue
        teile.append(tok.replace("\n", " "))
    zeilen = []
    roh = "".join(teile).split("\n")
    # „1.“ allein, darunter „a) …“ → „1. a) …“ (wie in den Gesetzessammlungen)
    roh2 = []
    for z in roh:
        if roh2 and re.fullmatch(r"\s*\d+[a-z]?\.\s*", roh2[-1].replace(MARKE, "")) and z.strip():
            roh2[-1] = roh2[-1].rstrip() + " " + z.lstrip()
        else:
            roh2.append(z)
    for z in roh2:
        marke = MARKE in z
        z = sauber(z.replace(MARKE, "")).rstrip(" |").strip()
        if z: zeilen.append((MARKE if marke else "") + z)
    text = "\n".join(zeilen)
    enden = []
    while MARKE in text:
        i = text.index(MARKE); enden.append(i); text = text[:i] + text[i + 1:]
    return text, enden

def lesen(datei, g):
    x = open(datei, encoding="utf-8").read()
    titel = re.search(r"<langue>(.*?)</langue>", x, re.S)
    titel = sauber(re.sub(r"<[^>]+>", "", titel.group(1))) if titel else g
    stand = [sauber(re.sub(r"<[^>]+>", "", s)) for s in re.findall(r"<standkommentar>(.*?)</standkommentar>", x, re.S)]
    gl, normen, akt_gl = [], [], -1
    for norm in re.findall(r"<norm\b.*?</norm>", x, re.S):
        ge = re.search(r"<gliederungseinheit>(.*?)</gliederungseinheit>", norm, re.S)
        if ge and not re.search(r"<enbez>", norm):
            kz = re.search(r"<gliederungskennzahl>(.*?)</gliederungskennzahl>", ge.group(1))
            bez = re.search(r"<gliederungsbez>(.*?)</gliederungsbez>", ge.group(1), re.S)
            tit = re.search(r"<gliederungstitel>(.*?)</gliederungstitel>", ge.group(1), re.S)
            ebene = len(kz.group(1)) // 3 if kz else 1
            gl.append([ebene, sauber(re.sub(r"<[^>]+>", " ", bez.group(1))) if bez else "", sauber(re.sub(r"<[^>]+>", " ", tit.group(1))) if tit else ""])
            akt_gl = len(gl) - 1
            continue
        m = re.search(r"<enbez>(.*?)</enbez>", norm)
        if not m: continue
        enbez = sauber(m.group(1))
        mm = re.match(r"(?:§§?|Art\.?|Artikel)\s*([0-9]+[a-z]*)", enbez)
        if enbez == "Präambel": nr = "Präambel"
        elif mm: nr = mm.group(1)
        else: continue                                   # Inhaltsübersicht, Anlagen
        t = re.search(r"<titel[^>]*>(.*?)</titel>", norm, re.S)
        ntitel = sauber(re.sub(r"<[^>]+>", " ", t.group(1))) if t else ""
        text = re.search(r"<textdaten>\s*<text[^>]*>(.*?)</text>", norm, re.S)
        absaetze, akt = [], None
        for p in re.findall(r"<P>(.*?)</P>", text.group(1), re.S) if text else []:
            tx, en = inhalt(p)
            if not tx: continue
            a = re.match(r"\((\d+[a-z]?)\)\s*", tx)
            if a:
                versatz = a.end()
                akt = [a.group(1), tx[versatz:], [e - versatz for e in en if e >= versatz]]; absaetze.append(akt)
            elif akt is not None:
                versatz = len(akt[1]) + 1
                akt[1] += "\n" + tx; akt[2] += [e + versatz for e in en]
            else:
                akt = ["", tx, en]; absaetze.append(akt)
        if not absaetze: absaetze = [["", "(weggefallen)" if "weggefallen" in ntitel.lower() or not ntitel else "", []]]
        if enbez.startswith("§§"): ntitel = (ntitel or "") + f" ({enbez})"
        normen.append([nr, ntitel, akt_gl, [[a, tx, en] if en else [a, tx] for a, tx, en in absaetze]])
    return {"g": g, "titel": titel, "stand": stand[:3], "gl": gl, "n": normen}

def stand_text(st):
    """„Zuletzt geändert durch Art. 3 G v. 3.7.2026 I Nr. 199“ – die letzte Änderung ist für Lernende am nützlichsten."""
    for s in st:
        if "zuletzt geändert" in s.lower() or "geändert" in s.lower():
            return re.sub(r"^.*?(zuletzt geändert)", r"\1", s, flags=re.I).rstrip(" ;").replace("zuletzt", "Zuletzt", 1)
    return (st[0] if st else "").rstrip(" ;")

def main():
    os.makedirs("web/gesetze", exist_ok=True)
    verzeichnis = []
    for q in sys.argv[1:]:
        g, datei = q.split("=", 1)
        d = lesen(datei, g)
        roh = json.dumps(d, ensure_ascii=False, separators=(",", ":"))
        open(f"web/gesetze/{g}.json", "w", encoding="utf-8").write(roh)
        verzeichnis.append({"g": g, "titel": d["titel"], "n": len(d["n"]), "kb": round(len(roh.encode()) / 1024),
                            "v": hashlib.sha1(roh.encode()).hexdigest()[:10], "stand": stand_text(d["stand"])})
        print(f"{g:8} {len(d['n']):5} Normen {len(d['gl']):4} Gliederungen {len(roh.encode())//1024:6} KB")
    with open("web/js/gesetzbuch_index.js", "w", encoding="utf-8") as f:
        f.write("// Automatisch erzeugt (tools/gesetzbuch.py) aus den XML-Fassungen von www.gesetze-im-internet.de – nicht von Hand ändern.\n")
        f.write("// Vollständige Gesetze in web/gesetze/<g>.json; v = Prüfsumme (Cache), kb = Größe, stand = Stand der Fassung.\n")
        f.write("export const GESETZBUCH = " + json.dumps(verzeichnis, ensure_ascii=False, indent=0) + ";\n")

main()
