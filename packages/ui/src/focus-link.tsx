'use client';

import { Anchor, styled } from 'tamagui';

export const FocusLink = styled(Anchor, {
  position: 'absolute',
  left: '$lg',
  top: '$lg',
  zIndex: '$1',
  padding: '$sm',
  backgroundColor: '$surface-raised',
  color: '$ink-primary',
  borderRadius: '$sm',
  opacity: 0,
  focusStyle: {
    opacity: 1,
    outlineColor: '$focus-ring',
    outlineWidth: '$focusRing',
  },
});
