# Architecture du starter pack

Le depot est un monorepo pnpm compose de trois runtimes : `apps/web` (Next.js), `apps/mobile` (Expo) et `apps/api` (Strapi avec PostgreSQL).

Les applications assurent uniquement le bootstrap, le routing et les integrations de plateforme. Les surfaces reutilisables vivent dans `packages/screens` et utilisent les primitives exportees par `@project/ui`. `packages/ui` est le design system partage et ne depend d'aucun runtime applicatif.

Les dependances respectent la direction `apps -> screens -> domains -> core`. Les packages ne dependent jamais de Strapi. Strapi reste le proprietaire exclusif de ses schemas de persistence et de l'authentification fournie par ses plugins.

Le client HTTP `@project/api-client` expose uniquement son barrel public. Les contrats de transport generes ou maintenus pour une route sont places dans `openapi.ts`, et chaque groupe de routes a son module dedie.

Les tests sont co-localises avec le code ou l'outil qu'ils couvrent. Aucun repertoire `packages/testing` n'est utilise pour heberger des tests.
