# AdminOrderListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/orders.md
```

Implémentation :

```text
packages/screens/admin/orders/
├── order-list-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran `AdminOrderListScreen` doit permettre de répondre rapidement à deux questions :

> **Quelles commandes nécessitent mon attention ?**

et :

> **Où en est telle commande ?**

Il doit permettre de :

- voir les commandes par statut ;
- retrouver rapidement une commande ;
- filtrer par date, récupération, origine, etc. ;
- identifier les commandes urgentes ;
- ouvrir le détail ;
- créer manuellement une commande ;
- lancer le traitement séquentiel des commandes à valider.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ Commandes                  ＋   │
├─────────────────────────────────┤
│                                 │
│ [À valider 5] [À préparer 12]   │
│ [Préparées 8] [Toutes]          │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Rechercher              │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Aujourd’hui ▼ ] [ Filtres 2 ]│
│                                 │
├─────────────────────────────────┤
│ 5 commandes                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Marie Dupont                │ │
│ │                             │ │
│ │ Marché Saint-Pierre         │ │
│ │ Samedi · 08:00              │ │
│ │                             │ │
│ │ 4 articles                  │ │
│ │ ~24 €                       │ │
│ │                             │ │
│ │ À VALIDER                   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Paul Martin                 │ │
│ │                             │ │
│ │ Retrait ferme               │ │
│ │ Aujourd’hui · 17:00         │ │
│ │                             │ │
│ │ 2 articles                  │ │
│ │                             │ │
│ │ À PRÉPARER                  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Lucie Bernard               │ │
│ │                             │ │
│ │ Tournée Nord                │ │
│ │ Aujourd’hui · 14:00         │ │
│ │                             │ │
│ │ Panier AMAP                 │ │
│ │                             │ │
│ │ PRÉPARÉE                    │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
│ Auj. │ Cmd │ Préparer │ Dispo │+│
└─────────────────────────────────┘
```

---

# 4. Hiérarchie de l’écran

L’ordre recommandé est :

1. titre + création ;
2. segmentation par statut ;
3. recherche ;
4. filtres contextuels ;
5. nombre de résultats ;
6. liste des commandes.

Le maraîcher doit pouvoir arriver sur l’écran et filtrer en quelques secondes.

---

# 5. Segmentation par statut

Utiliser un `SegmentedControl`, éventuellement scrollable si nécessaire :

```text
[À valider 5] [À préparer 12] [Préparées 8] [Toutes]
```

Les statuts `Livrées` et `Annulées` peuvent rester accessibles via `Toutes` + filtres, afin de ne pas surcharger la navigation principale.

Le statut actif doit être clairement identifiable.

---

# 6. Comportement contextuel

L’écran doit pouvoir être ouvert avec des filtres déjà appliqués.

Exemple depuis `AdminTodayScreen` :

```text
2 commandes non récupérées
        ↓
AdminOrderListScreen
```

avec par exemple :

```text
statut = préparée
date = hier
non récupérée = oui
```

Un indicateur permet de voir immédiatement qu’un contexte est actif :

```text
Filtres actifs : 3
```

avec une action :

```text
Réinitialiser
```

---

# 7. Recherche

La recherche doit fonctionner sur :

- nom ;
- prénom ;
- téléphone ;
- email ;
- numéro de commande.

Exemple :

```text
┌─────────────────────────────┐
│ 🔍 Marie                   │
└─────────────────────────────┘
```

Les résultats peuvent être mis à jour après un léger debounce.

---

# 8. Filtres mobile

Le bouton :

```text
[ Filtres 2 ]
```

ouvre un `FilterSheet`.

Wireframe :

```text
┌─────────────────────────────────┐
│ Filtres                     ×   │
├─────────────────────────────────┤
│                                 │
│ DATE                            │
│                                 │
│ ● Aujourd’hui                   │
│ ○ Demain                        │
│ ○ Cette semaine                 │
│ ○ Personnalisée                 │
│                                 │
├─────────────────────────────────┤
│ RÉCUPÉRATION                    │
│                                 │
│ □ Marché                        │
│ □ Ferme                         │
│ □ Livraison                     │
│ □ Autre                         │
│                                 │
├─────────────────────────────────┤
│ ORIGINE                         │
│                                 │
│ □ Web                           │
│ □ Admin                         │
│ □ AMAP                          │
│                                 │
├─────────────────────────────────┤
│ TYPE                            │
│                                 │
│ □ Classique                     │
│ □ AMAP                          │
│                                 │
├─────────────────────────────────┤
│ [ Réinitialiser ]               │
│                                 │
│ [ Appliquer les filtres ]       │
└─────────────────────────────────┘
```

---

# 9. Carte commande

Chaque carte doit permettre de comprendre la commande sans l’ouvrir.

## Toujours visibles

- client ;
- récupération ;
- date / heure ;
- statut.

## Selon contexte

- nombre d’articles ;
- panier AMAP ;
- montant estimé ou final ;
- alerte ;
- origine.

Exemple :

```text
Marie Dupont

Marché Saint-Pierre
Samedi · 08:00

4 articles · ~24 €

À VALIDER
```

---

# 10. Commande urgente

Une commande proche de son heure de récupération doit être mise en évidence.

```text
Paul Martin

Retrait ferme
Aujourd’hui · 17:00

⚠ À récupérer dans 1h

À PRÉPARER
```

L’urgence doit être exprimée textuellement et non uniquement par une couleur.

---

# 11. Commande modifiée par le client

Cas important :

```text
Marie Dupont

Marché Saint-Pierre
Samedi · 08:00

⚠ Modifiée par le client

À VALIDER
```

Si une commande déjà acceptée est modifiée dans les délais autorisés, elle revient au statut :

```text
À valider
```

Cet état doit être très visible dans la liste.

---

# 12. Commande AMAP

Une commande AMAP reste visuellement cohérente avec les autres commandes.

Exemple :

```text
Lucie Bernard

Panier AMAP
Tournée Nord
Mercredi · 14:00

1 substitution

À PRÉPARER
```

Il n’est pas nécessaire d’introduire un design entièrement différent.

---

# 13. Interaction avec une commande

Toute la carte est tappable.

Flux :

```text
AdminOrderListScreen
        ↓
AdminOrderDetailsScreen
```

Il n’est pas nécessaire d’ajouter un petit bouton `Voir`.

---

# 14. Création manuelle

Le bouton `+` du header permet de créer une commande manuellement.

Sur mobile, cette action peut ouvrir un écran ou un `Sheet` plein écran.

Objectif :

> permettre au maraîcher de centraliser rapidement une commande reçue par téléphone, SMS, WhatsApp ou email.

En V1, l’origine peut être :

```text
Admin
```

La source détaillée pourra être ajoutée ultérieurement.

---

# 15. Action groupée — validation

Lorsque l’onglet `À valider` est actif, une action sticky peut apparaître :

```text
┌───────────────────────────────┐
│ Traiter les 5 commandes      │
└───────────────────────────────┘
```

Elle ouvre :

```text
AdminOrderValidationScreen
```

Cela évite de devoir ouvrir les commandes une par une depuis la liste.

---

# 16. Tablette portrait

En portrait, conserver une liste tactile généreuse.

Exemple :

```text
┌──────────────────────────────────────────┐
│ Marie Dupont                             │
│ Marché Saint-Pierre · Samedi 08:00       │
│                                          │
│ 4 articles · ~24 €      À valider        │
└──────────────────────────────────────────┘
```

L’espace supplémentaire permet d’afficher plus d’informations sans changer le fonctionnement mental.

---

# 17. Tablette paysage — master/detail

En paysage, un master/detail peut devenir pertinent.

```text
┌──────────────────────┬───────────────────────────────┐
│ Commandes            │ Commande #1048               │
│                      │                               │
│ Marie Dupont         │ Marie Dupont                  │
│ À valider            │                               │
│                      │ Marché Saint-Pierre           │
│ Paul Martin          │ Samedi 08:00                  │
│ À préparer           │                               │
│                      │ Tomates · 2 kg                │
│ Lucie Bernard        │ Salade · 1                    │
│ Préparée             │ ...                           │
│                      │                               │
│                      │ [Accepter]                    │
└──────────────────────┴───────────────────────────────┘
```

Ce comportement n’est cependant pas indispensable à la V1.

Le parcours liste → détail reste acceptable sur tablette.

---

# 18. Desktop

Sur desktop, une vue tabulaire plus dense peut être utilisée.

```text
Commandes

[À valider] [À préparer] [Préparées] [Toutes]

Recherche...                 Aujourd’hui     Filtres

┌──────────────┬──────────────────┬──────────┬──────────────┐
│ Client       │ Récupération     │ Contenu  │ Statut       │
├──────────────┼──────────────────┼──────────┼──────────────┤
│ Marie Dupont │ Marché · Sam 8h  │ 4 art.   │ À valider    │
│ Paul Martin  │ Ferme · 17h      │ 2 art.   │ À préparer   │
└──────────────┴──────────────────┴──────────┴──────────────┘
```

Cette table est un enrichissement desktop et ne doit pas dicter le design mobile.

---

# 19. Tri

Tri par défaut recommandé :

```text
urgence
→ date de récupération
→ heure
→ date de création
```

Dans `À valider`, les commandes les plus urgentes doivent être présentées en premier.

Dans `Toutes`, le tri par défaut peut devenir :

```text
plus récentes
```

---

# 20. Pagination et chargement

Sur mobile, privilégier :

- chargement progressif ;
- pagination transparente ;
- ou bouton `Afficher plus`.

Éviter si possible une pagination classique :

```text
1 2 3 4 5
```

Sur desktop, une pagination traditionnelle peut être introduite si le volume le justifie.

---

# 21. État vide — À valider

```text
✓ Tout est traité

Aucune commande n’attend de validation.

Les nouvelles commandes apparaîtront ici.
```

Pas besoin d’ajouter un CTA artificiel.

---

# 22. État vide — recherche

```text
Aucune commande trouvée pour “Dupont”.

[ Effacer la recherche ]
```

---

# 23. État vide — filtres

```text
Aucune commande ne correspond à ces filtres.

[ Réinitialiser les filtres ]
```

Il faut distinguer :

- aucune commande existante ;
- aucun résultat à cause de la recherche ;
- aucun résultat à cause des filtres.

---

# 24. Chargement

Skeleton de cartes :

```text
┌─────────────────────────────┐
│ █████████████               │
│ █████████                   │
│                             │
│ ██████                      │
└─────────────────────────────┘
```

Le header et les tabs peuvent rester visibles pendant le chargement.

---

# 25. Erreur

```text
Impossible de charger les commandes.

[ Réessayer ]
```

Une erreur partielle ne doit pas bloquer inutilement l’ensemble de l’écran.

---

# 26. Actualisation

Sur le futur mobile natif, un `pull-to-refresh` pourra être pertinent.

Sur le web mobile :

- actualisation silencieuse au retour sur l’écran ;
- pas de bouton de refresh obligatoire si les données sont déjà synchronisées automatiquement.

---

# 27. Données de projection

La liste ne doit pas charger chaque commande complète.

Exemple de projection :

```ts
type OrderListItem = {
  id: string
  reference: string

  customer: {
    name: string
  }

  status:
    | "pending_validation"
    | "to_prepare"
    | "prepared"
    | "delivered"
    | "cancelled"

  source:
    | "web"
    | "admin"
    | "amap"

  recovery: {
    label: string
    startsAt: string
  }

  content: {
    lines: number
    amapBasket?: "full" | "half"
  }

  price?: {
    estimated?: number
    final?: number
  }

  flags: {
    modifiedByCustomer?: boolean
    urgent?: boolean
    uncollected?: boolean
  }
}
```

Cette projection contient uniquement les informations utiles à la liste.

---

# 28. Query

Endpoint possible :

```text
GET /admin/orders
```

Paramètres possibles :

```text
status
date
recoveryMethod
occurrenceId
source
customer
search
cursor
```

Exemple :

```text
/admin/orders
  ?status=pending_validation
  &date=today
```

---

# 29. Composants `@project/ui`

L’écran peut s’appuyer sur :

```text
Screen
ScreenHeader
SegmentedControl
SearchInput
FilterSheet
Badge
Card
EmptyState
Skeleton
StickyActionBar
```

---

# 30. Composants métier

Bons candidats dans :

```text
packages/domains/orders/ui/
```

Exemples :

```text
OrderCard
OrderStatusBadge
OrderUrgencyBadge
```

`OrderCard` peut potentiellement être réutilisé dans :

- la liste des commandes ;
- la préparation ;
- la fiche client ;
- certaines vues d’occurrence.

---

# 31. Composants spécifiques à l’écran

Exemple :

```text
packages/screens/admin/orders/
├── order-list-screen.tsx
├── components/
│   ├── order-list-header.tsx
│   ├── order-filter-sheet.tsx
│   └── order-list-empty-state.tsx
└── index.ts
```

Les composants uniquement utiles à cet écran restent privés dans son dossier.

---

# 32. Navigation

## Ouvrir une commande

```text
OrderListScreen
     ↓
OrderDetailsScreen
```

## Traiter les commandes à valider

```text
À valider
     ↓
Traiter les commandes
     ↓
OrderValidationScreen
```

## Créer une commande

```text
+
↓
CreateOrder
```

## Navigation contextuelle depuis Aujourd’hui

```text
TodayScreen
   ↓
OrderListScreen + filtres
```

## Navigation depuis une fiche client

```text
CustomerDetailsScreen
   ↓
OrderListScreen + customerId
```

---

# 33. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- une commande est identifiable en moins de 2 secondes ;
- les statuts principaux sont accessibles sans ouvrir les filtres ;
- le maraîcher peut ouvrir une commande en un tap ;
- la recherche est toujours facilement accessible ;
- les filtres avancés ne surchargent pas l’écran ;
- une commande urgente est immédiatement identifiable ;
- une modification client ne peut pas passer inaperçue ;
- le traitement séquentiel est facilement accessible dans `À valider` ;
- l’interface reste confortable à une main ;
- aucune table desktop n’est nécessaire au bon fonctionnement de la version mobile.

---

# 34. Structure de référence

```text
HEADER + CRÉATION
        ↓
STATUTS
        ↓
RECHERCHE
        ↓
DATE + FILTRES
        ↓
LISTE DE COMMANDES
        ↓
ACTION CONTEXTUELLE ÉVENTUELLE
```

Cette structure doit permettre une consultation rapide tout en conservant une forte capacité de filtrage lorsque le volume de commandes augmente.
