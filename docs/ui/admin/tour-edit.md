# AdminTourEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/tour-edit.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── tour-edit-screen.tsx
├── components/
└── index.ts
```

Un seul écran couvre :

```text
création
modification
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quand cette tournée a-t-elle lieu, et dans quel ordre dois-je passer par les différents points ?**

Il doit permettre de :

- nommer la tournée ;
- choisir le jour récurrent ;
- définir l’heure de départ ;
- définir éventuellement le point de départ ;
- ajouter des arrêts ;
- définir leur type ;
- modifier leur lieu ;
- ajouter une note interne ;
- réordonner les arrêts ;
- définir éventuellement un marché final ;
- enregistrer le modèle ;
- comprendre que les occurrences existantes ne sont pas modifiées automatiquement.

---

# 3. Principe V1

La tournée est un modèle simple :

```text
1 jour récurrent
+
1 heure de départ
+
0..n arrêts ordonnés
+
éventuellement 1 marché final
```

Et surtout :

> **L’ordre des arrêts est défini manuellement.**

Pas de :

- calcul d’itinéraire ;
- optimisation automatique ;
- durée estimée fiable ;
- kilomètres calculés ;
- réordonnancement algorithmique.

---

# 4. Wireframe mobile — création

```text
┌─────────────────────────────────┐
│ ← Nouvelle tournée              │
├─────────────────────────────────┤
│                                 │
│ INFORMATIONS                    │
│                                 │
│ Nom                             │
│ ┌─────────────────────────────┐ │
│ │ Tournée Nord              │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCURRENCE                      │
│                                 │
│ Jour                            │
│ ┌─────────────────────────────┐ │
│ │ Mercredi                 ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│ Heure de départ                 │
│ ┌──────────────┐                │
│ │ 14:00        │                │
│ └──────────────┘                │
│                                 │
│ Tous les mercredis              │
│ Départ 14:00                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ DÉPART                          │
│ Facultatif                      │
│                                 │
│ Ferme                           │
│                                 │
│ [ Modifier ]                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ARRÊTS                          │
│                                 │
│ 1                               │
│ ┌─────────────────────────────┐ │
│ │ Saint-Pierre              │ │
│ │ Place de l’Église         │ │
│ │                           │ │
│ │ Retrait                   │ │
│ │                      ≡    │ │
│ └─────────────────────────────┘ │
│                                 │
│ 2                               │
│ ┌─────────────────────────────┐ │
│ │ Montville                 │ │
│ │ Parking mairie            │ │
│ │                           │ │
│ │ Retrait                   │ │
│ │                      ≡    │ │
│ └─────────────────────────────┘ │
│                                 │
│ 3                               │
│ ┌─────────────────────────────┐ │
│ │ Le Bourg                  │ │
│ │ Place centrale            │ │
│ │                           │ │
│ │ Livraison                 │ │
│ │                      ≡    │ │
│ └─────────────────────────────┘ │
│                                 │
│ [ + Ajouter un arrêt ]          │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MARCHÉ FINAL                    │
│ Facultatif                      │
│                                 │
│ [ Aucun ▼ ]                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE INTERNE                    │
│ Facultatif                      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Prendre les caisses       │ │
│ │ bleues pour les premiers  │ │
│ │ arrêts.                   │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
│ [ Créer la tournée ]            │
└─────────────────────────────────┘
```

CTA sticky.

---

# 5. Informations générales

Premier bloc :

```text
Nom
[ Tournée Nord ]
```

Le nom doit être suffisamment reconnaissable dans :

- le planning ;
- la préparation ;
- les commandes ;
- la distribution ;
- l’historique.

Exemples convenables :

```text
Tournée Nord
Tournée Vallée
Livraison mercredi Est
```

Éviter :

```text
Tournée
```

---

# 6. Récurrence

Même logique simple que les marchés.

```text
Jour
[ Mercredi ▼ ]

Heure de départ
[ 14:00 ]
```

Résumé :

```text
Tous les mercredis
Départ 14:00
```

Le résumé humain doit se mettre à jour immédiatement.

---

# 7. Pas d’heure de fin obligatoire

Ne pas demander :

```text
Heure de fin
```

dans le modèle V1.

La durée dépend :

- du nombre d’arrêts ;
- du nombre de commandes ;
- du trafic ;
- du temps de remise.

Une heure de fin arbitraire donnerait une fausse précision.

---

# 8. Point de départ

Le point de départ peut être facultatif :

```text
DÉPART

Ferme
```

avec éventuellement :

```text
12 chemin de la Ferme
```

Important :

> le point de départ n’est pas forcément un arrêt de distribution.

Il doit donc être visuellement séparé de la liste des arrêts.

---

# 9. Départ implicite

Si toutes les tournées partent de la ferme, le système peut avoir un réglage global :

```text
Point de départ par défaut
Ferme
```

Dans ce cas, l’écran affiche simplement :

```text
Départ
Ferme

[ Modifier pour cette tournée ]
```

Cela évite de ressaisir la même adresse.

---

# 10. Bloc arrêts

C’est la zone principale de l’écran.

Chaque arrêt affiche :

```text
1

Saint-Pierre
Place de l’Église

Retrait
```

avec actions :

```text
Modifier
Réordonner
Supprimer
```

La position est toujours explicite.

---

# 11. Ajouter un arrêt

CTA :

```text
[ + Ajouter un arrêt ]
```

ouvre un `Sheet` ou un sous-écran compact.

Wireframe :

```text
┌─────────────────────────────────┐
│ Ajouter un arrêt                │
├─────────────────────────────────┤
│                                 │
│ Type                            │
│ [ Retrait ▼ ]                   │
│                                 │
│ Nom                             │
│ [ Saint-Pierre ]                │
│                                 │
│ Nom du lieu                     │
│ [ Place de l’Église ]           │
│                                 │
│ Adresse                         │
│ [ 4 place de l’Église ... ]     │
│                                 │
│ Note interne                    │
│ [ ... ]                         │
│                                 │
└─────────────────────────────────┘
│ [ Ajouter ]                     │
└─────────────────────────────────┘
```

---

# 12. Types d’arrêt

Si le métier a réellement besoin de les distinguer :

```text
Retrait
Livraison
Marché
```

Garder toutefois `Marché final` dans une mécanique spécifique plutôt que de demander à l’utilisateur de fabriquer manuellement un arrêt de marché.

Ainsi :

```text
arrêts normaux
+
marché final facultatif
```

reste plus clair.

---

# 13. Arrêt de retrait

Exemple :

```text
Type
Retrait

Nom
Montville

Lieu
Parking mairie
```

C’est un point où plusieurs commandes peuvent être récupérées.

---

# 14. Arrêt de livraison

Exemple :

```text
Type
Livraison

Nom
Épicerie du Bourg

Adresse
12 rue Centrale
```

Il peut représenter un partenaire ou une destination.

Pas besoin pour la V1 de modéliser tous les détails logistiques d’une livraison individuelle dans le modèle.

---

# 15. Marché final

Section séparée :

```text
MARCHÉ FINAL
Facultatif

[ Marché Saint-Pierre ▼ ]
```

Options provenant des marchés actifs.

Une fois choisi :

```text
Marché Saint-Pierre
Samedi ?
```

Attention : la cohérence de jour doit être vérifiée.

---

# 16. Cohérence du marché final

Si la tournée a lieu :

```text
Mercredi
```

et que le marché sélectionné est :

```text
Samedi
```

ce n’est probablement pas cohérent.

L’UI doit avertir :

```text
⚠ Ce marché est configuré le samedi,
alors que cette tournée a lieu le mercredi.
```

En V1, bloquer probablement cette association plutôt que d’introduire une logique complexe.

---

# 17. Marché final dans l’ordre

Le marché final apparaît visuellement après les arrêts :

```text
1 Saint-Pierre
2 Montville
3 Le Bourg

FIN
Marché Saint-Pierre
```

ou :

```text
4 Marché Saint-Pierre
Marché final
```

Mais dans le formulaire, garder la section `Marché final` séparée afin de clarifier sa nature.

---

# 18. Réordonner les arrêts

Sur mobile, le drag & drop seul est insuffisant.

On peut autoriser le drag :

```text
≡
```

mais il faut aussi proposer un menu accessible :

```text
⋯

Monter
Descendre
Modifier
Supprimer
```

Ainsi, l’ordre peut être modifié sans geste complexe.

---

# 19. Exemple de réordonnancement

Avant :

```text
1 Saint-Pierre
2 Montville
3 Le Bourg
```

Après déplacement de `Le Bourg` :

```text
1 Saint-Pierre
2 Le Bourg
3 Montville
```

Le changement reste local au formulaire tant que l’utilisateur n’a pas enregistré.

---

# 20. Drag & drop sur tablette

Sur tablette, le drag devient très naturel.

Exemple :

```text
≡ 1 Saint-Pierre
≡ 2 Montville
≡ 3 Le Bourg
```

avec grandes zones de préhension.

Pendant le drag :

```text
1 Saint-Pierre

3 Le Bourg
   ↑ déplacement

2 Montville
```

Il faut un feedback clair de la nouvelle position.

---

# 21. Accessibilité du réordonnancement

Le drag ne doit jamais être le seul moyen.

Pour chaque arrêt :

```text
Déplacer vers le haut
Déplacer vers le bas
```

doit être disponible au clavier / lecteur d’écran.

Après action :

```text
Montville déplacé en position 2 sur 4.
```

---

# 22. Modifier un arrêt

Tap sur la carte ou menu :

```text
Modifier
```

ouvre le même formulaire que `Ajouter un arrêt`, prérempli.

Exemple :

```text
Modifier l’arrêt

Nom
[ Montville ]

Lieu
[ Parking mairie ]

Adresse
[ ... ]

Note interne
[ Se garer derrière la salle ]

[ Enregistrer ]
```

---

# 23. Supprimer un arrêt

La suppression du **formulaire non encore sauvegardé** peut être immédiate avec undo :

```text
Arrêt supprimé

[ Annuler ]
```

En modification d’un modèle existant, rappel important :

> supprimer l’arrêt du modèle n’affectera pas les occurrences déjà générées.

Message possible :

```text
Cet arrêt sera retiré du modèle.

Les occurrences déjà planifiées
conservent leur trajet actuel.
```

---

# 24. Dernier arrêt supprimé

Si aucun arrêt ne reste :

```text
Aucun arrêt défini.
```

Une tournée ne devrait probablement pas pouvoir être active sans arrêt.

Donc :

```text
[ Enregistrer ]
```

est bloqué tant qu’un arrêt minimum n’existe pas.

---

# 25. Nombre minimal d’arrêts

Pour qu’une tournée ait du sens :

```text
au moins 1 arrêt
```

ou éventuellement un marché final seul.

Règle recommandée :

```text
au moins 1 destination
```

où destination = arrêt ou marché final.

---

# 26. Note par arrêt

Exemple :

```text
NOTE INTERNE

Se garer derrière la mairie.
```

Elle doit être clairement distinguée des informations visibles par le client.

Texte d’aide :

```text
Visible uniquement par l’équipe.
```

---

# 27. Note générale

En bas du modèle :

```text
NOTE INTERNE

Prendre les caisses bleues
pour les deux premiers arrêts.
```

Elle concerne toute la tournée.

---

# 28. Validation

Validation locale :

```text
nom obligatoire
jour obligatoire
heure de départ obligatoire
au moins une destination
nom d’arrêt obligatoire
```

Si adresse facultative :

```text
adresse non bloquante
```

sauf si le métier impose la navigation.

---

# 29. Erreur dans un arrêt

Exemple :

```text
ARRÊTS

2. Montville

⚠ Adresse ou lieu manquant

[ Compléter ]
```

Le CTA global peut être bloqué.

Au tap, scroll vers l’arrêt ou ouvre son édition.

---

# 30. Création

CTA :

```text
[ Créer la tournée ]
```

Flux :

```text
validation
   ↓
création serveur
   ↓
✓ Tournée créée
   ↓
AdminTourDetailsScreen
```

---

# 31. Première occurrence

Après création :

```text
✓ Tournée créée

Prochaine occurrence :
Mercredi 26 août
```

si elle est immédiatement générée.

---

# 32. Modification

En mode édition :

```text
← Modifier la tournée
```

CTA :

```text
[ Enregistrer les modifications ]
```

Pas d’autosave.

Comme pour les marchés, les conséquences du modèle justifient une validation explicite.

---

# 33. Règle V1 sur les occurrences existantes

Conserver la règle déjà retenue :

> **Modifier le modèle n’affecte jamais automatiquement les occurrences déjà créées.**

Cela vaut pour :

- récurrence ;
- heure de départ ;
- point de départ ;
- ajout d’arrêt ;
- suppression d’arrêt ;
- réordonnancement ;
- marché final.

---

# 34. Pourquoi cette règle est particulièrement importante ici

Une tournée déjà générée peut avoir :

- des commandes affectées à des arrêts ;
- des clients informés ;
- une préparation associée ;
- un trajet exceptionnel ;
- une distribution déjà organisée.

Réécrire ce trajet automatiquement est trop risqué.

---

# 35. Message après modification

Exemple :

```text
✓ Tournée modifiée

Les nouvelles occurrences utiliseront
ce nouveau trajet.

3 occurrences déjà planifiées
conservent leur trajet actuel.

[ Les examiner ]
```

Très clair.

---

# 36. Changement de jour

Exemple :

```text
Mercredi
→ Vendredi
```

Même règle :

- modèle modifié ;
- occurrences existantes inchangées ;
- nouvelles occurrences générées selon vendredi.

On peut avertir :

```text
3 occurrences déjà planifiées
restent au mercredi.
```

---

# 37. Changement de départ

Exemple :

```text
14:00
→ 15:00
```

Les occurrences déjà générées restent à 14:00.

Message post-save :

```text
2 occurrences à venir conservent
leur heure actuelle.
```

---

# 38. Ajouter un arrêt

Exemple :

```text
Ancien modèle

Saint-Pierre
→ Montville
→ Le Bourg
```

Nouveau :

```text
Saint-Pierre
→ Montville
→ Nouveau point
→ Le Bourg
```

Le nouvel arrêt concerne uniquement les occurrences générées après la modification.

---

# 39. Retirer un arrêt

Même logique.

Si `Montville` est retiré :

```text
Nouvelles occurrences
→ sans Montville

Occurrences existantes
→ inchangées
```

Aucune commande existante n’est déplacée.

---

# 40. Réordonner

Exemple :

```text
Saint-Pierre
→ Montville
→ Le Bourg
```

devient :

```text
Le Bourg
→ Saint-Pierre
→ Montville
```

C’est uniquement la nouvelle référence du modèle.

---

# 41. Quitter avec modifications non enregistrées

Si l’utilisateur revient en arrière :

```text
Modifications non enregistrées

Voulez-vous quitter ?

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

Justifié ici.

---

# 42. Conflit concurrent

Si le modèle a été modifié ailleurs :

```text
⚠ Cette tournée a été modifiée
depuis l’ouverture du formulaire.

[ Recharger ]
```

Ne jamais écraser silencieusement.

---

# 43. Tablette portrait

Le formulaire peut rester principalement vertical.

Le trajet bénéficie cependant de cartes plus larges :

```text
┌──────────────────────────────────────────┐
│ ARRÊTS                                  │
│                                          │
│ ≡ 1  Saint-Pierre        Retrait    ⋯   │
│ ≡ 2  Montville           Retrait    ⋯   │
│ ≡ 3  Le Bourg            Livraison  ⋯   │
│                                          │
│ [ + Ajouter un arrêt ]                   │
└──────────────────────────────────────────┘
```

---

# 44. Tablette paysage

C’est probablement le meilleur contexte d’édition.

```text
┌───────────────────────────┬────────────────────────────┐
│ CONFIGURATION             │ TRAJET                     │
│                           │                            │
│ Nom                       │ ≡ 1 Saint-Pierre          │
│ Mercredi                  │ ≡ 2 Montville             │
│ Départ 14:00              │ ≡ 3 Le Bourg              │
│                           │                            │
│ Départ : Ferme            │ + Ajouter                 │
│                           │                            │
│ Note générale             │ Marché final : SP         │
└───────────────────────────┴────────────────────────────┘
```

Le trajet peut rester visible pendant la modification des propriétés.

---

# 45. Desktop

Même structure que tablette paysage.

On pourrait ajouter un panneau d’édition à droite lorsque l’utilisateur sélectionne un arrêt :

```text
liste des arrêts
      +
éditeur de l’arrêt sélectionné
```

Mais ce n’est pas nécessaire pour la V1.

---

# 46. Carte géographique

Ne pas rendre la carte nécessaire pour créer une tournée.

La source de vérité reste :

```text
liste ordonnée
```

Si une carte est ajoutée plus tard, elle peut refléter les arrêts, mais ne doit pas prétendre calculer le trajet optimal.

---

# 47. Projection formulaire

```ts
type TourFormValues = {
  name: string

  recurrence: {
    weekday: number
    departureTime: string
  }

  departure?: {
    label: string
    address?: string
  }

  stops: TourStopFormValue[]

  finalMarketId?: string

  internalNote?: string
}
```

---

# 48. Arrêt du formulaire

```ts
type TourStopFormValue = {
  clientId: string

  type:
    | "pickup"
    | "delivery"

  label: string

  location: {
    label?: string
    address?: string
  }

  internalNote?: string
}
```

`clientId` ici est un identifiant local de formulaire, pas forcément un ID métier persistant.

---

# 49. Ordre

L’ordre peut simplement être celui du tableau :

```ts
stops[0]
stops[1]
stops[2]
```

Pas forcément besoin de maintenir manuellement un `position` pendant tout le formulaire.

Au submit, le serveur peut attribuer :

```text
position = index + 1
```

---

# 50. Mode écran

```ts
type TourEditMode =
  | {
      type: "create"
    }
  | {
      type: "edit"
      tourId: string
      version: number
    }
```

---

# 51. API création

Conceptuellement :

```text
POST /admin/distribution/tours
```

payload :

```ts
{
  name: string

  recurrence: {
    weekday: number
    departureTime: string
  }

  departure?: {
    label: string
    address?: string
  }

  stops: {
    type: "pickup" | "delivery"
    label: string
    location?: {
      label?: string
      address?: string
    }
    internalNote?: string
  }[]

  finalMarketId?: string

  internalNote?: string
}
```

---

# 52. API modification

```text
PATCH /admin/distribution/tours/:id
```

avec :

```ts
{
  expectedVersion: number

  name: string
  recurrence: ...
  departure?: ...
  stops: ...
  finalMarketId?: string
  internalNote?: string
}
```

Aucune policy de propagation nécessaire si l’on retient :

```text
occurrences existantes inchangées
```

---

# 53. Résultat de modification

Le serveur peut renvoyer :

```ts
type UpdateTourResult = {
  tourId: string
  version: number

  existingFutureOccurrencesCount: number
}
```

L’UI peut afficher :

```text
✓ Tournée modifiée

3 occurrences déjà planifiées
conservent leur trajet actuel.
```

---

# 54. Gestion des IDs d’arrêts existants

En modification, chaque arrêt persistant peut avoir :

```ts
{
  id: string
  ...
}
```

Le serveur doit être capable de déterminer :

- arrêt conservé ;
- arrêt modifié ;
- arrêt retiré ;
- nouvel arrêt ;
- nouvel ordre.

Mais cela reste un détail d’API, pas un concept à exposer dans l’UI.

---

# 55. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
FormField
Input
Select
TimeInput
TextArea
Card
Button
IconButton
StickyActionBar
Sheet
ConfirmDialog
Alert
SortableList
```

`SortableList` peut être une abstraction projet si le besoin apparaît aussi ailleurs.

---

# 56. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
TourRecurrenceFields
TourRecurrencePreview
TourDepartureFields
TourStopEditor
TourStopSortableList
TourFinalMarketField
```

---

# 57. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── tour-edit-screen.tsx
├── components/
│   ├── tour-basic-fields.tsx
│   ├── tour-recurrence-fields.tsx
│   ├── tour-departure-fields.tsx
│   ├── tour-stop-list-editor.tsx
│   ├── tour-stop-form.tsx
│   ├── tour-final-market-field.tsx
│   ├── tour-note-field.tsx
│   ├── tour-impact-alert.tsx
│   └── tour-edit-actions.tsx
└── index.ts
```

---

# 58. États principaux

Prévoir :

```text
loading
ready
dirty
submitting
conflict
success
error
```

Au niveau d’un arrêt :

```text
adding
editing
reordering
```

peuvent être de simples états UI locaux.

---

# 59. Accessibilité

Points importants :

- position textuelle de chaque arrêt ;
- boutons `Monter` / `Descendre` disponibles en plus du drag ;
- feedback vocal après réordonnancement ;
- label complet pour `Ajouter un arrêt` ;
- type d’arrêt textuel ;
- erreurs reliées au bon arrêt ;
- CTA sticky ne masque pas les contrôles inférieurs.

---

# 60. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- une tournée peut être créée entièrement sur téléphone ;
- jour et heure de départ sont immédiatement compréhensibles ;
- le point de départ n’est pas confondu avec un arrêt ;
- ajouter un arrêt est rapide ;
- modifier un arrêt ne nécessite pas de recréer toute la tournée ;
- l’ordre est toujours visible ;
- les arrêts peuvent être réordonnés sans dépendre uniquement du drag & drop ;
- un marché final reste facultatif et clairement distingué ;
- aucune optimisation automatique n’est suggérée ;
- aucune occurrence déjà créée n’est modifiée implicitement ;
- quitter avec des changements locaux non enregistrés déclenche une protection ;
- la tablette rend le réordonnancement particulièrement confortable.

---

# 61. Structure de référence

```text
NOM
  ↓
RÉCURRENCE
  ↓
POINT DE DÉPART
  ↓
ARRÊTS ORDONNÉS
  ↓
AJOUT / MODIFICATION / RÉORDONNANCEMENT
  ↓
MARCHÉ FINAL FACULTATIF
  ↓
NOTE INTERNE
  ↓
VALIDATION
  ↓
IMPACT SUR OCCURRENCES EXISTANTES
  ↓
ENREGISTRER
```

Cette structure doit permettre de créer et maintenir des tournées récurrentes de manière rapide, prévisible et accessible, particulièrement sur mobile et tablette.
