# Implementation Foundations

This plan implements the architecture in dependency order. It does not select a product capability.

## 1. Repository Model

- Add `modules/*` to the pnpm workspace.
- Extend source, boundary and cycle checks to recognize module ownership and reject module-to-app, deep and forbidden runtime imports.
- Define the `module.ts` descriptor and product manifest types.
- Add negative tests for duplicate module keys, cycles, duplicate resource owners and duplicate slots.

**Exit:** a no-op `base` composition resolves deterministically in CI.

## 2. Composition Build

- Implement a resolver CLI that reads a product manifest, resolves mandatory dependencies and validates ownership.
- Materialize a clean staged Strapi application root with only active module `src/api` sources.
- Make the API build, local development command and Docker image consume that staged root.
- Verify a composition fixture boots Strapi and proves inactive module routes and content-types are absent.

**Exit:** one immutable API image is built from the `base` composition.

## 3. Runtime Commands

- Define one image entry model with explicit `migrate`, `config-sync`, `api`, `worker` and `scheduler` commands.
- Design the single-run migration/schema command with a PostgreSQL advisory lock and readiness/failure behavior.
- Add a schema-diff gate: destructive removals require an approved migration and preservation plan.
- Decide and test JavaScript or TypeScript Strapi migrations; if TypeScript is chosen, enable `useTypescriptMigrations`.

**Exit:** local and CI can execute the deployment order against a PostgreSQL fixture.

## 3a. Deployment Profiles

- Expand Compose into the reference local topology: PostgreSQL, API, worker, scheduler, migration/configuration jobs and optional MinIO, Mailpit and OTel Collector.
- Create production infrastructure templates for `mvp-single-vps`, `split-vps`, `split-managed-postgres`, `eu-managed-containers` and `aws-ecs-rds` without changing application commands.
- For `split-vps`, automate private networking, PostgreSQL systemd configuration, `pgBackRest` WAL archive, encrypted EEE object storage backups, monitoring and a scheduled isolated restore test.
- Require an explicit product profile, provider, region, RPO/RTO and responsible role before staging.

**Exit:** the selected profile deploys the same image as local and proves a restore from its backup.

## 4. Configuration Convergence

- Define managed resources with stable key, module owner, managed fields and operator-owned fields.
- Implement an empty-manifest `config-sync` with PostgreSQL lock, dry-run, replay and deterministic drift report.
- Limit the first scope to one version-pinned Strapi managed subset; distinguish Users & Permissions end-user roles from admin RBAC.

**Exit:** a clean run and replay succeed; an invalid drift fails with a diagnostic.

## 5. API Contract Chain

- Run `strapi openapi generate` explicitly after composition.
- Commit one canonical OpenAPI artifact under `docs/api` and fail CI on artifact/client drift.
- Generate `@project/api-client` from that artifact behind its public barrel.
- Add runtime contract tests for custom routes, Problem Details, cursor metadata and generated-schema gaps.

**Exit:** one `/api/v1` query and command are represented identically by runtime, OpenAPI and client.

## 6. Transactional Infrastructure

- Define idempotency records with unique `(actor, endpoint, key)`, payload hash, `pending` and `completed` states, replayed response, TTL and in-flight response rule.
- Define outbox event, handler ledger, fencing token, lease renewal, handler version and external-provider idempotency protocol.
- Implement transaction integration tests for rollback, duplicate command, concurrent retry, expired lease and delayed-event upgrade.

**Exit:** one command persists state, snapshot, idempotency result and event atomically.

## 7. First Capability Pilot

- Choose either a minimal identity flow or a minimal RGPD request flow.
- Add its pure domain use case, one classified content-type, Strapi adapter, generated API contract and shared screen.
- Prove web and mobile use the public client and all foundation checks pass.

**Exit:** one end-to-end capability demonstrates CAP-1 through CAP-5.

## Feature Gates

- Identity refresh, CORS and CSRF: first authenticated endpoint.
- Worker outbox: first asynchronous effect.
- Scheduler: first scheduled job.
- Notifications, media, i18n, cache and offline: first consuming capability.
- Production provider and SLO choices: staging or production promotion.
