---
title: 'Story 1.1 : Initialiser le workspace et ses frontières'
type: 'feature'
created: '2026-08-25'
status: 'done'
review_loop_iteration: 0
baseline_commit: '74f698d045e6a120ca725e58bdf42de46816fc03'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le dépôt ne contient encore qu'un seed vide, sans workspace, outillage commun ni contrôle qui empêche les futures capacités de dériver de l'architecture retenue. Les développements des applications web et API ne peuvent donc pas démarrer de façon reproductible.

**Approach:** Établir un monorepo TypeScript pnpm avec les applications et packages V1, leurs entrées publiques et des scripts de contrôle racine. Poser uniquement les frontières et le contrat de structure nécessaires aux stories suivantes, sans créer de capacité métier, de route applicative ni de persistance spéculative.

## Boundaries & Constraints

**Always:** Utiliser pnpm et un unique `pnpm-lock.yaml` racine; épingler Node.js `24.0.0`, Next.js `16.3.2`, AdonisJS `7.5.0`, Lucid `22.4.2`, OpenAPI `3.1.2`, Tamagui `2.7.7` et PostgreSQL `18.6` dans l'image d'infrastructure. Créer `apps/web`, `apps/api/openapi`, `apps/api/app/adapters`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`. Faire respecter les points d'entrée publics, l'absence d'imports profonds et de cycles, et la direction `apps -> screens -> domain/application -> core`; seul `@project/ui` peut importer Tamagui. Garder domaine et application indépendants de HTTP, ORM et framework UI; confiner les futurs adaptateurs, modèles Lucid, migrations et transactions dans `apps/api`.

**Ask First:** Tout changement de version épinglée, ajout d'un runtime déployable, d'une dépendance de production non nécessaire au seed, d'un outil de contrôle non compatible avec les scripts racine, ou modification des frontières ci-dessus.

**Never:** Créer ou déployer `apps/mobile`, précréer une table, migration, modèle Lucid, entité, endpoint, route Next ou règle métier. Ne placer ni secret ni configuration runtime dans un package partagé; ne créer ni client API concurrent ni schéma HTTP manuscrit hors du futur contrat possédé par `apps/api/openapi`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Installation reproductible | Clone sans dépendances | `pnpm install --frozen-lockfile` utilise le seul lockfile racine et prépare tous les workspaces | Échec non nul si le lockfile ou les manifests divergent |
| Import autorisé | Une app importe le point d'entrée public d'un package permis | Le contrôle de frontières réussit | N/A |
| Import interdit | Import profond, cycle, direction inverse, Tamagui hors `@project/ui` ou routeur dans `@project/screens` | Le contrôle local échoue avec un diagnostic exploitable | Code de sortie non nul sans masquer la violation |
| Seed de données | Workspace fraîchement initialisé | Aucune table métier, migration, modèle Lucid ou donnée par défaut n'est créé | N/A |

</frozen-after-approval>

## Code Map

- `apps/.gitkeep` -- placeholder à remplacer par les runtimes `web` et `api`; aucun runtime n'existe aujourd'hui.
- `packages/ui/.gitkeep` -- seul package initial présent; le futur manifeste `@project/ui` est le propriétaire exclusif de Tamagui.
- `infra/.gitkeep` -- placeholder à remplacer par la définition d'infrastructure qui fixe PostgreSQL `18.6`.
- `.gitignore:1-9` -- ignore actuel incomplet; couvrir dépendances installées, sorties de build, couvertures et fichiers d'environnement sans ignorer les fichiers de configuration suivis.
- `_bmad-output/implementation-artifacts/epic-1-context.md:34-44` -- contraintes de monorepo, sens des dépendances, versions et contrôles obligatoires.
- `_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md:105-109,175-194,196-209` -- invariants des frontières, conventions d'import, versions et arborescence seed.
- `_bmad-output/planning-artifacts/epics.md:499-537` -- critères source de la story; ne pas anticiper les livrables de la story 1.2.
- `_bmad-output/implementation-artifacts/sprint-status.yaml:20-23` -- suivi de la story sous la clé `1-1-initialiser-le-workspace-et-ses-frontières`.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, `.node-version`, `.gitignore` -- établir le workspace pnpm racine, l'exécution Node 24.0.0, les workspaces V1, les scripts délégués et les exclusions de fichiers générés -- rendre installation et commandes locales déterministes.
- [x] `packages/config/package.json`, `packages/config/tsconfig.base.json`, `packages/config/tsconfig.package.json`, `packages/config/tsconfig.app.json` -- centraliser les configurations TypeScript non sensibles et fournir les bases consommées par les applications et packages -- éviter les divergences de compilation.
- [x] `apps/web/package.json`, `apps/web/tsconfig.json`, `apps/api/package.json`, `apps/api/tsconfig.json` -- déclarer les deux runtimes avec versions épinglées et configurations minimales, sans route ni endpoint -- matérialiser les frontières applicatives sans livrer la story 1.2.
- [x] `packages/{screens,domains,ui,api-client,core,testing}/package.json`, `packages/{screens,domains,ui,api-client,core,testing}/src/index.ts`, `packages/*/tsconfig.json` -- créer les packages `@project/*` avec points d'entrée publics et modules vides typés -- fournir des surfaces d'import stables sans imports internes.
- [x] `apps/api/openapi/.gitkeep`, `apps/api/app/adapters/.gitkeep`, `infra/compose.yaml` -- conserver les emplacements possédés par le contrat et les adaptateurs, et définir l'image PostgreSQL 18.6 sans persistance métier -- rendre la structure vérifiable sans contrat fonctionnel prématuré.
- [x] `tools/boundaries.config.*`, `tools/check-boundaries.*`, `tools/check-cycles.*`, `packages/testing/*` -- configurer les contrôles de dépendances, imports publics, propriété Tamagui, indépendance des couches et cycles; ajouter des fixtures négatives isolées -- faire échouer les violations avec un code fiable.
- [x] `README.md` -- documenter les prérequis, l'installation et les commandes racine -- permettre à un développeur ou à la CI de réutiliser le même parcours.

**Acceptance Criteria:**
- Given le dépôt avant initialisation, when `pnpm install --frozen-lockfile` est exécuté, then un seul `pnpm-lock.yaml` racine fait autorité et les versions Node, Next, AdonisJS, Lucid, OpenAPI, Tamagui et PostgreSQL sont épinglées aux versions convenues.
- Given le seed V1, when son arborescence est inspectée, then toutes les applications, sous-dossiers API, packages et `infra` prescrits existent et aucune application mobile déployable n'existe.
- Given les scripts racine, when types, lint, frontières, cycles, tests ou builds sont lancés, then ils délèguent aux workspaces concernés et retournent un code de sortie fiable réutilisable par la CI.
- Given une violation représentative des frontières, when le contrôle concerné s'exécute, then l'import profond, cycle ou sens interdit est refusé et le diagnostic identifie la règle enfreinte.
- Given les couches domaine et application initialisées, when leurs dépendances sont analysées, then elles ne dépendent ni de HTTP, ni d'ORM, ni de framework UI et seul `@project/ui` dépend directement de Tamagui.
- Given le seed de données, when le dépôt est inspecté, then aucune table métier, migration, modèle Lucid ou donnée par défaut n'a été précréé.

## Spec Change Log

## Design Notes

Les contrôles de frontières doivent analyser les imports réellement résolus par TypeScript, y compris les aliases de packages. Les fixtures négatives restent hors des sources livrables afin de prouver le refus sans introduire une dépendance interdite dans le graphe de production.

## Verification

**Commands:**
- `pnpm install --frozen-lockfile` -- expected: installation reproductible depuis le lockfile racine.
- `pnpm typecheck` -- expected: tous les workspaces TypeScript se compilent sans erreur.
- `pnpm lint` -- expected: le lint couvre les workspaces et termine avec le code 0.
- `pnpm boundaries` -- expected: le graphe de production respecte les entrées publiques, les propriétaires et les directions autorisées.
- `pnpm cycles` -- expected: aucun cycle de dépendances de production n'est détecté.
- `pnpm test` -- expected: les fixtures prouvent les refus et les vérifications du seed réussissent.
- `pnpm build` -- expected: les builds applicables terminent sans créer de fonctionnalité métier.

## Suggested Review Order

**Workspace et reproductibilite**

- Le manifeste racine fixe le gestionnaire, les versions et les portes locales.
  [`package.json:1`](../../package.json#L1)

- L'image locale conserve PostgreSQL au niveau de version impose sans identifiant par defaut.
  [`compose.yaml:1`](../../infra/compose.yaml#L1)

**Frontieres verifiees**

- Un graphe TypeScript unique resolve imports statiques, dynamiques et relatifs.
  [`workspace-graph.mjs:21`](../../tools/workspace-graph.mjs#L21)

- Les dependances inter-couches et proprietaires sont refusees avant integration.
  [`check-boundaries.mjs:3`](../../tools/check-boundaries.mjs#L3)

- Le controle de cycles consomme le graphe de production reel.
  [`check-cycles.mjs:22`](../../tools/check-cycles.mjs#L22)

**Preuves de non-regression**

- Les cas negatifs et la reproductibilite du seed sont executes par Node Test.
  [`boundaries.test.mjs:6`](../../packages/testing/tests/boundaries.test.mjs#L6)
