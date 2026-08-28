---
title: 'Story 1.6 : Administrer les comptes et les sessions'
type: 'feature'
created: '2026-08-28'
status: 'done'
review_loop_iteration: 0
baseline_commit: '1f6aeb76db2cf83f5f54ed23856e40d55beb99bf'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** L'exploitation ne peut pas encore administrer les comptes, leurs rôles ni leurs sessions. Un administrateur doit pouvoir maîtriser les accès sans exposer de secret, ni laisser survivre une session ou un lien de réinitialisation après une décision de sécurité.

**Approach:** Ajouter une surface et un contrat d'administration réservés aux administrateurs, fondés sur des rôles multiples extensibles. Les rôles actuels `Administrateur` et `Adherent AMAP` s'ajoutent ou se retirent explicitement, sans conversion; les futurs rôles s'intègrent au même modèle.

## Boundaries & Constraints

**Always:** Ne retourner que identité, email, rôles, état, dernière activité et nombre de sessions actives, jamais de hash, jeton, condensat, cookie ou identifiant de session. Réserver chaque opération API à un administrateur actif, avec CSRF, version attendue et clé d'idempotence par opération et principal. Exiger au moins un rôle par compte; l'ajout ou le retrait de rôle ne convertit ni ne réaffecte de données AMAP. Refuser dans une transaction toute désactivation ou suppression du rôle `Administrateur` qui laisserait zéro administrateur actif. Désactivation, retrait de rôle et révocation invalident immédiatement les sessions concernées et les jetons de reset actifs; réactivation ne restaure jamais ces éléments. Les sessions inactives 12 heures sont inutilisables. Auditer toute mutation sans donnée sensible et ne déclencher aucun email, sauf l'email de définition de mot de passe du flux de reset approuvé lors de la création.

**Ask First:** Ajouter un rôle métier, modifier la durée d'inactivité, envoyer une notification distincte, créer ou modifier une fiche adhérent, un abonnement ou tout autre domaine AMAP.

**Never:** Ne pas remplacer un rôle unique par un autre, ni créer implicitement une fiche adhérent ou un abonnement. Ne pas utiliser le flux du premier administrateur pour créer des comptes administrables, exposer les identifiants de session, contourner l'autorisation API ou réactiver une session/jeton historique.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Consultation | Administrateur authentifié | Liste minimale paginée des comptes et de leur activité/sessions actives | Refus API générique sans session ou sans rôle administrateur |
| Création | Email normalisé disponible et au moins un rôle autorisé | Compte avec version initiale, aucun mot de passe exploitable, lien reset unique mis en file | Doublon sans écriture; proposer l'ouverture ou la réactivation si désactivé |
| Rôles | Compte actif, ajout/retrait explicite de `Administrateur` ou `Adherent AMAP` | Liste de rôles mise à jour, audit et sessions révoquées atomiquement | Refuser zéro rôle, rôle inconnu, version obsolète ou dernier administrateur supprimé |
| Désactivation/réactivation | Compte actif ou désactivé confirmé | Désactivation invalide sessions et jetons; réactivation permet un nouveau login/reset | Aucune ancienne session ni ancien jeton ne redevient valide |
| Révocation | Une session ou toutes les sessions d'un compte | Accès refusé immédiatement même avec le cookie existant | Ne jamais retourner l'identifiant de session |
| Rejeu ou réseau | Même clé de mutation ou réponse réseau perdue | Même résultat initial; le client vérifie le résultat avant relance | Saisies préservées, conflit expliqué et rechargement proposé |

</frozen-after-approval>

## Code Map

- `apps/api/app/models/account.ts:6-17`, `apps/api/database/migrations/20260827000000_create_authentication_tables.ts:5-34`, `apps/api/database/schema.ts:10-27,118-129` -- modèle à rôle unique, tables comptes/sessions et audit minimal à faire évoluer vers rôles multiples, version, activité et audit complet.
- `apps/api/app/auth.ts:21-23`, `apps/api/app/auth_controller.ts:52-102`, `apps/api/app/auth_policy.mjs:5-39` -- réutiliser revalidation de compte actif, réponses non sensibles, CSRF et normalisation; ajouter une politique d'autorisation administrative explicite.
- `apps/api/app/password_recovery.ts:38-71,102-112`, `apps/api/commands/create_first_admin.ts:7-30` -- réutiliser les transactions de révocation/reset et l'envoi approuvé; conserver le premier admin hors du flux d'administration.
- `apps/api/config/auth.ts:4-12`, `apps/api/config/session.ts:4-12` -- session opaque sans remember-me, cookie et durée 12 h à préserver et faire respecter à chaque requête protégée.
- `apps/api/app/index.ts:22-34`, `apps/api/openapi/v1.yaml:11-117`, `packages/api-client/src/index.ts:6-125`, `package.json:14-16` -- étendre le contrat v1, les routes minces et régénérer exclusivement le client.
- `apps/web/src/app/administration/page.tsx:1-7`, `apps/web/src/app/auth.ts:4-12`, `packages/screens/src/app-shell.tsx:10-28`, `packages/ui/src/index.tsx` -- remplacer le shell admin vide par des écrans partagés, conserver protection serveur, CSRF/logout et primitives UI; aucun `ConfirmDialog` n'existe aujourd'hui.
- `packages/testing/tests/auth-behavior.test.mjs:21-89`, `packages/testing/tests/password-recovery-behavior.test.mjs:99-112`, `packages/testing/tests/boundaries.test.mjs:30-50,83-153` -- étendre les preuves de politique, atomicité, HTTP, contrat et frontières sans secrets.

## Tasks & Acceptance

**Execution:**
- [x] `apps/api/database/**`, `apps/api/app/models/**`, `apps/api/app/account_administration.*` -- migrer les comptes vers rôles multiples extensibles, version, activité, idempotence et audit; centraliser les mutations transactionnelles et les invariants de dernier admin -- garantir concurrence, révocation et absence de changement partiel.
- [x] `apps/api/app/index.ts`, `apps/api/app/*controller*`, `apps/api/openapi/v1.yaml`, `packages/api-client/src/**` -- exposer liste, création, rôle, état et révocation sous contrat cookie/CSRF/RFC 9457, puis régénérer le client -- maintenir une source de vérité et des DTO à liste blanche.
- [x] `packages/screens/src/**`, `apps/web/src/app/administration/**`, `packages/ui/src/**` -- fournir liste, formulaire, actions et dialogues de confirmation accessibles avec états de conflit/réseau/session expirée -- préserver focus, saisies et cibles tactiles.
- [x] `packages/testing/tests/**` -- couvrir matrice, dernier admin, rôles multiples, version, idempotence, révocation, expiration et absence de fuite -- prévenir les régressions de sécurité et d'accessibilité.

**Acceptance Criteria:**
- Given un administrateur consulte la gestion, when la liste est rendue, then seules les données minimales déclarées sont visibles et aucune donnée de session ou secret n'est exposé.
- Given un compte avec plusieurs rôles, when un administrateur ajoute ou retire un rôle autorisé, then les rôles sont modifiés explicitement sans conversion ni mutation des données AMAP.
- Given une session révoquée ou inactive depuis 12 heures, when elle atteint une route protégée, then l'API refuse l'accès et le web propose une reconnexion sans réafficher de donnée protégée.
- Given une mutation concurrente ou rejouée, when `expectedVersion` est obsolète ou la clé d'idempotence est identique, then aucune écriture silencieuse n'écrase l'état et le résultat initial est restitué.

## Spec Change Log

## Design Notes

Les rôles sont une collection normalisée plutôt qu'une valeur exclusive. Retirer un rôle est une mutation de sécurité équivalente à un changement de rôle: la transaction valide les invariants, révoque les accès concernés et écrit l'audit avant de confirmer. Cela permet `Administrateur + Adherent AMAP` aujourd'hui et de futurs rôles, sans modeler prématurément leurs données métier.

## Verification

**Commands:**
- `pnpm openapi:generate && pnpm openapi:verify` -- expected: contrat et client généré synchronisés.
- `pnpm typecheck && pnpm lint && pnpm boundaries && pnpm cycles && pnpm test` -- expected: types, qualité, frontières et tests d'administration réussissent.
- `pnpm build` -- expected: web et API construisent sans secret ni configuration productive embarquée.

## Suggested Review Order

**Mutations de sécurité**

- Centralise validations, transactions, révocations et invariants de concurrence.
  [`account_administration.ts:61`](../../apps/api/app/account_administration.ts#L61)

- Protège les routes admin par rôle, CSRF et réponses RFC 9457.
  [`account_administration_controller.ts:14`](../../apps/api/app/account_administration_controller.ts#L14)

- Migre le rôle unique vers une collection versionnée et auditable.
  [`20260828000000_add_account_administration.ts:5`](../../apps/api/database/migrations/20260828000000_add_account_administration.ts#L5)

**Contrat et sessions**

- Déclare les opérations administratives et leurs contraintes de concurrence.
  [`v1.yaml:118`](../../apps/api/openapi/v1.yaml#L118)

- Revalide les sessions persistées et renouvelle uniquement une activité protégée.
  [`auth.ts:21`](../../apps/api/app/auth.ts#L21)

**Interface**

- Offre création, pagination et actions confirmées sans identifiant de session exposé.
  [`account-administration-screen.tsx:18`](../../packages/screens/src/account-administration-screen.tsx#L18)

- Garantit la confirmation modale, l'annulation et le verrouillage pendant l'envoi.
  [`confirm-dialog.tsx:7`](../../packages/ui/src/components/feedback/confirm-dialog.tsx#L7)

**Preuves**

- Vérifie les invariants de rôles, sessions, idempotence et absence de secrets.
  [`auth-behavior.test.mjs:92`](../../packages/testing/tests/auth-behavior.test.mjs#L92)
