'use client';

import { Button as TamaguiButton, styled } from 'tamagui';

export const Button = styled(TamaguiButton, {
  alignItems: 'center',
  backgroundColor: '$action-primary',
  borderColor: '$action-primary',
  borderRadius: '$md',
  borderWidth: 1,
  color: '$action-on-primary',
  fontWeight: '700',
  justifyContent: 'center',
  minHeight: 44,
  paddingHorizontal: '$lg',
  hoverStyle: { backgroundColor: '$action-primary-pressed', borderColor: '$action-primary-pressed' },
  pressStyle: { backgroundColor: '$action-primary-pressed', borderColor: '$action-primary-pressed' },
  focusStyle: { outlineColor: '$focus-ring', outlineWidth: '$focusRing' },
});
