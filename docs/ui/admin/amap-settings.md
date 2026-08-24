# AdminAmapSettingsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-settings.md
```

Implémentation :

```text
packages/screens/admin/settings/
├── admin-amap-settings-screen.tsx
└── components/
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles règles AMAP sont globales pour tous les adhérents ?**

Il doit éviter de mélanger :

```text
règles globales
```

avec :

```text
configuration d’un abonnement
```

ou :

```text
gestion d’une semaine
```

---

## 3. Règles candidates V1

- deadline de modification membre ;
- nombre maximum de substitutions ;
- délai de génération progressive ;
- seuil d’alerte “paniers restants” ;
- éventuellement règle de rappel avant deadline.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Paramètres AMAP               │
├─────────────────────────────────┤
│                                 │
│ MODIFICATIONS ADHÉRENT          │
│                                 │
│ Jusqu’à                         │
│ [ 1 ] jour avant                │
│ à [ 18:00 ]                     │
│                                 │
│ Exemple                         │
│ Livraison mercredi →            │
│ mardi à 18:00                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SUBSTITUTIONS                   │
│                                 │
│ Maximum par panier              │
│ [ 2 ]                           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ GÉNÉRATION DES COMMANDES        │
│                                 │
│ Générer à partir de             │
│ [ 2 ] jours avant               │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ALERTE SOLDE                    │
│                                 │
│ Alerter à                       │
│ [ 3 ] paniers restants          │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 5. Deadline membre

Cette deadline concerne :

- suspension ;
- substitution ;
- changement de retrait ;
- transfert.

Après deadline :

```text
member capabilities = false
```

mais :

```text
admin capabilities = true
```

jusqu’aux limites opérationnelles.

---

## 6. Une seule source de vérité

Si la deadline est globale, ne pas aussi autoriser une valeur locale sur chaque abonnement.

Sinon le système devient incompréhensible.

---

## 7. Maximum de substitutions

Exemple :

```text
2 substitutions maximum par panier
```

Si global, le `AdminAmapWeeklyBasketScreen` l’affiche en lecture seule.

---

## 8. Génération progressive

Paramètre :

```text
Générer les commandes
2 jours avant la livraison
```

La génération automatique nécessite :

- abonnement éligible ;
- solde > 0 ;
- composition hebdomadaire prête ;
- récupération valide ;
- semaine non suspendue.

---

## 9. Génération progressive ≠ heure technique

Ne pas exposer cron / worker.

Le paramètre reste métier :

```text
N jours avant
```

---

## 10. Composition manquante

Si l’heure de génération arrive sans composition :

```text
génération bloquée
```

et alerte dans `AdminAmapPlanningScreen` / `AdminTodayScreen`.

---

## 11. Seuil de solde faible

Exemple :

```text
Alerter à 3 paniers restants
```

Ce seuil sert aux badges :

```text
⚠ 2 paniers restants
```

dans les listes/détails.

---

## 12. Seuil zéro

Toujours critique indépendamment du seuil :

```text
Aucun panier restant
```

---

## 13. Rappel deadline

Si le système de notifications le supporte :

```text
Envoyer un rappel avant deadline
```

Mais le timing exact peut être un réglage notification plutôt qu’AMAP.

Recommandation : conserver ici la règle métier, et dans Notifications uniquement le canal/activation.

---

## 14. Exemple de rappel

```text
Rappel : 1 jour avant la deadline
```

Optionnel V1.

---

## 15. Validation

- daysBefore >= 0 ;
- heure valide ;
- max substitutions >= 0 ;
- génération >= 0 ;
- seuil solde >= 0.

---

## 16. Conséquences d’un changement

Afficher un résumé :

```text
Les nouvelles règles s’appliqueront
aux prochaines échéances AMAP.

Les commandes déjà générées
restent inchangées.
```

---

## 17. Commandes déjà générées

Ne jamais modifier automatiquement :

- composition snapshotée ;
- récupération snapshotée ;
- bénéficiaire ;
- substitutions.

---

## 18. Pas d’autosave

Paramètres interdépendants → sauvegarde explicite.

---

## 19. Projection

```ts
type AdminAmapSettings = {
  version: number

  memberModificationDeadline: {
    daysBefore: number
    time: string
  }

  maxSubstitutionsPerBasket: number

  orderGeneration: {
    daysBeforeDelivery: number
  }

  lowRemainingBasketsThreshold: number

  reminder?: {
    enabled: boolean
    daysBeforeDeadline: number
  }
}
```

---

## 20. API

```text
GET /admin/settings/amap
PUT /admin/settings/amap
```

---

## 21. Concurrence

`expectedVersion`.

---

## 22. Tablette

Deux colonnes :

```text
┌──────────────────────┬──────────────────────┐
│ Deadline / rappel    │ Substitutions        │
├──────────────────────┼──────────────────────┤
│ Génération           │ Alerte solde         │
└──────────────────────┴──────────────────────┘
```

---

## 23. États

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

## 24. Accessibilité

- exemples humains ;
- unités “jours”, “heure”, “paniers” explicites ;
- règle admin après deadline expliquée ;
- seuils non représentés uniquement par couleur.

---

## 25. Critères d’acceptation UX

L’écran est réussi si :

- il existe une seule source de vérité pour la deadline globale ;
- les membres et admins n’ont pas les mêmes capacités après deadline ;
- la génération automatique est décrite en termes métier ;
- le seuil de solde est centralisé ;
- changer les règles ne réécrit aucune commande générée.

---

## 26. Structure

```text
DEADLINE MEMBRE
      ↓
SUBSTITUTIONS
      ↓
GÉNÉRATION
      ↓
ALERTE SOLDE
      ↓
RAPPEL ÉVENTUEL
      ↓
ENREGISTRER
```
