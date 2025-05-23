import { generatePrompt } from '../config/prompts';
import { documentTypes } from '../config/documentTypes';
import { legalRequirements, legalMentions, legalFormulas } from '../config/prompts/legalRequirements';

export class DocumentGeneratorService {
  constructor() {
    this.openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
  }

  /**
   * Obtient les instructions spécifiques pour un type de document
   */
  getSpecificInstructions(category, option, type) {
    try {
      const docType = documentTypes[category]?.options[option]?.types[type];
      if (!docType) return '';

      // Récupérer les instructions légales générales
      let legalInstructionsGeneral = legalRequirements.general || '';
      
      // Récupérer les instructions légales spécifiques à la catégorie
      let legalInstructionsCategory = '';
      if (category === 'contrats_actes') {
        if (option === 'contrats_standards' || option === 'contrats_specifiques') {
          legalInstructionsCategory = legalRequirements.contrats || '';
        } else if (option === 'actes_juridiques') {
          legalInstructionsCategory = legalRequirements.actes || '';
        }
      }
      
      // Récupérer les mentions légales spécifiques au type de document
      let legalMentionsForType = '';
      if (option === 'contrat_prestation') {
        legalMentionsForType = this.formatLegalMentions(legalMentions.contratPrestation);
      } else if (option === 'contrat_travail') {
        legalMentionsForType = this.formatLegalMentions(legalMentions.contratTravail);
      } else if (option === 'bail') {
        legalMentionsForType = this.formatLegalMentions(legalMentions.bail);
      } else if (option === 'nda') {
        legalMentionsForType = this.formatLegalMentions(legalMentions.nda);
      }

      // Instructions spécifiques selon le type de document
      const specificInstructions = {
        // Contrats standards
        nda: `
Instructions spécifiques pour un accord de confidentialité (NDA) :
- Définir clairement les informations confidentielles
- Spécifier la durée de l'obligation de confidentialité
- Détailler les exceptions à la confidentialité
- Inclure les pénalités en cas de violation
- Prévoir les conditions de restitution/destruction des informations
- Référencer les articles 1112-11 et 1112-2 du Code civil sur la confidentialité des négociations
- Inclure une clause de juridiction compétente et droit applicable`,

        contrat_prestation: `
Instructions spécifiques pour un contrat de prestation :
- Décrire précisément la mission et les livrables
- Définir le calendrier et les délais
- Spécifier les conditions de paiement
- Inclure les clauses de propriété intellectuelle
- Détailler les conditions de modification/résiliation
- Référencer l'article 1710 du Code civil définissant le contrat de louage d'ouvrage
- Inclure une clause de non-sollicitation
- Prévoir les modalités de réception des livrables`,

        contrat_travail: `
Instructions spécifiques pour un contrat de travail :
- Définir le poste et les responsabilités
- Spécifier les conditions de rémunération
- Inclure les clauses sur le temps de travail
- Détailler les avantages sociaux
- Préciser la période d'essai
- Mentionner la convention collective applicable
- Inclure les obligations de confidentialité et de loyauté
- Référencer les articles L1221-1 et suivants du Code du travail`,

        bail: `
Instructions spécifiques pour un bail :
- Décrire précisément le bien loué et sa surface
- Mentionner le DPE et la classe énergétique
- Préciser le montant du loyer et des charges
- Détailler les conditions d'indexation
- Spécifier le montant du dépôt de garantie
- Inclure les obligations d'assurance
- Référencer la loi du 6 juillet 1989 pour les baux d'habitation
- Mentionner l'état des lieux d'entrée et de sortie`,

        // Clauses types
        limitation_responsabilite: `
Instructions spécifiques pour une clause de limitation de responsabilité :
- Définir clairement le plafond de responsabilité
- Lister les exclusions spécifiques
- Respecter les limites légales
- Prévoir les cas de force majeure
- Référencer l'article 1231-3 du Code civil`,

        force_majeure: `
Instructions spécifiques pour une clause de force majeure :
- Définir les événements qualifiés de force majeure
- Spécifier les obligations des parties
- Prévoir la durée maximale
- Détailler la procédure de notification
- Référencer l'article 1218 du Code civil`,

        // Contrats spécifiques
        ma: `
Instructions spécifiques pour un contrat M&A :
- Détailler les conditions de la transaction
- Inclure les garanties d'actif et de passif
- Spécifier les conditions suspensives
- Prévoir les ajustements de prix
- Référencer les articles L141-1 et suivants du Code de commerce pour les cessions de fonds de commerce
- Inclure les déclarations et garanties du vendeur`,

        financement: `
Instructions spécifiques pour un contrat de financement :
- Détailler les conditions du financement
- Spécifier les garanties requises
- Inclure les covenants financiers
- Prévoir les cas de défaut
- Référencer les articles L313-1 et suivants du Code de la consommation pour les crédits à la consommation
- Mentionner le TEG (Taux Effectif Global)`,

        // Actes juridiques
        statuts: `
Instructions spécifiques pour des statuts :
- Définir l'objet social
- Détailler la gouvernance
- Spécifier les règles de transfert des parts
- Inclure les clauses de sortie
- Référencer les articles L210-1 et suivants du Code de commerce
- Prévoir les modalités de résolution des conflits entre associés`,

        pv_ag: `
Instructions spécifiques pour un PV d'AG :
- Respecter les formalités légales
- Retranscrire fidèlement les débats
- Détailler les résolutions
- Inclure les modalités de vote
- Référencer les articles L225-96 et suivants du Code de commerce pour les SA
- Mentionner les quorums et majorités requis`
      };

      // Combiner toutes les instructions
      return `${specificInstructions[option] || ''}

${legalInstructionsGeneral}

${legalInstructionsCategory}

${legalMentionsForType ? `Mentions légales obligatoires à inclure :
${legalMentionsForType}` : ''}

Formules juridiques à utiliser :
- Introduction : "${legalFormulas.introduction[0]}"
- Conclusion : "${legalFormulas.conclusion[0]}"
- Signatures : "${legalFormulas.signatures[0]}"`;
    } catch (error) {
      console.error('Erreur lors de la récupération des instructions spécifiques:', error);
      return '';
    }
  }

  /**
   * Formate les mentions légales en texte
   */
  formatLegalMentions(mentions) {
    if (!mentions || !Array.isArray(mentions)) return '';
    return mentions.map(mention => `- ${mention}`).join('\n');
  }

  /**
   * Génère un document juridique basé sur le type et les données fournies
   */
  async generateDocument(category, option, type, formData) {
    try {
      console.log('Début de la génération du document avec:', {
        category,
        option,
        type,
        formData
      });

      // Obtenir les instructions spécifiques pour ce type de document
      const specificInstructions = this.getSpecificInstructions(category, option, type);

      // Générer le prompt avec les informations fournies
      const prompt = generatePrompt(category, {
        type: option,
        sousType: type,
        formData: formData,
        specificInstructions
      });

      console.log('Prompt généré:', prompt.substring(0, 200) + '...');

      // Appeler l'API OpenAI pour générer le contenu
      const content = await this.callOpenAI(prompt);
      console.log('Contenu généré:', content.substring(0, 200) + '...');
      
      // Formater le contenu en HTML
      const formattedContent = this.formatHtmlDocument(content);
      
      return formattedContent;
    } catch (error) {
      console.error("Erreur détaillée lors de la génération du document :", error);
      throw new Error(`Erreur lors de la génération du document : ${error.message}`);
    }
  }

  /**
   * Formate le contenu en HTML avec des styles appropriés
   */
  formatHtmlDocument(content) {
    try {
      // Vérifier si le contenu contient déjà des balises HTML
      const hasHtml = /<[a-z][\s\S]*>/i.test(content);
      
      let htmlContent;
      
      if (hasHtml) {
        // Le contenu est déjà en HTML
        htmlContent = content;
      } else {
        // Convertir le texte brut en HTML
        htmlContent = this.convertTextToHtml(content);
      }
      
      // Ajouter les styles CSS
      return this.addDocumentStyles(htmlContent);
    } catch (error) {
      console.error("Erreur lors du formatage HTML:", error);
      throw new Error("Impossible de formater le document en HTML");
    }
  }

  /**
   * Convertit le texte brut en HTML structuré
   */
  convertTextToHtml(text) {
    try {
      // Séparer le texte en sections
      const sections = text.split('\n\n');
      
      // Convertir chaque section en HTML
      const htmlSections = sections.map((section, index) => {
        // Détecter le type de section
        if (index === 0) {
          // Premier bloc = titre principal
          return `<h1>${section.trim()}</h1>`;
        } else if (section.match(/^ARTICLE|^SECTION|^TITRE/i)) {
          // Sections et articles
          return `<h2>${section.trim()}</h2>`;
        } else if (section.match(/^ENTRE|^PRÉAMBULE|^SIGNATURE/i)) {
          // Sections spéciales
          return `<div class="section-special"><h2>${section.trim()}</h2></div>`;
        } else if (section.match(/^\d+\./)) {
          // Liste numérotée
          return `<div class="clause">${section.trim()}</div>`;
        } else {
          // Paragraphe normal
          return `<p>${section.trim()}</p>`;
        }
      });

      return htmlSections.join('\n');
    } catch (error) {
      console.error("Erreur lors de la conversion en HTML:", error);
      throw new Error("Impossible de convertir le texte en HTML");
    }
  }

  /**
   * Ajoute les styles CSS au document HTML
   */
  addDocumentStyles(html) {
    return `
<div class="document-juridique">
  <style>
    .document-juridique {
      background: white;
      color: #333;
      padding: 40px;
      margin: 20px auto;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-family: 'Times New Roman', Times, serif;
      line-height: 1.5;
      max-width: 800px;
    }
    .document-juridique h1 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
      text-transform: uppercase;
    }
    .document-juridique h2 {
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .document-juridique .clause {
      margin: 15px 0;
      padding-left: 20px;
    }
    .document-juridique .section-special {
      margin: 25px 0;
    }
    .document-juridique p {
      margin: 10px 0;
      text-align: justify;
    }
  </style>
  ${html}
</div>`;
  }

  /**
   * Appelle l'API OpenAI pour générer le contenu
   */
  async callOpenAI(prompt) {
    try {
      if (!this.openaiApiKey) {
        throw new Error("Clé API OpenAI manquante");
      }

      console.log('Appel API OpenAI avec la clé:', this.openaiApiKey ? 'présente' : 'manquante');
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.openaiApiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `Vous êtes un avocat expert en droit, spécialisé dans la rédaction de documents juridiques professionnels. Votre tâche est de générer un document juridique complet et détaillé en utilisant les informations fournies. Agissez comme un véritable avocat qui rédige un document juridique officiel pour un client.

Instructions importantes :
1. Utilisez les informations fournies pour créer un document juridique pertinent et professionnel
2. N'ajoutez pas d'avertissements ou de disclaimers
3. Incluez toutes les clauses nécessaires pour le type de document demandé
4. Utilisez un langage juridique précis et professionnel
5. Structurez le document de manière claire avec :
   - Un titre principal
   - Des sections clairement identifiées (ENTRE, PRÉAMBULE, etc.)
   - Des articles numérotés
   - Des clauses bien structurées
   - Une section pour les signatures

Format du document :
- Séparez les sections par des lignes vides
- Utilisez des titres en majuscules pour les sections principales
- Numérotez les articles (ARTICLE 1, ARTICLE 2, etc.)
- Utilisez une structure claire et cohérente`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      console.log('Réponse API status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API détaillée:', errorData);
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse API reçue:', data.choices ? 'données valides' : 'données invalides');
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Réponse API invalide");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Erreur détaillée lors de l'appel à OpenAI:", error);
      throw new Error(`Erreur lors de l'appel à l'API : ${error.message}`);
    }
  }
}

export const documentGeneratorService = new DocumentGeneratorService();
