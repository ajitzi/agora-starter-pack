'use client';

import { Paragraph, styled } from 'tamagui';

export const ScreenContext = styled(Paragraph, {
  fontFamily: '$body',
  fontSize: '$meta',
  lineHeight: 20,
  fontWeight: '400',
  color: '$ink-secondary',
});
