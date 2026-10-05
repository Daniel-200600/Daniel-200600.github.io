# Portfolio de Tchomtchi Kamgang Daniel Merlys

Portfolio professionnel bilingue (FR/EN) : data, business intelligence, IA et finance.

## Stack

| Brique | Rôle |
|---|---|
| Next.js 16 (App Router), React 19 | Pages pré-générées en statique, metadata, sitemap, images Open Graph |
| TypeScript (strict) | Contenu typé : un projet incomplet ne compile pas |
| Tailwind CSS 4 | Design system en variables CSS (`src/app/globals.css`) |

Aucune librairie d'animation, d'UI ou d'analytics : les animations sont en CSS et en SVG.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (liste d'abord les placeholders) |
| `npm run check:content` | Liste les contenus encore à fournir |
| `npm run lint` / `npm run typecheck` | Qualité du code |

## Structure

```
src/
  app/[locale]/        Pages (fr, en) : accueil, projets, étude de cas, parcours, Data Lab
  app/sitemap.ts       Sitemap avec alternatives hreflang
  content/             TOUT le contenu éditable (voir CONTENT.md)
  components/          layout/, sections/, project/, motion/, ui/
  i18n/                Langues et textes d'interface
  lib/                 Types, helpers SEO et placeholders
  proxy.ts             Redirige / vers /fr ou /en selon la langue du navigateur
scripts/check-content.mjs
```

## Contenu et placeholders

Toute information manquante est écrite `todo("…")` dans `src/content/`. Elle s'affiche
en jaune pointillé sur le site et est listée par `npm run check:content`.

**Le build de production Vercel échoue tant qu'il reste un placeholder** : aucune
information non validée ne peut être publiée par erreur.

Modifier le contenu : voir [CONTENT.md](CONTENT.md).

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub.
2. Sur vercel.com : *Add New → Project*, importer le dépôt (framework détecté automatiquement).
3. Optionnel : variable `NEXT_PUBLIC_SITE_URL` une fois le domaine personnalisé configuré.
4. Domaine personnalisé : *Project → Settings → Domains*.

Les déploiements de prévisualisation (branches) passent même avec des placeholders ;
le déploiement de production les refuse.

## Confidentialité

- Aucune donnée interne, transactionnelle ou personnelle dans ce dépôt.
- Les fichiers de données (`.csv`, `.xlsx`, `.db`, …) sont ignorés par Git, sauf `public/data/` après revue.
- Aucun secret n'est nécessaire au fonctionnement du site.
- Le site n'utilise ni cookie ni traceur.
