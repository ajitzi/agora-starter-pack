'use client';

import { useEffect, useState } from 'react';
import { Button, Paragraph, Screen, ScreenHeader, SkipLink, UiProvider, YStack } from '@project/ui';

export function AppShell() {
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    fetch('/v1/auth/session', { credentials: 'include' })
      .then(async (response) => response.ok ? response.json() as Promise<{ email: string }> : null)
      .then((session) => setEmail(session?.email ?? null))
      .catch(() => setEmail(null));
  }, []);

  async function logout() {
    try {
      const csrf = await fetch('/v1/auth/csrf', { credentials: 'include' });
      if (!csrf.ok) return;
      const { csrfToken }: { csrfToken: string } = await csrf.json();
      const response = await fetch('/v1/auth/logout', { method: 'POST', credentials: 'include', headers: { 'x-csrf-token': csrfToken } });
      if (response.ok) setEmail(null);
    } catch {
      // A failed logout leaves the current session state unchanged.
    }
  }

  function goToLogin() {
    window.location.assign('/connexion');
  }

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
          actions={email
            ? <Button onPress={logout}>Se déconnecter</Button>
            : <Button onPress={goToLogin}>Se connecter</Button>}
        />
        <YStack gap="$md" minWidth={0}>
          <Paragraph>{email ? `Bonjour ${email}` : 'Le service est en cours de préparation.'}</Paragraph>
        </YStack>
      </Screen>
    </UiProvider>
  );
}
