import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const SOURCE = /\.[cm]?tsx?$/;

export async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(path) : SOURCE.test(path) ? [path] : [];
  }))).flat();
}

export function owner(path) {
  const match = path.replace(/\\/g, '/').match(/^(?:packages\/([^/]+)|apps\/([^/]+))\//);
  return match ? (match[1] ?? `app:${match[2]}`) : null;
}

export async function graph() {
  const files = (await Promise.all(['apps', 'packages'].map(sourceFiles))).flat();
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
        edges.push({ from, target, fromOwner: owner(from), targetOwner: match?.[1] ?? (resolved ? owner(relative(ROOT, resolved)) : null), deep: Boolean(match?.[2]), crossRelative: Boolean(resolved && owner(relative(ROOT, resolved)) && owner(relative(ROOT, resolved)) !== owner(from)) });
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  }
  return edges;
}
