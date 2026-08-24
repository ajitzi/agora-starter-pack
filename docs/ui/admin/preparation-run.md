# AdminPreparationRunScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/preparation-run.md
```

Implémentation :

```text
packages/screens/admin/preparation/
├── preparation-run-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Qu’est-ce que je dois mettre dans cette commande, et quelles quantités réelles ai-je préparées ?**

Il doit permettre de :

- traiter les commandes une par une ;
- voir la progression ;
- identifier immédiatement le client ;
- afficher la composition standard ;
- mettre en avant les substitutions et autres exceptions ;
- saisir les poids ou quantités réels ;
- calculer le montant final ;
- corriger ce montant si nécessaire ;
- terminer la préparation ;
- passer automatiquement à la commande suivante.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marché Saint-Pierre           │
│                                 │
│ Commande 6 / 18                 │
│ ███████░░░░░░░░░░              │
├─────────────────────────────────┤
│                                 │
│ MARIE DUPONT                    │
│ Panier AMAP                     │
│                                 │
│ Marché Saint-Pierre             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PANIER                          │
│                                 │
│ Tomates                         │
│ Salade                          │
│ Courgettes                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ⚠ REMPLACEMENT                 │
│                                 │
│ Aubergines                      │
│      ↓                          │
│ Poivrons                        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMPLÉMENTS                     │
│                                 │
│ Tomates                         │
│                                 │
│ Demandé                         │
│ ≈ 2 kg                          │
│                                 │
│ Poids réel                      │
│ ┌─────────────────────────────┐ │
│ │ 2,14                    kg │ │
│ └─────────────────────────────┘ │
│                                 │
│ 4 €/kg                          │
│                                 │
│ 8,56 €                          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOTAL                           │
│                                 │
│ 8,56 €                          │
│                                 │
│ [ Modifier le montant ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Passer pour l’instant           │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Terminer la préparation    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

L’action principale est sticky.

---

# 4. Progression

Toujours visible :

```text
Commande 6 / 18
███████░░░░░░░░░
```

La progression représente les commandes de l’occurrence, pas les lignes produits.

Après validation :

```text
6 / 18
   ↓
7 / 18
```

sans retour intermédiaire à la liste.

---

# 5. Contexte client

Le bloc doit rester très compact :

```text
MARIE DUPONT

Panier AMAP
Marché Saint-Pierre
```

Pour une commande classique :

```text
PAUL MARTIN

4 produits
Retrait ferme
```

Les coordonnées complètes ne sont pas nécessaires pendant la préparation.

Une action `Voir la commande` peut rester dans le menu secondaire si besoin.

---

# 6. Séparer standard et exceptions

Pour une commande AMAP, l’écran ne doit pas transformer la composition standard en checklist obligatoire.

Exemple :

```text
PANIER

Tomates
Salade
Courgettes
Carottes
```

Cette partie est informative.

L’attention est dirigée vers :

```text
⚠ REMPLACEMENT
Aubergines → Poivrons
```

Règle UX :

> **Le standard doit être discret ; les exceptions doivent ressortir.**

---

# 7. Commande AMAP sans exception

Elle doit être très rapide à traiter :

```text
Marie Dupont
Panier AMAP

PANIER STANDARD

Tomates
Salade
Courgettes
Carottes
Aubergines

✓ Aucun changement

[ Terminer la préparation ]
```

Pas de cinq cases à cocher inutilement.

---

# 8. Substitution AMAP

Exemple :

```text
⚠ REMPLACEMENT

Retirer
Aubergines

Ajouter
Poivrons
```

ou visuellement :

```text
Aubergines
    ↓
Poivrons
```

Si plusieurs substitutions existent, chacune doit être clairement séparée.

---

# 9. Cession AMAP

La cession ne change généralement pas ce qui est préparé, mais change la personne à qui le panier est remis.

Elle doit donc apparaître :

```text
PANIER CÉDÉ

Abonnement
Marie Dupont

À remettre à
Paul Dupont
```

Le bénéficiaire doit être particulièrement visible pour éviter une erreur lors de la distribution.

---

# 10. Compléments

Les produits commandés en plus du panier sont traités séparément.

```text
COMPLÉMENTS

Tomates
≈ 2 kg

Poids réel
[ 2,14 kg ]

4 €/kg
8,56 €
```

Les compléments sont probablement la zone où le maraîcher fera le plus de saisie.

---

# 11. Commande classique

Pour une commande classique, la structure devient directement :

```text
PAUL MARTIN

PRODUITS

Tomates
Demandé : ≈ 2 kg
Poids réel : [ 2,14 kg ]

Salade
Demandé : 1
Quantité réelle : [ - ] 1 [ + ]

Courgettes
Demandé : ≈ 1 kg
Poids réel : [ 1,08 kg ]
```

Le même composant de ligne peut donc être utilisé dans les deux contextes.

---

# 12. Produit au poids

Le champ principal doit être grand :

```text
Poids réel

┌───────────────────────────────┐
│ 2,14                      kg │
└───────────────────────────────┘
```

Caractéristiques :

- clavier numérique ;
- unité toujours visible ;
- valeur facilement remplaçable ;
- focus clair ;
- calcul immédiat du prix.

---

# 13. Produit à l’unité

Exemple :

```text
Quantité réelle

[ - ]      3      [ + ]
```

Si la quantité demandée est normalement la quantité préparée, préremplir :

```text
3
```

Le maraîcher ne modifie que si nécessaire.

---

# 14. Quantité réelle différente

Exemple :

```text
Demandé
≈ 2 kg

Préparé
1,85 kg
```

Aucun problème métier particulier.

Le prix final est basé sur :

```text
1,85 × prix unitaire
```

La différence doit rester visible sans être présentée comme une erreur.

---

# 15. Produit finalement indisponible

Pendant la préparation, un produit peut finalement manquer.

Action par ligne :

```text
⋯
```

puis :

```text
Modifier la quantité
Produit non fourni
Remplacer
```

Pour une commande classique, marquer :

```text
Quantité réelle : 0
```

peut suffire techniquement, mais l’UX devrait expliciter :

```text
Produit non fourni
```

pour garder une trace claire.

---

# 16. Suppression pendant préparation

Si un produit ne peut pas être fourni :

```text
Courgettes

Demandé
1 kg

⚠ Non fourni

0,00 €
```

Le produit reste dans la commande historique.

Il ne doit pas disparaître silencieusement.

---

# 17. Calcul du prix

Pour chaque ligne :

```text
quantité réelle × prix snapshot
```

Exemple :

```text
2,14 kg × 4 €/kg
8,56 €
```

Le prix utilisé est le prix enregistré au moment de la commande, pas le prix actuel du catalogue.

---

# 18. Total

En bas :

```text
TOTAL

Tomates        8,56 €
Courgettes     3,24 €
Salade         1,50 €

Total         13,30 €
```

Pour une commande AMAP, le panier lui-même peut ne pas avoir de prix calculé ici si son paiement relève de l’abonnement.

On affiche alors surtout les éventuels compléments payants.

---

# 19. Correction manuelle du montant

Action secondaire :

```text
Modifier le montant
```

ouvre :

```text
Montant calculé
13,30 €

Montant final
[ 13,00 € ]

Motif facultatif
[ Arrondi ]
```

Le montant calculé doit rester conservé dans l’historique pour audit.

---

# 20. Note client

Si une note existe :

```text
⚠ NOTE CLIENT

“Deux petites courgettes
plutôt qu’une grosse.”
```

Elle doit apparaître avant la ligne concernée ou juste avant les produits.

Une note client ne doit pas être reléguée tout en bas.

---

# 21. Note interne

Une petite action peut permettre :

```text
Ajouter une note
```

Exemple :

> tomate remplacée exceptionnellement.

Pas indispensable dans le parcours principal, mais utile pour l’historique.

---

# 22. Action `Terminer la préparation`

Action principale :

```text
[ Terminer la préparation ]
```

Transition :

```text
À préparer
    ↓
Préparée
```

Après confirmation serveur :

```text
✓ Commande préparée
```

puis passage à la commande suivante.

---

# 23. Validation avant terminaison

Avant de permettre l’action, vérifier :

- toutes les quantités réelles obligatoires ;
- toutes les exceptions résolues ;
- montant final valide.

Exemple :

```text
Il manque une information

Renseignez le poids réel
des tomates.
```

Puis scroll/focus sur le champ concerné.

---

# 24. Ne pas sur-valider

Éviter une confirmation systématique :

```text
Êtes-vous sûr de vouloir terminer ?
```

à chaque commande.

Le bouton est suffisamment explicite.

Une confirmation est utile uniquement pour une action inhabituelle ou destructive.

---

# 25. `Passer pour l’instant`

Comme pour la validation :

```text
Passer pour l’instant
```

permet de poursuivre sans terminer la commande.

Cas utiles :

- produit pas encore pesé ;
- question à vérifier ;
- client à contacter.

La commande reste `À préparer`.

---

# 26. Fin de session

Quand toutes les commandes sont préparées :

```text
✓ Préparation terminée

18 / 18 commandes sont prêtes.

Marché Saint-Pierre
Samedi 29 août

[ Voir la préparation ]

[ Retour à Aujourd’hui ]
```

On peut également proposer :

```text
[ Voir les commandes prêtes ]
```

Pas besoin d’enchaîner automatiquement vers la clôture.

---

# 27. Tablette portrait

La tablette permet d’élargir les inputs et de placer les informations sur une ligne.

```text
Tomates cœur de bœuf

Demandé       Poids réel       Prix
≈ 2 kg        [ 2,14 kg ]      8,56 €
```

Le tactile reste prioritaire.

---

# 28. Tablette paysage

C’est probablement le layout optimal.

```text
┌──────────────────────────┬───────────────────────────┐
│ COMMANDE                 │ SAISIE                    │
│                          │                           │
│ Marie Dupont             │ Tomates                  │
│ Panier AMAP              │ Demandé ≈2 kg            │
│                          │ [ 2,14 kg ]               │
│ PANIER                   │                           │
│ Tomates                  │ 8,56 €                    │
│ Salade                   │                           │
│ Courgettes               │ Courgettes               │
│                          │ [ 1,08 kg ]               │
│ ⚠ Aubergine → Poivron    │                           │
│                          │ TOTAL 12,34 €             │
├──────────────────────────┴───────────────────────────┤
│ Passer                      Terminer la préparation  │
└──────────────────────────────────────────────────────┘
```

À gauche : contexte stable.

À droite : saisies actives.

Cela convient particulièrement à une tablette posée à côté de la balance.

---

# 29. Desktop

Le même layout tablette paysage suffit.

La zone principale peut avoir une largeur maximale pour éviter des lignes trop longues.

Pas besoin de transformer l’écran en tableau.

---

# 30. Navigation pendant le workflow

Le parcours principal est linéaire.

```text
Commande 1
   ↓
Commande 2
   ↓
Commande 3
   ↓
...
```

Il peut être utile d’avoir dans le header :

```text
6 / 18
```

tappable pour ouvrir rapidement la liste :

```text
○ Marie
✓ Paul
○ Lucie
...
```

Cela permet de sauter vers une commande particulière sans quitter le workflow.

---

# 31. Retour

Si l’utilisateur quitte :

```text
← Marché Saint-Pierre
```

les commandes déjà terminées restent sauvegardées.

La commande en cours ne doit être considérée comme préparée qu’après confirmation explicite.

Pour les saisies intermédiaires, la recommandation V1 est :

> **autosauvegarder les valeurs de préparation au fil de la saisie, sans changer le statut tant que `Terminer la préparation` n’est pas pressé.**

---

# 32. Autosave

Exemple d’état :

```text
✓ Enregistré
```

Pendant la sauvegarde :

```text
Enregistrement…
```

En cas d’échec :

```text
⚠ Non enregistré

[ Réessayer ]
```

Il est crucial de ne pas laisser croire que le poids est enregistré s’il ne l’est pas.

---

# 33. Connectivité

Cas terrain important :

```text
⚠ Connexion perdue

Les dernières modifications
ne sont pas encore enregistrées.
```

Si l’on ne construit pas un vrai offline-first en V1, il vaut mieux bloquer proprement la finalisation que prétendre qu’elle a réussi.

---

# 34. Conflit concurrent

Si cette commande est modifiée depuis un autre appareil :

```text
⚠ Cette commande a changé

Les données de préparation
ne sont plus à jour.

[ Voir la nouvelle version ]
```

Ne jamais écraser silencieusement.

---

# 35. Projection de données

Exemple :

```ts
type PreparationRunItem = {
  orderId: string
  reference: string
  version: number

  customer: {
    name: string
  }

  orderType:
    | "classic"
    | "amap_full"
    | "amap_half"

  recovery: {
    label: string
  }

  standardBasket?: {
    items: {
      label: string
    }[]
  }

  substitutions?: {
    removedProduct: string
    replacementProduct: string
  }[]

  transfer?: {
    ownerName: string
    beneficiaryName: string
  }

  lines: PreparationLine[]

  customerNote?: string

  totals: {
    calculated: number
    override?: number
    final: number
  }
}
```

---

# 36. Ligne de préparation

```ts
type PreparationLine = {
  id: string

  product: {
    label: string
    unit: string
  }

  requestedQuantity?: number
  actualQuantity?: number

  unitPrice: number

  calculatedAmount?: number
  finalAmount?: number

  status:
    | "normal"
    | "not_supplied"
    | "replaced"
}
```

---

# 37. Mutation de sauvegarde

Les modifications peuvent être enregistrées au fil de l’eau :

```text
PATCH /admin/orders/:id/preparation
```

avec :

```text
expectedVersion
lines
amountOverride
```

Puis finalisation :

```text
POST /admin/orders/:id/complete-preparation
```

La sauvegarde et la finalisation sont donc deux concepts distincts.

---

# 38. Pourquoi séparer sauvegarde et finalisation

Parce que :

```text
poids saisis
```

ne signifie pas encore :

```text
commande prête
```

Cette distinction permet :

- reprise après interruption ;
- correction ;
- autosave ;
- meilleure robustesse réseau.

---

# 39. Composants `@project/ui`

Possibles :

```text
Screen
ScreenHeader
Progress
Section
Alert
NumericInput
QuantityStepper
Money
Badge
Button
StickyActionBar
Sheet
Skeleton
SaveStatus
```

---

# 40. Composants métier

Dans :

```text
packages/domains/orders/ui/
```

bons candidats :

```text
PreparationLine
PreparationTotals
PreparationCustomerNote
PreparationStatusBadge
```

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapBasketComposition
AmapSubstitution
AmapTransferNotice
```

---

# 41. Composants spécifiques au screen

```text
packages/screens/admin/preparation/
├── preparation-run-screen.tsx
├── components/
│   ├── preparation-run-progress.tsx
│   ├── preparation-run-context.tsx
│   ├── preparation-lines.tsx
│   ├── preparation-exceptions.tsx
│   ├── preparation-total.tsx
│   ├── preparation-save-status.tsx
│   └── preparation-run-actions.tsx
└── index.ts
```

---

# 42. États principaux

Prévoir :

```text
loading
ready
dirty
saving
saved
save-error
completing
conflict
complete
```

`dirty` et `saving` sont particulièrement utiles avec l’autosave.

---

# 43. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le client est identifiable immédiatement ;
- la progression est toujours visible ;
- un panier AMAP standard demande presque aucune interaction ;
- les substitutions ressortent immédiatement ;
- les poids peuvent être saisis rapidement avec de gros inputs ;
- quantité demandée et quantité réelle sont impossibles à confondre ;
- le montant est recalculé immédiatement ;
- le maraîcher peut corriger le montant sans perdre le calcul d’origine ;
- les saisies ne sont jamais présentées comme sauvegardées avant confirmation ;
- `Terminer la préparation` fait passer automatiquement à la commande suivante ;
- quitter le workflow ne fait pas perdre les commandes déjà terminées ;
- l’expérience tablette est exploitable à côté d’une balance ou sur un plan de travail.

---

# 44. Structure de référence

```text
PROGRESSION
    ↓
CLIENT / CONTEXTE
    ↓
PANIER STANDARD
    ↓
EXCEPTIONS
    ↓
PRODUITS / COMPLÉMENTS
    ↓
QUANTITÉS RÉELLES
    ↓
TOTAL
    ↓
ÉTAT DE SAUVEGARDE
    ↓
PASSER / TERMINER
```

Cette structure doit permettre une préparation séquentielle rapide, particulièrement adaptée au smartphone et à la tablette sur le terrain.
