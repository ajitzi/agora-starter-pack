---
title: PRD - Application de gestion pour maraicher bio V1
status: final
created: 2026-08-24
updated: 2026-08-25
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
- **FR-002a** L'unite de reference doit provenir d'une liste controlee. Elle est modifiable seulement tant que le produit n'a ete utilise ni dans une commande, une publication, une composition AMAP ou un historique de preparation; apres usage, un changement de mode de vente impose de desactiver l'ancien produit et d'en creer un nouveau.
- **FR-002b** La desactivation d'un produit le retire des nouveaux usages sans supprimer ni modifier les commandes, publications ou compositions AMAP historisees. La suppression physique n'est pas exposee en V1.
- **FR-003** L'administrateur doit pouvoir definir la disponibilite d'un produit comme `Disponible`, `Selon disponibilite` ou `Indisponible`.
- **FR-004** Une disponibilite doit pouvoir contenir une quantite estimee et permettre d'en choisir la visibilite client.
- **FR-005** Le systeme doit permettre une quantite connue visible, connue masquee, ou non suivie.
- **FR-006** La mise a jour d'une disponibilite ne doit ni reserver ni deduire automatiquement de stock.
- **FR-007** Les commandes, preparations, livraisons et ventes hors application ne doivent pas modifier automatiquement les disponibilites.
- **FR-008** L'URL publique unique de l'offre doit toujours afficher la derniere publication active. Une offre non publiee ou un snapshot historique ne doit pas etre accessible a la commande publique.
- **FR-009** Une commande doit conserver la reference et la version du snapshot de publication affiche au moment de sa creation. La publication d'une nouvelle offre ne modifie ni ses lignes ni son montant initial; une personne ouvrant l'URL publique apres cette publication voit uniquement la nouvelle offre.
- **FR-009a** L'offre publique doit indiquer que les quantites sont estimatives et non reservees. Une quantite affichee, meme connue, ne constitue pas un engagement de fourniture.

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
- **FR-019** Aucun email transactionnel, de rappel ou de changement de statut n'est envoye en V1, a l'exception du lien de definition ou de reinitialisation de mot de passe. Les publications de disponibilites restent reservees aux utilisateurs inscrits ayant donne leur opt-in.
- **FR-019a** L'inscription aux publications doit etre disponible depuis un formulaire public distinct de la commande. Elle collecte une adresse email, affiche la mention d'information versionnee et une case d'opt-in non pre-cochable. Une adresse n'est ajoutee qu'une fois; une nouvelle inscription apres retrait cree un nouvel evenement de consentement. Aucun email de double opt-in n'est envoye en V1.
- **FR-019b** Un email de publication doit contenir l'identite de l'exploitation expedrice, une adresse de reponse, l'objet de la publication, un lien vers l'offre publique et un lien de desinscription individuel. Le consentement marketing ne conditionne jamais la commande ni son lien de suivi affiche a l'ecran.
- **FR-019c** Une campagne doit conserver son contenu, sa publication source, le destinataire, le statut d'envoi et les echecs definitifs. Les echecs definitifs placent l'adresse en suppression; les echecs temporaires sont retentes au plus deux fois avant d'etre journalises comme echec.
- **FR-019d** La creation d'une publication et son envoi email sont deux operations distinctes : une publication reussie reste active et consultable meme en cas d'echec total ou partiel de la campagne. Les echecs doivent etre consultables et ne bloquent ni la cloture d'une occurrence ni les autres operations.

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
- **FR-031a** A la creation, le montant indicatif est la somme de chaque quantite demandee multipliee par le prix unitaire fige, arrondie au centime par ligne puis totalisee. Pendant la preparation, le montant calcule utilise les quantites reelles et les memes prix unitaires figes; une quantite reelle nulle retire la ligne du montant final sans supprimer son historique.
- **FR-032** L'administrateur doit pouvoir corriger manuellement le montant final d'une commande avec un motif trace. L'ecrasement manuel prevaut sur le montant calcule, conserve les deux valeurs et l'auteur, et reste visible au client via son lien securise une fois la commande preparee.
- **FR-032a** Le lien client affiche les quantites demandees et le montant indicatif aux statuts `A valider` et `A preparer`; il affiche les quantites reelles et le montant final, y compris un ecrasement manuel, aux statuts `Preparee` et `Livree`. Pour une commande `Annulee`, il affiche le dernier montant applicable et le statut d'annulation. Les ajustements en cours de preparation ne sont pas visibles au client avant le passage a `Preparee`.
- **FR-033** Les informations commerciales d'une commande historique ne doivent pas etre modifiees par une evolution du produit.
- **FR-034** Apres confirmation, le client doit voir un lien securise et individuel permettant de consulter sa commande sans compte; aucun envoi email de ce lien n'est realise en V1.
- **FR-035** Avant sa date limite, le client doit pouvoir modifier ou annuler sa commande via ce lien securise.
- **FR-035a** Une modification client reste possible uniquement avant la date limite et tant que la commande n'est pas `Preparee`, `Livree` ou `Annulee`. La modification d'une commande `A preparer` la ramene a `A valider`, recalcule son montant indicatif depuis son snapshot et cree un diff consultable par l'administration avant sa nouvelle validation.
- **FR-036** La date limite de modification doit etre parametree par le maraicher; la valeur initiale visee est la veille de la recuperation.
- **FR-037** Apres la date limite, le client doit conserver un acces en lecture seule, tandis que l'administrateur conserve la capacite de modifier la commande.
- **FR-038** Pour une commande preparee non recuperee, l'administrateur doit pouvoir l'annuler ou la reporter vers une nouvelle recuperation.
- **FR-039** Un report doit conserver la recuperation initiale, la nouvelle recuperation et l'auteur de l'action.
- **FR-040** Apres report, une commande peut revenir a `A preparer` pour verification avant la nouvelle recuperation.
- **FR-041** L'administrateur doit pouvoir consulter et corriger une fiche contact operationnelle et l'historique des commandes associees, sans imposer de compte au client classique.
- **FR-041a** Tant que la date limite de l'occurrence n'est pas atteinte, une modification client recalcule le montant indicatif a partir du snapshot de commande et laisse une trace. Apres la date limite, seule l'administration peut modifier; toute modification de ligne, montant, occurrence ou statut exige un motif et cree un evenement d'audit.
- **FR-041b** Lorsqu'une demande classique ne peut pas etre servie, l'administrateur doit pouvoir fixer une quantite reelle inferieure ou nulle, ou annuler la commande. Le client voit l'ajustement et son montant final lorsque la commande passe a `Preparee`; aucune validation client supplementaire n'est requise en V1. Les substitutions de produits sont reservees aux paniers AMAP.

### 6.4 Recuperation et distribution

- **FR-042** L'administrateur doit pouvoir creer, modifier, activer et desactiver des modes de recuperation.
- **FR-043** Un mode de recuperation doit pouvoir etre associe a un type fonctionnel : lieu fixe, marche ou tournee.
- **FR-044** Toute recuperation selectable doit correspondre a une occurrence datee prevue, terminee ou annulee.
- **FR-044a** Une occurrence contient un mode de recuperation, une date et heure de debut, une date et heure de fin, une date et heure limite de commande, le fuseau `Europe/Paris` et un statut `Prevue`, `Annulee` ou `Terminee`. Seule une occurrence `Prevue`, dont la date limite n'est pas depassee, est selectable. V1 ne limite pas la capacite ou le nombre de commandes.
- **FR-044b** L'administrateur doit pouvoir creer une occurrence ponctuelle et generer, confirmer ou modifier les occurrences recurrentes jusqu'a 90 jours a l'avance. Une occurrence passee ne peut pas etre modifiee sauf pour passer a `Terminee`; l'annulation conserve les commandes rattachees et impose a l'administration de les annuler ou de les reporter avant cloture.
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
- **FR-059** Une occurrence executee cloturee doit passer a `Terminee` et rester accessible dans l'historique. Une occurrence `Annulee` dont toutes les commandes sont resolues reste `Annulee` et recoit un horodatage de cloture administrative.
- **FR-059a** La cloture doit suivre un parcours guide : traitement explicite des commandes preparees non recuperees, mise a jour facultative des disponibilites, publication facultative, puis confirmation. Chaque decision confirmee est persistante; l'action finale revalide cote serveur que l'occurrence n'est pas deja terminee, qu'aucune commande bloquante ne reste et que les modifications de disponibilite ne sont pas en erreur.

### 6.6 AMAP

- **FR-060** L'administrateur doit pouvoir creer et gerer les adherents AMAP et leurs comptes.
- **FR-060a** Un adherent ne peut avoir qu'un abonnement AMAP actif a la fois. L'abonnement doit indiquer un type `panier complet` ou `demi-panier`, un retrait par defaut dont le mode actif porte explicitement `compatible AMAP`, et un solde initial strictement positif.
- **FR-061** Un abonnement doit conserver l'adherent, la date d'inscription, le type de panier, le jour de retrait par defaut, le point de retrait par defaut, le nombre de paniers restants, la prochaine echeance, la date limite de modification et son statut. La recurrence V1 est hebdomadaire : une echeance livree ou suspendue avance la prochaine echeance de sept jours calendaires dans `Europe/Paris`; un solde nul ou un abonnement inactif suspend toute nouvelle generation.
- **FR-062** L'inscription et la resiliation d'un abonnement AMAP ne sont pas accessibles en ligne en V1.
- **FR-063** L'administrateur doit pouvoir definir une composition de panier et de demi-panier par periode.
- **FR-063a** Une composition AMAP est definie pour une date ou semaine de livraison donnee. Pour chaque produit, les quantites de panier complet et de demi-panier sont explicites et independantes; l'absence du produit dans le demi-panier est distincte d'une quantite nulle. La composition est ordonnee et une ligne produit ne peut pas etre dupliquee sans justification metier.
- **FR-064** La composition doit etre figee lorsqu'une commande AMAP est generee.
- **FR-065** L'administrateur doit pouvoir definir les produits de remplacement disponibles pour une periode.
- **FR-066** L'adherent doit pouvoir remplacer au plus deux elements de son prochain panier par des produits autorises avant la date limite.
- **FR-067** Les substitutions doivent etre visibles dans la commande AMAP sans calcul automatique d'equivalence de prix ou de poids.
- **FR-067a** Pour chaque substitution autorisee, le maraicher doit definir explicitement la quantite applicable au panier complet et, si le produit y est inclus, au demi-panier. Une substitution ne peut viser qu'un produit autorise pour cette semaine et ne peut pas elle-meme etre substituee.
- **FR-068** Chaque jour a 06:00 `Europe/Paris`, le systeme genere une commande pour chaque echeance AMAP active situee a trois jours calendaires ou moins de son occurrence de retrait `Prevue`. Un worker persistant interroge la file au plus chaque minute et rattrape toute execution quotidienne manquee apres une indisponibilite. La cle d'idempotence est l'abonnement et l'occurrence; une meme cle ne peut produire qu'une commande non annulee. L'absence d'occurrence selectable ou de composition active empeche la generation et cree une alerte a traiter par l'administration.
- **FR-068a** A la generation, la composition, les remplacements autorises, le retrait, la date limite et l'abonnement sont figes dans la commande AMAP. Avant la date limite, suspension, cession, changement de retrait ou substitution modifient cette seule commande generee et sont audites; apres la date limite, seules les modifications administratives motivees sont admises. Toute modification d'abonnement apres generation ne modifie pas retroactivement la commande.
- **FR-068b** Avant generation, les exceptions AMAP sont rattachees a l'abonnement et a son echeance datee, sans modifier les parametres permanents de l'abonnement. Apres generation, elles doivent modifier la commande correspondante si l'action reste autorisee, afin d'eviter tout ecart entre exception et commande operationnelle.
- **FR-069** Une commande AMAP generee doit demarrer directement a `A preparer`, sans validation manuelle.
- **FR-070** Le workflow nominal AMAP doit etre `A preparer -> Preparee -> Livree`.
- **FR-071** L'adherent doit pouvoir consulter son prochain panier, sa composition, son retrait, la date limite et son nombre de paniers restants.
- **FR-072** Avant la date limite, l'adherent doit pouvoir suspendre son panier, changer le retrait, le ceder ou effectuer des substitutions.
- **FR-073** Apres la date limite, ces actions doivent etre bloquees cote adherent et rester possibles cote administration.
- **FR-074** Une suspension ne doit pas consommer de panier; elle doit decaler l'echeance et etre historisee avec dates, auteur et motif optionnel.
- **FR-075** Une cession doit conserver l'adherent titulaire, le beneficiaire et ses coordonnees; le panier est consomme sur l'abonnement du titulaire lorsqu'il est livre.
- **FR-075a** Suspension et cession sont incompatibles pour une meme echeance. Activer une suspension annule ou neutralise toute cession en cours de facon explicite et auditee; une semaine suspendue ne permet ni retrait exceptionnel ni substitution active.
- **FR-076** Le passage d'une commande AMAP a `Livree` doit consommer exactement une echeance et creer un evenement de consommation rattache a cette commande.
- **FR-077** Une correction de statut doit preserver ou corriger de facon tracable le solde de paniers restants.
- **FR-078** L'adherent doit pouvoir consulter l'historique de ses paniers, suspensions et cessions.
- **FR-078a** Les transitions autorisees sont : classique `A valider -> A preparer -> Preparee -> Livree`, avec `Annulee` depuis tout statut sauf `Livree`; AMAP `A preparer -> Preparee -> Livree`, avec `Annulee` avant `Livree`. Une commande `Preparee` non recuperee peut etre reportee vers une occurrence `Prevue` et revenir a `A preparer`. Toute autre transition est refusee.
- **FR-078b** Une livraison AMAP cree une consommation unique. L'annulation ou le report d'une commande AMAP deja `Livree` est interdit; une correction exceptionnelle est reservee a l'administrateur, exige un motif et cree une contre-ecriture de consommation liee a l'evenement initial. Une commande annulee ou reportee avant livraison ne consomme aucun panier.

### 6.7 Historique et droits

- **FR-079** L'application doit conserver l'historique des publications, statuts de commande, reports, occurrences, suspensions, cessions et consommations AMAP.
- **FR-080** Les donnees clients doivent etre visibles seulement aux personnes autorisees a administrer l'exploitation.
- **FR-081** L'administration doit pouvoir modifier manuellement une commande quel que soit son canal de creation, avec tracabilite des actions significatives.
- **FR-082** V1 comprend les roles `Administrateur` et `Adherent AMAP`. Seuls les administrateurs authentifies peuvent administrer l'exploitation et consulter les donnees de clients classiques; un adherent authentifie ne peut consulter et modifier que ses donnees et paniers AMAP. Un compte desactive ne peut plus ouvrir de session ni acceder aux liens d'espace adherent.
- **FR-082a** Les comptes administrateur et adherent utilisent une authentification par email et mot de passe; la reinitialisation de mot de passe est possible par lien a usage unique valable une heure. Une session expire apres 12 heures d'inactivite et peut etre revoquee par un administrateur. La creation, desactivation et reactivation d'un compte est auditee.
- **FR-083** Chaque action historique significative doit conserver au minimum l'acteur, l'horodatage et fuseau, l'objet, l'action, les valeurs avant/apres lorsque celles-ci changent et le motif quand il est obligatoire. Les evenements d'audit sont non modifiables et consultables par les seuls administrateurs.
- **FR-083a** Sont a minima auditables : creation, modification et publication d'offre; creation, modification, changement de statut, report, ajustement de quantite et ecrasement de montant d'une commande; creation, annulation et cloture d'une occurrence; generation, suspension, cession, substitution et consommation AMAP; connexion, reinitialisation, creation, desactivation et changement de role d'un compte; inscription, retrait et envoi de consentement; ainsi que toute demande relative aux droits des personnes.

## 7. Exigences non fonctionnelles

- **NFR-001 Responsive** : les parcours client et administrateur doivent fonctionner entre 320 px et 1440 px de largeur; les actions operationnelles admin sont prioritaires sur petit ecran. Les parcours modifier une disponibilite, valider, preparer, livrer et cloturer sont realisables en trois ecrans ou actions au plus depuis leur vue de travail.
- **NFR-002 Simplicite** : la page d'accueil utilise `Europe/Paris` et definit `aujourd'hui` comme le jour civil courant, `demain` comme le jour civil suivant et `imminente` comme une occurrence commencant dans les 48 heures. Elle affiche les files vides explicitement, signale une disponibilite non publiee depuis 7 jours et calcule la progression d'une occurrence par commandes `Livree` sur commandes non annulees. Toute commande `A valider` depuis plus de 24 heures est signalee comme ancienne.
- **NFR-003 RGPD** : l'application ne collecte que les donnees necessaires a la commande, a la distribution, a l'AMAP et aux communications consenties; elle doit informer les personnes du traitement de leurs donnees. La notice de confidentialite identifie le maraicher comme responsable, les sous-traitants impliques et les finalites, bases legales, durees, droits et canal de contact.
- **NFR-004 Consentement** : aucun email de disponibilites n'est adresse a une personne non inscrite ou n'ayant pas donne son opt-in; le retrait doit etre effectif pour les envois suivants. Chaque evenement de consentement est immuable et contient l'adresse normalisee, l'etat, l'horodatage, la source, le texte et la version de la mention affichee.
- **NFR-005 Securite** : les liens de suivi de commande doivent etre difficiles a deviner, limites au perimetre de la commande concernee et revocables par l'administration. Ils expirent 30 jours apres la livraison ou l'annulation, ou 90 jours apres creation si la commande n'est jamais livree; l'administration peut en generer un nouveau, ce qui revoque le precedent.
- **NFR-006 Historique** : les snapshots publies et les donnees commerciales historisees doivent rester immuables; les changements metier doivent etre auditables.
- **NFR-007 Disponibilite operationnelle** : l'absence de synchronisation avec un outil externe ne doit pas bloquer la prise, la preparation, la livraison ni la cloture des commandes.
- **NFR-008 Droits des personnes** : l'administration doit disposer d'un processus documente pour repondre aux demandes d'acces, rectification, export et effacement ou anonymisation, sans detruire les obligations de conservation applicables. Une demande est enregistree, verifiee, attribuee a un administrateur et traitee sous 30 jours; l'export est fourni dans un format structure et lisible.
- **NFR-009 Conservation** : les donnees de contact et de commande sont supprimees ou anonymisees trois ans apres la derniere commande ou interaction active. Les evenements de consentement sont conserves trois ans apres leur retrait. Les donnees personnelles presentes dans l'historique operationnel expire sont pseudonymisees, en preservant les dates, montants et agregats; la table de correspondance est supprimee. Les obligations legales de conservation applicables priment et doivent etre documentees par le responsable avant mise en production.
- **NFR-010 Concurrence** : toute mutation d'une entite editable (produit, disponibilite, commande, publication, occurrence, composition ou exception AMAP) doit verifier la version attendue de l'etat consulte. En cas de version obsolete, le serveur refuse l'ecriture, le client informe clairement du conflit et propose de recharger; aucune modification ne peut ecraser silencieusement une modification concurrente.
- **NFR-011 Accessibilite operationnelle** : les statuts et retours de sauvegarde combinent texte et signal visuel; les actions tactiles sont suffisamment dimensionnees; les formulaires, erreurs, dialogues et changements de statut sont utilisables au clavier et annoncables aux technologies d'assistance. La mise en page conserve les parcours sans defilement horizontal entre 320 px et 1440 px.

## 8. Regles metier transverses

- Les disponibilites sont une estimation manuelle et ne constituent pas un stock comptable ni une reservation.
- En cas de demandes superieures a une estimation, les commandes restent des demandes a validation : la quantite reelle inferieure ou nulle, ou l'annulation, est decidee lors de la preparation et est visible au client apres preparation. Les substitutions sont reservees a l'AMAP.
- La publication est une action explicite, distincte de la mise a jour des disponibilites.
- Les commandes classiques sont toujours soumises a validation manuelle.
- Un client ne peut plus modifier ni annuler sa commande depuis son lien securise une fois la preparation commencee; une modification client d'une commande acceptee impose une nouvelle validation.
- Les prix, libelles, unites, quantites demandees et montant indicatif applicables a une commande sont figes au moment de sa creation; les quantites reelles et le montant final sont renseignes lors de la preparation sans modifier les valeurs initiales.
- Une commande est toujours rattachee a une occurrence datee, y compris pour un retrait en lieu fixe.
- L'abonnement AMAP reste rattache a l'adherent initial en cas de cession.
- Les parametres permanents (produit, modele de recuperation, abonnement) sont distincts des occurrences et exceptions datees; aucune modification ne reecrit silencieusement un historique ou une commande deja generee.
- La cloture d'une occurrence ne peut pas etre consideree comme une simple action d'interface : le serveur en revalide les invariants au dernier moment.

## 9. Hypotheses et points ouverts

- Les seuls emails V1 sont les publications de disponibilites consenties et les liens de definition ou reinitialisation de mot de passe. Aucun email de suivi, rappel ou changement de statut n'est envoye; le lien de suivi de commande est affiche immediatement apres confirmation, jamais delivre par email.
- Un compte adherent AMAP est cree et invite par le maraicher.
- La generation anticipee d'une commande AMAP intervient trois jours calendaires avant l'occurrence applicable.
- Une publication email cible tous les utilisateurs inscrits dont l'opt-in est actif; les listes ou preferences supplementaires sont reportees.
- **[OPEN QUESTION]** Le responsable de traitement doit confirmer avant mise en production que les durees de conservation et les mentions de confidentialite sont adaptees aux obligations legales applicables.
- Les occurrences deja generees restent independantes des modifications ulterieures de leur modele de marche ou tournee; toute correction est explicite et auditee.
- La limite V1 de deux substitutions est globale et la date limite est portee par l'abonnement puis figee sur la commande; aucune surcharge hebdomadaire de ces parametres n'est admise.
- Les validations juridiques, prestataires, hebergement et mentions reelles sont des gates de mise en production. Elles n'empechent pas le developpement ni les tests avec une configuration locale explicitement non productive.
- Le dossier de preparation de cette validation est `rgpd-validation-pack.md`.

## 10. Evolutions envisagees

- Paiement en ligne et suivi des reglements.
- Synchronisation Odoo pour produits, contacts et facturation, decouplee du workflow operationnel.
- Import ou interpretation assistee des commandes email, SMS et WhatsApp.
- Application mobile native et notifications push.
- Rapprochement des ventes de marche et gestion de stock plus avancee.
- Optimisation des tournees.
