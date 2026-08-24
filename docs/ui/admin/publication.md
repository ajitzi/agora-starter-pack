# AdminPublishAvailabilityScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/publication.md
```

Implémentation :

```text
packages/screens/admin/availability/
├── publish-availability-screen.tsx
├── components/
└── index.ts
```

À ce stade, l’écran reste partagé entre web et mobile. Une variante `native` ne sera introduite que si l’expérience diverge réellement.

---

## 2. Objectif

L’écran doit répondre à :

> **Qu’est-ce que je vais publier ?**

puis :

> **Qui va être prévenu ?**

Il doit permettre de :

- voir les changements depuis la dernière publication ;
- vérifier le snapshot qui va être créé ;
- ajouter éventuellement un message ;
- choisir les canaux de notification ;
- connaître approximativement le nombre de destinataires ;
- publier ;
- distinguer succès de publication et succès des notifications.

---

# 3. Principe fondamental

La publication et les notifications sont deux choses différentes.

Le flux doit être :

```text
État courant
    ↓
Création du snapshot de publication
    ↓
Publication réussie
    ↓
Tentatives de notification
```

Ainsi, si l’envoi d’un email échoue :

> la publication existe quand même.

C’est une règle métier et UX importante.

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Publier                       │
├─────────────────────────────────┤
│                                 │
│ 7 modifications                 │
│ depuis la dernière publication  │
│                                 │
│ Dernière publication            │
│ Aujourd’hui · 08:32             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CHANGEMENTS                     │
│                                 │
│ Tomates                         │
│ Selon dispo → Disponible        │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Aubergines                      │
│ Disponible → Indisponible       │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Courgettes                      │
│ 8 kg → 3 kg                     │
│                                 │
│ ─────────────────────────────   │
│                                 │
│ Salades                         │
│ Quantité visible → masquée      │
│                                 │
│ [ Voir les 7 changements ]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MESSAGE                         │
│ Facultatif                      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Les tomates sont de retour │ │
│ │ cette semaine.             │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRÉVENIR LES CLIENTS            │
│                                 │
│ ☑ Email                         │
│   72 destinataires              │
│                                 │
│ ☑ Notification web             │
│   28 destinataires              │
│                                 │
│ ☐ SMS                           │
│   Non configuré                 │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉSUMÉ                          │
│                                 │
│ 16 produits publiés             │
│ 7 modifications                 │
│                                 │
└─────────────────────────────────┘
│ ┌─────────────────────────────┐ │
│ │ Publier maintenant         │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

L’action principale reste sticky.

---

# 5. Résumé des changements

La première information doit être :

```text
7 modifications
depuis la dernière publication
```

Le maraîcher doit pouvoir répondre très vite à :

> Est-ce bien ce que je voulais changer ?

---

# 6. Types de changements

Les changements peuvent être affichés sous forme de diff.

### Statut

```text
Tomates

Selon disponibilité
→
Disponible
```

### Quantité

```text
Courgettes

8 kg
→
3 kg
```

### Visibilité

```text
Salades

Quantité visible
→
Quantité masquée
```

### Prix

```text
Tomates anciennes

3,50 €/kg
→
4 €/kg
```

---

# 7. Produits ajoutés à la publication

Si un produit actif n’était pas présent précédemment :

```text
+ Poivrons

Disponible
4 €/kg
```

---

# 8. Produit retiré / devenu indisponible

Exemple :

```text
Aubergines

Disponible
→
Indisponible
```

Je préfère parler de changement de statut plutôt que de « suppression ».

---

# 9. Résumé compact

S’il y a beaucoup de changements, ne pas afficher 40 lignes directement.

Afficher les plus importantes :

```text
4 changements de statut
2 changements de quantité
1 changement de prix
```

puis :

```text
[ Voir les 7 changements ]
```

Cette action peut ouvrir un `Sheet`.

---

# 10. Aperçu du snapshot

Le snapshot publié doit représenter **l’état courant complet**, pas seulement le diff.

Il peut être utile d’avoir :

```text
[ Aperçu de la publication ]
```

qui affiche ce que le client verra.

Exemple :

```text
Tomates
Disponible
4 €/kg
18 kg disponibles

Courgettes
Selon disponibilité
3 €/kg
```

Ce n’est pas nécessairement la vue par défaut, mais c’est utile pour vérification.

---

# 11. Message facultatif

Le maraîcher peut ajouter un court message :

```text
MESSAGE
Facultatif

[ Les tomates sont de retour cette semaine. ]
```

Le message accompagne la notification / publication.

Il ne doit pas être obligatoire.

---

# 12. Suggestions éventuelles

Plus tard, on pourrait proposer des suggestions :

```text
Les tomates sont de retour 🍅

Nouvelles disponibilités de la semaine

Les légumes disponibles ont été mis à jour
```

Mais ce n’est pas nécessaire en V1.

---

# 13. Canaux de notification

Exemple :

```text
☑ Email
72 destinataires

☑ Notification web
28 destinataires

☐ SMS
Non configuré
```

Chaque canal doit afficher :

- état activé/désactivé ;
- disponibilité ;
- nombre approximatif de destinataires.

---

# 14. Canal non configuré

Ne pas simplement désactiver sans explication.

Préférer :

```text
SMS
Non configuré

[ Configurer ]
```

si l’utilisateur a les droits nécessaires.

---

# 15. Aucun canal sélectionné

La publication doit rester possible.

Exemple :

```text
Aucun client ne sera notifié.

La publication sera tout de même
mise à jour sur le site.
```

Action :

```text
[ Publier sans notification ]
```

Le système ne doit pas obliger une notification.

---

# 16. Nombre de destinataires

Exemple :

```text
Email
72 destinataires
```

Le chiffre peut être une estimation issue des préférences utilisateurs.

Éviter de donner un chiffre si le système ne peut pas le garantir.

Dans ce cas :

```text
Environ 72 destinataires
```

---

# 17. Doublons entre canaux

Si une personne reçoit email + notification web, elle peut apparaître dans les deux compteurs.

Ne pas forcément afficher :

```text
100 personnes uniques
```

si ce calcul n’est pas nécessaire.

Le plus clair est :

```text
72 emails
28 notifications web
```

---

# 18. Action principale

```text
[ Publier maintenant ]
```

Au tap :

```text
création snapshot
      ↓
confirmation serveur
      ↓
publication créée
      ↓
notifications déclenchées
```

Ne jamais considérer la publication réussie avant confirmation serveur.

---

# 19. État pendant publication

```text
Publication en cours…
```

Le bouton est désactivé.

Éviter le double tap.

Le contenu reste visible.

---

# 20. Succès complet

```text
✓ Disponibilités publiées

16 produits publiés

72 emails envoyés
28 notifications envoyées

Publié aujourd’hui à 10:42
```

Actions possibles :

```text
[ Voir la publication ]

[ Retour aux disponibilités ]
```

---

# 21. Succès avec erreurs de notification

Cas important :

```text
✓ Disponibilités publiées

⚠ Certaines notifications n’ont pas pu être envoyées.

Email
68 / 72 envoyés

Notification web
28 / 28 envoyées
```

Actions :

```text
[ Voir les erreurs ]
```

éventuellement :

```text
[ Réessayer les notifications ]
```

La publication elle-même reste réussie.

---

# 22. Échec de publication

Si le snapshot n’a pas pu être créé :

```text
La publication a échoué.

Aucune nouvelle publication
n’a été créée.

Vos modifications restent enregistrées.

[ Réessayer ]
```

C’est très important : les modifications locales du catalogue restent présentes.

---

# 23. Erreur après snapshot mais avant notifications

Le message doit être précis :

```text
✓ Publication créée

⚠ Les notifications n’ont pas pu être envoyées.
```

et non :

```text
Publication échouée
```

---

# 24. Changements pendant que l’écran est ouvert

Cas concurrent important.

L’utilisateur ouvre :

```text
7 modifications
```

Puis quelqu’un modifie une disponibilité depuis un autre appareil.

Avant publication :

```text
⚠ Les disponibilités ont changé depuis l’ouverture de cette page.

7 → 8 modifications

[ Actualiser l’aperçu ]
```

On doit empêcher la publication d’un snapshot obsolète sans avertissement.

---

# 25. Version / contrôle de concurrence

La publication devrait utiliser une version de catalogue.

Conceptuellement :

```ts
expectedCatalogVersion
```

Mutation :

```text
publish(expectedCatalogVersion)
```

Si la version diffère :

```text
409 Conflict
```

et l’UI recharge le résumé.

---

# 26. Publication avec zéro changement

Normalement, cet écran n’est pas accessible via le CTA principal s’il n’existe aucun changement.

Si l’utilisateur arrive via URL :

```text
✓ Rien à publier

Le catalogue courant correspond
à la dernière publication.

[ Retour aux disponibilités ]
```

---

# 27. Première publication

Cas particulier :

```text
Première publication

16 produits seront publiés.
```

Le diff avec une publication précédente n’existe pas.

On affiche donc directement :

```text
16 produits
11 disponibles
3 selon disponibilité
2 indisponibles
```

---

# 28. Tablette portrait

La structure reste verticale, mais le diff peut être plus dense.

```text
┌──────────────────────────────────────────┐
│ CHANGEMENTS                             │
│                                          │
│ Tomates       Selon dispo → Disponible   │
│ Aubergines    Disponible → Indisponible  │
│ Courgettes    8 kg → 3 kg                │
└──────────────────────────────────────────┘
```

Les canaux peuvent passer sur une ligne par canal.

---

# 29. Tablette paysage

Deux colonnes deviennent intéressantes :

```text
┌────────────────────────────┬──────────────────────────┐
│ PUBLICATION                │ NOTIFICATIONS            │
│                            │                          │
│ 7 modifications            │ ☑ Email       72        │
│                            │ ☑ Web push     28        │
│ Tomates ...                │ ☐ SMS         —         │
│ Aubergines ...             │                          │
│ Courgettes ...             │ MESSAGE                 │
│                            │ [ ... ]                  │
│ [Voir tout]                │                          │
├────────────────────────────┴──────────────────────────┤
│                                   Publier maintenant │
└───────────────────────────────────────────────────────┘
```

---

# 30. Desktop

Même structure que tablette paysage.

Pas besoin d’une UI radicalement différente.

Le contenu peut rester dans un conteneur de largeur maximale raisonnable.

---

# 31. Historique après publication

Une publication crée un snapshot consultable plus tard.

Exemple :

```text
Publication du 24 août · 10:42
```

Cette publication ne doit plus changer même si :

- le prix évolue ;
- la disponibilité change ;
- un produit est désactivé.

---

# 32. Projection de données

Exemple :

```ts
type AvailabilityPublicationPreview = {
  catalogVersion: number

  lastPublication?: {
    id: string
    publishedAt: string
  }

  changeCount: number
  changes: AvailabilityChange[]

  snapshot: {
    productCount: number
    products: PublishedProductPreview[]
  }

  notificationChannels: NotificationChannelPreview[]
}
```

---

# 33. Diff de publication

```ts
type AvailabilityChange = {
  productId: string
  productName: string

  fields: {
    field:
      | "status"
      | "estimatedQuantity"
      | "quantityVisibility"
      | "price"

    previous: unknown
    current: unknown
  }[]
}
```

L’UI peut ensuite produire une représentation lisible.

---

# 34. Canal de notification

```ts
type NotificationChannelPreview = {
  channel:
    | "email"
    | "web_push"
    | "sms"

  available: boolean
  enabledByDefault: boolean

  recipientCount?: number

  unavailableReason?: string
}
```

---

# 35. Mutation de publication

Conceptuellement :

```text
POST /admin/availability-publications
```

avec :

```ts
{
  expectedCatalogVersion: number
  message?: string

  notifications: {
    email: boolean
    webPush: boolean
    sms: boolean
  }
}
```

---

# 36. Réponse de publication

Exemple :

```ts
type PublishAvailabilityResult = {
  publication: {
    id: string
    publishedAt: string
    productCount: number
  }

  notifications: {
    channel: string
    requested: number
    sent: number
    failed: number
  }[]
}
```

La réponse distingue explicitement :

```text
publication
```

et :

```text
notifications
```

---

# 37. Notifications asynchrones

Techniquement, les notifications peuvent être envoyées par job/queue.

Dans ce cas, le premier succès peut être :

```text
✓ Disponibilités publiées

Notifications en cours d’envoi.
```

Puis leur statut peut être consulté ultérieurement.

L’UX ne doit pas bloquer la publication pendant plusieurs secondes juste pour attendre tous les emails.

---

# 38. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Section
Card
Checkbox
TextArea
Badge
Alert
StickyActionBar
Sheet
Progress
Skeleton
```

---

# 39. Composants métier

Dans :

```text
packages/domains/catalog/ui/
```

bons candidats :

```text
AvailabilityChangeList
AvailabilityChangeItem
PublicationPreview
```

Dans :

```text
packages/domains/notifications/ui/
```

bons candidats :

```text
NotificationChannelSelector
NotificationDeliverySummary
```

---

# 40. Composants spécifiques au screen

```text
packages/screens/admin/availability/
├── publish-availability-screen.tsx
├── components/
│   ├── publication-summary.tsx
│   ├── publication-changes.tsx
│   ├── publication-message.tsx
│   ├── notification-channel-list.tsx
│   ├── publication-actions.tsx
│   └── publication-success.tsx
└── index.ts
```

---

# 41. États principaux

Prévoir :

```text
loading
ready
publishing
published
published-with-notification-errors
conflict
error
empty
```

---

# 42. Accessibilité

Points importants :

- chaque changement doit être compréhensible sans couleur ;
- les checkboxes de canaux ont des labels complets ;
- le nombre de destinataires est associé au canal ;
- le message d’erreur de notification indique clairement que la publication a réussi ;
- le focus passe vers le résumé de succès après publication.

---

# 43. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’utilisateur comprend immédiatement ce qui va changer ;
- il peut vérifier la publication avant de la déclencher ;
- il comprend que le message est facultatif ;
- il peut publier sans notifier ;
- il sait quels canaux seront utilisés ;
- il sait si un canal est indisponible ;
- un échec d’email ne fait jamais croire que la publication a échoué ;
- un changement concurrent bloque une publication obsolète ;
- le résultat final distingue clairement publication et notifications ;
- l’écran reste confortable sur téléphone et très lisible sur tablette.

---

# 44. Structure de référence

```text
HEADER
   ↓
RÉSUMÉ DES CHANGEMENTS
   ↓
DIFF / APERÇU
   ↓
MESSAGE FACULTATIF
   ↓
CANAUX DE NOTIFICATION
   ↓
RÉSUMÉ
   ↓
PUBLIER
   ↓
RÉSULTAT PUBLICATION
```

Cette structure doit permettre une publication explicite, vérifiable et historisée, sans jamais confondre la création du snapshot avec la réussite des notifications.
