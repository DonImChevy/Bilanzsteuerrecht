// Vertont das Kompaktwissen → web/audio/<thema>.m4a und schreibt web/js/hoeraudio.js (Prüfsumme, Dauer und
// Zeitmarken je Thema zum Mitlesen). Anbieter:
//   ElevenLabs (Standard): Stimme STIMME.name aus vorlesen.js (voice_id in ELEVEN_IDS, sonst ELEVEN_STIMME=<voice_id>)
//     [ELEVEN_MODELL=eleven_v4] – Schlüssel als Netzwerk-Secret für api.elevenlabs.io im Header xi-api-key.
//     Stimmen des Kontos auflisten: … vorlesen_audio.mjs --stimmen (Bibliotheksstimmen gehen auch direkt per voice_id).
//     Der Text läuft vorher durch fuerStimme() (tools/sprechtext.mjs: Zahlen ausgeschrieben, Zitatlisten mit „und“).
//     Mit Zeitmarken je Zeichen: Pausen mitten im Satz (ohne Satzzeichen davor) werden am Ende gemeldet.
//   OpenAI: ANBIETER=openai (gpt-4o-mini-tts, Stimme aus STIMME in vorlesen.js) – Secret für api.openai.com (Bearer).
// Aufruf (der API-Schlüssel wird vom Proxy der Umgebung eingesetzt, steht nie im Repo):
//   NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node tools/vorlesen_audio.mjs [cacheordner] [thema|präfix* …]
//   z. B. … vorlesen_audio.mjs /tmp/vorlesen-cache 'ao-*'  (modulweise neu vertonen)
// Jede Datei führt ihre Stimme in HOER_AUDIO[id].st mit; Themen mit anderer Stimme als STIMME werden beim Aufruf neu vertont.
// Nur Themen, deren Text sich geändert hat (Prüfsumme), werden neu erzeugt; Abschnitte liegen im Cache (Hash → mp3).
import "../web/js/kern.js";
import { KOMPAKT } from "../web/js/kompakt.js";
import { THEMA } from "../web/js/kern.js";
import { hoerSegmente, hoerGruppen, hoerHash, STIMME, ALTE_STIMME } from "../web/js/vorlesen.js";
import { fuerStimme, pfeileMarkieren } from "./sprechtext.mjs";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const WURZEL = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [cache = "/tmp/vorlesen-cache", ...nur] = process.argv.slice(2);
const gewaehlt = (id) => !nur.length || nur.some((n) => n.endsWith("*") ? id.startsWith(n.slice(0, -1)) : n === id);
const AUDIO = path.join(WURZEL, "web/audio"), INDEX = path.join(WURZEL, "web/js/hoeraudio.js");
const ANWEISUNG = "Sprich Deutsch wie ein erfahrener, sympathischer Dozent an einer Finanzhochschule, der einer Studentin den Stoff vor der Klausur erklärt: ruhig, klar, natürlich betont, leicht warm, mit kurzen Pausen zwischen den Punkten. Fachbegriffe und Paragrafen deutlich, aber nicht abgehackt. Nicht übertrieben, nicht roboterhaft, kein Werbeton.";
const RATE = 24000;
const ANBIETER = process.env.ANBIETER || "elevenlabs";
// Anzeigename (STIMME.name) → voice_id bei ElevenLabs
const ELEVEN_IDS = { Theo: "TIKjTeWOFujJEvXK1qIU" }; // „Theo Teacher – Clear & Trustworthy“ (Voice Library)
const ELEVEN = { stimme: process.env.ELEVEN_STIMME || ELEVEN_IDS[STIMME.name], modell: process.env.ELEVEN_MODELL || "eleven_v4" };
// eleven_v4 (wie v3) liest Zitatketten ohne Stocken – multilingual_v2 machte nach „Paragraf …“ bis zu 1 s Pause.
// v3 kennt keinen Nachbartext (previous_text/next_text); ab v3 Stabilität 0,5 ohne Stilverstärkung.
const V3 = /^eleven_v3/.test(ELEVEN.modell), NEU = /^eleven_v[34]/.test(ELEVEN.modell);
const STIMMNAME = ANBIETER === "elevenlabs" ? STIMME.name : ALTE_STIMME;
const PAUSE_GRENZE = 0.45; // Sekunden Stille zwischen zwei Wörtern ohne Satzzeichen → melden
const pausen = [];
if (process.argv[2] === "--stimmen") {
  // Verfügbare Stimmen des Kontos (inkl. aus der Voice Library hinzugefügter) – zum Aussuchen von ELEVEN_STIMME
  const r = await fetch("https://api.elevenlabs.io/v2/voices?page_size=100", { headers: { "xi-api-key": "proxy-injected" } });
  if (!r.ok) { console.error(`Stimmen ${r.status}: ${(await r.text()).slice(0, 300)}`); process.exit(1); }
  for (const v of (await r.json()).voices) console.log(`${v.voice_id}  ${v.name}  ${Object.values(v.labels || {}).join(", ")}`);
  process.exit(0);
}
if (ANBIETER === "elevenlabs" && !ELEVEN.stimme) { console.error("ELEVEN_STIMME fehlt (voice_id, siehe --stimmen)"); process.exit(1); }
fs.mkdirSync(cache, { recursive: true }); fs.mkdirSync(AUDIO, { recursive: true });

const alt = fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, "utf8").replace(/^[\s\S]*?= /, "").replace(/;\s*$/, "")) : {};
const hash = (t) => crypto.createHash("sha1").update((ANBIETER === "elevenlabs" ? `eleven|${ELEVEN.stimme}|${ELEVEN.modell}` : STIMME.name + "|" + ANWEISUNG) + "|" + t).digest("hex").slice(0, 16);

/** Eine Anfrage beim Anbieter; liefert die Antwort (mp3). vorher/nachher: Nachbartext für gleichmäßige Betonung (ElevenLabs). */
function anfrage(text, vorher, nachher) {
  if (ANBIETER === "elevenlabs") {
    return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN.stimme}/with-timestamps?output_format=mp3_44100_128`, {
      method: "POST", headers: { "Content-Type": "application/json", "xi-api-key": "proxy-injected" },
      body: JSON.stringify({
        text, model_id: ELEVEN.modell, ...(V3 ? {} : { previous_text: vorher || undefined, next_text: nachher || undefined }),
        voice_settings: NEU ? { stability: 0.5, similarity_boost: 0.8, style: 0, use_speaker_boost: true, speed: 1 }
          : { stability: 0.55, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true, speed: 1 },
      }),
    });
  }
  return fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer proxy-injected" },
    body: JSON.stringify({ model: "gpt-4o-mini-tts", voice: ALTE_STIMME.toLowerCase(), input: text, instructions: ANWEISUNG, response_format: "mp3" }),
  });
}

async function sprechen(text, vorher, nachher, id) {
  const datei = path.join(cache, hash(text) + ".mp3"), zeiten = datei.replace(/\.mp3$/, ".json");
  if (fs.existsSync(datei)) { if (fs.existsSync(zeiten)) pausenPruefen(id, JSON.parse(fs.readFileSync(zeiten, "utf8"))); return datei; }
  for (let versuch = 1; ; versuch++) {
    const r = await anfrage(text, vorher, nachher).catch((e) => ({ ok: false, status: 0, text: async () => String(e) }));
    if (r.ok && ANBIETER === "elevenlabs") {
      const j = await r.json();
      fs.writeFileSync(datei, Buffer.from(j.audio_base64, "base64"));
      fs.writeFileSync(zeiten, JSON.stringify(j.alignment));
      pausenPruefen(id, j.alignment);
      return datei;
    }
    if (r.ok) { fs.writeFileSync(datei, Buffer.from(await r.arrayBuffer())); return datei; }
    const fehler = await r.text();
    if (versuch >= 5 || [400, 401, 402, 403, 404, 422].includes(r.status) || /insufficient_quota|quota_exceeded/.test(fehler)) throw new Error(`TTS ${r.status}: ${fehler.slice(0, 200)}`);
    await new Promise((ok) => setTimeout(ok, 2000 * versuch));
  }
}
/** Stille zwischen zwei Wörtern, vor der kein Satzzeichen steht (klingt wie Stocken) → in pausen sammeln. */
function pausenPruefen(id, a) {
  if (!a?.characters) return;
  const z = a.characters, start = a.character_start_times_seconds, ende = a.character_end_times_seconds;
  for (let i = 1; i < z.length - 1; i++) {
    if (z[i] !== " " || /[\s,.;:?!]/.test(z[i - 1])) continue;
    const luecke = start[i + 1] - ende[i - 1];
    if (luecke >= PAUSE_GRENZE) {
      const text = z.join("");
      pausen.push(`${id}: ${luecke.toFixed(2)} s · „…${text.slice(Math.max(0, i - 40), i)} ‖ ${text.slice(i + 1, i + 30)}…“`);
    }
  }
}
/** Sekunden einer WAV-Datei (16 bit mono). */
const dauer = (wav) => (fs.statSync(wav).size - 44) / (RATE * 2);

async function thema(id, gruppen) {
  // Abschnitte parallel erzeugen (höchstens 6 gleichzeitig)
  const dateien = new Array(gruppen.length); let naechste = 0;
  await Promise.all(Array.from({ length: ANBIETER === "elevenlabs" ? 2 : 6 }, async () => {
    while (naechste < gruppen.length) { const i = naechste++; dateien[i] = await sprechen(gruppen[i].text, gruppen[i - 1]?.text, gruppen[i + 1]?.text, id); }
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
const ids = Object.keys(KOMPAKT).filter(gewaehlt);
let zeichen = 0;
for (const id of Object.keys(KOMPAKT)) {
  const seg = hoerSegmente(KOMPAKT[id], THEMA[id]), h = hoerHash(seg, STIMMNAME);
  if (!ids.includes(id)) { if (alt[id]) neu[id] = alt[id]; continue; }
  if ((alt[id]?.st || ALTE_STIMME) === STIMMNAME && alt[id]?.h === h && fs.existsSync(path.join(AUDIO, id + ".m4a"))) { neu[id] = alt[id]; continue; }
  // Gesprochen wird der aufbereitete Text (Pfeile als „dann“, Zahlen ausgeschrieben); Gruppen und Zeitmarken bleiben gleich.
  const gruppen = hoerGruppen(hoerSegmente(pfeileMarkieren(KOMPAKT[id]), THEMA[id]))
    .map((g) => ANBIETER === "elevenlabs" ? { ...g, text: fuerStimme(g.text) } : g);
  zeichen += gruppen.reduce((n, g) => n + g.text.length, 0);
  const t0 = Date.now();
  const erg = await thema(id, gruppen);
  neu[id] = { h, ...erg, ...(STIMMNAME !== ALTE_STIMME ? { st: STIMMNAME } : {}) };
  console.log(`${id}: ${Math.round(erg.d / 60 * 10) / 10} Min., ${gruppen.length} Abschnitte, ${Math.round((Date.now() - t0) / 1000)} s`);
  // Zwischenstand sichern, damit ein Abbruch nichts verliert
  fs.writeFileSync(INDEX, kopf() + JSON.stringify({ ...alt, ...neu }) + ";\n");
}
// Verwaiste Dateien entfernen
for (const f of fs.readdirSync(AUDIO)) if (f.endsWith(".m4a") && !neu[f.slice(0, -4)]) fs.rmSync(path.join(AUDIO, f));
for (const id of Object.keys(neu)) neu[id].s = fs.statSync(path.join(AUDIO, id + ".m4a")).size;
fs.writeFileSync(INDEX, kopf() + JSON.stringify(neu) + ";\n");
console.log(`fertig: ${Object.keys(neu).length} Themen mit Audio, neu vertont ${zeichen} Zeichen`);
if (pausen.length) console.log(`\nPausen mitten im Satz (≥ ${PAUSE_GRENZE} s, ${pausen.length}):\n` + pausen.join("\n"));
else if (ANBIETER === "elevenlabs") console.log("Keine Pausen mitten im Satz.");

function kopf() {
  return "// Automatisch erzeugt (tools/vorlesen_audio.mjs) – nicht von Hand ändern.\n" +
    `// Vorab vertonte Überblicke (ElevenLabs ${ELEVEN.modell} bzw. OpenAI gpt-4o-mini-tts): Prüfsumme h, Dauer d (s), Größe s (Bytes),\n` +
    `// Zeitmarken m [[Sekunde, data-hoer]], Stimme st (fehlt = ${ALTE_STIMME}).\n` +
    "export const HOER_AUDIO = ";
}
