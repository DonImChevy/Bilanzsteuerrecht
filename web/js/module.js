// Module (Fächer) des Grundstudiums I – aktive und angekündigte.
// farbe = Akzentfarbe des Moduls (hell/dunkel), icon = Name in ICONS (ui.js).

export const MODULE = [
  { id: "bsr", titel: "Bilanzrecht", kurz: "BilR", unter: "Bilanzsteuerrecht · Buchführung Teil I", icon: "tkonto", farbe: "#4f46e5", farbeDunkel: "#8b8cf8" },
  { id: "oer", titel: "Öffentliches Recht", kurz: "ÖR", unter: "Staatsrecht · GG, BWahlG, PartG", icon: "saeulen", farbe: "#e11d48", farbeDunkel: "#fb7185" },
  { id: "est", titel: "Einkommensteuer", kurz: "ESt", unter: "EStG · Grundstudium I", icon: "person", farbe: "#059669", farbeDunkel: "#34d399" },
  { id: "ust", titel: "Umsatzsteuer", kurz: "USt", unter: "UStG · Grundstudium I", icon: "prozent", farbe: "#d97706", farbeDunkel: "#fbbf24" },
  { id: "ao", titel: "Abgabenordnung", kurz: "AO", unter: "Verfahrensrecht", icon: "akte", farbe: "#7c3aed", farbeDunkel: "#b794f6", bald: true },
  { id: "bewr", titel: "Bewertungsrecht", kurz: "BewR", unter: "BewG", icon: "haus", farbe: "#0284c7", farbeDunkel: "#38bdf8", bald: true },
  { id: "pr", titel: "Privatrecht", kurz: "PrivR", unter: "BGB, HGB", icon: "waage", farbe: "#c026d3", farbeDunkel: "#e879f9", bald: true },
];
export const MODUL = Object.fromEntries(MODULE.map((m) => [m.id, m]));
export const aktiveModule = () => MODULE.filter((m) => !m.bald);
