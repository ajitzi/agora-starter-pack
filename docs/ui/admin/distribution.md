# AdminDistributionPlanningScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/distribution.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── distribution-planning-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre rapidement à :

> **Quelles sont mes prochaines activités de distribution ?**

Il doit permettre de :

- voir les prochaines occurrences ;
- identifier marché, tournée ou retrait ;
- voir date, heure et nombre de commandes ;
- connaître l’état de préparation ;
- repérer les activités urgentes ou incomplètes ;
- ouvrir une occurrence ;
- accéder à la configuration des marchés et tournées ;
- éventuellement créer une occurrence ponctuelle.

---

# 3. Principe UX

Sur mobile, ne pas partir d’un calendrier mensuel.

Privilégier une timeline :

```text
Aujourd’hui
Demain
Cette semaine
Semaine prochaine
```

avec des cartes d’activité.

Cette approche est :

- plus lisible sur téléphone ;
- plus orientée action ;
- moins dense qu’un calendrier ;
- plus adaptée à l’affichage des horaires et statuts ;
- naturelle pour des activités récurrentes.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ Distribution                ＋  │
├─────────────────────────────────┤
│                                 │
│ [ Planning ]                    │
│ [ Marchés ] [ Tournées ]        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ AUJOURD’HUI                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tournée Nord                │ │
│ │                             │ │
│ │ Départ 14:00                │ │
│ │                             │ │
│ │ 7 commandes                 │ │
│ │ 5 préparées                 │ │
│ │ ███████████████░░░         │ │
│ │                             │ │
│ │ ⚠ 2 restantes              │ │
│ │                             │ │
│ │ [ Continuer ]              │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Retrait ferme               │ │
│ │                             │ │
│ │ 17:00 – 19:00               │ │
│ │                             │ │
│ │ 3 commandes                 │ │
│ │ 1 préparée                  │ │
│ │                             │ │
│ │ [ Préparer ]               │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MERCREDI 26 AOÛT               │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tournée Sud                 │ │
│ │                             │ │
│ │ Départ 15:00                │ │
│ │                             │ │
│ │ 6 commandes                 │ │
│ │                             │ │
│ │ [ Voir ]                    │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SAMEDI 29 AOÛT                 │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marché Saint-Pierre         │ │
│ │                             │ │
│ │ 08:00 – 12:00               │ │
│ │                             │ │
│ │ 18 commandes                │ │
│ │ 11 paniers AMAP             │ │
│ │                             │ │
│ │ 13 préparées                │ │
│ │                             │ │
│ │ [ Voir ]                    │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
│ Auj. │ Cmd │ Préparer │ Dispo │+│
└─────────────────────────────────┘
```

---

# 5. Navigation secondaire

Navigation recommandée :

```text
[ Planning ] [ Marchés ] [ Tournées ]
```

`Planning` est l’entrée par défaut.

Les autres onglets servent davantage à la configuration.

Les modes de récupération peuvent rester accessibles depuis un menu secondaire ou depuis les paramètres de Distribution.

---

# 6. Organisation temporelle

Regrouper les occurrences par jour.

Exemple :

```text
AUJOURD’HUI

MERCREDI 26 AOÛT

SAMEDI 29 AOÛT

MERCREDI 2 SEPTEMBRE
```

Pour les dates proches, utiliser aussi des libellés humains :

```text
Aujourd’hui
Demain
Samedi
```

tout en gardant une date explicite pour éviter les ambiguïtés.

---

# 7. Carte d’occurrence

Une carte doit afficher au minimum :

- type ;
- nom ;
- heure ;
- nombre de commandes ;
- progression de préparation.

Exemple :

```text
Tournée Nord
Départ 14:00

7 commandes
5 préparées

██████████████░░

[ Continuer ]
```

---

# 8. Identifier le type d’activité

L’utilisateur doit distinguer rapidement :

```text
MARCHÉ
TOURNÉE
RETRAIT
```

On peut utiliser :

- une icône ;
- un label ;
- éventuellement une variation visuelle.

Ne jamais dépendre uniquement de la couleur.

Exemple :

```text
TOURNÉE
Tournée Nord
```

---

# 9. Activité imminente

Si l’activité approche :

```text
⚠ Départ dans 30 min

2 commandes restent à préparer
```

Le CTA devient :

```text
[ Continuer la préparation ]
```

La carte doit remonter visuellement dans la priorité.

---

# 10. Activité totalement préparée

```text
Marché Saint-Pierre

18 / 18 préparées

✓ Tout est prêt

[ Voir ]
```

La carte devient plus calme.

---

# 11. Activité terminée

Une occurrence clôturée ne doit plus occuper le même espace dans le planning actif.

Elle peut apparaître dans une section :

```text
Terminées
```

ou via un filtre.

Exemple :

```text
✓ Marché Saint-Pierre
Samedi 22 août
Terminé
```

Par défaut, le planning principal montre surtout le futur et l’en cours.

---

# 12. Occurrence sans commande

Exemple :

```text
Marché de Montville
Dimanche · 08:00

Aucune commande

[ Voir ]
```

Elle reste pertinente car le marché existe même sans précommandes.

---

# 13. Occurrence avec commandes non validées

Exemple :

```text
⚠ 3 commandes encore à valider
```

La carte peut conserver une seule action principale :

```text
[ Voir l’activité ]
```

avec l’alerte visible.

Éviter d’ajouter plusieurs CTA concurrents.

---

# 14. Interaction avec une occurrence

Toute la carte est tappable.

Flux :

```text
AdminDistributionPlanningScreen
        ↓
AdminOccurrenceDetailsScreen
```

L’occurrence devient ensuite le point central pour :

- préparation ;
- commandes ;
- distribution ;
- clôture.

---

# 15. Bouton `+`

Le bouton `+` reste réservé à des besoins relativement rares.

Sur mobile, il peut ouvrir :

```text
Créer une occurrence
```

La création des modèles récurrents reste dans les sections `Marchés` et `Tournées`.

Cela évite de mélanger configuration et exploitation.

---

# 16. Création d’une occurrence ponctuelle

Exemple :

```text
Nouvelle activité

Type
[ Retrait ▼ ]

Nom
[ Retrait exceptionnel ]

Date
[ 30 août ]

Horaire
[ 17:00 – 19:00 ]

[ Créer ]
```

Utile pour un événement exceptionnel.

---

# 17. Marchés récurrents

L’onglet `Marchés` peut afficher :

```text
Marchés

Marché Saint-Pierre
Samedi · 08:00–12:00
Actif
>

Marché de Montville
Dimanche · 09:00–13:00
Actif
>
```

Ce sont les **modèles récurrents**, pas les occurrences datées.

---

# 18. Tournées récurrentes

L’onglet `Tournées` peut afficher :

```text
Tournées

Tournée Nord
Mercredi · départ 14:00
4 étapes
>

Tournée Sud
Vendredi · départ 15:00
3 étapes
>
```

---

# 19. Ne pas confondre modèle et occurrence

Concept UX important :

```text
Marché Saint-Pierre
```

est un modèle récurrent.

Alors que :

```text
Marché Saint-Pierre
Samedi 29 août
```

est une occurrence.

L’interface doit refléter cette différence.

---

# 20. Filtres

Sur le planning, les filtres peuvent rester simples :

```text
Tous
Marchés
Tournées
Retraits
```

Sur mobile, utiliser des chips :

```text
[Tous] [Marchés] [Tournées] [Retraits]
```

Pas besoin d’un gros `FilterSheet` en V1.

---

# 21. Période

Contrôle compact recommandé :

```text
[ Prochains 7 jours ▼ ]
```

Options possibles :

```text
Aujourd’hui
7 prochains jours
30 prochains jours
```

Valeur par défaut recommandée :

```text
7 prochains jours
```

---

# 22. Pas de calendrier mensuel par défaut

Un calendrier peut être ajouté plus tard sur tablette ou desktop.

Mais il ne doit pas être le modèle principal.

Sur téléphone, une vue mensuelle :

- masque les détails ;
- crée beaucoup de taps ;
- met l’accent sur la date plutôt que l’action ;
- réduit fortement la lisibilité des statuts.

La timeline est plus adaptée.

---

# 23. Tablette portrait

Conserver la timeline, avec possibilité de mettre deux cartes côte à côte pour une même journée.

```text
┌────────────────────────────────────────────┐
│ AUJOURD’HUI                                │
│                                            │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Tournée Nord     │ │ Retrait ferme    │ │
│ │ 14:00            │ │ 17:00            │ │
│ │                  │ │                  │ │
│ │ 5 / 7 préparées  │ │ 1 / 3 préparée  │ │
│ └──────────────────┘ └──────────────────┘ │
└────────────────────────────────────────────┘
```

---

# 24. Tablette paysage

Une vue semaine plus visuelle peut devenir intéressante.

```text
┌──────────────┬──────────────┬──────────────┐
│ LUN 24       │ MER 26       │ SAM 29       │
│              │              │              │
│ Tournée Nord │ Tournée Sud  │ Marché SP    │
│ 14:00        │ 15:00        │ 08:00        │
│              │              │              │
│ Retrait      │              │              │
│ 17:00        │              │              │
└──────────────┴──────────────┴──────────────┘
```

Conserver éventuellement une option `Liste` si la vue semaine devient trop dense.

---

# 25. Desktop

Sur desktop :

- sidebar principale ;
- planning semaine possible ;
- panneau de détail à droite éventuellement.

Exemple :

```text
sidebar │ semaine                │ détail
```

La timeline reste toutefois suffisante pour la V1.

---

# 26. États de préparation

Chaque occurrence peut être présentée conceptuellement comme :

```text
Pas commencé
En préparation
Prêt
En cours de distribution
Terminé
```

Ces états ne doivent pas nécessairement tous être persistés comme statuts métier.

L’UI peut en dériver certains depuis :

- la date et l’heure ;
- le nombre de commandes préparées ;
- le nombre de commandes livrées ;
- l’état de l’occurrence.

---

# 27. Carte après démarrage de l’activité

Exemple après le début du marché :

```text
Marché Saint-Pierre

En cours

18 préparées
12 livrées

[ Voir ]
```

La progression pertinente change alors de :

```text
préparation
```

à :

```text
distribution
```

L’UI peut adapter son indicateur.

---

# 28. Occurrence à clôturer

Après l’activité :

```text
⚠ À clôturer

Marché Saint-Pierre

17 / 18 livrées
1 commande non récupérée

[ Clôturer ]
```

Cette carte doit rester prioritaire jusqu’à clôture.

---

# 29. Historique

Ne pas mélanger tout l’historique avec les prochaines occurrences.

Ajouter éventuellement :

```text
[ Voir les activités passées ]
```

qui ouvre une liste filtrable.

---

# 30. État vide

Si aucune activité n’est prévue :

```text
Aucune activité prévue
dans les 7 prochains jours.

[ Voir les marchés ]
[ Voir les tournées ]
```

On peut également proposer :

```text
[ Créer une activité ]
```

si cela correspond au workflow.

---

# 31. Chargement

Skeleton de timeline :

```text
AUJOURD’HUI

┌─────────────────────────────┐
│ ████████████                │
│ ███████                     │
│                             │
│ ███████████████             │
└─────────────────────────────┘
```

---

# 32. Erreur

```text
Impossible de charger le planning.

[ Réessayer ]
```

Les onglets de configuration restent accessibles si leurs données peuvent être chargées séparément.

---

# 33. Projection de données

Exemple :

```ts
type DistributionPlanning = {
  range: {
    from: string
    to: string
  }

  occurrences: DistributionOccurrenceSummary[]
}
```

---

# 34. Résumé d’occurrence

```ts
type DistributionOccurrenceSummary = {
  id: string

  type:
    | "market"
    | "tour"
    | "pickup"

  name: string

  startsAt: string
  endsAt?: string

  orders: {
    total: number
    pendingValidation: number
    prepared: number
    delivered: number
  }

  amapOrders?: number

  status:
    | "upcoming"
    | "in_progress"
    | "to_close"
    | "closed"
}
```

---

# 35. Query

Conceptuellement :

```text
GET /admin/distribution/planning
```

avec :

```text
from
to
type
```

Exemple :

```text
/admin/distribution/planning
  ?from=2026-08-24
  &to=2026-08-31
```

---

# 36. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Tabs
FilterChips
Section
Card
Progress
Badge
Alert
EmptyState
Skeleton
ResponsiveGrid
```

---

# 37. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
OccurrenceCard
OccurrenceTypeBadge
OccurrenceProgress
OccurrenceDate
```

`OccurrenceCard` sera probablement réutilisé dans :

- Aujourd’hui ;
- Planning ;
- Préparation ;
- AMAP éventuellement.

---

# 38. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── distribution-planning-screen.tsx
├── components/
│   ├── distribution-tabs.tsx
│   ├── distribution-range-selector.tsx
│   ├── distribution-filter-chips.tsx
│   ├── occurrence-day-group.tsx
│   └── distribution-empty-state.tsx
└── index.ts
```

---

# 39. Navigation

Depuis `Plus` :

```text
Plus
 ↓
Distribution
 ↓
AdminDistributionPlanningScreen
```

Vers une occurrence :

```text
OccurrenceCard
     ↓
AdminOccurrenceDetailsScreen
```

Vers les modèles :

```text
Marchés
 ↓
AdminMarketListScreen
```

```text
Tournées
 ↓
AdminTourListScreen
```

Vers la préparation :

```text
Occurrence
 ↓
AdminPreparationScreen
```

---

# 40. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- les prochaines activités sont visibles immédiatement ;
- l’utilisateur distingue sans effort marché, tournée et retrait ;
- la date et l’heure sont toujours explicites ;
- une activité imminente ou incomplète ressort clairement ;
- l’état de préparation est visible sans ouvrir l’occurrence ;
- l’écran reste simple sur téléphone ;
- la tablette peut afficher davantage d’activités sans réduire la taille tactile ;
- modèle récurrent et occurrence datée ne sont pas confondus ;
- les activités passées n’encombrent pas le planning actif ;
- la clôture d’une activité oubliée reste visible.

---

# 41. Structure de référence

```text
HEADER
   ↓
PLANNING / MARCHÉS / TOURNÉES
   ↓
PÉRIODE + FILTRES
   ↓
JOUR
   ↓
OCCURRENCES
   ↓
JOUR SUIVANT
```

Cette structure doit permettre de parcourir rapidement les activités à venir et d’identifier immédiatement celles qui nécessitent une action.
