# AdminAmapSubscriptionEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-subscription-edit.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-subscription-edit-screen.tsx
├── components/
└── index.ts
```

Un seul écran peut couvrir :

```text
création
modification
```

avec quelques variations selon le mode.

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles sont les règles permanentes de cet abonnement AMAP ?**

Il doit permettre de :

- sélectionner l’adhérent en création ;
- définir la date d’inscription ;
- choisir panier complet ou demi-panier ;
- définir le nombre initial de paniers ;
- choisir le jour habituel ;
- choisir le retrait habituel ;
- définir la deadline de modification adhérent ;
- enregistrer ;
- comprendre ce qui arrive aux prochaines semaines déjà planifiées.

---

# 3. Principe UX fondamental

L’écran modifie :

```text
CONFIGURATION PAR DÉFAUT
```

Il ne modifie pas directement :

```text
la semaine du 26 août
```

ou :

```text
la commande AMAP déjà générée
```

Le formulaire doit donc annoncer clairement :

> **Ces réglages seront utilisés pour les prochaines livraisons.**

---

# 4. Wireframe mobile — création

```text
┌─────────────────────────────────┐
│ ← Nouvel abonnement AMAP        │
├─────────────────────────────────┤
│                                 │
│ ADHÉRENT                        │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Rechercher un client...   │ │
│ └─────────────────────────────┘ │
│                                 │
│ Marie Dupont                    │
│ marie@example.fr                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ABONNEMENT                      │
│                                 │
│ Date d’inscription              │
│ [ 24 août 2026 ]                │
│                                 │
│ Type de panier                  │
│                                 │
│ [ Panier complet ]              │
│ [ Demi-panier     ]             │
│                                 │
│ Paniers disponibles             │
│ ┌──────────────┐                │
│ │ 20           │                │
│ └──────────────┘                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LIVRAISON HABITUELLE            │
│                                 │
│ Jour                            │
│ [ Mercredi ▼ ]                  │
│                                 │
│ Retrait                         │
│ [ Marché Saint-Pierre ▼ ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MODIFICATIONS ADHÉRENT          │
│                                 │
│ Autorisées jusqu’à              │
│                                 │
│ [ 1 jour avant ▼ ]              │
│                                 │
│ à                               │
│ [ 18:00 ]                       │
│                                 │
│ Exemple                         │
│ Livraison mercredi              │
│ → limite mardi à 18:00          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Cet abonnement sera actif       │
│ dès sa création.                │
│                                 │
└─────────────────────────────────┘
│ [ Créer l’abonnement ]          │
└─────────────────────────────────┘
```

CTA sticky sur mobile.

---

# 5. Wireframe mobile — modification

```text
┌─────────────────────────────────┐
│ ← Modifier l’abonnement         │
│ Marie Dupont                    │
├─────────────────────────────────┤
│                                 │
│ TYPE DE PANIER                  │
│ [ Panier complet ]              │
│ [ Demi-panier     ]             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LIVRAISON HABITUELLE            │
│                                 │
│ Jour                            │
│ [ Mercredi ▼ ]                  │
│                                 │
│ Retrait                         │
│ [ Marché Saint-Pierre ▼ ]       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MODIFICATIONS ADHÉRENT          │
│                                 │
│ Jusqu’à                         │
│ [ 1 jour avant ▼ ]              │
│ [ 18:00 ]                       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ⚠ Les semaines déjà planifiées  │
│ ne seront pas modifiées         │
│ automatiquement.                │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

Le compteur de paniers ne devrait pas être édité directement ici en modification.

---

# 6. Sélection de l’adhérent

En création uniquement :

```text
ADHÉRENT

[ Rechercher un client... ]
```

Recherche sur :

- nom ;
- prénom ;
- email ;
- téléphone.

Une fois sélectionné :

```text
Marie Dupont
marie@example.fr

[ Changer ]
```

---

# 7. Client inexistant

Action secondaire :

```text
[ Créer un nouveau client ]
```

peut ouvrir le formulaire client ou un flow court.

Éviter de dupliquer tout le formulaire client dans l’écran AMAP si possible.

---

# 8. Abonnement AMAP déjà actif

Si le client sélectionné possède déjà un abonnement actif :

```text
⚠ Marie Dupont possède déjà
un abonnement AMAP actif.

[ Voir l’abonnement ]
```

Il est recommandé de bloquer la création d’un second abonnement actif en V1.

---

# 9. Règle V1

Règle simple :

> **Un client ne peut avoir qu’un seul abonnement AMAP actif à la fois.**

Cela évite beaucoup d’ambiguïtés sur :

- panier restant ;
- prochaine date ;
- substitutions ;
- compte adhérent.

---

# 10. Date d’inscription

En création :

```text
Date d’inscription
[ 24 août 2026 ]
```

Par défaut :

```text
aujourd’hui
```

mais l’admin peut saisir une date passée pour une reprise de données.

Cette date est informative/historique.

Elle ne doit pas être utilisée comme moteur automatique de toutes les échéances.

---

# 11. Type de panier

Contrôle très explicite :

```text
Type de panier

[ Panier complet ]
[ Demi-panier     ]
```

Un `SegmentedControl` fonctionne bien si les deux options sont courtes.

---

# 12. Ne pas utiliser un ratio

Ne pas montrer :

```text
1
0.5
```

dans l’UI.

Le domaine peut éventuellement avoir :

```ts
"full" | "half"
```

mais l’utilisateur voit :

```text
Panier complet
Demi-panier
```

---

# 13. Changer le type d’un abonnement existant

Cas important.

Si Marie passe de :

```text
Panier complet
```

à :

```text
Demi-panier
```

le changement doit concerner les **futures commandes générées après la modification**.

Il ne doit pas réécrire une commande déjà créée.

---

# 14. Message d’impact

Après modification :

```text
Le type de panier sera utilisé
pour les prochaines commandes générées.

Les commandes déjà créées
restent inchangées.
```

Très important.

---

# 15. Paniers disponibles en création

En création uniquement :

```text
Paniers disponibles
[ 20 ]
```

Cela initialise le solde.

Exemple :

```text
20 paniers
```

---

# 16. Pourquoi ne pas éditer le solde ici ensuite

Une fois l’abonnement créé, modifier :

```text
8
→ 14
```

dans un formulaire générique détruit la traçabilité.

Donc en édition :

> pas de champ libre `remainingBaskets`.

Utiliser depuis le détail :

```text
Ajouter des paniers
Corriger le compteur
```

avec événement historisé.

---

# 17. Jour habituel

Exemple :

```text
Jour habituel

[ Mercredi ▼ ]
```

Options :

```text
Lundi
Mardi
Mercredi
Jeudi
Vendredi
Samedi
Dimanche
```

Ce jour sert de préférence/règle de génération.

---

# 18. Jour compatible avec le retrait

Le choix du retrait doit être compatible avec le jour.

Exemple :

```text
Jour habituel
Mercredi
```

Le système ne doit pas proposer un marché configuré uniquement :

```text
Samedi
```

comme retrait normal du mercredi.

---

# 19. Filtrer les lieux disponibles

Après sélection du jour :

```text
Mercredi
```

le champ retrait peut afficher seulement les options compatibles :

```text
Retrait ferme
Tournée Nord · Saint-Pierre
Tournée Nord · Montville
Marché du mercredi
```

Cela évite beaucoup d’erreurs.

---

# 20. Retrait habituel

Exemple :

```text
Retrait habituel

[ Marché Saint-Pierre ▼ ]
```

ou :

```text
[ Retrait ferme ▼ ]
```

ou :

```text
[ Tournée Nord · Montville ▼ ]
```

Le libellé doit donner suffisamment de contexte.

---

# 21. Pas d’ID technique

Ne jamais afficher :

```text
pickup_location_42
tour_stop_12
```

L’admin doit voir :

```text
Tournée Nord · Montville
```

---

# 22. Retrait obligatoire

Pour un abonnement actif, rendre obligatoire :

```text
jour habituel
+
retrait habituel
```

Sinon la génération des futures commandes devient ambiguë.

---

# 23. Deadline de modification

Le modèle métier prévoit :

```text
J-1 18:00
```

mais il est préférable de la représenter par deux champs :

```text
Jours avant livraison
[ 1 jour ▼ ]

Heure
[ 18:00 ]
```

---

# 24. Aperçu de deadline

Très utile :

```text
Livraison mercredi
→ modifications jusqu’au mardi à 18:00
```

Si :

```text
2 jours avant · 12:00
```

alors :

```text
Livraison vendredi
→ modifications jusqu’au mercredi à 12:00
```

Le résumé humain évite les erreurs de compréhension.

---

# 25. Deadline et admin

Texte d’aide :

```text
Cette limite s’applique aux adhérents.

L’admin pourra toujours modifier
une semaine après cette heure.
```

C’est important car ce comportement est spécifique.

---

# 26. Pas de deadline globale cachée

Si la deadline est réellement configurable par abonnement, elle doit apparaître ici.

Si finalement elle est globale à toute l’AMAP, mieux vaut la sortir complètement de cet écran.

Éviter deux sources de vérité.

---

# 27. Recommandation

Choix recommandé en V1 :

```text
deadline AMAP globale
```

si tous les adhérents suivent la même règle.

Cela simplifie :

- création ;
- maintenance ;
- rappels ;
- communication.

Dans ce cas, l’écran affiche simplement :

```text
Modifications jusqu’à
J-1 · 18:00

Défini dans les paramètres AMAP.
```

et pas un champ modifiable.

---

# 28. Si deadline par abonnement maintenue

Alors elle reste ici comme prévu.

Mais ce choix doit être explicite dans le domaine :

```ts
subscription.modificationDeadline
```

et non une valeur parfois globale, parfois locale.

---

# 29. Activation à la création

En V1, ne pas rajouter un gros toggle sauf besoin réel.

Un nouvel abonnement valide peut être créé :

```text
actif
```

par défaut.

Si besoin :

```text
Créer comme inactif
```

reste une option secondaire.

---

# 30. Désactivation en modification

Comme pour marchés/tournées, il est préférable de **ne pas mélanger** le changement d’état dans le formulaire.

Depuis le détail :

```text
Désactiver l’abonnement
```

avec conséquences explicites.

L’écran d’édition reste centré sur la configuration.

---

# 31. Validation inline

Exemples :

```text
Adhérent
Aucun adhérent sélectionné

Sélectionnez un adhérent.
```

```text
Paniers disponibles
[ 0 ]

Le nombre doit être supérieur à 0.
```

```text
Retrait habituel
[ Aucun ]

Choisissez un point de retrait.
```

---

# 32. Peut-on créer avec zéro panier ?

Déconseillé.

Un abonnement actif avec :

```text
0 panier
```

est immédiatement inutilisable.

Donc en création :

```text
initialBalance > 0
```

sauf cas administratif très spécifique.

---

# 33. Modification du jour

Exemple :

```text
Mercredi
→ Vendredi
```

Le formulaire doit rappeler :

```text
Ce changement s’appliquera
aux prochaines livraisons générées.

Les semaines déjà planifiées
restent inchangées.
```

---

# 34. Modification du retrait habituel

Exemple :

```text
Marché Saint-Pierre
→ Retrait ferme
```

Même règle.

Les futures commandes générées ensuite utilisent :

```text
Retrait ferme
```

Les commandes déjà générées restent au marché.

---

# 35. Pourquoi cette règle

Une commande déjà générée peut avoir :

- une occurrence liée ;
- une préparation ;
- des substitutions ;
- une information déjà visible au membre.

Il ne faut donc jamais la déplacer silencieusement.

---

# 36. Semaines planifiées sans commande générée

Il faut distinguer :

```text
échéance logique future
```

et :

```text
commande déjà générée
```

Si seule une échéance abstraite existe, la nouvelle configuration peut être utilisée lors de sa génération.

C’est cohérent.

---

# 37. Résumé avant enregistrement

Pas besoin d’un écran de confirmation systématique.

Mais en création, un bloc final peut aider :

```text
RÉSUMÉ

Marie Dupont
Panier complet

20 paniers

Tous les mercredis
Marché Saint-Pierre

Modifications jusqu’à
mardi 18:00
```

Puis :

```text
[ Créer l’abonnement ]
```

---

# 38. Création

Flux :

```text
formulaire
   ↓
validation
   ↓
création serveur
   ↓
✓ Abonnement créé
   ↓
AdminAmapSubscriptionDetailsScreen
```

---

# 39. Succès de création

Exemple :

```text
✓ Abonnement créé

Marie Dupont
Panier complet
20 paniers disponibles

Prochaine livraison :
mercredi 2 septembre
```

si une prochaine date est calculable.

---

# 40. Pas de prochaine date disponible

Succès possible :

```text
✓ Abonnement créé

Aucune prochaine livraison
n’est encore planifiée.
```

Mais si cela représente une anomalie, ajouter :

```text
[ Vérifier la configuration ]
```

---

# 41. Modification

CTA :

```text
[ Enregistrer les modifications ]
```

Pas d’autosave.

Le formulaire est transactionnel et relativement rare.

---

# 42. Impact détecté

Si des commandes futures existent :

```text
⚠ 2 commandes AMAP déjà générées
conservent leur configuration actuelle.
```

Pas besoin d’un choix compliqué si la règle V1 est fixe.

---

# 43. Pas de propagation configurable en V1

Déconseillé :

```text
○ modifier les commandes existantes
○ conserver les commandes
```

Cela ajoute beaucoup de risque.

Règle fixe :

> **les commandes déjà générées restent inchangées.**

---

# 44. Quitter avec changements

Si formulaire dirty :

```text
Modifications non enregistrées

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

Justifié.

---

# 45. Conflit concurrent

Si l’abonnement a changé ailleurs :

```text
⚠ Cet abonnement a été modifié
depuis l’ouverture du formulaire.

[ Recharger ]
```

Aucune sauvegarde forcée.

---

# 46. Cas particulier : solde modifié pendant l’édition

L’utilisateur ouvre :

```text
8 paniers restants
```

et pendant ce temps une commande est livrée ailleurs :

```text
7 paniers restants
```

Cela ne devrait pas forcément bloquer une modification de retrait.

Pourquoi ?

Parce que le compteur n’est pas édité dans ce formulaire.

On peut utiliser une version séparée ou une concurrence plus fine.

---

# 47. Important techniquement

Éviter une version globale qui crée des conflits inutiles pour toute évolution.

On peut avoir :

```text
configurationVersion
```

pour les paramètres modifiables ici,

et des événements de solde indépendants.

Sinon chaque livraison risque de faire échouer une simple modification de jour.

---

# 48. Projection formulaire création

```ts
type CreateAmapSubscriptionForm = {
  customerId: string

  registrationDate: string

  basketType:
    | "full"
    | "half"

  initialBasketBalance: number

  defaultWeekday: number

  defaultRecoveryId: string

  modificationDeadline?: {
    dayOffset: number
    time: string
  }
}
```

---

# 49. Projection formulaire édition

```ts
type UpdateAmapSubscriptionForm = {
  basketType:
    | "full"
    | "half"

  defaultWeekday: number

  defaultRecoveryId: string

  modificationDeadline?: {
    dayOffset: number
    time: string
  }
}
```

Note :

```text
remainingBaskets
```

n’est volontairement pas dans ce payload.

---

# 50. Mode écran

```ts
type AmapSubscriptionEditMode =
  | {
      type: "create"
    }
  | {
      type: "edit"
      subscriptionId: string
      configurationVersion: number
    }
```

---

# 51. API création

Conceptuellement :

```text
POST /admin/amap/subscriptions
```

payload :

```ts
{
  customerId: string
  registrationDate: string
  basketType: "full" | "half"
  initialBasketBalance: number
  defaultWeekday: number
  defaultRecoveryId: string
  modificationDeadline?: {
    dayOffset: number
    time: string
  }
}
```

---

# 52. Création : invariants serveur

Le serveur vérifie notamment :

- client existant ;
- pas d’autre abonnement actif ;
- solde initial positif ;
- retrait valide ;
- retrait compatible avec le jour ;
- deadline valide ;
- configuration permettant une future génération.

---

# 53. API modification

Conceptuellement :

```text
PATCH /admin/amap/subscriptions/:id/configuration
```

Une route explicitement `configuration` est préférable à un gros patch général.

Payload :

```ts
{
  expectedVersion: number

  basketType: "full" | "half"
  defaultWeekday: number
  defaultRecoveryId: string

  modificationDeadline?: {
    dayOffset: number
    time: string
  }
}
```

---

# 54. Pourquoi `/configuration`

Parce que l’abonnement contient aussi :

- compteur ;
- état ;
- historique ;
- exceptions ;
- consommations.

Tout cela ne devrait pas être modifiable par le même patch générique.

---

# 55. Réponse de modification

Exemple :

```ts
type UpdateAmapSubscriptionConfigurationResult = {
  subscriptionId: string
  configurationVersion: number

  existingGeneratedOrdersCount: number
}
```

L’UI peut afficher :

```text
✓ Abonnement modifié

2 commandes déjà générées
restent inchangées.
```

---

# 56. Sélecteur de retrait

La donnée nécessaire peut ressembler à :

```ts
type AmapRecoveryOption = {
  id: string

  type:
    | "farm"
    | "market"
    | "tour_stop"
    | "partner"

  label: string

  weekday: number

  active: boolean
}
```

La query ne renvoie idéalement que les choix valides.

---

# 57. Aucun retrait compatible

État :

```text
Aucun point de retrait disponible
le mercredi.

[ Configurer la distribution ]
```

Cette erreur doit être claire.

Ne pas permettre un abonnement actif incohérent.

---

# 58. Tablette portrait

Disposition possible :

```text
┌──────────────────────────────────────────┐
│ Modifier l’abonnement                   │
├────────────────────┬─────────────────────┤
│ ABONNEMENT         │ LIVRAISON           │
│                    │                     │
│ Panier complet     │ Mercredi            │
│                    │ Marché SP           │
│                    │ Deadline J-1 18h    │
├────────────────────┴─────────────────────┤
│ IMPACT                                  │
│ Les commandes existantes restent        │
│ inchangées.                              │
├──────────────────────────────────────────┤
│                           [ Enregistrer ]│
└──────────────────────────────────────────┘
```

---

# 59. Tablette paysage

Deux colonnes :

```text
┌─────────────────────────────┬──────────────────────────┐
│ ABONNEMENT                  │ LIVRAISON HABITUELLE    │
│                             │                          │
│ Type de panier              │ Jour                    │
│ Date inscription (création) │ Retrait                 │
│ Solde initial (création)    │ Deadline                │
│                             │                          │
└─────────────────────────────┴──────────────────────────┘
```

CTA sticky ou aligné en bas à droite.

---

# 60. Desktop

Même logique.

Ne pas utiliser tout l’espace disponible.

Une largeur de formulaire contenue reste préférable.

---

# 61. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
FormField
SearchInput
Select
SegmentedControl
DateInput
TimeInput
NumericInput
Alert
Card
Button
StickyActionBar
ConfirmDialog
```

---

# 62. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapBasketTypeField
AmapRecoveryField
AmapModificationDeadlineField
AmapModificationDeadlinePreview
AmapSubscriptionImpactNotice
```

---

# 63. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-subscription-edit-screen.tsx
├── components/
│   ├── amap-member-field.tsx
│   ├── amap-subscription-basic-fields.tsx
│   ├── amap-subscription-delivery-fields.tsx
│   ├── amap-subscription-deadline-fields.tsx
│   ├── amap-subscription-summary.tsx
│   ├── amap-subscription-impact-alert.tsx
│   └── amap-subscription-edit-actions.tsx
└── index.ts
```

---

# 64. États principaux

En création :

```text
ready
validating
submitting
success
error
```

En modification :

```text
loading
ready
dirty
submitting
conflict
success
error
```

---

# 65. Accessibilité

Points importants :

- libellés complets ;
- `Panier complet` / `Demi-panier` lisibles sans couleur ;
- jour de semaine textuel ;
- deadline reformulée en phrase humaine ;
- erreurs liées au champ concerné ;
- sélecteur de client utilisable au clavier ;
- CTA sticky ne masque pas la fin du formulaire.

---

# 66. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- la portée permanente du formulaire est immédiatement compréhensible ;
- l’admin peut créer un abonnement entièrement sur téléphone ;
- un client déjà abonné ne peut pas recevoir un second abonnement actif par erreur ;
- le type de panier est simple à choisir ;
- le solde initial est saisi uniquement à la création ;
- le compteur courant n’est jamais modifié comme un champ générique ;
- le jour et le retrait sont compatibles ;
- la deadline est compréhensible en langage naturel ;
- les commandes AMAP déjà générées ne changent jamais silencieusement ;
- modifier le type de panier ou le retrait ne modifie que les futures générations ;
- l’état actif/inactif reste géré par des actions explicites hors formulaire ;
- les changements non enregistrés sont protégés.

---

# 67. Structure de référence

```text
ADHÉRENT
   ↓
DATE D’INSCRIPTION
   ↓
TYPE DE PANIER
   ↓
SOLDE INITIAL (CRÉATION)
   ↓
JOUR HABITUEL
   ↓
RETRAIT HABITUEL
   ↓
DEADLINE ADHÉRENT
   ↓
APERÇU / VALIDATION
   ↓
IMPACT SUR LES COMMANDES EXISTANTES
   ↓
ENREGISTRER
```

Cette structure doit permettre de créer ou modifier les paramètres permanents d’un abonnement AMAP sans les confondre avec les exceptions d’une livraison particulière.
