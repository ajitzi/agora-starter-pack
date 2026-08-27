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

Configurer un ruleset GitHub sans contournement usuel sur `develop`, `preprod` et `main` avant toute integration : pull request obligatoire et statut requis `Quality gates`. Ce ruleset, et non le seul echec du workflow, bloque effectivement une fusion non verifiee.
