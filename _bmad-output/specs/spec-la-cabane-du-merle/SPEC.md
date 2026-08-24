---
id: SPEC-la-cabane-du-merle
companions:
  - ../../planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md
sources: []
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate.

# La Cabane du Merle Architecture

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

- The mandatory dependency directions, public-entry-point imports, package structure, hexagonal boundaries, project UI API, configuration separation, and single-lockfile version policy are defined in `ARCHITECTURE-SPINE.md`.

## Non-goals

- Selecting the deferred API framework, HTTP contract format, authentication protocol, database, ORM, migration strategy, cloud topology, observability stack, job mechanism, authorization policy, or delivery toolchain before the corresponding product requirement exists.
- Defining product behavior, domain aggregates, user roles, personal-data policy, or production service levels.

## Success signal

- The first end-to-end capability can ship from shared web and mobile screens through a versioned API contract into a hexagonal domain, with boundary checks passing and its runtime, deployment, migration, and rollback ownership demonstrable.

## Assumptions

- API contract ownership, automated boundary enforcement, delivery ownership, and stack version compatibility are architecture assumptions to validate during implementation.

## Open Questions

- Which API framework, HTTP contract format, and authentication protocol will implement the first API capability?
- Which database, ORM, migration approach, cloud topology, observability, job mechanism, authorization policy, and delivery toolchain meet the first production requirements?
