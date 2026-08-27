export const GENERIC_RECOVERY_RESULT: { message: string };
export function passwordResetDigest(token: string): string;
export function passwordResetToken(id: string, appKey: string): string;
export function isSignedPasswordResetToken(token: string, appKey: string): boolean;
export function validateRecoveryRequest(value: unknown): { email: string } | null;
export function validateNewPassword(value: unknown): { valid: false; detail: string } | { valid: true; token: string; password: string };
export function requestRecoveryWith(input: { email: string; ip: string; startedAt?: number }, dependencies: {
  admitAttempt(email: string, ip: string): Promise<boolean>;
  findActiveAccount(email: string): Promise<unknown>;
  queueRecovery(account: unknown): Promise<void>;
  delay(elapsed: number): Promise<void>;
}): Promise<{ message: string }>;
export function resetPasswordWith(input: unknown, dependencies: {
  isSignedToken(token: string): boolean;
  consume(token: string, password: string): Promise<boolean>;
}): Promise<{ ok: true } | { ok: false; reason: 'invalidPassword'; detail: string } | { ok: false; reason: 'invalidLink' }>;
export function completePasswordReset(input: { accountId: string; tokenId: string; passwordHash: string }, dependencies: {
  replacePassword(accountId: string, passwordHash: string): Promise<unknown>;
  consumeToken(tokenId: string): Promise<unknown>;
  revokeSessions(accountId: string): Promise<unknown>;
  audit(accountId: string, action: string): Promise<unknown>;
}): Promise<void>;
export function retryDelayMs(attempts: number): number;
