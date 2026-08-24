# AdminFarmSettingsScreen — Wireframe fonctionnel

## Adresse documentation

```text
docs/ui/admin/farm-settings.md
```

## Implémentation

```text
packages/screens/admin/settings/
├── admin-farm-settings-screen.tsx
└── components/
```

## 1. Objectif

L’écran doit répondre à :

> **Quelles informations générales décrivent l’exploitation et servent de référence dans l’application ?**

Il permet de gérer :

- nom de l’exploitation ;
- téléphone ;
- email ;
- adresse ;
- fuseau horaire ;
- informations publiques simples ;
- éventuellement un court texte de présentation.

Ce sont des paramètres globaux, pas des données opérationnelles.

---

## 2. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Exploitation                  │
├─────────────────────────────────┤
│                                 │
│ IDENTITÉ                        │
│                                 │
│ Nom de l’exploitation           │
│ [ Les Jardins du Vallon     ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CONTACT                         │
│                                 │
│ Téléphone                       │
│ [ 06 12 34 56 78            ]  │
│                                 │
│ Email                           │
│ [ contact@jardins.fr        ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ADRESSE                         │
│                                 │
│ [ 12 chemin des Prés        ]   │
│ [ 76100 ] [ Montville       ]   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ FUSEAU HORAIRE                  │
│ [ Europe/Paris              ▼ ] │
│                                 │
├─────────────────────────────────┤
│                                 │
│ PRÉSENTATION                    │
│ Facultatif                      │
│ [ Maraîchage bio local...   ]   │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 3. Nom de l’exploitation

Obligatoire.

Utilisé potentiellement dans :

- emails ;
- notifications ;
- interface client ;
- documents ;
- en-têtes.

---

## 4. Coordonnées

Téléphone et email sont des coordonnées de l’exploitation, distinctes des coordonnées admin personnelles.

Elles peuvent être rendues publiques côté client.

---

## 5. Adresse

L’adresse peut être réutilisée comme base pour :

```text
Retrait à la ferme
```

mais ne doit pas automatiquement créer/modifier un `RecoveryLocation`.

Si un point de retrait ferme existe, toute synchronisation doit être explicite.

---

## 6. Fuseau horaire

Important pour :

- deadlines ;
- publications ;
- occurrences ;
- rappels ;
- historique.

V1 :

```text
Europe/Paris
```

par défaut.

Le serveur doit utiliser ce fuseau pour les règles métier locales.

---

## 7. Présentation

Texte court facultatif, potentiellement utilisé côté catalogue.

Pas de CMS complet.

---

## 8. Pas d’autosave

Sauvegarde explicite.

---

## 9. Concurrence

```text
settingsVersion
```

En conflit :

```text
⚠ Les informations de l’exploitation
ont été modifiées ailleurs.

[ Recharger ]
```

---

## 10. Projection

```ts
type AdminFarmSettings = {
  version: number
  name: string
  phone?: string
  email?: string
  address?: {
    line1?: string
    line2?: string
    postalCode?: string
    city?: string
    countryCode?: string
  }
  timezone: string
  publicDescription?: string
}
```

---

## 11. API

```text
GET /admin/settings/farm
PUT /admin/settings/farm
```

---

## 12. États

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

## 13. Accessibilité

- labels explicites ;
- format téléphone/email approprié ;
- fuseau horaire annoncé clairement ;
- CTA sticky sans masquer le dernier champ.

---

## 14. Critères d’acceptation UX

L’écran est réussi si :

- les informations générales de l’exploitation sont faciles à modifier ;
- aucun réglage opérationnel n’est mélangé ici ;
- le fuseau horaire est explicite ;
- l’adresse n’altère pas silencieusement les points de retrait ;
- la configuration reste compacte.

---

## 15. Structure

```text
IDENTITÉ
   ↓
CONTACT
   ↓
ADRESSE
   ↓
FUSEAU HORAIRE
   ↓
PRÉSENTATION
   ↓
ENREGISTRER
```
