---
name: La Cabane du Merle
status: final
sources:
  - docs/ui/ui-ux-guidelines.md.md
  - docs/functional/document-synthese-v1.md
  - docs/architecture/architecture-v1.md
  - _bmad-output/planning-artifacts/prds/prd-la-cabane-du-merle-2026-08-24/prd.md
  - _bmad-output/planning-artifacts/prds/prd-la-cabane-du-merle-2026-08-24/rgpd-validation-pack.md
  - docs/ui/admin/*.md
  - docs/ui/customer/*.md
  - docs/ui/amap/*.md
  - docs/ui/auth/*.md
updated: 2026-08-25
---

# La Cabane du Merle - Experience Spine

## Foundation

Application web Next.js V1, concue avec Tamagui dans un monorepo qui prepare une evolution cross-platform. Les parcours et variantes V1 ciblent exclusivement le web responsive; une application native reste hors perimetre. L'administration est mobile-first pour un usage de terrain; tablette et desktop enrichissent le contexte sans introduire un nouveau modele mental. `DESIGN.md` est la reference d'identite visuelle; ce document definit les comportements.

Le systeme UI est `@project/ui`: `Screen`, `ScreenHeader`, `StickyActionBar`, `EntityCard`, `StatusBadge`, `ProgressCard`, `EmptyState`, `FilterSheet`, `ConfirmDialog`, `NumericInput`, `SegmentedControl` et `ResponsivePane`. Les ecrans partages restent dans `packages/screens`; les adaptations passent par Tamagui avant toute variante de plateforme.

## Information Architecture

| Surface | Atteinte depuis | But |
|---|---|---|
| Aujourd'hui | Ouverture administration | Repondre a `Que dois-je faire maintenant ?` |
| Commandes | Navigation admin | Filtrer, consulter et traiter les commandes |
| Validation de commandes | File `A valider` | Accepter ou ajuster une serie sans retour a la liste |
| Preparer | Navigation admin | Choisir une occurrence a preparer |
| Preparation d'une occurrence | Liste de preparation | Voir les besoins globaux et l'etat des commandes |
| Preparation sequentielle | `Continuer la preparation` | Enregistrer quantites reelles, exceptions et montants |
| Disponibilites | Navigation admin | Modifier rapidement l'offre sans la publier |
| Publier les disponibilites | Changements non publies | Verifier les changements, message et canaux avant publication |
| Distribution | `Plus` / sidebar | Consulter le planning, les marches et les tournees |
| Cloture d'activite | Occurrence en cours | Resoudre les non-retraits, disponibilites et publication |
| AMAP administrateur | `Plus` / sidebar | Gerer semaine, abonnements, paniers et exceptions |
| Produits, clients, publications, parametres | `Plus` / sidebar | Fonctions de gestion secondaires |
| Catalogue client | Offre publique | Composer une commande sans compte |
| Checkout client | Panier client | Confirmer produits, retrait, coordonnees et paiement prevu |
| Suivi de commande | Lien securise | Voir, modifier ou annuler dans les limites autorisees |
| Espace adherent AMAP | Connexion adherent | Gerer le prochain panier et consulter l'historique |

Navigation admin mobile: `Aujourd'hui`, `Commandes`, `Preparer`, `Dispos`, `Plus`. En tablette paysage et desktop, la meme hierarchie devient une sidebar, avec les libelles developpes `Preparation` et `Disponibilites`. Une surface secondaire ne doit jamais retirer les quatre operations frequentes de l'acces direct.

`Marche` et `Tournee` sont des modeles recurrents; leurs occurrences datees portent l'execution quotidienne et la cloture. La configuration de la ferme, des commandes, des notifications, de l'AMAP et des lieux de recuperation est secondaire et ne se mele pas aux flux operationnels. Un produit `Actif` ou `Inactif` est distinct de sa disponibilite courante: l'inactivation remplace la suppression et preserve les snapshots historiques.

References visuelles P0: [`mockups/key-admin-today.html`](mockups/key-admin-today.html), [`key-admin-order-list.html`](mockups/key-admin-order-list.html), [`key-admin-order-details.html`](mockups/key-admin-order-details.html), [`key-admin-order-validation.html`](mockups/key-admin-order-validation.html), [`key-admin-preparation.html`](mockups/key-admin-preparation.html), [`key-admin-preparation-run.html`](mockups/key-admin-preparation-run.html), [`key-admin-availability.html`](mockups/key-admin-availability.html), [`key-admin-publish-availability.html`](mockups/key-admin-publish-availability.html), [`key-customer-catalog.html`](mockups/key-customer-catalog.html), [`key-customer-checkout.html`](mockups/key-customer-checkout.html), [`key-customer-order-details.html`](mockups/key-customer-order-details.html), [`key-amap-home.html`](mockups/key-amap-home.html) et [`key-amap-basket.html`](mockups/key-amap-basket.html). Les spines prevalaient sur ces illustrations en cas de conflit.

## Voice and Tone

Microcopy directe, concrete et situee dans le temps. La voix de marque est dans `DESIGN.md`.

| Faire | Eviter |
|---|---|
| `5 commandes a valider` | `Vous avez des elements en attente` |
| `Modifications enregistrees. 7 changements non publies.` | `Mise a jour reussie` |
| `Cette commande a ete modifiee depuis son ouverture.` | `Conflit` |
| `Aucune commande a preparer aujourd'hui. Prochaine activite: Marche Saint-Pierre, samedi a 8 h.` | `Aucune donnee.` |
| `Montant indicatif` avant preparation | Presenter un montant provisoire comme definitif |

## Component Patterns

| Composant | Usage | Regles comportementales |
|---|---|---|
| `Screen` | Toute surface | Defilement, safe areas et espace pour `{components.primary-action}`. |
| `StickyActionBar` | Action critique mobile | Toujours visible apres lecture du contenu; une seule action dominante. |
| `EntityCard` | Commande, activite, abonnement, produit | Toute la carte ouvre le detail; ordre: nom, retrait, horaire, statut, volume. |
| `StatusBadge` | Etat de commande ou disponibilite | Libelle obligatoire; annonce le changement de statut. |
| `FilterSheet` | Filtres avances | Mobile: sheet bas. `Appliquer` conserve les choix; `Reinitialiser` les efface explicitement. |
| `NumericInput` | Poids, quantite, prix, nombre | Unites visibles, clavier numerique, calcul immediat; valeurs invalides expliquees au champ. |
| `SegmentedControl` | Disponibilite et vues | Options mutuellement exclusives, libelles complets, etat selectionne expose aux lecteurs d'ecran. |
| `ResponsivePane` | Tablette/desktop | Master/detail seulement si les deux panneaux evitent un aller-retour operationnel. |
| Reorganisation de tournee | Edition de tournee | Drag and drop optionnel; boutons explicites Monter/Descendre obligatoires. |
| OccurrenceCard | Distribution, preparation, cloture | Affiche type, horaire, progression et statut d'occurrence; ouvre l'execution datee, jamais le modele recurrent. |
| AvailabilityStatusControl | Disponibilites | Modifie l'etat sans publier; expose `non enregistre`, `enregistre`, `non publie` et conflit. |
| PublicationDiff | Revue de publication | Compare brouillon versionne et dernier snapshot publie; tout apercu perime impose le rechargement. |
| AmapExceptionEditor | Semaine AMAP | Edite une exception datee, jamais l'abonnement permanent; indique titulaire et beneficiaire lors d'une cession. |
| ClosingSummary | Cloture | Resume les quatre etapes, les decisions confirmees et les elements encore bloquants. |

## State Patterns

| Etat | Traitement |
|---|---|
| Chargement | Skeleton qui preserve la structure de l'ecran; aucune action critique avant etat fiable. |
| Vide | Explication actionnable, prochaine etape et lien ou action lorsque disponible. |
| Sauvegarde | Feedback immediat `Modifications enregistrees`; distinguer visuellement des changements publies. |
| Publication | Ecran de revue complet; confirmer le nombre de changements et les destinataires consentants avant `Publier maintenant`. |
| Publication concurrente | La revue affiche horodatage et version du brouillon. `Publier maintenant` publie cette version atomiquement; si elle change, bloquer, annoncer l'ecart et proposer `Recharger la revue`. Apres succes, afficher heure/identifiant et remettre a zero seulement les changements de cette version. |
| Campagne de publication | Sans destinataire consentant, publier sans envoi et le dire. Compter les exclus (desinscrits, doublons, echecs definitifs); pour un envoi partiel, afficher le resultat et une reprise des echecs temporaires sans renvoyer aux destinataires deja traites. |
| Erreur reseau | Distinguer `Non envoyee`, `Verification en cours` et `Echec confirme`. Conserver le formulaire, verifier l'etat serveur et reessayer avec un identifiant de mutation; aucun renvoi aveugle. |
| Conflit | Informer qu'une commande a change, proposer `Voir la nouvelle version`, empecher l'ecrasement. |
| Etat destructif | `ConfirmDialog` avec consequence, action secondaire visuellement distincte et trace si requis. |
| Limite depassee | Rendre lecture seule l'action client; dire la date limite et le prochain canal de contact. |
| Lien de suivi | Lien invalide, expire, revoque ou remplace: ne divulguer aucune donnee et orienter vers le canal de contact de l'exploitation. L'administration peut regenerer un lien, ce qui revoque le precedent; le jeton n'est jamais affiche dans l'historique ou l'interface. |
| Acces | Session expiree, compte desactive, acces refuse ou occurrence annulee: expliquer l'etat sans exposer de donnees, proposer la connexion ou le retour autorise. |

Toute mutation envoie l'`expectedVersion` de l'entite affichee. Si la version est obsolete, l'apercu est marque perime, aucune ecriture n'est faite, l'etat courant est recharge et les choix non soumis sont conserves lorsque cela est possible.

## Interaction Primitives

- Taper agit; chaque `EntityCard` tappable est une cible unique et explicite.
- Tous les controles ont une cible reelle d'au moins 24 x 24 px sans chevauchement; 44-48 px est le standard tactile, y compris navigation, icones, fermeture, filtres, `+/-` et reorganisation.
- Apres `Accepter la commande` ou `Terminer la preparation`, desactiver l'action au premier envoi, conserver l'element courant jusqu'a la reponse versionnee, puis avancer seulement apres succes. En cas de refus ou conflit, rester sur l'element, recharger son statut et n'offrir que les transitions autorisees.
- La validation sequentielle expose la position (`Commande 3 / 7`), le passage temporaire et une sortie explicite.
- Les disponibilites sont enregistrees localement au brouillon operationnel; seule l'action `Publier` rend l'offre visible aux clients.
- Ne pas suggerer de reservation: les disponibilites sont estimatives et ne garantissent pas la fourniture.
- L'edition post-echeance ou une correction significative demande un motif et cree un evenement d'audit non modifiable.
- Pour une action AMAP, verifier l'autorisation a l'ouverture et a la soumission dans le fuseau `Europe/Paris`; apres expiration ou conflit, rafraichir et conserver la vue en lecture seule.
- A la cloture, traiter la file des non-retraits: `Annuler` ou `Reporter`. Un report impose une occurrence future `Prevue`, confirme les deux retraits et trace motif/auteur avant le retour a `A preparer`.
- La cloture est persistante en quatre etapes: commandes, disponibilites, publication facultative, confirmation. La publication peut reussir sans notification; un echec de notification ne retire pas le snapshot publie.
- Une commande classique modifiee par le client apres acceptation retourne a `A valider`; l'administration voit le diff avant la nouvelle decision.
- Le cycle AMAP est: composition hebdomadaire, echeance, generation et snapshot de commandes. Abonnement permanent et exception datee restent deux objets distincts; une suspension confirme ou annule toute cession existante.

## Responsive & Platform

| Forme | Regles |
|---|---|
| Mobile, 320-430 px | Une colonne, cartes, navigation basse admin, formulaires verticaux, filtres dans un sheet et action dominante fixe. Les controles de disponibilite peuvent passer a la ligne; champ et unite ne sont jamais tronques. |
| Tablette, 768-1024 px | Une ou deux colonnes, gros controles tactiles, master/detail pour commandes ou abonnements si utile; paysage privilegie pour preparation et validation. |
| Desktop | Sidebar permanente, historique ou detail simultane, tableaux uniquement lorsqu'ils apportent une lecture plus efficace. |

Les ecrans restent partages par defaut. Une variante `.native.tsx` ou `.web.tsx` n'est justifiee que par une difference de parcours, de structure ou d'interaction reelle.

Recette responsive: reflow sans defilement horizontal hors contenu bidimensionnel, texte a 200 % sans perte de controle, zoom navigateur a 400 %, ordre DOM/focus identique a l'ordre visuel, et `scroll-margin` afin qu'une barre fixe ne masque jamais le focus ou une erreur.

## Accessibility Floor

- Les contrastes visuels suivent `DESIGN.md`; les statuts combinent couleur, texte et symbole ou structure.
- Tout controle expose un nom, un role et un etat aux technologies d'assistance. Les erreurs sont reliees programmatiquement au champ concerne.
- Chaque ecran comporte un unique `main`, des `nav` nommes, une hierarchie de titres et un lien `Aller au contenu` visible au focus; la destination active porte `aria-current="page"`.
- Le parcours clavier desktop suit l'ordre de lecture; le focus est visible avec `{colors.focus-ring}`. Les sheets et dialogues sont modaux (`aria-modal`), nommes, inertent l'arriere-plan, ferment avec `Escape` sauf exception motivee, initialisent le focus sur titre/action non destructive et le restituent au declencheur.
- Les formulaires ont label visible, obligatoire/facultatif, aide et erreur associees, `aria-invalid` et message precis. Une soumission invalide affiche un resume focusable lie aux champs, sans effacer les saisies valides.
- `EntityCard` est un lien natif nomme par entite et contexte; aucun controle interactif ne s'imbrique. `SegmentedControl` declare sa semantique, son clavier et son etat. La reorganisation annonce position initiale et resultat.
- Les squelettes sont inertes; la zone chargee expose `aria-busy` et un libelle. Une region `status` polie annonce sauvegarde, progression, succes et nouvel element; `alert` est reserve aux erreurs bloquantes.
- Les donnees personnelles sont masquees hors des surfaces qui les exigent; les liens client ne donnent acces qu'a la commande concernee.
- Les animations reduites sont instantanees ou breves, sans balayage de skeleton ni changement de contexte automatique non annonce.

## Privacy and Trust

- L'inscription aux publications est distincte de la commande, facultative et jamais pre-cochee. Chaque email comprend une desinscription individuelle.
- La notice de confidentialite et l'identite/contact du responsable sont accessibles lors de toute collecte de coordonnees. Les champs optionnels sont indiques explicitement.
- Le lien de suivi est revocable et expire 30 jours apres livraison ou annulation, ou 90 jours apres creation si la commande n'est pas livree.
- **[NOTE FOR UX]** Les mentions legales, durees de conservation, identite du responsable, hebergeur et fournisseur d'email doivent etre valides juridiquement avant mise en production.

## Key Flows

### Flux 1 - Cycle quotidien d'administration (Lea, maraichere, entre deux recoltes)

1. Lea ouvre `Aujourd'hui` sur son telephone.
2. Elle voit d'abord les commandes `A valider`, puis l'activite la plus imminente.
3. Elle ouvre la file et accepte ou ajuste les commandes une a une.
4. Apres chaque acceptation, la commande suivante apparait sans retour a la liste.
5. Elle ouvre `Preparer`, choisit le Marche Saint-Pierre et consulte les volumes globaux.
6. Elle enregistre les poids reels et les exceptions commande par commande.
7. **Climax:** `Preparation terminee` confirme que les 18 commandes sont pretes; Lea peut enchaîner sur la livraison ou la cloture sans chercher la prochaine action.

Echec: si une commande est modifiee pendant son traitement, le conflit est explique et sa nouvelle version est accessible avant toute decision.

### Flux 2 - Commander sans compte (Marie, cliente, la veille du marche)

1. Marie ouvre l'offre publique et comprend que les quantites sont estimatives et non reservees.
2. Elle ajoute ses produits au catalogue mobile.
3. Elle consulte une seule page verticale de commande: produits, retrait, coordonnees, paiement prevu et validation.
4. Elle accepte separement ou refuse l'inscription aux publications.
5. Elle envoie sa commande.
6. **Climax:** la confirmation affiche immediatement son lien de suivi securise, sans promesse d'email transactionnel.

Echec: si aucune occurrence n'est selectable, l'ecran explique qu'aucun retrait n'est disponible plutot que de laisser Marie valider une commande impossible.

### Flux 3 - Gerer le prochain panier (Paul, adherent AMAP, le lundi soir)

1. Paul ouvre son espace AMAP et voit `Votre prochain panier`, date, retrait, format et paniers restants.
2. Il consulte la composition et la date limite de modification.
3. Avant l'echeance, il choisit une substitution, un changement de retrait, une cession ou une suspension.
4. Le systeme confirme le changement et met a jour l'historique.
5. **Climax:** Paul retrouve son prochain panier avec le changement clairement affiche, sans ambiguite sur ce qui sera prepare.

Echec: apres l'echeance, les actions deviennent indisponibles avec une explication explicite; le panier reste consultable. Une suspension demande de confirmer l'annulation de toute cession en cours.

### Flux 4 - Publier une offre fiable (Lea, maraichere, apres la recolte)

1. Lea modifie les disponibilites et voit `7 changements non publies`.
2. Elle ouvre `Publier les disponibilites`; la revue affiche les changements, la version du brouillon et les canaux disponibles.
3. Elle choisit un message et controle les destinataires consentants, sans que l'inscription soit jamais imposee a un client.
4. Elle lance la publication; l'action est verrouillee pendant la verification de la version.
5. **Climax:** le recapitulatif confirme l'heure et l'identifiant de la publication; le compteur de cette version revient a zero et le resultat d'envoi est explicite.

Echec: si le brouillon a change, Lea recharge la revue avant de republier. Sans destinataire, l'offre est publiee sans campagne; en cas d'echec partiel, seuls les echecs temporaires peuvent etre repris.

### Flux 5 - Clore un marche sans perdre de commande (Lea, apres le Marche Saint-Pierre)

1. Lea ouvre la cloture de l'occurrence et voit les commandes `Preparee` non recuperees.
2. Pour chaque commande, elle choisit `Annuler` ou `Reporter`.
3. Pour un report, elle choisit une occurrence future `Prevue`; l'ancienne et la nouvelle recuperation sont confirmees avant enregistrement.
4. Elle met a jour les disponibilites, choisit `Enregistrer` ou `Enregistrer et publier`, puis confirme le recapitulatif final.
5. **Climax:** l'occurrence passe a `Terminee` et toute commande reportee reapparait `A preparer` dans sa nouvelle occurrence, avec son trace d'audit.

Echec: une occurrence annulee ou une transition refusee reste non cloturable; l'ecran explique la cause et conserve les decisions deja confirmees.

### Flux 6 - Suivre une commande avec un lien securise (Marie, avant son retrait)

1. Marie ouvre le lien affiche lors de sa confirmation.
2. Elle consulte l'occurrence, les produits et le montant indicatif; avant `Preparee`, elle peut modifier ou annuler dans la limite affichee.
3. Apres preparation, elle voit les quantites reelles et le montant final en lecture seule.
4. **Climax:** la page confirme clairement le retrait et l'etat courant, sans donner acces a une autre commande.

Echec: lien expire, revoque, invalide ou remplace: aucune information de commande n'est affichee et Marie obtient le canal de contact approprie.

### Flux 7 - Composer le panier AMAP de la semaine (Lea, lundi matin)

1. Lea ouvre l'AMAP de la semaine et voit la composition, les remplacements et les volumes prevus.
2. Elle ajuste le panier et les produits de remplacement, puis consulte les suspensions et cessions.
3. Elle ouvre un abonnement pour verifier le prochain panier et son historique.
4. **Climax:** le recapitulatif distingue les paniers standards des exceptions, de sorte que la preparation de l'occurrence expose seulement ce qui exige l'attention de Lea.

Echec: une modification concurrente ou hors echeance est refusee sans ecrasement et le recapitulatif est recharge.

Spines win on conflict with any future mockup or wireframe.
