---
title: 'Story 1.3 : Automatiser la CI et produire les artefacts'
type: 'feature'
created: '2026-08-26'
status: 'done'
review_loop_iteration: 1
baseline_commit: 'da73370af1e71bf13e6f1df55a7c29ff002a0250'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/planning-artifacts/epics.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le workspace vérifie localement ses frontières et son contrat, mais aucun contrôle GitHub ne rend ces garanties obligatoires avant intégration ni ne produit les images web et API nécessaires aux branches de livraison.

**Approach:** Ajouter une CI GitHub Actions reproductible: `develop` et les pull requests exécutent uniquement les gates de qualité; `preprod` et `main` les exécutent puis construisent et publient les images OCI web et API dans GHCR, avec provenance SHA et digest.

## Boundaries & Constraints

**Always:** Utiliser Node `24.0.0`, Corepack et `pnpm install --frozen-lockfile`. `develop` et les pull requests exécutent installation, types, lint, frontières, cycles, tests et conformité OpenAPI, sans publier de build ou image. `preprod` et `main` exécutent les mêmes gates avant de construire les images web et API. Chaque image GHCR porte le SHA Git complet, son digest OCI et exclut secrets, `.env` et configuration runtime. Les scripts existants restent la source de vérité; l'image est publiée seulement si toutes les gates réussissent. Documenter le ruleset GitHub requis sur `develop`, `preprod` et `main`: pull request obligatoire et statut `Quality gates` obligatoire avant fusion, sans contournement usuel.

**Ask First:** Modifier les versions Node, pnpm, Next ou Adonis; ajouter un déploiement, une promotion automatique, une image mobile ou une politique de rétention autre que celle de GHCR; ajouter une gate non disponible dans les scripts racine existants.

**Never:** Ne pas intégrer ou publier secret, `APP_KEY`, environnement, configuration de production ou donnée métier. Ne pas publier d'image depuis `develop` ou une pull request, ni déployer depuis cette CI. Ne pas utiliser un tag mutable de branche comme identifiant de release: le SHA et le digest OCI sont les références immuables.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Gate de développement | Pull request vers une branche protégée | Toutes les gates s'exécutent, sans build ni publication d'image | Le ruleset refuse la fusion si `Quality gates` échoue ou manque |
| Candidate d'environnement | Push `preprod` ou `main` après gates vertes | Images web et API publiées dans GHCR avec SHA et digest | Aucun push vers GHCR si une gate ou un build échoue |
| Lockfile ou contrat divergent | Dépendance non verrouillée ou client OpenAPI divergent | Installation ou `openapi:verify` échoue | Aucune image publiée |
| Référence mutable | Tag de branche mis à jour | Le digest et le tag SHA restent les références de provenance | Les déploiements futurs doivent consommer SHA ou digest, jamais un tag de branche |

</frozen-after-approval>

## Code Map

- `package.json:4-7,14-22` -- versions et scripts de gate existants.
- `pnpm-lock.yaml:1-10`, `pnpm-workspace.yaml:1-3`, `.npmrc:1-3` -- workspace unique et installation stricte.
- `apps/web/package.json:5-9` -- `next build` produit `.next`; ajouter son image OCI sans runtime embarqué.
- `apps/api/package.json:6-10`, `apps/api/start/env.ts:3-9` -- `node ace.js build` produit `build`; l'image API conserve `APP_KEY` au runtime.
- `.gitignore:3-10`, `packages/testing/tests/boundaries.test.mjs:68-114` -- exclusions d'environnement et clé injectée uniquement aux tests.
- `tools/check-source.mjs:4-21`, `tools/check-boundaries.mjs:3-20`, `tools/check-cycles.mjs:3-26` -- contrôles à appeler sans les dupliquer.
- `README.md:5-26` -- documentation de l'installation et contrôles à compléter.
- `apps/web/Dockerfile`, `apps/api/Dockerfile` -- nouveaux builds OCI distincts pour les applications.
- `.github/workflows/ci.yml` -- nouveau workflow de gates, builds et publication GHCR conditionnés par la branche.

## Tasks & Acceptance

**Execution:**
- [x] `.github/workflows/ci.yml` -- créer la CI `develop`/pull request avec Node 24, Corepack, installation figée et scripts de gate existants, sans build ni publication -- bloquer toute intégration non vérifiée.
- [x] `apps/web/Dockerfile`, `apps/api/Dockerfile` -- définir deux images OCI de production séparées, construites sans secret ni configuration runtime -- rendre les sorties applicatives déployables et isolées.
- [x] `.github/workflows/ci.yml` -- sur `preprod` et `main`, après les gates, construire et publier les deux images dans GHCR avec labels SHA et sorties digest -- fournir des candidates immuables par environnement sans déploiement.
- [x] `README.md` -- documenter les branches, gates, images GHCR, références SHA/digest et le ruleset obligatoire pour les branches protégées -- rendre la politique opérable et effectivement bloquante.
- [x] `packages/testing/tests/ci-workflow.test.mjs` -- vérifier statiquement les déclencheurs, versions, installation, gates, absence de publication sur `develop`, builds OCI, permissions GHCR, références SHA/digest et documentation du ruleset -- prévenir les régressions déclaratives.

**Acceptance Criteria:**
- Given une pull request vers `develop`, `preprod` ou `main`, when la CI démarre, then elle utilise Node `24.0.0`, pnpm figé et les gates requises, sans construire ni publier d'image; le ruleset obligatoire refuse la fusion si `Quality gates` échoue ou manque.
- Given un push sur `preprod` ou `main`, when les gates réussissent, then la CI construit et publie séparément les images web et API dans GHCR.
- Given une image publiée, when sa provenance est inspectée, then elle expose le SHA Git complet et son digest OCI, sans `.env`, secret ni configuration runtime.
- Given une gate ou un build en échec sur `preprod` ou `main`, when le workflow termine, then aucune image GHCR n'est publiée.
- Given une promotion future, when une image est sélectionnée, then elle est référencée par SHA ou digest, jamais par un tag de branche mutable.

## Spec Change Log

- 2026-08-27: La revue a montré qu'un échec Actions seul ne bloque pas une fusion. La spécification exige désormais le ruleset GitHub et sa documentation, afin d'éviter une garantie d'intégration seulement déclarative. Conserver les branches, gates, images GHCR et références SHA/digest déjà validées.

## Design Notes

Le SHA Git et le digest OCI identifient une image de façon immuable; les tags de branche restent des pointeurs pratiques mais ne doivent jamais servir à promouvoir ou déployer. La promotion et les tags SemVer relèvent d'une story ultérieure.

## Verification

**Commands:**
- `pnpm install --frozen-lockfile` -- expected: installation déterministe avec pnpm `10.14.0` et Node `24.0.0`.
- `pnpm typecheck && pnpm lint && pnpm boundaries && pnpm cycles && pnpm test` -- expected: toutes les gates locales de la CI terminent avec un code 0.
- `docker build -f apps/web/Dockerfile .` -- expected: le web produit une image sans variable de runtime ni secret.
- `docker build -f apps/api/Dockerfile .` -- expected: l'API produit une image dont les variables sensibles restent runtime.
- `node --test packages/testing/tests/*.test.mjs` -- expected: le test de workflow couvre les branches, gates, images et GHCR.

## Suggested Review Order

**Contrat CI**

- Sépare les gates universelles de la publication réservée aux branches de livraison.
  [`ci.yml:1`](../../.github/workflows/ci.yml#L1)

- Démarre les images avant GHCR pour empêcher toute candidate non exécutable.
  [`ci.yml:36`](../../.github/workflows/ci.yml#L36)

- Publie uniquement après smoke tests, avec provenance et références digest.
  [`ci.yml:96`](../../.github/workflows/ci.yml#L96)

**Images de runtime**

- Assemble le web depuis les dépendances workspace nécessaires à Next.
  [`Dockerfile:1`](../../apps/web/Dockerfile#L1)

- Préserve les secrets API pour l'environnement d'exécution uniquement.
  [`Dockerfile:1`](../../apps/api/Dockerfile#L1)

**Exploitation et preuves**

- Documente branches, références immuables et ruleset GitHub obligatoire.
  [`README.md:28`](../../README.md#L28)

- Verrouille les invariants déclaratifs de CI, conteneurs et ruleset.
  [`ci-workflow.test.mjs:5`](../../packages/testing/tests/ci-workflow.test.mjs#L5)
