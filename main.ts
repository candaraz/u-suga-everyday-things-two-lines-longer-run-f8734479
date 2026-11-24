// Everyday Things, Two Lines, Longer Run — u-suga-everyday-things-two-lines-longer-run-f8734479
// Writes the two-line explanation to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, stdlib only, zero network. Deterministic: the same bytes every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A fridge is like a team of movers carrying heat out of the box and dumping it behind the fridge, not making cold at all.";
const LINE_2 =
  "It maps the heat leaving and the warm back, but it leaves out the compressor and the gas that move the heat.";

// Exactly two lines: line 1 + "\n" + line 2, no trailing newline.
const ENTRY = `${LINE_1}\n${LINE_2}`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Gate guards, checked before writing: 1-400 chars, not only whitespace,
// exactly two lines, one sentence (one terminal period) per line.
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} outside the 1-400 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  const periods = (line.match(/\./g) ?? []).length;
  if (periods !== 1 || !line.endsWith(".")) {
    throw new Error(`line ${i + 1} must be exactly one sentence`);
  }
}

writeFileSync(outPath, ENTRY, "utf8");

// Read back and confirm the file holds exactly the intended bytes.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from the intended entry");
}
console.log(`wrote ${outPath}`);
