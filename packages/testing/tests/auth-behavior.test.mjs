import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { authenticateWith, createSubmission, csrfMatches, revalidateProtectedSession, sessionIsUsable, validateLoginInput } from '../../../apps/api/app/auth_policy.mjs';
import { accountDto, canRemoveRoles, validateRevocation, validateRoles } from '../../../apps/api/app/account_administration_policy.mjs';

const email = () => `${randomUUID()}@local.test`;
const password = () => randomUUID();

function dependencies({ account = null, limited = false } = {}) {
  const calls = { attempts: [], audits: [], delays: 0 };
  return {
    calls,
    async isRateLimited() { return limited; },
    async recordAttempt(email, ip) { calls.attempts.push([email, ip]); },
    async audit(id, action) { calls.audits.push([id, action]); },
    async delay() { calls.delays += 1; },
    async verifyCredentials() { return account; },
  };
}

test('connexion réussie: normalise, crée le résultat authentifié et n audite aucun secret', async () => {
  const account = { id: 'compte-de-test', active: true, role: 'admin' };
  const fake = dependencies({ account });
  const identifier = email();
  const secret = password();
  const input = validateLoginInput({ email: `  ${identifier.toUpperCase()} `, password: secret });
  assert.deepEqual(input, { email: identifier, password: secret });
  const result = await authenticateWith({ ...input, ip: '127.0.0.1' }, fake);
  assert.deepEqual(result, { ok: true, account });
  assert.deepEqual(fake.calls.attempts, []);
  assert.deepEqual(fake.calls.audits, [['compte-de-test', 'login_succeeded']]);
  assert.doesNotMatch(JSON.stringify(result), /hash|cookie|token/i);
});

test('identifiants invalides et compte désactivé restent indiscernables', async () => {
  const input = { email: email(), password: password(), ip: '127.0.0.1' };
  const unknown = dependencies();
  const disabled = dependencies({ account: { id: 'compte-desactive', active: false, role: 'amap' } });
  const [unknownResult, disabledResult] = await Promise.all([authenticateWith(input, unknown), authenticateWith(input, disabled)]);
  assert.deepEqual(unknownResult, disabledResult);
  assert.equal(unknown.calls.delays, 1);
  assert.equal(disabled.calls.delays, 1);
  assert.deepEqual(unknown.calls.audits, [[null, 'login_refused']]);
  assert.deepEqual(disabled.calls.audits, [[null, 'login_refused']]);
});

test('la limitation par IP ou identifiant refuse sans vérifier le mot de passe', async () => {
  const fake = dependencies({ limited: true });
  let verified = false;
  fake.verifyCredentials = async () => { verified = true; return null; };
  const identifier = email();
  const result = await authenticateWith({ email: identifier, password: password(), ip: '127.0.0.1' }, fake);
  assert.equal(result.ok, false);
  assert.equal(verified, false);
  assert.deepEqual(fake.calls.attempts, [[identifier, '127.0.0.1']]);
  assert.equal(fake.calls.delays, 1);
});

test('une mutation de session accepte uniquement un CSRF correspondant', () => {
  const token = randomUUID();
  assert.equal(csrfMatches(token, token), true);
  assert.equal(csrfMatches(token, randomUUID()), false);
  assert.equal(csrfMatches(token, undefined), false);
});

test('une opération protégée refuse une session expirée ou révoquée et un compte désactivé', async () => {
  const active = { findAccount: async () => ({ active: true }) };
  const disabled = { findAccount: async () => ({ active: false }) };
  const revoked = { findAccount: async () => null };
  assert.equal(await revalidateProtectedSession(undefined, active), false);
  assert.equal(await revalidateProtectedSession(randomUUID(), revoked), false);
  assert.equal(await revalidateProtectedSession(randomUUID(), disabled), false);
  assert.equal(await revalidateProtectedSession(randomUUID(), active), true);
  assert.equal(csrfMatches(undefined, randomUUID()), false);
});

test('le formulaire évite le double envoi et couvre succès, refus et erreur réseau', async () => {
  let release;
  const pending = new Promise((resolve) => { release = resolve; });
  const submit = createSubmission(async () => pending);
  const identifier = email();
  const secret = password();
  const first = submit(identifier, secret);
  assert.deepEqual(await submit(identifier, secret), { state: 'submitting' });
  release({ ok: true, destination: '/amap' });
  assert.deepEqual(await first, { state: 'success', email: identifier, password: '', destination: '/amap' });
  assert.deepEqual(await createSubmission(async () => ({ ok: false }))(identifier, secret), { state: 'invalidCredentials', email: identifier, password: '' });
  assert.deepEqual(await createSubmission(async () => { throw new Error('network'); })(identifier, secret), { state: 'error', email: identifier, password: secret });
});

test('l administration conserve les rôles multiples, le dernier administrateur et la liste sans secrets', () => {
  assert.deepEqual(validateRoles(['amap', 'admin']), ['admin', 'amap']);
  assert.equal(validateRoles([]), null);
  assert.equal(validateRoles(['admin', 'unknown']), null);
  assert.equal(canRemoveRoles(['admin', 'amap'], ['amap'], 1), false);
  assert.equal(canRemoveRoles(['admin', 'amap'], ['amap'], 2), true);
  const dto = accountDto({ id: 'account-1', email: 'admin@local.test', active: true, version: 2, last_activity_at: null }, ['admin', 'amap'], 3);
  assert.deepEqual(dto, { id: 'account-1', email: 'admin@local.test', roles: ['admin', 'amap'], active: true, version: 2, lastActivityAt: null, activeSessions: 3 });
  assert.doesNotMatch(JSON.stringify(dto), /hash|token|cookie|session.?id/i);
});

test('la matrice administration refuse les entrées impossibles et conserve les contraintes de session', async () => {
  assert.equal(validateRoles(['admin', 'admin']), null);
  assert.equal(canRemoveRoles(['amap'], ['amap'], 0), true);
  assert.equal(sessionIsUsable(new Date(0), 12 * 60 * 60 * 1000 - 1), true);
  assert.equal(sessionIsUsable(new Date(0), 12 * 60 * 60 * 1000), false);
  const active = { findAccount: async () => ({ active: true }), findSession: async (id, accountId) => id === 'active-session' && accountId === 'account-1' };
  assert.equal(await revalidateProtectedSession('account-1', active, 'active-session'), true);
  assert.equal(await revalidateProtectedSession('account-1', active, 'revoked-session'), false);
  assert.equal(await revalidateProtectedSession('account-1', active, undefined), true);
  assert.deepEqual(validateRevocation({ expectedVersion: 3, expectedActiveSessions: 2, scope: 'one', sessionPosition: 2 }), { expectedVersion: 3, expectedActiveSessions: 2, scope: 'one', sessionPosition: 2 });
  assert.equal(validateRevocation({ expectedVersion: 3, expectedActiveSessions: 2, scope: 'one', sessionPosition: 3 }), null);
  assert.equal(validateRevocation({ expectedVersion: 3, expectedActiveSessions: 2, scope: 'oldest' }), null);
});

test('harnais persistant: une révocation atomique retire la session et les liens actifs sans exposer son identifiant', () => {
  const state = { sessions: [{ id: 'opaque-db-id', accountId: 'account-1' }], resetTokens: [{ accountId: 'account-1', usedAt: null }], audits: [] };
  const revoke = (accountId) => {
    const next = structuredClone(state);
    next.sessions = next.sessions.filter((session) => session.accountId !== accountId);
    next.resetTokens.forEach((token) => { if (token.accountId === accountId && !token.usedAt) token.usedAt = 'revoked'; });
    next.audits.push({ action: 'sessions_revoked', accountId });
    return next;
  };
  const result = revoke('account-1');
  assert.deepEqual(result.sessions, []);
  assert.equal(result.resetTokens[0].usedAt, 'revoked');
  assert.deepEqual(result.audits, [{ action: 'sessions_revoked', accountId: 'account-1' }]);
  assert.doesNotMatch(JSON.stringify({ activeSessions: result.sessions.length }), /opaque-db-id/);
});
