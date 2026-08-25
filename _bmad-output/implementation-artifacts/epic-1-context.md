# Epic 1 Context: Accéder à l'exploitation en sécurité

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Établir le socle web et API qui permet aux administrateurs et aux adhérents AMAP d'accéder uniquement à leur espace et à leurs données autorisées. L'épic fournit un workspace reproductible, un contrat API vérifiable, des comptes et sessions sécurisés, une autorisation appliquée côté serveur et un journal d'audit immuable, afin que les capacités métier suivantes reposent sur une fondation fiable, accessible et respectueuse des données personnelles.

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

- V1 distingue les rôles `Administrateur` et `Adherent AMAP`. Seul l'administrateur authentifié accède à l'administration et aux données des clients classiques; l'adhérent accède uniquement à ses propres données et paniers. Un compte désactivé ne peut ni ouvrir de session ni accéder à son espace.
- Les comptes utilisent une adresse email normalisée et unique ainsi qu'un mot de passe haché. Aucun identifiant ou mot de passe par défaut ne doit exister dans le code, les artefacts ou les journaux.
- Les sessions expirent après 12 heures d'inactivité et sont révocables par un administrateur. Toute requête protégée doit revalider l'état courant du compte et de la session.
- La connexion et la récupération de mot de passe ne doivent pas permettre d'énumérer les comptes: réponses et temporisations restent génériques, et les tentatives sont limitées par adresse IP et identifiant normalisé.
- La réinitialisation utilise un lien à usage unique valable une heure. Seul son condensat est stocké; une nouvelle demande invalide les liens précédents. La consommation du lien, le changement de mot de passe et la révocation de toutes les sessions existantes sont atomiques.
- L'email de définition ou réinitialisation de mot de passe est l'unique email transactionnel autorisé en V1. Il ne contient ni contenu marketing ni donnée métier inutile.
- Les mutations de comptes et sessions utilisent une version attendue, sont idempotentes pour une même opération rejouée, et refusent tout écrasement concurrent. Les opérations ne doivent jamais supprimer le dernier administrateur actif.
- L'accès est refusé par défaut sans politique explicite côté API. Une interface qui masque une action ne remplace pas son contrôle d'autorisation serveur; les refus ne divulguent ni l'existence ni les données d'une ressource protégée.
- Toute action de sécurité significative doit être auditée: connexion, réinitialisation, création, désactivation, réactivation, changement de rôle et révocation de session. Un événement contient l'acteur ou le système, l'horodatage, l'objet, l'action, les valeurs avant/après et le motif requis; il ne contient jamais mot de passe, condensat, jeton, cookie ou secret. Les événements sont non modifiables et consultables uniquement par les administrateurs.
- Le journal d'audit est filtrable et trié de façon déterministe du plus récent au plus ancien. Les longues listes utilisent des curseurs opaques stables; les erreurs HTTP suivent RFC 9457 avec un problème exploitable, sans détail interne.
- Toute collecte de données personnelles en production exige une notice active, versionnée et juridiquement validée. Elle identifie au minimum responsable, finalité, base légale, durée ou critère, droits et contact; la version affichée est conservée avec la collecte. Les validations juridiques et informations réelles bloquent la promotion de production, pas le développement ou les tests locaux non productifs.

## Technical Decisions

- Construire un monorepo TypeScript avec `pnpm` et un unique lockfile racine. La V1 contient `apps/web`, `apps/api`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`; aucune application mobile n'est créée ou déployée.
- Respecter la direction des dépendances `apps -> screens -> domain/application -> core`. Les règles métier et cas d'usage restent indépendants de HTTP, ORM, framework UI et fournisseurs; les adaptateurs, modèles Lucid, migrations et transactions résident dans `apps/api`.
- Les routes web sont minces; les écrans partagés sont dans `packages/screens` sans import de routeur. Seul `@project/ui` importe Tamagui et expose tokens, primitives, thèmes et intégration nécessaire.
- Utiliser Next.js 16.3.2, Node.js 24.0.0, AdonisJS 7.5.0, Lucid 22.4.2, PostgreSQL 18.6, OpenAPI 3.1.2 et Tamagui 2.7.7. Les versions sont verrouillées et toute évolution valide la chaîne complète en CI.
- Le contrat OpenAPI versionné dans `apps/api/openapi` est la source de vérité HTTP: schémas de requêtes, réponses, erreurs et sécurité. Les requêtes sont validées à la frontière HTTP; `@project/api-client` est dérivé ou validé depuis ce contrat, sans endpoints ni schémas manuscrits concurrents. Toute rupture implique une nouvelle version de contrat.
- Utiliser Adonis Auth côté API. Les sessions sont opaques dans un cookie `HttpOnly`, `Secure` en production et `SameSite=Lax`; chaque mutation authentifiée par cookie applique une protection CSRF.
- Une mutation passe par un cas d'usage, valide l'état courant, et persiste atomiquement les écritures liées, y compris l'audit. Les commandes HTTP rejouables mémorisent leur résultat initial dans un enregistrement d'idempotence scope par opération et principal.
- Les secrets et configurations runtime restent dans l'environnement de chaque application. Chaque app produit son propre artefact immuable identifié par SHA Git; une release ajoute le même tag SemVer. `infra` possède environnements, déploiement, promotion, rollback et références de secrets.
- Les contrôles locaux et CI refusent imports profonds, imports interdits et cycles. GitHub Actions exécute, avec lockfile figé, installation, types, lint, frontières, cycles, tests, conformité OpenAPI et builds; tout échec bloque l'intégration.

## UX & Interaction Patterns

- Le shell web responsive fonctionne de 320 px à 1440 px, sans défilement horizontal, avec texte à 200 % et zoom à 400 %. Chaque écran offre un unique `main`, une hiérarchie de titres correcte et un lien « Aller au contenu » visible au focus.
- Employer exclusivement les tokens et composants de `@project/ui`: surface de `Screen`, `ScreenHeader`, `StickyActionBar`, `FilterSheet` et `ConfirmDialog` lorsque pertinents. Les actions destructives demandent une confirmation qui explique la conséquence et distingue nettement le retour non destructif.
- Les formulaires de connexion et de réinitialisation utilisent labels visibles, aides et erreurs associées aux champs, résumé d'erreurs focusable, focus visible et conservation des saisies valides. Pendant une soumission, empêcher le double envoi et distinguer chargement, succès, erreur réseau et refus par texte et signal visuel.
- Les dialogues et sheets sont modaux, nommés, utilisables au clavier, ferment avec `Escape` sauf exception justifiée, rendent l'arrière-plan inerte et restaurent le focus au déclencheur. Les états d'accès refusé, session expirée ou compte désactivé expliquent la situation sans donnée protégée et proposent uniquement une action autorisée.
- L'administration adopte la navigation mobile `Aujourd'hui`, `Commandes`, `Preparer`, `Dispos`, `Plus`, transformée en sidebar sur tablette paysage et desktop. L'espace adhérent ne présente que les destinations correspondant à son rôle, avec destination active et ordre de focus cohérent.

## Cross-Story Dependencies

- Les Stories 1.1 à 1.3 livrent les fondations de workspace, UI, contrat API et CI requises par les stories d'identité suivantes.
- La Story 1.4 fournit comptes, authentification et sessions à la Story 1.5; la Story 1.5 fournit le parcours de définition de mot de passe utilisé lors de la création de compte en Story 1.6.
- Les Stories 1.6 et 1.7 s'appuient sur l'authentification pour gérer les accès et les rôles; la Story 1.8 définit le port et le schéma d'audit réutilisables par ces mutations et par les futurs domaines.
- Les Epics 2 à 8 dépendent de cet épic pour l'authentification, l'autorisation, le cloisonnement et l'audit de leurs propres actions métier.
