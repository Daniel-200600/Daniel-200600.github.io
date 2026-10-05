// Lists every content placeholder: todo("…") calls and literal "[À FOURNIR : …]".
// Fails when STRICT_CONTENT=1 or on a Vercel production build, so a
// placeholder can never reach the public site.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..", "src");
const PATTERN = /\btodo(?:L|Rich)?\(|À FOURNIR/;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(ts|tsx|mdx?)$/.test(name)) yield path;
  }
}

const hits = [];
for (const file of files(ROOT)) {
  if (file.endsWith(join("lib", "content.ts"))) continue; // defines the marker
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (PATTERN.test(line) && !/^\s*(import|export (const|function) (todo|isTodo))/.test(line)) {
        const what = line.match(/todo\w*\("([^"]+)"/)?.[1] ?? line.trim();
        hits.push(`${relative(process.cwd(), file)}:${i + 1}  ${what}`);
      }
    });
}

// Editorial rule: no em dash anywhere on the site (content, UI strings, comments).
const EM_DASH = "\u2014";
const dashHits = [];
for (const file of files(ROOT)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes(EM_DASH)) dashHits.push(`${relative(process.cwd(), file)}:${i + 1}`);
    });
}
if (dashHits.length > 0) {
  console.error(`✗ Em dash found (not allowed on the site):\n  ${dashHits.join("\n  ")}`);
  process.exit(1);
}

const strict = process.env.STRICT_CONTENT === "1" || process.env.VERCEL_ENV === "production";

if (hits.length === 0) {
  console.log("✓ No content placeholder left.");
} else {
  console.log(`${hits.length} placeholder(s) to fill:\n`);
  for (const hit of hits) console.log("  " + hit);
  if (strict) {
    console.error("\n✗ Production build blocked: fill the placeholders above first.");
    process.exit(1);
  }
}
