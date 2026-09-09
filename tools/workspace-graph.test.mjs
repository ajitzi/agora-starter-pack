import assert from 'node:assert/strict';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { graph, owner, workspaceOwners } from './workspace-graph.mjs';

test('attribue une identite distincte aux modules', () => {
  assert.equal(owner('modules/orders/src/index.ts'), 'module:orders');
  assert.equal(owner('packages/core/src/index.ts'), 'core');
  assert.equal(owner('apps/api/src/index.ts'), 'app:api');
});

test('refuse un nom de workspace attribue a plusieurs owners', () => {
  assert.throws(() => workspaceOwners(['packages/catalog/src/index.ts', 'modules/catalog/src/index.ts']), /Owner workspace ambigu pour catalog: catalog et module:catalog/);
});

test('observe une source de module temporaire avec son owner', async () => {
  const key = `graph-fixture-${process.pid}`;
  const directory = join('modules', key, 'src');
  await mkdir(directory, { recursive: true });
  try {
    await writeFile(join(directory, 'index.ts'), "import '@project/core';\n");
    const edges = await graph();
    assert.ok(edges.some((edge) => edge.from === `modules/${key}/src/index.ts` && edge.fromOwner === `module:${key}`));
  } finally {
    await rm(join('modules', key), { recursive: true, force: true });
  }
});
