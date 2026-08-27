import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { normalizeEmail } from './auth_policy.mjs';

const commonPasswords = new Set(['123456789012', 'passwordpassword', 'motdepassemotdepasse', 'azertyazerty', 'qwertyqwerty']);

export const GENERIC_RECOVERY_RESULT = { message: 'Si un compte correspond à cette adresse, un email a été envoyé.' };

export const passwordResetDigest = (token) => createHash('sha256').update(token).digest('hex');
export const passwordResetToken = (id, appKey) => `${id}.${createHmac('sha256', appKey).update(`password-reset:${id}`).digest('base64url')}`;

export function isSignedPasswordResetToken(token, appKey) {
  if (typeof token !== 'string') return false;
  const [id, signature, ...extra] = token.split('.');
  if (!id || !signature || extra.length || !/^[0-9a-f-]{36}$/iu.test(id)) return false;
  const expected = passwordResetToken(id, appKey).split('.')[1];
  return signature.length === expected.length && timingSafeEqual(new TextEncoder().encode(signature), new TextEncoder().encode(expected));
}

export function validateRecoveryRequest(value) {
  if (!value || typeof value !== 'object' || typeof value.email !== 'string') return null;
  if (Object.keys(value).length !== 1) return null;
  const email = normalizeEmail(value.email);
  return email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ? { email } : null;
}

export function validateNewPassword(value) {
  if (!value || typeof value !== 'object') return { valid: false, detail: 'La requête est invalide.' };
  const { token, password, confirmation } = value;
  if (Object.keys(value).length !== 3 || !['token', 'password', 'confirmation'].every((key) => Object.hasOwn(value, key))) return { valid: false, detail: 'La requête est invalide.' };
  if (typeof token !== 'string' || typeof password !== 'string' || typeof confirmation !== 'string') return { valid: false, detail: 'La requête est invalide.' };
  const length = Array.from(password).length;
  if (length < 12 || length > 128) return { valid: false, detail: 'La phrase de passe doit contenir entre 12 et 128 caractères.' };
  if (password !== confirmation) return { valid: false, detail: 'Les deux phrases de passe ne correspondent pas.' };
  if (commonPasswords.has(password.normalize('NFKC').toLocaleLowerCase('en-US'))) return { valid: false, detail: 'Cette phrase de passe est trop courante.' };
  return { valid: true, token, password };
}

export async function requestRecoveryWith({ email, ip, startedAt = Date.now() }, dependencies) {
  const normalizedEmail = normalizeEmail(email);
  const limited = !normalizedEmail || await dependencies.admitAttempt(normalizedEmail, ip);
  if (!limited) {
    const account = await dependencies.findActiveAccount(normalizedEmail);
    if (account) await dependencies.queueRecovery(account);
  }
  await dependencies.delay(Date.now() - startedAt);
  return GENERIC_RECOVERY_RESULT;
}

export const retryDelayMs = (attempts) => Math.min(60 * 60_000, 60_000 * 2 ** Math.max(0, attempts - 1));

export async function resetPasswordWith(input, dependencies) {
  const validated = validateNewPassword(input);
  if (!validated.valid) return { ok: false, reason: 'invalidPassword', detail: validated.detail };
  if (!dependencies.isSignedToken(validated.token)) return { ok: false, reason: 'invalidLink' };
  return await dependencies.consume(validated.token, validated.password) ? { ok: true } : { ok: false, reason: 'invalidLink' };
}

export async function completePasswordReset({ accountId, tokenId, passwordHash }, dependencies) {
  await dependencies.replacePassword(accountId, passwordHash);
  await dependencies.consumeToken(tokenId);
  await dependencies.revokeSessions(accountId);
  await dependencies.audit(accountId, 'password_reset');
}
