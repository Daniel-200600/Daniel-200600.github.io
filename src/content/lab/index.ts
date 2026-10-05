import type { LabEntry } from "@/lib/types";

/**
 * Data Lab entries. Sources: READMEs of the public GitHub repositories.
 * Dates are the repositories' creation dates. Ordered by relevance to finance.
 */
export const labEntries: LabEntry[] = [
  {
    slug: "credit-card-fraud",
    kind: "experiment",
    date: "2026-02",
    title: {
      fr: "Détection de fraude sur cartes bancaires",
      en: "Credit card fraud detection",
    },
    summary: {
      fr: "Exploration d'un jeu de transactions extrêmement déséquilibré, comparaison de techniques de rééquilibrage et de modèles de classification pour détecter la fraude.",
      en: "Exploration of an extremely imbalanced transactions dataset, comparing resampling techniques and classification models to detect fraud.",
    },
    highlights: {
      fr: [
        "Six techniques de rééquilibrage : SMOTE, ADASYN, sur-échantillonnage, sous-échantillonnage, SMOTETomek et SMOTEENN.",
        "Trois modèles comparés : régression logistique, forêt aléatoire et gradient boosting.",
        "Évaluation adaptée au déséquilibre : précision, rappel, F1, ROC-AUC, précision moyenne et courbe précision-rappel, avec une interprétation en langage clair.",
      ],
      en: [
        "Six resampling techniques: SMOTE, ADASYN, over-sampling, under-sampling, SMOTETomek and SMOTEENN.",
        "Three models compared: logistic regression, random forest and gradient boosting.",
        "Imbalance-aware evaluation: precision, recall, F1, ROC-AUC, average precision and precision-recall curve, with a plain-language interpretation.",
      ],
    },
    limit: {
      fr: "L'échantillon fourni dans le dépôt est trop petit pour conclure : c'est un projet pédagogique, pas un système de détection en production.",
      en: "The sample shipped in the repository is too small to draw conclusions: this is an educational project, not a production fraud system.",
    },
    stack: ["Python", "scikit-learn", "imbalanced-learn", "pandas", "Plotly", "Streamlit"],
    links: { repo: "https://github.com/Daniel-200600/prediction_fraude" },
  },
  {
    slug: "census-income",
    kind: "analysis",
    date: "2026-01",
    title: {
      fr: "Prédiction du revenu à partir du recensement américain",
      en: "Census income prediction",
    },
    summary: {
      fr: "Prédire si un revenu dépasse 50 000 USD : exploration des données, entraînement et comparaison de six modèles, puis prédiction à partir d'un formulaire.",
      en: "Predicting whether income exceeds 50,000 USD: data exploration, training and comparison of six models, then prediction from a form.",
    },
    highlights: {
      fr: [
        "Six modèles comparés : k plus proches voisins, arbre de décision, forêt aléatoire, gradient boosting, régression logistique et SVM.",
        "Variables standardisées, taille du jeu de test et graine aléatoire paramétrables, matrice de confusion du meilleur modèle.",
        "Le meilleur modèle est sauvegardé puis rechargé pour la prédiction, avec un modèle de repli si le fichier est absent.",
      ],
      en: [
        "Six models compared: k-nearest neighbours, decision tree, random forest, gradient boosting, logistic regression and SVM.",
        "Standardised features, configurable test size and random seed, confusion matrix of the best model.",
        "The best model is saved then reloaded for prediction, with a fallback model if the file is missing.",
      ],
    },
    limit: {
      fr: "Seules les variables numériques sont utilisées ; les variables catégorielles restent à intégrer.",
      en: "Only numeric features are used; categorical variables are not yet included.",
    },
    stack: ["Python", "scikit-learn", "pandas", "joblib", "Matplotlib", "Streamlit"],
    links: { repo: "https://github.com/Daniel-200600/projet_census1" },
  },
  {
    slug: "depression-risk",
    kind: "experiment",
    date: "2026-05",
    title: {
      fr: "Score de risque de dépression chez les étudiants",
      en: "Student depression risk score",
    },
    summary: {
      fr: "Application Streamlit qui estime un score de risque de 0 à 100 % à partir de facteurs de mode de vie et de parcours académique, avec une forêt aléatoire.",
      en: "A Streamlit app that estimates a 0 to 100 % risk score from lifestyle and academic factors, using a random forest.",
    },
    highlights: {
      fr: [
        "Forêt aléatoire dans un pipeline scikit-learn, hyperparamètres documentés.",
        "Jauge de risque à trois niveaux et graphique radar comparant un profil aux moyennes du jeu de données.",
        "Dépendances figées pour recharger le modèle sauvegardé sans incompatibilité de version.",
      ],
      en: [
        "Random forest in a scikit-learn pipeline, with documented hyperparameters.",
        "Three-level risk gauge and a radar chart comparing a profile with dataset averages.",
        "Pinned dependencies so the saved model reloads without version conflicts.",
      ],
    },
    limit: {
      fr: "Projet de cours de Machine Learning, entraîné sur des données d'enquête : ce n'est pas un outil médical.",
      en: "Machine Learning course project trained on survey data: it is not a medical tool.",
    },
    stack: ["Python", "scikit-learn", "pandas", "Streamlit", "Matplotlib", "seaborn"],
    links: { repo: "https://github.com/Daniel-200600/depression-prediction-app" },
  },
];

export function getLabEntry(slug: string): LabEntry | undefined {
  return labEntries.find((e) => e.slug === slug);
}
