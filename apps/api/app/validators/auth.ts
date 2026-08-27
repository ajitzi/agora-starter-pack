import { validateLoginInput as validate } from '../auth_policy.mjs';

export type LoginInput = { email: string; password: string };
export const validateLoginInput = (value: unknown): LoginInput | null => validate(value) as LoginInput | null;
