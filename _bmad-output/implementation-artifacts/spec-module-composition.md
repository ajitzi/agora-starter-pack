---
title: 'Fondation de composition des modules'
type: 'feature'
created: '2026-09-09'
status: 'done'
baseline_commit: '68d9e552e5c153c1b19444c791b8fcb4f96a8463'
review_loop_iteration: 0
context:
  - _bmad-output/planning-artifacts/architecture/architecture-agora-starter-pack-2026-09-09/ARCHITECTURE-SPINE.md
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Le monorepo ne reconnait encore que `apps/*` et `packages/*`. Il ne peut donc ni declarer les adaptations Strapi activables dans `modules/*`, ni verifier deterministiquement les dependances, proprietes de ressources ou fournisseurs exclusifs avant de composer une image Strapi.

**Approach:** Introduire le contrat pur de composition des modules et sa validation deterministe, puis etendre les controles de workspace existants aux sources de modules. Cette fondation ne materialise pas encore de sources Strapi et ne modifie pas le runtime API.

## Boundaries & Constraints

**Always:** Ajouter `modules/*` au workspace pnpm. Un module declare une cle unique, des dependances obligatoires `dependsOn`, ses ressources possedees et les slots qu'il fournit. La validation calcule la fermeture transitive triée des modules actifs, refuse les dependances absentes ou cycliques, les cles dupliquees, la propriete double d'une ressource et plusieurs fournisseurs d'un meme slot. Les controles de sources incluent `modules`; les modules ne peuvent importer ni une app ni une implementation interne d'un autre workspace. Les commandes existantes restent les points de verification CI.

**Ask First:** Toute extension du schema de descripteur vers les roles, permissions, donnees de reference, capacites, dependances optionnelles, versions de module ou conflits directs. Toute regle qui autoriserait un import de runtime Strapi entre modules.

**Never:** Ne pas implementer le resolver qui copie des fichiers, l'application Strapi generee, Docker, les scripts `dev`/`build` API, `config-sync`, migrations, outbox, worker ou scheduler. Ne pas ajouter de module metier de demonstration. Ne pas modifier les schemas ou routes Strapi existants. Ne pas introduire un plugin Strapi public, une dependance de production ou un format de manifeste base sur des IDs de base de donnees.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Composition base | Manifeste actif vide et aucun descripteur | Resolution stable avec `modules: []` | Aucune erreur |
| Fermeture transitive | `orders` actif depend de `catalog`, qui depend de `core-data` | Les trois cles sont retournees une seule fois, dans un ordre deterministe | Aucune erreur |
| Dependances invalides | Module actif ou dependance reference une cle absente | Aucune composition n'est retournee | Erreur indiquant la cle absente |
| Graphe invalide | Cycle, cle module dupliquee, ressource possedee deux fois ou slot fourni deux fois | Aucune composition n'est retournee | Erreur identifiant la cause et les cles concernees |

</frozen-after-approval>

## Code Map

- `pnpm-workspace.yaml` -- discovery pnpm actuelle, limitee a `apps/*` et `packages/*`; ajouter le troisieme root workspace.
- `package.json` -- scripts racine `lint`, `boundaries`, `cycles` et `test`; ajouter les tests locaux sous `modules/**/*.test.mjs` si un module en requiert, sans nouveau job CI.
- `tools/workspace-graph.mjs` -- `sourceFiles`, `owner` et `graph()` analysent apps/packages et resolvent les imports `@project/*`; etendre aux owners `module:<key>`.
- `tools/check-boundaries.mjs` -- `boundaryViolations()` centralise les restrictions de couches; appliquer aux modules les interdictions generiques app, import profond et import relatif inter-owner.
- `tools/check-cycles.mjs` -- consomme le graphe d'owners; la modification du graphe suffit a reperer les cycles d'import mixtes, mais ne remplace pas la validation de `dependsOn`.
- `tools/check-source.mjs` -- scanner des sources actuel; inclure `modules` afin que la regle anti-`TODO` s'applique aussi aux modules.
- `apps/api/src/api/health/` -- seed Strapi existant a conserver en lecture seule; aucune materialisation n'appartient a cette story.
- `_bmad-output/planning-artifacts/architecture/architecture-agora-starter-pack-2026-09-09/ARCHITECTURE-SPINE.md` -- AD-21, AD-22, AD-23, AD-29 et AD-30 sont les invariants de composition.

## Tasks & Acceptance

**Execution:**
- [x] `pnpm-workspace.yaml`, `package.json`, `tools/check-source.mjs` -- enregistrer et analyser les sources `modules/*`, et faire discover les tests modules par la commande racine -- les modules deviennent des workspaces contrôlés comme le reste du monorepo.
- [x] `tools/module-composition.mjs` -- definir les descripteurs et manifeste minimal, ainsi qu'une fonction pure de resolution/validation deterministe -- centraliser les invariants sans dependre de Strapi ni du systeme de fichiers.
- [x] `tools/module-composition.test.mjs` -- couvrir la composition `base`, fermeture transitive et chaque echec de la matrice -- rendre le contrat executable et regressible.
- [x] `tools/workspace-graph.mjs`, `tools/check-boundaries.mjs` -- attribuer une identite distincte aux modules et rejeter leurs imports vers apps, imports profonds et imports relatifs inter-workspace -- preserver les frontieres entre adaptations activables.
- [x] `tools/workspace-graph.test.mjs`, `tools/check-boundaries.test.mjs` -- ajouter les cas d'owner module et les violations de frontiere -- proteger le nouveau comportement sans modifier les regles existantes.

**Acceptance Criteria:**
- Given un manifest `base` vide, when la validation est executee, then elle retourne une composition vide stable sans exception.
- Given une chaine de dependances obligatoires active, when la validation est executee plusieurs fois, then la fermeture transitive retourne chaque module une fois dans le meme ordre.
- Given un descripteur invalide selon la matrice, when la validation est executee, then elle echoue avant toute sortie de composition avec un message exploitable.
- Given une source sous `modules/<key>`, when les commandes `lint`, `boundaries` et `cycles` sont executees, then elle est analysee avec un owner module distinct et les imports interdits echouent.
- Given le depot sans modules metier, when toutes les commandes de verification existantes sont executees, then elles restent vertes.

## Design Notes

Le validateur reste dans `tools` car il est pour l'instant utilise par les controles et tests du repository, pas par un runtime deployable. Sa sortie est une structure de donnees triee, pas une ecriture de fichiers : le resolver/materializer de la prochaine fondation en sera le consommateur.

La propriete de ressource utilise une cle stable namespacee par type, par exemple `route:orders.accept` ou `content-type:api::order.order`. Cela permet de detecter les collisions sans prejuger de la forme Strapi de la ressource.

## Verification

**Commands:**
- `pnpm lint` -- expected: les sources modules sont scannees sans violation.
- `pnpm boundaries` -- expected: les owners modules respectent les frontieres.
- `pnpm cycles` -- expected: aucun cycle d'import entre workspaces.
- `pnpm test` -- expected: tous les cas de validation et les tests existants passent.
- `pnpm typecheck` -- expected: tous les workspaces TypeScript restent valides.

## Suggested Review Order

**Contrat de composition**

- La validation pure bloque les compositions incoherentes avant toute materialisation.
  [`module-composition.mjs:31`](../../tools/module-composition.mjs)

- Les listes sont validees avant tri et les collisions sont deterministes.
  [`module-composition.mjs:5`](../../tools/module-composition.mjs)

**Frontieres workspace**

- Le graphe attribue un owner aux modules et refuse les noms ambigus.
  [`workspace-graph.mjs:23`](../../tools/workspace-graph.mjs)

- Les controles existants appliquent les frontieres generiques aux modules.
  [`check-boundaries.mjs:3`](../../tools/check-boundaries.mjs)

**Integration et preuves**

- pnpm decouvre maintenant les workspaces de modules.
  [`pnpm-workspace.yaml:1`](../../pnpm-workspace.yaml)

- Les scenarios de resolution couvrent le contrat et ses echecs.
  [`module-composition.test.mjs:7`](../../tools/module-composition.test.mjs)

- Un fixture temporaire prouve que le scanner observe une vraie source module.
  [`workspace-graph.test.mjs:17`](../../tools/workspace-graph.test.mjs)
