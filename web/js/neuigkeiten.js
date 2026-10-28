// Neuigkeiten: erscheinen beim ersten Start nach einem Update (einmal, wie die Einführung des Levelsystems).
// Neueste zuerst. Bei jeder für Nutzer sichtbaren Änderung einen Eintrag oben anfügen (neue, eindeutige id).
// punkte: [icon, Titel, Text, Aktion (data-a der App, optional), Wert (data-v, optional)]

export const NEUIGKEITEN = [
  {
    id: "2026-10-garderobe",
    datum: "2026-10-28",
    titel: "Garderobe, Countdown und mehr",
    punkte: [
      ["muenze", "Taler als Währung", "Für je 10 XP bekommst du einen Taler – auch rückwirkend. Damit kaufst du in der Garderobe Hüte, Brillen, Metalle, Auren und App-Hintergründe.", "garderobe"],
      ["kalender", "Klausur-Countdown", "Trag deine Klausurtermine ein: Die Startseite zählt die Tage herunter und zeigt, wie viel du pro Tag schaffen solltest.", "termine"],
      ["diagramm", "Rückblick und Statistik", "Wochen- und Monatsrückblick, Lernkalender, deine beste Lernzeit und Trefferquoten je Modul.", "rueckblick", "woche"],
      ["blitz", "Duell", "Fordere jemanden per Link heraus: dieselben 10 Aufgaben für beide – wer mehr richtig hat, gewinnt.", "duell"],
      ["pokal", "Lerngruppe mit Rangliste", "Gründe eine Gruppe mit deinem Kurs und seht, wer diese Woche die meisten XP sammelt.", "rangliste"],
      ["einstellungen", "Startseite anpassen", "Bereiche verschieben und ausblenden – Level und Taler bleiben oben.", "startAnpassen"],
      ["export", "Backup", "Lernstand als Datei sichern und wiederherstellen – in den Einstellungen unter „Datensicherung“.", "einstellungen"],
      ["sterne", "Neuigkeiten", "Nach jedem Update zeigt dir Taler hier, was neu ist. Später wieder aufrufen: Einstellungen → Neuigkeiten."],
    ],
  },
  {
    id: "2026-10-level",
    datum: "2026-10-28",
    titel: "Level und Erfolge",
    punkte: [
      ["pokal", "Levelsystem", "Jede Aufgabe bringt XP – Level 1 bis 100, Ränge von Kupfer bis Goldener Taler.", "level"],
      ["stern", "Münzalbum", "55 Erfolge in Stufen: richtige Aufgaben, Serien, Buchungssätze am Stück, Lerntage …", "level"],
    ],
  },
];

export const NEUESTE = NEUIGKEITEN[0].id;

/** Einträge, die seit `gesehen` dazugekommen sind (ohne Kennung: nur der neueste). */
export function ungesehen(gesehen) {
  if (!gesehen) return [NEUIGKEITEN[0]];
  const i = NEUIGKEITEN.findIndex((n) => n.id === gesehen);
  return i < 0 ? [NEUIGKEITEN[0]] : NEUIGKEITEN.slice(0, i);
}
