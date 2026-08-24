# AdminAmapPlanningScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/amap-planning.md
```

Implémentation :

```text
packages/screens/admin/amap/
├── amap-planning-screen.tsx
├── components/
└── index.ts
```

L’écran reste partagé entre web et mobile tant qu’aucune divergence structurelle forte n’apparaît.

---

## 2. Objectif

L’écran doit répondre à :

> **Quelles sont les prochaines échéances AMAP et lesquelles demandent une action ?**

Il doit permettre de :

- voir les prochaines dates AMAP ;
- voir si la composition hebdomadaire existe ;
- voir la deadline adhérent ;
- voir combien de paniers complets et demi-paniers sont prévus ;
- voir combien de semaines sont suspendues ;
- voir combien de transferts / substitutions existent ;
- voir si les commandes sont déjà générées ;
- voir l’avancement de préparation ;
- repérer les anomalies ;
- ouvrir directement la composition ;
- ouvrir la préparation ;
- ouvrir l’occurrence de distribution ;
- aller vers les abonnements concernés si nécessaire.

---

# 3. Principe UX

Ce screen n’est pas :

```text
un calendrier AMAP complet
```

ni :

```text
une liste de tous les adhérents
```

ni :

```text
une vue de préparation détaillée
```

C’est une **vue de readiness hebdomadaire**.

La question principale est :

> **Cette semaine est-elle prête à fonctionner sans surprise ?**

---

# 4. Wireframe mobile de référence

```text
┌─────────────────────────────────┐
│ ← Planning AMAP                 │
├─────────────────────────────────┤
│                                 │
│ [ Prochaines semaines ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ CETTE SEMAINE                   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Mercredi 26 août           │ │
│ │                            │ │
│ │ ✓ Composition prête        │ │
│ │                            │ │
│ │ 28 paniers complets        │ │
│ │ 14 demi-paniers            │ │
│ │                            │ │
│ │ Deadline passée            │ │
│ │                            │ │
│ │ 3 suspensions              │ │
│ │ 2 transferts               │ │
│ │ 6 substitutions            │ │
│ │                            │ │
│ │ 42 commandes générées      │ │
│ │                            │ │
│ │ Préparation                │ │
│ │ 31 / 42                    │ │
│ │                            │ │
│ │ [ Continuer la préparation ]│ │
│ │                            │ │
│ │                         >  │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ SEMAINE PROCHAINE               │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Mercredi 2 septembre      │ │
│ │                            │ │
│ │ ⚠ Composition manquante    │ │
│ │                            │ │
│ │ 43 abonnements prévus      │ │
│ │                            │ │
│ │ Deadline                   │ │
│ │ Mardi 1 sept. · 18:00      │ │
│ │                            │ │
│ │ [ Définir la composition ] │ │
│ │                            │ │
│ │                         >  │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 9 SEPTEMBRE                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Composition prête          │ │
│ │                            │ │
│ │ 41 abonnements prévus      │ │
│ │                            │ │
│ │ Commandes non générées     │ │
│ │                            │ │
│ │                         >  │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

# 5. Une carte par échéance

L’entité principale de l’écran est :

```text
une date AMAP
```

Par exemple :

```text
Mercredi 26 août
```

La carte représente l’état opérationnel de cette échéance.

---

# 6. Informations prioritaires

Ordre recommandé :

```text
DATE
 ↓
COMPOSITION
 ↓
DEADLINE
 ↓
NOMBRE DE PANIERS
 ↓
EXCEPTIONS
 ↓
COMMANDES
 ↓
PRÉPARATION
 ↓
ANOMALIES / ACTION
```

---

# 7. État global dérivé

Chaque échéance peut avoir un état de synthèse :

```text
À configurer
Ouverte
Prête à générer
Commandes générées
En préparation
Prête
À distribuer
Terminée
```

Mais il n’est pas nécessaire de stocker forcément tous ces états en base.

Beaucoup peuvent être dérivés.

---

# 8. Exemple : composition manquante

```text
Mercredi 2 septembre

⚠ Composition manquante

43 abonnements prévus

Deadline
Mardi 1 septembre · 18:00

[ Définir la composition ]
```

C’est une anomalie forte.

Elle doit être visible avant toute autre métrique.

---

# 9. Exemple : composition prête

```text
Mercredi 9 septembre

✓ Composition prête

27 paniers complets
14 demi-paniers
```

Si la deadline n’est pas passée :

```text
Modifications ouvertes
jusqu’au mardi 8 septembre · 18:00
```

---

# 10. Avant la deadline

Pendant cette période, les chiffres restent mouvants.

Afficher :

```text
Prévision actuelle

27 paniers complets
14 demi-paniers
```

et éventuellement :

```text
Peut encore évoluer jusqu’à mardi 18:00
```

---

# 11. Après la deadline

Après la deadline, les chiffres deviennent plus opérationnels :

```text
Deadline passée

26 paniers complets
13 demi-paniers
```

Ils intègrent notamment les suspensions enregistrées.

On peut alors présenter :

```text
39 paniers à préparer
```

---

# 12. Ne pas mélanger abonnements et paniers à préparer

Avant deadline :

```text
43 abonnements concernés
```

peut différer de :

```text
40 paniers prévus
```

à cause de suspensions.

Donc utiliser des libellés précis.

---

# 13. Métriques AMAP utiles

Exemple :

```text
43 abonnements actifs

3 suspensions

40 paniers prévus

26 complets
14 demi
```

Puis :

```text
2 transferts
6 substitutions
```

---

# 14. Les transferts ne changent pas le nombre de paniers

Un transfert signifie :

```text
titulaire différent du bénéficiaire
```

mais pas :

```text
un panier en plus
```

Donc il ne doit pas affecter le total à préparer.

---

# 15. Les substitutions peuvent changer les quantités agrégées

Exemple :

```text
6 substitutions
```

peut modifier les besoins produits.

Mais ce calcul détaillé appartient surtout à :

```text
AdminPreparationScreen
```

Ici, afficher le nombre suffit.

---

# 16. Composition

Chaque carte affiche l’état :

```text
Composition manquante
Composition prête
Composition utilisée
```

Actions possibles :

```text
[ Définir la composition ]
[ Voir la composition ]
[ Modifier la composition ]
```

selon les capacités.

---

# 17. Commandes non encore générées

Exemple :

```text
Commandes
Pas encore générées
```

Avec éventuellement :

```text
Génération prévue après la deadline
```

si c’est bien la règle.

Il est déconseillé d’afficher un mécanisme technique trop précis.

---

# 18. Génération automatique

Le système peut simplement expliquer :

```text
Les commandes seront générées
automatiquement avant la livraison.
```

Pas besoin de :

```text
cron à 02:00
```

ou de détails internes.

---

# 19. Génération échouée

Cas important :

```text
⚠ Génération incomplète

38 / 40 commandes créées

2 abonnements nécessitent une action
```

Action :

```text
[ Voir les erreurs ]
```

C’est une alerte critique.

---

# 20. Pourquoi une génération peut échouer

Exemples :

- abonnement sans retrait compatible ;
- panier épuisé ;
- configuration incohérente ;
- composition manquante ;
- destination supprimée.

Ces erreurs doivent être expliquées individuellement.

---

# 21. Ne pas masquer un abonnement problématique

Éviter :

```text
38 commandes générées
```

sans mentionner que deux ont échoué.

Afficher :

```text
38 / 40 commandes générées
⚠ 2 en erreur
```

---

# 22. Commandes générées

Exemple :

```text
42 commandes générées
```

et éventuellement :

```text
À préparer      11
Préparées       31
Livrées          0
```

Mais la carte doit rester compacte.

---

# 23. Préparation

Quand les commandes existent :

```text
Préparation

31 / 42
```

ou :

```text
31 préparées sur 42
```

Action :

```text
[ Continuer la préparation ]
```

ouvre :

```text
AdminPreparationScreen
```

filtré sur l’occurrence concernée.

---

# 24. Préparation complète

```text
✓ 42 / 42 préparées
```

Le CTA devient éventuellement :

```text
[ Voir l’activité ]
```

ou disparaît au profit de l’occurrence.

---

# 25. Distribution

Si l’échéance est liée à plusieurs modes de retrait, il ne faut pas faire croire qu’il existe une seule occurrence.

Exemple :

```text
Distribution

Marché Saint-Pierre   18
Retrait ferme         12
Tournée Nord          10
```

Mais ce détail peut devenir trop lourd pour la carte principale.

---

# 26. Recommandation V1

Sur la carte principale :

```text
40 paniers
3 points de distribution
```

Puis au tap :

```text
détail de l’échéance
```

ou accès aux occurrences correspondantes.

---

# 27. Important : une date AMAP peut alimenter plusieurs occurrences

Conceptuellement :

```text
AMAP 26 août
```

peut produire :

```text
Marché Saint-Pierre
Retrait ferme
Tournée Nord
```

Donc `AdminAmapPlanningScreen` doit être une vue transversale AMAP, pas un remplacement du planning de distribution.

---

# 28. Détail des destinations

Une carte dépliée ou un sous-écran peut afficher :

```text
DISTRIBUTION

Marché Saint-Pierre
18 paniers

Retrait ferme
12 paniers

Tournée Nord · Montville
10 paniers
```

Chaque ligne ouvre l’occurrence correspondante.

---

# 29. Deadline

Exemple avant :

```text
Deadline
Mardi 25 août · 18:00
```

Après :

```text
✓ Deadline passée
```

Si la date approche :

```text
Deadline dans 3 h
```

peut être utile mais utiliser l’heure exacte également.

---

# 30. Pas de compte à rebours agressif

Éviter :

```text
02:48:13 restantes
```

Un simple :

```text
Aujourd’hui à 18:00
```

est plus utile.

---

# 31. Rappels

L’écran peut indiquer :

```text
Rappel adhérents envoyé
```

ou :

```text
Rappel prévu
```

mais cette information n’a pas besoin d’être dans la carte principale sauf anomalie.

---

# 32. Échec de rappel

Exception utile :

```text
⚠ 3 rappels non envoyés
```

Action :

```text
[ Voir ]
```

Mais ce n’est pas bloquant pour la composition ou la génération.

---

# 33. Alertes possibles

Une échéance peut avoir :

```text
composition manquante
génération incomplète
abonnements sans retrait
produit de composition indisponible
commandes non préparées à l’approche de l’heure
activité non clôturée
```

Il faut prioriser.

---

# 34. Une alerte dominante par carte

Exemple :

```text
⚠ Composition manquante
```

plutôt que :

```text
⚠ composition
⚠ 2 produits
⚠ deadline
⚠ commandes
```

Les détails restent accessibles dans la carte.

---

# 35. Ordre de priorité des alertes

Recommandation :

1. incohérence empêchant génération ;
2. composition manquante ;
3. génération échouée ;
4. préparation en retard ;
5. activité à clôturer ;
6. anomalies de notification ;
7. alertes secondaires.

---

# 36. Semaine imminente sans composition

Cas critique :

```text
Demain

⚠ Composition manquante
```

Cette carte doit probablement remonter dans :

```text
AdminTodayScreen
```

section `Attention`.

---

# 37. Semaine future sans composition

Pour une date dans trois semaines :

```text
Composition non définie
```

mais sans traitement d’alerte agressif.

Le niveau d’urgence dépend de la proximité.

---

# 38. Échéance terminée

Exemple :

```text
Mercredi 19 août

Terminée

39 paniers livrés
1 annulé

Activité clôturée
```

Les échéances terminées peuvent sortir de la vue principale.

---

# 39. Filtres / portée temporelle

Par défaut :

```text
Prochaines 4 semaines
```

Éventuellement :

```text
[ À venir ] [ Historique ]
```

Pas besoin d’un calendrier mensuel.

---

# 40. Tri

Toujours :

```text
date croissante
```

Les anomalies peuvent être signalées, mais il est préférable de ne pas changer l’ordre chronologique.

Sinon l’admin perd la notion de séquence.

---

# 41. Action principale de carte

Le CTA dépend de l’étape.

Exemples :

```text
Composition manquante
→ Définir la composition
```

```text
Commandes générées
→ Préparer
```

```text
Préparation complète
→ Voir l’activité
```

```text
Activité terminée mais non clôturée
→ Clôturer
```

Une seule action dominante.

---

# 42. Tap sur la carte

Le tap général pourrait ouvrir un :

```text
AdminAmapWeekDetailsScreen
```

mais cet écran n’est pas forcément nécessaire en V1.

On peut aussi utiliser la carte comme agrégateur et envoyer directement vers l’action principale.

---

# 43. Recommandation V1

Éviter de créer un écran de détail AMAP supplémentaire si aucune vraie information ne le justifie.

La carte peut proposer :

```text
Composition
Préparation
Distribution
```

via ses sections tappables.

Cela évite un écran intermédiaire.

---

# 44. Navigation vers composition

```text
AdminAmapPlanningScreen
        ↓
AdminAmapWeeklyBasketScreen
```

avec :

```text
deliveryDate
```

---

# 45. Navigation vers préparation

```text
AdminAmapPlanningScreen
        ↓
AdminPreparationScreen
```

avec contexte AMAP/date/occurrence.

---

# 46. Navigation vers adhérents concernés

Une métrique :

```text
3 suspensions
```

peut être tappable et ouvrir une liste filtrée.

Mais éviter de rendre toutes les métriques tappables si cela surcharge.

---

# 47. Navigation vers erreurs

Si :

```text
2 abonnements en erreur
```

ouvrir une vue filtrée ou un `Sheet` :

```text
Marie Dupont
Retrait manquant

Paul Martin
Aucun panier restant
```

Avec action par ligne.

---

# 48. Exemple d’erreur : zéro panier restant

```text
Paul Martin

Aucun panier restant

Commande non générée

[ Voir l’abonnement ]
```

L’admin peut alors ajouter des paniers ou laisser l’abonnement sans commande.

---

# 49. Exemple d’erreur : retrait invalide

```text
Marie Dupont

Retrait habituel indisponible
pour cette date.

[ Corriger cette semaine ]
```

ouvre :

```text
AdminAmapWeekManagementScreen
```

---

# 50. Exemple d’erreur : composition incomplète

```text
⚠ Salade

Quantité demi-panier manquante.
```

Action :

```text
[ Corriger la composition ]
```

---

# 51. Tablette portrait

Très bon format en liste dense :

```text
┌─────────────────────────────────────────────┐
│ Planning AMAP                              │
├─────────────────────────────────────────────┤
│ 26 août                                   │
│ ✓ Composition · 42 paniers · 31/42 prêts │
│ [ Préparer ]                              │
├─────────────────────────────────────────────┤
│ 2 septembre                               │
│ ⚠ Composition manquante · 43 abonnements │
│ [ Définir ]                               │
├─────────────────────────────────────────────┤
│ 9 septembre                               │
│ ✓ Composition · Commandes non générées    │
└─────────────────────────────────────────────┘
```

---

# 52. Tablette paysage

Une vue en colonnes par semaine peut devenir intéressante :

```text
┌──────────────────┬──────────────────┬──────────────────┐
│ 26 août          │ 2 septembre     │ 9 septembre      │
├──────────────────┼──────────────────┼──────────────────┤
│ Composition ✓    │ Composition ⚠   │ Composition ✓    │
│                  │                  │                  │
│ 42 paniers       │ 43 prévus       │ 41 prévus        │
│                  │                  │                  │
│ Deadline passée  │ Deadline 1/09   │ Deadline 8/09    │
│                  │                  │                  │
│ 31/42 préparés   │ Non générées    │ Non générées     │
│                  │                  │                  │
│ [ Préparer ]     │ [ Définir ]     │ [ Voir ]         │
└──────────────────┴──────────────────┴──────────────────┘
```

Mais seulement si trois colonnes restent lisibles.

---

# 53. Desktop

Une table opérationnelle fonctionne bien :

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Date      Composition   Paniers   Deadline   Commandes   Préparation   │
├─────────────────────────────────────────────────────────────────────────┤
│ 26 août  Prête         42        Passée     42          31 / 42       │
│ 2 sept.  Manquante     43        1/09 18h   —           —             │
│ 9 sept.  Prête         41        8/09 18h   —           —             │
└─────────────────────────────────────────────────────────────────────────┘
```

avec alertes et action dans la dernière colonne.

---

# 54. Pas de Kanban

Il est déconseillé d’utiliser :

```text
À configurer
À générer
À préparer
Terminées
```

car les semaines suivent une chronologie fixe.

Une timeline/list chronologique est plus naturelle.

---

# 55. Projection de données

Exemple :

```ts
type AmapPlanning = {
  range: {
    from: string
    to: string
  }

  weeks: AmapPlanningWeek[]
}
```

---

# 56. Projection d’une échéance

```ts
type AmapPlanningWeek = {
  deliveryDate: string

  basket: {
    status:
      | "missing"
      | "draft"
      | "ready"
      | "in_use"

    basketId?: string

    productCount?: number
  }

  deadline: {
    at: string
    passed: boolean
  }

  subscriptions: {
    eligible: number
    suspended: number
    fullBasket: number
    halfBasket: number
    expectedBaskets: number
  }

  exceptions: {
    transfers: number
    substitutions: number
    recoveryOverrides: number
  }

  generation: {
    status:
      | "not_started"
      | "running"
      | "complete"
      | "partial"
      | "failed"

    expectedOrders: number
    generatedOrders: number
    errorCount: number
  }

  preparation?: {
    total: number
    prepared: number
  }

  distribution?: {
    occurrenceCount: number
    closedOccurrenceCount: number
  }

  alert?: {
    type: string
    label: string
    severity:
      | "info"
      | "warning"
      | "critical"
  }

  primaryAction:
    | "define_basket"
    | "review_errors"
    | "prepare"
    | "view_distribution"
    | "close"
    | "none"
}
```

---

# 57. Pourquoi calculer `primaryAction` côté serveur ?

Parce qu’elle dépend de plusieurs règles :

```text
composition
deadline
génération
préparation
distribution
```

Le serveur peut renvoyer les capacités/intentions plutôt que laisser chaque client réimplémenter la logique.

---

# 58. Alternative

On peut aussi renvoyer :

```ts
actions: {
  canEditBasket: boolean
  canReviewGenerationErrors: boolean
  canPrepare: boolean
  canViewDistribution: boolean
  canClose: boolean
}
```

et laisser l’écran choisir la priorité visuelle.

Cette approche est plus flexible.

---

# 59. Query

Conceptuellement :

```text
GET /admin/amap/planning?from=...&to=...
```

Par défaut :

```text
4 prochaines semaines
```

---

# 60. Rafraîchissement

La projection doit être invalidée après :

- modification composition ;
- suspension ;
- transfert ;
- substitution ;
- génération ;
- préparation ;
- livraison ;
- clôture.

Pas besoin de WebSocket en V1.

---

# 61. État loading

Skeleton de cartes hebdomadaires.

```text
████████
████████████████
██████

██████████
████████████
```

Pas de spinner global si une projection précédente peut rester visible pendant le refresh.

---

# 62. Erreur partielle

Si les métriques de préparation échouent mais la semaine charge :

```text
Préparation
Impossible à charger

[ Réessayer ]
```

Ne pas masquer toute la carte.

---

# 63. État vide

Si aucune échéance AMAP n’est planifiée :

```text
Aucune livraison AMAP à venir.

Vérifiez les abonnements actifs
et leur jour habituel.
```

Action éventuelle :

```text
[ Voir les abonnements ]
```

---

# 64. Cas sans abonnement actif

```text
Aucun abonnement AMAP actif.
```

CTA :

```text
[ Ajouter un abonnement ]
```

---

# 65. Cas avec abonnements mais aucun panier disponible

Alerte globale possible :

```text
⚠ 4 abonnements n’ont plus de panier disponible.
```

Mais la vue hebdomadaire doit surtout signaler quelles commandes ne seront pas générées.

---

# 66. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
Card
Badge
ProgressBar
Alert
Button
Skeleton
EmptyState
ResponsiveGrid
```

---

# 67. Composants métier

Dans :

```text
packages/domains/amap/ui/
```

bons candidats :

```text
AmapPlanningWeekCard
AmapBasketReadiness
AmapDeadlineSummary
AmapWeekAudienceSummary
AmapGenerationStatus
AmapPreparationProgress
AmapPlanningAlert
```

---

# 68. Composants spécifiques au screen

```text
packages/screens/admin/amap/
├── amap-planning-screen.tsx
├── components/
│   ├── amap-planning-header.tsx
│   ├── amap-planning-week-list.tsx
│   ├── amap-planning-week-card.tsx
│   ├── amap-planning-alert-summary.tsx
│   └── amap-planning-empty-state.tsx
└── index.ts
```

---

# 69. États principaux

Prévoir :

```text
loading
ready
empty
error
```

Les cartes ont leurs propres états dérivés.

---

# 70. Accessibilité

Points importants :

- date complète pour chaque échéance ;
- état de composition textuel ;
- progression exprimée aussi en chiffres ;
- alertes non dépendantes de la couleur ;
- CTA clairement lié à la bonne date ;
- métriques annoncées avec contexte, par exemple “31 paniers préparés sur 42” ;
- ordre chronologique conservé pour la navigation clavier.

---

# 71. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- l’admin voit immédiatement quelle semaine demande une action ;
- une composition manquante ressort fortement ;
- la deadline est visible sans ouvrir un détail ;
- le nombre de paniers complets et demi-paniers est compréhensible ;
- suspensions, transferts et substitutions sont visibles comme métriques, sans transformer l’écran en liste d’adhérents ;
- une génération partielle n’est jamais présentée comme réussie ;
- l’avancement de préparation est visible une fois les commandes créées ;
- une échéance peut renvoyer directement vers la composition ou la préparation ;
- les semaines restent toujours ordonnées chronologiquement ;
- la vue AMAP ne remplace pas le planning de distribution ;
- l’écran reste compact sur mobile et devient plus dense sur tablette/desktop.

---

# 72. Structure de référence

```text
PROCHAINES ÉCHÉANCES
        ↓
DATE
        ↓
COMPOSITION
        ↓
DEADLINE
        ↓
PANIERS ATTENDUS
        ↓
SUSPENSIONS / TRANSFERTS / SUBSTITUTIONS
        ↓
GÉNÉRATION DES COMMANDES
        ↓
PRÉPARATION
        ↓
DISTRIBUTION
        ↓
ALERTE / ACTION PRINCIPALE
```

Cette structure doit permettre de piloter les prochaines échéances AMAP comme une vue de readiness hebdomadaire, sans remplacer ni le planning général de distribution ni les écrans de composition et de préparation.
