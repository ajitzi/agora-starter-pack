---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-la-cabane-du-merle-2026-08-24/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-la-cabane-du-merle-2026-08-24/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-la-cabane-du-merle-2026-08-24/EXPERIENCE.md
  - _bmad-output/planning-artifacts/prds/prd-la-cabane-du-merle-2026-08-24/rgpd-validation-pack.md
---

# la-cabane-du-merle - Découpage en epics

## Vue d'ensemble

Ce document fournit le découpage complet en epics et stories de la-cabane-du-merle à partir des exigences du PRD, du contrat UX, de l'architecture et du dossier de validation RGPD.

## Inventaire des exigences

### Exigences fonctionnelles

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
- **FR-019a** L'inscription aux publications doit etre disponible depuis un formulaire public distinct de la commande. Elle collecte une adresse email, affiche la mention d'information versionnee et une case d'opt-in non pre-cochable. Une adresse n'est ajoutee qu'une fois; une nouvelle inscription apres retrait cree un nouvel evenement de consentement. Aucun email de double opt-in n'est envoye en V1.
- **FR-019b** Un email de publication doit contenir l'identite de l'exploitation expedrice, une adresse de reponse, l'objet de la publication, un lien vers l'offre publique et un lien de desinscription individuel. Le consentement marketing ne conditionne jamais la commande ni son lien de suivi affiche a l'ecran.
- **FR-019c** Une campagne doit conserver son contenu, sa publication source, le destinataire, le statut d'envoi et les echecs definitifs. Les echecs definitifs placent l'adresse en suppression; les echecs temporaires sont retentes au plus deux fois avant d'etre journalises comme echec.
- **FR-019d** La creation d'une publication et son envoi email sont deux operations distinctes : une publication reussie reste active et consultable meme en cas d'echec total ou partiel de la campagne. Les echecs doivent etre consultables et ne bloquent ni la cloture d'une occurrence ni les autres operations.
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
- **FR-051** La page d'accueil d'administration doit prioriser les actions a realiser aujourd'hui et demain.
- **FR-052** Elle doit afficher les commandes a valider, a preparer et preparees, ainsi que les occurrences imminentes et leur progression.
- **FR-053** Elle doit signaler les nouvelles commandes et une anciennete inhabituelle des disponibilites.
- **FR-054** L'administrateur doit pouvoir traiter les commandes sequentiellement, avec une navigation precedente/suivante et un indicateur de progression.
- **FR-055** Les actions de validation, preparation, finalisation des quantites et livraison doivent etre directement accessibles dans cette vue.
- **FR-056** Pour une occurrence, le systeme doit fournir une vue agregee des quantites a preparer.
- **FR-057** La vue agregee doit distinguer la composition des paniers AMAP des produits commandables en complement.
- **FR-058** La cloture d'une occurrence doit permettre de traiter les commandes restantes, mettre a jour les disponibilites et choisir entre enregistrer ou enregistrer et publier.
- **FR-059** Une occurrence cloturee doit passer a `Terminee` et rester accessible dans l'historique.
- **FR-059a** La cloture doit suivre un parcours guide : traitement explicite des commandes preparees non recuperees, mise a jour facultative des disponibilites, publication facultative, puis confirmation. Chaque decision confirmee est persistante; l'action finale revalide cote serveur que l'occurrence n'est pas deja terminee, qu'aucune commande bloquante ne reste et que les modifications de disponibilite ne sont pas en erreur.
- **FR-060** L'administrateur doit pouvoir creer et gerer les adherents AMAP et leurs comptes.
- **FR-060a** Un adherent ne peut avoir qu'un abonnement AMAP actif a la fois. L'abonnement doit indiquer un type `panier complet` ou `demi-panier`, un retrait par defaut compatible et un solde initial strictement positif.
- **FR-061** Un abonnement doit conserver l'adherent, la date d'inscription, le type de panier, le jour de retrait par defaut, le point de retrait par defaut, le nombre de paniers restants, la prochaine echeance, la date limite de modification et son statut.
- **FR-062** L'inscription et la resiliation d'un abonnement AMAP ne sont pas accessibles en ligne en V1.
- **FR-063** L'administrateur doit pouvoir definir une composition de panier et de demi-panier par periode.
- **FR-063a** Une composition AMAP est definie pour une date ou semaine de livraison donnee. Pour chaque produit, les quantites de panier complet et de demi-panier sont explicites et independantes; l'absence du produit dans le demi-panier est distincte d'une quantite nulle. La composition est ordonnee et une ligne produit ne peut pas etre dupliquee sans justification metier.
- **FR-064** La composition doit etre figee lorsqu'une commande AMAP est generee.
- **FR-065** L'administrateur doit pouvoir definir les produits de remplacement disponibles pour une periode.
- **FR-066** L'adherent doit pouvoir remplacer au plus deux elements de son prochain panier par des produits autorises avant la date limite.
- **FR-067** Les substitutions doivent etre visibles dans la commande AMAP sans calcul automatique d'equivalence de prix ou de poids.
- **FR-067a** Pour chaque substitution autorisee, le maraicher doit definir explicitement la quantite applicable au panier complet et, si le produit y est inclus, au demi-panier. Une substitution ne peut viser qu'un produit autorise pour cette semaine et ne peut pas elle-meme etre substituee.
- **FR-068** Chaque jour a 06:00 `Europe/Paris`, le systeme genere une commande pour chaque echeance AMAP active situee a trois jours calendaires ou moins de son occurrence de retrait `Prevue`. La cle d'idempotence est l'abonnement et l'occurrence; une meme cle ne peut produire qu'une commande non annulee. L'absence d'occurrence selectable ou de composition active empeche la generation et cree une alerte a traiter par l'administration.
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
- **FR-079** L'application doit conserver l'historique des publications, statuts de commande, reports, occurrences, suspensions, cessions et consommations AMAP.
- **FR-080** Les donnees clients doivent etre visibles seulement aux personnes autorisees a administrer l'exploitation.
- **FR-081** L'administration doit pouvoir modifier manuellement une commande quel que soit son canal de creation, avec tracabilite des actions significatives.
- **FR-082** V1 comprend les roles `Administrateur` et `Adherent AMAP`. Seuls les administrateurs authentifies peuvent administrer l'exploitation et consulter les donnees de clients classiques; un adherent authentifie ne peut consulter et modifier que ses donnees et paniers AMAP. Un compte desactive ne peut plus ouvrir de session ni acceder aux liens d'espace adherent.
- **FR-082a** Les comptes administrateur et adherent utilisent une authentification par email et mot de passe; la reinitialisation de mot de passe est possible par lien a usage unique valable une heure. Une session expire apres 12 heures d'inactivite et peut etre revoquee par un administrateur. La creation, desactivation et reactivation d'un compte est auditee.
- **FR-083** Chaque action historique significative doit conserver au minimum l'acteur, l'horodatage et fuseau, l'objet, l'action, les valeurs avant/apres lorsque celles-ci changent et le motif quand il est obligatoire. Les evenements d'audit sont non modifiables et consultables par les seuls administrateurs.
- **FR-083a** Sont a minima auditables : creation, modification et publication d'offre; creation, modification, changement de statut, report, ajustement de quantite et ecrasement de montant d'une commande; creation, annulation et cloture d'une occurrence; generation, suspension, cession, substitution et consommation AMAP; connexion, reinitialisation, creation, desactivation et changement de role d'un compte; inscription, retrait et envoi de consentement; ainsi que toute demande relative aux droits des personnes.

### Exigences non fonctionnelles

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

### Exigences supplémentaires

- **Initialisation structurelle (AD-1, AD-3, AD-14)** : initialiser le monorepo avec `apps/web`, `apps/api`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`; ne creer ni ne deployer `apps/mobile` en V1. Aucun starter template n'est prescrit par l'architecture.
- **Frontieres et dependances (AD-1, AD-2, AD-3, AD-5, AD-6, AD-10)** : imposer `apps -> screens -> domain/application -> core`, garder les routes minces, interdire les routeurs dans `packages/screens`, les frameworks/HTTP/ORM dans `domain` et `application`, les imports profonds, les cycles et les imports Tamagui hors `packages/ui`; verifier ces regles localement et en CI.
- **Responsive partage (AD-4, AD-5, AD-14)** : partager les ecrans par defaut via `packages/screens` et Tamagui; n'introduire une variante de plateforme que si le parcours, la structure ou l'interaction differe reellement.
- **Versions verrouillees (AD-8)** : utiliser un lockfile racine unique et pinner Next.js 16.3.2, Node.js 24.0.0, AdonisJS 7.5.0, Lucid 22.4.2, PostgreSQL 18.6, OpenAPI 3.1.2 et Tamagui 2.7.7; toute mise a niveau doit valider en CI toute la chaine React, React Native, React Native Web et Node.js.
- **API et OpenAPI (AD-9, AD-13)** : faire de l'OpenAPI 3.1.2 versionne dans `apps/api` la source de verite des requetes, reponses, erreurs et securite; valider les requetes a la frontiere HTTP, deriver `@project/api-client` du contrat, tester la conformite de chaque version et creer une nouvelle version pour toute rupture.
- **Decision API - erreurs et pagination** : standardiser les erreurs HTTP sur RFC 9457 avec `application/problem+json` et paginer les listes ou historiques avec des curseurs opaques stables.
- **Persistance et historique (AD-7, AD-12)** : utiliser PostgreSQL et Lucid uniquement dans `apps/api`; conserver modeles, migrations et transactions dans ce runtime, traduire via des repositories adaptateurs et stocker des snapshots immuables des valeurs metier appliquees aux commandes, publications et compositions historiques.
- **Authentification et autorisation (AD-15)** : utiliser Adonis Auth pour les administrateurs et adherents AMAP; appliquer les roles et le cloisonnement cote API; laisser les clients classiques sans compte et limiter chaque jeton opaque de suivi a une commande, aux actions autorisees et a sa periode de validite.
- **Securite et configuration (AD-11, AD-15)** : garder les secrets dans l'environnement du runtime, declarer la securite dans OpenAPI, rendre les jetons opaques, expirables et revocables, et attribuer explicitement les builds, migrations, jobs, promotions et retours arriere.
- **Concurrence, transactions et idempotence (AD-18)** : faire de chaque cas d'usage l'unique mutation d'un aggregate, valider les transitions et versions attendues sur l'etat courant, persister atomiquement toutes les ecritures liees et memoriser le resultat initial de toute commande HTTP rejouable avec une cle scopee par operation et principal ou jeton.
- **Jobs et traitements asynchrones (AD-16, AD-17)** : stocker les jobs, les reclamer atomiquement avec verrou temporaire, executer un worker unique par environnement, journaliser chaque tentative et rendre les traitements idempotents et relancables; une transaction destinee a Odoo doit aussi ecrire une outbox et l'adaptateur futur doit rester hors chemin critique.
- **Decision technique - email et jobs V1** : utiliser Resend derriere un port de fournisseur pour l'envoi d'emails et une file persistante PostgreSQL, reclamee atomiquement par un worker unique par environnement, pour les campagnes et futurs traitements planifies.
- **Temps et recurrence (AD-19, AD-20)** : calculer dates locales, occurrences, recurrents et limites dans `Europe/Paris`, autoriser une modification strictement avant la limite, puis stocker et echanger les instants en UTC avec offset ISO 8601.
- **Deploiement et CI (AD-8, AD-10, AD-11)** : produire un artefact et une configuration runtime par app V1; faire posseder par `infra` environnements, deploiement, references de secrets, promotion et rollback; executer en CI compatibilite de stack, tests, conformite OpenAPI, frontieres, imports publics et absence de cycles.
- **Decisions resolues** : utiliser `pnpm`, GitHub Actions, SHA Git avec tags SemVer, Redocly et `openapi-typescript`, RFC 9457, curseurs opaques, Resend et une file PostgreSQL avec worker unique par environnement.
- **Deploiement VPS France** : exploiter un VPS physiquement heberge en France avec deux stacks Docker Compose isolees `staging` et `production`; choisir le fournisseur exact, OVHcloud ou equivalent, par une ADR bloquante verifiant localisation, DPA, acces, SLA, snapshots, stockage de sauvegarde et procedure de sortie avant tout provisionnement.
- **Exploitation VPS** : isoler reseaux, volumes, secrets et ressources des deux stacks; n'exposer que le reverse proxy, garder PostgreSQL interne en version `18.6`, executer un worker unique par stack, externaliser des sauvegardes chiffrees en France, tester leur restauration et viser `RPO <= 24 h` et `RTO <= 4 h`.
- **Decisions encore differees** : avant Odoo, confirmer son audit et son scope; avant traitement de donnees, valider juridiquement classification, conservation et suppression; lors de l'ADR VPS, choisir les outils precis de logs, metriques, alertes, incidents et sauvegardes respectant minimisation et residence attendue.
- **Regle metier transverse - disponibilites** : traiter les disponibilites comme des estimations manuelles, jamais comme un stock comptable ou une reservation; commandes, preparations, livraisons et ventes externes ne les decrementent pas automatiquement.
- **Regle metier transverse - demande non servie** : si la demande classique depasse l'estimation, conserver la commande comme demande a valider et laisser l'administration fixer une quantite reelle inferieure ou nulle, ou annuler pendant la preparation; les substitutions de produits restent exclusivement AMAP.
- **Regle metier transverse - publication** : separer explicitement la sauvegarde du brouillon de disponibilites, la publication du snapshot et l'envoi facultatif de la campagne email; l'echec d'une campagne ne doit pas invalider une publication reussie.
- **Regle metier transverse - commandes classiques** : soumettre toute commande classique a validation manuelle et figer a la creation prix, libelles, unites, quantites demandees et montant indicatif; conserver separement quantites reelles et montant final.
- **Regle metier transverse - occurrences** : rattacher toute commande a une occurrence datee, y compris un retrait fixe; distinguer les modeles permanents des occurrences et exceptions datees et ne jamais reecrire silencieusement l'historique.
- **Regle metier transverse - AMAP** : conserver l'abonnement sur l'adherent titulaire lors d'une cession, distinguer abonnement permanent et exception datee, et garantir qu'une livraison consomme exactement une echeance de maniere tracable.
- **Regle metier transverse - cloture** : traiter la cloture comme un workflow serveur persistant qui revalide au dernier moment le statut de l'occurrence, l'absence de commande bloquante et la validite des changements de disponibilite.
- **Decision produit - FR-035a / debut de preparation** : une commande `A preparer` reste modifiable par le client strictement avant sa limite tant que `preparationStartedAt` n'est pas renseigne; la modification la ramene a `A valider`. Des que la preparation effective commence, le lien client devient en lecture seule.
- **Decision produit - checkout classique** : le nom et le telephone sont obligatoires, l'email est facultatif; l'administrateur active au moins un moyen de paiement prevu parmi `Especes`, `Carte`, `Cheque` et `Virement`, sans paiement en ligne V1.
- **Decision produit - cloture d'une occurrence annulee** : apres resolution de toutes ses commandes, une occurrence annulee conserve le statut `Annulee` et recoit un horodatage de cloture; seule une occurrence executee cloturee passe a `Terminee`.
- **Decision produit - FR-044 / FR-044a** : FR-044a prevaut comme filtre operationnel; seule une occurrence `Prevue` dont la date limite n'est pas depassee est selectable, tandis que les statuts `Terminee` et `Annulee` restent consultables mais non selectionnables.
- **Decision produit - exception a FR-019** : l'email contenant un lien de reinitialisation de mot de passe est autorise en V1 comme unique email transactionnel; les autres emails transactionnels, rappels et notifications de statut restent interdits.
- **Decision produit - gestion du consentement sans compte** : chaque email de publication contient un lien individuel permettant de consulter l'etat du consentement et de se desinscrire; apres retrait, une nouvelle inscription passe par le formulaire public et cree un nouvel evenement de consentement.
- **Question ouverte PRD 1** : avant mise en production, le responsable de traitement doit confirmer que les durees de conservation et les mentions de confidentialite sont adaptees aux obligations legales applicables.
- **Decision produit - propagation des modeles** : les occurrences deja generees restent independantes; modifier un marche ou une tournee ne les reecrit jamais et toute correction d'une occurrence existante est explicite et auditee.
- **Decision produit - regles AMAP V1** : la limite de deux substitutions est globale et la date limite est portee par l'abonnement puis figee sur la commande generee; aucune surcharge hebdomadaire de ces deux parametres n'est admise en V1.
- **Decision produit - substitutions classiques** : une commande classique ne permet aucun produit de remplacement; `FR-041b` signifie ajuster la quantite reelle ou annuler, tandis que toute substitution de produit appartient exclusivement au parcours AMAP.
- **Validation juridique RGPD 1/12** : renseigner et faire valider le nom legal, l'adresse et le SIRET du responsable de traitement, ainsi que le contact vie privee et les coordonnees du DPO ou la mention de non-applicabilite.
- **Validation juridique RGPD 2/12** : identifier l'hebergeur et le fournisseur d'email, leur raison sociale, leur pays de traitement, leurs sous-traitants ulterieurs et leurs contrats de sous-traitance.
- **Validation juridique RGPD 3/12** : documenter les destinataires internes autorises et confirmer l'absence de transfert hors EEE ou les mecanismes et garanties de chaque transfert.
- **Validation juridique RGPD 4/12** : confirmer que les bases legales proposees correspondent au fonctionnement reel des commandes, de l'AMAP, des emails, des liens de suivi, de l'audit et des demandes de droits.
- **Validation juridique RGPD 5/12** : confirmer ou ajuster chaque duree de conservation selon les obligations comptables, fiscales, contractuelles et de preuve applicables.
- **Validation juridique RGPD 6/12** : confirmer que la pseudonymisation de l'historique est techniquement realisable et que la table de correspondance peut etre supprimee en fin de conservation.
- **Validation juridique RGPD 7/12** : verifier que le consentement email est distinct de la commande, libre, specifique, eclaire, non pre-coche et retirable a tout moment.
- **Validation juridique RGPD 8/12** : verifier pour chaque sous-traitant les contrats, instructions documentees, confidentialite, securite, acces, sauvegardes, suppression, notification d'incident et restitution ou suppression de fin de contrat.
- **Validation juridique RGPD 9/12** : determiner si un registre complet, une AIPD ou la designation d'un DPO sont requis au regard de l'activite et des prestataires reels.
- **Validation juridique RGPD 10/12** : faire valider la notice de confidentialite complete, incluant responsable, contact, donnees, finalites, bases legales, destinataires, transferts, durees, droits, verification d'identite et reclamation CNIL.
- **Validation juridique RGPD 11/12** : valider la procedure des demandes de droits couvrant enregistrement, verification proportionnee, recherche chez les sous-traitants, restrictions legales, execution, reponse sous 30 jours, journalisation et controle distinct si possible.
- **Validation juridique RGPD 12/12** : remettre au relecteur le PRD et le pack, l'identite et les contacts reels, les contrats des prestataires, les maquettes de collecte/consentement/notice/email, la liste des champs et les obligations comptables ou fiscales applicables.

### Exigences de conception UX

- **UX-DR1** Implementer les couleurs `surface-base` `#F7F6F1`, `surface-raised` `#FFFFFF` et `surface-subtle` `#ECEBE3` comme tokens centralises de `@project/ui`, sans valeur de surface ad hoc dans les ecrans.
- **UX-DR2** Implementer les couleurs de texte `ink-primary` `#1D2A1F`, `ink-secondary` `#536055` et `ink-disabled` `#8A928B`; reserver `ink-disabled` aux controles reellement indisponibles.
- **UX-DR3** Implementer `border-subtle` `#D7D9D1`, `action-primary` `#285B35`, `action-primary-pressed` `#1D4728` et `action-on-primary` `#FFFFFF`; reserver la couleur primaire a l'action dominante.
- **UX-DR4** Implementer `status-success` `#216E39`, `status-warning` `#8A5A00`, `status-danger` `#A9362A` et `status-info` `#245D85`; toujours associer couleur, libelle et symbole ou structure.
- **UX-DR5** Implementer `focus-ring` `#245D85` et `focus-on-primary` `#FFFFFF`; sur action primaire, afficher un anneau externe decale discernable du fond.
- **UX-DR6** Garantir un contraste d'au moins 4,5:1 pour le texte normal, 3:1 pour le grand texte et 3:1 pour composants graphiques, bordures actives et focus.
- **UX-DR7** Implementer `typography.display` en System UI 28/34 px graisse 700 et la reserver au titre unique de l'ecran.
- **UX-DR8** Implementer `typography.title` en System UI 22/28 px graisse 700 pour les entites et decisions de premier niveau.
- **UX-DR9** Implementer `typography.section` en System UI 14/20 px graisse 700, espacement `0.04em`, pour les regroupements operationnels.
- **UX-DR10** Implementer `typography.body` en System UI 16/24 px graisse 400 et `typography.meta` en 14/20 px graisse 400; utiliser des chiffres tabulaires pour montants, quantites et heures lorsque disponibles.
- **UX-DR11** Supporter l'agrandissement du texte sans troncature de controle et ne jamais transformer du texte en image.
- **UX-DR12** Implementer les rayons `sm` 8 px, `md` 12 px, `lg` 16 px et `full` 9999 px; limiter `full` aux badges et petits controles segmentes.
- **UX-DR13** Implementer l'echelle d'espacement 4, 8, 12, 16, 24, 32 et 48 px, avec gouttiere mobile 16 px et large 24 px.
- **UX-DR14** Construire une profondeur tonale fond/carte/sheet-dialogue et reserver les ombres discretes aux surfaces temporaires au-dessus du contenu.
- **UX-DR15** Faire du composant `Screen` la surface de toute page, avec `surface-base`, gouttieres responsives, defilement, safe areas et reserve empechant le contenu de passer sous une action fixe.
- **UX-DR16** Faire de `ScreenHeader` un en-tete avec titre `display`, contexte bref et actions secondaires visuellement subordonnees.
- **UX-DR17** Faire de `StickyActionBar` une zone toujours accessible apres lecture, a fond `surface-raised` et bordure `border-subtle`, avec une seule action dominante pleine largeur sur mobile et contextuelle sur desktop.
- **UX-DR18** Faire de `EntityCard` une cible native unique ouvrant le detail, sans controle interactif imbrique, ordonnant nom, retrait, horaire, statut puis volume selon pertinence.
- **UX-DR19** Faire de `StatusBadge` un badge semantique avec libelle obligatoire, contraste conforme et annonce accessible de tout changement de statut.
- **UX-DR20** Faire de `ProgressCard` une carte affichant une progression textuelle explicite telle que `5 / 7 preparees`, jamais une jauge seule.
- **UX-DR21** Faire de `EmptyState` un etat vide actionnable avec explication, prochaine etape et lien ou action disponible, avec padding 24 px.
- **UX-DR22** Faire de `FilterSheet` une feuille modale basse sur mobile, avec groupes lisibles, `Appliquer` prioritaire conservant les choix et `Reinitialiser` secondaire les effacant explicitement.
- **UX-DR23** Faire de `ConfirmDialog` un dialogue reserve aux effets irreversibles, avec titre exprimant la consequence, detail concis, action destructive distincte et retour non destructif.
- **UX-DR24** Faire de `NumericInput` un champ d'au moins 48 px avec unite visible, clavier numerique, calcul immediat, erreurs au champ et boutons `+`/`-` si la granularite est connue.
- **UX-DR25** Faire de `SegmentedControl` un controle d'options mutuellement exclusives a libelles complets, clavier defini et selection exposee aux lecteurs d'ecran.
- **UX-DR26** Faire de `ResponsivePane` un master/detail tablette ou desktop uniquement lorsque les deux panneaux evitent un aller-retour operationnel.
- **UX-DR27** Faire de `OccurrenceCard` une carte affichant type, horaire, progression et statut, ouvrant l'occurrence datee et jamais le modele recurrent.
- **UX-DR28** Faire de `AvailabilityStatusControl` un controle qui modifie sans publier et distingue les etats `non enregistre`, `enregistre`, `non publie` et `conflit`.
- **UX-DR29** Faire de `PublicationDiff` une comparaison entre brouillon versionne et dernier snapshot publie; si l'apercu est perime, bloquer l'action et imposer le rechargement.
- **UX-DR30** Faire de `AmapExceptionEditor` un editeur d'exception datee qui ne modifie jamais l'abonnement permanent et affiche titulaire et beneficiaire lors d'une cession.
- **UX-DR31** Faire de `ClosingSummary` un recapitulatif des quatre etapes de cloture, des decisions deja confirmees et des elements encore bloquants.
- **UX-DR32** Permettre la reorganisation d'une tournee par glisser-deposer facultatif tout en fournissant obligatoirement des boutons explicites `Monter` et `Descendre`.
- **UX-DR33** Utiliser sur mobile la navigation admin basse `Aujourd'hui`, `Commandes`, `Preparer`, `Dispos`, `Plus`, avec cible tactile standard et destination active explicite.
- **UX-DR34** Transformer la meme hierarchie en sidebar permanente sur tablette paysage et desktop, avec les libelles complets `Preparation` et `Disponibilites`.
- **UX-DR35** Maintenir l'acces direct aux quatre operations frequentes depuis toute surface secondaire et placer distribution, AMAP, produits, clients, publications et parametres dans `Plus` ou la sidebar.
- **UX-DR36** Concevoir `Aujourd'hui` pour repondre d'abord a la prochaine action: commandes `A valider`, activite imminente, files `A preparer` et `Preparee`, alertes et progression, sans dashboard statistique.
- **UX-DR37** Concevoir `Commandes` pour filtrer, consulter et traiter les commandes, avec filtres avances en `FilterSheet` sur mobile et detail simultane seulement aux largeurs utiles.
- **UX-DR38** Concevoir la validation sequentielle avec position `Commande n / total`, precedent/suivant, passage temporaire, sortie explicite et avancement uniquement apres succes versionne.
- **UX-DR39** Concevoir `Preparer` comme selection d'une occurrence par `OccurrenceCard`, puis afficher les besoins agreges en distinguant paniers AMAP et complements.
- **UX-DR40** Concevoir la preparation sequentielle classique pour saisir quantites reelles, montant et remarque sans retour a la liste, puis enchainer vers livraison ou cloture; les substitutions restent dans les ecrans AMAP.
- **UX-DR41** Concevoir `Disponibilites` pour modifier rapidement le brouillon sans suggérer de reservation et afficher en permanence l'ecart entre sauvegarde et publication.
- **UX-DR42** Concevoir `Publier les disponibilites` comme revue du diff, du message, de la version du brouillon, des canaux et du nombre de destinataires consentants avant confirmation.
- **UX-DR43** Concevoir `Distribution` pour separer modeles recurrents de marche/tournee et occurrences datees, et ouvrir l'execution ou la cloture depuis l'occurrence.
- **UX-DR44** Concevoir la cloture comme quatre etapes persistantes: non-retraits, disponibilites, publication facultative, confirmation finale.
- **UX-DR45** Concevoir l'administration AMAP par semaine pour distinguer composition standard, remplacements, volumes, suspensions, cessions et exceptions exigeant une attention.
- **UX-DR46** Concevoir les surfaces produits pour distinguer produit `Actif`/`Inactif` de sa disponibilite, remplacer la suppression par l'inactivation et expliquer la preservation historique.
- **UX-DR47** Concevoir le catalogue public en mobile-first, avec quantites estimatives/non reservees explicites, ajout de produits accessible et absence d'offre historique commandable.
- **UX-DR48** Concevoir le checkout client comme une page verticale unique couvrant produits, retrait, coordonnees, paiement prevu, recapitulatif et validation.
- **UX-DR49** Separer visuellement et semantiquement l'inscription facultative aux publications du checkout; ne jamais pre-cocher ni rendre son consentement necessaire a la commande.
- **UX-DR50** Apres confirmation de commande, afficher immediatement le lien securise de suivi et indiquer qu'aucun email transactionnel ne sera envoye.
- **UX-DR51** Concevoir le suivi client pour montrer avant preparation quantites demandees et montant indicatif, puis apres preparation quantites reelles et montant final en lecture seule.
- **UX-DR52** Concevoir l'espace adherent autour de `Votre prochain panier`, avec date, retrait, format, composition, date limite, paniers restants et historique.
- **UX-DR53** Avant l'echeance AMAP, presenter substitution, changement de retrait, cession et suspension comme actions distinctes avec confirmation et resultat visible dans le prochain panier.
- **UX-DR54** Apres l'echeance AMAP, rendre ces actions indisponibles, afficher la date limite et l'explication, tout en conservant le panier consultable.
- **UX-DR55** Afficher un squelette inerte qui preserve la structure pendant le chargement, marquer la zone `aria-busy` et ne rendre aucune action critique disponible avant un etat fiable.
- **UX-DR56** Afficher tout etat vide avec une formulation concrete, par exemple la prochaine activite, plutot qu'un message generique `Aucune donnee`.
- **UX-DR57** Apres sauvegarde, annoncer immediatement `Modifications enregistrees` et le nombre de changements non publies sans laisser croire qu'ils sont publics.
- **UX-DR58** Lors d'une publication, afficher le nombre de changements et de destinataires consentants, puis exiger l'action explicite `Publier maintenant`.
- **UX-DR59** Verrouiller une publication sur la version revue; en cas de changement concurrent, annoncer l'ecart, bloquer l'envoi et proposer `Recharger la revue`.
- **UX-DR60** Apres publication reussie, afficher heure et identifiant et remettre a zero uniquement le compteur de la version publiee.
- **UX-DR61** Sans destinataire consentant, permettre la publication sans email et l'indiquer explicitement, avec le compte des desinscrits, doublons et echecs definitifs exclus.
- **UX-DR62** En cas d'envoi partiel, afficher le resultat par categorie et permettre seulement la reprise des echecs temporaires sans renvoyer aux destinataires traites.
- **UX-DR63** Pour une erreur reseau, distinguer `Non envoyee`, `Verification en cours` et `Echec confirme`, conserver le formulaire et verifier l'etat serveur avant nouvelle tentative idempotente.
- **UX-DR64** Pour un conflit de version, expliquer que l'entite a change, empecher l'ecrasement, proposer la nouvelle version et conserver les choix non soumis lorsque possible.
- **UX-DR65** Pour toute action destructive, utiliser `ConfirmDialog`, expliciter la consequence et demander le motif lorsqu'une trace est requise.
- **UX-DR66** Une fois une limite depassee, passer l'action client en lecture seule et afficher la date limite ainsi que le canal de contact autorise.
- **UX-DR67** Pour un lien invalide, expire, revoque ou remplace, ne divulguer aucune donnee et orienter seulement vers le contact de l'exploitation.
- **UX-DR68** Pour session expiree, compte desactive, acces refuse ou occurrence annulee, expliquer l'etat sans donnee personnelle et proposer connexion ou retour autorise.
- **UX-DR69** Envoyer `expectedVersion` avec toute mutation et, en cas d'obsolescence, ne rien ecrire, marquer l'apercu perime et recharger l'etat courant.
- **UX-DR70** Au premier envoi d'une transition telle que `Accepter` ou `Terminer`, desactiver l'action, garder l'element courant jusqu'a la reponse puis avancer seulement apres succes.
- **UX-DR71** Si une transition est refusee, rester sur l'element, recharger son statut et ne proposer que les transitions encore autorisees.
- **UX-DR72** Exiger une cible reelle d'au moins 24 x 24 px sans chevauchement pour tout controle et viser 44 a 48 px pour navigation, icones, fermeture, filtres, increment et reorganisation.
- **UX-DR73** Appliquer une microcopie directe, concrete et temporelle indiquant nombres, statuts et consequences plutot que des messages abstraits.
- **UX-DR74** Nommer `Montant indicatif` avant preparation et `Montant final` apres preparation, sans presenter une valeur provisoire comme definitive.
- **UX-DR75** Lors d'une modification client apres acceptation, annoncer le retour a `A valider` et montrer a l'administration un diff avant sa nouvelle decision.
- **UX-DR76** Lors d'un report de non-retrait, imposer une occurrence future `Prevue`, montrer ancien et nouveau retraits et recueillir motif/auteur avant le retour a `A preparer`.
- **UX-DR77** Lors d'une suspension AMAP, signaler l'incompatibilite avec une cession active et demander confirmation de son annulation ou de sa neutralisation.
- **UX-DR78** Sur mobile 320-430 px, utiliser une colonne, cartes, formulaires verticaux, filtres en sheet et action dominante fixe; autoriser les controles de disponibilite a revenir a la ligne sans tronquer champ ni unite.
- **UX-DR79** Sur tablette 768-1024 px, utiliser une ou deux colonnes, conserver de gros controles tactiles et privilegier le paysage pour validation et preparation.
- **UX-DR80** Sur desktop, utiliser une sidebar permanente et afficher historique ou detail simultane; n'utiliser un tableau que s'il ameliore la lecture.
- **UX-DR81** Garantir un reflow sans defilement horizontal de 320 a 1440 px, sauf contenu reellement bidimensionnel.
- **UX-DR82** Garantir le texte a 200 % et le zoom navigateur a 400 % sans perte de contenu, de controle ni de parcours.
- **UX-DR83** Maintenir l'ordre DOM et de focus conforme a l'ordre visuel et appliquer `scroll-margin` pour qu'une barre fixe ne masque jamais focus ou erreur.
- **UX-DR84** Donner a chaque ecran un unique `main`, des `nav` nommes, une hierarchie de titres et un lien `Aller au contenu` visible au focus.
- **UX-DR85** Marquer la destination active avec `aria-current="page"` dans la navigation basse comme dans la sidebar.
- **UX-DR86** Exposer pour chaque controle un nom, un role et un etat accessibles et relier programmatiquement toute erreur au champ concerne.
- **UX-DR87** Faire suivre au clavier desktop l'ordre de lecture et afficher un focus visible conforme aux tokens sur chaque element interactif.
- **UX-DR88** Rendre sheets et dialogues modaux, nommes et `aria-modal`, inerter l'arriere-plan, fermer avec `Escape` sauf justification et restituer le focus au declencheur.
- **UX-DR89** Initialiser le focus d'un dialogue sur son titre ou une action non destructive, jamais automatiquement sur l'action destructive.
- **UX-DR90** Donner a chaque champ un label visible, l'indication obligatoire/facultatif, une aide, `aria-invalid` et un message d'erreur precis.
- **UX-DR91** Sur soumission invalide, afficher un resume focusable lie aux champs en erreur et conserver toutes les saisies valides.
- **UX-DR92** Annoncer position initiale et resultat de toute reorganisation de tournee aux technologies d'assistance.
- **UX-DR93** Utiliser une region `status` polie pour sauvegarde, progression, succes et nouvel element, et reserver `alert` aux erreurs bloquantes.
- **UX-DR94** Respecter la preference de mouvements reduits avec animations instantanees ou breves, sans balayage de squelette ni changement de contexte automatique non annonce.
- **UX-DR95** Masquer les donnees personnelles hors des surfaces qui les exigent et ne jamais afficher le jeton du lien client dans l'historique ou l'administration.
- **UX-DR96** Limiter le lien client a la commande concernee et afficher sa validite: 30 jours apres livraison ou annulation, ou 90 jours apres creation si non livree.
- **UX-DR97** Rendre la notice de confidentialite et l'identite/contact du responsable accessibles lors de toute collecte de coordonnees et marquer explicitement les champs optionnels.
- **UX-DR98** Faire du formulaire public d'inscription aux publications une surface distincte, facultative, avec mention versionnee, case non pre-cochee et retrait accessible dans chaque email.
- **UX-DR99** Avant mise en production, remplacer et faire valider les placeholders de mentions legales, responsable, contact, hebergeur, fournisseur d'email, transferts, bases, durees et droits.
- **UX-DR100** Tester de bout en bout les sept parcours cles et leurs echecs: cycle admin, commande sans compte, prochain panier AMAP, publication, cloture, suivi securise et composition hebdomadaire AMAP, sur mobile, tablette, desktop, clavier et technologies d'assistance.

### Matrice de couverture des FR

- **FR-001** : Epic 2 - gestion du cycle de vie des produits.
- **FR-002** : Epic 2 - définition des informations minimales d'un produit.
- **FR-002a** : Epic 2 - contrôle et immutabilité de l'unité de référence après usage.
- **FR-002b** : Epic 2 - désactivation sans altération des historiques.
- **FR-003** : Epic 2 - gestion des états de disponibilité d'un produit.
- **FR-004** : Epic 2 - saisie et visibilité d'une quantité estimée.
- **FR-005** : Epic 2 - choix du niveau de suivi et d'affichage des quantités.
- **FR-006** : Epic 2 - mise à jour des disponibilités sans réservation de stock.
- **FR-007** : Epic 2 - indépendance entre opérations et disponibilités estimées.
- **FR-008** : Epic 2 - accès public limité à la dernière offre active.
- **FR-009** : Epic 4 - rattachement des commandes au snapshot publié consulté.
- **FR-009a** : Epic 2 - information sur le caractère estimatif et non réservé des quantités.
- **FR-010** : Epic 2 - publication explicite de l'état courant des disponibilités.
- **FR-011** : Epic 2 - création d'un snapshot immuable à chaque publication.
- **FR-012** : Epic 2 - consultation de l'historique des publications.
- **FR-013** : Epic 2 - préservation des snapshots face aux modifications ultérieures.
- **FR-014** : Epic 2 - choix d'envoyer un email lors d'une publication.
- **FR-015** : Epic 2 - envoi réservé aux destinataires ayant consenti.
- **FR-016** : Epic 2 - consultation, modification et retrait du consentement email.
- **FR-017** : Epic 2 - traçabilité complète des événements de consentement.
- **FR-018** : Epic 2 - filtrage des destinataires et audit de campagne.
- **FR-019** : Epic 2 - limitation des emails V1 aux publications consenties.
- **FR-019a** : Epic 2 - inscription publique distincte aux publications.
- **FR-019b** : Epic 2 - contenu obligatoire et désinscription dans les emails de publication.
- **FR-019c** : Epic 2 - suivi des campagnes, échecs et tentatives d'envoi.
- **FR-019d** : Epic 2 - indépendance entre publication et campagne email.
- **FR-020** : Epic 4 - commande publique sans création de compte.
- **FR-021** : Epic 4 - collecte des éléments nécessaires à la commande.
- **FR-022** : Epic 4 - création multicanale et conservation de la source.
- **FR-023** : Epic 4 - initialisation d'une commande classique à valider.
- **FR-024** : Epic 4 - acceptation administrative d'une commande.
- **FR-025** : Epic 4 - annulation avec conservation de l'historique.
- **FR-026** : Epic 4 - ajustement opérationnel pendant la préparation.
- **FR-027** : Epic 4 - finalisation de la préparation.
- **FR-028** : Epic 4 - confirmation de la livraison.
- **FR-029** : Epic 4 - application du workflow classique nominal.
- **FR-030** : Epic 4 - gel des données commerciales des lignes de commande.
- **FR-031** : Epic 4 - calcul du montant final sur les quantités réelles.
- **FR-031a** : Epic 4 - calcul et arrondi des montants indicatif et final.
- **FR-032** : Epic 4 - correction motivée et tracée du montant final.
- **FR-032a** : Epic 4 - affichage client adapté au statut de la commande.
- **FR-033** : Epic 4 - préservation des informations commerciales historiques.
- **FR-034** : Epic 4 - remise d'un lien sécurisé de suivi sans compte.
- **FR-035** : Epic 4 - modification ou annulation client avant échéance.
- **FR-035a** : Epic 4 - règles de modification client selon délai et statut.
- **FR-036** : Epic 3 - paramétrage de la date limite lors de la planification des occurrences.
- **FR-037** : Epic 4 - lecture seule client après la date limite.
- **FR-038** : Epic 4 - traitement d'une commande préparée non récupérée.
- **FR-039** : Epic 4 - traçabilité du report de récupération.
- **FR-040** : Epic 4 - retour en préparation après report.
- **FR-041** : Epic 4 - gestion de la fiche contact et de son historique.
- **FR-041a** : Epic 4 - audit des modifications selon la date limite.
- **FR-041b** : Epic 4 - gestion des quantités classiques non servies sans substitution de produit.
- **FR-042** : Epic 3 - gestion des modes de récupération.
- **FR-043** : Epic 3 - typage fonctionnel des modes de récupération.
- **FR-044** : Epic 3 - rattachement des sélections à des occurrences datées.
- **FR-044a** : Epic 3 - définition et sélection des occurrences prévues.
- **FR-044b** : Epic 3 - création, récurrence et cycle de vie des occurrences.
- **FR-045** : Epic 3 - gestion des informations d'un marché récurrent.
- **FR-046** : Epic 3 - distinction entre marché récurrent et occurrences.
- **FR-047** : Epic 4 - rattachement des commandes à une occurrence de marché.
- **FR-048** : Epic 3 - gestion ordonnée des tournées et passages.
- **FR-049** : Epic 3 - distinction entre tournée récurrente et occurrences.
- **FR-050** : Epic 4 - rattachement des livraisons à une occurrence de tournée.
- **FR-051** : Epic 4 - priorisation des actions du jour et du lendemain.
- **FR-052** : Epic 4 - visibilité des files de commandes et occurrences imminentes.
- **FR-053** : Epic 4 - signalement des nouveautés et disponibilités anciennes.
- **FR-054** : Epic 4 - traitement séquentiel avec progression.
- **FR-055** : Epic 4 - accès direct aux actions opérationnelles de commande.
- **FR-056** : Epic 4 - agrégation des quantités à préparer par occurrence.
- **FR-057** : Epic 5 - intégration des paniers AMAP générés dans les volumes et compléments à préparer.
- **FR-058** : Epic 4 - clôture avec mise à jour et publication facultative.
- **FR-059** : Epic 4 - terminaison et historisation d'une occurrence clôturée.
- **FR-059a** : Epic 4 - parcours guidé et revalidation serveur de la clôture.
- **FR-060** : Epic 5 - gestion des adhérents AMAP et de leurs comptes.
- **FR-060a** : Epic 5 - unicité et paramètres de l'abonnement AMAP actif.
- **FR-061** : Epic 5 - conservation des données complètes de l'abonnement.
- **FR-062** : Epic 5 - administration hors ligne des inscriptions et résiliations.
- **FR-063** : Epic 5 - définition périodique des compositions de paniers.
- **FR-063a** : Epic 5 - composition explicite, indépendante et ordonnée par format.
- **FR-064** : Epic 5 - gel de la composition à la génération.
- **FR-065** : Epic 5 - définition des produits de remplacement autorisés.
- **FR-066** : Epic 6 - substitution limitée d'éléments du prochain panier.
- **FR-067** : Epic 6 - visibilité des substitutions sans équivalence automatique.
- **FR-067a** : Epic 5 - paramétrage des quantités de substitution autorisées.
- **FR-068** : Epic 5 - génération planifiée et idempotente des commandes AMAP.
- **FR-068a** : Epic 5 - gel et modification auditée des données générées.
- **FR-068b** : Epic 5 - synchronisation des exceptions avant et après génération.
- **FR-069** : Epic 5 - démarrage des commandes AMAP à préparer.
- **FR-070** : Epic 5 - application du workflow AMAP nominal.
- **FR-071** : Epic 6 - consultation du prochain panier et du solde.
- **FR-072** : Epic 6 - gestion des exceptions avant la date limite.
- **FR-073** : Epic 6 - blocage adhérent et relais administratif après échéance.
- **FR-074** : Epic 6 - suspension sans consommation et avec historique.
- **FR-075** : Epic 6 - cession tracée et consommation par le titulaire.
- **FR-075a** : Epic 6 - incompatibilité auditée entre suspension et cession.
- **FR-076** : Epic 5 - consommation unique à la livraison d'un panier.
- **FR-077** : Epic 5 - correction tracée du solde après changement de statut.
- **FR-078** : Epic 6 - consultation de l'historique AMAP adhérent.
- **FR-078a** : Epic 5 - contrôle des transitions classiques et AMAP autorisées.
- **FR-078b** : Epic 5 - contre-écriture exceptionnelle des consommations AMAP.
- **FR-079** : Epic 7 - conservation maîtrisée des historiques métier.
- **FR-080** : Epic 1 - restriction des données clients aux administrateurs autorisés.
- **FR-081** : Epic 4 - modification administrative multicanale et traçable.
- **FR-082** : Epic 1 - rôles, cloisonnement et désactivation des comptes.
- **FR-082a** : Epic 1 - authentification, réinitialisation et gestion des sessions.
- **FR-083** : Epic 1 - contenu minimal et immutabilité des événements d'audit.
- **FR-083a** : Epic 1 - périmètre des actions significatives auditables.

## Liste des epics

### Epic 1 : Accéder à l'exploitation en sécurité

**Objectif utilisateur :** permettre aux administrateurs et aux adhérents AMAP d'accéder uniquement aux données et actions correspondant à leur rôle, avec des comptes, sessions et actions sensibles maîtrisés.

**FR couvertes :** FR-080, FR-082, FR-082a, FR-083, FR-083a.

**Notes d'implémentation/UX :** appliquer l'autorisation côté API, cloisonner strictement les données, rendre les sessions révocables et présenter des états explicites pour les accès refusés, comptes désactivés et sessions expirées. Les événements d'audit sont immuables et réservés aux administrateurs.

### Epic 2 : Maintenir et publier une offre fiable

**Objectif utilisateur :** permettre à l'administrateur de maintenir produits et disponibilités estimées, puis de publier une offre publique fiable et, facultativement, d'en informer les personnes consentantes.

**FR couvertes :** FR-001, FR-002, FR-002a, FR-002b, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009a, FR-010, FR-011, FR-012, FR-013, FR-014, FR-015, FR-016, FR-017, FR-018, FR-019, FR-019a, FR-019b, FR-019c, FR-019d.

**Notes d'implémentation/UX :** séparer brouillon, snapshot publié et campagne email; afficher clairement que les quantités ne sont ni garanties ni réservées. Verrouiller la publication sur la version revue, préserver les snapshots et rendre visibles les exclusions et échecs d'envoi sans bloquer l'offre active.

### Epic 3 : Planifier les récupérations et distributions

**Objectif utilisateur :** permettre à l'administrateur d'organiser les lieux fixes, marchés et tournées sous forme de modèles récurrents et d'occurrences datées sélectionnables.

**FR couvertes :** FR-036, FR-042, FR-043, FR-044, FR-044a, FR-044b, FR-045, FR-046, FR-048, FR-049.

**Notes d'implémentation/UX :** distinguer visuellement et techniquement les modèles permanents des occurrences datées, calculer les limites dans `Europe/Paris` et ne proposer à la commande que les occurrences `Prévue` encore ouvertes. Prévoir une réorganisation de tournée utilisable sans glisser-déposer.

### Epic 4 : Traiter une commande classique de bout en bout

**Objectif utilisateur :** permettre au client de commander et suivre sans compte, et à l'administrateur de valider, préparer, ajuster, livrer, reporter ou annuler chaque commande jusqu'à la clôture de l'occurrence.

**FR couvertes :** FR-009, FR-020, FR-021, FR-022, FR-023, FR-024, FR-025, FR-026, FR-027, FR-028, FR-029, FR-030, FR-031, FR-031a, FR-032, FR-032a, FR-033, FR-034, FR-035, FR-035a, FR-037, FR-038, FR-039, FR-040, FR-041, FR-041a, FR-041b, FR-047, FR-050, FR-051, FR-052, FR-053, FR-054, FR-055, FR-056, FR-058, FR-059, FR-059a, FR-081.

**Notes d'implémentation/UX :** figer les données commerciales à la création, séparer montant indicatif et montant final et sécuriser le suivi par un jeton limité à une commande. Optimiser les vues `Aujourd'hui`, validation et préparation pour le traitement séquentiel; rendre la clôture persistante, guidée et revalidée côté serveur.

### Epic 5 : Administrer et générer les paniers AMAP

**Objectif utilisateur :** permettre à l'administrateur de gérer les adhérents, abonnements, compositions et remplacements, puis de générer et traiter des commandes AMAP cohérentes et idempotentes.

**FR couvertes :** FR-057, FR-060, FR-060a, FR-061, FR-062, FR-063, FR-063a, FR-064, FR-065, FR-067a, FR-068, FR-068a, FR-068b, FR-069, FR-070, FR-076, FR-077, FR-078a, FR-078b.

**Notes d'implémentation/UX :** distinguer abonnement permanent, échéance, exception datée et commande générée; figer les données à la génération et garantir l'idempotence par abonnement et occurrence. Protéger les transitions et la consommation du solde par des transactions et contre-écritures auditables.

### Epic 6 : Gérer son prochain panier AMAP

**Objectif utilisateur :** permettre à l'adhérent de consulter son prochain panier et son historique, puis d'effectuer avant échéance les changements autorisés sur cette seule livraison.

**FR couvertes :** FR-066, FR-067, FR-071, FR-072, FR-073, FR-074, FR-075, FR-075a, FR-078.

**Notes d'implémentation/UX :** centrer l'espace adhérent sur le prochain panier, sa date limite et son solde. Présenter suspension, cession, changement de retrait et substitutions comme des actions distinctes, afficher immédiatement leur effet et passer en lecture seule après échéance.

### Epic 7 : Maîtriser le cycle de vie des données personnelles

**Objectif utilisateur :** permettre à l'exploitation de conserver les historiques nécessaires tout en appliquant les durées, demandes de droits, suppressions, anonymisations et obligations de preuve appropriées.

**FR couvertes :** FR-079.

**Notes d'implémentation/UX :** définir une politique exécutable de conservation et de pseudonymisation qui préserve les agrégats et obligations légales. Fournir aux administrateurs un processus traçable pour l'accès, la rectification, l'export et l'effacement, sans exposer de données personnelles inutiles.

### Epic 8 : Garantir une mise en production accessible, exploitable et vérifiée

**Objectif utilisateur :** garantir que la même version candidate peut être déployée, restaurée et utilisée sur les surfaces cibles, au clavier et avec les technologies d'assistance, avant sa mise en production.

**FR couvertes :** aucune nouvelle FR; cet epic matérialise les exigences UX et non fonctionnelles transverses.

**Notes d'implémentation/UX :** regrouper ici la stabilisation transverse, l'exploitabilité des environnements et la recette finale évite de rouvrir chaque epic métier à mesure que navigation, accessibilité et déploiement se durcissent. Cet epic se clôt sur une gate observable : une même candidate est déployée, restaurée et validée sur les parcours et surfaces cibles; il ne remplace pas les tests métier et n'est pas un simple milestone technique.

**Décision de granularité :** le product owner accepte les stories cohésives possédant de nombreux scénarios lorsqu'elles livrent un seul aggregate ou parcours vertical complet; les scinder par couche produirait une capacité inutilisable ou une dépendance future. Les Stories 8.1 à 8.5 vérifient et durcissent les contrats déjà implémentés dans les epics métier, sans introduire un second design system ni redessiner les écrans; toute anomalie est corrigée dans le composant propriétaire avec un test de non-régression.

### Dépendances naturelles

- L'Epic 1 fournit l'authentification, l'autorisation et l'audit transverses nécessaires aux Epics 2 à 8.
- L'Epic 2 fournit les produits, disponibilités et snapshots d'offre consommés par les commandes classiques et les compositions AMAP.
- L'Epic 3 fournit les occurrences datées requises par les Epics 4, 5 et 6.
- L'Epic 4 s'appuie sur les Epics 1 à 3 pour le parcours complet, mais ses capacités de traitement et de clôture servent aussi les commandes AMAP.
- L'Epic 5 fournit les abonnements, compositions, échéances et commandes générées utilisés par l'Epic 6.
- L'Epic 7 est transverse et doit être appliqué aux données et historiques produits par tous les autres epics.
- L'Epic 8 vérifie transversalement l'expérience produite par les Epics 1 à 7 et ne remplace pas leurs critères métier.

## Epic 1 : Accéder à l'exploitation en sécurité

Permettre aux administrateurs et aux adhérents AMAP d'accéder uniquement aux données et actions correspondant à leur rôle, avec des comptes, sessions et actions sensibles maîtrisés.

### Story 1.1 : Initialiser le workspace et ses frontières

En tant que maraîcher administrateur,
je veux disposer d'un socle de projet cohérent et reproductible,
afin que les fonctions opérationnelles puissent être développées sans divergence d'architecture.

**Exigences couvertes :** aucune FR directe; AD-1, AD-2, AD-3, AD-5, AD-6, AD-8, AD-10, AD-14.

**Critères d'acceptation :**

**Étant donné** le dépôt avant initialisation
**Quand** le workspace est installé avec `pnpm`
**Alors** un unique `pnpm-lock.yaml` racine fait autorité
**Et** les manifests épinglent Node.js `24.0.0`, Next.js `16.3.2`, AdonisJS `7.5.0`, Lucid `22.4.2`, OpenAPI `3.1.2` et Tamagui `2.7.7`, tandis que l'image d'infrastructure épingle PostgreSQL `18.6`.

**Étant donné** le structural seed défini par l'architecture
**Quand** l'arborescence est inspectée
**Alors** elle contient `apps/web`, `apps/api`, `apps/api/openapi`, `apps/api/app/adapters`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`
**Et** elle ne contient pas d'`apps/mobile` déployable en V1.

**Étant donné** les frontières architecturales
**Quand** les contrôles locaux sont exécutés
**Alors** ils refusent imports profonds, cycles et directions interdites entre packages
**Et** seul `packages/ui` importe directement Tamagui, les routes Next.js restent minces et `packages/screens` n'importe aucun routeur.

**Étant donné** les couches domaine et application
**Quand** leurs imports sont analysés
**Alors** elles ne dépendent ni d'HTTP, ni d'ORM, ni de framework d'interface
**Et** la direction autorisée reste `apps → screens → domain/application → core`.

**Étant donné** un nouveau besoin de données
**Quand** une future story l'implémente
**Alors** elle crée uniquement les tables, migrations et adaptateurs nécessaires à sa capacité
**Et** cette story d'initialisation ne précrée aucune table métier spéculative.

**Étant donné** les scripts racine
**Quand** le développeur lance installation, types, lint, frontières, cycles, tests ou builds
**Alors** chaque commande délègue aux packages concernés avec un code de sortie fiable
**Et** les mêmes commandes peuvent être réutilisées sans comportement différent par la future CI.

### Story 1.2 : Livrer le shell, le contrat API et la gate de notice

En tant que maraîcher administrateur,
je veux ouvrir une application responsive reliée à une API contractuelle et conforme avant collecte,
afin de vérifier le socle utilisateur sans exposer de données personnelles sans information valide.

**Exigences couvertes :** aucune FR directe; NFR-001, NFR-003, NFR-011; UX-DR1 à UX-DR17, UX-DR81, UX-DR82, UX-DR84, UX-DR87, UX-DR97, UX-DR99; AD-4, AD-5, AD-9, AD-13, AD-14.

**Critères d'acceptation :**

**Étant donné** le shell web initial
**Quand** il est ouvert entre `320 px` et `1440 px`, au clavier ou avec une technologie d'assistance
**Alors** il affiche un unique `main`, une hiérarchie de titres valide, un lien `Aller au contenu` visible au focus et aucun défilement horizontal
**Et** le contenu reste utilisable à `200 %` de texte et `400 %` de zoom.

**Étant donné** la configuration de `@project/ui`
**Quand** le shell est rendu
**Alors** couleurs, typographies, espacements, rayons et focus proviennent exclusivement des tokens centralisés
**Et** aucune valeur visuelle locale divergente n'est introduite.

**Étant donné** l'API AdonisJS initialisée
**Quand** son endpoint de santé versionné est appelé
**Alors** il retourne une réponse conforme au contrat OpenAPI `3.1.2` appartenant à `apps/api`
**Et** aucun détail interne, secret ou état métier n'est exposé.

**Étant donné** le contrat OpenAPI
**Quand** la vérification locale s'exécute
**Alors** Redocly valide et lint le document avant qu'`openapi-typescript` génère les types de `@project/api-client`
**Et** un test vérifie l'accord du contrat avec l'endpoint de santé et le client généré.

**Étant donné** un écran ou formulaire collectant des données personnelles
**Quand** il est rendu dans un environnement de production
**Alors** une notice active, versionnée et juridiquement validée décrit au minimum responsable, finalité, base, durée ou critère, droits et contact
**Et** la soumission est bloquée si cette notice n'est pas configurée.

**Étant donné** une collecte autorisée
**Quand** la personne soumet ses données
**Alors** la version exacte de la notice affichée est enregistrée avec la collecte
**Et** une version ultérieure ne réécrit pas cette preuve historique.

**Étant donné** une erreur de validation ou une ressource absente
**Quand** l'API répond
**Alors** l'erreur suit RFC 9457 avec type, titre, statut, détail et identifiant de corrélation appropriés
**Et** le shell présente une explication exploitable sans révéler d'information interne.

### Story 1.3 : Automatiser la CI et produire les artefacts

En tant que responsable de l'exploitation,
je veux produire des artefacts immuables vérifiés automatiquement,
afin que chaque changement intégré fournisse une candidate identifiable et reproductible.

**Exigences couvertes :** aucune FR directe; NFR-007; AD-8, AD-10, AD-11.

**Critères d'acceptation :**

**Étant donné** les applications `web` et `api`
**Quand** leurs builds sont exécutés séparément
**Alors** chacune produit son propre artefact immuable identifié par le SHA Git
**Et** secrets et configurations runtime restent fournis par l'environnement sans être intégrés aux packages partagés ni aux artefacts.

**Étant donné** une release de production
**Quand** elle est publiée
**Alors** ses artefacts conservent leur SHA immuable et reçoivent en plus le même tag SemVer
**Et** un tag ne peut pas désigner ultérieurement un artefact différent.

**Étant donné** une branche ou pull request GitHub
**Quand** GitHub Actions s'exécute avec Node.js `24.0.0` et `pnpm` en lockfile figé
**Alors** il vérifie installation, types, lint, frontières, cycles, tests, conformité OpenAPI et builds
**Et** tout échec bloque l'intégration.

### Story 1.4 : Se connecter avec email et mot de passe

En tant qu'administrateur ou adhérent AMAP,
je veux me connecter avec mon adresse email et mon mot de passe,
afin d'accéder à l'espace correspondant à mon rôle.

**Exigences couvertes :** FR-082a; NFR-001, NFR-003, NFR-011; UX-DR63, UX-DR68, UX-DR78, UX-DR81, UX-DR82, UX-DR86, UX-DR87, UX-DR90, UX-DR91, UX-DR93; AD-9, AD-13, AD-15, AD-18.

**Critères d'acceptation :**

**Étant donné** qu'aucune table de compte n'existe encore
**Quand** cette story est appliquée
**Alors** elle crée uniquement les données nécessaires aux comptes, identifiants et sessions d'authentification
**Et** chaque compte possède une adresse email normalisée unique, un mot de passe haché, un rôle `Administrateur` ou `Adherent AMAP` et les horodatages nécessaires.

**Étant donné** une nouvelle installation
**Quand** l'exploitation provisionne son premier administrateur par la commande sécurisée documentée
**Alors** le compte est créé sans identifiant ou mot de passe par défaut dans le code ou les artefacts
**Et** la commande refuse une adresse déjà utilisée et ne journalise jamais le mot de passe.

**Étant donné** un compte actif avec des identifiants valides
**Quand** l'utilisateur soumet le formulaire de connexion
**Alors** Adonis Auth vérifie les identifiants côté API et crée une session opaque protégée par un cookie `HttpOnly`, `Secure` en production et `SameSite`
**Et** l'administrateur rejoint le shell d'administration tandis que l'adhérent rejoint le shell de son espace AMAP.

**Étant donné** une adresse inconnue ou un mot de passe incorrect
**Quand** le formulaire est soumis
**Alors** aucune session n'est créée et un message générique n'indique pas si l'adresse existe
**Et** l'adresse saisie reste affichée tandis que le mot de passe est effacé.

**Étant donné** une session authentifiée
**Quand** une page réservée est demandée sans session valide
**Alors** l'API refuse l'accès et le web redirige vers la connexion sans afficher de donnée protégée
**Et** la destination initialement demandée n'est réutilisée après connexion que si elle appartient au périmètre autorisé.

**Étant donné** le formulaire de connexion
**Quand** il est utilisé au clavier, avec un lecteur d'écran, à `320 px`, avec un texte agrandi à `200 %` ou un zoom à `400 %`
**Alors** les champs ont des labels visibles, les erreurs sont reliées aux champs et un résumé d'erreurs focusable est annoncé
**Et** le focus reste visible, les saisies valides sont conservées et aucun contenu ne défile horizontalement.

**Étant donné** une soumission en cours
**Quand** l'utilisateur active « Se connecter »
**Alors** l'action est désactivée jusqu'à la réponse afin d'empêcher les doubles envois
**Et** les états chargement, succès, erreur réseau et refus d'authentification sont distingués par du texte et un signal visuel.

**Étant donné** le contrat OpenAPI de l'API
**Quand** l'authentification est implémentée
**Alors** les requêtes, réponses, erreurs et exigences de sécurité de connexion et déconnexion sont documentées et testées
**Et** aucun mot de passe, hash, secret de session ou cookie sensible n'est exposé par une réponse, un log ou `@project/api-client`.

**Étant donné** que les règles détaillées de réinitialisation, révocation et autorisation arrivent dans les stories suivantes
**Quand** la Story 1.4 est testée seule après les Stories 1.1 à 1.3
**Alors** un administrateur provisionné et un adhérent de test peuvent chacun se connecter, atteindre leur shell et se déconnecter
**Et** la story ne dépend d'aucune story future pour fournir ce parcours complet.

### Story 1.5 : Réinitialiser son mot de passe par email

En tant qu'administrateur ou adhérent AMAP,
je veux recevoir un lien de réinitialisation à usage unique,
afin de retrouver l'accès à mon espace sans intervention manuelle.

**Exigences couvertes :** FR-082a; NFR-003, NFR-011; UX-DR68, UX-DR90, UX-DR91, UX-DR93; AD-15, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** la décision produit dérogeant à `FR-019`
**Quand** la fonction de réinitialisation est livrée
**Alors** l'email de réinitialisation est l'unique email transactionnel autorisé en V1
**Et** aucun rappel, suivi de commande ou notification de statut supplémentaire n'est activé.

**Étant donné** le formulaire « Mot de passe oublié »
**Quand** une adresse email valide est soumise
**Alors** la réponse affichée reste identique que l'adresse corresponde ou non à un compte
**Et** aucune donnée de compte, rôle ou statut n'est divulguée.

**Étant donné** qu'un compte actif correspond à l'adresse soumise
**Quand** la demande est acceptée
**Alors** un jeton opaque aléatoire est créé, seul son condensat est conservé et il expire exactement une heure après sa création
**Et** toute demande ultérieure invalide les jetons de réinitialisation précédemment actifs pour ce compte.

**Étant donné** un jeton actif
**Quand** l'utilisateur ouvre le lien reçu
**Alors** il accède uniquement au formulaire de choix d'un nouveau mot de passe
**Et** le jeton n'est ni exposé dans les logs ou analytics, ni conservé dans l'historique de navigation après traitement.

**Étant donné** le formulaire de nouveau mot de passe
**Quand** l'utilisateur saisit et confirme une valeur
**Alors** le mot de passe accepte les phrases de passe, contient entre 12 et 128 caractères et n'impose pas de règle arbitraire de composition
**Et** une valeur trop courte, trop longue, différente de la confirmation ou connue comme courante est refusée avec une erreur précise.

**Étant donné** un jeton valide et un mot de passe conforme
**Quand** la réinitialisation est confirmée
**Alors** le mot de passe est remplacé atomiquement, le jeton est consommé une seule fois et toutes les sessions existantes du compte sont révoquées
**Et** l'utilisateur peut immédiatement se reconnecter avec le nouveau mot de passe, jamais avec l'ancien.

**Étant donné** un jeton invalide, expiré, déjà utilisé ou remplacé
**Quand** le lien est ouvert ou soumis
**Alors** aucune modification n'est effectuée et aucune donnée du compte n'est affichée
**Et** l'écran propose de demander un nouveau lien.

**Étant donné** l'email de réinitialisation
**Quand** il est envoyé
**Alors** il contient l'identité de l'exploitation, la durée de validité, un lien individuel et une instruction pour ignorer la demande si elle n'a pas été initiée par le destinataire
**Et** il ne contient ni contenu marketing, ni mot de passe, ni information métier ou personnelle non nécessaire.

**Étant donné** un échec temporaire du fournisseur d'email
**Quand** l'envoi ne peut pas être confirmé
**Alors** la demande reste sûre et relançable sans créer plusieurs liens actifs
**Et** le message public ne révèle ni l'existence du compte ni le détail technique de l'échec.

**Étant donné** les écrans de demande et de nouveau mot de passe
**Quand** ils sont utilisés au clavier ou avec une technologie d'assistance
**Alors** labels, aides, erreurs, résumé focusable, focus visible et annonces de statut respectent le socle accessible
**Et** les saisies valides sont conservées après une erreur de validation.

### Story 1.6 : Administrer les comptes et les sessions

En tant qu'administrateur,
je veux créer, désactiver ou réactiver des comptes et révoquer leurs sessions,
afin de maîtriser qui peut accéder à l'exploitation.

**Exigences couvertes :** FR-082, FR-082a; NFR-010, NFR-011; UX-DR23, UX-DR63 à UX-DR65, UX-DR68, UX-DR70, UX-DR72, UX-DR88, UX-DR89; AD-9, AD-13, AD-15, AD-18.

**Critères d'acceptation :**

**Étant donné** un administrateur authentifié
**Quand** il ouvre la gestion des comptes
**Alors** il voit uniquement les informations nécessaires : identité, email, rôle, état, dernière activité et nombre de sessions actives
**Et** les mots de passe, condensats, jetons et identifiants de session ne sont jamais affichés.

**Étant donné** une adresse email non utilisée et un rôle autorisé
**Quand** l'administrateur crée un compte
**Alors** le compte est créé sans mot de passe exploitable et avec une version initiale
**Et** le parcours de réinitialisation approuvé en Story 1.5 envoie le lien à usage unique permettant de définir le premier mot de passe.

**Étant donné** une adresse déjà associée à un compte
**Quand** l'administrateur tente de créer un doublon
**Alors** la création est refusée sans modifier le compte existant
**Et** l'interface propose d'ouvrir ce compte ou, s'il est désactivé, de le réactiver.

**Étant donné** un compte actif
**Quand** un administrateur confirme sa désactivation dans un `ConfirmDialog`
**Alors** toutes ses sessions et tous ses jetons de réinitialisation actifs sont révoqués atomiquement
**Et** toute nouvelle connexion ou requête protégée est refusée sans exposer de donnée.

**Étant donné** le dernier compte administrateur actif
**Quand** une désactivation ou un changement de rôle supprimerait le dernier accès administratif
**Alors** l'opération est refusée avec une explication explicite
**Et** aucun changement partiel n'est persisté.

**Étant donné** un compte désactivé
**Quand** un administrateur le réactive
**Alors** le compte peut de nouveau initier une connexion ou une réinitialisation
**Et** aucune ancienne session ni aucun ancien jeton ne redevient valide.

**Étant donné** une session authentifiée sans activité pendant 12 heures consécutives
**Quand** une nouvelle requête protégée est reçue
**Alors** la session est expirée côté API et l'accès est refusé
**Et** le web explique l'expiration puis propose une nouvelle connexion sans afficher de donnée protégée.

**Étant donné** les sessions actives d'un compte
**Quand** l'administrateur révoque une session précise ou toutes les sessions
**Alors** la révocation est immédiatement appliquée côté API
**Et** une session révoquée ne peut plus être utilisée, même si son cookie existe encore.

**Étant donné** qu'un compte ou une session a changé depuis son ouverture
**Quand** l'administrateur soumet une mutation avec une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans écrasement silencieux
**Et** l'interface explique le conflit et propose de recharger la nouvelle version.

**Étant donné** une création, désactivation, réactivation ou révocation en cours
**Quand** l'action est soumise
**Alors** le déclencheur est désactivé jusqu'à la réponse et une répétition avec le même identifiant de mutation retourne le résultat initial
**Et** une erreur réseau conserve l'état du formulaire et vérifie le résultat serveur avant toute relance.

**Étant donné** la gestion des comptes sur mobile ou au clavier
**Quand** l'administrateur consulte ou modifie un compte
**Alors** les états combinent texte et signal visuel, les cibles tactiles respectent les dimensions du contrat UX et le focus est géré correctement dans les dialogues
**Et** les actions destructives restent distinctes de l'action de continuation.

**Étant donné** l'interdiction des emails transactionnels hors réinitialisation
**Quand** un compte est créé, désactivé, réactivé ou qu'une session est révoquée
**Alors** aucun email de notification dédié n'est envoyé
**Et** seul le mécanisme de définition ou réinitialisation du mot de passe peut produire l'email exceptionnel approuvé.

### Story 1.7 : Appliquer les rôles et le cloisonnement des données

En tant qu'utilisateur authentifié,
je veux que chaque action et donnée soit limitée à mon rôle et à mon identité,
afin qu'aucune personne ne puisse accéder à un périmètre qui ne lui appartient pas.

**Exigences couvertes :** FR-080, FR-082; NFR-003, NFR-010, NFR-011; UX-DR33 à UX-DR35, UX-DR68, UX-DR85, UX-DR95; AD-9, AD-13, AD-15.

**Critères d'acceptation :**

**Étant donné** une route ou opération API protégée
**Quand** aucune politique d'autorisation explicite n'est déclarée
**Alors** l'accès est refusé par défaut
**Et** masquer un contrôle dans l'interface ne remplace jamais la vérification côté API.

**Étant donné** un administrateur actif
**Quand** il appelle les opérations de gestion des comptes et sessions livrées en Story 1.6
**Alors** l'API autorise les actions prévues pour le rôle `Administrateur`
**Et** les réponses ne contiennent que les champs explicitement déclarés dans le contrat OpenAPI.

**Étant donné** un adhérent AMAP actif
**Quand** il consulte ou modifie ses informations de profil disponibles
**Alors** l'API limite la lecture et l'écriture à l'identité liée à sa propre session
**Et** la mutation vérifie `expectedVersion` avant d'enregistrer un changement.

**Étant donné** un adhérent qui remplace un identifiant de ressource par celui d'un autre utilisateur
**Quand** il tente une lecture ou une mutation
**Alors** l'API refuse sans révéler l'existence, le rôle ou les données de l'autre compte
**Et** aucune différence exploitable de réponse ne permet d'énumérer les utilisateurs.

**Étant donné** un adhérent AMAP
**Quand** il tente d'appeler une route administrative directement, indépendamment de l'interface
**Alors** l'API refuse l'opération et n'effectue aucune écriture
**Et** le client affiche un état d'accès refusé sans information protégée.

**Étant donné** un compte désactivé ou une session révoquée après son authentification initiale
**Quand** une nouvelle requête protégée est reçue
**Alors** l'autorisation revalide l'état courant et refuse immédiatement l'accès
**Et** aucune donnée mise en cache côté web n'est réaffichée après le refus.

**Étant donné** le shell web
**Quand** un administrateur ou un adhérent ouvre son espace
**Alors** seules les destinations actuellement disponibles pour son rôle sont présentées
**Et** chaque navigation possède un nom accessible, un état actif explicite et un ordre de focus cohérent.

**Étant donné** une liste, un aperçu ou un message d'erreur
**Quand** des données personnelles ne sont pas nécessaires à l'action
**Alors** elles sont masquées ou omises
**Et** les secrets, emails complets ou identifiants internes ne sont jamais utilisés comme information décorative ou technique visible.

**Étant donné** le contrat OpenAPI
**Quand** une opération protégée est ajoutée ou modifiée
**Alors** elle déclare son mécanisme de sécurité, ses rôles autorisés et ses réponses de refus
**Et** des tests de conformité vérifient que le client ne peut pas contourner ces règles.

**Étant donné** la matrice d'accès de l'Epic 1
**Quand** les tests automatisés s'exécutent
**Alors** chaque opération actuelle est testée au minimum comme utilisateur anonyme, administrateur, adhérent propriétaire, adhérent non propriétaire et compte désactivé
**Et** les tests échouent si une réponse interdite divulgue ou modifie une donnée.

**Étant donné** qu'un futur domaine ajoute des données clients ou AMAP
**Quand** il utilise le contrat d'autorisation établi par cette story
**Alors** il doit déclarer propriétaire, rôle et actions permises avant d'exposer une opération
**Et** l'absence de cette déclaration est détectée par les contrôles automatisés, sans que la Story 1.7 dépende de ce futur domaine pour fonctionner.

### Story 1.8 : Auditer et consulter les actions de sécurité

En tant qu'administrateur,
je veux consulter un journal immuable des actions sensibles,
afin de comprendre qui a modifié l'accès à l'exploitation et quand.

**Exigences couvertes :** FR-083, FR-083a; NFR-006, NFR-011; UX-DR22, UX-DR55, UX-DR56, UX-DR80, UX-DR93, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** qu'une action significative est exécutée
**Quand** son événement d'audit est créé
**Alors** il conserve un identifiant opaque, l'acteur ou le système, l'horodatage UTC avec restitution dans `Europe/Paris`, l'objet, son identifiant, l'action, les valeurs avant/après et le motif lorsqu'il est requis
**Et** les mots de passe, condensats, jetons, cookies et secrets sont systématiquement exclus ou masqués.

**Étant donné** une création, désactivation, réactivation ou modification de rôle d'un compte, une révocation de session, une connexion ou une réinitialisation de mot de passe
**Quand** l'opération aboutit
**Alors** l'événement correspondant est enregistré selon le vocabulaire d'événements au passé du projet
**Et** le résultat métier et son audit sont persistés dans la même transaction lorsque l'action modifie un agrégat.

**Étant donné** une mutation exigeant un motif
**Quand** le motif est absent ou vide
**Alors** l'action métier et l'événement d'audit sont tous deux refusés
**Et** l'API retourne une erreur RFC 9457 reliant précisément le problème au champ concerné.

**Étant donné** le repository d'audit
**Quand** un consumer tente de modifier ou supprimer un événement existant
**Alors** aucune opération applicative de mise à jour ou suppression n'est disponible
**Et** les tests de persistance démontrent qu'un événement enregistré reste inchangé.

**Étant donné** un administrateur authentifié
**Quand** il ouvre le journal d'audit
**Alors** les événements sont affichés du plus récent au plus ancien avec acteur, date, objet, action et motif
**Et** le détail présente les valeurs avant/après en masquant les données non nécessaires.

**Étant donné** un journal contenant plus d'événements que la taille de réponse autorisée
**Quand** l'administrateur charge la suite
**Alors** l'API utilise un curseur opaque stable sans doublon ni omission malgré l'ajout de nouveaux événements
**Et** le contrat OpenAPI documente curseur suivant, limites et erreurs RFC 9457.

**Étant donné** les filtres du journal
**Quand** l'administrateur filtre par période, acteur, objet ou action
**Alors** seuls les événements correspondants sont retournés dans un ordre déterministe
**Et** une période invalide ou un curseur altéré est refusé sans exposer de détail interne.

**Étant donné** un adhérent AMAP, un utilisateur anonyme ou un compte désactivé
**Quand** il tente d'accéder au journal ou à un événement précis
**Alors** l'API refuse l'accès sans divulguer le contenu ni confirmer l'existence de l'événement
**Et** l'interface ne présente aucune destination vers le journal.

**Étant donné** le journal sur mobile, desktop, au clavier ou avec un lecteur d'écran
**Quand** les événements sont parcourus ou filtrés
**Alors** les filtres mobiles utilisent `FilterSheet`, les lignes ou cartes gardent un ordre de lecture cohérent et le chargement supplémentaire est annoncé
**Et** les états vide, chargement, erreur et absence de résultat sont explicites et actionnables.

**Étant donné** qu'un futur domaine introduit une action listée par `FR-083a`
**Quand** son cas d'usage est implémenté
**Alors** il réutilise le port d'audit et le schéma d'événement définis par cette story dans sa transaction métier
**Et** un test d'architecture refuse tout événement contenant un champ sensible ou toute mutation significative déclarée sans intégration d'audit.

**Étant donné** les huit stories de l'Epic 1
**Quand** leur suite d'acceptation est exécutée
**Alors** authentification, réinitialisation, comptes, sessions, autorisation et audit fonctionnent sans dépendre d'un epic futur
**Et** les cinq FR de l'Epic 1 sont couvertes, les futurs epics n'ayant plus qu'à brancher leurs propres actions métier sur les contrats d'autorisation et d'audit.

## Epic 2 : Maintenir et publier une offre fiable

Permettre au maraîcher de maintenir produits et disponibilités estimées, publier une offre publique immuable et informer facultativement les personnes consentantes.

### Story 2.1 : Gérer le catalogue de produits

En tant que maraîcher administrateur,
je veux créer, modifier, activer et désactiver mes produits,
afin de maintenir un catalogue fiable sans altérer les usages historiques.

**Exigences couvertes :** FR-001, FR-002, FR-002a, FR-002b; NFR-006, NFR-010, NFR-011; UX-DR18, UX-DR19, UX-DR23, UX-DR46, UX-DR64, UX-DR65; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** qu'aucune donnée produit n'existe encore
**Quand** cette story est appliquée
**Alors** elle crée uniquement l'agrégat, la persistance, les contrats API et les écrans nécessaires au catalogue produit
**Et** elle ne crée aucune table de disponibilité, publication, commande, composition AMAP ou préparation future.

**Étant donné** le formulaire de création d'un produit
**Quand** l'administrateur renseigne un nom, une description facultative, une unité contrôlée, un prix unitaire et un état
**Alors** le produit est créé avec un identifiant opaque et une version initiale
**Et** les seules unités V1 proposées sont `kg`, `unité` et `botte`.

**Étant donné** un produit actif
**Quand** son prix est saisi ou modifié
**Alors** la valeur est strictement positive, stockée sans erreur d'arrondi monétaire et affichée en euros selon la locale française avec son unité
**Et** un prix nul, négatif, absent ou comportant une précision non supportée est refusé avec une erreur RFC 9457 reliée au champ.

**Étant donné** un produit qui n'a encore été utilisé dans aucun historique métier
**Quand** l'administrateur change son unité avec la version attendue
**Alors** l'unité est mise à jour et l'action est auditée avec les valeurs avant/après
**Et** le domaine expose une opération explicite permettant aux futurs usages de verrouiller définitivement cette unité lors de leur première utilisation.

**Étant donné** un produit dont l'unité a été verrouillée par un usage
**Quand** l'administrateur tente de changer son unité
**Alors** l'API refuse la modification sans changer les autres champs
**Et** l'interface explique qu'un nouveau mode de vente exige de désactiver ce produit et d'en créer un autre.

**Étant donné** un produit existant
**Quand** l'administrateur modifie son nom, sa description ou son prix avec une `expectedVersion` courante
**Alors** seules les valeurs courantes du catalogue sont mises à jour et un événement d'audit immuable est créé
**Et** le contrat garantit que les futurs snapshots historiques ne seront jamais réécrits par cette modification.

**Étant donné** un produit actif ou inactif
**Quand** l'administrateur change son état
**Alors** l'inactivation le retire des sélections destinées aux nouveaux usages et la réactivation le rend de nouveau sélectionnable
**Et** aucune opération de suppression physique n'est exposée par l'API ou l'interface.

**Étant donné** qu'un produit a changé depuis l'ouverture du formulaire
**Quand** une mutation est soumise avec une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans écrasement silencieux
**Et** l'écran conserve les saisies, explique le conflit et propose de charger la nouvelle version.

**Étant donné** une mutation produit rejouée après une réponse réseau incertaine
**Quand** le même identifiant d'idempotence est soumis pour la même opération et le même administrateur
**Alors** l'API retourne le résultat initial sans créer ni appliquer une seconde modification
**Et** un identifiant réutilisé avec un contenu différent est refusé.

**Étant donné** la liste des produits
**Quand** l'administrateur la consulte sur mobile
**Alors** chaque `EntityCard` présente le nom, l'unité, le prix et l'état `Actif` ou `Inactif` avec une cible native unique
**Et** l'état du produit reste visuellement et sémantiquement distinct de sa future disponibilité.

**Étant donné** les écrans de liste et d'édition
**Quand** ils sont utilisés entre `320 px` et `1440 px`, au clavier ou avec une technologie d'assistance
**Alors** labels, unités, erreurs, focus, cibles tactiles et annonces de sauvegarde respectent le contrat UX
**Et** l'inactivation utilise un `ConfirmDialog` accessible expliquant la conservation des historiques.

**Étant donné** les rôles de l'application
**Quand** un adhérent, un utilisateur anonyme ou un compte désactivé appelle une opération de catalogue administrative
**Alors** l'API refuse sans divulguer de donnée interne ni effectuer d'écriture
**Et** seuls les administrateurs actifs peuvent créer ou modifier un produit.

### Story 2.2 : Maintenir le brouillon des disponibilités

En tant que maraîcher administrateur,
je veux enregistrer l'état et la quantité estimée de chaque produit sans les publier,
afin de préparer une offre fiable sans créer de faux stock.

**Exigences couvertes :** FR-003 à FR-007; NFR-001, NFR-006, NFR-010, NFR-011; UX-DR24, UX-DR28, UX-DR41, UX-DR57, UX-DR63, UX-DR64, UX-DR69, UX-DR72, UX-DR78; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** un produit nouvellement créé
**Quand** sa disponibilité est initialisée
**Alors** elle commence à `Indisponible` avec une quantité `Non suivie` et une version propre
**Et** cette initialisation ne rend aucune offre publique et ne crée aucun snapshot.

**Étant donné** un produit actif
**Quand** l'administrateur utilise `AvailabilityStatusControl`
**Alors** il peut choisir exactement `Disponible`, `Selon disponibilité` ou `Indisponible`
**Et** le statut combine libellé, signal visuel et état accessible sans dépendre uniquement de la couleur.

**Étant donné** une disponibilité `Disponible` ou `Selon disponibilité`
**Quand** l'administrateur configure la quantité
**Alors** il peut choisir `Connue et visible`, `Connue mais masquée` ou `Non suivie`
**Et** une quantité connue exige une valeur, tandis que `Non suivie` conserve une absence explicite qui n'est jamais interprétée comme zéro.

**Étant donné** une quantité connue pour un produit vendu au `kg`
**Quand** sa valeur est enregistrée
**Alors** elle accepte une valeur positive ou nulle avec jusqu'à trois décimales et affiche toujours `kg`
**Et** une valeur négative, non numérique ou trop précise est refusée au niveau du champ.

**Étant donné** une quantité connue pour un produit vendu à l'`unité` ou à la `botte`
**Quand** sa valeur est enregistrée
**Alors** elle accepte uniquement un entier positif ou nul et affiche l'unité correspondante
**Et** une fraction est refusée avec une explication précise.

**Étant donné** une quantité connue existante
**Quand** le produit passe à `Indisponible`
**Alors** la valeur peut être conservée techniquement mais elle est masquée dans la vue opérationnelle principale et ne sera pas exposée publiquement
**Et** le changement n'altère aucun usage ou historique existant.

**Étant donné** une modification non encore enregistrée
**Quand** l'administrateur consulte la carte du produit
**Alors** l'état `Non enregistré` est explicite et l'action de sauvegarde reste distincte de toute future action de publication
**Et** après succès, l'état devient `Enregistré` avec un retour annoncé sans laisser croire que le changement est public.

**Étant donné** une disponibilité enregistrée
**Quand** sa valeur diffère du dernier snapshot publié ou qu'aucun snapshot n'existe
**Alors** `AvailabilityStatusControl` affiche aussi explicitement l'état `Non publié`
**Et** il distingue ainsi `Non enregistré`, `Enregistré`, `Non publié` et `Conflit` sans confondre sauvegarde et publication.

**Étant donné** plusieurs produits dans la vue des disponibilités
**Quand** l'administrateur modifie puis enregistre l'un d'eux
**Alors** seule la disponibilité ciblée est mutée et auditée avec ses valeurs avant/après
**Et** les autres saisies non soumises restent intactes.

**Étant donné** une disponibilité modifiée depuis son ouverture
**Quand** l'administrateur soumet une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans écrasement silencieux et affiche l'état `Conflit`
**Et** l'écran conserve la saisie locale, explique l'écart et propose de charger la version courante.

**Étant donné** une réponse réseau incertaine
**Quand** une sauvegarde est répétée avec le même identifiant de mutation
**Alors** l'API retourne le résultat initial sans appliquer deux fois le changement
**Et** l'interface distingue `Non envoyée`, `Vérification en cours` et `Échec confirmé`.

**Étant donné** une commande, une préparation, une livraison ou une vente extérieure future
**Quand** cette opération se produit
**Alors** aucun contrat du domaine disponibilité ne permet une réservation ou une décrémentation automatique
**Et** seuls les cas d'usage administratifs explicites de cette story peuvent changer la disponibilité courante.

**Étant donné** la vue mobile des disponibilités
**Quand** elle est utilisée à partir de `320 px`, au clavier ou avec un lecteur d'écran
**Alors** statut, quantité, visibilité, unité et sauvegarde restent utilisables en trois actions ou moins depuis la vue de travail
**Et** `NumericInput`, retours de sauvegarde, cibles tactiles et focus respectent le contrat UX.

**Étant donné** un produit inactif
**Quand** les disponibilités sont consultées
**Alors** son état courant reste accessible à l'administrateur pour compréhension historique mais il est exclu des nouveaux usages
**Et** l'interface ne confond jamais `Inactif` avec `Indisponible`.

### Story 2.3 : Réviser et publier une offre immuable

En tant que maraîcher administrateur,
je veux comparer mon brouillon à l'offre active puis publier une version immuable,
afin que les clients consultent une offre fiable sans voir mes changements en cours.

**Exigences couvertes :** FR-008, FR-009a, FR-010, FR-011, FR-013; NFR-001, NFR-006, NFR-010, NFR-011; UX-DR29, UX-DR42, UX-DR47, UX-DR58 à UX-DR60, UX-DR64, UX-DR69; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** qu'aucune publication n'existe encore
**Quand** l'administrateur ouvre la revue
**Alors** `PublicationDiff` présente une « Première publication » avec le nombre de produits actifs inclus
**Et** l'URL publique affiche jusque-là un état vide expliquant qu'aucune offre n'est disponible.

**Étant donné** une publication active et un brouillon modifié
**Quand** l'administrateur ouvre la revue
**Alors** le système compare une version précise du brouillon au dernier snapshot et liste séparément ajouts, modifications et retraits de produits, prix, statuts, quantités et visibilité
**Et** la revue affiche la version, l'horodatage et le nombre total de changements.

**Étant donné** que le brouillon correspond exactement à la dernière publication
**Quand** l'écran de revue est ouvert directement
**Alors** il affiche « Rien à publier » et propose un retour aux disponibilités
**Et** aucune action de publication ni aucun nouveau snapshot identique n'est disponible.

**Étant donné** une revue courante contenant des changements
**Quand** l'administrateur confirme « Publier maintenant »
**Alors** une transaction crée un snapshot immuable avec un identifiant opaque, une version, l'horodatage et les valeurs appliquées de chaque produit actif publié
**Et** elle fige notamment libellé, description, unité, prix, disponibilité, quantité estimée et visibilité sans référencer les valeurs courantes pour leur restitution future.

**Étant donné** qu'un produit apparaît pour la première fois dans un snapshot publié
**Quand** la transaction réussit
**Alors** son unité est verrouillée dans la même transaction
**Et** une modification ultérieure du catalogue ne peut ni changer cette unité dans l'historique ni réécrire le snapshot.

**Étant donné** que le brouillon change après l'ouverture de la revue
**Quand** l'administrateur publie la version devenue obsolète
**Alors** l'API refuse atomiquement avec un conflit RFC 9457 et ne crée aucun snapshot partiel
**Et** l'écran annonce l'écart et propose « Recharger la revue » en conservant les choix encore pertinents.

**Étant donné** une requête de publication répétée après une réponse réseau incertaine
**Quand** le même identifiant d'idempotence est rejoué par le même administrateur
**Alors** l'API retourne le snapshot initial sans créer une seconde publication
**Et** l'interface vérifie le résultat serveur avant d'autoriser une nouvelle tentative.

**Étant donné** une publication réussie
**Quand** la confirmation est affichée
**Alors** elle indique l'heure, l'identifiant et le nombre de changements publiés
**Et** seul le compteur correspondant à la version publiée revient à zéro; toute modification enregistrée en parallèle reste signalée comme non publiée.

**Étant donné** l'URL publique unique de l'offre
**Quand** un visiteur l'ouvre après publication
**Alors** elle restitue uniquement le dernier snapshot actif, sans dépendre des produits ou disponibilités courants
**Et** un changement de brouillon ou une publication antérieure ne modifie jamais ce contenu.

**Étant donné** un produit `Disponible` ou `Selon disponibilité` dans le snapshot
**Quand** l'offre publique est affichée
**Alors** une quantité `Connue et visible` est montrée avec son unité, tandis qu'une quantité `Connue mais masquée` ou `Non suivie` n'est pas révélée
**Et** le statut et le prix figés restent lisibles sans suggérer une réservation.

**Étant donné** un produit `Indisponible` ou inactif au moment de la publication
**Quand** le snapshot est construit
**Alors** un produit inactif est exclu et un produit publié comme `Indisponible` ne permet aucune future sélection de quantité
**Et** une quantité techniquement conservée pour un produit indisponible n'est pas exposée.

**Étant donné** l'offre publique
**Quand** elle est consultée sur tout format pris en charge
**Alors** elle indique explicitement que les quantités sont estimatives, non réservées et sans engagement de fourniture
**Et** elle fonctionne de `320 px` à `1440 px`, au clavier, à `200 %` de texte et `400 %` de zoom sans défilement horizontal.

**Étant donné** un identifiant de publication historique ou une URL de brouillon
**Quand** un visiteur tente un accès public direct
**Alors** aucun contenu historique ou non publié n'est rendu commandable ou exposé par cette route
**Et** l'application renvoie vers l'offre publique courante sans divulguer les détails internes.

**Étant donné** une publication réussie
**Quand** la transaction est validée
**Alors** un événement d'audit immuable conserve l'acteur, la version source, l'identifiant du snapshot et le résumé des changements
**Et** aucun email n'est requis pour que la publication reste active et utilisable.

### Story 2.4 : Consulter l'historique des publications

En tant que maraîcher administrateur,
je veux retrouver chaque offre publiée et son contenu exact,
afin de comprendre ce qui était présenté aux clients à une date donnée.

**Exigences couvertes :** FR-008, FR-012, FR-013; NFR-006, NFR-011; UX-DR18, UX-DR21, UX-DR26, UX-DR29, UX-DR55; AD-7, AD-9, AD-12, AD-13.

**Critères d'acceptation :**

**Étant donné** qu'aucune publication n'existe
**Quand** l'administrateur ouvre l'historique
**Alors** un `EmptyState` explique qu'aucune offre n'a encore été publiée
**Et** il propose un accès direct aux disponibilités si le rôle le permet.

**Étant donné** plusieurs publications
**Quand** l'historique est consulté
**Alors** elles sont triées de la plus récente à la plus ancienne avec identifiant, date `Europe/Paris`, auteur et nombre de produits
**Et** la liste utilise un curseur opaque stable sans doublon ni omission lorsque de nouvelles publications sont ajoutées.

**Étant donné** une publication historique
**Quand** l'administrateur ouvre son détail
**Alors** il voit exactement les produits, libellés, descriptions, unités, prix, statuts, quantités et règles de visibilité figés dans ce snapshot
**Et** aucune valeur n'est recalculée depuis le catalogue ou les disponibilités courants.

**Étant donné** une publication qui n'est pas la première
**Quand** son détail est affiché
**Alors** `PublicationDiff` permet de comparer ce snapshot au précédent et distingue ajouts, modifications et retraits
**Et** le résultat de la comparaison reste déterministe même après des modifications ultérieures du catalogue.

**Étant donné** un snapshot historique
**Quand** un administrateur tente de le modifier, supprimer ou réactiver comme brouillon
**Alors** aucune opération correspondante n'est disponible et l'API refuse toute mutation
**Et** la seule offre accessible publiquement reste la dernière publication active.

**Étant donné** un visiteur anonyme, un adhérent ou un compte désactivé
**Quand** il tente d'appeler une route d'historique ou de détail administratif
**Alors** l'accès est refusé sans divulguer l'existence ni le contenu du snapshot
**Et** connaître son identifiant opaque ne permet pas de contourner cette restriction.

**Étant donné** un curseur altéré, une période invalide ou un snapshot inconnu
**Quand** l'API reçoit la requête
**Alors** elle retourne une erreur RFC 9457 sans détail interne
**Et** aucune donnée d'un autre snapshot n'est incluse dans la réponse.

**Étant donné** l'historique sur mobile
**Quand** les publications sont parcourues
**Alors** chaque `EntityCard` ouvre un détail unique et présente date, identifiant et volume dans un ordre lisible
**Et** tablette et desktop peuvent utiliser `ResponsivePane` uniquement si le master/detail réduit réellement les allers-retours.

**Étant donné** le chargement progressif ou un échec réseau
**Quand** l'état change
**Alors** la structure est préservée par un skeleton inerte, la progression est annoncée et les résultats déjà chargés restent visibles
**Et** une reprise ne duplique ni ne réordonne les publications affichées.

**Étant donné** les Stories 2.1 à 2.4
**Quand** elles sont exécutées sans les stories de consentement ou campagne
**Alors** le maraîcher peut gérer, publier et historiser une offre complète tandis que le public consulte la dernière version
**Et** aucune story future n'est nécessaire à ce parcours de publication sans email.

### Story 2.5 : S'inscrire et gérer son consentement aux publications

En tant que visiteur,
je veux choisir librement de recevoir les publications et pouvoir retirer ce choix,
afin de maîtriser les communications envoyées à mon adresse email.

**Exigences couvertes :** FR-016, FR-017, FR-019a; NFR-003, NFR-004, NFR-010, NFR-011; UX-DR49, UX-DR65, UX-DR67, UX-DR97, UX-DR98; AD-9, AD-13, AD-15, AD-18.

**Critères d'acceptation :**

**Étant donné** l'offre publique
**Quand** un visiteur accède à l'inscription aux publications
**Alors** il utilise un formulaire distinct de toute commande, ne demandant que son adresse email et son consentement explicite
**Et** la case d'opt-in n'est jamais précochée ni nécessaire pour consulter l'offre ou commander ultérieurement.

**Étant donné** le formulaire d'inscription
**Quand** il est affiché
**Alors** il présente une mention d'information versionnée indiquant responsable, finalité, base de consentement, destinataires, durée ou critère de conservation, droit de retrait et contact
**Et** l'identité légale, les prestataires, transferts et durées restent configurables et doivent être validés avant mise en production.

**Étant donné** une adresse valide et une case d'opt-in cochée
**Quand** le formulaire est soumis
**Alors** l'adresse est normalisée et un abonnement actif unique est créé
**Et** un événement immuable conserve l'adresse concernée, l'état `Opt-in`, l'horodatage, la source, le texte exact et la version de la mention affichée.

**Étant donné** une adresse déjà activement inscrite
**Quand** le formulaire est soumis de nouveau
**Alors** aucun abonnement ni événement d'opt-in dupliqué n'est créé
**Et** la réponse confirme simplement que la demande est prise en compte sans exposer l'historique du consentement.

**Étant donné** une adresse ayant précédemment retiré son consentement
**Quand** elle est inscrite de nouveau avec un opt-in explicite
**Alors** un nouvel événement immuable `Opt-in` est ajouté sans modifier l'événement de retrait antérieur
**Et** l'abonnement redevient actif à partir de ce nouvel horodatage.

**Étant donné** une soumission sans opt-in, avec une adresse invalide ou un formulaire périmé
**Quand** l'API traite la demande
**Alors** aucune inscription active n'est créée et une erreur précise est reliée au champ ou à la version de mention concernée
**Et** les saisies valides restent présentes sans qu'aucun email soit envoyé.

**Étant donné** la création ou réactivation d'un abonnement
**Quand** l'inscription réussit
**Alors** une confirmation et son lien individuel de gestion sont affichés immédiatement à l'écran pour que la personne puisse le conserver
**Et** aucun email de double opt-in, de bienvenue ou de gestion dédié n'est envoyé en V1.

**Étant donné** le lien individuel remis à l'inscription ou inclus dans un futur email de publication
**Quand** son détenteur ouvre la page de consentement
**Alors** il peut consulter l'état actif de l'adresse masquée et retirer son consentement sans compte
**Et** le jeton est opaque, limité à ce consentement, stocké sous forme de condensat et absent des logs ou historiques visibles.

**Étant donné** un consentement actif
**Quand** son détenteur confirme la désinscription
**Alors** le retrait devient effectif immédiatement, crée un événement immuable `Retrait` avec date, source et version d'information, et empêche toute campagne future
**Et** répéter la même action reste idempotent sans créer plusieurs retraits équivalents.

**Étant donné** un lien invalide, révoqué ou altéré
**Quand** la page est ouverte
**Alors** aucune adresse ni donnée de consentement n'est révélée
**Et** l'écran propose uniquement le formulaire public d'inscription ou le contact vie privée.

**Étant donné** un administrateur
**Quand** il consulte l'état d'un abonnement email
**Alors** il voit le statut, les dates, sources et versions de preuve nécessaires
**Et** aucune action ne lui permet de réactiver silencieusement un consentement retiré.

**Étant donné** une inscription ou un retrait concurrent
**Quand** une mutation utilise une version obsolète ou est rejouée
**Alors** l'API préserve une chronologie unique et retourne le résultat déjà établi sans événement contradictoire
**Et** aucun retrait ne peut être écrasé par une campagne préparée antérieurement.

**Étant donné** les écrans publics de consentement
**Quand** ils sont utilisés sur mobile, au clavier ou avec un lecteur d'écran
**Alors** labels, statut, erreurs, résumé focusable et confirmation sont accessibles et annoncés
**Et** l'information juridique reste lisible à `200 %` de texte et `400 %` de zoom sans masquer l'action principale.

### Story 2.6 : Envoyer une campagne de publication fiable

En tant que maraîcher administrateur,
je veux accompagner facultativement une publication d'un email aux abonnés consentants,
afin de diffuser mon offre sans bloquer sa disponibilité ni contacter une personne retirée.

**Exigences couvertes :** FR-014, FR-015, FR-018, FR-019, FR-019b, FR-019c, FR-019d; NFR-003, NFR-004, NFR-006, NFR-007, NFR-011; UX-DR42, UX-DR58 à UX-DR63, UX-DR93; AD-9, AD-13, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** la revue d'une offre prête à publier
**Quand** l'administrateur choisit le canal email
**Alors** il voit le message, le nombre de destinataires actuellement consentants et les exclusions connues avant confirmation
**Et** publier sans email reste toujours possible et constitue une opération complète.

**Étant donné** une confirmation avec envoi email
**Quand** la publication réussit
**Alors** le snapshot devient actif indépendamment, puis une campagne distincte conserve son contenu, sa publication source et son état
**Et** un échec de création, d'exécution ou d'envoi de la campagne ne retire ni ne modifie le snapshot publié.

**Étant donné** le contenu d'une campagne
**Quand** l'email est construit
**Alors** il contient l'identité de l'exploitation, une adresse de réponse, l'objet et le message de la publication, le lien vers l'offre publique et un lien individuel de gestion du consentement
**Et** il ne contient aucune donnée métier ou personnelle non nécessaire.

**Étant donné** l'état d'un consentement ou d'une campagne
**Quand** un client commande ou utilise son lien de suivi
**Alors** aucune inscription, case marketing ou réussite de campagne n'est requise pour poursuivre
**Et** le domaine campagne ne peut ni bloquer ni modifier la commande ou son suivi.

**Étant donné** une campagne prête à être distribuée
**Quand** ses destinataires sont matérialisés
**Alors** chaque adresse normalisée apparaît au plus une fois et chaque livraison conserve campagne, publication, destinataire, consentement source, statut et nombre de tentatives
**Et** les adresses retirées, dupliquées ou déjà marquées en échec définitif sont exclues et comptabilisées par catégorie.

**Étant donné** un consentement retiré après la préparation mais avant l'envoi
**Quand** le worker traite le destinataire
**Alors** il revalide l'opt-in courant et n'envoie aucun email
**Et** la livraison est enregistrée comme exclue sans pouvoir être relancée par cette campagne.

**Étant donné** une campagne créée
**Quand** son traitement asynchrone est planifié
**Alors** un job persistant PostgreSQL est réclamé atomiquement avec un verrou temporaire par l'unique worker configuré dans l'environnement
**Et** une perte ou expiration de verrou permet la reprise sans doubler les effets.

**Étant donné** une livraison éligible
**Quand** le worker appelle Resend via le port fournisseur
**Alors** il utilise une clé d'idempotence stable propre à la campagne et au destinataire
**Et** une reprise retourne ou retrouve le résultat initial sans renvoyer aux destinataires déjà traités.

**Étant donné** un échec temporaire Resend
**Quand** une tentative échoue
**Alors** la livraison est retentée au plus deux fois après la tentative initiale, avec chaque tentative horodatée et journalisée
**Et** après la dernière reprise elle reste en échec consultable sans bloquer les autres destinataires.

**Étant donné** un échec définitif signalé par Resend
**Quand** le résultat est reçu
**Alors** aucune reprise n'est planifiée et l'adresse est placée en suppression pour les campagnes suivantes
**Et** l'événement conserve le motif fournisseur utile sans exposer de secret ou contenu personnel dans les logs.

**Étant donné** une campagne sans destinataire éligible
**Quand** l'offre est publiée
**Alors** la publication réussit sans envoi et l'interface indique explicitement « Offre publiée, aucun destinataire consentant »
**Et** aucun job inutile n'est créé.

**Étant donné** une campagne partiellement terminée
**Quand** l'administrateur consulte son résultat
**Alors** il voit les nombres `En attente`, `Envoyé`, `Exclu`, `Échec temporaire` et `Échec définitif`, avec le détail autorisé
**Et** l'action de reprise cible uniquement les échecs temporaires encore admissibles.

**Étant donné** une campagne terminée ou en échec
**Quand** l'occurrence opérationnelle ou une autre fonction de l'application est utilisée
**Alors** aucune indisponibilité de Resend ou du worker ne bloque consultation de l'offre, commandes futures, préparation ou clôture
**Et** l'API permet de diagnostiquer et reprendre le traitement indépendamment de la publication.

**Étant donné** l'écran de résultat sur mobile ou avec une technologie d'assistance
**Quand** les statuts évoluent
**Alors** les compteurs textuels, annonces polies, états de chargement et erreurs rendent la progression compréhensible sans couleur seule
**Et** aucune actualisation automatique ne déplace le focus ou change le contexte sans annonce.

**Étant donné** une campagne et ses livraisons
**Quand** leur persistance et leur audit sont inspectés
**Alors** les enregistrements conservent contenu, snapshot source, destinataire, statuts, tentatives et résultats sans permettre de réécrire les événements passés
**Et** création de campagne, envoi, exclusion, reprise et échec significatif sont auditables.

**Étant donné** l'environnement de production
**Quand** Resend est activé
**Alors** ses clés restent dans l'environnement, son domaine expéditeur et son adresse de réponse sont vérifiés, et son contrat de sous-traitance, sa localisation et ses transferts ont été validés
**Et** les tests automatisés utilisent un adaptateur contrôlé sans effectuer d'envoi réel.

**Étant donné** les décisions email V1
**Quand** les types d'emails autorisés sont vérifiés
**Alors** seuls les publications consenties et l'email exceptionnel de réinitialisation de mot de passe peuvent utiliser le port Resend
**Et** tout autre email transactionnel, rappel ou notification de statut est refusé par configuration et par test.

## Epic 3 : Planifier les récupérations et distributions

Permettre au maraîcher de configurer lieux fixes, marchés et tournées, puis de gérer leurs occurrences datées réellement proposées aux clients.

### Story 3.1 : Gérer les modes et lieux de récupération

En tant que maraîcher administrateur,
je veux créer et maintenir mes modes de récupération,
afin de disposer de lieux fixes, marchés et tournées clairement identifiés avant de les planifier.

**Exigences couvertes :** FR-042, FR-043; NFR-006, NFR-010, NFR-011; UX-DR18, UX-DR23, UX-DR43, UX-DR64, UX-DR65; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** qu'aucun mode de récupération n'existe
**Quand** cette story est appliquée
**Alors** elle crée uniquement l'agrégat, la persistance, l'API et les écrans nécessaires aux modes de récupération
**Et** elle ne crée encore aucune occurrence, récurrence, commande ou étape de tournée.

**Étant donné** le formulaire de création
**Quand** l'administrateur renseigne un nom, un type et un état
**Alors** le type provient exactement de `Lieu fixe`, `Marché` ou `Tournée` et le mode reçoit un identifiant opaque et une version initiale
**Et** un lieu fixe permet aussi de renseigner une adresse et des instructions de retrait facultatives.

**Étant donné** un mode existant qui n'a encore produit aucune occurrence
**Quand** l'administrateur modifie son nom, son type, son adresse ou ses instructions avec la version attendue
**Alors** les nouvelles valeurs sont enregistrées et auditées avec les valeurs avant/après
**Et** aucune autre entité n'est créée ou modifiée implicitement.

**Étant donné** un mode ayant déjà produit une occurrence
**Quand** l'administrateur tente de changer son type fonctionnel
**Alors** l'API refuse le changement sans altérer les autres champs
**Et** l'interface explique qu'il faut désactiver ce mode et en créer un nouveau pour préserver la cohérence historique.

**Étant donné** un mode actif
**Quand** l'administrateur confirme sa désactivation
**Alors** il est exclu de toute nouvelle planification ou sélection future
**Et** les occurrences ou historiques existants ne sont ni supprimés ni modifiés.

**Étant donné** un mode désactivé
**Quand** l'administrateur le réactive
**Alors** il redevient disponible pour de nouvelles occurrences
**Et** aucune occurrence n'est créée automatiquement par la réactivation.

**Étant donné** un mode existant
**Quand** une suppression physique est tentée
**Alors** aucune opération de suppression n'est exposée par l'interface
**Et** l'API refuse la suppression afin de préserver les futurs rattachements historiques.

**Étant donné** qu'un mode a changé depuis l'ouverture du formulaire
**Quand** une mutation porte une `expectedVersion` obsolète
**Alors** l'écriture est refusée sans écrasement silencieux
**Et** l'écran conserve les saisies, explique le conflit et propose de charger la version courante.

**Étant donné** une réponse réseau incertaine
**Quand** la même mutation est rejouée avec son identifiant d'idempotence
**Alors** le résultat initial est retourné sans créer de doublon ni appliquer deux fois la modification
**Et** une réutilisation de l'identifiant avec un contenu différent est refusée.

**Étant donné** la liste des modes
**Quand** l'administrateur la consulte sur mobile
**Alors** chaque `EntityCard` affiche nom, type et état avec une cible unique ouvrant le détail
**Et** les états actifs et inactifs combinent texte et signal visuel sans dépendre de la couleur.

**Étant donné** les écrans de création et d'édition
**Quand** ils sont utilisés au clavier, avec un lecteur d'écran ou entre `320 px` et `1440 px`
**Alors** labels, erreurs, résumé focusable, focus et actions tactiles respectent le contrat UX
**Et** la désactivation utilise un `ConfirmDialog` expliquant ses conséquences sans masquer le contenu.

**Étant donné** un utilisateur non administrateur ou un compte désactivé
**Quand** il appelle une opération de gestion des modes
**Alors** l'API refuse sans divulguer les données administratives ni effectuer d'écriture
**Et** seuls les administrateurs actifs peuvent créer ou modifier ces modes.

### Story 3.2 : Planifier les occurrences datées

En tant que maraîcher administrateur,
je veux créer et générer des occurrences datées pour mes modes de récupération,
afin de proposer uniquement des créneaux réellement planifiés et encore ouverts.

**Exigences couvertes :** FR-036, FR-044, FR-044a, FR-044b; NFR-006, NFR-010, NFR-011; UX-DR27, UX-DR43, UX-DR64, UX-DR65, UX-DR69; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un mode de récupération actif
**Quand** l'administrateur crée une occurrence ponctuelle
**Alors** il renseigne une date et heure de début, une date et heure de fin et une date et heure limite de commande dans `Europe/Paris`
**Et** la limite est initialement préremplie à `20:00` le jour civil précédent dans `Europe/Paris`, reste modifiable, et l'occurrence reçoit un identifiant opaque, une version et le statut initial `Prévue`.

**Étant donné** les horaires d'une occurrence
**Quand** ils sont validés
**Alors** la fin doit être strictement postérieure au début et la limite de commande strictement antérieure au début
**Et** une valeur inexistante ou ambiguë lors d'un changement d'heure est refusée avec une erreur RFC 9457 précise.

**Étant donné** une occurrence persistée
**Quand** ses instants sont stockés ou exposés par l'API
**Alors** les calculs sont effectués dans `Europe/Paris`, puis les instants sont stockés en UTC et sérialisés en ISO 8601 avec offset
**Et** les tests couvrent les passages aux heures d'été et d'hiver ainsi que l'instant exact de la limite.

**Étant donné** un mode de récupération actif
**Quand** l'administrateur crée une règle récurrente
**Alors** il définit fréquence, jours applicables, horaires locaux, période d'activité et limite préremplie à `20:00` la veille dans `Europe/Paris`
**Et** la règle reçoit un identifiant opaque, une version et un état actif ou inactif sans créer immédiatement d'occurrence.

**Étant donné** une règle récurrente existante
**Quand** l'administrateur modifie sa fréquence, ses jours, ses horaires, sa période ou son état avec la version attendue
**Alors** la nouvelle version s'applique uniquement aux prochains aperçus et générations
**Et** aucune occurrence déjà générée n'est créée, supprimée ou réécrite silencieusement.

**Étant donné** une règle récurrente active
**Quand** l'administrateur demande un aperçu jusqu'à 90 jours à l'avance
**Alors** le système calcule les dates locales et affiche chaque occurrence proposée avant toute écriture
**Et** aucune occurrence située au-delà du quatre-vingt-dixième jour local n'est proposée.

**Étant donné** un aperçu de récurrence confirmé
**Quand** les occurrences sont générées
**Alors** chacune est créée au plus une fois pour la combinaison règle récurrente et date locale
**Et** rejouer la génération avec le même identifiant d'idempotence retourne le résultat initial sans doublon.

**Étant donné** qu'une date calculée correspond déjà à une occurrence indépendante
**Quand** la génération est confirmée
**Alors** l'occurrence existante n'est ni remplacée ni réécrite
**Et** le résultat distingue clairement les occurrences créées, déjà présentes ou en conflit.

**Étant donné** une occurrence future `Prévue`
**Quand** l'administrateur modifie explicitement ses horaires ou sa limite avec la version attendue
**Alors** seule cette occurrence est modifiée et l'action est auditée avec les valeurs avant/après
**Et** le modèle récurrent et les autres occurrences restent inchangés.

**Étant donné** une modification ultérieure du mode, du marché ou de la tournée source
**Quand** des occurrences ont déjà été générées
**Alors** leurs valeurs restent indépendantes et ne sont jamais propagées silencieusement
**Et** toute correction doit être demandée explicitement occurrence par occurrence.

**Étant donné** une occurrence dont le début est passé
**Quand** une modification est tentée
**Alors** tout changement est refusé sauf la transition autorisée vers `Terminée`
**Et** aucune correction d'horaire, de limite ou de mode ne réécrit l'historique.

**Étant donné** une occurrence `Prévue`
**Quand** l'administrateur confirme son annulation
**Alors** elle passe à `Annulée`, reste consultable et n'est plus sélectionnable
**Et** le contrat conserve ses futurs rattachements de commandes afin que l'administration puisse les annuler ou les reporter avant clôture.

**Étant donné** une occurrence `Annulée` ou `Terminée`
**Quand** une réactivation ou suppression est tentée
**Alors** l'opération est refusée et aucune suppression physique n'est exposée
**Et** son statut et son historique restent immuables hors corrections administratives explicitement prévues par une future règle métier.

**Étant donné** la liste des récupérations sélectionnables
**Quand** elle est demandée avant la date limite
**Alors** elle contient uniquement les occurrences `Prévue` rattachées à un mode actif et dont la limite n'est pas atteinte
**Et** à l'instant exact de la limite ou après, l'occurrence est exclue sans tenir compte d'une capacité ou d'un nombre de commandes.

**Étant donné** plusieurs occurrences
**Quand** l'administrateur consulte leur planning
**Alors** chaque `OccurrenceCard` affiche type, date, horaire, limite et statut, puis ouvre l'occurrence datée plutôt que son modèle
**Et** les occurrences annulées et terminées restent consultables mais sont visuellement et sémantiquement non sélectionnables.

**Étant donné** une occurrence modifiée concurremment
**Quand** une mutation porte une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans écrasement, conserve les saisies locales et propose de recharger
**Et** création, modification, génération et annulation produisent des événements d'audit immuables.

**Étant donné** les écrans de planning sur mobile, tablette ou desktop
**Quand** ils sont utilisés au clavier ou avec une technologie d'assistance
**Alors** filtres, dates, statuts, dialogues, focus et cibles tactiles respectent le contrat UX
**Et** aucun tableau desktop n'est compressé comme modèle obligatoire sur mobile.

### Story 3.3 : Gérer les marchés récurrents

En tant que maraîcher administrateur,
je veux configurer mes marchés récurrents et générer leurs dates,
afin de planifier les retraits au marché sans ressaisir chaque semaine.

**Exigences couvertes :** FR-045, FR-046; NFR-006, NFR-010, NFR-011; UX-DR27, UX-DR43, UX-DR64; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un mode de récupération de type `Marché`
**Quand** l'administrateur complète sa configuration
**Alors** il renseigne un nom, un lieu, une adresse, un jour de semaine, une heure de début, une heure de fin, une règle de date limite et un état
**Et** tous les horaires et règles récurrentes sont interprétés dans `Europe/Paris`.

**Étant donné** une configuration de marché
**Quand** elle est validée
**Alors** le jour appartient à la liste contrôlée des jours de semaine, la fin est postérieure au début et la règle de limite produit un instant antérieur au début
**Et** chaque erreur est reliée au champ concerné sans enregistrer de configuration partielle.

**Étant donné** un marché actif et valide
**Quand** l'administrateur demande un aperçu sur une période maximale de 90 jours
**Alors** chaque date locale correspondante présente début, fin et limite calculés avant confirmation
**Et** les changements d'heure sont calculés selon `Europe/Paris` sans dérive de l'heure locale choisie.

**Étant donné** un aperçu confirmé
**Quand** les occurrences du marché sont générées
**Alors** chaque occurrence fige le nom, le lieu, l'adresse, les horaires et la limite applicables à cette date
**Et** elle conserve la référence du marché source tout en devenant indépendante de ses modifications ultérieures.

**Étant donné** des occurrences déjà générées
**Quand** le nom, l'adresse, le jour ou les horaires du marché sont modifiés
**Alors** aucune occurrence existante n'est réécrite
**Et** seules les générations futures utilisent la nouvelle version du modèle.

**Étant donné** une date pour laquelle une occurrence du même marché existe déjà
**Quand** une nouvelle génération couvre cette date
**Alors** l'occurrence existante est signalée et ignorée sans duplication
**Et** une occurrence personnalisée n'est jamais remplacée par la valeur du modèle.

**Étant donné** un marché actif
**Quand** l'administrateur le désactive avec confirmation
**Alors** aucune nouvelle occurrence ne peut être générée depuis ce modèle
**Et** les occurrences déjà créées restent consultables et conservent leur propre statut.

**Étant donné** un marché désactivé
**Quand** il est réactivé
**Alors** il peut de nouveau servir à prévisualiser et générer des occurrences futures
**Et** aucune occurrence manquante n'est créée automatiquement.

**Étant donné** une modification concurrente du marché
**Quand** une mutation utilise une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans propagation ni écrasement
**Et** l'écran conserve les saisies et propose de charger la version courante.

**Étant donné** une création, modification, désactivation, réactivation ou génération
**Quand** l'opération réussit
**Alors** elle est idempotente lorsqu'elle peut être rejouée et produit un événement d'audit immuable
**Et** aucune suppression physique du marché n'est exposée.

**Étant donné** les écrans marché sur mobile
**Quand** l'administrateur consulte le modèle et ses occurrences
**Alors** le modèle récurrent et les `OccurrenceCard` datées sont présentés dans des zones distinctes
**Et** l'interface n'ouvre jamais le modèle lorsqu'une action vise l'exécution d'une date précise.

**Étant donné** les écrans de marché au clavier ou avec un lecteur d'écran
**Quand** les horaires, jours et dialogues sont manipulés
**Alors** labels, états, erreurs, focus et cibles tactiles respectent le contrat UX
**Et** les valeurs de date et d'heure sont annoncées sans ambiguïté.

### Story 3.4 : Gérer les tournées et leurs passages ordonnés

En tant que maraîcher administrateur,
je veux configurer mes tournées et ordonner leurs points de passage,
afin de planifier des livraisons selon l'ordre que je décide manuellement.

**Exigences couvertes :** FR-048, FR-049; NFR-006, NFR-010, NFR-011; UX-DR32, UX-DR43, UX-DR64, UX-DR69, UX-DR72, UX-DR92; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un mode de récupération de type `Tournée`
**Quand** l'administrateur complète sa configuration
**Alors** il renseigne un nom, un jour de semaine, une règle de date limite, un état et au moins un point de passage
**Et** chaque point contient un village ou libellé, une adresse ou indication facultative et un horaire approximatif facultatif.

**Étant donné** plusieurs points de passage
**Quand** la tournée est enregistrée
**Alors** chaque point possède une position unique et l'ordre est conservé exactement comme décidé par l'administrateur
**Et** aucun algorithme d'optimisation, de distance ou de temps ne réordonne automatiquement la tournée.

**Étant donné** un point qui n'est pas le premier
**Quand** l'administrateur active `Monter`
**Alors** il échange sa position avec le point précédent et le nouvel ordre est annoncé
**Et** l'opération équivalente `Descendre` fonctionne pour tout point qui n'est pas le dernier.

**Étant donné** une interface proposant aussi le glisser-déposer
**Quand** celui-ci est indisponible ou inutilisable
**Alors** toutes les opérations de réorganisation restent réalisables avec `Monter` et `Descendre`, au clavier comme au tactile
**Et** la position initiale et le résultat sont annoncés aux technologies d'assistance.

**Étant donné** l'ajout, la modification ou le retrait d'un point
**Quand** la mutation est confirmée
**Alors** l'ordre restant est renuméroté sans doublon ni intervalle incohérent dans une transaction unique
**Et** retirer un point du modèle ne modifie aucune occurrence déjà générée.

**Étant donné** une tournée active et valide
**Quand** l'administrateur prévisualise puis confirme une génération jusqu'à 90 jours
**Alors** chaque occurrence fige le nom, l'ordre, les libellés et horaires approximatifs des passages ainsi que ses propres horaires et limite
**Et** elle conserve la référence du modèle tout en devenant indépendante.

**Étant donné** une tournée ou ses passages modifiés après génération
**Quand** une occurrence existante est consultée
**Alors** elle conserve l'ordre et les valeurs figés lors de sa création
**Et** seules les occurrences générées ultérieurement utilisent la nouvelle configuration.

**Étant donné** une date déjà couverte par une occurrence de la tournée
**Quand** la génération est rejouée
**Alors** aucun doublon n'est créé et l'occurrence existante n'est pas remplacée
**Et** le résultat distingue les dates créées, ignorées ou en conflit.

**Étant donné** une tournée active
**Quand** l'administrateur la désactive
**Alors** elle ne peut plus générer de nouvelles occurrences
**Et** ses occurrences existantes et leur ordre de passage restent consultables.

**Étant donné** une modification concurrente de l'ordre ou du modèle
**Quand** la mutation porte une `expectedVersion` obsolète
**Alors** l'API refuse l'ensemble de l'écriture sans ordre partiellement appliqué
**Et** l'écran recharge la version courante tout en présentant clairement le conflit.

**Étant donné** une mutation rejouée après une réponse réseau incertaine
**Quand** le même identifiant d'idempotence est soumis
**Alors** le résultat initial est retourné sans appliquer un second déplacement ou créer une seconde occurrence
**Et** chaque création, modification, réorganisation, désactivation et génération est auditée.

**Étant donné** qu'aucune commande n'existe encore dans cet epic
**Quand** une occurrence de tournée est créée
**Alors** elle expose un identifiant stable permettant à l'Epic 4 de rattacher les futures commandes de livraison
**Et** aucun faux rattachement ou modèle de commande anticipé n'est créé par cette story.

**Étant donné** l'éditeur de tournée sur mobile
**Quand** les passages sont ajoutés ou réordonnés
**Alors** les contrôles ont des cibles de `44–48 px`, les horaires et positions restent lisibles et l'action principale ne masque aucun point
**Et** tablette et desktop peuvent enrichir la vue sans introduire une interaction obligatoire différente.

**Étant donné** un utilisateur non administrateur ou une tournée inactive
**Quand** une opération non autorisée est demandée
**Alors** l'API refuse sans effectuer d'écriture ni divulguer de données administratives
**Et** l'interface explique l'état et ne propose que les actions encore autorisées.

## Epic 4 : Traiter une commande classique de bout en bout

Permettre au client de commander et suivre sans compte, puis au maraîcher de valider, préparer, livrer, reporter ou annuler jusqu'à la clôture de l'occurrence.

### Story 4.1 : Composer un panier depuis l'offre publiée

En tant que client,
je veux choisir des produits et une récupération depuis l'offre active,
afin de préparer une demande correspondant aux informations réellement publiées.

**Exigences couvertes :** FR-009a, FR-020, FR-031a; NFR-001, NFR-011; UX-DR24, UX-DR27, UX-DR47, UX-DR64, UX-DR73; AD-9, AD-13, AD-14.

**Critères d'acceptation :**

**Étant donné** qu'une publication active existe
**Quand** un visiteur ouvre l'URL publique unique
**Alors** le catalogue affiche uniquement le dernier snapshot actif avec son identifiant et sa version
**Et** consulter ou composer un panier ne nécessite aucun compte.

**Étant donné** un produit actif dans le snapshot
**Quand** il est présenté au client
**Alors** son libellé, sa description, son unité, son prix et son statut proviennent exclusivement du snapshot
**Et** aucune modification actuelle du catalogue ou des disponibilités ne change silencieusement les valeurs affichées.

**Étant donné** un produit `Disponible` ou `Selon disponibilité`
**Quand** le client ajoute une quantité
**Alors** une quantité au `kg` accepte une valeur strictement positive avec jusqu'à trois décimales, tandis que `unité` et `botte` acceptent un entier strictement positif
**Et** l'unité reste visible dans le contrôle et le récapitulatif.

**Étant donné** une quantité estimée visible
**Quand** le client demande une quantité supérieure
**Alors** la demande n'est pas bloquée ni présentée comme réservée
**Et** l'interface rappelle qu'elle reste soumise à validation et pourra être ajustée lors de la préparation.

**Étant donné** un produit `Indisponible`
**Quand** le catalogue est affiché
**Alors** son statut reste compréhensible mais aucune quantité ne peut être ajoutée
**Et** une quantité précédemment ajoutée est signalée et retirée explicitement après confirmation plutôt que conservée silencieusement.

**Étant donné** le panier courant
**Quand** le client ajoute, modifie ou retire une ligne
**Alors** le montant indicatif est recalculé depuis les prix du snapshot, avec arrondi au centime par ligne puis totalisation
**Et** les lignes conservent produit, libellé, unité, prix unitaire et quantité demandée du snapshot affiché.

**Étant donné** les occurrences fournies par l'Epic 3
**Quand** le client choisit une récupération
**Alors** seules les occurrences `Prévue`, rattachées à un mode actif et strictement avant leur limite sont proposées
**Et** les occurrences `Annulée`, `Terminée` ou arrivées exactement à leur limite sont exclues.

**Étant donné** une occurrence de marché ou de tournée
**Quand** elle est choisie
**Alors** le panier conserve l'identifiant stable de l'occurrence datée, jamais seulement celui du modèle récurrent
**Et** pour une tournée, le passage choisi appartient obligatoirement au snapshot ordonné de cette occurrence.

**Étant donné** qu'aucune occurrence n'est sélectionnable
**Quand** le client consulte son panier
**Alors** la poursuite est bloquée avec une explication indiquant qu'aucune récupération n'est disponible
**Et** l'écran propose un retour au catalogue ou le canal de contact de l'exploitation.

**Étant donné** qu'une nouvelle offre devient active pendant la composition
**Quand** le client tente de poursuivre avec l'ancien snapshot
**Alors** le panier est marqué périmé et aucune future commande ne peut être créée depuis ce snapshot désormais historique
**Et** l'interface propose de revoir la nouvelle offre sans remplacer silencieusement produits, prix ou quantités.

**Étant donné** un rechargement ou une erreur réseau
**Quand** le panier courant est restauré
**Alors** il reste lié à la version du snapshot initial et chaque ligne est vérifiée avant poursuite
**Et** aucune ligne invalide ou occurrence fermée n'est acceptée silencieusement.

**Étant donné** le catalogue et le panier sur mobile
**Quand** ils sont utilisés à partir de `320 px`, au clavier ou avec un lecteur d'écran
**Alors** les `EntityCard`, `NumericInput`, statuts, erreurs et actions tactiles respectent le contrat UX
**Et** l'avertissement sur les quantités estimatives et non réservées est visible avant la poursuite.

### Story 4.2 : Confirmer une commande sans compte

En tant que client,
je veux transmettre mon panier et recevoir immédiatement un lien de suivi,
afin de faire vérifier ma demande sans créer de compte.

**Exigences couvertes :** FR-009, FR-019b, FR-020, FR-021, FR-023, FR-030, FR-031a, FR-033, FR-034, FR-047, FR-050; NFR-003, NFR-005, NFR-006, NFR-011; UX-DR48 à UX-DR50, UX-DR63, UX-DR74, UX-DR90, UX-DR91, UX-DR97; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** les paramètres de commande
**Quand** un administrateur configure les paiements prévus
**Alors** il peut activer ou désactiver `Espèces`, `Carte`, `Chèque` et `Virement`, avec au moins une option active
**Et** aucune option ne déclenche un paiement en ligne, un suivi de règlement ou une écriture comptable.

**Étant donné** un panier courant et une occurrence sélectionnée
**Quand** le client ouvre le checkout
**Alors** une page verticale présente produits, récupération, nom, téléphone, email facultatif, paiement prévu, commentaire facultatif et récapitulatif
**Et** l'inscription aux publications reste facultative, distincte et non précochée.

**Étant donné** les coordonnées du client
**Quand** le formulaire est validé
**Alors** le nom et un téléphone valide sont obligatoires, tandis que l'email reste facultatif
**Et** seuls les champs nécessaires à la commande, la récupération et au contact opérationnel sont collectés.

**Étant donné** un téléphone correspondant à une fiche contact existante
**Quand** la commande est créée
**Alors** elle peut être rattachée à cette fiche sans imposer de compte ni exposer ses données précédentes au client
**Et** les coordonnées fournies sont figées sur la commande indépendamment des corrections ultérieures de la fiche.

**Étant donné** une soumission de checkout
**Quand** l'API la traite
**Alors** elle revalide atomiquement que le snapshot est toujours la publication active, que chaque ligne lui appartient et que l'occurrence est `Prévue` avant sa limite
**Et** une publication remplacée, une occurrence fermée ou une ligne altérée bloque toute création partielle avec une erreur RFC 9457.

**Étant donné** une demande valide
**Quand** la transaction réussit
**Alors** une commande de source `Web` est créée au statut `À valider` et rattachée à l'occurrence datée choisie
**Et** une commande de marché conserve son occurrence de marché, tandis qu'une livraison conserve l'occurrence de tournée et son passage.

**Étant donné** les lignes de la commande
**Quand** elles sont persistées
**Alors** chacune fige produit, libellé, unité, prix unitaire et quantité demandée depuis le snapshot affiché
**Et** la commande conserve explicitement la référence et la version de ce snapshot sans dépendre du catalogue courant.

**Étant donné** les lignes figées
**Quand** le montant indicatif est calculé
**Alors** chaque quantité demandée est multipliée par son prix unitaire, arrondie au centime par ligne, puis les lignes sont totalisées
**Et** le montant est présenté comme indicatif et susceptible de varier selon les quantités préparées.

**Étant donné** une commande créée
**Quand** la transaction est validée
**Alors** un jeton de suivi opaque et individuel est généré, seul son condensat est stocké et son périmètre est limité à cette commande
**Et** le lien complet est affiché immédiatement avec le message explicite `Aucun email transactionnel ne sera envoyé`, sans envoi par email ou SMS.

**Étant donné** le lien nouvellement créé
**Quand** le client l'ouvre
**Alors** il peut déjà consulter en lecture seule le statut `À valider`, les coordonnées utiles, l'occurrence, les quantités demandées et le montant indicatif
**Et** aucune autre commande ou donnée de la fiche contact n'est accessible.

**Étant donné** la durée de vie du lien
**Quand** la commande n'a jamais été livrée ni annulée
**Alors** il expire 90 jours après sa création
**Et** un futur passage vers `Livrée` ou `Annulée` remplace cette règle par une expiration exactement 30 jours après l'événement, même si cette nouvelle échéance est postérieure au quatre-vingt-dixième jour après création.

**Étant donné** une réponse réseau incertaine après soumission
**Quand** le checkout est rejoué avec le même identifiant d'idempotence
**Alors** l'API retourne la commande et le résultat initial sans créer de doublon
**Et** le client peut retrouver la confirmation et son lien tant que la réponse idempotente est conservée.

**Étant donné** une commande créée
**Quand** les disponibilités courantes sont inspectées
**Alors** aucune quantité n'est réservée, déduite ou modifiée automatiquement
**Et** un événement d'audit conserve la source, l'occurrence, le snapshot et les valeurs créées.

**Étant donné** le checkout à `320 px`, au clavier ou avec un lecteur d'écran
**Quand** une erreur ou un succès survient
**Alors** labels, champs obligatoires, résumé focusable, conservation des saisies, focus et annonces de statut respectent le contrat UX
**Et** la confirmation met le lien de suivi en évidence sans promettre d'email transactionnel.

### Story 4.3 : Consulter, modifier ou annuler sa commande

En tant que client,
je veux gérer ma commande depuis mon lien sécurisé dans les limites autorisées,
afin de corriger ma demande avant sa préparation et suivre son état ensuite.

**Exigences couvertes :** FR-025, FR-032a, FR-035, FR-035a, FR-037, FR-041a; NFR-005, NFR-006, NFR-010, NFR-011; UX-DR23, UX-DR51, UX-DR64 à UX-DR67, UX-DR74, UX-DR75, UX-DR95, UX-DR96; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un lien actif, non expiré et non révoqué
**Quand** le client l'ouvre
**Alors** l'API limite la réponse à la commande associée au jeton et aux actions autorisées à cet instant
**Et** le jeton n'est jamais renvoyé dans le corps, affiché dans l'historique ou écrit dans les logs.

**Étant donné** un lien invalide, expiré, révoqué ou remplacé
**Quand** il est ouvert
**Alors** aucune donnée de commande, de contact ou d'occurrence n'est divulguée
**Et** l'écran indique uniquement que le lien n'est plus utilisable et fournit le canal de contact de l'exploitation.

**Étant donné** un lien de suivi actif
**Quand** la commande est consultée
**Alors** l'écran affiche sa date d'expiration courante et l'événement qui la détermine
**Et** cette validité correspond à 90 jours après création tant que la commande n'est jamais livrée ou annulée, puis à 30 jours après livraison ou annulation.

**Étant donné** une commande `À valider` strictement avant sa limite
**Quand** le client ouvre son suivi
**Alors** il peut modifier ses quantités, sa récupération parmi les occurrences encore sélectionnables, son paiement prévu, son commentaire et ses coordonnées autorisées, ou annuler la commande
**Et** les valeurs proposées restent fondées sur le snapshot commercial figé de cette commande.

**Étant donné** une commande `À préparer` strictement avant sa limite et sans `preparationStartedAt`
**Quand** le client soumet une modification
**Alors** la commande revient atomiquement à `À valider` et son montant indicatif est recalculé depuis son snapshot
**Et** un diff avant/après devient consultable par l'administration avant toute nouvelle acceptation.

**Étant donné** une commande dont `preparationStartedAt` est renseigné
**Quand** le client ouvre son lien avant ou après la limite
**Alors** les actions de modification et d'annulation sont absentes et l'écran est en lecture seule
**Et** il explique que la préparation a commencé et indique le canal de contact autorisé.

**Étant donné** que l'instant courant atteint exactement la date limite ou la dépasse
**Quand** le client tente une mutation
**Alors** l'API la refuse même si le formulaire avait été ouvert auparavant
**Et** le suivi reste consultable avec la date limite et une explication explicite.

**Étant donné** une modification de lignes
**Quand** la demande est validée
**Alors** seules les lignes et prix présents dans le snapshot de la commande peuvent être utilisés, chaque quantité respecte son unité et le montant est arrondi par ligne puis totalisé
**Et** une nouvelle publication ne remplace jamais silencieusement ce snapshot.

**Étant donné** un changement de récupération
**Quand** le client soumet une nouvelle occurrence
**Alors** elle doit être `Prévue`, avant sa limite et compatible avec le type de récupération demandé
**Et** un marché conserve son occurrence datée, tandis qu'une tournée conserve aussi le passage choisi dans son ordre figé.

**Étant donné** une commande `À valider` ou `À préparer` avant sa limite et sans `preparationStartedAt`
**Quand** elle est confirmée dans un `ConfirmDialog`
**Alors** la commande passe à `Annulée`, son historique de statut est conservé et son lien reste lisible jusqu'à son expiration
**Et** l'expiration est fixée à 30 jours après l'annulation sans modifier les disponibilités.

**Étant donné** une commande ayant atteint sa limite ou dont `preparationStartedAt` est renseigné
**Quand** le client tente de l'annuler
**Alors** l'API refuse l'opération et conserve le statut courant
**Et** le suivi explique la raison et indique le canal de contact autorisé.

**Étant donné** une commande `À valider` ou `À préparer`
**Quand** le suivi est affiché
**Alors** il montre les quantités demandées et le montant indicatif, jamais les ajustements de préparation en cours
**Et** une commande `Préparée` ou `Livrée` montre les quantités réelles et le montant final lorsqu'ils existent.

**Étant donné** une commande `Annulée`
**Quand** son suivi est consulté
**Alors** il affiche le statut d'annulation et le dernier montant applicable
**Et** aucune action métier supplémentaire n'est proposée au client.

**Étant donné** une commande modifiée depuis l'ouverture du suivi
**Quand** le client soumet une `expectedVersion` obsolète
**Alors** l'API refuse l'écriture sans écrasement et présente la nouvelle version
**Et** les choix non soumis sont conservés autant que possible sans réappliquer automatiquement la mutation.

**Étant donné** une réponse réseau incertaine
**Quand** une modification ou annulation est rejouée avec le même identifiant d'idempotence
**Alors** l'API retourne le résultat initial sans second changement de statut ni second événement
**Et** l'interface vérifie l'état serveur avant toute nouvelle tentative.

**Étant donné** une modification ou annulation réussie
**Quand** la transaction est validée
**Alors** l'événement d'audit conserve l'acteur représenté par le jeton client, l'horodatage, les valeurs avant/après et l'action
**Et** aucun email transactionnel n'est envoyé.

**Étant donné** le suivi sur mobile, au clavier ou avec un lecteur d'écran
**Quand** l'état ou les actions changent
**Alors** statut, montant, limite, erreurs et confirmations sont annoncés sans dépendre de la couleur
**Et** le focus, les formulaires et les dialogues respectent le contrat UX sans exposer de donnée d'une autre commande.

### Story 4.4 : Créer une commande depuis l'administration

En tant que maraîcher administrateur,
je veux saisir une commande reçue hors du web,
afin de l'intégrer au même cycle de traitement qu'une commande client.

**Exigences couvertes :** FR-021, FR-022, FR-023, FR-030, FR-034; NFR-003, NFR-005, NFR-006; UX-DR23, UX-DR65, UX-DR96; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18.

**Critères d'acceptation :**

**Étant donné** un administrateur authentifié
**Quand** il crée une commande depuis l'administration
**Alors** il sélectionne un contact existant ou saisit un nom et un téléphone, choisit des lignes depuis une publication active, une occurrence et un paiement prévu
**Et** la commande est créée avec la source `Administration`, le statut `À valider`, ses valeurs commerciales figées et son montant indicatif.

**Étant donné** une occurrence `Prévue` dont la limite client est dépassée
**Quand** l'administrateur y rattache explicitement une nouvelle commande
**Alors** la création reste possible avec un motif obligatoire
**Et** une occurrence `Annulée` ou `Terminée` reste interdite.

**Étant donné** une commande créée depuis l'administration
**Quand** la transaction réussit
**Alors** elle reçoit le même lien sécurisé, les mêmes règles d'expiration et le même workflow qu'une commande web
**Et** le lien est affiché à l'administrateur pour transmission hors application sans email automatique.

**Étant donné** une création rejouée
**Quand** le même identifiant d'idempotence est utilisé
**Alors** le résultat initial est retourné sans seconde commande
**Et** un contenu différent avec la même clé est refusé.

**Étant donné** une création administrative réussie
**Quand** son audit est enregistré
**Alors** il conserve acteur, horodatage, objet, source, valeurs créées et motif obligatoire après limite
**Et** aucun email transactionnel n'est envoyé.

### Story 4.5 : Consulter les commandes et les contacts classiques

En tant que maraîcher administrateur,
je veux retrouver les commandes et leurs contacts opérationnels,
afin de répondre aux demandes et préparer les corrections nécessaires.

**Exigences couvertes :** FR-041; NFR-003, NFR-011; UX-DR18, UX-DR22, UX-DR26, UX-DR37, UX-DR95; AD-9, AD-13, AD-15.

**Critères d'acceptation :**

**Étant donné** une liste de commandes
**Quand** l'administrateur la consulte
**Alors** il peut filtrer par statut, source, occurrence, période ou contact avec une pagination par curseur opaque
**Et** chaque résultat affiche uniquement les coordonnées nécessaires à l'action opérationnelle.

**Étant donné** un contact classique
**Quand** l'administrateur ouvre sa fiche
**Alors** il voit ses coordonnées opérationnelles et l'historique paginé des commandes associées, quelle que soit leur source
**Et** cette fiche ne crée pas de compte ni d'accès authentifié pour le client.

**Étant donné** une correction des coordonnées de la fiche contact
**Quand** elle est enregistrée
**Alors** les futures utilisations emploient les nouvelles valeurs
**Et** les coordonnées figées sur les commandes historiques ne sont jamais réécrites.

**Étant donné** un adhérent, un utilisateur anonyme ou un compte désactivé
**Quand** il tente d'accéder aux commandes ou contacts classiques
**Alors** l'API refuse sans confirmer leur existence ni divulguer de donnée personnelle
**Et** l'interface ne présente aucune destination correspondante.

**Étant donné** les listes sur mobile
**Quand** l'administrateur filtre ou consulte
**Alors** les résultats utilisent des `EntityCard` et les filtres avancés un `FilterSheet`
**Et** états, données masquées, focus et pagination respectent le contrat UX.

### Story 4.6 : Corriger une commande administrativement

En tant que maraîcher administrateur,
je veux corriger une commande existante selon son état,
afin de résoudre une erreur sans réécrire son historique ni contourner le workflow.

**Exigences couvertes :** FR-034, FR-041a, FR-081; NFR-005, NFR-006, NFR-010, NFR-011; UX-DR17, UX-DR23, UX-DR64, UX-DR65, UX-DR95, UX-DR96; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18.

**Critères d'acceptation :**

**Étant donné** une commande `À valider` ou `À préparer`
**Quand** l'administrateur corrige ses lignes, son occurrence, ses coordonnées ou son paiement prévu
**Alors** la correction utilise les valeurs autorisées par le snapshot de la commande et recalcule le montant indicatif
**Et** toute modification après la limite exige un motif et conserve les valeurs avant/après.

**Étant donné** que l'instant courant atteint ou dépasse la limite de l'occurrence
**Quand** l'administration modifie une ligne, un montant, une occurrence ou un statut, y compris `Accepter`, `Terminer la préparation`, `Livrer`, `Annuler` ou `Reporter`
**Alors** un motif non vide est exigé avant l'écriture quelle que soit la transition métier autorisée
**Et** l'événement d'audit conserve ce motif avec l'acteur, l'horodatage et les valeurs avant/après.

**Étant donné** une commande `Préparée` non encore livrée
**Quand** l'administrateur corrige une quantité réelle, le montant final ou la remarque avec un motif
**Alors** une écriture corrective conserve l'ancienne et la nouvelle valeur sans changer le statut
**Et** le suivi client présente la valeur corrigée et son historique autorisé.

**Étant donné** une commande `Livrée`
**Quand** une correction exceptionnelle de quantité réelle ou montant final est nécessaire
**Alors** elle exige un motif et ajoute une contre-écriture liée à la valeur initiale sans rouvrir ni annuler la livraison
**Et** une commande AMAP délègue toute correction de consommation aux règles dédiées de l'Epic 5.

**Étant donné** une commande `Annulée`
**Quand** une correction administrative est demandée
**Alors** seules une note append-only ou une rectification de donnée personnelle autorisée sont possibles avec motif
**Et** lignes, montant, occurrence et statut restent immuables et la commande ne peut pas être réactivée.

**Étant donné** un lien client compromis ou perdu
**Quand** l'administrateur en génère un nouveau avec confirmation
**Alors** l'ancien jeton est immédiatement révoqué et un nouveau jeton opaque limité à la même commande est créé
**Et** seul le nouveau lien permet ensuite d'accéder à la commande.

**Étant donné** une commande modifiée depuis son ouverture
**Quand** l'administrateur soumet une `expectedVersion` obsolète
**Alors** l'API refuse toute correction sans écrasement silencieux
**Et** l'écran affiche le conflit, recharge la commande et conserve autant que possible les choix non soumis.

**Étant donné** une correction ou régénération de lien rejouée
**Quand** le même identifiant d'idempotence est utilisé
**Alors** le résultat initial est retourné sans seconde correction ou second jeton actif
**Et** un contenu différent avec la même clé est refusé.

**Étant donné** une action administrative significative
**Quand** elle réussit
**Alors** l'audit conserve acteur, horodatage, objet, action, avant/après et motif obligatoire
**Et** aucun email transactionnel de commande ou de changement de statut n'est envoyé.

**Étant donné** le formulaire de correction sur mobile
**Quand** l'administrateur corrige ou régénère un lien
**Alors** les actions critiques utilisent une `StickyActionBar`
**Et** labels, erreurs, données masquées, focus et dialogues respectent le contrat UX.

### Story 4.7 : Piloter les commandes du jour

En tant que maraîcher administrateur,
je veux voir immédiatement les commandes et activités prioritaires,
afin de savoir quoi traiter aujourd'hui et demain.

**Exigences couvertes :** FR-051, FR-052, FR-053; NFR-001, NFR-002, NFR-011; UX-DR19 à UX-DR21, UX-DR27, UX-DR33 à UX-DR36, UX-DR55, UX-DR56, UX-DR73; AD-9, AD-13, AD-14, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** l'instant courant
**Quand** l'écran `Aujourd'hui` est calculé
**Alors** `aujourd'hui` désigne le jour civil courant et `demain` le jour civil suivant dans `Europe/Paris`
**Et** une occurrence `imminente` commence dans les 48 heures suivant cet instant.

**Étant donné** des commandes actives
**Quand** l'administrateur ouvre l'écran
**Alors** il voit en premier le nombre de commandes `À valider`, puis les commandes `À préparer` et `Préparée` liées aux activités proches
**Et** les commandes `Annulée` ne sont jamais comptées comme travail restant.

**Étant donné** plusieurs occurrences aujourd'hui ou demain
**Quand** elles sont affichées
**Alors** elles sont ordonnées par prochain début et chaque `OccurrenceCard` montre type, horaire, statut et progression
**Et** l'occurrence ouvre son exécution datée, jamais le marché ou la tournée récurrente.

**Étant donné** une occurrence contenant des commandes
**Quand** sa progression est calculée
**Alors** elle correspond au nombre de commandes `Livrée` sur le nombre total de commandes non annulées
**Et** elle est affichée sous une forme textuelle telle que `5 / 7 livrées`, jamais uniquement comme une jauge.

**Étant donné** une commande `À valider` depuis plus de 24 heures
**Quand** l'écran est calculé
**Alors** elle est signalée comme ancienne avec sa durée réelle
**Et** le seuil utilise des instants absolus sans être altéré par un changement d'heure locale.

**Étant donné** une disponibilité enregistrée mais non publiée depuis au moins 7 jours civils
**Quand** l'administrateur ouvre `Aujourd'hui`
**Alors** une alerte indique l'ancienneté et le nombre de changements non publiés
**Et** elle mène vers la vue des disponibilités sans laisser croire qu'une publication a eu lieu.

**Étant donné** des commandes créées depuis la dernière consultation enregistrée de l'administrateur
**Quand** il ouvre l'écran
**Alors** leur nombre est signalé comme nouveau et l'accès mène à la liste filtrée correspondante
**Et** consulter cet indicateur met à jour le repère de lecture sans modifier les commandes.

**Étant donné** qu'une file ou période ne contient aucun élément
**Quand** l'écran est rendu
**Alors** un état vide explicite indique la prochaine activité connue ou l'absence de travail
**Et** aucun bloc vide, compteur ambigu ou message générique `Aucune donnée` n'est affiché.

**Étant donné** une occurrence annulée ou un compte devenu invalide
**Quand** les données sont rafraîchies
**Alors** l'élément n'est plus présenté comme actionnable et son état est expliqué
**Et** aucune donnée protégée mise en cache n'est conservée après un refus d'autorisation.

**Étant donné** une réponse réseau lente ou en échec
**Quand** l'écran charge ou se rafraîchit
**Alors** les skeletons préservent sa structure, restent inertes et exposent `aria-busy`
**Et** une erreur conserve les données fiables déjà affichées, indique leur ancienneté et propose une reprise.

**Étant donné** l'administration mobile
**Quand** l'écran est ouvert entre deux tâches
**Alors** la prochaine action et son contexte apparaissent avant toute statistique secondaire
**Et** la navigation basse expose `Aujourd'hui`, `Commandes`, `Préparer`, `Dispos` et `Plus` avec `aria-current="page"`.

**Étant donné** une tablette paysage ou un desktop
**Quand** le même écran est rendu
**Alors** la hiérarchie devient une sidebar avec `Préparation` et `Disponibilités` sans changer le modèle mental
**Et** un master/detail n'est utilisé que s'il évite réellement un aller-retour.

**Étant donné** un utilisateur non administrateur
**Quand** il tente d'accéder aux données quotidiennes
**Alors** l'API refuse l'accès sans divulguer commandes, contacts ou occurrences
**Et** seuls les administrateurs actifs peuvent consulter ces agrégats opérationnels.

### Story 4.8 : Valider les commandes séquentiellement

En tant que maraîcher administrateur,
je veux traiter les nouvelles commandes l'une après l'autre,
afin de les accepter, les ajuster ou les annuler sans revenir constamment à la liste.

**Exigences couvertes :** FR-024, FR-025, FR-054, FR-055; NFR-001, NFR-006, NFR-010, NFR-011; UX-DR17, UX-DR23, UX-DR38, UX-DR64, UX-DR65, UX-DR70, UX-DR71, UX-DR75; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** des commandes au statut `À valider`
**Quand** l'administrateur ouvre la file depuis `Aujourd'hui` ou `Commandes`
**Alors** la première commande est affichée avec sa position `Commande n / total`, son client, son occurrence, ses lignes et son montant indicatif
**Et** le total correspond à un instant de chargement stable sans déplacer automatiquement l'élément courant.

**Étant donné** une commande créée ou modifiée par le client
**Quand** elle est présentée à la validation
**Alors** les valeurs courantes sont comparées à la dernière version précédemment acceptée lorsqu'elle existe
**Et** tout diff de produits, quantités, récupération, coordonnées ou montant indicatif est explicite avant décision.

**Étant donné** une commande nécessitant une correction
**Quand** l'administrateur choisit `Ajuster`
**Alors** il utilise les capacités de correction de la Story 4.6 puis revient sur la même commande mise à jour
**Et** aucune acceptation n'est implicite après l'ajustement.

**Étant donné** une commande `À valider` valide
**Quand** l'administrateur active `Accepter la commande`
**Alors** l'API revalide son état courant et la fait passer atomiquement à `À préparer`
**Et** `preparationStartedAt` reste vide jusqu'au démarrage effectif de la préparation.

**Étant donné** une commande `À valider` qui ne peut pas être servie
**Quand** l'administrateur confirme son annulation
**Alors** elle passe à `Annulée`, conserve son historique et son dernier montant applicable
**Et** le motif est obligatoire si l'annulation intervient après la limite de l'occurrence.

**Étant donné** une acceptation ou annulation en cours
**Quand** l'action est envoyée
**Alors** le déclencheur est désactivé au premier envoi et l'élément reste affiché jusqu'à la réponse versionnée
**Et** la file avance automatiquement uniquement après un succès confirmé.

**Étant donné** une action réussie
**Quand** la commande suivante existe
**Alors** elle devient l'élément courant et sa nouvelle position est annoncée
**Et** si la file est terminée, un récapitulatif indique le nombre accepté, ajusté, annulé ou passé.

**Étant donné** une commande que l'administrateur ne veut pas traiter immédiatement
**Quand** il choisit `Passer`
**Alors** aucune mutation n'est effectuée et la commande suivante est affichée
**Et** la commande passée reste dans la file et peut être retrouvée avec `Précédente` ou lors d'un nouveau parcours.

**Étant donné** qu'une commande est modifiée, annulée ou préparée pendant son affichage
**Quand** l'administrateur soumet sa décision avec une `expectedVersion` obsolète
**Alors** l'API refuse sans transition partielle, recharge le statut courant et explique le conflit
**Et** seules les transitions encore autorisées restent proposées.

**Étant donné** une réponse réseau incertaine
**Quand** la même décision est rejouée avec son identifiant d'idempotence
**Alors** le résultat initial est retourné sans seconde transition
**Et** l'interface vérifie l'état serveur avant d'avancer dans la file.

**Étant donné** une validation ou annulation réussie
**Quand** la transaction est validée
**Alors** l'événement d'audit conserve acteur, ancien et nouveau statut, valeurs ajustées et motif éventuel
**Et** aucun email de confirmation ou changement de statut n'est envoyé au client.

**Étant donné** la file sur mobile, tablette paysage ou au clavier
**Quand** l'administrateur traite plusieurs commandes
**Alors** la `StickyActionBar`, les actions précédente/suivante, la position et les annonces de statut restent accessibles
**Et** le focus reste sur l'élément courant après erreur et se déplace de façon annoncée après succès.

### Story 4.9 : Consulter les volumes à préparer d'une occurrence

En tant que maraîcher administrateur,
je veux connaître les volumes à préparer pour une occurrence,
afin d'organiser la récolte et sélectionner le travail à traiter.

**Exigences couvertes :** FR-055, FR-056; NFR-001, NFR-011; UX-DR20, UX-DR27, UX-DR39, UX-DR73, UX-DR79; AD-9, AD-13, AD-14.

**Critères d'acceptation :**

**Étant donné** une occurrence contenant des commandes non annulées
**Quand** l'administrateur ouvre sa préparation
**Alors** une vue agrégée totalise les quantités demandées par produit et unité pour les commandes `À préparer`
**Et** elle distingue les paniers AMAP des produits commandables en complément, même si la catégorie AMAP est vide avant l'Epic 5.

**Étant donné** la vue agrégée
**Quand** des commandes changent de statut ou de version
**Alors** les volumes sont recalculés depuis l'état serveur sans modifier les commandes
**Et** l'horodatage de fraîcheur, le nombre de commandes et la progression sont visibles.

**Étant donné** la vue des volumes sur téléphone ou tablette paysage
**Quand** l'administrateur sélectionne une occurrence
**Alors** volumes, progression et catégories classiques ou AMAP restent lisibles sans défilement horizontal
**Et** l'occurrence datée, jamais son modèle, ouvre la file correspondante.

### Story 4.10 : Préparer les commandes séquentiellement

En tant que maraîcher administrateur,
je veux saisir les quantités réelles commande par commande,
afin de finaliser exactement ce qui sera remis et son montant.

**Exigences couvertes :** FR-026, FR-027, FR-031, FR-031a, FR-032, FR-032a, FR-041b, FR-055; NFR-001, NFR-006, NFR-010, NFR-011; UX-DR17, UX-DR24, UX-DR40, UX-DR64, UX-DR69 à UX-DR71, UX-DR74; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une commande `À préparer` sans préparation commencée
**Quand** l'administrateur ouvre sa saisie effective
**Alors** `preparationStartedAt` est enregistré une seule fois dans la transaction et le lien client devient immédiatement non modifiable
**Et** la commande reste au statut `À préparer` jusqu'à sa finalisation.

**Étant donné** la file de préparation
**Quand** l'administrateur la parcourt
**Alors** elle affiche `Commande n / total`, précédente, suivante, passage temporaire et sortie explicite
**Et** elle n'avance automatiquement qu'après l'enregistrement réussi de la commande courante.

**Étant donné** une ligne vendue au `kg`
**Quand** la quantité réelle est saisie
**Alors** elle accepte une valeur positive ou nulle avec jusqu'à trois décimales, toujours accompagnée de `kg`
**Et** une ligne à l'`unité` ou à la `botte` accepte uniquement un entier positif ou nul.

**Étant donné** une demande qui ne peut pas être entièrement servie
**Quand** l'administrateur saisit une quantité réelle inférieure ou nulle
**Alors** la ligne demandée reste dans l'historique avec sa quantité initiale et sa quantité réelle
**Et** aucune confirmation client supplémentaire n'est requise avant distribution.

**Étant donné** une ligne avec quantité réelle et prix appliqué
**Quand** son montant final est calculé
**Alors** la quantité réelle est multipliée par le prix unitaire figé et arrondie au centime avant totalisation
**Et** une quantité réelle nulle contribue zéro au total sans supprimer la ligne.

**Étant donné** toutes les lignes préparées
**Quand** le total est calculé
**Alors** la commande conserve séparément montant indicatif, montant final calculé et détail des calculs
**Et** toute évolution ultérieure du catalogue ne modifie aucun de ces montants.

**Étant donné** qu'un ajustement commercial est nécessaire
**Quand** l'administrateur écrase manuellement le montant final
**Alors** un motif obligatoire est saisi et le montant calculé, le montant retenu, l'auteur et l'horodatage sont tous conservés
**Et** le montant manuel prévaut sans effacer le calcul d'origine.

**Étant donné** une préparation en cours
**Quand** les quantités ou montants sont enregistrés sans finaliser
**Alors** ils restent invisibles au client et une remarque interne peut être conservée sans être exposée
**Et** l'interface distingue clairement `Enregistré` de `Préparation terminée`.

**Étant donné** que chaque ligne possède une décision valide
**Quand** l'administrateur active `Terminer la préparation`
**Alors** l'API revalide la version, finalise quantités et montant dans une transaction et passe la commande à `Préparée`
**Et** le lien client affiche dès lors les quantités réelles et le montant final en lecture seule.

**Étant donné** qu'une ligne reste invalide ou indécise
**Quand** la finalisation est demandée
**Alors** aucune transition n'est effectuée et un résumé focusable mène aux éléments bloquants
**Et** les valeurs valides déjà enregistrées sont conservées.

**Étant donné** une modification concurrente ou une répétition réseau
**Quand** une sauvegarde ou finalisation porte une version obsolète ou une clé rejouée
**Alors** aucun écrasement ni double passage à `Préparée` n'a lieu
**Et** l'interface reste sur la commande, recharge son état et ne propose que les transitions autorisées.

**Étant donné** une saisie ou finalisation réussie
**Quand** la transaction est validée
**Alors** ajustements de lignes, quantités réelles, montant calculé, écrasement et transition sont audités
**Et** aucune disponibilité n'est décrémentée et aucun email n'est envoyé.

**Étant donné** la préparation sur téléphone ou tablette paysage
**Quand** les volumes et commandes sont traités
**Alors** `NumericInput`, progression, unités, actions fixes, focus et annonces respectent le contrat UX
**Et** la fin du parcours confirme le nombre préparé et propose directement la prochaine action disponible.

### Story 4.11 : Livrer avec des transitions strictes

En tant que maraîcher administrateur,
je veux marquer une commande préparée comme livrée selon un workflow contrôlé,
afin de refléter fidèlement sa remise au client sans transition incohérente.

**Exigences couvertes :** FR-028, FR-029, FR-055, FR-078a; NFR-001, NFR-006, NFR-010, NFR-011; UX-DR19, UX-DR23, UX-DR64, UX-DR65, UX-DR70, UX-DR71; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une commande classique
**Quand** une transition est demandée
**Alors** le workflow nominal autorisé est `À valider → À préparer → Préparée → Livrée`
**Et** toute transition absente de cette matrice est refusée sans écriture partielle.

**Étant donné** une commande `Préparée` liée à une occurrence non annulée
**Quand** l'administrateur confirme `Marquer comme livrée`
**Alors** l'API revalide la version et la fait passer atomiquement à `Livrée` avec l'horodatage et l'auteur
**Et** les quantités réelles et montants final calculé et retenu restent inchangés.

**Étant donné** une commande qui n'est pas `Préparée`
**Quand** une livraison est demandée
**Alors** l'opération est refusée avec une erreur RFC 9457 décrivant la transition invalide
**Et** l'interface recharge l'état courant et ne présente que les actions encore autorisées.

**Étant donné** une commande non livrée
**Quand** une annulation administrative est demandée
**Alors** elle est autorisée depuis `À valider`, `À préparer` ou `Préparée`, avec confirmation et motif lorsque requis
**Et** une commande `Livrée` ne peut jamais être annulée par le workflow classique.

**Étant donné** une commande `Annulée` ou `Livrée`
**Quand** une modification de ligne, d'occurrence ou de statut nominal est tentée
**Alors** l'API refuse l'opération sauf correction append-only explicitement autorisée par la Story 4.6
**Et** aucune action non disponible n'est rendue dans l'interface.

**Étant donné** une livraison réussie
**Quand** le client consulte son lien
**Alors** il voit le statut `Livrée`, l'occurrence, les quantités réelles et le montant final en lecture seule
**Et** le lien expire 30 jours après l'horodatage de livraison.

**Étant donné** une commande livrée
**Quand** les disponibilités ou le catalogue sont inspectés
**Alors** aucune quantité ni aucun produit courant n'est modifié automatiquement
**Et** l'historique commercial de la commande reste fondé sur ses snapshots.

**Étant donné** une livraison soumise deux fois ou après une réponse réseau incertaine
**Quand** le même identifiant d'idempotence est rejoué
**Alors** le premier résultat est retourné sans second événement de livraison
**Et** une nouvelle requête sur une commande déjà `Livrée` reste sans effet métier.

**Étant donné** une commande modifiée concurremment
**Quand** la livraison porte une `expectedVersion` obsolète
**Alors** aucune transition n'a lieu et l'état courant est présenté
**Et** le focus reste sur la commande avec une explication du conflit.

**Étant donné** une livraison ou annulation réussie
**Quand** la transaction est validée
**Alors** l'historique de statuts et l'audit conservent acteur, ancien état, nouvel état, horodatage et motif éventuel
**Et** aucun email ou notification de statut n'est envoyé.

**Étant donné** la vue opérationnelle sur mobile
**Quand** l'administrateur livre plusieurs commandes
**Alors** l'action dominante reste accessible, se désactive au premier envoi et la progression textuelle de l'occurrence est mise à jour après succès
**Et** statuts, confirmations, focus et annonces respectent le contrat UX.

### Story 4.12 : Traiter les commandes non récupérées

En tant que maraîcher administrateur,
je veux annuler ou reporter une commande préparée non récupérée,
afin de résoudre chaque reliquat sans perdre son historique.

**Exigences couvertes :** FR-038, FR-039, FR-040; NFR-006, NFR-010, NFR-011; UX-DR18, UX-DR23, UX-DR65, UX-DR76; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une commande `Préparée` non marquée `Livrée`
**Quand** l'administrateur la traite comme non récupérée
**Alors** il doit choisir explicitement `Annuler` ou `Reporter`
**Et** aucune commande ne disparaît de la file sans décision persistée.

**Étant donné** le choix `Annuler`
**Quand** l'administrateur confirme avec le motif requis
**Alors** la commande passe à `Annulée`, conserve ses quantités réelles et son dernier montant final
**Et** son lien reste lisible pendant 30 jours après l'annulation sans permettre de nouvelle action client.

**Étant donné** le choix `Reporter`
**Quand** l'administrateur sélectionne une nouvelle récupération
**Alors** seules les occurrences futures `Prévue` et compatibles sont proposées, même si leur limite client est dépassée
**Et** une occurrence `Annulée`, `Terminée` ou passée est refusée côté API.

**Étant donné** une occurrence de tournée choisie pour le report
**Quand** la commande est déplacée
**Alors** un passage appartenant à l'ordre figé de cette occurrence est obligatoire
**Et** un report vers un marché conserve l'identifiant de son occurrence datée.

**Étant donné** un report prêt à être confirmé
**Quand** le récapitulatif est affiché
**Alors** il montre côte à côte récupération initiale, nouvelle récupération, dates, horaires et passage éventuel
**Et** un motif est recueilli avant l'enregistrement.

**Étant donné** un report valide
**Quand** la transaction réussit
**Alors** la commande conserve l'occurrence initiale dans son historique, adopte la nouvelle occurrence et revient à `À préparer` pour vérification
**Et** l'auteur, l'horodatage, le motif et les deux récupérations sont persistés atomiquement.

**Étant donné** une commande reportée précédemment préparée
**Quand** elle revient dans la file de préparation
**Alors** ses quantités réelles et montant précédent restent disponibles comme valeurs de référence internes
**Et** ils ne redeviennent visibles au client qu'après une nouvelle finalisation au statut `Préparée`.

**Étant donné** que la préparation avait déjà commencé
**Quand** la commande est reportée
**Alors** son accès client reste en lecture seule et le report ne réouvre pas les droits de modification
**Et** aucune nouvelle validation client n'est demandée.

**Étant donné** une commande `Livrée`, `Annulée`, `À valider` ou `À préparer`
**Quand** l'action de non-retrait est appelée
**Alors** elle est refusée comme transition invalide
**Et** aucune occurrence ni valeur de préparation n'est modifiée.

**Étant donné** un report ou une annulation soumis concurremment
**Quand** la version attendue est obsolète ou la clé d'idempotence est rejouée
**Alors** une seule décision peut être appliquée et le résultat initial est retourné aux répétitions
**Et** l'interface recharge l'état sans proposer d'action devenue invalide.

**Étant donné** une décision réussie
**Quand** la transaction est validée
**Alors** changement de statut, occurrence, auteur, motif et valeurs avant/après sont audités
**Et** aucune disponibilité n'est mise à jour et aucun email n'est envoyé.

**Étant donné** la file des non-retraits sur mobile
**Quand** l'administrateur traite plusieurs commandes
**Alors** chaque `EntityCard` expose clairement client, ancienne récupération, montant et actions disponibles
**Et** les confirmations, sélecteurs d'occurrence, focus et annonces respectent le contrat UX.

### Story 4.13 : Clôturer une occurrence

En tant que maraîcher administrateur,
je veux clôturer une activité avec un parcours guidé et persistant,
afin de terminer la journée sans laisser de commande ou de changement incohérent.

**Exigences couvertes :** FR-058, FR-059, FR-059a; NFR-001, NFR-006, NFR-007, NFR-010, NFR-011; UX-DR17, UX-DR31, UX-DR44, UX-DR63 à UX-DR65; AD-7, AD-9, AD-12, AD-13, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** une occurrence non clôturée
**Quand** l'administrateur ouvre sa clôture
**Alors** `ClosingSummary` présente quatre étapes : commandes, disponibilités, publication facultative et confirmation
**Et** il indique les décisions déjà persistées et les éléments encore bloquants.

**Étant donné** l'étape `Commandes`
**Quand** les commandes rattachées sont analysées
**Alors** toute commande `À valider`, `À préparer` ou `Préparée` est bloquante tant qu'elle n'est pas livrée, annulée ou reportée vers une autre occurrence
**Et** chaque commande `Préparée` non récupérée ouvre directement le choix `Annuler` ou `Reporter` de la Story 4.12.

**Étant donné** qu'une commande est reportée
**Quand** la décision est confirmée
**Alors** elle cesse d'être bloquante pour l'occurrence source et apparaît `À préparer` dans la nouvelle occurrence
**Et** son historique conserve les deux récupérations, le motif et l'auteur.

**Étant donné** que toutes les commandes sont résolues
**Quand** l'administrateur passe à l'étape `Disponibilités`
**Alors** il peut ne rien changer ou enregistrer explicitement des modifications avec les règles de la Story 2.2
**Et** aucune quantité n'est calculée ou déduite automatiquement à partir des ventes ou livraisons.

**Étant donné** des modifications de disponibilités enregistrées
**Quand** l'étape suivante est ouverte
**Alors** l'administrateur choisit `Enregistrer` ou `Enregistrer et publier`
**Et** la différence entre brouillon enregistré et offre publique reste explicite.

**Étant donné** le choix `Enregistrer et publier`
**Quand** la publication est demandée
**Alors** le snapshot est créé avec les contrôles atomiques de la Story 2.3 avant la clôture finale
**Et** une erreur de version ou de publication bloque la confirmation sans perdre les décisions déjà persistées.

**Étant donné** une publication réussie avec campagne email facultative
**Quand** Resend ou le worker rencontre ensuite un échec total ou partiel
**Alors** le snapshot publié reste actif et la clôture peut continuer
**Et** le résultat de campagne reste consultable et reprenable indépendamment.

**Étant donné** le récapitulatif final
**Quand** il est affiché
**Alors** il présente les commandes livrées, annulées ou reportées, les changements de disponibilités, l'état de publication et les blocages éventuels
**Et** l'action finale est indisponible tant qu'un blocage subsiste.

**Étant donné** une occurrence exécutée sans blocage
**Quand** l'administrateur confirme la clôture
**Alors** le serveur revalide dans une transaction qu'elle n'est pas déjà clôturée, qu'aucune commande bloquante ne reste et qu'aucune modification de disponibilité n'est en erreur
**Et** l'occurrence passe à `Terminée` avec `closedAt`, auteur et version mise à jour.

**Étant donné** une occurrence `Annulée` dont toutes les commandes sont résolues
**Quand** l'administrateur confirme sa clôture administrative
**Alors** elle conserve le statut `Annulée` et reçoit `closedAt`, auteur et version mise à jour
**Et** son historique distingue explicitement annulation et résolution finale.

**Étant donné** une occurrence déjà clôturée
**Quand** une seconde clôture est demandée
**Alors** l'API retourne le résultat existant sans répéter transition, publication ou événements
**Et** aucun changement ultérieur de commande ou disponibilité n'est autorisé par ce parcours.

**Étant donné** qu'une commande ou une disponibilité change après l'ouverture du résumé
**Quand** la confirmation utilise une version devenue obsolète
**Alors** la clôture est refusée sans transition partielle et les nouveaux blocages sont affichés
**Et** les décisions déjà confirmées lors des étapes précédentes restent persistées.

**Étant donné** une clôture réussie
**Quand** l'historique est consulté
**Alors** l'occurrence, ses décisions, statuts de commandes, reports, changements de disponibilité et publication restent accessibles
**Et** l'audit conserve acteur, horodatage, valeurs avant/après et résumé de clôture.

**Étant donné** la clôture sur téléphone ou tablette
**Quand** l'administrateur parcourt ou reprend les étapes
**Alors** `ClosingSummary`, progression, actions fixes, confirmations, erreurs et focus respectent le contrat UX
**Et** quitter puis revenir restaure l'étape et les décisions persistées sans demander de recommencer.

## Epic 5 : Administrer et générer les paniers AMAP

Permettre au maraîcher de gérer adhérents, abonnements, compositions et remplacements, puis de générer et traiter des commandes AMAP cohérentes et idempotentes.

### Story 5.1 : Gérer les adhérents et abonnements AMAP

En tant que maraîcher administrateur,
je veux créer les adhérents et paramétrer leurs abonnements,
afin de disposer d'une base fiable pour générer les prochains paniers.

**Exigences couvertes :** FR-060, FR-060a, FR-061, FR-062; NFR-003, NFR-006, NFR-010, NFR-011; UX-DR18, UX-DR19, UX-DR45, UX-DR64, UX-DR65; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un nouveau membre AMAP
**Quand** l'administrateur renseigne son identité, son email et ses coordonnées nécessaires
**Alors** une fiche adhérent et un compte de rôle `Adherent AMAP` sont créés sans mot de passe par défaut
**Et** le mécanisme de réinitialisation autorisé en Story 1.5 envoie le lien permettant de définir le premier mot de passe.

**Étant donné** un email déjà lié à un compte
**Quand** l'administrateur crée l'adhérent
**Alors** il peut rattacher la fiche au compte compatible existant sans dupliquer l'identité
**Et** aucun compte administrateur ou adhérent déjà lié à une autre personne n'est réaffecté silencieusement.

**Étant donné** une fiche adhérent
**Quand** l'administrateur crée un abonnement
**Alors** il renseigne la date d'inscription, le format `Panier complet` ou `Demi-panier`, le jour et point de retrait par défaut compatibles, un solde initial strictement positif, la prochaine échéance, la date limite de modification et l'état
**Et** l'abonnement reçoit un identifiant opaque et une version initiale.

**Étant donné** un adhérent possédant déjà un abonnement actif
**Quand** un second abonnement actif est demandé
**Alors** l'API refuse la création ou l'activation sans modifier l'abonnement existant
**Et** l'interface propose d'ouvrir celui-ci.

**Étant donné** le solde initial ou corrigé
**Quand** sa valeur est validée
**Alors** elle est exprimée en nombre entier de paniers et doit être strictement positive à l'activation
**Et** une valeur nulle, négative ou fractionnaire est refusée avec une erreur liée au champ.

**Étant donné** le retrait par défaut
**Quand** il est sélectionné
**Alors** il correspond à un mode actif et compatible avec les distributions AMAP
**Et** le jour choisi permet de résoudre une occurrence `Prévue` sans rattacher l'abonnement à une occurrence historique précise.

**Étant donné** la date limite de modification
**Quand** elle est configurée
**Alors** elle appartient à l'abonnement et s'applique aux échéances futures selon `Europe/Paris`
**Et** aucune surcharge hebdomadaire de cette règle n'est disponible en V1.

**Étant donné** un abonnement existant
**Quand** l'administrateur modifie format, retrait par défaut, prochaine échéance ou limite
**Alors** les nouvelles valeurs s'appliquent uniquement aux échéances et commandes non encore figées
**Et** aucune commande AMAP déjà générée ni aucun historique n'est réécrit.

**Étant donné** une résiliation ou suspension permanente de l'abonnement
**Quand** l'administrateur la confirme avec le motif requis
**Alors** aucune nouvelle échéance n'est générée après la date d'effet
**Et** les commandes et consommations historiques restent consultables.

**Étant donné** un adhérent ou visiteur
**Quand** il tente de s'inscrire, résilier ou activer un abonnement en ligne
**Alors** aucune opération publique correspondante n'est exposée en V1
**Et** ces actions restent réservées à un administrateur authentifié.

**Étant donné** un compte adhérent désactivé
**Quand** son abonnement est consulté par l'administration
**Alors** l'abonnement et son historique restent visibles mais l'adhérent ne peut plus ouvrir de session
**Et** réactiver le compte ne modifie pas automatiquement l'état de l'abonnement.

**Étant donné** une modification concurrente ou rejouée
**Quand** la version est obsolète ou l'identifiant d'idempotence répété
**Alors** aucune donnée n'est écrasée ni dupliquée et le résultat initial est retourné aux répétitions valides
**Et** l'interface explique le conflit et recharge la version courante.

**Étant donné** une création, modification, activation ou résiliation
**Quand** la transaction réussit
**Alors** compte, adhérent et abonnement sont persistés de façon cohérente et les événements significatifs sont audités
**Et** aucune donnée de commande, composition ou échéance future n'est créée par anticipation.

**Étant donné** les écrans adhérent et abonnement sur mobile
**Quand** l'administrateur les consulte ou modifie
**Alors** `EntityCard`, `StatusBadge`, formulaires, unités de solde, erreurs et actions fixes respectent le contrat UX
**Et** compte, abonnement permanent et futures exceptions datées sont présentés comme des objets distincts.

### Story 5.2 : Composer les paniers d'une semaine

En tant que maraîcher administrateur,
je veux définir la composition des paniers complets et demi-paniers pour une date donnée,
afin de préparer une semaine AMAP avec des quantités explicites et ordonnées.

**Exigences couvertes :** FR-063, FR-063a; NFR-006, NFR-010, NFR-011; UX-DR24, UX-DR45, UX-DR64, UX-DR69, UX-DR90 à UX-DR93; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19.

**Critères d'acceptation :**

**Étant donné** une semaine ou date de livraison sans composition
**Quand** l'administrateur crée la composition
**Alors** elle reçoit une période locale `Europe/Paris`, un état, une version et une liste ordonnée de lignes
**Et** une seule composition active peut s'appliquer à une même date de livraison.

**Étant donné** l'ajout d'un produit
**Quand** la ligne est configurée
**Alors** la quantité du panier complet est explicite et la présence dans le demi-panier est choisie séparément
**Et** si le produit est présent dans le demi-panier, sa quantité propre est obligatoire et indépendante de celle du panier complet.

**Étant donné** un produit absent du demi-panier
**Quand** la ligne est enregistrée
**Alors** cette absence est stockée comme un choix distinct
**Et** elle n'est jamais représentée ou interprétée comme une quantité réelle égale à zéro.

**Étant donné** une quantité pour un produit au `kg`
**Quand** elle est validée
**Alors** elle accepte une valeur strictement positive avec jusqu'à trois décimales
**Et** une quantité pour `unité` ou `botte` accepte uniquement un entier strictement positif.

**Étant donné** un produit actif mais actuellement `Indisponible`
**Quand** il est ajouté à une composition future
**Alors** l'interface affiche un avertissement explicite sans bloquer automatiquement l'ajout
**Et** aucune disponibilité courante n'est modifiée par la composition.

**Étant donné** un produit inactif
**Quand** l'administrateur tente de l'ajouter à une nouvelle composition
**Alors** l'opération est refusée
**Et** sa présence dans une composition historique reste consultable.

**Étant donné** qu'un produit existe déjà dans la composition
**Quand** une seconde ligne identique est ajoutée
**Alors** elle est refusée par défaut
**Et** une duplication exceptionnellement nécessaire exige une justification métier explicite, auditée et visible dans la composition.

**Étant donné** plusieurs lignes
**Quand** l'administrateur utilise `Monter` ou `Descendre`
**Alors** l'ordre est mis à jour atomiquement avec des positions uniques et continues
**Et** un glisser-déposer éventuel ne remplace jamais ces commandes accessibles.

**Étant donné** une composition incomplète ou invalide
**Quand** l'administrateur tente de l'activer
**Alors** l'activation est refusée avec un résumé focusable des produits et quantités à corriger
**Et** le brouillon et ses valeurs valides restent enregistrés.

**Étant donné** une composition active
**Quand** elle est modifiée avant génération de commandes
**Alors** sa version courante devient la référence des futures générations
**Et** chaque modification est auditée avec les valeurs avant/après.

**Étant donné** qu'une ou plusieurs commandes AMAP ont déjà figé cette composition
**Quand** la composition courante est modifiée
**Alors** aucune commande générée ni aucun snapshot historique n'est réécrit
**Et** l'interface indique combien de commandes utilisent déjà une version antérieure.

**Étant donné** une modification concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucun ordre, produit ou quantité n'est écrasé ou dupliqué
**Et** l'écran explique le conflit et recharge la composition courante.

**Étant donné** l'éditeur hebdomadaire sur mobile ou tablette
**Quand** les lignes sont ajoutées, ordonnées ou comparées
**Alors** produit, unité, quantité complète, présence et quantité demi-panier restent lisibles et accessibles
**Et** les positions, erreurs, sauvegardes et changements d'état sont annoncés conformément au contrat UX.

### Story 5.3 : Configurer les remplacements autorisés

En tant que maraîcher administrateur,
je veux définir les remplacements possibles pour une semaine et chaque format de panier,
afin d'offrir des substitutions maîtrisées sans calcul automatique d'équivalence.

**Exigences couvertes :** FR-065, FR-067a; NFR-006, NFR-010, NFR-011; UX-DR24, UX-DR45, UX-DR64; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une composition AMAP active
**Quand** l'administrateur configure ses remplacements
**Alors** chaque règle associe un produit présent dans la composition à un produit de remplacement autorisé pour la même période
**Et** la règle reçoit une version et reste distincte des disponibilités et du catalogue courants.

**Étant donné** un remplacement pour un panier complet
**Quand** la règle est enregistrée
**Alors** la quantité du produit de remplacement applicable au format complet est obligatoire et explicite
**Et** elle respecte l'unité du produit de remplacement.

**Étant donné** que le produit d'origine est inclus dans le demi-panier
**Quand** le remplacement y est autorisé
**Alors** une quantité indépendante pour le demi-panier est obligatoire
**Et** elle n'est jamais déduite automatiquement de la quantité du panier complet.

**Étant donné** que le produit d'origine est absent du demi-panier
**Quand** l'administrateur tente de définir une quantité de remplacement pour ce format
**Alors** l'opération est refusée
**Et** l'absence reste distincte d'une quantité égale à zéro.

**Étant donné** un produit vendu au `kg`
**Quand** sa quantité de remplacement est validée
**Alors** elle accepte une valeur strictement positive avec jusqu'à trois décimales
**Et** `unité` et `botte` acceptent uniquement un entier strictement positif.

**Étant donné** un produit d'origine et un candidat de remplacement identiques
**Quand** la règle est soumise
**Alors** elle est refusée comme substitution sans effet
**Et** aucune règle dupliquée pour le même couple, la même période et le même format n'est créée.

**Étant donné** un produit déjà utilisé comme remplacement
**Quand** l'administrateur tente de le rendre lui-même substituable dans la même chaîne
**Alors** la règle est refusée afin d'empêcher toute substitution en cascade
**Et** une substitution appliquée ne peut jamais faire l'objet d'une seconde substitution.

**Étant donné** un produit de remplacement inactif
**Quand** il est sélectionné pour une nouvelle règle
**Alors** l'opération est refusée
**Et** s'il devient seulement `Indisponible`, un avertissement est affiché sans réécriture automatique des règles existantes.

**Étant donné** plusieurs remplacements autorisés pour un produit
**Quand** ils sont consultés
**Alors** chaque option affiche libellé, unité et quantités complète et demi-panier applicables
**Et** aucun prix, poids ou valeur d'équivalence n'est calculé ou promis.

**Étant donné** des commandes AMAP déjà générées pour la période
**Quand** une règle de remplacement est ajoutée, modifiée ou retirée
**Alors** leur snapshot de remplacements autorisés reste inchangé
**Et** seules les futures générations utilisent la nouvelle version.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucune règle ou quantité n'est écrasée ou dupliquée
**Et** l'interface explique le conflit et recharge l'état courant.

**Étant donné** une création, modification ou suppression logique de règle
**Quand** la transaction réussit
**Alors** les valeurs avant/après, la période, les produits et quantités sont audités
**Et** aucun produit, disponibilité ou composition historique n'est modifié.

**Étant donné** l'éditeur de remplacements sur mobile ou au clavier
**Quand** les options sont configurées
**Alors** les produits source et cible, formats, unités, erreurs et avertissements restent explicitement associés
**Et** les contrôles, focus, annonces et cibles tactiles respectent le contrat UX.

### Story 5.4 : Gérer les échéances et exceptions datées

En tant que maraîcher administrateur,
je veux préparer chaque échéance AMAP et ses exceptions sans modifier l'abonnement permanent,
afin que la commande générée reflète exactement la semaine concernée.

**Exigences couvertes :** FR-068a, FR-068b, FR-072, FR-073, FR-074, FR-075, FR-075a; NFR-003, NFR-006, NFR-010, NFR-011; UX-DR23, UX-DR30, UX-DR45, UX-DR64, UX-DR65, UX-DR77; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un abonnement actif avec un solde positif
**Quand** sa prochaine échéance est résolue
**Alors** elle référence une date locale, une occurrence `Prévue` compatible, le format, le retrait prévu et la limite issue de l'abonnement
**Et** elle possède son propre identifiant et sa propre version sans être encore une commande.

**Étant donné** qu'aucune occurrence compatible ou aucune composition active n'existe
**Quand** l'échéance est évaluée
**Alors** elle est marquée bloquée avec la cause précise
**Et** une alerte administrative est créée sans générer de commande vide ou invalide.

**Étant donné** une échéance non générée
**Quand** l'administrateur ouvre `AmapExceptionEditor`
**Alors** il peut enregistrer pour cette date uniquement une suspension, une cession, un changement de retrait ou jusqu'à deux substitutions autorisées
**Et** les paramètres permanents de l'abonnement restent inchangés.

**Étant donné** une substitution datée
**Quand** elle est enregistrée
**Alors** elle choisit une règle autorisée pour la période et utilise la quantité correspondant au format de l'abonnement
**Et** une troisième substitution, une option en cascade ou un produit non autorisé est refusé.

**Étant donné** un changement de retrait
**Quand** il est confirmé
**Alors** la nouvelle occurrence est `Prévue`, compatible et strictement avant sa limite pour une action adhérent normale
**Et** l'échéance conserve le retrait par défaut et le retrait exceptionnel comme valeurs distinctes.

**Étant donné** une cession
**Quand** elle est enregistrée
**Alors** le titulaire reste propriétaire de l'abonnement et le bénéficiaire ainsi que ses coordonnées nécessaires sont conservés sur l'exception
**Et** aucun compte ou abonnement n'est créé pour le bénéficiaire.

**Étant donné** une suspension
**Quand** elle est activée sur l'échéance
**Alors** toute cession et substitution active de cette même échéance est explicitement annulée ou neutralisée avec audit
**Et** l'échéance suspendue ne génère pas de commande et ne consomme aucun panier.

**Étant donné** une échéance suspendue
**Quand** la prochaine échéance de l'abonnement est recalculée
**Alors** elle est décalée selon la récurrence sans modifier le solde
**Et** l'ancienne échéance reste historisée avec auteur, dates et motif facultatif.

**Étant donné** une commande AMAP déjà générée pour l'échéance
**Quand** une exception encore autorisée est modifiée
**Alors** la même transaction met à jour la commande correspondante plutôt que de laisser diverger exception et commande
**Et** la composition et les règles snapshotées de cette commande restent les seules références autorisées.

**Étant donné** que la limite est atteinte ou dépassée
**Quand** une modification adhérent serait demandée
**Alors** elle est refusée
**Et** une correction administrative reste possible avec motif obligatoire et audit des valeurs avant/après.

**Étant donné** une exception devenue concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucune exception contradictoire ni seconde mise à jour de commande n'est créée
**Et** l'écran recharge l'échéance et n'affiche que les actions encore autorisées.

**Étant donné** la vue hebdomadaire AMAP
**Quand** l'administrateur consulte les échéances
**Alors** elle distingue paniers standards, suspensions, cessions, retraits exceptionnels, substitutions et blocages
**Et** les exceptions nécessitant une intervention sont prioritaires sans masquer les paniers normaux.

**Étant donné** l'éditeur sur mobile ou au clavier
**Quand** une exception est saisie ou confirmée
**Alors** titulaire, bénéficiaire, retrait, date limite, format et effets de l'action restent visibles
**Et** dialogues, erreurs, focus, cibles tactiles et annonces respectent le contrat UX.

### Story 5.5 : Générer les commandes AMAP automatiquement

En tant que maraîcher administrateur,
je veux que les commandes AMAP soient générées automatiquement avant chaque retrait,
afin qu'elles rejoignent la préparation sans validation manuelle ni doublon.

**Exigences couvertes :** FR-057, FR-064, FR-068, FR-068a, FR-068b, FR-069, FR-070, FR-078a; NFR-006, NFR-010; UX-DR45, UX-DR63; AD-7, AD-9, AD-12, AD-13, AD-16, AD-17, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** l'environnement actif
**Quand** il est `06:00` dans `Europe/Paris`
**Alors** un job persistant PostgreSQL évalue les échéances AMAP dues
**Et** il est réclamé atomiquement par l'unique worker configuré, avec verrou temporaire, journal des tentatives et reprise après perte de verrou.

**Étant donné** un abonnement actif avec un solde positif
**Quand** son échéance se situe à trois jours calendaires ou moins de son occurrence de retrait
**Alors** elle devient éligible à la génération
**Et** le calcul utilise les dates locales `Europe/Paris`, y compris lors des changements d'heure.

**Étant donné** une échéance située à plus de trois jours calendaires
**Quand** le job quotidien s'exécute
**Alors** aucune commande n'est créée
**Et** l'échéance reste disponible pour une exécution ultérieure.

**Étant donné** une échéance suspendue
**Quand** elle est évaluée
**Alors** aucune commande n'est générée et aucun panier n'est consommé
**Et** la prochaine échéance calculée reste celle issue du décalage enregistré.

**Étant donné** l'absence d'occurrence `Prévue` compatible, de composition active ou d'un solde positif
**Quand** la génération est tentée
**Alors** aucune commande partielle n'est créée et une alerte administrative identifie l'abonnement, l'échéance et le prérequis manquant
**Et** résoudre le problème permet une reprise explicite ou lors de la prochaine exécution admissible.

**Étant donné** une échéance valide
**Quand** la commande est générée
**Alors** elle fige l'abonnement, le titulaire, le format, l'occurrence, la limite, la composition ordonnée, les retraits et les remplacements autorisés
**Et** elle applique atomiquement les exceptions datées actives de cette échéance.

**Étant donné** une composition complète ou demi-panier
**Quand** ses lignes sont snapshotées
**Alors** les produits, libellés, unités et quantités du format concerné sont figés et les unités produit deviennent verrouillées
**Et** une absence dans le demi-panier ne produit aucune ligne à quantité zéro.

**Étant donné** une échéance comportant substitutions, cession ou retrait exceptionnel
**Quand** la commande est créée
**Alors** le snapshot distingue valeurs permanentes et exceptions appliquées, avec titulaire et bénéficiaire éventuel
**Et** modifier ensuite l'abonnement, la composition ou les règles ne réécrit pas cette commande.

**Étant donné** la clé composée de l'abonnement et de l'occurrence
**Quand** plusieurs workers, reprises ou exécutions quotidiennes tentent la génération
**Alors** une contrainte atomique garantit au plus une commande non annulée pour cette clé
**Et** toutes les répétitions retrouvent le résultat existant sans doublon.

**Étant donné** qu'une commande de cette clé a été annulée
**Quand** une nouvelle génération est nécessaire
**Alors** elle exige une reprise administrative explicite et motivée plutôt qu'une recréation automatique au prochain job
**Et** l'historique relie la nouvelle tentative à la commande annulée.

**Étant donné** une génération réussie
**Quand** la transaction est validée
**Alors** la commande reçoit la source `AMAP` et le statut initial `À préparer`, sans passer par `À valider`
**Et** elle apparaît immédiatement dans l'occurrence, la vue agrégée et la file de préparation de l'Epic 4.

**Étant donné** une commande AMAP générée
**Quand** le workflow est interrogé
**Alors** son parcours nominal est `À préparer → Préparée → Livrée`, avec annulation possible seulement avant livraison
**Et** toute autre transition est refusée.

**Étant donné** un échec après une réponse incertaine
**Quand** le job est repris
**Alors** la commande existante ou l'absence atomiquement confirmée est retrouvée avant toute nouvelle écriture
**Et** chaque tentative, alerte, succès et reprise est journalisé et auditable.

**Étant donné** une génération ou alerte
**Quand** l'administrateur consulte le planning AMAP
**Alors** le résultat distingue commandes générées, échéances suspendues et échéances bloquées
**Et** aucune notification email ou modification de disponibilité n'est déclenchée.

### Story 5.6 : Livrer et corriger la consommation des paniers

En tant que maraîcher administrateur,
je veux que chaque panier AMAP livré consomme exactement une échéance et puisse être corrigé de façon traçable,
afin de maintenir un solde fiable sans double débit.

**Exigences couvertes :** FR-070, FR-075, FR-076, FR-077, FR-078a, FR-078b; NFR-006, NFR-010, NFR-011; UX-DR19, UX-DR23, UX-DR65; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une commande AMAP `À préparer`
**Quand** elle est préparée avec les capacités de l'Epic 4
**Alors** elle peut passer à `Préparée` avec ses quantités réelles et exceptions figées
**Et** aucune consommation de panier n'est encore créée.

**Étant donné** une commande AMAP `Préparée` et un abonnement au solde positif
**Quand** l'administrateur confirme sa livraison
**Alors** la commande passe atomiquement à `Livrée`, le solde diminue exactement de un et un événement de consommation unique est créé
**Et** cet événement référence la commande, l'abonnement, l'ancienne valeur, la nouvelle valeur, l'auteur et l'horodatage.

**Étant donné** une commande cédée à un bénéficiaire
**Quand** elle est livrée
**Alors** la consommation est imputée à l'abonnement du titulaire initial
**Et** l'événement conserve le titulaire et le bénéficiaire sans créer de solde pour ce dernier.

**Étant donné** plusieurs confirmations ou workers concurrents
**Quand** ils tentent de livrer la même commande
**Alors** une contrainte unique sur la commande permet une seule consommation
**Et** les répétitions idempotentes retournent le résultat initial sans second débit.

**Étant donné** une commande AMAP annulée ou reportée avant livraison
**Quand** son solde est inspecté
**Alors** aucun panier n'est consommé
**Et** un report vers une occurrence future conserve la commande sans créer d'événement de consommation.

**Étant donné** une commande AMAP déjà `Livrée`
**Quand** une annulation, un report ou une seconde livraison nominale est demandé
**Alors** l'opération est refusée
**Et** seule une correction exceptionnelle administrative peut modifier l'effet de consommation.

**Étant donné** une erreur exceptionnelle sur une livraison AMAP
**Quand** un administrateur demande sa correction avec un motif
**Alors** une contre-écriture est créée et liée à l'événement de consommation initial sans modifier celui-ci
**Et** le solde est corrigé atomiquement dans le sens explicite de la contre-écriture.

**Étant donné** une contre-écriture déjà appliquée
**Quand** la même correction est rejouée
**Alors** aucune seconde correction de solde n'est produite
**Et** toute correction supplémentaire exige une nouvelle décision motivée liée à la chaîne d'événements.

**Étant donné** une correction de statut avant livraison
**Quand** elle est autorisée par la matrice AMAP
**Alors** le solde reste inchangé et l'historique conserve la transition
**Et** toute transition autre que `À préparer → Préparée → Livrée` ou annulation avant livraison est refusée.

**Étant donné** une livraison dont le solde ne permet plus la consommation
**Quand** la transaction est revalidée
**Alors** aucune livraison ni consommation partielle n'est enregistrée et une alerte administrative explique le conflit
**Et** l'administrateur doit corriger l'abonnement avant de reprendre.

**Étant donné** une consommation ou contre-écriture
**Quand** l'historique de l'abonnement est consulté
**Alors** il présente commande, occurrence, titulaire, bénéficiaire éventuel, variation et solde résultant
**Et** les événements sont ordonnés et paginés avec un curseur opaque sans réécriture.

**Étant donné** une livraison ou correction réussie
**Quand** la transaction est validée
**Alors** transition, consommation, contre-écriture, motif et valeurs avant/après sont audités
**Et** aucune disponibilité ni campagne email n'est déclenchée.

**Étant donné** les écrans de livraison et d'abonnement sur mobile
**Quand** l'administrateur consulte le solde ou confirme une action
**Alors** `StatusBadge`, progression, conséquences, dialogues et focus respectent le contrat UX
**Et** toute correction destructive reste secondaire, explicitement motivée et distincte du workflow nominal.

## Epic 6 : Gérer son prochain panier AMAP

Permettre à l'adhérent de consulter son prochain panier et son historique, puis d'effectuer avant échéance les changements autorisés sur cette seule livraison.

### Story 6.1 : Consulter son prochain panier et son historique

En tant qu'adhérent AMAP,
je veux voir mon prochain panier, mon solde et mes événements passés,
afin de comprendre ce qui sera préparé et l'état de mon abonnement.

**Exigences couvertes :** FR-071, FR-073, FR-078; NFR-003, NFR-011; UX-DR18, UX-DR19, UX-DR21, UX-DR52, UX-DR54, UX-DR55; AD-9, AD-13, AD-15, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un adhérent authentifié avec un abonnement actif
**Quand** il ouvre son espace AMAP
**Alors** la section `Votre prochain panier` affiche date, format, retrait prévu, date limite et nombre de paniers restants
**Et** elle appartient uniquement à l'adhérent lié à la session.

**Étant donné** une échéance qui n'a pas encore généré de commande
**Quand** le prochain panier est affiché
**Alors** la composition active, le retrait prévu et les exceptions datées sont présentés comme prévisionnels
**Et** l'écran explique qu'ils seront figés lors de la génération sans les présenter comme une commande définitive.

**Étant donné** une commande AMAP déjà générée
**Quand** le prochain panier est affiché
**Alors** composition, format, retrait, limite, remplacements autorisés et exceptions proviennent exclusivement de son snapshot
**Et** une modification ultérieure de l'abonnement ou de la composition ne change pas silencieusement cet affichage.

**Étant donné** une composition complète ou demi-panier
**Quand** ses lignes sont présentées
**Alors** chaque produit affiche son libellé, son unité et la quantité correspondant au format de l'abonnement
**Et** un produit absent du demi-panier n'apparaît pas comme une ligne à quantité zéro.

**Étant donné** une substitution, cession, suspension ou récupération exceptionnelle active
**Quand** le prochain panier est consulté
**Alors** son effet est clairement distingué de l'abonnement permanent
**Et** titulaire, bénéficiaire éventuel, produit remplacé ou nouveau retrait sont affichés uniquement lorsque pertinents.

**Étant donné** l'instant courant strictement avant la limite
**Quand** l'adhérent consulte son panier
**Alors** l'écran indique les actions encore possibles sans les exécuter : substitution, changement de retrait, cession ou suspension
**Et** une action incompatible avec l'état courant est expliquée plutôt que simplement masquée.

**Étant donné** que la limite est atteinte ou dépassée
**Quand** le panier est consulté
**Alors** toutes les actions adhérent passent en lecture seule avec la date limite et une explication
**Et** le contenu du panier, son retrait et le canal de contact restent accessibles.

**Étant donné** une échéance ou commande suspendue, annulée, livrée ou bloquée
**Quand** elle est affichée
**Alors** son statut combine texte et signal visuel et la prochaine action autorisée est expliquée
**Et** aucune transition impossible n'est proposée.

**Étant donné** l'historique AMAP
**Quand** l'adhérent l'ouvre
**Alors** il voit ses paniers générés et livrés, suspensions, cessions, substitutions, changements de retrait et consommations dans un ordre chronologique compréhensible
**Et** la liste est paginée par curseur opaque sans doublon ni omission.

**Étant donné** un événement historique
**Quand** son détail est ouvert
**Alors** il restitue les valeurs snapshotées et les acteurs visibles par l'adhérent sans recalcul depuis les paramètres actuels
**Et** les motifs internes, données d'autres personnes et informations d'audit réservées à l'administration sont omis.

**Étant donné** un adhérent sans abonnement actif ou sans prochaine échéance
**Quand** il ouvre l'espace
**Alors** un `EmptyState` explique la situation et indique de contacter l'exploitation
**Et** aucune inscription ou résiliation en ligne n'est proposée.

**Étant donné** un adhérent qui altère un identifiant
**Quand** il tente d'accéder au panier, à la commande ou à l'historique d'un autre adhérent
**Alors** l'API refuse sans confirmer l'existence de la ressource
**Et** aucune donnée personnelle ou opérationnelle n'est divulguée.

**Étant donné** l'espace AMAP sur mobile, au clavier ou avec un lecteur d'écran
**Quand** le prochain panier et l'historique sont parcourus
**Alors** `EntityCard`, `StatusBadge`, dates, quantités, actions et chargement progressif respectent le contrat UX
**Et** `Votre prochain panier` reste l'information prioritaire avant l'historique.

### Story 6.2 : Choisir jusqu'à deux substitutions

En tant qu'adhérent AMAP,
je veux remplacer jusqu'à deux produits de mon prochain panier par des options autorisées,
afin d'adapter cette livraison sans modifier mon abonnement.

**Exigences couvertes :** FR-066, FR-067, FR-072, FR-073; NFR-006, NFR-010, NFR-011; UX-DR23, UX-DR30, UX-DR53, UX-DR54, UX-DR64, UX-DR66; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une échéance active strictement avant sa limite
**Quand** l'adhérent ouvre les substitutions
**Alors** seuls les produits présents dans son format de panier et disposant d'au moins un remplacement autorisé sont proposés
**Et** les options proviennent de la période courante avant génération ou du snapshot de la commande après génération.

**Étant donné** un produit sélectionné
**Quand** les remplacements possibles sont affichés
**Alors** chaque option présente le produit, son unité et la quantité prédéfinie pour `Panier complet` ou `Demi-panier`
**Et** aucun calcul d'équivalence de prix, de poids ou de valeur n'est affiché ou effectué.

**Étant donné** moins de deux substitutions actives
**Quand** l'adhérent choisit une option autorisée
**Alors** une exception datée conserve produit d'origine, produit de remplacement, quantité applicable, auteur et horodatage
**Et** l'abonnement permanent et la composition de référence ne sont pas modifiés.

**Étant donné** deux substitutions déjà actives
**Quand** une troisième est demandée
**Alors** l'API la refuse et explique la limite globale V1
**Et** l'adhérent peut retirer ou remplacer l'une des deux décisions existantes avant de poursuivre.

**Étant donné** une substitution déjà appliquée à une ligne
**Quand** l'adhérent tente de substituer le produit de remplacement
**Alors** l'action est refusée afin d'empêcher une chaîne de substitutions
**Et** seul le produit d'origine peut retrouver sa composition initiale ou recevoir une autre option directe.

**Étant donné** une option devenue inactive ou non autorisée
**Quand** l'adhérent soumet son choix
**Alors** l'API revalide la règle courante ou snapshotée et refuse sans modifier le panier
**Et** l'écran recharge les options encore disponibles.

**Étant donné** une échéance non encore générée
**Quand** la substitution est confirmée
**Alors** elle est stockée sur l'échéance et sera appliquée atomiquement lors de la génération
**Et** le prochain panier prévisionnel reflète immédiatement le changement.

**Étant donné** une commande AMAP déjà générée
**Quand** la substitution est confirmée ou retirée avant la limite
**Alors** l'exception et la commande correspondante sont mises à jour dans la même transaction depuis leurs snapshots autorisés
**Et** aucune divergence ne subsiste entre l'écran adhérent et la préparation administrative.

**Étant donné** une échéance suspendue
**Quand** une substitution est demandée
**Alors** elle est refusée et les substitutions actives ont déjà été neutralisées par la suspension
**Et** l'écran explique qu'une semaine suspendue ne permet aucune substitution.

**Étant donné** que la limite est atteinte ou dépassée
**Quand** une création, modification ou suppression est soumise
**Alors** l'API refuse l'action même si l'écran avait été ouvert auparavant
**Et** le panier reste consultable en lecture seule, l'administration conservant sa correction motivée.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucune troisième substitution, duplication ou divergence de commande n'est créée
**Et** le résultat courant est rechargé avec les actions encore autorisées.

**Étant donné** une substitution réussie
**Quand** le prochain panier et l'historique sont consultés
**Alors** produit d'origine, remplacement et quantité sont clairement visibles sans ambiguïté sur ce qui sera préparé
**Et** un événement d'audit conserve les valeurs avant/après sans exposer d'information d'un autre adhérent.

**Étant donné** l'éditeur sur mobile, au clavier ou avec un lecteur d'écran
**Quand** l'adhérent choisit ou retire une substitution
**Alors** limites, options, unités, confirmations, focus et annonces respectent le contrat UX
**Et** la modification réussie est reflétée immédiatement dans `Votre prochain panier`.

### Story 6.3 : Changer exceptionnellement de retrait

En tant qu'adhérent AMAP,
je veux choisir une autre récupération pour mon prochain panier,
afin d'adapter cette livraison sans modifier mon retrait habituel.

**Exigences couvertes :** FR-072, FR-073; NFR-006, NFR-010, NFR-011; UX-DR27, UX-DR30, UX-DR53, UX-DR54, UX-DR64, UX-DR66; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une échéance active strictement avant sa limite
**Quand** l'adhérent ouvre le changement de retrait
**Alors** seules les occurrences futures `Prévue`, actives, compatibles AMAP et avant leur propre limite sont proposées
**Et** le retrait permanent de l'abonnement reste affiché comme référence.

**Étant donné** une occurrence de marché
**Quand** elle est choisie
**Alors** l'exception conserve l'identifiant de l'occurrence datée et ses horaires figés
**Et** elle ne conserve pas seulement le modèle récurrent du marché.

**Étant donné** une occurrence de tournée
**Quand** elle est choisie
**Alors** un passage appartenant à l'ordre figé de cette occurrence est obligatoire
**Et** le libellé, l'horaire approximatif et la position du passage sont présentés avant confirmation.

**Étant donné** un nouveau retrait valide
**Quand** l'adhérent confirme
**Alors** une exception datée conserve retrait par défaut, retrait exceptionnel, auteur et horodatage
**Et** le jour et point de retrait permanents de l'abonnement ne sont pas modifiés.

**Étant donné** une échéance non encore générée
**Quand** le changement est enregistré
**Alors** il sera appliqué à la commande lors de sa génération
**Et** le prochain panier prévisionnel affiche immédiatement le retrait exceptionnel.

**Étant donné** une commande AMAP déjà générée
**Quand** le retrait change avant la limite
**Alors** l'exception et la commande sont mises à jour atomiquement vers la nouvelle occurrence
**Et** l'ancienne récupération reste conservée dans l'historique.

**Étant donné** une échéance suspendue
**Quand** un changement de retrait est demandé
**Alors** l'action est refusée
**Et** l'écran explique qu'une semaine suspendue ne permet aucun retrait exceptionnel.

**Étant donné** une occurrence devenue annulée, terminée ou arrivée à sa limite
**Quand** l'adhérent confirme un formulaire ouvert auparavant
**Alors** l'API refuse sans déplacer l'échéance ou la commande
**Et** l'interface recharge les occurrences encore compatibles.

**Étant donné** que la limite de l'échéance est atteinte ou dépassée
**Quand** une création, modification ou suppression du retrait exceptionnel est soumise
**Alors** l'action adhérent est refusée
**Et** l'administration conserve la possibilité d'une correction motivée et auditée.

**Étant donné** un retrait exceptionnel existant
**Quand** l'adhérent revient au retrait par défaut avant la limite
**Alors** l'exception est neutralisée et la commande générée éventuelle revient au retrait snapshoté de l'abonnement
**Et** les deux changements restent visibles dans l'historique.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucune double exception ni divergence de commande n'est créée
**Et** le résultat courant est rechargé avec une explication claire.

**Étant donné** un changement réussi
**Quand** le prochain panier est affiché
**Alors** le nouveau retrait, sa date, ses horaires et son caractère exceptionnel sont immédiatement visibles
**Et** l'audit conserve valeurs avant/après sans exposer d'autres adhérents.

**Étant donné** le sélecteur sur mobile, au clavier ou avec un lecteur d'écran
**Quand** les occurrences sont parcourues et confirmées
**Alors** `OccurrenceCard`, statuts, horaires, focus, erreurs et annonces respectent le contrat UX
**Et** aucune occurrence indisponible n'est présentée comme sélectionnable.

### Story 6.4 : Suspendre une échéance

En tant qu'adhérent AMAP,
je veux suspendre mon prochain panier avant la limite,
afin de décaler cette livraison sans consommer mon solde.

**Exigences couvertes :** FR-072, FR-073, FR-074, FR-075a; NFR-006, NFR-010, NFR-011; UX-DR23, UX-DR30, UX-DR53, UX-DR54, UX-DR65, UX-DR66, UX-DR77, UX-DR88, UX-DR89; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une échéance active strictement avant sa limite
**Quand** l'adhérent choisit `Suspendre ce panier`
**Alors** un `ConfirmDialog` explique que le panier ne sera pas préparé, que le solde ne diminuera pas et que l'échéance sera décalée
**Et** il liste toute cession, substitution ou récupération exceptionnelle qui sera neutralisée.

**Étant donné** une cession active
**Quand** la suspension est confirmée
**Alors** la cession est explicitement annulée ou neutralisée dans la même transaction
**Et** titulaire, bénéficiaire et raison de la neutralisation restent conservés dans l'historique.

**Étant donné** des substitutions ou un retrait exceptionnel actifs
**Quand** la suspension est confirmée
**Alors** ces exceptions sont neutralisées et ne seront ni générées ni préparées
**Et** les valeurs antérieures restent auditables sans modifier l'abonnement permanent.

**Étant donné** une échéance non encore générée
**Quand** la suspension réussit
**Alors** elle est marquée suspendue et le job quotidien ne crée aucune commande pour cette date
**Et** aucun événement de consommation n'est produit.

**Étant donné** une commande AMAP déjà générée mais non livrée
**Quand** la suspension réussit avant la limite
**Alors** la commande passe à `Annulée` avec le motif `Suspension adhérent` et reste liée à l'échéance
**Et** aucune nouvelle commande n'est recréée automatiquement pour cette clé.

**Étant donné** l'abonnement du titulaire
**Quand** l'échéance est suspendue
**Alors** son solde reste inchangé et sa prochaine échéance est décalée selon la récurrence
**Et** le retrait, format et limite permanents ne sont pas modifiés.

**Étant donné** une suspension confirmée par l'adhérent
**Quand** il tente de la retirer en ligne
**Alors** l'action est indisponible pour cette échéance afin d'éviter de réactiver une commande annulée
**Et** une correction exceptionnelle reste réservée à l'administration avec motif et audit.

**Étant donné** que la limite est atteinte ou dépassée
**Quand** la suspension est soumise depuis un écran ancien
**Alors** l'API refuse sans annuler la commande ni déplacer l'échéance
**Et** l'écran passe en lecture seule avec la date limite et le contact de l'exploitation.

**Étant donné** une échéance déjà suspendue, livrée ou annulée pour une autre raison
**Quand** une nouvelle suspension est demandée
**Alors** aucune seconde suspension ou modification de solde n'est créée
**Et** l'état courant et ses conséquences sont affichés.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** suspension, annulation de commande, neutralisation des exceptions et décalage sont appliqués au plus une fois
**Et** aucun état intermédiaire incohérent ne subsiste.

**Étant donné** une suspension réussie
**Quand** l'historique est consulté
**Alors** il affiche échéance initiale, date de suspension, auteur, motif facultatif, exceptions neutralisées et prochaine échéance
**Et** l'audit conserve toutes les valeurs avant/après.

**Étant donné** l'action sur mobile, au clavier ou avec un lecteur d'écran
**Quand** les conséquences sont lues et confirmées
**Alors** le dialogue initialise le focus sur une action non destructive, distingue clairement retour et confirmation et restitue le focus au déclencheur
**Et** le prochain panier reflète immédiatement la suspension sans ambiguïté.

### Story 6.5 : Céder un panier à un bénéficiaire

En tant qu'adhérent AMAP,
je veux céder mon prochain panier à une autre personne,
afin qu'elle puisse le récupérer sans transférer mon abonnement.

**Exigences couvertes :** FR-072, FR-073, FR-075, FR-075a; NFR-003, NFR-006, NFR-010, NFR-011; UX-DR23, UX-DR30, UX-DR53, UX-DR54, UX-DR64 à UX-DR66, UX-DR90, UX-DR91, UX-DR95, UX-DR97; AD-7, AD-9, AD-12, AD-13, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une échéance active strictement avant sa limite
**Quand** l'adhérent choisit `Céder ce panier`
**Alors** il renseigne le nom et le téléphone obligatoires du bénéficiaire, avec un email facultatif
**Et** seuls les renseignements nécessaires à l'identification lors du retrait sont collectés.

**Étant donné** les informations du bénéficiaire
**Quand** la cession est confirmée
**Alors** une exception datée conserve le titulaire, le bénéficiaire, ses coordonnées, l'auteur et l'horodatage
**Et** l'abonnement reste exclusivement rattaché au titulaire.

**Étant donné** une échéance non encore générée
**Quand** la cession est enregistrée
**Alors** elle sera snapshotée dans la future commande AMAP
**Et** le prochain panier prévisionnel affiche immédiatement le bénéficiaire sans créer de compte.

**Étant donné** une commande AMAP déjà générée
**Quand** la cession est créée, modifiée ou retirée avant la limite
**Alors** l'exception et la commande sont mises à jour atomiquement
**Et** l'ancien bénéficiaire reste dans l'historique sans apparaître comme bénéficiaire courant.

**Étant donné** une cession active
**Quand** l'adhérent modifie aussi une substitution ou un retrait exceptionnel autorisé
**Alors** ces exceptions peuvent coexister et restent rattachées à la même échéance
**Et** le bénéficiaire voit appliquer le panier et le retrait finalement snapshotés sans devenir titulaire.

**Étant donné** une échéance suspendue
**Quand** une cession est demandée
**Alors** l'action est refusée
**Et** suspendre une échéance possédant une cession active exige et enregistre sa neutralisation explicite.

**Étant donné** que la limite est atteinte ou dépassée
**Quand** une création, modification ou suppression de cession est soumise
**Alors** l'action adhérent est refusée même si le formulaire était déjà ouvert
**Et** l'administration conserve une correction motivée et auditée.

**Étant donné** une commande cédée au statut `Livrée`
**Quand** la consommation est créée
**Alors** exactement un panier est débité du solde du titulaire
**Et** l'événement de consommation conserve titulaire, bénéficiaire et commande sans attribuer de solde au bénéficiaire.

**Étant donné** une commande cédée annulée ou reportée avant livraison
**Quand** le solde est inspecté
**Alors** aucun panier n'est consommé
**Et** l'historique conserve la cession et l'issue de la commande.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** une seule cession courante existe et aucune divergence avec la commande n'est créée
**Et** l'écran recharge le bénéficiaire et les actions encore autorisées.

**Étant donné** les surfaces opérationnelles
**Quand** le bénéficiaire doit être identifié pour la distribution
**Alors** son nom et son téléphone sont visibles uniquement aux administrateurs autorisés et au titulaire concerné selon le besoin
**Et** ils sont masqués dans les listes ou historiques qui n'en ont pas besoin.

**Étant donné** une cession réussie
**Quand** le prochain panier et l'historique sont consultés
**Alors** le titulaire, le bénéficiaire et le retrait sont présentés sans ambiguïté
**Et** l'audit conserve les valeurs avant/après tandis que les données d'autres adhérents restent isolées.

**Étant donné** le formulaire sur mobile, au clavier ou avec un lecteur d'écran
**Quand** le bénéficiaire est saisi ou la cession confirmée
**Alors** labels, champs obligatoires, résumé d'erreurs, consentement aux conséquences, focus et annonces respectent le contrat UX
**Et** le prochain panier reflète immédiatement la cession après succès.

## Epic 7 : Maîtriser le cycle de vie des données personnelles

Permettre à l'exploitation de conserver les historiques nécessaires tout en appliquant information, droits, durées, suppression et anonymisation.

### Story 7.1 : Configurer le registre des traitements et les prestataires

En tant que responsable de l'exploitation,
je veux documenter les traitements, responsables et sous-traitants,
afin de disposer des décisions vérifiées nécessaires avant toute mise en production.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-006, NFR-010; UX-DR95, UX-DR99; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** la configuration de confidentialité
**Quand** le responsable la renseigne
**Alors** elle exige le nom légal, l'adresse, le SIRET, le contact vie privée et le DPO ou la mention `Non applicable`
**Et** aucune valeur fictive ou placeholder ne peut être validée pour la production.

**Étant donné** les prestataires de la V1
**Quand** ils sont enregistrés
**Alors** l'hébergeur et Resend disposent chacun d'une raison sociale, d'un service, des pays de traitement, sous-traitants ultérieurs, références contractuelles et mesures de sécurité
**Et** tout transfert hors EEE indique son mécanisme et ses garanties, ou confirme explicitement son absence.

**Étant donné** le registre des traitements
**Quand** il est consulté par un administrateur autorisé
**Alors** il couvre au minimum commandes classiques, comptes et paniers AMAP, publications email, liens de suivi, journal d'audit et demandes de droits
**Et** chaque entrée contient personnes et données, finalité, base légale validée, accès, durée, sort final et sous-traitants.

**Étant donné** une durée ou base légale non encore validée
**Quand** l'environnement est évalué pour une mise en production
**Alors** le contrôle de préparation échoue en identifiant chaque décision manquante
**Et** aucune valeur proposée dans le pack RGPD n'est considérée comme un avis juridique implicite.

### Story 7.2 : Versionner et publier l'information de confidentialité

En tant que responsable de l'exploitation,
je veux publier une notice versionnée issue du registre validé,
afin d'informer les personnes avant chaque collecte de coordonnées.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-006, NFR-011; UX-DR84, UX-DR97, UX-DR99; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une notice de confidentialité prête à publier
**Quand** une version est validée
**Alors** elle reçoit un identifiant, un numéro de version, une date d'effet, un auteur et une preuve de validation
**Et** elle décrit responsable, données, finalités, bases, destinataires, transferts, durées, droits, contact et recours auprès de la CNIL.

**Étant donné** une nouvelle version de notice
**Quand** elle devient active
**Alors** les futures collectes référencent cette version
**Et** les événements de consentement, commandes ou demandes historiques conservent la version présentée au moment de leur collecte.

**Étant donné** un formulaire collectant des coordonnées
**Quand** il est affiché pour commande, adhésion AMAP, consentement ou demande de droits
**Alors** l'information pertinente et le lien vers la notice active sont accessibles avant soumission
**Et** les champs facultatifs sont explicitement marqués et aucune donnée sans finalité documentée n'est demandée.

**Étant donné** l'inscription aux publications
**Quand** la mention de consentement est affichée
**Alors** elle reste distincte de la notice générale, versionnée, spécifique aux emails de disponibilité et non précochée
**Et** refuser ce consentement n'empêche aucun autre parcours.

**Étant donné** une modification du registre, d'un prestataire ou de la notice
**Quand** elle est enregistrée
**Alors** elle exige une `expectedVersion`, conserve les valeurs avant/après et produit un événement d'audit immuable
**Et** aucune configuration historique n'est supprimée ou réécrite.

**Étant donné** un utilisateur non administrateur
**Quand** il tente d'accéder au registre interne ou aux contrats prestataires
**Alors** l'accès est refusé sans divulguer leur contenu
**Et** seule la notice publique et les informations destinées aux personnes restent accessibles.

**Étant donné** la notice publique sur mobile, au clavier ou avec un lecteur d'écran
**Quand** elle est consultée depuis une collecte
**Alors** sa structure de titres, ses liens, son focus et son agrandissement respectent le contrat UX
**Et** elle reste lisible à `200 %` de texte et `400 %` de zoom sans défilement horizontal.

### Story 7.3 : Recevoir, vérifier et attribuer une demande

En tant qu'administrateur autorisé,
je veux enregistrer et qualifier une demande relative aux données personnelles,
afin de lancer son traitement avec une identité, une échéance et un responsable vérifiables.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-008, NFR-010, NFR-011; UX-DR19, UX-DR64, UX-DR90, UX-DR95; AD-7, AD-9, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** une demande reçue par téléphone, courrier, email ou autre canal
**Quand** l'administrateur l'enregistre
**Alors** le dossier conserve date de réception, canal, droit demandé, identité déclarée, coordonnées de réponse et description
**Et** son échéance interne est fixée à 30 jours après réception.

**Étant donné** les droits pris en charge
**Quand** le type de demande est choisi
**Alors** il peut couvrir accès, rectification, export ou portabilité, effacement, anonymisation, opposition ou limitation
**Et** chaque type affiche les étapes et restrictions qui lui sont applicables.

**Étant donné** une identité non encore vérifiée
**Quand** l'administrateur instruit le dossier
**Alors** il collecte uniquement les éléments proportionnés nécessaires à la vérification
**Et** aucune pièce ou donnée supplémentaire n'est exigée sans justification documentée.

**Étant donné** une identité suffisamment vérifiée
**Quand** le dossier est attribué
**Alors** il passe de `Reçue` ou `À vérifier` à `En cours` avec propriétaire et horodatage
**Et** l'écran signale les demandes approchant ou dépassant l'échéance de 30 jours.

**Étant donné** une création ou attribution rejouée
**Quand** la même clé d'idempotence est reçue ou la version est obsolète
**Alors** aucun dossier ni événement n'est dupliqué ou écrasé
**Et** le résultat établi ou l'état courant est retourné.

**Étant donné** l'interface sur mobile ou au clavier
**Quand** le dossier est créé, vérifié ou attribué
**Alors** échéance, statut, erreurs, focus et données masquées respectent le contrat UX
**Et** seuls les administrateurs autorisés peuvent consulter ou traiter ces dossiers.

### Story 7.4 : Rechercher les données et produire accès ou export

En tant qu'administrateur autorisé,
je veux localiser et rassembler les données d'une personne vérifiée,
afin de répondre à une demande d'accès ou d'export sans divulguer les données de tiers.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-006, NFR-008; UX-DR55, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une demande vérifiée
**Quand** la recherche de données est lancée
**Alors** elle localise les informations du demandeur dans comptes, contacts, commandes, AMAP, consentements, liens, campagnes, audit et demandes antérieures
**Et** elle identifie aussi les sous-traitants concernés à partir du registre actif.

**Étant donné** des données trouvées
**Quand** l'administrateur consulte le résultat
**Alors** elles sont regroupées par traitement, finalité, source, durée et action possible
**Et** les données d'autres personnes sont exclues ou masquées.

**Étant donné** une demande d'accès ou d'export approuvée
**Quand** le package est généré
**Alors** il contient un résumé lisible et des données structurées dans des formats documentés tels que JSON ou CSV
**Et** les secrets, condensats, jetons, remarques internes non communicables et données de tiers sont exclus.

**Étant donné** une génération rejouée ou des données modifiées pendant sa préparation
**Quand** le package est finalisé
**Alors** sa version et sa fenêtre de recherche définissent exactement son contenu sans duplication
**Et** une mutation source pertinente impose une nouvelle revue.

**Étant donné** un package prêt
**Quand** sa preuve est créée
**Alors** l'audit conserve périmètre, formats, volumes, exclusions, version et auteur
**Et** il ne duplique pas le contenu personnel exporté.

### Story 7.5 : Rectifier, opposer ou limiter les traitements

En tant qu'administrateur autorisé,
je veux appliquer les rectifications, oppositions et limitations approuvées,
afin de respecter la décision prise sans altérer les preuves qui doivent rester conservées.

**Exigences couvertes :** aucune FR directe; NFR-004, NFR-006, NFR-008, NFR-010; UX-DR64, UX-DR65, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-18.

**Critères d'acceptation :**

**Étant donné** une demande de rectification approuvée
**Quand** elle est exécutée
**Alors** les données courantes concernées sont corrigées avec valeurs avant/après
**Et** les snapshots historiques soumis à conservation ne sont pas réécrits; une rectification liée est ajoutée lorsque nécessaire.

**Étant donné** une opposition ou limitation approuvée
**Quand** elle est appliquée
**Alors** les traitements concernés sont marqués comme bloqués pour leurs futurs usages
**Et** une désinscription marketing devient immédiatement effective indépendamment des autres traitements contractuels.

**Étant donné** une obligation légale ou un droit de tiers empêchant tout ou partie de la demande
**Quand** l'administrateur prend sa décision
**Alors** la restriction, sa base, les données conservées et la durée sont documentées
**Et** le refus total ou partiel n'efface aucune autre action approuvée.

**Étant donné** une action rejouée ou concurrente
**Quand** sa clé d'idempotence existe déjà ou sa version est obsolète
**Alors** elle ne s'exécute pas deux fois et n'écrase aucun état courant
**Et** le résultat établi ou la nouvelle version est présenté avant poursuite.

### Story 7.6 : Effacer ou anonymiser les données éligibles

En tant qu'administrateur autorisé,
je veux exécuter un effacement ou une anonymisation approuvée,
afin de supprimer l'identification qui n'a plus de justification tout en préservant les obligations applicables.

**Exigences couvertes :** aucune FR directe; NFR-006, NFR-008, NFR-009; UX-DR23, UX-DR63, UX-DR65, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** une demande d'effacement ou d'anonymisation approuvée
**Quand** elle est exécutée
**Alors** les données sans obligation de conservation sont supprimées ou anonymisées via les ports de chaque domaine
**Et** les dates, montants et agrégats nécessaires sont préservés sans conserver une identité directement exploitable.

**Étant donné** un sous-traitant détenant des données éligibles
**Quand** l'effacement est confirmé
**Alors** une demande externe idempotente est envoyée par son port avec un périmètre minimisé
**Et** son accusé, résultat ou échec restent suivis dans le dossier avant réponse définitive.

**Étant donné** une erreur, concurrence ou reprise
**Quand** le traitement d'un domaine ne peut pas être finalisé
**Alors** aucun de ses enregistrements ne reste partiellement anonymisé et aucune action ne s'exécute deux fois
**Et** les domaines indépendants réussis restent acquis et traçables.

### Story 7.7 : Réviser, remettre et clôturer la réponse

En tant qu'administrateur autorisé,
je veux faire contrôler puis remettre une réponse complète au demandeur,
afin de clôturer le dossier avec une preuve du contenu, des restrictions et du délai respecté.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-006, NFR-008, NFR-010, NFR-011; UX-DR23, UX-DR64, UX-DR65, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** un dossier en cours
**Quand** il est attribué ou change d'état
**Alors** il suit `Reçue`, `À vérifier`, `En cours`, `En revue`, `Répondue` puis `Clôturée`, avec propriétaire et horodatages
**Et** l'écran signale les dossiers approchant ou dépassant 30 jours.

**Étant donné** les actions terminées
**Quand** le dossier passe en revue
**Alors** un second administrateur contrôle le résultat lorsque cette séparation est possible
**Et** l'absence de second contrôleur est explicitement justifiée si l'exploitation ne dispose que d'un administrateur.

**Étant donné** une réponse prête
**Quand** elle est remise au demandeur par le canal convenu
**Alors** la date, le canal, le contenu ou package remis et les éventuelles restrictions sont enregistrés
**Et** aucun email automatique supplémentaire n'est requis; la remise peut rester une opération externe tracée.

**Étant donné** une mutation concurrente ou rejouée
**Quand** la version est obsolète ou la clé d'idempotence répétée
**Alors** aucune action de droit n'est exécutée deux fois et aucun dossier n'est écrasé
**Et** l'état courant est rechargé avant poursuite.

**Étant donné** une action sur le dossier
**Quand** elle réussit
**Alors** l'audit conserve acteur, date, objet, action, avant/après et motif sans dupliquer le contenu personnel exporté
**Et** seuls les administrateurs autorisés peuvent consulter ou traiter ces dossiers.

**Étant donné** l'interface sur mobile ou au clavier
**Quand** le dossier est recherché, instruit ou clôturé
**Alors** étapes, échéance, erreurs, confirmations, focus et données masquées respectent le contrat UX
**Et** les actions irréversibles utilisent un `ConfirmDialog` décrivant précisément leurs conséquences.

### Story 7.8 : Configurer les durées et exceptions légales

En tant que responsable de l'exploitation,
je veux définir et valider des politiques exécutables de conservation,
afin que chaque catégorie de données possède une échéance et un sort final juridiquement maîtrisés.

**Exigences couvertes :** aucune FR directe; NFR-008, NFR-009; UX-DR65, UX-DR95; AD-7, AD-9, AD-12, AD-13, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** les politiques de conservation
**Quand** elles sont activées
**Alors** chaque traitement possède une durée validée, un événement de départ, une action finale et les obligations légales prioritaires
**Et** aucune politique proposée mais non validée juridiquement ne peut s'exécuter en production.

**Étant donné** les règles V1 proposées
**Quand** elles sont confirmées par le responsable
**Alors** contacts et commandes utilisent trois ans après la dernière commande ou interaction active, et les preuves de consentement trois ans après retrait
**Et** toute durée différente imposée par une obligation comptable, fiscale, contractuelle ou probatoire est documentée et prévaut.

**Étant donné** les dossiers de demandes de droits
**Quand** leur durée après clôture est configurée
**Alors** la valeur proposée de trois ans doit être explicitement validée avant activation
**Et** les pièces de vérification d'identité peuvent avoir une durée plus courte selon la minimisation documentée.

**Étant donné** un lien de suivi expiré ou révoqué
**Quand** le nettoyage correspondant s'exécute
**Alors** son jeton ou condensat inutilisable est supprimé selon la politique validée
**Et** l'événement non secret prouvant expiration ou révocation peut rester dans l'audit applicable.

**Étant donné** une obligation légale, un litige ou une limitation active
**Quand** une exception est ajoutée
**Alors** elle définit périmètre, motif, base, date de début, date de réévaluation et accès autorisés
**Et** elle ne suspend jamais les données non couvertes par ce besoin.

**Étant donné** un aperçu de politique
**Quand** le responsable le lance
**Alors** il indique sujets et enregistrements éligibles, actions prévues, exceptions et tâches externes attendues
**Et** aucune donnée n'est supprimée, anonymisée ou transmise.

### Story 7.9 : Orchestrer l'exécution des politiques de cycle de vie

En tant que responsable de l'exploitation,
je veux exécuter les politiques actives de façon idempotente et reprenable,
afin de traiter les données éligibles sans état partiel ni double action.

**Exigences couvertes :** aucune FR directe; NFR-006, NFR-009; UX-DR55, UX-DR63, UX-DR65, UX-DR95; AD-7, AD-12, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** le job planifié de cycle de vie
**Quand** il est réclamé par le worker PostgreSQL
**Alors** il utilise un verrou temporaire, journalise chaque tentative et peut reprendre après interruption
**Et** chaque personne ou lot possède une clé d'idempotence empêchant une seconde exécution des mêmes actions.

**Étant donné** une obligation légale, un litige ou une limitation active
**Quand** un enregistrement arrive à sa durée normale
**Alors** l'action automatique est bloquée pour le périmètre strictement nécessaire avec motif et date de réévaluation
**Et** les données non couvertes par cette exception poursuivent leur cycle normal.

**Étant donné** des coordonnées arrivées à échéance sans blocage
**Quand** l'action finale s'exécute
**Alors** les données directement identifiantes sont supprimées ou anonymisées dans comptes, contacts, commandes, AMAP, consentements et campagnes selon leur politique
**Et** aucune donnée d'un tiers ou sujet non éligible n'est modifiée.

**Étant donné** une erreur pendant un lot
**Quand** l'action d'un sujet ne peut pas être finalisée de façon cohérente
**Alors** ses changements transactionnels sont annulés ou marqués pour reprise sans état partiellement anonymisé
**Et** les autres sujets indépendants peuvent continuer sans masquer l'échec.

### Story 7.10 : Pseudonymiser les historiques arrivés à échéance

En tant que responsable de l'exploitation,
je veux pseudonymiser les historiques dont l'identité n'est plus justifiée,
afin de préserver les preuves et agrégats autorisés sans permettre la réidentification.

**Exigences couvertes :** FR-079; NFR-006, NFR-009; UX-DR55, UX-DR63, UX-DR65, UX-DR95; AD-7, AD-12, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** un historique opérationnel à préserver
**Quand** il est pseudonymisé
**Alors** dates, statuts, montants, quantités et agrégats nécessaires restent exploitables sous un identifiant non directement identifiant
**Et** noms, téléphones, emails, adresses, bénéficiaires et commentaires personnels sont supprimés ou transformés selon la politique.

**Étant donné** une table temporaire de correspondance nécessaire à la pseudonymisation
**Quand** tous les contrôles du lot sont réussis et la durée autorisée terminée
**Alors** cette table est supprimée de façon irréversible
**Et** l'historique conservé ne permet plus à l'application de retrouver l'identité initiale.

**Étant donné** les historiques exigés par `FR-079`
**Quand** le cycle de vie est terminé
**Alors** publications, statuts, reports, occurrences, suspensions, cessions et consommations restent consultables dans la mesure autorisée
**Et** leur identité personnelle est supprimée ou pseudonymisée lorsque la conservation nominative n'est plus justifiée.

### Story 7.11 : Suivre les sous-traitants et les preuves d'exécution

En tant que responsable de l'exploitation,
je veux suivre les suppressions confiées aux sous-traitants et leurs preuves,
afin de démontrer que le cycle de vie est exécuté au-delà de la base active.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-006, NFR-009, NFR-011; UX-DR23, UX-DR55, UX-DR65, UX-DR95; AD-7, AD-12, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** une action impliquant Resend, l'hébergeur ou un autre sous-traitant actif
**Quand** la suppression externe est requise
**Alors** une tâche suivie conserve fournisseur, périmètre, demande, statut et preuve de réalisation
**Et** la clôture du lot signale toute suppression externe non confirmée.

**Étant donné** une exécution réussie
**Quand** sa preuve est enregistrée
**Alors** elle conserve politique et version, période, volumes, actions, exceptions, erreurs et auteur ou job
**Et** l'audit évite de recopier les données personnelles supprimées.

**Étant donné** le tableau de suivi sur mobile ou au clavier
**Quand** un aperçu, un lot ou une exception est consulté
**Alors** progression, conséquences, blocages, erreurs, focus et confirmations respectent le contrat UX
**Et** toute action irréversible reste inaccessible sans aperçu et confirmation explicite.

## Epic 8 : Garantir une mise en production accessible, exploitable et vérifiée

Garantir que la même version candidate peut être déployée, restaurée et utilisée sur les surfaces cibles, au clavier et avec les technologies d'assistance, avant sa mise en production.

### Story 8.1 : Stabiliser les composants et règles du design system

En tant qu'utilisateur de l'application,
je veux retrouver des composants visuels cohérents et accessibles sur chaque écran,
afin de comprendre et réaliser les actions sans comportement ou présentation imprévisible.

**Exigences couvertes :** aucune FR directe; NFR-001, NFR-011; UX-DR1 à UX-DR27, UX-DR55 à UX-DR57, UX-DR72 à UX-DR74, UX-DR94; AD-4, AD-5, AD-14.

**Critères d'acceptation :**

**Étant donné** les thèmes de `@project/ui`
**Quand** leurs tests de contrat sont exécutés
**Alors** ils exposent exactement les surfaces, encres, bordures, actions et statuts de `UX-DR1` à `UX-DR5`
**Et** `ink-disabled` reste réservé aux contrôles indisponibles, l'action primaire à l'action dominante et chaque statut associe couleur, libellé et symbole ou structure.

**Étant donné** qu'un écran métier utilise déjà un composant partagé
**Quand** cette story détecte une divergence
**Alors** la correction est portée par le composant propriétaire et couverte par un test de non-régression
**Et** aucun composant parallèle, redesign d'écran ou nouvelle règle métier n'est introduit dans cet epic.

**Étant donné** chaque combinaison de texte, contrôle, bordure active et focus
**Quand** son contraste est contrôlé automatiquement
**Alors** le texte normal atteint `4,5:1`, le grand texte `3:1` et les composants graphiques, bordures actives et focus `3:1`
**Et** le focus d'une action primaire utilise un anneau externe décalé discernable du fond.

**Étant donné** l'échelle typographique
**Quand** elle est rendue
**Alors** `display`, `title`, `section`, `body` et `meta` respectent familles, tailles, interlignes, graisses et usages de `UX-DR7` à `UX-DR10`
**Et** montants, quantités et heures utilisent des chiffres tabulaires lorsque la police le permet.

**Étant donné** un texte agrandi à `200 %` ou un navigateur à `400 %`
**Quand** un composant est consulté
**Alors** aucun texte n'est transformé en image ni tronqué dans un contrôle
**Et** contenu, unité, état et action restent disponibles.

**Étant donné** les tokens de forme et d'espacement
**Quand** les composants sont inspectés
**Alors** seuls les rayons `8`, `12`, `16` et `9999 px` et les espacements `4`, `8`, `12`, `16`, `24`, `32`, `48 px` sont utilisés
**Et** le rayon complet reste limité aux badges et petits contrôles segmentés, avec gouttières de `16 px` sur mobile et `24 px` sur écran large.

**Étant donné** la profondeur des surfaces
**Quand** une carte, sheet ou dialogue est affiché
**Alors** la hiérarchie repose d'abord sur les tons fond, carte et surface temporaire
**Et** les ombres discrètes restent réservées aux sheets, dialogues et autres surfaces temporaires au-dessus du contenu.

**Étant donné** une page applicative
**Quand** elle est créée ou contrôlée
**Alors** sa racine utilise `Screen` avec `surface-base`, gouttières responsives, défilement, safe areas et réserve pour l'action fixe
**Et** son `ScreenHeader` porte l'unique titre `display`, un contexte bref et des actions secondaires visuellement subordonnées.

**Étant donné** une action dominante en fin de parcours
**Quand** `StickyActionBar` est rendu
**Alors** il reste accessible après lecture, utilise `surface-raised` et `border-subtle`, et ne masque ni contenu ni focus
**Et** son unique action dominante est pleine largeur sur mobile et contextuelle sur desktop.

**Étant donné** une `EntityCard`, un `StatusBadge`, une `ProgressCard` ou un `EmptyState`
**Quand** le composant est utilisé
**Alors** leurs contrats imposent respectivement une cible native sans interaction imbriquée, un statut libellé et annoncé, une progression textuelle, et un état vide concret avec prochaine étape
**Et** l'ordre des informations de la carte et le padding `24 px` de l'état vide sont vérifiés.

**Étant donné** un `FilterSheet` ouvert sur mobile
**Quand** l'utilisateur modifie puis applique ses filtres
**Alors** `Appliquer` conserve les choix et ferme la feuille avec les résultats filtrés
**Et** `Réinitialiser`, visuellement secondaire, efface explicitement les choix et rétablit l'état initial documenté.

**Étant donné** une action irréversible
**Quand** `ConfirmDialog` est ouvert
**Alors** son titre exprime la conséquence, son détail reste concis, l'action destructive est distincte et le retour non destructif
**Et** le focus initial n'est jamais placé automatiquement sur l'action destructive.

**Étant donné** un `NumericInput`
**Quand** une quantité est saisie
**Alors** sa hauteur atteint au moins `48 px`, son unité reste visible, le clavier numérique est demandé et le calcul est immédiat
**Et** une erreur précise est reliée au champ et les boutons `+`/`-` sont présents lorsque la granularité est connue.

**Étant donné** un `SegmentedControl`
**Quand** il est parcouru au clavier ou avec un lecteur d'écran
**Alors** ses options à libellés complets sont mutuellement exclusives et suivent le comportement clavier documenté du motif retenu
**Et** nom, rôle, état sélectionné et changement de sélection sont exposés.

**Étant donné** un `ResponsivePane` ou une `OccurrenceCard`
**Quand** leurs contrats sont testés
**Alors** le master/detail ne s'active sur tablette ou desktop que s'il évite un aller-retour opérationnel
**Et** l'occurrence affiche type, horaire, progression et statut, puis ouvre toujours l'occurrence datée et jamais son modèle récurrent.

**Étant donné** une sauvegarde de brouillon
**Quand** elle réussit
**Alors** la région `status` annonce immédiatement `Modifications enregistrées` et le nombre exact de changements non publiés
**Et** aucune apparence ou microcopie ne laisse croire que ces changements sont déjà publics.

**Étant donné** un contrôle interactif
**Quand** sa cible réelle et ses espacements sont mesurés
**Alors** elle atteint au moins `24 × 24 px` sans chevauchement
**Et** navigation, icônes, fermeture, filtres, incréments et réorganisation visent `44 à 48 px`.

**Étant donné** les libellés, aides, confirmations et erreurs des composants
**Quand** leur microcopie est revue
**Alors** elle nomme directement nombre, statut, instant et conséquence utiles
**Et** elle évite les formulations abstraites qui n'indiquent pas la prochaine action.

**Étant donné** que `prefers-reduced-motion: reduce` est actif
**Quand** skeletons, sheets, dialogues, changements de statut ou navigation sont rendus
**Alors** les animations deviennent instantanées ou brèves et aucun skeleton n'utilise de balayage
**Et** aucun changement de contexte automatique non annoncé n'est déclenché.

### Story 8.2 : Intégrer la navigation adaptative des espaces

En tant qu'utilisateur sur mobile, tablette ou desktop,
je veux une navigation adaptée à mon espace et à mon écran,
afin d'accéder directement aux opérations fréquentes sans détour.

**Exigences couvertes :** aucune FR directe; NFR-001, NFR-011; UX-DR15 à UX-DR17, UX-DR22, UX-DR26, UX-DR27, UX-DR33 à UX-DR35, UX-DR37, UX-DR39, UX-DR85; AD-4, AD-5, AD-14.

**Critères d'acceptation :**

**Étant donné** la matrice des routes publiques, administratives et adhérent
**Quand** la recette d'intégration des écrans est exécutée
**Alors** elle couvre au minimum accueil public, catalogue, checkout, suivi, connexion, `Aujourd'hui`, commandes, préparation, disponibilités, publication, distribution, AMAP, espace adhérent et confidentialité
**Et** chaque écran utilise les composants et contrats validés en Story 8.1 sans dupliquer leur implémentation.

**Étant donné** la navigation admin sur une largeur de `320` à `430 px`
**Quand** une destination est ouverte
**Alors** la barre basse expose `Aujourd'hui`, `Commandes`, `Préparer`, `Dispos` et `Plus`, avec cible tactile conforme et destination active explicite
**Et** `aria-current="page"` identifie l'entrée active sans dépendre de la couleur seule.

**Étant donné** la même navigation entre `768` et `1440 px`
**Quand** l'espace disponible permet une sidebar
**Alors** elle devient permanente avec les libellés complets `Préparation` et `Disponibilités`
**Et** distribution, AMAP, produits, clients, publications et paramètres restent accessibles dans `Plus` ou la sidebar.

**Étant donné** une surface administrative secondaire
**Quand** l'administrateur doit revenir à une opération fréquente
**Alors** `Aujourd'hui`, `Commandes`, `Préparer` et `Disponibilités` restent accessibles directement sans repasser par l'accueil
**Et** l'accès ne demande jamais plus d'une activation depuis la navigation persistante.

**Étant donné** les parcours de traitement principaux
**Quand** le nombre d'actions depuis leur point d'entrée est mesuré
**Alors** modifier une disponibilité, valider, préparer, livrer ou clôturer demande au plus trois actions significatives
**Et** l'affichage de détail simultané, quand il réduit ces actions, n'est activé qu'aux largeurs réellement utiles.

**Étant donné** les écrans `Commandes` et `Préparer`
**Quand** ils sont utilisés sur mobile
**Alors** les filtres avancés utilisent `FilterSheet` et la préparation commence par une `OccurrenceCard` représentant l'occurrence datée
**Et** tablette ou desktop peut utiliser `ResponsivePane` sans modifier l'ordre logique ni ouvrir un modèle récurrent.

### Story 8.3 : Garantir le reflow des écrans réels

En tant qu'utilisateur sur mobile, tablette ou desktop,
je veux conserver contenu et actions lorsque la largeur ou le zoom change,
afin d'accomplir le même parcours sans troncature ni défilement parasite.

**Exigences couvertes :** aucune FR directe; NFR-001, NFR-011; UX-DR78 à UX-DR83; AD-4, AD-5, AD-14.

**Critères d'acceptation :**

**Étant donné** une largeur de `320` à `430 px`
**Quand** chaque écran de la matrice est rendu
**Alors** il utilise une colonne, des formulaires verticaux, des filtres en sheet et l'action dominante fixe lorsque nécessaire
**Et** les contrôles de disponibilité reviennent à la ligne sans tronquer champ, unité ou statut.

**Étant donné** une tablette de `768` à `1024 px` en portrait ou paysage
**Quand** validation, préparation et autres écrans de la matrice sont rendus
**Alors** ils utilisent une ou deux colonnes avec de grandes cibles tactiles, et le paysage optimise validation et préparation
**Et** aucune fonction ne devient inaccessible en portrait.

**Étant donné** un écran desktop jusqu'à `1440 px`
**Quand** historique ou détail simultané améliore la tâche
**Alors** il peut accompagner la liste avec une sidebar permanente
**Et** un tableau n'est utilisé que s'il améliore la lecture et conserve une alternative adaptée au reflow.

**Étant donné** chaque écran entre `320` et `1440 px`, à `200 %` de texte et `400 %` de zoom
**Quand** la recette visuelle et fonctionnelle est exécutée
**Alors** aucun défilement horizontal n'apparaît hors contenu réellement bidimensionnel
**Et** aucun contenu, contrôle, état ou parcours n'est perdu.

**Étant donné** une action fixe, un résumé d'erreurs ou une cible de navigation interne
**Quand** le focus s'y déplace
**Alors** l'ordre DOM et de focus reste conforme à l'ordre visuel
**Et** `scroll-margin` et les réserves du `Screen` empêchent toute barre fixe de masquer le focus ou l'erreur.

### Story 8.4 : Vérifier structures, dialogues et formulaires accessibles

En tant qu'utilisateur au clavier ou avec une technologie d'assistance,
je veux que les structures, dialogues et formulaires soient correctement exposés,
afin de saisir et confirmer chaque opération au clavier ou avec une technologie d'assistance.

**Exigences couvertes :** aucune FR directe; NFR-011; UX-DR23, UX-DR72, UX-DR84, UX-DR86 à UX-DR91; AD-4, AD-5, AD-14.

**Critères d'acceptation :**

**Étant donné** un écran de la matrice
**Quand** sa structure accessible est inspectée
**Alors** il contient un unique `main`, des `nav` nommées, une hiérarchie de titres valide et un lien `Aller au contenu` visible au focus
**Et** chaque contrôle expose nom, rôle, état et focus visible conformément aux tokens.

**Étant donné** une sheet ou un dialogue
**Quand** il est ouvert puis fermé au clavier
**Alors** il est nommé, modal avec `aria-modal`, rend l'arrière-plan inerte et se ferme avec `Escape` sauf justification testée
**Et** le focus initial vise le titre ou une action non destructive, puis revient au déclencheur à la fermeture.

**Étant donné** un formulaire public, administratif ou adhérent
**Quand** il est affiché puis soumis avec des erreurs
**Alors** chaque champ possède label visible, état obligatoire ou facultatif, aide, `aria-invalid` et message précis relié
**Et** un résumé focusable pointe vers les champs erronés tandis que les saisies valides sont conservées.

### Story 8.5 : Annoncer les états et protéger les données exposées

En tant qu'utilisateur avec une technologie d'assistance,
je veux recevoir des retours d'état utiles sans exposition de données sensibles,
afin de comprendre le résultat de mes actions en toute confidentialité.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-005, NFR-011; UX-DR55, UX-DR67, UX-DR92 à UX-DR95, UX-DR97, UX-DR99; AD-4, AD-5, AD-14, AD-15.

**Critères d'acceptation :**

**Étant donné** une réorganisation de tournée avec `Monter`, `Descendre` ou glisser-déposer
**Quand** un arrêt change de position
**Alors** la position initiale et le résultat sont annoncés aux technologies d'assistance
**Et** les boutons offrent l'intégralité du comportement sans glisser-déposer.

**Étant donné** une sauvegarde, progression, réussite, nouvel élément ou erreur bloquante
**Quand** le retour est produit
**Alors** les informations non bloquantes utilisent une région `status` polie
**Et** seules les erreurs exigeant une intervention immédiate utilisent `alert`, sans annonce dupliquée.

**Étant donné** un skeleton pendant un chargement
**Quand** la zone attend un état fiable
**Alors** sa structure inerte préserve la mise en page, porte `aria-busy` et bloque les actions critiques
**Et** la préférence de mouvements réduits supprime son balayage éventuel.

**Étant donné** une surface contenant des données personnelles ou un lien sécurisé
**Quand** elle est consultée hors de son besoin strict
**Alors** les coordonnées sont masquées et aucun jeton n'apparaît dans l'historique, l'administration, les logs ou les annonces
**Et** un lien invalide, expiré ou révoqué ne révèle aucune donnée et oriente seulement vers le contact autorisé.

**Étant donné** un formulaire qui collecte des coordonnées
**Quand** il est ouvert avant soumission
**Alors** la notice active, l'identité et le contact du responsable sont accessibles, et les champs facultatifs sont marqués
**Et** les mentions légales, prestataires, transferts, bases, durées et droits non validés bloquent la préparation à la production.

### Story 8.6 : Choisir et provisionner les environnements VPS en France

En tant que responsable de l'exploitation,
je veux provisionner des environnements isolés sur un hébergement français vérifié,
afin de préparer une candidate sans exposer la production au staging.

**Exigences couvertes :** aucune FR directe; NFR-007; AD-8, AD-10, AD-11, AD-16, AD-17.

**Critères d'acceptation :**

**Étant donné** le premier provisionnement
**Quand** le fournisseur VPS est choisi
**Alors** une ADR retient OVHcloud ou un équivalent hébergeant physiquement en France après vérification de localisation, DPA, accès, SLA, snapshots, stockage de sauvegarde et sortie
**Et** aucun environnement n'est créé tant qu'un critère bloquant reste sans preuve.

**Étant donné** le VPS retenu
**Quand** les cibles `staging` et `production` sont provisionnées
**Alors** deux stacks Docker Compose préparent réseaux, volumes, secrets, limites de ressources, un worker unique par stack et PostgreSQL `18.6` non exposé publiquement, sans déployer encore de candidate applicative
**Et** le reverse proxy et les règles d'isolation sont prêts, tandis que staging ne peut ni lire ni muter les données de production.

**Étant donné** les secrets et accès d'administration
**Quand** ils sont configurés
**Alors** ils sont distincts par stack, fournis au runtime et protégés par le moindre privilège
**Et** aucune valeur sensible n'est intégrée aux images, manifests versionnés ou logs.

### Story 8.7 : Promouvoir et retirer une version sans reconstruction

En tant que responsable de l'exploitation,
je veux promouvoir ou retirer une candidate immuable avec ses migrations maîtrisées,
afin de déployer la même version en staging et production de façon traçable.

**Exigences couvertes :** aucune FR directe; NFR-006, NFR-007, NFR-010; AD-8, AD-10, AD-11, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** les environnements et migrations
**Quand** une promotion est préparée
**Alors** `infra` possède manifests, migrations, contrôles de compatibilité, procédures de promotion et retour arrière
**Et** le même artefact SHA produit en Story 1.3 est promu entre environnements sans reconstruction.

**Étant donné** une migration de schéma
**Quand** sa compatibilité est vérifiée
**Alors** elle respecte une séquence déployable avec les versions applicatives concernées
**Et** le rollback documente les limites des changements de données irréversibles au lieu de promettre une restauration impossible.

**Étant donné** une commande métier impliquant un fournisseur externe actuel ou futur
**Quand** la candidate est contrôlée
**Alors** son état autoritaire est persisté dans PostgreSQL sans attente d'une synchronisation distante
**Et** Resend, une future outbox Odoo ou tout fournisseur similaire reste derrière un port et un traitement asynchrone reprenable.

**Étant donné** un déploiement ou rollback
**Quand** sa procédure s'exécute
**Alors** version, environnement, artefact, migrations, probes et résultat sont tracés
**Et** aucun secret n'est écrit dans les logs ou artefacts de diagnostic.

### Story 8.8 : Externaliser et restaurer les sauvegardes

En tant que responsable de l'exploitation,
je veux sauvegarder les données hors du VPS et prouver leur restauration,
afin de reprendre l'activité dans les objectifs convenus après un incident.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-009; UX-DR95; AD-10, AD-11, AD-16, AD-17.

**Critères d'acceptation :**

**Étant donné** les données persistantes
**Quand** la politique de sauvegarde est activée
**Alors** les sauvegardes chiffrées sont externalisées dans un stockage physiquement situé en France avec une cible `RPO <= 24 h` et `RTO <= 4 h`
**Et** accès, rotation, rétention, alertes et responsabilité sont documentés.

**Étant donné** une sauvegarde sélectionnée après le déploiement de la Story 8.7
**Quand** une restauration est testée sur staging
**Alors** intégrité, migrations, secrets remplacés et règles de cycle de vie sont vérifiés avant ouverture
**Et** date, durée, résultat, écarts et procédure d'incident sont conservés comme preuve.

**Étant donné** un consentement retiré, un compte désactivé, un jeton révoqué ou une donnée effacée après la sauvegarde
**Quand** la restauration est préparée
**Alors** les événements et politiques postérieurs sont réappliqués avant remise en service
**Et** aucun état retiré ou supprimé n'est réactivé silencieusement.

**Étant donné** un échec ou dépassement de l'objectif
**Quand** la supervision le détecte
**Alors** une alerte actionnable identifie sauvegarde, environnement et prochaine action
**Et** la restauration n'est jamais déclarée réussie sans contrôle applicatif.

### Story 8.9 : Initialiser un harnais E2E déterministe

En tant que responsable de l'exploitation,
je veux un environnement de recette reproductible et isolé,
afin que les parcours critiques puissent être automatisés sans données partagées ni résultat aléatoire.

**Exigences couvertes :** aucune FR directe; NFR-006, NFR-007, NFR-010; UX-DR100; AD-8, AD-10, AD-16, AD-17, AD-18.

**Critères d'acceptation :**

**Étant donné** l'environnement de recette E2E
**Quand** la suite est initialisée
**Alors** elle démarre web, API, worker et PostgreSQL sur des versions verrouillées avec des données déterministes dédiées
**Et** chaque scénario isole ses données, son horloge et ses identifiants sans utiliser ni révéler de données de production.

**Étant donné** les sept parcours exigés
**Quand** leurs helpers sont utilisés
**Alors** ils permettent de vérifier état visible, réponse API, persistance, file et événement d'audit pertinents
**Et** ils n'imposent aucun détail d'implémentation sans valeur contractuelle.

**Étant donné** les rôles V1
**Quand** les fixtures créent administrateur, adhérent ou client sans compte
**Alors** elles respectent les invariants métier et isolent comptes, identifiants et clés d'idempotence
**Et** aucun mot de passe, secret ou jeton brut n'est journalisé.

**Étant donné** Resend ou un futur adaptateur externe
**Quand** un succès, délai, échec temporaire ou refus définitif est simulé
**Alors** un faux adaptateur contrôlable expose les appels sans accès réseau réel
**Et** les scénarios peuvent prouver reprise et absence de double envoi.

**Étant donné** une attente asynchrone
**Quand** le test attend un résultat
**Alors** il observe une condition explicite avec délai borné
**Et** aucun délai arbitraire ne masque une course.

### Story 8.10 : Automatiser les parcours administratifs critiques

En tant que responsable de l'exploitation,
je veux une recette automatique du cycle quotidien, de la publication et de la clôture,
afin de vérifier les opérations administratives les plus risquées avant livraison.

**Exigences couvertes :** aucune FR directe; NFR-002, NFR-004, NFR-006, NFR-007, NFR-010, NFR-011; UX-DR28, UX-DR29, UX-DR31, UX-DR36, UX-DR38 à UX-DR44, UX-DR57 à UX-DR65, UX-DR69 à UX-DR71, UX-DR75, UX-DR76, UX-DR100; AD-16, AD-17, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** le parcours du cycle admin
**Quand** un administrateur se connecte puis traite une activité
**Alors** il accède selon son rôle, modifie une disponibilité, valide, prépare et livre une commande avec les transitions autorisées
**Et** compte désactivé, session expirée, transition interdite et conflit de version sont vérifiés sans écriture silencieuse.

**Étant donné** le parcours de publication
**Quand** l'administrateur enregistre, revoit puis publie des disponibilités avec ou sans email
**Alors** seul le snapshot revu devient public et seuls les consentements encore actifs sont éligibles à la campagne
**Et** brouillon concurrent, zéro destinataire, retrait avant envoi, échec temporaire ou permanent et reprise n'entraînent ni blocage de publication ni double envoi.

**Étant donné** le parcours de clôture
**Quand** l'administrateur traite non-retraits, disponibilités, publication facultative et confirmation finale
**Alors** les quatre étapes persistent, la revalidation serveur est effectuée et l'occurrence se clôture avec son résumé
**Et** commandes bloquantes, reprise après interruption, double confirmation et occurrence annulée conservent leurs états métier attendus.

**Étant donné** une dépendance externe indisponible
**Quand** Resend ou un futur adaptateur échoue pendant un scénario concerné
**Alors** prise, préparation, livraison et clôture continuent sur l'état local
**Et** le travail asynchrone reste visible, reprenable et idempotent.

### Story 8.11 : Automatiser les parcours publics et AMAP

En tant que responsable de l'exploitation,
je veux une recette automatique de la commande, du suivi et des usages AMAP,
afin de vérifier les parcours autonomes des clients et adhérents ainsi que leur isolation.

**Exigences couvertes :** aucune FR directe; NFR-003, NFR-005, NFR-006, NFR-010, NFR-011; UX-DR30, UX-DR45, UX-DR47 à UX-DR54, UX-DR63 à UX-DR71, UX-DR74, UX-DR75, UX-DR77, UX-DR100; AD-12, AD-15, AD-18, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** le parcours de commande sans compte
**Quand** un client consulte l'offre, sélectionne produits et occurrence puis confirme ses coordonnées et paiement prévu
**Alors** la commande fige les données commerciales, affiche immédiatement son lien de suivi et reste indépendante de tout opt-in
**Et** limite dépassée, produit indisponible, formulaire invalide, double soumission et échec réseau conservent un résultat cohérent et explicite.

**Étant donné** le parcours du prochain panier AMAP
**Quand** un adhérent consulte son échéance puis réalise une substitution, un changement de retrait, une suspension ou une cession autorisée
**Alors** le prochain panier, le solde et l'historique reflètent immédiatement l'action versionnée
**Et** échéance dépassée, données d'un autre adhérent, suspension incompatible avec cession et conflit concurrent sont refusés sans fuite.

**Étant donné** le parcours de suivi sécurisé
**Quand** un client utilise le lien remis à la confirmation
**Alors** il ne voit que sa commande, peut la modifier avant préparation et distingue montant indicatif et montant final
**Et** jeton altéré, révoqué, remplacé ou expiré ne révèle aucune donnée, tandis qu'une modification après acceptation retourne la commande à `À valider`.

**Étant donné** le parcours de composition hebdomadaire AMAP
**Quand** l'administrateur définit la composition, les deux substitutions fixes puis génère les commandes d'une occurrence
**Alors** formats, exceptions, suspensions, cessions, volumes et commandes sont cohérents et la génération est idempotente
**Et** génération rejouée, solde insuffisant, occurrence incompatible, substitution impossible et concurrence ne produisent aucun doublon ni consommation anticipée.

### Story 8.12 : Exécuter la matrice appareils, clavier et assistance

En tant que responsable de l'exploitation,
je veux exécuter les sept parcours sur les surfaces et modes d'interaction cibles,
afin de disposer d'une preuve finale responsive et accessible avant production.

**Exigences couvertes :** aucune FR directe; NFR-001, NFR-002, NFR-003, NFR-010, NFR-011; UX-DR6, UX-DR11, UX-DR55, UX-DR72, UX-DR78 à UX-DR95, UX-DR100; AD-8, AD-10, AD-14, AD-19, AD-20.

**Critères d'acceptation :**

**Étant donné** les profils d'affichage de la recette
**Quand** chacun des sept parcours est exécuté
**Alors** il passe sur mobile `320–430 px`, tablette `768–1024 px` et desktop jusqu'à `1440 px`
**Et** les assertions couvrent navigation adaptée, absence de défilement horizontal, action dominante, reflow, `200 %` de texte et `400 %` de zoom sur les étapes représentatives.

**Étant donné** l'exécution au clavier
**Quand** chacun des sept parcours est parcouru sans pointeur
**Alors** toutes les opérations restent réalisables dans un ordre de focus logique et visible
**Et** sheets, dialogues, erreurs, résumés, actions fixes et retours de focus respectent leurs contrats.

**Étant donné** chaque écran stable rencontré par la suite
**Quand** l'analyse d'accessibilité automatisée est exécutée
**Alors** aucune violation bloquante de nom, rôle, état, contraste, structure, formulaire ou modalité n'est acceptée
**Et** les régions `status`, `alert`, `aria-busy` et changements de statut possèdent des assertions explicites plutôt qu'une simple capture visuelle.

**Étant donné** les limites de l'automatisation navigateur
**Quand** la recette d'assistance est constituée
**Alors** un protocole reproductible complète la suite avec VoiceOver/Safari et NVDA/Firefox ou NVDA/Chrome sur les sept parcours
**Et** version, plateforme, étapes, résultat, anomalies et preuve de correction sont consignés avant la décision de production.

**Étant donné** une date proche de minuit ou d'un changement d'heure
**Quand** un scénario utilise `aujourd'hui`, `demain`, une limite à `20:00` la veille ou une occurrence imminente
**Alors** les résultats sont vérifiés dans `Europe/Paris` avec stockage UTC et sérialisation ISO 8601 avec offset
**Et** heure inexistante, heure ambiguë et instant exact de limite produisent le résultat documenté.

**Étant donné** une exécution CI en échec
**Quand** les artefacts de diagnostic sont conservés
**Alors** trace, logs filtrés, capture et vidéo éventuelle permettent d'identifier le scénario, l'étape et la version
**Et** aucun secret, jeton brut ou donnée personnelle n'y apparaît.

**Étant donné** une suite instable ou rejouée
**Quand** un test dépend d'un délai arbitraire, d'un ordre antérieur ou d'une ressource partagée
**Alors** la vérification échoue jusqu'à suppression de cette dépendance
**Et** les attentes reposent sur des états observables, les scénarios restent indépendants et une relance ne masque pas un premier échec.

**Étant donné** une version candidate
**Quand** la gate de mise en production est évaluée
**Alors** l'ADR VPS, l'isolation des deux stacks, le déploiement du même SHA, les probes, la restauration prouvée dans `RPO <= 24 h` et `RTO <= 4 h`, les contrats de composants, la recette des écrans et les sept parcours E2E doivent tous être validés
**Et** les preuves manuelles d'assistance sont à jour, tandis que toute exception possède propriétaire, impact, échéance et décision explicite plutôt qu'une désactivation silencieuse.
