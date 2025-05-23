import { generateDocumentPrompt, validateFormData, formatFormData } from './promptService';
import { callOpenAI } from '../config/api';
import mammoth from 'mammoth';

export class ResumeService {
  constructor() {
    // Initialisation du service
  }

  /**
   * Lit le contenu d'un fichier DOCX ou TXT
   * @param {File} file - Le fichier à lire
   * @returns {Promise<string>} Le contenu du fichier
   */
  async readFile(file) {
    try {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Lire un fichier DOCX
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
      } else {
        // Lire un fichier TXT
        return await file.text();
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier:', error);
      throw new Error('Erreur lors de la lecture du fichier. Veuillez réessayer.');
    }
  }

  /**
   * Résume un document juridique
   * @param {string} document - Le document à résumer
   * @param {Object} options - Options de résumé (longueur, focus, etc.)
   * @returns {Promise<string>} Le résumé du document
   */
  async resumeDocument(document, options = {}) {
    try {
      const messages = [
        {
          role: "system",
          content: "Vous êtes un avocat expert spécialisé dans l'analyse et le résumé de documents juridiques."
        },
        {
          role: "user",
          content: `Analysez et résumez ce document juridique de manière concise et professionnelle.

Instructions spécifiques :
1. Identifiez le type de document et son objectif principal
2. Extrayez les points clés et les dispositions importantes
3. Mettez en évidence les obligations principales des parties
4. Notez les dates et délais critiques
5. Signalez les clauses particulières ou inhabituelles
6. Identifiez les risques potentiels ou points d'attention

Format du résumé :
- Introduction : Type et nature du document
- Parties impliquées
- Points essentiels (max 5 points)
- Obligations principales
- Points d'attention particuliers
- Conclusion/Recommandations

Document à analyser :
${document}`
        }
      ];

      return await callOpenAI('chat/completions', messages);

    } catch (error) {
      console.error('Erreur lors du résumé du document:', error);
      throw new Error('Erreur lors de la génération du résumé. Veuillez réessayer.');
    }
  }

  /**
   * Extrait les points clés d'un document
   * @param {string} document - Le document à analyser
   * @returns {Promise<Array<string>>} Les points clés du document
   */
  async extractKeyPoints(document) {
    try {
      const messages = [
        {
          role: "system",
          content: "Vous êtes un expert juridique spécialisé dans l'analyse de documents légaux."
        },
        {
          role: "user",
          content: `Analysez ce document juridique et extrayez-en les points clés les plus importants.
      
Document à analyser :
${document}

Instructions :
1. Identifiez les 5-7 points les plus importants du document
2. Pour chaque point, fournissez une explication concise
3. Concentrez-vous sur les éléments juridiquement significatifs
4. Incluez les obligations principales et les délais critiques`
        }
      ];

      const content = await callOpenAI('chat/completions', messages);
      
      return content
        .split('\n')
        .filter(point => point.trim())
        .map(point => point.replace(/^\d+\.\s*/, '')); // Enlever les numéros au début

    } catch (error) {
      console.error('Erreur lors de l\'extraction des points clés:', error);
      throw new Error('Erreur lors de l\'extraction des points clés. Veuillez réessayer.');
    }
  }

  /**
   * Génère un résumé structuré d'un document
   * @param {string} document - Le document à résumer
   * @returns {Promise<Object>} Le résumé structuré
   */
  async generateStructuredSummary(document) {
    try {
      const messages = [
        {
          role: "system",
          content: "Vous êtes un expert juridique spécialisé dans l'analyse et la synthèse de documents légaux."
        },
        {
          role: "user",
          content: `Générez un résumé structuré de ce document juridique en suivant le format spécifié.

Document à analyser :
${document}

Format requis :
1. Titre et type de document
2. Résumé général (2-3 phrases)
3. Points clés (liste numérotée)
4. Obligations principales des parties
5. Recommandations et points d'attention

Instructions :
- Soyez concis et précis
- Utilisez un langage juridique professionnel
- Mettez en évidence les éléments critiques
- Incluez les dates et délais importants`
        }
      ];

      const content = await callOpenAI('chat/completions', messages);
      
      // Parser le contenu en sections structurées
      const sections = content.split('\n\n').filter(section => section.trim());
      
      return {
        title: sections[0],
        summary: sections[1],
        keyPoints: sections[2].split('\n')
          .filter(point => point.trim())
          .map(point => point.replace(/^\d+\.\s*/, '')), // Enlever les numéros au début
        recommendations: sections[3].split('\n')
          .filter(rec => rec.trim())
          .map(rec => rec.replace(/^[-•]\s*/, '')) // Enlever les puces au début
      };

    } catch (error) {
      console.error('Erreur lors de la génération du résumé structuré:', error);
      throw new Error('Erreur lors de la génération du résumé structuré. Veuillez réessayer.');
    }
  }
}

export const resumeService = new ResumeService();
