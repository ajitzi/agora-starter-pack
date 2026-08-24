# AdminOrderCreateScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/order-create.md
```

Implémentation :

```text
packages/screens/admin/orders/
├── admin-order-create-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Comment saisir rapidement une commande reçue hors du site ?**

Cas typiques :

- téléphone ;
- SMS ;
- demande orale ;
- marché ;
- email traité manuellement ;
- client habituel.

La commande créée par l’admin doit suivre le même workflow qu’une commande classique :

```text
création
↓
À valider
↓
À préparer
↓
Préparée
↓
Livrée
```

---

## 3. Principe métier

Même une commande créée par l’admin démarre :

```text
À valider
```

Cela conserve une règle unique pour toutes les commandes classiques.

La création n’est pas l’acceptation.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Nouvelle commande             │
├─────────────────────────────────┤
│                                 │
│ CLIENT                          │
│ [ Rechercher un client      ]   │
│                                 │
│ Marie Dupont                    │
│ 06 12 34 56 78                 │
│ [ Changer ]                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRODUITS                        │
│                                 │
│ Tomates                         │
│ 4,50 €/kg                       │
│ Quantité demandée               │
│ [ 1,5 ] kg                      │
│                                 │
│ Salade                          │
│ 1,80 €/unité                    │
│ [ 2 ] unités                    │
│                                 │
│ [ + Ajouter un produit ]        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCUPÉRATION                    │
│ [ Marché Saint-Pierre       ▼ ] │
│                                 │
│ Date                            │
│ [ Mercredi 26 août          ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PAIEMENT                        │
│ [ Espèces                   ▼ ] │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE CLIENT / COMMANDE          │
│ [ Passe vers 18h30          ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ TOTAL ESTIMÉ                    │
│ 10,35 €                         │
│                                 │
└─────────────────────────────────┘
│ [ Créer la commande ]           │
└─────────────────────────────────┘
```

---

## 5. Étape client

Le client peut être :

- recherché ;
- sélectionné ;
- créé à la volée.

Recherche sur :

```text
nom
email
téléphone
```

---

## 6. Création client depuis le flow

Action :

```text
[ Ajouter un nouveau client ]
```

ouvre :

```text
AdminCustomerEditScreen
```

Puis retour vers `AdminOrderCreateScreen` avec le nouveau client sélectionné.

Le brouillon de commande doit être conservé.

---

## 7. Commande sans fiche client ?

Je recommande de toujours rattacher la commande admin à un `Customer`.

Cela facilite :

- historique ;
- répétition de commande ;
- recherche ;
- contact.

La commande conserve en plus son snapshot de contact.

---

## 8. Snapshot client

À la création :

```text
customerId
+
customerNameSnapshot
phoneSnapshot
emailSnapshot
```

Une modification ultérieure de la fiche client ne réécrit pas la commande.

---

## 9. Produits sélectionnables

Uniquement les produits :

```text
actifs
```

La disponibilité courante doit être visible.

Exemple :

```text
Tomates
Disponible
4,50 €/kg
```

---

## 10. Produit “Selon disponibilité”

Afficher :

```text
⚠ Selon disponibilité
```

La ligne peut être ajoutée.

La validation ultérieure sert justement à confirmer la faisabilité.

---

## 11. Produit indisponible

Cas admin :

```text
Aubergines
Indisponible
```

Je recommande de permettre l’ajout uniquement avec avertissement fort si l’admin sait qu’une disponibilité est attendue.

Sinon le produit reste masqué par défaut.

---

## 12. Quantité demandée

Toujours distincte de la quantité préparée.

Exemple :

```text
Demandé
1,5 kg
```

La quantité réelle sera saisie dans `AdminPreparationRunScreen`.

---

## 13. Prix

Prix snapshoté au moment de la création.

```text
unitPriceSnapshot = prix courant
```

Une modification de prix après création ne doit pas modifier cette commande.

---

## 14. Total estimé

Calcul :

```text
quantité demandée × prix snapshot
```

Il s’agit d’un :

```text
Total estimé
```

Le montant final sera déterminé pendant la préparation avec les quantités réelles.

---

## 15. Ajouter un produit

Sheet :

```text
Ajouter un produit

[ 🔍 Rechercher ]

Tomates
Disponible
4,50 €/kg

Courgettes
Selon disponibilité
3,80 €/kg
```

Tap produit → quantité.

---

## 16. Doublon de ligne

Si un produit est déjà présent, ne pas créer une deuxième ligne.

Ouvrir/modifier la ligne existante.

---

## 17. Suppression de ligne

Simple action :

```text
Retirer de la commande
```

Pas de confirmation lourde tant que la commande n’est pas créée.

---

## 18. Récupération

L’admin choisit une option réellement disponible à la date choisie.

Exemples :

```text
Retrait ferme
Marché Saint-Pierre
Tournée Nord · Montville
Point partenaire
```

---

## 19. Date et récupération interdépendantes

Changer la date peut invalider la récupération.

Le formulaire doit alors expliquer :

```text
Le Marché Saint-Pierre n’est pas
disponible le jeudi 27 août.

Choisissez un autre mode de retrait.
```

Pas de correction silencieuse.

---

## 20. Sélection par occurrence

Lorsque possible, sélectionner une occurrence réelle :

```text
Marché Saint-Pierre
Mercredi 26 août · 17:00–19:00
```

plutôt qu’un simple type abstrait.

Cela facilite préparation et distribution.

---

## 21. Paiement attendu

Pas de paiement en ligne V1.

Champ :

```text
Mode de paiement prévu
```

Exemples :

```text
Espèces
Carte
Chèque
Autre
```

La liste doit être configurable si nécessaire.

---

## 22. Note

Une note de commande peut contenir :

```text
Passe vers 18h30.
```

Elle appartient à la commande, pas à la fiche client.

---

## 23. Validation avant création

Bloquer si :

- aucun client ;
- aucune ligne produit ;
- quantité invalide ;
- aucune date ;
- aucune récupération compatible ;
- prix snapshot impossible ;
- configuration serveur devenue invalide.

---

## 24. Création et statut

Après succès :

```text
✓ Commande créée
À valider
```

Puis ouvrir :

```text
AdminOrderDetailsScreen
```

ou proposer :

```text
[ Valider maintenant ]
```

Je préfère l’ouverture directe du détail avec CTA `Accepter la commande`.

---

## 25. Pourquoi ne pas accepter automatiquement

Même créée par l’admin, la commande peut avoir été saisie rapidement.

Conserver :

```text
À valider
```

permet de vérifier :

- disponibilité ;
- quantité ;
- date ;
- récupération ;
- note.

---

## 26. Création depuis une fiche client

Si `customerId` est fourni :

```text
CLIENT
Marie Dupont
```

prérempli.

L’admin peut toujours changer de client avant soumission.

---

## 27. Création depuis une occurrence

Si le flow part d’un marché ou d’une tournée :

```text
occurrenceId
```

préremplit date + récupération.

Très utile pour saisir une commande reçue directement sur le terrain.

---

## 28. Brouillon local

Pendant l’édition :

```text
dirty
```

Pas besoin de persister côté serveur en V1.

Mais conserver le brouillon si l’admin ouvre un sous-flow de création client.

---

## 29. Quitter

```text
Commande non créée

Vos saisies seront perdues.

[ Continuer ]
[ Quitter ]
```

---

## 30. Concurrence catalogue

Si un prix ou produit change pendant la saisie :

- au submit, le serveur vérifie ;
- si le prix courant a changé, ne pas modifier silencieusement le snapshot.

Afficher :

```text
Le prix de Tomates est passé
de 4,50 € à 4,80 €/kg.

[ Utiliser 4,80 € ]
[ Revenir ]
```

---

## 31. Projection initiale

```ts
type AdminOrderCreateData = {
  paymentMethods: PaymentMethodOption[]
  recoveryOptions: RecoveryOptionSummary[]
  defaults?: {
    customerId?: string
    occurrenceId?: string
    recoveryDate?: string
  }
}
```

---

## 32. Brouillon

```ts
type AdminOrderCreateDraft = {
  customerId?: string

  lines: {
    productId: string
    requestedQuantity: number
    unitPriceSnapshot: number
  }[]

  recovery: {
    date?: string
    optionId?: string
    occurrenceId?: string
  }

  expectedPaymentMethod?: string
  note?: string
}
```

---

## 33. API

```text
POST /admin/orders
```

Payload :

```ts
{
  customerId: string
  lines: {
    productId: string
    requestedQuantity: number
    expectedUnitPrice: number
  }[]
  recoveryDate: string
  recoveryOptionId: string
  occurrenceId?: string
  expectedPaymentMethod?: string
  note?: string
}
```

---

## 34. Réponse

```ts
{
  orderId: string
  status: "to_validate"
  version: number
}
```

---

## 35. Tablette paysage

Deux colonnes :

```text
┌─────────────────────────────┬──────────────────────────┐
│ CLIENT / PRODUITS           │ RÉCUPÉRATION / TOTAL    │
│                             │                          │
│ Marie Dupont                │ 26 août                 │
│ Tomates 1,5 kg             │ Marché Saint-Pierre     │
│ Salade 2                   │                          │
│                             │ Paiement                │
│ + Ajouter                  │ Total estimé 10,35 €    │
└─────────────────────────────┴──────────────────────────┘
```

---

## 36. États principaux

```text
ready
dirty
submitting
catalogConflict
invalidRecovery
success
error
```

---

## 37. Accessibilité

- quantités avec unité toujours annoncée ;
- disponibilité textuelle ;
- total identifié comme estimé ;
- champs récupération/date associés ;
- validation de champ explicite ;
- CTA sticky accessible ;
- création client intégrée sans perte du brouillon.

---

## 38. Critères d’acceptation UX

L’écran est réussi si :

- une commande téléphonique peut être saisie rapidement ;
- créer un client pendant le flow ne perd rien ;
- toutes les commandes classiques créées arrivent à `À valider` ;
- disponibilité et produit actif ne sont pas confondus ;
- prix et contact sont snapshotés ;
- le total est clairement estimatif ;
- date et récupération restent cohérentes ;
- aucun changement concurrent de prix n’est accepté silencieusement.

---

## 39. Structure de référence

```text
CLIENT
  ↓
PRODUITS
  ↓
QUANTITÉS DEMANDÉES
  ↓
DATE
  ↓
RÉCUPÉRATION
  ↓
PAIEMENT ATTENDU
  ↓
NOTE
  ↓
TOTAL ESTIMÉ
  ↓
CRÉER → À VALIDER
```
