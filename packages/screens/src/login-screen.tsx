'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Button, FieldLabel, Form, Paragraph, Screen, ScreenHeader, SkipLink, TextInput, UiProvider, YStack } from '@project/ui';

type LoginState = 'ready' | 'submitting' | 'success' | 'invalidCredentials' | 'error';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<LoginState>('ready');
  const summary = useRef<ComponentRef<typeof YStack>>(null);

  useEffect(() => {
    if (state === 'invalidCredentials' || state === 'error') summary.current?.focus();
  }, [state]);

  async function submit(event?: { preventDefault?: () => void }) {
    event?.preventDefault?.();
    if (state === 'submitting') return;
    setState('submitting');
    try {
      const response = await fetch('/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setPassword('');
      if (response.status === 401) {
        setState('invalidCredentials');
        return;
      }
      if (!response.ok) {
        setState('error');
        return;
      }
      const result: { destination: string } = await response.json();
      if (result.destination !== '/administration' && result.destination !== '/amap') {
        setState('error');
        return;
      }
      setState('success');
      window.location.assign(result.destination);
    } catch {
      setState('error');
    }
  }

  const error = state === 'invalidCredentials' ? 'Email ou mot de passe incorrect.' : state === 'error' ? 'La connexion a échoué. Veuillez réessayer.' : null;
  return (
    <UiProvider>
      <SkipLink />
      <Screen id="main-content" role="main" aria-labelledby="login-title">
        <ScreenHeader id="login-title" title="Connexion" context="La Cabane du Merle" />
        <YStack maxWidth={480} width="100%" gap="$md">
          <YStack ref={summary} id="login-error-summary" tabIndex={-1} role={error ? 'alert' : 'status'} aria-live="polite">
            {error ? <Paragraph>{error}</Paragraph> : state === 'success' ? <Paragraph>Connexion réussie.</Paragraph> : null}
          </YStack>
          <Form onSubmit={submit} aria-describedby={error ? 'login-error-summary' : undefined}>
              <YStack gap="$md">
                <FieldLabel htmlFor="login-email">Email</FieldLabel>
                <TextInput id="login-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(error)} aria-errormessage={error ? 'login-error-summary' : undefined} value={email} onChangeText={setEmail} />
                <FieldLabel htmlFor="login-password">Mot de passe</FieldLabel>
                <TextInput id="login-password" name="password" type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} aria-errormessage={error ? 'login-error-summary' : undefined} value={password} onChangeText={setPassword} />
                <Button type="button" onPress={() => void submit()} disabled={state === 'submitting'} aria-busy={state === 'submitting'}>
                  {state === 'submitting' ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
                <Button type="button" onPress={() => window.location.assign('/connexion/recuperation')}>Mot de passe oublié ?</Button>
              </YStack>
          </Form>
        </YStack>
      </Screen>
    </UiProvider>
  );
}
