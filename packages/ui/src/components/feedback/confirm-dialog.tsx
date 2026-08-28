import type { ReactNode } from 'react';
import { Dialog, XStack, YStack } from 'tamagui';
import { Button } from '../button/button';

type ConfirmDialogProps = { open: boolean; title: string; detail: string; confirmLabel: string; children?: ReactNode; disabled?: boolean; onConfirm(): void; onCancel(): void };

export function ConfirmDialog({ open, title, detail, confirmLabel, children, disabled = false, onConfirm, onCancel }: ConfirmDialogProps) {
  return <Dialog modal open={open} onOpenChange={(nextOpen) => { if (!nextOpen && !disabled) onCancel(); }}>
    <Dialog.Portal>
      <Dialog.Overlay backgroundColor="$ink-primary" opacity={0.45} zIndex="$0" />
      <Dialog.Content bordered elevate gap="$md" padding="$lg" zIndex="$1">
        <YStack gap="$sm">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{detail}</Dialog.Description>
        </YStack>
        {children}
        <XStack gap="$sm" justifyContent="flex-end" flexWrap="wrap">
          <Dialog.Close asChild>
            <Button disabled={disabled} onPress={onCancel}>Annuler</Button>
          </Dialog.Close>
          <Button disabled={disabled} onPress={onConfirm}>{confirmLabel}</Button>
        </XStack>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>;
}
