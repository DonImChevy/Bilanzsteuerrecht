#!/usr/bin/env python3
"""Erzeugt aus dem 1024-px-Icon (tools/app_icon.mjs) die Dateien in web/icons/:
icon-192.png, icon-512.png, apple-touch-icon.png (180 px) und icon-maskable-512.png
(Motiv auf 80 % verkleinert auf Smaragd, damit Android beim runden Zuschnitt nichts abschneidet).
Aufruf: python3 -I tools/app_icon_groessen.py <icon-1024.png>"""
import sys
from PIL import Image

quelle = Image.open(sys.argv[1]).convert("RGB")
for name, n in [("icon-192", 192), ("icon-512", 512), ("apple-touch-icon", 180)]:
    quelle.resize((n, n), Image.LANCZOS).save(f"web/icons/{name}.png", optimize=True)
grund = Image.new("RGB", (1024, 1024), (8, 58, 47))
motiv = quelle.resize((820, 820), Image.LANCZOS)
grund.paste(motiv, (102, 102))
grund.resize((512, 512), Image.LANCZOS).save("web/icons/icon-maskable-512.png", optimize=True)
print("web/icons aktualisiert")
