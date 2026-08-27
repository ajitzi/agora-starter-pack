import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('la CI protege les integrations et publie seulement les artefacts immuables autorises', async () => {
  const [workflow, webDockerfile, apiDockerfile, dockerignore, readme] = await Promise.all([
    readFile('.github/workflows/ci.yml', 'utf8'),
    readFile('apps/web/Dockerfile', 'utf8'),
    readFile('apps/api/Dockerfile', 'utf8'),
    readFile('.dockerignore', 'utf8'),
    readFile('README.md', 'utf8'),
  ]);

  assert.match(workflow, /push:\n\s+branches: \[develop, preprod, main\]/);
  assert.match(workflow, /pull_request:\n\s+branches: \[develop, preprod, main\]/);
  assert.match(workflow, /name: Quality gates/);
  assert.match(workflow, /node-version: 24\.0\.0/);
  assert.match(workflow, /corepack enable/);
  assert.match(workflow, /pnpm install --frozen-lockfile/);
  for (const gate of ['pnpm typecheck', 'pnpm lint', 'pnpm boundaries', 'pnpm cycles', 'pnpm test']) assert.ok(workflow.includes(gate), gate);
  assert.match(workflow, /if: github\.event_name == 'push' && \(github\.ref == 'refs\/heads\/preprod' \|\| github\.ref == 'refs\/heads\/main'\)/);
  assert.match(workflow, /docker-smoke-test:\n\s+name: Docker smoke test\n\s+if: github\.event_name == 'push' && \(github\.ref == 'refs\/heads\/preprod' \|\| github\.ref == 'refs\/heads\/main'\)\n\s+needs: quality-gates/);
  assert.match(workflow, /name: Build web image\n\s+run: docker build --tag ci-smoke-web --file apps\/web\/Dockerfile \./);
  assert.match(workflow, /docker run --detach --rm --name ci-smoke-web --publish 3000:3000 ci-smoke-web/);
  assert.match(workflow, /http:\/\/localhost:3000\//);
  assert.match(workflow, /name: Build API image\n\s+run: docker build --tag ci-smoke-api --file apps\/api\/Dockerfile \./);
  assert.match(workflow, /docker run --detach --rm --name ci-smoke-api --publish 3333:3333 --env APP_KEY=ci-smoke-test-app-key/);
  assert.match(workflow, /http:\/\/localhost:3333\/v1\/health/);
  assert.match(workflow, /publish-images:[\s\S]*?needs: \[quality-gates, docker-smoke-test\]/);
  assert.match(workflow, /packages: write/);
  assert.match(workflow, /ghcr\.io/);
  assert.match(workflow, /type=sha,format=long/);
  assert.match(workflow, /org\.opencontainers\.image\.revision=\$\{\{ github\.sha \}\}/);
  assert.match(workflow, /outputs\.digest/);
  assert.match(workflow, /provenance: mode=max/);

  for (const dockerfile of [webDockerfile, apiDockerfile]) {
    assert.match(dockerfile, /^FROM node:24\.0\.0 AS build/m);
    assert.match(dockerfile, /pnpm install --frozen-lockfile/);
    assert.match(dockerfile, /^FROM node:24\.0\.0 AS runtime/m);
    assert.match(dockerfile, /ENV NODE_ENV=production/);
    assert.doesNotMatch(dockerfile, /APP_KEY|\.env/);
  }
  assert.match(webDockerfile, /pnpm --filter @project\/web build/);
  assert.match(apiDockerfile, /pnpm --filter @project\/api build/);
  assert.match(apiDockerfile, /pnpm --filter @project\/api --prod deploy --legacy \/tmp\/api/);
  assert.match(apiDockerfile, /CMD \["node", "build\/bin\/server\.js"\]/);
  assert.match(dockerignore, /^\.env$/m);
  assert.match(dockerignore, /^\.env\.\*$/m);
  assert.match(readme, /ruleset GitHub sans contournement usuel/);
  assert.match(readme, /statut requis `Quality gates`/);
  assert.match(readme, /digest OCI/);
});
