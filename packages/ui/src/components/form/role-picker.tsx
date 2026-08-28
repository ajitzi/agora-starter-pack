'use client';

import { Button, XStack, YStack } from 'tamagui';
import { Paragraph } from '../typography/paragraph';

export const ACCOUNT_ROLES = ['admin', 'amap'] as const;
export type AccountRole = (typeof ACCOUNT_ROLES)[number];

type RolePickerProps = {
  value: AccountRole[];
  onChange(value: AccountRole[]): void;
  disabled?: boolean;
};

export function RolePicker({ value, onChange, disabled = false }: RolePickerProps) {
  return <YStack gap="$xs" role="group" aria-label="Rôles">
    <XStack gap="$sm" flexWrap="wrap">
      {ACCOUNT_ROLES.map((role) => {
        const selected = value.includes(role);
        return <Button key={role} type="button" backgroundColor={selected ? '$action-primary' : '$surface-raised'} borderColor={selected ? '$action-primary' : '$border-subtle'} color={selected ? '$action-on-primary' : '$ink-primary'} borderRadius="$sm" borderWidth={1} minHeight={44} paddingHorizontal="$md" aria-pressed={selected} disabled={disabled} onPress={() => onChange(selected ? value.filter((current) => current !== role) : [...value, role])}>
          {role}
        </Button>;
      })}
    </XStack>
    <Paragraph aria-live="polite" color="$ink-secondary">Sélectionnés : {value.length ? value.join(', ') : 'aucun'}</Paragraph>
  </YStack>;
}
