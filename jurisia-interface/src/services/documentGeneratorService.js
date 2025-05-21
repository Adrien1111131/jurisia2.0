import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, TabStopPosition, TabStopType, LevelFormat, UnderlineType, Table, TableRow, TableCell, WidthType, TableBorders } from 'docx';
import { saveAs } from 'file-saver';
import DocumentService from './documentService';

/**
 * Service pour la génération de documents Word
 */
class DocumentGeneratorService {
  /**
   * Génère un document Word à partir du contenu généré par l'IA
   * @param {string} type - Type de document (contrat, mise_en_demeure, etc.)
   * @param {Object} parameters - Paramètres pour la génération du document
   * @returns {Promise<Blob>} - Document Word généré
   */
  static async generateDocument(type, parameters) {
    try {
      // Génération du contenu avec l'IA via le service DocumentService
      console.log(`Génération du contenu pour un document de type: ${type}`);
      
      // Déterminer le type de document pour le prompt
      let promptType = '';
      switch (type.toLowerCase()) {
        case 'contrat':
          promptType = 'REDACTION.CONTRAT';
          break;
        case 'mise_en_demeure':
        case 'mise en demeure':
          promptType = 'REDACTION.MISE_EN_DEMEURE';
          break;
        case 'courrier':
          promptType = 'REDACTION.COURRIER';
          break;
        case 'politique_aml_kyc':
        case 'politique aml kyc':
          promptType = 'REDACTION.POLITIQUE_AML_KYC';
          break;
        case 'conformite_finma':
        case 'conformité finma':
          promptType = 'REDACTION.CONFORMITE_FINMA';
          break;
        default:
          promptType = 'REDACTION.CONTRAT'; // Par défaut
      }
      
      // Générer le contenu avec l'IA
      const content = await DocumentService.generateContentWithAI(promptType, parameters);
      
      // Créer le document Word avec le contenu généré
      const doc = this.createWordDocument(type, content, parameters);
      
      // Convertir le document en blob
      const blob = await Packer.toBlob(doc);
      
      // Générer un nom de fichier
      const fileName = this.generateFileName(type, parameters);
      
      // Sauvegarder le document
      saveAs(blob, fileName);
      
      return {
        success: true,
        fileName: fileName,
        content: content
      };
    } catch (error) {
      console.error('Erreur lors de la génération du document:', error);
      throw new Error(`Échec de la génération du document: ${error.message}`);
    }
  }
  
  /**
   * Crée un document Word avec le contenu généré
   * @param {string} type - Type de document
   * @param {string} content - Contenu généré par l'IA
   * @param {Object} parameters - Paramètres pour la génération du document
   * @returns {Document} - Document Word
   */
  static createWordDocument(type, content, parameters) {
    // Créer un nouveau document
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              font: "Times New Roman",
              size: 24, // 12pt
              color: "000000"
            },
            paragraph: {
              spacing: {
                line: 360, // 1.5 line spacing
                before: 0,
                after: 240 // 12pt after paragraph
              }
            }
          },
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              font: "Times New Roman",
              size: 32, // 16pt
              bold: true,
              color: "000000"
            },
            paragraph: {
              spacing: {
                before: 480, // 24pt before
                after: 240 // 12pt after
              }
            }
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              font: "Times New Roman",
              size: 28, // 14pt
              bold: true,
              color: "000000"
            },
            paragraph: {
              spacing: {
                before: 360, // 18pt before
                after: 240 // 12pt after
              }
            }
          }
        ]
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch = 1440 twips
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
          children: this.parseContentToDocxElements(content, type)
        }
      ]
    });
    
    return doc;
  }
  
  /**
   * Parse le contenu généré par l'IA en éléments docx
   * @param {string} content - Contenu généré par l'IA
   * @param {string} type - Type de document
   * @returns {Array} - Tableau d'éléments docx
   */
  static parseContentToDocxElements(content, type) {
    // Diviser le contenu en lignes
    const lines = content.split('\n');
    const elements = [];
    
    // Variables pour le parsing
    let inHeading = false;
    let inSubHeading = false;
    let inList = false;
    let listItems = [];
    
    // Parcourir chaque ligne
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Ignorer les lignes vides
      if (line === '') {
        // Si on était dans une liste, ajouter la liste aux éléments
        if (inList && listItems.length > 0) {
          // Ajouter chaque élément de la liste comme un paragraphe avec un tiret
          listItems.forEach(item => {
            elements.push(new Paragraph({
              text: `• ${item}`,
              alignment: AlignmentType.LEFT,
              indent: {
                left: 720, // 0.5 inch = 720 twips
                hanging: 360 // 0.25 inch = 360 twips
              }
            }));
          });
          
          inList = false;
          listItems = [];
        }
        continue;
      }
      
      // Détecter les titres (lignes en majuscules ou commençant par "Article")
      if (line === line.toUpperCase() || line.startsWith('ARTICLE') || line.startsWith('Article')) {
        // Si on était dans une liste, ajouter la liste aux éléments avant d'ajouter le titre
        if (inList && listItems.length > 0) {
          listItems.forEach(item => {
            elements.push(new Paragraph({
              text: `• ${item}`,
              alignment: AlignmentType.LEFT,
              indent: {
                left: 720,
                hanging: 360
              }
            }));
          });
          
          inList = false;
          listItems = [];
        }
        
        elements.push(new Paragraph({
          text: line,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          thematicBreak: true
        }));
        inHeading = true;
        continue;
      }
      
      // Détecter les sous-titres (lignes commençant par un chiffre suivi d'un point)
      if (/^\d+\.\s/.test(line) || /^[A-Z]\.\s/.test(line)) {
        // Si on était dans une liste, ajouter la liste aux éléments avant d'ajouter le sous-titre
        if (inList && listItems.length > 0) {
          listItems.forEach(item => {
            elements.push(new Paragraph({
              text: `• ${item}`,
              alignment: AlignmentType.LEFT,
              indent: {
                left: 720,
                hanging: 360
              }
            }));
          });
          
          inList = false;
          listItems = [];
        }
        
        elements.push(new Paragraph({
          text: line,
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.LEFT
        }));
        inSubHeading = true;
        continue;
      }
      
      // Détecter les listes (lignes commençant par - ou *)
      if (line.startsWith('-') || line.startsWith('*') || line.startsWith('•')) {
        listItems.push(line.substring(1).trim());
        inList = true;
        continue;
      }
      
      // Si on était dans une liste, ajouter la liste aux éléments avant d'ajouter la ligne normale
      if (inList && listItems.length > 0) {
        listItems.forEach(item => {
          elements.push(new Paragraph({
            text: `• ${item}`,
            alignment: AlignmentType.LEFT,
            indent: {
              left: 720,
              hanging: 360
            }
          }));
        });
        
        inList = false;
        listItems = [];
      }
      
      // Ligne normale
      elements.push(new Paragraph({
        text: line,
        alignment: AlignmentType.JUSTIFIED
      }));
    }
    
    // Si on était encore dans une liste à la fin du contenu, ajouter la liste aux éléments
    if (inList && listItems.length > 0) {
      listItems.forEach(item => {
        elements.push(new Paragraph({
          text: `• ${item}`,
          alignment: AlignmentType.LEFT,
          indent: {
            left: 720,
            hanging: 360
          }
        }));
      });
    }
    
    return elements;
  }
  
  /**
   * Génère un nom de fichier pour le document
   * @param {string} type - Type de document
   * @param {Object} parameters - Paramètres pour la génération du document
   * @returns {string} - Nom de fichier
   */
  static generateFileName(type, parameters) {
    const date = new Date().toISOString().split('T')[0];
    let fileName = '';
    
    switch (type.toLowerCase()) {
      case 'contrat':
        fileName = `Contrat_${parameters.type || 'standard'}_${date}.docx`;
        break;
      case 'mise_en_demeure':
      case 'mise en demeure':
        fileName = `Mise_en_demeure_${date}.docx`;
        break;
      case 'courrier':
        fileName = `Courrier_${parameters.objet || 'juridique'}_${date}.docx`;
        break;
      case 'politique_aml_kyc':
      case 'politique aml kyc':
        fileName = `Politique_AML_KYC_${date}.docx`;
        break;
      case 'conformite_finma':
      case 'conformité finma':
        fileName = `Conformite_FINMA_${date}.docx`;
        break;
      default:
        fileName = `Document_${type}_${date}.docx`;
    }
    
    // Remplacer les espaces par des underscores
    return fileName.replace(/\s+/g, '_');
  }
  
  /**
   * Crée un en-tête pour un document
   * @param {string} title - Titre du document
   * @returns {Paragraph} - Paragraphe d'en-tête
   */
  static createHeader(title) {
    return new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      thematicBreak: true
    });
  }
  
  /**
   * Crée un paragraphe avec un texte
   * @param {string} text - Texte du paragraphe
   * @param {AlignmentType} alignment - Alignement du paragraphe
   * @returns {Paragraph} - Paragraphe
   */
  static createParagraph(text, alignment = AlignmentType.JUSTIFIED) {
    return new Paragraph({
      text: text,
      alignment: alignment
    });
  }
  
  /**
   * Crée une section de titre
   * @param {string} text - Texte du titre
   * @param {HeadingLevel} level - Niveau de titre
   * @returns {Paragraph} - Paragraphe de titre
   */
  static createHeading(text, level = HeadingLevel.HEADING_2) {
    return new Paragraph({
      text: text,
      heading: level,
      alignment: AlignmentType.LEFT
    });
  }
}

export default DocumentGeneratorService;
