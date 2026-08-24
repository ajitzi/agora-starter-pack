# AdminRecoveryLocationEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/recovery-location-edit.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── admin-recovery-location-edit-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Comment définir un point de retrait fixe réutilisable ?**

Création / modification d’un même écran.

---

## 3. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Nouveau point de retrait      │
├─────────────────────────────────┤
│                                 │
│ NOM                             │
│ [ Retrait à la ferme        ]   │
│                                 │
│ TYPE                            │
│ [ Ferme                    ▼ ]  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ADRESSE                         │
│ [ 12 chemin des Prés        ]   │
│ [ 76100 ] [ Montville       ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ INSTRUCTIONS                    │
│ Facultatif                      │
│ [ Entrée par le portail...  ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ÉTAT                            │
│ Actif à la création             │
│                                 │
└─────────────────────────────────┘
│ [ Créer le point ]              │
└─────────────────────────────────┘
```

---

## 4. Nom

Exemples :

```text
Retrait à la ferme
Épicerie du Centre
Local associatif
```

Doit être compréhensible côté admin et potentiellement côté client.

---

## 5. Type

V1 :

```text
farm
partner
other
```

Le type ne doit pas être surchargé de logique.

---

## 6. Adresse

Structure classique :

```text
line1
line2?
postalCode
city
```

Pays implicite si mono-pays V1.

---

## 7. Instructions

Exemples :

```text
Entrée par le portail vert.
Demander à l’accueil.
Retrait entre 17h et 19h.
```

Attention : les horaires récurrents ne doivent pas forcément être stockés ici si les occurrences/disponibilités de retrait les gèrent ailleurs.

---

## 8. Coordonnées GPS

Pas nécessaires V1.

Pas de géocodage obligatoire.

---

## 9. Modification

L’adresse actuelle peut changer.

Les anciennes commandes gardent leur snapshot de récupération.

Les futures utilisations non snapshotées utilisent la nouvelle configuration.

---

## 10. Abonnements actifs

Si le point est utilisé comme récupération par défaut :

```text
12 abonnements utilisent ce point.
```

Modifier le nom/adresse du point peut affecter leur futur affichage.

Afficher un avertissement avant sauvegarde.

---

## 11. Règle V1 recommandée

Contrairement aux marchés/tournées, un point fixe est une ressource partagée.

Une modification de son adresse peut donc affecter les futurs usages.

Mais elle ne doit jamais réécrire :

```text
orders already generated
```

---

## 12. Désactivation

Action en mode édition :

```text
[ Désactiver le point ]
```

Si des abonnements actifs le référencent :

```text
Impossible de désactiver ce point.

12 abonnements l’utilisent comme
retrait habituel.

[ Voir les abonnements ]
```

---

## 13. Commandes futures déjà créées

Même si désactivation autorisée, ces commandes restent inchangées.

---

## 14. Réactivation

```text
[ Réactiver le point ]
```

Le lieu redevient sélectionnable.

---

## 15. Doublon

Si même nom + adresse :

```text
⚠ Un point similaire existe déjà.
```

Ne pas bloquer sur le nom seul.

---

## 16. Pas d’autosave

CTA explicite.

---

## 17. Quitter dirty

Confirmation standard.

---

## 18. Projection

```ts
type RecoveryLocationEditData = {
  location: {
    id: string
    version: number
    name: string
    type: "farm" | "partner" | "other"
    address?: {
      line1: string
      line2?: string
      postalCode: string
      city: string
    }
    instructions?: string
    active: boolean
  }

  usage: {
    activeSubscriptionCount: number
    futureOrderCount: number
  }

  capabilities: {
    canDeactivate: boolean
    canReactivate: boolean
  }
}
```

---

## 19. Formulaire

```ts
type RecoveryLocationFormValues = {
  name: string
  type: "farm" | "partner" | "other"
  address?: {
    line1?: string
    line2?: string
    postalCode?: string
    city?: string
  }
  instructions?: string
}
```

---

## 20. API

```text
POST /admin/distribution/recovery-locations
PATCH /admin/distribution/recovery-locations/:id
POST /admin/distribution/recovery-locations/:id/deactivate
POST /admin/distribution/recovery-locations/:id/reactivate
```

---

## 21. Concurrence

`expectedVersion`.

---

## 22. Tablette / desktop

Deux colonnes :

```text
┌──────────────────────┬──────────────────────┐
│ NOM / TYPE           │ ADRESSE / INSTRUCTIONS│
└──────────────────────┴──────────────────────┘
```

---

## 23. États

```text
loading
ready
dirty
submitting
blocked
conflict
success
error
```

---

## 24. Accessibilité

- nom/type/adresse explicitement labellés ;
- instructions identifiées ;
- blocage de désactivation expliqué en texte ;
- confirmations accessibles ;
- pas de carte obligatoire.

---

## 25. Critères d’acceptation UX

L’écran est réussi si :

- créer un point fixe est rapide ;
- il ne duplique pas marché/tournée ;
- l’adresse peut évoluer sans modifier l’historique ;
- un point utilisé par des abonnements actifs ne peut pas être désactivé silencieusement ;
- les commandes existantes restent snapshotées ;
- la distinction actif/inactif est claire.

---

## 26. Structure

```text
NOM
 ↓
TYPE
 ↓
ADRESSE
 ↓
INSTRUCTIONS
 ↓
IMPACT / UTILISATION
 ↓
ACTIVER / DÉSACTIVER
 ↓
ENREGISTRER
```
