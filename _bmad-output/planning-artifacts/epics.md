---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
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
- **FR-041b** Lorsqu'une demande ne peut pas etre servie, l'administrateur doit pouvoir fixer une quantite reelle inferieure, nulle ou une substitution. Le client voit l'ajustement et son montant final lorsque la commande passe a `Preparee`; aucune validation client supplementaire n'est requise en V1. L'administrateur peut annuler la commande si l'ajustement ne permet pas la distribution.
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
- **Decisions differees** : trancher avant le premier endpoint l'outillage OpenAPI et les conventions d'erreur/pagination; avant deploiement le cloud, la topologie, les environnements, la residence des donnees, l'observabilite, les sauvegardes, alertes et incidents; avant le premier job le runner; avant Odoo son audit et son scope; avant traitement de donnees la classification/conservation/suppression; a l'initialisation du workspace le gestionnaire de paquets, le fournisseur CI, la matrice de tests et le versionnement des releases.
- **Regle metier transverse - disponibilites** : traiter les disponibilites comme des estimations manuelles, jamais comme un stock comptable ou une reservation; commandes, preparations, livraisons et ventes externes ne les decrementent pas automatiquement.
- **Regle metier transverse - demande non servie** : si la demande depasse l'estimation, conserver la commande comme demande a valider et laisser l'administration fixer quantite reelle, substitution ou annulation pendant la preparation, puis montrer l'ajustement au client seulement apres preparation.
- **Regle metier transverse - publication** : separer explicitement la sauvegarde du brouillon de disponibilites, la publication du snapshot et l'envoi facultatif de la campagne email; l'echec d'une campagne ne doit pas invalider une publication reussie.
- **Regle metier transverse - commandes classiques** : soumettre toute commande classique a validation manuelle et figer a la creation prix, libelles, unites, quantites demandees et montant indicatif; conserver separement quantites reelles et montant final.
- **Regle metier transverse - occurrences** : rattacher toute commande a une occurrence datee, y compris un retrait fixe; distinguer les modeles permanents des occurrences et exceptions datees et ne jamais reecrire silencieusement l'historique.
- **Regle metier transverse - AMAP** : conserver l'abonnement sur l'adherent titulaire lors d'une cession, distinguer abonnement permanent et exception datee, et garantir qu'une livraison consomme exactement une echeance de maniere tracable.
- **Regle metier transverse - cloture** : traiter la cloture comme un workflow serveur persistant qui revalide au dernier moment le statut de l'occurrence, l'absence de commande bloquante et la validite des changements de disponibilite.
- **Incoherence a trancher - FR-035a / regle transverse** : FR-035a autorise au client la modification d'une commande `A preparer` avant la limite en la ramenant a `A valider`, tandis que la regle transverse interdit toute modification ou annulation une fois la preparation commencee; definir un critere unique et testable distinguant, si necessaire, commande acceptee et preparation effectivement commencee.
- **Incoherence a trancher - FR-044 / FR-044a** : FR-044 qualifie de selectable une occurrence `Prevue`, `Terminee` ou `Annulee`, tandis que FR-044a limite la selection a une occurrence `Prevue` avant sa date limite; confirmer FR-044a comme filtre operationnel ou reformuler FR-044.
- **Decision produit - exception a FR-019** : l'email contenant un lien de reinitialisation de mot de passe est autorise en V1 comme unique email transactionnel; les autres emails transactionnels, rappels et notifications de statut restent interdits.
- **Decision produit - gestion du consentement sans compte** : chaque email de publication contient un lien individuel permettant de consulter l'etat du consentement et de se desinscrire; apres retrait, une nouvelle inscription passe par le formulaire public et cree un nouvel evenement de consentement.
- **Question ouverte PRD 1** : avant mise en production, le responsable de traitement doit confirmer que les durees de conservation et les mentions de confidentialite sont adaptees aux obligations legales applicables.
- **Question ouverte PRD 2** : definir la propagation V1 des modifications d'un marche ou d'une tournee vers les occurrences futures existantes, soit toujours independantes, soit mises a jour seulement si non personnalisees et apres confirmation explicite.
- **Question ouverte PRD 3** : confirmer si la limite de deux substitutions et la date limite portee par l'abonnement admettent des exceptions par semaine.
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
- **UX-DR40** Concevoir la preparation sequentielle pour saisir quantites reelles, substitutions, montant et remarque sans retour a la liste, puis enchaîner vers livraison ou cloture.
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
- **FR-036** : Epic 4 - paramétrage de la date limite de modification.
- **FR-037** : Epic 4 - lecture seule client après la date limite.
- **FR-038** : Epic 4 - traitement d'une commande préparée non récupérée.
- **FR-039** : Epic 4 - traçabilité du report de récupération.
- **FR-040** : Epic 4 - retour en préparation après report.
- **FR-041** : Epic 4 - gestion de la fiche contact et de son historique.
- **FR-041a** : Epic 4 - audit des modifications selon la date limite.
- **FR-041b** : Epic 4 - gestion des quantités non servies et substitutions.
- **FR-042** : Epic 3 - gestion des modes de récupération.
- **FR-043** : Epic 3 - typage fonctionnel des modes de récupération.
- **FR-044** : Epic 3 - rattachement des sélections à des occurrences datées.
- **FR-044a** : Epic 3 - définition et sélection des occurrences prévues.
- **FR-044b** : Epic 3 - création, récurrence et cycle de vie des occurrences.
- **FR-045** : Epic 3 - gestion des informations d'un marché récurrent.
- **FR-046** : Epic 3 - distinction entre marché récurrent et occurrences.
- **FR-047** : Epic 3 - rattachement des commandes à une occurrence de marché.
- **FR-048** : Epic 3 - gestion ordonnée des tournées et passages.
- **FR-049** : Epic 3 - distinction entre tournée récurrente et occurrences.
- **FR-050** : Epic 3 - rattachement des livraisons à une occurrence de tournée.
- **FR-051** : Epic 4 - priorisation des actions du jour et du lendemain.
- **FR-052** : Epic 4 - visibilité des files de commandes et occurrences imminentes.
- **FR-053** : Epic 4 - signalement des nouveautés et disponibilités anciennes.
- **FR-054** : Epic 4 - traitement séquentiel avec progression.
- **FR-055** : Epic 4 - accès direct aux actions opérationnelles de commande.
- **FR-056** : Epic 4 - agrégation des quantités à préparer par occurrence.
- **FR-057** : Epic 4 - distinction entre paniers AMAP et compléments.
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

**FR couvertes :** FR-042, FR-043, FR-044, FR-044a, FR-044b, FR-045, FR-046, FR-047, FR-048, FR-049, FR-050.

**Notes d'implémentation/UX :** distinguer visuellement et techniquement les modèles permanents des occurrences datées, calculer les limites dans `Europe/Paris` et ne proposer à la commande que les occurrences `Prévue` encore ouvertes. Prévoir une réorganisation de tournée utilisable sans glisser-déposer.

### Epic 4 : Traiter une commande classique de bout en bout

**Objectif utilisateur :** permettre au client de commander et suivre sans compte, et à l'administrateur de valider, préparer, ajuster, livrer, reporter ou annuler chaque commande jusqu'à la clôture de l'occurrence.

**FR couvertes :** FR-009, FR-020, FR-021, FR-022, FR-023, FR-024, FR-025, FR-026, FR-027, FR-028, FR-029, FR-030, FR-031, FR-031a, FR-032, FR-032a, FR-033, FR-034, FR-035, FR-035a, FR-036, FR-037, FR-038, FR-039, FR-040, FR-041, FR-041a, FR-041b, FR-051, FR-052, FR-053, FR-054, FR-055, FR-056, FR-057, FR-058, FR-059, FR-059a, FR-081.

**Notes d'implémentation/UX :** figer les données commerciales à la création, séparer montant indicatif et montant final et sécuriser le suivi par un jeton limité à une commande. Optimiser les vues `Aujourd'hui`, validation et préparation pour le traitement séquentiel; rendre la clôture persistante, guidée et revalidée côté serveur.

### Epic 5 : Administrer et générer les paniers AMAP

**Objectif utilisateur :** permettre à l'administrateur de gérer les adhérents, abonnements, compositions et remplacements, puis de générer et traiter des commandes AMAP cohérentes et idempotentes.

**FR couvertes :** FR-060, FR-060a, FR-061, FR-062, FR-063, FR-063a, FR-064, FR-065, FR-067a, FR-068, FR-068a, FR-068b, FR-069, FR-070, FR-076, FR-077, FR-078a, FR-078b.

**Notes d'implémentation/UX :** distinguer abonnement permanent, échéance, exception datée et commande générée; figer les données à la génération et garantir l'idempotence par abonnement et occurrence. Protéger les transitions et la consommation du solde par des transactions et contre-écritures auditables.

### Epic 6 : Gérer son prochain panier AMAP

**Objectif utilisateur :** permettre à l'adhérent de consulter son prochain panier et son historique, puis d'effectuer avant échéance les changements autorisés sur cette seule livraison.

**FR couvertes :** FR-066, FR-067, FR-071, FR-072, FR-073, FR-074, FR-075, FR-075a, FR-078.

**Notes d'implémentation/UX :** centrer l'espace adhérent sur le prochain panier, sa date limite et son solde. Présenter suspension, cession, changement de retrait et substitutions comme des actions distinctes, afficher immédiatement leur effet et passer en lecture seule après échéance.

### Epic 7 : Maîtriser le cycle de vie des données personnelles

**Objectif utilisateur :** permettre à l'exploitation de conserver les historiques nécessaires tout en appliquant les durées, demandes de droits, suppressions, anonymisations et obligations de preuve appropriées.

**FR couvertes :** FR-079.

**Notes d'implémentation/UX :** définir une politique exécutable de conservation et de pseudonymisation qui préserve les agrégats et obligations légales. Fournir aux administrateurs un processus traçable pour l'accès, la rectification, l'export et l'effacement, sans exposer de données personnelles inutiles.

### Dépendances naturelles

- L'Epic 1 fournit l'authentification, l'autorisation et l'audit transverses nécessaires aux Epics 2 à 7.
- L'Epic 2 fournit les produits, disponibilités et snapshots d'offre consommés par les commandes classiques et les compositions AMAP.
- L'Epic 3 fournit les occurrences datées requises par les Epics 4, 5 et 6.
- L'Epic 4 s'appuie sur les Epics 1 à 3 pour le parcours complet, mais ses capacités de traitement et de clôture servent aussi les commandes AMAP.
- L'Epic 5 fournit les abonnements, compositions, échéances et commandes générées utilisés par l'Epic 6.
- L'Epic 7 est transverse et doit être appliqué aux données et historiques produits par tous les autres epics.

## Epic 1 : Accéder à l'exploitation en sécurité

Permettre aux administrateurs et aux adhérents AMAP d'accéder uniquement aux données et actions correspondant à leur rôle, avec des comptes, sessions et actions sensibles maîtrisés.

### Story 1.1 : Initialiser un socle web et API déployable

En tant que maraîcher administrateur,
je veux disposer d'une application web responsive reliée à une API vérifiable,
afin de pouvoir accéder à un socle fiable sur lequel les fonctions opérationnelles seront livrées.

**Critères d'acceptation :**

**Étant donné** le dépôt du projet avant initialisation
**Quand** le workspace est installé avec `pnpm`
**Alors** un unique `pnpm-lock.yaml` racine fait autorité
**Et** les manifests épinglent Node.js `24.0.0`, Next.js `16.3.2`, AdonisJS `7.5.0`, Lucid `22.4.2`, OpenAPI `3.1.2` et Tamagui `2.7.7`.

**Étant donné** le structural seed défini par l'architecture
**Quand** l'arborescence du workspace est inspectée
**Alors** elle contient `apps/web`, `apps/api`, `apps/api/openapi`, `apps/api/app/adapters`, `packages/screens`, `packages/domains`, `packages/ui`, `packages/api-client`, `packages/core`, `packages/config`, `packages/testing` et `infra`
**Et** elle ne contient pas d'`apps/mobile` déployable en V1.

**Étant donné** les frontières architecturales du projet
**Quand** les contrôles locaux sont exécutés
**Alors** ils refusent les imports profonds, cycles et directions interdites entre packages
**Et** seul `packages/ui` importe directement Tamagui, tandis que les routes Next.js restent minces et que `packages/screens` n'importe aucun routeur.

**Étant donné** le shell web initial
**Quand** il est ouvert entre `320 px` et `1440 px`, au clavier ou avec une technologie d'assistance
**Alors** il affiche un unique `main`, une hiérarchie de titres valide, un lien « Aller au contenu » visible au focus et aucun défilement horizontal
**Et** le contenu reste utilisable à `200 %` de taille de texte et `400 %` de zoom.

**Étant donné** la configuration de `@project/ui`
**Quand** le shell est rendu
**Alors** les couleurs, typographies, espacements, rayons et indicateurs de focus de `UX-DR1` à `UX-DR14` proviennent exclusivement des tokens centralisés
**Et** aucune valeur visuelle locale divergente n'est introduite dans l'écran.

**Étant donné** l'API AdonisJS initialisée
**Quand** son endpoint de santé documenté est appelé
**Alors** il retourne une réponse versionnée conforme au contrat OpenAPI `3.1.2` appartenant à `apps/api`
**Et** un test de conformité vérifie l'accord entre le contrat, l'endpoint et `@project/api-client`.

**Étant donné** les applications `web` et `api`
**Quand** les commandes de build sont exécutées séparément
**Alors** chaque application produit son propre artefact
**Et** les secrets et configurations runtime restent fournis par l'environnement, sans être intégrés aux packages partagés ni aux artefacts.

**Étant donné** une branche ou une pull request GitHub
**Quand** le workflow GitHub Actions s'exécute avec Node.js `24.0.0` et `pnpm` en mode lockfile figé
**Alors** il vérifie installation, types, lint, frontières d'import, absence de cycles, tests, conformité OpenAPI et builds
**Et** une vérification en échec bloque l'intégration.

**Étant donné** que cette story initialise uniquement le socle
**Quand** les migrations et modèles sont inspectés
**Alors** aucune table métier anticipant les futurs epics n'a été créée
**Et** la story fonctionne et se vérifie sans dépendre d'une story ultérieure.

### Story 1.2 : Se connecter avec email et mot de passe

En tant qu'administrateur ou adhérent AMAP,
je veux me connecter avec mon adresse email et mon mot de passe,
afin d'accéder à l'espace correspondant à mon rôle.

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
**Quand** la Story 1.2 est testée seule après la Story 1.1
**Alors** un administrateur provisionné et un adhérent de test peuvent chacun se connecter, atteindre leur shell et se déconnecter
**Et** la story ne dépend d'aucune story future pour fournir ce parcours complet.

### Story 1.3 : Réinitialiser son mot de passe par email

En tant qu'administrateur ou adhérent AMAP,
je veux recevoir un lien de réinitialisation à usage unique,
afin de retrouver l'accès à mon espace sans intervention manuelle.

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

### Story 1.4 : Administrer les comptes et les sessions

En tant qu'administrateur,
je veux créer, désactiver ou réactiver des comptes et révoquer leurs sessions,
afin de maîtriser qui peut accéder à l'exploitation.

**Critères d'acceptation :**

**Étant donné** un administrateur authentifié
**Quand** il ouvre la gestion des comptes
**Alors** il voit uniquement les informations nécessaires : identité, email, rôle, état, dernière activité et nombre de sessions actives
**Et** les mots de passe, condensats, jetons et identifiants de session ne sont jamais affichés.

**Étant donné** une adresse email non utilisée et un rôle autorisé
**Quand** l'administrateur crée un compte
**Alors** le compte est créé sans mot de passe exploitable et avec une version initiale
**Et** le parcours de réinitialisation approuvé en Story 1.3 envoie le lien à usage unique permettant de définir le premier mot de passe.

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

### Story 1.5 : Appliquer les rôles et le cloisonnement des données

En tant qu'utilisateur authentifié,
je veux que chaque action et donnée soit limitée à mon rôle et à mon identité,
afin qu'aucune personne ne puisse accéder à un périmètre qui ne lui appartient pas.

**Critères d'acceptation :**

**Étant donné** une route ou opération API protégée
**Quand** aucune politique d'autorisation explicite n'est déclarée
**Alors** l'accès est refusé par défaut
**Et** masquer un contrôle dans l'interface ne remplace jamais la vérification côté API.

**Étant donné** un administrateur actif
**Quand** il appelle les opérations de gestion des comptes et sessions livrées en Story 1.4
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
**Et** l'absence de cette déclaration est détectée par les contrôles automatisés, sans que la Story 1.5 dépende de ce futur domaine pour fonctionner.

### Story 1.6 : Auditer et consulter les actions de sécurité

En tant qu'administrateur,
je veux consulter un journal immuable des actions sensibles,
afin de comprendre qui a modifié l'accès à l'exploitation et quand.

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

**Étant donné** les six stories de l'Epic 1
**Quand** leur suite d'acceptation est exécutée
**Alors** authentification, réinitialisation, comptes, sessions, autorisation et audit fonctionnent sans dépendre d'un epic futur
**Et** les cinq FR de l'Epic 1 sont couvertes, les futurs epics n'ayant plus qu'à brancher leurs propres actions métier sur les contrats d'autorisation et d'audit.

## Epic 2 : Maintenir et publier une offre fiable

Permettre au maraîcher de maintenir produits et disponibilités estimées, publier une offre publique immuable et informer facultativement les personnes consentantes.

### Story 2.1 : Gérer le catalogue de produits

En tant que maraîcher administrateur,
je veux créer, modifier, activer et désactiver mes produits,
afin de maintenir un catalogue fiable sans altérer les usages historiques.

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
**Alors** une confirmation est affichée immédiatement à l'écran
**Et** aucun email de double opt-in, de bienvenue ou de gestion dédié n'est envoyé en V1.

**Étant donné** le lien individuel inclus dans un futur email de publication
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
