// Vertont das Kompaktwissen mit der OpenAI-Sprachausgabe (gpt-4o-mini-tts, Stimme „Cedar“) → web/audio/<thema>.m4a
// und schreibt web/js/hoeraudio.js (Prüfsumme, Dauer und Zeitmarken je Thema zum Mitlesen).
// Aufruf (der API-Schlüssel wird vom Proxy der Umgebung eingesetzt, steht nie im Repo):
//   NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node tools/vorlesen_audio.mjs [cacheordner] [thema …]
// Nur Themen, deren Text sich geändert hat (Prüfsumme), werden neu erzeugt; Abschnitte liegen im Cache (Hash → mp3).
import "../web/js/kern.js";
import { KOMPAKT } from "../web/js/kompakt.js";
import { THEMA } from "../web/js/kern.js";
import { hoerSegmente, hoerGruppen, hoerHash, STIMME } from "../web/js/vorlesen.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const WURZEL = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [cache = "/tmp/vorlesen-cache", ...nur] = process.argv.slice(2);
const AUDIO = path.join(WURZEL, "web/audio"), INDEX = path.join(WURZEL, "web/js/hoeraudio.js");
const ANWEISUNG = "Sprich Deutsch wie ein erfahrener, sympathischer Dozent an einer Finanzhochschule, der einer Studentin den Stoff vor der Klausur erklärt: ruhig, klar, natürlich betont, leicht warm, mit kurzen Pausen zwischen den Punkten. Fachbegriffe und Paragrafen deutlich, aber nicht abgehackt. Nicht übertrieben, nicht roboterhaft, kein Werbeton.";
const RATE = 24000;
fs.mkdirSync(cache, { recursive: true }); fs.mkdirSync(AUDIO, { recursive: true });

const alt = fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, "utf8").replace(/^[\s\S]*?= /, "").replace(/;\s*$/, "")) : {};
const hash = (t) => crypto.createHash("sha1").update(STIMME.name + "|" + ANWEISUNG + "|" + t).digest("hex").slice(0, 16);

async function sprechen(text) {
  const datei = path.join(cache, hash(text) + ".mp3");
  if (fs.existsSync(datei)) return datei;
  for (let versuch = 1; ; versuch++) {
    const r = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer proxy-injected" },
      body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: STIMME.name.toLowerCase(), input: text, instructions: ANWEISUNG, response_format: "mp3" }),
    }).catch((e) => ({ ok: false, status: 0, text: async () => String(e) }));
    if (r.ok) { fs.writeFileSync(datei, Buffer.from(await r.arrayBuffer())); return datei; }
    const fehler = await r.text();
    if (versuch >= 5 || r.status === 400 || /insufficient_quota/.test(fehler)) throw new Error(`TTS ${r.status}: ${fehler.slice(0, 200)}`);
    await new Promise((ok) => setTimeout(ok, 2000 * versuch));
  }
}
/** Sekunden einer WAV-Datei (16 bit mono). */
const dauer = (wav) => (fs.statSync(wav).size - 44) / (RATE * 2);

async function thema(id, gruppen) {
  // Abschnitte parallel erzeugen (höchstens 6 gleichzeitig)
  const dateien = new Array(gruppen.length); let naechste = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (naechste < gruppen.length) { const i = naechste++; dateien[i] = await sprechen(gruppen[i].text); }
  }));
  const tmp = fs.mkdtempSync(path.join(cache, "t-"));
  const liste = [], marken = []; let t = 0;
  gruppen.forEach((g, i) => {
    if (g.pause && i) {
      const stille = path.join(tmp, `s${i}.wav`);
      execFileSync("ffmpeg", ["-v", "error", "-f", "lavfi", "-i", `anullsrc=r=${RATE}:cl=mono`, "-t", String(g.pause / 1000), "-c:a", "pcm_s16le", "-y", stille]);
      liste.push(stille); t += dauer(stille);
    }
    const wav = path.join(tmp, `g${i}.wav`);
    execFileSync("ffmpeg", ["-v", "error", "-i", dateien[i], "-ar", String(RATE), "-ac", "1", "-c:a", "pcm_s16le", "-y", wav]);
    marken.push([Math.round(t * 10) / 10, g.ziel]);
    liste.push(wav); t += dauer(wav);
  });
  fs.writeFileSync(path.join(tmp, "liste.txt"), liste.map((f) => `file '${f}'`).join("\n"));
  execFileSync("ffmpeg", ["-v", "error", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "liste.txt"), "-c:a", "aac", "-b:a", "40k", "-ac", "1", "-movflags", "+faststart", "-y", path.join(AUDIO, id + ".m4a")]);
  fs.rmSync(tmp, { recursive: true, force: true });
  return { d: Math.round(t), m: marken };
}

const neu = {};
const ids = Object.keys(KOMPAKT).filter((id) => !nur.length || nur.includes(id));
let zeichen = 0;
for (const id of Object.keys(KOMPAKT)) {
  const seg = hoerSegmente(KOMPAKT[id], THEMA[id]), h = hoerHash(seg);
  if (!ids.includes(id)) { if (alt[id]) neu[id] = alt[id]; continue; }
  if (alt[id]?.h === h && fs.existsSync(path.join(AUDIO, id + ".m4a"))) { neu[id] = alt[id]; continue; }
  const gruppen = hoerGruppen(seg);
  zeichen += gruppen.reduce((n, g) => n + g.text.length, 0);
  const t0 = Date.now();
  const erg = await thema(id, gruppen);
  neu[id] = { h, ...erg };
  console.log(`${id}: ${Math.round(erg.d / 60 * 10) / 10} Min., ${gruppen.length} Abschnitte, ${Math.round((Date.now() - t0) / 1000)} s`);
  // Zwischenstand sichern, damit ein Abbruch nichts verliert
  fs.writeFileSync(INDEX, kopf() + JSON.stringify({ ...alt, ...neu }) + ";\n");
}
// Verwaiste Dateien entfernen
for (const f of fs.readdirSync(AUDIO)) if (f.endsWith(".m4a") && !neu[f.slice(0, -4)]) fs.rmSync(path.join(AUDIO, f));
for (const id of Object.keys(neu)) neu[id].s = fs.statSync(path.join(AUDIO, id + ".m4a")).size;
fs.writeFileSync(INDEX, kopf() + JSON.stringify(neu) + ";\n");
console.log(`fertig: ${Object.keys(neu).length} Themen mit Audio, neu vertont ${zeichen} Zeichen`);

function kopf() {
  return "// Automatisch erzeugt (tools/vorlesen_audio.mjs) – nicht von Hand ändern.\n" +
    `// Vorab vertonte Überblicke (OpenAI gpt-4o-mini-tts, Stimme ${STIMME.name}): Prüfsumme h, Dauer d (s), Größe s (Bytes), Zeitmarken m [[Sekunde, data-hoer]].\n` +
    "export const HOER_AUDIO = ";
}
