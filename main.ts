// "Everyday Things, Two Lines, Longer Run" — Round 2 entry program.
// It copies the two-line explanation from entry.txt (kept beside this
// file) into the output directory the grader mounts, nothing else.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? (isAbsolute(process.env.MAKEFUN_OUTPUT_DIR) ? process.env.MAKEFUN_OUTPUT_DIR : resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR))
  : join(scriptDir, 'out');

const text = readFileSync(join(scriptDir, 'entry.txt'), 'utf8');

mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}
writeFileSync(join(outputDir, 'entry.txt'), text, 'utf8');
