# AdminMarketListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/markets.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── market-list-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Quels marchés sont configurés, et lesquels sont actifs ?**

Il doit permettre de :

- voir tous les marchés configurés ;
- distinguer les marchés actifs et inactifs ;
- voir le jour, l’horaire et le lieu ;
- voir la prochaine occurrence ;
- ouvrir un marché ;
- créer un nouveau marché ;
- désactiver un marché sans supprimer son historique.

---

# 3. Principe UX

Cet écran est un écran de **configuration**, pas d’exploitation quotidienne.

Il doit donc être plus calme que :

```text
AdminDistributionPlanningScreen
```

On ne cherche pas principalement :

> Que dois-je faire maintenant ?

mais :

> Comment sont configurés mes marchés ?

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marchés                  ＋   │
├─────────────────────────────────┤
│                                 │
│ [ Actifs 3 ] [ Tous 4 ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marché Saint-Pierre        │ │
│ │                             │ │
│ │ Samedi                      │ │
│ │ 08:00 – 12:00               │ │
│ │                             │ │
│ │ Place Saint-Pierre          │ │
│ │                             │ │
│ │ Prochain                    │ │
│ │ Samedi 29 août              │ │
│ │                             │ │
│ │ Actif                       │ │
│ │                          >  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marché de Montville        │ │
│ │                             │ │
│ │ Dimanche                    │ │
│ │ 09:00 – 13:00               │ │
│ │                             │ │
│ │ Place du Marché             │ │
│ │                             │ │
│ │ Prochain                    │ │
│ │ Dimanche 30 août            │ │
│ │                             │ │
│ │ Actif                       │ │
│ │                          >  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marché du Bourg            │ │
│ │                             │ │
│ │ Vendredi                    │ │
│ │ 16:00 – 19:00               │ │
│ │                             │ │
│ │ Inactif                     │ │
│ │                          >  │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Carte marché

Une carte doit afficher au minimum :

```text
Marché Saint-Pierre

Samedi
08:00 – 12:00

Place Saint-Pierre

Prochain
Samedi 29 août

Actif
```

Toute la carte est tappable.

---

# 6. Informations prioritaires

Ordre visuel recommandé :

```text
NOM
 ↓
RÉCURRENCE
 ↓
HORAIRE
 ↓
LIEU
 ↓
PROCHAINE OCCURRENCE
 ↓
ÉTAT
```

Le nombre de commandes n’a pas sa place ici.

Il appartient aux occurrences.

---

# 7. Actif / inactif

Un marché peut être :

```text
Actif
Inactif
```

`Inactif` signifie :

- le modèle reste dans l’historique ;
- aucune nouvelle occurrence automatique n’est générée ;
- les occurrences passées restent intactes.

Il ne faut pas supprimer le modèle simplement parce que le marché n’a plus lieu.

---

# 8. Filtre par défaut

Je mettrais :

```text
[ Actifs 3 ] [ Tous 4 ]
```

Par défaut :

```text
Actifs
```

Cela évite d’encombrer l’usage avec d’anciens marchés.

---

# 9. Marché inactif

Exemple :

```text
Marché du Bourg

Vendredi
16:00 – 19:00

Inactif

Aucune nouvelle occurrence
ne sera générée.
```

La carte reste accessible pour consultation ou réactivation.

---

# 10. Prochaine occurrence

Afficher :

```text
Prochain
Samedi 29 août
```

si une occurrence future existe.

Si aucune occurrence n’est encore créée :

```text
Aucune occurrence à venir
```

Cela peut révéler une configuration incomplète ou simplement un horizon de génération court.

---

# 11. Pourquoi afficher la prochaine occurrence

Cela aide à distinguer :

```text
modèle configuré
```

de :

```text
activité réellement planifiée
```

et donne une vérification rapide :

> oui, ce marché produira bien une activité samedi prochain.

---

# 12. Bouton `+`

Le bouton :

```text
＋
```

ouvre :

```text
AdminMarketEditScreen
```

en mode création.

Je n’utiliserais pas un `Sheet` pour créer tout le marché si le formulaire contient plusieurs sections.

---

# 13. État vide

Si aucun marché :

```text
Aucun marché configuré.

Ajoutez votre premier marché
pour planifier des occurrences
récurrentes.

[ Ajouter un marché ]
```

---

# 14. Recherche

Pas indispensable en V1 si le maraîcher a peu de marchés.

Avec 2 à 10 marchés, une recherche est probablement inutile.

Je l’ajouterais uniquement si l’usage réel montre une liste importante.

---

# 15. Tri

Ordre recommandé :

1. actifs ;
2. jour de semaine ;
3. heure.

Exemple :

```text
Mercredi 14:00
Vendredi 16:00
Samedi 08:00
Dimanche 09:00
```

Mais il peut être plus intuitif de trier selon la **prochaine occurrence réelle**.

Je privilégierais :

> prochaine occurrence ascendante.

Puis les marchés inactifs en fin de liste.

---

# 16. Pas de suppression directe depuis la liste

Éviter :

```text
swipe → supprimer
```

Un modèle de marché est lié à l’historique.

La désactivation doit être l’action standard.

La suppression définitive peut être réservée aux marchés sans aucune occurrence historique, si elle existe vraiment.

---

# 17. Tap sur une carte

Flux :

```text
AdminMarketListScreen
       ↓
AdminMarketDetailsScreen
```

Cet écran détail affichera :

- configuration ;
- prochaines occurrences ;
- historique récent ;
- modification ;
- activation/désactivation.

---

# 18. Menu global éventuel

Un menu secondaire du header peut proposer :

```text
Voir le planning
Modes de récupération
```

Mais il n’est pas nécessaire si la navigation Distribution est déjà claire.

---

# 19. Tablette portrait

Deux cartes par ligne deviennent possibles.

```text
┌───────────────────────────────────────────┐
│ Marchés                                  │
├─────────────────────┬─────────────────────┤
│ Saint-Pierre        │ Montville           │
│ Samedi 08:00        │ Dimanche 09:00      │
│ Prochain 29 août    │ Prochain 30 août    │
│ Actif               │ Actif               │
├─────────────────────┼─────────────────────┤
│ Bourg               │                     │
│ Vendredi 16:00      │                     │
│ Inactif             │                     │
└─────────────────────┴─────────────────────┘
```

Les cartes doivent garder une grande zone tactile.

---

# 20. Tablette paysage

Une liste plus dense peut fonctionner :

```text
┌──────────────────────────────────────────────────────┐
│ Marché              Récurrence      Prochain   État │
├──────────────────────────────────────────────────────┤
│ Saint-Pierre        Sam. 08–12      29 août    Actif│
│ Montville           Dim. 09–13      30 août    Actif│
│ Bourg               Ven. 16–19      —          Inactif
└──────────────────────────────────────────────────────┘
```

Mais chaque ligne doit rester tappable et confortable.

---

# 21. Desktop

Sur desktop, la liste tabulaire devient pertinente.

Exemple :

```text
Marchés

[ Actifs ] [ Tous ]                         [ + Ajouter ]

Nom              Jour       Horaire      Prochain      État
Saint-Pierre     Samedi     08–12        29 août       Actif
Montville        Dimanche   09–13        30 août       Actif
Bourg            Vendredi   16–19        —             Inactif
```

---

# 22. Données nécessaires

Projection possible :

```ts
type MarketListItem = {
  marketId: string

  name: string

  recurrence: {
    weekday: number
    startsAt: string
    endsAt?: string
  }

  location: {
    label: string
    address?: string
  }

  active: boolean

  nextOccurrence?: {
    id: string
    date: string
    startsAt?: string
  }
}
```

---

# 23. Query

Conceptuellement :

```text
GET /admin/distribution/markets
```

avec :

```text
status=active|all
```

Pas besoin d’une API complexe.

---

# 24. Génération des occurrences

Le modèle peut servir à générer automatiquement des occurrences à horizon glissant.

Exemple :

```text
Marché Saint-Pierre
Tous les samedis
```

produit :

```text
29 août
5 septembre
12 septembre
...
```

Mais l’écran liste ne doit pas exposer cette mécanique technique en détail.

Il suffit de montrer :

```text
Prochaine occurrence
Samedi 29 août
```

---

# 25. Occurrence modifiée indépendamment

Une occurrence particulière peut différer du modèle.

Exemple :

```text
Marché Saint-Pierre
Samedi 5 septembre
10:00 – 13:00 exceptionnellement
```

Cela ne doit pas modifier automatiquement le modèle récurrent.

Le marché reste :

```text
Tous les samedis
08:00 – 12:00
```

Cette distinction est fondamentale.

---

# 26. Marché temporairement suspendu

Pour V1, ne pas ajouter forcément un concept complexe de suspension avec dates.

On peut :

- désactiver le marché ;
- ou annuler une occurrence spécifique.

Si un marché est simplement annulé une semaine :

> annuler l’occurrence, pas désactiver le modèle.

---

# 27. Alerte de configuration

Si un marché actif manque d’une donnée nécessaire :

```text
⚠ Configuration incomplète
```

Exemple :

```text
Marché Saint-Pierre

Samedi
Horaire manquant

[ Compléter ]
```

Idéalement, un marché invalide ne devrait toutefois pas pouvoir être activé.

---

# 28. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Tabs
Card
Badge
EmptyState
Skeleton
ResponsiveGrid
Button
```

---

# 29. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
MarketCard
MarketStatusBadge
RecurrenceSummary
NextOccurrenceSummary
```

---

# 30. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── market-list-screen.tsx
├── components/
│   ├── market-list-filter.tsx
│   ├── market-list.tsx
│   └── market-empty-state.tsx
└── index.ts
```

---

# 31. États principaux

Prévoir :

```text
loading
ready
empty
error
```

Pas besoin d’une machine d’état complexe.

---

# 32. Chargement

Skeleton de cartes :

```text
┌─────────────────────────────┐
│ █████████████               │
│ ███████                     │
│                             │
│ ██████████                  │
│                             │
│ ██████                      │
└─────────────────────────────┘
```

---

# 33. Erreur

```text
Impossible de charger les marchés.

[ Réessayer ]
```

---

# 34. Accessibilité

Points importants :

- `Actif` / `Inactif` textuels ;
- carte entière accessible au clavier ;
- informations de récurrence lisibles par lecteur d’écran ;
- bouton d’ajout avec label accessible complet `Ajouter un marché`.

---

# 35. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’utilisateur distingue immédiatement modèles de marché et occurrences ;
- tous les marchés actifs sont visibles rapidement ;
- jour, horaire et lieu sont identifiables sans ouvrir une fiche ;
- la prochaine occurrence est visible ;
- un marché inactif ne disparaît pas de l’historique ;
- la désactivation est préférée à la suppression ;
- la création d’un marché est facile à trouver ;
- les marchés inactifs n’encombrent pas la vue par défaut ;
- l’écran reste simple sur mobile ;
- tablette et desktop peuvent augmenter la densité sans modifier le modèle mental.

---

# 36. Structure de référence

```text
HEADER + AJOUT
      ↓
ACTIFS / TOUS
      ↓
MARCHÉS
      ↓
RÉCURRENCE
      ↓
PROCHAINE OCCURRENCE
      ↓
ÉTAT
```

Cette structure doit permettre de gérer simplement les modèles récurrents de marché tout en maintenant une distinction nette avec les occurrences datées du planning.
