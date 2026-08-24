# CustomerCatalogScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/customer/catalog.md
```

## Implémentation

```text
packages/screens/customer/
├── customer-catalog-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Qu’est-ce qui est disponible actuellement et que puis-je commander ?**

Aucun compte obligatoire.

Le catalogue reflète la **dernière publication**, pas l’état courant non publié de l’admin.

---

## 2. Principe métier

Le client voit un snapshot publié :

```text
publication
→ catalogue visible
```

Un changement enregistré mais non publié côté admin ne doit pas apparaître.

---

## 3. Wireframe mobile

```text
┌─────────────────────────────────┐
│ Les Jardins du Vallon           │
│ Produits disponibles            │
├─────────────────────────────────┤
│                                 │
│ Mis à jour le 24 août · 18:42   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tomates                    │ │
│ │ Disponible                 │ │
│ │ 4,50 € / kg                │ │
│ │                            │ │
│ │ Quantité                   │ │
│ │ [ − ] 1 kg [ + ]           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Courgettes                 │ │
│ │ Selon disponibilité        │ │
│ │ 3,80 € / kg                │ │
│ │                            │ │
│ │ [ − ] 500 g [ + ]          │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Salade                     │ │
│ │ 1,80 € / unité             │ │
│ │                            │ │
│ │ [ − ] 2 [ + ]              │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
│ Panier · 4 articles · 12,10 €   │
│ [ Continuer ]                   │
└─────────────────────────────────┘
```

---

## 4. États visibles

Le client voit :

```text
Disponible
Selon disponibilité
```

Les produits `Indisponible` peuvent être :

- masqués par défaut ;
- ou affichés grisés si le maraîcher veut montrer l’offre saisonnière.

Recommandation V1 : masquer par défaut.

---

## 5. Quantité estimée

Trois cas :

1. quantité connue + visible ;
2. quantité connue + masquée ;
3. quantité non suivie.

Exemple visible :

```text
Environ 12 kg disponibles
```

Ne jamais présenter cela comme un stock temps réel.

---

## 6. “Selon disponibilité”

Doit être explicite :

```text
Selon disponibilité
La quantité sera confirmée après validation.
```

Une commande reste possible.

---

## 7. Prix

Prix issu du snapshot publié.

Le checkout doit snapshotter ce prix au moment de la création de commande.

---

## 8. Quantité client

Le pas dépend de l’unité.

Exemples :

```text
kg → 0,5 kg
unité → 1
botte → 1
```

Le pas doit être défini par convention produit/unité, pas improvisé dans le screen.

---

## 9. Pas de réservation temps réel

Ajouter au panier ne réserve rien.

Important :

> La commande sera vérifiée et validée par le maraîcher.

Le message doit apparaître au checkout, pas forcément sur chaque carte.

---

## 10. Recherche / filtres

V1 peut rester simple :

```text
[ 🔍 Rechercher ]
```

si le catalogue dépasse quelques dizaines de produits.

Pas de catégories tant qu’elles ne font pas partie du modèle.

---

## 11. Panier sticky

Sur mobile :

```text
Panier · 4 articles · 12,10 €
[ Continuer ]
```

Le montant est estimatif.

---

## 12. Panier vide

Pas de CTA sticky lourd.

```text
Ajoutez des produits pour commencer.
```

---

## 13. Première publication absente

```text
Les disponibilités ne sont pas encore publiées.

Revenez bientôt.
```

Pas de catalogue basé sur l’état admin courant.

---

## 14. Projection

```ts
type CustomerCatalog = {
  publicationId: string
  publishedAt: string
  farm: {
    name: string
  }
  products: CustomerCatalogProduct[]
}
```

```ts
type CustomerCatalogProduct = {
  productId: string
  name: string
  description?: string
  unit: string
  unitPrice: number
  availabilityStatus:
    | "available"
    | "limited"
  estimatedQuantity?: number
  quantityVisible: boolean
}
```

---

## 15. API

```text
GET /catalog
```

Réponse basée sur la dernière publication.

---

## 16. Tablette

Deux colonnes de cartes, panier résumé en colonne latérale possible.

---

## 17. États

```text
loading
ready
empty
error
```

Le panier est un état local.

---

## 18. Accessibilité

- nom produit avant prix ;
- disponibilité textuelle ;
- contrôles quantité avec labels ;
- montant annoncé comme estimé ;
- cible tactile large ;
- CTA sticky accessible.

---

## 19. Critères d’acceptation UX

L’écran est réussi si :

- le client comprend immédiatement ce qui est commandable ;
- `Selon disponibilité` est clair ;
- la quantité visible ne ressemble pas à un stock temps réel ;
- le panier fonctionne sans compte ;
- le catalogue ne montre que la dernière publication ;
- le passage au checkout est évident.

---

## 20. Structure

```text
DERNIÈRE PUBLICATION
       ↓
PRODUITS COMMANDABLES
       ↓
DISPONIBILITÉ
       ↓
PRIX
       ↓
QUANTITÉ
       ↓
PANIER
       ↓
CONTINUER
```
