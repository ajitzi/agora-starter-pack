# AdminSettingsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/settings.md
```

Implémentation :

```text
packages/screens/admin/settings/
├── admin-settings-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Où modifier les règles générales de l’exploitation ?**

Ce n’est pas un énorme formulaire.

C’est un **hub de paramètres**.

---

## 3. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Paramètres                    │
├─────────────────────────────────┤
│                                 │
│ EXPLOITATION                    │
│ Nom, coordonnées, adresse     > │
│                                 │
├─────────────────────────────────┤
│ COMMANDES                       │
│ Délais, paiements             > │
│                                 │
├─────────────────────────────────┤
│ AMAP                            │
│ Délais, substitutions, alertes> │
│                                 │
├─────────────────────────────────┤
│ NOTIFICATIONS                   │
│ Email, SMS, web push          > │
│                                 │
├─────────────────────────────────┤
│ DISTRIBUTION                    │
│ Points de retrait             > │
│                                 │
└─────────────────────────────────┘
```

---

## 4. Principe UX

Une entrée par groupe de règles.

Éviter :

```text
un écran avec 40 champs
```

La navigation doit garder les réglages compréhensibles et localisés.

---

## 5. Sections recommandées

```text
Exploitation
Commandes
AMAP
Notifications
Distribution
```

Éventuellement plus tard :

```text
Compte admin
Intégrations
Données / export
```

mais hors cœur V1.

---

## 6. Exploitation

Peut contenir :

- nom de l’exploitation ;
- téléphone ;
- email ;
- adresse ;
- fuseau horaire ;
- informations publiques éventuelles.

Un écran dédié pourra être ajouté si nécessaire.

---

## 7. Commandes

Ouvre :

```text
AdminOrderSettingsScreen
```

Résumé :

```text
Modification client jusqu’à J-1 · 18:00
4 moyens de paiement
```

---

## 8. AMAP

Ouvre :

```text
AdminAmapSettingsScreen
```

Résumé :

```text
Deadline J-1 · 18:00
2 substitutions max.
Alerte solde ≤ 3 paniers
```

---

## 9. Notifications

Ouvre :

```text
AdminNotificationSettingsScreen
```

Résumé :

```text
Email configuré
SMS non configuré
Web push actif
```

---

## 10. Distribution

Peut ouvrir :

```text
AdminRecoveryLocationListScreen
```

Résumé :

```text
3 points de retrait fixes
```

Marchés et tournées disposent déjà de leurs propres écrans.

---

## 11. Pas de réglages opérationnels ici

Ne pas gérer ici :

- disponibilité d’un produit ;
- composition AMAP d’une semaine ;
- occurrence de marché ;
- commande.

Ce sont des données opérationnelles, pas des paramètres globaux.

---

## 12. Valeurs résumées

Chaque carte peut montrer une ou deux valeurs utiles.

Pas besoin d’afficher tous les champs.

---

## 13. Statuts de configuration

Exemple :

```text
Notifications
⚠ SMS non configuré
```

Cela permet de repérer une configuration incomplète.

---

## 14. Aucun CTA sticky

C’est un écran de navigation.

Pas d’action globale `Enregistrer`.

---

## 15. Tablette / desktop

Deux colonnes de cartes :

```text
┌──────────────────────┬──────────────────────┐
│ Exploitation         │ Commandes            │
├──────────────────────┼──────────────────────┤
│ AMAP                 │ Notifications        │
├──────────────────────┼──────────────────────┤
│ Distribution         │                      │
└──────────────────────┴──────────────────────┘
```

---

## 16. Projection

```ts
type AdminSettingsOverview = {
  farm: {
    configured: boolean
    label?: string
  }

  orders: {
    modificationDeadlineLabel: string
    paymentMethodCount: number
  }

  amap: {
    deadlineLabel: string
    maxSubstitutions: number
    lowBalanceThreshold: number
  }

  notifications: {
    emailConfigured: boolean
    smsConfigured: boolean
    webPushConfigured: boolean
  }

  distribution: {
    fixedRecoveryLocationCount: number
  }
}
```

---

## 17. Query

```text
GET /admin/settings/overview
```

---

## 18. États

```text
loading
ready
error
```

---

## 19. Accessibilité

- chaque carte nommée clairement ;
- résumé non dépendant des icônes ;
- ordre logique ;
- cartes navigables au clavier ;
- état de configuration explicite.

---

## 20. Critères d’acceptation UX

L’écran est réussi si :

- chaque paramètre global a un emplacement évident ;
- il n’existe aucun bouton global ambigu ;
- les réglages opérationnels n’y sont pas mélangés ;
- une configuration incomplète est identifiable ;
- mobile reste court et tablet/desktop plus dense.

---

## 21. Structure de référence

```text
PARAMÈTRES
   ↓
EXPLOITATION
   ↓
COMMANDES
   ↓
AMAP
   ↓
NOTIFICATIONS
   ↓
DISTRIBUTION
```
