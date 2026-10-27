// Screenshots der App in hell und dunkel (iPhone-Größe).
// Aufruf: node tools/screens.mjs [modul=bsr] [ausgabeordner=.]   (Server: cd web && python3 -m http.server 8765)
const pw = process.env.PLAYWRIGHT_MODUL || "/opt/node-tools/node_modules/playwright/index.mjs";
const { chromium } = await import(pw);
const [modul = "bsr", aus = "."] = process.argv.slice(2);
const b = await chromium.launch();
for (const schema of ["light", "dark"]) {
  const ctx = await b.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: schema });
  ctx.setDefaultTimeout(3000);
  const p = await ctx.newPage(); const fehler = [];
  p.on("pageerror", (e) => fehler.push(e.message));
  const klick = async (sel, ms = 700) => { await p.locator(sel).first().click().catch(() => fehler.push("fehlt " + sel)); await p.waitForTimeout(ms); };
  const bild = (name) => p.screenshot({ path: `${aus}/${schema}_${name}.png` });
  await p.goto("http://localhost:8765/index.html"); await p.waitForTimeout(600);
  await bild("willkommen");
  await klick(`[data-a="willkommenRolle"][data-v="${modul === "bbf" ? "ausbildung" : "studium"}"]`, 500); // erst Studium oder Ausbildung wählen
  await klick(`[data-a="willkommenModul"][data-v="${modul}"]`, 900); await bild("modul");
  await p.evaluate(() => document.querySelector("#themenListe")?.scrollIntoView()); await p.waitForTimeout(500); await bild("themen");
  for (const tab of ["klausur", "karten", "nachschlagen"]) { await klick(`[data-a="tab"][data-v="${tab}"]`); await bild(tab); }
  await klick('[data-a="tab"][data-v="start"]', 900); await bild("start");
  await klick(".modul-kachel:not(.bald)", 900); await klick('[data-a="schnell"]'); await bild("sitzung");
  console.log(schema, fehler.join(" | ") || "ok");
  await ctx.close();
}
await b.close();
