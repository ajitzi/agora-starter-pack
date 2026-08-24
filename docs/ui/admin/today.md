# AdminTodayScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/today.md
```

Implémentation :

```text
packages/screens/admin/today/
├── today-screen.tsx
└── index.ts
```

À ce stade, aucune variante `native` n’est nécessaire : le layout peut être partagé entre web et mobile grâce à Tamagui.

---

## 2. Objectif

L’écran `AdminTodayScreen` constitue la page d’accueil principale de l’administration.

Il doit répondre en quelques secondes à la question :

> **Qu’est-ce que je dois faire maintenant ?**

L’écran ne doit pas devenir un dashboard analytique.

Les priorités sont :

1. ce qui nécessite une action immédiate ;
2. ce qui est imminent ;
3. ce qui doit être fait aujourd’hui ;
4. ce qui arrive ensuite ;
5. les anomalies et rappels.

---

# 3. Wireframe mobile de référence

Largeur cible initiale : environ **375 px**.

```text
┌─────────────────────────────────┐
│ Aujourd’hui                 🔔  │
│ Lundi 24 août                   │
├─────────────────────────────────┤
│                                 │
│ À TRAITER                       │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 5 commandes à valider       │ │
│ │                             │ │
│ │ 2 pour aujourd’hui          │ │
│ │ 3 pour les prochains jours  │ │
│ │                             │ │
│ │ [ Traiter les commandes ]   │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ AUJOURD’HUI                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tournée Nord                │ │
│ │ 14:00                       │ │
│ │                             │ │
│ │ 5 / 7 préparées             │ │
│ │ █████████████████░░░        │ │
│ │                             │ │
│ │ 2 commandes restantes       │ │
│ │                             │ │
│ │ [ Continuer ]               │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Retrait ferme               │ │
│ │ 17:00                       │ │
│ │                             │ │
│ │ 1 / 3 préparée              │ │
│ │ ██████░░░░░░░░░░░░         │ │
│ │                             │ │
│ │ [ Préparer ]                │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ DEMAIN                          │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marché Saint-Pierre         │ │
│ │ 08:00 – 12:00               │ │
│ │                             │ │
│ │ 18 commandes                │ │
│ │ 13 préparées                │ │
│ │                             │ │
│ │ 11 paniers AMAP             │ │
│ │                             │ │
│ │ [ Voir ]                    │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ATTENTION                       │
│                                 │
│ ⚠ 2 commandes non récupérées   │
│   hier                          │
│                       Voir  →   │
│                                 │
│ ⚠ Panier AMAP semaine          │
│   prochaine non défini          │
│                       Gérer →   │
│                                 │
├─────────────────────────────────┤
│ Auj. │ Cmd │ Préparer │ Dispo │+│
└─────────────────────────────────┘
```

---

# 4. Hiérarchie de l’écran

L’écran est divisé en quatre sections principales.

## 4.1 À traiter

Cette section contient les actions nécessitant une intervention du maraîcher mais qui ne sont pas nécessairement liées à une occurrence en cours.

Exemples :

- commandes à valider ;
- commandes modifiées par les clients ;
- anomalies bloquantes.

La carte principale doit être très visible.

---

## 4.2 Aujourd’hui

Cette section contient les occurrences du jour :

- marchés ;
- tournées ;
- retraits ;
- autres modes de récupération configurés.

Les occurrences sont classées par heure.

---

## 4.3 Demain

La home n’a pas besoin d’afficher immédiatement toute la semaine.

La section `Demain` présente uniquement les prochaines activités pertinentes.

Le planning complet reste disponible dans la section Distribution.

---

## 4.4 Attention

Cette section contient les alertes non bloquantes mais nécessitant potentiellement une action.

Exemples :

- commandes non récupérées ;
- composition AMAP absente ;
- disponibilités non publiées récemment ;
- occurrence présentant une anomalie.

---

# 5. Priorisation dynamique

L’ordre des éléments ne doit pas être entièrement statique.

Par exemple, si une tournée démarre dans quinze minutes avec deux commandes encore non préparées :

```text
Tournée Nord
Départ dans 15 min
2 commandes non préparées
```

elle doit pouvoir passer avant :

```text
5 nouvelles commandes à valider
```

Trois niveaux de priorité sont proposés.

## Critique

Action nécessaire immédiatement.

Exemple :

> Tournée dans 15 minutes — 2 commandes non préparées.

## Action requise

Exemple :

> 5 commandes à valider.

## Information / rappel

Exemple :

> Disponibilités non publiées depuis 5 jours.

Le tri général peut suivre :

```text
criticité
→ date
→ heure
```

---

# 6. Header

Sur mobile :

```text
Aujourd’hui                         🔔
Lundi 24 août
```

Le header doit rester compact.

Éviter :

- logo volumineux ;
- nom de l’exploitation répété en permanence ;
- recherche globale ;
- avatar occupant beaucoup d’espace.

Le bouton de notification peut ouvrir les alertes et notifications.

---

# 7. Carte « Commandes à valider »

Wireframe :

```text
┌───────────────────────────────┐
│ 5 commandes à valider         │
│                               │
│ 2 pour aujourd’hui            │
│ 3 pour les prochains jours    │
│                               │
│ [ Traiter les commandes ]     │
└───────────────────────────────┘
```

Action :

```text
Traiter les commandes
        ↓
AdminOrderValidationScreen
```

La carte ne doit pas réafficher la liste complète des commandes.

Elle résume une action à effectuer.

---

# 8. Carte activité

Un même composant peut représenter :

- un marché ;
- une tournée ;
- un retrait ;
- un autre mode de récupération.

Exemple conceptuel :

```tsx
<OperationCard
  title="Tournée Nord"
  time="14:00"
  totalOrders={7}
  preparedOrders={5}
  action="Continuer"
/>
```

Wireframe :

```text
Tournée Nord
14:00

5 / 7 préparées
████████████████░░

2 commandes restantes

[ Continuer ]
```

---

# 9. Activité complètement préparée

```text
Marché Saint-Pierre
08:00

18 / 18 préparées
████████████████████

✓ Tout est prêt

[ Voir ]
```

L’état à 100 % doit être rassurant et visuellement plus calme.

---

# 10. Activité urgente ou en retard

Exemple :

```text
Tournée Nord
14:00

Départ dans 15 min

5 / 7 préparées

⚠ 2 commandes restantes

[ Continuer la préparation ]
```

La temporalité doit devenir plus importante que le simple pourcentage de progression.

---

# 11. Interaction avec une activité

Toute la carte doit être tappable.

Flux :

```text
AdminTodayScreen
        ↓
AdminPreparationScreen
```

Le bouton d’action et le tap sur la carte peuvent mener au même écran.

---

# 12. Section Attention

Les alertes secondaires doivent être plus compactes que les cartes d’activité.

Exemple :

```text
⚠ 2 commandes non récupérées hier
                              Voir →

⚠ Panier AMAP semaine prochaine
  non défini                   Gérer →
```

Les rappels secondaires ne doivent pas prendre plus d’importance visuelle que les opérations du jour.

---

# 13. Navigation basse

Sur mobile :

```text
┌─────────────────────────────────┐
│  Auj.   Cmd   Préparer  Dispo  +│
└─────────────────────────────────┘
```

Navigation logique :

```text
Aujourd’hui
Commandes
Préparer
Dispos
Plus
```

L’onglet courant doit être clairement identifié.

La hauteur tactile doit rester confortable, environ 56 à 64 px minimum, hors safe area éventuelle.

---

# 14. Scrolling

Le comportement recommandé est :

- contenu principal scrollable ;
- navigation basse sticky ;
- header normal dans un premier temps.

L’objectif est de conserver un scroll naturel sans accumuler trop d’éléments fixes.

---

# 15. Tablette portrait

Autour de 768 px, la structure mobile reste la référence.

Les occurrences peuvent cependant être affichées sur deux colonnes lorsque l’espace le permet.

```text
┌──────────────────────────────────────────┐
│ Aujourd’hui                          🔔  │
│ Lundi 24 août                            │
├──────────────────────────────────────────┤
│                                          │
│ À TRAITER                                │
│ ┌──────────────────────────────────────┐ │
│ │ 5 commandes à valider               │ │
│ │                  [ Traiter ]         │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ AUJOURD’HUI                              │
│                                          │
│ ┌──────────────────┐ ┌─────────────────┐ │
│ │ Tournée Nord     │ │ Retrait ferme   │ │
│ │ 14:00            │ │ 17:00           │ │
│ │                  │ │                 │ │
│ │ 5 / 7            │ │ 1 / 3           │ │
│ │                  │ │                 │ │
│ │ [Continuer]      │ │ [Préparer]      │ │
│ └──────────────────┘ └─────────────────┘ │
│                                          │
│ DEMAIN                                   │
│ ┌──────────────────────────────────────┐ │
│ │ Marché Saint-Pierre                 │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ATTENTION                                │
│ ...                                      │
└──────────────────────────────────────────┘
```

---

# 16. Tablette paysage

Une organisation en deux grandes zones peut devenir pertinente.

```text
┌──────────────────────────────────────────────────────┐
│ Aujourd’hui                                      🔔  │
│ Lundi 24 août                                        │
├────────────────────────────┬─────────────────────────┤
│                            │                         │
│ À TRAITER                  │ ATTENTION               │
│                            │                         │
│ 5 commandes                │ 2 non récupérées       │
│ [Traiter]                  │                         │
│                            │ Panier AMAP manquant   │
├────────────────────────────┤                         │
│ AUJOURD’HUI                │ DEMAIN                  │
│                            │                         │
│ Tournée Nord               │ Marché Saint-Pierre   │
│ Retrait ferme              │                         │
│                            │                         │
└────────────────────────────┴─────────────────────────┘
```

Il faut toutefois conserver de grandes cartes tactiles.

La tablette ne doit pas devenir un dashboard dense.

---

# 17. Desktop

Le desktop reprend principalement la version tablette paysage.

Évolutions possibles :

- sidebar permanente ;
- largeur maximale du contenu ;
- davantage de détails dans certaines cartes.

Exemple :

```text
┌──────────────┬────────────────────────────────────────┐
│              │ Aujourd’hui                            │
│ Aujourd’hui  │                                        │
│ Commandes    │ ...                                    │
│ Préparer     │                                        │
│ Dispos       │                                        │
│              │                                        │
│ Distribution │                                        │
│ AMAP         │                                        │
│ Clients      │                                        │
│              │                                        │
└──────────────┴────────────────────────────────────────┘
```

Le desktop n’introduit pas une nouvelle architecture mentale.

---

# 18. État vide — aucune activité aujourd’hui

Éviter :

```text
0 commandes
0 tournées
0 marchés
```

Préférer :

```text
┌──────────────────────────────┐
│ ✓ Tout est à jour            │
│                              │
│ Rien à préparer aujourd’hui. │
│                              │
│ Prochaine activité           │
│                              │
│ Marché Saint-Pierre          │
│ Samedi · 08:00               │
│                              │
│ [ Voir ]                     │
└──────────────────────────────┘
```

Les rappels éventuels restent affichés en dessous.

---

# 19. État vide — aucune commande à valider

La section `À traiter` peut disparaître entièrement.

Éviter d’afficher :

```text
Commandes à valider
0
```

La home doit se simplifier automatiquement lorsqu’une section n’a aucun contenu utile.

---

# 20. État de chargement

Utiliser des skeletons conservant la structure générale de l’écran.

Exemple :

```text
████████████
██████

┌───────────────────────────────┐
│ ███████████████               │
│ ███████                       │
│                               │
│ █████████████████████         │
└───────────────────────────────┘
```

Éviter un spinner plein écran.

---

# 21. Erreur globale

Si la home ne peut pas être chargée :

```text
Impossible de charger votre journée.

Vérifiez votre connexion puis réessayez.

[ Réessayer ]
```

La navigation principale doit rester disponible si possible.

---

# 22. Erreurs partielles

Une erreur sur une partie secondaire de la page ne doit pas bloquer l’ensemble de l’écran.

Exemple :

- les occurrences sont chargées ;
- les alertes échouent.

Les occurrences restent affichées et seule la section concernée présente une erreur.

---

# 23. Mode hors connexion

Minimum envisagé en V1 :

```text
⚠ Hors connexion

Les informations affichées datent de 13:42.
```

Un véritable fonctionnement offline-first n’est pas obligatoire en V1.

Les actions nécessitant le serveur peuvent :

- être désactivées ;
- ou être mises en attente dans une évolution future.

---

# 24. Données nécessaires

L’écran ne doit idéalement pas effectuer de nombreuses requêtes indépendantes si l’API peut fournir une projection adaptée.

Endpoint ou use case possible :

```text
GET /admin/today
```

Projection conceptuelle :

```ts
type AdminToday = {
  date: string

  ordersToValidate: {
    total: number
    dueToday: number
  }

  todayOccurrences: OperationSummary[]

  tomorrowOccurrences: OperationSummary[]

  alerts: AdminAlert[]
}
```

Cette structure est une projection adaptée à l’écran.

Elle n’a pas besoin d’être un aggregate métier.

---

# 25. `OperationSummary`

Exemple de type de projection :

```ts
type OperationSummary = {
  occurrenceId: string
  type: "market" | "tour" | "pickup"
  name: string

  startsAt?: string

  orders: {
    total: number
    prepared: number
    delivered: number
  }

  amapOrders?: number
}
```

Ce type est destiné aux besoins de présentation de la home.

---

# 26. `AdminAlert`

Exemple :

```ts
type AdminAlert = {
  id: string

  severity:
    | "critical"
    | "warning"
    | "info"

  type:
    | "uncollected_orders"
    | "missing_amap_composition"
    | "stale_availability"
    | "other"

  title: string

  target?: {
    type: string
    id?: string
  }
}
```

L’écran détermine la navigation appropriée selon la cible.

---

# 27. Composants UI génériques

L’écran peut faire émerger plusieurs composants dans `@project/ui` :

```text
Screen
ScreenHeader
Section
Card
Progress
Badge
EmptyState
Alert
Button
BottomNavigation
ResponsiveGrid
```

Ces composants ne portent pas de logique métier.

---

# 28. Composants métier

Des composants réutilisables peuvent éventuellement apparaître dans les domaines.

Exemples :

```text
packages/domains/orders/ui/
└── order-validation-summary

packages/domains/distribution/ui/
└── occurrence-progress-card
```

L’extraction doit rester guidée par une réutilisation réelle.

`OccurrenceProgressCard` est notamment un bon candidat si le composant est réutilisé dans :

- Aujourd’hui ;
- Préparer ;
- Distribution.

---

# 29. Composants spécifiques au screen

Les composants exclusivement utilisés par cette page restent privés dans le dossier du screen.

Exemple :

```text
packages/screens/admin/today/
├── today-screen.tsx
├── components/
│   ├── validation-section.tsx
│   ├── today-operations-section.tsx
│   ├── upcoming-section.tsx
│   └── alerts-section.tsx
└── index.ts
```

---

# 30. Navigation depuis la home

## Commandes à valider

```text
5 commandes à valider
        ↓
AdminOrderValidationScreen
```

## Tournée / marché / retrait

```text
Tournée Nord
        ↓
AdminPreparationScreen
```

## Commandes non récupérées

```text
Commandes non récupérées
        ↓
AdminOrderListScreen
avec filtre contextuel
```

## Composition AMAP absente

```text
Composition AMAP absente
        ↓
AdminAmapWeekScreen
```

---

# 31. Critères d’acceptation UX

Le wireframe est considéré comme réussi si :

- le maraîcher comprend en moins de **5 secondes** ce qu’il doit faire ;
- l’action urgente est visible sans scroll ;
- aucune donnée non actionnable n’occupe inutilement l’espace principal ;
- les occurrences du jour sont accessibles en un tap ;
- une activité incomplète est immédiatement identifiable ;
- l’écran reste utilisable à environ 375 px de large ;
- les boutons principaux ont une taille tactile confortable ;
- la tablette exploite l’espace supplémentaire sans devenir un dashboard différent ;
- les sections sans contenu disparaissent naturellement ;
- les informations secondaires ne concurrencent jamais l’action principale.

---

# 32. Structure de référence

Structure retenue :

```text
HEADER
  ↓
À TRAITER
  ↓
AUJOURD’HUI
  ↓
DEMAIN
  ↓
ATTENTION
  ↓
NAVIGATION
```

avec une **priorisation dynamique des urgences**.

Cette structure doit rester suffisamment simple pour un usage quotidien tout en permettant d’ajouter ultérieurement de nouveaux signaux opérationnels sans transformer la home en tableau de bord complexe.
