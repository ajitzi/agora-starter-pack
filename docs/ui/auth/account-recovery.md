# AccountRecoveryScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/auth/account-recovery.md
```

## Implémentation

```text
packages/screens/auth/
├── account-recovery-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Comment un utilisateur retrouve-t-il l’accès à son compte sans intervention manuelle ?**

Cet écran est commun aux comptes authentifiés :

```text
Admin
Adhérent AMAP
```

Il ne doit pas dépendre du domaine métier auquel appartient l’utilisateur.

---

## 2. Quand cet écran est nécessaire

Il est principalement utile si la stratégie retenue est :

```text
email + mot de passe
```

Si la V1 utilise uniquement un lien magique :

```text
AccountRecoveryScreen
```

peut être supprimé ou réduit à un simple renvoi de lien de connexion.

---

## 3. Wireframe mobile — demande de récupération

```text
┌─────────────────────────────────┐
│ ← Récupérer mon accès           │
├─────────────────────────────────┤
│                                 │
│ Saisissez l’adresse email       │
│ associée à votre compte.        │
│                                 │
│ Email                           │
│ [ marie@example.fr          ]   │
│                                 │
│ [ Envoyer le lien ]             │
│                                 │
└─────────────────────────────────┘
```

---

## 4. Réponse anti-énumération

Toujours afficher une réponse générique :

```text
Si un compte correspond à cette
adresse, un email a été envoyé.
```

Ne jamais confirmer publiquement :

- qu’un email existe ;
- que le compte est admin ;
- que le compte est AMAP.

---

## 5. Flow complet

```text
Demande de récupération
        ↓
email signé à durée limitée
        ↓
nouveau mot de passe
        ↓
confirmation serveur
        ↓
retour LoginScreen
```

---

## 6. Wireframe nouveau mot de passe

```text
┌─────────────────────────────────┐
│ Nouveau mot de passe            │
├─────────────────────────────────┤
│                                 │
│ Nouveau mot de passe            │
│ [ •••••••••                 ]   │
│                                 │
│ Confirmer                       │
│ [ •••••••••                 ]   │
│                                 │
│ [ Enregistrer ]                 │
│                                 │
└─────────────────────────────────┘
```

---

## 7. Politique mot de passe

La politique doit être cohérente avec le backend.

Éviter des règles UI arbitraires ou excessives.

Exemple simple :

```text
12 caractères minimum
```

Si d’autres contraintes sont nécessaires, elles doivent être affichées avant la soumission.

---

## 8. Token sécurisé

Le lien doit utiliser un token :

- non prédictible ;
- à durée limitée ;
- à usage unique ;
- invalidé après succès.

---

## 9. Token expiré

```text
Ce lien n’est plus valide.

[ Demander un nouveau lien ]
```

---

## 10. Token déjà utilisé

Même message générique :

```text
Ce lien n’est plus valide.
```

Il n’est pas nécessaire d’exposer la raison précise.

---

## 11. Nouveau mot de passe invalide

Afficher les règles concernées à proximité du champ.

Ne pas vider les autres données du formulaire.

---

## 12. Confirmation incorrecte

```text
Les deux mots de passe
ne correspondent pas.
```

---

## 13. Après succès

```text
Mot de passe mis à jour.

[ Se connecter ]
```

Recommandation sécurité :

> demander une nouvelle authentification plutôt que connecter automatiquement.

---

## 14. Admin et AMAP

Le flow est identique dans les deux cas.

Le token de récupération cible un `UserAccount`, pas :

```text
Admin
```

ou :

```text
AmapMember
```

comme entité séparée.

---

## 15. Modèle conceptuel

```text
UserAccount
   │
   ├── credentials
   └── roles / permissions
```

La récupération agit sur :

```text
credentials
```

puis le login détermine ensuite les droits et la destination.

---

## 16. Relation avec Customer

La récupération n’utilise pas directement :

```text
Customer
```

Un compte AMAP peut être relié à un Customer, mais le flow auth reste générique.

---

## 17. API — demande

```text
POST /auth/recovery
```

Payload :

```ts
{
  email: string
}
```

Réponse toujours générique.

---

## 18. API — reset

```text
POST /auth/reset-password
```

Payload conceptuel :

```ts
{
  token: string
  newPassword: string
}
```

---

## 19. Sécurité serveur

Prévoir :

- rate limiting ;
- anti-enumération ;
- durée de vie courte du token ;
- usage unique ;
- invalidation après succès ;
- journalisation de sécurité raisonnable ;
- révocation éventuelle des sessions existantes après reset.

---

## 20. Faut-il révoquer les sessions ?

Recommandation :

```text
reset mot de passe
→
révoquer les sessions existantes
```

ou au minimum proposer une politique centralisée.

Cette décision appartient à l’architecture auth, pas au screen.

---

## 21. Variante lien magique

Si `LoginScreen` fonctionne uniquement par lien magique :

```text
Récupération
=
renvoyer un lien de connexion
```

Dans ce cas :

```text
docs/ui/auth/account-recovery.md
```

peut documenter un écran très simple ou être supprimé du périmètre.

---

## 22. États principaux

```text
ready
submitting
sent
resetReady
resetSubmitting
success
expired
error
```

---

## 23. Tablette / desktop

Formulaire centré avec largeur contenue.

---

## 24. Accessibilité

- email clairement labellé ;
- message générique de confirmation annoncé ;
- nouveau mot de passe et confirmation distincts ;
- erreurs liées au champ concerné ;
- lien de redemande accessible ;
- focus déplacé correctement en cas d’erreur.

---

## 25. Critères d’acceptation UX

L’écran est réussi si :

- admin et adhérent utilisent exactement le même flow ;
- aucune information sur l’existence ou le rôle d’un compte n’est divulguée ;
- un lien expiré peut être renouvelé facilement ;
- les règles de mot de passe sont compréhensibles ;
- le reset cible `UserAccount` et non un domaine métier ;
- le screen peut être simplifié ou supprimé proprement si l’auth passe au lien magique.

---

## 26. Structure de référence

```text
EMAIL
  ↓
DEMANDE DE RÉCUPÉRATION
  ↓
RÉPONSE GÉNÉRIQUE
  ↓
TOKEN SÉCURISÉ
  ↓
NOUVEAU MOT DE PASSE
  ↓
INVALIDATION DES ANCIENS ACCÈS
  ↓
RETOUR LOGIN
```
