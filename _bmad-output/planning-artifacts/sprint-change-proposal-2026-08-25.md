# Proposition de correction de trajectoire - readiness du sprint

## 1. Resume du probleme

Le controle de readiness du 25 aout 2026 a conclu `FAIL` malgre une couverture fonctionnelle, UX et architecturale avancee. Plusieurs stories obligeaient encore le developpeur a inventer des decisions relatives a la recurrence AMAP, aux retraits compatibles, au scheduler, a la securite des sessions et a la cloture des occurrences annulees. Des validations juridiques et d'hebergement etaient aussi interpretees comme bloquant tout developpement au lieu de la seule mise en production.

## 2. Analyse d'impact

- Epics affectes : 1, 4, 5, 6, 7 et 8.
- Stories affectees : 1.4, 1.5, 1.6, 4.13, 5.1, 5.4, 5.5, 7.1 et 8.6.
- Artefacts affectes : PRD, architecture spine, experience spine et epics.
- Aucun epic ni story n'est ajoute, retire ou renumerote.
- L'ordre des epics et le perimetre V1 restent inchanges.

## 3. Approche retenue

Approche : ajustement direct des artefacts existants.

Effort documentaire faible, risque faible a moyen. Les arbitrages reduisent l'ambiguite sans augmenter le perimetre produit. Les validations que seul l'exploitant, un conseil ou un fournisseur peut apporter restent obligatoires avant production, mais n'empechent plus l'implementation et les tests non productifs.

## 4. Changements approuves

- AMAP hebdomadaire, avance de sept jours calendaires apres livraison ou suspension; aucune nouvelle echeance avec solde nul ou abonnement inactif.
- Compatibilite AMAP explicite sur chaque mode de recuperation actif.
- Worker PostgreSQL unique, polling d'une minute maximum, verrou expirant et rattrapage des executions manquees.
- Occurrence annulee cloturable administrativement apres resolution des commandes, en restant `Annulee` avec `closedAt`.
- Cookie `SameSite=Lax`, protection CSRF et limitation non enumerable de la connexion et de la recuperation.
- Changement de role administratif explicite, audite, revocant les sessions et protegeant le dernier administrateur.
- Aucune substitution de produit pour une commande classique.
- Reinitialisation de mot de passe comme unique email transactionnel V1.
- RGPD, prestataires, hebergement et mentions reelles traites comme gates de promotion en production.

## 5. Handoff

Classification : modification moderee du backlog, sans reorganisation.

Responsable d'implementation : agent developpeur, story par story selon `sprint-status.yaml`. Le responsable de l'exploitation conserve la validation finale des donnees RGPD, prestataires et hebergement avant production.

Critere de succes : le controle de readiness ne trouve plus de decision necessaire a inventer pour implementer les epics; le suivi de sprint est genere et valide sans perte de traçabilite.

Approbation : arbitrages proposes puis explicitement approuves par l'utilisateur le 25 aout 2026.
