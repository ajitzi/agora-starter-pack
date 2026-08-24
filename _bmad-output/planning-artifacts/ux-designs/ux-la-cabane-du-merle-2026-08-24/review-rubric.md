# Revue de la paire de spines — La Cabane du Merle

## Verdict global

Les deux fichiers ont leurs structures canoniques et leurs sources frontmatter sont resolvables, mais la paire ne constitue pas encore un contrat UX suffisamment complet pour l'implementation. `DESIGN.md` est coherent comme base visuelle; `EXPERIENCE.md` ne couvre pas assez les parcours, les etats et les composants imposes par les sources fonctionnelles et le PRD.

## 1. Couverture des flux — broken

Verifie contre `docs/ui/ui-ux-guidelines.md.md` (parcours administration, client et AMAP) et le PRD (FR-010 a FR-083a). Les trois flux presentes sont coherents mais ne couvrent qu'un sous-ensemble des parcours operationnels exposes dans l'architecture de l'information.

### Constats

- **[high]** Les flux cles ne couvrent pas les parcours de publication, de cloture d'occurrence, de distribution, de suivi/modification d'une commande par lien securise, ni les parcours administratifs AMAP (composition, remplacements, abonnements). (`EXPERIENCE.md`, **Key Flows**, lignes 119-153; surfaces correspondantes dans **Information Architecture**, lignes 25-40). *Action corrective :* ajouter un flux a protagoniste nomme, etapes numerotees, climax et chemin d'echec pour chaque parcours source a risque, notamment publication consentie, cloture avec non-retrait, lien de suivi expire/revoque et gestion AMAP.

- **[medium]** Le flux de commande ne specifie pas les contraintes de publication active, de snapshot, de date limite ni le comportement apres preparation, pourtant requis pour le catalogue, le checkout et le suivi client. (`EXPERIENCE.md`, **Flux 2 - Commander sans compte**, lignes 133-142; `prd.md`, FR-008, FR-009, FR-031a, FR-032a, FR-034 a FR-037). *Action corrective :* completer ce flux et celui de suivi par les etats montant indicatif/final, offre non publiable, echeance, lecture seule et expiration/revocation du lien.

## 2. Completeness des tokens — thin

Les tokens references avec la syntaxe `{...}` sont resolvables dans `DESIGN.md`; les couleurs ont toutes une valeur hexadecimale. Les exigences de contraste ne sont toutefois pas transformees en cibles verifiables pour les combinaisons critiques.

### Constats

- **[medium]** Le contraste est seulement qualifie de « conforme »; aucune cible ne permet de verifier les textes d'action, badges de statut, messages d'erreur et focus. (`DESIGN.md`, **Colors**, lignes 99-104; **Components**, lignes 127-135). *Action corrective :* declarer les ratios minimaux applicables et les couples tokenises a controler, par exemple texte/action primaire, texte/surface, statut/surface et anneau de focus/surface.

## 3. Couverture des composants — broken

Verifie contre les composants listes dans les deux spines et dans `docs/ui/ui-ux-guidelines.md.md`, section 31. Chaque composant doit avoir une specification visuelle dans `DESIGN.md` et comportementale dans `EXPERIENCE.md`, sous le meme nom.

### Constats

- **[high]** La plupart des composants partages n'ont pas de specification visuelle tokenisee dans le frontmatter de `DESIGN.md`: `Screen`, `ScreenHeader`, `StickyActionBar`, `EntityCard`, `ProgressCard`, `FilterSheet` et `ConfirmDialog`; `EmptyState`, `SegmentedControl` et `ResponsivePane` n'y apparaissent pas non plus. (`DESIGN.md`, frontmatter **components**, lignes 70-89; `EXPERIENCE.md`, **Foundation**, ligne 19 et **Component Patterns**, lignes 56-69). *Action corrective :* ajouter une entree `components` et une specification visuelle par composant, ou expliciter les primitives `@project/ui` heritees et ne definir que leurs deltas.

- **[high]** Les noms divergent entre les deux contrats (`primary-action`/`card`/`status-badge` dans `DESIGN.md`, contre `StickyActionBar`/`EntityCard`/`StatusBadge` dans `EXPERIENCE.md`), et `primary-action` ainsi que `card` n'ont aucune regle comportementale homonyme. Un consommateur ne peut pas relier de maniere deterministe les deux specifications. (`DESIGN.md`, frontmatter **components**, lignes 70-89; `EXPERIENCE.md`, **Component Patterns**, lignes 56-69). *Action corrective :* adopter un vocabulaire unique, puis donner a chaque composant une entree visuelle et une entree comportementale de meme identifiant.

## 4. Couverture des etats — broken

Les patterns generiques de chargement, vide, sauvegarde, publication, erreur reseau et conflit sont utiles, mais ils ne couvrent pas les etats fonctionnels et de securite de toutes les surfaces IA.

### Constats

- **[high]** Aucun comportement UX n'est defini pour session expiree, compte desactive, acces refuse, lien de suivi invalide/expire/revoque, ni pour les occurrences annulees. Ces etats sont directement requis par les droits, l'authentification et les liens securises. (`EXPERIENCE.md`, **State Patterns**, lignes 70-81 et **Accessibility Floor**, lignes 103-110; `prd.md`, FR-044a, FR-082, FR-082a et NFR-005). *Action corrective :* ajouter des etats, messages, action de reprise et destinations de secours par surface concernee, avec protection contre toute exposition de donnees.

- **[medium]** Les etats de publication ne precisent pas le cas sans destinataire consentant, l'exclusion des desinscrits/doublons/echecs definitifs, ni le resultat partiellement echoue de campagne. (`EXPERIENCE.md`, **State Patterns**, ligne 77 et **Privacy and Trust**, lignes 112-117; `prd.md`, FR-015 a FR-019c). *Action corrective :* definir les messages, compteurs et actions de reprise pour une publication sans envoi, un envoi partiel et les echecs definitifs ou temporaires.

## 5. Couverture des references visuelles — strong

Le workspace ne contient ni `mockups/`, ni `wireframes/`, ni `imports/`; il n'existe donc aucune reference visuelle orpheline ou non reliee. La regle de precedence des spines est formulee dans `EXPERIENCE.md`.

## 6. Bloat et sur-specification — adequate

Les spines restent concentres sur des decisions reutilisables. Les listes de surfaces et de composants dans `EXPERIENCE.md` sont justifiees par leur role de contrat, sans duplication materielle des exigences sources.

## 7. Discipline d'heritage — thin

Toutes les sources declarees sont accessibles, y compris le chemin inhabituel `docs/ui/ui-ux-guidelines.md.md`. Les decisions de comportement majeures heritent correctement du PRD et des directives UI, mais la position de la V1 vis-a-vis du natif reste ambigue.

### Constats

- **[medium]** La fondation decrit une « Application web Next.js V1 », tout en presentant le monorepo comme cross-platform et en reservant des variantes `.native.tsx`; le PRD exclut explicitement l'application mobile native de la V1. (`EXPERIENCE.md`, **Foundation**, lignes 15-19 et **Responsive & Platform**, ligne 101; `prd.md`, **Explicitement hors perimetre V1**, lignes 56-64). *Action corrective :* preciser que les ecrans partages et Tamagui prepareront une evolution native, mais que les parcours et variantes V1 ciblent uniquement le web responsive, sauf decision produit contraire.

## 8. Adequation de structure — strong

`DESIGN.md` contient les tokens requis et ses huit sections sont dans l'ordre canonique. `EXPERIENCE.md` contient Foundation, Information Architecture, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor et Key Flows; la section Responsive & Platform est presente comme l'exige le contexte multi-taille. L'absence d'Inspiration & Anti-patterns est justifiee: ni les sources ni le memlog ne fournissent de produit de reference ou de rejet explicite.

## Notes mecaniques

- Sources resolues: `docs/ui/ui-ux-guidelines.md.md`, `docs/functional/document-synthese-v1.md`, `docs/architecture/architecture-v1.md`, `prd.md`, `rgpd-validation-pack.md` et `ARCHITECTURE-SPINE.md` lorsqu'il est declare dans `DESIGN.md`.
- References de tokens resolues: `{colors.action-primary}`, `{colors.action-on-primary}`, `{colors.border-subtle}`, `{colors.focus-ring}`, `{components.card}`, `{components.numeric-input}`, `{components.primary-action}`, `{rounded.*}`, `{spacing.*}` et `{typography.*}`.
- Aucun repertoire de maquettes, wireframes ou imports n'est present dans ce workspace UX.
