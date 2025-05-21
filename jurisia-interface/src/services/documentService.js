import { openai } from '../config/api';
import PROMPTS from '../config/prompts';

class DocumentService {
  static async generateContentWithAI(type, parameters) {
    // Vérifie si l'instance OpenAI est disponible
    if (!openai) {
      throw new Error("OpenAI API n'est pas configurée ou la clé API est manquante.");
    }
    
    // Sélectionne le prompt système approprié en fonction du type de document
    let systemPrompt = "";
    
    // Vérifier si le type est un chemin de prompt (ex: "REDACTION.CONTRAT")
    if (type.includes('.')) {
      // Essayer d'accéder au prompt directement via le chemin
      try {
        const promptPath = type.split('.');
        let currentPrompt = PROMPTS;
        
        // Parcourir le chemin pour accéder au prompt
        for (const part of promptPath) {
          currentPrompt = currentPrompt[part];
        }
        
        if (currentPrompt && typeof currentPrompt === 'string') {
          systemPrompt = currentPrompt;
          console.log(`Utilisation du prompt spécifique: ${type}`);
        } else {
          throw new Error(`Prompt non trouvé pour le chemin: ${type}`);
        }
      } catch (error) {
        console.warn(`Erreur lors de l'accès au prompt ${type}: ${error.message}`);
        // Continuer avec la logique existante si le chemin direct échoue
      }
    }
    
    // Si aucun prompt n'a été trouvé via le chemin direct, utiliser la logique existante
    if (!systemPrompt) {
      // Détermine le prompt système à utiliser
      if (type.toLowerCase().includes('résumé') || type.toLowerCase().includes('resume')) {
        systemPrompt = PROMPTS.RESUME;
      } else if (type.toLowerCase().includes('recherche')) {
        // Sous-types de recherche
        if (type.toLowerCase().includes('jurisprudence')) {
          systemPrompt = parameters.assistedSearch ? 
            PROMPTS.RECHERCHE.JURISPRUDENCE.ASSISTEE : 
            PROMPTS.RECHERCHE.JURISPRUDENCE.PRECISE;
        } else if (type.toLowerCase().includes('doctrine')) {
          systemPrompt = parameters.assistedSearch ? 
            PROMPTS.RECHERCHE.DOCTRINE.ASSISTEE : 
            PROMPTS.RECHERCHE.DOCTRINE.PRECISE;
        } else if (type.toLowerCase().includes('législation') || type.toLowerCase().includes('legislation')) {
          systemPrompt = parameters.assistedSearch ? 
            PROMPTS.RECHERCHE.LEGISLATION.ASSISTEE : 
            PROMPTS.RECHERCHE.LEGISLATION.PRECISE;
        } else if (type.toLowerCase().includes('esg') || type.toLowerCase().includes('droits humains')) {
          systemPrompt = parameters.assistedSearch ? 
            PROMPTS.RECHERCHE.ESG_DROITS_HUMAINS.ASSISTEE : 
            PROMPTS.RECHERCHE.ESG_DROITS_HUMAINS.PRECISE;
        }
      } else if (type.toLowerCase().includes('prompt libre')) {
        systemPrompt = PROMPTS.PROMPT_LIBRE;
      } else if (type.toLowerCase().includes('contrat')) {
        systemPrompt = PROMPTS.REDACTION.CONTRAT;
      } else if (type.toLowerCase().includes('mise en demeure') || type.toLowerCase().includes('mise_en_demeure')) {
        systemPrompt = PROMPTS.REDACTION.MISE_EN_DEMEURE;
      } else if (type.toLowerCase().includes('courrier')) {
        systemPrompt = PROMPTS.REDACTION.COURRIER;
      } else if (type.toLowerCase().includes('politique aml kyc') || type.toLowerCase().includes('politique_aml_kyc')) {
        systemPrompt = PROMPTS.REDACTION.POLITIQUE_AML_KYC;
      } else if (type.toLowerCase().includes('conformité finma') || type.toLowerCase().includes('conformite_finma')) {
        systemPrompt = PROMPTS.REDACTION.CONFORMITE_FINMA;
      } else {
        // Prompt par défaut pour les autres types de documents
        systemPrompt = "Vous êtes un assistant juridique expert. Générez le contenu de documents juridiques professionnels basé sur les paramètres fournis. Le contenu doit être textuel sans formatage spécifique au début.";
      }
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4", // ou un autre modèle selon les besoins
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Générez le contenu textuel pour un document de type juridique: ${type}. Utilisez les informations suivantes pour la rédaction: ${JSON.stringify(parameters)}. Concentrez-vous uniquement sur le texte du document, sans introduction ni conclusion générale.` // Prompt utilisateur précis
          }
        ],
        temperature: 0.7,
        max_tokens: 3000, // Augmente les tokens pour les documents plus longs
        response_format: { type: "text" } // Assure un retour textuel simple
      });

      // Gérer les cas où la réponse pourrait être vide ou indéfinie
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
      }

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur OpenAI lors de la génération de contenu:', error);
      throw new Error(`Échec de la génération de contenu via OpenAI: ${error.message}`);
    }
  }

  static async generateDocument(type, parameters) {
    try {
      // Génération du contenu avec l'IA
      console.log(`Génération du contenu avec l'IA pour le type: ${type}...`);
      const content = await this.generateContentWithAI(type, parameters);
      console.log("Contenu généré par l'IA.");
      
      // Dans cette version simplifiée, nous retournons simplement le contenu généré
      // sans créer de document Google Docs
      return { 
        success: true, 
        content: content,
        message: "Contenu généré avec succès. La fonctionnalité d'export vers Google Docs n'est pas disponible dans cette version."
      };
    } catch (error) {
      console.error('Erreur lors de la génération du document:', error);
      throw new Error(`Échec de la génération du document: ${error.message}`);
    }
  }
}

export default DocumentService;
