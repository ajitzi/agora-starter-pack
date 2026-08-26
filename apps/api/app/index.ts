import type { HttpContext } from '@adonisjs/core/http';
import router from '@adonisjs/core/services/router';
import { createApiResponse, problem } from './http.mjs';

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
router.any('*', notFound);
