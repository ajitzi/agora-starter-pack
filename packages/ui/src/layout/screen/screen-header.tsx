'use client';

import type { ReactNode } from 'react';
import { XStack, YStack } from 'tamagui';
import { ScreenContext } from './screen-context';
import { ScreenHeaderFrame } from './screen-header-frame';
import { ScreenTitle } from './screen-title';

export function ScreenHeader({ id, title, context, actions }: { id?: string; title: string; context?: string; actions?: ReactNode }) {
  return (
    <ScreenHeaderFrame>
      <YStack flex={1} minWidth={0} maxWidth="100%" gap="$xs">
        <ScreenTitle id={id}>{title}</ScreenTitle>
        {context ? <ScreenContext>{context}</ScreenContext> : null}
      </YStack>
      {actions ? <XStack maxWidth="100%" flexWrap="wrap">{actions}</XStack> : null}
    </ScreenHeaderFrame>
  );
}
