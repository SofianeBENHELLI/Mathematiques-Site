// Génère site/sw.js : liste des fichiers à mettre en cache et version (empreinte du contenu).
// À relancer après toute modification de site/ (npm run pwa). Avec --check : échoue si sw.js est périmé.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../site/", import.meta.url).pathname;
const swPath = join(root, "sw.js");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); if (f === ".DS_Store") return []; return statSync(p).isDirectory() ? walk(p) : [p]; });
const skip = new Set(["sw.js", "_headers", "assets/fonts/dmsans-LICENSE.txt", "assets/fonts/manrope-LICENSE.txt"]);
const files = walk(root).map((p) => relative(root, p)).filter((f) => !skip.has(f)).sort();
const hash = createHash("sha256");
for (const f of files) { hash.update(f); hash.update(readFileSync(join(root, f))); }
const version = hash.digest("hex").slice(0, 12);
const urls = new Set(["/"]);
for (const f of files) { if (f === "index.html") continue; if (f.endsWith("/index.html")) urls.add("/" + f.slice(0, -"index.html".length)); else urls.add("/" + f); } // les pages sont mises en cache sous leur adresse de dossier
const template = readFileSync(new URL("./sw.template.js", import.meta.url), "utf8");
const out = template.replace("__VERSION__", version).replace("__ASSETS__", JSON.stringify([...urls].sort(), null, 1));
if (process.argv.includes("--check")) {
  const cur = existsSync(swPath) ? readFileSync(swPath, "utf8") : "";
  if (cur !== out) { console.log("sw.js périmé : lance npm run pwa"); process.exit(1); }
  console.log("sw.js à jour (version " + version + ", " + urls.size + " URL)");
} else { writeFileSync(swPath, out); console.log("sw.js écrit (version " + version + ", " + urls.size + " URL)"); }
