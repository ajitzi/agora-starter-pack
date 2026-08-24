# AdminAmapWeeklyBasketScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-weekly-basket.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-weekly-basket-screen.tsx
├── components/
└── index.ts
```

C’est un écran de configuration hebdomadaire, mobile-first, avec une vraie importance particulière sur tablette.

---

## 2. Objectif

L’écran doit répondre à :

> **Que contient le panier AMAP de cette semaine ?**

et :

> **Quels remplacements les adhérents pourront-ils choisir ?**

Il doit permettre de :

- choisir la semaine / date de livraison ;
- ajouter les produits du panier ;
- définir les quantités du panier complet ;
- définir explicitement les quantités du demi-panier ;
- éviter les quantités absurdes comme `0,5 salade` ;
- retirer un produit ;
- réordonner éventuellement l’affichage ;
- choisir les produits remplaçables ;
- définir les options de remplacement autorisées ;
- fixer éventuellement le nombre maximal de substitutions ;
- enregistrer ;
- comprendre l’impact sur les commandes déjà générées.

---

# 3. Principe métier fondamental

La composition hebdomadaire n’est pas simplement :

```text
panier complet
÷ 2
=
demi-panier
```

Cette règle fonctionnerait pour :

```text
Tomates
1 kg → 500 g
```

mais pas pour :

```text
Salade
1 → 0,5
```

Le modèle doit donc stocker explicitement les deux variantes.

Exemple :

```text
Tomates
Complet : 1 kg
Demi : 500 g

Salade
Complet : 1
Demi : 1
```

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Panier AMAP                   │
│                                 │
│ Mercredi 2 septembre            │
├─────────────────────────────────┤
│                                 │
│ SEMAINE                         │
│                                 │
│ [ ‹ ] 2 septembre [ › ]         │
│                                 │
│ 42 abonnements concernés        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMPOSITION                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tomates                    │ │
│ │                            │ │
│ │ Panier complet             │ │
│ │ 1 kg                       │ │
│ │                            │ │
│ │ Demi-panier                │ │
│ │ 500 g                      │ │
│ │                            │ │
│ │ Remplaçable            ⋯   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Courgettes                 │ │
│ │                            │ │
│ │ Complet : 1 kg             │ │
│ │ Demi : 500 g               │ │
│ │                            │ │
│ │ Non remplaçable        ⋯   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Salade                     │ │
│ │                            │ │
│ │ Complet : 1                │ │
│ │ Demi : 1                   │ │
│ │                            │ │
│ │ Remplaçable            ⋯   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ + Ajouter un produit ]        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SUBSTITUTIONS                   │
│                                 │
│ Maximum par adhérent            │
│ [ 2 ]                           │
│                                 │
│ Aubergines                      │
│ peut être remplacé par :        │
│                                 │
│ • Poivrons                      │
│ • Courgettes                    │
│                                 │
│ [ Modifier ]                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMANDES                       │
│                                 │
│ Pas encore générées             │
│                                 │
│ Cette composition sera utilisée │
│ pour les prochaines commandes.  │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

CTA sticky.

---

# 5. Portée hebdomadaire

Le header doit toujours afficher la semaine concernée.

Exemple :

```text
Panier AMAP
Mercredi 2 septembre
```

ou, si plusieurs jours AMAP existent :

```text
Panier AMAP
Vendredi 4 septembre
```

L’admin ne doit jamais pouvoir oublier sur quelle semaine il travaille.

---

# 6. Sélecteur de semaine

Contrôle simple :

```text
[ ‹ ] Mercredi 2 septembre [ › ]
```

Éventuellement accompagné de :

```text
[ Choisir une date ]
```

Pas besoin d’un calendrier mensuel lourd par défaut.

---

# 7. Semaine actuelle vs future

L’écran peut afficher :

```text
Cette semaine
```

ou :

```text
Semaine prochaine
```

mais toujours conserver la date exacte :

```text
Mercredi 2 septembre 2026
```

---

# 8. Nombre d’abonnements concernés

Information utile :

```text
42 abonnements concernés
```

et éventuellement :

```text
28 paniers complets
14 demi-paniers
```

Cela aide le maraîcher à comprendre l’échelle de préparation.

---

# 9. Pourquoi afficher complet / demi

Exemple :

```text
28 paniers complets
14 demi-paniers
```

permet ensuite de comprendre les quantités agrégées.

Mais l’écran ne doit pas devenir immédiatement un outil de préparation.

La préparation détaillée reste dans :

```text
AdminPreparationScreen
```

---

# 10. Composition

La composition est une liste ordonnée de produits.

Exemple :

```text
Tomates
Courgettes
Salade
Carottes
Aubergines
```

L’ordre peut être utilisé pour :

- l’affichage adhérent ;
- la préparation ;
- la lecture de la composition.

---

# 11. Ajouter un produit

CTA :

```text
[ + Ajouter un produit ]
```

ouvre un `Sheet`.

```text
Ajouter au panier

Produit
[ Tomates ▼ ]

Panier complet
Quantité
[ 1 ]
Unité
[ kg ]

Demi-panier
Quantité
[ 500 ]
Unité
[ g ]

[ Ajouter ]
```

---

# 12. Sélection du produit

Le produit doit venir du catalogue.

Idéalement, le sélecteur favorise :

```text
Disponible
Selon disponibilité
```

et signale clairement :

```text
Indisponible
```

Il est déconseillé de bloquer absolument un produit marqué indisponible si l’admin sait qu’il sera disponible pour la semaine prochaine.

Mais un avertissement est pertinent.

---

# 13. Produit actuellement indisponible

Exemple :

```text
⚠ Aubergines est actuellement
marqué Indisponible dans le catalogue.
```

Actions :

```text
[ Ajouter quand même ]
[ Annuler ]
```

La composition AMAP planifiée et l’état courant du catalogue ne sont pas exactement la même chose.

---

# 14. Quantité panier complet

Exemple :

```text
Panier complet

1 kg
```

La quantité appartient à la composition de la semaine.

Ce n’est pas la quantité réellement préparée.

---

# 15. Quantité demi-panier

Toujours explicite :

```text
Demi-panier

500 g
```

ou :

```text
Salade

Complet
1

Demi
1
```

L’UI ne doit pas calculer automatiquement la moitié pour les unités discrètes.

---

# 16. Préremplissage intelligent

Lors de l’ajout :

```text
Complet : 1 kg
```

le système peut proposer :

```text
Demi : 500 g
```

si l’unité est divisible.

Mais il s’agit d’une suggestion modifiable.

Pas d’invariant :

```text
half = full / 2
```

dans le domaine.

---

# 17. Produit à l’unité

Exemple :

```text
Salade

Panier complet
1 unité

Demi-panier
1 unité
```

C’est parfaitement valide.

Un demi-panier ne signifie pas que chaque ligne doit être divisée exactement en deux.

---

# 18. Autre exemple

```text
Radis

Complet
2 bottes

Demi
1 botte
```

ou :

```text
Œufs

Complet
6

Demi
4
```

si cela correspond réellement à la logique métier.

---

# 19. Modifier une ligne

Tap carte ou menu :

```text
⋯
```

actions :

```text
Modifier les quantités
Configurer les substitutions
Déplacer
Retirer du panier
```

---

# 20. Retirer un produit

En édition avant génération :

```text
Retirer Tomates du panier ?

[ Annuler ]
[ Retirer ]
```

Pas besoin d’un modal lourd si aucune commande n’existe encore.

---

# 21. Si des commandes sont déjà générées

Cas critique.

Si la composition a déjà été snapshotée dans des commandes :

```text
⚠ 18 commandes AMAP
ont déjà été générées pour cette date.
```

Règle recommandée :

> **modifier la composition de référence ne réécrit pas automatiquement les commandes déjà générées.**

---

# 22. Conséquence

Exemple :

```text
✓ Composition modifiée

18 commandes déjà générées
conservent leur panier actuel.

Les nouvelles commandes utiliseront
la nouvelle composition.
```

Mais idéalement, à cette échéance, la génération progressive doit limiter ce cas.

---

# 23. Recommandation métier

Pour une même date AMAP, il vaut mieux avoir :

```text
composition préparée
↓
deadline
↓
génération des commandes
```

et ensuite figer davantage la composition.

Cela limite les divergences.

---

# 24. État “commandes déjà générées”

L’écran peut passer en mode :

```text
Composition publiée / utilisée
```

avec avertissement :

```text
18 commandes ont déjà été générées.
```

L’admin peut encore corriger, mais l’impact doit être explicite.

---

# 25. Verrouillage possible

Une politique plus simple serait :

> après génération de la première commande, la composition ne peut plus être modifiée depuis cet écran.

Les corrections seraient alors réalisées au niveau des commandes.

C’est très sûr mais peut être trop rigide.

---

# 26. Recommandation V1

Compromis recommandé :

- avant génération : édition libre ;
- après génération : édition possible admin avec avertissement ;
- commandes existantes inchangées ;
- nouvelles commandes utilisent la nouvelle version.

---

# 27. Version de composition

La composition devrait avoir une version.

Conceptuellement :

```text
AmapWeeklyBasket
date
version
```

Chaque commande AMAP garde son snapshot.

---

# 28. Substitutions

Toutes les lignes ne sont pas forcément substituables.

Exemple :

```text
Tomates
Non remplaçable
```

```text
Aubergines
Remplaçable
```

---

# 29. Configuration d’une substitution

Tap :

```text
Configurer les substitutions
```

ouvre :

```text
Aubergines

Peut être remplacé par :

☑ Poivrons
☑ Courgettes
☐ Carottes

[ Enregistrer ]
```

---

# 30. Produits de remplacement autorisés

La liste doit venir des produits disponibles/autorisés cette semaine.

Pas du catalogue entier sans filtre.

Exemple :

```text
Poivrons
Disponible

Courgettes
Disponible

Carottes
Selon disponibilité
```

---

# 31. Produit de remplacement indisponible

Si une option devient indisponible :

```text
⚠ Poivrons est actuellement indisponible.
```

L’admin peut décider de la retirer de la liste de remplacement.

---

# 32. Quantité de remplacement

Point très important.

Il ne suffit pas de dire :

```text
Aubergines → Poivrons
```

Il faut pouvoir connaître la quantité du remplacement pour chaque type de panier.

Exemple :

```text
Poivrons

Panier complet
500 g

Demi-panier
250 g
```

---

# 33. Wireframe substitution détaillée

```text
┌─────────────────────────────────┐
│ Remplacement : Aubergines       │
├─────────────────────────────────┤
│                                 │
│ Poivrons                        │
│                                 │
│ Complet                         │
│ [ 500 ] [ g ]                   │
│                                 │
│ Demi                            │
│ [ 250 ] [ g ]                   │
│                                 │
│ [ Retirer ]                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Courgettes                      │
│                                 │
│ Complet                         │
│ [ 500 ] [ g ]                   │
│                                 │
│ Demi                            │
│ [ 250 ] [ g ]                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [ + Ajouter une option ]        │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

# 34. Pas d’équivalence tarifaire automatique

Ne pas tenter :

```text
500 g aubergines = 430 g poivrons
```

à partir des prix.

En V1 :

> le maraîcher définit explicitement la quantité de remplacement.

C’est plus simple et plus fidèle au métier.

---

# 35. Limite de substitutions

Configuration hebdomadaire :

```text
Maximum par adhérent

[ 2 ]
```

ou éventuellement valeur globale AMAP.

Si cette limite est globale, elle ne doit pas être éditable ici.

---

# 36. Recommandation pour cette limite

Comme pour la deadline, privilégier une règle globale si elle est uniforme :

```text
Maximum 2 substitutions par panier
```

et l’écran ne fait que l’afficher.

Si elle varie par semaine, alors elle appartient ici.

---

# 37. Produit non remplaçable

Exemple :

```text
Salade

Non remplaçable
```

Pas besoin d’afficher une section vide.

---

# 38. Plusieurs options de remplacement

Exemple :

```text
Aubergines

Remplacements possibles :
Poivrons
Courgettes
```

Le membre choisit ensuite **une** option pour cette ligne.

---

# 39. Peut-on remplacer un remplacement ?

Non.

La logique V1 doit rester :

```text
produit d’origine
→ une option de remplacement
```

Pas :

```text
Aubergines
→ Poivrons
→ Carottes
```

---

# 40. Produit présent deux fois

Ne pas permettre deux lignes identiques :

```text
Tomates 500 g
Tomates 500 g
```

sauf si cela a une vraie signification métier.

Préférer :

```text
Tomates
1 kg
```

---

# 41. Réordonner les produits

L’ordre peut être modifiable.

Sur mobile :

```text
⋯
Monter
Descendre
```

Sur tablette :

```text
≡
```

drag & drop possible.

Mais le réordonnancement est secondaire comparé aux quantités.

---

# 42. Pourquoi garder un ordre

L’ordre peut servir pour :

- présentation adhérent ;
- préparation ;
- cohérence visuelle entre semaines.

Mais il ne doit pas suggérer un ordre de picking obligatoire.

---

# 43. Vue agrégée des quantités

Une fonctionnalité très utile peut être affichée après la composition :

```text
À PRÉVOIR

Tomates
28 kg environ

Salades
42

Carottes
34 bottes
```

Calculé à partir de :

```text
nombre de paniers complets
+
nombre de demi-paniers
```

---

# 44. Attention sur l’agrégation

Cette estimation est utile pour planifier.

Mais il faut indiquer :

```text
≈
```

car :

- suspensions futures possibles ;
- transferts sans impact quantité ;
- inscriptions/changements éventuels ;
- génération pas encore figée.

---

# 45. Exemple

```text
28 paniers complets
14 demi-paniers
```

Tomates :

```text
28 × 1 kg
+
14 × 500 g
=
35 kg
```

UI :

```text
≈ 35 kg
```

---

# 46. Après deadline

Une fois la deadline passée, l’agrégation devient plus fiable.

On peut afficher :

```text
Besoin estimé après deadline
≈ 34,5 kg
```

Mais ce calcul appartient davantage au module de préparation.

Garder ici un résumé optionnel.

---

# 47. Produits selon disponibilité

Si un produit de composition est :

```text
Selon disponibilité
```

afficher :

```text
⚠ Selon disponibilité
```

mais ne pas empêcher la composition.

Cela informe le maraîcher qu’il devra peut-être gérer des ajustements.

---

# 48. Produit devenu indisponible

Alerte :

```text
⚠ Aubergines est maintenant
marqué Indisponible.

[ Remplacer dans la composition ]
```

Mais ne pas modifier automatiquement la composition.

---

# 49. Copier la semaine précédente

Action très utile :

```text
[ Copier la semaine précédente ]
```

surtout si les paniers évoluent progressivement.

À placer comme action secondaire dans le menu.

---

# 50. État vide

```text
Aucune composition définie
pour le 2 septembre.

[ Copier la semaine précédente ]
[ Créer la composition ]
```

Très utile au quotidien.

---

# 51. Copier ne signifie pas publier

Après copie :

```text
Composition copiée

Modifiez-la puis enregistrez.
```

On crée un nouveau brouillon indépendant.

---

# 52. Historique / versions

Pas besoin d’un gros système de versioning visible.

Mais on peut afficher :

```text
Dernière modification
24 août · 18:42
```

et conserver les versions côté domaine si nécessaire.

---

# 53. Brouillon vs utilisée

Deux états simples peuvent suffire :

```text
Brouillon
Utilisée pour les commandes
```

Éventuellement :

```text
Brouillon
Prête
```

mais attention à ne pas introduire un workflow de publication non nécessaire.

---

# 54. Faut-il “publier” la composition AMAP ?

Ne pas créer un second système de publication similaire aux disponibilités.

Pour la V1 :

> **Enregistrer la composition suffit.**

Elle devient la composition de référence de la semaine.

Les commandes la snapshotent lorsqu’elles sont générées.

---

# 55. Pourquoi pas de publication supplémentaire

Sinon on obtient :

```text
sauvegarder
publier
générer
notifier
```

pour quelque chose qui peut rester simple.

La publication versionnée est importante pour les disponibilités client, moins ici.

---

# 56. Notification des adhérents

La composition enregistrée peut devenir visible aux membres selon le calendrier AMAP.

Mais ne pas coupler :

```text
Enregistrer
```

à :

```text
envoyer une notification
```

automatiquement sans règle claire.

Un rappel AMAP peut être traité par la logique de notification prévue.

---

# 57. Composition modifiée après visibilité membre

Si un membre a déjà vu :

```text
Aubergines
```

et l’admin remplace par :

```text
Poivrons
```

il peut être utile d’indiquer :

```text
⚠ Cette composition était déjà visible
par les adhérents.
```

Mais ce cas peut rester secondaire en V1.

---

# 58. Validation

Bloquer l’enregistrement si :

- aucune ligne ;
- quantité complète invalide ;
- quantité demi invalide ;
- unité absente ;
- remplacement sans quantité ;
- produit de remplacement identique au produit d’origine ;
- doublon incohérent.

---

# 59. Quantité zéro

Ne pas autoriser :

```text
Tomates
Complet : 1 kg
Demi : 0
```

si cela signifie que le produit n’existe pas dans le demi-panier.

Dans ce cas, mieux vaut permettre explicitement :

```text
Inclus dans le demi-panier
[ Non ]
```

si ce besoin existe.

---

# 60. Produit absent du demi-panier

Ce cas peut être légitime.

Exemple :

```text
Melon

Complet
1

Demi-panier
Non inclus
```

Cela vaut mieux que :

```text
0 melon
```

---

# 61. Modèle de ligne recommandé

Ainsi, une ligne peut avoir :

```ts
fullQuantity
halfQuantity?: quantity
```

où absence signifie :

```text
non inclus dans le demi-panier
```

et non quantité zéro.

---

# 62. Wireframe ligne avec exclusion

```text
Melon

Panier complet
1

Demi-panier
Non inclus

Remplaçable
Non
```

Très compréhensible.

---

# 63. Tablette portrait

La liste peut devenir plus dense :

```text
┌─────────────────────────────────────────────┐
│ Produit       Complet      Demi      Rempl.│
├─────────────────────────────────────────────┤
│ Tomates       1 kg         500 g     Oui   │
│ Courgettes    1 kg         500 g     Non   │
│ Salade        1            1         Oui   │
│ Melon         1            —         Non   │
└─────────────────────────────────────────────┘
```

Tap ligne → édition.

---

# 64. Tablette paysage

Très bon contexte pour une édition en deux panneaux :

```text
┌─────────────────────────────┬──────────────────────────┐
│ COMPOSITION                 │ LIGNE SÉLECTIONNÉE      │
│                             │                          │
│ ≡ Tomates                   │ Tomates                 │
│ ≡ Courgettes                │                          │
│ ≡ Salade                    │ Complet : 1 kg          │
│ ≡ Carottes                  │ Demi : 500 g            │
│                             │                          │
│ + Ajouter                   │ Remplacements           │
│                             │ Poivrons                │
│                             │ Courgettes              │
└─────────────────────────────┴──────────────────────────┘
```

---

# 65. Desktop

Même modèle.

La liste à gauche peut rester sticky.

L’éditeur de ligne à droite évite les multiples sheets.

Mais l’architecture de composants doit rester commune.

---

# 66. Projection de données

Exemple :

```ts
type AmapWeeklyBasket = {
  id: string
  version: number

  deliveryDate: string

  status:
    | "draft"
    | "in_use"

  audience: {
    fullBasketSubscriptions: number
    halfBasketSubscriptions: number
  }

  lines: AmapWeeklyBasketLine[]

  maxSubstitutionsPerMember: number

  generatedOrdersCount: number

  lastUpdatedAt: string
}
```

---

# 67. Ligne de composition

```ts
type AmapWeeklyBasketLine = {
  id: string

  product: {
    id: string
    name: string
    unit: string
  }

  position: number

  fullBasket: {
    quantity: number
    unit: string
  }

  halfBasket?: {
    quantity: number
    unit: string
  }

  replacements: AmapWeeklyReplacementOption[]
}
```

Absence de `halfBasket` signifie :

```text
non inclus dans le demi-panier
```

---

# 68. Option de remplacement

```ts
type AmapWeeklyReplacementOption = {
  product: {
    id: string
    name: string
  }

  fullBasket: {
    quantity: number
    unit: string
  }

  halfBasket?: {
    quantity: number
    unit: string
  }
}
```

---

# 69. Query

Conceptuellement :

```text
GET /admin/amap/weekly-baskets/:deliveryDate
```

Si la composition n’existe pas :

```text
404
```

ou projection vide exploitable.

Préférer une réponse :

```ts
{
  exists: false,
  previousBasketAvailable: true
}
```

pour simplifier le flow.

---

# 70. Création

Conceptuellement :

```text
POST /admin/amap/weekly-baskets
```

avec :

```ts
{
  deliveryDate: string
  lines: ...
  maxSubstitutionsPerMember: number
}
```

---

# 71. Modification

```text
PUT /admin/amap/weekly-baskets/:deliveryDate
```

avec :

```ts
{
  expectedVersion: number
  lines: ...
  maxSubstitutionsPerMember: number
}
```

---

# 72. Copier la semaine précédente

Mutation possible :

```text
POST /admin/amap/weekly-baskets/:deliveryDate/copy-previous
```

ou simple action client + création.

Une intention serveur est préférable si cela doit copier proprement les références et quantités.

---

# 73. Résultat d’enregistrement

Le serveur peut renvoyer :

```ts
type UpdateWeeklyBasketResult = {
  basketId: string
  version: number

  generatedOrdersCount: number
}
```

Si des commandes existaient :

```text
✓ Composition enregistrée

18 commandes déjà générées
restent inchangées.
```

---

# 74. Concurrence

Si deux admins éditent la même semaine :

```text
⚠ La composition a été modifiée
depuis l’ouverture.

[ Recharger ]
```

Pas d’écrasement silencieux.

---

# 75. États principaux

Prévoir :

```text
loading
empty
ready
dirty
submitting
conflict
success
error
```

et éventuellement :

```text
inUse
```

comme propriété métier, pas nécessairement état UI séparé.

---

# 76. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
FormField
Select
NumericInput
Button
IconButton
Badge
Alert
Sheet
StickyActionBar
SortableList
EmptyState
ConfirmDialog
```

---

# 77. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapWeeklyBasketLine
AmapBasketQuantityFields
AmapReplacementOptionEditor
AmapReplacementList
AmapWeeklyBasketAudience
AmapWeeklyBasketStatus
AmapWeeklyBasketTotals
```

---

# 78. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-weekly-basket-screen.tsx
├── components/
│   ├── amap-weekly-basket-header.tsx
│   ├── amap-week-selector.tsx
│   ├── amap-weekly-basket-audience.tsx
│   ├── amap-weekly-basket-line-list.tsx
│   ├── amap-weekly-basket-line-editor.tsx
│   ├── amap-weekly-replacement-editor.tsx
│   ├── amap-weekly-basket-impact-alert.tsx
│   └── amap-weekly-basket-actions.tsx
└── index.ts
```

---

# 79. Accessibilité

Points importants :

- semaine/date complète annoncée ;
- quantité complète et demi clairement labellées ;
- ne jamais exprimer l’absence dans le demi-panier uniquement par `0` ;
- réordonnancement disponible via boutons en plus du drag ;
- remplacement annoncé textuellement ;
- erreurs associées à la bonne ligne ;
- statut catalogue non indiqué uniquement par couleur ;
- CTA sticky sans masquer les derniers champs.

---

# 80. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- la semaine concernée est impossible à confondre ;
- l’admin peut créer une composition entièrement sur téléphone ;
- les quantités complet/demi sont explicites ;
- le système ne produit jamais automatiquement des valeurs absurdes comme `0,5 salade` ;
- un produit peut être explicitement absent du demi-panier ;
- les substitutions sont configurées produit par produit ;
- les quantités de remplacement sont explicites ;
- aucun algorithme d’équivalence de prix ou poids inexistant n’est suggéré ;
- les produits indisponibles déclenchent un avertissement mais pas une mutation automatique ;
- copier la semaine précédente est rapide ;
- les commandes déjà générées ne sont jamais réécrites silencieusement ;
- le nombre de paniers complets/demi permet d’anticiper la préparation ;
- l’écran devient particulièrement efficace sur tablette sans changer de modèle mental.

---

# 81. Structure de référence

```text
DATE / SEMAINE
      ↓
ABONNEMENTS CONCERNÉS
      ↓
COMPOSITION
      ↓
QUANTITÉS PANIER COMPLET
      ↓
QUANTITÉS DEMI-PANIER
      ↓
SUBSTITUTIONS AUTORISÉES
      ↓
LIMITE DE SUBSTITUTIONS
      ↓
IMPACT SUR COMMANDES EXISTANTES
      ↓
ENREGISTRER
```

Cette structure doit permettre de définir la composition AMAP d’une semaine de façon explicite, traçable et adaptée aux différences entre panier complet et demi-panier.
