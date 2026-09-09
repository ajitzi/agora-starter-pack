# Technology Review

**Review date:** 2026-09-09
**Scope:** `ARCHITECTURE-SPINE.md` and `docs/architecture/architecture-v1.md`, checked against the current repository and Strapi's current official documentation.
**Verdict:** Revision required before the documents are used as an implementation-ready baseline. The selected technologies and the main Strapi 5 approach are sound, but several statements describe safeguards or integration layers that do not exist in the starter yet.

## Verified Grounding

- The workspace pins Node.js `24.0.0`, pnpm `10.14.0`, and TypeScript `5.8.3` in the root `package.json`.
- `apps/api/package.json` and the resolved package both identify `@strapi/strapi` as `5.33.0`; `pnpm --filter @project/api exec strapi version` returned `5.33.0`.
- PostgreSQL is the configured Strapi database client in `apps/api/config/database.ts`, with `pg` `8.23.0` installed.
- The lockfile grounds Next.js `16.3.2`, Expo `53.0.27`, React Native `0.79.5`, and Tamagui `2.7.7`.
- Node 24 is supported by the installed Strapi package (`>=20.0.0 <=24.x.x`) and is an active LTS version supported by current Strapi installation guidance.
- Strapi's current documentation supports using the Document Service API and its stable `documentId` in custom backend code. It also confirms that custom controllers using Document Service must sanitize output explicitly.
- Strapi's current documentation supports generated core CRUD routes, custom command routes, route policies, and Users & Permissions refresh-token mode.
- `pnpm lint`, `pnpm boundaries`, `pnpm typecheck`, and `pnpm test` pass. The test suite has four passing tests.

## Findings

### 1. Refresh-token authentication is specified as a rule but is not configured

**Locations:** `ARCHITECTURE-SPINE.md` AD-9 (lines 86-90); `docs/architecture/architecture-v1.md` Identity (lines 176-180)

Both documents prescribe short-lived JWT access tokens with refresh tokens for end users. The API has no `apps/api/config/plugins.ts` configuration, and no `jwtManagement: 'refresh'` setting. Current Strapi defaults Users & Permissions to `legacy-support`, which issues long-lived JWTs; refresh sessions require explicit plugin configuration.

**Action:** Mark refresh authentication as a future decision until configured, or add the explicit `users-permissions` refresh/session configuration before retaining it as an adopted rule. Define browser/mobile refresh-token transport and cookie security settings with that decision.

**Sources:** repository `apps/api/config/`; [Strapi Users & Permissions - JWT management modes](https://docs.strapi.io/cms/features/users-permissions#jwt-management-modes).

### 2. Rate limiting is claimed as an active cross-cutting control without an implementation

**Location:** `docs/architecture/architecture-v1.md` Validation, autorisation et erreurs (line 170)

The document says policies and middlewares provide rate limiting. The repository contains no policy or middleware and no rate-limit configuration. Strapi documents a configurable limiter for Users & Permissions authentication and registration endpoints only; route policies and middleware are extension points, not an automatic general API limiter.

**Action:** State rate limiting as deferred, or name and configure the intended global/route middleware and its storage, keys, limits, and proxy/IP behavior. Do not imply that arbitrary command endpoints are rate-limited merely because they use Strapi policies.

**Sources:** repository `apps/api/src/` and `apps/api/config/`; [Strapi Users & Permissions - rate limiting](https://docs.strapi.io/cms/features/users-permissions#rate-limiting-configuration); [Strapi routes](https://docs.strapi.io/cms/backend-customization/routes).

### 3. The documented shared HTTP client is not yet capable of the promised contract

**Locations:** `ARCHITECTURE-SPINE.md` AD-8 (lines 80-84); `docs/architecture/architecture-v1.md` lines 171-174

`@project/api-client` exists, but neither application depends on it. Its only generic request function accepts a base URL and route, always performs an unauthenticated `GET`, and has no headers, body, method, DTO modules, or mutation support. It therefore cannot implement the stated authentication-header concentration or the proposed command endpoints.

**Action:** Describe `@project/api-client` as a seed until it is integrated, or implement the minimum authenticated request and mutation API before presenting it as the exclusive shared HTTP boundary.

**Sources:** `apps/web/package.json`, `apps/mobile/package.json`, `packages/api-client/src/http.ts`, `packages/api-client/src/openapi.ts`.

### 4. The claimed API-to-domain adapter boundary has no current package dependency or implementation path

**Locations:** both dependency diagrams (`ARCHITECTURE-SPINE.md` line 32; `docs/architecture/architecture-v1.md` line 25); `docs/architecture/architecture-v1.md` lines 127-149

The diagrams and text require `apps/api -> packages/domains`, adapters, and mappers, but `apps/api/package.json` has no `@project/domains` workspace dependency and the only API code is an unauthenticated health controller. `packages/domains` is an empty public barrel. The architecture is a reasonable target, but it is not currently an implemented monolith boundary.

**Action:** Label this as target structure in both documents and make the first command slice add the workspace dependency, a port, a Strapi adapter, and a controller integration test. This will make the rule enforceable rather than aspirational.

**Sources:** `apps/api/package.json`, `apps/api/src/api/health/`, `packages/domains/src/index.ts`.

### 5. The existing custom Strapi route uses the legacy short handler form

**Location:** `apps/api/src/api/health/routes/health.ts` line 2; relevant to the route conventions in both documents

The sole custom route declares `handler: 'health.index'`. Current Strapi documentation permits this for backwards compatibility but recommends fully-qualified API handlers such as `api::health.health.index` to avoid ambiguity. The architecture does not establish the recommended convention, so the starter's only example will be copied as a legacy pattern.

**Action:** Add the fully-qualified handler convention to the Strapi route guidance and update the health route when source changes are next permitted.

**Sources:** [Strapi routes - custom routers](https://docs.strapi.io/cms/backend-customization/routes#creating-custom-routers); [Strapi controllers](https://docs.strapi.io/cms/backend-customization/controllers#controllers--routes-how-routes-reach-controller-actions).

## Residual Notes

- The `documentId` convention, generated CRUD restriction for transactional aggregates, explicit custom command routes, DTO separation, and Document Service choice fit Strapi 5.33.0.
- Document Service output is not automatically sanitized. The documents correctly require sanitization, but the first custom controller must use the documented factory helpers or `strapi.contentAPI.sanitize.output()` with the content type and `ctx.state.auth`.
- API tokens are technically valid for external Content API consumers, not inherently limited by Strapi to server-to-server callers. The documents may retain that restriction as a project security policy, but it needs operational enforcement and should not be presented as platform behavior.
