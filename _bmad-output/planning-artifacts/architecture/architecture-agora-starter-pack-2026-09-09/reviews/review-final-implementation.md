# Final Implementation-Readiness Review

## Scope and Evidence

- **Reviewed contract:** `ARCHITECTURE-SPINE.md` and `docs/architecture/architecture-v1.md`.
- **Canonical source:** `_bmad-output/specs/spec-agora-starter-pack/SPEC.md`.
- **Repository evidence:** workspace and package manifests, API Dockerfile and configuration, `infra/compose.yaml`, CI, `tools/check-boundaries.mjs`, `tools/workspace-graph.mjs`, and the current `@project/api-client` seed.
- **Review focus:** prerequisites for implementation, dependency ordering, and the smallest foundation that can prove CAP-1 through CAP-5 with one vertical capability.

## Verdict

**NOT READY FOR IMPLEMENTATION AS A FINAL FOUNDATION.** The intended architecture is coherent and the current starter already supports its shell, package, UI, and basic boundary claims. However, the documents simultaneously require a composed-module deployment platform, configuration convergence, generated API contracts, transactional outbox processing, and operational ownership while the repository has none of the bootstrap artifacts or executable order that these rules require.

Starting a product slice now would force its implementer to choose undocumented bootstrap exceptions for module placement, schema migration, API contract generation, and deployment. That would make the first slice the de facto architecture authority rather than an implementation of the spine.

The earlier companion-path concern is resolved: the renamed SPEC now names this spine. The current package-to-app boundary check also covers the CAP-1 package-to-app edge. Those points should not block the next revision.

## Findings

### 1. The canonical SPEC and the adopted spine disagree on whether core technology may be selected

- **Location:** `SPEC.md` Non-goals and Open Questions; `ARCHITECTURE-SPINE.md` Stack and AD-6 through AD-8, AD-32, AD-37, AD-42.
- **Trigger condition:** The SPEC says not to select the API framework, HTTP contract, authentication protocol, database, migration strategy, job mechanism, authorization policy, or delivery toolchain before a product requirement exists. The spine adopts Strapi/PostgreSQL, REST/OpenAPI, Users & Permissions refresh sessions, an outbox worker, and a deployment model.
- **Required guard:** Ratify one interpretation before implementation: either make the selected items explicit starter constraints in the SPEC, or return them to feature-triggered decisions in the spine and documentation.
- **Consequence:** Teams cannot tell whether an implementation is complying with the canonical contract or overriding it.

### 2. The module source location is contradictory, and its required build substrate does not exist

- **Location:** `architecture-v1.md` Modules et plugins Strapi, lines 201-215; `ARCHITECTURE-SPINE.md` AD-26 and AD-27.
- **Trigger condition:** The documentation first places activatable Strapi adaptations in `apps/api`, then says they are workspace packages in `modules/<module>`. The spine requires the latter, but no `modules/` directory, module manifest, resolver, generated build directory, or materialization command exists.
- **Required guard:** Choose `modules/<module>` as the sole target location, define the minimal module descriptor and product manifest, and implement the resolver before the first activatable API capability.
- **Consequence:** The first feature will establish an incompatible module convention or bypass the composed-image invariant.

### 3. Workspace discovery and architectural checks omit the architecture's future module layer

- **Location:** `pnpm-workspace.yaml:1-3`; `tools/workspace-graph.mjs:16-23`; `tools/check-source.mjs:16`.
- **Trigger condition:** pnpm includes only `apps/*` and `packages/*`; source and dependency scanners inspect only `apps` and `packages`; ownership parsing recognizes only those two roots. AD-21 through AD-31 introduce `modules/*` as a first-class dependency and resource owner.
- **Required guard:** Add `modules/*` to workspace discovery and extend ownership, source, dependency, deep-import, cycle, and CI checks to scan it before adding the first module.
- **Consequence:** The principal new architectural layer can import forbidden runtimes, use forbidden JSX, or create cycles without any local or CI failure.

### 4. The current API image cannot execute the mandatory composed deployment sequence

- **Location:** `apps/api/Dockerfile:5-14,26`; `ARCHITECTURE-SPINE.md` AD-26, AD-33, AD-47; `architecture-v1.md` Livraison et promotion.
- **Trigger condition:** The Docker build copies only root metadata and `apps/api`, runs a direct Strapi build, and starts only `strapi start`. It cannot read workspace modules or domains, materialize a composition, run a migration/config-sync command, or launch a dedicated worker from the same image.
- **Required guard:** Establish a single image entry model with explicit commands for `resolve`, `migrate`, `config-sync`, `api`, and, when outbox is enabled, `worker`; make the CI image exercise the relevant command path.
- **Consequence:** The stated deployment order cannot be reproduced, so production composition will diverge from CI and local builds.

### 5. Migration-before-schema synchronization is specified without a runnable bootstrap boundary

- **Location:** `ARCHITECTURE-SPINE.md` AD-19, AD-20, AD-47; `architecture-v1.md:183-197,441-447`.
- **Trigger condition:** Migrations are required to run against the old schema before Strapi schema synchronization, yet the only runnable API command is normal Strapi startup. The documents do not define a separate migration runner, how it gets database configuration without starting replicas, or the exact point that performs schema synchronization once.
- **Required guard:** Define and test the bootstrap commands and their ownership: migration runner, one schema-sync instance, config-sync, then API/worker replicas. Verify `expand -> migrate -> contract` from a previous database fixture.
- **Consequence:** A first destructive or backfill migration can run after the schema change it depends on, or independently started replicas can race schema work.

### 6. `config-sync` and authorization manifests are mandatory in the deployment model but have no implementation or minimal no-op contract

- **Location:** `ARCHITECTURE-SPINE.md` AD-14 through AD-18; `architecture-v1.md:150-175,306-350`; repository `apps/api/src/` and `infra/`.
- **Trigger condition:** The documents require a PostgreSQL-locked, idempotent job that converges roles, permissions, and reference data before replicas. No manifest types, resource ownership format, PostgreSQL lock implementation, command, idempotence test, or deployment invocation exists.
- **Required guard:** Before the first authenticated or reference-data-dependent slice, define the smallest manifest schema, managed-resource identity, no-delete behavior, lock timeout, drift report, and empty-manifest behavior; implement its clean-run and replay integration tests.
- **Consequence:** Roles and permissions will be configured manually or per-controller, violating the declared source-of-truth and making environments non-reproducible.

### 7. The API contract toolchain has no authoritative source or generation order

- **Location:** `ARCHITECTURE-SPINE.md` AD-37 through AD-41; `architecture-v1.md:399-413`; `packages/api-client/src/http.ts` and `packages/api-client/src/openapi.ts`.
- **Trigger condition:** The architecture says a composed Strapi build generates versioned OpenAPI and `@project/api-client` is derived from it. The repository has only a hand-written health type and an unauthenticated GET helper; no generator, output location, committed-artifact policy, API client build step, or controller-to-spec contract test exists.
- **Required guard:** Select one contract source and a deterministic command chain: compose API, generate/validate OpenAPI, generate client, typecheck client, run API contract tests. Define whether generated artifacts are committed and how breaking changes are detected.
- **Consequence:** The first web/mobile mutation will either use ad hoc HTTP or create a second DTO authority, directly failing CAP-4.

### 8. Transactional command prerequisites are internally inconsistent and incomplete

- **Location:** `ARCHITECTURE-SPINE.md` AD-10, AD-12, AD-32, AD-41; `architecture-v1.md:246-277,413,525-531`.
- **Trigger condition:** The spine adopts an atomic aggregate/snapshot/idempotency/outbox flow and a worker, while the closing historical section still says that outbox and retry strategy will be decided with the first asynchronous use case. It also relies on experimental `strapi.db.transaction` without defining the adapter transaction context or a proof test.
- **Required guard:** Remove the contradictory deferral and, before the first transactional command, define the transaction adapter interface, persistence records for idempotency and outbox, uniqueness/concurrency constraints, and integration tests for duplicate keys, competing transitions, rollback, and post-crash lease recovery.
- **Consequence:** A command can persist state without its snapshot, idempotency result, or event, and retries can create duplicate effects.

### 9. Runtime environment validation, security controls, and operational ownership are promises rather than executable prerequisites

- **Location:** `ARCHITECTURE-SPINE.md` AD-13, AD-49, AD-50, AD-61; `architecture-v1.md:449-455,513-517,539-541`; `apps/api/config/database.ts` and `config/server.ts`; `infra/compose.yaml`.
- **Trigger condition:** The documents require fail-fast environment validation, injected secrets, structured redacted logs, shared-store rate limiting, and a runbook assigning owners. Current runtime configuration reads environment variables directly, `infra` contains only a PostgreSQL service, CI has no promotion/deploy stage, and no runbook or ownership register exists.
- **Required guard:** Define a minimal runtime configuration schema and owner register before the first deployable capability; make startup validation, secret references, migration ownership, promotion, and rollback evidence CI-verifiable. Defer rate limiting implementation until an exposed auth/command endpoint exists, but make that feature gate explicit.
- **Consequence:** CAP-5's ownership success signal cannot be demonstrated, and security/operational requirements will be rediscovered during deployment.

### 10. The documentation treats optional product capabilities as foundational implementation work

- **Location:** `ARCHITECTURE-SPINE.md` AD-51 through AD-57; `architecture-v1.md` Medias et fichiers through Offline et synchronisation mobile.
- **Trigger condition:** Media storage, scheduler, notifications, template management, i18n, cache invalidation, and offline all depend on modules, configuration, outbox, authorization, and deployment machinery, but none is needed to prove the first generic vertical slice.
- **Required guard:** Mark each as a feature gate with concrete entry criteria. Implement only the module/contract/outbox hooks required by the selected first capability; do not add providers, workers, storage, or templates speculatively.
- **Consequence:** The foundation becomes a multi-system platform project before it proves one end-to-end product capability.

## Required Prerequisites

The following are blocking decisions or executable foundations, in dependency order:

1. **Ratify the contract.** Reconcile the SPEC's deferrals with the spine's adopted stack and resolve the internal module-location and outbox-deferral contradictions.
2. **Make the repository model match the spine.** Add the module workspace root and extend all ownership and boundary scanners before adding module code.
3. **Create the composition bootstrap.** Define a minimal module descriptor, product manifest, resolver, generated build location, and an API image that consumes the resolved result.
4. **Make persistence deployment runnable.** Add separate, testable migration, schema synchronization, and config-sync commands with one explicit ordering and a previous-schema integration fixture.
5. **Establish the API contract chain.** Choose the authoritative OpenAPI source and deterministic generation/validation path, then make the generated client the only shared request surface.
6. **Define the first transactional slice contract.** Create its content-type registry entry, aggregate and mapper ownership, read/write permissions, snapshot fields, identity mapping, transaction boundary, idempotency record, and outbox record.
7. **Prove one vertical slice.** Thin web and mobile routes render a shared screen; that screen uses the generated client; the API controller invokes a pure domain use case through the Strapi adapter; integration tests prove contract, persistence, retry, snapshot immutability, and boundary gates.
8. **Add production gates only at their trigger.** Authentication/config-sync is required with the first authenticated flow; worker and operational replay are required with the first asynchronous effect; rate limiting is required before exposing auth or command endpoints; media, scheduler, notifications, i18n, cache, and offline remain feature-triggered.

## Smallest Viable Foundation Sequence

This is the smallest sequence that preserves the architecture without implementing optional platform capabilities.

1. **Contract ratification:** Align SPEC, spine, and human documentation on selected versus deferred decisions. Publish one owner for architecture, deployment definitions, migration runner, and rollback procedure.
2. **Repository enforcement:** Add `modules/*` to pnpm and all graph/source checks. Add negative tests for a module-to-app import, a module deep import, and a forbidden module dependency.
3. **Composition seed:** Implement a no-op product manifest and resolver that can compose a base API image. The resolver needs only dependency closure, cycle detection, resource-owner collision detection, and deterministic generated output.
4. **Persistence seed:** Provide `migrate`, one-time schema synchronization, and `config-sync` commands. Initially, `config-sync` may validate and replay an empty manifest, but its lock, idempotence, failure behavior, and CI fixture must exist.
5. **Contract seed:** Define `/api/v1` generation and validation for one command and one query, generate the client from that source, and replace direct request use with the generated client surface.
6. **First vertical transactional slice:** Add one domain use case, one classified content type, one API adapter/mapper, a transaction/idempotency/outbox implementation, and shared web/mobile screen wiring. Test immutable historical snapshots and duplicate command handling.
7. **Feature-triggered expansion:** Introduce identity, notifications, scheduler, object storage, cache invalidation, i18n, and offline only with the capability that consumes them, using the resolver and transaction/contract foundations already proven.

## Implementation Gate

Do not begin the first transactional or authenticated feature until steps 1 through 5 have passed in local and CI. A purely static shared-screen demonstration may proceed earlier, but it does not validate CAP-4 or the deployment portion of CAP-5 and must not be presented as the first end-to-end architecture proof.
