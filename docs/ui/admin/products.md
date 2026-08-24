# AdminProductListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/products.md
```

Implémentation :

```text
packages/screens/admin/products/
├── admin-product-list-screen.tsx
├── components/
└── index.ts
```

Une implémentation responsive commune suffit.

---

# 2. Objectif

L’écran doit répondre à :

> **Quels produits existent dans mon catalogue et lesquels sont encore utilisés ?**

Il doit permettre de :

- retrouver un produit ;
- voir son unité ;
- voir son prix courant ;
- voir s’il est actif ou inactif ;
- ouvrir son détail / édition ;
- créer un nouveau produit ;
- désactiver un produit ;
- retrouver les anciens produits sans supprimer leur historique ;
- accéder éventuellement à sa disponibilité actuelle.

---

# 3. Principe UX fondamental

Il faut distinguer très clairement :

```text
PRODUIT
configuration durable
```

de :

```text
DISPONIBILITÉ
état opérationnel actuel
```

Exemple :

```text
Tomates
Produit actif
Prix : 4,50 €/kg
```

peut être actuellement :

```text
Indisponible
```

dans `AdminAvailabilityScreen`.

Cela ne signifie pas que le produit lui-même doit être désactivé.

---

# 4. Actif ≠ disponible

Règle essentielle :

```text
Produit actif
```

signifie :

> ce produit fait encore partie du référentiel exploitable.

Alors que :

```text
Disponible
Selon disponibilité
Indisponible
```

signifie :

> ce produit peut-il actuellement être proposé ?

Ne jamais mélanger les deux concepts dans un seul statut.

---

# 5. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Produits                 ＋   │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Rechercher un produit   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Actifs 34 ] [ Tous 41 ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOMATES                         │
│                                 │
│ kg                              │
│ 4,50 € / kg                     │
│                                 │
│ Actif                           │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COURGETTES                      │
│                                 │
│ kg                              │
│ 3,80 € / kg                     │
│                                 │
│ Actif                           │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SALADE                          │
│                                 │
│ unité                           │
│ 1,80 € / unité                  │
│                                 │
│ Actif                           │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ANCIENNE VARIÉTÉ DE NAVET       │
│                                 │
│ kg                              │
│ 2,90 € / kg                     │
│                                 │
│ Inactif                         │
│                              >  │
│                                 │
└─────────────────────────────────┘
```

---

# 6. Informations prioritaires

Une carte doit privilégier :

```text
NOM
 ↓
UNITÉ
 ↓
PRIX COURANT
 ↓
ÉTAT ACTIF / INACTIF
```

Pas besoin d’afficher en permanence :

- description ;
- quantité estimée ;
- visibilité de quantité ;
- date de dernière publication.

Ces informations appartiennent à d’autres écrans.

---

# 7. Carte produit

Exemple :

```text
TOMATES

4,50 € / kg

Actif
```

On peut rendre l’unité directement dans le prix.

Pas besoin de répéter :

```text
Unité : kg
Prix : 4,50 € / kg
```

si le sens reste évident.

---

# 8. Produit à l’unité

Exemple :

```text
SALADE

1,80 € / unité

Actif
```

ou, plus naturel dans l’UI :

```text
1,80 € pièce
```

si le vocabulaire métier préfère `pièce`.

Mais le domaine doit garder une unité normalisée.

---

# 9. Produit à la botte

Exemple :

```text
RADIS

2,50 € / botte
```

Les unités doivent être cohérentes avec celles utilisées dans :

- commandes ;
- AMAP ;
- préparation ;
- snapshots historiques.

---

# 10. Prix courant

Le prix affiché est :

```text
prix courant du produit
```

Il sert pour les **futures commandes**.

Il ne doit pas modifier les commandes déjà créées.

---

# 11. Règle de snapshot prix

Une ligne de commande historique conserve :

```text
unitPriceSnapshot
```

Donc :

```text
Tomates
4,00 €/kg
```

dans une commande passée reste à 4,00 €/kg même si le catalogue passe à :

```text
4,50 €/kg
```

---

# 12. Modifier un prix

Le prix peut être modifié depuis :

```text
AdminProductEditScreen
```

ou éventuellement directement depuis `AdminAvailabilityScreen` si cette action a déjà été retenue.

Mais la liste produits reste plutôt consultative.

---

# 13. Éviter l’édition inline ici

Je déconseille :

```text
Tomates
[ 4,50 ] €/kg
```

directement dans la liste.

Pourquoi ?

Parce que :

- la liste sert à naviguer ;
- `AdminAvailabilityScreen` est déjà une interface d’édition rapide ;
- le prix est un changement commercial durable.

Préférer :

```text
tap produit
↓
édition
```

---

# 14. Recherche

Champ principal :

```text
[ 🔍 Rechercher un produit ]
```

Recherche sur :

- nom ;
- éventuellement description.

Le nom doit suffire dans la majorité des cas.

---

# 15. Recherche tolérante

Exemple :

```text
tom
```

→ Tomates

```text
cour
```

→ Courgettes

Pas besoin de recherche avancée.

---

# 16. Filtres

V1 :

```text
[ Actifs ] [ Tous ]
```

Par défaut :

```text
Actifs
```

Les produits inactifs ne doivent pas encombrer le quotidien.

---

# 17. Pourquoi conserver les produits inactifs

Un produit peut être présent dans :

- anciennes commandes ;
- anciennes publications ;
- anciennes compositions AMAP ;
- historiques de préparation.

Donc il ne doit pas disparaître de la base.

Règle :

> **désactiver plutôt que supprimer.**

---

# 18. Produit inactif

Carte :

```text
ANCIENNE VARIÉTÉ DE NAVET

2,90 € / kg

Inactif
```

Style visuel plus discret, mais toujours lisible.

---

# 19. Conséquences d’un produit inactif

Un produit inactif :

- ne doit plus être proposé pour de nouvelles commandes ;
- ne doit plus apparaître par défaut dans les disponibilités ;
- ne doit plus être proposé dans les nouvelles compositions AMAP ;
- reste visible dans l’historique.

---

# 20. Désactivation ≠ indisponibilité temporaire

Très important.

Ne jamais désactiver :

```text
Tomates
```

simplement parce qu’elles sont indisponibles cette semaine.

Dans ce cas :

```text
Produit actif
+
Disponibilité = Indisponible
```

---

# 21. Réactivation

Un produit inactif peut être réactivé :

```text
[ Réactiver le produit ]
```

Depuis le détail ou l’écran d’édition.

Cela ne modifie aucun historique.

---

# 22. Suppression

Je n’ajouterais pas de bouton :

```text
Supprimer
```

dans le workflow normal.

Éventuellement, suppression physique possible uniquement si produit jamais utilisé.

Mais cela peut rester hors V1.

---

# 23. Création

Bouton :

```text
＋
```

ouvre :

```text
AdminProductEditScreen
```

en création.

---

# 24. Création rapide

Flow :

```text
AdminProductListScreen
        ↓
AdminProductEditScreen
        ↓
AdminProductListScreen
```

ou détail produit selon l’architecture retenue.

---

# 25. Faut-il un `AdminProductDetailsScreen` ?

Je ne le créerais pas forcément.

Pour un produit aussi simple :

```text
nom
description
unité
prix
actif
```

un écran d’édition peut suffire comme écran de détail.

Donc :

```text
AdminProductListScreen
        ↓
AdminProductEditScreen
```

directement.

Cela évite un écran intermédiaire pauvre.

---

# 26. Recommandation V1

Pas de `AdminProductDetailsScreen`.

Le tap d’une carte ouvre :

```text
AdminProductEditScreen
```

en mode édition.

---

# 27. Disponibilité actuelle dans la liste ?

On pourrait afficher :

```text
Disponible
```

mais je déconseille d’en faire une information principale.

Pourquoi ?

Parce que cela mélange justement les deux responsabilités.

---

# 28. Exception utile

Une petite information secondaire peut éventuellement apparaître :

```text
Actuellement indisponible
```

si cela aide à comprendre.

Mais elle doit être visuellement distincte de :

```text
Inactif
```

et rester optionnelle.

---

# 29. Recommandation

En V1, garder cette liste pure :

```text
référentiel uniquement
```

et laisser :

```text
AdminAvailabilityScreen
```

porter les statuts de disponibilité.

Plus clair.

---

# 30. Accès aux disponibilités

Une action globale possible :

```text
[ Gérer les disponibilités ]
```

dans le menu ou le header secondaire.

Mais la navigation principale possède déjà :

```text
Dispos
```

Donc probablement inutile.

---

# 31. Tri par défaut

Je recommande :

```text
ordre alphabétique
```

Cela fonctionne bien pour un catalogue de quelques dizaines de produits.

---

# 32. Pourquoi pas par disponibilité ?

Parce que cet écran n’est pas opérationnel.

Ne pas faire remonter les produits disponibles ici.

---

# 33. Pourquoi pas par date de création ?

Peu utile pour le maraîcher.

Le nom est la clé naturelle de recherche.

---

# 34. Catégories produits ?

Le modèle fonctionnel stabilisé ne prévoit pas de catégorie.

Donc ne pas inventer :

```text
Légumes feuilles
Racines
Fruits
```

dans la V1 si le besoin n’existe pas.

---

# 35. Images produit ?

Même logique.

Pas nécessaires pour l’administration V1.

Le catalogue client pourrait en demander plus tard.

Mais pour le moment, le produit minimal reste :

```text
nom
description optionnelle
unité
prix
actif
```

---

# 36. Description

La description n’a pas besoin d’apparaître dans la liste.

Exemple :

```text
Tomates anciennes cultivées sous serre froide.
```

Elle appartient à l’édition.

---

# 37. Nom long

Exemple :

```text
Pommes de terre nouvelles Charlotte
```

La carte doit gérer deux lignes sans casser le layout.

Éviter une troncature trop agressive sur mobile.

---

# 38. Doublon produit

Lors de la création :

```text
Tomates
```

si un produit du même nom existe :

```text
⚠ Un produit nommé “Tomates” existe déjà.

[ Voir le produit ]
```

Mais le nom ne doit pas forcément être strictement unique.

Exemple possible :

```text
Tomates cerises
Tomates anciennes
```

---

# 39. Même nom exact

Je conseillerais d’avertir fortement.

Deux produits exactement nommés :

```text
Tomates
Tomates
```

rendraient la préparation et les commandes ambiguës.

---

# 40. Unité immuable ou modifiable ?

Cas important.

Un produit utilisé historiquement comme :

```text
kg
```

peut-il devenir :

```text
unité
```

?

Je déconseille de modifier librement l’unité d’un produit déjà utilisé.

---

# 41. Pourquoi l’unité est structurelle

Passer :

```text
Courgettes
kg
```

à :

```text
unité
```

change profondément :

- saisie commande ;
- quantités ;
- préparation ;
- AMAP ;
- prix.

Ce n’est pas une simple correction cosmétique.

---

# 42. Recommandation V1

Si un produit a déjà été utilisé :

> **l’unité ne devrait plus être modifiable normalement.**

En cas de changement réel de mode de vente :

```text
désactiver ancien produit
+
créer nouveau produit
```

Exemple :

```text
Courgettes — kg
```

désactivé,

puis :

```text
Courgettes — unité
```

nouveau produit.

---

# 43. Exception erreur de saisie

Une unité peut être corrigée tant que le produit :

- n’a aucune commande ;
- aucune publication ;
- aucune composition AMAP.

L’API peut renvoyer :

```text
canChangeUnit: true|false
```

---

# 44. Prix, lui, reste modifiable

Contrairement à l’unité :

```text
4,20 €/kg
→
4,50 €/kg
```

est un changement normal.

Les snapshots protègent l’historique.

---

# 45. Produit jamais utilisé

Un nouveau produit peut être librement modifié :

- nom ;
- description ;
- unité ;
- prix.

Une fois utilisé, l’unité se fige davantage.

---

# 46. Prix égal à zéro

Je déconseille un produit actif à :

```text
0 €
```

sauf cas métier explicite.

Si aucun produit gratuit n’existe en V1 :

```text
price > 0
```

---

# 47. Prix absent

Un produit actif destiné aux commandes classiques doit avoir un prix.

Donc :

```text
price required
```

dans le modèle V1.

---

# 48. AMAP et prix

Même si la logique AMAP ne facture pas chaque ligne comme une commande classique, le produit garde son prix catalogue.

Le snapshot AMAP peut l’ignorer si non pertinent.

Cela ne justifie pas un produit sans prix si le même produit peut être commandé classiquement.

---

# 49. Tablette portrait

Deux colonnes de cartes possibles :

```text
┌──────────────────────┬──────────────────────┐
│ Tomates              │ Courgettes           │
│ 4,50 €/kg            │ 3,80 €/kg            │
│ Actif                │ Actif                │
├──────────────────────┼──────────────────────┤
│ Salade               │ Radis                │
│ 1,80 €/unité         │ 2,50 €/botte         │
└──────────────────────┴──────────────────────┘
```

---

# 50. Tablette paysage

Une liste dense devient plus efficace :

```text
┌──────────────────────────────────────────────────────┐
│ Produit                Unité       Prix       État  │
├──────────────────────────────────────────────────────┤
│ Tomates                kg          4,50 €     Actif │
│ Courgettes             kg          3,80 €     Actif │
│ Salade                 unité       1,80 €     Actif │
│ Radis                  botte       2,50 €     Actif │
└──────────────────────────────────────────────────────┘
```

Chaque ligne tappable.

---

# 51. Desktop

Même table.

Colonnes recommandées :

```text
Produit
Unité
Prix
État
```

Éventuellement :

```text
Dernière modification
```

mais seulement si utile.

---

# 52. Pas de table complexe

Pas besoin de colonnes :

- stock ;
- ventes ;
- commandes ;
- AMAP ;
- publication ;
- chiffre d’affaires.

Ce serait mélanger plusieurs domaines.

---

# 53. État vide

```text
Aucun produit actif.

Ajoutez vos premiers produits
pour construire le catalogue.

[ Ajouter un produit ]
```

---

# 54. Actifs vide mais inactifs présents

```text
Aucun produit actif.

7 produits inactifs sont disponibles
dans l’onglet Tous.

[ Voir tous ]
[ Ajouter un produit ]
```

---

# 55. Recherche vide

```text
Aucun produit trouvé pour “poireau”.

[ Ajouter “Poireau” ]
```

Cette action préremplit éventuellement le nom dans le formulaire de création.

Très pratique.

---

# 56. Projection de données

Exemple :

```ts
type AdminProductListItem = {
  productId: string

  name: string

  unit: {
    code: string
    label: string
  }

  currentUnitPrice: number

  active: boolean

  capabilities: {
    canEdit: boolean
    canDeactivate: boolean
    canReactivate: boolean
    canChangeUnit: boolean
  }
}
```

---

# 57. Pourquoi `canChangeUnit` dans la liste ?

Pas forcément nécessaire pour l’affichage.

Mais utile dans la projection du formulaire.

La liste peut rester encore plus légère :

```ts
type AdminProductListItem = {
  productId: string
  name: string
  unitLabel: string
  currentUnitPrice: number
  active: boolean
}
```

---

# 58. Query

Conceptuellement :

```text
GET /admin/products
```

avec :

```text
status=active|all
search=
```

---

# 59. Pagination

Probablement inutile au départ si catalogue :

```text
< 200 produits
```

Une liste complète filtrée côté client peut être acceptable.

Mais l’API peut quand même prévoir la pagination sans imposer l’UI.

---

# 60. Rafraîchissement

Après :

- création ;
- modification ;
- désactivation ;
- réactivation ;

invalider la liste.

Pas besoin de temps réel.

---

# 61. Chargement

Skeleton de lignes/cartes.

Ne pas bloquer l’écran entier lors d’un simple refresh.

---

# 62. Erreur

```text
Impossible de charger les produits.

[ Réessayer ]
```

---

# 63. Produit désactivé depuis un autre appareil

Au retour :

```text
Actif
→
Inactif
```

simple refresh.

Le conflit sera surtout géré dans l’écran d’édition.

---

# 64. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
SearchInput
Tabs
Card
Badge
EmptyState
Skeleton
ResponsiveGrid
```

---

# 65. Composants métier

Dans :

```text
packages/domains/catalog/ui/
```

bons candidats :

```text
ProductCard
ProductPrice
ProductUnit
ProductStatusBadge
ProductSearchResult
```

`ProductPrice` doit gérer proprement :

```text
4,50 € / kg
1,80 € / unité
2,50 € / botte
```

---

# 66. Composants spécifiques au screen

```text
packages/screens/admin/products/
├── admin-product-list-screen.tsx
├── components/
│   ├── product-search.tsx
│   ├── product-list-filters.tsx
│   ├── product-list.tsx
│   └── product-list-empty-state.tsx
└── index.ts
```

---

# 67. États principaux

Prévoir :

```text
loading
ready
empty
searching
searchEmpty
error
```

---

# 68. Accessibilité

Points importants :

- nom produit annoncé avant prix ;
- prix annoncé avec son unité ;
- `Actif` / `Inactif` textuel ;
- état non basé uniquement sur l’opacité ;
- carte entière navigable au clavier ;
- résultats de recherche annoncés ;
- prix formaté avec locale française.

---

# 69. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- un produit peut être retrouvé en quelques secondes ;
- le prix et l’unité sont visibles immédiatement ;
- actif/inactif ne peut pas être confondu avec disponible/indisponible ;
- les produits inactifs restent accessibles ;
- aucune suppression historique n’est nécessaire ;
- la liste ne duplique pas l’écran de disponibilités ;
- la modification de prix n’altère jamais les anciennes commandes ;
- une unité structurelle ne peut pas être changée à la légère après utilisation ;
- la liste reste simple sur téléphone ;
- tablette et desktop utilisent une densité plus forte sans ajouter de complexité.

---

# 70. Structure de référence

```text
HEADER + AJOUT
      ↓
RECHERCHE
      ↓
ACTIFS / TOUS
      ↓
NOM PRODUIT
      ↓
UNITÉ
      ↓
PRIX COURANT
      ↓
ACTIF / INACTIF
```

Cette structure doit permettre de gérer le référentiel produits sans le confondre avec les disponibilités quotidiennes ou l’historique commercial.
