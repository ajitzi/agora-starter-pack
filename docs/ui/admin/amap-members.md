# AdminAmapMemberListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-members.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-member-list-screen.tsx
├── components/
└── index.ts
```

L’écran reste partagé entre web et mobile tant qu’aucune divergence structurelle forte n’apparaît.

---

## 2. Objectif

L’écran doit répondre à :

> **Quels adhérents AMAP sont actifs et où en est leur abonnement ?**

Il doit permettre de :

- voir les abonnements actifs ;
- retrouver rapidement un adhérent ;
- distinguer panier complet et demi-panier ;
- voir le nombre de paniers restants ;
- voir la prochaine date ;
- repérer les abonnements bientôt épuisés ;
- ouvrir le détail ;
- filtrer les abonnements actifs/inactifs ;
- éventuellement créer un abonnement depuis l’admin.

---

# 3. Principe UX

Un adhérent AMAP est d’abord présenté ici par **son abonnement actif**.

On ne cherche pas à faire un écran client générique.

La carte doit donc privilégier :

```text
adhérent
↓
type de panier
↓
paniers restants
↓
prochaine date
↓
point de retrait
```

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← AMAP                     ＋   │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔍 Rechercher un adhérent  │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ Actifs 42 ] [ Tous 47 ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ⚠ 5 abonnements                 │
│ arrivent bientôt à échéance     │
│                                 │
│ [ Voir ]                        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MARIE DUPONT                    │
│                                 │
│ Panier complet                  │
│                                 │
│ 8 paniers restants              │
│                                 │
│ Prochain                        │
│ Mercredi 26 août                │
│                                 │
│ Marché Saint-Pierre             │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PAUL MARTIN                     │
│                                 │
│ Demi-panier                     │
│                                 │
│ ⚠ 2 paniers restants           │
│                                 │
│ Prochain                        │
│ Mercredi 26 août                │
│                                 │
│ Retrait ferme                   │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LUCIE BERNARD                   │
│                                 │
│ Panier complet                  │
│                                 │
│ 14 paniers restants             │
│                                 │
│ Prochain                        │
│ Vendredi 28 août                │
│                                 │
│ Tournée Sud · Montville         │
│                              >  │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Carte adhérent

Une carte affiche au minimum :

```text
MARIE DUPONT

Panier complet
8 paniers restants

Prochain
Mercredi 26 août

Marché Saint-Pierre
```

Toute la carte est tappable.

---

# 6. Informations prioritaires

Ordre recommandé :

```text
NOM
 ↓
TYPE DE PANIER
 ↓
PANIERS RESTANTS
 ↓
PROCHAINE DATE
 ↓
POINT DE RETRAIT
```

Le téléphone ou l’adresse email n’ont pas besoin d’être visibles dans la liste.

Ils appartiennent au détail.

---

# 7. Panier complet / demi-panier

Deux libellés métier explicites :

```text
Panier complet
Demi-panier
```

Éviter :

```text
1
0,5
```

ou :

```text
Full
Half
```

dans l’interface française.

---

# 8. Paniers restants

Exemple normal :

```text
8 paniers restants
```

À l’approche de l’épuisement :

```text
⚠ 2 paniers restants
```

À zéro :

```text
0 panier restant
```

Cela doit être visible immédiatement.

---

# 9. Seuil d’alerte

On peut considérer un abonnement comme “bientôt épuisé” lorsqu’il reste par exemple :

```text
3 paniers ou moins
```

Mais ce seuil devrait être configurable ou centralisé.

L’UI ne doit pas coder en dur une règle métier dispersée.

---

# 10. Bloc d’alerte global

S’il y a plusieurs abonnements proches de zéro :

```text
⚠ 5 abonnements arrivent bientôt à échéance

[ Voir ]
```

Tap :

```text
filtre = bientôt épuisés
```

Cela évite de chercher manuellement.

---

# 11. Abonnement épuisé

Exemple :

```text
PAUL MARTIN

Panier complet

0 panier restant

⚠ Abonnement épuisé
```

Il peut rester actif techniquement jusqu’à action admin, mais l’état doit être explicite.

Selon les règles métier, on peut aussi passer l’abonnement en inactif.

À figer côté domaine.

---

# 12. Actif / inactif

Filtres :

```text
[ Actifs 42 ] [ Tous 47 ]
```

Par défaut :

```text
Actifs
```

Un abonnement inactif conserve :

- historique ;
- consommations ;
- suspensions ;
- transferts ;
- commandes générées.

---

# 13. Pourquoi ne pas supprimer un abonnement

Même logique que les marchés/tournées :

> **historique d’abord.**

Un abonnement ne doit pas être supprimé parce qu’il est terminé.

On le passe en :

```text
Inactif
```

---

# 14. Recherche

Recherche immédiatement disponible :

```text
[ 🔍 Rechercher un adhérent ]
```

Recherche sur :

- nom ;
- prénom ;
- email ;
- téléphone éventuellement.

La recherche doit être tolérante et instantanée.

---

# 15. Filtres additionnels

En V1, garder peu de filtres :

```text
Actifs
Tous
Bientôt épuisés
Panier complet
Demi-panier
```

Sur mobile :

```text
[ Actifs ] [ Bientôt épuisés ] [ Type ▼ ]
```

Pas besoin d’un gros système de filtres avancés.

---

# 16. Tri par défaut

Privilégier :

```text
nom alphabétique
```

car l’admin cherchera souvent une personne.

Alternative :

```text
prochaine date
```

mais cela transforme la vue en planning.

Comme le planning AMAP sera traité ailleurs, garder l’alphabétique ici.

---

# 17. Prochaine date

Exemple :

```text
Prochain
Mercredi 26 août
```

Cette date correspond à la prochaine livraison prévue de l’abonnement.

Elle doit tenir compte de :

- suspensions ;
- éventuel changement ponctuel ;
- génération progressive.

---

# 18. Semaine suspendue

Si la prochaine occurrence est suspendue :

```text
Semaine du 26 août
Suspendue

Prochain panier
2 septembre
```

Dans la liste, on peut rester compact :

```text
Prochain
2 septembre

26 août suspendu
```

si pertinent.

---

# 19. Point de retrait

Exemples :

```text
Marché Saint-Pierre
Retrait ferme
Tournée Sud · Montville
```

Le libellé doit être humain.

Pas besoin d’exposer :

```text
recoveryMethodId
```

---

# 20. Transfert prochain

Si le prochain panier est cédé :

```text
Prochain panier
Mercredi 26 août

Cédé à Paul Dupont
```

Cette information peut être visible dans la carte uniquement si cela constitue une exception importante.

Sinon, elle reste dans le détail.

---

# 21. Modification ponctuelle de retrait

Exemple :

```text
Prochain
Mercredi 26 août

Retrait exceptionnel :
Marché Saint-Pierre
```

L’exception doit être explicite.

Le point habituel peut rester dans le détail.

---

# 22. Bouton `+`

Le bouton :

```text
＋
```

peut ouvrir :

```text
AdminAmapSubscriptionEditScreen
```

en création.

Mais rappel métier :

> pas d’inscription libre côté adhérent en V1.

La création d’un abonnement peut donc être une action admin.

---

# 23. Création d’abonnement

Le formulaire devrait sélectionner ou créer un client existant, puis définir :

- date d’inscription ;
- type de panier ;
- paniers restants ;
- jour par défaut ;
- retrait par défaut ;
- deadline de modification ;
- actif/inactif.

On détaillera cet écran séparément.

---

# 24. État vide

```text
Aucun abonnement AMAP actif.

Ajoutez un abonnement pour commencer.

[ Ajouter un abonnement ]
```

Si des abonnements inactifs existent :

```text
Aucun abonnement actif.

5 anciens abonnements sont disponibles
dans l’onglet Tous.
```

---

# 25. Carte d’un abonnement inactif

```text
MARIE DUPONT

Panier complet

Inactif

Dernière livraison
15 juillet
```

La prochaine date n’est plus affichée.

---

# 26. Abonnement sans prochaine date

Cas à traiter explicitement :

```text
Aucune prochaine livraison planifiée
```

Possible si :

- abonnement épuisé ;
- modèle incomplet ;
- calendrier AMAP non généré ;
- abonnement inactif.

L’UI peut afficher une alerte si ce n’est pas normal.

---

# 27. Anomalie de configuration

Exemple :

```text
⚠ Prochaine date inconnue

Retrait par défaut manquant
```

Action :

```text
[ Compléter ]
```

Un abonnement actif incomplet doit ressortir.

---

# 28. Tablette portrait

Deux cartes par ligne peuvent fonctionner :

```text
┌────────────────────────────────────────────┐
│ AMAP                                      │
├──────────────────────┬─────────────────────┤
│ Marie Dupont         │ Paul Martin         │
│ Panier complet       │ Demi-panier         │
│ 8 restants           │ ⚠ 2 restants       │
│ 26 août              │ 26 août             │
│ Marché SP            │ Ferme               │
├──────────────────────┼─────────────────────┤
│ Lucie Bernard        │ ...                 │
└──────────────────────┴─────────────────────┘
```

---

# 29. Tablette paysage

Une liste dense devient intéressante :

```text
┌──────────────────────────────────────────────────────────────┐
│ Adhérent       Panier        Restants   Prochain    Retrait │
├──────────────────────────────────────────────────────────────┤
│ Marie Dupont   Complet       8          26 août     Marché  │
│ Paul Martin    Demi          2 ⚠        26 août     Ferme   │
│ Lucie Bernard  Complet       14         28 août     Montville
└──────────────────────────────────────────────────────────────┘
```

Les lignes restent tappables.

---

# 30. Desktop

Même logique que tablette paysage.

On peut ajouter :

```text
État
```

et éventuellement :

```text
Inscrit depuis
```

si cela apporte une valeur réelle.

Mais ne pas transformer la liste en CRM complet.

---

# 31. États spéciaux à rendre visibles

La liste doit pouvoir signaler :

```text
bientôt épuisé
épuisé
inactif
configuration incomplète
prochaine semaine suspendue
```

Mais pas tous en même temps avec cinq badges.

Prioriser l’exception la plus importante.

---

# 32. Une seule anomalie dominante

Exemple :

```text
⚠ 2 paniers restants
```

est plus utile que :

```text
Actif
Panier complet
8 mois
2 paniers restants
Retrait configuré
```

Règle UX :

> **mettre en avant ce qui demande une attention.**

---

# 33. Tap sur la carte

Flux :

```text
AdminAmapMemberListScreen
        ↓
AdminAmapSubscriptionDetailsScreen
```

Le détail sera centré sur l’abonnement, avec :

- identité ;
- type ;
- compteur ;
- prochaine date ;
- historique ;
- suspensions ;
- substitutions ;
- transferts ;
- modification admin.

---

# 34. Projection de données

Exemple :

```ts
type AmapMemberListItem = {
  subscriptionId: string

  member: {
    customerId: string
    name: string
  }

  subscription: {
    basketType:
      | "full"
      | "half"

    remainingBaskets: number

    active: boolean

    registrationDate: string

    modificationDeadline?: {
      dayOffset: number
      time: string
    }
  }

  nextDelivery?: {
    date: string

    status:
      | "scheduled"
      | "suspended"
      | "transferred"

    recovery: {
      label: string
    }

    beneficiaryName?: string
  }

  alerts: {
    type:
      | "low_remaining"
      | "empty"
      | "incomplete_configuration"
    label: string
  }[]
}
```

---

# 35. Query

Conceptuellement :

```text
GET /admin/amap/subscriptions
```

avec :

```text
status=active|all
search=
basketType=
alert=
```

---

# 36. Pourquoi parler d’abonnement dans l’API

L’écran peut s’appeler :

```text
AMAP
```

ou :

```text
Adhérents
```

mais techniquement la ligne principale correspond à :

```text
subscription
```

car les informations métier affichées sont liées à l’abonnement :

- panier ;
- compteur ;
- prochain retrait ;
- deadline.

---

# 37. Client avec plusieurs abonnements

Si ce cas n’existe pas en V1 :

> imposer un abonnement AMAP actif maximum par client.

Cela simplifie fortement l’UI.

Si plusieurs abonnements deviennent possibles plus tard, la liste devra être repensée.

---

# 38. Mise à jour au retour

Quand un panier est livré et consommé :

```text
8 paniers restants
↓
7 paniers restants
```

La liste doit être actualisée au retour.

Pas besoin de temps réel complexe si le cache est correctement invalidé.

---

# 39. Consommation traçable

Le compteur affiché doit être cohérent avec les événements de consommation.

Éviter un simple entier modifié sans historique si possible.

Le détail montrera :

```text
Panier consommé
26 août
Commande #...
```

---

# 40. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
SearchInput
Tabs
FilterChips
Card
Badge
Alert
EmptyState
Skeleton
ResponsiveGrid
```

---

# 41. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapSubscriptionCard
AmapBasketTypeBadge
AmapRemainingBaskets
AmapNextDeliverySummary
AmapSubscriptionAlert
```

`AmapRemainingBaskets` sera particulièrement réutilisable.

---

# 42. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-member-list-screen.tsx
├── components/
│   ├── amap-member-search.tsx
│   ├── amap-member-filters.tsx
│   ├── amap-member-list.tsx
│   ├── amap-expiring-alert.tsx
│   └── amap-member-empty-state.tsx
└── index.ts
```

---

# 43. États principaux

Prévoir :

```text
loading
ready
empty
error
```

Les filtres et la recherche restent de simples états UI.

---

# 44. Chargement

Skeleton de cartes :

```text
┌─────────────────────────────┐
│ █████████████               │
│ █████████                   │
│                             │
│ ███████                     │
│                             │
│ ███████████                 │
└─────────────────────────────┘
```

---

# 45. Erreur

```text
Impossible de charger les abonnements AMAP.

[ Réessayer ]
```

---

# 46. Accessibilité

Points importants :

- `Panier complet` / `Demi-panier` en texte ;
- nombre de paniers restants annoncé explicitement ;
- alertes non dépendantes de la couleur ;
- carte entière accessible au clavier ;
- recherche correctement labellisée ;
- état suspendu ou inactif explicite.

---

# 47. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- un adhérent peut être retrouvé très rapidement ;
- le type de panier est visible sans ouvrir le détail ;
- le nombre de paniers restants est impossible à manquer ;
- les abonnements presque épuisés ressortent clairement ;
- la prochaine date et le lieu de retrait sont visibles ;
- un abonnement inactif reste accessible dans l’historique ;
- l’écran ne ressemble pas à un CRM générique ;
- une exception de semaine peut être identifiée sans afficher trop de badges ;
- la liste reste très lisible sur téléphone ;
- tablette et desktop augmentent simplement la densité.

---

# 48. Structure de référence

```text
HEADER + AJOUT
      ↓
RECHERCHE
      ↓
ACTIFS / TOUS
      ↓
ALERTES
      ↓
ADHÉRENTS / ABONNEMENTS
      ↓
TYPE DE PANIER
      ↓
PANIERS RESTANTS
      ↓
PROCHAINE LIVRAISON
```

Cette structure doit permettre de piloter rapidement les abonnements AMAP actifs sans transformer l’écran en CRM généraliste.
