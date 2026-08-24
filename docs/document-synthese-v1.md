# Synthèse fonctionnelle — Application de gestion pour maraîcher bio

## 1. Contexte

Le maraîcher gère actuellement ses disponibilités et ses commandes de manière largement manuelle.

Les disponibilités en légumes et paniers sont communiquées une à deux fois par semaine, principalement par email. Les commandes sont ensuite reçues via différents canaux : email, WhatsApp, SMS ou téléphone.

Cette organisation entraîne plusieurs difficultés :

* dispersion des commandes entre plusieurs canaux ;
* consolidation manuelle des demandes ;
* manque de visibilité centralisée sur les commandes à préparer ;
* gestion manuelle des disponibilités ;
* difficulté à communiquer rapidement les changements ;
* gestion spécifique des abonnements AMAP ;
* manque de visibilité pour les clients sur les marchés, points de retrait et tournées de livraison.

L’objectif est de créer une application web permettant de centraliser ces opérations et de simplifier le quotidien du maraîcher comme celui de ses clients.

---

# 2. Objectif du produit

L’application doit permettre au maraîcher de :

* gérer et publier ses disponibilités ;
* centraliser les commandes ;
* gérer les abonnements et paniers AMAP ;
* organiser la préparation des commandes ;
* gérer les marchés, points de retrait et tournées ;
* communiquer les nouvelles disponibilités et changements aux clients ;
* conserver un historique fiable de son activité.

Pour les clients, l’application doit permettre de :

* consulter les disponibilités en cours ;
* commander sans créer obligatoirement de compte ;
* choisir un mode de récupération ;
* suivre et modifier une commande dans les délais autorisés ;
* pour les adhérents AMAP, gérer leur prochain panier et leur abonnement.

L’application est avant tout un outil de **publication, réservation, préparation et distribution**, et non un système complet d’e-commerce ou de gestion comptable des stocks.

---

# 3. Périmètre de la V1

La première version sera exclusivement une **application web responsive**, avec une attention particulière portée à l’utilisation sur :

* smartphone ;
* tablette ;
* ordinateur.

L’interface d’administration devra notamment être conçue pour une utilisation mobile et tablette sur le terrain.

Une application mobile native pourra être envisagée ultérieurement, notamment pour améliorer les notifications et les usages quotidiens.

---

# 4. Utilisateurs

## 4.1 Maraîcher / administrateur

Le maraîcher dispose d’un compte administrateur lui permettant de gérer l’ensemble de l’application :

* produits ;
* disponibilités ;
* publications ;
* commandes ;
* préparation ;
* clients ;
* AMAP ;
* marchés ;
* tournées ;
* modes de récupération ;
* notifications ;
* historique.

L’administration constitue l’outil de travail principal.

---

## 4.2 Client classique

Un client classique n’a pas besoin de créer de compte.

Il peut :

* consulter les disponibilités ;
* passer une commande ;
* renseigner ses coordonnées ;
* choisir un mode de récupération ;
* sélectionner un moyen de paiement prévu ;
* recevoir un lien sécurisé vers sa commande ;
* consulter son statut ;
* modifier ou annuler sa commande avant la date limite.

Le client est principalement représenté dans le système comme un contact associé à une ou plusieurs commandes.

---

## 4.3 Adhérent AMAP

Un adhérent AMAP possède obligatoirement un compte.

Il peut :

* consulter son abonnement ;
* connaître le nombre de paniers restants ;
* consulter son prochain panier ;
* suspendre un panier ;
* effectuer des substitutions ;
* modifier son point de retrait ;
* céder son panier à une autre personne ;
* consulter son historique.

L’inscription à l’AMAP et la résiliation de l’abonnement ne sont pas gérées dans la V1.

---

# 5. Produits et disponibilités

## 5.1 Produit

Un produit représente un article proposé par le maraîcher.

Exemples :

* tomate cœur de bœuf ;
* courgette ;
* salade ;
* carotte ;
* aubergine.

Un produit comporte notamment :

* nom ;
* description éventuelle ;
* unité de référence ;
* prix unitaire ;
* statut actif / inactif.

Exemples d’unités :

* kilogramme ;
* pièce ;
* botte ;
* panier.

---

## 5.2 Disponibilité

La disponibilité représente l’état commercial actuel d’un produit.

Trois états sont prévus :

* **Disponible**
* **Selon disponibilité**
* **Indisponible**

Une disponibilité peut également comporter :

* une quantité estimée ;
* une unité ;
* un indicateur permettant d’afficher ou non la quantité au client.

Trois cas sont donc possibles :

### Quantité connue et visible

Exemple :

> Tomates — Disponible — 18 kg

### Quantité connue mais masquée

Le maraîcher connaît une estimation, mais le client voit uniquement :

> Tomates — Disponible

### Quantité non suivie

Le produit peut simplement être affiché comme :

> Aubergines — Selon disponibilité

---

# 6. Gestion du stock

La V1 ne doit pas calculer automatiquement le stock.

Le maraîcher reste responsable de la mise à jour manuelle des disponibilités et quantités estimées.

En particulier :

* une commande ne réserve pas automatiquement du stock ;
* une commande préparée ne réduit pas automatiquement la disponibilité ;
* une commande livrée ne réduit pas automatiquement la disponibilité ;
* les ventes réalisées hors application ne sont pas remontées automatiquement.

Après un marché ou une tournée, l’application doit toutefois proposer au maraîcher de mettre rapidement à jour ses disponibilités.

Le système sert donc à centraliser et organiser la demande, et non à tenir un inventaire comptable précis.

---

# 7. Publications des disponibilités

Le maraîcher peut modifier ses disponibilités à tout moment.

Ces modifications ne sont pas automatiquement communiquées aux clients.

Il dispose d’une action distincte :

**Publier les disponibilités**

Lors d’une publication :

1. l’état courant des disponibilités est enregistré ;
2. un snapshot immuable est conservé ;
3. le maraîcher choisit les canaux de notification ;
4. les clients concernés reçoivent l’information.

Exemples de canaux :

* email ;
* notification web ;
* SMS ;
* ultérieurement notification mobile.

L’historique des publications doit être conservé.

Exemple :

* 24 août — 08:32 ;
* 20 août — 17:45 ;
* 17 août — 07:50.

Une ancienne publication ne doit pas être modifiée lorsqu’un produit ou un prix est mis à jour ultérieurement.

---

# 8. Commande : objet central du système

La commande constitue l’élément opérationnel principal de l’application.

Elle peut provenir de différentes sources.

### Sources V1

* Web ;
* Administration ;
* AMAP.

### Sources envisagées ultérieurement

* Email ;
* SMS ;
* WhatsApp ;
* agent automatisé.

Une future automatisation pourra notamment analyser les messages reçus sur différents canaux et créer automatiquement une commande dans l’application tout en conservant un lien vers le message original.

---

# 9. Cycle de vie d’une commande

## 9.1 Commande classique

Toutes les commandes classiques doivent être validées manuellement par le maraîcher.

Workflow :

**À valider → À préparer → Préparée → Livrée**

Un état supplémentaire est disponible :

**Annulée**

---

## 9.2 À valider

Le maraîcher contrôle notamment :

* les produits commandés ;
* les quantités demandées ;
* les disponibilités réelles ;
* la date prévue ;
* le mode de récupération ;
* les éventuelles remarques.

Action principale :

**Accepter la commande**

La commande passe alors en :

**À préparer**

---

## 9.3 À préparer

La commande a été acceptée mais n’est pas encore physiquement prête.

Pendant cette phase, le maraîcher peut notamment renseigner :

* les quantités ou poids réels ;
* les ajustements nécessaires ;
* le montant final ;
* une remarque interne.

Action :

**Terminer la préparation**

---

## 9.4 Préparée

La commande est physiquement prête.

Elle doit apparaître dans les listes opérationnelles liées :

* au marché ;
* au retrait ferme ;
* à la tournée ;
* ou à tout autre mode de récupération.

Action :

**Marquer comme livrée**

---

## 9.5 Livrée

La commande est terminée.

Dans le cas d’une commande AMAP, le passage au statut **Livrée** consomme un panier de l’abonnement.

---

# 10. Quantités et prix

Les prix unitaires sont fixes et connus.

La variation provient principalement du poids ou de la quantité réellement préparée.

Exemple :

> Tomates — 4 €/kg

Le client commande :

> environ 2 kg.

Lors de la préparation, le maraîcher renseigne :

> poids réel : 2,14 kg.

Le montant final devient alors :

> 8,56 €.

Une ligne de commande doit donc conserver :

* produit ;
* libellé au moment de la commande ;
* unité ;
* prix unitaire appliqué ;
* quantité demandée ;
* quantité réelle ;
* montant final.

Le maraîcher doit conserver la possibilité de corriger manuellement le montant final si nécessaire.

Les prix et informations commerciales d’une ancienne commande doivent rester inchangés même si le produit est modifié ultérieurement.

---

# 11. Modification et annulation d’une commande

Un client classique peut modifier ou annuler sa commande via son lien sécurisé.

Ces actions sont possibles jusqu’à la veille de la récupération.

Cette limite doit idéalement être paramétrable.

Exemple :

> Modification possible jusqu’à J-1 à 18h.

Après cette date :

* la commande reste consultable ;
* le client ne peut plus la modifier ;
* le maraîcher conserve la possibilité de la modifier depuis l’administration.

---

# 12. Commande non récupérée

Une commande préparée mais non récupérée peut être :

* annulée ;
* reportée.

Le choix appartient au maraîcher.

Un report doit être historisé.

Exemple :

> Commande initialement prévue au marché du 29 août, reportée au retrait ferme du 1er septembre.

Le report est considéré comme un événement métier plutôt qu’un état final permanent.

Après un report, la commande peut revenir au statut :

**À préparer**

afin de garantir qu’elle sera réévaluée avant la nouvelle date de récupération.

---

# 13. Paiement

Le paiement en ligne n’est pas géré dans la V1.

Lors de la commande, le client peut indiquer le moyen de paiement prévu.

Exemples :

* carte bancaire ;
* espèces ;
* chèque.

Le paiement est effectué lors de la récupération de la commande.

L’application conserve uniquement cette information à titre opérationnel.

---

# 14. Modes de récupération

Les modes de récupération sont configurables par le maraîcher.

Exemples :

* retrait à la ferme ;
* marché ;
* livraison ;
* point AMAP ;
* dépôt partenaire.

Le maraîcher doit pouvoir créer de nouveaux modes depuis l’administration.

Afin de conserver une logique applicative cohérente, un mode de récupération peut être rattaché à un type technique tel que :

* lieu fixe ;
* marché ;
* tournée.

---

# 15. Marchés

Un marché représente une activité récurrente.

Exemple :

> Marché de Saint-X — chaque samedi matin.

Un marché comporte notamment :

* nom ;
* lieu ;
* adresse ;
* jour ;
* horaires ;
* statut actif / inactif.

---

# 16. Occurrences de marché

Le marché récurrent doit être distingué de sa réalisation à une date précise.

Exemple :

### Marché

> Marché de Saint-X — chaque samedi.

### Occurrence

> Marché de Saint-X — samedi 29 août 2026 — 08:00 à 12:30.

Les commandes sont associées à une occurrence précise.

Une occurrence peut notamment être :

* prévue ;
* terminée ;
* annulée.

---

# 17. Tournées

Une tournée représente un trajet de livraison.

Exemple :

> Tournée Nord

avec une liste ordonnée de villages :

> Ferme → Village A → Village B → Village C → Marché.

Aucune optimisation automatique de trajet n’est nécessaire dans la V1.

Le maraîcher définit manuellement :

* les villages ;
* leur ordre ;
* éventuellement les horaires approximatifs.

---

# 18. Occurrences de tournée

Comme pour un marché, une tournée peut être récurrente mais doit également disposer d’occurrences datées.

Exemple :

### Tournée

> Tournée Nord — chaque mercredi.

### Occurrence

> Tournée Nord — mercredi 26 août 2026.

Les commandes de livraison sont rattachées à cette occurrence.

---

# 19. Vue opérationnelle administrateur

La page d’accueil de l’administration doit être conçue comme un outil de travail quotidien plutôt que comme un dashboard statistique.

Elle doit répondre immédiatement à la question :

> Que dois-je faire aujourd’hui ?

Exemple :

## Aujourd’hui

### À valider

5 commandes.

### À préparer

12 commandes.

### Préparées

8 commandes.

### Tournée Nord — 14:00

7 commandes
5 / 7 préparées.

### Retrait ferme — 17:00

3 commandes
3 / 3 préparées.

## Demain

### Marché de Saint-X — 08:00

18 commandes
11 paniers AMAP
7 commandes classiques.

Des alertes opérationnelles peuvent également être affichées :

> 4 nouvelles commandes depuis votre dernière visite.

> Les disponibilités n’ont pas été mises à jour depuis plusieurs jours.

---

# 20. Traitement séquentiel des commandes

Le maraîcher doit pouvoir traiter les commandes rapidement, notamment sur téléphone ou tablette.

Une interface séquentielle est prévue :

> Commande 4 / 12

avec navigation :

> précédente / suivante.

Cela permet notamment de :

* valider plusieurs commandes ;
* préparer les commandes une par une ;
* finaliser les quantités ;
* renseigner les montants ;
* passer rapidement à la commande suivante.

Les actions principales doivent rester simples et visibles.

---

# 21. Vue agrégée de préparation

Avant un marché ou une tournée, le maraîcher doit également pouvoir consulter les quantités globales à préparer.

Exemple :

## Marché de samedi

* 18 paniers ;
* 7 demi-paniers ;
* environ 31 kg de tomates ;
* 17 kg de courgettes ;
* 25 salades ;
* 18 bottes de carottes.

L’application doit pouvoir distinguer :

* les éléments nécessaires à la composition des paniers ;
* les produits commandés en complément.

Cette vue permet au maraîcher d’organiser la préparation globale avant le traitement individuel des commandes.

---

# 22. Clôture d’un marché ou d’une tournée

À la fin d’une occurrence, le maraîcher dispose d’un workflow de clôture.

## Étape 1 — Vérification des commandes

Exemple :

> 17 / 18 commandes livrées.

Pour une commande restante :

* annuler ;
* reporter.

## Étape 2 — Mise à jour des disponibilités

Le maraîcher peut rapidement modifier :

* statut ;
* quantité estimée ;
* visibilité.

## Étape 3 — Publication éventuelle

Deux actions doivent être distinguées :

**Enregistrer les disponibilités**

ou :

**Enregistrer et publier**

Cela évite de notifier les clients lors de chaque ajustement interne.

## Étape 4 — Clôture

L’occurrence passe au statut :

**Terminée**

et reste consultable dans l’historique.

---

# 23. AMAP

## 23.1 Abonnement

Un abonnement AMAP comporte notamment :

* adhérent ;
* date d’inscription ;
* type de panier ;
* jour de récupération par défaut ;
* point de récupération par défaut ;
* nombre de paniers restants ;
* prochaine date prévue ;
* délai limite de modification ;
* statut actif / inactif.

La date d’inscription doit être conservée même lorsque des paniers sont suspendus.

---

# 24. Panier et demi-panier

Deux formats sont prévus :

* panier ;
* demi-panier.

La composition change chaque semaine.

Exemple :

### Composition semaine 35

* tomates ;
* courgettes ;
* salade ;
* carottes ;
* aubergines.

Le demi-panier contient les mêmes types de produits mais en quantité réduite.

L’application n’a pas besoin d’afficher des demi-unités artificielles comme :

> 0,5 salade.

Le maraîcher gère les quantités réelles selon la taille des produits disponibles.

---

# 25. Composition hebdomadaire du panier

La composition du panier doit être définie pour chaque période, typiquement chaque semaine.

Cette composition doit être figée lorsqu’une commande AMAP est générée.

Une modification ultérieure de la composition globale ne doit pas modifier rétroactivement les commandes déjà générées.

---

# 26. Produits de remplacement AMAP

Chaque semaine, le maraîcher peut définir une liste de produits disponibles comme remplacements possibles.

Exemple :

### Produits de remplacement

* poivrons ;
* betteraves ;
* pommes de terre ;
* courges.

L’adhérent peut remplacer jusqu’à deux éléments de son panier par des produits issus de cette liste.

Les substitutions doivent être clairement visibles dans la commande.

Exemple :

> Aubergines — retirées
> Poivrons — remplacement

Aucun calcul automatique d’équivalence de prix ou de poids n’est requis dans la V1.

---

# 27. Génération progressive des commandes AMAP

Les commandes AMAP sont générées progressivement à partir des abonnements actifs.

Exemple :

> Marie reçoit normalement son panier le jeudi.

Quelques jours avant l’échéance, le système génère automatiquement la commande correspondante.

Une commande AMAP ne nécessite pas de validation manuelle.

Elle entre directement dans le statut :

**À préparer**

Workflow :

**À préparer → Préparée → Livrée**

---

# 28. Date limite de modification AMAP

Chaque adhérent dispose :

* d’un jour de récupération par défaut ;
* d’une date limite de modification.

Avant cette date, il peut :

* suspendre son panier ;
* modifier le point de récupération ;
* céder son panier ;
* effectuer ses substitutions.

Après cette date, la modification est bloquée côté adhérent.

Le maraîcher peut toujours effectuer une modification depuis l’administration.

---

# 29. Suspension d’un panier AMAP

Lorsqu’un adhérent suspend son panier :

* aucun panier n’est consommé ;
* le nombre de paniers restants ne change pas ;
* la prochaine échéance est décalée ;
* la suspension est historisée.

Exemple :

> Marie possède 18 paniers restants.

Elle suspend une semaine.

Elle conserve :

> 18 paniers restants.

L’historique doit conserver :

* date initialement prévue ;
* date du report ;
* éventuellement motif ;
* auteur de la modification.

Le nombre de reports peut être calculé à partir de cet historique.

---

# 30. Cession d’un panier AMAP

Un adhérent peut céder son panier à une autre personne.

L’abonnement reste rattaché à l’adhérent initial.

Exemple :

> Abonnement : Marie
> Bénéficiaire : Paul.

Les coordonnées du bénéficiaire peuvent être enregistrées.

Une fois la commande livrée :

> un panier est consommé sur l’abonnement de Marie.

La cession est conservée dans l’historique.

---

# 31. Décompte des paniers AMAP

Un panier est consommé uniquement lorsque la commande AMAP passe au statut :

**Livrée**

Le compteur ne doit pas simplement être décrémenté sans traçabilité.

Le système doit conserver l’événement de consommation associé à la commande afin de pouvoir corriger une erreur de statut sans désynchroniser le nombre de paniers restants.

---

# 32. Parcours client classique

Le parcours doit rester court.

## Étape 1

Consultation des disponibilités.

## Étape 2

Sélection des produits et quantités.

## Étape 3

Choix du mode de récupération.

## Étape 4

Saisie des coordonnées :

* prénom ;
* nom ;
* téléphone ;
* email éventuellement.

## Étape 5

Choix du moyen de paiement prévu.

## Étape 6

Confirmation.

Le client reçoit ensuite un lien sécurisé lui permettant de suivre sa commande.

---

# 33. Espace client AMAP

La page principale d’un adhérent doit être centrée sur son prochain panier.

Exemple :

## Votre prochain panier

Jeudi 27 août

Panier complet
Marché de Saint-X

**18 paniers restants**

Modifications possibles jusqu’au :

> mardi 25 août à 20h.

Actions disponibles :

* Modifier mon panier ;
* Changer le retrait ;
* Céder mon panier ;
* Suspendre cette semaine.

La page peut également afficher :

* composition du panier ;
* substitutions ;
* historique des paniers.

---

# 34. Notifications

Les notifications sont importantes aussi bien pour le maraîcher que pour les clients.

Plusieurs catégories doivent être distinguées.

## Notifications commerciales

Exemple :

> Les nouvelles disponibilités viennent d’être publiées.

## Notifications client

Exemple :

> Votre commande est prête.

## Notifications AMAP

Exemple :

> Vous pouvez modifier votre panier jusqu’à mardi 20h.

## Notifications administrateur

Exemple :

> Une nouvelle commande vient d’être reçue.

Le maraîcher doit pouvoir configurer ses préférences afin d’éviter un volume excessif de notifications.

---

# 35. Concepts métier principaux

Le modèle fonctionnel repose principalement sur les concepts suivants.

## Catalogue

* Produit ;
* Disponibilité ;
* Publication ;
* Snapshot de publication.

## Commandes

* Commande ;
* Ligne de commande ;
* Contact client ;
* Source de commande ;
* Statut ;
* Quantité demandée ;
* Quantité réelle ;
* Prix final.

## AMAP

* Adhérent ;
* Abonnement ;
* Composition hebdomadaire ;
* Panier / demi-panier ;
* Produits de remplacement ;
* Substitution ;
* Suspension ;
* Cession ;
* consommation de panier.

## Distribution

* Mode de récupération ;
* Marché ;
* Occurrence de marché ;
* Tournée ;
* Occurrence de tournée ;
* Village / point de passage.

## Communication

* Publication ;
* Notification ;
* Canal ;
* préférences.

---

# 36. Règles fonctionnelles principales

Les règles suivantes constituent les principaux invariants de la V1.

1. Les disponibilités sont mises à jour manuellement par le maraîcher.

2. Aucune commande ne modifie automatiquement les disponibilités.

3. Les disponibilités peuvent être `Disponible`, `Selon disponibilité` ou `Indisponible`.

4. Une quantité estimée peut être connue et affichée, connue mais masquée, ou absente.

5. Toutes les commandes classiques commencent en `À valider`.

6. Une commande classique suit le workflow :

   `À valider → À préparer → Préparée → Livrée`.

7. Une commande AMAP est générée directement en `À préparer`.

8. Une commande AMAP suit le workflow :

   `À préparer → Préparée → Livrée`.

9. Les quantités demandées et réellement préparées sont distinctes.

10. Le prix unitaire est fixé au moment de la commande.

11. Le montant final dépend de la quantité réellement préparée.

12. Les données commerciales historiques d’une commande doivent rester figées.

13. Un client classique n’a pas besoin de compte.

14. Une commande classique peut être modifiée ou annulée jusqu’à sa deadline.

15. Une commande non récupérée peut être annulée ou reportée par le maraîcher.

16. Un report doit être historisé.

17. Les modes de récupération sont configurables.

18. Les commandes sont associées à une occurrence précise de marché, tournée ou retrait lorsque cela est pertinent.

19. Modifier les disponibilités ne déclenche pas automatiquement une publication.

20. Une publication crée un snapshot immuable des disponibilités communiquées.

21. L’historique des publications est conservé.

22. Une suspension AMAP ne consomme aucun panier.

23. Une suspension AMAP est historisée.

24. Une cession AMAP consomme le panier normalement lorsqu’il est livré.

25. Une commande AMAP livrée consomme exactement une échéance.

26. Le nombre de paniers restants doit rester traçable et corrigible.

27. Le maraîcher conserve toujours la possibilité de modifier manuellement une commande depuis l’administration.

---

# 37. Éléments explicitement hors périmètre V1

Les fonctionnalités suivantes ne sont pas nécessaires pour la première version.

## Paiement en ligne

Le paiement est réalisé lors de la récupération.

## Gestion comptable du stock

Le stock reste piloté manuellement.

## Optimisation automatique des tournées

L’ordre des villages est défini manuellement.

## Application mobile native

La V1 est une application web responsive.

## Inscription AMAP en ligne

Les adhérents sont créés par le maraîcher.

## Résiliation AMAP en ligne

Non gérée dans la V1.

## Centralisation automatisée des messages

La récupération automatique des commandes reçues par :

* email ;
* WhatsApp ;
* SMS ;

est envisagée dans une version ultérieure.

---

# 38. Évolutions possibles après la V1

Plusieurs évolutions naturelles sont identifiées.

### Application mobile

Pour améliorer :

* notifications push ;
* rapidité d’accès ;
* utilisation terrain.

### Agent de centralisation des commandes

Analyse automatique des messages provenant de :

* email ;
* SMS ;
* WhatsApp.

L’agent pourrait :

* identifier le client ;
* interpréter les produits et quantités ;
* créer la commande ;
* conserver le message source ;
* demander une validation en cas d’ambiguïté.

### Gestion plus avancée des stocks

À terme :

* réservations ;
* calcul automatique ;
* rapprochement entre ventes physiques et commandes.

### Paiement intégré

Éventuellement :

* paiement en ligne ;
* suivi des règlements ;
* rapprochement comptable.

### Optimisation de tournée

Calcul automatique de l’ordre de livraison si le volume le justifie.

---

# 39. Principes UX

La V1 doit être conçue autour de plusieurs principes.

## Priorité aux opérations

L’application admin doit mettre en avant :

* ce qu’il faut valider ;
* ce qu’il faut préparer ;
* ce qui est prêt ;
* ce qui doit être livré.

## Mobile-first pour l’administration

Les actions courantes doivent être réalisables facilement depuis :

* smartphone ;
* tablette.

## Peu d’étapes

Le maraîcher doit pouvoir :

* changer une disponibilité ;
* valider une commande ;
* préparer une commande ;
* clôturer un marché ;

avec un minimum d’interactions.

## Pas de complexité inutile côté client

Un client classique doit pouvoir commander sans créer de compte.

## Historique fiable

Les événements importants doivent être conservés :

* publications ;
* commandes ;
* reports ;
* suspensions ;
* cessions ;
* occurrences ;
* livraisons.

---

# 40. Vision synthétique du produit

Le fonctionnement global de la V1 peut être résumé ainsi :

**Le maraîcher met à jour ses disponibilités**

↓

**Il publie une nouvelle liste**

↓

**Les clients sont notifiés**

↓

**Les clients passent commande**

↓

**Le maraîcher valide les commandes**

↓

**Les commandes sont regroupées par date et mode de récupération**

↓

**Le maraîcher prépare les commandes**

↓

**Les commandes sont récupérées ou livrées**

↓

**Le maraîcher clôture le marché ou la tournée**

↓

**Il met éventuellement les disponibilités à jour**

↓

**Une nouvelle publication peut être envoyée**

Pour les adhérents AMAP, ce cycle est complété par une génération automatique des paniers à partir des abonnements.

---

# 41. Positionnement de la V1

La V1 doit rester volontairement pragmatique.

Elle ne cherche pas à automatiser l’ensemble de l’exploitation agricole.

Elle doit avant tout devenir le **point central de vérité pour les disponibilités, les commandes et la préparation**.

Le succès de l’application pourra notamment être évalué par :

* la réduction du temps passé à gérer les commandes ;
* la diminution des oublis et erreurs ;
* la réduction du nombre de commandes dispersées entre différents canaux ;
* la simplicité de préparation des marchés et tournées ;
* l’adoption par les clients ;
* la capacité du maraîcher à utiliser l’administration quotidiennement depuis son téléphone ou sa tablette.

La prochaine étape recommandée est la définition détaillée de l’**arborescence de la V1 et des parcours écran par écran**, en commençant par l’administration, qui concentre la majorité des besoins opérationnels.

---

# 42. Intégration avec Odoo

Le maraîcher utilise actuellement Odoo pour la facturation électronique.

La V1 ne doit pas chercher à remplacer Odoo sur les fonctions pour lesquelles celui-ci constitue déjà un outil adapté. L’objectif est plutôt de définir une séparation claire entre :

* **l’application maraîcher**, qui reste l’outil métier et opérationnel principal ;
* **Odoo**, utilisé comme back-office commercial, fiscal et comptable.

Le principe retenu est donc :

> **Application maraîcher = disponibilités, commandes, AMAP, préparation et distribution**
> **Odoo = référentiel commercial, facturation et comptabilité**

## 42.1 Responsabilités de l’application maraîcher

L’application reste la source de vérité pour :

* disponibilités ;
* publications ;
* commandes ;
* statuts des commandes ;
* quantités demandées ;
* quantités réellement préparées ;
* AMAP ;
* paniers ;
* substitutions ;
* suspensions ;
* cessions ;
* marchés ;
* occurrences ;
* tournées ;
* modes de récupération ;
* préparation ;
* livraison ;
* historique opérationnel.

Odoo ne doit pas piloter ces workflows.

En particulier, la gestion AMAP restera entièrement dans l’application, car ses règles sont trop spécifiques pour être correctement représentées par un système d’abonnement générique.

---

## 42.2 Produits et prix

Odoo peut être utilisé comme référentiel commercial pour certaines informations produits, notamment :

* nom commercial ;
* unité ;
* prix unitaire ;
* TVA ;
* informations nécessaires à la facturation.

L’application conserve en revanche les informations spécifiques au métier :

* disponibilité ;
* statut `Disponible / Selon disponibilité / Indisponible` ;
* quantité estimée ;
* visibilité de la quantité ;
* composition des paniers ;
* produits de remplacement ;
* publications.

Un produit de l’application peut donc être associé à son équivalent Odoo grâce à un identifiant de correspondance.

Cela permet notamment d’éviter de maintenir indépendamment les prix et informations fiscales dans deux systèmes.

---

## 42.3 Commandes et facturation

La commande reste créée et gérée dans l’application.

Lorsque son état est suffisamment stabilisé, les informations nécessaires peuvent être transmises à Odoo.

Pour la V1, une synchronisation tardive est privilégiée, par exemple lors du passage de la commande au statut :

**Livrée**

À ce moment, l’application dispose des informations définitives :

* client ;
* produits ;
* prix unitaires ;
* quantités ou poids réellement remis ;
* montant final ;
* informations nécessaires à la facturation.

Odoo peut ensuite prendre en charge :

* la commande commerciale si nécessaire ;
* la génération de la facture ;
* la facturation électronique ;
* la comptabilité ;
* l’archivage fiscal.

Cette organisation correspond particulièrement bien au fonctionnement du maraîcher : le prix unitaire est fixé, mais le poids réellement livré peut être légèrement différent du poids demandé.

---

## 42.4 Contacts

L’application conserve les coordonnées nécessaires à la gestion opérationnelle des clients.

Tous les clients occasionnels n’ont pas nécessairement besoin d’être créés immédiatement dans Odoo.

Un contact Odoo peut être créé ou associé lorsque cela devient nécessaire, notamment pour :

* produire une facture ;
* gérer un client professionnel ;
* conserver une relation commerciale régulière.

Une correspondance peut être conservée entre :

> Client application ↔ Contact Odoo

---

## 42.5 Modules Odoo à privilégier

Les composants Odoo présentant le plus d’intérêt sont :

### Facturation / Comptabilité

À conserver comme système de référence pour :

* facturation ;
* facturation électronique ;
* obligations fiscales ;
* comptabilité.

### Produits

Potentiellement utilisables comme référentiel des informations commerciales :

* prix ;
* unité ;
* TVA.

### Contacts

Utilisables pour les clients nécessitant une existence commerciale ou fiscale dans Odoo.

### Ventes

Peuvent éventuellement être utilisées comme étape intermédiaire entre une commande finalisée dans l’application et sa facturation.

---

## 42.6 Modules Odoo à ne pas intégrer au cœur de la V1

### Inventory

La gestion de stock Odoo n’est pas adaptée au fonctionnement retenu pour la V1.

Les disponibilités sont volontairement :

* estimatives ;
* pilotées manuellement ;
* indépendantes des commandes.

L’application ne cherche pas à gérer un inventaire comptable ni des mouvements de stock automatiques.

### Subscriptions

La gestion AMAP possède des règles métier spécifiques :

* nombre de paniers restants ;
* composition hebdomadaire ;
* panier / demi-panier ;
* substitutions ;
* suspension sans consommation ;
* reports ;
* cession ;
* point de retrait variable.

Ces règles doivent rester gérées directement par l’application.

### eCommerce

Le parcours client prévu est suffisamment spécifique pour justifier une interface dédiée :

* commande sans compte ;
* disponibilités particulières ;
* poids variables ;
* marchés et tournées ;
* AMAP ;
* liens sécurisés de suivi.

La boutique Odoo n’est donc pas envisagée comme frontend principal de la V1.

---

## 42.7 Odoo POS comme évolution possible

Odoo Point of Sale peut présenter un intérêt dans une évolution ultérieure pour les ventes réalisées directement sur les marchés.

Il pourrait permettre au maraîcher de saisir rapidement les ventes physiques et de centraliser :

* produits vendus ;
* montants ;
* moyens de paiement ;
* tickets ;
* factures éventuelles ;
* données comptables.

Cette évolution pourrait à terme réduire la quantité de corrections manuelles effectuées après un marché.

Elle n’est toutefois pas nécessaire dans la V1.

Le workflow de clôture et de mise à jour manuelle des disponibilités reste privilégié dans un premier temps.

---

## 42.8 Communication et futur agent de commandes

Certaines briques de communication Odoo pourront également être étudiées ultérieurement :

* email ;
* SMS ;
* WhatsApp.

Elles pourraient être utilisées pour la diffusion de certaines communications ou comme point d’entrée du futur système de centralisation automatique des commandes.

À terme, un flux pourrait par exemple être :

> Message WhatsApp / email / SMS
> → récupération du message
> → analyse par un agent
> → création d’une commande dans l’application
> → conservation du message source
> → validation par le maraîcher.

L’application doit néanmoins rester propriétaire du workflow de commande.

---

## 42.9 Architecture d’intégration

L’intégration Odoo doit être réalisée via une couche dédiée.

Principe :

> Application
> → Connecteur Odoo
> → Odoo

Le domaine métier de l’application ne doit pas dépendre directement des modèles techniques internes d’Odoo.

Le connecteur peut exposer des opérations telles que :

* synchroniser un produit ;
* synchroniser un client ;
* transmettre une commande ;
* transmettre les quantités réellement livrées ;
* créer ou demander une facture ;
* récupérer le statut d’une facture.

Des correspondances doivent être conservées entre les objets des deux systèmes.

Exemple :

> Produit application ↔ Produit Odoo

> Client application ↔ Contact Odoo

> Commande application ↔ Vente / Facture Odoo

---

## 42.10 Résilience de l’intégration

Odoo ne doit pas être placé dans le chemin critique des opérations quotidiennes.

Une indisponibilité temporaire d’Odoo ne doit jamais empêcher le maraîcher de :

* accepter une commande ;
* préparer une commande ;
* la marquer comme livrée ;
* clôturer un marché ou une tournée.

Les données sont d’abord enregistrées dans l’application.

La synchronisation avec Odoo intervient ensuite.

En cas d’échec :

* l’opération métier reste valide ;
* l’erreur de synchronisation est enregistrée ;
* une nouvelle tentative peut être effectuée ultérieurement.

---

## 42.11 Point à vérifier avant implémentation

Avant de retenir définitivement l’intégration, il faudra vérifier :

* la version d’Odoo actuellement utilisée ;
* le type d’hébergement ;
* l’abonnement souscrit ;
* les applications disponibles ;
* les possibilités d’accès à l’API externe ;
* le coût éventuel d’un changement d’offre ;
* les données produits et clients déjà présentes dans Odoo.

Ces éléments permettront de déterminer si une intégration API complète est rentable dès la V1 ou si une synchronisation plus limitée doit être privilégiée.

---

## 42.12 Positionnement retenu

Odoo ne doit donc pas devenir le cœur de l’application.

L’architecture cible est :

**Application maraîcher**

> outil métier spécialisé
> disponibilités → commandes → AMAP → préparation → distribution

**Odoo**

> back-office commercial et fiscal
> produits/prix → clients → facturation → facturation électronique → comptabilité

Cette séparation permet de profiter des briques déjà disponibles dans Odoo sans imposer ses contraintes aux workflows spécifiques du maraîcher.

Elle évite également de reconstruire dans l’application des fonctionnalités complexes et sensibles — en particulier la facturation et la comptabilité — qui ne constituent pas son cœur de valeur.
