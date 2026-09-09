import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const SOURCE = /\.[cm]?tsx?$/;
const IGNORED_DIRECTORIES = new Set(['.next', '.strapi', '.tamagui', 'build', 'dist', 'node_modules']);

export async function sourceFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  return (await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? (IGNORED_DIRECTORIES.has(entry.name) ? [] : sourceFiles(path)) : SOURCE.test(path) ? [path] : [];
  }))).flat();
}

export function owner(path) {
  const match = path.replace(/\\/g, '/').match(/^(?:packages\/([^/]+)|modules\/([^/]+)|apps\/([^/]+))\//);
  return match ? (match[1] ?? (match[2] ? `module:${match[2]}` : `app:${match[3]}`)) : null;
}

export function workspaceOwners(files) {
  const owners = new Map();
  for (const file of files) {
    const workspaceOwner = owner(file);
    if (!workspaceOwner) continue;
    const name = workspaceOwner.replace(/^(?:app:|module:)/, '');
    const existing = owners.get(name);
    if (existing && existing !== workspaceOwner) throw new Error(`Owner workspace ambigu pour ${name}: ${existing} et ${workspaceOwner}`);
    owners.set(name, workspaceOwner);
  }
  return owners;
}

export async function graph() {
  const files = (await Promise.all(['apps', 'modules', 'packages'].map(sourceFiles))).flat();
  const owners = workspaceOwners(files);
  const edges = [];
  for (const from of files) {
    const source = await readFile(from, 'utf8');
    const node = ts.createSourceFile(from, source, ts.ScriptTarget.Latest, true);
    const visit = (child) => {
      const specifier = (ts.isImportDeclaration(child) || ts.isExportDeclaration(child)) ? child.moduleSpecifier : ts.isCallExpression(child) && child.expression.kind === ts.SyntaxKind.ImportKeyword ? child.arguments[0] : null;
      if (specifier && ts.isStringLiteral(specifier)) {
        const target = specifier.text;
        const match = target.match(/^@project\/([a-z-]+)(?:\/(.+))?$/);
        const resolved = target.startsWith('.') ? ts.resolveModuleName(target, resolve(ROOT, from), { moduleResolution: ts.ModuleResolutionKind.NodeNext }, ts.sys).resolvedModule?.resolvedFileName : null;
        edges.push({ from, target, fromOwner: owner(from), targetOwner: (match ? owners.get(match[1]) : null) ?? (resolved ? owner(relative(ROOT, resolved)) : null), deep: Boolean(match?.[2]), crossRelative: Boolean(resolved && owner(relative(ROOT, resolved)) && owner(relative(ROOT, resolved)) !== owner(from)) });
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  }
  return edges;
}
