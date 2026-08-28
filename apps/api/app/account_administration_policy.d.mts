export const ALLOWED_ROLES: Set<string>;
export function validateRoles(roles: unknown): string[] | null;
export function canRemoveRoles(currentRoles: string[], nextRoles: string[], activeAdminCount: number): boolean;
export function accountDto(account: Record<string, unknown>, roles: string[], activeSessions: number): Record<string, unknown>;
export function validateRevocation(input: unknown): { expectedVersion: number; expectedActiveSessions: number; scope: 'all' | 'one'; sessionPosition: number } | null;
