- source_spec: `_bmad-output/implementation-artifacts/spec-configurer-les-origines-developpement-web.md`
  summary: Vérifier que `apps/web/next-env.d.ts` ne référence pas des types de développement générés hors de la CI.
  evidence: Le fichier généré non committé référence `.next/dev/types`, ce qui peut rendre une vérification TypeScript dépendante d'artefacts locaux.
- source_spec: `_bmad-output/implementation-artifacts/spec-configurer-les-origines-developpement-web.md`
  summary: Documenter ou supprimer les modèles générés dans `apps/api/database/schema.ts` sans consommateur identifié.
  evidence: Le fichier non committé contient des modèles dont les noms de tables dérivés ne correspondent pas aux migrations et aucune commande de génération n'est déclarée.
