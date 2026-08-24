# AdminPublicationListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/publications.md
```

Implémentation :

```text
packages/screens/admin/publications/
├── admin-publication-list-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles disponibilités ont été publiées, quand, et avec quel résultat de notification ?**

Il permet de :

- consulter l’historique des publications ;
- voir la date et l’heure ;
- voir le nombre de changements ;
- voir le résultat des notifications ;
- ouvrir un snapshot historique ;
- distinguer publication réussie et notification partiellement échouée.

---

## 3. Principe métier

Une publication est :

```text
snapshot immuable
+
événement de notification
```

La publication doit rester valide même si :

```text
email
SMS
web push
```

échouent partiellement.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Publications                  │
├─────────────────────────────────┤
│                                 │
│ DERNIÈRE                        │
│                                 │
│ 24 août · 18:42                 │
│                                 │
│ 7 changements                   │
│                                 │
│ ✓ Publication réussie           │
│ ⚠ 3 notifications non envoyées  │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 22 août · 17:15                 │
│                                 │
│ 4 changements                   │
│                                 │
│ ✓ Publication réussie           │
│ ✓ Notifications envoyées        │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 19 août · 20:03                 │
│                                 │
│ Première publication            │
│                                 │
│ ✓ Publication réussie           │
│ Aucune notification             │
│                              >  │
│                                 │
└─────────────────────────────────┘
```

---

## 5. Informations prioritaires

Pour chaque publication :

```text
DATE / HEURE
   ↓
NOMBRE DE CHANGEMENTS
   ↓
ÉTAT DE PUBLICATION
   ↓
ÉTAT DE NOTIFICATION
```

---

## 6. Publication réussie

```text
✓ Publication réussie
```

Cela signifie que le snapshot existe et est devenu la dernière publication.

---

## 7. Notification partielle

```text
⚠ 3 notifications non envoyées
```

Ne jamais afficher :

```text
Publication échouée
```

si seul l’envoi de notifications a rencontré un problème.

---

## 8. Aucune notification choisie

```text
Publication réussie
Aucune notification
```

C’est un état parfaitement valide.

---

## 9. Première publication

Au lieu de :

```text
12 changements
```

on peut afficher :

```text
Première publication
34 produits publiés
```

---

## 10. Nombre de changements

Le compteur représente le diff depuis la publication précédente :

- statut ;
- quantité ;
- visibilité ;
- prix ;
- nouveau produit ;
- produit retiré du snapshot si applicable.

---

## 11. Tri

Toujours :

```text
plus récente
↓
plus ancienne
```

---

## 12. Pagination

Historique potentiellement long.

Utiliser pagination ou chargement progressif.

Pas besoin d’infinite scroll complexe si un bouton :

```text
[ Charger les précédentes ]
```

suffit.

---

## 13. Filtre

V1 : probablement aucun filtre nécessaire.

Éventuellement :

```text
[ Toutes ]
[ Avec erreurs de notification ]
```

plus tard.

---

## 14. Action principale

Le tap sur une publication ouvre :

```text
AdminPublicationDetailsScreen
```

Aucune action de modification.

---

## 15. Pas de suppression

Une publication historique ne doit pas être supprimée normalement.

Elle constitue une trace de ce qui a été communiqué.

---

## 16. État vide

```text
Aucune publication pour le moment.

Les états courants du catalogue
n’ont pas encore été publiés.

[ Publier les disponibilités ]
```

ouvre `AdminPublishAvailabilityScreen`.

---

## 17. Projection

```ts
type PublicationListItem = {
  publicationId: string
  publishedAt: string

  changeCount: number
  productCount: number
  firstPublication: boolean

  publicationStatus: "published"

  notificationSummary: {
    requestedChannels: number
    successfulDeliveries: number
    failedDeliveries: number
    status:
      | "none"
      | "success"
      | "partial_failure"
      | "failure"
  }

  messagePreview?: string
}
```

---

## 18. Query

```text
GET /admin/availability-publications
```

---

## 19. Chargement

Skeleton de lignes/cartes.

---

## 20. Erreur

```text
Impossible de charger l’historique
des publications.

[ Réessayer ]
```

---

## 21. Tablette / desktop

Table dense :

```text
┌───────────────────────────────────────────────────────────┐
│ Date            Changements    Notifications      État   │
├───────────────────────────────────────────────────────────┤
│ 24 août 18:42   7              3 erreurs          Publié │
│ 22 août 17:15   4              Succès             Publié │
│ 19 août 20:03   Première       Aucune              Publié │
└───────────────────────────────────────────────────────────┘
```

---

## 22. Composants métier

```text
PublicationCard
PublicationStatus
NotificationDeliverySummary
PublicationChangeCount
```

---

## 23. États principaux

```text
loading
ready
empty
error
```

---

## 24. Accessibilité

- date complète annoncée ;
- état de publication textuel ;
- erreurs notification textuelles ;
- nombre de changements explicite ;
- carte accessible au clavier.

---

## 25. Critères d’acceptation UX

L’écran est réussi si :

- l’admin retrouve rapidement ce qui a été publié ;
- la dernière publication est évidente ;
- une erreur de notification ne ressemble jamais à un échec de publication ;
- aucune publication historique ne peut être modifiée ;
- ouvrir le snapshot demande un seul tap.

---

## 26. Structure de référence

```text
HISTORIQUE
   ↓
DATE / HEURE
   ↓
CHANGEMENTS
   ↓
PUBLICATION
   ↓
NOTIFICATIONS
   ↓
DÉTAIL IMMUTABLE
```
