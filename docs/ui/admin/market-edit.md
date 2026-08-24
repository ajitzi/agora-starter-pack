# AdminMarketEditScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/market-edit.md
```

Implémentation :

```text
packages/screens/admin/distribution/
├── market-edit-screen.tsx
├── components/
└── index.ts
```

Un seul écran est utilisé pour :

```text
création
modification
```

avec quelques différences de comportement selon le mode.

---

## 2. Objectif

L’écran doit répondre à :

> **Quand et où ce marché a-t-il lieu ?**

Il doit permettre de :

- saisir le nom ;
- choisir le jour récurrent ;
- définir l’horaire ;
- définir le lieu ;
- ajouter une note interne ;
- activer le marché ;
- enregistrer ;
- comprendre l’impact sur les occurrences futures en cas de modification.

---

# 3. Principe V1

Le modèle de récurrence doit rester volontairement simple :

```text
1 jour par semaine
+
heure de début
+
heure de fin facultative
```

Exemple :

```text
Tous les samedis
08:00 – 12:00
```

Ne pas ajouter à ce stade :

- fréquence toutes les 2 semaines ;
- semaine paire/impaire ;
- premier samedi du mois ;
- plusieurs jours dans le même modèle ;
- règles complexes d’exclusion.

Les exceptions sont gérées au niveau des occurrences.

---

# 4. Wireframe mobile — création

```text
┌─────────────────────────────────┐
│ ← Nouveau marché                │
├─────────────────────────────────┤
│                                 │
│ INFORMATIONS                    │
│                                 │
│ Nom                             │
│ ┌─────────────────────────────┐ │
│ │ Marché Saint-Pierre        │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RÉCURRENCE                      │
│                                 │
│ Jour                            │
│ ┌─────────────────────────────┐ │
│ │ Samedi                   ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│ Heure de début                  │
│ ┌──────────────┐                │
│ │ 08:00        │                │
│ └──────────────┘                │
│                                 │
│ Heure de fin                    │
│ ┌──────────────┐                │
│ │ 12:00        │                │
│ └──────────────┘                │
│                                 │
│ Tous les samedis                │
│ 08:00 – 12:00                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ LIEU                            │
│                                 │
│ Nom du lieu                     │
│ ┌─────────────────────────────┐ │
│ │ Place Saint-Pierre         │ │
│ └─────────────────────────────┘ │
│                                 │
│ Adresse                         │
│ ┌─────────────────────────────┐ │
│ │ 12 place Saint-Pierre      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 75000 Paris                │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOTE INTERNE                    │
│ Facultatif                      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Installation côté nord... │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│                                 │
│ Marché actif                    │
│ [ Oui ]                         │
│                                 │
└─────────────────────────────────┘
│ [ Créer le marché ]             │
└─────────────────────────────────┘
```

L’action principale est sticky.

---

# 5. Mode modification

Header :

```text
← Modifier le marché
```

CTA :

```text
[ Enregistrer les modifications ]
```

Les champs sont préremplis.

Le statut actif/inactif peut être modifiable ici, mais il est préférable de garder les actions `Désactiver` / `Réactiver` dans le détail pour mieux expliciter leurs conséquences.

Donc en modification, le toggle d’activation peut être absent.

---

# 6. Champ nom

Exemple :

```text
Nom

[ Marché Saint-Pierre ]
```

Le nom doit identifier l’activité dans :

- le planning ;
- les commandes ;
- la préparation ;
- les notifications ;
- l’historique.

Éviter un nom trop générique :

```text
Marché
```

On peut suggérer :

```text
Utilisez un nom facilement reconnaissable,
par exemple le nom du lieu ou de la commune.
```

---

# 7. Jour de la semaine

Contrôle :

```text
Jour

[ Samedi ▼ ]
```

Sur mobile, utiliser un `Select` ou un `Sheet`.

Options :

```text
Lundi
Mardi
Mercredi
Jeudi
Vendredi
Samedi
Dimanche
```

Pas besoin d’un sélecteur multi-jours en V1.

---

# 8. Horaire

Champs :

```text
Heure de début
[ 08:00 ]

Heure de fin
[ 12:00 ]
```

L’heure de fin peut être facultative si certains usages n’en ont pas besoin.

Mais pour un marché, une plage complète est préférable.

Validation :

```text
heure de fin > heure de début
```

---

# 9. Résumé humain de récurrence

Sous les champs :

```text
Tous les samedis
08:00 – 12:00
```

Ce résumé se met à jour immédiatement.

Il sert de vérification visuelle.

Exemple :

```text
Tous les mercredis
14:00 – 18:00
```

---

# 10. Lieu

Séparer :

```text
Nom du lieu
Adresse
```

Exemple :

```text
Nom du lieu
Place Saint-Pierre

Adresse
12 place Saint-Pierre
75000 Paris
```

Le nom est utile dans l’UI.

L’adresse est utile pour :

- navigation ;
- client ;
- carte ;
- notifications.

---

# 11. Adresse structurée ou libre ?

Pour la V1, un champ relativement libre peut suffire :

```text
Adresse
[ 12 place Saint-Pierre, 75000 Paris ]
```

Si une géolocalisation est introduite plus tard, on pourra ajouter :

- recherche d’adresse ;
- latitude ;
- longitude.

Ne pas alourdir la V1 si ce n’est pas nécessaire.

---

# 12. Nom du lieu facultatif ?

Techniquement oui.

Mais UX :

```text
Marché Saint-Pierre
```

comme nom du modèle ne remplace pas forcément :

```text
Place Saint-Pierre
```

comme nom du lieu.

Conserver donc deux champs.

---

# 13. Note interne

Exemple :

```text
NOTE INTERNE
Facultatif

Installation côté nord de la place.
Arriver 30 minutes avant.
```

Cette note n’est pas visible par le client.

Elle sert aux opérations.

---

# 14. Données visibles par le client

Il faut éviter toute ambiguïté.

Près de la note :

```text
Visible uniquement par l’équipe.
```

Pour le lieu :

```text
Cette adresse peut être visible
par les clients qui choisissent ce marché.
```

---

# 15. Activation à la création

Pour un nouveau marché :

```text
Marché actif
[ Oui ]
```

Laisser `Oui` par défaut uniquement si tous les champs requis sont valides.

Alternative plus sûre :

> le marché est créé actif par défaut une fois le formulaire valide.

Pas besoin de demander une décision supplémentaire si l’intention normale est de l’utiliser immédiatement.

---

# 16. Création inactive

Il peut cependant être utile de permettre :

```text
Créer comme inactif
```

pour préparer une configuration à l’avance.

Ce cas reste secondaire.

---

# 17. Validation inline

Erreurs directement sous les champs.

Exemple :

```text
Nom
[             ]

Le nom est obligatoire.
```

ou :

```text
Heure de fin
[ 07:00 ]

L’heure de fin doit être après 08:00.
```

Pas de gros résumé d’erreur uniquement en bas.

---

# 18. CTA désactivé

Le CTA peut être désactivé lorsque les données obligatoires sont invalides.

Mais l’utilisateur doit comprendre pourquoi.

Exemple :

```text
[ Créer le marché ]
```

désactivé avec erreurs visibles dans le formulaire.

---

# 19. Création

Au tap :

```text
[ Créer le marché ]
```

état :

```text
Création…
```

Puis confirmation serveur :

```text
✓ Marché créé
```

Navigation vers :

```text
AdminMarketDetailsScreen
```

---

# 20. Génération des occurrences après création

La création du modèle peut entraîner la génération d’occurrences futures.

Le succès peut indiquer :

```text
✓ Marché créé

Prochaine occurrence :
Samedi 29 août
```

Pas besoin d’expliquer la mécanique interne.

---

# 21. Modification sans impact sur la récurrence

Exemple :

```text
Note interne
```

ou éventuellement :

```text
Nom du marché
```

Le CTA enregistre directement.

Pas besoin d’un écran de confirmation d’impact si les occurrences futures ne sont pas concernées.

---

# 22. Modification de récurrence

Exemple :

```text
Samedi
08:00 – 12:00
```

devient :

```text
Samedi
09:00 – 13:00
```

Après tap sur `Enregistrer`, l’application doit d’abord calculer l’impact.

---

# 23. Écran / Sheet d’impact

Wireframe :

```text
┌─────────────────────────────────┐
│ Mettre à jour les occurrences ? │
├─────────────────────────────────┤
│                                 │
│ Vous avez modifié :             │
│                                 │
│ 08:00 – 12:00                   │
│       ↓                         │
│ 09:00 – 13:00                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 4 occurrences futures existent. │
│                                 │
│ 3 peuvent être mises à jour.    │
│                                 │
│ ⚠ 1 contient déjà des          │
│ commandes et restera inchangée. │
│                                 │
├─────────────────────────────────┤
│                                 │
│ ● Mettre à jour les             │
│   occurrences compatibles       │
│                                 │
│ ○ Modifier uniquement le modèle │
│                                 │
└─────────────────────────────────┘
│ [ Confirmer ]                   │
└─────────────────────────────────┘
```

---

# 24. Politique recommandée

Choix par défaut :

```text
Mettre à jour les occurrences futures
non personnalisées et sans risque.
```

Le terme exact peut être simplifié en UI :

```text
Mettre à jour les prochaines dates
```

avec explication en dessous.

---

# 25. Occurrence personnalisée

Une occurrence qui a déjà été modifiée manuellement ne doit pas être écrasée.

Exemple :

```text
5 septembre
Horaire exceptionnel
```

Elle reste inchangée.

Message :

```text
1 occurrence personnalisée
ne sera pas modifiée.
```

---

# 26. Occurrence avec commandes

Encore plus important.

Si une occurrence a déjà des commandes et que la modification concerne :

- horaire ;
- lieu ;
- date potentiellement ;

elle ne doit pas être modifiée silencieusement.

Exemple :

```text
⚠ Samedi 29 août
18 commandes

Cette occurrence restera inchangée.
```

---

# 27. Pourquoi cette règle

Parce qu’un changement de lieu ou d’horaire peut rendre faux :

- l’information donnée au client ;
- le lien de récupération ;
- les notifications déjà envoyées ;
- l’organisation de préparation.

Le modèle ne doit pas propager aveuglément une modification risquée.

---

# 28. Modification du nom uniquement

Si seul le nom change :

```text
Marché Saint-Pierre
→ Marché de la place Saint-Pierre
```

on peut décider que les occurrences futures reflètent le nouveau nom.

Mais historiquement, les occurrences passées devraient conserver leur snapshot / libellé pertinent.

En V1, on peut aussi laisser les occurrences porter une référence vers le modèle mais afficher le nom actuel pour les futures.

À figer côté domaine.

---

# 29. Modification du lieu

Même workflow d’impact que l’horaire.

Exemple :

```text
Place Saint-Pierre
→ Halle municipale
```

Les occurrences sans commande peuvent être mises à jour.

Celles avec commandes doivent être exclues du changement automatique.

---

# 30. Changer le jour de semaine

Exemple :

```text
Samedi
→ Dimanche
```

C’est une modification structurante.

Elle doit générer une alerte plus forte :

```text
Le jour du marché change.

Les prochaines occurrences pourront
être recréées selon la nouvelle récurrence.
```

Ne pas tenter de “déplacer” automatiquement toutes les occurrences existantes si elles ont déjà une identité/date.

---

# 31. Règle recommandée pour changement de jour

Pour les occurrences futures sans commandes :

- annuler / retirer celles générées uniquement par l’ancien modèle ;
- générer de nouvelles occurrences selon le nouveau jour.

Pour les occurrences avec commandes :

- les conserver ;
- les traiter comme exceptions ;
- demander une action explicite si elles doivent être déplacées.

---

# 32. UX simplifiée possible en V1

Si la gestion de propagation devient trop complexe, adopter une règle encore plus sûre :

> modifier le modèle n’affecte jamais les occurrences déjà créées.

Puis le modèle ne s’applique qu’aux nouvelles occurrences générées ensuite.

C’est plus simple techniquement et très prévisible.

Inconvénient :

- l’admin doit parfois modifier quelques occurrences futures manuellement.

Entre automatisme risqué et simplicité, cette règle est parfaitement défendable en V1.

---

# 33. Recommandation V1 finale

Choix recommandé :

```text
Les occurrences déjà créées ne sont pas
modifiées automatiquement.
```

avec éventuellement une action post-enregistrement :

```text
3 occurrences futures utilisent encore
l’ancienne configuration.

[ Les examiner ]
```

C’est cohérent avec le principe général de ne pas faire de changements métier implicites.

---

# 34. Sauvegarde en modification

Flux :

```text
édition
   ↓
Enregistrer
   ↓
validation serveur
   ↓
✓ Modifications enregistrées
```

Pas besoin d’autosave sur cet écran.

C’est un formulaire de configuration à validation explicite.

---

# 35. Pourquoi pas d’autosave ici

Contrairement aux disponibilités :

- modifications rares ;
- conséquences plus importantes ;
- plusieurs champs liés ;
- besoin de valider l’impact.

Donc :

> bouton `Enregistrer` explicite.

---

# 36. Quitter avec modifications non enregistrées

Si l’utilisateur tente de revenir :

```text
Vous avez des modifications non enregistrées.

[ Continuer l’édition ]
[ Quitter sans enregistrer ]
```

Ici, cette confirmation est justifiée.

---

# 37. Conflit concurrent

Si le modèle a changé ailleurs :

```text
⚠ Ce marché a été modifié
depuis l’ouverture du formulaire.

[ Recharger ]
```

Ne pas écraser.

Les champs locaux peuvent éventuellement rester visibles pour comparaison, mais la V1 peut simplement demander de recharger.

---

# 38. Tablette portrait

Deux sections peuvent être côte à côte :

```text
┌──────────────────────────────────────────┐
│ Modifier le marché                      │
├────────────────────┬─────────────────────┤
│ RÉCURRENCE         │ LIEU                │
│                    │                     │
│ Samedi             │ Place SP            │
│ 08:00              │ Adresse             │
│ 12:00              │                     │
├────────────────────┴─────────────────────┤
│ NOTE INTERNE                            │
├──────────────────────────────────────────┤
│                         [ Enregistrer ]  │
└──────────────────────────────────────────┘
```

---

# 39. Tablette paysage

Même logique avec deux grandes colonnes :

```text
┌─────────────────────────────┬──────────────────────────┐
│ INFORMATIONS / RÉCURRENCE   │ LIEU / NOTE             │
│                             │                          │
│ Nom                         │ Nom du lieu              │
│ Jour                        │ Adresse                  │
│ Horaires                    │ Note                     │
│                             │                          │
└─────────────────────────────┴──────────────────────────┘
```

CTA sticky en bas.

---

# 40. Desktop

Même structure.

Largeur maximale raisonnable.

Pas besoin de transformer le formulaire en écran très dense.

---

# 41. Projection formulaire

```ts
type MarketFormValues = {
  name: string

  recurrence: {
    weekday: number
    startsAt: string
    endsAt?: string
  }

  location: {
    label: string
    address?: string
  }

  internalNote?: string
}
```

---

# 42. Mode écran

```ts
type MarketEditMode =
  | {
      type: "create"
    }
  | {
      type: "edit"
      marketId: string
      version: number
    }
```

Cela permet de partager entièrement le formulaire.

---

# 43. Preview de récurrence

Fonction dérivée :

```ts
formatMarketRecurrence(values)
```

produit :

```text
Tous les samedis · 08:00 – 12:00
```

À conserver côté domaine/UI partagé si utilisé ailleurs.

---

# 44. API création

Conceptuellement :

```text
POST /admin/distribution/markets
```

payload :

```ts
{
  name: string
  recurrence: {
    weekday: number
    startsAt: string
    endsAt?: string
  }
  location: {
    label: string
    address?: string
  }
  internalNote?: string
}
```

---

# 45. API modification

```text
PATCH /admin/distribution/markets/:id
```

avec :

```ts
{
  expectedVersion: number

  name: string
  recurrence: ...
  location: ...
  internalNote?: string
}
```

Si la V1 adopte la règle sûre :

> aucune propagation automatique aux occurrences déjà générées,

alors aucune policy complexe n’est nécessaire dans cette mutation.

---

# 46. Résultat de modification

Le serveur peut renvoyer :

```ts
type UpdateMarketResult = {
  marketId: string
  version: number

  existingFutureOccurrencesAffected: number
}
```

L’UI peut ensuite afficher :

```text
✓ Marché modifié

3 occurrences déjà planifiées
conservent leur configuration actuelle.

[ Les voir ]
```

---

# 47. Navigation post-création

```text
AdminMarketEditScreen
       ↓
AdminMarketDetailsScreen
```

---

# 48. Navigation post-modification

Même retour :

```text
AdminMarketDetailsScreen
```

avec données rafraîchies.

---

# 49. Composants `@project/ui`

Bons candidats :

```text
Screen
ScreenHeader
FormField
Input
Select
TimeInput
TextArea
Switch
Alert
Button
StickyActionBar
ConfirmDialog
Sheet
```

---

# 50. Composants métier

Dans :

```text
packages/domains/distribution/ui/
```

bons candidats :

```text
MarketRecurrenceFields
MarketRecurrencePreview
MarketLocationFields
```

---

# 51. Composants spécifiques au screen

```text
packages/screens/admin/distribution/
├── market-edit-screen.tsx
├── components/
│   ├── market-basic-fields.tsx
│   ├── market-recurrence-fields.tsx
│   ├── market-location-fields.tsx
│   ├── market-note-field.tsx
│   ├── market-impact-alert.tsx
│   └── market-edit-actions.tsx
└── index.ts
```

---

# 52. États principaux

Prévoir :

```text
loading
ready
dirty
submitting
conflict
success
error
```

En création :

```text
ready
submitting
error
```

suffisent.

---

# 53. Accessibilité

Points importants :

- labels explicites sur tous les champs ;
- choix du jour utilisable au clavier ;
- champs heure lisibles par lecteur d’écran ;
- résumé de récurrence textuel ;
- erreurs liées aux champs ;
- action sticky toujours accessible sans masquer le dernier champ.

---

# 54. Critères d’acceptation UX

L’écran est considéré comme réussi si :

- un marché peut être créé rapidement sur mobile ;
- la récurrence est compréhensible en langage humain ;
- jour et horaires sont impossibles à confondre ;
- le lieu est clairement séparé du nom du marché ;
- les notes internes ne peuvent pas être confondues avec des informations client ;
- aucune modification n’est sauvegardée implicitement ;
- quitter avec des changements non enregistrés déclenche un avertissement ;
- une modification de modèle ne change pas silencieusement des occurrences existantes ;
- les occurrences avec commandes ne sont jamais déplacées automatiquement ;
- l’écran reste simple malgré les conséquences métier du modèle.

---

# 55. Structure de référence

```text
NOM
  ↓
RÉCURRENCE
  ↓
APERÇU HUMAIN
  ↓
LIEU
  ↓
NOTE INTERNE
  ↓
VALIDATION
  ↓
IMPACT SUR OCCURRENCES
  ↓
ENREGISTRER
```

Cette structure doit permettre de créer ou modifier un modèle récurrent de marché tout en gardant un comportement explicite et prévisible vis-à-vis des occurrences déjà générées.
