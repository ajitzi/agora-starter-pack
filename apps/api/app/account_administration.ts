import { randomUUID } from 'node:crypto';
import { createHash } from 'node:crypto';
import hash from '@adonisjs/core/services/hash';
import db from '@adonisjs/lucid/services/db';
import env from '#start/env';
import { passwordResetDigest, passwordResetToken } from './password_recovery_policy.mjs';
import { accountDto, canRemoveRoles, validateRevocation, validateRoles } from './account_administration_policy.mjs';

const HOUR = 60 * 60_000;

async function resultFor(transaction: any, accountId: string) {
  const account = await transaction.from('accounts').where('id', accountId).first();
  if (!account) return null;
  const roles = (await transaction.from('account_roles').where('account_id', accountId).orderBy('role')).map((row: { role: string }) => row.role);
  const sessions = await transaction.from('sessions').where('user_id', accountId).where('expires_at', '>', new Date()).count('* as total').first();
  return accountDto(account, roles, Number(sessions?.total ?? 0));
}

function fingerprint(input: unknown) {
  return createHash('sha256').update(JSON.stringify(input)).digest('hex');
}

async function mutate(principalId: string, operation: string, key: string, request: unknown, work: (transaction: any) => Promise<unknown>) {
  if (!key || key.length > 128) throw new Error('idempotency');
  const requestFingerprint = fingerprint(request);
  return db.transaction(async (transaction) => {
    await transaction.rawQuery('select pg_advisory_xact_lock(hashtext(?))', [`${principalId}:${operation}:${key}`]);
    const existing = await transaction.from('account_mutations').where({ principal_id: principalId, operation, idempotency_key: key }).first();
    if (existing) {
      if (existing.request_fingerprint !== requestFingerprint) throw new Error('idempotency_mismatch');
      return typeof existing.result === 'string' ? JSON.parse(existing.result) : existing.result;
    }
    const result = await work(transaction);
    await transaction.table('account_mutations').insert({ id: randomUUID(), principal_id: principalId, operation, idempotency_key: key, request_fingerprint: requestFingerprint, result: JSON.stringify(result), created_at: new Date() });
    return result;
  });
}

async function audit(transaction: any, actorId: string, action: string, accountId: string, before: unknown, after: unknown) {
  await transaction.table('security_audit_proofs').insert({ id: randomUUID(), account_id: accountId, actor_id: actorId, action, object_type: 'account', object_id: accountId, before: JSON.stringify(before), after: JSON.stringify(after), occurred_at: new Date() });
}

export async function isAdministrator(accountId: string) {
  return Boolean(await db.from('accounts as a').join('account_roles as r', 'r.account_id', 'a.id').where('a.id', accountId).where('a.active', true).where('r.role', 'admin').first());
}

export async function listAccounts(limit = 50, cursor?: string) {
  return db.transaction(async (transaction) => {
    const accounts = await transaction.from('accounts').if(cursor, (query) => query.where('id', '>', cursor!)).orderBy('id').limit(limit + 1);
    const page = accounts.slice(0, limit);
    return { accounts: await Promise.all(page.map((account: { id: string }) => resultFor(transaction, account.id))), nextCursor: accounts.length > limit ? page.at(-1)?.id ?? null : null };
  });
}

export async function createAccount(principalId: string, key: string, input: { email: string; roles: string[] }) {
  const roles = validateRoles(input.roles);
  if (!roles || !input.email) throw new Error('invalid');
  return mutate(principalId, `create:${input.email}`, key, { email: input.email, roles }, async (transaction) => {
    if (await transaction.from('accounts').where('email', input.email).first()) throw new Error('duplicate');
    const id = randomUUID(); const now = new Date(); const tokenId = randomUUID();
    await transaction.table('accounts').insert({ id, email: input.email, password_hash: await hash.use('scrypt').make(randomUUID()), active: true, version: 1, created_at: now, updated_at: now });
    await transaction.table('account_roles').insert(roles.map((role: string) => ({ account_id: id, role })));
    await transaction.table('password_reset_tokens').insert({ id: tokenId, account_id: id, token_digest: passwordResetDigest(passwordResetToken(tokenId, env.get('APP_KEY'))), expires_at: new Date(Date.now() + HOUR), created_at: now });
    await transaction.table('email_jobs').insert({ id: randomUUID(), kind: 'password_recovery', account_id: id, password_reset_token_id: tokenId, available_at: now, created_at: now });
    const result = await resultFor(transaction, id); await audit(transaction, principalId, 'account_created', id, null, result); return result;
  });
}

export async function updateAccount(principalId: string, accountId: string, key: string, input: { expectedVersion: number; roles?: string[]; active?: boolean }) {
  return mutate(principalId, `update:${accountId}`, key, input, async (transaction) => {
    const account = await transaction.from('accounts').where('id', accountId).forUpdate().first();
    if (!account) throw new Error('missing');
    if (account.version !== input.expectedVersion) throw new Error('conflict');
    const currentRoles = (await transaction.from('account_roles').where('account_id', accountId)).map((row: { role: string }) => row.role);
    const nextRoles = input.roles ? validateRoles(input.roles) : currentRoles;
    if (!nextRoles) throw new Error('invalid');
    if (input.active === undefined && input.roles === undefined) throw new Error('invalid');
    if (input.active === undefined && JSON.stringify([...currentRoles].sort()) === JSON.stringify(nextRoles)) throw new Error('invalid');
    if (input.active === account.active && JSON.stringify([...currentRoles].sort()) === JSON.stringify(nextRoles)) throw new Error('invalid');
    const isSecurityChange = input.active === false || JSON.stringify(currentRoles.sort()) !== JSON.stringify(nextRoles);
    if ((input.active === false || !nextRoles.includes('admin')) && currentRoles.includes('admin') && account.active) {
      await transaction.rawQuery("select pg_advisory_xact_lock(hashtext('active-admin-invariant'))");
      const admins = await transaction.from('accounts as a').join('account_roles as r', 'r.account_id', 'a.id').where('a.active', true).where('r.role', 'admin').count('* as total').first();
      if (!canRemoveRoles(currentRoles, nextRoles, Number(admins?.total ?? 0))) throw new Error('last_admin');
    }
    const before = await resultFor(transaction, accountId);
    await transaction.from('accounts').where('id', accountId).update({ active: input.active ?? account.active, version: account.version + 1, updated_at: new Date() });
    if (input.roles) { await transaction.from('account_roles').where('account_id', accountId).delete(); await transaction.table('account_roles').insert(nextRoles.map((role: string) => ({ account_id: accountId, role }))); }
    if (isSecurityChange) { await transaction.from('sessions').where('user_id', accountId).delete(); await transaction.from('password_reset_tokens').where('account_id', accountId).whereNull('used_at').update({ used_at: new Date() }); }
    const result = await resultFor(transaction, accountId); await audit(transaction, principalId, input.active === false ? 'account_disabled' : 'account_updated', accountId, before, result); return result;
  });
}

export async function revokeSessions(principalId: string, accountId: string, key: string, input: { expectedVersion: number; expectedActiveSessions: number; scope: 'all' | 'one'; sessionPosition: number }) {
  const request = validateRevocation(input);
  if (!request) throw new Error('invalid');
  return mutate(principalId, `revoke_sessions_${request.scope}:${accountId}`, key, request, async (transaction) => {
    const account = await transaction.from('accounts').where('id', accountId).forUpdate().first();
    if (!account) throw new Error('missing');
    if (account.version !== request.expectedVersion) throw new Error('conflict');
    const before = await resultFor(transaction, accountId);
    if (!before || before.activeSessions !== request.expectedActiveSessions) throw new Error('conflict');
    if (request.scope === 'all') await transaction.from('sessions').where('user_id', accountId).delete();
    else {
      // A position is selected by the administrator; the opaque database ID never crosses the boundary.
      const session = await transaction.from('sessions').where('user_id', accountId).where('expires_at', '>', new Date()).orderBy('expires_at').orderBy('id').offset(request.sessionPosition - 1).forUpdate().first();
      if (session) await transaction.from('sessions').where('id', session.id).delete();
    }
    await transaction.from('password_reset_tokens').where('account_id', accountId).whereNull('used_at').update({ used_at: new Date() });
    await transaction.from('accounts').where('id', accountId).update({ version: account.version + 1, updated_at: new Date() });
    const result = await resultFor(transaction, accountId); await audit(transaction, principalId, request.scope === 'all' ? 'sessions_revoked' : 'session_revoked', accountId, before, result); return result;
  });
}
