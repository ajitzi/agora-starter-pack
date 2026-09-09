'use client';

import type { ReactNode } from 'react';
import { UiProvider } from '@project/ui';

export function Providers({ children }: { children: ReactNode }) {
  return <UiProvider>{children}</UiProvider>;
}
