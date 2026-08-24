# AdminRecoveryLocationListScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/recovery-locations.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── admin-recovery-location-list-screen.tsx
├── components/
└── index.ts
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quels points de retrait fixes existent ?**

Il gère les lieux permanents qui ne sont ni un marché récurrent ni un arrêt de tournée dynamique.

Exemples :

```text
Retrait à la ferme
Point partenaire
Local associatif
```

---

## 3. Pourquoi cet écran existe

Sans référentiel dédié, des valeurs comme :

```text
Retrait ferme
```

risquent d’être codées en dur dans :

- commandes ;
- AMAP ;
- planning ;
- génération ;
- paramètres.

Il faut une entité configurable.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Points de retrait        ＋   │
├─────────────────────────────────┤
│                                 │
│ [ Actifs 3 ] [ Tous 4 ]         │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RETRAIT À LA FERME              │
│                                 │
│ 12 chemin des Prés              │
│ Montville                       │
│                                 │
│ Actif                           │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ÉPICERIE DU CENTRE              │
│                                 │
│ 4 place du Marché               │
│ Saint-Pierre                    │
│                                 │
│ Point partenaire                │
│ Actif                           │
│                              >  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ANCIEN LOCAL                    │
│                                 │
│ Inactif                         │
│                              >  │
└─────────────────────────────────┘
```

---

## 5. Entité

Un point fixe contient :

- nom ;
- type ;
- adresse / libellé ;
- éventuellement instructions ;
- actif/inactif.

---

## 6. Types V1

Exemples :

```text
farm
partner
other
```

Le type sert surtout à l’affichage et à certaines règles.

---

## 7. Marchés exclus

Un marché récurrent est géré par :

```text
AdminMarketListScreen
```

Il ne doit pas être dupliqué comme point fixe.

---

## 8. Arrêts de tournée exclus

Un arrêt appartient au modèle de tournée.

Pas besoin de le créer ici comme lieu autonome sauf si le produit veut réutiliser explicitement des lieux partagés plus tard.

---

## 9. Actif / inactif

Même logique que produits :

- actif = proposé dans les nouveaux usages ;
- inactif = conservé pour historique.

---

## 10. Désactivation

Ne doit pas modifier :

- commandes existantes ;
- abonnements existants snapshotés ;
- occurrences historiques.

---

## 11. Abonnements utilisant le point

Si un point est retrait par défaut d’abonnements actifs :

```text
⚠ 12 abonnements utilisent ce point.
```

La désactivation doit être bloquée ou exiger une résolution.

Recommandation V1 : **bloquer tant que des abonnements actifs le référencent comme défaut**.

---

## 12. Commandes futures

Si des commandes déjà créées utilisent ce point :

```text
3 commandes futures utilisent ce point.
```

Ne pas les modifier silencieusement.

---

## 13. Tri

Actifs d’abord, ordre alphabétique.

---

## 14. Pas de carte géographique nécessaire

L’adresse textuelle suffit V1.

Le lieu n’est pas un écran d’itinéraire.

---

## 15. Création

```text
＋
```

ouvre :

```text
AdminRecoveryLocationEditScreen
```

---

## 16. Projection

```ts
type RecoveryLocationListItem = {
  id: string
  name: string
  type: "farm" | "partner" | "other"
  addressLabel?: string
  active: boolean

  usage: {
    activeSubscriptionCount: number
    futureOrderCount: number
  }
}
```

---

## 17. Query

```text
GET /admin/distribution/recovery-locations?status=active|all
```

---

## 18. Tablette / desktop

Table :

```text
┌──────────────────────────────────────────────────┐
│ Point               Type        Adresse    État │
├──────────────────────────────────────────────────┤
│ Retrait ferme       Ferme       Montville  Actif│
│ Épicerie centre     Partenaire  ...        Actif│
└──────────────────────────────────────────────────┘
```

---

## 19. États

```text
loading
ready
empty
error
```

---

## 20. Accessibilité

- nom du lieu comme titre ;
- type textuel ;
- adresse lisible ;
- actif/inactif textuel ;
- toute la carte accessible.

---

## 21. Critères d’acceptation UX

L’écran est réussi si :

- les points fixes sont gérés sans valeurs codées en dur ;
- marchés et tournées ne sont pas dupliqués ;
- un point utilisé par des abonnements actifs ne peut pas disparaître silencieusement ;
- l’historique reste intact ;
- l’écran reste très simple.

---

## 22. Structure

```text
ACTIFS / TOUS
     ↓
NOM
     ↓
TYPE
     ↓
ADRESSE
     ↓
ÉTAT
```
