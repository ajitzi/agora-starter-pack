'use client';

import { useEffect, useState } from 'react';
import { Paragraph, Screen, ScreenHeader, SkipLink, UiProvider, YStack } from '@project/ui';

export function AppShell() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return <main id="main-content" aria-busy="true"><p>Chargement...</p></main>;
  }

  return (
    <UiProvider>
      <SkipLink />
      <Screen asChild>
        <main id="main-content" aria-labelledby="shell-title">
          <ScreenHeader id="shell-title" title="Bienvenue" context="La Cabane du Merle" />
          <YStack gap="$md" minWidth={0}>
            <Paragraph>Le service est en cours de préparation.</Paragraph>
          </YStack>
        </main>
      </Screen>
    </UiProvider>
  );
}
