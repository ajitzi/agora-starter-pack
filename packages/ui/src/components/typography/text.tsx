'use client';

import { Text as TamaguiText, styled } from 'tamagui';

export const Text = styled(TamaguiText, {
  fontFamily: '$body',
  fontSize: 16,
  lineHeight: 24,
  color: '$ink-primary',
});
