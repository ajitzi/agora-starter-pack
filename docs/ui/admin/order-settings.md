# AdminOrderSettingsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/order-settings.md
```

Implémentation :

```text
packages/screens/admin/settings/
├── admin-order-settings-screen.tsx
└── components/
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles règles globales s’appliquent aux commandes classiques ?**

V1 :

- délai de modification / annulation client ;
- moyens de paiement attendus disponibles ;
- éventuellement quelques règles réellement globales.

---

## 3. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Paramètres commandes          │
├─────────────────────────────────┤
│                                 │
│ MODIFICATION CLIENT             │
│                                 │
│ Les clients peuvent modifier    │
│ ou annuler jusqu’à :            │
│                                 │
│ [ 1 ] jour avant                │
│ à [ 18:00 ]                     │
│                                 │
│ Exemple                         │
│ Retrait mercredi →              │
│ mardi à 18:00                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ MOYENS DE PAIEMENT              │
│                                 │
│ ☑ Espèces                       │
│ ☑ Carte                         │
│ ☑ Chèque                        │
│ ☐ Virement                      │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 4. Deadline client

Règle générale :

```text
J-1 à 18:00
```

Exemple humain obligatoire :

```text
Pour un retrait mercredi,
le client peut modifier jusqu’à
mardi à 18:00.
```

---

## 5. Après deadline

Le client ne peut plus :

- modifier ;
- annuler.

L’admin conserve ses capacités.

---

## 6. Préparée

Même avant deadline théorique, une commande `Préparée` ne doit plus être modifiable par le client.

Le statut opérationnel prime.

---

## 7. Modèle de deadline

Éviter un champ opaque en heures.

Préférer :

```text
Nombre de jours avant
Heure limite
```

Exemple :

```text
1 jour avant
18:00
```

---

## 8. Validation

- jours >= 0 ;
- heure valide ;
- aperçu humain toujours visible.

---

## 9. Moyens de paiement

Ce sont les moyens que l’admin peut sélectionner comme :

```text
paiement prévu
```

V1 sans paiement en ligne.

---

## 10. Liste

Exemples :

```text
Espèces
Carte
Chèque
Virement
Autre
```

L’exploitation peut activer/désactiver.

---

## 11. Au moins un moyen actif

Recommandé si le champ est obligatoire lors de la commande.

Sinon, le formulaire doit permettre `Non précisé`.

---

## 12. Pas de configuration de paiement en ligne

Ne pas ajouter :

- Stripe ;
- remboursement ;
- encaissement ;
- terminal ;

dans cet écran V1.

---

## 13. Conséquence d’une modification

Changer la deadline s’applique aux commandes futures et aux commandes actives non préparées selon la règle globale.

Il faut éviter de recalculer silencieusement des deadlines déjà communiquées si cela pose problème.

---

## 14. Recommandation V1

Calculer la capacité client dynamiquement à partir de :

```text
recoveryDate
+
current global rule
+
order status
```

Si le besoin d’une deadline snapshotée apparaît plus tard, introduire un snapshot.

---

## 15. Impact immédiat

Avant sauvegarde :

```text
Cette règle s’appliquera aux
commandes classiques encore modifiables.
```

---

## 16. Pas d’autosave

CTA explicite :

```text
[ Enregistrer ]
```

---

## 17. Concurrence

```text
settingsVersion
```

En conflit :

```text
⚠ Les paramètres ont changé ailleurs.
[ Recharger ]
```

---

## 18. Projection

```ts
type AdminOrderSettings = {
  version: number

  customerModificationDeadline: {
    daysBefore: number
    time: string
  }

  paymentMethods: {
    code: string
    label: string
    enabled: boolean
  }[]
}
```

---

## 19. API

```text
GET /admin/settings/orders
PUT /admin/settings/orders
```

avec `expectedVersion`.

---

## 20. Tablette

Formulaire contenu, deux cartes :

```text
┌──────────────────────┬──────────────────────┐
│ Modification client  │ Moyens de paiement   │
└──────────────────────┴──────────────────────┘
```

---

## 21. États

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

## 22. Accessibilité

- deadline exprimée en langage humain ;
- heure et jour correctement labellés ;
- cases paiement accessibles ;
- changement non basé uniquement sur couleur ;
- sauvegarde explicite.

---

## 23. Critères d’acceptation UX

L’écran est réussi si :

- la règle J-x est immédiatement compréhensible ;
- l’exemple concret évite les erreurs ;
- l’admin reste toujours autorisé après deadline ;
- `Préparée` bloque le client indépendamment de la deadline ;
- les moyens de paiement restent de simples choix attendus ;
- aucun paiement en ligne n’est implicitement suggéré.

---

## 24. Structure

```text
DEADLINE CLIENT
      ↓
APERÇU HUMAIN
      ↓
MOYENS DE PAIEMENT
      ↓
ENREGISTRER
```
