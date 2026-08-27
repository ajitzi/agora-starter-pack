# Epic 1 Context: Accéder à l'exploitation en sécurité

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Fournir le socle sécurisé qui permet aux administrateurs et aux adhérents AMAP d'accéder uniquement à leur espace et à leurs actions autorisées. L'epic établit un environnement de développement reproductible, une application web et une API contractuelles, puis des comptes, sessions, contrôles d'accès et traces d'audit fiables. Les epics ultérieurs doivent pouvoir brancher leurs capacités métier sur ces contrats sans réimplémenter la sécurité ni exposer des données personnelles.

## Stories

- Story 1.1: Initialiser le workspace et ses frontières
- Story 1.2: Livrer le shell, le contrat API et la gate de notice
- Story 1.3: Automatiser la CI et produire les artefacts
- Story 1.4: Se connecter avec email et mot de passe
- Story 1.5: Réinitialiser son mot de passe par email
- Story 1.6: Administrer les comptes et les sessions
- Story 1.7: Appliquer les rôles et le cloisonnement des données
- Story 1.8: Auditer et consulter les actions de sécurité

## Requirements & Constraints

L'accès authentifié repose sur deux rôles exclusifs: `Administrateur` et `Adherent AMAP`. Seuls les administrateurs peuvent administrer l'exploitation et consulter les données des clients classiques. Un adhérent ne peut lire ou modifier que les données rattachées à son identité. Toute opération protégée doit être refusée par défaut en l'absence d'une politique explicite; la dissimulation d'un contrôle dans l'interface ne suffit jamais. Les comptes désactivés, les sessions révoquées et les sessions inactives depuis 12 heures ne peuvent plus accéder aux ressources protégées.

Les comptes ont une adresse email normalisée unique, un mot de passe haché et un rôle. Le premier administrateur est créé par une commande sécurisée, sans identifiant ou mot de passe par défaut. L'administration peut créer, réactiver, désactiver des comptes, changer leur rôle et révoquer une ou toutes leurs sessions, sans jamais supprimer le dernier administrateur actif. Désactivation et changement de rôle révoquent atomiquement les sessions existantes; le passage vers le rôle adhérent exige une fiche adhérent compatible.

La connexion et la récupération de mot de passe ne doivent pas permettre d'énumérer les comptes. Limiter les tentatives par adresse IP et identifiant normalisé, conserver des réponses génériques et ne jamais exposer rôle, statut ou détails techniques. Le mot de passe de remplacement accepte les phrases de passe de 12 à 128 caractères. Un lien de réinitialisation est opaque, stocké uniquement sous forme de condensat, à usage unique, valable une heure et invalidé par toute nouvelle demande; sa consommation remplace le mot de passe et révoque toutes les sessions du compte dans une même opération. L'email de réinitialisation est le seul email transactionnel autorisé en V1.

Les données personnelles ne sont collectées que lorsqu'une notice de confidentialité active, versionnée et juridiquement validée est configurée en production. La soumission est bloquée sinon. Chaque collecte conserve la version effectivement affichée, sans réécrire l'historique. Ne montrer que les données nécessaires à l'action; ne jamais afficher ni journaliser mots de passe, condensats, jetons, cookies, secrets ou identifiants de session.

Chaque action sensible doit produire un audit immuable, réservé aux administrateurs: acteur ou système, horodatage, objet et identifiant, action, valeurs avant/après et motif lorsqu'il est exigé. Les créations, changements de rôle ou d'état de compte, révocations de session, connexions et réinitialisations sont couverts dès cet epic. Toute mutation exigeant un motif doit échouer entièrement s'il est absent. L'historique se consulte du plus récent au plus ancien, se filtre et se pagine sans doublon ni omission.

## Technical Decisions

Utiliser un monorepo TypeScript avec `pnpm` et un unique `pnpm-lock.yaml` racine. Créer `apps/web`, `apps/api`, `apps/api/openapi`, `apps/api/app/adapters`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`; ne pas créer d'application mobile V1 ni de tables métier spéculatives. Épingler Node.js 24.0.0, Next.js 16.3.2, AdonisJS 7.5.0, Lucid 22.4.2, PostgreSQL 18.6, OpenAPI 3.1.2 et Tamagui 2.7.7.

Respecter strictement la direction `apps -> screens -> domain/application -> core`. Les routes restent minces; les écrans partagés n'importent aucun routeur. Seul `@project/ui` importe Tamagui; domaine et application restent indépendants de HTTP, ORM, frameworks d'interface et fournisseurs. Les modèles Lucid, migrations, transactions et adaptateurs de persistance restent dans `apps/api`. Les imports publics sont obligatoires, sans imports profonds ni cycles; les contrôles locaux et CI doivent les refuser.

Le contrat OpenAPI versionné, détenu par `apps/api`, est la source de vérité des requêtes, réponses, erreurs et mécanismes de sécurité. Les consommateurs hors API passent par `@project/api-client`; les contrôleurs et jobs backend appellent directement les cas d'usage. Valider les requêtes à la frontière HTTP, générer ou valider le client avec Redocly et `openapi-typescript`, et tester la conformité avec l'endpoint de santé. Les erreurs API suivent RFC 9457 et incluent type, titre, statut, détail et identifiant de corrélation approprié. Les listes d'audit utilisent des curseurs opaques stables.

Utiliser Adonis Auth côté API. Les sessions web sont opaques, en cookie `HttpOnly`, `Secure` en production et `SameSite=Lax`; chaque mutation par cookie vérifie le CSRF et les origines autorisées. Un cas d'usage est l'unique point de mutation d'un agrégat: il applique la version attendue, valide l'état courant et persiste les écritures liées dans une transaction. Les mutations rejouables ont une clé d'idempotence portée par l'opération et le principal, qui restitue le résultat initial. Les instants sont échangés et stockés en UTC avec offset ISO 8601; l'affichage d'audit utilise `Europe/Paris`.

Produire séparément les artefacts immuables `web` et `api`, identifiés par SHA Git; les secrets et la configuration runtime restent dans l'environnement. GitHub Actions, avec Node 24.0.0 et lockfile figé, bloque l'intégration si installation, types, lint, frontières, cycles, tests, conformité OpenAPI ou builds échouent. Une release conserve le SHA et reçoit un tag SemVer qui ne peut pas être réaffecté.

## UX & Interaction Patterns

Le shell web responsive fonctionne de 320 à 1440 px, sans défilement horizontal, à 200 % de texte et 400 % de zoom. Toute page comporte un unique `main`, des navigations nommées, une hiérarchie de titres valide et un lien `Aller au contenu` visible au focus. Présenter uniquement les destinations autorisées au rôle courant, avec un état actif explicite et un ordre de focus cohérent.

Construire les surfaces avec les tokens et composants centralisés de `@project/ui`, sans valeurs visuelles locales. Préserver les contrastes requis, un focus visible, des cibles tactiles de 44 à 48 px comme standard, des labels visibles, des erreurs reliées aux champs et un résumé d'erreurs focusable. Les soumissions désactivent l'action pendant la requête, conservent les saisies valides et distinguent chargement, succès, erreur réseau et refus. Les dialogues de désactivation ou de changement irréversible utilisent `ConfirmDialog`, avec conséquence explicite, retour non destructif et focus modal correct.

Pour session expirée, compte désactivé ou accès refusé, expliquer l'état sans aucune donnée protégée et proposer seulement la connexion ou le retour autorisé. Les écrans de connexion et de récupération restent utilisables au clavier et avec lecteur d'écran; un message d'échec garde l'adresse saisie mais efface le mot de passe. Le journal d'audit offre des états de chargement, vide, erreur et absence de résultat explicites; ses filtres s'ouvrent dans `FilterSheet` sur mobile.

## Cross-Story Dependencies

Les stories de fondation, shell, contrat API et CI sont le prérequis des parcours d'identité. La connexion fournit la session utilisée par la récupération, l'administration de comptes, l'autorisation et l'audit. La récupération est requise pour l'initialisation de mot de passe des comptes créés par l'administration. Toute mutation de compte ou de session doit utiliser le contrôle d'autorisation, la concurrence optimiste, l'idempotence et le port d'audit. Les epics 2 à 8 dépendent des contrats d'authentification, d'autorisation et d'audit fournis ici.
