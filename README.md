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
