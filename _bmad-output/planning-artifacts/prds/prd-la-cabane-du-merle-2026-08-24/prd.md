---
title: PRD - Application de gestion pour maraicher bio V1
status: final
created: 2026-08-24
updated: 2026-08-24
---

# PRD - Application de gestion pour maraicher bio V1

## 1. Resume

L'application est le point central de verite des disponibilites, commandes, paniers AMAP, preparation et distribution d'un maraicher bio. Elle remplace la consolidation manuelle de demandes recues par email, SMS, telephone et WhatsApp par un parcours de commande web et une administration operationnelle utilisable sur le terrain.

La V1 privilegie la fiabilite du travail quotidien plutot que l'automatisation exhaustive : les disponibilites restent mises a jour manuellement, les commandes classiques sont validees par le maraicher, et la comptabilite, le paiement en ligne et Odoo sont hors perimetre.

## 2. Probleme et opportunite

Aujourd'hui, les commandes sont dispersees entre plusieurs canaux, les disponibilites sont diffusees manuellement et la preparation manque de vue centralisee. Cela augmente le temps administratif, les oublis et le risque d'erreur lors des marches, retraits et tournees.

La V1 doit permettre au maraicher de publier une offre a jour, recueillir les demandes via une interface unique, organiser la preparation et suivre la distribution. Cote client, elle doit rendre la commande et le suivi simples sans imposer la creation d'un compte, tout en proposant un espace dedie aux adherents AMAP.

## 3. Objectifs et mesure du succes

### Objectifs

- Centraliser les commandes et leur traitement operationnel.
- Rendre les disponibilites et leurs publications fiables et tracables.
- Reduire les frictions de commande pour les clients occasionnels et les adherents AMAP.
- Permettre une preparation et une cloture efficaces depuis un telephone ou une tablette.

### Indicateurs de succes

- Part des commandes saisies ou recues dans l'application.
- Temps hebdomadaire passe a consolider puis preparer les commandes.
- Nombre d'oublis, d'erreurs de statut ou de commandes non preparees.
- Taux de commandes classiques finalisees sans assistance.
- Utilisation reguliere de l'administration mobile ou tablette.

### Contre-indicateurs

- Une notification email non desiree ou sans consentement.
- Une complexite de saisie qui reinjecte un suivi externe (papier, tableur, messagerie).
- Une disponibilite affichee interpretee comme un stock garanti.

## 4. Perimetre

### Inclus en V1

- Application web responsive, avec administration adaptee au smartphone, a la tablette et a l'ordinateur.
- Gestion des produits, disponibilites, publications et notifications email consenties.
- Commandes classiques, de la demande a la livraison, avec ajustement des quantites reelles.
- Retraits, marches, tournees et leurs occurrences datees.
- Abonnements AMAP, generation de paniers, substitutions, suspensions et cessions.
- Vues de travail quotidien, preparation agregee, historique et cloture d'occurrence.

### Explicitement hors perimetre V1

- Paiement en ligne, suivi de reglement et comptabilite.
- Gestion de stock comptable ou reservation automatique.
- Application mobile native et notifications push.
- Collecte automatisee de commandes depuis email, SMS, WhatsApp ou telephone.
- Inscription et resiliation AMAP en ligne.
- Optimisation automatique des tournees.
- Integration, synchronisation ou facturation via Odoo.

## 5. Utilisateurs et parcours cles

### Maraicher administrateur

Le maraicher pilote produits, disponibilites, publications, commandes, preparation, AMAP, distribution et historique. Son parcours quotidien est : mettre a jour les disponibilites, publier si necessaire, valider les nouvelles commandes, preparer par occurrence, livrer, puis cloturer l'occurrence et ajuster les disponibilites.

### Client classique

Le client consulte les disponibilites, choisit produits et quantites, selectionne une recuperation et un paiement prevu, renseigne ses coordonnees et confirme sa commande. Il recoit un lien securise pour la consulter, la modifier ou l'annuler jusqu'a la date limite.

### Adherent AMAP

L'adherent connecte consulte son prochain panier et son solde de paniers. Avant sa date limite, il peut demander des substitutions, suspendre le panier, modifier son retrait ou le ceder. Il consulte egalement son historique.

## 6. Exigences fonctionnelles

### 6.1 Catalogue et disponibilites

- **FR-001** L'administrateur doit pouvoir creer, modifier, activer et desactiver un produit.
- **FR-002** Un produit doit contenir a minima son nom, une description optionnelle, son unite de reference et son prix unitaire.
- **FR-003** L'administrateur doit pouvoir definir la disponibilite d'un produit comme `Disponible`, `Selon disponibilite` ou `Indisponible`.
- **FR-004** Une disponibilite doit pouvoir contenir une quantite estimee et permettre d'en choisir la visibilite client.
- **FR-005** Le systeme doit permettre une quantite connue visible, connue masquee, ou non suivie.
- **FR-006** La mise a jour d'une disponibilite ne doit ni reserver ni deduire automatiquement de stock.
- **FR-007** Les commandes, preparations, livraisons et ventes hors application ne doivent pas modifier automatiquement les disponibilites.
- **FR-008** L'offre publique doit afficher la derniere publication active; une offre non publiee ne doit pas etre accessible a la commande publique.
- **FR-009** Une commande doit conserver la reference du snapshot de publication sur lequel elle a ete creee.

### 6.2 Publications et email

- **FR-010** L'administrateur doit pouvoir publier distinctement l'etat courant des disponibilites.
- **FR-011** Chaque publication doit creer un snapshot immuable des produits, disponibilites et informations commerciales publiees.
- **FR-012** Le systeme doit conserver et rendre consultable l'historique des publications.
- **FR-013** La modification ulterieure d'un produit, prix ou disponibilite ne doit pas modifier un snapshot existant.
- **FR-014** L'administrateur doit pouvoir choisir d'envoyer ou non un email lors d'une publication.
- **FR-015** Un email de publication ne doit etre envoye qu'aux utilisateurs inscrits ayant donne leur consentement explicite a recevoir ce type de communication.
- **FR-016** L'utilisateur inscrit doit pouvoir consulter et modifier son consentement aux emails de disponibilites, y compris se desinscrire via chaque email de publication.
- **FR-017** Un evenement de consentement doit conserver l'identite ou l'adresse concernee, la date, le libelle et la version de l'information affichee, la source et l'etat d'opt-in ou de retrait.
- **FR-018** Avant chaque envoi, le systeme doit exclure les adresses desinscrites, dupliquees ou marquees en echec definitif et conserver l'audit de la campagne.
- **FR-019** Aucun email transactionnel, de rappel ou de changement de statut n'est envoye en V1. Les seuls emails autorises sont les publications de disponibilites aux utilisateurs inscrits ayant donne leur opt-in.

### 6.3 Commandes classiques

- **FR-020** Un client classique doit pouvoir consulter les disponibilites et creer une commande sans compte.
- **FR-021** Le parcours de commande doit collecter produits, quantites demandees, une occurrence de recuperation, coordonnees et moyen de paiement prevu.
- **FR-022** Une commande doit pouvoir provenir du web ou etre creee depuis l'administration; sa source doit etre conservee.
- **FR-023** Toute commande classique creee doit initialement etre au statut `A valider`.
- **FR-024** L'administrateur doit pouvoir accepter une commande `A valider`, qui passe alors a `A preparer`.
- **FR-025** L'administrateur doit pouvoir annuler une commande et conserver son historique de statut.
- **FR-026** Pendant la preparation, l'administrateur doit pouvoir renseigner les quantites reelles, ajuster les lignes, renseigner le montant final et une remarque interne.
- **FR-027** L'administrateur doit pouvoir terminer la preparation d'une commande, qui passe a `Preparee`.
- **FR-028** L'administrateur doit pouvoir marquer une commande preparee comme `Livree`.
- **FR-029** Le workflow nominal classique doit etre `A valider -> A preparer -> Preparee -> Livree`, avec `Annulee` comme issue alternative.
- **FR-030** Une ligne de commande doit figer a la creation le produit, le libelle, l'unite, le prix unitaire applique et la quantite demandee; la quantite reelle et le montant final sont figes lorsqu'ils sont saisis ou corriges lors de la preparation.
- **FR-031** Le systeme doit calculer le montant final a partir de la quantite reelle et du prix unitaire lorsque ces valeurs existent.
- **FR-032** L'administrateur doit pouvoir corriger manuellement le montant final d'une commande avec un motif trace.
- **FR-033** Les informations commerciales d'une commande historique ne doivent pas etre modifiees par une evolution du produit.
- **FR-034** Apres confirmation, le client doit voir un lien securise et individuel permettant de consulter sa commande sans compte; aucun envoi email de ce lien n'est realise en V1.
- **FR-035** Avant sa date limite, le client doit pouvoir modifier ou annuler sa commande via ce lien securise.
- **FR-036** La date limite de modification doit etre parametree par le maraicher; la valeur initiale visee est la veille de la recuperation.
- **FR-037** Apres la date limite, le client doit conserver un acces en lecture seule, tandis que l'administrateur conserve la capacite de modifier la commande.
- **FR-038** Pour une commande preparee non recuperee, l'administrateur doit pouvoir l'annuler ou la reporter vers une nouvelle recuperation.
- **FR-039** Un report doit conserver la recuperation initiale, la nouvelle recuperation et l'auteur de l'action.
- **FR-040** Apres report, une commande peut revenir a `A preparer` pour verification avant la nouvelle recuperation.
- **FR-041** L'administrateur doit pouvoir consulter et corriger une fiche contact operationnelle et l'historique des commandes associees, sans imposer de compte au client classique.

### 6.4 Recuperation et distribution

- **FR-042** L'administrateur doit pouvoir creer, modifier, activer et desactiver des modes de recuperation.
- **FR-043** Un mode de recuperation doit pouvoir etre associe a un type fonctionnel : lieu fixe, marche ou tournee.
- **FR-044** Toute recuperation selectable doit correspondre a une occurrence datee prevue, terminee ou annulee.
- **FR-045** L'administrateur doit pouvoir gerer les informations d'un marche recurrent : nom, lieu, adresse, jour, horaires et statut.
- **FR-046** Le systeme doit distinguer un marche recurrent de ses occurrences datees.
- **FR-047** Les commandes associees a un marche doivent etre rattachees a son occurrence datee.
- **FR-048** L'administrateur doit pouvoir gerer une tournee, ses villages ou points de passage ordonnes manuellement et des horaires approximatifs; aucune optimisation automatique n'est requise.
- **FR-049** Le systeme doit distinguer une tournee recurrente de ses occurrences datees.
- **FR-050** Les commandes de livraison doivent etre rattachees a l'occurrence de tournee correspondante.

### 6.5 Preparation et pilotage quotidien

- **FR-051** La page d'accueil d'administration doit prioriser les actions a realiser aujourd'hui et demain.
- **FR-052** Elle doit afficher les commandes a valider, a preparer et preparees, ainsi que les occurrences imminentes et leur progression.
- **FR-053** Elle doit signaler les nouvelles commandes et une anciennete inhabituelle des disponibilites.
- **FR-054** L'administrateur doit pouvoir traiter les commandes sequentiellement, avec une navigation precedente/suivante et un indicateur de progression.
- **FR-055** Les actions de validation, preparation, finalisation des quantites et livraison doivent etre directement accessibles dans cette vue.
- **FR-056** Pour une occurrence, le systeme doit fournir une vue agregee des quantites a preparer.
- **FR-057** La vue agregee doit distinguer la composition des paniers AMAP des produits commandables en complement.
- **FR-058** La cloture d'une occurrence doit permettre de traiter les commandes restantes, mettre a jour les disponibilites et choisir entre enregistrer ou enregistrer et publier.
- **FR-059** Une occurrence cloturee doit passer a `Terminee` et rester accessible dans l'historique.

### 6.6 AMAP

- **FR-060** L'administrateur doit pouvoir creer et gerer les adherents AMAP et leurs comptes.
- **FR-061** Un abonnement doit conserver l'adherent, la date d'inscription, le type de panier, le jour de retrait par defaut, le point de retrait par defaut, le nombre de paniers restants, la prochaine echeance, la date limite de modification et son statut.
- **FR-062** L'inscription et la resiliation d'un abonnement AMAP ne sont pas accessibles en ligne en V1.
- **FR-063** L'administrateur doit pouvoir definir une composition de panier et de demi-panier par periode.
- **FR-064** La composition doit etre figee lorsqu'une commande AMAP est generee.
- **FR-065** L'administrateur doit pouvoir definir les produits de remplacement disponibles pour une periode.
- **FR-066** L'adherent doit pouvoir remplacer au plus deux elements de son prochain panier par des produits autorises avant la date limite.
- **FR-067** Les substitutions doivent etre visibles dans la commande AMAP sans calcul automatique d'equivalence de prix ou de poids.
- **FR-068** Le systeme doit generer progressivement les commandes issues des abonnements actifs avant leur echeance, une seule fois par echeance et pour l'occurrence de retrait applicable.
- **FR-069** Une commande AMAP generee doit demarrer directement a `A preparer`, sans validation manuelle.
- **FR-070** Le workflow nominal AMAP doit etre `A preparer -> Preparee -> Livree`.
- **FR-071** L'adherent doit pouvoir consulter son prochain panier, sa composition, son retrait, la date limite et son nombre de paniers restants.
- **FR-072** Avant la date limite, l'adherent doit pouvoir suspendre son panier, changer le retrait, le ceder ou effectuer des substitutions.
- **FR-073** Apres la date limite, ces actions doivent etre bloquees cote adherent et rester possibles cote administration.
- **FR-074** Une suspension ne doit pas consommer de panier; elle doit decaler l'echeance et etre historisee avec dates, auteur et motif optionnel.
- **FR-075** Une cession doit conserver l'adherent titulaire, le beneficiaire et ses coordonnees; le panier est consomme sur l'abonnement du titulaire lorsqu'il est livre.
- **FR-076** Le passage d'une commande AMAP a `Livree` doit consommer exactement une echeance et creer un evenement de consommation rattache a cette commande.
- **FR-077** Une correction de statut doit preserver ou corriger de facon tracable le solde de paniers restants.
- **FR-078** L'adherent doit pouvoir consulter l'historique de ses paniers, suspensions et cessions.

### 6.7 Historique et droits

- **FR-079** L'application doit conserver l'historique des publications, statuts de commande, reports, occurrences, suspensions, cessions et consommations AMAP.
- **FR-080** Les donnees clients doivent etre visibles seulement aux personnes autorisees a administrer l'exploitation.
- **FR-081** L'administration doit pouvoir modifier manuellement une commande quel que soit son canal de creation, avec tracabilite des actions significatives.
- **FR-082** Seuls les comptes administrateur authentifies peuvent administrer l'exploitation; un adherent authentifie ne peut consulter et modifier que ses donnees et paniers AMAP.
- **FR-083** Chaque action historique significative doit conserver au minimum l'acteur, l'horodatage, l'objet, l'action et les valeurs avant/apres lorsque celles-ci changent.

## 7. Exigences non fonctionnelles

- **NFR-001 Responsive** : les parcours client et administrateur doivent fonctionner sur smartphone, tablette et ordinateur; les actions operationnelles admin sont prioritaires sur petit ecran.
- **NFR-002 Simplicite** : les actions frequentes (modifier une disponibilite, valider, preparer, livrer, cloturer) doivent demander un minimum d'etapes et rester visibles.
- **NFR-003 RGPD** : l'application ne collecte que les donnees necessaires a la commande, a la distribution, a l'AMAP et aux communications consenties; elle doit informer les personnes du traitement de leurs donnees.
- **NFR-004 Consentement** : aucun email de disponibilites n'est adresse a une personne non inscrite ou n'ayant pas donne son opt-in; le retrait doit etre effectif pour les envois suivants.
- **NFR-005 Securite** : les liens de suivi de commande doivent etre difficiles a deviner, limites au perimetre de la commande concernee et revocables par l'administration.
- **NFR-006 Historique** : les snapshots publies et les donnees commerciales historisees doivent rester immuables; les changements metier doivent etre auditables.
- **NFR-007 Disponibilite operationnelle** : l'absence de synchronisation avec un outil externe ne doit pas bloquer la prise, la preparation, la livraison ni la cloture des commandes.
- **NFR-008 Droits des personnes** : l'administration doit disposer d'un processus documente pour repondre aux demandes d'acces, rectification, export et effacement ou anonymisation, sans detruire les obligations de conservation applicables.
- **NFR-009 Conservation** : les durees de conservation, les responsables de traitement et les sous-traitants seront documentes avant mise en production; les donnees personnelles ne doivent pas etre conservees au-dela de la duree definie.

## 8. Regles metier transverses

- Les disponibilites sont une estimation manuelle et ne constituent pas un stock comptable ni une reservation.
- La publication est une action explicite, distincte de la mise a jour des disponibilites.
- Les commandes classiques sont toujours soumises a validation manuelle.
- Les prix, libelles et unites applicables a une commande sont figes au moment de sa creation; les quantites reelles sont renseignees lors de la preparation.
- Une commande est toujours rattachee au contexte de recuperation pertinent, en particulier a une occurrence datee de marche ou tournee.
- L'abonnement AMAP reste rattache a l'adherent initial en cas de cession.

## 9. Hypotheses et points ouverts

- **[ASSUMPTION]** Le consentement email concerne uniquement les publications de disponibilites. Aucun email transactionnel n'est envoye en V1.
- **[ASSUMPTION]** Un compte adherent AMAP est cree et invite par le maraicher.
- **[ASSUMPTION]** La periode de generation anticipee d'une commande AMAP est configurable et vaut initialement trois jours avant l'echeance.
- **[ASSUMPTION]** Une publication email cible tous les utilisateurs inscrits dont l'opt-in est actif; les listes ou preferences supplementaires sont reportees.
- **[OPEN QUESTION]** Valider, avec le responsable RGPD, les durees de conservation, les mentions d'information et la procedure d'exercice des droits avant la mise en production.
- **[OPEN QUESTION]** Definir la duree de validite et le renouvellement des liens securises de commande avant la conception technique.

## 10. Evolutions envisagees

- Paiement en ligne et suivi des reglements.
- Synchronisation Odoo pour produits, contacts et facturation, decouplee du workflow operationnel.
- Import ou interpretation assistee des commandes email, SMS et WhatsApp.
- Application mobile native et notifications push.
- Rapprochement des ventes de marche et gestion de stock plus avancee.
- Optimisation des tournees.
