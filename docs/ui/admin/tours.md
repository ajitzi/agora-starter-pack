# AdminTourListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/tours.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── tour-list-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles tournées sont configurées, quand ont-elles lieu et combien d’arrêts comportent-elles ?**

Il doit permettre de :

- voir toutes les tournées configurées ;
- distinguer actives et inactives ;
- voir le jour et l’heure de départ ;
- voir le nombre d’arrêts ;
- voir éventuellement le marché final ;
- voir la prochaine occurrence ;
- ouvrir une tournée ;
- créer une nouvelle tournée ;
- désactiver une tournée sans perdre son historique.

---

# 3. Principe UX

Comme pour les marchés, cet écran est un écran de **configuration**.

Il ne doit pas devenir une vue de navigation GPS ou d’exploitation temps réel.

La question ici est :

> Comment mes tournées types sont-elles organisées ?

La question :

> Où dois-je aller maintenant ?

appartient à l’occurrence de tournée.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Tournées                 ＋   │
├─────────────────────────────────┤
│                                 │
│ [ Actives 2 ] [ Toutes 3 ]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tournée Nord               │ │
│ │                             │ │
│ │ Mercredi                    │ │
│ │ Départ 14:00                │ │
│ │                             │ │
│ │ 4 arrêts                    │ │
│ │                             │ │
│ │ Saint-Pierre                │ │
│ │ → Montville                 │ │
│ │ → Le Bourg                  │ │
│ │ → Marché Saint-Pierre       │ │
│ │                             │ │
│ │ Prochaine                   │ │
│ │ Mercredi 26 août            │ │
│ │                             │ │
│ │ Actif                    >  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tournée Sud                │ │
│ │                             │ │
│ │ Vendredi                    │ │
│ │ Départ 15:00                │ │
│ │                             │ │
│ │ 3 arrêts                    │ │
│ │                             │ │
│ │ Prochaine                   │ │
│ │ Vendredi 28 août            │ │
│ │                             │ │
│ │ Actif                    >  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Ancienne tournée Est       │ │
│ │                             │ │
│ │ Mardi                       │ │
│ │ 5 arrêts                    │ │
│ │                             │ │
│ │ Inactive                 >  │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Carte tournée

Une carte doit afficher au minimum :

```text
Tournée Nord

Mercredi
Départ 14:00

4 arrêts

Prochaine
Mercredi 26 août

Actif
```

Si la liste des arrêts reste courte, on peut ajouter un aperçu :

```text
Saint-Pierre
→ Montville
→ Le Bourg
→ Marché Saint-Pierre
```

Mais pas si cela rend la carte trop haute.

---

# 6. Informations prioritaires

Ordre recommandé :

```text
NOM
 ↓
RÉCURRENCE
 ↓
HEURE DE DÉPART
 ↓
NOMBRE D’ARRÊTS
 ↓
APERÇU DU TRAJET
 ↓
PROCHAINE OCCURRENCE
 ↓
ÉTAT
```

---

# 7. Tournée active / inactive

Deux états :

```text
Active
Inactive
```

Une tournée inactive :

- reste consultable ;
- conserve ses occurrences passées ;
- conserve son historique ;
- ne génère plus de nouvelles occurrences.

Même principe que pour les marchés.

---

# 8. Filtre par défaut

```text
[ Actives 2 ] [ Toutes 3 ]
```

Par défaut :

```text
Actives
```

Les anciennes tournées ne doivent pas encombrer la vue principale.

---

# 9. Nombre d’arrêts

Exemple :

```text
4 arrêts
```

C’est une information structurante.

Elle donne immédiatement une idée de la complexité de la tournée.

Si un marché final fait partie de la tournée, le compter comme un arrêt s’il s’agit bien d’un point du trajet opérationnel.

---

# 10. Aperçu des arrêts

Pour quatre arrêts :

```text
Saint-Pierre
→ Montville
→ Le Bourg
→ Marché Saint-Pierre
```

Pour huit arrêts :

```text
Saint-Pierre
→ Montville
→ 6 autres arrêts
```

Ne pas dérouler toute la tournée dans la liste.

---

# 11. Marché final

Si la tournée se termine par un marché :

```text
Termine à
Marché Saint-Pierre
```

ou simplement dans l’aperçu :

```text
→ Marché Saint-Pierre
```

Ce point peut être important car il structure parfois la préparation et la distribution.

---

# 12. Prochaine occurrence

Afficher :

```text
Prochaine
Mercredi 26 août
```

si une occurrence est prévue.

Sinon :

```text
Aucune occurrence à venir
```

Comme pour les marchés, cela confirme que le modèle produit bien des activités planifiées.

---

# 13. Pourquoi ne pas afficher les commandes ici

Le nombre de commandes appartient aux occurrences.

Exemple :

```text
Tournée Nord
Mercredi 26 août
7 commandes
```

est une information de l’occurrence.

Le modèle, lui, décrit :

```text
Tournée Nord
Tous les mercredis
4 arrêts
```

---

# 14. Bouton `+`

Le bouton :

```text
＋
```

ouvre :

```text
AdminTourEditScreen
```

en mode création.

Une tournée contient plusieurs arrêts : il faut donc un vrai écran de formulaire, pas un simple `Sheet`.

---

# 15. État vide

```text
Aucune tournée configurée.

Créez une tournée pour organiser
des livraisons récurrentes avec
plusieurs arrêts.

[ Ajouter une tournée ]
```

---

# 16. Tri

Privilégier :

1. prochaines occurrences ;
2. puis jour / heure ;
3. inactives à la fin.

Ainsi les modèles les plus proches dans le temps apparaissent naturellement en premier.

---

# 17. Recherche

Comme pour les marchés, pas nécessaire en V1 si le nombre de tournées reste faible.

Une ferme aura probablement :

```text
1 à 10 tournées
```

et non plusieurs centaines.

---

# 18. Pas de suppression rapide

Éviter :

```text
swipe → supprimer
```

Une tournée peut être liée à :

- des occurrences ;
- des commandes ;
- des livraisons historiques.

La désactivation est l’action standard.

---

# 19. Tap sur la carte

Flux :

```text
AdminTourListScreen
       ↓
AdminTourDetailsScreen
```

Le détail permettra de voir :

- récurrence ;
- heure de départ ;
- arrêts ordonnés ;
- marché final éventuel ;
- prochaines occurrences ;
- historique ;
- modification ;
- activation/désactivation.

---

# 20. Modèle versus occurrence

Concept important :

```text
Tournée Nord
Tous les mercredis
```

est un modèle.

Alors que :

```text
Tournée Nord
Mercredi 26 août
```

est une occurrence.

Une occurrence peut être modifiée sans modifier la tournée type.

---

# 21. Arrêts d’une tournée

Chaque arrêt du modèle représente un point ordonné.

Exemple :

```text
1. Ferme
2. Saint-Pierre
3. Montville
4. Marché Saint-Pierre
```

Selon le métier, la ferme de départ peut être implicite.

Ne pas la compter forcément comme un arrêt client si elle ne correspond pas à une remise.

---

# 22. Arrêt sans commandes

Un arrêt peut exister dans le modèle même s’il n’a aucune commande pour une occurrence donnée.

Exemple :

```text
Montville
0 commande cette semaine
```

Cela relève de l’occurrence, pas de la liste des modèles.

---

# 23. Ordre des arrêts

L’ordre fait partie du modèle.

Exemple :

```text
Saint-Pierre
→ Montville
→ Le Bourg
```

V1 :

> pas d’optimisation automatique de route.

L’admin définit l’ordre lui-même.

---

# 24. Pas de kilométrage obligatoire

Ne pas ajouter dans la liste :

```text
43,2 km
1 h 18
```

sauf si le produit finit réellement par gérer le calcul de trajet.

Ce serait prématuré et risquerait de suggérer une optimisation qui n’existe pas.

---

# 25. Tournée avec configuration incomplète

Idéalement, impossible à activer.

Sinon :

```text
⚠ Configuration incomplète

Tournée Nord

Aucun arrêt défini.

[ Compléter ]
```

---

# 26. Tournée inactive

```text
Ancienne tournée Est

Mardi
5 arrêts

Inactive

Aucune nouvelle occurrence
ne sera générée.
```

Toujours consultable.

---

# 27. Tablette portrait

Deux cartes par ligne possibles :

```text
┌───────────────────────────────────────────┐
│ Tournées                                 │
├─────────────────────┬─────────────────────┤
│ Tournée Nord        │ Tournée Sud         │
│ Mer. 14:00          │ Ven. 15:00          │
│ 4 arrêts            │ 3 arrêts            │
│ Prochaine 26 août   │ Prochaine 28 août   │
│ Active              │ Active              │
└─────────────────────┴─────────────────────┘
```

---

# 28. Tablette paysage

Une liste tabulaire devient intéressante :

```text
┌───────────────────────────────────────────────────────────┐
│ Tournée         Récurrence    Arrêts   Prochaine    État │
├───────────────────────────────────────────────────────────┤
│ Nord            Mer. 14:00    4        26 août      Active
│ Sud             Ven. 15:00    3        28 août      Active
│ Est             Mar. 13:00    5        —            Inactive
└───────────────────────────────────────────────────────────┘
```

---

# 29. Desktop

Même logique.

On peut ajouter une colonne :

```text
Dernier arrêt
```

si cela améliore réellement la reconnaissance.

Exemple :

```text
Nord   Mer. 14:00   4   Marché Saint-Pierre   26 août   Active
```

---

# 30. Pas de carte géographique dans cette vue

Ne pas ajouter une map dans la liste des tournées.

Elle prendrait beaucoup de place et apporterait peu d’information opérationnelle ici.

La carte devient éventuellement pertinente dans :

```text
AdminTourDetailsScreen
```

ou dans l’occurrence en cours.

---

# 31. Données nécessaires

Projection possible :

```ts
type TourListItem = {
  tourId: string

  name: string

  recurrence: {
    weekday: number
    departureTime: string
  }

  stopCount: number

  stopsPreview: {
    id: string
    label: string
  }[]

  finalMarket?: {
    marketId: string
    label: string
  }

  active: boolean

  nextOccurrence?: {
    occurrenceId: string
    date: string
    departureTime?: string
  }
}
```

---

# 32. `stopsPreview`

Pas besoin de renvoyer tous les arrêts dans la projection liste.

Exemple :

```ts
stopsPreview: [
  { label: "Saint-Pierre" },
  { label: "Montville" },
  { label: "Marché Saint-Pierre" }
]
```

avec :

```text
stopCount = 6
```

L’UI peut afficher :

```text
Saint-Pierre → Montville → 4 autres
```

---

# 33. Query

Conceptuellement :

```text
GET /admin/distribution/tours
```

avec :

```text
status=active|all
```

---

# 34. Génération des occurrences

Comme les marchés :

```text
Tournée Nord
Tous les mercredis à 14:00
```

peut générer :

```text
26 août
2 septembre
9 septembre
...
```

L’écran n’a pas besoin d’exposer le mécanisme technique.

---

# 35. Occurrence modifiée localement

Une occurrence peut avoir :

```text
départ 15:00 exceptionnellement
```

ou :

```text
arrêt Montville supprimé cette semaine
```

sans modifier le modèle.

Dans le détail de la tournée, cette occurrence devra être marquée comme personnalisée.

---

# 36. Désactivation

Comme pour les marchés :

```text
Désactiver la tournée
```

doit signifier :

```text
arrêt de la génération future
```

et non :

```text
annulation des occurrences déjà créées
```

Les occurrences déjà planifiées restent inchangées.

---

# 37. Historique

Une tournée inactive conserve :

- ses anciennes occurrences ;
- les commandes associées ;
- les événements de livraison.

Aucune suppression en cascade.

---

# 38. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Tabs
Card
Badge
Button
EmptyState
Skeleton
ResponsiveGrid
```

---

# 39. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
TourCard
TourStatusBadge
TourRecurrenceSummary
TourStopsPreview
NextOccurrenceSummary
```

`TourStopsPreview` sera particulièrement réutilisable.

---

# 40. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── tour-list-screen.tsx
├── components/
│   ├── tour-list-filter.tsx
│   ├── tour-list.tsx
│   └── tour-empty-state.tsx
└── index.ts
```

---

# 41. États principaux

Prévoir :

```text
loading
ready
empty
error
```

---

# 42. Chargement

Skeleton :

```text
┌─────────────────────────────┐
│ ████████████                │
│ ███████                     │
│                             │
│ █████████                   │
│ ███████████████             │
│                             │
│ ██████                      │
└─────────────────────────────┘
```

---

# 43. Erreur

```text
Impossible de charger les tournées.

[ Réessayer ]
```

---

# 44. Accessibilité

Points importants :

- `Active` / `Inactive` textuels ;
- ordre des arrêts lisible par lecteur d’écran ;
- carte entière tappable ;
- bouton `Ajouter une tournée` correctement nommé ;
- ne pas communiquer l’ordre du trajet uniquement par une représentation graphique.

---

# 45. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’utilisateur distingue immédiatement les modèles de tournée de leurs occurrences ;
- le jour et l’heure de départ sont visibles ;
- le nombre d’arrêts est visible ;
- un aperçu du trajet est compréhensible sans ouvrir le détail ;
- aucune optimisation automatique de route n’est suggérée ;
- la prochaine occurrence est visible ;
- une tournée inactive conserve son historique ;
- la désactivation remplace la suppression dans l’usage normal ;
- les tournées inactives n’encombrent pas la vue par défaut ;
- l’expérience reste très simple sur mobile.

---

# 46. Structure de référence

```text
HEADER + AJOUT
      ↓
ACTIVES / TOUTES
      ↓
TOURNÉES
      ↓
RÉCURRENCE
      ↓
ARRÊTS
      ↓
PROCHAINE OCCURRENCE
      ↓
ÉTAT
```

Cette structure doit permettre de gérer simplement les modèles récurrents de tournée tout en maintenant une distinction nette avec les occurrences datées du planning.
