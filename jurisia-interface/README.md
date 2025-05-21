# Jurisia - Interface d'Assistant Juridique IA

Jurisia est une interface web moderne permettant d'accéder à des fonctionnalités d'assistance juridique alimentées par l'intelligence artificielle.

## Fonctionnalités

- **Résumé de documents juridiques** : Téléchargez un document juridique pour en obtenir un résumé automatique.
- **Rédaction de documents** : Générez différents types de documents juridiques :
  - Contrats
  - Mises en demeure
  - Courriers juridiques
  - Documents de conformité FINMA
  - Politiques AML/KYC
- **Recherche documentaire** : Accédez à des bases de données juridiques :
  - Jurisprudence
  - Doctrine
  - Législation
  - ESG/Droits humains
- **Prompt libre** : Interface conversationnelle pour des questions juridiques personnalisées.

## Configuration

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Clé API OpenAI

### Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-organisation/jurisia-interface.git
cd jurisia-interface
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec votre clé API OpenAI :
```
REACT_APP_OPENAI_API_KEY=votre_cle_api_openai_ici
```

### Configuration de Google Docs/Drive (optionnel)

Pour la génération de documents avec export vers Google Docs, configurez les variables d'environnement suivantes :

```
GOOGLE_APPLICATION_CREDENTIALS=chemin/vers/votre/credentials.json
```

Ou pour un déploiement en production :

```
GOOGLE_CREDENTIALS_JSON={"client_email":"...","private_key":"..."}
```

## Démarrage

Pour lancer l'application en mode développement :

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Architecture

- **src/components/** : Composants React réutilisables
- **src/pages/** : Pages de l'application
- **src/services/** : Services pour l'interaction avec les APIs
- **src/config/** : Configuration de l'application
  - **api.js** : Configuration des APIs (OpenAI, Google)
  - **prompts.js** : Prompts système pour les différentes fonctionnalités

## Prompts Système

L'application utilise des prompts système spécifiques pour chaque fonctionnalité :

- **Résumé de documents** : Analyse et synthèse de documents juridiques
- **Recherche documentaire** : Prompts spécifiques pour chaque type de recherche (jurisprudence, doctrine, etc.)
- **Prompt libre** : Interface conversationnelle générique

Ces prompts sont configurés dans le fichier `src/config/prompts.js`.

## Déploiement

### Déploiement local

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers générés seront placés dans le dossier `build/`.

### Déploiement sur Vercel

Cette application est configurée pour être déployée sur Vercel. Pour déployer l'application sur Vercel :

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement dans le tableau de bord Vercel :
   - `REACT_APP_OPENAI_API_KEY` : Votre clé API OpenAI

La configuration Vercel est déjà définie dans le fichier `vercel.json` à la racine du projet, avec :
- La commande de build appropriée
- Le répertoire de sortie
- Les routes pour le routage côté client

Vercel détectera automatiquement que c'est une application React et utilisera la configuration du fichier `vercel.json`.

## Licence

[Insérer informations de licence]
