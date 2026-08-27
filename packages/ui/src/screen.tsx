'use client';

import { YStack, styled } from 'tamagui';

export const Screen = styled(YStack, {
  flex: 1,
  minWidth: 0,
  width: '100%',
  backgroundColor: '$surface-base',
  padding: '$lg',
  paddingBottom: '$xxxl',
  gap: '$xl',
  $wide: { padding: '$xl' },
});
