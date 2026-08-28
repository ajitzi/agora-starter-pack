'use client';

import type { ComponentProps } from 'react';
import { Form as TamaguiForm } from 'tamagui';

type FormProps = Omit<ComponentProps<typeof TamaguiForm>, 'onSubmit'> & {
  onSubmit?: (event: { preventDefault(): void }) => void;
};

export function Form({ onSubmit, ...props }: FormProps) {
  return <TamaguiForm {...props} onSubmit={() => { onSubmit?.({ preventDefault() {} }); }} />;
}
