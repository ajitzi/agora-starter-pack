# AdminAmapSubscriptionDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-subscription-details.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-subscription-details-screen.tsx
├── components/
└── index.ts
```

L’écran reste partagé entre web et mobile tant qu’aucune divergence structurelle forte n’apparaît.

---

## 2. Objectif

L’écran doit répondre à :

> **Où en est cet abonnement, et que va-t-il se passer à la prochaine livraison ?**

Il doit permettre de :

- voir l’adhérent ;
- voir le type de panier ;
- voir le nombre de paniers restants ;
- voir la prochaine livraison ;
- voir le point de retrait prévu ;
- voir la deadline de modification ;
- voir les substitutions ;
- voir les suspensions ;
- voir les transferts ;
- consulter l’historique de consommation ;
- modifier les paramètres permanents de l’abonnement ;
- effectuer une modification ponctuelle admin.

---

# 3. Principe UX

L’écran doit distinguer très clairement trois niveaux :

```text
ABONNEMENT
configuration permanente

↓
PROCHAINE LIVRAISON
état et exceptions ponctuelles

↓
HISTORIQUE
ce qui s’est réellement passé
```

C’est essentiel pour éviter qu’une modification d’une semaine change involontairement tout l’abonnement.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marie Dupont             ⋯    │
│                                 │
│ Abonnement actif                │
├─────────────────────────────────┤
│                                 │
│ PANIER                          │
│                                 │
│ Panier complet                  │
│                                 │
│ 8 paniers restants              │
│                                 │
│ Inscrite depuis                 │
│ 12 mars 2026                    │
│                                 │
│ [ Modifier l’abonnement ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PROCHAINE LIVRAISON             │
│                                 │
│ Mercredi 26 août                │
│                                 │
│ Marché Saint-Pierre             │
│                                 │
│ Modifiable jusqu’à              │
│ mardi 25 août · 18:00           │
│                                 │
│ [ Gérer cette semaine ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PANIER DE LA SEMAINE            │
│                                 │
│ Tomates          1 kg           │
│ Courgettes       1 kg           │
│ Salade           1              │
│ Carottes         1 botte        │
│                                 │
│ 4 produits                      │
│                                 │
│ [ Voir le détail ]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ EXCEPTIONS                      │
│                                 │
│ Aucune modification             │
│ pour cette semaine              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ HISTORIQUE                      │
│                                 │
│ 19 août                         │
│ ✓ Livré · 1 panier consommé   > │
│                                 │
│ 12 août                         │
│ Suspendu                      > │
│                                 │
│ 5 août                          │
│ ✓ Livré · 1 panier consommé   > │
│                                 │
│ [ Voir tout l’historique ]      │
│                                 │
└─────────────────────────────────┘
```

L’écran n’a pas besoin d’un CTA sticky permanent.

---

# 5. Header

Le header affiche :

```text
Marie Dupont
Abonnement actif
```

ou :

```text
Paul Martin
Abonnement inactif
```

Menu `⋯` possible :

```text
Modifier l’abonnement
Désactiver
```

ou :

```text
Réactiver
```

selon l’état.

---

# 6. Identité

L’écran est centré sur l’abonnement mais l’identité reste accessible.

Bloc compact :

```text
Marie Dupont

marie@example.fr
06 00 00 00 00
```

L’email et le téléphone ne sont pas forcément prioritaires au-dessus du panier : le métier AMAP doit rester dominant.

Une action secondaire peut ouvrir le détail client.

---

# 7. Bloc abonnement

Exemple :

```text
PANIER

Panier complet

8 paniers restants

Inscrite depuis
12 mars 2026
```

Pour un demi-panier :

```text
Demi-panier
5 paniers restants
```

---

# 8. Le compteur est une information majeure

Le nombre de paniers restants doit être très visible :

```text
8 paniers restants
```

et non caché dans une section technique.

À faible niveau :

```text
⚠ 2 paniers restants
```

À zéro :

```text
⚠ Aucun panier restant
```

---

# 9. Ne pas présenter le compteur comme un simple champ libre

Même si l’admin peut corriger le compteur, le système devrait idéalement le relier à des événements :

```text
+ ajout manuel
- livraison consommée
+ correction
```

Le détail doit pouvoir expliquer pourquoi le compteur vaut `8`.

---

# 10. Configuration permanente

Le bloc abonnement contient les valeurs par défaut :

```text
Type
Panier complet

Jour habituel
Mercredi

Retrait habituel
Marché Saint-Pierre

Deadline
J-1 · 18:00
```

C’est la configuration de référence.

---

# 11. Modification de l’abonnement

Action :

```text
[ Modifier l’abonnement ]
```

ouvre :

```text
AdminAmapSubscriptionEditScreen
```

pour modifier :

- type de panier ;
- jour habituel ;
- retrait habituel ;
- deadline ;
- compteur si autorisé ;
- état actif/inactif selon le workflow retenu.

---

# 12. Prochaine livraison

C’est le bloc le plus opérationnel.

Exemple :

```text
PROCHAINE LIVRAISON

Mercredi 26 août

Marché Saint-Pierre

Modifiable jusqu’à
mardi 25 août · 18:00
```

Action principale :

```text
[ Gérer cette semaine ]
```

---

# 13. Que signifie “Gérer cette semaine”

Cette action concerne uniquement la prochaine échéance.

Elle peut permettre :

- suspendre ;
- changer le retrait ;
- transférer le panier ;
- appliquer une substitution ;
- annuler une modification ponctuelle.

Elle ne modifie pas la configuration permanente par défaut.

---

# 14. Deadline ouverte

Avant la deadline :

```text
Modifications possibles
jusqu’à mardi 18:00
```

Les actions ponctuelles sont disponibles.

---

# 15. Deadline dépassée

Après la deadline :

```text
Deadline dépassée

Les modifications adhérent sont fermées.
L’admin peut encore intervenir.
```

Important :

> la deadline bloque le membre, pas l’admin.

Donc l’action admin reste disponible.

---

# 16. Prochaine livraison suspendue

Exemple :

```text
PROCHAINE LIVRAISON

Mercredi 26 août

SUSPENDUE

Aucun panier ne sera consommé.

Prochain panier prévu :
2 septembre
```

Action :

```text
[ Réactiver cette semaine ]
```

si le métier le permet encore.

---

# 17. Règle de consommation

Une suspension signifie :

```text
aucune commande AMAP livrée
↓
aucun panier consommé
```

Il ne faut jamais décrémenter le compteur lors de la simple génération.

La consommation intervient seulement après :

```text
commande AMAP → Livrée
```

---

# 18. Prochaine livraison transférée

Exemple :

```text
PROCHAINE LIVRAISON

Mercredi 26 août

Cédé à
Paul Dupont

Retrait
Marché Saint-Pierre
```

La propriété reste celle de Marie Dupont.

Il faut donc bien distinguer :

```text
Titulaire : Marie Dupont
Bénéficiaire cette semaine : Paul Dupont
```

---

# 19. Règle de transfert

Quand la commande est livrée :

```text
1 panier consommé
sur l’abonnement de Marie Dupont
```

Le bénéficiaire n’acquiert pas l’abonnement.

L’historique garde le transfert.

---

# 20. Changement ponctuel de retrait

Exemple :

```text
Retrait cette semaine

Tournée Sud · Montville

Habituellement :
Marché Saint-Pierre
```

Le mot :

```text
Exception
```

ou une formulation équivalente doit être visible.

Le point habituel peut rester dans le détail.

---

# 21. Retour à la valeur habituelle

Après cette occurrence :

```text
prochaine semaine
→ retrait habituel
```

sauf si une nouvelle exception est créée.

La modification ponctuelle ne change jamais le défaut.

---

# 22. Panier de la semaine

Section :

```text
PANIER DE LA SEMAINE

Tomates       1 kg
Courgettes    1 kg
Salade        1
Carottes      1 botte
```

C’est un snapshot hebdomadaire, pas une lecture dynamique de la composition courante.

---

# 23. Panier complet / demi-panier

La composition hebdomadaire est commune :

```text
Tomates
Courgettes
Salade
Carottes
```

mais les quantités sont adaptées au type.

Exemple :

```text
Panier complet
Tomates      1 kg

Demi-panier
Tomates      500 g
```

Pour une unité non divisible naturellement :

```text
Salade
```

le modèle doit définir une quantité adaptée, pas afficher :

```text
0,5 salade
```

---

# 24. Snapshot obligatoire

Une fois la commande AMAP générée, elle doit conserver :

- composition ;
- quantités ;
- substitutions ;
- prix/snapshot si pertinent ;
- retrait ;
- bénéficiaire.

Une modification de la composition hebdomadaire ultérieure ne réécrit pas silencieusement l’historique.

---

# 25. Substitution

Exemple :

```text
EXCEPTIONS

Substitution

Aubergines
↓
Poivrons
```

ou :

```text
Aubergines remplacées par Poivrons
```

Pas besoin d’afficher un calcul de valeur équivalente complexe en V1.

---

# 26. Plusieurs substitutions

Si deux substitutions sont autorisées :

```text
2 substitutions

Aubergines → Poivrons
Concombres → Courgettes
```

On doit empêcher de dépasser la limite prévue pour la semaine si cette limite est configurée.

---

# 27. Liste de remplacement

Les produits proposés doivent venir de la liste publiée/autorisée pour la semaine.

Pas de substitution libre par n’importe quel produit du catalogue.

Conceptuellement :

```text
weeklyReplacementOptions
```

---

# 28. Aucune exception

État normal :

```text
EXCEPTIONS

Aucune modification
pour cette semaine
```

Ce calme visuel est important.

Ne pas afficher des blocs vides ou badges inutiles.

---

# 29. Plusieurs exceptions sur la même semaine

Cas possible :

```text
Retrait exceptionnel
+
Transfert
+
Substitution
```

L’UI peut résumer :

```text
3 modifications cette semaine
```

puis détailler dessous.

Éviter cinq badges dans le header.

---

# 30. État de la commande générée

Une fois la commande AMAP créée, on peut afficher :

```text
Commande AMAP

À préparer
```

avec action :

```text
[ Voir la commande ]
```

Si elle est déjà préparée :

```text
Préparée
```

Puis :

```text
Livrée
```

---

# 31. Avant génération de la commande

Si la génération progressive n’a pas encore eu lieu :

```text
Commande pas encore générée

La prochaine commande sera créée
quelques jours avant la livraison.
```

Pas besoin d’exposer une cron ou un mécanisme technique.

---

# 32. Génération progressive

Le système ne doit pas générer toute l’année en avance.

Il peut créer les commandes quelques jours avant chaque échéance.

Cela permet d’intégrer :

- suspension ;
- substitutions ;
- transfert ;
- changement de retrait.

---

# 33. Historique

Exemple :

```text
HISTORIQUE

19 août
Livré
1 panier consommé

12 août
Suspendu
0 panier consommé

5 août
Livré
1 panier consommé
```

Chaque ligne est tappable.

---

# 34. Historique de consommation

Une livraison terminée peut afficher :

```text
19 août

Commande #AMAP-1042
Livrée

-1 panier

8 paniers restants après livraison
```

Cela rend le compteur explicable.

---

# 35. Historique d’une suspension

```text
12 août

Semaine suspendue

Aucun panier consommé
```

---

# 36. Historique d’un transfert

```text
5 août

Panier cédé à Paul Dupont

Livré

-1 panier sur l’abonnement
de Marie Dupont
```

---

# 37. Historique d’une correction admin

Si le compteur est corrigé :

```text
3 août

Correction manuelle

6 → 8 paniers restants

Motif :
2 paniers ajoutés après régularisation
```

Un motif est fortement recommandé pour les corrections de compteur.

---

# 38. Modifier le compteur

L’action ne devrait pas être un simple champ :

```text
Paniers restants
[ 8 ]
```

Préférer :

```text
[ Corriger le compteur ]
```

puis :

```text
Valeur actuelle
8

Nouvelle valeur
[ 10 ]

Motif
[ ... ]

[ Confirmer ]
```

Cela produit un événement traçable.

---

# 39. Ajouter des paniers

Pour les cas normaux :

```text
[ Ajouter des paniers ]
```

Exemple :

```text
Ajouter
[ 12 ]

Motif
Renouvellement saison automne
```

Résultat :

```text
8 → 20
```

Cela est plus explicite qu’une édition brute.

---

# 40. Abonnement bientôt épuisé

Exemple :

```text
⚠ Plus que 2 paniers

Prévoir le renouvellement.
```

Action éventuelle :

```text
[ Ajouter des paniers ]
```

V1 n’a pas besoin d’un workflow commercial complet de renouvellement.

---

# 41. Abonnement épuisé

```text
Aucun panier restant
```

Le système ne devrait probablement plus générer de nouvelle commande AMAP tant que le compteur n’est pas rechargé.

Alerte :

```text
⚠ Aucune nouvelle commande
ne sera générée.
```

---

# 42. Abonnement inactif

Wireframe :

```text
Marie Dupont

INACTIF

Panier complet
0 panier restant

Dernière livraison
15 juillet

[ Réactiver ]
```

La prochaine livraison disparaît.

L’historique reste disponible.

---

# 43. Désactivation

Action :

```text
Désactiver l’abonnement
```

Confirmation :

```text
Désactiver l’abonnement de Marie Dupont ?

Aucune nouvelle commande AMAP
ne sera générée.

L’historique sera conservé.

[ Annuler ]
[ Désactiver ]
```

---

# 44. Commande future déjà générée lors de la désactivation

Cas important.

S’il existe une commande future :

```text
⚠ Une commande est déjà prévue
pour le 26 août.
```

Ne pas la supprimer silencieusement.

L’admin doit choisir explicitement quoi en faire.

Par exemple :

```text
[ Conserver la commande ]
[ Annuler la commande ]
```

selon les règles métier.

---

# 45. Réactivation

```text
[ Réactiver l’abonnement ]
```

Puis :

```text
✓ Abonnement réactivé

Les prochaines commandes seront générées
selon la configuration actuelle.
```

---

# 46. Modification permanente vs semaine courante

C’est probablement la règle UX la plus importante de cet écran.

Deux actions distinctes :

```text
[ Modifier l’abonnement ]
```

et :

```text
[ Gérer cette semaine ]
```

Jamais un bouton générique :

```text
Modifier
```

qui ne dit pas quelle portée est concernée.

---

# 47. Tablette portrait

Disposition possible :

```text
┌──────────────────────────────────────────┐
│ Marie Dupont                            │
│ Abonnement actif                        │
├────────────────────┬─────────────────────┤
│ ABONNEMENT         │ PROCHAINE LIVRAISON│
│                    │                     │
│ Panier complet     │ 26 août             │
│ 8 restants         │ Marché SP           │
│ Mercredi           │ Deadline 25/08 18h  │
│                    │                     │
│ [ Modifier ]       │ [ Gérer ]           │
├────────────────────┴─────────────────────┤
│ PANIER DE LA SEMAINE                    │
├──────────────────────────────────────────┤
│ HISTORIQUE                              │
└──────────────────────────────────────────┘
```

---

# 48. Tablette paysage

Deux colonnes très naturelles :

```text
┌─────────────────────────────┬──────────────────────────┐
│ ABONNEMENT                  │ PROCHAINE LIVRAISON     │
│                             │                          │
│ Panier complet              │ Mercredi 26 août        │
│ 8 restants                  │ Marché Saint-Pierre     │
│ Mercredi                    │                          │
│ Deadline J-1 18h            │ Substitution : aucune   │
│                             │ Transfert : aucun       │
│ [ Modifier ]                │                          │
│                             │ [ Gérer cette semaine ] │
├─────────────────────────────┴──────────────────────────┤
│ HISTORIQUE                                             │
└────────────────────────────────────────────────────────┘
```

---

# 49. Desktop

Même modèle.

On peut rendre la colonne abonnement sticky et faire défiler historique / prochaines échéances.

Pas besoin de transformer l’écran en fiche CRM.

---

# 50. Projection de données

Exemple :

```ts
type AmapSubscriptionDetails = {
  subscription: {
    id: string
    version: number

    member: {
      customerId: string
      name: string
      email?: string
      phone?: string
    }

    active: boolean

    basketType:
      | "full"
      | "half"

    registrationDate: string

    remainingBaskets: number

    defaults: {
      weekday: number

      recovery: {
        id: string
        label: string
      }

      modificationDeadline: {
        dayOffset: number
        time: string
      }
    }
  }

  nextDelivery?: AmapNextDelivery

  recentHistory: AmapSubscriptionHistoryItem[]

  actions: {
    canEditSubscription: boolean
    canManageNextDelivery: boolean
    canAdjustBalance: boolean
    canDeactivate: boolean
    canReactivate: boolean
  }
}
```

---

# 51. Prochaine livraison

```ts
type AmapNextDelivery = {
  date: string

  modificationDeadline: string
  memberCanModify: boolean

  status:
    | "scheduled"
    | "suspended"
    | "generated"
    | "prepared"
    | "delivered"

  recovery: {
    id: string
    label: string
    isOverride: boolean
  }

  basketSnapshot?: {
    lines: {
      productId: string
      name: string
      quantity: number
      unit: string
    }[]
  }

  substitutions: {
    sourceProductName: string
    replacementProductName: string
  }[]

  transfer?: {
    beneficiaryName: string
  }

  generatedOrder?: {
    orderId: string
    status: string
  }
}
```

---

# 52. Historique

```ts
type AmapSubscriptionHistoryItem =
  | {
      type: "consumption"
      date: string
      orderId: string
      delta: -1
      balanceAfter: number
    }
  | {
      type: "suspension"
      date: string
    }
  | {
      type: "transfer"
      date: string
      beneficiaryName: string
      delivered: boolean
    }
  | {
      type: "balance_adjustment"
      date: string
      previousBalance: number
      newBalance: number
      reason?: string
    }
```

---

# 53. Query

Conceptuellement :

```text
GET /admin/amap/subscriptions/:id
```

La projection doit agréger :

- abonnement ;
- membre ;
- prochaine livraison ;
- commande AMAP éventuelle ;
- exceptions ;
- historique récent.

---

# 54. Action de gestion hebdomadaire

Conceptuellement, éviter un gros `PATCH subscription`.

Utiliser des intentions métier séparées :

```text
POST /admin/amap/subscriptions/:id/suspend-next
POST /admin/amap/subscriptions/:id/resume-next
POST /admin/amap/subscriptions/:id/transfer-next
POST /admin/amap/subscriptions/:id/change-next-recovery
POST /admin/amap/subscriptions/:id/substitute-next
```

Les noms exacts peuvent évoluer, mais le principe est utile.

---

# 55. Correction de compteur

Mutation dédiée :

```text
POST /admin/amap/subscriptions/:id/adjust-balance
```

avec :

```ts
{
  expectedVersion: number
  newBalance: number
  reason: string
}
```

ou une approche delta :

```ts
{
  delta: 12
  reason: "Renouvellement automne"
}
```

Préférer le delta pour les ajouts normaux et la valeur absolue pour les corrections administratives exceptionnelles.

---

# 56. Modification de la configuration

```text
PATCH /admin/amap/subscriptions/:id
```

avec :

- basketType ;
- weekday ;
- defaultRecovery ;
- modificationDeadline ;
- expectedVersion.

Le compteur ne devrait pas être modifié via ce patch générique.

---

# 57. Concurrence

Comme les autres objets importants :

```text
version
```

En cas de conflit :

```text
⚠ Cet abonnement a été modifié ailleurs.

[ Recharger ]
```

Ne pas écraser une suspension ou un transfert effectué depuis un autre appareil.

---

# 58. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Badge
Alert
Button
Sheet
ConfirmDialog
Timeline
EmptyState
Skeleton
ResponsivePane
```

---

# 59. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapBasketTypeBadge
AmapRemainingBaskets
AmapSubscriptionSummary
AmapNextDeliveryCard
AmapBasketSnapshot
AmapSubstitutionSummary
AmapTransferSummary
AmapSubscriptionTimeline
```

---

# 60. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-subscription-details-screen.tsx
├── components/
│   ├── amap-subscription-header.tsx
│   ├── amap-subscription-summary.tsx
│   ├── amap-next-delivery-section.tsx
│   ├── amap-weekly-basket-section.tsx
│   ├── amap-weekly-exceptions.tsx
│   ├── amap-subscription-history.tsx
│   └── amap-subscription-actions.tsx
└── index.ts
```

---

# 61. États principaux

Prévoir :

```text
loading
ready
updating
conflict
error
```

Les actions hebdomadaires peuvent avoir leur propre état local :

```text
suspending
transferring
changingRecovery
substituting
```

---

# 62. Accessibilité

Points importants :

- nombre de paniers restants annoncé textuellement ;
- distinction abonnement / semaine courante dans les intitulés d’action ;
- statut `Suspendue`, `Cédée`, `Livrée` textuel ;
- substitutions lisibles sans flèche seule ;
- timeline navigable au clavier ;
- confirmation claire pour toute correction de compteur.

---

# 63. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- le compteur de paniers est visible immédiatement ;
- le type de panier et les valeurs par défaut sont compréhensibles ;
- la prochaine livraison est identifiable sans scroll excessif ;
- la deadline adhérent est explicite ;
- l’admin comprend qu’il peut intervenir après la deadline ;
- suspension, transfert, changement de retrait et substitution sont clairement des exceptions hebdomadaires ;
- une suspension ne consomme jamais de panier ;
- un transfert consomme le panier du titulaire uniquement lors de la livraison ;
- l’historique permet d’expliquer chaque consommation et correction ;
- le compteur n’est pas modifié comme un simple entier sans trace ;
- modifier l’abonnement et gérer une semaine sont deux actions distinctes ;
- l’écran reste lisible sur téléphone et devient naturellement bi-colonne sur tablette.

---

# 64. Structure de référence

```text
HEADER + ÉTAT
      ↓
ABONNEMENT
      ↓
PANIERS RESTANTS
      ↓
PROCHAINE LIVRAISON
      ↓
PANIER DE LA SEMAINE
      ↓
EXCEPTIONS HEBDOMADAIRES
      ↓
COMMANDE GÉNÉRÉE
      ↓
HISTORIQUE / CONSOMMATIONS
      ↓
MODIFIER ABONNEMENT / GÉRER CETTE SEMAINE
```

Cette structure doit permettre de piloter un abonnement AMAP sans confondre les paramètres permanents avec les exceptions d’une seule semaine.
