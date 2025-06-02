# Jurisia - Interface d'Assistant Juridique IA

Ce dépôt contient le code source de l'interface Jurisia, un assistant juridique alimenté par l'intelligence artificielle.

## Structure du projet

Le projet est organisé comme suit :

- `jurisia-interface/` : Contient l'application React principale
- `vercel.json` : Configuration pour le déploiement sur Vercel

## Déploiement

### Déploiement sur GitHub Pages

Pour déployer l'application sur GitHub Pages :

1. Assurez-vous que la propriété "homepage" dans `jurisia-interface/package.json` est correctement configurée avec l'URL de votre dépôt GitHub Pages.

2. Exécutez la commande suivante :

```bash
cd jurisia-interface
npm run deploy
```

Cette commande va construire l'application et la déployer sur la branche gh-pages de votre dépôt GitHub.

### Déploiement sur Vercel

Pour déployer l'application sur Vercel :

1. Créez un compte sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un.

2. Connectez votre dépôt GitHub à Vercel.

3. Configurez les variables d'environnement dans le tableau de bord Vercel :
   - `REACT_APP_OPENAI_API_KEY` : Votre clé API OpenAI

4. Vercel détectera automatiquement la configuration dans les fichiers `vercel.json` et déploiera l'application.

## Variables d'environnement

L'application utilise les variables d'environnement suivantes :

- `REACT_APP_OPENAI_API_KEY` : Clé API OpenAI pour l'accès à l'API OpenAI.

Pour le développement local, créez un fichier `.env` dans le dossier `jurisia-interface/` avec ces variables. Un fichier `.env.example` est fourni comme modèle.

## Problèmes connus

### Clé API exposée

La clé API OpenAI ne doit jamais être exposée dans le code client. Pour éviter ce problème :

1. Pour GitHub Pages : Utilisez un backend sécurisé pour gérer les appels à l'API OpenAI.
2. Pour Vercel : Configurez la clé API comme une variable d'environnement dans le tableau de bord Vercel.

### Conflit de configuration de déploiement

Le projet a des configurations pour à la fois GitHub Pages et Vercel. Assurez-vous d'utiliser la configuration appropriée pour votre plateforme de déploiement cible.

## Développement local

Pour exécuter l'application en mode développement :

```bash
cd jurisia-interface
npm install
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).
