'use client';

import { Screen, ScreenHeader } from '@project/ui';

export function StarterScreen() {
  return (
    <Screen>
      <ScreenHeader
        title="Starter pack"
        context="Cette surface partage les composants de @project/ui entre le web et le mobile."
      />
    </Screen>
  );
}
