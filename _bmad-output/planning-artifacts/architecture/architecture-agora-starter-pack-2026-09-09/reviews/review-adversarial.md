# Adversarial Review - Architecture Spine

## Verdict

Not ready to implement transactional functionality safely. The dependency and runtime boundaries are clear, but the spine does not yet make data classification, write ownership, transaction boundaries, or contract ownership executable. Separate lower-level units can comply with every stated AD while producing competing persistence paths and incompatible representations.

## Scope and Method

Reviewed `ARCHITECTURE-SPINE.md` independently through the adversarial lens. The review constructs plausible packages, Strapi slices, controllers, and adapters that each satisfy their local architectural decision, then checks whether their composition preserves a single owner, mutation path, and representation for shared data. Particular attention was given to editorial Strapi content versus transactional and historical data.

## Findings

### 1. Classification is deferred past the point where AD-7 needs it

- **lens:** adversarial
- **location:** AD-6, AD-7, Deferred
- **trigger_condition:** A team can create a Strapi content-type before deciding whether it is editorial, transactional, or historical, yet that classification is the condition that selects its allowed write path.
- **guard_snippet:** Require a checked-in per-content-type registry before implementation with classification, aggregate owner, allowed routes, Content Manager permissions, and snapshot policy; block unclassified types from route generation and release.
- **potential_consequence:** One slice can expose generated CRUD for a type another slice treats as an aggregate, bypassing the command use case while both implementations appear compliant locally.

### 2. “Schema owner” does not define business-data ownership

- **lens:** adversarial
- **location:** AD-5, AD-6, Capability -> Architecture Map
- **trigger_condition:** Strapi owns content-type schemas while domains own entities and invariants, but no rule assigns a single owner for field meaning, lifecycle transitions, and cross-slice references.
- **guard_snippet:** For every aggregate and editorial type, record the domain owner, Strapi schema owner, authoritative representation, mapper owner, and permitted readers/writers in the architecture or an ADR-backed registry.
- **potential_consequence:** A domain package and a Strapi slice can independently add or reinterpret the same field, producing valid schemas and valid entities that disagree about state and meaning.

### 3. Domain-to-Strapi mapping has no canonical boundary

- **lens:** adversarial
- **location:** AD-5, AD-6, Structural Seed
- **trigger_condition:** AD-5 places adapters in the implementing runtime, while the seed offers generic Strapi `services` without a canonical mapper or adapter location and API; multiple controllers can map the same domain entity differently.
- **guard_snippet:** Establish one adapter and mapper module per aggregate under a prescribed `apps/api` location, export it only to its slice composition root, and prohibit controller-local persistence mapping.
- **potential_consequence:** Two command controllers can serialize the same aggregate to different Strapi field shapes or omit different invariants despite both invoking a pure domain use case.

### 4. Generated CRUD is only optionally constrained for transactional types

- **lens:** adversarial
- **location:** AD-7
- **trigger_condition:** Transactional writes are required to use commands, but generated CRUD “can be limited or disabled,” which permits an implementation to retain update/delete routes and call it a configuration choice.
- **guard_snippet:** Define the default as generated create/update/delete routes disabled for every transactional and historical type, with an explicit reviewed exception list and an automated route/permission assertion.
- **potential_consequence:** A client or internal integration can mutate aggregate state through `PUT`, `DELETE`, or generated admin-facing routes without reaching the command path.

### 5. Content Manager access is not a mutation control

- **lens:** adversarial
- **location:** AD-7, Consistency Conventions: Mutations
- **trigger_condition:** Limiting admin roles does not specify which fields, states, or lifecycle actions may be changed in the Content Manager, nor does it force those changes through domain invariants.
- **guard_snippet:** Declare Content Manager access per classification: editorial-only write access; transactional and historical records read-only or absent; enforce field-level restrictions and audit tests in Strapi configuration.
- **potential_consequence:** An administrator can directly alter an order status, snapshot, or historical record in the back office, creating a state no command could produce.

### 6. Concurrent commands have no declared consistency mechanism

- **lens:** adversarial
- **location:** AD-7, Deferred
- **trigger_condition:** Two controllers can each perform `accept`, `prepare`, or `deliver` through the prescribed route-controller-use-case-adapter chain, but the spine defers transactions and concurrency control.
- **guard_snippet:** For the first transactional aggregate, require a declared transaction scope plus an optimistic version/check-and-set or database locking rule for state transitions; test concurrent duplicate and competing commands.
- **potential_consequence:** Simultaneous valid commands can both observe the old state and write incompatible transitions, duplicate capacity consumption, or overwrite each other.

### 7. Multi-write commands can split aggregate state and history

- **lens:** adversarial
- **location:** AD-10, Deferred
- **trigger_condition:** A command may write an aggregate, snapshots, and a persistent internal event via separate Document Service calls, while their common transaction boundary is explicitly undecided.
- **guard_snippet:** Specify that aggregate update, immutable snapshot creation, and event/audit append share one database transaction, including the adapter API that receives the transaction context.
- **potential_consequence:** A committed order can lack its immutable snapshot or audit event, or an event can describe a state change that never persisted.

### 8. Persistent events have no append ownership or replay contract

- **lens:** adversarial
- **location:** AD-10
- **trigger_condition:** Events are required to be persistent, but no event schema, writer, deduplication key, ordering rule, or distinction between audit history and integration work is assigned.
- **guard_snippet:** Define an event record owner and append-only schema containing aggregate identity, transition version, occurred-at timestamp, idempotency key, payload snapshot, and dispatch state; only the aggregate command adapter may append it.
- **potential_consequence:** Different slices can persist incompatible event shapes, duplicate events on retries, or treat editable Strapi records as immutable facts.

### 9. Editorial references can leak mutable content into historical facts

- **lens:** adversarial
- **location:** AD-6, AD-10, Deferred
- **trigger_condition:** Editorial catalogue content may be related to transactional records in Strapi, but no rule says which attributes are copied at which transition and which relation remains navigational only.
- **guard_snippet:** For each transactional-to-editorial reference, list the immutable snapshot fields, snapshot creation transition, and whether the live relation is optional display metadata only; enforce it in the mapper.
- **potential_consequence:** A historical order can render current product names, prices, units, or AMAP composition after editorial content changes, despite storing a nominal snapshot.

### 10. Identifier convention does not govern persistence and relation keys

- **lens:** adversarial
- **location:** Consistency Conventions: Identifiants
- **trigger_condition:** DTOs expose Strapi `documentId` and domain entities are independent of its semantics, but no mapping policy governs domain identity, Strapi internal IDs, relation keys, and event identities.
- **guard_snippet:** Define one external aggregate ID mapping and forbid domain code from carrying Strapi IDs; specify the exact key used for Strapi relations, command paths, snapshots, events, and idempotency records.
- **potential_consequence:** One adapter can persist or compare internal numeric IDs while another uses `documentId`, causing broken relations, failed authorization checks, or events attached to the wrong record.

### 11. DTO versioning has no authoritative source or compatibility gate

- **lens:** adversarial
- **location:** AD-8, Deferred
- **trigger_condition:** The HTTP contract and errors are said to be versioned, while concrete OpenAPI, client generation, and conformance tests are deferred; controllers and `@project/api-client` can evolve separate DTO definitions.
- **guard_snippet:** Select a single contract source before the first endpoint, commit versioning and deprecation rules, generate or validate the client from it, and run contract tests against every controller route.
- **potential_consequence:** Web and mobile can compile against a shared client whose payload or error interpretation no longer matches Strapi, creating runtime-only failures.

### 12. Authorization ownership is split without a decision table

- **lens:** adversarial
- **location:** AD-9
- **trigger_condition:** Policies enforce boundary authorization and use cases reapply “necessary” business rules, but the term does not allocate authentication, role, tenant/ownership, state, and field-level decisions to one layer.
- **guard_snippet:** Add an authorization decision table per command and query that names the policy check, domain authorization input, data needed to evaluate it, and the required repository filtering rule.
- **potential_consequence:** A controller can correctly authenticate a caller while a use case trusts an unscoped aggregate lookup, allowing cross-user or cross-organization actions through an otherwise valid command route.

### 13. Query paths can bypass the same representation and visibility rules

- **lens:** adversarial
- **location:** AD-5, AD-7, AD-8
- **trigger_condition:** The spine constrains transactional mutations but does not define whether transactional reads use domain query ports, Strapi Document Service directly, or generated REST controllers.
- **guard_snippet:** Classify reads alongside writes: name the query owner, DTO mapper, authorization filter, and whether generated Strapi reads are allowed for each type.
- **potential_consequence:** A command path can preserve invariants while a generated read exposes unsanitized fields, stale live editorial relations, or records outside the caller's scope.

### 14. Schema migrations have an undecided writer and deployment order

- **lens:** adversarial
- **location:** AD-6, Deferred
- **trigger_condition:** Strapi content-types are the persistence schema source of truth, yet SQL migrations and deployment strategy are deferred; a Strapi schema change and a domain mapper change can ship in incompatible order.
- **guard_snippet:** Choose and document the schema migration authority, migration review process, backward-compatible rollout sequence, and rollback rule before the first persisted transactional type.
- **potential_consequence:** A deployed API can execute a valid new command adapter against a database lacking its required field, index, constraint, or historical table.

## Closing Assessment

The spine successfully prevents obvious runtime and import coupling. Its remaining failure mode is not a violation of a local AD; it is two locally compliant implementations choosing different owners, representations, or write mechanisms for the same data. Resolve the classification registry, command/Content Manager enforcement, transaction and event boundary, identity mapping, and contract authority before introducing the first transactional content-type.
