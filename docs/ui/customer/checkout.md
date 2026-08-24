# CustomerCheckoutScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/customer/checkout.md
```

## Implémentation

```text
packages/screens/customer/
├── customer-checkout-screen.tsx
├── components/
└── index.ts
```

## 1. Objectif

L’écran doit répondre à :

> **Qui commande, où et quand récupérer, et que vais-je demander au maraîcher ?**

Aucun compte obligatoire.

---

## 2. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Votre commande                │
├─────────────────────────────────┤
│                                 │
│ VOS COORDONNÉES                 │
│                                 │
│ Prénom                          │
│ [ Marie                     ]   │
│ Nom                             │
│ [ Dupont                    ]   │
│ Téléphone                       │
│ [ 06 12 34 56 78            ]  │
│ Email                           │
│ [ marie@example.fr          ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCUPÉRATION                    │
│                                 │
│ [ Marché Saint-Pierre       ▼ ] │
│                                 │
│ Mercredi 26 août                │
│ 17:00–19:00                     │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PAIEMENT PRÉVU                  │
│ [ Espèces                   ▼ ] │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMENTAIRE                     │
│ [ Je passerai vers 18h30    ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉSUMÉ                          │
│ Tomates · 1 kg        4,50 €    │
│ Salade · 2            3,60 €    │
│                                 │
│ Total estimé          8,10 €    │
│                                 │
│ Le montant final peut varier    │
│ selon les quantités préparées.  │
│                                 │
│ La commande sera vérifiée       │
│ par le maraîcher.               │
│                                 │
└─────────────────────────────────┘
│ [ Envoyer la commande ]         │
└─────────────────────────────────┘
```

---

## 3. Coordonnées

Recommandation :

- prénom/nom ;
- téléphone ;
- email.

Au moins un moyen de contact doit être obligatoire.

Pour le lien sécurisé de suivi, l’email est pratique, mais le système peut aussi utiliser SMS si configuré.

---

## 4. Pas de création de compte

Ne pas demander :

- mot de passe ;
- création de compte ;
- profil permanent obligatoire.

Le système peut créer/reconnaître un `Customer` côté serveur.

---

## 5. Détection client existant

Si téléphone/email correspond à un client connu, rattacher la commande au `Customer` existant si la logique serveur le permet.

Ne jamais révéler des données privées d’un compte existant avant validation.

---

## 6. Récupération

Afficher uniquement les options réellement disponibles.

Exemples :

```text
Retrait à la ferme
Marché Saint-Pierre
Point partenaire
Tournée / arrêt éligible
```

---

## 7. Date

Selon l’option, afficher les occurrences disponibles.

Exemple :

```text
Marché Saint-Pierre
Mercredi 26 août · 17:00–19:00
```

---

## 8. Paiement

Pas de paiement en ligne V1.

Champ :

```text
Mode de paiement prévu
```

---

## 9. Commentaire

Facultatif.

Exemples :

```text
Je passerai vers 18h30.
Merci de mettre les tomates à part.
```

Ne pas utiliser ce champ pour des modifications structurelles de commande.

---

## 10. Total estimé

Toujours :

```text
Total estimé
```

Le final est calculé à partir des quantités réellement préparées.

---

## 11. Information de validation

Message indispensable :

```text
Votre commande sera vérifiée
par le maraîcher avant d’être acceptée.
```

---

## 12. Soumission

Après succès :

```text
Commande envoyée
```

Statut initial :

```text
À valider
```

Le client reçoit un lien sécurisé vers `CustomerOrderDetailsScreen`.

---

## 13. Lien sécurisé

La commande classique ne nécessite pas de compte.

Le serveur génère un token non prédictible.

Le lien permet :

- consulter ;
- modifier avant deadline ;
- annuler avant deadline.

---

## 14. Prix concurrent

Si le prix publié a changé entre catalogue et checkout, le serveur doit signaler le conflit.

Pas de modification silencieuse du total.

---

## 15. Disponibilité concurrente

Si un produit devient indisponible :

```text
Tomates n’est plus proposé actuellement.
```

Le client doit retirer/corriger la ligne avant submit.

---

## 16. Projection

```ts
type CustomerCheckoutData = {
  cart: {
    publicationId: string
    lines: CheckoutLine[]
  }
  recoveryOptions: CustomerRecoveryOption[]
  paymentMethods: PaymentMethodOption[]
}
```

---

## 17. API

```text
POST /orders
```

Réponse :

```ts
{
  orderId: string
  secureOrderToken: string
  status: "to_validate"
}
```

---

## 18. États

```text
ready
dirty
submitting
catalogConflict
recoveryConflict
success
error
```

---

## 19. Accessibilité

- champs correctement labellés ;
- total annoncé comme estimé ;
- statut futur expliqué ;
- options de récupération lisibles ;
- erreurs de ligne liées au produit concerné.

---

## 20. Critères d’acceptation UX

L’écran est réussi si :

- aucune création de compte n’est imposée ;
- le client comprend qu’il s’agit d’une demande à valider ;
- le total n’est jamais présenté comme définitif ;
- le retrait choisi est réellement disponible ;
- le lien sécurisé de suivi est créé ;
- la commande arrive toujours à `À valider`.

---

## 21. Structure

```text
COORDONNÉES
    ↓
RÉCUPÉRATION
    ↓
PAIEMENT PRÉVU
    ↓
COMMENTAIRE
    ↓
RÉSUMÉ
    ↓
TOTAL ESTIMÉ
    ↓
INFORMATION DE VALIDATION
    ↓
ENVOYER
```
