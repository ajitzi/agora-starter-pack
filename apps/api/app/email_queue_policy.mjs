import { retryDelayMs } from './password_recovery_policy.mjs';

export const MAX_EMAIL_ATTEMPTS = 5;

export function failedEmailJob(attempts, now = Date.now()) {
  const nextAttempts = attempts + 1;
  return nextAttempts >= MAX_EMAIL_ATTEMPTS
    ? { attempts: nextAttempts, state: 'failed', failedAt: new Date(now), availableAt: new Date(now) }
    : { attempts: nextAttempts, state: 'pending', failedAt: null, availableAt: new Date(now + retryDelayMs(nextAttempts)) };
}
