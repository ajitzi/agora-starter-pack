'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Paragraph, Screen, ScreenHeader, SkipLink, UiProvider, YStack } from '@project/ui';

type LoginState = 'ready' | 'submitting' | 'success' | 'invalidCredentials' | 'error';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<LoginState>('ready');
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === 'invalidCredentials' || state === 'error') summary.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      <Screen asChild>
        <main id="main-content" aria-labelledby="login-title">
          <ScreenHeader id="login-title" title="Connexion" context="La Cabane du Merle" />
          <YStack maxWidth={480} width="100%" gap="$md">
            <div ref={summary} tabIndex={-1} role={error ? 'alert' : 'status'} aria-live="polite">
              {error ? <Paragraph>{error}</Paragraph> : state === 'success' ? <Paragraph>Connexion réussie.</Paragraph> : null}
            </div>
            <form onSubmit={submit} aria-describedby={error ? 'login-error-summary' : undefined}>
              <YStack gap="$md">
                <div id="login-error-summary" hidden={!error}>{error}</div>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(error)} aria-errormessage={error ? 'login-error-summary' : undefined} value={email} onChange={(event) => setEmail(event.target.value)} />
                <label htmlFor="login-password">Mot de passe</label>
                <input id="login-password" name="password" type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} aria-errormessage={error ? 'login-error-summary' : undefined} value={password} onChange={(event) => setPassword(event.target.value)} />
                <Button type="submit" disabled={state === 'submitting'} aria-busy={state === 'submitting'}>
                  {state === 'submitting' ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </YStack>
            </form>
          </YStack>
        </main>
      </Screen>
    </UiProvider>
  );
}
