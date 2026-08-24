# AdminOccurrenceDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/occurrence-details.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── occurrence-details-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre immédiatement à :

> **Où en est cette activité ?**

puis :

> **Quelle est la prochaine action à effectuer ?**

Il doit permettre de :

- voir le contexte de l’occurrence ;
- voir le nombre de commandes ;
- suivre validation, préparation et livraison ;
- accéder aux commandes ;
- accéder à la préparation ;
- voir les éventuelles anomalies ;
- clôturer l’activité lorsqu’elle est terminée.

---

# 3. Wireframe mobile — occurrence à venir

```text
┌─────────────────────────────────┐
│ ← Marché Saint-Pierre      ⋯    │
│                                 │
│ Samedi 29 août                  │
│ 08:00 – 12:00                   │
│                                 │
│ À VENIR                         │
├─────────────────────────────────┤
│                                 │
│ COMMANDES                       │
│                                 │
│ 18 commandes                    │
│                                 │
│ 2 à valider                     │
│ 13 préparées                    │
│ 3 à préparer                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRÉPARATION                     │
│                                 │
│ 13 / 18 préparées               │
│ ███████████████░░░░░            │
│                                 │
│ ⚠ 2 commandes à valider        │
│                                 │
│ [ Continuer la préparation ]    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ AMAP                            │
│                                 │
│ 11 paniers                      │
│ 4 demi-paniers                  │
│                                 │
│ 3 substitutions                 │
│ 1 cession                       │
│                                 │
│ [ Voir les détails ]            │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMANDES                       │
│                                 │
│ [ Voir les 18 commandes ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ INFORMATIONS                    │
│                                 │
│ Marché Saint-Pierre             │
│ Place du marché                 │
│ 123...                          │
│                                 │
│ [ Voir le lieu ]                │
│                                 │
└─────────────────────────────────┘
```

L’action principale dépend de l’état de l’occurrence.

---

# 4. Header

Le header doit afficher :

```text
← Marché Saint-Pierre
Samedi 29 août
08:00 – 12:00

À VENIR
```

Pour une tournée :

```text
← Tournée Nord
Mercredi 26 août
Départ 14:00

À VENIR
```

Toujours distinguer clairement :

- le modèle : `Marché Saint-Pierre` ;
- l’occurrence : `Samedi 29 août`.

---

# 5. Statut de l’occurrence

Les grands états UX peuvent être :

```text
À venir
En préparation
Prête
En cours
À clôturer
Terminée
```

Tous ne nécessitent pas forcément un statut métier persistant.

Certains peuvent être dérivés depuis :

- date/heure ;
- progression des commandes ;
- état de clôture.

---

# 6. Bloc commandes

Le résumé doit être très lisible :

```text
COMMANDES

18 au total

2 à valider
3 à préparer
13 préparées
0 livrée
```

Sur mobile, il n’est pas nécessaire d’afficher tous les compteurs si certains sont à zéro.

Exemple plus compact :

```text
18 commandes

2 à valider
13 préparées
3 restantes
```

---

# 7. Anomalies en premier

S’il existe des commandes à valider :

```text
⚠ 2 commandes sont encore à valider

[ Les valider ]
```

Cette alerte doit apparaître avant le CTA de préparation.

Il ne faut pas donner l’impression que l’activité est totalement prête à être préparée alors que certaines demandes ne sont pas confirmées.

---

# 8. Bloc préparation

```text
PRÉPARATION

13 / 18 préparées

███████████████░░░░

5 restantes

[ Continuer la préparation ]
```

Tap :

```text
AdminOccurrenceDetailsScreen
        ↓
AdminPreparationScreen
```

ou directement `AdminPreparationRunScreen` si l’on veut un CTA très opérationnel.

Recommandation :

- tap sur la section → `AdminPreparationScreen`
- CTA `Continuer` → `AdminPreparationRunScreen`

---

# 9. Occurrence totalement préparée

```text
PRÉPARATION

18 / 18 préparées

✓ Tout est prêt
```

Le CTA de préparation devient secondaire :

```text
[ Voir la préparation ]
```

L’action principale peut ensuite évoluer vers le suivi de distribution.

---

# 10. Occurrence en cours

Une fois l’activité commencée :

```text
EN COURS

18 commandes préparées
11 livrées

7 restantes
```

Wireframe :

```text
┌─────────────────────────────────┐
│ Marché Saint-Pierre             │
│                                 │
│ EN COURS                        │
├─────────────────────────────────┤
│                                 │
│ DISTRIBUTION                    │
│                                 │
│ 11 / 18 livrées                 │
│ ████████████░░░░░░             │
│                                 │
│ 7 restantes                     │
│                                 │
│ [ Voir les commandes ]          │
│                                 │
└─────────────────────────────────┘
```

À ce stade, la progression de livraison devient plus importante que celle de préparation.

---

# 11. Liste des commandes depuis l’occurrence

Tap :

```text
Voir les commandes
```

ouvre :

```text
AdminOrderListScreen
```

avec :

```text
occurrenceId = currentOccurrence
```

Les filtres restent visibles et réinitialisables.

---

# 12. Commandes non récupérées

À la fin d’une activité :

```text
⚠ 1 commande non récupérée

Marie Dupont
Préparée

[ Gérer ]
```

C’est une anomalie bloquante avant clôture.

Le maraîcher doit choisir :

```text
Reporter
Annuler
```

avant de terminer complètement l’activité.

---

# 13. État `À clôturer`

Après la fin horaire ou lorsque la distribution est terminée :

```text
À CLÔTURER

17 / 18 livrées

1 commande non récupérée

[ Clôturer l’activité ]
```

Si aucune anomalie :

```text
À CLÔTURER

18 / 18 livrées

✓ Toutes les commandes ont été traitées

[ Clôturer l’activité ]
```

---

# 14. Action de clôture

Le CTA :

```text
[ Clôturer l’activité ]
```

ouvre :

```text
AdminOccurrenceClosingScreen
```

Ce n’est pas une confirmation simple.

La clôture est un workflow car elle comprend :

1. commandes non récupérées ;
2. mise à jour des disponibilités ;
3. publication éventuelle ;
4. confirmation finale.

---

# 15. Occurrence terminée

Une fois clôturée :

```text
TERMINÉE

Marché Saint-Pierre
Samedi 29 août

18 commandes
17 livrées
1 annulée

Clôturée à 13:04
```

L’écran devient principalement consultatif.

Actions possibles :

```text
[ Voir les commandes ]
[ Voir la publication associée ]
```

si une publication a été faite lors de la clôture.

---

# 16. Bloc AMAP

S’il y a de l’AMAP :

```text
AMAP

11 paniers
4 demi-paniers

3 substitutions
1 cession
```

Tap :

```text
[ Voir les détails ]
```

ouvre un `Sheet` ou la vue AMAP filtrée sur l’occurrence.

---

# 17. Aucun AMAP

Si aucune commande AMAP :

> section absente.

Ne pas afficher :

```text
AMAP
0 panier
```

---

# 18. Informations de lieu

Pour un marché ou retrait :

```text
LIEU

Marché Saint-Pierre
12 place du Marché
...
```

Actions :

```text
[ Voir le lieu ]
```

Pour une tournée, remplacer ce bloc par :

```text
TRAJET

1. Saint-Pierre
2. Montville
3. Le Bourg
4. Marché Saint-Pierre

[ Voir la tournée ]
```

---

# 19. Tournée — progression par arrêt

Pour une tournée en cours :

```text
TRAJET

✓ Saint-Pierre
  3 / 3 livrées

● Montville
  2 / 4 livrées

○ Le Bourg
  0 / 2 livrée
```

Cette vue peut devenir particulièrement utile sur tablette.

La V1 peut toutefois rester plus simple si la distribution est gérée essentiellement par commande.

---

# 20. Notes d’occurrence

Optionnellement :

```text
NOTE

“Installation à gauche de l’entrée.”
```

ou pour une tournée :

> Appeler avant d’arriver au dernier point.

Ces notes appartiennent à l’occurrence, pas aux commandes.

---

# 21. Menu secondaire `⋯`

Actions rares :

```text
Modifier l’occurrence
Voir le modèle de marché
Annuler l’occurrence
```

L’annulation de l’occurrence doit être distincte de l’annulation de commandes.

---

# 22. Annulation d’une occurrence

Si aucune commande :

```text
Annuler cette occurrence ?
```

Simple.

Si des commandes existent :

```text
12 commandes sont liées à cette activité.

Vous devez choisir comment les traiter
avant d’annuler l’occurrence.
```

Il ne faut jamais laisser des commandes attachées à une occurrence supprimée silencieusement.

---

# 23. Tablette portrait

Les principaux blocs peuvent être placés sur deux colonnes :

```text
┌──────────────────────────────────────────┐
│ Marché Saint-Pierre                     │
│ Samedi 29 août                          │
├────────────────────┬─────────────────────┤
│ COMMANDES          │ AMAP                │
│ 18                 │ 11 paniers          │
│ 2 à valider        │ 4 demi-paniers      │
├────────────────────┴─────────────────────┤
│ PRÉPARATION                              │
│ 13 / 18                                  │
│                                          │
│ [ Continuer ]                            │
└──────────────────────────────────────────┘
```

---

# 24. Tablette paysage

Deux grandes zones :

```text
┌─────────────────────────────┬──────────────────────────┐
│ OPÉRATIONS                  │ CONTEXTE                 │
│                             │                          │
│ Commandes                   │ Date / horaires          │
│ Préparation                 │ Lieu                     │
│ Distribution                │ AMAP                     │
│                             │ Notes                    │
│ Alertes                     │                          │
└─────────────────────────────┴──────────────────────────┘
```

Très adapté à une vue opérationnelle.

---

# 25. Desktop

Même logique que tablette paysage.

Possibilité de garder la colonne de contexte sticky.

Pas besoin d’un écran desktop complètement différent.

---

# 26. Activité future sans commande

```text
Marché Saint-Pierre
Samedi 5 septembre

Aucune commande pour le moment.

Les commandes reçues pour cette date
apparaîtront ici.
```

Actions :

```text
[ Voir le planning ]
```

Pas besoin de pousser artificiellement vers la préparation.

---

# 27. Activité avec commandes mais préparation non commencée

```text
12 commandes

0 préparée

[ Commencer la préparation ]
```

---

# 28. Activité imminente

```text
⚠ Début dans 20 min

3 commandes restent à préparer.
```

Cette alerte apparaît immédiatement sous le header.

---

# 29. Activité en retard de clôture

Si le lendemain elle n’est toujours pas clôturée :

```text
⚠ Cette activité n’a pas été clôturée

Marché terminé hier à 12:00.

[ Clôturer maintenant ]
```

Elle doit également remonter dans `AdminTodayScreen`.

---

# 30. Actualisation

L’écran doit se mettre à jour :

- après validation d’une commande ;
- après préparation ;
- après livraison ;
- après report ou annulation ;
- au retour d’un sous-écran.

Exemple :

```text
13 / 18 préparées
      ↓
PreparationRun
      ↓
17 / 18 préparées
```

---

# 31. Concurrence

Comme plusieurs appareils peuvent potentiellement intervenir :

- mettre à jour silencieusement les compteurs ;
- ne pas interrompre inutilement ;
- afficher un conflit uniquement lorsqu’une action locale risque d’écraser un changement.

Cet écran est essentiellement une projection en lecture, donc la concurrence y est moins problématique.

---

# 32. Projection de données

Exemple :

```ts
type OccurrenceDetails = {
  occurrence: {
    id: string
    type: "market" | "tour" | "pickup"

    name: string
    date: string

    startsAt?: string
    endsAt?: string

    status:
      | "upcoming"
      | "in_progress"
      | "to_close"
      | "closed"

    location?: {
      label: string
      address?: string
    }
  }

  orders: {
    total: number
    pendingValidation: number
    toPrepare: number
    prepared: number
    delivered: number
    cancelled: number
    uncollected: number
  }

  amap?: {
    fullBaskets: number
    halfBaskets: number
    substitutions: number
    transfers: number
  }

  alerts: OccurrenceAlert[]

  actions: {
    canPrepare: boolean
    canClose: boolean
    canEdit: boolean
    canCancel: boolean
  }
}
```

---

# 33. Actions calculées côté serveur

Comme pour les commandes, il peut être utile de renvoyer :

```ts
actions: {
  canPrepare: boolean
  canClose: boolean
  canEdit: boolean
  canCancel: boolean
}
```

Cela évite que l’UI reconstruise toutes les règles métier.

---

# 34. Query

Conceptuellement :

```text
GET /admin/distribution/occurrences/:id
```

Cette projection peut agréger :

- distribution ;
- commandes ;
- AMAP.

---

# 35. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Progress
Badge
Alert
Button
StickyActionBar
Timeline
Skeleton
EmptyState
```

---

# 36. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
OccurrenceStatusBadge
OccurrenceSummary
OccurrenceLocation
OccurrenceRouteSummary
```

Dans :

```text
packages/domains/orders/ui/
```

```text
OrderProgressSummary
```

Dans :

```text
packages/domains/amap/ui/
```

```text
AmapOccurrenceSummary
```

---

# 37. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── occurrence-details-screen.tsx
├── components/
│   ├── occurrence-header.tsx
│   ├── occurrence-alerts.tsx
│   ├── occurrence-order-summary.tsx
│   ├── occurrence-preparation-section.tsx
│   ├── occurrence-distribution-section.tsx
│   ├── occurrence-amap-section.tsx
│   └── occurrence-actions.tsx
└── index.ts
```

---

# 38. Navigation

Depuis le planning :

```text
DistributionPlanningScreen
        ↓
OccurrenceDetailsScreen
```

Vers la validation :

```text
Commandes à valider
        ↓
OrderValidationScreen
```

Vers la préparation globale :

```text
Préparation
   ↓
AdminPreparationScreen
```

Vers la préparation séquentielle :

```text
Continuer la préparation
        ↓
AdminPreparationRunScreen
```

Vers les commandes :

```text
Voir les commandes
       ↓
AdminOrderListScreen
+ occurrenceId
```

Vers la clôture :

```text
Clôturer
   ↓
AdminOccurrenceClosingScreen
```

---

# 39. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le type, la date et l’heure de l’activité sont immédiatement visibles ;
- l’utilisateur comprend en quelques secondes si l’activité est prête ;
- les commandes non validées ressortent avant la préparation ;
- la prochaine action est évidente ;
- préparation et distribution ne sont pas confondues ;
- les anomalies de récupération sont visibles avant clôture ;
- la clôture n’est proposée qu’au bon moment ;
- l’AMAP apparaît seulement lorsqu’il est pertinent ;
- le même écran reste compréhensible pour marché, tournée et retrait ;
- la tablette exploite l’espace supplémentaire sans changer le workflow.

---

# 40. Structure de référence

```text
HEADER + STATUT
      ↓
ALERTES
      ↓
COMMANDES
      ↓
PRÉPARATION / DISTRIBUTION
      ↓
AMAP SI PERTINENT
      ↓
LIEU / TRAJET
      ↓
ACTION PRINCIPALE
```

Cette structure doit faire de l’occurrence le point central de pilotage d’une activité datée, depuis la préparation jusqu’à la clôture.
