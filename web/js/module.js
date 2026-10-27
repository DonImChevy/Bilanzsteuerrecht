// Module (Fächer) – Studium (Grundstudium I) und Ausbildung (FTA I), aktive und angekündigte.
// rolle: "studium" (Standard) oder "ausbildung" – auf der Startseite werden nur die Module der gewählten Rolle gezeigt.
// farbe = Akzentfarbe des Moduls (hell/dunkel), icon = Name in ICONS (ui.js).

export const MODULE = [
  { id: "bsr", titel: "Bilanzrecht", kurz: "BilR", unter: "Bilanzsteuerrecht · Teil I und II", icon: "tkonto", farbe: "#4f46e5", farbeDunkel: "#8b8cf8" },
  { id: "oer", titel: "Öffentliches Recht", kurz: "ÖR", unter: "Staatsrecht · GG, BWahlG, PartG", icon: "saeulen", farbe: "#e11d48", farbeDunkel: "#fb7185" },
  { id: "est", titel: "Einkommensteuer", kurz: "ESt", unter: "EStG · Grundstudium I", icon: "person", farbe: "#059669", farbeDunkel: "#34d399" },
  { id: "ust", titel: "Umsatzsteuer", kurz: "USt", unter: "UStG · Grundstudium I", icon: "prozent", farbe: "#d97706", farbeDunkel: "#fbbf24" },
  { id: "bbf", titel: "Bilanz und Buchführung", kurz: "BilBf", unter: "Buchführung und Bilanzwesen · FTA I", icon: "tkonto", farbe: "#0e7490", farbeDunkel: "#22d3ee", rolle: "ausbildung" },
  { id: "ao", titel: "Abgabenordnung", kurz: "AO", unter: "Verfahrensrecht", icon: "akte", farbe: "#7c3aed", farbeDunkel: "#b794f6", bald: true },
  { id: "bewr", titel: "Bewertungsrecht", kurz: "BewR", unter: "BewG", icon: "haus", farbe: "#0284c7", farbeDunkel: "#38bdf8", bald: true },
  { id: "pr", titel: "Privatrecht", kurz: "PrivR", unter: "BGB, HGB", icon: "waage", farbe: "#c026d3", farbeDunkel: "#e879f9", bald: true },
];
export const MODUL = Object.fromEntries(MODULE.map((m) => [m.id, m]));
export const rolleVon = (m) => m.rolle || "studium";
export const aktiveModule = (rolle = null) => MODULE.filter((m) => !m.bald && (!rolle || rolleVon(m) === rolle));
export const moduleDerRolle = (rolle) => MODULE.filter((m) => rolleVon(m) === rolle);
