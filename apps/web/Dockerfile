FROM node:24.0.0 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/screens/package.json packages/screens/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN corepack enable && pnpm install --frozen-lockfile

COPY apps/web apps/web
COPY packages/config packages/config
COPY packages/screens packages/screens
COPY packages/ui packages/ui

RUN pnpm --filter @project/web build

FROM node:24.0.0 AS runtime

WORKDIR /app/apps/web

ENV NODE_ENV=production

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/packages /app/packages
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=build /app/apps/web/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./.next

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
