# AdminAmapWeekManagementScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-week-management.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-week-management-screen.tsx
├── components/
└── index.ts
```

L’écran est mobile-first et peut rester partagé entre web et mobile.

---

## 2. Objectif

L’écran doit répondre à :

> **Que doit-il se passer pour ce panier, cette semaine uniquement ?**

Il doit permettre à l’admin de :

- voir la date concernée ;
- voir le panier prévu ;
- suspendre la semaine ;
- réactiver une suspension ;
- changer ponctuellement le retrait ;
- transférer le panier à un bénéficiaire ;
- appliquer les substitutions autorisées ;
- retirer une exception existante ;
- voir si la commande AMAP est déjà générée ;
- comprendre l’impact des modifications ;
- enregistrer sans modifier les paramètres permanents de l’abonnement.

---

# 3. Principe UX fondamental

Le header doit immédiatement annoncer la portée :

```text
Marie Dupont
Mercredi 26 août

Cette semaine uniquement
```

Le terme :

```text
Cette semaine
```

doit apparaître plusieurs fois si nécessaire.

On veut éviter qu’un admin pense modifier :

```text
le retrait habituel
```

alors qu’il change uniquement :

```text
le retrait du 26 août
```

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Gérer cette semaine           │
│ Marie Dupont                    │
│                                 │
│ Mercredi 26 août                │
│ Cette semaine uniquement        │
├─────────────────────────────────┤
│                                 │
│ ÉTAT                            │
│                                 │
│ Panier prévu                    │
│                                 │
│ Panier complet                  │
│ 8 paniers restants              │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SUSPENSION                      │
│                                 │
│ Recevoir le panier              │
│ [ Oui ]                         │
│                                 │
│ Suspendre cette semaine         │
│ ne consommera aucun panier.     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RETRAIT                         │
│                                 │
│ Cette semaine                   │
│ Marché Saint-Pierre             │
│                                 │
│ Habituellement                  │
│ Marché Saint-Pierre             │
│                                 │
│ [ Changer pour cette semaine ]  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TRANSFERT                       │
│                                 │
│ Aucun bénéficiaire              │
│                                 │
│ [ Céder ce panier ]             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SUBSTITUTIONS                   │
│                                 │
│ Aubergines                      │
│ 500 g                           │
│                                 │
│ [ Remplacer ]                   │
│                                 │
│ Concombres                      │
│ 1                               │
│                                 │
│ [ Remplacer ]                   │
│                                 │
│ 0 / 2 substitutions             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMANDE                        │
│                                 │
│ Pas encore générée              │
│                                 │
│ Les changements seront utilisés │
│ lors de sa création.            │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

CTA sticky.

---

# 5. Date concernée

La date doit rester très visible :

```text
Mercredi 26 août
```

Pas seulement dans le breadcrumb.

Si l’utilisateur descend loin dans l’écran, un header sticky compact peut conserver :

```text
Marie Dupont · 26 août
```

---

# 6. État de la semaine

Les états conceptuels peuvent être :

```text
Prévue
Suspendue
Commande générée
Préparée
Livrée
```

Mais l’écran d’édition hebdomadaire n’a pas besoin d’exposer tout cela comme un workflow complexe.

Le plus important est de savoir :

```text
peut-on encore modifier cette semaine ?
```

---

# 7. Avant la deadline adhérent

Pour contexte :

```text
Modifiable par l’adhérent jusqu’à
mardi 25 août · 18:00
```

L’admin peut intervenir lui aussi.

---

# 8. Après la deadline

Afficher :

```text
Deadline adhérent dépassée

L’adhérent ne peut plus modifier
cette semaine.

Vous pouvez encore intervenir.
```

Ne jamais désactiver les actions admin uniquement parce que la deadline membre est passée.

---

# 9. Suspension

La suspension doit être extrêmement simple à comprendre.

Option :

```text
Recevoir le panier cette semaine

[ Oui ]
```

Quand désactivé :

```text
Recevoir le panier cette semaine

[ Non ]

Cette semaine est suspendue.
Aucun panier ne sera consommé.
```

---

# 10. Suspension : conséquence

Le message métier doit apparaître immédiatement :

> **Une semaine suspendue ne consomme pas de panier.**

Pas besoin de l’expliquer dans une aide cachée.

---

# 11. Suspension avant génération

Cas le plus simple :

```text
Commande pas encore générée
```

La suspension signifie :

```text
aucune commande ne sera générée
pour cette semaine
```

et aucun panier n’est consommé.

---

# 12. Suspension après génération

Cas important.

Si la commande existe déjà :

```text
Commande AMAP #1048
À préparer
```

puis l’admin suspend la semaine, il faut une action métier explicite.

Par exemple :

```text
Suspendre cette semaine ?

La commande AMAP déjà générée
sera annulée.

Aucun panier ne sera consommé.

[ Annuler ]
[ Suspendre ]
```

---

# 13. Suspension après préparation

Si la commande est déjà :

```text
Préparée
```

bloquer probablement la suspension simple.

Afficher :

```text
⚠ Cette commande est déjà préparée.

Traitez d’abord la commande
avant de suspendre cette semaine.
```

Action :

```text
[ Voir la commande ]
```

Cela évite d’effacer une réalité opérationnelle déjà avancée.

---

# 14. Après livraison

Si la commande est :

```text
Livrée
```

cet écran devient en lecture seule.

Afficher :

```text
Cette livraison est terminée.

1 panier a été consommé.
```

Les corrections éventuelles relèvent d’un workflow admin exceptionnel, pas de “Gérer cette semaine”.

---

# 15. Réactivation d’une suspension

Si la semaine est suspendue :

```text
SUSPENDUE

Aucun panier ne sera consommé.
```

Action :

```text
[ Réactiver cette semaine ]
```

La réactivation est possible tant que cela reste opérationnellement cohérent.

---

# 16. Retrait ponctuel

Bloc :

```text
RETRAIT

Cette semaine
Marché Saint-Pierre

Habituellement
Marché Saint-Pierre
```

Si aucune exception :

```text
Retrait habituel
```

peut suffire.

---

# 17. Changer le retrait

Action :

```text
[ Changer pour cette semaine ]
```

ouvre un `Sheet`.

```text
Choisir le retrait du 26 août

○ Marché Saint-Pierre
○ Retrait ferme
○ Tournée Nord · Montville
```

Afficher uniquement les options compatibles avec cette date.

---

# 18. Retrait exceptionnel

Après changement :

```text
RETRAIT

Cette semaine
Tournée Nord · Montville

Exception

Habituellement
Marché Saint-Pierre
```

Action secondaire :

```text
[ Revenir au retrait habituel ]
```

---

# 19. Règle importante

Le changement de retrait sur cet écran :

> **ne modifie jamais `defaultRecovery`.**

À la semaine suivante, le retrait habituel revient automatiquement.

---

# 20. Retrait et commande déjà générée

Si la commande existe mais n’est pas encore préparée, l’admin peut éventuellement changer son occurrence/retrait.

Mais cette mutation doit être explicite.

Exemple :

```text
Changer le retrait ?

La commande est déjà générée.

Marché Saint-Pierre
→ Tournée Nord · Montville

[ Confirmer ]
```

Le lien de distribution doit être réellement mis à jour côté serveur.

---

# 21. Retrait après préparation

Si la commande est déjà préparée :

```text
⚠ Commande déjà préparée
```

Le changement peut être autorisé à l’admin, mais avec avertissement fort :

```text
Le panier est déjà préparé.

Changer son point de retrait peut modifier
l’organisation de distribution.
```

Ne pas faire ce changement silencieusement.

---

# 22. Transfert

Bloc par défaut :

```text
TRANSFERT

Aucun bénéficiaire

[ Céder ce panier ]
```

Le transfert concerne uniquement la semaine courante.

---

# 23. Formulaire de transfert

Sheet :

```text
Céder le panier du 26 août

Bénéficiaire
[ Paul Dupont ]

Téléphone
[ 06 ... ]

Note
[ ... ]

[ Confirmer le transfert ]
```

En V1, le bénéficiaire n’a pas forcément besoin d’avoir un compte.

---

# 24. Bénéficiaire existant ou libre

Permettre deux cas :

```text
client existant
```

ou :

```text
nom + coordonnées libres
```

Car le transfert peut concerner :

- conjoint ;
- ami ;
- voisin.

Il ne faut pas forcer la création d’un compte complet juste pour recevoir un panier une fois.

---

# 25. Après transfert

Afficher :

```text
TRANSFERT

Cédé à
Paul Dupont

Titulaire
Marie Dupont
```

Important :

> le titulaire reste Marie Dupont.

---

# 26. Consommation après transfert

Le message peut rappeler :

```text
Si ce panier est livré,
1 panier sera consommé
sur l’abonnement de Marie Dupont.
```

Cela évite une ambiguïté administrative.

---

# 27. Annuler un transfert

Action :

```text
[ Annuler le transfert ]
```

revient à :

```text
Bénéficiaire : Marie Dupont
```

tant que le panier n’est pas livré.

---

# 28. Transfert et suspension

Ces deux états sont incompatibles.

Si la semaine est suspendue :

```text
TRANSFERT
Indisponible pendant une suspension.
```

Si un transfert existe puis l’admin suspend :

- le transfert est supprimé ou neutralisé ;
- la confirmation doit l’indiquer.

Exemple :

```text
Suspendre cette semaine ?

Le transfert à Paul Dupont
sera également annulé.
```

---

# 29. Composition hebdomadaire

Bloc :

```text
PANIER DE LA SEMAINE

Tomates       1 kg
Aubergines    500 g
Concombres    1
Salade        1
```

La composition vient du snapshot ou de la composition hebdomadaire prévue.

---

# 30. Substitutions

La substitution doit être ligne par ligne.

Exemple :

```text
Aubergines
500 g

[ Remplacer ]
```

Puis :

```text
Aubergines
↓
Poivrons

Substitution
```

---

# 31. Choix du remplacement

Sheet :

```text
Remplacer Aubergines

Choisissez un produit :

○ Poivrons
○ Courgettes
○ Carottes

1 substitution restante
```

La liste vient exclusivement des produits autorisés cette semaine.

---

# 32. Pas d’algorithme d’équivalence

En V1, ne pas afficher :

```text
Valeur équivalente : 2,43 €
Poids recommandé : 380 g
```

si ce calcul métier n’existe pas.

La substitution est une règle explicite :

```text
Aubergines
→ Poivrons
```

---

# 33. Quantité de remplacement

Le système doit idéalement connaître la quantité de remplacement prévue pour chaque type de panier.

Exemple :

```text
Panier complet
Aubergines 500 g
→ Poivrons 500 g
```

et :

```text
Demi-panier
Aubergines 250 g
→ Poivrons 250 g
```

Mais cette quantité vient d’une configuration métier hebdomadaire, pas d’un calcul monétaire improvisé.

---

# 34. Limite de substitutions

Exemple :

```text
0 / 2 substitutions
```

puis :

```text
1 / 2 substitutions
```

À la limite :

```text
2 / 2 substitutions

Limite atteinte
```

Les autres actions `Remplacer` deviennent indisponibles.

---

# 35. Retirer une substitution

Une ligne modifiée affiche :

```text
Aubergines
→ Poivrons

[ Annuler le remplacement ]
```

Retour au produit d’origine.

---

# 36. Produit sans substitution possible

Exemple :

```text
Salade
1

Aucun remplacement proposé
```

Pas de bouton `Remplacer` désactivé sans explication.

---

# 37. Suspensions et substitutions

Si l’utilisateur suspend la semaine, les substitutions n’ont plus d’effet.

Le plus simple en V1 :

> quand la suspension est activée, masquer ou désactiver les blocs retrait/transfert/substitutions.

---

# 38. Wireframe suspendu

```text
┌─────────────────────────────────┐
│ Mercredi 26 août                │
│ Cette semaine uniquement        │
├─────────────────────────────────┤
│                                 │
│ SUSPENDUE                       │
│                                 │
│ Aucun panier ne sera préparé.   │
│ Aucun panier ne sera consommé.  │
│                                 │
│ [ Réactiver cette semaine ]     │
│                                 │
├─────────────────────────────────┤
│ Retrait                         │
│ Non applicable                  │
│                                 │
│ Transfert                       │
│ Non applicable                  │
│                                 │
│ Substitutions                   │
│ Non applicables                 │
└─────────────────────────────────┘
```

---

# 39. Commande AMAP

Section :

```text
COMMANDE

Pas encore générée
```

ou :

```text
COMMANDE

#AMAP-1048
À préparer

[ Voir la commande ]
```

---

# 40. Avant génération

Les modifications sont enregistrées comme configuration de cette échéance.

Quand la génération a lieu :

```text
week override
+
weekly basket composition
+
subscription defaults
↓
order snapshot
```

---

# 41. Après génération

Les modifications doivent agir sur la commande réelle, si elles restent autorisées.

Éviter deux états divergents :

```text
override = Montville
commande = Saint-Pierre
```

L’API doit garantir leur cohérence.

---

# 42. Une seule source métier après génération

Une fois la commande créée, elle devient la représentation opérationnelle de cette livraison.

Les changements hebdomadaires doivent donc :

- modifier la commande si autorisé ;
- conserver les événements/overrides nécessaires pour l’historique.

Pas de duplication incontrôlée.

---

# 43. Résumé avant sauvegarde

Si plusieurs changements :

```text
RÉSUMÉ

Mercredi 26 août

Retrait
Marché Saint-Pierre
→ Montville

Transfert
Paul Dupont

Substitution
Aubergines → Poivrons
```

Ce résumé peut apparaître juste avant le CTA.

---

# 44. Enregistrement unique ou actions immédiates ?

Contrairement aux disponibilités, recommander ici :

> **édition locale puis bouton Enregistrer.**

Pourquoi ?

Parce que plusieurs choix sont liés :

- suspension ;
- retrait ;
- transfert ;
- substitutions.

Cela permet de revoir l’ensemble avant validation.

---

# 45. Exception : actions déjà matérialisées

Si l’écran réutilise des actions métier indépendantes côté API, il reste possible de les enregistrer progressivement.

Mais UX V1, préférer :

```text
dirty
↓
Enregistrer
```

avec mutation atomique ou commande métier cohérente.

---

# 46. Payload d’override

Conceptuellement :

```ts
type AmapWeekOverrideDraft = {
  suspended: boolean

  recoveryOverrideId?: string | null

  transfer?: {
    beneficiaryName: string
    beneficiaryPhone?: string
    beneficiaryEmail?: string
  } | null

  substitutions: {
    sourceProductId: string
    replacementProductId: string
  }[]
}
```

---

# 47. Mutation avant génération

Conceptuellement :

```text
PUT /admin/amap/subscriptions/:id/deliveries/:date/override
```

avec :

```ts
{
  expectedVersion: number
  suspended: boolean
  recoveryOverrideId?: string | null
  transfer?: ...
  substitutions: ...
}
```

L’idée importante :

> l’override appartient à une date/échéance précise.

---

# 48. Pourquoi une ressource datée

Éviter :

```text
subscription.nextTransfer
subscription.nextRecovery
subscription.nextSuspended
```

qui devient ambigu dès que plusieurs échéances existent.

Préférer un concept :

```text
AmapDeliveryIntent
```

ou :

```text
AmapDeliveryOverride
```

identifié par :

```text
subscriptionId + deliveryDate
```

---

# 49. Après génération

Le serveur peut appliquer les mêmes intentions métier sur la commande associée.

Le client ne devrait pas avoir à savoir si la mutation cible techniquement :

```text
override
```

ou :

```text
order
```

La projection indique les capacités.

---

# 50. Capacités

Exemple :

```ts
type AmapWeekManagementCapabilities = {
  canSuspend: boolean
  canResume: boolean
  canChangeRecovery: boolean
  canTransfer: boolean
  canSubstitute: boolean
  canEditAfterDeadline: boolean
}
```

L’écran rend les actions selon les capacités serveur.

---

# 51. Projection

```ts
type AmapWeekManagement = {
  subscriptionId: string
  version: number

  member: {
    name: string
  }

  date: string

  basketType:
    | "full"
    | "half"

  remainingBaskets: number

  deadline: {
    at: string
    memberCanModify: boolean
  }

  state:
    | "scheduled"
    | "suspended"
    | "generated"
    | "prepared"
    | "delivered"

  defaultRecovery: {
    id: string
    label: string
  }

  recovery: {
    id: string
    label: string
    isOverride: boolean
  }

  basket: {
    lines: AmapWeekBasketLine[]
  }

  transfer?: {
    beneficiaryName: string
    beneficiaryPhone?: string
  }

  generatedOrder?: {
    orderId: string
    status: string
  }

  capabilities: AmapWeekManagementCapabilities
}
```

---

# 52. Ligne de panier

```ts
type AmapWeekBasketLine = {
  productId: string

  productName: string

  quantity: number
  unit: string

  substitution?: {
    replacementProductId: string
    replacementProductName: string

    quantity: number
    unit: string
  }

  replacementOptions: {
    productId: string
    productName: string
    quantity: number
    unit: string
  }[]
}
```

---

# 53. Concurrence

Cas réaliste :

- admin A ouvre la semaine ;
- adhérent modifie avant deadline ;
- admin A enregistre ensuite.

Il faut détecter le conflit.

Afficher :

```text
⚠ Cette semaine a été modifiée
depuis l’ouverture.

[ Voir les changements ]
[ Recharger ]
```

Ne pas écraser silencieusement les choix de l’adhérent.

---

# 54. Diff de conflit

Si possible :

```text
Retrait

Votre écran :
Marché Saint-Pierre

Dernière version :
Retrait ferme
```

Mais une V1 peut simplement obliger à recharger.

---

# 55. Sauvegarde

États :

```text
Enregistrement…
```

puis :

```text
✓ Modifications enregistrées
```

Retour possible vers :

```text
AdminAmapSubscriptionDetailsScreen
```

avec projection rafraîchie.

---

# 56. Aucun changement

Si aucune différence :

```text
[ Enregistrer ]
```

désactivé.

Pas besoin de faire une mutation vide.

---

# 57. Annuler les modifications locales

Action secondaire :

```text
[ Réinitialiser ]
```

peut revenir à l’état serveur.

Mais elle n’est pas indispensable en V1.

---

# 58. Quitter avec modifications non sauvegardées

Afficher :

```text
Modifications non enregistrées

Les changements pour le 26 août
seront perdus.

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

---

# 59. Tablette portrait

Disposition possible :

```text
┌──────────────────────────────────────────┐
│ Marie Dupont · 26 août                  │
├────────────────────┬─────────────────────┤
│ ÉTAT / RETRAIT     │ TRANSFERT           │
│                    │                     │
│ Prévu              │ Aucun               │
│ Marché SP          │                     │
│                    │ [ Céder ]           │
├────────────────────┴─────────────────────┤
│ SUBSTITUTIONS                           │
│                                          │
│ Aubergines       → Aucun                │
│ Concombres       → Aucun                │
└──────────────────────────────────────────┘
│                          [ Enregistrer ] │
└──────────────────────────────────────────┘
```

---

# 60. Tablette paysage

Deux colonnes sont très efficaces :

```text
┌─────────────────────────────┬──────────────────────────┐
│ LIVRAISON                   │ PANIER                  │
│                             │                          │
│ 26 août                     │ Tomates                 │
│ Prévue                      │ Aubergines → Poivrons   │
│                             │ Salade                  │
│ Retrait : Marché SP         │                          │
│ Transfert : Paul Dupont     │ 1 / 2 substitutions    │
│                             │                          │
└─────────────────────────────┴──────────────────────────┘
```

---

# 61. Desktop

Même modèle que tablette paysage.

La colonne contexte peut rester sticky.

Le détail du panier peut être plus dense mais conserver les mêmes interactions.

---

# 62. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Switch
Select
Badge
Alert
Button
Sheet
StickyActionBar
ConfirmDialog
DiffSummary
```

---

# 63. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapWeekStatus
AmapWeekScopeNotice
AmapWeekRecovery
AmapTransferEditor
AmapSubstitutionEditor
AmapSubstitutionLine
AmapWeekBasket
AmapWeekChangeSummary
```

`AmapWeekScopeNotice` est particulièrement utile pour rappeler :

```text
Cette semaine uniquement
```

---

# 64. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-week-management-screen.tsx
├── components/
│   ├── amap-week-header.tsx
│   ├── amap-week-status-section.tsx
│   ├── amap-week-suspension-section.tsx
│   ├── amap-week-recovery-section.tsx
│   ├── amap-week-transfer-section.tsx
│   ├── amap-week-substitutions-section.tsx
│   ├── amap-week-order-section.tsx
│   ├── amap-week-change-summary.tsx
│   └── amap-week-actions.tsx
└── index.ts
```

---

# 65. États principaux

Prévoir :

```text
loading
ready
dirty
submitting
conflict
success
error
readOnly
```

`readOnly` est utile pour une livraison déjà terminée.

---

# 66. Accessibilité

Points importants :

- date complète toujours annoncée ;
- mention textuelle `Cette semaine uniquement` ;
- suspension non dépendante d’un simple switch visuel ;
- substitutions exprimées textuellement : “Aubergines remplacées par Poivrons” ;
- compteur de substitutions annoncé ;
- bénéficiaire clairement distinct du titulaire ;
- erreurs et conflits annoncés au lecteur d’écran ;
- action sticky ne masque pas les dernières options.

---

# 67. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’admin ne peut pas confondre une modification ponctuelle avec la configuration permanente ;
- la date concernée reste visible ;
- suspendre indique explicitement qu’aucun panier ne sera consommé ;
- une suspension avec commande déjà générée est traitée explicitement ;
- changer le retrait ne change jamais le retrait habituel ;
- le bénéficiaire d’un transfert ne devient jamais le titulaire de l’abonnement ;
- un panier transféré consomme le solde du titulaire uniquement lorsqu’il est livré ;
- seules les substitutions autorisées sont proposées ;
- la limite de substitutions est claire ;
- aucun calcul d’équivalence monétaire ou de poids inexistant n’est suggéré ;
- une commande déjà générée reste cohérente avec les changements de la semaine ;
- une commande préparée ou livrée limite correctement les actions disponibles ;
- un conflit avec une modification récente n’écrase rien silencieusement ;
- l’ensemble peut être géré confortablement sur téléphone.

---

# 68. Structure de référence

```text
DATE + PORTÉE
      ↓
ÉTAT DE LA SEMAINE
      ↓
SUSPENSION
      ↓
RETRAIT PONCTUEL
      ↓
TRANSFERT
      ↓
PANIER DE LA SEMAINE
      ↓
SUBSTITUTIONS
      ↓
COMMANDE GÉNÉRÉE
      ↓
RÉSUMÉ DES CHANGEMENTS
      ↓
ENREGISTRER
```

Cette structure doit permettre de gérer les exceptions d’une livraison AMAP précise sans modifier les paramètres permanents de l’abonnement.
