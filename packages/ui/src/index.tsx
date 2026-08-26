'use client';

import type { ReactNode } from 'react';
import {
  Anchor,
  Button,
  H1,
  Paragraph,
  TamaguiProvider,
  Text,
  XStack,
  YStack,
  styled,
} from 'tamagui';
import { config } from './config';
import { resolveCollectionNoticeGate } from './notice.mjs';

export { UI_TOKENS } from './config';

export function UiProvider({ children }: { children: ReactNode }) {
  return <TamaguiProvider config={config} defaultTheme="light">{children}</TamaguiProvider>;
}

export const Screen = styled(YStack, {
  flex: 1,
  minWidth: 0,
  width: '100%',
  backgroundColor: '$surface-base',
  padding: '$lg',
  paddingBottom: '$xxxl',
  gap: '$xl',
  $wide: { padding: '$xl' },
});

const ScreenHeaderFrame = styled(XStack, {
  minWidth: 0,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '$md',
});

export const ScreenTitle = styled(H1, {
  fontFamily: 'system-ui',
  fontSize: '$display',
  lineHeight: 34,
  fontWeight: '700',
  color: '$ink-primary',
});

export const ScreenContext = styled(Paragraph, {
  fontFamily: 'system-ui',
  fontSize: '$meta',
  lineHeight: 20,
  fontWeight: '400',
  color: '$ink-secondary',
});

export function ScreenHeader({ id, title, context, actions }: { id?: string; title: string; context?: string; actions?: ReactNode }) {
  return (
    <ScreenHeaderFrame>
      <YStack flex={1} minWidth={0} maxWidth="100%" gap="$xs">
        <ScreenTitle id={id}>{title}</ScreenTitle>
        {context ? <ScreenContext>{context}</ScreenContext> : null}
      </YStack>
      {actions ? <XStack maxWidth="100%" flexWrap="wrap">{actions}</XStack> : null}
    </ScreenHeaderFrame>
  );
}

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

const FocusLink = styled(Anchor, {
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

export function SkipLink() {
  return <FocusLink href="#main-content">Aller au contenu</FocusLink>;
}

export type RuntimeNotice = {
  active: boolean;
  legallyValidated: boolean;
  version: string;
  controller: string;
  purpose: string;
  legalBasis: string;
  retention: string;
  rights: string;
  contact: string;
};

export type CollectionNoticeGate = {
  canSubmit: boolean;
  message?: string;
  notice?: RuntimeNotice;
  proofVersion?: string;
};

export { resolveCollectionNoticeGate };

export function CollectionNoticeGateView({ gate }: { gate: CollectionNoticeGate }) {
  if (!gate.canSubmit) return <Paragraph role="status">{gate.message}</Paragraph>;
  if (!gate.notice) return null;
  return (
    <YStack gap="$sm" backgroundColor="$surface-raised" padding="$md" borderRadius="$md">
      <Text fontWeight="700" color="$ink-primary">Information de confidentialité</Text>
      <Paragraph>Responsable: {gate.notice.controller}</Paragraph>
      <Paragraph>Finalité: {gate.notice.purpose}</Paragraph>
      <Paragraph>Base légale: {gate.notice.legalBasis}</Paragraph>
      <Paragraph>Durée de conservation: {gate.notice.retention}</Paragraph>
      <Paragraph>Droits: {gate.notice.rights}</Paragraph>
      <Paragraph>Contact: {gate.notice.contact}</Paragraph>
      <Text>Version {gate.proofVersion}</Text>
    </YStack>
  );
}

export { Button, Paragraph, Text, XStack, YStack };
