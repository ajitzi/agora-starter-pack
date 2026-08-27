import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig } from '@adonisjs/lucid';

const databaseUrl = env.get('DATABASE_URL');
if (!app.inTest && !databaseUrl) throw new Error('DATABASE_URL est requis hors test.');

export default defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        connectionString: databaseUrl,
      },
      migrations: { naturalSort: true, paths: ['database/migrations'] },
    },
  },
});
