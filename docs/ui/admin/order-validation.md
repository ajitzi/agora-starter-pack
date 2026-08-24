# AdminOrderValidationScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/order-validation.md
```

Implémentation :

```text
packages/screens/admin/orders/
├── order-validation-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre rapidement à la question :

> **Est-ce que je peux accepter cette commande telle quelle ?**

et, si nécessaire :

> **Qu’est-ce que je dois corriger avant de l’accepter ?**

Il doit permettre de :

- traiter plusieurs commandes sans revenir à la liste ;
- voir immédiatement les points nécessitant une vérification ;
- modifier la commande ;
- accepter la commande ;
- passer temporairement une commande ;
- voir la progression globale.

---

# 3. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Validation                    │
│                                 │
│ Commande 3 / 7                  │
│ ████████░░░░░░░░░              │
├─────────────────────────────────┤
│                                 │
│ Marie Dupont                    │
│                                 │
│ Marché Saint-Pierre             │
│ Samedi 29 août · 08:00          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRODUITS                        │
│                                 │
│ Tomates cœur de bœuf            │
│ 2 kg                            │
│                                 │
│ ✓ Disponible                    │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Aubergines                      │
│ 1 kg                            │
│                                 │
│ ⚠ Selon disponibilité           │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Salade                          │
│ 1 pièce                         │
│                                 │
│ ✓ Disponible                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE CLIENT                     │
│                                 │
│ “Si possible des tomates        │
│ pas trop mûres.”                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ [ Modifier la commande ]        │
│                                 │
│ Passer pour l’instant           │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Accepter la commande       │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

L’action primaire est sticky.

---

# 4. Principe fondamental

L’écran doit afficher **uniquement ce qui est nécessaire pour décider**.

Il ne doit pas reprendre toute la richesse de `AdminOrderDetailsScreen`.

Ne pas mettre en priorité :

- historique complet ;
- métadonnées techniques ;
- toutes les informations client ;
- actions rares ;
- détails secondaires.

Le workflow doit rester focalisé sur la décision de validation.

---

# 5. Progression

La progression doit rester visible en haut :

```text
Commande 3 / 7

████████░░░░░░
```

Cela permet de savoir immédiatement :

- combien de commandes ont déjà été parcourues ;
- combien restent à traiter ;
- si la session est presque terminée.

Préférer une progression concrète `3 / 7` à un simple pourcentage.

---

# 6. Identification de la commande

Le bloc de contexte doit rester compact :

```text
Marie Dupont

Marché Saint-Pierre
Samedi 29 août · 08:00
```

Le numéro de commande peut être secondaire :

```text
#1048
```

Il n’est pas nécessaire d’afficher téléphone et email dans ce workflow sauf nécessité particulière.

---

# 7. Disponibilité des produits

Chaque ligne doit permettre une lecture très rapide.

## Cas normal

```text
Tomates
2 kg

✓ Disponible
```

## Cas à surveiller

```text
Aubergines
1 kg

⚠ Selon disponibilité
```

## Cas problématique

```text
Courgettes
3 kg

✕ Indisponible
```

Les statuts utilisent :

- une icône ;
- un texte ;
- éventuellement une couleur.

Ne jamais utiliser uniquement la couleur.

---

# 8. Produit indisponible

Si un produit est devenu indisponible, l’écran ne doit pas permettre une acceptation aveugle.

Exemple :

```text
⚠ 1 produit nécessite une action

Courgettes
Demandé : 3 kg

Indisponible

[ Modifier ]
```

Règle recommandée :

> **Une anomalie bloquante doit être résolue explicitement avant acceptation.**

Le bouton d’acceptation peut rester désactivé tant que le problème n’a pas été traité.

---

# 9. Produit `Selon disponibilité`

Le statut `Selon disponibilité` n’est pas bloquant.

Il sert de rappel :

```text
⚠ Selon disponibilité
```

Le maraîcher peut tout de même accepter la commande.

La quantité réelle sera ajustée pendant la préparation.

---

# 10. Quantité estimée potentiellement insuffisante

Si une quantité estimée existe et paraît inférieure à la demande :

```text
Tomates

Demandé
4 kg

Disponible estimé
2 kg

⚠ Quantité estimée inférieure à la demande
```

Comme les disponibilités ne constituent pas un stock temps réel, l’interface ne doit pas afficher :

```text
Stock insuffisant
```

sauf si le système possède réellement cette information.

---

# 11. Modification de la commande

Action :

```text
[ Modifier la commande ]
```

Sur mobile, l’édition peut ouvrir un `Sheet` plein écran.

Les modifications possibles incluent :

- changer une quantité ;
- supprimer une ligne ;
- ajouter un produit ;
- changer le mode de récupération ;
- ajouter une note admin.

Après modification, l’utilisateur revient directement dans le workflow de validation.

---

# 12. Commande modifiée par le client

Cas prioritaire :

```text
┌───────────────────────────────┐
│ ⚠ Modifiée par le client     │
│                               │
│ 2 changements depuis votre    │
│ dernière validation.          │
│                               │
│ [ Voir les changements ]      │
└───────────────────────────────┘
```

Diff possible :

```text
Tomates
2 kg → 3 kg

Salade
1 → supprimée
```

L’utilisateur doit comprendre immédiatement pourquoi la commande est revenue dans la file `À valider`.

---

# 13. Note client

La note est affichée uniquement si elle existe.

```text
NOTE CLIENT

“Si possible des tomates
pas trop mûres.”
```

Si aucune note n’existe, la section disparaît.

---

# 14. Action `Accepter`

Action primaire :

```text
[ Accepter la commande ]
```

Effet métier :

```text
À valider
   ↓
À préparer
```

Après confirmation serveur :

```text
✓ Commande acceptée
```

puis passage automatique à la commande suivante.

---

# 15. Passage automatique

Séquence idéale :

```text
Accepter
   ↓
confirmation serveur
   ↓
feedback court
   ↓
commande suivante
```

L’utilisateur ne doit pas revenir à la liste après chaque validation.

---

# 16. Action `Passer pour l’instant`

Action secondaire :

```text
Passer pour l’instant
```

Elle permet de reporter une décision sans modifier le statut.

La commande reste :

```text
À valider
```

Elle est déplacée plus loin dans la session courante.

Éviter une boucle infinie.

À la fin, le système peut afficher :

```text
5 commandes acceptées
2 laissées à valider
```

---

# 17. Fin de session

Lorsque toutes les commandes parcourables ont été traitées :

```text
┌───────────────────────────────┐
│ ✓ Validation terminée        │
│                               │
│ 5 commandes acceptées        │
│ 2 restent à valider          │
│                               │
│ [ Voir les 2 restantes ]      │
│                               │
│ [ Retour aux commandes ]      │
└───────────────────────────────┘
```

Si tout est traité :

```text
✓ Tout est validé

7 commandes acceptées.

[ Retour à Aujourd’hui ]
```

---

# 18. Quitter la session

Le bouton retour :

```text
← Validation
```

ne doit jamais faire perdre le travail déjà effectué.

Les commandes déjà acceptées restent acceptées.

Les autres restent `À valider`.

Il n’est pas nécessaire d’introduire un concept de session à sauvegarder.

---

# 19. Échec pendant l’acceptation

Exemple :

```text
Impossible d’accepter la commande.

La commande est toujours à valider.

[ Réessayer ]
```

Ne jamais passer visuellement à la commande suivante avant confirmation serveur.

---

# 20. Conflit de modification

Si le client modifie la commande pendant sa validation :

```text
⚠ Cette commande vient d’être modifiée.

Les informations affichées ne sont plus à jour.

[ Charger les changements ]
```

L’action `Accepter` est bloquée jusqu’au rechargement de la version courante.

Aucun écrasement silencieux ne doit être possible.

---

# 21. Tablette portrait

Même logique que mobile avec davantage d’espace.

```text
┌─────────────────────────────────────────┐
│ Validation                     3 / 7    │
├─────────────────────────────────────────┤
│ Marie Dupont                            │
│ Marché Saint-Pierre · Samedi 08:00      │
│                                         │
│ PRODUITS                                │
│                                         │
│ Tomates        2 kg      ✓ Disponible   │
│ Aubergines     1 kg      ⚠ Selon dispo  │
│ Salade         1         ✓ Disponible   │
│                                         │
│ NOTE CLIENT                             │
│ ...                                     │
│                                         │
│                [Modifier] [Accepter]     │
└─────────────────────────────────────────┘
```

---

# 22. Tablette paysage

La tablette paysage peut séparer contexte et produits :

```text
┌──────────────────────┬─────────────────────────────┐
│ CONTEXTE             │ PRODUITS                    │
│                      │                             │
│ Marie Dupont         │ Tomates      ✓             │
│ Marché               │ Aubergines   ⚠             │
│ Samedi 08:00         │ Salade       ✓             │
│                      │                             │
│ Note client          │                             │
│ ...                  │                             │
├──────────────────────┴─────────────────────────────┤
│ Passer           Modifier                 Accepter │
└────────────────────────────────────────────────────┘
```

Le contenu reste centré sur la décision.

---

# 23. Desktop

Même sur un écran large, le workflow doit conserver une largeur maximale raisonnable.

Exemple :

```text
sidebar │        validation
        │      max-width ~900
```

Cet écran est un écran de concentration et ne doit pas devenir un dashboard.

---

# 24. Ordre de traitement

Tri recommandé :

```text
urgence
→ récupération la plus proche
→ date de création
```

Les commandes prévues aujourd’hui passent avant celles des jours suivants.

---

# 25. Constitution de la session

La session dépend du contexte d’entrée.

Depuis :

```text
AdminTodayScreen
```

le workflow peut traiter toutes les commandes `À valider`.

Depuis une liste filtrée :

```text
Commandes
filtre = aujourd’hui
```

le bouton :

```text
Traiter les commandes
```

peut lancer uniquement ce sous-ensemble.

---

# 26. Conservation du contexte

Le workflow doit savoir d’où il a été ouvert.

Exemple conceptuel :

```text
source:
- today
- order-list
- occurrence
```

À la fin, le bouton retour peut ramener vers l’écran pertinent.

Cette logique appartient à la navigation, pas au domaine métier.

---

# 27. Projection des données

Le workflow n’a pas besoin du modèle complet de commande.

Exemple :

```ts
type OrderValidationItem = {
  id: string
  reference: string
  version: number

  customer: {
    name: string
  }

  recovery: {
    label: string
    date: string
    time?: string
  }

  lines: {
    id: string
    productName: string
    requestedQuantity: number
    unit: string

    availability: {
      status:
        | "available"
        | "subject_to_availability"
        | "unavailable"

      estimatedQuantity?: number
    }
  }[]

  customerNote?: string

  modification?: {
    modifiedByCustomer: boolean
    changes: OrderChange[]
  }

  actions: {
    canAccept: boolean
    canEdit: boolean
  }
}
```

---

# 28. Version de commande

Prévoir explicitement une version technique :

```ts
version: number
```

Lors de :

```text
accept(orderId, expectedVersion)
```

si la version a changé, l’API refuse l’action.

Ce contrôle est particulièrement important puisque le client peut modifier sa commande jusqu’à la deadline.

---

# 29. Actions API

Conceptuellement :

```text
POST /admin/orders/:id/accept
```

avec contrôle de version.

Édition :

```text
PATCH /admin/orders/:id
```

La validation séquentielle ne nécessite pas d’API batch en V1.

Chaque commande peut être traitée individuellement.

Cela rend le comportement plus robuste et facilite l’audit.

---

# 30. Composants `@project/ui`

L’écran peut utiliser :

```text
Screen
ScreenHeader
Progress
Badge
Alert
Button
StickyActionBar
Sheet
EmptyState
Skeleton
```

---

# 31. Composants métier

Dans :

```text
packages/domains/orders/ui/
```

bons candidats :

```text
OrderValidationLine
OrderCustomerChangeDiff
OrderAvailabilityIndicator
```

La carte complète `OrderCard` n’est pas nécessaire dans ce workflow focalisé.

---

# 32. Composants spécifiques au screen

```text
packages/screens/admin/orders/
├── order-validation-screen.tsx
├── components/
│   ├── validation-progress.tsx
│   ├── validation-order-context.tsx
│   ├── validation-lines.tsx
│   ├── validation-actions.tsx
│   └── validation-complete.tsx
└── index.ts
```

---

# 33. États de l’écran

Prévoir explicitement :

```text
loading
ready
accepting
conflict
error
complete
```

Pendant `accepting` :

- désactiver le bouton ;
- empêcher un double tap ;
- conserver la commande visible ;
- attendre la confirmation serveur avant de passer à la suivante.

---

# 34. Accessibilité

Points importants :

- grandes zones tactiles ;
- texte explicite pour les statuts ;
- ordre de focus logique ;
- action principale accessible au clavier ;
- `Enter` ne doit pas accepter accidentellement une commande pendant une édition ;
- les warnings doivent être annoncés par les lecteurs d’écran.

---

# 35. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- une commande normale peut être validée en quelques secondes ;
- la progression est toujours visible ;
- les produits problématiques ressortent immédiatement ;
- une commande modifiée par le client ne peut pas être validée sans comprendre le changement ;
- `Selon disponibilité` n’est pas confondu avec un blocage ;
- les anomalies réellement bloquantes empêchent une acceptation accidentelle ;
- `Passer pour l’instant` permet de poursuivre le workflow ;
- après acceptation, l’utilisateur arrive automatiquement sur la suivante ;
- aucune action déjà confirmée n’est perdue en quittant la session ;
- l’expérience reste confortable sur téléphone et tablette.

---

# 36. Structure de référence

```text
PROGRESSION
    ↓
CONTEXTE COMMANDE
    ↓
ALERTES / MODIFICATIONS
    ↓
PRODUITS
    ↓
NOTE ÉVENTUELLE
    ↓
MODIFIER / PASSER
    ↓
ACCEPTER
```

Cette structure doit permettre un traitement très rapide des commandes normales tout en rendant les exceptions impossibles à ignorer.
