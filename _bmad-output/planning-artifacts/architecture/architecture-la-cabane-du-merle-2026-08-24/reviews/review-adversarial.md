# Verdict

NON VALIDE : les AD bornent les dependances mais ne definissent pas les protocoles qui rendent les unites conformes interoperables et exploitables.

# Principaux constats

1. **Mutations concurrentes sans protocole de coherence - `ARCHITECTURE-SPINE.md:85-89,97-102,151-152`** : un cas d'usage `AccepterCommande` et un autre `ModifierCommande` peuvent chacun passer par OpenAPI, repository et snapshot, tout en ecrasant l'etat ou en appliquant deux fois une transition. Exiger une machine d'etats par aggregate, une frontiere transactionnelle, un verrouillage/version de concurrence et des cles d'idempotence pour chaque commande mutante.

2. **Jetons de lien non securises comme capacites - `ARCHITECTURE-SPINE.md:133-137,151-154`** : opacite, expiration et restriction sont imposees, mais ni stockage hache, ni consommation atomique, revocation, limitation de tentatives, non-journalisation, ni correspondance explicite entre actions du jeton et `securitySchemes` OpenAPI ne le sont. Deux adapteurs conformes peuvent donc accepter un jeton rejoue ou exposer sa capacite dans URL, logs ou erreurs.

3. **Contrat OpenAPI sans gouvernance de forme ni compatibilite operationnelle - `ARCHITECTURE-SPINE.md:97-102,121-125,151-154`** : la source de verite et le client derive sont prescrits, pas les regles communes de nommage, enveloppe d'erreur, pagination, champs optionnels/nullables, format monetaire, semantique des dates, ni politique de deprecation/versionnement. Des domaines independants peuvent publier des schemas valides mais incompatibles pour les ecrans et le client partage.

4. **Integration Odoo relancable sans garantie de livraison - `ARCHITECTURE-SPINE.md:85-89,139-143,210-218`** : un adaptateur asynchrone relancable et une transaction Lucid peuvent etre conformes tout en perdant un envoi apres commit, ou en creant un doublon apres timeout. Definir des messages d'integration versionnes, une outbox transactionnelle, un identifiant d'idempotence et une cle de mapping stable, puis choisir/posseder le runner avant le premier flux externe.

5. **Responsabilites d'exploitation contradictoires/incompletes - `ARCHITECTURE-SPINE.md:109-113,210-220`** : `apps/api` possede migrations et jobs, tandis que le runner, observabilite, sauvegardes, alertes et topologie sont reportes. Une unite de deploiement peut donc lancer deux workers, appliquer des migrations incompatibles au rollback, ou n'offrir aucun signal de restauration. Fixer desormais l'unique executant, le verrou de migration, les probes, les objectifs de backup/restore et les conditions de promotion/retour arriere.
