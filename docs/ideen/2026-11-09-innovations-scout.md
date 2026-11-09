# Innovations-Scout: Bericht vom 09.11.2026

Grundlage: Code von `claude/bsr-trainer-app` (Stand 4f48426) und echte Durchläufe in Chromium/Playwright mit 320, 390, 768 und 1280 px, hell und dunkel, Animationen aus, Sparmodus, offline mit Service Worker, Neuladen mitten in Übung, Klausur, Klausursimulation und Generalprobe, einem leeren und einem künstlich vollen Lernstand (246 KB, Level 83) sowie der Zurück-Geste. Geprüft habe ich außerdem rund 110 erzeugte Aufgaben aus allen 7 Modulen. Etwa 35 Rechenaufgaben davon habe ich von Hand nachgerechnet, darunter den ESt-Tarif 2026 für Grund- und Splittingtarif.

Bausteine: Ich habe vor jeder Idee im Code nachgesehen, ob es sie schon gibt. Folgendes gibt es nicht: Lückentext im Kompaktwissen, Spracherkennung, Wake Lock, .ics-Export, Kamera-Aufnahme, Selbsteinschätzung vor dem Prüfen, Manifest-Shortcuts und eine Diagnose falscher Buchungen.

---

## 1. Die 5 stärksten Ideen (nach Priorität)

### 1) „Frag mich ab“: die Lernkartei zum Hören, mit Antwort über die Kopfhörer

- **Der Moment:** Lena sitzt 35 Minuten in der S-Bahn, AirPods im Ohr, das Handy in der Tasche. Bisher kann sie sich dort nur Überblicke vorlesen lassen, also passiv zuhören. Ihre 40 fälligen Wiederholungen bleiben liegen.
- **Die Idee:** Unter „Heute“ gibt es neben „Wiederholen“ den Knopf **„Abfragen lassen (Hören)“**. Dann läuft es so:
  1. Taler liest die erste fällige Frage vor, zum Beispiel: „Bis wann muss Ulf den Einspruch nachholen? Er wurde am Sonntag, 11. Oktober, entlassen.“ Bei Auswahlfragen liest er die Optionen als A bis D vor.
  2. Es folgt eine Denkpause (Standard 8 Sekunden, einstellbar). Ein leiser Ton zeigt das Ende an.
  3. Taler sagt die Lösung und den Kernsatz der Erklärung: „Mittwoch, 11. November. Ereignisfrist, Paragraf 108 Absatz 1 AO mit 187, 188 BGB.“
  4. Lena bewertet sich über die Kopfhörertasten: **Doppeltipp (Weiter) = gewusst, Dreifachtipp (Zurück) = nicht gewusst**. Wo das Gerät Spracherkennung hat, reicht auch „gewusst“ oder „nicht“.
  5. Die Bewertung läuft über `erfasse()` in die Lernkartei, mit XP. Lena hat also echte Wiederholungen erledigt, nicht nur zugehört.

  ```
  ┌──────────────────────────────┐
  │  ◉ Abfrage · 7 von 40        │
  │  AO · Fristen                │
  │  „Bis wann muss Ulf …?“      │
  │        ⏳ ●●●●●○○○            │
  │  [✗ nicht gewusst] [✓ gewusst]│
  │  🎧 ⏭ = gewusst  ⏮ = nicht   │
  └──────────────────────────────┘
  ```
- **Warum das stark ist:** Die Idee knüpft an die Messlatte „Überblicke anhören“ an und dreht sie von passiv auf **aktive Abrufübung** (Testing-Effekt). Sie nutzt die Lernkartei-Intervalle, die es schon gibt, und erschließt eine neue Lernsituation: Augen frei, Hände frei. Neu sind die Kopfhörertasten als Antwortkanal. Die Media Session ist in `vorlesen.js` schon vorhanden, wird aber bisher nur zum Steuern genutzt.
- **Umsetzung in dieser Codebasis:**
  - Neue Datei `web/js/abfrage.js` (rein, testbar): `abfrageGeeignet(frage)` lässt nur zu, was ohne Bildschirm geht. Das sind Auswahlfragen mit ≤ 4 Optionen unter 120 Zeichen, Frage-Antwort-Aufgaben (`typ: "offen"`) mit Kurzfassung der Musterantwort und Zahlaufgaben mit kurzem Text. Buchungssätze mit mehr als 2 Zeilen, Grafiken und Fälle mit `fall: true` fallen weg.
  - `abfrageSegmente(frage)` baut die Teile Frage, Optionen, Pause, Lösung und Erklärungssatz. Das Ausschreiben übernimmt `sprechbar()` aus `vorlesen.js`.
  - Quelle der Fragen ist `faelligVon(fach)` (app.js), gefiltert mit `abfrageGeeignet`.
  - `vorlesen.js` bekommt einen Modus `abfrage`: eine Segmentliste mit Pausensegment und Callback `onBewertung(korrekt)`. Die Media-Session-Handler `nexttrack`/`previoustrack` rufen im Abfragemodus diesen Callback auf.
  - Bewertung über `erfasse(frage, korrekt)`. Nichts Neues in `stat`, nur `stat.xpBonus` für „Abfrage-Serie“ (in XP-Matrix und `QUELLEN` eintragen).
  - Optional `webkitSpeechRecognition` für „gewusst/nicht“. Dazu ein Hinweis, dass die Audiodaten an Apple bzw. Google gehen. Standardmäßig aus.
- **Schwierigste Stelle:** Bei gesperrtem Bildschirm gibt iOS die Media Session nur an ein spielendes `<audio>`-Element, nicht an `speechSynthesis`. Es gibt zwei Ausbaustufen:
  - **Stufe 1:** Der Bildschirm bleibt an (Wake Lock), die Gerätestimme liest.
  - **Stufe 2:** Feste Fragen werden mit `tools/vorlesen_audio.mjs` vorab vertont, als Datei je Aufgaben-ID in `web/audio/abfrage/`. Das sind alle Frage-Antwort- und Auswahlaufgaben ohne Zufallszahlen, etwa 600. Dann laufen sie über `<audio>` mit Sperrbildschirm-Steuerung. Fragen mit Zufallszahlen bleiben bei der Gerätestimme.
- **Aufwand:** M (Stufe 1 in 2–3 Tagen, Stufe 2 noch einmal 1–2 Tage plus TTS-Lauf von etwa 25 MB).
  - **Risiken:** Die Selbstbewertung ist ehrlichkeitsabhängig, das gilt aber für die Frage-Antwort-Aufgaben heute auch. Tastenbelegungen der Kopfhörer unterscheiden sich je nach Modell, deshalb Bildschirmknöpfe als Rückfallebene.
  - **Erfolg messen:** Anteil der Wiederholungen, die im Abfragemodus erledigt werden (eigenes Kennzeichen in `stat.log`), und die Fälligen-Zahl am Abend im Vergleich zu vorher.
- **Erster Schritt:** In `vorlesen.js` ein Pausensegment und `nexttrack` = „gewusst“ einbauen. Dann nur die ÖR-Auswahlfragen (`oer/mc.js`) als Abfrage vorlesen lassen, mit dem Bildschirm an. Das reicht als Prototyp für einen Tag.

### 2) „Abdecken“: Kompaktwissen als Lückentext

- **Der Moment:** Zwei Tage vor der Klausur liest Max das Kompaktwissen „Abschreibungen & GWG“ zum dritten Mal. Er hat das Gefühl, alles zu kennen. In der Klausur fehlt ihm dann die 250-€-Grenze. Das ist die klassische Wiedererkennungs-Illusion.
- **Die Idee:** Oben in jedem Überblick sitzt ein Schalter **„Lesen | Abdecken“**. Beim Abdecken werden alle `**fett**`-Stellen (Textmarker) und alle Werte im Block „Zahlen“ zu Lücken in Papierstreifen-Optik. Max tippt eine Lücke an, ruft die Lösung zuerst im Kopf ab und deckt dann auf. Danach tippt er „gewusst“ (grün) oder „nicht gewusst“ (rot). Am Ende steht zum Beispiel „14 von 19 gewusst – nicht gewusst: 250 €, Sammelposten 1/5, § 6 Abs. 2a EStG“. Die roten Lücken kommen beim nächsten Öffnen zuerst. Im Hör-Modus macht Taler an diesen Stellen eine Pause („Grenze für Sammelposten: …“), dann folgt die Lösung.

  ```
  GWG  § 6 Abs. 2 EStG
  Sofortabzug bis [▓▓▓▓▓▓] netto, Sammelposten
  über [▓▓▓▓] bis [▓▓▓▓▓▓], Auflösung [▓▓▓] …
  ```
- **Warum das stark ist:** Die Inhalte sind schon da: in allen Kompaktwissen-Dateien zusammen stehen **1.328 fett markierte Stellen**. Der Textmarker wird ohne neuen Inhalt zur Abrufübung. Das ist der Cloze-Mechanismus aus Anki und der Abdeckzettel, den Studierende seit jeher benutzen, nur automatisch. Im Code gibt es noch nichts Vergleichbares (grep nach abdeck/lücke/cloze: nur Generalprobe-Lückentexte).
- **Umsetzung in dieser Codebasis:**
  - In `kompakt.js` bekommt `kompaktInline()` eine Option `luecken`. Fettstellen, die auf „:“ enden, sind Überschriften-Labels wie „**Ausgabe / Einnahme:**“ und bleiben sichtbar. Alle anderen werden zu `<button class="km-luecke" data-a="lueckeAuf" data-v="<thema>|<n>">`.
  - Im Block `zahlen` wird nur der Wert abgedeckt.
  - Neue Aktionen `lueckeAuf` und `lueckeWertung` in `AKTIONEN`. Den aufgedeckten Zustand nur in `state.kompakt.offen` halten.
  - In `stat` kommt das Feld `kompaktLuecken[thema] = { t, nicht: [n,…] }` dazu. In `sync.js` gewinnt der neuere Zeitstempel.
  - Kein Abhaken: die Anzeige bleibt Wiederholungshilfe („zuletzt 5/19 offen“), wie CLAUDE.md es für `stat.kompakt` verlangt.
  - Vorlesen: `hoerSegmente()` erzeugt mit `luecken: true` ein Segment „Text bis zur Lücke → 3 s Pause → Lösung“. Das geht nur mit der Gerätestimme, weil die Profi-Aufnahmen durchgehend gesprochen sind.
- **Schwierigste Stelle:** Fettstellen sind teils sehr lang („**Bargeld und Bankguthaben**“). Ab etwa 6 Wörtern sollte die Lücke nur die ersten Wörter verdecken oder ganz wegfallen. Das löst eine Regel plus Blick auf die Testausgabe aller 1.328 Stellen.
- **Aufwand:** S (1 Tag).
  - **Risiken:** Manche Fettstellen sind schlechte Lücken. Abhilfe ist ein Ausschlussmuster `**!…**` für Stellen, die nie abgedeckt werden.
  - **Erfolg messen:** Abdeck-Öffnungen im Verhältnis zu Lese-Öffnungen und der Anteil „gewusst“ beim zweiten Durchgang eines Themas.
- **Erster Schritt:** In `kompaktInline` per Flag alle Fettstellen ohne „:“ durch `<span class="km-luecke">` mit Blur ersetzen und mit Tippen aufdecken. Noch ohne Wertung, direkt testbar.

### 3) „Korrekturtausch“: Klausursimulation schreiben und gegenseitig mit Rotstift korrigieren

- **Der Moment:** Die Lerngruppe (Mensa, Donnerstag) will eine Probeklausur schreiben. Heute korrigiert sich jede selbst und hakt im Bewertungsbogen großzügig ab. Das ist das größte Lernwirksamkeits-Loch der Klausursimulation: die Note ist reine Selbsteinschätzung.
- **Die Idee:**
  1. Anna startet eine 90-Minuten-Klausur und tippt „Mit Lerngruppe schreiben“. Ein Link bzw. QR-Code (`#ksim=bsr.90.<seed>`) gibt allen exakt dieselben Sachverhalte mit denselben Zahlen.
  2. Jede schreibt, getippt oder mit dem Stift.
  3. Nach der Abgabe kommt **„Zur Korrektur geben“**. Die App packt Lösung, Handschrift-Blätter und Kontrollzahlen in eine kleine Datei `Klausur_Anna.fwk` und öffnet das Teilen-Menü (AirDrop/WhatsApp).
  4. Ben öffnet die Datei in seiner App. Er sieht Annas Blätter neben Musterlösung und Bewertungsbogen, hakt die Merkmale ab und schreibt mit **Rotstift** direkt auf Annas Blätter: „§ 9b fehlt“, Kringel um die falsche AfA.
  5. „Korrektur zurückgeben“ erzeugt die Rückdatei. Anna sieht die Fremdnote neben ihrer Selbstnote, also „Selbst 9 P. · Ben 7 P.“.

  ```
  ┌ Korrektur von Ben ───────────────┐
  │ SV 3 Grundstück   6,5 / 12 P.    │
  │ [Annas Blatt mit roten Strichen] │
  │ ☑ wirtsch. Eigentum § 39 AO      │
  │ ☐ Grundschuldkosten keine AK  ✗  │
  │ Selbst: 9 P.  ·  Ben: 7 P.       │
  └──────────────────────────────────┘
  ```
- **Warum das stark ist:** Das trifft die Prüfungsrealität genau. Die echte Klausur wird von einem Fremden nach Bewertungsbogen korrigiert, mit Rotstift. Dazu kommt Lehren als Lernen: wer korrigiert, lernt die Bewertungslogik und den Punkteschlüssel. Kombiniert werden Klausursimulation, Handschrift, Duell-Link mit gleichem Startwert und das Teilen. Es braucht **keinen Server**.
- **Umsetzung in dieser Codebasis:**
  - `klausursim.js`: `ksimExport(k)` gibt JSON mit `{fach, minuten, seed, teile, antworten, hand, zahlen, modi, name}` zurück. `komprimieren()` nutzt `CompressionStream('deflate-raw')`. Handschrift ist schon kompakt (`handschrift.js`, Base64-VLQ).
  - Teilen über `navigator.share({ files: [new File([blob], "Klausur_Anna.fwk")] })`. Rückfallebene ist der Download über `dateiSpeichern()` (app.js).
  - Import über das vorhandene Datei-Eingabefeld wie bei `backupLaden`, an der Endung `.fwk` erkannt.
  - Neue Phase `ksim.phase = "fremdkorrektur"`: die Auswertungsansicht im Lesemodus. Bens Striche liegen als eigene Ebene `korrHand[id][j]` mit fester Farbe `--hs-rot` über Annas SVG; `HS.svg()` kann zwei Ebenen übereinander zeichnen.
  - In `stat.klausuren` kommt `fremd: { note, von }` dazu. In `sync.js` aufnehmen.
  - Gleicher Startwert für alle über einen Link nach dem Muster von `duell.js` (`#ksim=`) und `gleichbleibendErzeugen()`.
- **Schwierigste Stelle:** Teilen von Dateien über `navigator.share` klappt auf iOS und Android, auf Desktop-Firefox nicht. Und die PWA kann unter iOS nicht als Dateiziel registriert werden. Ben muss die Datei also über „Korrektur öffnen“ in der App wählen, nicht per Antippen in WhatsApp. Dieser Schritt muss im Ablauf klar erklärt werden.
- **Aufwand:** M–L (4–6 Tage).
  - **Risiken:** Viele handschriftliche Blätter können die Datei groß machen. Bei `MAX_ZEICHEN` je Seite sind 30 Blätter grob 300–600 KB, für AirDrop und WhatsApp unkritisch. Datenschutz: die Datei geht direkt von Person zu Person, nichts landet auf einem Server.
  - **Erfolg messen:** Anzahl `stat.klausuren` mit `fremd` und die Abweichung zwischen Selbst- und Fremdnote. Wird sie mit der Zeit kleiner, ist die Selbsteinschätzung besser kalibriert.
- **Erster Schritt:** Nur Export und Import einer abgegebenen Klausur als Datei, beim Empfänger im Lesemodus mit eigenem Bewertungsbogen zum Abhaken. Rotstift und gemeinsamer Startwert kommen danach.

### 4) „Denkfehler-Radar“: jede falsche Buchung bekommt eine Diagnose statt der Standarderklärung

- **Der Moment:** Jonas bucht „Telefon 166,60 an Bank 166,60“. Heute steht bei einer falschen Buchung zwar Zeile für Zeile, was fehlt („Konto richtig, Betrag falsch – erwartet 140,00“), aber nicht, **welcher Denkfehler** dahintersteckt. Die Erklärung darunter ist für alle gleich. Beim Härtetest (Privatkonten, absichtlich falsch) kam nur die Standarderklärung.
- **Die Idee:** Nach dem Prüfen erkennt die App das Fehlermuster und sagt es in einem Satz, mit Rückfrage:

  > **Brutto gebucht.** Du hast den Rechnungsbetrag inkl. USt als Aufwand gebucht. Welcher Teil davon ist für den Unternehmer gar kein Aufwand? → *Die Vorsteuer – sie wird vom Finanzamt erstattet (§ 15 Abs. 1 Nr. 1 UStG); Aufwand nur netto, vgl. § 9b Abs. 1 EStG.*

  Auf der Modulseite zeigt eine Karte **„Deine 3 Denkfehler“**, zum Beispiel „Brutto statt netto ×7 · Soll/Haben vertauscht ×4 · Entnahme statt Aufwand ×3“. Jeder Eintrag hat den Knopf „Gezielt üben“, der nur Vorlagen zieht, die diesen Fehler provozieren können. Gilt ein Fehler an 3 späteren Tagen in Folge als vermieden, verschwindet er mit einem Taler-Jubel.
- **Warum das stark ist:** Die Rückmeldung wird ab jetzt elaborativ und trifft den Kern: ein **falsches Modell** wird korrigiert, nicht ein einzelnes Ergebnis. Das geht ohne KI und regelbasiert, weil Buchungssätze maschinenlesbar sind (`pruefeBuchung` liefert `status`, `erwartet`, `fehlend`). Neu sind persönliche Fehlerkategorien statt Fehler pro Aufgabe. `stat.lern.falsch` kennt heute nur „Aufgabe X falsch“.
- **Umsetzung in dieser Codebasis:**
  - Neue Datei `web/js/denkfehler.js` (rein). `diagnose(frage, antwort, b)` liefert `[{id, text, rueckfrage, antwort, norm}]`. Regeln, alle aus Benutzerzeilen gegen Lösung ableitbar:
    - Seiten vertauscht: alle Konten richtig, Seiten gespiegelt.
    - Brutto statt netto: der Betrag eines Aufwands- oder WEK-Kontos ist gleich der Bruttosumme.
    - Vorsteuer bzw. USt fehlt oder ist verwechselt.
    - USt mit 19 % vom Brutto statt 19/119 gerechnet.
    - Privat statt betrieblich: Privatentnahme statt Aufwand und umgekehrt.
    - Verwechslungspaare aus `konten.js`: WBK/WEK, Erlösschmälerungen/Nachlässe, Forderungen aLuL/sonstige Forderungen, ARAP/sonstige Forderung.
    - Abschlussrichtung GuV/Eigenkapital verkehrt.
  - Für Zahlaufgaben gibt es eigene Regeln, zum Beispiel volle Jahres-AfA statt zeitanteilig: Eingabe = Lösung × 12 / Monate.
  - Aufruf in `auswertungInhalt()` (app.js), wenn `typ` buchung oder zahl ist und die Antwort falsch war.
  - In `stat` kommt `denkfehler[id] = { n, tage: [..], behoben }` dazu, Zähler in `sync.js` pro Gerät zusammenführen wie `proThema`.
  - „Gezielt üben“ nutzt den vorhandenen `filter` in `fragen()` (katalog.js) mit dem Prädikat „Lösung enthält Vorsteuer/Privat…“.
- **Schwierigste Stelle:** Fehldiagnosen vermeiden. Lösung: ein Test, der für alle 737 Vorlagen die Musterlösung systematisch verfälscht (Seiten tauschen, Brutto einsetzen). Jede Verfälschung muss genau ihre Regel auslösen, die Musterlösung keine.
- **Aufwand:** M (3 Tage für 8–10 Regeln mit Test).
  - **Risiken:** Bei Mehrfachfehlern höchstens 2 Diagnosen zeigen.
  - **Erfolg messen:** Wiederholungsrate desselben Denkfehlers pro 100 Buchungen über 2 Wochen.
- **Erster Schritt:** Nur die zwei häufigsten Regeln (Seiten vertauscht, brutto statt netto) als Zeile über der Musterlösung zeigen, noch ohne `stat`.

### 5) „Griffregister“: Training fürs Gesetzbuch, das einzige Hilfsmittel in der Klausur

- **Der Moment:** In der echten Klausur liegen nur die Textausgaben auf dem Tisch. Punkte gibt es für die **exakte Fundstelle** („§ 6 Abs. 2 S. 1 EStG“), und Zeit verliert man beim Blättern. Die App zeigt Normtexte heute auf Antippen. Das genaue Zitieren und schnelle Finden übt sie nicht.
- **Die Idee:** Es gibt zwei Teile.
  1. **Fundstellen-Sprint (in der App):** 10 Runden zu je 12 Sekunden. Die App zeigt einen Halbsatz aus einer Musterlösung, zum Beispiel „Grundschuldkosten sind keine Anschaffungskosten“. Gesucht ist die tragende Norm. Eingegeben wird sie über Chips statt Tastatur: `[HGB][EStG][UStG][AO] · § [255] · Abs. [1] · S. [1]`. Bewertet wird gestuft: § richtig = ½, mit Absatz und Satz = voll. Danach öffnet sich der Gesetzestext mit Markierung des richtigen Satzes.
  2. **Dein Griffregister (auf Papier):** Aus dem Lernstand (Fehler, Klausurgewicht aus `KLAUSUR_*`) entsteht eine **Druckseite**. Sie listet die 20–30 Paragrafen, die du in der Textausgabe als Reiter brauchst. Jeder Reiter hat eine Beschriftung („§ 255 HGB AK/HK“) in deiner Gesetzesfarbe aus `gesetzfarben.js`, die Reihenfolge entspricht der Textausgabe. Dazu kommt eine **Markierliste**: welche Sätze du gelb anstreichen solltest, aus `markierungen.js` über alle geübten Aufgaben zusammengezählt. Die Seite wird über Drucken als A4-Bogen zum Ausschneiden oder für Etiketten ausgegeben.
- **Warum das stark ist:** Das trifft die Prüfungsrealität genau („Gesetzestexte als einziges Hilfsmittel“) und holt etwas aus der App heraus in die echte Prüfungsumgebung. Die Daten sind schon da: jede Aufgabe trägt `normen` (z. B. `"AO 79 1"`), `MARKIERUNG` nennt die tragenden Sätze, `saetze()` und `zitate()` zerlegen Normen bis auf Satzebene.
- **Umsetzung in dieser Codebasis:**
  - Neue Datei `web/js/griffregister.js`. `sprintAufgaben(fach, r)` zieht Paare aus (Satz der Erklärung, zitierte Norm) aus `ALLE` über `zitate()` in `oer/normtext.js`. Es kommen nur Sätze mit genau einem Zitat in Frage, Zitat und Gesetzesname werden im Satz geschwärzt.
  - `registerListe(stat, fach)` gewichtet Normen nach Fehlerhäufigkeit (`stat.lern[id].falsch`) und Klausurgewicht.
  - Ansicht über eine Kachel im Reiter „Normen/Nachschlagen“. Druck-CSS `@media print` in `style.css`. Ergebnis des Sprints über `belohnen()`, neue XP-Quelle „Fundstelle“ in XP-Matrix und `QUELLEN`.
- **Schwierigste Stelle:** Die Satzgenauigkeit. Zitate wie „§ 6 Abs. 1 Nr. 1 S. 2“ müssen gegen `normen.js` korrekt aufgelöst werden. CLAUDE.md warnt schon vor Zitaten mit mehreren Paragrafen, deshalb nur Einzelzitate verwenden. Zum Griffregister gehört der Hinweis „Vorher prüfen, was eure Prüfungsordnung an Reitern und Markierungen erlaubt“.
- **Aufwand:** M (Sprint 2 Tage, Druckseite 1–2 Tage).
  - **Risiken:** Fehlerhafte Zuordnung Satz → Norm. Abhilfe ist ein Test, dass jede Sprintfrage in `normen.js` auflösbar ist.
  - **Erfolg messen:** Sprint-Trefferquote auf Satzebene und Zeit je Fundstelle über die Wochen.
- **Erster Schritt:** Nur den Sprint für BilR Teil II mit den `normen`-Angaben der Vorlagen bauen, also die Paragrafennummer zur Aufgabe nennen. Ohne Druckseite.

---

## 2. Schnelle Gewinne (Aufwand S)

1. **Laufende Übung/Klausur sichern (Pflicht, siehe Befund K1).** `state.sitzung` wie `ksimSichern()` nach jeder Antwort nach `bsr.sitzung` schreiben und beim Start „Klausur fortsetzen (noch 31:20)“ anbieten. Gleiches Muster wie `bsr.ksim`/`bsr.otest` (app.js:672–684).
2. **Bildschirm bleibt an.** `navigator.wakeLock.request("screen")` während Klausursimulation, Generalprobe, Handschrift-Editor und Vorlesen mit Gerätestimme, bei `visibilitychange` neu anfordern. Ab iOS 16.4 unterstützt. Heute sperrt das iPad mitten in der 180-Minuten-Klausur. Ort: `AKTIONEN.ksimBeginnen`, `otStart`.
3. **Punkte-Hebel auf dem Klausur-Tab.** Pro Thema: Klausurminuten (aus `SV_BSR[].min` bzw. `KLAUSUR_*`-Schwerpunkten) × (1 − Trefferquote aus `stat.proThema`). Daraus eine Karte „Die nächste Stunde bringt am meisten bei: Grundstückserwerb (60 Min. in der Klausur, du 48 %)“ mit Knopf zum Üben. Das ist eine Zeile Rechnung in `termine.js` neben `proTag()`.
4. **Fristen am Kalenderblatt antippen.** AO-Datumsaufgaben (Baustein `D` in `ao/hilfen.js`) wahlweise als Monatsblatt statt 4 Optionen. Man tippt das Fristende an, danach zeigt die Lösung die Kette Bekanntgabe → +4 Tage → Fristbeginn → Ende → Verschiebung (§ 108 Abs. 3 AO) farbig im Kalender. Abruf statt Wiedererkennen, und es entspricht dem Rechnen in der Klausur.
5. **„Wie sicher bist du?“ vor dem Prüfen.** Drei kleine Chips (sicher / unsicher / geraten). Ist eine Antwort „richtig, aber geraten“, rückt die Karte in der Lernkartei nicht vor (`planen()` in `wiederholung.js` bekommt einen Parameter). In der Statistik ein Kalibrierungsbalken: „Wenn du ‚sicher‘ sagst, liegst du zu 71 % richtig.“ Das deckt Selbstüberschätzung vor dem Vortest auf.
6. **Kalender-Export (.ics) statt Push.** Klausurtermine aus `termine.js` plus eine tägliche Lernerinnerung (VALARM, Uhrzeit wählbar, Text „Taler: X Wiederholungen warten“ mit Stand beim Export) als `.ics` über `dateiSpeichern()`. Damit erinnert der Systemkalender, ohne Server und ohne Push-Schlüssel.
7. **Foto der Papierlösung in der Klausursimulation.** Wer auf echtem Papier schreibt, tippt in der Auswertung „Blätter fotografieren“ (`<input type="file" accept="image/*" capture="environment">`). Die Bilder werden verkleinert in IndexedDB abgelegt (Muster `bildspeicher.js`) und neben Musterlösung und Bewertungsbogen gezeigt. So passt auch Papier zur Prüfungsrealität.
8. **Fehler-Duell.** „Schick mir deine 10 Fehler“: `duell.js` mit `ids` aus `fehlerKarten()` statt Zufallsthemen. Die Freundin löst genau die Aufgaben, an denen du gescheitert bist, das Ergebnis kommt zurück. Zielgerichtet und sozial, ohne Server.
9. **Zeitwächter je Sachverhalt.** In der Klausursimulation zeigt jeder SV-Kopf ein kleines Zeitbudget („15 Min. – du bist seit 19 Min. hier“, erfasst über IntersectionObserver auf `.ks-sv`). In der Auswertung steht „Zeit je Sachverhalt“ gegen die Empfehlung. Zeitmanagement ist der häufigste Klausurkiller.
10. **Klausurtempo in der Übung.** Bearbeitungszeit je Aufgabe messen (`x.zeiten[i]` in der Sitzung, in `stat.log` den Tageswert je Thema ergänzen). Rückmeldung zum Beispiel: „Skonto-Buchungen: Ø 2:10 – Klausurtakt ca. 1:00.“ Der Takt kommt aus 0,5 Punkten pro Minute (CLAUDE.md, Klausursimulation).
11. **Nachbereitung nach der echten Klausur.** Nach einem Termin aus `stat.termine` fragt Taler am Folgetag: „Wie lief's? Tippe, was schwer war.“ Zur Auswahl steht die Themenliste. Die gewählten Themen werden in der Lernkartei auf Fach 1 gesetzt, dazu ein 7-Tage-Plan. Das hilft in einem emotionalen Moment, in dem heute niemand die App öffnet.
12. **Weiter, wo man war.** Nach Neuladen während Klausursimulation oder Generalprobe landet man heute auf der Startseite (siehe Befund K5). Gibt es beim Start `bsr.ksim`/`bsr.otest` mit Phase „laufend“, direkt ein Banner „Klausur läuft – fortsetzen“ anzeigen.

---

## 3. Wildcards

1. **„Sokratischer Taler“, vorab erzeugt.** Ein Build-Skript `tools/rueckfragen.mjs` (nach dem Muster von `vorlesen_audio.mjs`, Schlüssel nur als Netzwerk-Secret) lässt ein Sprachmodell für jede der 737 Vorlagen die 3 wahrscheinlichsten Fehlannahmen erzeugen, jeweils mit einer Rückfrage und einer Antwort mit Norm. Das Ergebnis landet als statisches `web/js/rueckfragen.js`. Zusammen mit dem Denkfehler-Radar entsteht ein Tutor, der offline läuft und nichts kostet. **Machbarkeit:** technisch leicht (1 Tag Skript). Der eigentliche Aufwand ist die fachliche Durchsicht von etwa 2.200 Rückfragen, realistisch nur modulweise und mit Stichproben. Rechtsstand 2026 muss vorgegeben werden.
2. **„Mensa-Quiz“ live.** Eine Person startet auf dem Tablet eine Runde mit 6-stelligem Code, alle anderen spielen am Handy mit. Gespielt werden Buchungssätze und Fristen auf Zeit, die Rangliste läuft live mit Talern im eigenen Outfit. Technik: Supabase Realtime (Broadcast-Kanal mit anon-Key), Fragen aus `gleichbleibendErzeugen()` mit gemeinsamem Startwert, sodass nur Antworten übertragen werden. **Machbarkeit:** M–L. Realtime-Kontingent und Missbrauchsschutz (Kanalname = Zufallscode, Ablauf nach 2 h, max. 30 Teilnehmende) prüfen, keine personenbezogenen Daten außer dem Spitznamen.
3. **Kursraum für Lehrende.** Eine Dozentin erstellt ein „Aufgabenblatt“ (Vorlagen-IDs plus Startwert) als Link. Die Studierenden lösen es, anonymisierte Ergebnisse je Aufgabe (nur Zähler: richtig/falsch/häufigste Denkfehler-ID) laufen über eine Supabase-RPC in eine Klassenstatistik. Im Unterricht sieht man dann: „62 % buchen die Skonto-Vorsteuer falsch.“ **Machbarkeit:** L, braucht neue RPCs mit Rate-Limit. Datenschutzfreundlich, weil keine Namen übertragen werden. Das öffnet die App für Ausbildungsleitungen (BilBf).

---

## 4. Härtetest-Befunde

Fachlich habe ich einen angreifbaren Fall gefunden, aber keinen Rechenfehler. Kritisch ist ein Datenverlust beim Neuladen.

| # | Schweregrad | Befund | Reproduktion / Fundstelle |
|---|---|---|---|
| F1 | **mittel (fachlich)** | **`pr-kauf-fall`, Fall „Rahmenriss“:** Als richtig gilt „Zunächst Nacherfüllung (§ 439 BGB)“. Bei **arglistig verschwiegenem** Mangel ist die Fristsetzung zur Nacherfüllung nach h. M. und BGH in der Regel entbehrlich (§ 323 Abs. 2 Nr. 3, § 281 Abs. 2 BGB; BGH, Urt. v. 08.12.2006 – V ZR 249/05). Der Käufer kann also sofort zurücktreten oder mindern. Außerdem kann ein Privatverkäufer einen Rahmenriss praktisch nicht nachbessern. Die Option „Rücktritt oder Minderung“ wird aber als falsch gewertet. | `pr/aufgaben2.js:259`. Vorschlag: „Rücktritt oder Minderung“ als richtig werten (Erklärung mit § 444 und § 323 Abs. 2 Nr. 3 BGB) oder den Sachverhalt ohne Arglist bauen. Bitte vorher am Gesetzestext und an der Skriptlinie prüfen. |
| K1 | **kritisch (Datenverlust)** | **Laufende Übung bzw. Klausur (Zeitlimit-Modus) überlebt kein Neuladen.** `state.sitzung` liegt nur im Speicher, es gibt kein `bsr.sitzung` und kein `pagehide`. Im Klausurmodus werden die Antworten erst bei `abgeben()` bewertet, also ist eine 45-Minuten-Klausur komplett weg. iOS beendet PWAs im Hintergrund häufig (kurz WhatsApp öffnen genügt). | USt → Klausur → „Klausur starten“ → 3 Antworten → Neuladen. Danach keine Klausur offen, kein Eintrag in `stat.klausuren` (`lauf6/03_nach_reload.png`). app.js:520–660. Klausursimulation und Generalprobe sichern dagegen korrekt (`bsr.ksim`, `bsr.otest`). |
| K2 | klein | **Texte, die auf einen vorherigen Fall verweisen**, obwohl Fälle einzeln zufällig gezogen werden: „**Dieselbe** Tara (17) …“ (die Genehmigung nach § 112 BGB steht nur im Geschwisterfall) und „**Dieselbe** Kfz-Werkstatt in Kiel …“. | `ao/aufgaben.js:140`, `ust/aufgaben.js:167`. Aufgabe `ao-handlungsfaehig-fall` öfter ziehen, der Text steht dann ohne Bezug. |
| K3 | klein | **Lernkalender zeigt die aktuellen Wochen nicht.** Die Heatmap ist ein horizontaler Scroller, der bei `scrollLeft = 0` beginnt, also bei Mai. Oktober und November liegen bei 320 und 390 px außerhalb (scrollWidth 423 gegen 258 bzw. 328 sichtbar). | Statistik öffnen, mit vollem Lernstand (`lauf5/heat_390.png`). `statistikansicht.js:80`. Nach dem Rendern `scrollLeft = scrollWidth` setzen. |
| K4 | klein | **Präsentkorb mit unrealistischen Einzelpreisen** (Tageszeitung 24 €, Weidenkorb 13 €). Fachlich richtig gerechnet (10,28 €), aber man stolpert darüber. | `ust/aufgaben.js` (`ust-korb`, Preise je Ware zufällig). Preisspannen je Ware hinterlegen. |
| K5 | klein | **Nach Neuladen in Klausursimulation oder Generalprobe** landet man auf der Startseite. Fortsetzen geht nur über Modul → Klausur-Tab. Die Daten bleiben erhalten (geprüft: 117 Strichpfade nach Neuladen wiederhergestellt). | `lauf3`, `lauf2/12_ot_nach_reload.png`. Siehe Schneller Gewinn 12. |
| L1 | Lernwirksamkeit | **Bewertungsbogen der Klausursimulation ist reine Selbstbewertung.** Der Test „0 von 33 Punkten“ ohne jedes Abhaken zeigt, dass die Note vollständig von der Ehrlichkeit abhängt. | `lauf3/07_auswertung.png`. Siehe Idee 3 Korrekturtausch und Schneller Gewinn 5. |
| L2 | Lernwirksamkeit | **Rückmeldung bei falscher Buchung:** Was falsch ist, wird Zeile für Zeile gezeigt, aber nicht warum. Die Erklärung ist für alle Fehler gleich. | `lauf1/04_feedback_1.png`. Siehe Idee 4. |
| L3 | Lernwirksamkeit | **Kompaktwissen ist nur Lesen bzw. Hören** (Wiedererkennen), und Karteikarten laufen über Umdrehen und Selbstbewertung. Es gibt keinen Abruf aus dem Überblick heraus. | Siehe Idee 2. |

**Ohne Befund:**
- `node --test web/tests/kern.test.mjs`: 53/53 bestanden.
- `tools/stichworte_pruefen.mjs`: 368 Aufgaben, 0 Probleme.
- `tools/screens.mjs` für alle 7 Module, hell und dunkel: keine JS-Fehler.
- In allen eigenen Durchläufen kein einziger `pageerror`.
- Keine horizontale Seitenverschiebung bei 320, 768 und 1280 px.
- Offline mit Service Worker: Start, Modulwechsel, AO-Normen und Vorlesen mit der Gerätestimme funktionieren.
- Zurück-Geste in der Klausur fragt korrekt nach.
- Tabwechsel mit vollem Lernstand dauert etwa 3 ms.

**Nachgerechnet, alles richtig:**
- **BilR:** Anlagengitter, GWG/Sammelposten, Grundstücks-AK inkl. Grundschuldkosten, ARAP inkl. 800-€-Grenze, Anlagenabgang, Kassenbericht, Lohnbuchung und Grundstücks-SV der Klausursimulation.
- **ESt:** Tarif 2026 (Grundtarif und Splitting), Versorgungsfreibetrag 2024 (13,6 %/1.020 €/306 €), Entfernungspauschale 0,38 € ab km 1, Jobticket-Kürzung, 0,03-%-Regel, Verpflegung bei Mahlzeitengestellung.
- **USt:** Steuersätze (Restaurant 7 % ab 2026), Anzahlung, § 14c, Flächenschlüssel, Ort Streaming-Unterricht.
- **AO:** Wiedereinsetzungsfrist, Verspätungszuschlag.
- **ÖR:** Wahlperiode, Zusammentritt, Sitzverteilung.

---

## 5. Was ich bewusst verworfen habe

- **Echte Push-Benachrichtigungen:** Auf iOS braucht Web-Push einen Server mit VAPID-Schlüssel und ein Sendesystem. Das gibt es bei GitHub Pages nicht. Die `.ics`-Erinnerung (Schneller Gewinn 6) erreicht 80 % davon ohne Infrastruktur.
- **Live-KI-Tutor bzw. Chatbot in der App:** Der API-Schlüssel dürfte nicht in die App, eine Edge Function bringt laufende Kosten und Missbrauchsrisiko. Die vorab erzeugte Variante (Wildcard 1) bringt den Nutzen ohne beides.
- **Handschrift-Erkennung (OCR) zur automatischen Korrektur:** Für deutsche Handschrift auf iOS im Browser gibt es nichts Zuverlässiges offline, und Fehlkorrekturen wären schlimmer als keine. Fremdkorrektur (Idee 3) ist ehrlicher.
- **Buchungssätze per Spracheingabe:** Kontennamen wie „Erlösschmälerungen“ oder „ARAP“ werden schlecht erkannt. Tippen ist schneller als Korrigieren. Sprache lohnt sich nur für „gewusst/nicht“ (Idee 1).
- **Bilanz-Puzzle nach § 266 HGB:** `bilr/gliederung.js` zeigt das Schema schon als Grafik. Ein Puzzle wäre vor allem Wiedererkennen mit wenig Klausurbezug (§ 266 ist in der Klausur Nebensache).
- **Mehr Erfolge, Badges und Garderobe:** Das System ist schon groß (Level bis 100, Münzalbum, Masken). Der nächste Motivationsschub kommt aus sichtbarem Lernfortschritt (Denkfehler verschwinden, Fremdnote steigt), nicht aus weiteren Kosmetikartikeln.
- **Share Target (Text aus Goodnotes/Notizen an die App schicken):** iOS unterstützt `share_target` für PWAs nicht, und die Goodnotes-Lernsets lassen sich schon importieren.
- **Allgemeiner „Lernplan-Generator“ mit Tagesplänen:** `proTag()` und der Countdown decken das ab. Neu und besser ist der Punkte-Hebel (Schneller Gewinn 3), der sagt, *welches* Thema am meisten Punkte bringt.

---

## Anhang: 32 Rohideen mit Bewertung (W = Wirkung, N = Neuheit, P = Passung, A = Aufwand)

| # | Rohidee | Linse | W | N | P | A | weiter? |
|---|---|---|---|---|---|---|---|
| 1 | Hör-Abfrage mit Kopfhörertasten | 1, 4, 5 | 5 | 5 | 5 | M | **Top 1** |
| 2 | Kompaktwissen abdecken (Cloze) | 3, 5, 10 | 5 | 4 | 5 | S | **Top 2** |
| 3 | Korrekturtausch mit Rotstift | 2, 6, 3 | 5 | 5 | 4 | M–L | **Top 3** |
| 4 | Denkfehler-Radar (regelbasiert) | 3, 7, 8 | 5 | 4 | 5 | M | **Top 4** |
| 5 | Fundstellen-Sprint und Griffregister zum Drucken | 2, 5 | 4 | 5 | 5 | M | **Top 5** |
| 6 | Punkte-Hebel/Notenprognose | 7 | 4 | 4 | 5 | S | Schnell 3 |
| 7 | Laufende Klausur sichern | – | 5 | 1 | 5 | S | Befund/Schnell 1 |
| 8 | Wake Lock | 4 | 3 | 3 | 5 | S | Schnell 2 |
| 9 | Fristen am Kalenderblatt | 2, 3 | 4 | 4 | 5 | S | Schnell 4 |
| 10 | Sicherheits-Chips/Kalibrierung | 3 | 4 | 4 | 4 | S | Schnell 5 |
| 11 | .ics-Erinnerung | 4 | 3 | 5 | 4 | S | Schnell 6 |
| 12 | Foto der Papierlösung | 2, 4 | 3 | 5 | 4 | S | Schnell 7 |
| 13 | Fehler-Duell | 6, 5 | 4 | 4 | 5 | S | Schnell 8 |
| 14 | Zeitwächter je SV | 2 | 4 | 4 | 5 | S | Schnell 9 |
| 15 | Klausurtempo je Aufgabentyp | 7, 2 | 4 | 4 | 4 | S | Schnell 10 |
| 16 | Nachbereitung nach echter Klausur | 1, 8 | 4 | 4 | 4 | S | Schnell 11 |
| 17 | Fortsetzen-Banner | – | 3 | 1 | 5 | S | Schnell 12 |
| 18 | Vorab erzeugte Rückfragen (LLM) | 10, 3 | 5 | 4 | 4 | L | Wildcard 1 |
| 19 | Mensa-Quiz live (Supabase Realtime) | 6 | 4 | 5 | 3 | L | Wildcard 2 |
| 20 | Kursraum für Lehrende | 9 | 4 | 5 | 3 | L | Wildcard 3 |
| 21 | Fehler-Podcast vor dem Einschlafen (eigene Fehler vorlesen) | 1, 5 | 4 | 3 | 5 | S | in Idee 1 aufgegangen |
| 22 | „Erklär es Taler“: eigene Sprachaufnahme, Stichworte per Spracherkennung abhaken | 3 | 4 | 4 | 3 | M | verworfen (Datenschutz/Erkennung; Teil in Idee 1) |
| 23 | Gutachten-Leiter für PR/AO (Jurafuchs-Prinzip: Fall in Ja/Nein-Schritten) | 10, 2 | 4 | 3 | 4 | M | knapp unter Top 5. Nah am Lernpfad, Neuheit nur 3 |
| 24 | Exakten Satz im Normtext zitieren | 2 | 4 | 4 | 5 | S | in Idee 5 aufgegangen |
| 25 | Letzte 24 Stunden: Zahlen-und-Fallen-Blitz | 1, 8 | 3 | 3 | 5 | S | verworfen (Countdown zeigt am Vortag schon das Kompaktwissen) |
| 26 | Manifest-Shortcuts (5-Minuten-Buchung) | 4 | 2 | 3 | 4 | S | verworfen (iOS ignoriert sie) |
| 27 | Buchungssatz per Sprache | 4 | 2 | 4 | 2 | M | verworfen |
| 28 | Bilanz-Puzzle § 266 | 3 | 2 | 2 | 4 | M | verworfen |
| 29 | „Erfinde den Fall“ zu einem Buchungssatz, Lerngruppe bewertet | 3, 6 | 3 | 4 | 3 | M | verworfen (Prüfung nur durch Menschen möglich, wenig Nutzung erwartet) |
| 30 | Aufwärmrunde am Klausurmorgen (5 gefestigte Aufgaben) | 8 | 3 | 3 | 5 | S | verworfen (W + N < 8) |
| 31 | Generalprobe automatisch an eingetragene Testtermine koppeln | 1, 2 | 3 | 3 | 4 | S | verworfen (Inhalte gibt es nur für BilR Teil I) |
| 32 | Push-Benachrichtigungen | 4 | 3 | 1 | 1 | L | verworfen |

Recherche (Linse 10):
- Anki und AMBOSS (Cloze-Karten, Verknüpfung von Karte und Nachschlagewerk) → Idee 2 und 5.
- Brilliant („learn by doing“, sofortige Rückmeldung zu konkreten Fehlern) → Idee 4.
- Jurafuchs (Fälle als Kette kleiner Entscheidungen, Gutachtenstil) → Rohidee 23.

Quellen: [AMBOSS & Anki](https://www.amboss.com/de/anki-download), [AMBOSS: Anki lernen mit Karteikarten](https://www.amboss.com/de/wissen/anki-lernen-mit-karteikarten/), [Brilliant: How Brilliant teaches](https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/), [Jurafuchs im App Store](https://apps.apple.com/DE/app/id1276099340), [Jurafuchs: Sprache im Gutachtenstil](https://wissen.jurafuchs.de/jq8dv9k/sprache-im-gutachtenstil).

