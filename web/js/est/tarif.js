// Einkommensteuertarif ab VZ 2026 (§ 32a Abs. 1 und 5 EStG) – Beträge in Euro.

export const GRUNDFREIBETRAG = 12348;

/** Tarifliche ESt nach Grundtarif für das zu versteuernde Einkommen x (auf volle Euro abgerundet). */
export function grundtarif(zve) {
  const x = Math.floor(zve);
  const ab = (v) => Math.floor(v + 1e-9); // § 32a Abs. 1 S. 6: auf volle Euro abrunden
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return ab((914.51 * y + 1400) * y); }
  if (x <= 69878) { const z = (x - 17799) / 10000; return ab((173.10 * z + 2397) * z + 1034.87); }
  if (x <= 277825) return ab(0.42 * x - 11135.63);
  return ab(0.45 * x - 19470.38);
}

/** Splittingverfahren: ESt auf das halbierte (abgerundete) zvE, verdoppelt (§ 32a Abs. 5 EStG). */
export const splitting = (zve) => 2 * grundtarif(Math.floor(Math.floor(zve) / 2));

/** Tarifzone mit Formel – für Lösungshinweise. */
export function zone(zve) {
  const x = Math.floor(zve);
  if (x <= 12348) return { nr: 1, text: "Grundfreibetrag (§ 32a Abs. 1 S. 2 Nr. 1 EStG): 0 €" };
  if (x <= 17799) {
    const y = ((x - 12348) / 10000).toFixed(4).replace(".", ",");
    return { nr: 2, text: `Nr. 2 (12.349 – 17.799 €): (914,51 · y + 1.400) · y mit y = (${x} − 12.348) / 10.000 = ${y}` };
  }
  if (x <= 69878) {
    const z = ((x - 17799) / 10000).toFixed(4).replace(".", ",");
    return { nr: 3, text: `Nr. 3 (17.800 – 69.878 €): (173,10 · z + 2.397) · z + 1.034,87 mit z = (${x} − 17.799) / 10.000 = ${z}` };
  }
  if (x <= 277825) return { nr: 4, text: "Nr. 4 (69.879 – 277.825 €): 0,42 · x − 11.135,63" };
  return { nr: 5, text: "Nr. 5 (ab 277.826 €): 0,45 · x − 19.470,38" };
}
