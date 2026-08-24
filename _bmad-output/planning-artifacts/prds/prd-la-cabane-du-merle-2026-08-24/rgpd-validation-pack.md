---
title: Dossier de validation RGPD - La Cabane du Merle
status: draft-for-legal-review
created: 2026-08-24
source_prd: prd.md
---

# Dossier de validation RGPD

## Objet et limites

Ce dossier prepare la validation par le responsable de traitement et, si retenu, un DPO ou conseil juridique. Il ne constitue pas un avis juridique. Il reprend les decisions du PRD V1 et identifie les informations que seul l'exploitant ou son conseil peut confirmer avant mise en production.

## 1. Fiche a completer avant validation

| Element | Valeur a confirmer |
|---|---|
| Responsable de traitement | [Nom legal de l'exploitation, adresse et SIRET] |
| Contact vie privee | [Email ou adresse postale] |
| DPO, si designe | [Nom et coordonnees, ou non applicable] |
| Hebergeur | [Raison sociale, pays des donnees, contrat de sous-traitance] |
| Fournisseur d'email | [Raison sociale, pays des donnees, contrat de sous-traitance] |
| Destinataires internes | Administrateurs de l'exploitation autorises |
| Transferts hors EEE | [Aucun / description et garanties] |
| Obligations legales de conservation | [A confirmer, notamment les documents comptables hors perimetre V1] |

## 2. Registre de traitements propose

| Traitement | Personnes et donnees | Finalite | Base legale proposee | Acces | Duree proposee | Sort en fin de duree |
|---|---|---|---|---|---|---|
| Commandes classiques | Client : nom, coordonnees, lignes de commande, retrait, moyen de paiement prevu, historique | Prendre, preparer, distribuer et traiter les ajustements d'une commande | Execution de mesures precontractuelles ou du contrat | Administrateurs | 3 ans apres la derniere commande ou interaction active, sauf obligation legale applicable | Suppression ou anonymisation; conserver seulement les agregats necessaires |
| Comptes et paniers AMAP | Adherent : identite, email, compte, abonnement, paniers, suspensions, cessions et historique | Gerer l'abonnement, les paniers et leur distribution | Execution du contrat ou de l'adhesion | Administrateurs; adherent pour ses seules donnees | 3 ans apres la derniere interaction active, sauf obligation legale applicable | Suppression ou anonymisation; pseudonymisation de l'historique operationnel |
| Publications par email | Abonne : adresse email, choix de consentement, preuve, desinscription, statut de campagne | Envoyer les publications de disponibilites | Consentement | Administrateurs; fournisseur d'email en qualite de sous-traitant | Adresse utilisee tant que le consentement est actif; preuve de consentement 3 ans apres le retrait selon le PRD | Suppression de l'adresse active; conservation limitee de la preuve ou anonymisation apres la duree |
| Liens de suivi de commande | Client : jeton de lien et perimetre d'une commande | Donner l'acces individuel a une commande sans compte | Execution de mesures precontractuelles ou du contrat | Detenteur du lien; administrateurs | Expiration 30 jours apres livraison ou annulation, ou 90 jours apres creation si non livree | Revocation du jeton; conservation de l'evenement d'audit selon la duree applicable |
| Journal d'audit | Administrateurs, adherents ou clients concernes : identifiant d'acteur, horodatage, objet, action, avant/apres et motif | Securite, tracabilite et resolution des litiges operationnels | Interet legitime et, si applicable, obligation legale | Administrateurs | Pseudonymisation au terme de la duree de conservation de la donnee operationnelle liee | Suppression de la table de correspondance et conservation des agregats non identifiants |
| Demandes de droits | Demandeur : identite de verification, demande, reponse et dates | Recevoir, verifier et traiter les droits RGPD | Obligation legale | Administrateurs autorises | 3 ans apres la cloture de la demande, a confirmer par le conseil | Suppression ou anonymisation |

## 3. Decisions et controles a valider

1. Confirmer que les bases legales proposees correspondent au fonctionnement reel de l'exploitation, notamment la relation AMAP.
2. Confirmer ou ajuster chaque duree de conservation selon les obligations comptables, fiscales, contractuelles et de preuve applicables.
3. Confirmer que la pseudonymisation de l'historique est techniquement realisable et que la table de correspondance peut etre supprimee.
4. Verifier que le consentement email est distinct de la commande, libre, specifique, eclaire et retirable a tout moment.
5. Verifier les contrats de sous-traitance, les mesures de securite, la localisation des donnees et les transferts hors EEE de l'hebergeur et du fournisseur d'email.
6. Verifier si un registre complet, une AIPD ou la designation d'un DPO sont requis au regard de l'activite reelle et des prestataires retenus.

## 4. Brouillon de notice de confidentialite

### Responsable et contact

[Nom legal de l'exploitation] est responsable des traitements de donnees personnelles realises via ce site. Pour toute question ou demande relative a vos donnees : [email de contact] ou [adresse postale]. [Coordonnees du DPO, si applicable].

### Donnees et finalites

Nous traitons les coordonnees et informations de commande necessaires pour proposer, preparer et distribuer vos commandes. Pour les adherents AMAP, nous traitons egalement les informations de compte, abonnement, panier, retrait, suspension, cession et historique necessaires a la gestion de l'adhesion.

Si vous y consentez, nous utilisons votre adresse email pour vous envoyer les publications de disponibilites. Cet abonnement est facultatif et n'est pas necessaire pour commander. Vous pouvez vous desinscrire a tout moment via le lien present dans chaque email.

Nous conservons des journaux d'audit afin de securiser l'administration et d'expliquer les modifications operationnelles. Les informations de commande et de contact sont conservees pendant la duree necessaire a la relation, puis supprimees ou anonymisees selon les regles de conservation applicables.

### Bases legales et destinataires

La gestion des commandes et des paniers AMAP repose sur l'execution de mesures precontractuelles, du contrat ou de l'adhesion. Les emails de disponibilites reposent sur votre consentement. La securite et la tracabilite reposent sur notre interet legitime, sous reserve de vos droits.

Vos donnees sont accessibles uniquement aux personnes autorisees de l'exploitation et aux sous-traitants necessaires au fonctionnement du service, notamment [hebergeur] et [fournisseur d'email]. [Indiquer les transferts hors EEE et garanties, ou indiquer qu'il n'y en a pas.]

### Vos droits

Vous pouvez demander l'acces, la rectification, l'effacement, la limitation, l'opposition et, lorsque les conditions sont remplies, la portabilite de vos donnees. Contactez-nous a [email de contact]. Nous pouvons demander les informations necessaires pour verifier votre identite et repondons dans le delai legal applicable. Vous pouvez egalement introduire une reclamation aupres de la CNIL.

## 5. Procedure de traitement des demandes de droits

1. Enregistrer la demande avec sa date, le canal de reception et le droit demande.
2. Verifier l'identite de facon proportionnee; ne collecter aucune information supplementaire inutile.
3. Identifier les donnees du demandeur dans les commandes, comptes AMAP, consentements, journaux et sous-traitants.
4. Evaluer les restrictions legales ou les obligations de conservation; documenter tout refus total ou partiel.
5. Executer la rectification, l'export, l'effacement, l'anonymisation, l'opposition ou la limitation approuvee.
6. Repondre dans le delai legal applicable, fixe par le PRD a 30 jours pour le processus interne, et journaliser la reponse.
7. Fermer la demande apres controle par un administrateur different lorsque cette separation est possible.

## 6. Liste de verification des sous-traitants

Pour chaque hebergeur, prestataire d'email, sauvegarde, outil de support ou analyse ajoute en V1 :

- Nom legal, service utilise, pays de stockage et sous-traitants ulterieurs identifies.
- Accord de sous-traitance conforme, instructions documentees et clause de confidentialite.
- Mesures de securite, gestion des acces, sauvegardes, suppression et notification d'incident documentees.
- Procedure de restitution ou suppression des donnees a la fin du contrat.
- Transferer hors EEE : absence confirmee ou mecanisme de transfert et garanties documentes.

## 7. Elements a fournir au relecteur juridique

- Ce dossier et le PRD associe.
- Le nom legal de l'exploitation, ses coordonnees et le contact vie privee.
- Les contrats ou conditions de l'hebergeur et du fournisseur d'email.
- Les maquettes du formulaire de commande, du formulaire d'inscription email, de la notice et de l'email de publication.
- La liste reelle des donnees collectees par ecran et des champs optionnels.
- Les obligations comptables ou fiscales qui imposeraient des durees distinctes.

## Sources de travail

- CNIL, « RGPD : de quoi parle-t-on ? », https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on, consulte le 2026-08-24.
- CNIL, « Les droits pour maitriser vos donnees personnelles », https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles, consulte le 2026-08-24.
