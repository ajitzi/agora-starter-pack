# Final Adversarial Architecture Review

## Scope and Evidence

- **Reviewed:** `ARCHITECTURE-SPINE.md` and `docs/architecture/architecture-v1.md`.
- **Method:** adversarial invariant review and exhaustive handling review. Each finding identifies a path in which independently implemented lower-level units can follow the stated decisions yet diverge, or a current repository condition that conflicts with an adopted decision.
- **Brownfield evidence:** `tools/check-boundaries.mjs`, `tools/workspace-graph.mjs`, `package.json`, `pnpm-workspace.yaml`, `apps/api/config/*.ts`, `apps/api/src/api/health/**`, `apps/api/package.json`, and `infra/compose.yaml`.
- **Validation run:** `pnpm boundaries`, `pnpm cycles`, `pnpm typecheck`, and `pnpm test` passed. This confirms the current starter gates and four tests; it does not demonstrate the proposed module, deployment, security, or data-governance controls.

## Verdict

**FAIL - do not ratify as an implementation-ready architecture baseline.** The documents now decide many important dimensions, but several adopted ADs are internally contradictory, are only promises of future tooling, or are contradicted by the brownfield runtime. Consequently, lower-level teams can produce incompatible module, command, outbox, deployment, and API implementations without violating a sufficiently precise local rule.

## Rubric Disposition

| Final-rubric check | Result | Evidence |
| --- | --- | --- |
| Every invariant is enforceable | Fail | AD-15, AD-21 through AD-23, AD-26 through AD-31, AD-37, AD-41, and AD-52 require resolvers, registries, or contract gates whose protocol, owner, and CI implementation are absent or deferred. |
| Lower-level units cannot diverge while obeying ADs | Fail | Identity selection, module source location, in-flight idempotency, lease expiry, resource ownership, and deployment topology permit distinct compliant implementations. |
| Every operational dimension is decided or safely deferred | Fail | Scheduler deployment, backup/restore verification, route rate-limit configuration, and production ownership remain incomplete. The deferred list does not give each open choice a decision owner, deadline, or blocking condition. |
| Brownfield code is not contradicted | Fail | The sole public health route violates the stated success envelope and no-store/rate-limit declarations; refresh auth, strict CSP, environment validation, config-sync, modules workspace, and scheduler/worker topology are not present. |

## Findings

### 1. Identity is both deferred and selected

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-9 and AD-42; `docs/architecture/architecture-v1.md` Identity
- **trigger_condition:** AD-9 blocks the end-user identity and JWT choice until the first authenticated capability, while AD-42 adopts Users & Permissions, refresh sessions, and web/mobile token transport for V1.
- **guard_snippet:** Keep identity and session protocol deferred with a first-auth-flow decision gate, or replace AD-9 with the adopted AD-42 decision and require its plugin, CSRF, CORS, cookie, and mobile-storage configuration before activation.
- **potential_consequence:** A feature team can reasonably implement default long-lived JWT behavior or refresh sessions, each citing an AD, and clients will have incompatible session semantics.

### 2. The module source location is contradictory

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-27; `docs/architecture/architecture-v1.md` Modules et plugins Strapi, lines 201 and 215-230
- **trigger_condition:** The detail document says activable adaptations live by default inside `apps/api`, then says they are sourced from workspace `modules/<module>`; the spine adopts only the latter.
- **guard_snippet:** Select `modules/<module>` as the sole source location, remove the conflicting `apps/api` default, add `modules/*` to `pnpm-workspace.yaml`, and name the generated build input/output contract.
- **potential_consequence:** Two modules can expose equivalent Strapi resources from different roots, bypassing a single resolver, ownership scan, and build materialization path.

### 3. Composition decisions claim CI enforcement without an executable authority

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-21, AD-22, AD-26 through AD-30, and Deferred; `docs/architecture/architecture-v1.md` lines 230-238 and 279-294
- **trigger_condition:** The resolver must validate dependency closure, resource ownership, slots, routes, jobs, capabilities, and image materialization, but its protocol/tool is explicitly deferred and no modules workspace or resolver exists.
- **guard_snippet:** Before the first module, version a module descriptor schema and resolver CLI with a single resource-key namespace, deterministic generated output, CI invocation, and fixture tests that reject duplicate owners, slots, routes, and jobs.
- **potential_consequence:** Independent module authors can declare incompatible resource names or ownership semantics while each believes it satisfies the same AD vocabulary.

### 4. `config-sync` has no field-ownership or unmanaged-drift rule

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-14 through AD-18; `docs/architecture/architecture-v1.md` Configuration par le code and Job `config-sync`
- **trigger_condition:** The documents require convergence and failure on unmanageable drift but do not specify managed fields, immutable fields, the treatment of manually created resources with a managed key, or the diagnostic/repair contract.
- **guard_snippet:** Define a manifest resource schema containing stable key, module owner, managed-field set, mutable/operator-owned-field set, and drift disposition; make dry-run CI and deployment fail deterministically on any disallowed state.
- **potential_consequence:** Two synchronizers can both be idempotent yet overwrite different role, permission, locale, or reference-data fields on every deployment.

### 5. Command idempotency does not define the concurrent-request path

- **lens:** edge-case-hunter
- **location:** `ARCHITECTURE-SPINE.md` AD-12 and AD-41; `docs/architecture/architecture-v1.md` lines 413-414
- **trigger_condition:** Two identical requests can reserve the same actor/endpoint/key before either has stored its initial result; the required response for the second in-flight request is unspecified.
- **guard_snippet:** "idempotency record has pending|completed state; atomically insert unique(actor, endpoint, key); same hash waits or returns documented 202/409; completed stores replayable status, headers, body"
- **potential_consequence:** Duplicate commands can execute, or clients receive inconsistent retry outcomes during timeouts and concurrent retries.

### 6. An expired outbox lease permits overlapping external effects

- **lens:** edge-case-hunter
- **location:** `ARCHITECTURE-SPINE.md` AD-32 through AD-35; `docs/architecture/architecture-v1.md` lines 267-273
- **trigger_condition:** A worker exceeds its lease while an external provider call is still running, allowing a second worker to reclaim and invoke the same handler concurrently.
- **guard_snippet:** "claim includes fencing token; renew lease while processing; handler writes and provider requests carry event/handler idempotency key; stale token cannot confirm completion"
- **potential_consequence:** A slow email, payment, webhook, or notification can be sent twice despite handler-level processing records.

### 7. Event-handler identity is not versioned across deployments

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-32, AD-33, and AD-36; `docs/architecture/architecture-v1.md` Outbox transactionnel
- **trigger_condition:** Processing is journaled by event-handler pair, but handler identity/version and compatibility rules are absent when the same image digest is promoted or a handler is changed before delayed events are consumed.
- **guard_snippet:** Persist immutable `eventType`, `eventSchemaVersion`, and `handlerVersion`; require an upcaster or explicit old-handler compatibility for every changed event contract and test pending-event upgrades.
- **potential_consequence:** A new worker can reject, reinterpret, or silently reprocess events created by a previous composition.

### 8. The scheduler is required but omitted from the mandatory deployment topology

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-33, AD-47, and AD-52; `docs/architecture/architecture-v1.md` Jobs planifies and Livraison et promotion
- **trigger_condition:** AD-52 requires a dedicated scheduler from the composed image, but AD-47 and the delivery document start only API HTTP and worker after `config-sync`.
- **guard_snippet:** Add scheduler as a named independently scaled service to the composed-image/deployment manifest, promotion order, health/readiness contract, runbook, and reference-composition tests.
- **potential_consequence:** A deployment can satisfy the documented API/worker sequence while no scheduled work is ever claimed or enqueued.

### 9. OpenAPI is declared authoritative without a deterministic generation and compatibility gate

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-37 through AD-40 and Deferred; `docs/architecture/architecture-v1.md` lines 401-411
- **trigger_condition:** The composed build must generate OpenAPI 3.1 and derive the client, while the source, normalization for custom Strapi routes, publication path, breaking-change detector, and `documentId` mapping remain undecided.
- **guard_snippet:** Select one checked-in normalized OpenAPI artifact; make build fail unless generated routes, examples, Problem Details, cursor metadata, and generated client match it; run semantic compatibility comparison per API major version.
- **potential_consequence:** Controllers, the specification, and the generated client can all be versioned yet describe incompatible DTOs and error shapes.

### 10. The adopted REST envelope already conflicts with the public health controller

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-39 and AD-61; `docs/architecture/architecture-v1.md` REST envelopes and Securite de frontiere; `apps/api/src/api/health/controllers/health.ts:1-5`; `apps/api/src/api/health/routes/health.ts:1-3`
- **trigger_condition:** AD-39 binds Strapi controllers to `{ data, meta? }`, while the only controller returns `{ status: 'ok'}`; the explicitly public route declares neither a rate-limit policy nor a documented public-surface exception.
- **guard_snippet:** State that operational endpoints are exempt from the product envelope and list their required response/security contract, or change the health route to the adopted envelope and declare its public rate-limit treatment.
- **potential_consequence:** New operational controllers will copy the existing pattern or the AD, producing multiple supposedly canonical response and exposure conventions.

### 11. Security and runtime-validation ADs are not ratified by the current shells

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-42, AD-49, AD-56, and AD-61; `docs/architecture/architecture-v1.md` Secrets, Cache, and Securite de frontiere; `apps/api/config/server.ts:1-5`; `apps/api/config/admin.ts:1-5`
- **trigger_condition:** The documents adopt refresh auth, startup environment validation, strict CSP, explicit public cache headers, and shared-store rate limiting, but the API config only reads variables, accepts `Number` values without schema validation, and contains no plugin, middleware, or header configuration.
- **guard_snippet:** Mark each control as a first-surface implementation gate with an owner and required test, or implement a validated config schema plus explicit auth, CSP, cache, CORS/CSRF, and rate-limit middleware before calling the AD adopted.
- **potential_consequence:** Teams will infer that platform defaults meet the controls, leaving invalid configuration, public caching, and abuse protection divergent by route.

### 12. Operational deferrals have no accountable decision and verification boundary

- **lens:** adversarial
- **location:** `ARCHITECTURE-SPINE.md` AD-13, AD-47 through AD-49, and Deferred; `docs/architecture/architecture-v1.md` Livraison et promotion and Configuration, tests et exploitation
- **trigger_condition:** Cloud, production PostgreSQL policy, backup/restore, observability, SLO, roles, and migration jobs are deferred, while the runbook is only required "before production" and assigns roles rather than accountable repository/deployment ownership.
- **guard_snippet:** Create an operations decision register naming the accountable role, evidence artifact, due trigger, and release-blocking check for environment definition, migration execution, backup/restore drill, secrets, promotion, rollback, scheduler, worker, and alerting.
- **potential_consequence:** A first deployable product can reach staging with no owner or tested recovery procedure for a failed migration, lost outbox event, or restore.

## Brownfield Alignment

- The existing thin mobile shell, Strapi/PostgreSQL runtime, public-barrel boundary checker, and PostgreSQL `18.6` development/CI baseline support the broad monorepo direction.
- The checker correctly rejects package-to-app imports, deep/cross-package imports, non-UI Tamagui imports, and several declared package directions. It cannot validate the proposed module composition, data registry, deployment, outbox, API-contract, or operational invariants because those units do not yet exist.
- Existing working-tree modifications were not changed by this review. Only this review artifact was added.

## Ratification Conditions

1. Resolve the AD-9/AD-42 identity conflict and the two module-source-location statements.
2. Specify and implement the module resolver/registry and `config-sync` ownership/drift contracts before any module or managed resource is introduced.
3. Close the idempotency, outbox lease/fencing, handler-version, and scheduler-deployment paths before the first transactional or asynchronous capability.
4. Reconcile adopted HTTP/security/runtime rules with the health route and current configuration, or mark the controls explicitly deferred behind first-surface release gates.
5. Add accountable operational decision records and verification evidence before staging or production promotion.
