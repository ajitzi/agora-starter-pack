---
title: 'Refactoriser les composants UI et screens'
type: 'refactor'
created: '2026-08-27'
status: 'done'
review_loop_iteration: 0
baseline_commit: 'ef7181da2d40123299d16f905ab32ba4b0d2a78e'
context:
  - 'docs/architecture/architecture-v1.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Les composants React et composants `styled` de `@project/screens` et `@project/ui` sont regroupés dans leurs fichiers `index.tsx`. Ces fichiers mélangent implémentation et API publique, rendent les composants difficiles à localiser et favorisent la croissance de fichiers fourre-tout.

**Approach:** Extraire chaque composant React, y compris les composants `styled` privés, dans un fichier kebab-case dédié. Réserver les `index.ts` et `index.tsx` aux réexports publics afin de conserver tous les imports existants depuis `@project/screens` et `@project/ui`.

## Boundaries & Constraints

**Always:** Appliquer la règle à tous les composants React et `styled` des packages screens et UI actuellement regroupés: `AppShell`, `LoginScreen`, `UiProvider`, `Screen`, `ScreenHeaderFrame`, `ScreenTitle`, `ScreenContext`, `ScreenHeader`, `StickyActionBar`, `FocusLink`, `SkipLink` et `CollectionNoticeGateView`. Chaque fichier porte un seul composant et utilise un nom kebab-case. Les barrels ne définissent aucun composant et préservent l'API publique actuelle, y compris les réexports Tamagui, types et fonctions existants. `packages/screens` ne doit importer ni routeur ni Tamagui; seul `packages/ui` importe Tamagui. Mettre à jour les tests pour vérifier les composants à leurs nouveaux emplacements et l'absence de composants dans les barrels.

**Ask First:** Déplacer les fonctions/services non-React cohérents (`notice.mjs`, API, contrôleurs ou politique d'authentification), modifier les points d'entrée publics, changer les tokens ou comportements UI, ou introduire une nouvelle convention de navigation.

**Never:** Ne pas changer les routes, le comportement de connexion, les styles, les tokens, les dépendances, la structure fonctionnelle API ou les deux changements externes non committés `apps/web/.env.example` et `apps/api/database/schema.ts`. Ne pas créer de dossiers génériques `components`, `shared` ou `common` sans responsabilité explicitement nommée.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Import public | Une route importe `AppShell` ou `LoginScreen` depuis `@project/screens` | Les écrans se résolvent depuis le barrel sans changement de consommateur | Le typecheck échoue si un export est perdu |
| Primitive UI | Un écran importe les primitives et composants existants depuis `@project/ui` | Les exports publics et leurs comportements restent identiques | Les tests d'invariants UI détectent toute régression de styles ou d'exports |
| Barrel | Un agent ajoute un composant dans `index.tsx` | La règle/documentation et le test structurel imposent un fichier dédié | Le contrôle local échoue avec une indication du fichier à extraire |

</frozen-after-approval>

## Code Map

- `packages/screens/src/index.tsx:1-107` -- deux écrans à extraire; remplacer l'implémentation par le barrel public.
- `packages/ui/src/index.tsx:1-144` -- provider, composants de layout, accessibilité et notice à répartir par fichier tout en gardant les exports.
- `packages/ui/src/config.ts:1-...`, `packages/ui/src/notice.mjs:1-...` -- configuration Tamagui et logique non-React à conserver sans déplacement imposé.
- `apps/web/src/app/{page,connexion/page,administration/page,amap/page}.tsx` -- consommateurs des exports screens à préserver sans modification fonctionnelle.
- `packages/testing/tests/boundaries.test.mjs:166-205` -- assertions UI/screens liées aux fichiers actuels; les répartir et ajouter l'invariant des barrels.
- `docs/architecture/architecture-v1.md:753-812,1533-1733` -- document d'architecture détaillé où inscrire la convention de fichiers et de barrels.
- `_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md:34-109,171-183` -- invariants et conventions source pour les futurs agents.

## Tasks & Acceptance

**Execution:**
- [x] `packages/screens/src/app-shell.tsx`, `packages/screens/src/login-screen.tsx`, `packages/screens/src/index.tsx` -- séparer les deux écrans et faire du barrel un réexport exclusif -- rendre chaque écran localisable sans casser les routes.
- [x] `packages/ui/src/*.tsx`, `packages/ui/src/index.tsx` -- extraire chaque composant/UI styled dans son fichier dédié et réexporter l'API existante -- interdire le regroupement tout en conservant le design system.
- [x] `packages/testing/tests/boundaries.test.mjs` -- adapter les assertions de styles/structure aux nouveaux fichiers et vérifier qu'aucun barrel ne définit un composant -- verrouiller le refactor et la règle future.
- [x] `docs/architecture/architecture-v1.md`, `_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md` -- inscrire la règle « un composant React par fichier » et le rôle exclusif des barrels -- guider les implémentations futures.

**Acceptance Criteria:**
- Given les routes web existantes, when elles importent `@project/screens`, then `AppShell` et `LoginScreen` se comportent sans changement fonctionnel.
- Given un consommateur de `@project/ui`, when il importe un composant, type ou primitive publique existante, then l'import reste valide et les invariants de style/accessibilité sont préservés.
- Given un nouveau composant React ou styled, when il est ajouté aux packages UI ou screens, then il réside dans un fichier kebab-case dédié et le barrel concerné ne contient que des réexports.
- Given un agent consulte l'un ou l'autre document d'architecture, when il crée un composant UI ou screen, then il peut appliquer explicitement la règle de découpage et des imports publics.

## Design Notes

Les composants associés peuvent rester au même niveau tant que le package est petit: `screen-header.tsx` importe `screen-header-frame.tsx`, `screen-title.tsx` et `screen-context.tsx`; le barrel masque cette organisation interne. Les fonctions non-React restent séparées par responsabilité existante et ne sont pas artificiellement éclatées.

## Verification

**Commands:**
- `pnpm typecheck && pnpm boundaries && pnpm cycles && pnpm test` -- expected: API publique, frontières et invariants structurels restent valides.
- `pnpm build` -- expected: les applications web et API construisent avec les nouveaux barrels.

## Suggested Review Order

**API publique des packages**

- Expose exclusivement les écrans publics depuis un barrel sans implémentation.
  [`index.tsx:1`](../../packages/screens/src/index.tsx#L1)

- Préserve l'API UI existante en réexportant composants, types et primitives.
  [`index.tsx:1`](../../packages/ui/src/index.tsx#L1)

**Composants extraits**

- Porte le shell partagé dans un fichier autonome sans dépendance au routeur.
  [`app-shell.tsx:1`](../../packages/screens/src/app-shell.tsx#L1)

- Compose le header depuis ses composants dédiés et privés.
  [`screen-header.tsx:1`](../../packages/ui/src/screen-header.tsx#L1)

**Garde-fous et architecture**

- Vérifie récursivement le découpage et les points d'entrée publics.
  [`boundaries.test.mjs:220`](../../packages/testing/tests/boundaries.test.mjs#L220)

- Formalise la règle de composants et barrels dans l'architecture détaillée.
  [`architecture-v1.md:753`](../../docs/architecture/architecture-v1.md#L753)

- Rend cette règle opposable aux futurs agents par l'architecture spine.
  [`ARCHITECTURE-SPINE.md:66`](../../_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md#L66)
