import { openai } from '../config/api';
import PROMPTS from '../config/prompts';

class PromptService {
  /**
   * Traite un prompt libre et génère une réponse
   * @param {string} prompt - Le prompt de l'utilisateur
   * @param {File} [file] - Fichier optionnel joint à la demande
   * @returns {Promise<Object>} - Résultat du traitement
   */
  static async processPrompt(prompt, file = null) {
    try {
      // Utiliser le prompt système pour le prompt libre
      const systemPrompt = PROMPTS.PROMPT_LIBRE;
      
      // Si un fichier est fourni, nous devrions l'analyser
      // Mais comme nous n'avons pas de backend pour traiter les fichiers,
      // nous allons simplement mentionner le fichier dans le prompt
      let userPrompt = prompt;
      if (file) {
        userPrompt += `\n\nNote: Un fichier nommé "${file.name}" a été joint à cette demande.`;
      }
      
      // Appel à l'API OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      });
      
      // Vérifier la réponse
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }
      
      // Retourner le résultat
      return {
        success: true,
        response: response.choices[0].message.content,
        prompt: prompt
      };
    } catch (error) {
      console.error('Erreur lors du traitement du prompt:', error);
      throw new Error(`Échec du traitement du prompt: ${error.message}`);
    }
  }
  
  /**
   * Améliore un prompt utilisateur pour obtenir de meilleurs résultats
   * @param {string} prompt - Le prompt original de l'utilisateur
   * @returns {Promise<Object>} - Prompt amélioré
   */
  static async improvePrompt(prompt) {
    try {
      // Système prompt pour l'amélioration de prompt
      const systemPrompt = `Tu es un expert juridique spécialisé dans l'amélioration de prompts. 
      Ta mission est d'améliorer le prompt de l'utilisateur pour obtenir une réponse juridique plus précise et complète.
      
      Directives:
      1. Ajoute des précisions juridiques pertinentes
      2. Demande des informations sur les parties concernées si nécessaire
      3. Demande des dates et montants précis si applicable
      4. Suggère une structure pour la réponse
      5. Demande des références aux lois et jurisprudences pertinentes
      
      Format de réponse:
      Retourne uniquement le prompt amélioré, sans explications ni commentaires.`;
      
      // Appel à l'API OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Améliore ce prompt juridique: "${prompt}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      // Vérifier la réponse
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }
      
      // Retourner le prompt amélioré
      return {
        success: true,
        improvedPrompt: response.choices[0].message.content,
        originalPrompt: prompt
      };
    } catch (error) {
      console.error('Erreur lors de l\'amélioration du prompt:', error);
      throw new Error(`Échec de l'amélioration du prompt: ${error.message}`);
    }
  }
}

export default PromptService;
