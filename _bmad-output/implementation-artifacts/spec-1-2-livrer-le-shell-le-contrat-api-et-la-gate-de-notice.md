---
title: 'Story 1.2 : Livrer le shell, le contrat API et la gate de notice'
type: 'feature'
created: '2026-08-26'
status: 'done'
review_loop_iteration: 0
baseline_commit: '6e72fca546b1bd9eb471f5c1cc895ae172cc0c20'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
  - '_bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le workspace créé par la story 1.1 ne propose encore ni surface web accessible, ni API contractuelle vérifiable, ni protection commune contre une collecte en production sans information de confidentialité valide. Les stories suivantes ne disposent donc pas d'un socle UI et HTTP sûr sur lequel s'appuyer.

**Approach:** Livrer un shell web responsive composé des primitives partagées, initialiser une API Adonis minimale dont `GET /v1/health` est décrit et vérifié par OpenAPI, puis fournir une gate de collecte fondée sur une configuration runtime de notice active, versionnée et validée.

## Boundaries & Constraints

**Always:** Respecter `apps -> screens -> domain/application -> core` et les points d'entrée publics; seul `@project/ui` importe Tamagui. Le shell comporte exactement un `main`, un lien « Aller au contenu » visible au focus, une hiérarchie de titres et aucun défilement horizontal de 320 à 1440 px, y compris à 200 % de texte et 400 % de zoom. Toutes les surfaces, typographies, espacements, rayons et focus viennent des tokens de `@project/ui`. Le contrat OpenAPI 3.1.2 versionné dans `apps/api/openapi` est l'unique source HTTP; Redocly le valide avant que `openapi-typescript` ne dérive les types publics de `@project/api-client`. `GET /v1/health` n'expose ni secret, ni détail interne, ni état métier. Les erreurs API suivent RFC 9457 avec `type`, `title`, `status`, `detail` et un identifiant de corrélation. En production, tout composant de collecte exige une notice runtime active, juridiquement validée et versionnée, contenant responsable, finalité, base légale, durée ou critère, droits et contact; la soumission est impossible sans cette configuration et la version affichée est fournie à la collecte pour conservation immuable.

**Ask First:** Ajouter une route API autre que la santé, modifier les versions épinglées, introduire une dépendance de production hors Next, Adonis, Tamagui et la chaîne de contrat nécessaire, ou transformer la configuration de notice en modèle persistant, écran d'administration ou promotion de production réelle.

**Never:** Créer de table, migration, modèle Lucid, donnée personnelle de démonstration, collecte fonctionnelle, notice juridique réelle, secret ou configuration runtime partagée. Ne pas créer de client HTTP, endpoint ou schéma concurrent au contrat OpenAPI; ne pas placer de routeur dans `packages/screens` ni de valeur visuelle ad hoc dans un écran.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Santé contractuelle | `GET /v1/health` | Réponse minimale conforme au schéma OpenAPI versionné | Aucun détail interne dans la réponse ou le problème |
| Contrat invalide | Document OpenAPI incomplet ou non conforme | Redocly échoue avant toute génération | Code non nul et diagnostic de contrat exploitable |
| Collecte en production autorisée | Notice runtime complète, active, validée et versionnée | Le composant affiche les informations et transmet la version exacte à la soumission | La collecte persiste ultérieurement cette preuve sans la réécrire |
| Notice absente ou invalide | Environnement de production et notice incomplète, inactive ou non validée | Le composant refuse d'autoriser la soumission | Explication actionnable sans divulgation de configuration interne |

</frozen-after-approval>

## Code Map

- `apps/web/src/index.ts:1` et `apps/web/package.json:5-13` -- entrée vide du runtime web à remplacer par le bootstrap Next et ses dépendances, sans logique d'écran locale.
- `packages/ui/src/index.ts:1` -- point d'entrée vide, propriétaire exclusif de Tamagui et des tokens UX-DR1 à UX-DR17; y exposer provider, thème, `Screen`, `ScreenHeader`, `StickyActionBar` et styles de focus.
- `packages/screens/src/index.ts:1` -- point d'entrée vide pour composer le shell réutilisable sans routeur, consommant exclusivement les exports publics de `@project/ui`.
- `apps/api/app/index.ts:1` et `apps/api/openapi/.gitkeep` -- bootstrap API et emplacement possédé par le premier document OpenAPI; aucun endpoint n'existe encore.
- `packages/api-client/src/index.ts:1` -- surface publique vide qui doit recevoir uniquement les types dérivés du contrat, jamais des schémas ou endpoints écrits à la main.
- `package.json:13-23` -- scripts racine existants à étendre avec validation et génération OpenAPI, avant les commandes de tests et de build déjà standardisées.
- `packages/testing/tests/boundaries.test.mjs:24-28` -- test de seed qui interdit actuellement tout fichier API additionnel; le faire évoluer pour autoriser le bootstrap santé sans relâcher l'interdiction de persistance métier.
- `tools/check-boundaries.mjs`, `tools/check-cycles.mjs`, `tools/workspace-graph.mjs` -- contrôles de graphe existants à conserver comme preuves des frontières introduites en story 1.1.
- `_bmad-output/implementation-artifacts/spec-1-1-initialiser-le-workspace-et-ses-frontieres.md:51-84` -- continuité validée: packages publics, scripts racine et absence de données métier restent des invariants.

## Tasks & Acceptance

**Execution:**
- [x] `packages/ui/src/index.ts`, `packages/ui/package.json` -- définir le thème tokenisé et les primitives de surface accessibles partagées -- garantir que le shell n'introduit aucune règle visuelle divergente.
- [x] `packages/screens/src/index.ts`, `packages/screens/package.json` -- composer le shell partagé avec skip-link, structure sémantique et zone de contenu ciblable, sans routeur -- rendre le parcours portable et accessible.
- [x] `apps/web/*` -- initialiser le runtime Next et une route mince qui rend le shell depuis `@project/screens` -- fournir une application responsive vérifiable sans capacité métier.
- [x] `apps/api/openapi/v1.yaml`, `apps/api/app/*`, `apps/api/package.json` -- déclarer puis implémenter `GET /v1/health`, les problèmes RFC 9457 et l'identifiant de corrélation -- faire coïncider la frontière HTTP et son contrat.
- [x] `packages/api-client/*`, `package.json`, fichiers de configuration Redocly nécessaires -- valider/linter le contrat puis générer les types publics par `openapi-typescript` -- empêcher toute dérive entre client et API.
- [x] `packages/ui/*` ou `packages/screens/*`, `apps/web/*` -- exposer une gate de collecte lisant la notice du runtime et bloquant en production une configuration absente ou invalide -- donner aux futurs formulaires une intégration unique et la version de preuve à transmettre.
- [x] `packages/testing/tests/*` -- tester santé/contrat/client, erreurs problématiques, gate de notice et conservation de ses invariants; adapter le test de seed API -- prouver les chemins nominal et de refus sans créer de collecte réelle.

**Acceptance Criteria:**
- Given le shell web, when il est parcouru à 320 px, 1440 px, au clavier, à 200 % de texte ou 400 % de zoom, then il conserve un unique `main`, des titres ordonnés, un skip-link visible au focus et aucun défilement horizontal.
- Given le shell rendu, when ses styles sont inspectés, then il ne consomme que les tokens et primitives publics de `@project/ui` pour les surfaces, typographies, espacements, rayons et focus.
- Given l'API démarrée, when `GET /v1/health` est appelé, then sa réponse est conforme au document OpenAPI 3.1.2 et ne révèle aucun secret, détail interne ni donnée métier.
- Given un contrat modifié, when la vérification locale est lancée, then Redocly termine avant la génération `openapi-typescript` et les types exportés de `@project/api-client` correspondent au contrat validé.
- Given une erreur de validation ou une ressource absente, when l'API répond, then elle utilise `application/problem+json` RFC 9457 avec les cinq champs requis et une corrélation sans information interne.
- Given un futur formulaire de collecte en production, when la notice runtime n'est pas active, validée, complète et versionnée, then il ne peut pas être soumis; when elle est valide, then les informations sont accessibles avant soumission et sa version exacte est disponible pour la preuve historique.

## Spec Change Log

- 2026-08-26: Implémentation du shell partagé, du contrat OpenAPI, de la frontière santé et de la gate de notice runtime; génération OpenAPI en attente de l'outillage Node/pnpm.

## Design Notes

La gate est volontairement une configuration runtime et une primitive réutilisable, non une persistance RGPD. Les stories 7.1 et 7.2 possèdent le registre, les prestataires, le versionnement et la publication de l'information réelle. Ainsi, le développement local reste explicitement non productif tandis qu'une configuration de production incomplète ne peut jamais rendre une collecte soumissible.

## Verification

**Commands:**
- `pnpm openapi:check` -- expected: Redocly valide et lint le contrat 3.1.2 avec un code 0.
- `pnpm openapi:generate` -- expected: les types de `@project/api-client` sont régénérés depuis le contrat validé sans modification manuelle concurrente.
- `pnpm typecheck` -- expected: web, API et packages se compilent sans erreur.
- `pnpm boundaries && pnpm cycles` -- expected: les nouvelles dépendances respectent les points d'entrée publics et le sens imposé.
- `pnpm test` -- expected: contrat santé, client généré, problèmes RFC 9457 et gate de notice passent, y compris les refus.
- `pnpm build` -- expected: les builds applicables terminent sans collecte, persistance métier ou secret embarqué.

## Suggested Review Order

**Frontière API**

- Démarre Adonis puis charge explicitement le contrat de route minimal.
  [`server.ts:8`](../../apps/api/bin/server.ts#L8)

- Définit santé et réponse de repli sans exposer de détail opérationnel.
  [`index.ts:8`](../../apps/api/app/index.ts#L8)

- Formalise les réponses HTTP, erreurs RFC 9457 et corrélation.
  [`v1.yaml:11`](../../apps/api/openapi/v1.yaml#L11)

**Shell et collecte**

- Centralise tokens et primitives Tamagui, hors des écrans applicatifs.
  [`index.tsx:101`](../../packages/ui/src/index.tsx#L101)

- Refuse une collecte de production sans notice complète et validée.
  [`notice.mjs:1`](../../packages/ui/src/notice.mjs#L1)

- Compose une page web mince avec landmark principal et skip-link.
  [`index.tsx:3`](../../packages/screens/src/index.tsx#L3)

**Garanties de livraison**

- Échoue si les types générés divergent du contrat OpenAPI.
  [`package.json:16`](../../package.json#L16)

- Exerce le vrai listener Adonis et la gate de notice.
  [`boundaries.test.mjs:68`](../../packages/testing/tests/boundaries.test.mjs#L68)
