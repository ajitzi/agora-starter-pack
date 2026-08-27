# Dictionnaire de données - Authentification

Ce document décrit les données d'authentification actuellement implémentées. Sources: migration `20260827000000_create_authentication_tables.ts`, configurations Auth/Session et contrôleur HTTP.

## Tables PostgreSQL

### `accounts`

| Colonne | Type | Nullable | Règle / valeur | Description | Sensibilité |
|---|---|---:|---|---|---|
| `id` | UUID | Non | Clé primaire | Identifiant stable du compte. | Interne |
| `email` | VARCHAR(320) | Non | Unique après normalisation en minuscules Unicode NFKC | Adresse utilisée pour la connexion. | Personnelle |
| `password_hash` | VARCHAR(255) | Non | Hash scrypt, jamais sérialisé par l'API | Vérificateur du mot de passe. | Secret |
| `role` | ENUM | Non | `admin` ou `amap` | Rôle qui détermine la destination après connexion. | Interne |
| `active` | BOOLEAN | Non | `true` par défaut | Désactive l'accès sans supprimer le compte. | Interne |
| `created_at` | TIMESTAMPTZ | Non | Renseigné à la création | Date de création du compte. | Interne |
| `updated_at` | TIMESTAMPTZ | Non | Renseigné à la création et aux mises à jour | Date de dernière mise à jour. | Interne |

Index: `accounts_email_normalized_unique` impose l'unicité de `lower(email)`.

### `login_attempts`

| Colonne | Type | Nullable | Règle / valeur | Description | Sensibilité |
|---|---|---:|---|---|---|
| `id` | UUID | Non | Clé primaire | Identifiant de la tentative. | Interne |
| `email` | VARCHAR(320) | Non | Email normalisé | Identifiant présenté lors de la tentative. | Personnelle |
| `ip` | VARCHAR(64) | Non | Adresse source HTTP | Adresse utilisée pour la limitation anti-bruteforce. | Personnelle / technique |
| `attempted_at` | TIMESTAMPTZ | Non | Horodatage de la tentative | Permet de compter les tentatives sur 15 minutes. | Interne |

Index: `(email, attempted_at)` et `(ip, attempted_at)`. La limite active est de 5 tentatives par email ou adresse IP sur 15 minutes.

### `sessions`

| Colonne | Type | Nullable | Règle / valeur | Description | Sensibilité |
|---|---|---:|---|---|---|
| `id` | VARCHAR | Non | Clé primaire | Identifiant de session Adonis. | Secret de session |
| `data` | TEXT | Non | Donnée sérialisée par Adonis Session | Contient notamment l'état du garde `web` et le jeton CSRF. | Secret de session |
| `user_id` | VARCHAR | Oui | Indexé | Identifiant utilisateur associé par le store de session. | Interne |
| `expires_at` | TIMESTAMPTZ | Non | Indexé, durée de 12 heures | Expiration de la session. | Interne |

Le cookie associé est `lcm-session`, `HttpOnly`, `SameSite=Lax`, limité au chemin `/` et marqué `Secure` en production.

### `security_audit_proofs`

| Colonne | Type | Nullable | Règle / valeur | Description | Sensibilité |
|---|---|---:|---|---|---|
| `id` | UUID | Non | Clé primaire | Identifiant de la preuve d'audit. | Interne |
| `account_id` | UUID | Oui | Clé étrangère vers `accounts.id`, `ON DELETE SET NULL` | Compte concerné quand il est connu. | Interne |
| `action` | VARCHAR(64) | Non | `login_succeeded` ou `login_refused` | Résultat de l'événement d'authentification. | Sécurité |
| `occurred_at` | TIMESTAMPTZ | Non | Horodatage de l'événement | Date de la preuve. | Sécurité |

## Données de transport

| Flux | Données | Destination | Règle de sécurité |
|---|---|---|---|
| Connexion `POST /v1/auth/login` | `email`, `password` | API | Le mot de passe est utilisé uniquement pour vérifier le hash; il n'est ni journalisé ni renvoyé. |
| Connexion réussie | `role`, `destination` | Client | Crée une session et initialise un jeton CSRF côté serveur. |
| Session `GET /v1/auth/session` | `email`, `role`, `destination` | Client authentifié | Refusée si la session est absente, expirée, révoquée ou si le compte est inactif. |
| CSRF `GET /v1/auth/csrf` | `csrfToken` | Client authentifié | Jeton requis pour les mutations de session. |
| Déconnexion `POST /v1/auth/logout` | En-tête `x-csrf-token` | API | Le jeton doit correspondre à celui stocké dans la session. |
| Refus de connexion | Problème RFC 9457 et identifiant de corrélation | Client | Le même message générique est retourné pour éviter l'énumération des comptes. |
