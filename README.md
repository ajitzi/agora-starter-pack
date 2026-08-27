# La Cabane du Merle

## Prerequis

- Node.js `24.0.0`
- pnpm (la version declaree dans `package.json` est activee avec Corepack)

## Demarrage

```sh
corepack enable
pnpm install --frozen-lockfile
```

## Controles locaux

```sh
pnpm typecheck
pnpm lint
pnpm boundaries
pnpm cycles
pnpm test
pnpm build
```

Les packages s'importent uniquement via leurs points d'entree publics `@project/*`. Les domaines restent independants de HTTP, de la persistance et des frameworks d'interface. Aucun secret ne doit etre ajoute aux packages partages.

## CI et images OCI

Les push sur `develop` et les pull requests vers `develop`, `preprod` ou `main` executent le statut obligatoire `Quality gates` : installation figee, types, lint, frontieres, cycles, tests et conformite OpenAPI. Ils ne construisent ni ne publient d'image.

Un push sur `preprod` ou `main` execute d'abord les memes gates, puis publie separement les images web et API dans GHCR. Chaque image est taguee avec le SHA Git complet et expose ce SHA dans le label OCI `org.opencontainers.image.revision`; le digest OCI affiche dans le resume du workflow est la reference immuable a utiliser pour une promotion ou un deploiement. Un tag de branche mutable ne doit jamais etre utilise comme reference de release.

Les Dockerfiles construisent les artefacts sans `.env`, secret ni configuration runtime. En particulier, `APP_KEY` de l'API est fourni uniquement par l'environnement au demarrage.

## Premier administrateur

Après avoir configuré `DATABASE_URL` et appliqué les migrations Lucid, créez le premier administrateur avec `pnpm --filter @project/api exec node ace.js auth:create-first-admin`. La commande demande l'email et le mot de passe de façon interactive; elle ne fournit ni n'affiche aucune valeur d'identification.

Variables runtime requises : l'API requiert `APP_KEY`, `HOST`, `PORT`, `LOG_LEVEL` et `DATABASE_URL` hors test; le web requiert `API_URL`, par exemple `API_URL=https://api.example.invalid`. Le proxy Next transmet alors `/v1/*` vers l'API sans exposer d'URL d'infrastructure au navigateur. Pour ouvrir le serveur Next de développement depuis un autre appareil, définir `ALLOWED_DEV_ORIGINS` avec les hôtes autorisés séparés par des virgules, par exemple `ALLOWED_DEV_ORIGINS=192.168.1.48,localhost`.

## Emails transactionnels

Configurer `RESEND_API_KEY`, `EMAIL_FROM`, `WEB_BASE_URL` et `FARM_NAME` dans l'environnement de l'API, puis executer `pnpm --filter @project/api exec node ace.js email:work`. Ce worker reclame les jobs PostgreSQL, les traite toutes les minutes et applique les reprises bornees.

Configurer un ruleset GitHub sans contournement usuel sur `develop`, `preprod` et `main` avant toute integration : pull request obligatoire et statut requis `Quality gates`. Ce ruleset, et non le seul echec du workflow, bloque effectivement une fusion non verifiee.
