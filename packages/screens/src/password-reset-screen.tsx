'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Button, FieldLabel, Form, Paragraph, Screen, ScreenHeader, SkipLink, TextInput, UiProvider, YStack } from '@project/ui';

type ResetState = 'ready' | 'submitting' | 'success' | 'invalidToken' | 'invalidPassword' | 'error';

export function PasswordResetScreen() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [state, setState] = useState<ResetState>('ready');
  const [detail, setDetail] = useState('');
  const summary = useRef<ComponentRef<typeof YStack>>(null);
  const message = state === 'success' ? 'Mot de passe mis à jour.' : state === 'invalidToken' ? 'Ce lien n’est plus valide. Demandez un nouveau lien.' : state === 'invalidPassword' ? detail : state === 'error' ? 'La mise à jour a échoué. Veuillez réessayer.' : null;

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('token') ?? '';
    setToken(value);
    if (!/^[0-9a-f-]{36}\.[A-Za-z0-9_-]{43}$/iu.test(value)) setState('invalidToken');
  }, []);

  useEffect(() => { if (message) summary.current?.focus(); }, [message]);

  async function submit() {
    if (state === 'submitting') return;
    setState('submitting');
    try {
      const response = await fetch('/v1/auth/reset-password', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, password, confirmation }) });
      if (response.status === 204) {
        window.history.replaceState({}, '', '/connexion/reinitialiser');
        setPassword('');
        setConfirmation('');
        setState('success');
      } else if (response.status === 400) setState('invalidToken');
      else if (response.status === 422) {
        const problem: { detail?: string } = await response.json();
        setDetail(problem.detail ?? 'La phrase de passe est invalide.');
        setState('invalidPassword');
      } else setState('error');
    } catch { setState('error'); }
  }

  return <UiProvider>
    <SkipLink />
    <Screen id="main-content" role="main" aria-labelledby="reset-title">
      <ScreenHeader id="reset-title" title="Nouveau mot de passe" context="La Cabane du Merle" />
      <YStack maxWidth={480} width="100%" gap="$md">
        <YStack ref={summary} id="reset-summary" tabIndex={-1} role={state === 'invalidToken' || state === 'invalidPassword' || state === 'error' ? 'alert' : 'status'} aria-live="polite">{message && <Paragraph>{message}</Paragraph>}</YStack>
        {state === 'success' ? <Button onPress={() => window.location.assign('/connexion')}>Se connecter</Button> : state === 'invalidToken' ? <Button onPress={() => window.location.assign('/connexion/recuperation')}>Demander un nouveau lien</Button> : <Form aria-describedby={message ? 'reset-summary' : undefined}>
          <YStack gap="$md">
            <Paragraph>Choisissez une phrase de passe de 12 à 128 caractères. Les phrases de passe courantes sont refusées.</Paragraph>
            <FieldLabel htmlFor="reset-password">Nouvelle phrase de passe</FieldLabel>
            <TextInput id="reset-password" name="password" type="password" autoComplete="new-password" required value={password} onChangeText={setPassword} aria-invalid={state === 'invalidPassword'} aria-errormessage={state === 'invalidPassword' ? 'reset-summary' : undefined} />
            <FieldLabel htmlFor="reset-confirmation">Confirmer la phrase de passe</FieldLabel>
            <TextInput id="reset-confirmation" name="confirmation" type="password" autoComplete="new-password" required value={confirmation} onChangeText={setConfirmation} aria-invalid={state === 'invalidPassword'} aria-errormessage={state === 'invalidPassword' ? 'reset-summary' : undefined} />
            <Button type="button" onPress={() => void submit()} disabled={state === 'submitting'} aria-busy={state === 'submitting'}>{state === 'submitting' ? 'Enregistrement...' : 'Enregistrer'}</Button>
          </YStack>
        </Form>}
      </YStack>
    </Screen>
  </UiProvider>;
}
