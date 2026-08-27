export type PolicyAccount = { id: string; active: boolean; role: 'admin' | 'amap' };
export type PolicyDependencies = {
  isRateLimited(email: string, ip: string): Promise<boolean>;
  recordAttempt(email: string, ip: string): Promise<void>;
  audit(accountId: string | null, action: 'login_succeeded' | 'login_refused'): Promise<void>;
  delay(): Promise<void>;
  verifyCredentials(email: string, password: string): Promise<PolicyAccount | null>;
};
export function normalizeEmail(value: string): string;
export function csrfMatches(expected: string | undefined, received: string | undefined): boolean;
export function revalidateProtectedSession(sessionId: string | undefined, dependencies: { findAccount(id: string): Promise<{ active: boolean } | null> }): Promise<boolean>;
export function validateLoginInput(value: unknown): { email: string; password: string } | null;
export function authenticateWith(input: { email: string; password: string; ip: string }, dependencies: PolicyDependencies): Promise<{ ok: true; account: PolicyAccount } | { ok: false; message: string }>;
export function createSubmission(fetcher: (email: string, password: string) => Promise<{ ok: boolean; destination?: string }>): (email: string, password: string) => Promise<Record<string, string>>;
