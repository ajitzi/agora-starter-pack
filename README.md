# Cross-platform Starter

## Prerequis

- Node.js `24.0.0`
- pnpm (la version declaree dans `package.json` est activee avec Corepack)

## Demarrage

```sh
corepack enable
pnpm install --frozen-lockfile
```

Configurer `apps/api/.env` a partir de `.env.example`, avec une URL PostgreSQL valide, puis lancer les runtimes dans des terminaux distincts :

```sh
pnpm --filter @project/api dev
pnpm --filter @project/web dev
pnpm --filter @project/mobile dev
```

L'API expose `GET /api/health`. Les applications web et mobile rendent le meme ecran issu de `@project/screens`, compose avec `@project/ui`.

## Controles locaux

```sh
pnpm typecheck
pnpm lint
pnpm boundaries
pnpm cycles
pnpm test
pnpm build
pnpm mobile:check
```

Les packages s'importent uniquement via leurs points d'entree publics `@project/*`. Les dependances suivent `apps -> screens -> domains -> core`; les packages partages ne contiennent aucun secret ni dependance a Strapi.
