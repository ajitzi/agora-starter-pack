import { defineConfig } from '@adonisjs/core/bodyparser';

const config: ReturnType<typeof defineConfig> = defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  json: { limit: '1mb' },
  form: { limit: '1mb' },
  raw: { limit: '1mb' },
  multipart: { limit: '20mb' },
});

export default config;
