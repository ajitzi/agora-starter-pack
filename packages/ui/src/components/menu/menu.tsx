'use client';

import type { ComponentProps } from 'react';
import { Menu as TamaguiMenu, styled } from 'tamagui';

function MenuRoot(props: ComponentProps<typeof TamaguiMenu>) {
  return <TamaguiMenu {...props} />;
}

const MenuContent = styled(TamaguiMenu.Content, {
  backgroundColor: '$surface-raised',
  borderColor: '$border-subtle',
  borderRadius: '$lg',
  borderWidth: 1,
  elevation: 2,
  gap: '$xs',
  minWidth: 220,
  padding: '$xs',
});

const MenuItem = styled(TamaguiMenu.Item, {
  alignItems: 'center',
  backgroundColor: '$surface-raised',
  borderRadius: '$md',
  minHeight: 44,
  paddingHorizontal: '$md',
  hoverStyle: { backgroundColor: '$surface-subtle' },
  pressStyle: { backgroundColor: '$surface-subtle' },
  focusStyle: { outlineColor: '$focus-ring', outlineWidth: '$focusRing' },
  variants: {
    destructive: {
      true: {
        hoverStyle: { backgroundColor: '$surface-danger-subtle' },
        pressStyle: { backgroundColor: '$surface-danger-subtle' },
      },
    },
  },
} as const);

const MenuItemTitle = styled(TamaguiMenu.ItemTitle, {
  color: '$ink-primary',
  variants: {
    destructive: {
      true: { color: '$action-danger' },
    },
  },
} as const);

export const Menu = Object.assign(MenuRoot, TamaguiMenu, {
  Content: MenuContent,
  Item: MenuItem,
  ItemTitle: MenuItemTitle,
});
