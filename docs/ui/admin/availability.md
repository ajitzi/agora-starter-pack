# AdminAvailabilityScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/availability.md
```

Implémentation :

```text
packages/screens/admin/availability/
├── availability-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Qu’est-ce que j’ai actuellement de disponible, et qu’est-ce que je veux montrer aux clients ?**

Il doit permettre de :

- voir rapidement tous les produits actifs ;
- modifier leur statut de disponibilité ;
- saisir ou corriger une quantité estimée ;
- choisir si cette quantité est visible publiquement ;
- modifier le prix si nécessaire ;
- distinguer les modifications enregistrées des modifications publiées ;
- publier les changements ;
- retrouver rapidement un produit.

---

# 3. Principe fondamental

Il faut absolument séparer deux concepts :

```text
État courant du catalogue
```

et :

```text
Dernière publication envoyée aux clients
```

Modifier une disponibilité ne doit **jamais** être perçu comme une publication.

L’écran doit donc afficher en permanence quelque chose comme :

```text
✓ Enregistré

7 modifications non publiées
```

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ Disponibilités              ⋯   │
├─────────────────────────────────┤
│                                 │
│ ✓ Enregistré                    │
│                                 │
│ 7 modifications non publiées    │
│                                 │
│ Dernière publication            │
│ Aujourd’hui · 08:32             │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🔍 Rechercher un produit   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Tous ▼ ]                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOMATES CŒUR DE BŒUF            │
│ 4 €/kg                          │
│                                 │
│ [ Disponible          ]         │
│ [ Selon disponibilité ]         │
│ [ Indisponible        ]         │
│                                 │
│ Quantité estimée                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 18                     kg  │ │
│ └─────────────────────────────┘ │
│                                 │
│ Afficher la quantité            │
│ [ Oui ]                         │
│                                 │
│ Modifié                         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COURGETTES                      │
│ 3 €/kg                          │
│                                 │
│ [ Disponible          ]         │
│ [ Selon disponibilité ]         │
│ [ Indisponible        ]         │
│                                 │
│ Quantité estimée                │
│                                 │
│ [ Non renseignée ]              │
│                                 │
│ Afficher la quantité            │
│ —                               │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SALADES                         │
│ 1,50 €/pièce                    │
│                                 │
│ [ Disponible          ]         │
│ [ Selon disponibilité ]         │
│ [ Indisponible        ]         │
│                                 │
│ Quantité estimée                │
│ [ 24 ]                          │
│                                 │
│ Afficher la quantité            │
│ [ Non ]                         │
│                                 │
└─────────────────────────────────┘
│ ┌─────────────────────────────┐ │
│ │ Publier · 7 modifications  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

Le bouton `Publier` reste sticky lorsqu’il existe des changements non publiés.

---

# 5. Statuts de disponibilité

Trois statuts :

```text
Disponible
Selon disponibilité
Indisponible
```

Je privilégierais un contrôle segmenté vertical ou horizontal selon la largeur disponible.

Sur mobile étroit, une disposition compacte peut être :

```text
[ Disponible ]
[ Selon dispo ]
[ Indispo ]
```

ou :

```text
[Disponible] [Selon dispo] [Indispo]
```

si les labels restent lisibles.

L’état actif doit être parfaitement identifiable.

---

# 6. Effet du statut

## Disponible

Le produit peut être commandé normalement.

Une quantité estimée peut être :

- renseignée et visible ;
- renseignée et cachée ;
- non renseignée.

---

## Selon disponibilité

Le produit peut apparaître au client avec un avertissement explicite.

Exemple client :

```text
Selon disponibilité
```

La quantité estimée peut rester renseignée côté admin.

---

## Indisponible

Le produit reste dans le catalogue admin mais n’est plus commandable.

Il ne faut pas le supprimer.

Si une quantité précédente existe, on peut la conserver techniquement, mais la masquer dans l’interface principale tant que le produit est indisponible.

---

# 7. Quantité : trois cas

Le modèle UX doit couvrir clairement :

### Cas 1 — quantité connue et visible

```text
Quantité estimée
18 kg

Afficher aux clients
Oui
```

### Cas 2 — quantité connue mais masquée

```text
Quantité estimée
18 kg

Afficher aux clients
Non
```

### Cas 3 — quantité non suivie

```text
Quantité estimée
Non renseignée
```

Dans ce cas, le contrôle de visibilité peut disparaître ou être désactivé.

---

# 8. Quantité non suivie

Ne pas utiliser systématiquement `0`.

`0` signifie potentiellement :

> il n’y en a plus.

Alors que l’absence de quantité signifie :

> je ne souhaite pas ou ne peux pas suivre cette estimation.

Ce sont deux concepts différents.

---

# 9. Édition directe

L’écran doit éviter le pattern :

```text
Produit
→ ouvrir
→ modifier
→ sauvegarder
→ retour
```

La majorité des changements doivent être possibles directement dans la liste.

Exemples :

- statut ;
- quantité ;
- visibilité.

C’est un écran de saisie opérationnelle.

---

# 10. Prix

Le prix est moins fréquemment modifié que la disponibilité.

Afficher le prix :

```text
4 €/kg
```

et permettre un tap pour l’éditer.

Cela évite d’avoir un gros input prix sur chaque carte.

Exemple :

```text
4 €/kg    Modifier
```

ou tap direct sur le prix.

---

# 11. Modification du prix

Ouverture d’un petit `Sheet` :

```text
Prix — Tomates cœur de bœuf

Prix unitaire

[ 4,00 ] €/kg

[ Annuler ]
[ Enregistrer ]
```

La modification du prix affecte les futures commandes uniquement.

Les commandes historiques conservent leur snapshot.

---

# 12. Autosave

Les modifications de disponibilité doivent être enregistrées automatiquement.

Flux :

```text
changement
   ↓
Enregistrement…
   ↓
✓ Enregistré
```

Pas besoin d’un bouton `Enregistrer` global dans le workflow normal.

---

# 13. Différence avec publication

Après autosave :

```text
✓ Enregistré
7 modifications non publiées
```

Cela signifie :

- l’état courant est sauvegardé ;
- les clients n’ont pas encore été notifiés ;
- aucune nouvelle publication n’a été créée.

C’est une distinction UX majeure.

---

# 14. Produit modifié depuis la dernière publication

Marquer légèrement les produits modifiés.

Exemple :

```text
TOMATES CŒUR DE BŒUF          ●
```

ou :

```text
Modifié
```

Pas besoin d’un gros warning sur chaque produit.

Le compteur global reste la référence :

```text
7 modifications non publiées
```

---

# 15. Comparaison avec la dernière publication

Au tap sur `Modifié`, on peut afficher :

```text
Dernière publication

Selon disponibilité
8 kg

Actuellement

Disponible
18 kg
```

Ce détail peut vivre dans un `Sheet`.

Ce n’est pas nécessaire dans la vue principale.

---

# 16. Recherche

Toujours facilement disponible :

```text
[ 🔍 Rechercher un produit ]
```

Recherche sur :

- nom ;
- éventuellement catégorie plus tard.

Résultat en direct.

---

# 17. Filtres

Filtres simples :

```text
Tous
Disponible
Selon disponibilité
Indisponible
Modifiés
```

Sur mobile, garder un seul contrôle :

```text
[ Tous ▼ ]
```

ou quelques chips scrollables :

```text
[Tous] [Dispo] [Selon dispo] [Indispo] [Modifiés]
```

Les chips sont préférables si elles restent lisibles.

---

# 18. Tri

Ordre par défaut :

```text
ordre personnalisé du catalogue
```

À défaut :

```text
ordre alphabétique
```

Ne pas trier automatiquement par statut à chaque modification : cela ferait bouger les produits pendant que l’utilisateur travaille.

Règle importante :

> Une carte ne doit pas changer brutalement de position après modification.

---

# 19. Modification rapide de plusieurs produits

Cas d’usage typique après un marché :

```text
Tomates
18 kg → 6 kg

Courgettes
Disponible → Selon dispo

Aubergines
Disponible → Indisponible
```

L’écran doit permettre ces trois changements sans aucune navigation intermédiaire.

C’est précisément pourquoi les contrôles sont inline.

---

# 20. Action de publication

Quand des changements existent :

```text
[ Publier · 7 modifications ]
```

L’action ouvre :

```text
AdminPublishAvailabilityScreen
```

Elle ne publie pas immédiatement.

Le maraîcher doit d’abord voir le résumé.

---

# 21. Aucun changement à publier

Si tout est synchronisé :

```text
✓ À jour

Dernière publication
Aujourd’hui · 08:32
```

Le bouton sticky disparaît.

On peut conserver une action secondaire :

```text
Voir la dernière publication
```

mais ce n’est pas prioritaire.

---

# 22. Changements enregistrés mais publication ancienne

Exemple :

```text
✓ Enregistré
0 changement non publié

Dernière publication
Il y a 5 jours
```

Ce n’est pas forcément une erreur.

On peut afficher un rappel léger :

```text
Dernière publication il y a 5 jours
```

sans forcer l’utilisateur à publier.

---

# 23. Produit inactif

Les produits inactifs ne doivent pas encombrer cette vue quotidienne.

Par défaut :

```text
produits actifs uniquement
```

Les produits inactifs restent gérés dans :

```text
AdminProductListScreen
```

Un filtre avancé `Afficher les produits inactifs` peut être ajouté plus tard si nécessaire.

---

# 24. Création d’un produit

Ne pas mettre un gros CTA `Ajouter un produit` sur cet écran.

La disponibilité est un écran opérationnel.

La création produit appartient plutôt à :

```text
Produits
```

Un menu secondaire peut proposer :

```text
Gérer les produits
```

---

# 25. Produit sans prix

Cas anormal si les produits sont censés avoir un prix fixe.

Exemple :

```text
⚠ Prix manquant
```

Le produit ne doit probablement pas être publiable tant qu’un prix requis manque.

Action :

```text
[ Définir le prix ]
```

---

# 26. Validation des quantités

Cas invalide :

```text
-3 kg
```

L’erreur reste locale :

```text
La quantité doit être positive.
```

Ne pas attendre la publication pour signaler une erreur de saisie évidente.

---

# 27. Changement de statut vers indisponible

Ne pas ajouter de confirmation systématique :

```text
Êtes-vous sûr ?
```

C’est une opération quotidienne et réversible.

Flux :

```text
Disponible
    ↓
Indisponible
```

puis autosave.

---

# 28. Publication et commandes existantes

Passer un produit à `Indisponible` ne doit pas laisser penser que les commandes existantes sont modifiées.

Une aide contextuelle peut préciser :

> Les disponibilités concernent les nouvelles commandes. Les commandes déjà reçues ne sont pas modifiées automatiquement.

Pas besoin de répéter ce texte en permanence.

---

# 29. Tablette portrait

La tablette peut utiliser des cartes plus compactes.

```text
┌──────────────────────────────────────────┐
│ Tomates cœur de bœuf        4 €/kg       │
│                                          │
│ [Disponible][Selon dispo][Indispo]       │
│                                          │
│ Quantité  [ 18 kg ]    Visible [Oui]     │
└──────────────────────────────────────────┘
```

Deux cartes par ligne peuvent être envisagées, mais une seule colonne dense reste souvent plus naturelle pour la lecture verticale.

---

# 30. Tablette paysage

La densité peut augmenter sensiblement.

```text
┌────────────────────────────────────────────────────────────┐
│ Produit            Statut             Qté       Visible    │
├────────────────────────────────────────────────────────────┤
│ Tomates            Disponible         18 kg      Oui       │
│ Courgettes         Selon dispo        —          —         │
│ Salades            Disponible         24         Non       │
└────────────────────────────────────────────────────────────┘
```

Cette vue doit rester **tactile**.

Les cellules sont des contrôles suffisamment grands, pas une petite table de back-office.

---

# 31. Desktop

Sur desktop, la table éditable devient probablement la meilleure présentation.

Exemple :

```text
Disponibilités

✓ Enregistré
7 modifications non publiées

Recherche...       [Tous] [Modifiés]        [Publier]

┌─────────────────┬───────────────┬──────────┬──────────┬──────────┐
│ Produit         │ Statut        │ Quantité │ Visible  │ Prix     │
├─────────────────┼───────────────┼──────────┼──────────┼──────────┤
│ Tomates         │ Disponible    │ 18 kg    │ Oui      │ 4 €/kg   │
│ Courgettes      │ Selon dispo   │ —        │ —        │ 3 €/kg   │
│ Salades         │ Disponible    │ 24       │ Non      │ 1,50 €   │
└─────────────────┴───────────────┴──────────┴──────────┴──────────┘
```

La logique reste exactement celle du mobile.

---

# 32. Header sticky ou non

Sur mobile, trop de sticky réduit vite la surface disponible.

Priorité :

```text
bottom action sticky
```

Le header peut rester normal.

Sur tablette et desktop, le statut d’enregistrement, le compteur de changements et les filtres peuvent devenir sticky si cela améliore réellement l’usage.

---

# 33. Sauvegarde en cours

Exemple global :

```text
Enregistrement…
```

Une modification rapide de plusieurs produits peut être batchée ou debouncée techniquement.

L’interface n’a pas besoin d’afficher un spinner sur chaque carte.

---

# 34. Échec de sauvegarde

Cas critique :

```text
⚠ 2 modifications non enregistrées

Vérifiez votre connexion.

[ Réessayer ]
```

Les produits concernés peuvent afficher :

```text
Non enregistré
```

Il faut distinguer :

```text
non enregistré
```

de :

```text
non publié
```

Ce sont deux états différents.

---

# 35. Hors connexion

Exemple :

```text
⚠ Hors connexion

Les changements effectués ne peuvent
pas encore être enregistrés.
```

Si V1 n’est pas offline-first, ne pas accepter de longues séries de modifications locales en prétendant qu’elles seront forcément synchronisées plus tard.

---

# 36. Conflit concurrent

Si le catalogue a été modifié sur un autre appareil :

```text
⚠ Ce produit a été modifié ailleurs.

Valeur actuelle :
8 kg

Votre saisie :
6 kg

[ Utiliser 8 kg ]
[ Remplacer par 6 kg ]
```

Ce niveau de gestion peut être simplifié en V1, mais aucun écrasement silencieux ne doit être accepté.

---

# 37. État vide — aucun produit

```text
Aucun produit actif.

Ajoutez ou activez des produits
pour gérer leurs disponibilités.

[ Gérer les produits ]
```

---

# 38. État vide — recherche

```text
Aucun produit trouvé pour “poivron”.

[ Effacer la recherche ]
```

---

# 39. État vide — filtre `Modifiés`

```text
✓ Aucun changement non publié

Le catalogue courant correspond
à la dernière publication.
```

---

# 40. Données nécessaires

Projection possible :

```ts
type AvailabilityCatalog = {
  lastPublication?: {
    id: string
    publishedAt: string
  }

  unpublishedChanges: number

  saveState:
    | "saved"
    | "saving"
    | "error"

  products: AvailabilityProduct[]
}
```

---

# 41. Produit de disponibilité

```ts
type AvailabilityProduct = {
  productId: string
  version: number

  name: string
  unit: string
  price: number
  active: boolean

  availability: {
    status:
      | "available"
      | "subject_to_availability"
      | "unavailable"

    estimatedQuantity?: number
    quantityVisible: boolean
  }

  publicationDiff?: {
    changed: boolean

    previous?: {
      status: string
      estimatedQuantity?: number
      quantityVisible: boolean
      price: number
    }
  }
}
```

---

# 42. Pourquoi inclure le diff

Cela permet de calculer directement :

```text
7 modifications non publiées
```

et d’afficher le résumé avant publication.

Le diff peut être produit côté serveur ou côté client à partir du snapshot de la dernière publication.

Une source serveur devient préférable dès lors que plusieurs appareils peuvent modifier le catalogue.

---

# 43. Sauvegarde

Conceptuellement :

```text
PATCH /admin/products/:id/availability
```

avec :

```text
expectedVersion
status
estimatedQuantity
quantityVisible
```

Pour le prix :

```text
PATCH /admin/products/:id
```

ou mutation métier dédiée.

---

# 44. Autosave et debounce

Pour un segmented control :

```text
tap
→ sauvegarde immédiate
```

Pour un champ quantité :

```text
saisie
→ debounce court
→ sauvegarde
```

ou sauvegarde au blur.

Recommandation :

- mise à jour immédiate de l’UI ;
- sauvegarde debouncée ;
- état `Enregistrement…` ;
- confirmation serveur explicite.

---

# 45. Publication

Flux :

```text
AdminAvailabilityScreen
        ↓
Publier · 7 modifications
        ↓
AdminPublishAvailabilityScreen
```

La publication crée un snapshot immutable.

Le catalogue courant reste ensuite éditable indépendamment.

---

# 46. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
SearchInput
SegmentedControl
FilterChips
NumericInput
Switch
Badge
Alert
SaveStatus
StickyActionBar
Sheet
Skeleton
EmptyState
```

---

# 47. Composants métier

Dans :

```text
packages/domains/catalog/ui/
```

bons candidats :

```text
AvailabilityStatusControl
AvailabilityProductCard
AvailabilityQuantityInput
AvailabilityPublicationDiff
ProductPrice
```

`AvailabilityStatusControl` est particulièrement pertinent car il encapsule les trois statuts métier.

---

# 48. Composants spécifiques au screen

```text
packages/screens/admin/availability/
├── availability-screen.tsx
├── components/
│   ├── availability-header.tsx
│   ├── availability-toolbar.tsx
│   ├── availability-list.tsx
│   ├── availability-save-state.tsx
│   └── availability-publish-action.tsx
└── index.ts
```

---

# 49. États principaux

Prévoir explicitement :

```text
loading
ready
saving
partially-unsaved
save-error
offline
empty
```

En parallèle, chaque produit peut avoir son propre état local de modification.

---

# 50. Accessibilité

Points importants :

- statuts accompagnés de texte ;
- contrôles tactiles généreux ;
- labels liés aux champs quantité ;
- unité annoncée correctement ;
- switch de visibilité avec label explicite ;
- ordre de focus stable ;
- aucune réorganisation automatique pendant la saisie.

---

# 51. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- un produit peut passer de `Disponible` à `Indisponible` en un tap ;
- la quantité peut être modifiée sans ouvrir un autre écran ;
- l’utilisateur comprend toujours si sa modification est enregistrée ;
- l’utilisateur comprend toujours si sa modification a été publiée ;
- `Non enregistré` et `Non publié` sont impossibles à confondre ;
- plusieurs produits peuvent être mis à jour rapidement à la suite ;
- les cartes ne se déplacent pas pendant le travail ;
- une quantité absente n’est jamais confondue avec zéro ;
- les produits inactifs n’encombrent pas l’usage quotidien ;
- le bouton de publication apparaît uniquement lorsqu’il y a quelque chose à publier ;
- l’interface reste confortable sur téléphone tout en devenant plus dense sur tablette.

---

# 52. Structure de référence

```text
HEADER
   ↓
ÉTAT DE SAUVEGARDE
   ↓
CHANGEMENTS NON PUBLIÉS
   ↓
RECHERCHE / FILTRES
   ↓
PRODUITS ÉDITABLES
   ↓
STATUT / QUANTITÉ / VISIBILITÉ
   ↓
PUBLIER
```

Cette structure doit permettre une mise à jour rapide et répétitive du catalogue courant, tout en maintenant une séparation très claire entre sauvegarde et publication.
