'use client';

import type { ComponentProps } from 'react';
import { Form as TamaguiForm, styled } from 'tamagui';

const StyledForm = styled(TamaguiForm, {});

type FormProps = Omit<ComponentProps<typeof StyledForm>, 'onSubmit'> & {
  onSubmit?: (event: { preventDefault(): void }) => void;
};

export function Form({ onSubmit, ...props }: FormProps) {
  return <StyledForm {...props} onSubmit={() => { onSubmit?.({ preventDefault() {} }); }} />;
}
