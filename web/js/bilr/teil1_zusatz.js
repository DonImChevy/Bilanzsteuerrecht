// Bilanzsteuerrecht Teil I – Ergänzungen nach den Folien Teil I (Buchführung): Buchungssätze deuten.
import { auswahl } from "../kern.js";
import * as G from "../geld.js";

// [Soll, Haben, Was ist passiert?, Art des Soll-Kontos, Art des Haben-Kontos]
const SAETZE = [
  ["Waren", "Verbindlichkeiten aus L.u.L.", "Waren wurden auf Ziel eingekauft.", "Aktivkonto – Zunahme", "Passivkonto – Zunahme"],
  ["Bank", "Kasse", "Bargeld wurde auf das Geschäftskonto eingezahlt.", "Aktivkonto – Zunahme", "Aktivkonto – Abnahme"],
  ["Verbindlichkeiten aus L.u.L.", "Waren", "Waren wurden an den Lieferer zurückgesandt.", "Passivkonto – Abnahme", "Aktivkonto – Abnahme"],
  ["Kasse", "Bank", "Bargeld wurde vom Geschäftskonto abgehoben.", "Aktivkonto – Zunahme", "Aktivkonto – Abnahme"],
  ["Verbindlichkeiten aus L.u.L.", "Bank", "Eine Lieferantenrechnung wurde per Überweisung bezahlt.", "Passivkonto – Abnahme", "Aktivkonto – Abnahme"],
  ["Bank", "Forderungen aus L.u.L.", "Ein Kunde hat seine Rechnung per Überweisung bezahlt.", "Aktivkonto – Zunahme", "Aktivkonto – Abnahme"],
  ["Darlehensverbindlichkeiten", "Bank", "Ein Darlehen wurde per Überweisung getilgt.", "Passivkonto – Abnahme", "Aktivkonto – Abnahme"],
  ["Bank", "Darlehensverbindlichkeiten", "Ein Bankdarlehen wurde aufgenommen und gutgeschrieben.", "Aktivkonto – Zunahme", "Passivkonto – Zunahme"],
  ["Betriebs- und Geschäftsausstattung", "Bank", "Büromöbel wurden gegen Banküberweisung gekauft.", "Aktivkonto – Zunahme", "Aktivkonto – Abnahme"],
  ["Verbindlichkeiten aus L.u.L.", "Darlehensverbindlichkeiten", "Eine Lieferantenschuld wurde in ein Darlehen umgewandelt.", "Passivkonto – Abnahme", "Passivkonto – Zunahme"],
  ["Kasse", "Forderungen aus L.u.L.", "Ein Kunde hat seine Rechnung bar bezahlt.", "Aktivkonto – Zunahme", "Aktivkonto – Abnahme"],
];

const deuten = {
  id: "bk-deuten", thema: "bestandskonten",
  erzeugen: (r) => {
    const i = r.zahl(0, SAETZE.length - 1), [soll, haben, was, artS, artH] = SAETZE[i];
    const betrag = r.betrag(200, 20000, 100);
    const andere = r.mischen(SAETZE.filter((_, j) => j !== i).map((x) => x[2])).slice(0, 4);
    return auswahl("bk-deuten", "bestandskonten",
      `Deuten Sie den Buchungssatz:\n\n${soll} an ${haben} ${G.euro(betrag)}\n\nWelcher Geschäftsvorfall liegt zugrunde?`,
      [was, ...andere], [0],
      `Vorgehen (Folien „Deuten von Buchungssätzen“): Soll-Konto bestimmen, Aktiv oder Passiv, Zugang oder Abgang – dann das Haben-Konto ebenso.\n• Soll: ${soll} → ${artS}\n• Haben: ${haben} → ${artH}\n→ ${was}`, r);
  },
};

export const BSR_TEIL1_ZUSATZ = [deuten];
