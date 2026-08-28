import { timingSafeEqual } from 'node:crypto';

const GENERIC_FAILURE = 'Email ou mot de passe incorrect.';

export function csrfMatches(expected, received) {
  if (!expected || !received || expected.length !== received.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

export async function revalidateProtectedSession(accountId, dependencies, protectedSessionId) {
  if (!accountId) return false;
  const account = await dependencies.findAccount(accountId);
  if (!account?.active) return false;
  if (!protectedSessionId) return true;
  return Boolean(await dependencies.findSession?.(protectedSessionId, accountId));
}

export function sessionIsUsable(lastActivityAt, now = Date.now()) {
  if (!(lastActivityAt instanceof Date) || Number.isNaN(lastActivityAt.getTime())) return false;
  return now - lastActivityAt.getTime() < 12 * 60 * 60 * 1000;
}

export function normalizeEmail(value) {
  return value.trim().normalize('NFKC').toLocaleLowerCase('en-US');
}

export function validateLoginInput(value) {
  if (!value || typeof value !== 'object') return null;
  const { email, password } = value;
  if (typeof email !== 'string' || typeof password !== 'string') return null;
  if (email.length > 320 || password.length < 1 || password.length > 1024) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email.trim()) ? { email: normalizeEmail(email), password } : null;
}

export async function authenticateWith({ email, password, ip }, dependencies) {
  const fail = async () => {
    await dependencies.recordAttempt(email, ip);
    await dependencies.audit(null, 'login_refused');
    await dependencies.delay();
    return { ok: false, message: GENERIC_FAILURE };
  };
  if (!email || !password || await dependencies.isRateLimited(email, ip)) return fail();
  const account = await dependencies.verifyCredentials(email, password);
  if (!account || !account.active) return fail();
  await dependencies.audit(account.id, 'login_succeeded');
  return { ok: true, account };
}

export function createSubmission(fetcher) {
  let submitting = false;
  return async (email, password) => {
    if (submitting) return { state: 'submitting' };
    submitting = true;
    try {
      const response = await fetcher(email, password);
      return response.ok ? { state: 'success', email, password: '', destination: response.destination } : { state: 'invalidCredentials', email, password: '' };
    } catch {
      return { state: 'error', email, password };
    } finally {
      submitting = false;
    }
  };
}
