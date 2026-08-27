import type { HttpContext } from '@adonisjs/core/http';
import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
import { createApiResponse, problem } from './http.js';
import { csrf, currentSession, login, logout, requestRecovery, resetPasswordWithToken } from './auth_controller.js';

export { createApiResponse, problem };

/** The first Adonis HTTP boundary deliberately exposes no operational detail. */
export async function health({ request, response }: HttpContext) {
  const result = createApiResponse('/v1/health', request.header('x-correlation-id'));
  response.header('x-correlation-id', result.headers['x-correlation-id']);
  return response.ok(result.body);
}

export async function notFound({ request, response }: HttpContext) {
  const result = createApiResponse('', request.header('x-correlation-id'));
  response.header('x-correlation-id', result.headers['x-correlation-id']);
  return response.status(result.status).type('application/problem+json').send(result.body);
}

router.get('/v1/health', health);
server.use([() => import('@adonisjs/core/bodyparser_middleware')]);
router.use([
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
]);
router.get('/v1/auth/csrf', csrf);
router.get('/v1/auth/session', currentSession);
router.post('/v1/auth/login', login);
router.post('/v1/auth/recovery', requestRecovery);
router.post('/v1/auth/reset-password', resetPasswordWithToken);
router.post('/v1/auth/logout', logout);
router.any('*', notFound);
