FROM node:24.0.0 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json

RUN corepack enable && pnpm install --frozen-lockfile

COPY apps/api apps/api

RUN pnpm --filter @project/api build
RUN pnpm --filter @project/api --prod deploy --legacy /tmp/api

FROM node:24.0.0 AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    PORT=1337

COPY --from=build /tmp/api ./

EXPOSE 1337

CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
