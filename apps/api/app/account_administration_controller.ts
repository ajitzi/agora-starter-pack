import type { HttpContext } from '@adonisjs/core/http';
import { bindSessionToAccount, hasActiveAccount, normalizeEmail, recordProtectedActivity, sameCsrfToken } from './auth.js';
import { createAccount, isAdministrator, listAccounts, revokeSessions, updateAccount } from './account_administration.js';
import { problem } from './http.js';
import db from '@adonisjs/lucid/services/db';

type AuthContext = HttpContext & { auth: { use(name: 'web'): { authenticate(): Promise<{ id: string } | undefined>; isAuthenticated: boolean } }; session: { sessionId: string; get(key: string): unknown; put(key: string, value: string): void } };

function sendProblem(context: HttpContext, status: number, title: string, detail: string) {
  const body = problem(status, title, detail, context.request.header('x-correlation-id'));
  context.response.header('x-correlation-id', body.correlationId);
  return context.response.status(status).type('application/problem+json').send(body);
}

async function principal(context: HttpContext) {
  const { request, auth, session } = context as unknown as AuthContext;
  if (!request.cookie('lcm-session') || typeof session.get('auth_web') !== 'string') return null;
  const guard = auth.use('web'); const account = await guard.authenticate();
  if (!account || !guard.isAuthenticated || !await hasActiveAccount(account.id) || !await isAdministrator(account.id)) return null;
  await bindSessionToAccount(session.sessionId, account.id);
  recordProtectedActivity(session);
  await db.from('accounts').where('id', account.id).update({ last_activity_at: new Date() });
  return account.id;
}

async function mutationPrincipal(context: HttpContext) {
  const id = await principal(context); const { request, session } = context as unknown as AuthContext;
  if (!id) return null;
  if (!sameCsrfToken(typeof session.get('csrf') === 'string' ? session.get('csrf') as string : undefined, request.header('x-csrf-token'))) return 'csrf';
  return id;
}

function error(context: HttpContext, reason: unknown) {
  if (reason instanceof Error && reason.message === 'conflict') return sendProblem(context, 409, 'Conflit de version', 'Les données ont changé. Rechargez avant de réessayer.');
  if (reason instanceof Error && reason.message === 'last_admin') return sendProblem(context, 422, 'Opération refusée', 'Au moins un administrateur actif doit subsister.');
  if (reason instanceof Error && reason.message === 'duplicate') return sendProblem(context, 409, 'Compte existant', 'Cette adresse est déjà utilisée.');
  if (reason instanceof Error && reason.message === 'idempotency_mismatch') return sendProblem(context, 409, 'Clé d’idempotence refusée', 'Cette clé a déjà été utilisée pour une autre demande.');
  return sendProblem(context, 422, 'Requête refusée', 'Les données de la demande ne sont pas valides.');
}

export async function accounts(context: HttpContext) {
  if (!await principal(context)) return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  const limit = Math.min(Math.max(Number(context.request.input('limit') ?? 50), 1), 100);
  const cursor = context.request.input('cursor');
  return context.response.ok(await listAccounts(Number.isInteger(limit) ? limit : 50, typeof cursor === 'string' && /^[0-9a-f-]{36}$/iu.test(cursor) ? cursor : undefined));
}

export async function create(context: HttpContext) {
  const id = await mutationPrincipal(context);
  if (!id) return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  if (id === 'csrf') return sendProblem(context, 403, 'Requête refusée', 'La requête ne peut pas être vérifiée.');
  const body = context.request.body() as { email?: unknown; roles?: unknown };
  if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalizeEmail(body.email)) || !Array.isArray(body.roles) || !body.roles.every((role) => typeof role === 'string')) return sendProblem(context, 422, 'Requête refusée', 'Les données de la demande ne sont pas valides.');
  try { return context.response.status(201).send(await createAccount(id, context.request.header('idempotency-key') ?? '', { email: normalizeEmail(body.email), roles: body.roles })); } catch (reason) { return error(context, reason); }
}

export async function update(context: HttpContext) {
  const id = await mutationPrincipal(context);
  if (!id) return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  if (id === 'csrf') return sendProblem(context, 403, 'Requête refusée', 'La requête ne peut pas être vérifiée.');
  const body = context.request.body() as { expectedVersion?: unknown; roles?: unknown; active?: unknown };
  if (!Number.isInteger(body.expectedVersion) || (body.roles !== undefined && (!Array.isArray(body.roles) || !body.roles.every((role) => typeof role === 'string'))) || (body.active !== undefined && typeof body.active !== 'boolean')) return sendProblem(context, 422, 'Requête refusée', 'Les données de la demande ne sont pas valides.');
  try { return context.response.ok(await updateAccount(id, context.params.id, context.request.header('idempotency-key') ?? '', { expectedVersion: Number(body.expectedVersion), roles: Array.isArray(body.roles) ? body.roles.map(String) : undefined, active: typeof body.active === 'boolean' ? body.active : undefined })); } catch (reason) { return error(context, reason); }
}

export async function revoke(context: HttpContext) {
  const id = await mutationPrincipal(context);
  if (!id) return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  if (id === 'csrf') return sendProblem(context, 403, 'Requête refusée', 'La requête ne peut pas être vérifiée.');
  const body = context.request.body() as { expectedVersion?: unknown; expectedActiveSessions?: unknown; scope?: unknown; sessionPosition?: unknown };
  if (!Number.isInteger(body.expectedVersion) || !Number.isInteger(body.expectedActiveSessions) || !['all', 'one'].includes(body.scope as string) || (body.scope === 'one' && !Number.isInteger(body.sessionPosition))) return sendProblem(context, 422, 'Requête refusée', 'Les données de la demande ne sont pas valides.');
  try { return context.response.ok(await revokeSessions(id, context.params.id, context.request.header('idempotency-key') ?? '', { expectedVersion: body.expectedVersion as number, expectedActiveSessions: body.expectedActiveSessions as number, scope: body.scope as 'all' | 'one', sessionPosition: (body.sessionPosition ?? 0) as number })); } catch (reason) { return error(context, reason); }
}
