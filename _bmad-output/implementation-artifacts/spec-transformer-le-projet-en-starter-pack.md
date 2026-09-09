---
title: 'Transformer le projet en starter pack cross-platform'
type: 'refactor'
created: '2026-09-09'
status: 'done'
review_loop_iteration: 0
baseline_commit: '6adfb12190b80f394aeebc0c0c0304b9474c270c'
context:
  - 'docs/architecture/architecture-v1.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le dépôt implémente et documente actuellement un produit métier spécifique fondé sur AdonisJS, alors qu'il doit servir de base réutilisable. Il ne fournit pas encore les trois applications minimales Strapi, Next et Expo ni une organisation du client HTTP et des tests adaptée à ce rôle.

**Approach:** Généraliser le monorepo en starter pack avec une API Strapi, un web Next et un mobile Expo qui démontrent le partage des composants de `packages/ui`. Retirer les implémentations, textes et documents liés à La Cabane du Merle, sans supprimer ni modifier le contenu de `packages/ui`.

## Boundaries & Constraints

**Always:** Conserver `packages/ui` intact; utiliser Next pour `apps/web`, Expo pour `apps/mobile`, Strapi avec PostgreSQL pour `apps/api`; maintenir les frontières `apps -> screens -> domains -> core`; co-localiser les tests avec le code testé; découper `packages/api-client/src` en modules par route et garder un point d'entrée public; ne laisser dans `docs` que les principes généraux, sans référence au produit initial; remplacer `docs/data/auth-data-dictionary.md` par la règle de mise à jour des schémas de données Strapi à chaque évolution de BDD.

**Ask First:** Ajouter une capacité métier, une intégration externe, une nouvelle dépendance front hors des outils indispensables à Strapi ou Expo, ou conserver un document métier comme exemple distribué.

**Never:** Modifier ou supprimer un fichier dans `packages/ui`; conserver AdonisJS, Lucid, leurs migrations ou leurs parcours métier; utiliser `packages/testing` comme répertoire de tests; figer des tables ou comportements d'authentification qui appartiennent aux plugins et schémas Strapi.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Démarrage local | Variables Strapi/PostgreSQL valides | L'API démarre et expose une vérification de santé; le web et le mobile peuvent consommer la configuration publique | Variables manquantes signalées sans secret |
| Client API | Import depuis `@project/api-client` | Les fonctions sont importées depuis le barrel et rangées par routes | Les erreurs HTTP restent typées et contextualisées |
| Démonstration UI | Web et mobile démarrés | Chaque app rend au moins un même composant issu de `@project/ui` | Échec de résolution d'un import partagé fait échouer typecheck/build |

</frozen-after-approval>

## Code Map

- `package.json`, `pnpm-workspace.yaml` -- scripts racine, workspaces et dépendances verrouillées à adapter aux trois runtimes et aux tests co-localisés.
- `apps/api/` -- runtime Adonis/Lucid actuel, OpenAPI et Dockerfile à remplacer par la structure et les scripts Strapi.
- `apps/web/` -- application Next 16 et configuration Tamagui à réduire à une démonstration neutre du design system.
- `packages/ui/src/` -- design system généraliste, lecture seule absolue.
- `packages/screens/src/` -- écrans auth et shell métier utilisant des fetch directs; à remplacer ou généraliser en consommateurs du client API et de l'UI partagée.
- `packages/api-client/src/index.ts` -- types OpenAPI générés monolithiques; déplacer la génération dans `openapi.ts` et créer les modules `auth`, `health` et les routes réellement conservées.
- `packages/testing/` -- conteneur de tests Adonis et d'outils à répartir près des sources puis supprimer.
- `tools/check-boundaries.mjs`, `tools/check-cycles.mjs`, `.github/workflows/ci.yml` -- règles de frontières et CI à préserver en ajoutant le contrôle Expo et Strapi.
- `docs/architecture/architecture-v1.md`, `docs/ui/`, `docs/functional/`, `docs/data/auth-data-dictionary.md`, `README.md` -- documentation à généraliser, archiver ou supprimer selon son contenu métier.

## Tasks & Acceptance

**Execution:**
- [x] `apps/api/`, `apps/api/package.json`, `apps/api/src/` -- remplacer le runtime Adonis par une application Strapi minimale PostgreSQL, un endpoint de santé, configuration sans secret et un exemple de schéma neutre -- établir l'API starter fonctionnelle.
- [x] `apps/mobile/` -- créer l'application Expo TypeScript minimale avec la configuration Tamagui nécessaire et un écran de démonstration -- valider le runtime mobile.
- [x] `apps/web/`, `packages/screens/` -- réduire les parcours spécifiques à une démonstration Next neutre qui utilise un composant partagé avec Expo -- retirer le métier tout en vérifiant le partage UI.
- [x] `packages/api-client/src/`, `package.json` -- déplacer les types générés vers `openapi.ts`, créer un module par groupe de routes conservé et un barrel public; remplacer les appels directs restants -- rendre le client maintenable par routes.
- [x] `packages/testing/`, `apps/**`, `packages/**`, `tools/`, `.github/workflows/ci.yml` -- déplacer les tests près du code ou des outils, adapter la découverte Node et supprimer le package vide -- faire respecter la co-localisation.
- [x] `docs/`, `README.md`, `_bmad-output/planning-artifacts/` -- supprimer ou généraliser les contenus spécifiques; remplacer le dictionnaire auth par l'instruction de tenue à jour des schémas Strapi -- distribuer une documentation neutre.
- [x] `package.json`, configurations et fichiers de verrouillage nécessaires -- mettre à jour scripts, contrôles de frontières, CI, Docker et dépendances -- garantir les builds des trois apps.

**Acceptance Criteria:**
- Given un clone du dépôt et une configuration PostgreSQL valide, when les commandes de développement sont lancées, then Strapi, Next et Expo démarrent sans dépendance Adonis ou Lucid.
- Given les applications web et mobile, when leur écran de démonstration est rendu, then elles importent et affichent au moins un composant identique de `@project/ui` sans modifier ce package.
- Given le client HTTP, when une route est ajoutée ou modifiée, then son implémentation est dans un fichier de route dédié et l'API publique reste importable depuis `@project/api-client`.
- Given les tests du dépôt, when `pnpm test` est exécuté, then ils sont découverts depuis leurs sources co-localisées et aucun test ne réside dans `packages/testing`.
- Given les fichiers `docs/` et le README, when ils sont consultés, then ils ne mentionnent ni La Cabane du Merle ni ses parcours métier et conservent les décisions d'architecture générales.

## Design Notes

Strapi est l'unique propriétaire des schémas de persistance et de l'authentification fournie par ses plugins. Les packages partagés ne consomment que des contrats de transport et ne dépendent pas de Strapi. La démonstration doit rester volontairement réduite: santé API et surface UI partagée, sans réintroduire un exemple métier masqué.

## Verification

**Commands:**
- `pnpm install --frozen-lockfile` -- expected: dépendances cohérentes.
- `pnpm typecheck` -- expected: les trois workspaces sont typés.
- `pnpm lint && pnpm boundaries && pnpm cycles` -- expected: qualité et dépendances conformes.
- `pnpm test` -- expected: tests co-localisés réussis.
- `pnpm build` -- expected: build Next et Strapi réussis; validation Expo configurée dans le script dédié.

## Suggested Review Order

**Architecture Starter**

- Les scripts racine orchestrent les trois runtimes et les contrôles partagés.
  [`package.json:13`](../../package.json#L13)

- Strapi possède la persistance et expose un endpoint santé minimal.
  [`server.ts:1`](../../apps/api/config/server.ts#L1)

- Le schéma Strapi neutre sert de point de départ sans métier imposé.
  [`schema.json:1`](../../apps/api/src/api/starter/content-types/starter/schema.json#L1)

**Frontends Partagés**

- Next monte l'écran commun dans son point d'entrée unique.
  [`starter-page.tsx:1`](../../apps/web/src/app/starter-page.tsx#L1)

- Expo monte le même écran et le même fournisseur UI.
  [`App.tsx:1`](../../apps/mobile/App.tsx#L1)

- L'écran partagé démontre l'usage de composants exclusivement issus de `@project/ui`.
  [`starter-screen.tsx:1`](../../packages/screens/src/starter-screen.tsx#L1)

**Client et Livraison**

- Le barrel expose un client de routes modulaire plutôt qu'un fichier généré monolithique.
  [`index.ts:1`](../../packages/api-client/src/index.ts#L1)

- L'image Strapi fixe son port et son runtime de production.
  [`Dockerfile:19`](../../apps/api/Dockerfile#L19)

- La CI valide qualité, Expo et le démarrage de l'image API.
  [`ci.yml:13`](../../.github/workflows/ci.yml#L13)

**Documentation et Vérification**

- L'architecture décrit seulement les choix généraux du starter pack.
  [`architecture-v1.md:1`](../../docs/architecture/architecture-v1.md#L1)

- Le dictionnaire rappelle la mise à jour obligatoire des schémas Strapi.
  [`auth-data-dictionary.md:1`](../../docs/data/auth-data-dictionary.md#L1)

- Les tests co-localisés vérifient santé API, client HTTP et partage d'écran.
  [`health.test.mjs:1`](../../packages/api-client/src/health.test.mjs#L1)
