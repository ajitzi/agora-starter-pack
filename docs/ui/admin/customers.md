# AdminCustomerListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/customers.md
```

Implémentation :

```text
packages/screens/admin/customers/
├── admin-customer-list-screen.tsx
├── components/
└── index.ts
```

Une seule implémentation responsive est suffisante en V1.

---

## 2. Objectif

L’écran doit répondre à :

> **Qui est ce client et comment le retrouver rapidement ?**

Il doit permettre de :

- rechercher un client ;
- voir ses coordonnées principales ;
- voir s’il est adhérent AMAP ;
- voir s’il possède un abonnement actif ;
- voir sa dernière commande ;
- ouvrir sa fiche ;
- créer un client manuellement ;
- accéder rapidement à une nouvelle commande admin pour ce client.

Ce n’est pas un CRM commercial complet.

---

# 3. Principe UX

La hiérarchie principale doit rester :

```text
IDENTITÉ
   ↓
CONTACT
   ↓
RELATION AMAP ÉVENTUELLE
   ↓
ACTIVITÉ RÉCENTE
```

Éviter de surcharger la liste avec :

- chiffre d’affaires ;
- segmentation marketing ;
- fréquence d’achat ;
- scoring ;
- campagnes.

Ces fonctionnalités ne sont pas nécessaires au cœur V1.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Clients                  ＋   │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Rechercher              │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Tous ] [ AMAP ] [ Classiques ]│
│                                 │
├─────────────────────────────────┤
│                                 │
│ MARIE DUPONT                    │
│                                 │
│ 06 12 34 56 78                 │
│ marie@example.fr                │
│                                 │
│ AMAP · Panier complet           │
│ 8 paniers restants              │
│                                 │
│ Dernière commande               │
│ 19 août                         │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PAUL MARTIN                     │
│                                 │
│ 06 98 76 54 32                 │
│                                 │
│ Client classique                │
│                                 │
│ Dernière commande               │
│ 22 août                         │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LUCIE BERNARD                   │
│                                 │
│ lucie@example.fr                │
│                                 │
│ AMAP · Inactif                  │
│                                 │
│ Dernière commande               │
│ 3 juillet                       │
│                              >  │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Recherche

La recherche est l’élément principal de l’écran.

```text
[ 🔍 Rechercher un client ]
```

Recherche sur :

- nom ;
- prénom ;
- email ;
- téléphone.

Elle doit fonctionner avec des fragments.

Exemples :

```text
dup
```

→ Marie Dupont

```text
0612
```

→ Marie Dupont

```text
marie@
```

→ Marie Dupont

---

# 6. Tolérance sur le téléphone

La recherche téléphone doit idéalement ignorer :

- espaces ;
- points ;
- tirets ;
- préfixe `+33` vs `0`.

Exemple :

```text
06 12 34 56 78
```

et :

```text
0612345678
```

doivent retrouver la même personne.

---

# 7. Filtres

En V1, peu de filtres :

```text
[ Tous ]
[ AMAP ]
[ Classiques ]
```

Éventuellement :

```text
[ Inactifs ]
```

dans un `FilterSheet`.

---

# 8. Ce que signifie “Classiques”

Un client classique n’est pas forcément une catégorie métier persistée.

Il peut simplement signifier :

```text
client sans abonnement AMAP actif
```

Donc éviter si possible un champ :

```ts
customer.type = "classic"
```

si cette distinction peut être dérivée.

---

# 9. Carte client

Exemple :

```text
MARIE DUPONT

06 12 34 56 78
marie@example.fr

AMAP · Panier complet
8 paniers restants

Dernière commande
19 août
```

Toute la carte est tappable.

---

# 10. Informations prioritaires

Ordre recommandé :

```text
NOM
 ↓
TÉLÉPHONE / EMAIL
 ↓
AMAP ÉVENTUEL
 ↓
DERNIÈRE ACTIVITÉ
```

---

# 11. Ne pas afficher trop de coordonnées

Si téléphone et email existent, les deux peuvent être affichés.

Mais sur mobile, si l’espace manque :

```text
06 12 34 56 78
marie@example.fr
```

reste acceptable.

Éviter d’ajouter aussi :

- adresse complète ;
- notes ;
- historique ;
- point de retrait.

Cela appartient au détail.

---

# 12. Client AMAP

Exemple :

```text
AMAP · Panier complet
8 paniers restants
```

ou :

```text
AMAP · Demi-panier
3 paniers restants
```

Si presque épuisé :

```text
AMAP · Panier complet
⚠ 2 paniers restants
```

---

# 13. Abonnement AMAP inactif

Exemple :

```text
AMAP · Inactif
```

Pas besoin d’afficher ancien type + ancien solde dans la liste sauf utilité claire.

---

# 14. Client sans AMAP

Exemple :

```text
Client classique
```

On peut même ne rien afficher si le contexte est évident.

Une formulation plus légère :

```text
Pas d’abonnement AMAP
```

peut être plus neutre.

---

# 15. Dernière commande

Exemple :

```text
Dernière commande
22 août
```

Optionnellement :

```text
22 août · Livrée
```

Mais le statut de la dernière commande n’est pas forcément prioritaire.

---

# 16. Client sans commande

Exemple :

```text
Aucune commande
```

Possible pour :

- client créé manuellement ;
- futur adhérent AMAP ;
- import initial.

---

# 17. Client avec commande en cours

Une information opérationnelle peut remplacer la dernière commande :

```text
Commande en cours
À préparer · 26 août
```

Cela est plus utile que :

```text
Dernière commande
12 août
```

---

# 18. Priorité activité courante

Règle :

```text
commande active
>
dernière commande historique
```

Exemple :

```text
À valider
Commande du 26 août
```

peut ressortir dans la carte.

---

# 19. Ne pas transformer la carte en commande

Même avec une commande active, garder l’identité dominante.

Pas :

```text
À VALIDER
Marie Dupont
...
```

mais :

```text
MARIE DUPONT

Commande à valider · 26 août
```

L’écran reste une liste clients.

---

# 20. Création d’un client

Bouton :

```text
＋
```

ouvre :

```text
AdminCustomerEditScreen
```

en création.

Cela est utile pour :

- commande téléphonique ;
- commande au marché ;
- nouvel adhérent AMAP ;
- reprise de données.

---

# 21. Création rapide depuis une commande

Si un client est créé depuis :

```text
Nouvelle commande
```

le flow peut revenir automatiquement vers la création de commande.

Il ne faut pas forcer un détour manuel par la liste Clients.

---

# 22. Doublons

Cas important.

Lors de la création :

```text
Marie Dupont
06 12 34 56 78
```

si le téléphone existe déjà :

```text
⚠ Un client utilise déjà ce numéro.

Marie Dupont
[ Voir ]
```

Le système doit prévenir avant de créer un doublon.

---

# 23. Email déjà utilisé

Même logique :

```text
⚠ Cette adresse email est déjà associée
à un client.
```

---

# 24. Les noms ne doivent pas être uniques

Deux personnes peuvent s’appeler :

```text
Marie Dupont
```

Donc ne jamais dédupliquer uniquement sur le nom.

---

# 25. Tri par défaut

Recommandation :

```text
ordre alphabétique
```

C’est le plus naturel pour une base clients.

Alternative possible :

```text
activité récente
```

mais la recherche rend déjà la navigation efficace.

---

# 26. Recherche vide

Avant saisie :

```text
Tous les clients
```

affichés alphabétiquement.

Pas besoin d’un écran vide demandant obligatoirement une recherche.

---

# 27. Résultat vide

```text
Aucun client trouvé pour “Martinot”.

[ Ajouter un client ]
```

Très utile pour enchaîner création puis commande.

---

# 28. Plusieurs résultats proches

Exemple :

```text
Marie Dupont
06 12 ...

Marie Dupont
07 84 ...
```

Les coordonnées doivent être assez visibles pour les différencier.

---

# 29. Actions rapides

Rester prudent avec les actions dans la liste.

Éventuellement menu `⋯` :

```text
Nouvelle commande
Appeler
Envoyer un email
```

Mais sur mobile, cela peut vite surcharger.

Recommandation V1 :

> tap carte → détail client → actions.

---

# 30. Exception : nouvelle commande

Une action rapide très utile pourrait être :

```text
＋ Commande
```

sur tablette/desktop.

Sur mobile, la garder dans le détail.

---

# 31. Client AMAP avec anomalie

Exemple :

```text
MARIE DUPONT

AMAP
⚠ Aucun panier restant
```

Cette alerte peut remplacer le compteur normal.

---

# 32. Ne pas afficher toutes les alertes métier

La liste Clients n’est pas la vue de pilotage AMAP.

Donc éviter :

```text
deadline demain
composition manquante
transfert
substitution
```

Ici, seulement les anomalies durables liées au client/abonnement.

---

# 33. Client inactif

Faut-il un statut client actif/inactif ?

Ne pas l’introduire automatiquement en V1.

Un client peut simplement :

- ne plus commander ;
- avoir un abonnement AMAP inactif.

Pas besoin d’un `customer.active` sauf réel besoin métier.

---

# 34. Suppression d’un client

À éviter.

Un client peut être lié à :

- commandes ;
- historique ;
- abonnement AMAP ;
- événements de transfert.

Donc :

> pas de suppression normale si historique existant.

Éventuellement anonymisation future pour conformité, mais ce n’est pas un workflow UI quotidien.

---

# 35. Fusion de doublons

Très utile à terme, mais probablement hors V1.

Ne pas ajouter maintenant un système complexe :

```text
Fusionner les clients
```

sauf besoin réel.

Mieux vaut prévenir les doublons à la création.

---

# 36. Tablette portrait

Deux colonnes de cartes possibles :

```text
┌──────────────────────┬──────────────────────┐
│ Marie Dupont         │ Paul Martin          │
│ 06 12...             │ 06 98...             │
│ AMAP · complet       │ Classique            │
│ 8 restants           │ Cmd 22 août          │
├──────────────────────┼──────────────────────┤
│ Lucie Bernard        │ ...                  │
└──────────────────────┴──────────────────────┘
```

---

# 37. Tablette paysage

Une liste dense fonctionne mieux :

```text
┌───────────────────────────────────────────────────────────────┐
│ Client          Contact          AMAP          Activité       │
├───────────────────────────────────────────────────────────────┤
│ Marie Dupont    06 12...         Complet · 8   Cmd 19 août   │
│ Paul Martin     06 98...         —             Cmd 22 août   │
│ Lucie Bernard   lucie@...        Inactif       Cmd 3 juillet │
└───────────────────────────────────────────────────────────────┘
```

---

# 38. Desktop

Même structure.

Colonnes possibles :

```text
Nom
Téléphone
Email
AMAP
Dernière activité
```

et une action :

```text
⋯
```

Pas besoin de 12 colonnes.

---

# 39. Master/detail sur tablette paysage

Optionnellement :

```text
liste clients
│
├───────────────┬─────────────────────────
│ Marie Dupont  │ Détail rapide
│ Paul Martin   │
│ Lucie ...     │ AMAP
│               │ Commandes récentes
│               │ Actions
```

Mais pas obligatoire V1.

Une navigation vers le détail reste suffisante.

---

# 40. Tap sur la carte

Flux :

```text
AdminCustomerListScreen
        ↓
AdminCustomerDetailsScreen
```

Le détail pourra regrouper :

- identité ;
- coordonnées ;
- notes éventuelles ;
- commandes ;
- abonnement AMAP ;
- actions rapides.

---

# 41. Projection de données

Exemple :

```ts
type AdminCustomerListItem = {
  customerId: string

  displayName: string

  phone?: string
  email?: string

  amap?: {
    subscriptionId: string
    active: boolean

    basketType:
      | "full"
      | "half"

    remainingBaskets: number
  }

  currentOrder?: {
    orderId: string

    status:
      | "to_validate"
      | "to_prepare"
      | "prepared"

    recoveryDate: string
  }

  lastOrder?: {
    orderId: string
    date: string
    status: string
  }
}
```

---

# 42. Pourquoi `currentOrder` séparé de `lastOrder`

Parce que l’UI peut afficher prioritairement :

```text
Commande à préparer · 26 août
```

au lieu de :

```text
Dernière commande · 19 août
```

sans recalculer cela côté écran.

---

# 43. Client avec plusieurs commandes actives

Possible.

Dans ce cas :

```text
2 commandes en cours
```

plutôt que choisir arbitrairement une seule.

Projection alternative :

```ts
activeOrdersCount: number
nextActiveOrder?: {...}
```

---

# 44. Query

Conceptuellement :

```text
GET /admin/customers
```

avec :

```text
search=
amap=all|active|none
```

et pagination si nécessaire.

---

# 45. Pagination

Si quelques centaines de clients :

```text
pagination classique
```

ou infinite scroll convient.

Préférer toutefois une pagination transparente côté query avec scroll normal.

La recherche reste serveur si la base peut devenir importante.

---

# 46. Debounce recherche

Environ :

```text
200–300 ms
```

est raisonnable.

Mais surtout :

- ne pas bloquer la saisie ;
- garder les anciens résultats pendant le refresh ;
- afficher un petit état de recherche.

---

# 47. URL / état navigation

Sur web, utile de conserver :

```text
?search=dupont&amap=active
```

pour que retour depuis le détail conserve le contexte.

Sur mobile natif plus tard, même logique via state/router params.

---

# 48. Résultat après retour

Flux :

```text
liste filtrée
↓
fiche client
↓
retour
```

doit restaurer :

- recherche ;
- filtres ;
- position approximative de scroll si possible.

---

# 49. Chargement initial

Skeleton :

```text
┌─────────────────────────────┐
│ █████████████               │
│ █████████                   │
│ ██████████████              │
└─────────────────────────────┘
```

Plusieurs cartes.

---

# 50. Recherche en cours

Éviter de remplacer toute la liste par un spinner.

Conserver les résultats puis :

```text
Recherche…
```

discret dans la zone de recherche.

---

# 51. Erreur

```text
Impossible de charger les clients.

[ Réessayer ]
```

Si seulement la recherche échoue :

```text
Impossible d’effectuer la recherche.

[ Réessayer ]
```

---

# 52. État vide global

```text
Aucun client enregistré.

Les clients apparaîtront ici après
une commande ou une création manuelle.

[ Ajouter un client ]
```

---

# 53. Création automatique à partir d’une commande

Une commande classique sans compte obligatoire doit quand même être reliée à une identité de contact.

Il faut définir si le système :

```text
crée automatiquement un Customer
```

ou conserve une identité uniquement snapshotée.

Il est recommandé de distinguer les deux concepts.

---

# 54. Point d’architecture important

Une commande historique doit conserver son snapshot :

```text
customerNameSnapshot
emailSnapshot
phoneSnapshot
```

même si la fiche client change.

La relation :

```text
customerId
```

est pratique, mais elle ne doit pas réécrire l’histoire.

---

# 55. Client invité sans compte

Un `Customer` n’est pas nécessairement un utilisateur authentifié.

Conceptuellement :

```text
Customer
≠
UserAccount
```

Un client classique peut avoir :

```text
customer
```

sans :

```text
login
```

Très important pour le modèle.

---

# 56. Membre AMAP

Un membre AMAP possède :

```text
Customer
+
UserAccount
+
AmapSubscription
```

alors qu’un client classique peut avoir seulement :

```text
Customer
```

---

# 57. Schéma conceptuel

```text
Customer
   │
   ├── 0..n Orders
   │
   ├── 0..1 UserAccount
   │
   └── 0..n AmapSubscriptions
```

Avec règle V1 :

```text
maximum 1 abonnement AMAP actif
```

---

# 58. Ne pas fusionner `Customer` et `Account`

Sinon un client classique sans compte devient difficile à représenter.

Le modèle doit permettre :

```text
commande sans inscription
```

tout en conservant un client réutilisable côté admin.

---

# 59. Création d’une commande pour un client existant

Depuis le détail client :

```text
[ Nouvelle commande ]
```

ouvre :

```text
AdminOrderCreateScreen
```

avec le client déjà sélectionné.

C’est un flow important pour les commandes téléphone / marché.

---

# 60. Appeler / email

Sur téléphone :

```text
06 12 34 56 78
```

peut être tappable.

De même :

```text
marie@example.fr
```

Mais ces interactions sont secondaires.

---

# 61. Protection des données

Ne pas exposer inutilement les coordonnées dans des écrans opérationnels non concernés.

Ici c’est justifié, car l’écran est précisément un registre clients.

Mais les composants génériques ne doivent pas répandre ces données partout.

---

# 62. Notes client

Ne pas afficher les notes dans la liste.

Même si le client possède :

```text
Préfère être appelé après 18h
```

cela appartient au détail.

Exception éventuelle :

```text
⚠ Information importante
```

mais même cela peut devenir bruyant.

---

# 63. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
SearchInput
Tabs
FilterSheet
Card
Badge
EmptyState
Skeleton
ResponsiveGrid
```

---

# 64. Composants métier

Dans :

```text
packages/domains/customers/ui/
```

bons candidats :

```text
CustomerCard
CustomerContactSummary
CustomerAmapSummary
CustomerActivitySummary
CustomerSearchResult
```

---

# 65. Composants spécifiques au screen

```text
packages/screens/admin/customers/
├── admin-customer-list-screen.tsx
├── components/
│   ├── customer-search.tsx
│   ├── customer-filters.tsx
│   ├── customer-list.tsx
│   └── customer-list-empty-state.tsx
└── index.ts
```

---

# 66. États principaux

Prévoir :

```text
loading
ready
empty
searching
searchEmpty
error
```

Le `searching` n’a pas besoin de remplacer `ready`.

---

# 67. Accessibilité

Points importants :

- nom annoncé avant les autres informations ;
- téléphone et email correctement labellisés ;
- état AMAP textuel ;
- alerte de solde non basée uniquement sur une couleur ;
- carte entière accessible au clavier ;
- boutons contact séparés si présents ;
- résultats de recherche annoncés après mise à jour.

---

# 68. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- un client peut être retrouvé en quelques secondes ;
- la recherche fonctionne par nom, email ou téléphone ;
- un adhérent AMAP est identifiable sans ouvrir le détail ;
- le nombre de paniers restants peut apparaître sans surcharger la carte ;
- une commande active est prioritaire sur l’historique récent ;
- un client sans compte peut exister normalement ;
- l’écran ne ressemble pas à un CRM commercial ;
- les doublons sont prévenus à la création ;
- la liste reste simple sur téléphone ;
- tablette et desktop augmentent la densité sans changer le modèle mental.

---

# 69. Structure de référence

```text
HEADER + AJOUT
      ↓
RECHERCHE
      ↓
FILTRES
      ↓
IDENTITÉ CLIENT
      ↓
CONTACT
      ↓
AMAP ÉVENTUEL
      ↓
ACTIVITÉ COURANTE / RÉCENTE
```

Cette structure doit permettre de retrouver rapidement un client et de comprendre son contexte opérationnel sans transformer l’application en CRM généraliste.
