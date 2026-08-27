import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const IGNORED_DIRECTORIES = new Set(['.next', '.tamagui', 'node_modules']);

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? (IGNORED_DIRECTORIES.has(entry.name) ? [] : files(path)) : [path];
  }));
  return nested.flat();
}

const sourceFiles = (await Promise.all(['apps', 'packages'].map(files))).flat().filter((path) => /\.[cm]?[jt]sx?$/.test(path));
const violations = [];
for (const path of sourceFiles) {
  const source = await readFile(path, 'utf8');
  if (source.includes('TODO')) violations.push(`${path}: TODO interdit dans le seed`);
}
if (violations.length) throw new Error(violations.join('\n'));
