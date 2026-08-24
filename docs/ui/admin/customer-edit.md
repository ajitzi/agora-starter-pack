# AdminCustomerEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/customer-edit.md
```

Implémentation :

```text
packages/screens/admin/customers/
├── admin-customer-edit-screen.tsx
├── components/
└── index.ts
```

Un seul écran peut gérer :

```text
création
modification
```

---

# 2. Objectif

L’écran doit répondre à :

> **Quelles informations actuelles permettent d’identifier et contacter ce client ?**

Il doit permettre de :

- créer un client manuellement ;
- modifier un client existant ;
- saisir nom et prénom ;
- saisir téléphone et/ou email ;
- saisir une adresse si utile ;
- ajouter une note interne courte ;
- détecter les doublons potentiels ;
- enregistrer ;
- revenir proprement au flow d’origine.

---

# 3. Principe UX

Le formulaire doit rester très court.

Hiérarchie :

```text
IDENTITÉ
   ↓
CONTACT
   ↓
ADRESSE ÉVENTUELLE
   ↓
NOTE INTERNE
   ↓
ENREGISTRER
```

Ne pas ajouter ici :

- commandes ;
- abonnement AMAP ;
- compteur de paniers ;
- statut commercial ;
- préférences marketing ;
- statistiques.

---

# 4. Wireframe mobile — création

```text
┌─────────────────────────────────┐
│ ← Nouveau client                │
├─────────────────────────────────┤
│                                 │
│ IDENTITÉ                        │
│                                 │
│ Prénom                          │
│ [ Marie                     ]   │
│                                 │
│ Nom                             │
│ [ Dupont                    ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CONTACT                         │
│                                 │
│ Téléphone                       │
│ [ 06 12 34 56 78            ]  │
│                                 │
│ Email                           │
│ [ marie@example.fr          ]   │
│                                 │
│ Au moins un moyen de contact    │
│ est recommandé.                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ADRESSE                         │
│ Facultatif                      │
│                                 │
│ Adresse                         │
│ [ 12 rue des Prés           ]   │
│                                 │
│ Complément                      │
│ [                           ]   │
│                                 │
│ Code postal                     │
│ [ 76100 ]                       │
│                                 │
│ Ville                           │
│ [ Montville                 ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE INTERNE                    │
│                                 │
│ [ Préfère être appelée      ]   │
│ [ après 18h.                ]   │
│                                 │
│ Visible uniquement par l’admin. │
│                                 │
└─────────────────────────────────┘
│ [ Créer le client ]             │
└─────────────────────────────────┘
```

CTA sticky.

---

# 5. Wireframe mobile — modification

```text
┌─────────────────────────────────┐
│ ← Modifier le client            │
│ Marie Dupont                    │
├─────────────────────────────────┤
│                                 │
│ IDENTITÉ                        │
│                                 │
│ Prénom                          │
│ [ Marie                     ]   │
│                                 │
│ Nom                             │
│ [ Dupont                    ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CONTACT                         │
│                                 │
│ Téléphone                       │
│ [ 06 12 34 56 78            ]  │
│                                 │
│ Email                           │
│ [ marie@example.fr          ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ADRESSE                         │
│                                 │
│ [ 12 rue des Prés           ]   │
│ [ 76100 ] [ Montville       ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE INTERNE                    │
│                                 │
│ [ Préfère être appelée      ]   │
│ [ après 18h.                ]   │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

# 6. Identité

Champs recommandés :

```text
Prénom
Nom
```

Plutôt qu’un seul :

```text
Nom complet
```

Cela facilite :

- recherche ;
- tri alphabétique ;
- personnalisation future ;
- import.

---

# 7. Nom requis

Rendre au minimum :

```text
nom ou prénom
```

nécessaire.

Mais idéalement :

```text
displayName
```

doit toujours pouvoir être calculé.

Exemples valides :

```text
Marie Dupont
```

```text
Association Les Jardins
```

Si des personnes morales doivent exister plus tard, il faudra peut-être élargir le modèle.

---

# 8. Recommandation V1

Pour éviter de complexifier :

> V1 suppose principalement des personnes physiques.

Donc :

```text
firstName
lastName
```

suffisent.

Un champ `displayName` peut être calculé.

---

# 9. Téléphone

Champ :

```text
Téléphone
[ 06 12 34 56 78 ]
```

Clavier téléphone sur mobile.

Le système doit normaliser la valeur côté serveur.

---

# 10. Ne pas stocker le format affiché comme vérité métier

Conceptuellement :

```text
06 12 34 56 78
```

peut être affiché ainsi,

mais stocké sous forme normalisée :

```text
+33612345678
```

si la stratégie retenue le permet.

L’UI reste locale et humaine.

---

# 11. Email

Champ :

```text
Email
[ marie@example.fr ]
```

Clavier email.

Normalisation minimale :

```text
trim
lowercase si approprié
```

sans essayer de “corriger” silencieusement une adresse.

---

# 12. Téléphone et email obligatoires ?

Pour un client classique, il est déconseillé de rendre les deux obligatoires.

Règle plus souple :

```text
au moins téléphone ou email
```

si un moyen de contact est nécessaire.

---

# 13. Cas commande au marché

On peut avoir :

```text
Jean Martin
06 12 34 56 78
```

sans email.

C’est parfaitement valide.

---

# 14. Cas AMAP

Pour un futur adhérent AMAP avec compte :

```text
email
```

pourra devenir obligatoire lors du flow de compte/abonnement.

Mais ce n’est pas à `Customer` d’imposer cette contrainte à tous les clients.

---

# 15. Client sans moyen de contact

Peut éventuellement être autorisé pour :

- saisie historique ;
- commande immédiate au marché ;
- client connu personnellement.

Mais l’UI doit prévenir :

```text
⚠ Aucun moyen de contact renseigné.
```

Pas forcément bloquer si le métier l’autorise.

---

# 16. Recommandation V1

Choix recommandé :

```text
nom requis
+
téléphone ou email recommandé
```

mais pas systématiquement bloquant.

Le contexte de création de commande peut imposer une contrainte plus forte si nécessaire.

---

# 17. Détection de doublon

C’est un élément majeur du formulaire.

La détection peut être lancée lorsque :

- téléphone devient valide ;
- email devient valide.

---

# 18. Doublon par téléphone

Exemple :

```text
Téléphone
[ 06 12 34 56 78 ]

⚠ Un client utilise déjà ce numéro.

Marie Dupont
marie@example.fr

[ Voir le client ]
```

---

# 19. Doublon par email

```text
Email
[ marie@example.fr ]

⚠ Cet email est déjà associé à :

Marie Dupont
06 12 34 56 78

[ Voir le client ]
```

---

# 20. Doublon exact

Si le téléphone ou email correspond exactement à un client existant, il est fortement déconseillé de laisser créer un nouveau client sans avertissement explicite.

En V1, on peut même bloquer :

```text
Créer quand même
```

si aucun vrai cas métier ne le justifie.

---

# 21. Recommandation

Pour téléphone/email uniques :

> bloquer les doublons exacts en V1.

Cela simplifie énormément la base.

---

# 22. Attention aux emails partagés

Un couple peut utiliser la même adresse email.

Donc une contrainte d’unicité stricte sur l’email peut être discutable.

Le téléphone peut aussi être partagé.

Il faut distinguer :

```text
doublon potentiel
```

et :

```text
identité techniquement unique
```

---

# 23. Alternative plus sûre

Ne pas imposer l’unicité DB absolue.

Mais afficher une confirmation forte :

```text
Un client similaire existe déjà.

[ Utiliser Marie Dupont ]
[ Continuer malgré tout ]
```

Cette approche est plus réaliste.

---

# 24. Noms similaires

Si l’utilisateur saisit :

```text
Marie Dupont
```

et qu’une Marie Dupont existe déjà, ne pas bloquer.

Afficher éventuellement :

```text
Clients similaires
Marie Dupont · 06 12...
```

mais la correspondance nom seule n’est pas suffisante.

---

# 25. Détection non intrusive

Ne pas lancer une grande modal à chaque frappe.

Afficher sous le champ :

```text
Client similaire trouvé
```

et laisser l’utilisateur ouvrir le détail.

---

# 26. Adresse

Section facultative :

```text
ADRESSE
Facultatif
```

Champs :

```text
Adresse
Complément
Code postal
Ville
```

Pays peut être implicite si l’application est mono-pays en V1.

---

# 27. Adresse requise quand ?

Pas pour tous les clients.

Seulement si nécessaire pour :

- livraison à domicile ;
- tournée liée à l’adresse ;
- usage administratif futur.

Donc ne pas forcer l’adresse dans la fiche de base.

---

# 28. Géocodage

Pas nécessaire en V1.

L’adresse peut être un texte structuré classique.

Pas besoin de :

- autocomplete cartographique ;
- coordonnées GPS ;
- normalisation postale avancée.

---

# 29. Adresse incorrecte

Une adresse client incorrecte ne doit pas forcément bloquer une commande si la récupération se fait :

```text
au marché
```

Les règles de validation doivent dépendre du contexte d’utilisation.

---

# 30. Note interne

Champ :

```text
NOTE INTERNE

[ ... ]
```

Texte d’aide :

```text
Visible uniquement par l’équipe.
```

---

# 31. Note courte et opérationnelle

Exemples adaptés :

```text
Préfère être appelée après 18h.
```

```text
Portail bleu côté jardin.
```

Éviter un journal historique complet.

---

# 32. Limite de note

Une limite raisonnable :

```text
500 caractères
```

par exemple.

Cela évite de transformer la fiche client en document libre.

---

# 33. Création depuis la liste clients

Flux :

```text
AdminCustomerListScreen
        ↓
AdminCustomerEditScreen
        ↓
AdminCustomerDetailsScreen
```

Après création :

```text
✓ Client créé
```

puis ouverture de la fiche.

---

# 34. Création depuis une nouvelle commande

Flow différent :

```text
AdminOrderCreateScreen
        ↓
Créer un client
        ↓
AdminCustomerEditScreen
        ↓
retour AdminOrderCreateScreen
```

avec le nouveau client déjà sélectionné.

Très important pour éviter un flow cassé.

---

# 35. Création depuis un abonnement AMAP

Même principe :

```text
AdminAmapSubscriptionEditScreen
        ↓
Créer un client
        ↓
AdminCustomerEditScreen
        ↓
retour abonnement
```

avec `customerId` sélectionné.

---

# 36. Contexte de retour

Le screen peut recevoir :

```ts
returnContext
```

ou des callbacks/navigation params.

Il ne doit pas dépendre directement d’un routeur spécifique dans `packages/screens`.

---

# 37. Principe d’architecture

Le screen partagé reçoit par exemple :

```ts
onSaved(customer)
onCancel()
```

et laisse `apps/web` / `apps/mobile` décider de la navigation.

Cohérent avec l’architecture existante.

---

# 38. Modification d’un client

Après sauvegarde :

```text
✓ Client modifié
```

Retour vers :

```text
AdminCustomerDetailsScreen
```

avec projection rafraîchie.

---

# 39. Pas d’autosave

Le formulaire doit être explicitement sauvegardé.

Pourquoi ?

Parce que les modifications de coordonnées sont rares et peuvent avoir des conséquences.

Donc :

```text
dirty
↓
Enregistrer
```

---

# 40. Quitter sans enregistrer

Si `dirty` :

```text
Modifications non enregistrées

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

---

# 41. Historique non réécrit

Texte d’aide éventuellement affiché en modification :

```text
Les modifications concernent la fiche actuelle.

Les anciennes commandes conservent
les coordonnées utilisées à l’époque.
```

Pas besoin de l’afficher en permanence si cela alourdit.

Mais la règle technique est importante.

---

# 42. Modification du téléphone avec commande active

Une commande déjà créée garde son snapshot.

La fiche client peut passer :

```text
06 12 ...
→
07 84 ...
```

sans modifier automatiquement la commande du lendemain.

---

# 43. Faut-il synchroniser une commande active ?

Une synchronisation automatique est déconseillée.

Pourquoi ?

Parce que la commande peut avoir été passée avec une personne / coordonnée spécifique.

Règle simple :

> la fiche Customer change, la commande existante reste inchangée.

---

# 44. Action explicite éventuelle

Plus tard, l’écran de commande pourrait proposer :

```text
Mettre à jour avec les coordonnées actuelles du client
```

mais pas nécessaire V1.

---

# 45. Validation du nom

Exemple :

```text
Prénom
[ ]

Nom
[ ]

Renseignez au moins un nom.
```

Ou rendre `Nom` obligatoire si cela correspond mieux au métier.

---

# 46. Validation téléphone

Afficher une erreur uniquement quand suffisamment de contenu est saisi.

Pas :

```text
Téléphone invalide
```

dès que l’utilisateur tape :

```text
0
```

---

# 47. Validation email

Exemple :

```text
Email
[ marie@ ]

Adresse email invalide.
```

Validation simple, pas une RFC complexe côté interface.

---

# 48. Validation adresse

Si une adresse est partiellement saisie :

```text
Adresse renseignée
mais ville manquante
```

l’UI peut demander de compléter.

Mais une section entièrement vide reste valide.

---

# 49. Adresse partielle

Règle possible :

```text
si aucun champ adresse → valide

si au moins un champ →
adresse principale + ville requises
```

Simple et compréhensible.

---

# 50. Client AMAP existant

Lorsque l’on modifie la fiche d’un adhérent AMAP :

```text
AMAP
```

ne doit pas apparaître comme un ensemble de champs modifiables ici.

Éventuellement un message :

```text
Ce client possède un abonnement AMAP actif.
```

avec lien :

```text
[ Voir l’abonnement ]
```

mais l’écran reste Customer-only.

---

# 51. Compte utilisateur

Ne pas modifier :

- mot de passe ;
- connexion ;
- rôle ;
- abonnement.

dans cet écran.

Le compte est un autre sujet.

---

# 52. Désactivation / suppression

Pas d’action de suppression en bas du formulaire.

La fiche client a vocation à conserver l’historique.

---

# 53. Cas d’un client créé par erreur et sans historique

On peut prévoir plus tard :

```text
Supprimer le client
```

uniquement si :

- aucune commande ;
- aucun abonnement ;
- aucune relation historique.

Mais ne pas l’exposer en V1.

---

# 54. Concurrence

Payload de modification avec :

```text
expectedVersion
```

ou :

```text
profileVersion
```

En cas de conflit :

```text
⚠ Cette fiche a été modifiée ailleurs.

[ Recharger ]
```

---

# 55. Pourquoi `profileVersion`

Parce que les commandes et l’AMAP peuvent changer indépendamment.

La modification d’une commande ne doit pas provoquer un conflit sur :

```text
email
```

du client.

Donc une version spécifique au profil est préférable.

---

# 56. Mode écran

```ts
type AdminCustomerEditMode =
  | {
      type: "create"
    }
  | {
      type: "edit"
      customerId: string
      profileVersion: number
    }
```

---

# 57. Formulaire

```ts
type CustomerFormValues = {
  firstName?: string
  lastName?: string

  phone?: string
  email?: string

  address?: {
    line1?: string
    line2?: string
    postalCode?: string
    city?: string
  }

  internalNote?: string
}
```

---

# 58. Projection d’édition

```ts
type AdminCustomerEditData = {
  customer: {
    id: string
    profileVersion: number

    firstName?: string
    lastName?: string
    phone?: string
    email?: string

    address?: {
      line1?: string
      line2?: string
      postalCode?: string
      city?: string
    }

    internalNote?: string
  }

  context?: {
    hasActiveAmapSubscription: boolean
    activeOrdersCount: number
  }
}
```

Le contexte informe, mais ne rend pas les autres domaines modifiables.

---

# 59. API création

Conceptuellement :

```text
POST /admin/customers
```

Payload :

```ts
{
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  address?: {
    line1?: string
    line2?: string
    postalCode?: string
    city?: string
  }
  internalNote?: string
}
```

---

# 60. API modification

Préférer :

```text
PATCH /admin/customers/:id/profile
```

plutôt qu’un gros patch client générique.

Payload :

```ts
{
  expectedVersion: number

  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  address?: ...
  internalNote?: string
}
```

---

# 61. Pourquoi `/profile`

Parce que `Customer` peut être lié à :

- commandes ;
- compte ;
- AMAP ;
- historique.

L’écran ne modifie que son profil courant.

---

# 62. Détection de doublon API

Conceptuellement :

```text
GET /admin/customers/duplicates?phone=...&email=...
```

ou intégrée dans la validation de création.

Pour une UX réactive, une query dédiée peut être utile.

---

# 63. Réponse de détection

```ts
type CustomerDuplicateCandidate = {
  customerId: string
  displayName: string
  phone?: string
  email?: string

  match:
    | "phone"
    | "email"
    | "both"
    | "name"
}
```

---

# 64. Ne pas surcharger le serveur à chaque touche

Détection uniquement quand :

- téléphone normalisé semble complet ;
- email est syntaxiquement valide.

Pas à chaque caractère.

---

# 65. Soumission et doublon concurrent

Même si la prévalidation n’a rien trouvé, le serveur doit refaire le contrôle.

Deux admins pourraient créer le même client presque simultanément.

---

# 66. Erreur de duplication à la soumission

Afficher :

```text
Un client correspondant existe déjà.

Marie Dupont
06 12 34 56 78

[ Voir ce client ]
[ Retour au formulaire ]
```

Si la création forcée est autorisée, elle doit être secondaire.

---

# 67. Tablette portrait

Formulaire sur une largeur contenue :

```text
┌──────────────────────────────────────────┐
│ Modifier Marie Dupont                   │
├────────────────────┬─────────────────────┤
│ IDENTITÉ           │ CONTACT             │
│                    │                     │
│ Prénom             │ Téléphone           │
│ Nom                │ Email               │
├────────────────────┴─────────────────────┤
│ ADRESSE                                  │
├──────────────────────────────────────────┤
│ NOTE INTERNE                             │
├──────────────────────────────────────────┤
│                           [ Enregistrer ]│
└──────────────────────────────────────────┘
```

---

# 68. Tablette paysage

Deux colonnes naturelles :

```text
┌─────────────────────────────┬──────────────────────────┐
│ IDENTITÉ / CONTACT          │ ADRESSE / NOTE          │
│                             │                          │
│ Prénom                      │ Adresse                  │
│ Nom                         │ Ville                    │
│ Téléphone                   │                          │
│ Email                       │ Note interne             │
│                             │                          │
└─────────────────────────────┴──────────────────────────┘
```

---

# 69. Desktop

Même logique.

Garder une largeur maximale raisonnable.

Un formulaire client n’a aucune raison de remplir un écran 1600 px.

---

# 70. Chargement édition

Skeleton des champs ou formulaire désactivé.

Pas besoin d’un spinner central géant.

---

# 71. Soumission

État :

```text
Enregistrement…
```

CTA désactivé temporairement.

Puis :

```text
✓ Client enregistré
```

---

# 72. Erreur serveur

```text
Impossible d’enregistrer le client.

Vos modifications sont conservées.

[ Réessayer ]
```

Ne jamais vider le formulaire.

---

# 73. Cas hors ligne

Si l’app native arrive plus tard :

- ne pas annoncer un enregistrement réussi tant que le serveur n’a pas confirmé ;
- un éventuel mode offline devra être explicite.

Pas besoin de le résoudre en V1 web.

---

# 74. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
FormField
TextInput
PhoneInput
EmailInput
TextArea
Alert
Button
StickyActionBar
ConfirmDialog
Skeleton
```

---

# 75. Composants métier

Dans :

```text
packages/domains/customers/ui/
```

bons candidats :

```text
CustomerIdentityFields
CustomerContactFields
CustomerAddressFields
CustomerInternalNoteField
CustomerDuplicateWarning
CustomerDuplicateCandidate
```

---

# 76. Composants spécifiques au screen

```text
packages/screens/admin/customers/
├── admin-customer-edit-screen.tsx
├── components/
│   ├── customer-edit-identity-section.tsx
│   ├── customer-edit-contact-section.tsx
│   ├── customer-edit-address-section.tsx
│   ├── customer-edit-note-section.tsx
│   ├── customer-duplicate-warning.tsx
│   └── customer-edit-actions.tsx
└── index.ts
```

---

# 77. États principaux

Création :

```text
ready
checkingDuplicate
submitting
success
error
```

Modification :

```text
loading
ready
dirty
checkingDuplicate
submitting
conflict
success
error
```

---

# 78. Accessibilité

Points importants :

- labels explicites, pas uniquement placeholders ;
- type de clavier adapté ;
- erreurs liées aux champs ;
- candidat doublon annoncé avec nom et contact ;
- note interne identifiée comme telle ;
- CTA sticky n’occulte pas le dernier champ ;
- confirmation de sortie accessible au clavier.

---

# 79. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- créer un client prend moins d’une minute ;
- il fonctionne correctement avec téléphone sans email ;
- il n’impose pas une adresse inutile ;
- les doublons par téléphone/email sont détectés avant création autant que possible ;
- deux personnes avec le même nom restent possibles ;
- la note interne est clairement distincte des données visibles client ;
- modifier la fiche ne réécrit aucune ancienne commande ;
- les domaines AMAP et commandes ne sont pas éditables depuis ce formulaire ;
- le flow sait revenir à une commande ou un abonnement en cours de création ;
- un conflit concurrent ne provoque jamais d’écrasement silencieux ;
- le formulaire reste compact sur mobile et tablette.

---

# 80. Structure de référence

```text
MODE CRÉATION / MODIFICATION
          ↓
IDENTITÉ
          ↓
CONTACT
          ↓
DÉTECTION DE DOUBLON
          ↓
ADRESSE FACULTATIVE
          ↓
NOTE INTERNE
          ↓
VALIDATION
          ↓
ENREGISTRER
```

Cette structure doit permettre de créer ou modifier une fiche client légère, cohérente avec le reste du système et sans réécrire l’historique des commandes.
