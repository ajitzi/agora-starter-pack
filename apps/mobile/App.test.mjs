import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('web and mobile render the shared starter screen', async () => {
  const [mobileApp, webPage] = await Promise.all([
    readFile(new URL('./App.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../web/src/app/starter-page.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(mobileApp, /<SafeAreaView style=\{\{ flex: 1 \}\} edges=\{\['top', 'bottom', 'left', 'right'\]\}>/u);
  assert.match(mobileApp, /<StarterScreen \/>/u);
  assert.match(webPage, /return <StarterScreen \/>/u);
});
