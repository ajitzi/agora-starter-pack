'use client';

import { useEffect, useRef, useState } from 'react';
import { ACCOUNT_ROLES, Button, ConfirmDialog, FieldLabel, Form, Paragraph, RolePicker, Screen, ScreenHeader, SkipLink, TextInput, UiProvider, XStack, YStack } from '@project/ui';
import type { AccountRole } from '@project/ui';

type Account = { id: string; email: string; roles: string[]; active: boolean; version: number; lastActivityAt: string | null; activeSessions: number };
type PendingAction = 'roles' | 'activation' | 'oneSession' | 'allSessions' | null;

function createMutationKey() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function accountRoles(roles: string[]): AccountRole[] {
  return roles.filter((role): role is AccountRole => ACCOUNT_ROLES.includes(role as AccountRole));
}

export function AccountAdministrationScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [creationRoles, setCreationRoles] = useState<AccountRole[]>(['admin']);
  const [roleActionRoles, setRoleActionRoles] = useState<AccountRole[]>([]);
  const [selected, setSelected] = useState<Account | null>(null);
  const [pending, setPending] = useState<PendingAction>(null);
  const [sessionPosition, setSessionPosition] = useState(0);
  const [message, setMessage] = useState('Chargement des comptes...');
  const [submitting, setSubmitting] = useState(false);
  const createKey = useRef<string | null>(null);
  const mutationKey = useRef<string | null>(null);

  async function load(cursor?: string) {
    try {
      const response = await fetch(`/v1/admin/accounts${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`, { credentials: 'include' });
      if (!response.ok) throw new Error('session');
      const body = await response.json() as { accounts: Account[]; nextCursor: string | null };
      setAccounts((current) => cursor ? [...current, ...body.accounts] : body.accounts);
      setNextCursor(body.nextCursor);
      setMessage(body.accounts.length || cursor ? '' : 'Aucun compte à afficher.');
    } catch {
      setAccounts([]);
      setMessage('Votre session a expiré. Reconnectez-vous pour administrer les comptes.');
    }
  }

  useEffect(() => { void load(); }, []);

  async function csrfHeaders(key: string) {
    const response = await fetch('/v1/auth/csrf', { credentials: 'include' });
    if (!response.ok) throw new Error('session');
    const { csrfToken } = await response.json() as { csrfToken: string };
    return { 'content-type': 'application/json', 'x-csrf-token': csrfToken, 'idempotency-key': key };
  }

  async function create() {
    if (!email || creationRoles.length === 0) { setMessage('Indiquez un email et au moins un rôle.'); return; }
    setSubmitting(true);
    try {
      createKey.current ??= createMutationKey();
      const response = await fetch('/v1/admin/accounts', { method: 'POST', credentials: 'include', headers: await csrfHeaders(createKey.current), body: JSON.stringify({ email, roles: creationRoles }) });
      if (!response.ok) { setMessage(response.status === 401 || response.status === 403 ? 'Votre session a expiré. Reconnectez-vous.' : 'La création a été refusée. Vérifiez les données puis réessayez.'); return; }
      createKey.current = null;
      setEmail('');
      setCreationRoles(['admin']);
      await load();
      setMessage('Compte créé. Un lien de définition de mot de passe a été mis en file.');
    } catch {
      setMessage('La requête n’a pas abouti. Vérifiez votre connexion puis réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  async function confirm() {
    if (!selected || !pending) return;
    if (pending === 'roles' && roleActionRoles.length === 0) { setMessage('Sélectionnez au moins un rôle.'); return; }
    setSubmitting(true);
    try {
      mutationKey.current ??= createMutationKey();
      const isRevoke = pending === 'oneSession' || pending === 'allSessions';
      const response = await fetch(isRevoke ? `/v1/admin/accounts/${selected.id}/sessions/revoke` : `/v1/admin/accounts/${selected.id}`, {
        method: isRevoke ? 'POST' : 'PATCH',
        credentials: 'include',
        headers: await csrfHeaders(mutationKey.current),
        body: JSON.stringify(isRevoke
          ? { expectedVersion: selected.version, expectedActiveSessions: selected.activeSessions, scope: pending === 'oneSession' ? 'one' : 'all', sessionPosition }
          : pending === 'roles'
            ? { expectedVersion: selected.version, roles: roleActionRoles }
            : { expectedVersion: selected.version, active: !selected.active }),
      });
      if (!response.ok) { setMessage(response.status === 409 ? 'Conflit: rechargez les données avant de recommencer.' : 'La mutation a été refusée. Aucun changement n’a été appliqué.'); return; }
      mutationKey.current = null;
      setPending(null);
      setSelected(null);
      await load();
      setMessage('Modification enregistrée.');
    } catch {
      setMessage('La requête n’a pas abouti. Vérifiez votre connexion puis réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  const dialog = pending === 'roles' ? ['Modifier les rôles', 'Cette modification révoque les sessions et les liens de réinitialisation actifs.', 'Modifier les rôles'] : pending === 'activation' ? [selected?.active ? 'Désactiver le compte' : 'Réactiver le compte', selected?.active ? 'Les sessions et liens de réinitialisation actifs seront invalidés.' : 'Les anciennes sessions et anciens liens resteront invalides.', selected?.active ? 'Désactiver' : 'Réactiver'] : pending === 'oneSession' ? [`Révoquer la session ${sessionPosition}`, 'La session choisie sera immédiatement refusée.', 'Révoquer cette session'] : ['Révoquer toutes les sessions', 'Toutes les sessions actives seront immédiatement refusées.', 'Révoquer toutes les sessions'];

  return <UiProvider><SkipLink /><Screen id="main-content" role="main" aria-labelledby="accounts-title"><ScreenHeader id="accounts-title" title="Comptes et sessions" /><YStack gap="$lg"><Paragraph role="status">{message}</Paragraph>{nextCursor ? <Button type="button" disabled={submitting} onPress={() => { void load(nextCursor); }}>Charger les comptes suivants</Button> : null}<Form onSubmit={(event) => { event.preventDefault(); void create(); }}><YStack gap="$sm"><FieldLabel htmlFor="account-email">Email</FieldLabel><TextInput id="account-email" value={email} onChangeText={setEmail} inputMode="email" /><FieldLabel>Rôles</FieldLabel><RolePicker value={creationRoles} onChange={setCreationRoles} disabled={submitting} /><Button disabled={submitting} type="submit">Créer le compte</Button></YStack></Form><YStack gap="$md">{accounts.map((account) => <YStack key={account.id} gap="$xs" padding="$md" borderWidth={1} borderColor="$border-subtle" borderRadius="$sm"><Paragraph>{account.email}</Paragraph><Paragraph>{account.roles.join(', ')} · {account.active ? 'Actif' : 'Désactivé'} · {account.activeSessions} session(s) active(s)</Paragraph><Paragraph>{account.lastActivityAt ? `Dernière activité: ${new Date(account.lastActivityAt).toLocaleString('fr-FR')}` : 'Aucune activité enregistrée.'}</Paragraph><XStack gap="$sm" flexWrap="wrap"><Button type="button" disabled={submitting} onPress={() => { mutationKey.current = null; setSelected(account); setRoleActionRoles(accountRoles(account.roles)); setPending('roles'); }}>Rôles</Button><Button type="button" disabled={submitting} onPress={() => { mutationKey.current = null; setSelected(account); setPending('activation'); }}>{account.active ? 'Désactiver' : 'Réactiver'}</Button>{Array.from({ length: account.activeSessions }, (_, index) => <Button type="button" key={index} disabled={submitting} onPress={() => { mutationKey.current = null; setSelected(account); setSessionPosition(index + 1); setPending('oneSession'); }}>Révoquer session {index + 1}</Button>)}{account.activeSessions > 1 ? <Button type="button" disabled={submitting} onPress={() => { mutationKey.current = null; setSelected(account); setPending('allSessions'); }}>Révoquer toutes les sessions</Button> : null}</XStack></YStack>)}</YStack><ConfirmDialog open={Boolean(pending)} title={dialog[0]} detail={dialog[1]} confirmLabel={dialog[2]} disabled={submitting} onConfirm={() => { void confirm(); }} onCancel={() => { setPending(null); setSelected(null); }}>{pending === 'roles' ? <YStack gap="$xs"><FieldLabel>Rôles</FieldLabel><RolePicker value={roleActionRoles} onChange={setRoleActionRoles} disabled={submitting} /></YStack> : null}</ConfirmDialog></YStack></Screen></UiProvider>;
}
