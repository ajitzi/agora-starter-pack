'use client';

import { useEffect, useState } from 'react';
import { Button, ButtonLink, Paragraph, Screen, ScreenHeader, SkipLink, UiProvider, YStack } from '@project/ui';

export function AppShell() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return <UiProvider><Screen id="main-content" role="main" aria-busy><Paragraph>Chargement...</Paragraph></Screen></UiProvider>;
  }

  return (
    <UiProvider>
      <SkipLink />
      <Screen id="main-content" role="main" aria-labelledby="shell-title">
        <ScreenHeader
          id="shell-title"
          title="Bienvenue"
          context="La Cabane du Merle"
          actions={<Button asChild><ButtonLink href="/connexion">Se connecter</ButtonLink></Button>}
        />
        <YStack gap="$md" minWidth={0}>
          <Paragraph>Le service est en cours de préparation.</Paragraph>
        </YStack>
      </Screen>
    </UiProvider>
  );
}
