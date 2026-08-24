# AmapBasketScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/amap/basket.md
```

## Implémentation

```text
packages/screens/amap/
├── amap-basket-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Que contient mon panier cette semaine et quelles modifications puis-je encore faire ?**

C’est l’équivalent membre de la gestion hebdomadaire admin, avec des capacités strictement limitées.

---

## 2. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Mon panier                    │
│ Mercredi 26 août                │
├─────────────────────────────────┤
│                                 │
│ Panier complet                  │
│                                 │
│ Modifiable jusqu’à              │
│ mardi 25 août · 18:00           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMPOSITION                     │
│                                 │
│ Tomates · 1 kg                  │
│                                 │
│ Aubergines · 500 g              │
│ [ Remplacer ]                   │
│                                 │
│ Salade · 1                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SUBSTITUTIONS                   │
│ 1 / 2 utilisées                 │
│                                 │
│ Aubergines                      │
│ → Poivrons · 500 g              │
│ [ Modifier ]                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RETRAIT                         │
│ Marché Saint-Pierre             │
│ [ Changer pour cette semaine ]  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ AUTRES ACTIONS                  │
│ [ Suspendre cette semaine ]     │
│ [ Céder ce panier ]             │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 3. Portée

Toujours afficher :

```text
Cette semaine uniquement
```

Les changements ne modifient jamais les préférences permanentes de l’abonnement.

---

## 4. Composition

Afficher le snapshot / panier hebdomadaire correspondant au type :

```text
full
half
```

Le membre ne modifie pas les quantités.

---

## 5. Substitutions

Le membre peut remplacer au maximum :

```text
N lignes
```

selon le paramètre global.

Les options viennent uniquement de la liste hebdomadaire configurée par le maraîcher.

---

## 6. Quantité de remplacement

La quantité est prédéfinie.

Le membre choisit :

```text
Aubergines
→
Poivrons
```

mais ne saisit pas :

```text
430 g
```

---

## 7. Pas d’équivalence tarifaire

Aucune notion de prix ou valeur équivalente à afficher.

---

## 8. Retrait

Le membre peut choisir uniquement les options compatibles avec cette date.

Le changement est un override hebdomadaire.

Il ne modifie pas son retrait habituel.

---

## 9. Suspension

Avant deadline :

```text
[ Suspendre cette semaine ]
```

Confirmation :

```text
Suspendre le panier du 26 août ?

Aucun panier ne sera décompté.

[ Annuler ]
[ Suspendre ]
```

---

## 10. Réactivation

Si suspendu et encore modifiable :

```text
[ Réactiver mon panier ]
```

---

## 11. Transfert

```text
[ Céder ce panier ]
```

Formulaire :

- nom bénéficiaire ;
- téléphone/email facultatif selon règle.

Le titulaire conserve l’abonnement.

La livraison consomme son panier.

---

## 12. Suspension et transfert

Incompatibles.

Si un transfert existe et le membre suspend :

```text
Le transfert sera annulé.
```

Confirmation explicite.

---

## 13. Deadline dépassée

L’écran devient lecture seule.

```text
La période de modification est terminée.
```

---

## 14. Préparé

Même avant deadline théorique :

```text
Votre panier est déjà préparé.
Les modifications ne sont plus possibles.
```

---

## 15. Livré

Lecture seule.

Afficher éventuellement :

```text
Panier récupéré
```

---

## 16. Draft local

Le membre modifie plusieurs éléments puis :

```text
[ Enregistrer ]
```

Recommandé plutôt que plusieurs mutations immédiates.

---

## 17. Conflit admin/membre

Si l’admin modifie la même semaine :

```text
Votre panier a été modifié depuis
l’ouverture de cette page.

[ Recharger ]
```

Pas d’écrasement silencieux.

---

## 18. Projection

```ts
type AmapBasketScreenData = {
  subscription: {
    basketType: "full" | "half"
  }

  delivery: {
    date: string
    status:
      | "scheduled"
      | "suspended"
      | "generated"
      | "prepared"
      | "delivered"

    deadline?: string
    recovery: {
      id: string
      label: string
    }

    basketLines: {
      productId: string
      productName: string
      quantity: number
      unit: string
      replacementOptions: {
        productId: string
        productName: string
        quantity: number
        unit: string
      }[]
    }[]

    substitutions: {
      sourceProductId: string
      replacementProductId: string
    }[]

    transfer?: {
      beneficiaryName: string
    }
  }

  maxSubstitutions: number

  capabilities: {
    canSuspend: boolean
    canResume: boolean
    canChangeRecovery: boolean
    canTransfer: boolean
    canSubstitute: boolean
  }
}
```

---

## 19. API

Conceptuellement :

```text
GET /amap/me/deliveries/:date
PUT /amap/me/deliveries/:date/override
```

---

## 20. États

```text
loading
ready
dirty
submitting
conflict
readOnly
error
```

---

## 21. Accessibilité

- date complète ;
- quantité avec unité ;
- substitutions annoncées comme “A remplacé B” ;
- limite `1 sur 2` annoncée ;
- état lecture seule expliqué ;
- action de suspension clairement destructive/réversible.

---

## 22. Critères d’acceptation UX

L’écran est réussi si :

- le membre voit exactement son panier ;
- aucune quantité n’est saisie manuellement ;
- les substitutions sont limitées à la liste autorisée ;
- suspension, transfert et retrait sont hebdomadaires uniquement ;
- la deadline et l’état préparé bloquent correctement ;
- toutes les modifications sont cohérentes avec l’ordre généré.

---

## 23. Structure

```text
DATE / TYPE
    ↓
DEADLINE
    ↓
COMPOSITION
    ↓
SUBSTITUTIONS
    ↓
RETRAIT
    ↓
SUSPENSION / TRANSFERT
    ↓
ENREGISTRER
```
