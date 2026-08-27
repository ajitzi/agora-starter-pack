import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { authenticateWith, createSubmission, csrfMatches, revalidateProtectedSession, validateLoginInput } from '../../../apps/api/app/auth_policy.mjs';

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
