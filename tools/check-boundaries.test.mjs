import assert from 'node:assert/strict';
import test from 'node:test';
import { boundaryViolations } from './check-boundaries.mjs';

const moduleEdge = (overrides) => ({
  from: 'modules/orders/src/index.ts',
  target: '@project/core',
  fromOwner: 'module:orders',
  targetOwner: 'core',
  deep: false,
  crossRelative: false,
  ...overrides,
});

test('refuse les imports de module vers une application', () => {
  assert.match(boundaryViolations([moduleEdge({ target: '@project/api', targetOwner: 'app:api' })]).join('\n'), /workspace ne peut dependre d'une application/);
});

test('refuse les imports profonds depuis un module', () => {
  assert.match(boundaryViolations([moduleEdge({ target: '@project/catalog/internal', targetOwner: 'module:catalog', deep: true })]).join('\n'), /import profond interdit/);
});

test('refuse les imports relatifs entre workspaces depuis un module', () => {
  assert.match(boundaryViolations([moduleEdge({ target: '../catalog/src/internal.ts', targetOwner: 'module:catalog', crossRelative: true })]).join('\n'), /import profond interdit/);
});
