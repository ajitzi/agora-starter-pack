# Good-Spine Rubric Review

## Scope and Evidence

- **Reviewed spine:** `ARCHITECTURE-SPINE.md` (2026-09-09)
- **Source SPEC:** `_bmad-output/specs/spec-la-cabane-du-merle/SPEC.md`
- **Brownfield evidence:** workspace package manifests, `tools/check-boundaries.mjs`, `tools/check-cycles.mjs`, `.github/workflows/ci.yml`, `infra/compose.yaml`, and the web, mobile, API, and shared-package source trees.
- **Mechanical gate:** `lint_spine.py --workspace .../architecture-agora-starter-pack-2026-09-09` returned zero findings.

## Verdict

**FAIL - not ready to ratify.** The dependency/UI/runtime conventions accurately describe much of the starter, but the spine does not currently preserve the SPEC's canonical companion contract, its automated-boundary and operational-ownership success criteria, or its deferral of authentication protocol selection.

## Actionable Findings

### High - The declared source SPEC cannot adopt or be reconciled with this spine

- **Evidence:** The reviewed spine lists `../../../specs/spec-la-cabane-du-merle/SPEC.md` under `sources` (lines 11-14). That SPEC defines itself plus its `companions` as the complete canonical contract (lines 3-8), but its only companion is `../../planning-artifacts/architecture/architecture-agora-starter-pack-2026-08-24/ARCHITECTURE-SPINE.md` (line 4). That target does not exist. It does not name this 2026-09-09 spine.
- **Checklist failure:** A spec-driven spine must cover and ratify its source SPEC. The current source has an unresolved canonical companion, so no consumer can determine whether this spine supersedes, extends, or conflicts with the contract.
- **Action:** Update the SPEC's `companions` to the reviewed spine (or restore the referenced companion and explicitly establish inheritance/supersession). Then reconcile its constraints and open questions with the reviewed ADs while retaining stable AD identifiers.

### High - AD-1 overstates executable dependency enforcement and fails CAP-1

- **Evidence:** AD-1 says all monorepo imports use public `@project/*` entries and fixes the direction `apps -> screens -> domains -> core` (lines 38-42). CAP-1 requires automated rejection of *any* package-to-app dependency (SPEC lines 18-21), and CAP-5 requires local and CI rejection of forbidden imports (lines 30-32). `tools/check-boundaries.mjs` enforces restrictions only when the importer belongs to `core`, `domains`, or `screens` (lines 11-14); it has no rule preventing `ui`, `api-client`, or `config` from importing an application, nor a general direction check. `tools/check-cycles.mjs` detects cycles only (lines 21-26). CI runs these tools (CI lines 43-46), so it executes incomplete rather than complete enforcement.
- **Checklist failure:** AD-1's Rule is not enforceable as stated and does not prevent the stated package-to-runtime divergence. This leaves a source SPEC success condition uncovered.
- **Action:** Either narrow AD-1 to the boundaries the checks actually enforce, or extend the boundary checker and CI evidence to reject every package-to-app edge, deep import, and forbidden layer direction claimed by the AD.

### High - CAP-5 operational ownership is deferred instead of bound

- **Evidence:** The SPEC requires an explicit owner for each app, environment definition, migration, job, secret reference, promotion, and rollback responsibility (lines 30-32), and requires this ownership to be demonstrable for the first end-to-end capability (lines 43-45). The spine's only operational treatment defers hosting, backups, observability, promotion, and rollback (line 160); it assigns no owner for deployables, `infra/compose.yaml`, Dockerfiles, CI, secrets, migrations, or jobs. Existing delivery assets already exist in `infra/compose.yaml`, application Dockerfiles, and `.github/workflows/ci.yml`.
- **Checklist failure:** The operational/environmental dimension is present but does not cover the SPEC capability. Deferral leaves independently built deployment and operational work without the required ownership convention.
- **Action:** Add an enforceable ownership rule, using roles or repository owners rather than choosing a cloud provider, for deployables, environment definitions, secret references, migrations, jobs, promotion, and rollback. Keep provider/tool selection deferred with explicit revisit conditions.

### Medium - AD-9 selects an authentication protocol that the source SPEC explicitly defers

- **Evidence:** AD-9 binds end users to Strapi Users & Permissions with “JWT refresh” (lines 86-90). The source SPEC lists authentication protocol selection as a non-goal until a corresponding product requirement exists (lines 38-41) and leaves it as an open question (lines 47-54). The current repository configures Strapi secrets but has no end-user authentication or refresh-token implementation (`apps/api/config/admin.ts`, `.github/workflows/ci.yml` lines 60-65).
- **Checklist failure:** This is a prospective assumption that contradicts the source's explicit deferral and is not ratified by current code. The `[ASSUMPTION]` marker does not make a contract-selecting Rule safe for downstream builders.
- **Action:** Move the protocol choice to Deferred/open questions, or update the source SPEC with an approved authentication decision and implement/verify it before marking the AD adopted.

### Medium - The PostgreSQL version claim is weaker than the brownfield evidence

- **Evidence:** The stack says PostgreSQL is “defined by the deployment environment” (line 118), while the repository already pins `postgres:18.6` in local compose (`infra/compose.yaml` line 3) and CI (`.github/workflows/ci.yml` line 18). No production environment is defined.
- **Checklist failure:** The named technology is neither recorded at the version actually used by the repository nor supported by a selected production environment. This weakens the stack's current, brownfield-ratifying role.
- **Action:** State `18.6` as the development/CI PostgreSQL baseline, and defer production version/support policy with the deployment decision.

## Checklist Disposition

| Good-spine check | Result | Evidence |
| --- | --- | --- |
| Fixes real divergence points for the level below | Partial | AD-1 through AD-8 address runtime, UI, domain, API, and history seams; automated boundary and operational ownership seams remain uncovered. |
| Every AD Rule is enforceable and prevents its stated divergence | Fail | AD-1 is broader than `check-boundaries.mjs`; AD-9 selects an unimplemented/deferred protocol. Other current starter rules are structurally consistent. |
| Deferred items cannot let units diverge | Fail | The deferred operational list leaves CAP-5 responsibilities without owners. |
| Named technology is verified-current | Partial | Node, pnpm, TypeScript, Strapi, Next, Expo, and Tamagui align with manifests/lockfile. PostgreSQL does not state the existing `18.6` baseline. No external currency verification was evidenced. |
| Ratifies rather than contradicts brownfield code | Partial | The monorepo, runtime shells, Strapi, PostgreSQL, shared UI, API client, and existing checks support the principal pattern. AD-1's enforcement claim and AD-9's auth rule are not ratified. |
| Covers source SPEC capabilities | Fail | CAP-1 automated package-to-app enforcement and CAP-5 explicit operational ownership are not covered. CAP-2 to CAP-4 are represented by AD-2 to AD-10, subject to future implementation. |
| Preserves inherited parent invariants | Not applicable | The source SPEC references a missing companion; no parent spine can be loaded or checked. |
| Every system-altitude dimension is decided, deferred, or open | Partial | Application, domain, API, data-history, configuration, and operations are addressed. Operations lacks the ownership invariant required by the SPEC; no separate security/auth decision is safely deferred because AD-9 prematurely fixes it. |

## Positive Evidence

- The lint gate reports no structural spine defects: all ADs have `Binds`, `Prevents`, and `Rule`; IDs are unique; the stack has version entries.
- AD-2 through AD-5 match the current thin Next/Expo shells, router-independent `@project/screens` use, Tamagui confinement, and empty/pure shared-domain foundation.
- AD-6 through AD-8 match the current Strapi runtime, PostgreSQL configuration, and `@project/api-client` health contract foundation.
- CI executes typecheck, lint, boundary, cycle, test, build, mobile configuration, and API image smoke checks.
