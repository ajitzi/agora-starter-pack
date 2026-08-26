import env from '#start/env';
import { defineConfig, targets } from '@adonisjs/core/logger';

const loggerConfig = defineConfig({
  default: 'app',
  loggers: {
    app: {
      enabled: true,
      name: '@project/api',
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: targets()
          .push(targets.file({ destination: 1 }))
          .toArray(),
      },
    },
  },
}) as unknown as ReturnType<typeof defineConfig>;

export default loggerConfig;
