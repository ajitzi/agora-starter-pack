'use client';

import { Paragraph, Text, YStack } from 'tamagui';

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
