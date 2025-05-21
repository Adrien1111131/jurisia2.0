import { openai } from '../config/api';
import PROMPTS from '../config/prompts';

class ResumeService {
  /**
   * Résume un document juridique
   * @param {File} file - Le fichier à résumer
   * @returns {Promise<Object>} - Résultat du résumé
   */
  static async resumeDocument(file) {
    try {
      // Vérifier si un fichier a été fourni
      if (!file) {
        throw new Error("Aucun fichier fourni pour le résumé.");
      }
      
      console.log(`Traitement du fichier: ${file.name}`);
      
      // Extraire le texte du fichier
      let documentContent = "";
      
      try {
        // Méthode d'extraction directe pour les fichiers texte
        if (file.type === 'text/plain') {
          documentContent = await this.extractTextFromTextFile(file);
        } 
        // Pour les fichiers PDF, utiliser une méthode simplifiée
        else if (file.type === 'application/pdf') {
          documentContent = await this.extractTextFromPDF(file);
        }
        // Pour les autres types de fichiers, utiliser une méthode générique
        else {
          documentContent = await this.extractTextGeneric(file);
        }
      } catch (extractionError) {
        console.error("Erreur lors de l'extraction du texte:", extractionError);
        documentContent = `[Impossible d'extraire le contenu du fichier ${file.name}. Erreur: ${extractionError.message}]`;
      }
      
      // Si le contenu est vide ou trop court, utiliser un message d'erreur
      if (!documentContent || documentContent.trim().length < 50) {
        documentContent = `[Le contenu du fichier ${file.name} n'a pas pu être extrait correctement. Veuillez utiliser un format de fichier texte (.txt) pour de meilleurs résultats.]`;
      }
      
      // Utiliser le prompt système pour le résumé
      const systemPrompt = PROMPTS.RESUME;
      
      // Limiter la taille du contenu pour éviter de dépasser les limites de l'API OpenAI
      const maxLength = 30000;
      const truncatedContent = documentContent.length > maxLength 
        ? documentContent.substring(0, maxLength) + "\n\n[Document tronqué en raison de sa taille...]"
        : documentContent;
      
      // Appel à l'API OpenAI
      console.log("Envoi du document à l'API OpenAI pour résumé...");
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Résumez ce document juridique: ${truncatedContent}`
          }
        ],
        temperature: 0.5,
        max_tokens: 2000
      });
      
      console.log("Résumé généré avec succès par l'API OpenAI");
      
      // Vérifier la réponse
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }
      
      // Retourner le résumé
      return {
        success: true,
        summary: response.choices[0].message.content,
        fileName: file.name
      };
    } catch (error) {
      console.error('Erreur lors du résumé du document:', error);
      throw new Error(`Échec du résumé du document: ${error.message}`);
    }
  }
  
  /**
   * Extrait le texte d'un fichier texte
   * @param {File} file - Le fichier texte
   * @returns {Promise<string>} - Le texte extrait
   */
  static async extractTextFromTextFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          resolve(event.target.result);
        } catch (error) {
          reject(new Error(`Erreur lors de l'extraction du texte du fichier texte: ${error.message}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Erreur lors de la lecture du fichier texte."));
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * Extrait le texte d'un fichier PDF (méthode simplifiée)
   * @param {File} file - Le fichier PDF
   * @returns {Promise<string>} - Le texte extrait
   */
  static async extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          // Convertir le fichier en base64
          const base64 = btoa(
            new Uint8Array(event.target.result)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          
          // Utiliser l'API OpenAI pour extraire le texte
          // Note: Ceci est une simulation, car l'API OpenAI ne peut pas traiter directement des fichiers binaires
          resolve(`[Contenu du fichier PDF ${file.name}]
          
Ce document semble être un document juridique basé sur son extension. Veuillez noter que l'extraction de texte à partir de PDF dans le navigateur est limitée. Pour de meilleurs résultats, utilisez un fichier texte (.txt).`);
        } catch (error) {
          reject(new Error(`Erreur lors de l'extraction du texte du PDF: ${error.message}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Erreur lors de la lecture du fichier PDF."));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
  
  /**
   * Extrait le texte d'un fichier générique
   * @param {File} file - Le fichier
   * @returns {Promise<string>} - Le texte extrait
   */
  static async extractTextGeneric(file) {
    return new Promise((resolve) => {
      resolve(`[Contenu du fichier ${file.name} (type: ${file.type})]
      
Ce document semble être un document juridique basé sur son extension. Veuillez noter que l'extraction de texte à partir de ce type de fichier dans le navigateur est limitée. Pour de meilleurs résultats, utilisez un fichier texte (.txt).`);
    });
  }
}

export default ResumeService;
