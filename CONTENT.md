# Modifier le contenu

Tout le contenu est dans `src/content/`. Aucun composant n'est à toucher pour
mettre à jour le site. Chaque texte existe en deux langues : `{ fr: "…", en: "…" }`.

## Règle

N'écrire que des informations réelles et vérifiables. Une information manquante
s'écrit `todo("CE QUI MANQUE")` : elle reste visible en jaune et bloque la mise
en production tant qu'elle n'est pas remplacée.

```bash
npm run check:content   # liste ce qui reste à fournir
```

## Fichiers

| Fichier | Contenu |
|---|---|
| `profile.ts` | Nom, accroche, disponibilité, ville, email, LinkedIn, GitHub, CV |
| `experience.ts` | Expériences et formation |
| `skills.ts` | Compétences, chacune reliée aux projets qui la prouvent |
| `projects/*.ts` | Un fichier par projet |
| `projects/index.ts` | Liste et ordre des projets |
| `lab/index.ts` | Entrées du Data Lab (la section reste masquée tant que la liste est vide) |

## Ajouter un projet

1. Copier `src/content/projects/payroll.ts` en `src/content/projects/mon-projet.ts`.
2. Changer `slug` (utilisé dans l'URL : `/fr/projects/mon-projet`) et `order`.
3. Remplir les champs. TypeScript signale tout champ obligatoire manquant.
4. L'ajouter à la liste dans `src/content/projects/index.ts`.

Champs d'un projet : `title`, `summary`, `domains` (`data`, `bi`, `ai`, `finance`,
`automation`), `status`, `role`, `period`, `stack`, `links.repo`, `links.demo`,
et les sections `context`, `problem`, `objective`, `data`, `methodology`,
`solution`, `results`, `limits`. `workflow` (optionnel) affiche le schéma animé
étape par étape, comme pour DAN.

Format des sections : une chaîne = un paragraphe, un tableau de chaînes = une liste.

```ts
results: {
  fr: ["Un paragraphe.", ["Point 1", "Point 2"]],
  en: ["A paragraph.", ["Item 1", "Item 2"]],
},
```

## Ajouter le CV

1. Déposer les PDF dans `public/cv/` (par ex. `cv-fr.pdf`, `cv-en.pdf`).
2. Dans `profile.ts` : `cv: { fr: "/cv/cv-fr.pdf", en: "/cv/cv-en.pdf" }`.

Les boutons « CV » apparaissent automatiquement.

## Ajouter une entrée au Data Lab

Ajouter un objet dans `src/content/lab/index.ts` (`kind` : `analysis`, `dashboard`,
`notebook`, `article`, `experiment`). Le lien « Data Lab » apparaît alors dans la navigation.
