# AdminNotificationSettingsScreen — Wireframe fonctionnel

## 1. Emplacement

Documentation :

```text
docs/ui/admin/notification-settings.md
```

Implémentation :

```text
packages/screens/admin/settings/
├── admin-notification-settings-screen.tsx
└── components/
```

---

## 2. Objectif

L’écran doit répondre à :

> **Quels événements envoient une notification, par quels canaux, et quels canaux sont réellement configurés ?**

V1 couvre :

- publication de disponibilités ;
- commande prête ;
- rappel AMAP avant deadline ;
- nouvelle commande côté admin.

---

## 3. Principe UX

Distinguer :

```text
CANAL CONFIGURÉ
```

de :

```text
NOTIFICATION ACTIVÉE
```

Un événement peut être activé sur Email mais SMS indisponible car non configuré.

---

## 4. Wireframe mobile

```text
┌─────────────────────────────────┐
│ ← Notifications                 │
├─────────────────────────────────┤
│                                 │
│ CANAUX                          │
│                                 │
│ Email                           │
│ ✓ Configuré                     │
│                                 │
│ SMS                             │
│ ⚠ Non configuré                 │
│ [ Configurer ]                  │
│                                 │
│ Web push                        │
│ ✓ Disponible                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│ DISPONIBILITÉS PUBLIÉES         │
│                                 │
│ ☑ Email                         │
│ ☐ SMS · non configuré           │
│ ☑ Web push                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ COMMANDE PRÊTE                  │
│                                 │
│ ☑ Email                         │
│ ☐ SMS · non configuré           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ RAPPEL AMAP                     │
│                                 │
│ ☑ Email                         │
│ ☑ Web push                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│ NOUVELLE COMMANDE ADMIN         │
│                                 │
│ ☑ Web push                      │
│ ☑ Email                         │
│                                 │
└─────────────────────────────────┘
│ [ Enregistrer ]                 │
└─────────────────────────────────┘
```

---

## 5. Canaux V1

Selon intégrations réellement disponibles :

```text
email
sms
web_push
```

Mobile push natif peut arriver plus tard.

---

## 6. Canal non configuré

Afficher :

```text
SMS
Non configuré
```

et désactiver ses toggles avec explication.

Pas de faux état “désactivé” qui masquerait un problème de configuration.

---

## 7. Configuration du fournisseur

Si la configuration technique ne peut pas être faite depuis l’application :

```text
Configuration requise côté système.
```

Ne pas inventer des champs API key si ce n’est pas prévu.

---

## 8. Publication de disponibilités

Important : l’écran de publication permet de choisir les canaux pour une publication donnée.

Les paramètres globaux doivent donc définir :

```text
canaux proposés / valeurs par défaut
```

pas nécessairement forcer chaque publication.

---

## 9. Recommandation

Pour `availability_published` :

```text
defaultChannels
```

L’admin peut encore décocher/cocher sur `AdminPublishAvailabilityScreen`.

---

## 10. Commande prête

Événement :

```text
order_prepared
```

Déclenché quand la commande passe :

```text
À préparer → Préparée
```

ou via action distincte si notification manuelle requise.

---

## 11. Rappel AMAP

Événement :

```text
amap_deadline_reminder
```

Le timing vient de la règle AMAP.

Ici on configure seulement :

- actif/inactif ;
- canaux.

---

## 12. Nouvelle commande admin

Événement :

```text
admin_new_order
```

Pour prévenir le maraîcher d’une nouvelle commande web.

Une commande créée par l’admin lui-même ne doit généralement pas lui envoyer cette notification.

---

## 13. Canaux par événement

Modèle :

```ts
event
→ enabled
→ channels[]
```

---

## 14. Pas de templates avancés V1

Ne pas ajouter :

- éditeur HTML ;
- variables complexes ;
- campagnes ;
- segmentation.

Des messages système simples suffisent.

---

## 15. Aperçu message

Optionnel :

```text
[ Voir un exemple ]
```

Sheet en lecture seule.

---

## 16. Test de canal

Très utile si techniquement possible :

```text
[ Envoyer un email de test ]
```

ou :

```text
[ Tester ]
```

Mais seulement si l’intégration le supporte réellement.

---

## 17. Erreur de test

```text
Échec de l’envoi de test.

Vérifiez la configuration Email.
```

---

## 18. Publication vs notification

Rappel fondamental :

```text
publication snapshot
≠
notification
```

Les échecs de notifications ne doivent jamais annuler une publication réussie.

---

## 19. Projection

```ts
type AdminNotificationSettings = {
  version: number

  channels: {
    code: "email" | "sms" | "web_push"
    label: string
    configured: boolean
    testSupported: boolean
  }[]

  events: {
    code:
      | "availability_published"
      | "order_prepared"
      | "amap_deadline_reminder"
      | "admin_new_order"

    enabled: boolean
    channels: string[]
  }[]
}
```

---

## 20. API

```text
GET /admin/settings/notifications
PUT /admin/settings/notifications
```

Test éventuel :

```text
POST /admin/settings/notifications/channels/:channel/test
```

---

## 21. Validation

Impossible d’activer un canal non configuré.

Mais il doit rester visible dans l’UI avec son état.

---

## 22. Concurrence

`expectedVersion`.

---

## 23. Tablette / desktop

Colonne gauche :

```text
Canaux
```

Colonne droite :

```text
Événements
```

---

## 24. États

```text
loading
ready
dirty
testing
submitting
conflict
success
error
```

---

## 25. Accessibilité

- état configuré/non configuré textuel ;
- événements comme titres ;
- cases/toggles labellés avec le canal ;
- erreurs de test annoncées ;
- aucun état dépendant uniquement de couleur.

---

## 26. Critères d’acceptation UX

L’écran est réussi si :

- canal configuré et notification activée sont clairement distincts ;
- les 4 événements V1 ont un réglage évident ;
- le choix ponctuel de publication reste possible ;
- un canal indisponible est expliqué ;
- aucun outil marketing complexe n’est introduit ;
- une notification ne contrôle jamais la réussite métier de la publication/commande.

---

## 27. Structure

```text
CANAUX
  ↓
ÉTAT DE CONFIGURATION
  ↓
ÉVÉNEMENTS
  ↓
CANAUX PAR ÉVÉNEMENT
  ↓
TEST ÉVENTUEL
  ↓
ENREGISTRER
```
