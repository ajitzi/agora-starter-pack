'use client';

import { Input, styled } from 'tamagui';

export const TextInput = styled(Input, {
  backgroundColor: '$surface-raised',
  borderColor: '$border-subtle',
  borderRadius: '$sm',
  borderWidth: 1,
  color: '$ink-primary',
  fontSize: 16,
  minHeight: 44,
  paddingHorizontal: '$md',
  focusStyle: { borderColor: '$focus-ring', outlineColor: '$focus-ring', outlineWidth: '$focusRing' },
});
