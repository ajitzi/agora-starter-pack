import type { HttpContext } from '@adonisjs/core/http';
import { authenticate, csrfToken, hasActiveAccount, normalizeEmail, sameCsrfToken } from './auth.js';
import Account from './models/account.js';
import { problem } from './http.js';
import { validateLoginInput } from './validators/auth.js';

type AuthContext = HttpContext & {
  auth: { use(name: 'web'): { authenticate(): Promise<{ id: string } | undefined>; isAuthenticated: boolean; login(account: { id: string }): Promise<void>; logout(): Promise<void> } };
  session: { get(key: string): unknown; put(key: string, value: string): void; forget(key: string): void };
};

const destinationFor = (role: 'admin' | 'amap') => role === 'admin' ? '/administration' : '/amap';

function sendProblem({ request, response }: HttpContext, status: number, title: string, detail: string) {
  const body = problem(status, title, detail, request.header('x-correlation-id'));
  response.header('x-correlation-id', body.correlationId);
  return response.status(status).type('application/problem+json').send(body);
}

export async function login(context: HttpContext) {
  const { request, response, auth, session } = context as unknown as AuthContext;
  const input = validateLoginInput(request.body());
  const email = normalizeEmail(input?.email ?? '');
  const password = input?.password ?? '';
  const result = await authenticate(email, password, request.ip());
  if (!result.ok) return sendProblem({ request, response } as HttpContext, 401, 'Connexion refusée', result.message);

  await auth.use('web').login(result.account);
  session.put('csrf', csrfToken());
  return response.ok({ role: result.account.role, destination: destinationFor(result.account.role) });
}

export async function csrf(context: HttpContext) {
  const { request, response, session, auth } = context as unknown as AuthContext;
  try {
    if (!request.cookie('lcm-session')) throw new Error('unauthenticated');
    if (typeof session.get('auth_web') !== 'string') throw new Error('unauthenticated');
    const guard = auth.use('web');
    const account = await guard.authenticate();
    if (!account || !guard.isAuthenticated || !await hasActiveAccount(account.id)) throw new Error('unauthenticated');
  } catch {
    return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  }
  const existing = session.get('csrf');
  const token = typeof existing === 'string' ? existing : csrfToken();
  if (typeof existing !== 'string') session.put('csrf', token);
  return response.ok({ csrfToken: token });
}

export async function currentSession(context: HttpContext) {
  const { request, response, session, auth } = context as unknown as AuthContext;
  try {
    if (!request.cookie('lcm-session') || typeof session.get('auth_web') !== 'string') throw new Error('unauthenticated');
    const guard = auth.use('web');
    const principal = await guard.authenticate();
    if (!principal || !guard.isAuthenticated || !await hasActiveAccount(principal.id)) throw new Error('unauthenticated');
    const account = await Account.find(principal.id);
    if (!account?.active) throw new Error('inactive');
    return response.ok({ role: account.role, destination: destinationFor(account.role) });
  } catch {
    return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  }
}

export async function logout(context: HttpContext) {
  const { request, response, auth, session } = context as unknown as AuthContext;
  try {
    if (!request.cookie('lcm-session')) throw new Error('unauthenticated');
    if (typeof session.get('auth_web') !== 'string') throw new Error('unauthenticated');
    const guard = auth.use('web');
    const account = await guard.authenticate();
    if (!account || !guard.isAuthenticated || !await hasActiveAccount(account.id)) throw new Error('unauthenticated');
  } catch {
    return sendProblem(context, 401, 'Accès refusé', 'La session est absente, expirée ou refusée.');
  }
  const received = request.header('x-csrf-token');
  const stored = session.get('csrf');
  if (!sameCsrfToken(typeof stored === 'string' ? stored : undefined, received)) {
    return sendProblem(context, 403, 'Requête refusée', 'La requête ne peut pas être vérifiée.');
  }
  await auth.use('web').logout();
  session.forget('csrf');
  return response.status(204).send('');
}
