# Portfolio de Tchomtchi Kamgang Daniel Merlys

Portfolio professionnel bilingue (FR/EN) : data, business intelligence, IA et finance.

## Stack

| Brique | Rôle |
|---|---|
| Next.js 16 (App Router), React 19 | Site exporté en HTML statique, metadata, sitemap, images de partage |
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
scripts/check-content.mjs
```

## Contenu et placeholders

Toute information manquante est écrite `todo("…")` dans `src/content/`. Elle s'affiche
en jaune pointillé sur le site et est listée par `npm run check:content`.

**Le build de production Vercel échoue tant qu'il reste un placeholder** : aucune
information non validée ne peut être publiée par erreur.

Modifier le contenu : voir [CONTENT.md](CONTENT.md).

## Mise en ligne (GitHub Pages)

Le site est publié gratuitement sur **https://daniel-200600.github.io**.

Chaque `git push` sur `main` déclenche `.github/workflows/deploy.yml` :
lint, vérification des types, build statique (`out/`) puis publication.
Le build échoue, et rien n'est publié, s'il reste un contenu à fournir ou un tiret cadratin.

Le site est 100 % statique (`output: "export"`) :

- `public/index.html` choisit la langue (FR ou EN) selon le navigateur ;
- `src/app/global-not-found.tsx` sert de page 404 et redirige les adresses sans langue (`/projects/` vers `/fr/projects/`) ;
- les images de partage sont dans `public/og/`.

Pour un nom de domaine personnalisé plus tard : *Settings → Pages → Custom domain* sur GitHub,
puis mettre à jour `NEXT_PUBLIC_SITE_URL` dans le workflow.

> Note : sous Windows, `next build` écrit mal certains fichiers de préchargement
> (bug de Next.js 16 sur les chemins). Le build de production se fait sous Linux
> dans GitHub Actions, où il est correct.

## Confidentialité

- Aucune donnée interne, transactionnelle ou personnelle dans ce dépôt.
- Les fichiers de données (`.csv`, `.xlsx`, `.db`, …) sont ignorés par Git, sauf `public/data/` après revue.
- Aucun secret n'est nécessaire au fonctionnement du site.
- Le site n'utilise ni cookie ni traceur.
