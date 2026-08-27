import app from '@adonisjs/core/services/app';
import { defineConfig, stores } from '@adonisjs/session';

export default defineConfig({
  enabled: true,
  cookieName: 'lcm-session',
  clearWithBrowser: true,
  age: '12h',
  cookie: { path: '/', httpOnly: true, secure: app.inProduction, sameSite: 'lax' },
  store: app.inTest ? 'memory' : 'database',
  stores: { database: stores.database({ tableName: 'sessions' }) },
});
