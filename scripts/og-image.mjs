// Renders the Open Graph cards (1200x630) in public/og/ with the site's fonts and data.
// Usage: npm run og   (downloads the fonts on first run into scripts/.fonts, which is git-ignored)
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const project = join(here, "..");

// TTF fonts from Google Fonts (resvg needs TTF/OTF, not WOFF)
const fontDir = join(here, ".fonts");
const fontFiles = { "bricolage-400.ttf": "Bricolage+Grotesque:wght@400", "bricolage-700.ttf": "Bricolage+Grotesque:wght@700", "instrument-italic.ttf": "Instrument+Serif:ital@1", "jetbrains-500.ttf": "JetBrains+Mono:wght@500" };
mkdirSync(fontDir, { recursive: true });
for (const [file, family] of Object.entries(fontFiles)) {
  if (existsSync(join(fontDir, file))) continue;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}`, { headers: { "User-Agent": "curl/8" } })).text();
  const url = css.match(/url\((https:[^)]+\.ttf)\)/)[1];
  writeFileSync(join(fontDir, file), Buffer.from(await (await fetch(url)).arrayBuffer()));
}
const { sortedTalks } = await import(join(project, "src/data/talks.ts"));
const { places, HOME } = await import(join(project, "src/data/places.ts"));
const { countries, project: proj } = await import(join(project, "src/data/americas-map.ts"));

const C = { bg: "#f6f1ea", ink: "#1d1727", muted: "#6c6377", violet: "#6b5ce7", coral: "#f2665f", sun: "#ffc24b", mint: "#3ec5a5" };
const b64 = (s) => Buffer.from(s).toString("base64");
const portrait = readFileSync(join(project, "public/images/portrait.svg"), "utf8");
const logo = readFileSync(join(project, "public/favicon.svg"), "utf8").replace(/<style>.*?<\/style>/s, "")
  .replace('class="t"', `fill="${C.ink}"`).replace('class="s"', 'stroke="#f3eef8"').replace('class="c"', `fill="#ff8a80"`);

const frame = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a1" cx="120" cy="80" r="440" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.violet}" stop-opacity=".28"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></radialGradient>
    <radialGradient id="a2" cx="1060" cy="580" r="440" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.coral}" stop-opacity=".22"/><stop offset="1" stop-color="${C.coral}" stop-opacity="0"/></radialGradient>
    <radialGradient id="a3" cx="760" cy="160" r="320" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.sun}" stop-opacity=".22"/><stop offset="1" stop-color="${C.sun}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#a1)"/><rect width="1200" height="630" fill="url(#a2)"/><rect width="1200" height="630" fill="url(#a3)"/>
  ${inner}
  <image href="data:image/svg+xml;base64,${b64(logo)}" x="80" y="540" width="52" height="52"/>
</svg>`;

const t = (x, y, txt, font, size, fill, extra = "") =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" ${extra}>${txt}</text>`;

// ---------- Home ----------
const home = frame(`
  <image href="data:image/svg+xml;base64,${b64(portrait)}" x="690" y="40" width="500" height="550"/>
  ${t(80, 150, "Hola, soy", "JetBrains Mono", 24, C.muted, 'font-weight="500"')}
  ${t(80, 245, "Vanessa", "Bricolage Grotesque", 92, C.ink, 'font-weight="700" letter-spacing="-3"')}
  ${t(80, 335, "Marely", "Instrument Serif", 104, C.violet, 'font-style="italic"')}
  ${t(80, 418, "Aristizábal Ángel", "Bricolage Grotesque", 68, C.ink, 'font-weight="700" letter-spacing="-2"')}
  ${t(80, 472, "Fullstack developer · GDE Angular &amp; Web", "Bricolage Grotesque", 28, C.muted)}
  ${t(80, 510, "GitHub Star · Speaker · Mentora · Ilustradora", "Bricolage Grotesque", 28, C.muted)}
  ${t(148, 576, "vanessamarely.dev", "JetBrains Mono", 26, C.ink, 'font-weight="500"')}
`);

// ---------- Charlas ----------
const inPerson = sortedTalks.filter((x) => x.where && x.where !== "online");
const cities = new Map();
for (const x of inPerson) cities.set(x.where, (cities.get(x.where) ?? 0) + 1);
const countriesCount = new Set([...cities.keys()].map((k) => places[k].code)).size;
const visited = new Set([...cities.keys()].map((k) => places[k].code));
const home0 = proj(places[HOME].lat, places[HOME].lon);
// map viewBox "40 0 450 500" placed at x=700,y=50, 470x522
const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 0 450 500">
  ${countries.map((c) => `<path d="${c.d}" fill="${visited.has(c.code) ? "#ddd6f5" : "#e9e3dc"}" stroke="${C.bg}" stroke-width="0.8"/>`).join("")}
  ${[...cities.entries()].filter(([k]) => k !== HOME).map(([k]) => {
    const p = proj(places[k].lat, places[k].lon);
    const mx = (home0.x + p.x) / 2, my = (home0.y + p.y) / 2, dx = p.x - home0.x, dy = p.y - home0.y;
    return `<path d="M${home0.x} ${home0.y} Q${mx - dy * 0.25} ${my + dx * 0.25} ${p.x} ${p.y}" fill="none" stroke="${C.coral}" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>`;
  }).join("")}
  ${[...cities.entries()].map(([k, n]) => {
    const p = proj(places[k].lat, places[k].lon);
    return `<circle cx="${p.x}" cy="${p.y}" r="${3.5 + Math.sqrt(n) * 2.6}" fill="${C.coral}" stroke="${C.bg}" stroke-width="1.6"/>`;
  }).join("")}
  <path transform="translate(${home0.x} ${home0.y})" d="M0 -9 L2.6 -2.8 9 -2.8 3.8 1.2 5.8 7.6 0 3.8 -5.8 7.6 -3.8 1.2 -9 -2.8 -2.6 -2.8 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="1.4"/>
</svg>`;
const charlas = frame(`
  <image href="data:image/svg+xml;base64,${b64(mapSvg)}" x="700" y="40" width="470" height="522"/>
  ${t(80, 140, "SPEAKER · CHARLAS &amp; COMUNIDAD", "JetBrains Mono", 22, C.muted, 'font-weight="500" letter-spacing="2"')}
  ${t(80, 240, "Charlas &amp;", "Bricolage Grotesque", 96, C.ink, 'font-weight="700" letter-spacing="-3"')}
  ${t(80, 335, "recursos", "Instrument Serif", 110, C.coral, 'font-style="italic"')}
  ${t(80, 405, `${sortedTalks.length} charlas, talleres y mentorías desde 2018`, "Bricolage Grotesque", 28, C.ink, 'font-weight="700"')}
  ${t(80, 445, `${inPerson.length} presenciales en ${cities.size} ciudades de ${countriesCount} países`, "Bricolage Grotesque", 28, C.muted)}
  ${t(80, 483, "Slides, videos, repos y demos de cada charla", "Bricolage Grotesque", 28, C.muted)}
  ${t(148, 576, "vanessamarely.dev/charlas", "JetBrains Mono", 26, C.ink, 'font-weight="500"')}
`);

const fonts = Object.keys(fontFiles).map((f) => join(fontDir, f));
mkdirSync(join(project, "public/og"), { recursive: true });
for (const [name, svg] of [["home", home], ["charlas", charlas]]) {
  const png = new Resvg(svg, { font: { fontFiles: fonts, loadSystemFonts: false, defaultFontFamily: "Bricolage Grotesque" }, fitTo: { mode: "width", value: 1200 } }).render().asPng();
  writeFileSync(join(project, `public/og/${name}.png`), png);
  console.log(name, png.length, "bytes");
}
console.log({ talks: sortedTalks.length, inPerson: inPerson.length, cities: cities.size, countries: countriesCount });
