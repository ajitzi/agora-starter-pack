# Revue technologique

## Verdict

**A corriger avant initialisation.** Les six versions declarees existent et sont les versions courantes verifiees le 2026-08-25 : Next.js 16.3.2, `@adonisjs/core` 7.5.0, `@adonisjs/lucid` 22.4.2, PostgreSQL 18.6, OpenAPI 3.2.0 et Tamagui 2.7.7. Le choix AdonisJS + Lucid + PostgreSQL convient au monolithe backend et Tamagui est compatible avec le partage web/mobile vise, sous reserve des ecarts suivants.

## Constats

| Lignes | Constat | Correction requise |
| --- | --- | --- |
| 91-95, 160-165 | Le verrouillage annonce ne fixe ni `engines.node` ni l'image/runtime Node de CI. Or `@adonisjs/core@7.5.0` et `@adonisjs/lucid@22.4.2` exigent Node `>=24.0.0`; Next.js 16.3.2 exige au moins Node 20.9. Une CI en Node 22 ou un runtime de deploiement non aligne rend donc la stack Adonis/Lucid incompatible. | Ajouter Node `24.x` (version exacte ou LTS figee) aux seeds, a `engines`, a la CI et au runtime de deploiement. |
| 101, 125, 164, 214 | OpenAPI 3.2.0 est bien la specification courante, mais le document rend sa validation/generation obligatoire tout en reportant le choix de la toolchain. La compatibilite 3.2 de cette toolchain n'est donc pas etablie; beaucoup d'outils restent limites a OAS 3.0/3.1. | Choisir et pinner un validateur/generateur dont la prise en charge OAS 3.2 est verifiee, ou fixer provisoirement le contrat a OAS 3.1.2. Ajouter la commande CI de validation/conformite. |
| 56, 62, 165 | Tamagui 2.7.7 est compatible avec React 19+ et la documentation fournit un guide Next.js, mais la configuration de build production necessaire a l'extraction/aux themes (`@tamagui/cli`, CSS genere, `TamaguiProvider`, aliases/transpilation selon les packages) n'est ni posee ni gouvernee. La seule regle d'import ne la remplace pas. | Faire porter dans `packages/ui` la configuration et le provider; definir les modifications `apps/web`/Next et la commande de build/CI Tamagui avant le premier ecran. |
| 15-22 | Les sources `current`/`latest` (PostgreSQL, OpenAPI, Expo, Tamagui et registre npm) sont mouvantes. Elles ne permettent pas de reconstituer la verification des versions precisees en lignes 160-165 et contredisent l'objectif de versions verrouillees. | Conserver ces URLs pour la veille, mais ajouter des URLs versionnees (par exemple OAS `v3.2.0`, PostgreSQL `/docs/18/`) et les metadonnees npm/version datees. |

## Sources verifiees

- [Next.js 16.3.2 - installation](https://nextjs.org/docs/app/getting-started/installation) : Node >= 20.9.
- [npm `@adonisjs/core@7.5.0`](https://registry.npmjs.org/@adonisjs/core/latest) et [npm `@adonisjs/lucid@22.4.2`](https://registry.npmjs.org/@adonisjs/lucid/latest) : Node >= 24.0.0; Lucid accepte AdonisJS core 7.x.
- [PostgreSQL 18.6](https://www.postgresql.org/docs/current/), [OpenAPI 3.2.0](https://spec.openapis.org/oas/v3.2.0.html), [npm Tamagui 2.7.7](https://registry.npmjs.org/tamagui/latest).
- [Tamagui installation](https://tamagui.dev/docs/intro/installation) et [guide Next.js](https://tamagui.dev/docs/guides/next-js).
