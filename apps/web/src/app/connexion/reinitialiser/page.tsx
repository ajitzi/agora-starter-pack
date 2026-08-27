import { PasswordResetScreen } from '@project/screens';
import type { Metadata } from 'next';

export const metadata: Metadata = { referrer: 'no-referrer' };

export default function PasswordResetPage() {
  return <PasswordResetScreen />;
}
