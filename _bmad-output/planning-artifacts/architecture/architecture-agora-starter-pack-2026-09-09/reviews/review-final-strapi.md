# Review final Strapi 5

## Verdict

**Not approved as an implementation-ready final architecture.** The intended boundaries are generally sound, but the documents describe several unimplemented mechanisms as adopted facts and rely on experimental or non-existent Strapi lifecycle behavior without the required operational design. Correct the blocking findings before treating the documents as a build contract.

## Scope and method

Independent review of:

- `_bmad-output/planning-artifacts/architecture/architecture-agora-starter-pack-2026-09-09/ARCHITECTURE-SPINE.md`
- `docs/architecture/architecture-v1.md`

Repository facts checked on 2026-09-09:

- `apps/api/package.json` pins `@strapi/strapi` to `5.33.0`; its only lifecycle scripts are `strapi develop`, `strapi start`, and `strapi build`.
- `apps/api/config/database.ts` only configures PostgreSQL; there is no `database/migrations` directory, no `useTypescriptMigrations`, `runMigrations`, `forceMigration`, `config/plugins.ts`, `config/cron-tasks.ts`, `config-sync`, module resolver, outbox, worker, scheduler, or authorization manifest.
- `pnpm-workspace.yaml` includes only `apps/*` and `packages/*`, not `modules/*`.
- The only API contract is hand-authored `packages/api-client/src/openapi.ts` for `GET /api/health`; there is no generated specification under `docs/api`.
- `infra/compose.yaml` currently only declares PostgreSQL.

Authoritative Strapi 5 references used:

- [Database migrations](https://docs.strapi.io/cms/database-migrations)
- [Database transactions](https://docs.strapi.io/cms/database-transactions)
- [Users & Permissions](https://docs.strapi.io/cms/features/users-permissions)
- [OpenAPI specification generation](https://docs.strapi.io/cms/api/openapi)
- [CRON jobs](https://docs.strapi.io/cms/configurations/cron)
- [Document Service API](https://docs.strapi.io/cms/api/document-service)

## Findings

### F1 - The documents contradict each other on the source of composed modules

**Locations:** `architecture-v1.md:201`, `architecture-v1.md:215-230`; `ARCHITECTURE-SPINE.md:196-200`.

`architecture-v1.md` first says an activated Strapi adaptation lives by default in an internal `apps/api` module, then says activated adaptations are sourced in `modules/<module>` workspace packages. The spine mandates the latter. The current workspace does not include `modules/*`, and no resolver or generated build directory exists.

**Why unsafe:** Implementers can put modules in incompatible locations and create imports that the proposed resolver cannot package. A module activated by manifest is not a Strapi concept by itself; Strapi discovers application APIs from its application source/build layout.

**Required correction:** Pick `modules/*` as the sole target (or explicitly retain `apps/api`), add `modules/*` to the workspace when introduced, and specify the resolver's concrete build integration: generated source location, how it becomes Strapi's `src/api` build input, TypeScript compilation, package dependency resolution, and a test that proves an inactive module is absent from the running Strapi registry. Mark all of this as future work until implemented.

### F2 - The composition resolver is asserted without a realizable Strapi loading contract

**Locations:** `ARCHITECTURE-SPINE.md:190-200`, `architecture-v1.md:215-228,279-292`.

The documents state that materializing selected modules in `apps/api/.generated/strapi/` causes Strapi to load only those APIs. Neither document specifies an overlay/copy into Strapi's discovered source tree nor changes Strapi's project/build configuration to load that directory. No such mechanism exists in the repository.

**Why unsafe:** A generated directory beside `src` is inert by default. The image can either omit active modules at runtime or accidentally retain stale/inactive modules from a previous generated tree.

**Required correction:** Define a deterministic generated application root or a pre-build materialization into `apps/api/src`, clean it before every build, and make the image build fail if generated manifest, source tree, and compiled output disagree. Do not present AD-26/AD-27 as implemented until a composition fixture boots Strapi and inspects its registered routes/content-types.

### F3 - The claimed one-time migration deployment step is not a supported standalone Strapi operation

**Locations:** `ARCHITECTURE-SPINE.md:148-159,316-320`; `architecture-v1.md:183-191,441-447`.

Strapi 5 runs pending `database/migrations` automatically during application startup, before schema sync; its documentation explicitly says there is no CLI to manually execute them. The current API only has `strapi start`, which would also start an application process. The documents require a unique migration job before replicas but do not define how that process starts Strapi once, prevents normal replicas from also running migrations, or handles readiness and termination.

**Why unsafe:** Multiple replicas can independently enter startup/migration paths during rollout, or a supposed migration job can remain an API server. The stated deployment order is therefore not executable from the documented/current scripts.

**Required correction:** Add and validate a single-run migration runner design, including exact commands, replica configuration after it completes, advisory lock/serialization ownership, readiness behavior, and failure recovery. State that this is custom deployment infrastructure, not a Strapi migration command.

### F4 - Schema deletion remains automatic and destructive despite the migration policy

**Locations:** `ARCHITECTURE-SPINE.md:148-159`; `architecture-v1.md:183-197`.

Strapi schema sync drops tables, columns, indexes, and foreign keys it previously managed when they disappear from content-type schemas. This occurs after pending migrations and without a confirmation prompt. `forceMigration: false` skips drops but records the new schema, leaving the skipped objects unmanaged. The documents mention migrations and backup, but their "modification destructive ... migration versionnee" wording can imply that a missing migration prevents destructive schema changes.

**Why unsafe:** Removing a field or inactive module from the generated schema can delete production data on the next boot, including during a composition change. A backup alone does not make the rollout safe.

**Required correction:** Require a pre-deployment schema-diff gate and an explicit preservation/retention plan for every removed module, content-type, field, relation, index, and component. Treat schema removal as a separately approved destructive release; use an expand/migrate/contract sequence and verify the generated composition schema before startup.

### F5 - TypeScript migration support is missing from the actual configuration

**Locations:** `architecture-v1.md:187,354`; `apps/api/config/database.ts:1-9`; `apps/api/tsconfig.json`.

For TypeScript Strapi applications, Strapi only searches the build directory for TypeScript migrations when `connection.settings.useTypescriptMigrations: true` is configured. The current database config does not set it. There is also no migration directory.

**Why unsafe:** A future `.ts` migration can be committed, tested superficially, and never run in deployed Strapi.

**Required correction:** Decide JavaScript versus TypeScript migrations. If TypeScript is intended, require `useTypescriptMigrations: true` and an integration test that starts a production build with a pending migration. If JavaScript is intended, state it explicitly and keep the migration files executable from the source directory.

### F6 - `config-sync` is a target design, not a repository capability, and its ownership model is underspecified

**Locations:** `ARCHITECTURE-SPINE.md:118-146`; `architecture-v1.md:131-181,306-354`.

There is no `config-sync` code, manifest, lock implementation, or plugin configuration in the repository. More importantly, Strapi's Users & Permissions roles, permissions, default-role setting, provider settings, and email templates are database-backed plugin state normally administered through the plugin/admin UI. A synchronizer can manage selected state, but the documents do not define its managed-resource marker, immutable keys, field ownership, adoption rules for pre-existing Strapi defaults, or safe policy for deleted/renamed plugin actions.

**Why unsafe:** A converging job can overwrite manually operated settings, create duplicate role/action rows, or mistake Strapi/plugin upgrade changes for an unmanageable drift. "Any manual role conflict fails" is not enough to distinguish a managed role from a legitimate unmanaged one.

**Required correction:** Limit the first synchronizer to an explicit, version-pinned managed subset. Persist a managed-by marker and stable external keys, define per-field ownership and an adoption/import procedure, and make role/permission mapping integration-tested against Strapi 5.33.0. Separate end-user Users & Permissions roles from admin-panel RBAC; they are distinct Strapi systems.

### F7 - The refresh-session identity design is not currently configured and lacks an explicit browser threat model

**Locations:** `ARCHITECTURE-SPINE.md:286-296`; `architecture-v1.md:415-421`; current `apps/api/config/`.

Users & Permissions supports `jwtManagement: 'refresh'`, but defaults to `legacy-support` long-lived JWTs. The repository has no `config/plugins.ts`, so it currently uses the default rather than refresh sessions. Refresh mode also requires deliberate `httpOnly`, `secure`, `sameSite`, cookie path/domain, allowed origins, and CSRF design; "cookies HttpOnly securises" alone does not establish safe cross-origin behavior.

**Why unsafe:** A web client may ship bearer tokens in browser storage or cross-site refresh cookies without a coherent CSRF/CORS policy, while believing the documented session architecture is active.

**Required correction:** Mark refresh sessions as deferred until the first authenticated flow. Then add a concrete `users-permissions` configuration, an origin/cookie matrix for web environments, CSRF defense for cookie-authenticated unsafe requests, mobile token storage/refresh rules, and end-to-end tests for login, refresh, logout, revocation, CORS, and cross-origin rejection.

### F8 - Transactional outbox guarantees rest on an experimental Strapi API and omit the external-effect idempotency protocol

**Locations:** `ARCHITECTURE-SPINE.md:106-110,226-254`; `architecture-v1.md:246-277,525-531`.

`strapi.db.transaction` is experimental in Strapi 5.33.0. `architecture-v1.md:531` calls this out, but the spine's adopted invariant does not carry that constraint or a fallback. Also, the proposed lease and event-handler journal do not by themselves prevent duplicate external effects: a worker can call a provider, crash before recording completion, and a later lease holder will retry.

**Why unsafe:** The architecture can falsely be read as exactly-once delivery. At-least-once outbox processing requires an idempotency protocol at each external boundary, not only a local `(event, handler)` completion record.

**Required correction:** Retain the at-least-once claim prominently, pin and integration-test the transaction behavior for the selected Strapi version, and define handler idempotency per effect: provider idempotency key derived from immutable event/handler identity where supported, or a receiver-side deduplication/inbox with an atomic local state transition. Specify the outbox table, handler ledger uniqueness constraint, lease-fencing/ownership token, retry scheduling, and replay authorization before implementation.

### F9 - The persistent scheduler is custom infrastructure, not a Strapi scheduler, and its enqueue atomicity is absent

**Locations:** `ARCHITECTURE-SPINE.md:346-350`; `architecture-v1.md:469-473`.

Strapi `cron` is powered by in-process `node-schedule`; it offers no PostgreSQL coordination, durable schedule state, leases, or distributed singleton behavior. Rejecting `strapi.cron` for multi-replica product work is reasonable, but the documents then assert a dedicated PostgreSQL scheduler without its data model or the atomic boundary that turns a due schedule into exactly one job/outbox event. No scheduler exists in the repository.

**Why unsafe:** Multiple schedulers can enqueue the same logical run, and a crash between claiming a schedule and enqueuing work can lose it. Worker leases only protect execution after enqueue; they do not make scheduling durable.

**Required correction:** Define scheduler tables and unique keys such as `(job_key, scheduled_for)`, a transactional claim-and-enqueue operation, missed-run and clock-skew policy, schedule versioning on module activation/deactivation, timezone/DST semantics, and integration tests with competing scheduler processes. Describe it as application infrastructure alongside Strapi, not as a Strapi capability.

### F10 - OpenAPI is not generated by `strapi build`, and the current client is not derived from a generated contract

**Locations:** `ARCHITECTURE-SPINE.md:256-260`; `architecture-v1.md:399-403`; `apps/api/package.json:5-10`; `packages/api-client/src/openapi.ts:1-11`.

Strapi 5 provides the separate experimental command `strapi openapi generate --output <path>` for OpenAPI 3.1.0. `strapi build` builds the admin panel; it does not generate the specification. The current API build script does not invoke the generator, no versioned spec exists, and `openapi.ts` is a hand-written health-route type.

**Why unsafe:** CI can build successfully while publishing no contract, leaving the client stale. The generated OpenAPI output also has known fidelity limits, including nested component `required` metadata, so it cannot alone validate custom DTOs.

**Required correction:** Define a post-composition, post-build explicit OpenAPI generation command and canonical committed artifact location; fail CI on uncommitted spec/client drift. Generate the client from that artifact, keep runtime contract tests for every custom route/DTO, and add targeted payload validation tests for schema details the experimental generator may omit. The stated production default is otherwise correct: OpenAPI HTTP endpoints are disabled unless opted in in `config/server`.

## Confirmed concepts

- Strapi 5's Document Service is the recommended backend content API and uses stable `documentId`; custom controllers must sanitize its output. The documents correctly preserve this boundary.
- Strapi migrations run before schema sync and operate against the prior schema; this supports the stated expand/migrate/contract approach once the deployment runner is designed.
- Users & Permissions supports refresh-mode sessions with short-lived access tokens, and API tokens are separate from end-user JWT authentication. Restricting API tokens to server-to-server integrations is a valid project policy, not a Strapi default.
- Strapi's generated OpenAPI is experimental, produces OpenAPI 3.1.0, includes custom routes, and is disabled over HTTP by default. The documents correctly avoid trusting it as the sole contract guarantee.
- Strapi's built-in cron is in-process. A database-coordinated scheduler is an appropriate separate design for multiple replicas, provided F9 is resolved.

## Review boundary

No source architecture document was modified. This report records review findings only.
