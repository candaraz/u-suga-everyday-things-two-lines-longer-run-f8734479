// Everyday Things, Two Lines, Longer Run — Round 3 entry program.
// The whole entry is the two-line explanation held in entry.txt beside
// this file; the program's one job is to deliver that text, unchanged,
// into the output directory the grader points it at.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve everything from this script's own directory, never from the
// caller's working directory, so the run behaves the same anywhere.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const entryText = readFileSync(entryPath, "utf8");

// The grader names the destination through MAKEFUN_OUTPUT_DIR; /output
// is the documented fallback when the variable is not set.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

// Empty the destination's contents so a stale file can never leak into
// the result, but leave the directory itself standing: it may be a
// mount point the grader owns.
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

// Write the text back exactly as read: same words, same single newline
// between the two lines, no trailing newline added.
writeFileSync(join(outputDir, "entry.txt"), entryText, "utf8");
