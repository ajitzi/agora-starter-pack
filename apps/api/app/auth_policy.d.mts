export type PolicyAccount = { id: string; active: boolean };
export type PolicyDependencies = {
  isRateLimited(email: string, ip: string): Promise<boolean>;
  recordAttempt(email: string, ip: string): Promise<void>;
  audit(accountId: string | null, action: 'login_succeeded' | 'login_refused'): Promise<void>;
  delay(): Promise<void>;
  verifyCredentials(email: string, password: string): Promise<PolicyAccount | null>;
};
export function normalizeEmail(value: string): string;
export function csrfMatches(expected: string | undefined, received: string | undefined): boolean;
export function revalidateProtectedSession(accountId: string | undefined, dependencies: { findAccount(id: string): Promise<{ active: boolean } | null>; findSession?(sessionId: string, accountId: string): Promise<unknown> }, protectedSessionId?: string): Promise<boolean>;
export function sessionIsUsable(lastActivityAt: Date, now?: number): boolean;
export function validateLoginInput(value: unknown): { email: string; password: string } | null;
export function authenticateWith(input: { email: string; password: string; ip: string }, dependencies: PolicyDependencies): Promise<{ ok: true; account: PolicyAccount } | { ok: false; message: string }>;
export function createSubmission(fetcher: (email: string, password: string) => Promise<{ ok: boolean; destination?: string }>): (email: string, password: string) => Promise<Record<string, string>>;
