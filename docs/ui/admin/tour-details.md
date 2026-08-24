# AdminTourDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/tour-details.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── tour-details-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Comment cette tournée est-elle organisée ?**

et :

> **Quelles activités vont être générées à partir de ce modèle ?**

Il doit permettre de :

- voir le jour et l’heure de départ ;
- voir tous les arrêts dans leur ordre ;
- identifier éventuellement un marché final ;
- voir la prochaine occurrence ;
- voir plusieurs occurrences futures ;
- repérer les occurrences personnalisées ;
- accéder à l’historique ;
- modifier le modèle ;
- désactiver ou réactiver la tournée.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Tournée Nord             ⋯    │
│                                 │
│ Active                          │
├─────────────────────────────────┤
│                                 │
│ RÉCURRENCE                      │
│                                 │
│ Tous les mercredis              │
│ Départ 14:00                    │
│                                 │
│ [ Modifier ]                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TRAJET                          │
│                                 │
│ 1                               │
│ Saint-Pierre                    │
│ Place de l’Église               │
│ │                               │
│ 2                               │
│ Montville                       │
│ Parking mairie                  │
│ │                               │
│ 3                               │
│ Le Bourg                        │
│ Place centrale                  │
│ │                               │
│ 4                               │
│ Marché Saint-Pierre             │
│ Marché final                    │
│                                 │
│ 4 arrêts                        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PROCHAINE OCCURRENCE            │
│                                 │
│ Mercredi 26 août                │
│ Départ 14:00                    │
│                                 │
│ 7 commandes                     │
│ 5 préparées                     │
│                                 │
│ [ Voir l’occurrence ]           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ À VENIR                         │
│                                 │
│ Mercredi 2 septembre          > │
│ 14:00                           │
│                                 │
│ Mercredi 9 septembre          > │
│ 14:00                           │
│                                 │
│ Mercredi 16 septembre         > │
│ 15:00 · Exception               │
│                                 │
│ [ Voir tout le planning ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ HISTORIQUE                      │
│                                 │
│ Mercredi 19 août                │
│ Terminée                      > │
│                                 │
│ Mercredi 12 août                │
│ Terminée                      > │
│                                 │
│ [ Voir l’historique ]           │
│                                 │
└─────────────────────────────────┘
```

L’écran est surtout consultatif ; pas besoin d’un CTA sticky permanent.

---

# 4. Header

Le header affiche :

```text
Tournée Nord
Active
```

ou :

```text
Ancienne tournée Est
Inactive
```

Menu `⋯` :

```text
Modifier
Désactiver
```

ou :

```text
Réactiver
```

selon l’état.

---

# 5. Bloc récurrence

Exemple :

```text
RÉCURRENCE

Tous les mercredis
Départ 14:00
```

La formulation doit rester humaine.

Pas :

```text
weekday = 3
departureTime = 14:00
```

---

# 6. Récurrence V1

Comme pour les marchés :

```text
un jour de semaine
+
une heure de départ
```

Cela suffit pour le modèle V1.

Une éventuelle heure de fin n’est pas nécessaire : contrairement à un marché, la durée réelle d’une tournée dépend des arrêts et des distributions.

---

# 7. Trajet

Le trajet est la partie centrale de cet écran.

Exemple :

```text
TRAJET

1. Saint-Pierre
   Place de l’Église

2. Montville
   Parking mairie

3. Le Bourg
   Place centrale

4. Marché Saint-Pierre
   Marché final
```

La position de chaque arrêt doit être immédiatement visible.

---

# 8. Ordre explicite

L’ordre fait partie du métier.

Ne pas afficher seulement une collection de lieux.

Il faut faire comprendre :

```text
Saint-Pierre
     ↓
Montville
     ↓
Le Bourg
     ↓
Marché Saint-Pierre
```

Cet ordre sera utilisé comme référence opérationnelle.

---

# 9. Pas d’optimisation automatique

Règle V1 :

> **L’ordre est défini manuellement par le maraîcher.**

L’interface ne doit donc pas afficher :

```text
Trajet optimisé
```

ou :

```text
Meilleur itinéraire
```

si aucune optimisation n’existe réellement.

---

# 10. Arrêt

Chaque arrêt peut afficher :

```text
2

Montville
Parking mairie

Retrait
```

ou :

```text
4

Marché Saint-Pierre
Place du Marché

Marché final
```

Le type peut être utile :

```text
Retrait
Livraison
Marché final
```

si les arrêts ont réellement des comportements différents.

---

# 11. Adresse

Si disponible :

```text
Montville
Parking mairie

12 rue ...
```

Garder l’adresse secondaire pour éviter de surcharger le trajet.

Un tap peut ouvrir plus de détails.

---

# 12. Marché final

Si la tournée se termine par un marché :

```text
4. Marché Saint-Pierre

Marché final
```

Le lien vers le marché peut être tappable :

```text
Voir le marché
```

Ce marché reste un modèle distinct.

---

# 13. Pas de marché final

Le modèle doit aussi fonctionner sans marché final :

```text
1. Saint-Pierre
2. Montville
3. Le Bourg
```

Il ne faut pas rendre le marché final obligatoire.

---

# 14. Départ de la ferme

On peut afficher :

```text
Départ
Ferme
```

si le point de départ est important.

Mais distinguer :

```text
point de départ
```

de :

```text
arrêt de distribution
```

pour ne pas fausser le compteur.

Exemple :

```text
Départ : Ferme
3 arrêts
```

plutôt que :

```text
4 arrêts
```

si la ferme n’est pas un point de remise.

---

# 15. Nombre d’arrêts

Sous le trajet :

```text
4 arrêts
```

ou :

```text
3 arrêts + 1 marché final
```

La seconde formulation peut être utile si le marché final joue un rôle particulier.

---

# 16. Notes par arrêt

Un arrêt peut avoir une note interne :

```text
Montville

Parking mairie

Note
Se garer derrière la salle.
```

Cette note peut être héritée par les occurrences.

---

# 17. Note générale de tournée

Une section facultative :

```text
NOTE INTERNE

Prendre les caisses bleues
pour les deux premiers arrêts.
```

Visible uniquement par l’équipe.

---

# 18. Prochaine occurrence

Exemple :

```text
PROCHAINE OCCURRENCE

Mercredi 26 août
Départ 14:00

7 commandes
5 préparées

[ Voir l’occurrence ]
```

Comme pour le marché, cette section relie :

```text
modèle
```

et :

```text
activité datée
```

---

# 19. Résumé par arrêt dans la prochaine occurrence

On peut aller légèrement plus loin :

```text
7 commandes

Saint-Pierre    2
Montville       3
Le Bourg        2
```

Mais ne l’afficher que si cela apporte une vraie valeur opérationnelle.

Par défaut, le résumé global suffit.

---

# 20. Occurrences futures

Exemple :

```text
À VENIR

Mercredi 2 septembre
14:00

Mercredi 9 septembre
14:00

Mercredi 16 septembre
15:00
Exception
```

Chaque occurrence est tappable.

---

# 21. Occurrence personnalisée

Une occurrence peut différer du modèle.

Exemple :

```text
Mercredi 16 septembre
Départ 15:00

Horaire exceptionnel
```

ou :

```text
Mercredi 23 septembre

3 arrêts
Montville retiré cette semaine

Exception
```

L’exception doit être clairement identifiable.

---

# 22. Arrêt modifié dans une occurrence

Cas :

```text
Tournée type
Saint-Pierre
→ Montville
→ Le Bourg
```

Occurrence du 9 septembre :

```text
Saint-Pierre
→ Le Bourg
```

Cela ne modifie pas le modèle.

L’occurrence est marquée :

```text
Trajet personnalisé
```

---

# 23. Historique

Exemple :

```text
HISTORIQUE

Mercredi 19 août
Terminée

Mercredi 12 août
Terminée
```

Chaque ligne ouvre l’occurrence historique.

---

# 24. Tournée inactive

Même inactive :

```text
Tournée Est
Inactive
```

le trajet et l’historique restent consultables.

On affiche :

```text
Aucune nouvelle occurrence
ne sera générée.
```

---

# 25. Modifier

Action :

```text
[ Modifier ]
```

ouvre :

```text
AdminTourEditScreen
```

Le formulaire permet de modifier :

- nom ;
- récurrence ;
- heure de départ ;
- arrêts ;
- ordre ;
- notes ;
- marché final éventuel.

---

# 26. Point critique : modifier le trajet

Exemple :

```text
Saint-Pierre
→ Montville
→ Le Bourg
```

devient :

```text
Saint-Pierre
→ Le Bourg
→ Montville
```

C’est une modification potentiellement importante.

Mais pour la V1, appliquer la même règle sûre que pour les marchés :

> **Les occurrences déjà créées ne sont pas modifiées automatiquement.**

---

# 27. Pourquoi ne pas propager automatiquement

Parce qu’une occurrence peut déjà avoir :

- des commandes ;
- un ordre de livraison prévu ;
- des informations communiquées ;
- une préparation en cours.

Modifier le modèle ne doit pas réécrire silencieusement cette réalité.

---

# 28. Message post-modification

Après modification du modèle :

```text
✓ Tournée modifiée

3 occurrences futures déjà planifiées
conservent leur trajet actuel.

[ Les examiner ]
```

Simple et prévisible.

---

# 29. Ajouter un arrêt au modèle

Exemple :

```text
Saint-Pierre
→ Montville
→ Nouveau point
→ Le Bourg
```

Cet arrêt apparaît dans les **nouvelles occurrences générées ensuite**.

Les occurrences déjà existantes restent inchangées.

---

# 30. Retirer un arrêt du modèle

Même règle.

Retirer :

```text
Montville
```

du modèle ne supprime pas cet arrêt d’une occurrence future déjà générée.

Cela évite de déplacer ou perdre des commandes silencieusement.

---

# 31. Changer l’ordre

L’ordre peut être modifié dans `AdminTourEditScreen`, probablement par :

```text
drag & drop
```

sur tablette/desktop.

Sur mobile, prévoir également des actions accessibles :

```text
Monter
Descendre
```

pour ne pas dépendre exclusivement du drag.

---

# 32. Désactivation

Action :

```text
Désactiver la tournée
```

Confirmation :

```text
Désactiver Tournée Nord ?

Aucune nouvelle occurrence ne sera créée
à partir de ce modèle.

Les occurrences déjà planifiées
et l’historique seront conservés.

[ Annuler ]
[ Désactiver ]
```

---

# 33. Occurrences futures après désactivation

Message :

```text
✓ Tournée désactivée

2 occurrences futures existantes
restent planifiées.
```

La désactivation ne signifie pas annulation.

---

# 34. Réactivation

Pour une tournée inactive :

```text
[ Réactiver la tournée ]
```

Puis :

```text
✓ Tournée réactivée

Les nouvelles occurrences utiliseront
la configuration actuelle.
```

---

# 35. Suppression

Comme pour les marchés, ne pas exposer de suppression dans le workflow normal.

La désactivation suffit.

Une suppression définitive éventuelle n’est acceptable que si aucune donnée historique n’existe.

---

# 36. Annuler une seule occurrence

Depuis l’occurrence :

```text
AdminOccurrenceDetailsScreen
```

et non depuis le modèle.

Même principe :

> une exception ponctuelle ne doit pas modifier la récurrence.

---

# 37. Tablette portrait

Deux grandes sections :

```text
┌──────────────────────────────────────────┐
│ Tournée Nord                            │
│ Active                                  │
├────────────────────┬─────────────────────┤
│ CONFIGURATION      │ PROCHAINE           │
│                    │ OCCURRENCE          │
│ Mercredi           │ 26 août             │
│ Départ 14:00       │ 7 commandes         │
│ 4 arrêts           │ 5 préparées         │
├────────────────────┴─────────────────────┤
│ TRAJET                                  │
│                                          │
│ 1 Saint-Pierre                          │
│ 2 Montville                             │
│ 3 Le Bourg                              │
│ 4 Marché Saint-Pierre                   │
└──────────────────────────────────────────┘
```

---

# 38. Tablette paysage

Disposition idéale :

```text
┌─────────────────────────────┬──────────────────────────┐
│ TRAJET                      │ OCCURRENCES              │
│                             │                          │
│ Départ 14:00                │ Prochaine · 26 août     │
│                             │                          │
│ 1 Saint-Pierre              │ 2 septembre             │
│ 2 Montville                 │ 9 septembre             │
│ 3 Le Bourg                  │ 16 septembre            │
│ 4 Marché SP                 │                          │
│                             │ Historique               │
│ [ Modifier ]                │                          │
└─────────────────────────────┴──────────────────────────┘
```

---

# 39. Desktop

Même modèle que tablette paysage.

La colonne trajet peut rester sticky pendant le scroll des occurrences.

---

# 40. Une carte géographique ?

Une représentation cartographique peut être utile plus tard, mais la garder **secondaire**.

Le trajet opérationnel de référence reste :

```text
liste ordonnée des arrêts
```

car cette liste :

- fonctionne partout ;
- reste accessible ;
- exprime sans ambiguïté l’ordre choisi par le maraîcher.

La carte ne doit jamais remplacer cette liste.

---

# 41. État sans prochaine occurrence

```text
Aucune occurrence à venir.

La tournée est active mais aucune activité
n’est actuellement planifiée.
```

Action éventuelle :

```text
[ Créer une occurrence ]
```

---

# 42. Erreur partielle

Si le modèle charge mais pas les occurrences :

```text
Impossible de charger les occurrences.

[ Réessayer ]
```

Le trajet reste visible.

---

# 43. Projection de données

Exemple :

```ts
type TourDetails = {
  tour: {
    id: string
    version: number

    name: string

    recurrence: {
      weekday: number
      departureTime: string
    }

    active: boolean

    departure?: {
      label: string
      address?: string
    }

    stops: TourStop[]

    internalNote?: string
  }

  nextOccurrence?: TourOccurrenceSummary

  upcomingOccurrences: TourOccurrenceSummary[]

  recentOccurrences: TourOccurrenceSummary[]

  actions: {
    canEdit: boolean
    canDeactivate: boolean
    canReactivate: boolean
  }
}
```

---

# 44. Arrêt

```ts
type TourStop = {
  id: string

  position: number

  type:
    | "pickup"
    | "delivery"
    | "market"

  label: string

  location: {
    label?: string
    address?: string
  }

  marketId?: string

  internalNote?: string
}
```

---

# 45. Résumé d’occurrence

```ts
type TourOccurrenceSummary = {
  occurrenceId: string

  date: string
  departureTime: string

  status:
    | "upcoming"
    | "in_progress"
    | "to_close"
    | "closed"
    | "cancelled"

  customized: boolean

  customizationSummary?: string

  orders?: {
    total: number
    prepared: number
    delivered?: number
  }
}
```

---

# 46. Query

Conceptuellement :

```text
GET /admin/distribution/tours/:id
```

La projection agrège :

- modèle ;
- arrêts ;
- prochaine occurrence ;
- occurrences futures ;
- historique récent.

---

# 47. Désactivation

Mutation dédiée :

```text
POST /admin/distribution/tours/:id/deactivate
```

Réactivation :

```text
POST /admin/distribution/tours/:id/reactivate
```

---

# 48. Concurrence

Le modèle possède :

```text
version
```

En cas de modification concurrente :

```text
⚠ Cette tournée a été modifiée ailleurs.

[ Recharger ]
```

Pas d’écrasement silencieux.

---

# 49. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Badge
Button
Alert
ConfirmDialog
Skeleton
EmptyState
ResponsivePane
```

---

# 50. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
TourStatusBadge
TourRecurrenceSummary
TourStopList
TourStopRow
TourOccurrenceList
TourOccurrenceRow
```

`TourStopList` est particulièrement important.

---

# 51. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── tour-details-screen.tsx
├── components/
│   ├── tour-details-header.tsx
│   ├── tour-configuration-section.tsx
│   ├── tour-route-section.tsx
│   ├── tour-next-occurrence.tsx
│   ├── tour-upcoming-occurrences.tsx
│   ├── tour-history.tsx
│   └── tour-actions.tsx
└── index.ts
```

---

# 52. États principaux

Prévoir :

```text
loading
ready
updating
conflict
error
```

Les occurrences peuvent charger indépendamment du modèle.

---

# 53. Accessibilité

Points importants :

- ordre numérique explicite sur chaque arrêt ;
- ne pas représenter l’ordre uniquement par une ligne graphique ;
- type d’arrêt annoncé textuellement ;
- badge `Exception` en texte ;
- boutons de modification utilisables au clavier ;
- confirmation de désactivation explicitant les conséquences.

---

# 54. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’utilisateur comprend immédiatement qu’il consulte un modèle récurrent ;
- le jour et l’heure de départ sont visibles ;
- tous les arrêts et leur ordre sont compréhensibles sans carte ;
- un marché final est clairement identifiable ;
- aucune optimisation automatique n’est suggérée ;
- la prochaine occurrence est facilement accessible ;
- une occurrence personnalisée ressort clairement ;
- modifier le modèle ne modifie jamais silencieusement les occurrences existantes ;
- désactiver ne supprime ni les occurrences futures déjà créées ni l’historique ;
- le trajet reste très lisible sur mobile et exploite davantage l’espace sur tablette.

---

# 55. Structure de référence

```text
HEADER + ÉTAT
      ↓
RÉCURRENCE
      ↓
TRAJET ORDONNÉ
      ↓
PROCHAINE OCCURRENCE
      ↓
OCCURRENCES À VENIR
      ↓
HISTORIQUE
      ↓
MODIFIER / ACTIVER / DÉSACTIVER
```

Cette structure doit permettre de consulter et gérer un modèle récurrent de tournée sans jamais confondre ce modèle avec ses occurrences datées.
