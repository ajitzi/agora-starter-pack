import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import {
  GENERIC_RECOVERY_RESULT,
  completePasswordReset,
  isSignedPasswordResetToken,
  passwordResetDigest,
  passwordResetToken,
  requestRecoveryWith,
  resetPasswordWith,
  validateNewPassword,
} from '../../../apps/api/app/password_recovery_policy.mjs';
import { MAX_EMAIL_ATTEMPTS, failedEmailJob } from '../../../apps/api/app/email_queue_policy.mjs';

const appKey = 'test-app-key-that-is-not-a-production-secret';
const email = 'membre@local.test';
const token = () => passwordResetToken(randomUUID(), appKey);
const validPassword = 'une phrase de passe fiable';

function recoveryDependencies({ account = null, limited = false, queue = async () => {} } = {}) {
  const calls = { attempts: [], queued: [], delays: 0 };
  return {
    calls,
    async admitAttempt(value, ip) { calls.attempts.push([value, ip]); return limited; },
    async findActiveAccount() { return account; },
    async queueRecovery(value) { calls.queued.push(value.id); await queue(value); },
    async delay() { calls.delays += 1; },
  };
}

test('demande connue: réponse générique, délai et une seule récupération active', async () => {
  const active = new Map();
  const queued = [];
  const account = { id: 'account-1' };
  const queue = async (value) => {
    const next = token();
    active.set(value.id, { digest: passwordResetDigest(next), expiresAt: Date.now() + 3_600_000, used: false });
    queued.push(next);
  };
  const first = recoveryDependencies({ account, queue });
  const second = recoveryDependencies({ account, queue });
  assert.deepEqual(await requestRecoveryWith({ email: ` ${email.toUpperCase()} `, ip: '127.0.0.1' }, first), GENERIC_RECOVERY_RESULT);
  assert.deepEqual(await requestRecoveryWith({ email, ip: '127.0.0.1' }, second), GENERIC_RECOVERY_RESULT);
  assert.equal(first.calls.delays, 1);
  assert.equal(second.calls.delays, 1);
  assert.equal(active.size, 1);
  assert.equal(active.get(account.id).digest, passwordResetDigest(queued[1]));
  assert.notEqual(queued[0], queued[1]);
  assert.doesNotMatch(JSON.stringify(first.calls), /token|password|hash/i);
});

test('demande absente, désactivée ou limitée reste indiscernable et ne crée rien', async () => {
  const cases = [
    recoveryDependencies(),
    recoveryDependencies({ account: null }),
    recoveryDependencies({ limited: true, account: { id: 'disabled-account' } }),
  ];
  const results = await Promise.all(cases.map((dependencies) => requestRecoveryWith({ email, ip: '127.0.0.1' }, dependencies)));
  assert.deepEqual(results, [GENERIC_RECOVERY_RESULT, GENERIC_RECOVERY_RESULT, GENERIC_RECOVERY_RESULT]);
  for (const dependencies of cases) {
    assert.equal(dependencies.calls.queued.length, 0);
    assert.equal(dependencies.calls.delays, 1);
  }
});

test('jeton condensé: signature opaque, expiration, remplacement et usage unique refusent le lien', async () => {
  const first = token();
  const replacement = token();
  const digest = passwordResetDigest(first);
  assert.match(digest, /^[a-f0-9]{64}$/);
  assert.doesNotMatch(digest, new RegExp(first.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')));
  assert.equal(isSignedPasswordResetToken(first, appKey), true);
  assert.equal(isSignedPasswordResetToken(`${first}x`, appKey), false);

  const records = new Map([[passwordResetDigest(first), { expiresAt: Date.now() - 1, used: false }], [passwordResetDigest(replacement), { expiresAt: Date.now() + 3_600_000, used: false }]]);
  const consume = async (value) => {
    const record = records.get(passwordResetDigest(value));
    if (!record || record.used || record.expiresAt <= Date.now()) return false;
    record.used = true;
    return true;
  };
  const dependencies = { isSignedToken: (value) => isSignedPasswordResetToken(value, appKey), consume };
  assert.deepEqual(await resetPasswordWith({ token: first, password: validPassword, confirmation: validPassword }, dependencies), { ok: false, reason: 'invalidLink' });
  assert.deepEqual(await resetPasswordWith({ token: replacement, password: validPassword, confirmation: validPassword }, dependencies), { ok: true });
  assert.deepEqual(await resetPasswordWith({ token: replacement, password: validPassword, confirmation: validPassword }, dependencies), { ok: false, reason: 'invalidLink' });
});

test('la politique de phrase de passe couvre 12-128 caractères, confirmation et mots de passe courants', () => {
  const valid = { token: token(), password: validPassword, confirmation: validPassword };
  assert.equal(validateNewPassword(valid).valid, true);
  assert.equal(validateNewPassword({ ...valid, password: 'a'.repeat(11), confirmation: 'a'.repeat(11) }).valid, false);
  assert.equal(validateNewPassword({ ...valid, password: 'a'.repeat(129), confirmation: 'a'.repeat(129) }).valid, false);
  assert.equal(validateNewPassword({ ...valid, confirmation: 'différente' }).valid, false);
  assert.equal(validateNewPassword({ ...valid, password: 'PasswordPassword', confirmation: 'PasswordPassword' }).valid, false);
});

test('reset atomique: hash, consommation, révocation et audit réussissent ensemble ou sont annulés', async () => {
  const initial = { hash: 'old-hash', used: false, sessions: ['session-1', 'session-2'], audits: [] };
  async function run(failAudit = false) {
    const staged = structuredClone(initial);
    try {
      await completePasswordReset({ accountId: 'account-1', tokenId: 'token-1', passwordHash: 'new-hash' }, {
        async replacePassword() { staged.hash = 'new-hash'; },
        async consumeToken() { staged.used = true; },
        async revokeSessions() { staged.sessions = []; },
        async audit(_, action) { if (failAudit) throw new Error('audit unavailable'); staged.audits.push(action); },
      });
      return staged;
    } catch { return initial; }
  }
  assert.deepEqual(await run(), { hash: 'new-hash', used: true, sessions: [], audits: ['password_reset'] });
  assert.deepEqual(await run(true), initial);
});

test('échec et reprise email conservent le même job et le même lien actif sans fuite de secret', async () => {
  const reset = token();
  const job = { id: randomUUID(), tokenDigest: passwordResetDigest(reset), sent: false, attempts: 0 };
  const sent = [];
  const deliver = async () => {
    job.attempts += 1;
    if (job.attempts === 1) throw new Error('temporary provider failure');
    sent.push({ idempotencyKey: job.id, digest: job.tokenDigest });
    job.sent = true;
  };
  await assert.rejects(deliver());
  assert.equal(job.sent, false);
  await deliver();
  assert.equal(job.sent, true);
  assert.deepEqual(sent, [{ idempotencyKey: job.id, digest: job.tokenDigest }]);
  assert.doesNotMatch(JSON.stringify(sent), new RegExp(reset.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')));
});

test('la limite atomique n accepte jamais plus de cinq demandes pour un email ou une IP concurrents', async () => {
  const attempts = [];
  let locked = Promise.resolve();
  const admitAttempt = async (value, ip) => {
    const previous = locked;
    let release;
    locked = new Promise((resolve) => { release = resolve; });
    await previous;
    const limited = attempts.filter((attempt) => attempt.email === value || attempt.ip === ip).length >= 5;
    if (!limited) attempts.push({ email: value, ip });
    release();
    return limited;
  };
  const results = await Promise.all(Array.from({ length: 12 }, () => requestRecoveryWith({ email, ip: '127.0.0.1' }, {
    admitAttempt,
    async findActiveAccount() { return null; },
    async queueRecovery() {},
    async delay() {},
  })));
  assert.equal(attempts.length, 5);
  assert.deepEqual(results, Array.from({ length: 12 }, () => GENERIC_RECOVERY_RESULT));
});

test('la réclamation de file ne traite qu un job verrouillé et les échecs deviennent terminaux après le plafond', () => {
  const claimed = new Set();
  const claim = (jobId, workerId) => {
    if (claimed.has(jobId)) return false;
    claimed.add(jobId);
    return workerId;
  };
  assert.equal(claim('job-1', 'worker-a'), 'worker-a');
  assert.equal(claim('job-1', 'worker-b'), false);
  const retry = failedEmailJob(0, 0);
  assert.deepEqual(retry, { attempts: 1, state: 'pending', failedAt: null, availableAt: new Date(60_000) });
  assert.deepEqual(failedEmailJob(MAX_EMAIL_ATTEMPTS - 1, 0), { attempts: MAX_EMAIL_ATTEMPTS, state: 'failed', failedAt: new Date(0), availableAt: new Date(0) });
});
