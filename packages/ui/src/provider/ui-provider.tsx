'use client';

import type { ReactNode } from 'react';
import { TamaguiProvider } from 'tamagui';
import { config } from '../config';

export function UiProvider({ children }: { children: ReactNode }) {
  return <TamaguiProvider config={config} defaultTheme="light">{children}</TamaguiProvider>;
}
