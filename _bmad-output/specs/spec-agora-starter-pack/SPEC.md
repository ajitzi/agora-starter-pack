---
id: SPEC-agora-starter-pack
companions:
  - ../../planning-artifacts/architecture/architecture-agora-starter-pack-2026-09-09/ARCHITECTURE-SPINE.md
sources: []
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate.

# Agora Starter Pack Architecture

## Why

Establish a build substrate for a TypeScript monorepo spanning web, mobile, API, and shared packages. It prevents duplicated functional logic, infrastructure-coupled business rules, divergent cross-platform interfaces, and unowned deployment responsibilities as the product gains its first capabilities.

## Capabilities

- **CAP-1**
  - **intent:** The system organizes deployable runtimes and shared packages so application code never becomes a dependency of reusable code.
  - **success:** `apps/web`, `apps/mobile`, and `apps/api` consume shared packages; automated boundary checks reject any package-to-app dependency.
- **CAP-2**
  - **intent:** Each business domain isolates domain rules and application use cases behind ports so concrete transport and persistence can change without rewriting business rules.
  - **success:** A domain use case executes against a test adapter without importing HTTP, ORM, database, or provider code.
- **CAP-3**
  - **intent:** Web and mobile share router-independent screens and a project-owned UI API, using platform variants only for genuinely different journeys, structures, or interactions.
  - **success:** One screen is rendered from thin web and mobile routes without importing either router, and non-UI packages do not import Tamagui directly.
- **CAP-4**
  - **intent:** Persistent-data reads and mutations use the API-owned, versioned client contract, while historical business records preserve event-time business values.
  - **success:** A web or mobile mutation succeeds through `@project/api-client` against a conformity-tested API contract, and a later catalog change does not alter its stored historical values.
- **CAP-5**
  - **intent:** The workspace automatically rejects architectural boundary violations and gives each deployable and operational responsibility an explicit owner.
  - **success:** Local and CI checks fail on forbidden, deep, or cyclic imports; each app, environment definition, migration, job, secret reference, promotion, and rollback responsibility has an assigned owner.

## Constraints

- The mandatory dependency directions, public-entry-point imports, package structure, hexagonal boundaries, project UI API, configuration separation, module composition, Strapi 5/PostgreSQL runtime, REST/OpenAPI contract, and single-lockfile version policy are defined in `ARCHITECTURE-SPINE.md`.

## Non-goals

- Defining product behavior, domain aggregates, user roles, personal-data policy, or production service levels.
- Choosing cloud provider, production PostgreSQL policy, backup provider, alerting backend, rate-limit provider, object storage provider, notification provider, or production SLO before a product requires them.

## Success signal

- The first end-to-end capability can ship from shared web and mobile screens through a versioned API contract into a hexagonal domain, with boundary checks passing and its runtime, deployment, migration, and rollback ownership demonstrable.

## Implementation Gates

- Before the first module: resolver, descriptor schema, generated build contract and module-aware boundary checks.
- Before the first managed configuration: locked, idempotent `config-sync` with field ownership and drift tests.
- Before the first transactional or asynchronous capability: migration/schema runner, idempotency and outbox persistence, worker and scheduler as applicable.
- Before the first product endpoint: explicit OpenAPI generation, derived client and contract tests.
- Before staging: accountable operational register, schema-diff gate and backup/restore evidence.

## Open Questions

- Which first capability proves the architecture after the foundations are implemented?
- Which cloud topology, production PostgreSQL policy, backup/restore process, observability backend and operational roles meet the first production requirement?
