# Architecture technique — Synthèse

## 1. Principes généraux

La solution est organisée sous forme de **monorepo** afin de partager un maximum de code entre les différentes applications tout en conservant des responsabilités clairement séparées.

La cible comprend :

* une application web basée sur **Next.js** ;
* une application mobile basée sur **Expo** ;
* une API basée sur **AdonisJS**, avec **PostgreSQL** et **Lucid** pour la persistence ;
* une UI cross-platform basée sur **Tamagui** ;
* des écrans fonctionnels placés dans `packages` afin d’être réutilisables entre web et mobile ;
* des domaines métier indépendants des runtimes ;
* l’infrastructure et le déploiement regroupés dans `infra`.

Le principe directeur est :

> **Les apps fournissent le runtime et le routing ; les packages fournissent l’application.**

---

# 2. Arborescence générale

```text
/
├── apps/
│   ├── web/
│   ├── mobile/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── screens/
│   ├── domains/
│   ├── core/
│   ├── api-client/
│   ├── config/
│   └── testing/
│
├── docs/
│   ├── architecture/
│   ├── functional/
│   ├── decisions/
│   └── api/
│
├── infra/
│   ├── docker/
│   ├── provisioning/
│   ├── manifests/
│   ├── database/
│   ├── monitoring/
│   └── scripts/
│
└── package.json
```

---

# 3. `apps`

Le dossier `apps` contient les applications **exécutables et déployables**.

```text
apps/
├── web/
├── mobile/
└── api/
```

Les applications sont responsables de :

* leur runtime ;
* leur bootstrap ;
* leur routing ;
* leur configuration spécifique à la plateforme ;
* leurs providers ;
* l’intégration avec le système d’exploitation ou le navigateur ;
* le montage des écrans provenant de `packages`.

Elles ne doivent pas contenir la majorité du métier ou de la logique fonctionnelle.

---

# 4. `apps/web` — Next.js

L’application web utilise **Next.js**.

Structure indicative :

```text
apps/web/
├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   ├── (client)/
│   │   └── (amap)/
│   │
│   ├── providers/
│   ├── middleware/
│   └── platform/
│
├── public/
├── next.config.ts
└── package.json
```

Le dossier `app/` définit principalement :

* les routes ;
* les layouts ;
* les segments Next.js ;
* les boundaries spécifiques au runtime web.

Les fichiers de route doivent rester aussi fins que possible.

Exemple :

```tsx
import { OrderDetailsScreen } from "@project/screens/admin/orders";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <OrderDetailsScreen orderId={params.id} />;
}
```

La route appartient à Next.js.

L’écran appartient à `packages`.

---

# 5. `apps/mobile` — Expo

L’application mobile utilise **Expo**.

Structure indicative :

```text
apps/mobile/
├── app/
│   ├── (admin)/
│   ├── (client)/
│   └── (amap)/
│
├── src/
│   ├── providers/
│   └── platform/
│
├── app.json
└── package.json
```

Expo gère :

* le routing mobile ;
* la navigation ;
* les permissions ;
* les notifications natives ;
* les intégrations plateforme ;
* le bootstrap de l’application.

Les routes doivent elles aussi rester fines et monter des écrans issus de `packages`.

---

# 6. `apps/api` — AdonisJS

L’API utilise **AdonisJS** comme framework backend.

La stack backend retenue est :

```text
AdonisJS
├── PostgreSQL
├── Lucid
├── VineJS
├── Adonis Auth
├── Ace
└── Japa
```

Les briques officielles du framework sont privilégiées lorsqu’elles répondent au besoin afin de conserver une stack cohérente et de limiter la fragmentation technique.

AdonisJS reste néanmoins un **runtime et une couche d’infrastructure**. Les règles métier fondamentales continuent de vivre dans `packages/domains` et ne doivent pas dépendre d’AdonisJS, de Lucid ou de PostgreSQL.

Structure indicative, alignée sur les conventions AdonisJS :

```text
apps/api/
├── app/
│   ├── controllers/
│   │   ├── admin/
│   │   ├── customer/
│   │   ├── amap/
│   │   └── auth/
│   │
│   ├── middleware/
│   ├── validators/
│   │
│   ├── models/
│   │   └── ...                  # modèles Lucid de persistence
│   │
│   ├── adapters/
│   │   ├── persistence/
│   │   │   ├── repositories/
│   │   │   └── mappers/
│   │   ├── email/
│   │   ├── sms/
│   │   └── notifications/
│   │
│   └── jobs/
│
├── start/
│   └── routes.ts
│
├── config/
│   ├── app.ts
│   ├── auth.ts
│   └── database.ts
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── tests/
├── bin/
├── ace.js
├── adonisrc.ts
└── package.json
```

L’API est responsable de :

* l’exposition HTTP via les routes et controllers AdonisJS ;
* la validation des entrées à la frontière HTTP, notamment avec VineJS ;
* l’authentification et la session via Adonis Auth ;
* l’autorisation technique et les middlewares ;
* les tâches planifiées et les workers éventuels ;
* la persistence PostgreSQL via Lucid ;
* les migrations, seeders et factories de base de données ;
* les intégrations externes ;
* l’injection des dépendances ;
* l’exécution des cas d’usage définis dans les packages métier.

Le flux cible est :

```text
HTTP
 ↓
AdonisJS route / controller
 ↓
validation / auth
 ↓
cas d’usage de packages/domains/*/application
 ↓
contrats métier / repositories
 ↓
adapters apps/api
 ↓
Lucid
 ↓
PostgreSQL
```

La règle centrale est :

> **Lucid ne sort jamais de `apps/api`.**

Un modèle Lucid représente la persistence. Il ne doit pas devenir l’entité métier utilisée par `packages/domains`.

Exemple :

```text
packages/domains/orders/domain/order.ts
        │
        │ entité métier pure
        ▼
Order
        ▲
        │ mapping
        ▼
apps/api/app/models/order.ts
        │
        │ modèle Lucid
        ▼
PostgreSQL
```

---

# 7. Les écrans vivent dans `packages`

Tous les écrans fonctionnels sont placés dans :

```text
packages/screens/
```

et non directement dans `apps/web` ou `apps/mobile`.

Objectif :

> permettre à un même écran d’être utilisé aussi bien par Next.js que par Expo.

Structure :

```text
packages/screens/
├── admin/
├── client/
└── amap/
```

Exemple :

```text
packages/screens/admin/
├── today/
├── orders/
├── preparation/
├── availability/
├── distribution/
├── amap/
├── customers/
└── settings/
```

---

# 8. Responsabilité de `packages/screens`

Les écrans représentent la **couche de composition applicative**.

Ils peuvent assembler plusieurs domaines.

Exemple :

```text
OrderDetailsScreen
│
├── orders
├── customers
├── distribution
└── ui
```

Un écran peut ainsi utiliser :

```tsx
<OrderSummary />
<CustomerSummary />
<PickupSummary />
<OrderStatusBadge />
```

sans appartenir artificiellement à un seul domaine.

---

# 9. Partage des écrans web / mobile

Un écran est **cross-platform par défaut**.

Exemple :

```text
packages/screens/admin/orders/
└── order-details-screen.tsx
```

peut être utilisé à la fois par :

```text
Next.js
   │
   └──► OrderDetailsScreen

Expo
   │
   └──► OrderDetailsScreen
```

Tant que l’expérience reste suffisamment proche, une seule implémentation doit être conservée.

---

# 10. Conventions de plateforme Expo / React Native

Lorsqu’une implémentation spécifique à une plateforme est réellement nécessaire, la solution utilise les conventions standards de résolution React Native / Expo.

Exemples :

```text
order-details-screen.tsx
order-details-screen.native.tsx
order-details-screen.web.tsx
order-details-screen.ios.tsx
order-details-screen.android.tsx
```

Les suffixes utilisables incluent notamment :

```text
.native.tsx
.web.tsx
.ios.tsx
.android.tsx
```

Il n’est donc pas nécessaire d’introduire une convention custom comme :

```text
.mobile.tsx
```

---

# 11. Résolution des écrans

Exemple :

```text
order-details-screen.tsx
order-details-screen.native.tsx
```

Le web peut utiliser :

```text
order-details-screen.tsx
```

et Expo :

```text
order-details-screen.native.tsx
```

sans modifier l’import.

Le consommateur continue à écrire :

```tsx
import { OrderDetailsScreen } from "@project/screens/admin/orders";
```

La plateforme sélectionne automatiquement l’implémentation appropriée.

---

# 12. Convention recommandée

Utiliser en priorité :

```text
screen.tsx
```

pour l’implémentation partagée.

Ajouter :

```text
screen.native.tsx
```

uniquement lorsque l’expérience mobile/native diffère réellement.

Les variantes :

```text
screen.ios.tsx
screen.android.tsx
```

doivent rester exceptionnelles et être réservées aux cas véritablement spécifiques aux plateformes.

---

# 13. Quand créer une variante `native`

Une variante native est pertinente lorsque la **structure ou le parcours** change réellement.

Exemple web :

```text
┌───────────────┬─────────────────────┐
│ Commandes     │ Détail commande     │
│               │                     │
│ Marie         │                     │
│ Paul          │                     │
│ Lucie         │                     │
└───────────────┴─────────────────────┘
```

Exemple mobile :

```text
┌───────────────────┐
│ Commandes         │
│                   │
│ Marie             │
│ Paul              │
│ Lucie             │
└───────────────────┘

        ↓

┌───────────────────┐
│ ← Marie           │
│                   │
│ Détail commande   │
└───────────────────┘
```

Dans ce cas, deux implémentations peuvent être justifiées.

---

# 14. Quand conserver un écran partagé

Une simple différence responsive ne doit pas provoquer une duplication.

Par exemple :

```text
Desktop :
[ A ][ B ]

Mobile :
[ A ]
[ B ]
```

doit idéalement rester :

```text
screen.tsx
```

et être géré avec les capacités responsive de Tamagui.

L’objectif est donc :

> **responsive d’abord, variante native ensuite.**

---

# 15. Structure indicative de `packages/screens`

```text
packages/screens/
├── admin/
│   ├── today/
│   │   ├── today-screen.tsx
│   │   ├── today-screen.native.tsx
│   │   └── index.ts
│   │
│   ├── orders/
│   │   ├── order-list-screen.tsx
│   │   ├── order-list-screen.native.tsx
│   │   ├── order-details-screen.tsx
│   │   ├── order-validation-screen.tsx
│   │   └── index.ts
│   │
│   ├── preparation/
│   ├── availability/
│   ├── distribution/
│   ├── amap/
│   ├── customers/
│   └── settings/
│
├── client/
│   ├── catalog/
│   ├── checkout/
│   └── order/
│
└── amap/
    ├── home/
    ├── basket/
    ├── substitution/
    └── history/
```

Les fichiers spécifiques aux plateformes ne doivent être créés que lorsqu’ils sont réellement nécessaires.

---

# 16. Les écrans ne doivent pas dépendre du router

Dans la mesure du possible, `packages/screens` ne doit pas importer directement :

```text
next/navigation
expo-router
```

Un écran reçoit les informations nécessaires via ses props.

Préférer :

```tsx
<OrderDetailsScreen orderId={orderId} />
```

à :

```tsx
const { id } = useLocalSearchParams();
```

directement dans l’écran partagé.

---

# 17. Navigation depuis un écran partagé

Lorsque l’écran doit déclencher une navigation, privilégier des callbacks ou une abstraction indépendante du runtime.

Exemple :

```tsx
<OrderListScreen
  onOpenOrder={(orderId) => {
    // navigation gérée par l'app
  }}
/>
```

L’application Next.js peut utiliser son router.

L’application Expo peut utiliser Expo Router.

L’écran reste indépendant de la technologie utilisée.

Une abstraction commune de navigation pourra être ajoutée ultérieurement si les callbacks deviennent trop nombreux.

---

# 18. `packages/ui`

Tamagui est la fondation UI officielle du projet.

La solution ne cherche pas à rendre Tamagui facilement interchangeable.

En revanche, le code fonctionnel doit utiliser :

```tsx
import { Button } from "@project/ui";
```

plutôt que :

```tsx
import { Button } from "tamagui";
```

---

# 19. Rôle de `@project/ui`

`@project/ui` fournit une API UI contrôlée par le projet.

Il centralise :

* les composants ;
* les variants ;
* les tailles ;
* les tokens ;
* les marges ;
* les espacements ;
* les couleurs ;
* les thèmes ;
* les conventions responsive ;
* les comportements par défaut.

---

# 20. Tamagui reste pleinement utilisable

Tamagui est un choix assumé.

Il n’est donc pas nécessaire de masquer son modèle.

Les composants peuvent utiliser :

```tsx
<Button
  variant="primary"
  size="$4"
  marginTop="$3"
>
  Accepter
</Button>
```

ou :

```tsx
<Stack
  gap="$4"
  padding="$5"
  $sm={{
    padding: "$3",
  }}
>
```

Les concepts suivants peuvent être exploités :

* tokens ;
* responsive props ;
* variants ;
* thèmes ;
* stacks ;
* animations ;
* media queries Tamagui.

---

# 21. Pourquoi passer par `@project/ui`

L’objectif n’est pas de masquer Tamagui mais d’empêcher chaque partie du projet d’inventer ses propres conventions.

À éviter :

```tsx
<Button
  backgroundColor="#2d8f45"
  paddingHorizontal={19}
  borderRadius={7}
/>
```

Préférer :

```tsx
<Button variant="primary" size="md">
  Accepter
</Button>
```

Le projet conserve ainsi un design system cohérent.

---

# 22. Structure de `packages/ui`

Chaque composant React ou composant cree avec `styled` reside dans son propre fichier kebab-case. Les composants sont regroupes par responsabilite. Les barrels `index.ts` et `index.tsx` n'exposent que l'API publique par reexports: ils ne definissent ni composant ni style. Les consommateurs continuent a importer depuis `@project/ui` ou `@project/screens`, sans dependre de cette organisation interne.

```text
packages/ui/
└── src/
    ├── config.ts
    ├── provider/
    │   └── ui-provider.tsx
    ├── layout/
    │   ├── screen/
    │   │   ├── screen.tsx
    │   │   ├── screen-header.tsx
    │   │   ├── screen-header-frame.tsx
    │   │   ├── screen-title.tsx
    │   │   ├── screen-context.tsx
    │   │   └── sticky-action-bar.tsx
    │   └── stack/
    │       ├── x-stack.tsx
    │       └── y-stack.tsx
    ├── components/
    │   ├── button/
    │   │   └── button.tsx
    │   ├── typography/
    │   │   ├── paragraph.tsx
    │   │   └── text.tsx
    │   ├── accessibility/
    │   │   ├── focus-link.tsx
    │   │   └── skip-link.tsx
    │   └── feedback/
    │       ├── collection-notice-gate-view.tsx
    │       ├── notice.mjs
    │       └── notice.d.mts
    └── index.tsx
```

---

# 23. Règle d’import Tamagui

Dans :

```text
packages/ui
```

les imports directs depuis Tamagui sont autorisés.

Dans :

```text
packages/screens
packages/domains/*/ui
apps/web
apps/mobile
```

les primitives doivent être importées depuis :

```text
@project/ui
```

sauf exception explicitement justifiée.

Les composants et les écrans partagés ne contiennent jamais de JSX HTML natif (`div`, `main`, `form`, `input`, `label`, `a`, etc.). Ils utilisent exclusivement les primitives et composants « HTML elements » de Tamagui exposés par `@project/ui`, avec des rôles et propriétés d’accessibilité portables. Cette règle préserve le rendu web et les cibles native futures; l’intégration HTML propre à Next.js reste dans `apps/web`.

---

# 24. `packages/domains`

Les principaux domaines métier identifiés sont :

```text
packages/domains/
├── catalog/
├── orders/
├── amap/
├── distribution/
├── customers/
└── notifications/
```

---

# 25. Structure d’un domaine

```text
packages/domains/[domain]/
├── domain/
├── application/
├── api/
├── ui/
└── index.ts
```

Exemple :

```text
packages/domains/orders/
├── domain/
│   ├── order.ts
│   ├── order-line.ts
│   ├── order-status.ts
│   └── events.ts
│
├── application/
│   ├── create-order.ts
│   ├── accept-order.ts
│   ├── prepare-order.ts
│   ├── deliver-order.ts
│   ├── cancel-order.ts
│   └── reschedule-order.ts
│
├── api/
│   ├── queries.ts
│   ├── mutations.ts
│   └── contracts.ts
│
├── ui/
│   ├── order-card/
│   ├── order-summary/
│   └── order-status-badge/
│
└── index.ts
```

---

# 26. `domain`

Le dossier `domain` contient le métier pur.

Exemples :

```text
Order
OrderLine
OrderStatus
Subscription
WeeklyBasket
MarketOccurrence
```

et les règles associées :

```text
acceptOrder()
canCustomerModifyOrder()
markOrderAsPrepared()
consumeAmapBasket()
```

Le domaine ne dépend pas :

* de Next.js ;
* d’Expo ;
* de Tamagui ;
* de HTTP ;
* d’un ORM ;
* de PostgreSQL.

---

# 27. `application`

La couche `application` contient les cas d’usage.

Exemples :

```text
CreateOrder
AcceptOrder
PrepareOrder
DeliverOrder
CancelOrder
RescheduleOrder
```

Elle orchestre :

* les entités métier ;
* les repositories ;
* les services externes abstraits ;
* les événements.

---

# 28. `api` des domaines

Le dossier `api` contient la couche utilisée côté client pour accéder aux fonctionnalités du domaine.

Il peut contenir :

```text
queries
mutations
contracts
schemas
hooks
```

selon la technologie choisie.

Il peut s’appuyer sur :

```text
@project/api-client
```

---

# 29. `ui` des domaines

`packages/domains/*/ui` contient les composants fonctionnels réutilisables liés à un domaine.

Exemples :

```text
OrderCard
OrderSummary
OrderStatusBadge
AvailabilityBadge
SubscriptionSummary
MarketCard
```

Ces composants utilisent les primitives provenant de :

```text
@project/ui
```

---

# 30. Différence entre `domain/ui` et `screens`

Cette frontière doit rester claire.

## Composant métier

```text
OrderSummary
```

appartient à :

```text
packages/domains/orders/ui
```

Il représente un concept métier réutilisable.

## Écran

```text
OrderDetailsScreen
```

appartient à :

```text
packages/screens/admin/orders
```

Il orchestre plusieurs concepts et plusieurs domaines.

---

# 31. Hiérarchie UI

La hiérarchie cible est :

```text
Screen
  │
  ├── Domain UI
  │      │
  │      └── Project UI
  │             │
  │             └── Tamagui
  │
  └── Project UI
         │
         └── Tamagui
```

Exemple :

```text
OrderDetailsScreen
│
├── OrderSummary
│      └── Card / Stack / Text
│
├── CustomerSummary
│      └── Card / Text
│
└── Button
```

---

# 32. `packages/core`

`core` contient les briques techniques génériques et indépendantes du métier.

```text
packages/core/
├── http/
├── date/
├── money/
├── errors/
├── logger/
├── storage/
└── result/
```

`core` ne dépend :

* d’aucun domaine ;
* d’aucun écran ;
* de Next.js ;
* d’Expo.

---

# 33. Pas de dossiers fourre-tout

Éviter autant que possible :

```text
utils/
helpers/
common/
shared/
services/
```

lorsqu’ils regroupent des responsabilités sans rapport.

Préférer :

```text
date/
money/
storage/
logger/
```

ou conserver le code dans le domaine auquel il appartient.

---

# 34. `packages/api-client`

Ce package fournit l’accès générique à l’API.

```text
packages/api-client/
├── client/
├── auth/
├── errors/
└── index.ts
```

Il peut gérer :

* base URL ;
* headers ;
* token d’authentification ;
* sérialisation ;
* gestion générique des erreurs ;
* éventuellement du code généré depuis OpenAPI.

Il peut être utilisé par le web et le mobile.

---

# 35. Persistence — PostgreSQL et Lucid

La base de données principale est **PostgreSQL**.

La couche de persistence utilise **Lucid**, l’ORM SQL officiel de l’écosystème AdonisJS.

Le domaine peut définir les contrats dont ses cas d’usage ont besoin.

Exemple :

```ts
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
```

L’implémentation concrète appartient au runtime backend :

```text
apps/api/app/adapters/persistence/
├── repositories/
├── mappers/
└── ...
```

Les modèles Lucid vivent dans :

```text
apps/api/app/models/
```

et les migrations dans :

```text
apps/api/database/migrations/
```

La séparation attendue est :

```text
Domain Entity
    │
    │ mapping
    ▼
Lucid Model
    │
    ▼
PostgreSQL
```

Par exemple :

```text
Order
≠
OrderModel Lucid
```

`Order` porte les invariants et comportements métier.

Le modèle Lucid porte la représentation persistée, les relations de base de données et les opérations nécessaires aux adapters.

Le métier reste ainsi indépendant de :

* PostgreSQL ;
* Lucid ;
* AdonisJS ;
* ou d’une autre technologie de stockage.

Cette frontière permet de profiter de l’intégration et de la productivité de Lucid sans transformer les entités métier en modèles Active Record.

Les transactions Lucid sont utilisées dans les adapters lorsque plusieurs écritures doivent rester atomiques, par exemple :

```text
livrer une commande AMAP
        ↓
passer la commande à Livrée
+
créer l’événement de consommation
+
décrémenter le solde de paniers
```

Le cas d’usage décide de l’intention métier ; l’adapter garantit l’atomicité technique.

---

# 36. Services externes

Même principe pour :

* email ;
* SMS ;
* push ;
* stockage ;
* fournisseurs tiers.

Le métier exprime une intention ou un événement.

Il ne doit pas appeler directement un SDK fournisseur.

---

# 37. Événements métier

Des événements internes peuvent représenter les actions importantes :

```text
OrderCreated
OrderAccepted
OrderPrepared
OrderDelivered

AvailabilityPublished

AmapBasketSuspended
AmapBasketTransferred

MarketClosed
TourClosed
```

Ils pourront servir à :

* générer l’historique ;
* envoyer des notifications ;
* construire l’audit ;
* alimenter des automatisations futures.

Il n’est pas nécessaire de construire une infrastructure distribuée event-driven en V1.

---

# 38. Snapshots métier

Les informations historiques importantes doivent être conservées telles qu’elles existaient au moment de l’événement.

Une commande peut notamment conserver :

* libellé produit ;
* prix appliqué ;
* unité ;
* quantité demandée ;
* informations client utiles ;
* composition AMAP.

Une publication conserve également son propre snapshot des disponibilités.

Une modification future du catalogue ne doit pas modifier l’historique.

---

# 39. `packages/config`

Le package contient les configurations partagées du monorepo.

Exemples :

```text
TypeScript
ESLint
Prettier
Vitest
Tamagui
```

Il ne contient pas de secrets runtime.

---

# 40. `packages/testing`

Le package contient les briques de test réellement réutilisables.

Exemples :

```text
factories
builders
test helpers
mocks techniques
fixtures communes
```

Les données de test spécifiques à un domaine peuvent rester dans ce domaine.

---

# 41. Documentation

```text
docs/
├── architecture/
├── functional/
├── decisions/
└── api/
```

## `architecture`

Documentation de l’architecture technique.

## `functional`

Spécifications fonctionnelles.

## `decisions`

Architecture Decision Records.

Exemples :

```text
ADR-001-monorepo.md
ADR-002-nextjs-expo.md
ADR-003-tamagui.md
ADR-004-cross-platform-screens.md
ADR-005-domain-boundaries.md
ADR-006-adonisjs-api.md
```

## `api`

Documentation des conventions et contrats API.

---

# 42. Infrastructure et déploiement

L’infrastructure et le déploiement sont regroupés dans un seul dossier :

```text
infra/
├── docker/
├── provisioning/
├── manifests/
├── database/
├── monitoring/
└── scripts/
```

Il peut contenir :

* Dockerfiles ;
* infrastructure cloud ;
* manifests ;
* provisioning ;
* configuration des bases ;
* monitoring ;
* scripts de déploiement et de maintenance.

La structure précise dépendra du provider et des outils retenus.

---

# 43. Arborescence cible

```text
/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (admin)/
│   │   │   │   ├── (client)/
│   │   │   │   └── (amap)/
│   │   │   ├── providers/
│   │   │   ├── middleware/
│   │   │   └── platform/
│   │   ├── public/
│   │   └── next.config.ts
│   │
│   ├── mobile/
│   │   ├── app/
│   │   │   ├── (admin)/
│   │   │   ├── (client)/
│   │   │   └── (amap)/
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   └── platform/
│   │   └── app.json
│   │
│   └── api/
│       ├── app/
│       │   ├── controllers/
│       │   │   ├── admin/
│       │   │   ├── customer/
│       │   │   ├── amap/
│       │   │   └── auth/
│       │   ├── middleware/
│       │   ├── validators/
│       │   ├── models/
│       │   ├── adapters/
│       │   │   ├── persistence/
│       │   │   │   ├── repositories/
│       │   │   │   └── mappers/
│       │   │   ├── email/
│       │   │   ├── sms/
│       │   │   └── notifications/
│       │   └── jobs/
│       ├── start/
│       │   └── routes.ts
│       ├── config/
│       ├── database/
│       │   ├── migrations/
│       │   ├── seeders/
│       │   └── factories/
│       ├── tests/
│       ├── bin/
│       ├── ace.js
│       └── adonisrc.ts
│
├── packages/
│   ├── screens/
│   │   ├── admin/
│   │   │   ├── today/
│   │   │   │   ├── today-screen.tsx
│   │   │   │   ├── today-screen.native.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   ├── order-list-screen.tsx
│   │   │   │   ├── order-list-screen.native.tsx
│   │   │   │   ├── order-details-screen.tsx
│   │   │   │   ├── order-validation-screen.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── preparation/
│   │   │   ├── availability/
│   │   │   ├── distribution/
│   │   │   ├── amap/
│   │   │   ├── customers/
│   │   │   └── settings/
│   │   │
│   │   ├── client/
│   │   │   ├── catalog/
│   │   │   ├── checkout/
│   │   │   └── order/
│   │   │
│   │   └── amap/
│   │       ├── home/
│   │       ├── basket/
│   │       ├── substitution/
│   │       └── history/
│   │
│   ├── ui/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── tokens/
│   │   ├── themes/
│   │   ├── icons/
│   │   ├── tamagui.config.ts
│   │   └── index.ts
│   │
│   ├── domains/
│   │   ├── catalog/
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── api/
│   │   │   ├── ui/
│   │   │   └── index.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── api/
│   │   │   ├── ui/
│   │   │   └── index.ts
│   │   │
│   │   ├── amap/
│   │   ├── distribution/
│   │   ├── customers/
│   │   └── notifications/
│   │
│   ├── core/
│   │   ├── http/
│   │   ├── date/
│   │   ├── money/
│   │   ├── errors/
│   │   ├── logger/
│   │   ├── storage/
│   │   └── result/
│   │
│   ├── api-client/
│   ├── config/
│   └── testing/
│
├── docs/
│   ├── architecture/
│   ├── functional/
│   ├── decisions/
│   └── api/
│
├── infra/
│   ├── docker/
│   ├── provisioning/
│   ├── manifests/
│   ├── database/
│   ├── monitoring/
│   └── scripts/
│
└── package.json
```

---

# 44. Règles architecturales

## 1. Les apps portent le runtime, pas l’application fonctionnelle

```text
apps/web
apps/mobile
```

gèrent principalement :

* routing ;
* bootstrap ;
* providers ;
* intégrations plateforme.

---

## 2. Les écrans vivent dans `packages/screens`

Un écran fonctionnel complet doit être réutilisable depuis plusieurs apps.

---

## 3. Les écrans sont cross-platform par défaut

La première implémentation est :

```text
screen.tsx
```

Une variante plateforme est ajoutée uniquement si nécessaire.

---

## 4. Utiliser les conventions standards Expo / React Native

Préférer :

```text
.native.tsx
.web.tsx
.ios.tsx
.android.tsx
```

à des conventions custom.

---

## 5. Le responsive est prioritaire sur la duplication

Une différence de layout ne suffit pas à créer deux écrans.

Tamagui doit gérer les adaptations simples.

---

## 6. Les variantes plateforme servent aux différences structurelles

Créer une variante lorsque :

* la navigation change ;
* la composition de l’écran change ;
* certaines interactions sont propres au natif ;
* le comportement web et mobile devient réellement différent.

---

## 7. Les écrans restent indépendants du routing

Les routes transmettent les paramètres et callbacks nécessaires.

---

## 8. Les écrans composent les domaines

```text
screens → domains
```

et non l’inverse.

---

## 9. Les composants métier restent dans `domains/*/ui`

Les composants réutilisables liés à un métier particulier ne doivent pas être enfouis dans un écran.

---

## 10. Les primitives restent dans `@project/ui`

Les domaines et écrans utilisent le design system interne.

---

## 11. Tamagui est une dépendance assumée

Le projet peut exploiter ses tokens, variants, thèmes et capacités responsive.

---

## 12. Tamagui est néanmoins consommé via `@project/ui`

Cela garantit une API et des conventions contrôlées par le projet.

---

## 13. Le domaine métier ne dépend d’aucun runtime

Pas de dépendance directe vers :

* Next.js ;
* Expo ;
* React Native ;
* Tamagui ;
* HTTP ;
* ORM ;
* PostgreSQL.

---

## 14. Les apps dépendent des packages, jamais l’inverse

```text
apps
 ↓
screens
 ↓
domains
 ↓
core
```

---

## 15. Chaque domaine expose une API publique

Les imports doivent passer par :

```text
@project/domains/orders
```

plutôt que par des chemins internes.

---

## 16. La persistence et les fournisseurs restent en périphérie

Les implémentations concrètes appartiennent au backend.

Pour la persistence :

```text
packages/domains
        ↓ contrats
apps/api/app/adapters/persistence
        ↓
Lucid
        ↓
PostgreSQL
```

Aucun import depuis `@adonisjs/*` ou `@adonisjs/lucid/*` n’est autorisé dans le métier pur.

---

## 17. L’historique métier utilise des snapshots

Les modifications futures ne doivent pas altérer :

* les anciennes commandes ;
* les anciennes publications ;
* les compositions déjà générées.

---

## 18. Éviter les dossiers fourre-tout

Limiter :

```text
utils
helpers
common
shared
services
```

au profit de responsabilités clairement nommées.

---

## 19. Ne pas surarchitecturer

Les dossiers et abstractions sont créés lorsqu’ils correspondent à un besoin réel.

L’arborescence représente une direction, pas l’obligation de créer immédiatement toutes les couches.

---

## 20. AdonisJS reste dans `apps/api`

AdonisJS fournit le runtime backend, HTTP, auth, validation, configuration, CLI et intégrations techniques.

Les packages métier ne doivent pas dépendre directement :

```text
@adonisjs/core
@adonisjs/auth
@adonisjs/lucid
```

---

## 21. Les modèles Lucid ne sont pas les entités métier

Préférer :

```text
Order
↕ mapper
OrderModel
```

à :

```text
Order extends BaseModel
```

lorsque `Order` porte des invariants métier.

Lucid est volontairement adopté comme technologie de persistence, mais il reste derrière les repositories et adapters du backend.

---

# 45. Direction des dépendances

```text
                         apps
                          │
                          ▼
                       screens
                          │
                ┌─────────┼─────────┐
                │         │         │
                ▼         ▼         ▼
             domains  api-client    ui
                │                    │
                ├──────────► ui      │
                │                    │
                └──────────► core ◄──┘
                                   │
                                   ▼
                              dépendances
                              techniques
```

Tamagui se trouve derrière :

```text
@project/ui
```

Le backend et ses adapters restent derrière les abstractions métier nécessaires.

Le flux backend cible est :

```text
AdonisJS
   │
   ├── controllers
   ├── validators
   ├── auth / middleware
   │
   ▼
application use cases
   │
   ▼
domain
   │
   ▼
repository contracts
   │
   ▼
apps/api adapters
   │
   ▼
Lucid
   │
   ▼
PostgreSQL
```

---

# 46. Philosophie finale

L’architecture repose sur cinq idées principales.

### Les runtimes sont des shells

Next.js et Expo ne portent pas l’essentiel de l’application.

Ils chargent des écrans provenant de `packages`.

### Les écrans sont réellement réutilisables

Le même écran est partagé lorsqu’il fonctionne correctement sur plusieurs plateformes.

Lorsque cela n’est plus pertinent, les conventions standards :

```text
.native
.web
.ios
.android
```

permettent une spécialisation ciblée.

### Les domaines portent le métier

Les écrans orchestrent le métier mais ne doivent pas devenir l’endroit où sont implémentées les règles métier fondamentales.

### AdonisJS fournit le runtime backend

AdonisJS est le framework API officiel du projet.

PostgreSQL est la base principale et Lucid la couche de persistence privilégiée.

Cette décision réduit le nombre de briques à composer tout en conservant une frontière stricte :

```text
AdonisJS / Lucid
        ↓
apps/api uniquement

packages/domains
        ↓
aucune dépendance framework / ORM
```

### Tamagui fournit le langage UI commun

Tamagui est assumé comme fondation cross-platform, tandis que `@project/ui` définit les conventions propres au produit.

Le résultat attendu est donc :

```text
Next.js ──┐
          │
          ▼
       Screens
          │
          ▼
       Domains
          │
          ▼
         Core

Expo ─────┘
```

avec la possibilité de spécialiser ponctuellement un écran ou un composant grâce aux conventions de plateforme standards, sans dupliquer l’ensemble de l’application.
