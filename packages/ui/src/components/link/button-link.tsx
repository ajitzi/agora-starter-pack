'use client';

import { Anchor, styled } from 'tamagui';

export const ButtonLink = styled(Anchor, {
  alignItems: 'center',
  backgroundColor: '$action-primary',
  borderColor: '$action-primary',
  borderRadius: '$md',
  borderWidth: 1,
  color: '$action-on-primary',
  display: 'flex',
  fontWeight: '700',
  justifyContent: 'center',
  minHeight: 44,
  paddingHorizontal: '$lg',
  textAlign: 'center',
  textDecorationLine: 'none',
  hoverStyle: { backgroundColor: '$action-primary-pressed', borderColor: '$action-primary-pressed' },
  pressStyle: { backgroundColor: '$action-primary-pressed', borderColor: '$action-primary-pressed' },
  focusStyle: { outlineColor: '$focus-ring', outlineWidth: '$focusRing' },
});
