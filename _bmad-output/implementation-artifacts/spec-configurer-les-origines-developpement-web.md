---
title: 'Configurer les origines de développement web'
type: 'chore'
created: '2026-08-27'
status: 'done'
route: 'one-shot'
---

# Configurer les origines de développement web

## Intent

**Problem:** Next.js bloque les ressources de développement lorsqu'elles sont consultées depuis un hôte réseau non explicitement autorisé, et le web ne documentait pas ses variables d'environnement.

**Approach:** Rendre les hôtes de développement autorisés configurables par environnement et fournir un exemple complet pour le proxy API et cette liste d'hôtes.

## Suggested Review Order

**Configuration web**

- Lit une liste d'hôtes sûre et normalisée depuis l'environnement.
  [`next.config.mjs:1`](../../apps/web/next.config.mjs#L1)

- Documente le proxy API et les hôtes de développement réseau.
  [`.env.example:1`](../../apps/web/.env.example#L1)

**Documentation opérationnelle**

- Centralise les variables API et web attendues au démarrage.
  [`README.md:40`](../../README.md#L40)
