'use client';

import { XStack, styled } from 'tamagui';

export const ScreenHeaderFrame = styled(XStack, {
  minWidth: 0,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '$md',
});
