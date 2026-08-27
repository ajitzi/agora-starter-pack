export const MAX_EMAIL_ATTEMPTS: number;
export function failedEmailJob(attempts: number, now?: number): { attempts: number; state: 'pending'; failedAt: null; availableAt: Date } | { attempts: number; state: 'failed'; failedAt: Date; availableAt: Date };
