'use client';

import { XStack, styled } from 'tamagui';

export const StickyActionBar = styled(XStack, {
  minWidth: 0,
  width: '100%',
  position: 'sticky',
  bottom: '$xs',
  backgroundColor: '$surface-raised',
  borderColor: '$border-subtle',
  borderWidth: 1,
  padding: '$md',
  borderRadius: '$md',
  gap: '$sm',
});
