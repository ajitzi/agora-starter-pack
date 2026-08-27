FROM node:24.0.0 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json
COPY packages/config/package.json packages/config/package.json

RUN corepack enable && pnpm install --frozen-lockfile

COPY apps/api apps/api
COPY packages/config packages/config

RUN pnpm --filter @project/api build
RUN pnpm --filter @project/api --prod deploy --legacy /tmp/api
RUN cp -R apps/api/build /tmp/api/build

FROM node:24.0.0 AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /tmp/api ./

EXPOSE 3333

CMD ["node", "build/bin/server.js"]
