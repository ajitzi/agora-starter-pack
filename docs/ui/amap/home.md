# AmapHomeScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/amap/home.md
```

## Implémentation

```text
packages/screens/amap/
├── amap-home-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Quel est mon prochain panier et que puis-je encore faire cette semaine ?**

C’est le tableau de bord membre AMAP.

---

## 2. Wireframe mobile

```text
┌─────────────────────────────────┐
│ Bonjour Marie                   │
├─────────────────────────────────┤
│                                 │
│ PROCHAIN PANIER                 │
│                                 │
│ Mercredi 26 août                │
│ Panier complet                  │
│                                 │
│ Marché Saint-Pierre             │
│                                 │
│ Modifiable jusqu’à              │
│ mardi 25 août · 18:00           │
│                                 │
│ [ Voir mon panier ]             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CETTE SEMAINE                   │
│                                 │
│ [ Suspendre ]                   │
│ [ Changer de retrait ]          │
│ [ Céder mon panier ]            │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MON ABONNEMENT                  │
│                                 │
│ 8 paniers restants              │
│ Panier complet                  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ À VENIR                         │
│                                 │
│ 2 septembre                     │
│ 9 septembre                     │
│                                 │
└─────────────────────────────────┘
```

---

## 3. Informations prioritaires

```text
PROCHAINE DATE
   ↓
TYPE DE PANIER
   ↓
RETRAIT
   ↓
DEADLINE
   ↓
ACTION CETTE SEMAINE
   ↓
SOLDE
```

---

## 4. Solde

Afficher clairement :

```text
8 paniers restants
```

Si faible :

```text
⚠ 2 paniers restants
```

Si zéro :

```text
Aucun panier restant
```

---

## 5. Prochaine livraison

Doit tenir compte de :

- suspension ;
- override ;
- prochaine date éligible ;
- abonnement actif.

---

## 6. Deadline

Avant :

```text
Modifiable jusqu’au
mardi 25 août · 18:00
```

Après :

```text
La période de modification est terminée.
```

---

## 7. Actions semaine

Avant deadline :

```text
Suspendre
Changer de retrait
Céder mon panier
Voir / choisir substitutions
```

Ces actions peuvent être regroupées derrière `AmapBasketScreen` si l’accueil devient trop chargé.

---

## 8. Recommandation

Sur l’accueil :

```text
[ Voir mon panier ]
```

CTA principal.

Les actions détaillées vivent dans `AmapBasketScreen`.

---

## 9. Semaine suspendue

Afficher :

```text
Panier suspendu cette semaine

Aucun panier ne sera décompté.
```

CTA :

```text
[ Réactiver cette semaine ]
```

si encore autorisé.

---

## 10. Panier transféré

Afficher :

```text
Panier cédé à Paul Martin
```

Le titulaire reste propriétaire de l’abonnement.

---

## 11. Panier généré

Le membre n’a pas besoin de comprendre la notion technique de commande générée.

On peut afficher :

```text
Panier confirmé pour cette semaine
```

---

## 12. Préparé

```text
Votre panier est prêt.
```

À ce stade, modifications bloquées.

---

## 13. Livré

Après livraison :

```text
Panier récupéré
7 paniers restants
```

Le solde est déjà décrémenté côté serveur.

---

## 14. Historique

V1 peut afficher uniquement quelques prochaines dates.

Pas besoin d’un écran historique complet si non demandé.

---

## 15. Projection

```ts
type AmapHome = {
  member: {
    displayName: string
  }

  subscription: {
    basketType: "full" | "half"
    remainingBaskets: number
    active: boolean
  }

  nextDelivery?: {
    date: string
    status:
      | "scheduled"
      | "suspended"
      | "generated"
      | "prepared"
      | "delivered"

    recoveryLabel: string
    deadline?: string
    transferredTo?: string
  }

  upcomingDates: string[]

  actions: {
    canManageNextDelivery: boolean
  }
}
```

---

## 16. API

```text
GET /amap/me/home
```

---

## 17. États

```text
loading
ready
noActiveSubscription
error
```

---

## 18. Accessibilité

- prochaine date complète ;
- solde annoncé en texte ;
- deadline complète ;
- état suspendu/transféré/prêt textuel ;
- CTA principal clairement identifié.

---

## 19. Critères d’acceptation UX

L’écran est réussi si :

- le membre comprend en moins de 5 secondes son prochain panier ;
- le solde est évident ;
- la deadline est visible ;
- une suspension ne peut pas être confondue avec une consommation ;
- `Voir mon panier` mène aux actions hebdomadaires.

---

## 20. Structure

```text
PROCHAIN PANIER
     ↓
DATE / RETRAIT
     ↓
DEADLINE
     ↓
CTA VOIR MON PANIER
     ↓
ÉTAT CETTE SEMAINE
     ↓
SOLDE ABONNEMENT
```
