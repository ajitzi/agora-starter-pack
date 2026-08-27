import { randomUUID } from 'node:crypto';
import hash from '@adonisjs/core/services/hash';
import db from '@adonisjs/lucid/services/db';
import env from '#start/env';
import Account from './models/account.js';
import { ResendEmailAdapter, type TransactionalEmailPort } from './adapters/resend.js';
import { completePasswordReset, isSignedPasswordResetToken, passwordResetDigest, passwordResetToken, requestRecoveryWith, resetPasswordWith, validateNewPassword, validateRecoveryRequest } from './password_recovery_policy.mjs';
import { failedEmailJob } from './email_queue_policy.mjs';

const ONE_HOUR_MS = 60 * 60_000;
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 5;
type ClaimedEmailJob = { id: string; account_id: string; password_reset_token_id: string; attempts: number };
export { validateNewPassword, validateRecoveryRequest };

async function admitRecoveryAttempt(email: string, ip: string) {
  const since = new Date(Date.now() - WINDOW_MS);
  return db.transaction(async (transaction) => {
    for (const key of [email, ip].sort()) await transaction.rawQuery('select pg_advisory_xact_lock(hashtext(?))', [key]);
    const [byEmail, byIp] = await Promise.all([
      transaction.from('password_recovery_attempts').where('email', email).where('attempted_at', '>=', since).count('* as total').first(),
      transaction.from('password_recovery_attempts').where('ip', ip).where('attempted_at', '>=', since).count('* as total').first(),
    ]);
    const limited = Number(byEmail?.total ?? 0) >= MAX_ATTEMPTS || Number(byIp?.total ?? 0) >= MAX_ATTEMPTS;
    if (!limited) await transaction.table('password_recovery_attempts').insert({ id: randomUUID(), email, ip, attempted_at: new Date() });
    return limited;
  });

  // Send newly queued recovery mail promptly without making account existence observable.
  void processPasswordRecoveryEmailJobs().catch(() => undefined);
}

export async function requestPasswordRecovery(rawEmail: string, ip: string, startedAt = Date.now()) {
  await requestRecoveryWith({ email: rawEmail, ip, startedAt }, {
    admitAttempt: admitRecoveryAttempt,
    findActiveAccount: (email: string) => Account.query().where('email', email).where('active', true).first(),
    delay: (elapsed: number) => new Promise((resolve) => setTimeout(resolve, Math.max(0, 350 - elapsed))),
    queueRecovery: async (account: Account) => {
  const tokenId = randomUUID();
  await db.transaction(async (transaction) => {
    await transaction.rawQuery('select pg_advisory_xact_lock(hashtext(?))', [account.id]);
    const current = await transaction.from('accounts').where('id', account.id).where('active', true).first();
    if (!current) return;
    await transaction.from('password_reset_tokens').where('account_id', account.id).whereNull('used_at').update({ used_at: new Date() });
    await transaction.table('password_reset_tokens').insert({ id: tokenId, account_id: account.id, token_digest: passwordResetDigest(passwordResetToken(tokenId, env.get('APP_KEY'))), expires_at: new Date(Date.now() + ONE_HOUR_MS), created_at: new Date() });
    await transaction.table('email_jobs').insert({ id: randomUUID(), kind: 'password_recovery', account_id: account.id, password_reset_token_id: tokenId, available_at: new Date(), created_at: new Date() });
    await transaction.table('security_audit_proofs').insert({ id: randomUUID(), account_id: account.id, action: 'password_recovery_requested', occurred_at: new Date() });
  });
    },
  });
}

export async function resetPassword(token: string, password: string) {
  const result = await resetPasswordWith({ token, password, confirmation: password }, {
    isSignedToken: (value: string) => isSignedPasswordResetToken(value, env.get('APP_KEY')),
    consume: async (value: string, newPassword: string) => db.transaction(async (transaction) => {
    const reset = await transaction.from('password_reset_tokens').where('token_digest', passwordResetDigest(value)).whereNull('used_at').where('expires_at', '>', new Date()).forUpdate().first();
    if (!reset) return false;
    const account = await transaction.from('accounts').where('id', reset.account_id).where('active', true).forUpdate().first();
    if (!account) return false;
    const passwordHash = await hash.use('scrypt').make(newPassword);
    await completePasswordReset({ accountId: account.id, tokenId: reset.id, passwordHash }, {
      replacePassword: (accountId: string, nextHash: string) => transaction.from('accounts').where('id', accountId).update({ password_hash: nextHash, updated_at: new Date() }),
      consumeToken: (tokenId: string) => transaction.from('password_reset_tokens').where('id', tokenId).update({ used_at: new Date() }),
      revokeSessions: (accountId: string) => transaction.from('sessions').where('user_id', accountId).delete(),
      audit: (accountId: string, action: string) => transaction.table('security_audit_proofs').insert({ id: randomUUID(), account_id: accountId, action, occurred_at: new Date() }),
    });
    return true;
    }),
  });
  return result.ok;
}

export async function processPasswordRecoveryEmailJobs(port?: TransactionalEmailPort) {
  if (!port) {
    const apiKey = env.get('RESEND_API_KEY');
    const from = env.get('EMAIL_FROM');
    if (!apiKey || !from) throw new Error('RESEND_API_KEY et EMAIL_FROM sont requis pour traiter les emails.');
    port = new ResendEmailAdapter(apiKey, from);
  }
  const baseUrl = env.get('WEB_BASE_URL')?.replace(/\/$/u, '');
  if (!baseUrl) throw new Error('WEB_BASE_URL est requis pour traiter les emails.');
  const workerId = randomUUID();
  const claimed = await db.transaction(async (transaction) => {
    const result = await transaction.rawQuery(`
      with candidates as (
        select id from email_jobs
        where kind = 'password_recovery' and state = 'pending' and available_at <= now()
          and (lock_expires_at is null or lock_expires_at <= now())
        order by created_at
        limit 10
        for update skip locked
      )
      update email_jobs
      set locked_by = ?, locked_at = now(), lock_expires_at = now() + interval '5 minutes'
      where id in (select id from candidates)
      returning *
    `, [workerId]);
    return (result as unknown as { rows: ClaimedEmailJob[] }).rows;
  });
  const jobs = claimed ?? [];
  for (const job of jobs) {
    try {
      const reset = await db.from('password_reset_tokens').where('id', job.password_reset_token_id).whereNull('used_at').where('expires_at', '>', new Date()).first();
      const account = reset && await Account.find(job.account_id);
      if (!reset || !account?.active) {
        await db.from('email_jobs').where('id', job.id).where('locked_by', workerId).update({ state: 'cancelled', locked_by: null, locked_at: null, lock_expires_at: null, last_error: 'delivery_cancelled' });
        continue;
      }
      const farmName = env.get('FARM_NAME') ?? 'La Cabane du Merle';
      await port.sendPasswordRecovery({ to: account.email, resetUrl: `${baseUrl}/connexion/reinitialiser?token=${encodeURIComponent(passwordResetToken(reset.id, env.get('APP_KEY')))}`, farmName, idempotencyKey: job.id });
      await db.from('email_jobs').where('id', job.id).where('locked_by', workerId).update({ state: 'sent', sent_at: new Date(), attempts: Number(job.attempts) + 1, locked_by: null, locked_at: null, lock_expires_at: null, last_error: null });
    } catch {
      const next = failedEmailJob(Number(job.attempts));
      await db.from('email_jobs').where('id', job.id).where('locked_by', workerId).update({ state: next.state, attempts: next.attempts, available_at: next.availableAt, failed_at: next.failedAt, locked_by: null, locked_at: null, lock_expires_at: null, last_error: 'delivery_failed' });
    }
  }
}
