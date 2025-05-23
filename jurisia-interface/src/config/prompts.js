import { masterPrompt } from './prompts/masterPrompt';
import { documentTypes } from './documentTypes';
import { legalRequirements, legalMentions, legalFormulas } from './prompts/legalRequirements';

// Fonction pour obtenir le label d'un type de document
const getDocumentTypeLabel = (category, option, type) => {
  try {
    return documentTypes[category]?.options[option]?.types[type]?.label || '';
  } catch (error) {
    return '';
  }
};

// Fonction pour générer le prompt final avec les informations spécifiques
export const generatePrompt = (documentType, options = {}) => {
  const {
    type,
    sousType,
    formData = {},
    specificInstructions = ''
  } = options;

  // Obtenir le label du type de document
  const documentLabel = getDocumentTypeLabel(documentType, type, sousType);

  // Construire la section des informations spécifiques
  const specificInfos = Object.entries(formData)
    .filter(([_, value]) => value) // Ignorer les valeurs vides
    .map(([key, value]) => `- ${key} : ${value}`)
    .join('\n');

  // Déterminer les exigences légales applicables
  let legalRequirementsText = '';
  if (documentType === 'contrats_actes') {
    if (type === 'contrats_standards' || type === 'contrats_specifiques') {
      legalRequirementsText = legalRequirements.contrats;
    } else if (type === 'actes_juridiques') {
      legalRequirementsText = legalRequirements.actes;
    }
  } else if (documentType === 'contentieux_arbitrage') {
    if (type === 'procedures' && sousType === 'assignation') {
      legalRequirementsText = `
Instructions légales pour les assignations :
1. Inclure les mentions obligatoires de l'article 56 du Code de procédure civile
2. Préciser la juridiction compétente
3. Indiquer les délais de comparution
4. Mentionner les pièces jointes
5. Inclure les références aux textes de loi applicables`;
    }
  }

  // Obtenir les mentions légales spécifiques au type de document
  let legalMentionsText = '';
  if (type === 'contrat_prestation' || type === 'contrats_standards') {
    legalMentionsText = formatLegalMentions(legalMentions.contratPrestation);
  } else if (type === 'contrat_travail') {
    legalMentionsText = formatLegalMentions(legalMentions.contratTravail);
  } else if (type === 'bail') {
    legalMentionsText = formatLegalMentions(legalMentions.bail);
  } else if (type === 'nda') {
    legalMentionsText = formatLegalMentions(legalMentions.nda);
  }

  // Obtenir les formules juridiques appropriées
  const introFormula = legalFormulas.introduction[0];
  const conclusionFormula = legalFormulas.conclusion[0];
  const signatureFormula = legalFormulas.signatures[0];

  // Construire le prompt final
  const finalPrompt = `${masterPrompt}

Type de document : ${documentLabel || documentType}
Catégorie : ${documentType}
Type : ${type || 'standard'}
Variante : ${sousType || 'base'}

Informations spécifiques :
${specificInfos}

${specificInstructions ? `Instructions spécifiques pour ce type de document :
${specificInstructions}

` : ''}${legalRequirementsText ? `Exigences légales applicables :
${legalRequirementsText}

` : ''}${legalMentionsText ? `Mentions légales obligatoires à inclure :
${legalMentionsText}

` : ''}Formules juridiques à utiliser :
- Introduction : "${introFormula}"
- Conclusion : "${conclusionFormula}"
- Signatures : "${signatureFormula}"

Instructions pour la génération :
1. Générez un document juridique complet et détaillé en utilisant les informations fournies ci-dessus
2. Incluez toutes les clauses nécessaires et pertinentes pour ce type de document
3. Utilisez un langage juridique précis et professionnel
4. Structurez le document de manière claire avec des sections numérotées
5. N'omettez aucune information importante fournie dans les données
6. Incluez les mentions légales obligatoires et références aux textes de loi applicables
7. Prévoyez les espaces pour paraphes sur chaque page
8. Ajoutez la mention "Fait en [nombre] exemplaires originaux" à la fin du document
9. Incluez la formule "Bon pour accord" avant les signatures
10. Numérotez les articles et paragraphes selon les standards juridiques (1.1, 1.1.1, etc.)
11. Utilisez les formules juridiques consacrées fournies ci-dessus
12. Incluez les visas des textes de loi applicables en préambule

Veuillez générer le contenu complet du document maintenant.`;

  return finalPrompt;
};

// Fonction pour formater les mentions légales
function formatLegalMentions(mentions) {
  if (!mentions || !Array.isArray(mentions)) return '';
  return mentions.map(mention => `- ${mention}`).join('\n');
}

// Exporter le prompt principal pour référence
export const documentPrompts = {
  master: masterPrompt,
  legalRequirements,
  legalMentions,
  legalFormulas
};
