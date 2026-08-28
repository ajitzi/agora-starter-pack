export const ALLOWED_ROLES = new Set(['admin', 'amap']);

export function validateRoles(roles) {
  if (!Array.isArray(roles) || roles.length === 0 || new Set(roles).size !== roles.length || roles.some((role) => !ALLOWED_ROLES.has(role))) return null;
  return [...roles].sort();
}

export function canRemoveRoles(currentRoles, nextRoles, activeAdminCount) {
  if (!validateRoles(nextRoles)) return false;
  return !(currentRoles.includes('admin') && !nextRoles.includes('admin') && activeAdminCount <= 1);
}

export function accountDto(account, roles, activeSessions) {
  return { id: account.id, email: account.email, roles: [...roles].sort(), active: account.active, version: account.version, lastActivityAt: account.last_activity_at?.toISOString?.() ?? account.last_activity_at ?? null, activeSessions };
}

export function validateRevocation(input) {
  if (!input || !Number.isInteger(input.expectedVersion) || input.expectedVersion < 1 || !Number.isInteger(input.expectedActiveSessions) || input.expectedActiveSessions < 1) return null;
  if (input.scope === 'all') return { expectedVersion: input.expectedVersion, expectedActiveSessions: input.expectedActiveSessions, scope: 'all', sessionPosition: 0 };
  if (input.scope === 'one' && Number.isInteger(input.sessionPosition) && input.sessionPosition >= 1 && input.sessionPosition <= input.expectedActiveSessions) return { expectedVersion: input.expectedVersion, expectedActiveSessions: input.expectedActiveSessions, scope: 'one', sessionPosition: input.sessionPosition };
  return null;
}
