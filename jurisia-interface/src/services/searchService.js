import { openai } from '../config/api';
import PROMPTS from '../config/prompts';

class SearchService {
  /**
   * Effectue une recherche précise dans la base de données juridique
   * @param {string} documentType - Type de document (jurisprudence, doctrine, legislation, esg)
   * @param {string} query - Requête de recherche
   * @param {Object} filters - Filtres de recherche
   * @returns {Promise<Object>} - Résultats de la recherche
   */
  static async search(documentType, query, filters) {
    try {
      // Déterminer le prompt système à utiliser
      let systemPrompt = "";
      
      switch(documentType) {
        case 'jurisprudence':
          systemPrompt = PROMPTS.RECHERCHE.JURISPRUDENCE.PRECISE;
          break;
        case 'doctrine':
          systemPrompt = PROMPTS.RECHERCHE.DOCTRINE.PRECISE;
          break;
        case 'legislation':
          systemPrompt = PROMPTS.RECHERCHE.LEGISLATION.PRECISE;
          break;
        case 'esg':
          systemPrompt = PROMPTS.RECHERCHE.ESG_DROITS_HUMAINS.PRECISE;
          break;
        default:
          throw new Error(`Type de document non pris en charge: ${documentType}`);
      }
      
      // Construire le prompt utilisateur avec la requête et les filtres
      const userPrompt = `Recherche de ${documentType}: ${query}. Filtres appliqués: ${JSON.stringify(filters)}`;
      
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
        temperature: 0.5,
        max_tokens: 2000
      });
      
      // Vérifier la réponse
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }
      
      // Retourner les résultats
      return {
        success: true,
        results: response.choices[0].message.content,
        query: query,
        filters: filters
      };
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw new Error(`Échec de la recherche: ${error.message}`);
    }
  }
  
  /**
   * Effectue une recherche assistée dans la base de données juridique
   * @param {string} documentType - Type de document (jurisprudence, doctrine, legislation, esg)
   * @param {string} query - Requête en langage naturel
   * @returns {Promise<Object>} - Résultats de la recherche
   */
  static async assistedSearch(documentType, query) {
    try {
      // Déterminer le prompt système à utiliser
      let systemPrompt = "";
      
      switch(documentType) {
        case 'jurisprudence':
          systemPrompt = PROMPTS.RECHERCHE.JURISPRUDENCE.ASSISTEE;
          break;
        case 'doctrine':
          systemPrompt = PROMPTS.RECHERCHE.DOCTRINE.ASSISTEE;
          break;
        case 'legislation':
          systemPrompt = PROMPTS.RECHERCHE.LEGISLATION.ASSISTEE;
          break;
        case 'esg':
          systemPrompt = PROMPTS.RECHERCHE.ESG_DROITS_HUMAINS.ASSISTEE;
          break;
        default:
          throw new Error(`Type de document non pris en charge: ${documentType}`);
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
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      });
      
      // Vérifier la réponse
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }
      
      // Retourner les résultats
      return {
        success: true,
        results: response.choices[0].message.content,
        query: query
      };
    } catch (error) {
      console.error('Erreur lors de la recherche assistée:', error);
      throw new Error(`Échec de la recherche assistée: ${error.message}`);
    }
  }
}

export default SearchService;
