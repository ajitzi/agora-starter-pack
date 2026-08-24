# AdminMarketDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/market-details.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── market-details-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Comment ce marché est-il configuré ?**

et :

> **Quelles occurrences vont être générées à partir de ce modèle ?**

Il doit permettre de :

- voir la récurrence ;
- voir l’horaire ;
- voir le lieu ;
- voir l’état actif/inactif ;
- voir la prochaine occurrence ;
- voir plusieurs occurrences à venir ;
- ouvrir une occurrence ;
- modifier le marché ;
- désactiver ou réactiver le modèle ;
- accéder à l’historique.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marché Saint-Pierre      ⋯    │
│                                 │
│ Actif                           │
├─────────────────────────────────┤
│                                 │
│ RÉCURRENCE                      │
│                                 │
│ Tous les samedis                │
│                                 │
│ 08:00 – 12:00                   │
│                                 │
│ [ Modifier ]                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LIEU                            │
│                                 │
│ Place Saint-Pierre              │
│ 12 place Saint-Pierre           │
│                                 │
│ [ Voir le lieu ]                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PROCHAINE OCCURRENCE            │
│                                 │
│ Samedi 29 août                  │
│ 08:00 – 12:00                   │
│                                 │
│ 18 commandes                    │
│ 13 préparées                    │
│                                 │
│ [ Voir l’occurrence ]           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ À VENIR                         │
│                                 │
│ Samedi 5 septembre              │
│ 08:00 – 12:00                 > │
│                                 │
│ Samedi 12 septembre             │
│ 08:00 – 12:00                 > │
│                                 │
│ Samedi 19 septembre             │
│ 08:00 – 12:00                 > │
│                                 │
│ [ Voir tout le planning ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ HISTORIQUE                      │
│                                 │
│ Samedi 22 août                  │
│ Terminée                      > │
│                                 │
│ Samedi 15 août                  │
│ Terminée                      > │
│                                 │
│ [ Voir l’historique ]           │
│                                 │
└─────────────────────────────────┘
```

L’action principale n’est pas forcément sticky : cet écran est surtout consultatif.

---

# 4. Header

Le header doit afficher :

```text
Marché Saint-Pierre
Actif
```

ou :

```text
Marché du Bourg
Inactif
```

Le statut doit être visible immédiatement.

Actions dans `⋯` :

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

Tous les samedis
08:00 – 12:00
```

Cette formulation est plus naturelle qu’un affichage technique :

```text
weekday = 6
frequency = weekly
```

L’interface doit toujours reformuler la règle métier en langage humain.

---

# 6. Récurrence V1

Pour la V1, garder le modèle simple :

```text
un jour de semaine
+
une heure de début
+
une heure de fin facultative
```

Exemple :

```text
Tous les samedis
08:00 – 12:00
```

Pas besoin immédiatement de gérer :

- premier samedi du mois ;
- semaine paire ;
- toutes les trois semaines ;
- exclusions multiples.

Les exceptions doivent plutôt être traitées au niveau des occurrences.

---

# 7. Bloc lieu

Exemple :

```text
LIEU

Place Saint-Pierre
12 place Saint-Pierre
75000 ...
```

Actions possibles :

```text
[ Voir le lieu ]
```

et éventuellement :

```text
[ Copier l’adresse ]
```

Sur mobile, une intégration carte peut rester secondaire.

---

# 8. Mode de récupération associé

Le marché correspond aussi à un lieu/mode disponible pour les commandes.

On peut afficher :

```text
RÉCUPÉRATION

Retrait au marché
```

ou :

```text
Les clients peuvent choisir ce marché
comme lieu de récupération.
```

S’il y a une configuration d’ouverture aux commandes, elle doit être visible ici.

---

# 9. Prochaine occurrence

Le bloc le plus opérationnel de la page :

```text
PROCHAINE OCCURRENCE

Samedi 29 août
08:00 – 12:00

18 commandes
13 préparées

[ Voir l’occurrence ]
```

C’est le pont entre :

```text
modèle
```

et :

```text
activité réelle
```

---

# 10. Pourquoi afficher les compteurs ici

Contrairement à `AdminMarketListScreen`, ici un petit résumé de la prochaine occurrence est utile.

Il permet de voir :

> ce modèle produit bien une occurrence et elle est déjà utilisée.

Mais on n’affiche pas les détails de toutes les commandes.

---

# 11. Occurrences à venir

Exemple :

```text
À VENIR

Samedi 5 septembre
08:00 – 12:00

Samedi 12 septembre
08:00 – 12:00

Samedi 19 septembre
08:00 – 12:00
```

Chaque ligne est tappable et ouvre :

```text
AdminOccurrenceDetailsScreen
```

---

# 12. Occurrence modifiée localement

Cas important.

Si une occurrence particulière diffère du modèle :

```text
Samedi 5 septembre
10:00 – 13:00

Exception
```

ou :

```text
Horaire modifié pour cette date
```

Cela doit être visible.

Exemple :

```text
Samedi 5 septembre
10:00 – 13:00
Horaire exceptionnel
```

Le modèle reste inchangé.

---

# 13. Occurrence annulée

Exemple :

```text
Samedi 12 septembre

Annulée
```

Elle peut rester visible dans la liste pour expliquer le trou dans la récurrence.

Ne pas simplement la faire disparaître.

---

# 14. Génération des occurrences

L’écran n’a pas besoin d’expliquer en détail la mécanique technique.

Mais il peut afficher :

```text
Les prochaines occurrences sont créées
automatiquement à partir de ce marché.
```

dans une aide secondaire.

La gestion de l’horizon de génération appartient davantage à la configuration technique.

---

# 15. Historique récent

Exemple :

```text
HISTORIQUE

Samedi 22 août
Terminée

Samedi 15 août
Terminée
```

Afficher seulement quelques éléments.

Puis :

```text
[ Voir l’historique ]
```

---

# 16. L’historique reste lié au modèle

Même après désactivation :

```text
Marché Saint-Pierre
Inactif
```

les anciennes occurrences restent consultables.

C’est une raison supplémentaire pour préférer la désactivation à la suppression.

---

# 17. Modifier

CTA :

```text
[ Modifier ]
```

ouvre :

```text
AdminMarketEditScreen
```

avec les données actuelles.

Les modifications concernent le modèle récurrent.

---

# 18. Point critique : impact d’une modification

Si on modifie :

```text
Samedi 08:00 – 12:00
```

en :

```text
Samedi 09:00 – 13:00
```

il faut décider ce qu’il advient des occurrences futures déjà créées.

Recommandation :

> les occurrences futures non personnalisées peuvent être mises à jour avec le modèle ; les occurrences déjà modifiées manuellement restent inchangées.

Mais cette décision doit être confirmée à l’enregistrement.

---

# 19. Confirmation d’impact

Exemple après modification du modèle :

```text
Mettre à jour les occurrences à venir ?

3 occurrences futures utilisent encore
les horaires du modèle actuel.

○ Mettre à jour ces 3 occurrences
○ Modifier uniquement le modèle

Les occurrences déjà personnalisées
ne seront pas modifiées.
```

Choix par défaut recommandé :

```text
Mettre à jour les occurrences futures non personnalisées
```

car c’est probablement l’intention normale.

---

# 20. Occurrence avec commandes

Si une occurrence future possède déjà des commandes et que le changement touche horaire ou lieu :

```text
⚠ 12 commandes sont déjà liées
à l’occurrence du 5 septembre.
```

Il faut être beaucoup plus prudent.

Une modification de l’occurrence peut :

- changer le retrait attendu ;
- nécessiter une notification client.

Ne pas faire cela silencieusement depuis le modèle.

---

# 21. Règle recommandée

Si une occurrence future possède déjà des commandes :

> ne pas la modifier automatiquement lors d’un changement sensible du modèle.

La laisser comme exception et afficher :

```text
1 occurrence avec commandes
n’a pas été modifiée.
```

L’admin peut ensuite la traiter explicitement.

Cela réduit fortement le risque.

---

# 22. Désactivation

Action :

```text
Désactiver le marché
```

ouvre une confirmation contextualisée :

```text
Désactiver Marché Saint-Pierre ?

Aucune nouvelle occurrence ne sera créée
à partir de ce modèle.

Les occurrences existantes et l’historique
seront conservés.

[ Annuler ]
[ Désactiver ]
```

---

# 23. Que faire des occurrences futures lors de la désactivation ?

Il faut distinguer :

```text
arrêter la génération future
```

de :

```text
annuler les occurrences déjà créées
```

Recommandation :

> désactiver le modèle ne supprime ni n’annule automatiquement les occurrences déjà créées.

Sinon, une simple action de configuration pourrait perturber des commandes existantes.

---

# 24. Message après désactivation

```text
✓ Marché désactivé

Aucune nouvelle occurrence ne sera générée.

3 occurrences futures existantes
restent planifiées.
```

Action secondaire :

```text
[ Voir les occurrences ]
```

---

# 25. Réactivation

Pour un marché inactif :

```text
[ Réactiver le marché ]
```

Confirmation légère :

```text
Réactiver ce marché ?

De nouvelles occurrences pourront être
générées selon la récurrence configurée.

[ Réactiver ]
```

---

# 26. Suppression

Ne pas exposer `Supprimer` dans le workflow normal.

Éventuellement, uniquement si :

```text
aucune occurrence
aucune commande
aucun historique
```

et encore, ce n’est pas indispensable.

La désactivation suffit largement pour la V1.

---

# 27. Modifier une seule occurrence

Depuis la liste `À venir`, l’utilisateur ouvre :

```text
AdminOccurrenceDetailsScreen
```

puis :

```text
Modifier l’occurrence
```

Cela permet des exceptions telles que :

- horaire spécial ;
- adresse différente ;
- annulation ponctuelle.

Le modèle n’est pas modifié.

---

# 28. Création d’une occurrence manuelle liée au marché

On peut avoir une action secondaire :

```text
[ Ajouter une occurrence ]
```

pour un marché exceptionnel supplémentaire.

Exemple :

```text
Marché Saint-Pierre
Exceptionnellement dimanche 6 septembre
```

Mais ne pas la mettre en action principale.

---

# 29. Notes du modèle

Un champ optionnel peut exister :

```text
NOTE INTERNE

Installation côté nord de la place.
```

Cette note peut être héritée par défaut dans les occurrences.

Si elle est modifiée dans une occurrence, cela ne change pas forcément le modèle.

---

# 30. Paramètres de commandes

Selon le modèle fonctionnel, le marché peut aussi définir certaines valeurs par défaut :

```text
Ouvert aux commandes
Oui

Heure limite
Vendredi 18:00
```

Attention à ne pas surcharger ce screen si ces règles appartiennent à une configuration globale de récupération.

Les afficher seulement si elles sont réellement propres au marché.

---

# 31. Tablette portrait

Deux colonnes possibles :

```text
┌──────────────────────────────────────────┐
│ Marché Saint-Pierre                     │
│ Actif                                   │
├────────────────────┬─────────────────────┤
│ CONFIGURATION      │ PROCHAINE           │
│                    │ OCCURRENCE          │
│ Samedi             │ 29 août             │
│ 08:00–12:00        │ 18 commandes        │
│ Place SP           │ 13 préparées        │
├────────────────────┴─────────────────────┤
│ OCCURRENCES À VENIR                     │
└──────────────────────────────────────────┘
```

---

# 32. Tablette paysage

Structure idéale :

```text
┌─────────────────────────────┬──────────────────────────┐
│ CONFIGURATION               │ OCCURRENCES              │
│                             │                          │
│ Samedi                      │ 29 août                  │
│ 08:00 – 12:00               │ 5 septembre             │
│ Place Saint-Pierre          │ 12 septembre            │
│                             │                          │
│ Actif                       │ Historique               │
│                             │                          │
│ [ Modifier ]                │                          │
└─────────────────────────────┴──────────────────────────┘
```

---

# 33. Desktop

Même structure que tablette paysage.

La colonne configuration peut rester sticky pendant le scroll des occurrences.

---

# 34. État sans prochaine occurrence

Exemple :

```text
Aucune occurrence à venir.

Le marché est actif mais aucune occurrence
n’est actuellement planifiée.
```

Actions possibles :

```text
[ Créer une occurrence ]
```

ou simplement attente de génération automatique.

---

# 35. État inactif

Wireframe compact :

```text
Marché du Bourg

INACTIF

Vendredi
16:00 – 19:00

Aucune nouvelle occurrence
ne sera générée.

[ Réactiver ]
```

Les sections historique et occurrences déjà existantes restent accessibles.

---

# 36. Erreur de chargement des occurrences

La configuration du marché peut rester visible même si la liste des occurrences échoue.

Exemple :

```text
Impossible de charger les occurrences.

[ Réessayer ]
```

Éviter de remplacer tout l’écran par une erreur si seule une sous-section est concernée.

---

# 37. Projection de données

Exemple :

```ts
type MarketDetails = {
  market: {
    id: string
    version: number

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

    internalNote?: string
  }

  nextOccurrence?: MarketOccurrenceSummary

  upcomingOccurrences: MarketOccurrenceSummary[]

  recentOccurrences: MarketOccurrenceSummary[]

  actions: {
    canEdit: boolean
    canDeactivate: boolean
    canReactivate: boolean
  }
}
```

---

# 38. Résumé d’occurrence

```ts
type MarketOccurrenceSummary = {
  occurrenceId: string

  date: string

  startsAt?: string
  endsAt?: string

  status:
    | "upcoming"
    | "in_progress"
    | "to_close"
    | "closed"
    | "cancelled"

  customized: boolean

  orders?: {
    total: number
    prepared: number
  }
}
```

`customized` permet d’afficher :

```text
Horaire exceptionnel
```

ou un badge équivalent.

---

# 39. Query

Conceptuellement :

```text
GET /admin/distribution/markets/:id
```

avec projection agrégée du modèle et de ses occurrences pertinentes.

---

# 40. Modification

Conceptuellement :

```text
PATCH /admin/distribution/markets/:id
```

avec :

```ts
{
  expectedVersion: number

  name?: string
  recurrence?: ...
  location?: ...
  internalNote?: string

  futureOccurrencePolicy?:
    | "update_unmodified"
    | "keep_existing"
}
```

La policy ne doit être envoyée que si la modification peut affecter des occurrences existantes.

---

# 41. Désactivation

Mutation dédiée recommandée :

```text
POST /admin/distribution/markets/:id/deactivate
```

plutôt qu’un simple patch ambigu.

Réactivation :

```text
POST /admin/distribution/markets/:id/reactivate
```

Ces actions expriment mieux l’intention métier.

---

# 42. Pourquoi des actions dédiées

Parce que :

```text
active = false
```

semble trivial techniquement, mais a des conséquences métier :

- génération future ;
- occurrences existantes ;
- historique.

Une action explicite est plus claire à auditer.

---

# 43. Concurrence

Utiliser :

```text
version
```

pour les modifications du modèle.

Si le marché a été modifié ailleurs :

```text
⚠ Ce marché a été modifié depuis l’ouverture.

[ Recharger ]
```

Ne pas écraser silencieusement.

---

# 44. Composants `@project/ui`

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

# 45. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
MarketStatusBadge
MarketRecurrenceSummary
MarketLocation
MarketOccurrenceList
MarketOccurrenceRow
```

---

# 46. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── market-details-screen.tsx
├── components/
│   ├── market-details-header.tsx
│   ├── market-configuration-section.tsx
│   ├── market-next-occurrence.tsx
│   ├── market-upcoming-occurrences.tsx
│   ├── market-history.tsx
│   └── market-actions.tsx
└── index.ts
```

---

# 47. États principaux

Prévoir :

```text
loading
ready
updating
conflict
error
```

Les occurrences peuvent avoir leurs propres états de chargement partiel.

---

# 48. Accessibilité

Points importants :

- statut actif/inactif en texte ;
- date complète sur les occurrences ;
- exceptions signalées autrement que par couleur ;
- menus d’action utilisables au clavier ;
- confirmation de désactivation avec conséquence explicitement annoncée.

---

# 49. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le jour, l’horaire et le lieu sont visibles immédiatement ;
- l’utilisateur comprend qu’il consulte un modèle récurrent ;
- la prochaine occurrence est clairement reliée au modèle ;
- une occurrence personnalisée est identifiable ;
- modifier une occurrence ne modifie pas implicitement le modèle ;
- modifier le modèle ne réécrit pas silencieusement une occurrence contenant déjà des commandes ;
- désactiver arrête la génération future sans supprimer l’historique ;
- les occurrences déjà créées ne sont pas annulées silencieusement ;
- l’historique reste accessible après désactivation ;
- tablette et desktop augmentent la densité sans changer le modèle mental.

---

# 50. Structure de référence

```text
HEADER + ÉTAT
      ↓
RÉCURRENCE
      ↓
LIEU
      ↓
PROCHAINE OCCURRENCE
      ↓
OCCURRENCES À VENIR
      ↓
HISTORIQUE
      ↓
MODIFIER / ACTIVER / DÉSACTIVER
```

Cette structure doit permettre de consulter et gérer un modèle récurrent de marché sans jamais confondre ce modèle avec ses occurrences datées.
