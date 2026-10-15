// Geldbeträge werden durchgängig als ganze Cent (Integer) geführt – keine Rundungsfehler.
// Prozentwerte in Rechenaufgaben werden ebenfalls in Hundertsteln geführt (25 % = 2500).

export const E = (euro) => Math.round(euro * 100); // ganze Euro → Cent

/** p Prozent von c (Cent), kaufmännisch gerundet. */
export function prozent(c, p) {
  const v = (c * p) / 100;
  return Math.sign(v) * Math.round(Math.abs(v));
}

function gruppiert(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** 123456 → "1.234,56" */
export function text(c) {
  const neg = c < 0;
  const a = Math.abs(Math.round(c));
  const s = gruppiert(Math.floor(a / 100)) + "," + String(a % 100).padStart(2, "0");
  return (neg ? "−" : "") + s;
}

/** 120000 → "1.200 €", 4167 → "41,67 €" */
export function euro(c) {
  if (c % 100 === 0) return (c < 0 ? "−" : "") + gruppiert(Math.abs(c) / 100) + " €";
  return text(c) + " €";
}

/** Hundertstel-Prozent → "25 %" bzw. "44,44 %" */
export function prozentText(h) {
  if (h % 100 === 0) return h / 100 + " %";
  return text(h) + " %";
}

/**
 * Liest eine Eingabe im deutschen oder englischen Format und liefert Hundertstel (Cent).
 * "1.234,56" · "1234,56" · "1234.56" · "1.000" · "-500" · "1.190 €" · "25 %"
 */
export function lesen(eingabe) {
  if (eingabe == null) return null;
  let s = String(eingabe).trim();
  for (const z of ["€", "EUR", "%", " ", " ", "+"]) s = s.split(z).join("");
  s = s.replace(/[−–]/g, "-");
  if (!s) return null;
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (s.includes(".")) {
    const ohne = s.startsWith("-") ? s.slice(1) : s;
    const teile = ohne.split(".");
    const tausender = teile.length >= 2 && teile[0].length >= 1 && teile[0].length <= 3 &&
      teile.slice(1).every((t) => t.length === 3);
    if (tausender) s = s.replace(/\./g, "");
  }
  if (!/^-?\d*(\.\d*)?$/.test(s) || s === "-" || s === "." || s === "-.") return null;
  const neg = s.startsWith("-");
  if (neg) s = s.slice(1);
  let [ganz, bruch = ""] = s.split(".");
  ganz = ganz || "0";
  const drei = (bruch + "000").slice(0, 3);
  let cent = parseInt(ganz, 10) * 100 + parseInt(drei.slice(0, 2), 10);
  if (parseInt(drei[2], 10) >= 5) cent += 1;
  return neg ? -cent : cent;
}
