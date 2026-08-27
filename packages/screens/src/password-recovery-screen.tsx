'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Button, FieldLabel, Form, Paragraph, Screen, ScreenHeader, SkipLink, TextInput, UiProvider, YStack } from '@project/ui';

type RecoveryState = 'ready' | 'submitting' | 'sent' | 'error';

export function PasswordRecoveryScreen() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<RecoveryState>('ready');
  const summary = useRef<ComponentRef<typeof YStack>>(null);
  const message = state === 'sent' ? 'Si un compte correspond à cette adresse, un email a été envoyé.' : state === 'error' ? 'La demande a échoué. Veuillez réessayer.' : null;

  useEffect(() => { if (message) summary.current?.focus(); }, [message]);

  async function submit(event?: { preventDefault?: () => void }) {
    event?.preventDefault?.();
    if (state === 'submitting') return;
    setState('submitting');
    try {
      const response = await fetch('/v1/auth/recovery', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) });
      setState(response.status === 202 ? 'sent' : 'error');
    } catch { setState('error'); }
  }

  return <UiProvider>
    <SkipLink />
    <Screen id="main-content" role="main" aria-labelledby="recovery-title">
      <ScreenHeader id="recovery-title" title="Récupérer mon accès" context="La Cabane du Merle" />
      <YStack maxWidth={480} width="100%" gap="$md">
        <YStack ref={summary} id="recovery-summary" tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} aria-live="polite">{message && <Paragraph>{message}</Paragraph>}</YStack>
        <Form onSubmit={submit}>
          <YStack gap="$md">
            <Paragraph>Saisissez l’adresse email associée à votre compte.</Paragraph>
            <FieldLabel htmlFor="recovery-email">Email</FieldLabel>
            <TextInput id="recovery-email" name="email" type="email" autoComplete="email" required value={email} onChangeText={setEmail} />
            <Button type="button" onPress={() => void submit()} disabled={state === 'submitting'} aria-busy={state === 'submitting'}>{state === 'submitting' ? 'Envoi en cours...' : 'Envoyer le lien'}</Button>
            <Button type="button" onPress={() => window.location.assign('/connexion')}>Retour à la connexion</Button>
          </YStack>
        </Form>
      </YStack>
    </Screen>
  </UiProvider>;
}
