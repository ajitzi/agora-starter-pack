import assert from 'node:assert/strict';
import test from 'node:test';

test('the health route stays available through the public client barrel', async () => {
  const client = await import('./index.ts');
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
  try {
    assert.deepEqual(await client.getHealth('http://localhost:1337'), { status: 'ok' });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('the client exposes contextual HTTP errors', async () => {
  const { HttpError, getHealth } = await import('./index.ts');
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 503 });
  try {
    await assert.rejects(
      () => getHealth('http://localhost:1337'),
      (error) => error instanceof HttpError && error.status === 503 && error.route === '/api/health',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
