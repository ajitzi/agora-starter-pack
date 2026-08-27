import { randomUUID } from 'node:crypto';
import db from '@adonisjs/lucid/services/db';
import Account from './models/account.js';
import { authenticateWith, csrfMatches, normalizeEmail, revalidateProtectedSession } from './auth_policy.mjs';

const GENERIC_DELAY_MS = 350;
const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;
const GENERIC_FAILURE = 'Email ou mot de passe incorrect.';

export { normalizeEmail };

export function csrfToken() {
  return randomUUID().replaceAll('-', '') + randomUUID().replaceAll('-', '');
}

export function sameCsrfToken(expected: string | undefined, received: string | undefined) {
  return csrfMatches(expected, received);
}

export async function hasActiveAccount(accountId: string) {
  return revalidateProtectedSession(accountId, { findAccount: (id) => Account.find(id) });
}

export async function waitForGenericFailure() {
  await new Promise((resolve) => setTimeout(resolve, GENERIC_DELAY_MS));
}

export async function isRateLimited(email: string, ip: string) {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
  const [byEmail, byIp] = await Promise.all([
    db.from('login_attempts').where('email', email).where('attempted_at', '>=', since).count('* as total').first(),
    db.from('login_attempts').where('ip', ip).where('attempted_at', '>=', since).count('* as total').first(),
  ]);
  return Number(byEmail?.total ?? 0) >= MAX_ATTEMPTS || Number(byIp?.total ?? 0) >= MAX_ATTEMPTS;
}

export async function recordAttempt(email: string, ip: string) {
  if (!email) return;
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
  await db.transaction(async (transaction) => {
    for (const key of [email, ip].sort()) await transaction.rawQuery('select pg_advisory_xact_lock(hashtext(?))', [key]);
    const [byEmail, byIp] = await Promise.all([
      transaction.from('login_attempts').where('email', email).where('attempted_at', '>=', since).count('* as total').first(),
      transaction.from('login_attempts').where('ip', ip).where('attempted_at', '>=', since).count('* as total').first(),
    ]);
    if (Number(byEmail?.total ?? 0) >= MAX_ATTEMPTS || Number(byIp?.total ?? 0) >= MAX_ATTEMPTS) return;
    await transaction.table('login_attempts').insert({ id: randomUUID(), email, ip, attempted_at: new Date() });
  });
}

export async function auditLogin(accountId: string | null, action: 'login_succeeded' | 'login_refused') {
  await db.table('security_audit_proofs').insert({ id: randomUUID(), account_id: accountId, action, occurred_at: new Date() });
}

export async function authenticate(email: string, password: string, ip: string) {
  return authenticateWith({ email, password, ip }, {
    isRateLimited: async () => !email || !password || await isRateLimited(email, ip),
    recordAttempt: async () => recordAttempt(email, ip),
    audit: auditLogin,
    delay: waitForGenericFailure,
    verifyCredentials: async (identifier: string) => {
      try { return await Account.verifyCredentials(identifier, password); } catch { return null; }
    },
  });
}
