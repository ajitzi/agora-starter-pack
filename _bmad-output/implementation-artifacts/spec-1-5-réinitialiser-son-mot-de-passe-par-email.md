---
title: 'Story 1.5 : Réinitialiser son mot de passe par email'
type: 'feature'
created: '2026-08-27'
status: 'done'
review_loop_iteration: 0
baseline_commit: 'f8987c7cb64e41a922e7cf2df46a9f567f01b474'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Un administrateur ou adhérent AMAP qui a oublié son mot de passe ne peut pas retrouver un accès autonome et sûr à son espace. Les comptes et les sessions existent, mais aucun lien de récupération, envoi transactionnel ou parcours web associé n'est disponible.

**Approach:** Ajouter un parcours complet et commun aux deux rôles: demande non énumérable, lien opaque à usage unique envoyé par email, puis définition d'une phrase de passe qui invalide le lien et révoque les sessions existantes atomiquement.

## Boundaries & Constraints

**Always:** Garder une réponse, un statut et une temporisation génériques pour toute demande, y compris lorsqu'un compte est absent ou désactivé; limiter par IP et email normalisé. Ne persister que le condensat d'un jeton aléatoire, valable exactement une heure, et invalider les jetons actifs précédents lors d'une nouvelle demande. Exiger 12 à 128 caractères, une confirmation concordante et le rejet des mots de passe courants sans règle arbitraire de composition. Consommer le jeton, remplacer le hash et supprimer toutes les sessions dans une transaction. Utiliser Resend derrière un port et une file PostgreSQL relançable; l'email minimal contient l'identité de l'exploitation, le lien individuel, sa durée et l'instruction d'ignorer la demande. Le contrat OpenAPI reste la source de vérité; aucun jeton, condensat, mot de passe, URL complète sensible, cookie ou secret ne figure dans une réponse, un audit, un journal ou l'historique web.

**Ask First:** Changer de fournisseur d'email, envoyer un autre type d'email transactionnel, exposer l'identité réelle de l'exploitation hors de la configuration runtime, ou modifier la politique de mot de passe et la durée d'une heure.

**Never:** Ne pas connecter automatiquement après le reset, créer de second parcours par rôle, confirmer l'existence ou l'état d'un compte, ni implémenter la gestion administrative des comptes, le journal d'audit consultable ou des notifications métiers.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Demande recevable | Email valide, compte actif | Réponse publique générique; jeton opaque condensé, ancien jeton invalidé et email mis en file | L'email, le rôle et l'état restent indiscernables d'un compte absent |
| Limitation ou compte absent | Seuil IP/email atteint, email inconnu ou compte désactivé | Même réponse et délai; aucun jeton ni envoi nouveau | Ne révéler aucun compteur, détail ni existence |
| Lien valide | Jeton opaque non expiré dans l'URL | Seul le formulaire de nouvelle phrase de passe est accessible | Ne pas consigner ni conserver le jeton après soumission |
| Mot de passe invalide | 11 ou moins, plus de 128 caractères, courant ou confirmation différente | Aucun changement; erreur précise liée au champ | Préserver les saisies valides et le résumé focusable |
| Reset réussi | Jeton actif et phrase de passe conforme | Hash remplacé, jeton consommé et sessions révoquées atomiquement; succès puis lien de connexion | L'ancien mot de passe ne permet plus de session |
| Lien non utilisable | Jeton invalide, remplacé, expiré ou déjà consommé | Aucune donnée ni mutation; proposer une nouvelle demande | Message générique identique pour toutes les causes |
| Échec temporaire d'envoi | Fournisseur indisponible | Job persistant relançable; un seul jeton actif pour le compte | Réponse publique inchangée, sans détail technique |

</frozen-after-approval>

## Code Map

- `apps/api/app/auth_controller.ts:14-83` -- contrôleur et `sendProblem` RFC 9457 à étendre avec les commandes de demande et de consommation, sans rendre le jeton ni l'état du compte.
- `apps/api/app/auth_policy.mjs:6-40` -- réutiliser normalisation NFKC, délai uniforme et preuve d'audit; ajouter la politique de phrase de passe et les flux de récupération hors de `validateLoginInput`.
- `apps/api/app/auth.ts:29-65` -- modèle de limite PostgreSQL et d'écriture d'audit à généraliser avec des opérations distinctes de récupération.
- `apps/api/app/models/account.ts:6-17`, `apps/api/config/hash.ts:3-6`, `apps/api/config/session.ts:4-12` -- remplacer le hash via l'API Adonis existante et révoquer les sessions de compte sans modifier la politique de cookie.
- `apps/api/database/migrations/20260827000000_create_authentication_tables.ts:5-34`, `apps/api/database/schema.ts:10-66` -- schéma auth existant; ajouter une migration et les modèles nécessaires aux jetons condensés, limites, jobs d'email et preuves sans secret.
- `apps/api/app/index.ts:22-32`, `apps/api/openapi/v1.yaml:1-181`, `packages/api-client/src/index.ts:1-92` -- déclarer les endpoints publics puis régénérer, sans client manuscrit concurrent.
- `apps/api/start/env.ts:3-10`, `apps/api/.env.example:1-6`, `apps/api/app/adapters/.gitkeep` -- introduire uniquement les configurations runtime et le port/adaptateur Resend nécessaires, jamais de valeur productive.
- `packages/screens/src/login-screen.tsx:9-75`, `packages/screens/src/index.tsx:1-2` -- conserver le shell, les états de soumission et l'accessibilité; ajouter le lien de récupération et exporter les nouveaux écrans partagés sans routeur.
- `apps/web/src/app/connexion/page.tsx:1-5`, `apps/web/next.config.mjs:14-17` -- routes Next minces pour demande et reset; le proxy couvre déjà `/v1/*`.
- `packages/ui/src/index.tsx:2-19`, `packages/ui/src/text-input.tsx:5-15`, `packages/ui/src/button.tsx:5-19` -- réutiliser exclusivement les primitives accessibles et leurs cibles/focus visibles.
- `packages/testing/tests/auth-behavior.test.mjs:21-89`, `packages/testing/tests/boundaries.test.mjs:83-142,243-257` -- prolonger les preuves de sécurité, contrat et frontières sans exposer de secrets.
- `docs/ui/auth/account-recovery.md:53-370`, `docs/ui/auth/login.md:112-130` -- référence de contenus, états et règles d'accessibilité; corriger le lien « Mot de passe oublié ? » absent du login.

## Tasks & Acceptance

**Execution:**
- [x] `apps/api/database/**`, `apps/api/app/models/**`, `apps/api/app/auth*.{ts,mjs}` -- persister le cycle de vie du jeton condensé, les limites et l'audit minimal; traiter création, invalidation, consommation, hash et révocation dans des transactions -- garantir un lien unique, non divulgué et sûr sous concurrence.
- [x] `apps/api/app/adapters/**`, `apps/api/config/**`, `apps/api/start/env.ts`, `apps/api/.env.example`, `apps/api/app/**` -- configurer le port Resend et une file PostgreSQL avec reprise idempotente -- livrer l'email transactionnel sans secret codé en dur ni liens actifs multiples.
- [x] `apps/api/app/index.ts`, `apps/api/app/auth_controller.ts`, `apps/api/openapi/v1.yaml`, `packages/api-client/src/**` -- exposer, valider et documenter les demandes et resets publics, puis régénérer le client -- conserver un contrat unique et des erreurs RFC 9457 non énumérables.
- [x] `packages/screens/src/**`, `apps/web/src/app/**` -- créer les formulaires de demande et de nouveau mot de passe ainsi que leurs routes minces -- rendre chaque état accessible, résilient et sans conservation du jeton après traitement.
- [x] `packages/testing/tests/**` -- couvrir tous les scénarios de la matrice, y compris jeton condensé, expiration, remplacement, concurrence, reprise d'email, révocation et absence de fuite -- empêcher les régressions de sécurité et d'accessibilité.

**Acceptance Criteria:**
- Given une demande de récupération avec une adresse connue ou inconnue, when elle est traitée, then le parcours public reste indiscernable et ne divulgue aucune information de compte.
- Given une nouvelle demande pour un compte actif, when l'email est confirmé ou relancé, then un seul lien actif d'une heure subsiste et aucun secret ne traverse les logs, réponses ou analyses.
- Given un reset valide, when il est confirmé, then le changement de hash, la consommation unique et la révocation des sessions réussissent ou échouent ensemble.
- Given les écrans de récupération, when ils sont utilisés au clavier, au lecteur d'écran ou après une erreur, then les labels, aides, erreurs, annonces, focus et saisies valides restent conformes au socle UI.

## Design Notes

Le jeton n'est jamais vérifié par une route de prélecture qui confirmerait indirectement un compte: l'écran de reset est rendu sans donnée de compte et le serveur tranche uniquement à la soumission. Après succès, le client remplace l'URL contenant le jeton avant de proposer « Se connecter », afin d'éviter sa conservation dans l'historique.

## Verification

**Commands:**
- `pnpm openapi:generate && pnpm openapi:verify` -- expected: endpoints, schémas et client généré restent synchronisés.
- `pnpm typecheck && pnpm lint && pnpm boundaries && pnpm cycles && pnpm test` -- expected: types, qualité, frontières et tests de récupération réussissent.
- `pnpm build` -- expected: web et API construisent sans secret ni configuration productive embarquée.

## Suggested Review Order

**Parcours et sécurité**

- Centralise demande, jeton, reset transactionnel et exécution de la file.
  [`password_recovery.ts:27`](../../apps/api/app/password_recovery.ts#L27)

- Définit les validations, délais et invariants testables sans dépendance runtime.
  [`password_recovery_policy.mjs:19`](../../apps/api/app/password_recovery_policy.mjs#L19)

- Expose les réponses publiques génériques et les erreurs de reset contractuelles.
  [`auth_controller.ts:34`](../../apps/api/app/auth_controller.ts#L34)

**Persistance et livraison**

- Stocke jetons condensés et état réclamable de la file durable.
  [`20260827000001_create_password_recovery_tables.ts:5`](../../apps/api/database/migrations/20260827000001_create_password_recovery_tables.ts#L5)

- Exécute périodiquement les envois avec un seul worker d'environnement.
  [`work_email_jobs.ts:5`](../../apps/api/commands/work_email_jobs.ts#L5)

- Isole l'appel Resend et son idempotence du domaine d'authentification.
  [`resend.ts:7`](../../apps/api/app/adapters/resend.ts#L7)

**Contrat et interface**

- Déclare les deux opérations publiques et leurs réponses RFC 9457.
  [`v1.yaml:49`](../../apps/api/openapi/v1.yaml#L49)

- Préserve le lien sensible hors de l'historique et du referer.
  [`password-reset-screen.tsx:11`](../../packages/screens/src/password-reset-screen.tsx#L11)

- Fournit une demande accessible avec erreurs reliées au champ.
  [`password-recovery-screen.tsx:11`](../../packages/screens/src/password-recovery-screen.tsx#L11)

**Preuves et exploitation**

- Couvre limite, jeton, reset atomique et réclamation de file.
  [`password-recovery-behavior.test.mjs:32`](../../packages/testing/tests/password-recovery-behavior.test.mjs#L32)

- Documente les variables runtime et le démarrage du worker.
  [`README.md:1`](../../README.md#L1)
