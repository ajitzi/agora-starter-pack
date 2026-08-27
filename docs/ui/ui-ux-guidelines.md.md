# Synthèse UI/UX — Application maraîcher bio

## 1. Objectif

L’interface doit être pensée avant tout pour une utilisation **mobile et tablette**, même si la V1 est une application web en Next.js.

Le maraîcher utilisera principalement l’administration :

* sur smartphone ;
* sur tablette ;
* sur le terrain ;
* potentiellement en extérieur ;
* avec peu de temps disponible ;
* avec un besoin d’actions rapides et répétitives.

Le principe directeur est donc :

> **Mobile = expérience de référence. Tablette = expérience optimisée. Desktop = extension de l’espace disponible.**

L’application ne doit pas être conçue comme une interface desktop ensuite compressée sur mobile.

---

# 2. Principes UX généraux

L’interface doit privilégier :

* une hiérarchie claire ;
* de grandes zones tactiles ;
* peu de saisie inutile ;
* des actions principales visibles ;
* peu de niveaux de navigation ;
* des parcours courts ;
* des feedbacks immédiats ;
* une utilisation confortable à une main lorsque possible ;
* une logique cohérente entre mobile, tablette et desktop.

Chaque écran doit répondre à une intention principale.

## Implémentation multiplateforme

Les écrans et composants partagés n’écrivent jamais de JSX HTML natif. Ils composent uniquement les primitives Tamagui et les composants de `@project/ui`, y compris les éléments de formulaire et de lien. Les rôles et propriétés d’accessibilité doivent être portables entre le web et les futures cibles native.

Exemples :

* Que dois-je faire aujourd’hui ?
* Quelles commandes dois-je valider ?
* Que dois-je préparer pour ce marché ?
* Quelles disponibilités dois-je mettre à jour ?
* Quels paniers AMAP sont prévus cette semaine ?

---

# 3. Responsive

Trois niveaux sont à considérer.

## Mobile

Environ 360 à 430 px.

Principes :

* une seule colonne ;
* navigation principale en bas ;
* actions principales sticky ;
* cartes plutôt que tableaux ;
* filtres dans des sheets ;
* formulaires verticaux ;
* priorité aux informations opérationnelles.

---

## Tablette

Environ 768 à 1024 px.

Principes :

* une ou deux colonnes selon le contexte ;
* master/detail lorsque pertinent ;
* maintien de gros contrôles tactiles ;
* davantage de contexte simultané ;
* meilleure exploitation du mode paysage.

La tablette constitue un support particulièrement important pour :

* la préparation ;
* la validation des commandes ;
* la gestion des disponibilités ;
* les workflows de marché et de tournée.

---

## Desktop

Le desktop reprend les mêmes principes que la tablette.

Il peut enrichir l’interface avec :

* sidebar permanente ;
* master/detail ;
* tableaux lorsque ceux-ci apportent réellement de la valeur ;
* colonnes supplémentaires ;
* historique visible simultanément.

Le desktop ne doit pas créer un fonctionnement mental différent.

---

# 4. Navigation administrateur

## Mobile

Navigation principale fixe en bas :

```text id="3vxkeo"
Aujourd’hui
Commandes
Préparer
Dispos
Plus
```

Les quatre premières entrées correspondent aux opérations les plus fréquentes.

`Plus` donne accès aux fonctions secondaires :

* Distribution ;
* AMAP ;
* Clients ;
* Produits ;
* Publications ;
* Paramètres.

---

## Tablette

En portrait, la navigation basse peut être conservée.

En paysage, elle peut évoluer vers une sidebar compacte.

---

## Desktop

Sidebar permanente reprenant la même hiérarchie.

Exemple :

```text id="83yek5"
Aujourd’hui

OPÉRATIONS
Commandes
Préparation
Disponibilités

GESTION
Distribution
AMAP
Clients

CONFIGURATION
Produits
Publications
Paramètres
```

---

# 5. Actions principales

Chaque écran doit avoir une action dominante clairement identifiable.

Exemples :

```text id="rswkf2"
Accepter la commande
Terminer la préparation
Publier
Continuer
Clôturer
Envoyer ma commande
```

Sur mobile, l’action principale doit généralement être placée dans une barre fixe en bas.

Les actions secondaires sont visuellement moins fortes.

Les actions destructives telles que :

```text id="gtk66g"
Annuler
Supprimer
```

ne doivent jamais avoir la même importance visuelle que l’action principale.

---

# 6. Feedback utilisateur

Chaque action importante doit produire un retour immédiat.

Exemples :

```text id="8hd8cy"
✓ Commande acceptée

✓ Préparation terminée

✓ Disponibilités enregistrées

✓ Publication effectuée
```

En cas de traitement séquentiel, l’application passe ensuite automatiquement à l’élément suivant.

---

# 7. Écran `Aujourd’hui`

`AdminTodayScreen` constitue la home principale de l’administration.

Son objectif est de répondre à :

> **Que dois-je faire maintenant ?**

L’écran ne doit pas être un dashboard statistique.

---

## Mobile

Ordre recommandé :

1. urgences ;
2. commandes à valider ;
3. activité la plus imminente ;
4. autres activités du jour ;
5. lendemain ;
6. alertes secondaires.

Exemple :

```text id="j7rvlo"
Aujourd’hui
Lundi 24 août

À TRAITER

5 commandes à valider

[ Traiter les commandes ]


AUJOURD’HUI

Tournée Nord
14:00

5 / 7 préparées

[ Continuer ]


Retrait ferme
17:00

1 / 3 préparée

[ Préparer ]


DEMAIN

Marché Saint-Pierre
08:00

18 commandes
13 préparées

[ Voir ]
```

---

## Tablette

Le même contenu peut être présenté sur deux colonnes.

Exemple :

```text id="cj8bni"
┌───────────────────┬───────────────────┐
│ À traiter         │ Alertes           │
│                   │                   │
│ Activités du jour │ Demain            │
└───────────────────┴───────────────────┘
```

---

# 8. Liste des commandes

`AdminOrderListScreen` doit être conçu d’abord comme une liste de cartes.

Les informations prioritaires sont :

1. client ;
2. lieu / mode de récupération ;
3. date / heure ;
4. statut ;
5. volume de commande.

---

## Mobile

Exemple :

```text id="tlmo87"
Commandes

[À valider 5]
[À préparer 12]
[Prêtes 8]

[ Rechercher ]

[Aujourd’hui] [Filtres]


Marie Dupont
Marché Saint-Pierre
Samedi · 08:00

4 articles
~24 €

À valider
```

Chaque carte est entièrement tappable.

---

## Tablette

En portrait : même principe en liste.

En paysage : possibilité de master/detail.

```text id="q0elaw"
┌──────────────────────┬────────────────────────────┐
│ Liste commandes      │ Détail commande           │
└──────────────────────┴────────────────────────────┘
```

---

# 9. Filtres

Sur mobile, les filtres avancés sont affichés dans un `Sheet`.

Exemple :

```text id="ry66xo"
Filtres

DATE
Aujourd’hui
Demain
Cette semaine
Personnalisée

STATUT
...

RÉCUPÉRATION
...

ORIGINE
...

[ Réinitialiser ]
[ Appliquer ]
```

Ce pattern doit être réutilisé dans toute l’application.

---

# 10. Détail d’une commande

`AdminOrderDetailsScreen` regroupe la totalité des informations nécessaires à une commande.

---

## Mobile

Organisation verticale :

```text id="5ovsyu"
Commande #1048

À valider


MARIE DUPONT

Téléphone
Email


RÉCUPÉRATION

Marché Saint-Pierre
Samedi 29 août
08:00–12:00


PRODUITS

Tomates
2 kg
4 €/kg

Courgettes
3 pièces
2 €/pièce


COMMENTAIRE

...


PAIEMENT

CB


HISTORIQUE

Voir l’historique


[ Modifier ]

[ Accepter la commande ]
```

L’action principale reste sticky.

---

## Tablette

Deux colonnes possibles :

```text id="a93obc"
┌───────────────────────┬───────────────────────┐
│ Commande / produits   │ Client                │
│ Préparation           │ Récupération          │
│                       │ Paiement / historique │
└───────────────────────┴───────────────────────┘
```

---

# 11. Validation séquentielle

`AdminOrderValidationScreen` est conçu pour traiter rapidement plusieurs commandes.

Le maraîcher ne doit pas devoir revenir à la liste après chaque action.

Exemple :

```text id="9kp5yi"
Validation

Commande 3 / 7


Marie Dupont
Marché Saint-Pierre
Samedi


Tomates
2 kg
Disponible

Aubergines
1 kg
Selon disponibilité

Salade
1
Disponible


Note client
...


[ Modifier ]

Passer pour l’instant

[ Accepter ]
```

Après acceptation :

```text id="ltueic"
✓ Commande acceptée
```

puis la commande suivante s’affiche automatiquement.

---

# 12. Préparation — liste des activités

`AdminPreparationListScreen` doit présenter les activités à préparer et non une longue liste de commandes.

Objectif :

> **Pour quelle activité dois-je préparer ?**

Exemple :

```text id="c2dp63"
Préparer

AUJOURD’HUI

Tournée Nord
14:00

5 / 7 préparées

[ Continuer ]


Retrait ferme
17:00

1 / 3 préparée

[ Préparer ]


DEMAIN

Marché Saint-Pierre
08:00

13 / 18 préparées

[ Continuer ]
```

---

# 13. Préparation d’une activité

`AdminPreparationScreen` est centré sur une occurrence précise.

Exemple :

```text id="munwqw"
Marché Saint-Pierre

Samedi 29 août

18 commandes
13 préparées
```

Deux onglets :

```text id="h39uvp"
Global
Commandes
```

---

# 14. Vue globale de préparation

Cette vue permet de préparer les volumes avant de traiter les commandes individuellement.

Exemple mobile :

```text id="96dpzs"
PANIERS

11 paniers
4 demi-paniers


À PRÉPARER

Tomates
≈ 29 kg

Courgettes
≈ 18 kg

Salades
24

Carottes
16 bottes


EXCEPTIONS AMAP

4 substitutions
1 cession


[ Continuer la préparation ]
```

---

## Tablette

Une table légère peut être utilisée :

```text id="5vzi1m"
Produit       Paniers   Extras   Total
Tomates       18 kg     11 kg    29 kg
Courgettes    10 kg      8 kg    18 kg
```

---

# 15. Liste des commandes d’une activité

L’onglet `Commandes` permet de voir l’état de chaque commande.

Exemple :

```text id="tbfab5"
✓ Marie Dupont
  Panier AMAP

✓ Paul Martin
  3 produits

○ Lucie Bernard
  Demi-panier

○ Antoine
  4 produits
```

Les commandes terminées doivent être visuellement secondaires.

Action principale :

```text id="dz5g3t"
Continuer la préparation
```

---

# 16. Préparation séquentielle

`AdminPreparationRunScreen` doit être optimisé pour une utilisation tactile.

Exemple :

```text id="u1vc8s"
Marché Saint-Pierre

Commande 6 / 18


MARIE DUPONT

Panier AMAP


PANIER

Tomates
Salade
Courgettes


REMPLACEMENT

Aubergines
↓
Poivrons


COMPLÉMENT

Tomates

Demandé
≈ 2 kg

Poids réel
[ 2,14 kg ]

4 €/kg

8,56 €


TOTAL
8,56 €


[ Terminer la préparation ]
```

---

## Principes de saisie

Les inputs utilisés pendant la préparation doivent :

* être grands ;
* ouvrir directement le clavier numérique ;
* afficher l’unité ;
* calculer immédiatement le montant ;
* minimiser les clics.

---

## Panier AMAP

Le maraîcher ne doit pas devoir cocher chaque produit standard.

L’interface met surtout en évidence les exceptions :

* substitutions ;
* cessions ;
* ajouts ;
* remarques.

---

# 17. Disponibilités

`AdminAvailabilityScreen` est conçu pour une modification très rapide.

Sur mobile, privilégier des cartes éditables plutôt qu’un tableau.

Exemple :

```text id="dii756"
Disponibilités

✓ Enregistré

7 changements non publiés


TOMATES CŒUR DE BŒUF

[Disponible]
[Selon dispo]
[Indispo]

Quantité estimée
[ 18 ] kg

Afficher aux clients
[ Oui ]

4 €/kg
```

---

# 18. Enregistrement vs publication

La distinction doit être très claire.

L’écran peut afficher :

```text id="83pne5"
✓ Modifications enregistrées

7 changements non publiés
```

Modifier une disponibilité ne doit pas être perçu comme une publication.

---

# 19. Publication des disponibilités

`AdminPublishAvailabilityScreen` doit être un écran complet.

Exemple :

```text id="9s0hqg"
Publier

7 modifications


CHANGEMENTS

Tomates
Selon dispo → Disponible

Aubergines
Disponible → Indisponible

Courgettes
8 kg → 3 kg


MESSAGE

[ ... ]


PRÉVENIR PAR

[x] Email
72 personnes

[x] Notification web
28 personnes

[ ] SMS
Non configuré


[ Publier maintenant ]
```

---

# 20. Produits

La gestion des produits est secondaire par rapport aux disponibilités.

Sur mobile :

```text id="tnccod"
Produits

[ + ]

Tomates cœur de bœuf
4 €/kg
Actif

Courgettes
3 €/kg
Actif
```

La création et l’édition peuvent utiliser :

* un `Sheet` plein écran sur téléphone ;
* un drawer sur tablette / desktop.

---

# 21. Distribution

La home Distribution doit privilégier une timeline plutôt qu’un calendrier complexe.

Exemple :

```text id="ipouef"
Distribution

[Planning]
[Marchés]
[Tournées]


LUNDI 24

Retrait ferme
17:00
3 commandes


MERCREDI 26

Tournée Nord
14:00
7 commandes


SAMEDI 29

Marché Saint-Pierre
08:00
18 commandes
```

---

## Tablette

Une vue semaine plus riche peut être proposée, notamment en paysage.

---

# 22. Tournées

L’édition d’une tournée doit être simple et tactile.

Exemple :

```text id="8428z9"
Tournée Nord

Mercredi
Départ 14:00


TRAJET

≡ Saint-Pierre
≡ Montville
≡ Le Bourg
≡ Marché Saint-Pierre


[ Ajouter un village ]
```

Le drag & drop peut être proposé, mais une alternative explicite de réorganisation doit exister.

---

# 23. Clôture d’une activité

La clôture d’un marché ou d’une tournée est un workflow en étapes.

## Étape 1 — Commandes non récupérées

```text id="bwsv0w"
17 / 18 livrées

Marie Dupont
Non récupérée

[ Reporter ]
[ Annuler ]
```

## Étape 2 — Disponibilités

Possibilité de mettre rapidement à jour les disponibilités.

## Étape 3 — Publication

Choix :

```text id="ga3bcm"
Enregistrer

Enregistrer et publier
```

Puis clôture de l’occurrence.

---

# 24. AMAP administrateur

La home AMAP est centrée sur la semaine courante.

Exemple :

```text id="b8aezq"
AMAP

Semaine du 24 août


PANIER

Tomates
Courgettes
Salade
Carottes
Aubergines

[ Modifier ]


REMPLACEMENTS

Poivrons
Betteraves
Courges

[ Modifier ]


CETTE SEMAINE

32 paniers prévus
3 suspendus
2 cédés
27 commandes générées
```

---

# 25. Liste des abonnements AMAP

Sur mobile, utiliser des cartes.

Exemple :

```text id="3xm5wl"
Marie Dupont

Panier
Jeudi
Marché Saint-Pierre

18 paniers restants
```

Sur tablette, une vue master/detail peut être utilisée.

---

# 26. Détail abonnement AMAP

Exemple :

```text id="x9c9l2"
Marie Dupont

Panier

18 paniers restants

Inscrite depuis
12 mars 2025


PROCHAIN PANIER

Jeudi 27 août
Marché Saint-Pierre

Modifications jusqu’au
mardi 20:00


HISTORIQUE

20 août
Livré

13 août
Livré

6 août
Suspendu

30 juillet
Cédé à Paul
```

---

# 27. Client classique — catalogue

Le parcours client doit être fortement optimisé pour smartphone.

Exemple :

```text id="5izwbi"
Les légumes disponibles

Dernière publication
Aujourd’hui · 08:32


Tomates cœur de bœuf

Disponible

4 €/kg

Quantité
[-] 2 kg [+]


Courgettes

Selon disponibilité

3 €/kg

[-] 1 kg [+]


[ Voir ma commande · 3 articles ]
```

Pas de grille e-commerce complexe.

---

# 28. Checkout client

Le checkout doit idéalement tenir sur une seule page verticale.

Sections :

1. produits ;
2. récupération ;
3. coordonnées ;
4. moyen de paiement ;
5. validation.

Exemple :

```text id="byh0pa"
Votre commande


PRODUITS

...


RÉCUPÉRATION

Marché Saint-Pierre
Samedi 29 août

[ Modifier ]


VOS COORDONNÉES

Prénom
Nom
Téléphone
Email


PAIEMENT

CB
Espèces
Chèque


[ Envoyer ma commande ]
```

---

# 29. Suivi d’une commande client

Accessible via lien sécurisé.

Exemple :

```text id="uqp2pu"
Votre commande

#1048

À préparer


Marché Saint-Pierre
Samedi 29 août


Tomates
2 kg

Salade
1


Modification possible jusqu’à
vendredi 18:00


[ Modifier ]
[ Annuler ]
```

Dès que la commande est préparée, les actions de modification disparaissent.

---

# 30. AMAP côté adhérent

L’écran principal est centré sur le prochain panier.

Exemple :

```text id="xfwu5a"
Bonjour Marie


PROCHAIN PANIER

Jeudi 27 août

Panier complet

Marché Saint-Pierre


18 paniers restants


Modifications possibles jusqu’à
mardi 20:00


[ Modifier mon panier ]

[ Changer le retrait ]

[ Céder mon panier ]

[ Suspendre cette semaine ]


COMPOSITION

Tomates
Courgettes
Salade
Carottes
Aubergines
```

---

## Tablette

Les principales actions peuvent être affichées en grille 2 × 2.

---

# 31. Patterns UI transverses

Plusieurs composants doivent être standardisés dans `@project/ui`.

Exemples :

```text id="10tgcl"
Screen
ScreenHeader
StickyActionBar
EntityCard
StatusBadge
ProgressCard
EmptyState
FilterSheet
ConfirmDialog
NumericInput
SegmentedControl
ResponsivePane
```

Ces composants ne portent pas de logique métier.

Ils garantissent la cohérence de l’expérience entre les différents écrans.

---

# 32. `Screen`

Composant racine permettant de standardiser :

* padding ;
* largeur maximale ;
* safe areas ;
* scrolling ;
* comportement mobile/tablette ;
* gestion d’une éventuelle action sticky.

---

# 33. `StickyActionBar`

Utilisé pour les actions importantes.

Exemples :

```text id="yw7g8p"
Accepter la commande

Terminer la préparation

Publier

Envoyer ma commande
```

Sur mobile, ce composant reste visible en bas de l’écran.

Sur desktop, il peut devenir une zone d’action classique.

---

# 34. `FilterSheet`

Composant partagé pour les filtres avancés.

Sur mobile :

* sheet depuis le bas.

Sur tablette :

* sheet ou panneau latéral.

Sur desktop :

* drawer ou popover plus large.

---

# 35. `NumericInput`

Composant important pour :

* poids réel ;
* quantité ;
* prix ;
* nombre de produits.

Il doit proposer :

* gros contrôles ;
* unité visible ;
* clavier adapté ;
* boutons `+ / -` lorsque pertinent.

---

# 36. Règle responsive générale

Le comportement attendu est :

```text id="bvjdgg"
MOBILE
1 colonne
↓
TABLETTE
1 colonne large ou 2 colonnes pertinentes
↓
DESKTOP
2 colonnes / master-detail si utile
```

Le passage au desktop ne doit pas conduire à remplir artificiellement l’espace.

---

# 37. Responsive avant duplication

Pour un écran partagé :

```text id="8xo9zx"
screen.tsx
```

les adaptations simples doivent être réalisées via Tamagui.

Exemples :

* `row` vers `column` ;
* modification du padding ;
* cartes sur une ou deux colonnes ;
* largeur maximale.

Une variante :

```text id="6t01sz"
screen.native.tsx
```

ne doit être introduite que si le parcours ou la structure change réellement.

---

# 38. États vides

Les états vides doivent être utiles et actionnables.

Éviter :

```text id="5fkgi9"
Aucune donnée.
```

Préférer :

```text id="fky9sx"
Aucune commande à préparer aujourd’hui.

Prochaine activité :
Marché Saint-Pierre
Samedi à 8h.

[ Voir ]
```

---

# 39. États d’erreur

Les erreurs doivent être explicites et localisées.

Exemples :

```text id="ywxblw"
Connexion perdue.
Votre modification n’a pas encore été enregistrée.
```

ou :

```text id="sr1fg9"
Cette commande a été modifiée depuis son ouverture.

[ Voir la nouvelle version ]
```

Éviter tout écrasement silencieux.

---

# 40. États de chargement

Les loaders doivent conserver autant que possible la structure de l’écran.

Préférer des skeletons aux écrans entièrement vides avec spinner central.

Les actions critiques ne doivent pas être disponibles tant que leur état n’est pas fiable.

---

# 41. Accessibilité

Le design mobile-first doit également respecter :

* zones tactiles suffisamment grandes ;
* contraste suffisant ;
* statuts jamais représentés uniquement par une couleur ;
* labels explicites ;
* focus clavier sur desktop ;
* navigation au clavier ;
* lecteurs d’écran ;
* messages d’erreur associés aux champs concernés.

---

# 42. Priorités de conception

Les premiers écrans à maquetter doivent être les écrans réellement utilisés au quotidien.

## Administration P0

1. `AdminTodayScreen`
2. `AdminOrderListScreen`
3. `AdminOrderDetailsScreen`
4. `AdminOrderValidationScreen`
5. `AdminPreparationScreen`
6. `AdminPreparationRunScreen`
7. `AdminAvailabilityScreen`
8. `AdminPublishAvailabilityScreen`

---

## Client P0

9. `CustomerCatalogScreen`
10. `CustomerCheckoutScreen`
11. `CustomerOrderDetailsScreen`

---

## AMAP P0

12. `AmapHomeScreen`
13. `AmapBasketScreen`

---

# 43. Ordre de maquettage

Chaque écran doit être dessiné dans cet ordre :

### 1. Mobile

Référence initiale autour de 375 px.

### 2. Tablette

Portrait puis paysage si pertinent.

### 3. Desktop

Validation de l’enrichissement responsive.

La conception ne doit pas commencer par une maquette desktop.

---

# 44. Parcours admin principal

Le cycle quotidien peut être résumé ainsi :

```text id="mlnekq"
Aujourd’hui
    ↓
Commandes à valider
    ↓
Validation séquentielle
    ↓
Préparation d’une activité
    ↓
Vue globale
    ↓
Préparation séquentielle
    ↓
Livraison / retrait
    ↓
Clôture
    ↓
Mise à jour des disponibilités
    ↓
Publication éventuelle
```

L’UX doit optimiser ce cycle avant toute fonctionnalité secondaire.

---

# 45. Parcours client principal

```text id="36vsfj"
Disponibilités
    ↓
Sélection des produits
    ↓
Commande
    ↓
Récupération
    ↓
Coordonnées
    ↓
Confirmation
    ↓
Suivi via lien sécurisé
```

Le nombre d’étapes perçues doit rester minimal.

---

# 46. Parcours AMAP principal

```text id="izvhrq"
Prochain panier
    ↓
Consulter la composition
    ↓
Éventuellement :
    ├── substituer
    ├── changer le retrait
    ├── céder
    └── suspendre
    ↓
Préparation automatique côté maraîcher
    ↓
Livraison
```

---

# 47. Philosophie UI/UX finale

L’interface doit être conçue comme un **outil opérationnel de terrain**, pas comme un back-office administratif classique.

Les priorités sont :

* rapidité ;
* lisibilité ;
* tactile ;
* faible charge cognitive ;
* actions explicites ;
* parcours courts ;
* cohérence entre téléphone et tablette ;
* responsive progressif vers le desktop.

Le principe final peut se résumer ainsi :

> **Sur mobile, on montre ce qu’il faut faire maintenant. Sur tablette, on ajoute le contexte utile. Sur desktop, on ajoute de l’espace, pas de la complexité.**
