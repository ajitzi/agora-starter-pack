# AdminPublicationDetailsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/publication-details.md
```

Implémentation :

```text
packages/screens/admin/publications/
├── admin-publication-details-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Qu’est-ce qui a exactement été publié à ce moment-là ?**

Il permet de consulter :

- le snapshot complet ;
- les changements depuis la publication précédente ;
- le message éventuel ;
- les canaux sélectionnés ;
- les résultats de notification ;
- les erreurs d’envoi.

Aucune édition.

---

## 3. Principe fondamental

Le contenu est :

```text
IMMUTABLE
```

L’écran représente ce qui a réellement été publié, pas l’état courant du catalogue.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Publication                   │
│ 24 août · 18:42                 │
├─────────────────────────────────┤
│                                 │
│ ✓ Publication réussie           │
│                                 │
│ 34 produits                     │
│ 7 changements                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CHANGEMENTS                     │
│                                 │
│ Tomates                         │
│ Disponible → Selon disponibilité│
│                                 │
│ Courgettes                      │
│ Quantité : 20 kg → 12 kg        │
│                                 │
│ Salade                          │
│ Prix : 1,70 € → 1,80 €          │
│                                 │
│ [ Voir les 7 changements ]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MESSAGE                         │
│                                 │
│ “Les tomates arrivent...”       │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTIFICATIONS                   │
│                                 │
│ Email                           │
│ ✓ 124 envoyés                   │
│ ⚠ 3 erreurs                     │
│                                 │
│ SMS                             │
│ ✓ 18 envoyés                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SNAPSHOT PUBLIÉ                 │
│                                 │
│ Tomates                         │
│ Selon disponibilité             │
│ 4,50 €/kg                       │
│                                 │
│ Courgettes                      │
│ Disponible                      │
│ 12 kg visibles                  │
│ 3,80 €/kg                       │
│                                 │
│ ...                             │
└─────────────────────────────────┘
```

---

## 5. Header

Afficher :

```text
Publication
24 août 2026 · 18:42
```

Éventuellement :

```text
Publiée par Admin
```

si plusieurs admins existent plus tard.

---

## 6. Statut

La publication réussie est toujours dominante :

```text
✓ Publication réussie
```

Puis seulement ensuite :

```text
⚠ Certaines notifications ont échoué
```

---

## 7. Diff

Le diff compare à la publication précédente.

Types de changement :

```text
status_changed
quantity_changed
quantity_visibility_changed
price_changed
product_added
product_removed
```

---

## 8. Exemple statut

```text
Tomates

Disponible
→
Selon disponibilité
```

---

## 9. Exemple quantité

```text
Courgettes

20 kg
→
12 kg
```

---

## 10. Exemple visibilité

```text
Carottes

Quantité visible
→
Quantité masquée
```

---

## 11. Exemple prix

```text
Salade

1,70 € / unité
→
1,80 € / unité
```

---

## 12. Première publication

Pas de diff précédent.

Afficher :

```text
Première publication

34 produits publiés.
```

---

## 13. Snapshot complet

Le snapshot est la source historique.

Il doit contenir pour chaque produit :

- nom snapshoté ;
- unité ;
- prix ;
- disponibilité ;
- quantité éventuelle ;
- visibilité de quantité.

---

## 14. Ne pas résoudre vers l’état produit courant

Si le produit a depuis été renommé :

```text
Tomates anciennes
```

le snapshot peut garder :

```text
Tomates
```

si c’est ce qui avait été publié.

---

## 15. Message

Afficher le message exact envoyé/associé.

Si aucun :

```text
Aucun message ajouté.
```

---

## 16. Notifications

Par canal :

```text
Email
124 envoyés
3 erreurs

SMS
18 envoyés

Web push
42 envoyés
```

---

## 17. Détails d’erreurs

Action :

```text
[ Voir les erreurs ]
```

Sheet :

```text
Email
3 échecs

adresse1@example.fr
Adresse invalide

...
```

Ne pas afficher des erreurs techniques brutes.

---

## 18. Réessayer les notifications ?

En V1, optionnel.

Si supporté :

```text
[ Réessayer les 3 envois ]
```

Important : cela ne crée pas une nouvelle publication.

Il crée seulement une nouvelle tentative de notification associée à la publication.

---

## 19. Si non supporté

Afficher simplement le résultat historique.

Pas de faux bouton.

---

## 20. Aucune notification

```text
NOTIFICATIONS

Aucun canal sélectionné
pour cette publication.
```

---

## 21. Pas d’édition

Aucune action :

```text
Modifier
Supprimer
Republier en remplaçant
```

---

## 22. Republier l’état historique ?

Je déconseille en V1.

Si l’admin veut revenir à un ancien état :

- il modifie l’état courant ;
- il crée une nouvelle publication.

Cela garde l’histoire linéaire.

---

## 23. Projection

```ts
type AvailabilityPublicationDetails = {
  publication: {
    id: string
    publishedAt: string
    message?: string
    productCount: number
    previousPublicationId?: string
  }

  changes: AvailabilityChange[]

  snapshot: {
    products: PublishedProductSnapshot[]
  }

  notifications: NotificationChannelResult[]
}
```

---

## 24. Snapshot produit

```ts
type PublishedProductSnapshot = {
  productId?: string
  productName: string
  unit: string
  unitPrice: number

  availabilityStatus:
    | "available"
    | "limited"
    | "unavailable"

  estimatedQuantity?: number
  quantityVisible: boolean
}
```

---

## 25. Query

```text
GET /admin/availability-publications/:id
```

---

## 26. Tablette paysage

Deux colonnes :

```text
┌─────────────────────────────┬──────────────────────────┐
│ CHANGEMENTS                 │ SNAPSHOT                │
│                             │                          │
│ 7 changements               │ 34 produits             │
│ notifications               │ liste complète          │
└─────────────────────────────┴──────────────────────────┘
```

---

## 27. États principaux

```text
loading
ready
notFound
error
```

---

## 28. Accessibilité

- date et heure complètes ;
- diff lisible sans couleur ;
- ancienne et nouvelle valeur annoncées ;
- erreurs de notifications textuelles ;
- snapshot en liste structurée ;
- écran totalement consultatif clairement identifiable.

---

## 29. Critères d’acceptation UX

L’écran est réussi si :

- l’admin peut reconstruire ce qui a été communiqué ;
- l’état courant ne peut pas être confondu avec le snapshot ;
- les erreurs de notification restent séparées du succès de publication ;
- aucun contenu historique n’est éditable ;
- première publication et diff normal sont gérés proprement.

---

## 30. Structure de référence

```text
DATE / STATUT
     ↓
DIFF
     ↓
MESSAGE
     ↓
NOTIFICATIONS
     ↓
SNAPSHOT COMPLET
```
