import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import ts from 'typescript';

const IGNORED_DIRECTORIES = new Set(['.next', '.strapi', '.tamagui', 'build', 'dist', 'node_modules']);

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

function hasNativeJsxElement(path, source) {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let found = false;
  const visit = (node) => {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && ts.isIdentifier(node.tagName) && /^[a-z]/u.test(node.tagName.text)) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

for (const path of sourceFiles) {
  const source = await readFile(path, 'utf8');
  if (source.includes('TODO')) violations.push(`${path}: TODO interdit dans le seed`);
  if (/^packages\/(?:ui|screens)\/.+\.tsx$/.test(path) && hasNativeJsxElement(path, source)) {
    violations.push(`${path}: JSX HTML natif interdit dans @project/ui et @project/screens`);
  }
}
if (violations.length) throw new Error(violations.join('\n'));
