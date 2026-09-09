'use client';

import { Paragraph, styled } from 'tamagui';

export const ScreenContext = styled(Paragraph, {
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  color: '$ink-secondary',
});
