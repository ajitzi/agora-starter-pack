# LoginScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/auth/login.md
```

## Implémentation

```text
packages/screens/auth/
├── login-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Comment un utilisateur autorisé accède-t-il simplement à l’application ?**

Cet écran est commun aux comptes authentifiés, notamment :

```text
Admin
Adhérent AMAP
```

L’authentification n’appartient pas au domaine AMAP : elle appartient à la couche utilisateur / auth.

---

## 2. Principe d’architecture

Ne pas créer :

```text
AdminLoginScreen
AmapLoginScreen
```

si les deux utilisent le même mécanisme.

Préférer :

```text
LoginScreen
```

Le backend authentifie le compte puis détermine les rôles / permissions disponibles.

---

## 3. Redirection après connexion

Exemple simple :

```text
LoginScreen
   ↓
authentification
   ↓
rôles / permissions
   ↓
Admin
→ AdminTodayScreen

Adhérent AMAP
→ AmapHomeScreen
```

Si un même compte peut avoir plusieurs rôles plus tard, un choix de contexte pourra être ajouté après authentification.

Ne pas l’introduire en V1 sans besoin réel.

---

## 4. Stratégie recommandée

Choisir une seule stratégie V1.

Option classique :

```text
email + mot de passe
```

Alternative si l’infrastructure le supporte proprement :

```text
lien magique par email
```

Éviter de cumuler :

```text
mot de passe
+
code SMS
+
magic link
+
Google
```

sans besoin métier.

---

## 5. Wireframe mobile — email / mot de passe

```text
┌─────────────────────────────────┐
│ Connexion                       │
├─────────────────────────────────┤
│                                 │
│ Email                           │
│ [ marie@example.fr          ]   │
│                                 │
│ Mot de passe                    │
│ [ •••••••••                 ]   │
│                                 │
│ [ Se connecter ]                │
│                                 │
│ Mot de passe oublié ?           │
│                                 │
└─────────────────────────────────┘
```

---

## 6. Pas de sélection de rôle avant connexion

Ne pas demander :

```text
Je suis :
[ Admin ]
[ Adhérent AMAP ]
```

si le backend peut déterminer les droits du compte.

Cela évite une étape inutile et limite les erreurs.

---

## 7. Compte admin

Après connexion d’un compte admin :

```text
→ AdminTodayScreen
```

ou retour vers la route admin initialement demandée.

---

## 8. Compte adhérent AMAP

Après connexion d’un adhérent :

```text
→ AmapHomeScreen
```

ou retour vers le lien profond demandé, par exemple :

```text
AmapBasketScreen
```

---

## 9. Compte avec plusieurs rôles

Si cela devient possible :

```text
admin + membre AMAP
```

ne pas forcément multiplier les comptes.

Le modèle peut supporter :

```text
UserAccount
  └── roles[]
```

Puis afficher éventuellement un sélecteur de contexte après login.

Hors nécessité V1.

---

## 10. Relation avec Customer

Important :

```text
Customer
≠
UserAccount
```

Un client classique peut exister sans compte.

Un adhérent AMAP possède généralement :

```text
Customer
+
UserAccount
+
AmapSubscription
```

L’authentification ne doit donc pas être couplée au modèle `Customer`.

---

## 11. Inscription

La V1 AMAP ne prévoit pas d’inscription autonome.

Donc ne pas afficher automatiquement :

```text
Créer un compte
```

Le compte peut être créé / invité dans le cadre d’un abonnement AMAP ou de l’administration.

---

## 12. Erreur d’identifiants

Message générique :

```text
Email ou mot de passe incorrect.
```

Ne pas révéler si :

- l’email existe ;
- le compte est admin ;
- le compte est membre AMAP.

---

## 13. Compte sans accès actif

Un compte authentifié peut éventuellement ne plus avoir de contexte actif.

Exemple adhérent AMAP sans abonnement actif :

```text
Votre compte est accessible,
mais aucun abonnement AMAP actif
n’est associé actuellement.
```

Le traitement exact dépend des permissions retournées par le backend.

---

## 14. Lien magique — variante

Si cette stratégie est choisie :

```text
Email
[ marie@example.fr ]

[ Recevoir un lien de connexion ]
```

Puis :

```text
Consultez votre boîte email.
```

Dans ce cas, `AccountRecoveryScreen` peut devenir inutile ou être réduit à un flow de renvoi de lien.

---

## 15. Session

Prévoir :

- session durable raisonnable ;
- renouvellement sécurisé ;
- déconnexion explicite ;
- expiration gérée proprement ;
- retour à la route initiale après reconnexion lorsque possible.

---

## 16. Mot de passe oublié

Avec une auth par mot de passe :

```text
[ Mot de passe oublié ? ]
```

ouvre :

```text
AccountRecoveryScreen
```

---

## 17. API — exemple mot de passe

```text
POST /auth/login
```

Réponse conceptuelle :

```ts
type LoginResult = {
  user: {
    id: string
    roles: string[]
  }

  defaultDestination:
    | "admin"
    | "amap"
}
```

Le détail des tokens/sessions reste infrastructurel.

---

## 18. API — variante lien magique

```text
POST /auth/magic-link
```

---

## 19. États principaux

```text
ready
submitting
success
invalidCredentials
error
```

---

## 20. Tablette / desktop

Garder un formulaire centré et contenu.

Pas besoin d’occuper toute la largeur.

---

## 21. Accessibilité

- email et mot de passe explicitement labellés ;
- erreurs annoncées ;
- bouton principal clair ;
- lien de récupération accessible au clavier ;
- gestion correcte du focus après erreur ;
- ne pas utiliser uniquement les placeholders comme labels.

---

## 22. Critères d’acceptation UX

L’écran est réussi si :

- admin et adhérent utilisent le même écran ;
- aucun rôle n’a besoin d’être sélectionné avant authentification ;
- la destination après login dépend des permissions ;
- les erreurs ne révèlent pas l’existence d’un compte ;
- les liens profonds sont préservés ;
- aucune inscription AMAP libre n’est suggérée si elle n’existe pas ;
- une seule stratégie d’authentification V1 est clairement assumée.

---

## 23. Structure de référence

```text
IDENTIFIANT
   ↓
AUTHENTIFICATION
   ↓
VALIDATION SERVEUR
   ↓
RÔLES / PERMISSIONS
   ↓
REDIRECTION CONTEXTUELLE
   ↓
RÉCUPÉRATION SI NÉCESSAIRE
```
