'use client';

import { Paragraph as TamaguiParagraph, styled } from 'tamagui';

export const Paragraph = styled(TamaguiParagraph, {
  fontFamily: '$body',
  fontSize: 16,
  lineHeight: 24,
  color: '$ink-primary',
});
