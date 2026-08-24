# AdminCustomerDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/customer-details.md
```

Implémentation :

```text
packages/screens/admin/customers/
├── admin-customer-details-screen.tsx
├── components/
└── index.ts
```

Une implémentation responsive commune suffit.

---

## 2. Objectif

L’écran doit répondre à :

> **Qui est ce client, qu’a-t-il en cours, et quelle action puis-je faire maintenant ?**

Il doit permettre de :

- consulter les coordonnées ;
- modifier la fiche client ;
- créer une nouvelle commande ;
- voir les commandes en cours ;
- voir les dernières commandes ;
- consulter l’abonnement AMAP éventuel ;
- ouvrir l’abonnement AMAP ;
- voir quelques informations utiles sans exposer tout l’historique ;
- appeler ou envoyer un email rapidement.

---

# 3. Principe UX

L’ordre recommandé est :

```text
IDENTITÉ
   ↓
ACTIONS PRINCIPALES
   ↓
ACTIVITÉ EN COURS
   ↓
AMAP ÉVENTUEL
   ↓
COMMANDES RÉCENTES
   ↓
COORDONNÉES / NOTES
```

L’écran doit répondre aux actions courantes avant de devenir une fiche administrative exhaustive.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Marie Dupont             ⋯    │
├─────────────────────────────────┤
│                                 │
│ MARIE DUPONT                    │
│                                 │
│ 06 12 34 56 78                 │
│ marie@example.fr                │
│                                 │
│ [ Nouvelle commande ]           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ EN COURS                        │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Commande du 26 août       │ │
│ │                            │ │
│ │ À préparer                 │ │
│ │                            │ │
│ │ Marché Saint-Pierre        │ │
│ │                            │ │
│ │ 32,40 €                    │ │
│ │                         >  │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ AMAP                            │
│                                 │
│ Panier complet                  │
│ 8 paniers restants              │
│                                 │
│ Prochain                        │
│ Mercredi 26 août                │
│                                 │
│ Marché Saint-Pierre             │
│                                 │
│ [ Voir l’abonnement ]           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMANDES RÉCENTES              │
│                                 │
│ 19 août                         │
│ Livrée · 28,10 €             >  │
│                                 │
│ 12 août                         │
│ Livrée · 31,50 €             >  │
│                                 │
│ 5 août                          │
│ Annulée                      >  │
│                                 │
│ [ Voir toutes les commandes ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ INFORMATIONS                    │
│                                 │
│ Téléphone                       │
│ 06 12 34 56 78                 │
│                                 │
│ Email                           │
│ marie@example.fr                │
│                                 │
│ Note                            │
│ Préfère être appelée            │
│ après 18h.                      │
│                                 │
│ [ Modifier le client ]          │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Header

Le header affiche :

```text
Marie Dupont
```

Menu :

```text
⋯
```

Actions possibles :

```text
Modifier le client
Nouvelle commande
```

Éviter d’y mettre trop d’actions destructives.

---

# 6. Action principale

Pour un client classique, l’action la plus utile est souvent :

```text
[ Nouvelle commande ]
```

Elle doit être très visible.

Flux :

```text
AdminCustomerDetailsScreen
        ↓
AdminOrderCreateScreen
```

avec :

```text
customerId
```

déjà présélectionné.

---

# 7. Pourquoi cette action est importante

Une grande partie des commandes admin peut venir de :

- téléphone ;
- SMS ;
- marché ;
- demande orale ;
- client habituel.

La fiche client doit donc permettre de recréer une commande en quelques secondes.

---

# 8. Coordonnées

Bloc compact en haut :

```text
06 12 34 56 78
marie@example.fr
```

Sur mobile :

- téléphone tappable ;
- email tappable.

Mais pas de boutons géants `Appeler` / `Email` si cela surcharge.

---

# 9. Client avec téléphone uniquement

```text
PAUL MARTIN

06 98 76 54 32
```

C’est valide.

L’email ne doit pas être obligatoire pour un client classique.

---

# 10. Client avec email uniquement

Également valide si le métier le permet :

```text
lucie@example.fr
```

Il faut cependant au moins un moyen de contact utile pour une commande.

---

# 11. Identité vs compte utilisateur

L’écran affiche une **fiche Customer**.

Il ne faut pas supposer que :

```text
Customer = compte connecté
```

Pour un client classique :

```text
Customer
✓
UserAccount
non requis
```

---

# 12. Compte AMAP

Si le client est membre AMAP, un compte peut exister.

On peut afficher discrètement :

```text
Compte AMAP actif
```

mais ce n’est pas la donnée principale.

L’abonnement est plus utile que l’état technique du compte.

---

# 13. Section “En cours”

S’il existe une ou plusieurs commandes non terminales :

```text
EN COURS
```

doit apparaître haut dans l’écran.

Exemple :

```text
Commande du 26 août
À préparer
Marché Saint-Pierre
32,40 €
```

---

# 14. Plusieurs commandes en cours

Exemple :

```text
2 commandes en cours
```

puis les deux cartes.

Ordre :

```text
date de retrait croissante
```

---

# 15. Statuts à considérer comme actifs

Typiquement :

```text
À valider
À préparer
Préparée
```

Une commande :

```text
Livrée
Annulée
```

n’appartient plus à cette section.

---

# 16. Commande À valider

Carte :

```text
Commande du 27 août

À valider

Retrait ferme

[ Voir la commande ]
```

Le statut doit être très visible.

---

# 17. Commande modifiée par le client

Si applicable :

```text
⚠ Modifiée par le client
À valider
```

Cette anomalie doit rester visible ici car elle demande une action.

---

# 18. Commande préparée

```text
Commande du 26 août

Préparée

Marché Saint-Pierre
```

Action :

```text
[ Voir ]
```

Pas besoin d’ajouter directement `Marquer comme livrée` dans la fiche client.

Cela appartient à la commande / distribution.

---

# 19. Aucune commande en cours

Ne pas afficher une grande section vide.

On peut simplement passer directement à :

```text
AMAP
```

ou :

```text
COMMANDES RÉCENTES
```

---

# 20. Section AMAP

Si abonnement actif :

```text
AMAP

Panier complet
8 paniers restants

Prochain
Mercredi 26 août

Marché Saint-Pierre
```

Action :

```text
[ Voir l’abonnement ]
```

---

# 21. Ne pas dupliquer tout le détail AMAP

La fiche client ne doit pas reproduire :

- historique des consommations ;
- substitutions ;
- transferts ;
- deadline détaillée ;
- composition de la semaine.

Tout cela appartient à :

```text
AdminAmapSubscriptionDetailsScreen
```

---

# 22. Abonnement bientôt épuisé

Afficher :

```text
⚠ 2 paniers restants
```

C’est une information durable et suffisamment importante.

---

# 23. Abonnement épuisé

```text
AMAP

Panier complet

⚠ Aucun panier restant

Aucune nouvelle commande AMAP
ne sera générée.
```

Action :

```text
[ Voir l’abonnement ]
```

---

# 24. Abonnement inactif

```text
AMAP

Abonnement inactif

Dernière livraison
15 juillet
```

Action :

```text
[ Voir l’abonnement ]
```

Pas besoin de bouton `Réactiver` directement dans la fiche client.

---

# 25. Aucun abonnement AMAP

On peut afficher une action secondaire :

```text
[ Ajouter un abonnement AMAP ]
```

si cette création admin fait partie du workflow V1.

Mais elle ne doit pas concurrencer `Nouvelle commande`.

---

# 26. Condition d’affichage de l’ajout AMAP

Afficher uniquement si :

- aucun abonnement actif ;
- client compatible ;
- admin a le droit de créer un abonnement.

Flux :

```text
AdminCustomerDetailsScreen
        ↓
AdminAmapSubscriptionEditScreen
```

avec :

```text
customerId
```

prérempli.

---

# 27. Commandes récentes

Afficher environ :

```text
3 à 5
```

commandes récentes.

Exemple :

```text
19 août
Livrée · 28,10 €

12 août
Livrée · 31,50 €

5 août
Annulée
```

---

# 28. Ordre des commandes

Toujours :

```text
plus récente
↓
plus ancienne
```

---

# 29. Tap commande

Flux :

```text
AdminCustomerDetailsScreen
        ↓
AdminOrderDetailsScreen
```

---

# 30. Voir toutes les commandes

Action :

```text
[ Voir toutes les commandes ]
```

ouvre :

```text
AdminOrderListScreen
```

avec :

```text
customerId
```

comme filtre.

C’est préférable à créer un second écran d’historique spécifique au client.

---

# 31. Montant historique

Afficher le montant final si disponible :

```text
28,10 €
```

Pour une commande annulée :

```text
Annulée
```

le montant peut être omis ou laissé secondaire.

---

# 32. Commande AMAP dans l’historique

Exemple :

```text
19 août

AMAP
Livrée
```

Pas besoin de montant si le panier AMAP n’utilise pas la logique commerciale classique.

---

# 33. Différencier source et type sans surcharge

Une commande récente peut avoir un petit label :

```text
AMAP
```

ou :

```text
Admin
```

mais seulement si cela aide réellement.

Ne pas remplir chaque ligne de badges.

---

# 34. Informations client

Section basse :

```text
INFORMATIONS
```

Contient :

- téléphone ;
- email ;
- adresse éventuelle ;
- note interne.

---

# 35. Adresse

Une adresse n’est nécessaire que si utile :

- livraison ;
- tournée ;
- facturation future.

Elle peut être facultative.

Exemple :

```text
12 rue des Prés
76100 Montville
```

---

# 36. Adresse et historique

Comme pour le contact, une modification d’adresse ne doit pas réécrire les anciennes commandes.

Les commandes conservent leurs snapshots de livraison.

---

# 37. Note interne

Exemple :

```text
Note

Préfère être appelée après 18h.
```

La note est :

```text
visible admin uniquement
```

Il faut le dire dans l’écran d’édition.

---

# 38. Attention aux données sensibles

La note interne doit rester courte et opérationnelle.

Éviter de transformer le champ libre en dossier personnel.

Le produit doit encourager des notes comme :

```text
Sonne à la porte latérale.
```

pas des informations inutiles ou sensibles.

---

# 39. Modifier le client

Action :

```text
[ Modifier le client ]
```

ouvre :

```text
AdminCustomerEditScreen
```

---

# 40. Ce qui est modifiable

Typiquement :

- prénom ;
- nom ;
- téléphone ;
- email ;
- adresse ;
- note interne.

Pas :

- historique de commande ;
- snapshot de commande ;
- compteur AMAP.

---

# 41. Modification du nom

Si :

```text
Marie Dupont
→ Marie Durand
```

la fiche client change.

Les anciennes commandes peuvent conserver :

```text
Marie Dupont
```

dans leur snapshot historique.

C’est attendu.

---

# 42. Modification email / téléphone

Même règle.

La fiche actuelle affiche la nouvelle valeur.

Les commandes passées conservent le contact utilisé à l’époque si le snapshot est stocké.

---

# 43. Indiquer éventuellement les données manquantes

Exemple :

```text
Téléphone
Non renseigné
```

avec action d’édition.

Mais éviter trop d’alertes si ce n’est pas bloquant.

---

# 44. Doublon suspect

Si après une modification, le système détecte :

```text
même téléphone qu’un autre client
```

il doit bloquer ou avertir dans l’écran d’édition.

La fiche détail peut éventuellement afficher :

```text
⚠ Doublon potentiel
```

mais cela peut attendre une V2 si rare.

---

# 45. Suppression

Pas d’action :

```text
Supprimer le client
```

dans le menu normal.

L’historique doit être préservé.

---

# 46. Anonymisation

Si un besoin RGPD arrive, ce doit être un workflow spécifique :

```text
Anonymiser le client
```

avec règles précises.

Ce n’est pas une suppression métier standard.

---

# 47. Identifiant client

Ne pas afficher un identifiant technique :

```text
cust_84ca...
```

Sauf éventuellement une référence lisible si l’exploitation en a besoin.

V1 probablement inutile.

---

# 48. Dernière activité

On peut afficher dans le header secondaire :

```text
Dernière commande : 22 août
```

mais ce n’est pas nécessaire si les sections commandes sont déjà visibles.

---

# 49. Actions de contact

Téléphone :

```text
06 12 34 56 78
```

→ action système d’appel sur mobile.

Email :

```text
marie@example.fr
```

→ client mail.

Ces actions ne doivent pas modifier l’application.

---

# 50. Future action SMS

Possible plus tard :

```text
Envoyer un SMS
```

mais pas besoin d’un système de messagerie intégré V1.

---

# 51. Tablette portrait

Disposition possible :

```text
┌──────────────────────────────────────────┐
│ Marie Dupont                            │
│ 06 12... · marie@...                   │
│ [ Nouvelle commande ]                   │
├────────────────────┬─────────────────────┤
│ EN COURS           │ AMAP                │
│                    │                     │
│ Cmd 26 août        │ Panier complet      │
│ À préparer         │ 8 restants          │
│                    │ 26 août             │
│ [ Voir ]           │ [ Voir abonnement ] │
├────────────────────┴─────────────────────┤
│ COMMANDES RÉCENTES                       │
├──────────────────────────────────────────┤
│ INFORMATIONS                             │
└──────────────────────────────────────────┘
```

---

# 52. Tablette paysage

Deux colonnes sont naturelles :

```text
┌─────────────────────────────┬──────────────────────────┐
│ CLIENT                      │ ACTIVITÉ                │
│                             │                          │
│ Marie Dupont                │ Commande 26 août        │
│ 06 12...                    │ À préparer              │
│ marie@...                   │                          │
│                             │ Commandes récentes      │
│ AMAP                        │                          │
│ Panier complet              │ 19 août · Livrée        │
│ 8 restants                  │ 12 août · Livrée        │
│                             │                          │
│ [ Nouvelle commande ]       │                          │
└─────────────────────────────┴──────────────────────────┘
```

---

# 53. Desktop

Même modèle.

La colonne identité / AMAP peut rester sticky si l’historique est long.

Pas besoin d’une page pleine largeur.

---

# 54. Projection de données

Exemple :

```ts
type AdminCustomerDetails = {
  customer: {
    id: string
    version: number

    firstName?: string
    lastName?: string
    displayName: string

    phone?: string
    email?: string

    address?: {
      line1: string
      line2?: string
      postalCode: string
      city: string
    }

    internalNote?: string
  }

  activeOrders: CustomerOrderSummary[]

  recentOrders: CustomerOrderSummary[]

  amap?: {
    subscriptionId: string
    active: boolean

    basketType:
      | "full"
      | "half"

    remainingBaskets: number

    nextDelivery?: {
      date: string
      recoveryLabel: string
    }

    lastDeliveryDate?: string
  }

  account?: {
    exists: boolean
    type?: "amap"
  }

  actions: {
    canEdit: boolean
    canCreateOrder: boolean
    canCreateAmapSubscription: boolean
  }
}
```

---

# 55. Résumé commande

```ts
type CustomerOrderSummary = {
  orderId: string

  date: string

  status:
    | "to_validate"
    | "to_prepare"
    | "prepared"
    | "delivered"
    | "cancelled"

  source:
    | "web"
    | "admin"
    | "amap"

  recoveryLabel: string

  amount?: number

  modifiedByCustomer?: boolean
}
```

---

# 56. Query

Conceptuellement :

```text
GET /admin/customers/:id
```

La projection peut agréger :

- Customer ;
- commandes actives ;
- quelques commandes récentes ;
- abonnement AMAP actif ou dernier abonnement ;
- capacités.

---

# 57. Pourquoi agréger côté API

L’écran a besoin d’un petit dashboard client.

Il est préférable de recevoir une projection cohérente plutôt que déclencher séparément :

```text
customer
orders
amap
account
```

avec plusieurs états de chargement indépendants.

---

# 58. Voir toutes les commandes

La projection principale ne charge que :

```text
5 dernières commandes
```

par exemple.

Pour l’historique complet :

```text
AdminOrderListScreen?customerId=...
```

---

# 59. Mise à jour après création de commande

Après :

```text
Nouvelle commande
```

puis retour fiche client :

- la nouvelle commande apparaît dans `En cours` ;
- la query détail est invalidée.

Pas besoin de temps réel complexe.

---

# 60. Mise à jour après modification abonnement

Même logique.

Retour depuis :

```text
AdminAmapSubscriptionDetailsScreen
```

→ rafraîchir la synthèse AMAP.

---

# 61. Concurrence sur la fiche client

Pour les modifications de coordonnées :

```text
version
```

ou `profileVersion`.

En cas de conflit lors de l’édition :

```text
⚠ Cette fiche a été modifiée ailleurs.

[ Recharger ]
```

La fiche détail elle-même peut simplement rafraîchir.

---

# 62. Chargement

Skeleton par section :

```text
██████████████
██████████

██████████████████

████████
████████████
```

Éviter un écran totalement bloqué si la navigation précédente possède déjà le nom.

---

# 63. Erreur

```text
Impossible de charger ce client.

[ Réessayer ]
```

Si le client n’existe plus / référence invalide :

```text
Client introuvable.

[ Retour aux clients ]
```

---

# 64. Erreur partielle AMAP

Si le client charge mais la synthèse AMAP échoue :

```text
AMAP

Impossible de charger l’abonnement.

[ Réessayer ]
```

Ne pas masquer le reste de la fiche.

---

# 65. Client sans historique

```text
Aucune commande pour le moment.

[ Créer une commande ]
```

Très utile après création manuelle.

---

# 66. Client nouvel adhérent AMAP sans commande

```text
AMAP

Panier complet
20 paniers restants

Aucune commande encore générée.
```

C’est un état normal.

---

# 67. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Badge
Button
Alert
EmptyState
Skeleton
ResponsivePane
```

---

# 68. Composants métier

Dans :

```text
packages/domains/customers/ui/
```

bons candidats :

```text
CustomerIdentity
CustomerContactSummary
CustomerOrderCard
CustomerOrderHistory
CustomerInternalNote
```

Et réutilisation depuis AMAP :

```text
AmapRemainingBaskets
AmapBasketTypeBadge
```

---

# 69. Composants spécifiques au screen

```text
packages/screens/admin/customers/
├── admin-customer-details-screen.tsx
├── components/
│   ├── customer-details-header.tsx
│   ├── customer-primary-actions.tsx
│   ├── customer-active-orders.tsx
│   ├── customer-amap-summary.tsx
│   ├── customer-recent-orders.tsx
│   ├── customer-information-section.tsx
│   └── customer-details-empty-state.tsx
└── index.ts
```

---

# 70. États principaux

Prévoir :

```text
loading
ready
notFound
error
```

Les sections peuvent avoir quelques erreurs partielles indépendantes.

---

# 71. Accessibilité

Points importants :

- nom comme titre principal ;
- téléphone et email avec labels explicites ;
- statut de commande en texte ;
- progression AMAP textuelle ;
- cartes commandes accessibles au clavier ;
- boutons `Nouvelle commande` et `Modifier le client` clairement nommés ;
- notes internes annoncées comme telles ;
- ne pas utiliser uniquement des icônes pour téléphone/email.

---

# 72. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’identité du client est visible immédiatement ;
- créer une nouvelle commande demande un seul tap depuis la fiche ;
- les commandes actives apparaissent avant l’historique ;
- l’abonnement AMAP est synthétisé sans dupliquer son écran de détail ;
- le solde AMAP faible ressort clairement ;
- les dernières commandes sont visibles sans charger tout l’historique ;
- téléphone et email sont rapidement accessibles ;
- modifier les coordonnées ne modifie jamais les anciennes commandes ;
- un client classique sans compte est représenté normalement ;
- la fiche reste courte et opérationnelle sur téléphone ;
- tablette et desktop utilisent l’espace pour séparer identité et activité, sans devenir un CRM.

---

# 73. Structure de référence

```text
IDENTITÉ + CONTACT
       ↓
NOUVELLE COMMANDE
       ↓
COMMANDES EN COURS
       ↓
AMAP ÉVENTUEL
       ↓
COMMANDES RÉCENTES
       ↓
INFORMATIONS CLIENT
       ↓
MODIFIER LE CLIENT
```

Cette structure doit permettre de gérer une fiche client légère et opérationnelle, centrée sur les commandes et l’éventuel abonnement AMAP sans transformer l’application en CRM.
