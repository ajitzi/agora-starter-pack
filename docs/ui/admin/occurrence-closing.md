# AdminOccurrenceClosingScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/occurrence-closing.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── occurrence-closing-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Qu’est-ce qu’il reste à régler avant de considérer cette activité comme terminée ?**

Il doit permettre de :

- traiter les commandes préparées mais non récupérées ;
- vérifier qu’aucune commande n’est dans un état incohérent ;
- mettre à jour les disponibilités après l’activité ;
- décider de publier ou non ces nouvelles disponibilités ;
- clôturer définitivement l’occurrence ;
- conserver une trace claire des décisions prises.

---

# 3. Principe UX

Traiter la clôture comme un **workflow guidé en étapes**, et non comme une longue page de paramètres.

Structure :

```text
1. Commandes
2. Disponibilités
3. Publication
4. Confirmation
```

Sur mobile, une étape à la fois.

Sur tablette, on peut afficher davantage de contexte, mais le déroulé reste identique.

---

# 4. Wireframe mobile — étape 1

```text
┌─────────────────────────────────┐
│ ← Clôturer le marché            │
│                                 │
│ Marché Saint-Pierre             │
│ Samedi 29 août                  │
├─────────────────────────────────┤
│                                 │
│ Étape 1 / 4                     │
│ Commandes                       │
│ █████░░░░░░░░░░░               │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 18 commandes                    │
│                                 │
│ ✓ 17 livrées                    │
│ ⚠ 1 non récupérée              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ À TRAITER                       │
│                                 │
│ Marie Dupont                    │
│                                 │
│ 3 produits                      │
│ 16,40 €                         │
│                                 │
│ Préparée                        │
│                                 │
│ [ Reporter ]                    │
│ [ Annuler ]                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Une décision est nécessaire     │
│ avant de continuer.             │
│                                 │
└─────────────────────────────────┘
│ [ Continuer ]                   │
└─────────────────────────────────┘
```

Le bouton `Continuer` reste désactivé tant que toutes les anomalies bloquantes ne sont pas résolues.

---

# 5. Étape 1 — commandes

Première règle :

> **On ne clôture pas une activité avec des commandes préparées laissées dans un état ambigu.**

Les commandes peuvent être :

```text
Livrées
Annulées
Reportées
```

Une commande encore simplement `Préparée` à la fin de l’activité doit être traitée explicitement.

---

# 6. Cas sans anomalie

Si tout est traité :

```text
COMMANDES

✓ 18 / 18 traitées

18 livrées
0 restante

Tout est en ordre.
```

Le CTA est immédiatement disponible :

```text
[ Continuer ]
```

L’étape reste courte.

---

# 7. Commande non récupérée

Exemple :

```text
Marie Dupont

Préparée
Marché Saint-Pierre

Tomates
Salade
Courgettes

[ Reporter ]
[ Annuler ]
```

Ne pas ajouter un troisième choix vague du type :

```text
À voir plus tard
```

La clôture sert justement à supprimer les ambiguïtés.

---

# 8. Reporter une commande

Tap sur :

```text
Reporter
```

ouvre un `Sheet`.

```text
Reporter la commande

Nouvelle récupération

[ Mardi 1 septembre ▼ ]

Mode
[ Retrait ferme ▼ ]

Occurrence
[ 17:00 – 19:00 ▼ ]

Note facultative
[ ... ]

[ Confirmer le report ]
```

Après confirmation :

```text
✓ Commande reportée
```

Dans la clôture :

```text
Marie Dupont
Reportée au 1 septembre
```

---

# 9. Statut après report

Remettre généralement la commande en :

```text
À préparer
```

pour la nouvelle occurrence.

Même si une ancienne préparation existe, le report représente un nouveau contexte de remise et peut nécessiter une nouvelle vérification.

L’historique conserve :

```text
Préparée pour le 29 août
→ non récupérée
→ reportée au 1 septembre
```

---

# 10. Annuler une commande non récupérée

Tap sur :

```text
Annuler
```

ouvre une confirmation :

```text
Annuler cette commande ?

Motif
[ Non récupérée ]

Note facultative
[ ... ]

[ Retour ]
[ Annuler la commande ]
```

Après confirmation :

```text
✓ Commande annulée
```

La commande reste dans l’historique.

---

# 11. Consommation AMAP

Cas important.

Un panier AMAP n’est consommé que lorsque la commande est :

```text
Livrée
```

Donc :

```text
Préparée mais non récupérée
```

ne doit **pas** consommer automatiquement un panier.

Si elle est :

```text
Reportée
```

le panier reste à consommer plus tard.

Si elle est :

```text
Annulée
```

aucune consommation.

---

# 12. Résumé après résolution

```text
COMMANDES

18 commandes

17 livrées
1 reportée

✓ Toutes les commandes sont traitées
```

Puis :

```text
[ Continuer ]
```

---

# 13. Étape 2 — disponibilités

Wireframe :

```text
┌─────────────────────────────────┐
│ ← Clôturer le marché            │
│                                 │
│ Étape 2 / 4                     │
│ Disponibilités                  │
│ ██████████░░░░░░               │
├─────────────────────────────────┤
│                                 │
│ Mettez à jour ce qu’il reste    │
│ après le marché.                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOMATES                         │
│                                 │
│ Disponible                      │
│                                 │
│ Quantité estimée                │
│ [ 6 ] kg                        │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ COURGETTES                      │
│                                 │
│ [ Selon disponibilité ]         │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ AUBERGINES                      │
│                                 │
│ [ Indisponible ]                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ✓ Modifications enregistrées    │
│                                 │
└─────────────────────────────────┘
│ [ Continuer ]                   │
└─────────────────────────────────┘
```

---

# 14. Réutiliser l’UX des disponibilités

Il ne faut pas inventer une seconde interface métier pour modifier les disponibilités.

Cette étape réutilise :

```text
AvailabilityStatusControl
AvailabilityQuantityInput
SaveStatus
```

issus de `AdminAvailabilityScreen`.

La différence est uniquement le contexte :

> vous venez de finir une activité, mettez à jour ce qui reste.

---

# 15. Quels produits afficher ?

Ne pas nécessairement montrer tout le catalogue.

En priorité :

- produits présents dans les commandes de l’occurrence ;
- produits du panier AMAP ;
- produits explicitement modifiés pendant la journée.

Action possible :

```text
[ Voir tous les produits ]
```

Cela réduit fortement la longueur sur mobile.

---

# 16. Suggestion de valeurs

Le système ne doit pas calculer automatiquement un stock restant à partir des commandes.

Règle :

> les commandes ne décrémentent pas automatiquement la disponibilité.

On peut afficher :

```text
Avant le marché : 18 kg
```

mais pas :

```text
Il devrait rester 6,3 kg
```

si ce chiffre est dérivé artificiellement des commandes.

La mise à jour reste manuelle.

---

# 17. Aucun changement

Le maraîcher peut parfaitement ne rien modifier.

Exemple :

```text
Aucune modification apportée.

[ Continuer ]
```

La clôture ne doit pas obliger un changement de disponibilité.

---

# 18. Sauvegarde

Comme dans `AdminAvailabilityScreen` :

```text
Enregistrement…
```

puis :

```text
✓ Enregistré
```

Ne pas permettre de passer silencieusement à l’étape suivante avec des changements non enregistrés.

---

# 19. Erreur de sauvegarde

```text
⚠ 2 modifications ne sont pas enregistrées.

[ Réessayer ]
```

Le bouton `Continuer` peut être bloqué jusqu’à résolution.

---

# 20. Étape 3 — publication

Wireframe :

```text
┌─────────────────────────────────┐
│ ← Clôturer le marché            │
│                                 │
│ Étape 3 / 4                     │
│ Publication                     │
│ ███████████████░░░             │
├─────────────────────────────────┤
│                                 │
│ 4 modifications non publiées    │
│                                 │
│ Tomates                         │
│ 18 kg → 6 kg                    │
│                                 │
│ Courgettes                      │
│ Disponible → Selon dispo        │
│                                 │
│ Aubergines                      │
│ Disponible → Indisponible       │
│                                 │
│ [ Voir les changements ]        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Que voulez-vous faire ?         │
│                                 │
│ [ Enregistrer sans publier ]    │
│                                 │
│ [ Publier maintenant ]          │
│                                 │
└─────────────────────────────────┘
```

---

# 21. Publication facultative

La clôture d’une activité ne doit pas imposer une publication.

Deux choix explicites :

```text
Enregistrer sans publier
```

ou :

```text
Publier maintenant
```

Les changements sont déjà enregistrés à l’étape précédente.

---

# 22. `Enregistrer sans publier`

Ce choix signifie :

```text
catalogue courant mis à jour
publication inchangée
notifications non envoyées
```

Puis passage à la confirmation finale.

---

# 23. `Publier maintenant`

Deux possibilités UX.

### Option A — publication inline

Intégrer les canaux et le message directement dans cette étape.

### Option B — réutiliser l’écran complet

```text
AdminOccurrenceClosingScreen
        ↓
AdminPublishAvailabilityScreen
        ↓
retour au workflow de clôture
```

Recommandation : **Option B**.

Pourquoi :

- pas de duplication ;
- même logique de publication partout ;
- gestion identique des erreurs ;
- snapshot et notifications cohérents.

Après succès, retour automatique à l’étape 4.

---

# 24. Publication avec notifications échouées

Si publication réussie mais notification partiellement échouée :

```text
✓ Publication créée

⚠ 4 emails n’ont pas été envoyés.
```

Cela ne bloque pas la clôture.

Le problème peut rester consultable après.

---

# 25. Étape 4 — confirmation

Wireframe :

```text
┌─────────────────────────────────┐
│ ← Clôturer le marché            │
│                                 │
│ Étape 4 / 4                     │
│ Confirmation                    │
│ ████████████████████            │
├─────────────────────────────────┤
│                                 │
│ ✓ Commandes traitées            │
│                                 │
│ 17 livrées                      │
│ 1 reportée                      │
│                                 │
│ ✓ Disponibilités mises à jour   │
│                                 │
│ 4 changements                   │
│                                 │
│ ✓ Publication effectuée         │
│                                 │
│ Aujourd’hui · 13:04             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Marché Saint-Pierre             │
│ Samedi 29 août                  │
│                                 │
│ est prêt à être clôturé.        │
│                                 │
└─────────────────────────────────┘
│ [ Terminer l’activité ]         │
└─────────────────────────────────┘
```

---

# 26. Action finale

```text
[ Terminer l’activité ]
```

Transition :

```text
occurrence ouverte
      ↓
occurrence terminée
```

Après confirmation serveur :

```text
✓ Activité clôturée
```

Puis retour vers :

```text
AdminOccurrenceDetailsScreen
```

en état `Terminée`.

---

# 27. Pas de confirmation supplémentaire

Ne pas ajouter :

```text
Êtes-vous sûr ?
```

après avoir déjà effectué quatre étapes.

L’écran de résumé **est** la confirmation.

---

# 28. Revenir à une étape précédente

L’utilisateur doit pouvoir revenir :

```text
Étape 3
   ↑
Étape 2
```

tant que l’occurrence n’est pas définitivement clôturée.

Attention :

- une publication déjà effectuée ne peut pas être « annulée » en revenant ;
- les commandes déjà reportées restent reportées ;
- les actions confirmées sont persistées immédiatement.

Le workflow n’est pas une transaction géante.

---

# 29. Principe de persistance

Chaque étape enregistre ses décisions immédiatement.

Exemple :

```text
report commande
→ sauvegardé
```

```text
modifier disponibilité
→ autosave
```

```text
publier
→ snapshot créé
```

Puis seule l’action finale marque :

```text
occurrence = closed
```

Cela rend le workflow robuste aux interruptions.

---

# 30. Quitter en cours de clôture

Si l’utilisateur quitte après l’étape 2 :

- les commandes déjà traitées restent traitées ;
- les disponibilités déjà sauvegardées restent sauvegardées ;
- l’occurrence reste `À clôturer`.

Lorsqu’il revient :

```text
Reprendre la clôture
```

Le système reconstruit l’état depuis les données persistées.

---

# 31. Progression persistante ou reconstruite ?

Il n’est pas nécessaire de créer immédiatement un objet `ClosingSession`.

Le workflow peut être reconstruit depuis :

- état des commandes ;
- état du catalogue ;
- publication éventuellement créée ;
- statut de l’occurrence.

Créer une session persistée ne devient utile que si le workflow gagne beaucoup de complexité.

---

# 32. Tablette portrait

On peut afficher les étapes dans un stepper plus compact :

```text
1 Commandes ✓
2 Disponibilités ●
3 Publication
4 Confirmation
```

Le contenu reste en dessous.

---

# 33. Tablette paysage

Un stepper vertical fonctionne bien :

```text
┌──────────────────┬─────────────────────────────┐
│ ✓ Commandes      │                             │
│ ● Disponibilités │     contenu étape          │
│ ○ Publication    │                             │
│ ○ Confirmation   │                             │
└──────────────────┴─────────────────────────────┘
```

Les étapes doivent rester tactiles et lisibles.

---

# 34. Desktop

Même logique que tablette paysage.

Le stepper vertical + contenu central fonctionne très bien.

---

# 35. Cas : aucune commande

Pour un marché sans précommande :

```text
Étape 1

Aucune commande à traiter.

✓ Rien à faire
```

Puis directement :

```text
[ Continuer ]
```

La clôture reste utile pour les disponibilités.

---

# 36. Cas : aucune modification de disponibilité

Étape 2 :

```text
Aucun changement nécessaire.

[ Continuer ]
```

Étape 3 :

```text
Aucune modification non publiée.

Aucune publication nécessaire.

[ Continuer ]
```

Le workflow s’allège automatiquement.

---

# 37. Cas : activité déjà clôturée

Si l’utilisateur ouvre directement l’URL :

```text
Cette activité est déjà terminée.

Clôturée le 29 août à 13:04.

[ Voir l’activité ]
```

Pas de duplication de clôture.

---

# 38. Cas : nouvelle commande pendant la clôture

Cas concurrent important.

Si une commande est ajoutée ou modifiée pendant le workflow :

```text
⚠ Les commandes de cette activité ont changé.

Une nouvelle commande nécessite votre attention.

[ Actualiser ]
```

La clôture finale est bloquée.

On ne doit jamais terminer l’occurrence sur une projection obsolète.

---

# 39. Cas : commande modifiée après étape 1

Même logique.

Avant `Terminer l’activité`, l’API doit revérifier que :

- aucune commande n’est `À valider` ;
- aucune commande n’est `À préparer` ;
- aucune commande n’est `Préparée` sans décision si elle devait être distribuée.

---

# 40. Mutation finale

Conceptuellement :

```text
POST /admin/distribution/occurrences/:id/close
```

avec contrôle de version :

```ts
{
  expectedVersion: number
}
```

Le serveur revalide les invariants avant de clôturer.

---

# 41. Invariants de clôture

Conceptuellement :

```text
aucune commande bloquante
+
aucune modification de disponibilité en erreur de sauvegarde
+
occurrence non déjà clôturée
```

Une publication n’est **pas** requise.

---

# 42. Projection de clôture

Exemple :

```ts
type OccurrenceClosing = {
  occurrence: {
    id: string
    version: number
    name: string
    date: string
  }

  orders: {
    total: number
    delivered: number
    cancelled: number
    rescheduled: number
    unresolved: ClosingOrder[]
  }

  availability: {
    affectedProducts: ClosingAvailabilityProduct[]
    unpublishedChanges: number
  }

  publication?: {
    publicationId?: string
    publishedAt?: string
  }

  canClose: boolean
  blockingReasons: string[]
}
```

---

# 43. Commande à résoudre

```ts
type ClosingOrder = {
  orderId: string
  customerName: string
  status: "prepared"

  summary: {
    lineCount: number
    finalAmount?: number
  }

  actions: {
    canCancel: boolean
    canReschedule: boolean
  }
}
```

---

# 44. Produits affectés

```ts
type ClosingAvailabilityProduct = {
  productId: string
  name: string
  unit: string

  currentAvailability: AvailabilityState

  involvedInOccurrence: boolean
}
```

La vue peut ensuite prioriser uniquement les produits concernés.

---

# 45. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Stepper
Progress
Section
Card
Alert
Button
StickyActionBar
Sheet
ConfirmDialog
SaveStatus
EmptyState
Skeleton
```

---

# 46. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
ClosingOrderSummary
OccurrenceClosingSummary
OccurrenceStatusBadge
```

Dans :

```text
packages/domains/catalog/ui/
```

réutiliser :

```text
AvailabilityStatusControl
AvailabilityQuantityInput
```

Dans :

```text
packages/domains/orders/ui/
```

réutiliser éventuellement :

```text
OrderStatusBadge
```

---

# 47. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── occurrence-closing-screen.tsx
├── components/
│   ├── closing-stepper.tsx
│   ├── closing-orders-step.tsx
│   ├── closing-availability-step.tsx
│   ├── closing-publication-step.tsx
│   ├── closing-confirmation-step.tsx
│   └── closing-actions.tsx
└── index.ts
```

---

# 48. États principaux

Prévoir :

```text
loading
ready
saving
blocked
conflict
closing
closed
error
```

En plus, chaque étape peut avoir ses propres sous-états.

---

# 49. Accessibilité

Points importants :

- stepper accompagné de texte ;
- ne pas utiliser uniquement la couleur pour indiquer une étape complétée ;
- boutons `Reporter` et `Annuler` suffisamment espacés ;
- action destructive clairement distinguée ;
- feedback de sauvegarde explicite ;
- focus déplacé vers le haut de la nouvelle étape après navigation.

---

# 50. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’utilisateur sait immédiatement ce qu’il lui reste à régler ;
- aucune commande non récupérée ne peut être oubliée ;
- reporter et annuler sont des décisions explicites ;
- un panier AMAP n’est consommé qu’après livraison réelle ;
- la mise à jour des disponibilités réutilise les mêmes patterns que l’écran principal ;
- la publication reste facultative ;
- `Enregistrer sans publier` et `Publier` sont clairement distincts ;
- une notification échouée ne bloque pas la clôture si le snapshot existe ;
- quitter le workflow ne fait pas perdre les décisions déjà sauvegardées ;
- une modification concurrente empêche une clôture obsolète ;
- la dernière étape fournit un résumé suffisamment clair pour servir de confirmation.

---

# 51. Structure de référence

```text
COMMANDES
   ↓
RÉSOUDRE LES NON-RÉCUPÉRÉES
   ↓
DISPONIBILITÉS
   ↓
ENREGISTRER
   ↓
PUBLIER OU NON
   ↓
RÉSUMÉ
   ↓
TERMINER L’ACTIVITÉ
```

Cette structure doit permettre de clôturer proprement une activité sans ambiguïté, tout en conservant l’historique des décisions et en séparant clairement mise à jour du catalogue, publication et notifications.
