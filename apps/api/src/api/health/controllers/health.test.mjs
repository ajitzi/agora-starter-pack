import assert from 'node:assert/strict';
import test from 'node:test';

test('the Strapi health controller returns the starter health payload', async () => {
  const { default: health } = await import('./health.ts');
  const ctx = {};
  health.index(ctx);
  assert.deepEqual(ctx.body, { status: 'ok' });
});
