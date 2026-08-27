---
title: 'Exposer le formulaire de connexion'
type: 'bugfix'
created: '2026-08-27'
status: 'done'
route: 'one-shot'
---

# Exposer le formulaire de connexion

## Intent

**Problem:** Le formulaire de connexion est disponible sur `/connexion`, mais aucun accès n'est présenté depuis le shell web initial.

**Approach:** Ajouter une action de connexion visible et native dans l'en-tête de l'accueil, pointant vers la route existante.

## Suggested Review Order

- Expose l'action de connexion dans le header sans introduire de routeur dans l'écran partagé.
  [`index.tsx:16`](../../packages/screens/src/index.tsx#L16)

- Vérifie la structure accessible et la destination de l'action.
  [`boundaries.test.mjs:194`](../../packages/testing/tests/boundaries.test.mjs#L194)
