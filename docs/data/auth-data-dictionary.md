# Dictionnaire de données - Authentification et administration des comptes

Ce document décrit les données implémentées par les migrations `20260827000000_create_authentication_tables.ts`, `20260827000001_create_password_recovery_tables.ts` et `20260828000000_add_account_administration.ts`.

## Tables PostgreSQL

### `accounts`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Interne |
| `email` | VARCHAR(320) | Non | Unique après normalisation NFKC/minuscules | Personnelle |
| `password_hash` | VARCHAR(255) | Non | Hash scrypt, jamais sérialisé | Secret |
| `active` | BOOLEAN | Non | `true` par défaut; bloque tout accès quand `false` | Sécurité |
| `version` | INTEGER | Non | `1` à la création; concurrence optimiste | Interne |
| `last_activity_at` | TIMESTAMPTZ | Oui | Dernière activité protégée connue | Personnelle / technique |
| `created_at`, `updated_at` | TIMESTAMPTZ | Non | Horodatages de cycle de vie | Interne |

Index: `accounts_email_normalized_unique` impose l'unicité de `lower(email)`.

### `account_roles`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `account_id` | UUID | Non | FK vers `accounts.id`, suppression en cascade | Interne |
| `role` | VARCHAR(64) | Non | Clé primaire composée avec `account_id`; valeurs actuelles `admin`, `amap` | Sécurité |

Un compte porte un ou plusieurs rôles. Il ne peut pas ne plus avoir de rôle; le dernier administrateur actif ne peut être désactivé ni perdre `admin`.

### `sessions`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | VARCHAR | Non | Clé primaire, identifiant Adonis | Secret de session |
| `data` | TEXT | Non | État sérialisé du garde web et CSRF | Secret de session |
| `user_id` | VARCHAR | Oui | Compte associé, indexé | Interne |
| `expires_at` | TIMESTAMPTZ | Non | Indexé; inactivité maximale de 12 h | Sécurité |

Le cookie associé est `lcm-session`, `HttpOnly`, `SameSite=Lax`, chemin `/` et `Secure` en production.

### `login_attempts` et `password_recovery_attempts`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Interne |
| `email` | VARCHAR(320) | Non | Identifiant normalisé présenté | Personnelle |
| `ip` | VARCHAR(64) | Non | Adresse source HTTP | Personnelle / technique |
| `attempted_at` | TIMESTAMPTZ | Non | Horodatage | Sécurité |

Les deux tables sont indexées par `(email, attempted_at)` et `(ip, attempted_at)`. Elles appliquent une limite de cinq tentatives sur quinze minutes sans révéler l'existence d'un compte.

### `password_reset_tokens`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Secret |
| `account_id` | UUID | Non | FK vers `accounts.id`, suppression en cascade | Interne |
| `token_digest` | VARCHAR(64) | Non | Unique; seul condensat stocké | Secret |
| `expires_at` | TIMESTAMPTZ | Non | Validité d'une heure | Sécurité |
| `used_at` | TIMESTAMPTZ | Oui | Consommation ou invalidation | Sécurité |
| `created_at` | TIMESTAMPTZ | Non | Création | Interne |

Index: `(account_id, used_at)`. Le jeton en clair ne traverse jamais la base, l'API, les journaux ou l'audit.

### `email_jobs`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Interne |
| `kind` | VARCHAR(64) | Non | `password_recovery` en V1 | Interne |
| `account_id`, `password_reset_token_id` | UUID | Non | FKs avec suppression en cascade | Interne |
| `state` | ENUM | Non | `pending`, `sent`, `failed`, `cancelled` | Exploitation |
| `sent_at`, `available_at`, `locked_at`, `lock_expires_at`, `failed_at`, `created_at` | TIMESTAMPTZ | Variable | Planification et reprise du worker | Exploitation |
| `attempts` | INTEGER | Non | `0` par défaut | Exploitation |
| `locked_by` | VARCHAR(128) | Oui | Identifiant du worker | Exploitation |
| `last_error` | VARCHAR(64) | Oui | Code non sensible d'échec | Exploitation |

Index: `(state, available_at)` et `(state, lock_expires_at)`.

### `account_mutations`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Interne |
| `principal_id` | UUID | Non | FK vers le compte administrateur | Sécurité |
| `operation` | VARCHAR(64) | Non | Opération et cible de mutation | Interne |
| `idempotency_key` | VARCHAR(128) | Non | Unique avec `principal_id` et `operation` | Sécurité |
| `request_fingerprint` | VARCHAR(64) | Non | Condensat de la requête rejouée | Sécurité |
| `result` | JSONB | Non | Résultat initial à restituer | Interne |
| `created_at` | TIMESTAMPTZ | Non | Création | Interne |

### `security_audit_proofs`

| Colonne | Type | Nullable | Règle / valeur | Sensibilité |
|---|---|---:|---|---|
| `id` | UUID | Non | Clé primaire | Interne |
| `account_id` | UUID | Oui | Compte concerné, `ON DELETE SET NULL` | Interne |
| `actor_id` | UUID | Oui | Administrateur ou système à l'origine | Sécurité |
| `action` | VARCHAR(64) | Non | Connexion, récupération, compte ou session | Sécurité |
| `object_type`, `object_id` | VARCHAR(64), UUID | Oui | Objet administré | Sécurité |
| `before`, `after` | JSONB | Oui | Valeurs métier sans secret | Sécurité |
| `occurred_at` | TIMESTAMPTZ | Non | Horodatage | Sécurité |

## Données de transport

| Flux | Données | Règle de sécurité |
|---|---|---|
| Connexion | `email`, `password` | Le mot de passe n'est ni journalisé ni renvoyé. |
| Gestion des comptes | email, rôles, état, activité, sessions actives, version | Réservée à `admin`; aucun hash, jeton, cookie ou identifiant de session. |
| Mutation administrative | `expectedVersion`, clé d'idempotence, CSRF | Refus de conflit sans écrasement; résultat initial restitué au rejeu. |
| Récupération | email, jeton opaque, nouvelle phrase de passe | Réponse non énumérable; condensat seul en persistance; durée une heure. |
