---
title: 'Rendre les styles Tamagui sur le web'
type: 'bugfix'
created: '2026-08-27'
status: 'done'
baseline_commit: 'e60983d27a82e4b4f535421787dbc61e53a7e15a'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Les primitives Tamagui rendues dans l'application web n'ont pas de feuille CSS générée et chargée par Next. En particulier, un `Button` utilisant `asChild` est rendu comme un lien HTML sans son apparence de bouton, ce qui rend l'interface incohérente au chargement et dépendante de l'hydratation.

**Approach:** Intégrer le générateur CSS de Tamagui compatible avec Next 16/Turbopack, générer les styles à partir de la configuration partagée et les charger au niveau du layout web. Conserver les composants, les tokens et l'API publique de `@project/ui` tels qu'ils sont.

## Boundaries & Constraints

**Always:** Utiliser la configuration `packages/ui/src/config.ts` comme source unique de vérité; générer puis importer une feuille CSS globale depuis l'application web; conserver les règles de réécriture API et les origines de développement de Next; vérifier typecheck, tests et build après la modification.

**Ask First:** Toute modification de design (tokens, couleurs, typographie, composants), tout déplacement du `UiProvider` dans une nouvelle couche, ou toute migration de Next/Tamagui.

**Never:** Ne pas utiliser `@tamagui/next-plugin` et son chemin Webpack historique; ne pas modifier les changements existants dans `apps/web/.env.example` ou `apps/api/database/schema.ts`; ne pas changer les contrats d'authentification ni les routes de l'application.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Génération de production | `pnpm --filter @project/web build` | Le CLI génère la feuille CSS depuis la configuration UI avant la compilation Next, qui termine sans erreur. | La commande échoue avec un code non nul si la génération échoue; aucun build Next incomplet n'est présenté comme valide. |
| Rendu d'une primitive composée | Le bouton d'accueil utilise `Button asChild` avec une ancre | L'ancre conserve les styles visuels et interactifs du bouton grâce au CSS Tamagui chargé globalement. | Le rendu ne dépend pas de l'injection CSS tardive lors de l'hydratation. |

</frozen-after-approval>

## Code Map

- `apps/web/package.json` -- scripts et dépendances de l'application Next; il manque le CLI de génération Tamagui et une étape avant `next build`.
- `apps/web/tamagui.build.ts` -- nouveau point d'entrée de génération; doit cibler `../../packages/ui/src/config.ts`, analyser `tamagui`, l'UI et les écrans, et écrire le CSS dans le dossier App Router.
- `apps/web/src/app/layout.tsx` -- layout racine App Router sans import CSS; doit charger la feuille Tamagui générée avant le rendu des écrans.
- `apps/web/next.config.mjs` -- conserve `allowedDevOrigins` et les rewrites; doit ajouter les alias Turbopack React Native Web nécessaires à Tamagui sans modifier ces comportements existants.
- `packages/ui/src/config.ts` -- tokens, thèmes et polices Tamagui existants; source à référencer, sans modifier les valeurs de design.
- `packages/ui/src/provider/ui-provider.tsx` -- provider client fonctionnel; reste inchangé pour limiter le périmètre.
- `packages/ui/src/components/button/button.tsx` -- wrapper de `TamaguiButton`; le cas `asChild` est le témoin principal du chargement correct du CSS.
- `packages/screens/src/app-shell.tsx` -- utilise `UiProvider` et le bouton-lien de connexion; aucun changement fonctionnel attendu.
- `pnpm-lock.yaml` -- doit refléter exactement les nouvelles dépendances de build du package web.

## Tasks & Acceptance

**Execution:**
- [x] `apps/web/package.json` -- ajouter les dépendances Tamagui nécessaires à la génération et ajuster le script de build pour générer le CSS avant Next -- rend les styles disponibles en production.
- [x] `apps/web/tamagui.build.ts` -- définir la configuration de génération adaptée à Next 16/Turbopack, la configuration UI partagée, les packages à analyser et le chemin CSS de l'App Router -- évite l'ancien plugin Webpack.
- [x] `apps/web/src/app/layout.tsx` -- importer la feuille CSS générée au layout racine -- garantit son inclusion pour toutes les routes web et dès le premier rendu.
- [x] `apps/web/next.config.mjs` -- ajouter les alias Turbopack de compatibilité React Native Web tout en préservant les options et rewrites existants -- assure la résolution des dépendances Tamagui par Next.
- [x] `pnpm-lock.yaml` -- actualiser le verrouillage via l'installation ciblée des dépendances web -- assure des installations reproductibles.

**Acceptance Criteria:**
- Given une installation propre des dépendances, when le build web est lancé, then Tamagui génère la feuille CSS attendue avant que `next build` ne compile l'application.
- Given le layout de l'application web, when une route utilisant `@project/ui` est affichée, then le CSS Tamagui généré est présent dans le bundle global de l'App Router.
- Given le `Button asChild` de l'écran d'accueil, when il rend une ancre vers `/connexion`, then l'ancre porte l'apparence et les états du bouton au lieu du style de lien navigateur.
- Given la configuration Next existante, when le changement est appliqué, then les origines de développement validées et le proxy `/v1/:path*` conservent leur comportement actuel.

## Design Notes

Next 16 utilise Turbopack par défaut; le plugin `@tamagui/next-plugin` s'appuie sur le chemin Webpack historique. La stratégie retenue utilise le CLI Tamagui pour produire un fichier CSS statique explicitement importé par le layout. Elle conserve ainsi le SSR et ne dépend pas de l'injection CSS lors de l'hydratation.

## Verification

**Commands:**
- `pnpm typecheck` -- expected: tous les packages TypeScript terminent sans erreur.
- `pnpm test` -- expected: la suite existante termine sans régression.
- `pnpm --filter @project/web build` -- expected: génération CSS Tamagui suivie d'un build Next réussi.

**Manual checks (if no CLI):**
- Ouvrir `/` et `/connexion` en développement puis en build de production; vérifier que le bouton-lien, le bouton de soumission et les éléments UI ont leurs styles dès le premier affichage.

## Suggested Review Order

**Génération et chargement CSS**

- Génère les styles depuis la configuration UI avant chaque build et démarrage web.
  [`package.json:7`](../../apps/web/package.json#L7)

- Centralise la configuration du générateur pour la configuration UI et les composants analysés.
  [`tamagui.build.ts:1`](../../apps/web/tamagui.build.ts#L1)

- Charge la feuille générée à la racine de toutes les routes App Router.
  [`layout.tsx:2`](../../apps/web/src/app/layout.tsx#L2)

- Résout React Native vers son implémentation web avec Turbopack.
  [`next.config.mjs:9`](../../apps/web/next.config.mjs#L9)

**Garde-fous**

- Exécute le build web dans les contrôles CI avant toute intégration.
  [`ci.yml:35`](../../.github/workflows/ci.yml#L35)

- Vérifie le contrat de génération, chargement CSS et résolution Next.
  [`boundaries.test.mjs:204`](../../packages/testing/tests/boundaries.test.mjs#L204)
