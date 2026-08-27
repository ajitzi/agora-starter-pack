---
title: 'Story 1.4 : Se connecter avec email et mot de passe'
type: 'feature'
created: '2026-08-27'
status: 'done'
review_loop_iteration: 0
baseline_commit: 'f7fc23ea405d7d1a9bfa2eda9125722edc47a9c0'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Les administrateurs et adherents AMAP n'ont actuellement ni compte exploitable ni moyen d'ouvrir une session pour accéder à leur espace autorisé. L'API ne persiste encore aucune donnée d'identité et le web ne propose aucun parcours de connexion.

**Approach:** Fournir une authentification email et mot de passe de bout en bout: comptes persistés, sessions opaques Adonis Auth et endpoints contractuels, puis un écran partagé de connexion accessible qui dirige uniquement vers l'espace permis par le rôle.

## Boundaries & Constraints

**Always:** Normaliser et rendre unique l'email; ne conserver que des mots de passe hachés; utiliser Adonis Auth avec une session opaque en cookie `HttpOnly`, `SameSite=Lax` et `Secure` en production; expirer la session après 12 heures d'inactivité et revalider compte et session à chaque route protégée. Refuser les comptes désactivés sans révéler leur existence. Limiter les tentatives par IP et identifiant normalisé, avec une réponse et une temporisation génériques pour empêcher l'énumération. Toute mutation authentifiée, y compris la déconnexion, applique le CSRF. Le contrat OpenAPI reste la source de vérité et `@project/api-client` est uniquement généré. Les routes Next restent minces, les écrans résident dans `packages/screens`, et seul `@project/ui` importe Tamagui. Auditer la connexion réussie ou refusée via une frontière compatible avec la story 1.8, sans mot de passe, hash, cookie, jeton ni secret.

**Ask First:** Modifier les versions verrouillées ou choisir un fournisseur externe d'identité, de limitation ou de cache; exposer l'inscription publique, la réinitialisation de mot de passe, la gestion des rôles/comptes/sessions par l'administration, ou une destination métier non encore livrée.

**Never:** Ne jamais introduire de compte, email, mot de passe, cookie ou secret par défaut dans le code, les migrations, les tests, les journaux ou les artefacts. Ne jamais renvoyer de hash, mot de passe, jeton opaque ou détail permettant d'identifier un compte. Ne pas implémenter le journal d'audit consultable, la création administrative de compte, l'autorisation métier complète ou la réinitialisation: ces sujets appartiennent aux stories 1.5 à 1.8.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Connexion réussie | Email normalisé, mot de passe valide, compte actif | Session opaque créée; cookie sûr défini; réponse sans secret avec rôle et destination autorisée | Le web annonce le succès puis navigue vers l'espace correspondant |
| Identifiants non valides | Email inconnu ou mot de passe incorrect | Même statut, message et temporisation génériques | Conserver l'email saisi; effacer le mot de passe; ne révéler aucun état du compte |
| Compte désactivé | Identifiants valides mais compte inactif | Aucune session créée; réponse indiscernable d'un refus d'identifiants | Ne divulguer ni rôle ni statut du compte |
| Limitation | Seuil atteint pour l'IP ou l'identifiant normalisé | Aucune tentative de connexion supplémentaire dans la fenêtre | Réponse générique, réessai temporisé et aucun détail de compteur |
| Session ou mutation protégée | Cookie absent, expiré, révoqué ou CSRF absent/invalide | Accès ou mutation refusé selon le contrat RFC 9457 | Le web explique l'expiration ou le refus sans donnée protégée et propose la connexion |
| Retour réseau | Soumission sans réponse fiable | Aucune seconde session ni double envoi | Désactiver le bouton pendant l'envoi; conserver les saisies valides et afficher une erreur réessayable |

</frozen-after-approval>

## Code Map

- `apps/api/package.json:12-15` -- dépendances Adonis/Lucid actuelles; ajouter l'intégration Auth compatible avec la stack verrouillée.
- `apps/api/config/app.ts:12-19` -- politique de cookie existante à aligner avec la session d'inactivité de 12 heures.
- `apps/api/app/index.ts:8-21`, `apps/api/app/http.ts:1-32` -- routes API minimales et normalisation RFC 9457/corrélation à prolonger sans contourner le gestionnaire central.
- `apps/api/openapi/v1.yaml:1-88` -- unique source du contrat; déclarer login, logout, cookie de session, CSRF et problèmes génériques avant régénération.
- `apps/api/database/` et `apps/api/config/auth.ts` -- inexistants; créer migrations, modèles et configuration uniquement dans le runtime API.
- `packages/api-client/src/index.ts:1-85` -- sortie générée depuis OpenAPI; ne pas éditer manuellement.
- `apps/web/src/app/page.tsx:1-5` -- route Next mince existante; ajouter des routes de connexion et de destinations provisoires sans déplacer l'écran dans l'application.
- `packages/screens/src/index.tsx:6-28` -- point d'entrée des écrans partagés; exporter le parcours de connexion sans dépendance au routeur.
- `packages/ui/src/index.tsx:20-104` -- primitives `Screen`, `ScreenHeader`, `SkipLink`, `Button` et tokens à réutiliser; aucun import Tamagui hors de ce package.
- `docs/ui/auth/login.md:112-129,241-254,355-396` -- règles visuelles et comportementales du formulaire: labels, erreurs, focus, soumission et destinations par rôle.
- `packages/testing/tests/boundaries.test.mjs:26-30,62-108` -- test de frontière actuel et démarrage Adonis; remplacer l'interdiction de persistance par des invariants d'authentification ciblés.
- `package.json:14-22`, `.github/workflows/ci.yml:13-34` -- scripts et gates CI obligatoires à conserver.

## Tasks & Acceptance

**Execution:**
- [x] `apps/api/package.json`, `apps/api/config/auth.ts`, `apps/api/config/database.ts`, `apps/api/database/**` -- intégrer Adonis Auth et PostgreSQL, puis créer les schémas de comptes, sessions, tentatives limitées et preuve d'audit minimale sans secret -- rendre l'identité persistante et contrôlable côté serveur.
- [x] `apps/api/app/**` -- créer validateurs, cas d'usage, adaptateurs, middleware et routes de connexion/déconnexion; normaliser l'email, hasher les mots de passe, imposer limitation, session, revalidation et CSRF -- centraliser les garanties de sécurité hors HTTP et appliquer les erreurs RFC 9457.
- [x] `apps/api/commands/**`, `README.md` -- fournir et documenter une commande Ace de création du premier administrateur sans valeur par défaut ni fuite dans les logs -- permettre un bootstrap opérable et sûr.
- [x] `apps/api/openapi/v1.yaml`, `packages/api-client/src/**` -- versionner les endpoints et schémas d'authentification, puis générer et vérifier le client -- garder le contrat HTTP synchronisé.
- [x] `packages/screens/src/**`, `apps/web/src/app/**` -- créer l'écran de connexion et ses routes minces, avec labels visibles, résumé d'erreurs focusable, focus visible, état de soumission, conservation de l'email et effacement du mot de passe -- rendre le parcours utilisable et accessible de 320 à 1440 px.
- [x] `packages/testing/tests/**` -- couvrir succès, refus générique, compte désactivé, limitation, expiration/révocation, CSRF, absence de secret dans les réponses/audits et états de formulaire -- empêcher les régressions de sécurité et d'accessibilité.

**Acceptance Criteria:**
- Given un administrateur ou adherent actif avec des identifiants valides, when il se connecte, then il reçoit une session opaque sûre et atteint uniquement sa destination autorisée.
- Given une session inactive depuis plus de 12 heures ou un compte désactivé après connexion, when une route protégée est demandée, then le serveur refuse l'accès sans exposer de donnée protégée.
- Given une requête de connexion ou déconnexion, when le contrat est vérifié et le client généré, then OpenAPI, API et `@project/api-client` restent cohérents sans schéma concurrent manuel.
- Given le formulaire de connexion, when une soumission est en cours, échoue ou réussit, then ses états sont annoncés, le double envoi est empêché et les erreurs restent associées aux champs et au résumé focusable.

## Design Notes

Les réponses de refus sont volontairement communes à l'email inconnu, au mot de passe invalide et au compte désactivé. Le rôle est divulgué seulement après authentification réussie; une destination de retour éventuelle est validée côté serveur avant toute navigation.

## Verification

**Commands:**
- `pnpm openapi:generate && pnpm openapi:verify` -- expected: le client dérivé correspond exactement au contrat d'authentification.
- `pnpm typecheck && pnpm lint && pnpm boundaries && pnpm cycles && pnpm test` -- expected: types, qualité, frontières, cycles et tests de sécurité réussissent.
- `pnpm build` -- expected: les applications web et API construisent sans secret ni configuration runtime embarquée.

## Suggested Review Order

**Entrée et sessions**

- Établit la session, les refus génériques et les contrôles CSRF.
  [`auth_controller.ts:20`](../../apps/api/app/auth_controller.ts#L20)

- Réserve atomiquement les tentatives et applique le délai uniforme.
  [`auth.ts:29`](../../apps/api/app/auth.ts#L29)

- Expose les routes d'identité derrière les middlewares Adonis requis.
  [`index.ts:21`](../../apps/api/app/index.ts#L21)

**Contrat et persistance**

- Déclare les cookies, réponses et sécurité comme source HTTP unique.
  [`v1.yaml:11`](../../apps/api/openapi/v1.yaml#L11)

- Persiste comptes, sessions, tentatives et preuve d'audit sans secret.
  [`20260827000000_create_authentication_tables.ts:5`](../../apps/api/database/migrations/20260827000000_create_authentication_tables.ts#L5)

**Accès et interface**

- Vérifie la session et le rôle avant de rendre l'administration.
  [`page.tsx:4`](../../apps/web/src/app/administration/page.tsx#L4)

- Gère la soumission, les erreurs accessibles et la destination autorisée.
  [`index.tsx:42`](../../packages/screens/src/index.tsx#L42)

**Preuves**

- Couvre les invariants de sécurité et les états du parcours utilisateur.
  [`auth-behavior.test.mjs:21`](../../packages/testing/tests/auth-behavior.test.mjs#L21)
