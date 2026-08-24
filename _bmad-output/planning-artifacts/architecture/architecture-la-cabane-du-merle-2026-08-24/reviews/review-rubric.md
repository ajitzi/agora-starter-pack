# Revue rubric - Architecture Spine

## Verdict

**A revoir avant handoff.** L'altitude initiative est juste et le spine reprend les frontieres structurantes des deux sources. Toutefois, une regle contradictoire et trois decisions indispensables aux capacites V1 restent non tranchees ou non enforceables; les implementateurs de features pourraient diverger.

## Constats

1. **Contradiction entre AD-9 et les appels internes de l'API.** Le texte impose que « toute lecture ou mutation de donnees persistantes » passe par `@project/api-client` et OpenAPI (`ARCHITECTURE-SPINE.md:99-101`), alors que le diagramme prescrit `apps/api -> domains/application` (`ARCHITECTURE-SPINE.md:190-193`) et AD-2 lie ces cas d'usage a l'API (`ARCHITECTURE-SPINE.md:40-45`). Les controllers, jobs et adapters backend ne peuvent raisonnablement pas passer par leur propre client HTTP. Restreindre AD-9 aux consumers hors `apps/api`, et expliciter le chemin interne API -> cas d'usage.

2. **Le mecanisme de travaux planifies est differe alors que la V1 en depend.** Le runner de jobs est reporte jusqu'a l'audit Odoo ou a un autre besoin asynchrone (`ARCHITECTURE-SPINE.md:216-218`), mais la generation automatique des commandes AMAP quelques jours avant l'echeance est une capacite V1 explicite (`document-synthese-v1.md:782-800`). Les notifications de publication sont egalement requises (`document-synthese-v1.md:220-234`). Decider maintenant le proprietaire, le declenchement, l'idempotence et la reprise des jobs V1; le choix du fournisseur peut rester differe.

3. **La dimension temporelle metier n'est ni decidee ni differee.** Le spine ne fixe que le format ISO 8601 aux frontieres (`ARCHITECTURE-SPINE.md:152`), sans timezone de reference, regles de recurrence, ni evaluation des deadlines. Ces choix conditionnent les occurrences de marches/tournees (`document-synthese-v1.md:490-510`, `536-550`), les limites de modification (`document-synthese-v1.md:386-402`, `804-820`) et la generation AMAP. Deux features peuvent donc calculer des dates et coupures incompatibles. Ajouter un AD ou une entree Deferred avec condition de levee.

4. **La validation serveur des entrees HTTP est omise.** AD-13 rend OpenAPI autoritatif (`ARCHITECTURE-SPINE.md:121-125`), mais ne rend pas obligatoire la validation effective des requetes avant les cas d'usage. La source d'architecture confie explicitement cette responsabilite a l'API, notamment via VineJS (`architecture-v1.md:238-249`). Decider que les schemas du contrat sont valides a la frontiere HTTP et que les controllers ne transmettent aux cas d'usage que des donnees validees; sinon les features peuvent appliquer des validations divergentes ou aucune.

## Points controles

- **Altitude : conforme.** Le scope V1 web/API, avec mobile preserve, correspond au perimetre fonctionnel (`ARCHITECTURE-SPINE.md:5-7`, `127-131`; `document-synthese-v1.md:47-58`).
- **Frontieres principales : couvertes.** Monorepo, ecrans, UI, domaine hexagonal, persistence, OpenAPI et Odoo sont bien materialises par AD-1 a AD-16.
- **Enforceabilite : partielle.** AD-10 prevoit les controles d'imports et cycles (`ARCHITECTURE-SPINE.md:103-107`), mais les decisions ci-dessus ne fournissent pas encore de garde executable ou de responsabilite unique.
- **Dimensions decidees ou differees : incomplet.** L'enveloppe operationnelle est correctement differee (`ARCHITECTURE-SPINE.md:214-220`), mais le temps metier et le traitement planifie requis par V1 ne le sont pas de facon actionnable.

## Verification

Le lint mecanique n'a pas ete execute : la commande `uv` est indisponible dans l'environnement de revue.
