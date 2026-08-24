---
name: La Cabane du Merle
description: Systeme visuel operationnel, mobile-first, pour la gestion et la commande de legumes biologiques.
status: final
sources:
  - docs/ui/ui-ux-guidelines.md.md
  - docs/functional/document-synthese-v1.md
  - docs/architecture/architecture-v1.md
  - _bmad-output/planning-artifacts/prds/prd-la-cabane-du-merle-2026-08-24/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-la-cabane-du-merle-2026-08-24/ARCHITECTURE-SPINE.md
updated: 2026-08-24
colors:
  surface-base: '#F7F6F1'
  surface-raised: '#FFFFFF'
  surface-subtle: '#ECEBE3'
  ink-primary: '#1D2A1F'
  ink-secondary: '#536055'
  ink-disabled: '#8A928B'
  border-subtle: '#D7D9D1'
  action-primary: '#285B35'
  action-primary-pressed: '#1D4728'
  action-on-primary: '#FFFFFF'
  status-success: '#216E39'
  status-warning: '#8A5A00'
  status-danger: '#A9362A'
  status-info: '#245D85'
  focus-ring: '#245D85'
  focus-on-primary: '#FFFFFF'
typography:
  display:
    fontFamily: 'System UI'
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  title:
    fontFamily: 'System UI'
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  section:
    fontFamily: 'System UI'
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  body:
    fontFamily: 'System UI'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  meta:
    fontFamily: 'System UI'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '7': 48px
  gutter-mobile: 16px
  gutter-wide: 24px
components:
  primary-action:
    background: '{colors.action-primary}'
    color: '{colors.action-on-primary}'
    radius: '{rounded.md}'
    minHeight: 48px
  card:
    background: '{colors.surface-raised}'
    border: '{colors.border-subtle}'
    radius: '{rounded.md}'
    padding: '{spacing.4}'
  status-badge:
    radius: '{rounded.full}'
    padding-inline: '{spacing.2}'
    padding-block: '{spacing.1}'
  numeric-input:
    minHeight: 48px
    radius: '{rounded.sm}'
    focus: '{colors.focus-ring}'
  Screen:
    background: '{colors.surface-base}'
    gutter: '{spacing.gutter-mobile}'
  ScreenHeader:
    title: '{typography.display}'
  StickyActionBar:
    background: '{colors.surface-raised}'
    border: '{colors.border-subtle}'
    action: '{components.primary-action}'
  EntityCard:
    surface: '{components.card}'
  StatusBadge:
    surface: '{components.status-badge}'
  ProgressCard:
    surface: '{components.card}'
  EmptyState:
    padding: '{spacing.5}'
  FilterSheet:
    background: '{colors.surface-raised}'
    radius: '{rounded.lg}'
  ConfirmDialog:
    background: '{colors.surface-raised}'
    radius: '{rounded.lg}'
  NumericInput:
    surface: '{components.numeric-input}'
  SegmentedControl:
    radius: '{rounded.sm}'
  ResponsivePane:
    gap: '{spacing.5}'
---

## Brand & Style

La Cabane du Merle est un outil de terrain, pas un back-office dense. La hierarchie visuelle met la prochaine action operationnelle avant les donnees secondaires, avec des ecrans calmes, lisibles a l'exterieur et utilisables d'une main. Les surfaces doivent inspirer le soin artisanal et la fiabilite, sans folklore rural ni codes e-commerce generiques.

**[ASSUMPTION]** La palette vegetale, la neutralite chaude et la typographie systeme sont une base de travail en l'absence de charte de marque. Elles doivent etre confirmees ou remplacees par les actifs de marque avant implementation definitive.

## Colors

- `surface-base` et `surface-raised` organisent une lecture longue sans blancs agressifs; les cartes sont reservees aux unites de travail actionnables.
- `ink-primary` porte les informations critiques; `ink-secondary` les dates, volumes, complements et historiques.
- `action-primary` est exclusivement reserve a l'action dominante de l'ecran: `{components.primary-action}`. Il ne sert pas a decorer les badges ou les icones.
- Les couleurs de statut accompagnent toujours un libelle ou une icone explicite. Elles ne sont jamais le seul indice d'etat.
- `status-danger` distingue un risque ou une action destructive, qui reste secondaire a l'action de continuation.
- Contraste: texte normal sur `surface-base` et `surface-raised` >= 4.5:1; texte large >= 3:1; composants graphiques, bordures actives et focus >= 3:1 contre leurs couleurs adjacentes. `ink-disabled` est reserve aux controles reellement indisponibles.

## Typography

La typographie systeme privilegie la disponibilite, le rendu natif et la lisibilite en mouvement. `{typography.display}` est reservee au titre de l'ecran; `{typography.title}` aux entites et decisions de premier niveau; `{typography.section}` aux regroupements operationnels; `{typography.body}` aux informations de travail et `{typography.meta}` au contexte.

Les montants, quantites et heures restent lisibles en chiffres tabulaires lorsque Tamagui ou la police disponible le permet. Aucun texte ne doit etre transforme en image. La mise a l'echelle de texte et les preferences de la plateforme ne doivent pas tronquer les controles.

## Layout & Spacing

La grille utilise `{spacing.1}` comme unite. Mobile: une colonne, marges `{spacing.gutter-mobile}`, information decisive en tete et action dominante protegee par une zone fixe. Tablette: une ou deux colonnes selon la tache; les workflows de preparation et de validation peuvent afficher le contexte en regard. Desktop: marges `{spacing.gutter-wide}`, sidebar et master/detail uniquement lorsqu'ils reduisent les allers-retours.

Chaque ecran reserve l'espace necessaire a la `StickyActionBar`; le contenu ne doit jamais passer sous cette action. Les tableaux sont une option de densite pour tablette paysage et desktop, jamais le modele impose sur mobile.

## Elevation & Depth

La profondeur est tonale: fond de page, surface de carte, puis sheet ou dialogue. Les ombres sont discretes et seulement appliquees aux surfaces temporairement au-dessus du contenu, notamment `FilterSheet` et `ConfirmDialog`. Ne pas utiliser l'elevation pour compenser une hierarchie de contenu insuffisante.

## Shapes

Les champs et controles compacts utilisent `{rounded.sm}`. Les cartes, actions principales, sheets et dialogues utilisent `{rounded.md}` ou `{rounded.lg}` selon leur taille. `{rounded.full}` est limite aux badges de statut et petits controles segmentes; pas de cartes en pilule.

## Components

- **Screen**: surface `{colors.surface-base}`, gutters responsives et aire de defilement; gere les safe areas et la reserve pour les actions fixes.
- **ScreenHeader**: titre en `{typography.display}`; contexte bref et actions secondaires sans concurrencer l'action dominante.
- **StickyActionBar**: fond `{colors.surface-raised}`, separation `{colors.border-subtle}`, action primaire pleine largeur sur mobile. Sur desktop elle devient une zone d'action contextuelle.
- **EntityCard**: `{components.card}`; un seul point d'entree tappable, avec nom, contexte de retrait, horaire, statut et volume dans cet ordre lorsque pertinent.
- **StatusBadge**: texte d'etat obligatoire, couleur semantique d'appoint et contraste conforme. Ne jamais reduire le statut a un point colore.
- **ProgressCard**: progression explicite sous la forme `5 / 7 preparees`, jamais seulement une jauge sans texte.
- **FilterSheet**: feuille mobile depuis le bas; groupes de filtres lisibles; action `Appliquer` prioritaire et `Reinitialiser` secondaire.
- **NumericInput**: `{components.numeric-input}`, unite toujours visible, clavier numerique, boutons `+` et `-` lorsque la granularite est connue.
- **ConfirmDialog**: reserve aux effets irreversibles, avec titre consequence, detail concis, action destructive distincte et option de retour.
- **EmptyState**, **SegmentedControl** et **ResponsivePane** heritent des primitives Tamagui via leurs tokens homonymes; aucune variante visuelle ad hoc dans les ecrans.

Le focus sur une action primaire combine un anneau externe `{colors.focus-on-primary}` et un decalage visible; il reste discernable de `{colors.action-primary}`. Les etats ne doivent pas seulement modifier la couleur.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Montrer d'abord la prochaine action et son contexte | Transformer `Aujourd'hui` en dashboard de statistiques |
| Utiliser les cartes pour les unites de travail mobiles | Compresser un tableau desktop sur telephone |
| Rendre la sauvegarde et la publication visuellement distinctes | Faire croire qu'une modification est deja publiee |
| Donner aux actions tactiles une hauteur minimale de 48 px | Utiliser de petits controles iconographiques sans libelle |
| Employer couleur, texte et symbole pour les statuts | Encoder les statuts par la seule couleur |
| Rester sobre dans l'imagerie et l'ornement | Ajouter des motifs rustiques ou de la decoration concurrente |
