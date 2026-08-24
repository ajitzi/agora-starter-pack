# AdminPreparationScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/preparation.md
```

Implémentation :

```text
packages/screens/admin/preparation/
├── preparation-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre immédiatement à :

> **Qu’est-ce que je dois préparer pour cette activité ?**

puis :

> **Où en suis-je ?**

Il doit permettre de :

- voir l’activité concernée ;
- connaître le nombre de commandes ;
- voir la progression globale ;
- connaître les quantités agrégées à préparer ;
- distinguer panier AMAP et commandes complémentaires ;
- repérer les exceptions ;
- voir les commandes individuellement ;
- lancer ou reprendre la préparation séquentielle.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marché Saint-Pierre      ⋯    │
│ Samedi 29 août · 08:00–12:00    │
├─────────────────────────────────┤
│                                 │
│ 13 / 18 préparées               │
│ ███████████████░░░░░            │
│                                 │
│ 5 commandes restantes           │
│                                 │
│ [ Global ]   [ Commandes ]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PANIERS AMAP                    │
│                                 │
│ 11 paniers                      │
│ 4 demi-paniers                  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ À PRÉPARER                      │
│                                 │
│ Tomates                         │
│ ≈ 29 kg                         │
│ 18 kg paniers + 11 kg extras    │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Courgettes                      │
│ ≈ 18 kg                         │
│ 10 kg paniers + 8 kg extras     │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Salades                         │
│ 24                              │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Carottes                        │
│ 16 bottes                       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ EXCEPTIONS                      │
│                                 │
│ ⚠ 4 substitutions AMAP         │
│ ⚠ 1 panier cédé                 │
│                                 │
│ [ Voir les exceptions ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Continuer la préparation   │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

L’action principale reste sticky.

---

# 4. Header

Le header indique immédiatement le contexte :

```text
← Marché Saint-Pierre
Samedi 29 août · 08:00–12:00
```

Pour une tournée :

```text
← Tournée Nord
Mercredi 26 août · départ 14:00
```

Le menu `⋯` peut contenir les actions rares :

```text
Voir l’occurrence
Voir les commandes
Clôturer l’activité
```

`Clôturer` ne doit apparaître que lorsque le workflow le permet.

---

# 5. Progression

La progression est très visible :

```text
13 / 18 préparées
███████████████░░░░

5 commandes restantes
```

Le chiffre absolu est plus important que le pourcentage.

Lorsque tout est prêt :

```text
18 / 18 préparées

✓ Toutes les commandes sont prêtes
```

---

# 6. Onglets

Deux vues principales :

```text
[ Global ] [ Commandes ]
```

`Global` est la vue par défaut.

Elle répond à :

> **Quelle quantité totale dois-je préparer ?**

`Commandes` répond à :

> **Quelles commandes me restent-elles à traiter ?**

Je n’ajouterais pas davantage d’onglets en V1.

---

# 7. Bloc AMAP

S’il y a des commandes AMAP :

```text
PANIERS AMAP

11 paniers
4 demi-paniers
```

L’objectif est d’aider à anticiper la préparation globale.

Si l’activité ne contient aucun panier AMAP, cette section disparaît complètement.

---

# 8. Agrégation produits

La partie essentielle de la vue `Global`.

Exemple :

```text
Tomates
≈ 29 kg

18 kg paniers
11 kg commandes complémentaires
```

On peut simplifier l’affichage principal :

```text
Tomates          ≈ 29 kg
```

et garder le détail en dessous, plus discret.

---

# 9. Panier vs extras

Cette distinction est utile pour comprendre d’où vient la quantité.

Exemple :

```text
Tomates
≈ 29 kg

Paniers        ≈ 18 kg
Extras         ≈ 11 kg
```

ou sur mobile :

```text
18 kg paniers + 11 kg extras
```

Le terme `Extras` désigne ici les produits commandés en dehors de la composition standard des paniers.

---

# 10. Attention aux demi-paniers

Pour les demi-paniers, ne pas forcer l’interface à afficher des divisions absurdes.

Éviter :

```text
7,5 salades
```

Le système peut plutôt afficher :

```text
Salades
15 à préparer pour les paniers
```

si la composition hebdomadaire fournit directement une quantité opérationnelle.

Le modèle métier ne doit pas obliger l’UI à calculer naïvement `panier / 2`.

---

# 11. Produits au poids

Pour les produits au poids, les quantités agrégées peuvent être approximatives :

```text
Tomates
≈ 29 kg
```

Le signe `≈` est important.

On ne prétend pas que la préparation réelle fera exactement 29 kg.

---

# 12. Produits à l’unité

Exemple :

```text
Salades
24
```

ou :

```text
Carottes
16 bottes
```

Toujours afficher explicitement l’unité.

---

# 13. Ordre des produits

Je privilégierais un ordre pratique.

Par défaut :

1. composition des paniers ;
2. volumes les plus importants ;
3. extras.

Mais mieux encore, à terme, le maraîcher pourrait disposer d’un ordre de préparation configuré.

Pour V1, rester simple :

```text
ordre de composition / catalogue
```

ou ordre alphabétique cohérent.

---

# 14. Exceptions

La vue globale ne doit pas noyer les exceptions.

Exemple :

```text
EXCEPTIONS

⚠ 4 substitutions AMAP
⚠ 1 panier cédé

[ Voir les exceptions ]
```

Tap sur `Voir les exceptions` ouvre un `Sheet` ou développe la section.

---

# 15. Détail des substitutions

```text
SUBSTITUTIONS

Marie Dupont
Aubergines → Poivrons

Paul Martin
Courgettes → Betteraves

Lucie Bernard
Aubergines → Poivrons
```

On peut aussi agréger :

```text
Aubergines retirées : 3
Poivrons ajoutés : 3
```

L’idéal est probablement d’offrir les deux lectures :

- impact global ;
- détail par commande.

---

# 16. Cession AMAP

Exemple :

```text
PANIER CÉDÉ

Marie Dupont
→ Paul Dupont

1 panier
```

La cession est surtout importante pendant la remise du panier.

Elle est moins critique pour la préparation elle-même, mais doit rester visible.

---

# 17. Vue `Commandes`

Wireframe mobile :

```text
┌─────────────────────────────────┐
│ [ Global ]   [ Commandes ]      │
├─────────────────────────────────┤
│                                 │
│ 18 commandes                    │
│                                 │
│ À FAIRE · 5                     │
│                                 │
│ ○ Marie Dupont                  │
│   Panier AMAP                   │
│   1 substitution                │
│                                 │
│ ○ Paul Martin                   │
│   4 produits                    │
│                                 │
│ ○ Lucie Bernard                 │
│   Demi-panier                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRÉPARÉES · 13                  │
│                                 │
│ ✓ Antoine Durand                │
│   3 produits                    │
│                                 │
│ ✓ Julie Martin                  │
│   Panier AMAP                   │
│                                 │
└─────────────────────────────────┘
```

Les commandes non préparées sont toujours en premier.

---

# 18. Commande avec exception

Dans la liste :

```text
○ Marie Dupont
  Panier AMAP

  ⚠ 1 substitution
```

ou :

```text
○ Paul Martin
  4 produits

  ⚠ Note client
```

Cela permet de repérer les commandes qui demanderont plus d’attention.

---

# 19. Commandes préparées

Les commandes terminées restent visibles, mais visuellement secondaires :

```text
✓ Antoine Durand
  3 produits
```

L’utilisateur doit pouvoir les rouvrir si nécessaire.

---

# 20. Action principale

Si rien n’a été commencé :

```text
[ Commencer la préparation ]
```

Si certaines commandes sont déjà prêtes :

```text
[ Continuer la préparation ]
```

L’action ouvre :

```text
AdminPreparationRunScreen
```

sur la première commande encore à préparer.

---

# 21. Choix de la prochaine commande

Par défaut, l’ordre peut être :

```text
ordre de récupération
→ commandes AMAP / classiques selon organisation
→ ordre de création
```

Mais pour une occurrence unique comme un marché, je privilégierais un ordre stable et prévisible.

Par exemple :

```text
ordre alphabétique du client
```

ou ordre défini par la liste de préparation.

L’important est de ne pas changer arbitrairement d’ordre pendant la session.

---

# 22. Commandes non validées

Cas problématique : une activité approche mais certaines commandes sont encore `À valider`.

Exemple :

```text
⚠ 2 commandes ne sont pas encore validées

Elles ne peuvent pas être préparées.

[ Les valider ]
```

Cette alerte doit apparaître avant les quantités globales.

---

# 23. Effet sur les agrégats

Les commandes `À valider` ne devraient probablement **pas être incluses** dans le total officiel `À préparer`, ou doivent être clairement distinguées.

Recommandation :

```text
À préparer
29 kg

En attente de validation
+ 4 kg potentiels
```

Cela évite de mélanger commande confirmée et demande encore incertaine.

---

# 24. Activité imminente

Exemple :

```text
⚠ Départ dans 30 min

5 commandes restent à préparer.
```

Cette alerte passe immédiatement sous le header.

---

# 25. Activité complètement préparée

```text
✓ Tout est prêt

18 / 18 commandes préparées
```

L’action principale peut devenir :

```text
[ Voir les commandes ]
```

et éventuellement, selon l’heure :

```text
[ Passer à la distribution ]
```

Ne pas lancer automatiquement la clôture.

---

# 26. Activité sans commande

État vide :

```text
Aucune commande pour ce marché.

Marché Saint-Pierre
Samedi 29 août

Il n’y a rien à préparer.
```

Pas besoin d’afficher une longue interface vide.

---

# 27. Tablette portrait

La vue globale peut commencer à utiliser deux colonnes.

```text
┌──────────────────────────────────────────┐
│ Marché Saint-Pierre                     │
│ 13 / 18 préparées                       │
├─────────────────────┬────────────────────┤
│ PANIERS             │ EXCEPTIONS         │
│ 11 paniers          │ 4 substitutions    │
│ 4 demi-paniers      │ 1 cession          │
├─────────────────────┴────────────────────┤
│ À PRÉPARER                               │
│                                          │
│ Tomates        29 kg                     │
│ Courgettes     18 kg                     │
│ Salades        24                        │
│ Carottes       16 bottes                 │
└──────────────────────────────────────────┘
```

---

# 28. Tablette paysage

C’est probablement le format idéal pour cet écran.

```text
┌──────────────────────────────┬────────────────────────┐
│ À PRÉPARER                   │ COMMANDES / EXCEPTIONS │
│                              │                        │
│ Tomates      29 kg           │ 5 restantes           │
│ Courgettes   18 kg           │                        │
│ Salades      24              │ Marie Dupont          │
│ Carottes     16 bottes       │ ⚠ substitution        │
│                              │                        │
│                              │ Paul Martin            │
│                              │ 4 produits             │
│                              │                        │
└──────────────────────────────┴────────────────────────┘
```

Le maraîcher peut poser la tablette sur un plan de travail et garder la synthèse visible.

---

# 29. Desktop

Même principe que tablette paysage.

On peut afficher :

- agrégats à gauche ;
- progression et commandes restantes à droite ;
- sidebar admin.

Je n’introduirais pas une table complexe spécifique desktop.

---

# 30. Actualisation

Comme plusieurs actions peuvent faire évoluer la préparation, l’écran doit se rafraîchir au retour depuis `AdminPreparationRunScreen`.

Exemple :

```text
13 / 18
   ↓
préparation de 2 commandes
   ↓
retour
   ↓
15 / 18
```

Les agrégats restants peuvent également être recalculés.

---

# 31. Agrégats : total ou restant ?

Afficher en priorité le **total nécessaire pour l’activité**, pas uniquement ce qui reste.

Exemple :

```text
Tomates
≈ 29 kg au total
```

et éventuellement :

```text
≈ 8 kg restent à préparer
```

si le système sait l’estimer correctement.

La notion de « reste à préparer » peut devenir difficile avec les commandes au poids réel, donc elle ne doit pas introduire une fausse précision.

---

# 32. Chargement

Skeleton structuré :

```text
████████████████
████████

PANIERS
████████

À PRÉPARER

████████        █████
████████        █████
████████        █████
```

Pas de spinner global si possible.

---

# 33. Erreur

```text
Impossible de charger la préparation.

[ Réessayer ]
```

Si seule la section exceptions échoue, la synthèse principale reste utilisable.

---

# 34. Conflits

La préparation peut évoluer depuis un autre appareil.

Si une commande est préparée ailleurs :

- mettre à jour silencieusement la progression si possible ;
- ne pas interrompre l’utilisateur sans raison.

En revanche, si la commande actuellement ouverte ailleurs change, le conflit sera traité dans `AdminPreparationRunScreen`.

---

# 35. Projection de données

Exemple :

```ts
type PreparationOverview = {
  occurrence: {
    id: string
    type: "market" | "tour" | "pickup"
    name: string
    date: string
    timeRange?: string
  }

  progress: {
    totalOrders: number
    preparedOrders: number
    pendingValidationOrders: number
  }

  amap?: {
    fullBaskets: number
    halfBaskets: number
  }

  products: PreparationProductSummary[]

  exceptions: {
    substitutions: number
    transfers: number
    customerNotes: number
  }

  orders: PreparationOrderSummary[]
}
```

---

# 36. Résumé produit

```ts
type PreparationProductSummary = {
  productId: string
  label: string
  unit: string

  totalRequested?: number

  fromAmap?: number
  fromExtras?: number

  approximate: boolean
}
```

`approximate` permet notamment d’afficher :

```text
≈ 29 kg
```

---

# 37. Résumé commande

```ts
type PreparationOrderSummary = {
  orderId: string

  customerName: string

  type:
    | "classic"
    | "amap_full"
    | "amap_half"

  status:
    | "pending_validation"
    | "to_prepare"
    | "prepared"

  lineCount?: number

  flags: {
    substitution?: boolean
    transfer?: boolean
    customerNote?: boolean
  }
}
```

---

# 38. Query

Conceptuellement :

```text
GET /admin/preparation/:occurrenceId
```

La réponse est une projection dédiée.

Elle peut assembler :

- commandes ;
- AMAP ;
- produits ;
- distribution.

C’est normal : l’écran traverse plusieurs domaines.

---

# 39. Composants `@project/ui`

Possibles :

```text
Screen
ScreenHeader
SegmentedControl
Progress
Card
Section
Badge
Alert
StickyActionBar
EmptyState
Skeleton
ResponsiveGrid
```

---

# 40. Composants métier

Bons candidats :

```text
packages/domains/distribution/ui/
└── OccurrenceSummary
```

```text
packages/domains/orders/ui/
├── PreparationOrderCard
└── PreparationProgress
```

```text
packages/domains/amap/ui/
├── AmapBasketCount
└── AmapExceptionSummary
```

Ne pas extraire chaque petit bloc immédiatement.

---

# 41. Composants spécifiques à l’écran

```text
packages/screens/admin/preparation/
├── preparation-screen.tsx
├── components/
│   ├── preparation-header.tsx
│   ├── preparation-progress.tsx
│   ├── product-summary-list.tsx
│   ├── amap-summary.tsx
│   ├── exception-summary.tsx
│   ├── preparation-order-list.tsx
│   └── preparation-actions.tsx
└── index.ts
```

---

# 42. Navigation

Depuis Aujourd’hui :

```text
AdminTodayScreen
      ↓
AdminPreparationScreen
```

Depuis Distribution :

```text
AdminOccurrenceDetailsScreen
      ↓
AdminPreparationScreen
```

Vers la préparation séquentielle :

```text
AdminPreparationScreen
      ↓
AdminPreparationRunScreen
```

Vers une commande précise :

```text
onglet Commandes
      ↓
OrderDetailsScreen
```

Vers validation si nécessaire :

```text
Commandes non validées
      ↓
AdminOrderValidationScreen
```

---

# 43. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le maraîcher comprend immédiatement pour quelle activité il prépare ;
- le nombre de commandes restantes est visible sans scroll ;
- les quantités globales sont compréhensibles en quelques secondes ;
- paniers AMAP et extras sont distinguables ;
- les demi-paniers ne créent pas de quantités absurdes ;
- les exceptions sont visibles sans dominer l’écran ;
- les commandes non validées sont clairement signalées ;
- une activité imminente devient visuellement prioritaire ;
- le passage à la préparation séquentielle se fait en un tap ;
- l’écran reste très confortable sur tablette ;
- la version mobile conserve exactement le même modèle mental.

---

# 44. Structure de référence

```text
HEADER ACTIVITÉ
      ↓
PROGRESSION
      ↓
GLOBAL / COMMANDES
      ↓
PANIERS AMAP
      ↓
QUANTITÉS À PRÉPARER
      ↓
EXCEPTIONS
      ↓
CONTINUER LA PRÉPARATION
```

Cette structure doit fournir une vue opérationnelle immédiate avant le passage à la préparation séquentielle des commandes.
