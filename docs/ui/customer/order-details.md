# CustomerOrderDetailsScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/customer/order-details.md
```

## Implémentation

```text
packages/screens/customer/
├── customer-order-details-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Où en est ma commande et que puis-je encore modifier ?**

Accessible par lien sécurisé, sans compte obligatoire.

---

## 2. Wireframe mobile

```text
┌─────────────────────────────────┐
│ Votre commande                  │
│ Mercredi 26 août                │
├─────────────────────────────────┤
│                                 │
│ À PRÉPARER                      │
│                                 │
│ Votre commande a été acceptée.  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCUPÉRATION                    │
│ Marché Saint-Pierre             │
│ 17:00–19:00                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRODUITS                        │
│                                 │
│ Tomates                         │
│ Demandé : 1 kg                  │
│                                 │
│ Salade                          │
│ Demandé : 2                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOTAL ESTIMÉ                    │
│ 8,10 €                          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Modifiable jusqu’au             │
│ mardi 25 août · 18:00           │
│                                 │
│ [ Modifier la commande ]        │
│ [ Annuler la commande ]         │
│                                 │
└─────────────────────────────────┘
```

---

## 3. Statuts client

Traduction claire des statuts :

```text
À valider
À préparer
Préparée
Livrée
Annulée
```

---

## 4. À valider

Message :

```text
Votre commande a bien été reçue.
Le maraîcher doit encore la confirmer.
```

Modification/annulation possible si deadline non dépassée.

---

## 5. À préparer

```text
Votre commande a été acceptée
et sera préparée.
```

Avant deadline, le client peut encore modifier.

Toute modification d’une commande acceptée provoque :

```text
À préparer
→
À valider
```

et crée un diff visible côté admin.

---

## 6. Préparée

```text
Votre commande est prête.
```

Modification client bloquée, même si deadline théorique non dépassée.

Action d’annulation généralement bloquée côté client.

---

## 7. Livrée

État terminal.

Afficher quantités réelles et montant final.

---

## 8. Annulée

État terminal.

Afficher date d’annulation et éventuellement raison générique si prévue.

---

## 9. Quantités demandées vs préparées

Avant préparation :

```text
Demandé : 1 kg
```

Après :

```text
Demandé : 1 kg
Préparé : 920 g
```

---

## 10. Montant estimé vs final

Avant préparation :

```text
Total estimé
```

Après préparation :

```text
Total final
```

Correction manuelle éventuelle déjà incluse.

---

## 11. Modification

CTA :

```text
[ Modifier la commande ]
```

peut ouvrir une variante d’édition réutilisant le checkout.

Pas besoin d’un `CustomerOrderEditScreen` séparé en V1.

---

## 12. Règle de deadline

Afficher la date absolue :

```text
Modifiable jusqu’au
mardi 25 août · 18:00
```

Après :

```text
La période de modification est terminée.
```

---

## 13. Modification après acceptation

Confirmation :

```text
Modifier cette commande ?

Elle devra être de nouveau validée
par le maraîcher.

[ Continuer ]
```

---

## 14. Annulation

Avant deadline :

```text
[ Annuler la commande ]
```

Confirmation explicite.

Une commande annulée n’est jamais supprimée.

---

## 15. Récupération

Afficher :

- lieu ;
- date ;
- horaire ;
- instructions éventuelles.

---

## 16. Note client

Afficher la note envoyée si utile.

Pas les notes internes admin.

---

## 17. Sécurité

Le token sécurisé :

- non prédictible ;
- révocable si nécessaire ;
- ne donne accès qu’à cette commande.

Ne pas exposer `customerId`.

---

## 18. Expiration du lien

Le lien peut rester valide après livraison pour consultation.

Une expiration longue ou révocation manuelle est préférable à une expiration avant historique.

---

## 19. Projection

```ts
type CustomerOrderDetails = {
  order: {
    id: string
    status:
      | "to_validate"
      | "to_prepare"
      | "prepared"
      | "delivered"
      | "cancelled"

    recovery: {
      date: string
      label: string
      address?: string
      timeLabel?: string
    }

    lines: CustomerOrderLine[]

    estimatedTotal?: number
    finalTotal?: number
    note?: string
  }

  capabilities: {
    canModify: boolean
    canCancel: boolean
    modificationDeadline?: string
  }
}
```

---

## 20. API

Tokenisé :

```text
GET /orders/:token
PATCH /orders/:token
POST /orders/:token/cancel
```

Le `PATCH` vérifie version et capabilities.

---

## 21. Conflit

Si l’admin modifie simultanément :

```text
La commande a changé depuis
l’ouverture de cette page.

[ Recharger ]
```

---

## 22. États

```text
loading
ready
submitting
conflict
notFound
error
```

---

## 23. Accessibilité

- statut textuel ;
- deadline complète ;
- quantité demandée/préparée différenciée ;
- montant estimé/final différencié ;
- actions destructives clairement nommées.

---

## 24. Critères d’acceptation UX

L’écran est réussi si :

- aucun compte n’est requis ;
- le statut est compréhensible sans jargon ;
- les actions disponibles reflètent exactement deadline + statut ;
- une modification acceptée repasse à validation ;
- les quantités réelles apparaissent après préparation ;
- le montant final ne peut pas être confondu avec l’estimation.

---

## 25. Structure

```text
STATUT
  ↓
RÉCUPÉRATION
  ↓
PRODUITS
  ↓
QUANTITÉS DEMANDÉES / PRÉPARÉES
  ↓
TOTAL ESTIMÉ / FINAL
  ↓
DEADLINE
  ↓
MODIFIER / ANNULER SI AUTORISÉ
```
