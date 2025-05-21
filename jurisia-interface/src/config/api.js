import { OpenAI } from 'openai';

// --- Configuration OpenAI ---
export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Permet l'utilisation dans un navigateur
});

// Vérification de la clé API OpenAI
if (!process.env.REACT_APP_OPENAI_API_KEY) {
  console.error("Clé API OpenAI non configurée. Veuillez définir REACT_APP_OPENAI_API_KEY dans le fichier .env");
}

// Note: Les fonctionnalités Google Docs/Drive sont désactivées pour cette version simplifiée
// car elles nécessitent un backend Node.js pour fonctionner correctement.
export const docs = null;
export const drive = null;
