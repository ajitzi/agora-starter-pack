# AdminProductEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/product-edit.md
```

Implémentation :

```text
packages/screens/admin/products/
├── admin-product-edit-screen.tsx
├── components/
└── index.ts
```

Un même écran gère la création et la modification.

---

## 2. Objectif

L’écran doit répondre à :

> **Quelle est la définition durable de ce produit ?**

Il permet de :

- créer un produit ;
- modifier son nom ;
- modifier sa description ;
- définir son unité ;
- définir son prix courant ;
- activer / désactiver le produit ;
- empêcher les changements structurels dangereux ;
- préserver l’historique des commandes, publications et paniers AMAP.

---

## 3. Principe métier fondamental

Il faut distinguer :

```text
Produit
= référentiel durable
```

de :

```text
Disponibilité
= état opérationnel courant
```

La désactivation du produit ne doit jamais servir à représenter une indisponibilité temporaire.

---

## 4. Wireframe mobile — création

```text
┌─────────────────────────────────┐
│ ← Nouveau produit               │
├─────────────────────────────────┤
│                                 │
│ NOM                             │
│ [ Tomates                  ]    │
│                                 │
│ DESCRIPTION                     │
│ Facultatif                      │
│ [ Tomates anciennes...     ]    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ UNITÉ                           │
│ [ kg                       ▼ ]  │
│                                 │
│ Exemples : kg, unité, botte     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRIX                            │
│ [ 4,50 ] € / kg                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ÉTAT                            │
│ Produit actif                   │
│ [ Oui ]                         │
│                                 │
└─────────────────────────────────┘
│ [ Créer le produit ]            │
└─────────────────────────────────┘
```

CTA sticky.

---

## 5. Wireframe mobile — modification

```text
┌─────────────────────────────────┐
│ ← Modifier le produit           │
│ Tomates                         │
├─────────────────────────────────┤
│ NOM                             │
│ [ Tomates                  ]    │
│                                 │
│ DESCRIPTION                     │
│ [ ...                      ]    │
│                                 │
│ UNITÉ                           │
│ kg                              │
│ Non modifiable                  │
│ Produit déjà utilisé            │
│                                 │
│ PRIX                            │
│ [ 4,80 ] € / kg                │
│                                 │
│ ÉTAT                            │
│ Actif                           │
│                                 │
│ [ Désactiver le produit ]       │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 6. Nom

Le nom est obligatoire.

Exemples :

```text
Tomates
Tomates cerises
Courgettes
Salade
Radis
```

Deux produits portant exactement le même nom doivent provoquer un avertissement fort.

Le nom n’a pas besoin d’être techniquement unique si le métier peut justifier deux variantes distinctes.

---

## 7. Description

Champ facultatif.

Exemple :

```text
Tomates anciennes cultivées sous serre froide.
```

La description peut être visible plus tard côté catalogue client.

Elle n’a aucune incidence sur les snapshots historiques déjà créés.

---

## 8. Unité

Unité structurante :

```text
kg
unité
botte
```

Éventuellement d’autres unités configurées plus tard.

Le choix doit venir d’une liste contrôlée, pas d’un texte libre si possible.

---

## 9. Règle de modification de l’unité

Si le produit n’a jamais été utilisé :

```text
canChangeUnit = true
```

L’unité peut être corrigée.

Si le produit apparaît déjà dans :

- une commande ;
- une publication ;
- une composition AMAP ;
- un historique de préparation ;

alors :

```text
canChangeUnit = false
```

---

## 10. Pourquoi verrouiller l’unité

Passer :

```text
Courgettes — kg
```

à :

```text
Courgettes — unité
```

modifie la signification de toutes les quantités.

En V1, si le mode de vente change réellement :

```text
désactiver l’ancien produit
+
créer un nouveau produit
```

---

## 11. Prix courant

Le prix est obligatoire pour un produit actif.

Exemple :

```text
4,50 € / kg
```

Il s’applique aux futures lignes de commande.

Il ne modifie jamais :

```text
unitPriceSnapshot
```

des commandes existantes.

---

## 12. Modification de prix

La modification de prix est normale :

```text
4,20 €/kg
→
4,50 €/kg
```

Avertissement possible :

```text
Le nouveau prix sera utilisé pour
les prochaines commandes uniquement.
```

---

## 13. Prix nul

En V1, si aucun produit gratuit n’existe :

```text
price > 0
```

Un prix nul doit être bloqué.

---

## 14. Activation

À la création :

```text
Produit actif
```

par défaut.

Un produit actif :

- peut être utilisé dans les futures commandes ;
- apparaît dans les disponibilités ;
- peut être sélectionné dans les futures compositions AMAP.

---

## 15. Désactivation

Action dédiée :

```text
[ Désactiver le produit ]
```

Confirmation :

```text
Désactiver Tomates ?

Le produit ne sera plus proposé
dans les nouveaux usages.

Son historique sera conservé.

[ Annuler ]
[ Désactiver ]
```

---

## 16. Conséquences de désactivation

La désactivation :

- ne supprime rien ;
- ne modifie aucune commande historique ;
- ne modifie aucune publication historique ;
- ne modifie aucun panier AMAP déjà snapshoté ;
- masque le produit des nouveaux usages par défaut.

---

## 17. Produit encore présent dans une commande active

Une commande déjà créée conserve le produit.

La désactivation ne doit pas supprimer la ligne.

Afficher éventuellement :

```text
2 commandes en cours utilisent encore ce produit.
```

Mais ne pas bloquer nécessairement la désactivation si l’admin comprend l’impact.

---

## 18. Produit présent dans une composition AMAP future

Cas plus sensible.

Si une composition AMAP non encore utilisée contient le produit :

```text
⚠ Ce produit est présent dans
1 panier AMAP à venir.
```

Action secondaire :

```text
[ Voir le panier ]
```

La désactivation ne doit pas muter silencieusement la composition.

---

## 19. Réactivation

Pour un produit inactif :

```text
[ Réactiver le produit ]
```

La réactivation ne remet pas automatiquement :

```text
Disponibilité = Disponible
```

Il reste nécessaire de gérer l’état courant dans `AdminAvailabilityScreen`.

---

## 20. Doublon de nom

Lors de la création :

```text
⚠ Un produit nommé “Tomates” existe déjà.

Tomates
4,50 €/kg · Actif

[ Voir ]
```

Le serveur doit refaire ce contrôle à la soumission.

---

## 21. Pas de suppression normale

Pas de bouton de suppression en V1.

Une suppression physique éventuelle pourra être réservée aux produits strictement jamais utilisés.

---

## 22. Pas d’autosave

Le formulaire fonctionne avec :

```text
dirty
↓
Enregistrer
```

Un changement de prix ou d’unité est suffisamment important pour exiger une action explicite.

---

## 23. Quitter avec modifications

```text
Modifications non enregistrées

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

---

## 24. Concurrence

Utiliser :

```text
expectedVersion
```

En cas de conflit :

```text
⚠ Ce produit a été modifié ailleurs.

[ Recharger ]
```

Pas d’écrasement silencieux.

---

## 25. Projection d’édition

```ts
type AdminProductEditData = {
  product: {
    id: string
    version: number
    name: string
    description?: string
    unit: {
      code: string
      label: string
    }
    currentUnitPrice: number
    active: boolean
  }

  usage: {
    hasOrders: boolean
    hasPublications: boolean
    hasAmapBaskets: boolean
    activeOrdersCount: number
    upcomingAmapBasketCount: number
  }

  capabilities: {
    canChangeUnit: boolean
    canDeactivate: boolean
    canReactivate: boolean
  }
}
```

---

## 26. Formulaire

```ts
type ProductFormValues = {
  name: string
  description?: string
  unitCode: string
  currentUnitPrice: number
}
```

L’état actif/inactif peut rester géré par des actions dédiées en modification.

---

## 27. API création

```text
POST /admin/products
```

---

## 28. API modification

```text
PATCH /admin/products/:id
```

avec :

```ts
{
  expectedVersion: number
  name: string
  description?: string
  currentUnitPrice: number
  unitCode?: string
}
```

Le serveur doit refuser `unitCode` si l’unité est verrouillée.

---

## 29. API activation

```text
POST /admin/products/:id/deactivate
POST /admin/products/:id/reactivate
```

Des intentions dédiées sont préférables à un booléen générique si elles portent des invariants.

---

## 30. Tablette / desktop

Tablette paysage :

```text
┌─────────────────────────────┬──────────────────────────┐
│ IDENTITÉ                    │ CONFIGURATION           │
│                             │                          │
│ Nom                         │ Unité                    │
│ Description                 │ Prix                     │
│                             │ État                     │
│                             │                          │
└─────────────────────────────┴──────────────────────────┘
```

Desktop : même modèle avec largeur contenue.

---

## 31. États principaux

```text
loading
ready
dirty
submitting
conflict
success
error
```

Création :

```text
ready
submitting
success
error
```

---

## 32. Accessibilité

- labels explicites ;
- prix annoncé avec son unité ;
- unité verrouillée expliquée textuellement ;
- statut actif/inactif non dépendant de la couleur ;
- confirmation de désactivation accessible ;
- erreurs associées au bon champ ;
- CTA sticky sans masquer le contenu.

---

## 33. Critères d’acceptation UX

L’écran est réussi si :

- créer un produit prend moins d’une minute ;
- le prix courant est clairement distinct de l’historique ;
- l’unité ne peut pas être modifiée dangereusement après usage ;
- désactiver ne peut pas être confondu avec rendre indisponible ;
- aucun historique n’est réécrit ;
- les compositions AMAP et commandes existantes ne sont jamais modifiées silencieusement ;
- les conflits concurrents sont explicites ;
- le formulaire reste compact sur mobile.

---

## 34. Structure de référence

```text
MODE CRÉATION / MODIFICATION
          ↓
NOM
          ↓
DESCRIPTION
          ↓
UNITÉ
          ↓
PRIX COURANT
          ↓
ÉTAT ACTIF / INACTIF
          ↓
IMPACT ÉVENTUEL
          ↓
ENREGISTRER
```
