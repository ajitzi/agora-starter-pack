import test from 'node:test';
import assert from 'node:assert/strict';
import { boundaryViolations } from '../../../tools/check-boundaries.mjs';
import { findCycles } from '../../../tools/check-cycles.mjs';

test('autorise les imports par point d entree public dans le sens attendu', () => {
  assert.deepEqual(boundaryViolations([{ from: 'packages/screens/src/index.ts', fromOwner: 'screens', target: '@project/domains', targetOwner: 'domains', deep: false, crossRelative: false }]), []);
});

test('refuse les imports profonds et les directions interdites', () => {
  const violations = boundaryViolations([
    { from: 'packages/screens/src/index.ts', fromOwner: 'screens', target: '@project/domains/internal', targetOwner: 'domains', deep: true, crossRelative: false },
    { from: 'packages/domains/src/index.ts', fromOwner: 'domains', target: '@project/ui', targetOwner: 'ui', deep: false, crossRelative: false },
    { from: 'packages/screens/src/index.ts', fromOwner: 'screens', target: 'tamagui', targetOwner: null, deep: false, crossRelative: false },
    { from: 'packages/screens/src/index.ts', fromOwner: 'screens', target: '@project/router', targetOwner: 'router', deep: false, crossRelative: false }
  ]);
  assert.equal(violations.length, 4);
});

test('refuse les cycles', () => {
  assert.deepEqual(findCycles({ screens: ['domains'], domains: ['screens'] }), ['screens -> domains -> screens']);
});

test('ne prevoit aucune table ni migration metier', async () => {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir('apps/api/app');
  assert.deepEqual(entries.sort(), ['adapters', 'index.ts']);
});

test('reproduit le workspace depuis son lockfile racine unique', async () => {
  const { access, readFile } = await import('node:fs/promises');
  await access('pnpm-lock.yaml');
  const manifest = JSON.parse(await readFile('package.json', 'utf8'));
  assert.equal(manifest.packageManager, 'pnpm@10.14.0');
  assert.equal(manifest.engines.node, '24.0.0');
});
