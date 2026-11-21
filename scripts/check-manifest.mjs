// Compare site/ au manifeste de reference, ou le regenere avec --write
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../site/", import.meta.url).pathname;
const manifestPath = new URL("../manifest.json", import.meta.url).pathname;

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  if (f === ".DS_Store") return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const current = Object.fromEntries(
  walk(root).sort().map((p) => [relative(root, p), createHash("sha256").update(readFileSync(p)).digest("hex")])
);

if (process.argv.includes("--write")) {
  writeFileSync(manifestPath, JSON.stringify(current, null, 2) + "\n");
  console.log(`manifest.json ecrit (${Object.keys(current).length} fichiers)`);
} else {
  const ref = JSON.parse(readFileSync(manifestPath, "utf8"));
  const keys = new Set([...Object.keys(ref), ...Object.keys(current)]);
  const changed = [...keys].filter((k) => ref[k] !== current[k]);
  if (changed.length === 0) console.log("Aucun changement par rapport a manifest.json");
  else { console.log("Fichiers modifies, ajoutes ou supprimes :"); changed.forEach((k) => console.log("  " + k)); }
}
