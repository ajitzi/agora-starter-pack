# AdminOrderDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/order-details.md
```

Implémentation :

```text
packages/screens/admin/orders/
├── order-details-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre rapidement à quatre questions :

> **Qui a commandé ?**  
> **Quoi ?**  
> **Où et quand récupérer ?**  
> **Quelle est la prochaine action à effectuer ?**

Il doit permettre de :

- consulter toutes les informations de la commande ;
- voir son statut ;
- voir les quantités demandées et réelles ;
- voir le prix appliqué ;
- modifier la commande ;
- accepter la commande ;
- préparer la commande ;
- marquer la commande comme livrée ;
- annuler ou reporter lorsque c’est pertinent ;
- consulter son historique.

---

# 3. Wireframe mobile — statut `À valider`

```text
┌─────────────────────────────────┐
│ ← Commande #1048           ⋯    │
│                                 │
│ À VALIDER                       │
├─────────────────────────────────┤
│                                 │
│ CLIENT                          │
│                                 │
│ Marie Dupont                    │
│ 06 12 34 56 78                  │
│ marie@example.fr                │
│                                 │
│ [ Appeler ]   [ Email ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCUPÉRATION                    │
│                                 │
│ Marché Saint-Pierre             │
│ Samedi 29 août                  │
│ 08:00 – 12:00                   │
│                                 │
│ Paiement prévu                  │
│ CB                              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRODUITS                        │
│                                 │
│ Tomates cœur de bœuf            │
│ 2 kg demandés                   │
│ 4 €/kg                          │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Courgettes                      │
│ 3 pièces                        │
│ 2 €/pièce                       │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Salade                          │
│ 1 pièce                         │
│ 1,50 €                          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMENTAIRE CLIENT              │
│                                 │
│ “Si possible des tomates        │
│ pas trop mûres.”                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉSUMÉ                          │
│                                 │
│ 3 produits                      │
│ Prix estimé : 15,50 €           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ HISTORIQUE                      │
│                                 │
│ Créée aujourd’hui à 10:14       │
│ Origine : Web                   │
│                                 │
│ [ Voir tout l’historique ]      │
│                                 │
├─────────────────────────────────┤
│ [ Modifier ]                    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Accepter la commande       │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

L’action primaire reste sticky en bas.

---

# 4. Header

Le header contient :

```text
← Commande #1048        ⋯
À VALIDER
```

Le menu `⋯` contient les actions rares ou potentiellement destructives.

Par exemple :

```text
Modifier
Annuler la commande
Voir l’historique
```

Il n’est pas nécessaire d’afficher toutes les actions simultanément dans le corps de page.

---

# 5. Statut

Le statut doit être immédiatement visible.

Exemples :

```text
À VALIDER
À PRÉPARER
PRÉPARÉE
LIVRÉE
ANNULÉE
```

Le statut ne doit jamais être identifiable uniquement par une couleur.

---

# 6. Bloc client

Informations :

- prénom / nom ;
- téléphone ;
- email éventuel.

Actions contextuelles possibles :

```text
Appeler
Email
```

Sur mobile natif plus tard, ces actions pourront ouvrir directement les applications système.

Sur web, elles peuvent utiliser `tel:` et `mailto:`.

---

# 7. Bloc récupération

Le bloc doit toujours afficher :

- mode de récupération ;
- lieu / occurrence ;
- date ;
- heure ou créneau.

Exemple :

```text
Marché Saint-Pierre
Samedi 29 août
08:00 – 12:00
```

Pour une tournée :

```text
Livraison
Tournée Nord

Village de Montville
Mercredi 26 août
Passage prévu l’après-midi
```

---

# 8. Produits — commande à valider

Chaque ligne montre :

```text
Nom produit
Quantité demandée
Prix unitaire
```

Exemple :

```text
Tomates cœur de bœuf

Demandé
2 kg

4 €/kg
```

À ce stade, aucune quantité réelle n’est encore nécessaire.

---

# 9. Produit `Selon disponibilité`

L’information doit être visible pendant la validation :

```text
Aubergines

Demandé
1 kg

Selon disponibilité ⚠

3,50 €/kg
```

Cela n’empêche pas le workflow normal : toutes les commandes doivent de toute façon être validées.

---

# 10. Commande modifiée par le client

Si le client a modifié la commande après une première acceptation, un bloc très visible doit apparaître en haut :

```text
⚠ Commande modifiée par le client

2 changements nécessitent votre validation.

[ Voir les changements ]
```

Le diff pourrait afficher :

```text
Tomates
2 kg → 3 kg

Salade
1 → supprimée
```

Cela doit être visible avant le bouton `Accepter`.

---

# 11. Statut `À préparer`

Le même écran évolue sans changer complètement de structure.

```text
← Commande #1048

À PRÉPARER
```

Les lignes de commande permettent maintenant la saisie réelle.

Exemple :

```text
Tomates cœur de bœuf

Demandé
≈ 2 kg

Poids réel
┌───────────────────────┐
│ 2,14              kg  │
└───────────────────────┘

4 €/kg

Montant
8,56 €
```

---

# 12. Produit vendu à l’unité

Exemple :

```text
Courgettes

Demandé
3 pièces

Quantité réelle

[ - ]      3      [ + ]

2 €/pièce

6,00 €
```

Si la quantité réelle correspond presque toujours à la quantité demandée, elle peut être préremplie.

---

# 13. Calcul du montant

Le montant est calculé à partir de :

```text
quantité réelle × prix unitaire
```

Exemple :

```text
2,14 kg × 4 €/kg = 8,56 €
```

Le maraîcher peut cependant ajuster le montant final manuellement.

Action secondaire :

```text
Modifier le montant
```

---

# 14. Résumé de préparation

En bas du bloc produit :

```text
SOUS-TOTAL

Tomates          8,56 €
Courgettes       6,00 €
Salade           1,50 €

Total final     16,06 €
```

Ce total peut rester provisoire tant que tous les poids réels ne sont pas saisis.

---

# 15. Action `Terminer la préparation`

Lorsque la commande est `À préparer` :

```text
┌───────────────────────────────┐
│ Terminer la préparation      │
└───────────────────────────────┘
```

Si un poids nécessaire manque :

```text
Impossible de terminer

Le poids réel des tomates doit être renseigné.
```

L’erreur doit pointer précisément vers le champ concerné.

---

# 16. Statut `Préparée`

Une fois terminée :

```text
PRÉPARÉE

✓ Commande prête
```

Les quantités deviennent principalement en lecture seule.

Exemple :

```text
Tomates

Demandé
≈ 2 kg

Préparé
2,14 kg

8,56 €
```

Action principale :

```text
Marquer comme livrée
```

Actions secondaires :

```text
Modifier la préparation
Reporter
Annuler
```

---

# 17. Confirmation de livraison

Utiliser une confirmation légère :

```text
Marquer cette commande comme livrée ?

Cette action finalisera la commande.

[ Annuler ]
[ Marquer comme livrée ]
```

Pour une commande AMAP, le texte peut préciser :

```text
Cette action consommera 1 panier
sur l’abonnement de Marie.
```

---

# 18. Statut `Livrée`

L’écran devient essentiellement consultatif.

```text
LIVRÉE

Livrée le samedi 29 août à 10:18
```

Afficher :

- quantité réelle ;
- prix final ;
- moyen de paiement prévu ;
- date de livraison ;
- historique.

Les actions sont réduites.

Une correction exceptionnelle peut rester accessible dans le menu admin.

---

# 19. Commande AMAP

Pour une commande AMAP :

```text
COMMANDE AMAP

Marie Dupont
Panier complet

18 paniers restants
```

Composition :

```text
PANIER

Tomates
Courgettes
Salade
Carottes

REMPLACEMENT

Aubergines
↓
Poivrons
```

L’écran doit mettre les **exceptions** en avant.

---

# 20. Cession AMAP

Exemple :

```text
PANIER CÉDÉ

Abonnement
Marie Dupont

Bénéficiaire
Paul Martin
06 00 00 00 00
```

La commande reste rattachée à l’abonnement de Marie.

---

# 21. Reporter une commande

Action depuis le menu ou l’état `Préparée`.

Ouverture d’un `Sheet` :

```text
Reporter la commande

Nouvelle date
[ 1 septembre ]

Mode de récupération
[ Retrait ferme ▼ ]

Créneau / occurrence
[ Mardi · 17:00 ▼ ]

Statut après report
● À préparer

[ Reporter ]
```

Le report est ensuite visible dans l’historique.

---

# 22. Annulation

Confirmation :

```text
Annuler cette commande ?

Cette action conservera la commande
dans l’historique.

Motif facultatif
[ ... ]

[ Retour ]
[ Annuler la commande ]
```

Une commande annulée n’est jamais supprimée.

---

# 23. Historique

Utiliser une timeline compacte.

```text
HISTORIQUE

24 août · 10:14
Commande créée
Client web

24 août · 11:06
Commande acceptée
Jean

28 août · 16:42
Préparation terminée
Jean
```

Action :

```text
Voir tout l’historique
```

peut ouvrir un `Sheet` ou une section dépliée.

---

# 24. Historique d’une modification client

Exemple :

```text
25 août · 09:32

Commande modifiée par Marie

Tomates
2 kg → 3 kg

Salade
1 → supprimée
```

Le système doit conserver le contexte de la modification.

---

# 25. Tablette portrait

L’écran reste principalement vertical.

Les blocs peuvent devenir plus compacts et certains contenus être juxtaposés.

```text
┌───────────────────────────────────────┐
│ Commande #1048                       │
├───────────────────┬───────────────────┤
│ Client            │ Récupération      │
│ Marie Dupont      │ Marché...         │
└───────────────────┴───────────────────┘

PRODUITS
...
```

---

# 26. Tablette paysage

Deux colonnes deviennent réellement intéressantes.

```text
┌────────────────────────────┬──────────────────────────┐
│ COMMANDE                   │ CONTEXTE                 │
│                            │                          │
│ Produits                   │ Client                   │
│ Quantités                  │ Récupération             │
│ Préparation                │ Paiement                 │
│                            │                          │
│ Total                      │ Historique               │
│                            │                          │
├────────────────────────────┴──────────────────────────┤
│                           [ Action principale ]       │
└───────────────────────────────────────────────────────┘
```

La colonne principale reste dédiée à la commande.

---

# 27. Desktop

Même structure que tablette paysage avec davantage d’espace.

Possibilité de garder la colonne contexte sticky :

```text
Commande / produits          │ Client / récupération
scroll                       │ sticky
```

Ce comportement reste une optimisation.

---

# 28. État de chargement

Skeleton par sections :

```text
████████████

CLIENT
████████████
████████

RÉCUPÉRATION
████████████

PRODUITS
████████████████
████████
```

Éviter un spinner central qui masque toute la structure.

---

# 29. Commande introuvable

```text
Commande introuvable

Cette commande n’existe pas ou
n’est plus accessible.

[ Retour aux commandes ]
```

---

# 30. Conflit de modification

Si le maraîcher modifie une commande pendant que le client la change :

```text
⚠ Cette commande vient d’être modifiée.

Les données affichées ne sont plus à jour.

[ Charger la nouvelle version ]
```

Aucune sauvegarde ne doit écraser silencieusement la nouvelle version.

---

# 31. Erreur lors d’une action

Exemple :

```text
La commande n’a pas pu être acceptée.

Votre connexion semble instable.

[ Réessayer ]
```

Le statut affiché reste l’ancien statut tant que le serveur n’a pas confirmé l’action.

---

# 32. Données nécessaires

Projection possible :

```ts
type OrderDetails = {
  id: string
  reference: string

  status: OrderStatus
  source: OrderSource

  customer: {
    id?: string
    name: string
    phone?: string
    email?: string
  }

  recovery: {
    method: string
    occurrenceId?: string
    label: string
    date: string
    timeRange?: string
  }

  paymentMethod?: string

  lines: OrderDetailsLine[]

  comment?: string

  totals: {
    estimated?: number
    final?: number
  }

  amap?: {
    subscriptionId: string
    basketType: "full" | "half"
    remainingBaskets: number
    substitutions: Substitution[]
    beneficiary?: {
      name: string
      phone?: string
    }
  }

  flags: {
    modifiedByCustomer?: boolean
  }

  historyPreview: OrderHistoryItem[]
}
```

---

# 33. `OrderDetailsLine`

```ts
type OrderDetailsLine = {
  id: string

  product: {
    id: string
    name: string
    unit: string
  }

  requestedQuantity?: number
  actualQuantity?: number

  unitPrice: number
  finalAmount?: number

  availabilityAtOrder?: string
}
```

Les informations historiques doivent rester basées sur le snapshot de la commande.

---

# 34. Actions autorisées

L’API peut idéalement fournir les actions actuellement possibles.

Exemple :

```ts
actions: {
  canEdit: boolean
  canAccept: boolean
  canPrepare: boolean
  canDeliver: boolean
  canCancel: boolean
  canReschedule: boolean
}
```

Cela évite de dupliquer toutes les règles métier de workflow dans l’écran.

L’UI adapte les boutons à ces capacités.

---

# 35. Composants `@project/ui`

L’écran utilise potentiellement :

```text
Screen
ScreenHeader
Section
Card
Badge
Button
StickyActionBar
NumericInput
QuantityStepper
ConfirmDialog
Sheet
Timeline
Alert
Skeleton
```

---

# 36. Composants métier

Dans :

```text
packages/domains/orders/ui/
```

bons candidats :

```text
OrderStatusBadge
OrderLines
OrderLinePreparation
OrderTotals
OrderHistory
OrderCustomerChangeDiff
```

Dans :

```text
packages/domains/customers/ui/
```

éventuellement :

```text
CustomerSummary
```

Dans :

```text
packages/domains/distribution/ui/
```

éventuellement :

```text
RecoverySummary
```

---

# 37. Composants spécifiques à l’écran

```text
packages/screens/admin/orders/
├── order-details-screen.tsx
├── components/
│   ├── order-details-header.tsx
│   ├── order-actions.tsx
│   ├── order-customer-section.tsx
│   ├── order-recovery-section.tsx
│   └── order-history-section.tsx
└── index.ts
```

N’extraire vers un domaine que lorsqu’un composant possède une réelle valeur de réutilisation.

---

# 38. Navigation

Depuis la liste :

```text
OrderListScreen
     ↓
OrderDetailsScreen
```

Depuis une préparation :

```text
PreparationScreen
     ↓
OrderDetailsScreen
```

Retour :

```text
OrderDetailsScreen
     ↓
écran d’origine
```

Il faut conserver autant que possible les filtres et la position de scroll de la liste précédente.

---

# 39. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le statut est identifiable immédiatement ;
- le client et le mode de récupération sont visibles sans recherche ;
- les produits demandés sont lisibles rapidement ;
- l’action suivante est évidente ;
- le maraîcher ne peut pas confondre quantité demandée et quantité réelle ;
- les exceptions AMAP sont fortement visibles ;
- une modification client ne peut pas passer inaperçue ;
- les actions destructives sont secondaires ;
- l’historique reste accessible sans surcharger l’écran ;
- la version mobile est entièrement utilisable à une main hors saisie de poids ;
- la tablette améliore la densité sans changer le workflow.

---

# 40. Structure de référence

```text
HEADER + STATUT
        ↓
CLIENT
        ↓
RÉCUPÉRATION
        ↓
PRODUITS / PRÉPARATION
        ↓
COMMENTAIRE
        ↓
TOTAL
        ↓
HISTORIQUE
        ↓
ACTION PRINCIPALE STICKY
```

Cette structure doit rester stable tout au long du cycle de vie de la commande, tandis que les champs et l’action principale évoluent selon son statut.
