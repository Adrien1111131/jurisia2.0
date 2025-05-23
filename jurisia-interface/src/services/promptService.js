import { generatePrompt } from '../config/prompts';
import { callOpenAI } from '../config/api';
import { masterPrompt } from '../config/prompts/masterPrompt';

// Fonction pour générer un prompt libre et obtenir une réponse
export const generateFreePrompt = async (userPrompt) => {
  try {
    // Créer un message système basé sur le masterPrompt avec instruction spécifique pour du texte brut
    const systemMessage = {
      role: 'system',
      content: `${masterPrompt}

IMPORTANT: Répondez uniquement en texte brut. N'utilisez PAS de balises HTML, de code, ou de formatage spécial. 
Votre réponse doit être claire, bien structurée et facile à lire, en utilisant uniquement du texte standard.
Utilisez des paragraphes, des tirets, des numéros et des espaces pour organiser votre réponse de manière lisible.`
    };
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      role: 'user',
      content: userPrompt
    };
    
    // Appeler l'API avec ces messages
    const response = await callOpenAI('chat/completions', [systemMessage, userMessage]);
    return response;
  } catch (error) {
    console.error('Erreur lors de la génération du prompt libre :', error);
    throw error;
  }
};

// Fonction pour générer un prompt pour un document spécifique
export const generateDocumentPrompt = async (category, option, type, data, fields) => {
  try {
    // Utiliser la nouvelle structure de prompts modulaire
    const documentType = 'contratsEtActes';
    const options = {
      type: mapCategoryToType(category),
      sousType: option,
      variante: type,
      modules: getRequiredModules(category, option, fields),
      variables: formatFormData(fields, data)
    };

    return generatePrompt(documentType, options);
  } catch (error) {
    console.error('Erreur lors de la génération du prompt :', error);
    throw error;
  }
};

// Fonction pour mapper les catégories aux types de prompts
const mapCategoryToType = (category) => {
  const mapping = {
    contrats_standards: 'contrat',
    contrats_specifiques: 'contrat',
    actes_juridiques: 'acte'
  };
  return mapping[category] || 'contrat';
};

// Fonction pour déterminer les modules nécessaires
const getRequiredModules = (category, option, fields) => {
  const modules = [];

  // Ajouter les modules de base
  modules.push('sections.identification');
  modules.push('sections.signatures');

  // Ajouter les modules spécifiques selon les champs requis
  if (fields.some(f => f.id.includes('confidentialite'))) {
    modules.push('clauses.confidentialite.standard');
  }
  if (fields.some(f => f.id.includes('responsabilite'))) {
    modules.push('clauses.responsabilite.standard');
  }
  if (fields.some(f => f.id.includes('resiliation'))) {
    modules.push('clauses.resiliation.standard');
  }

  // Ajouter des modules spécifiques selon le type de document
  switch (option) {
    case 'nda':
      modules.push('clauses.confidentialite.renforcee');
      break;
    case 'contrat_prestation':
      modules.push('clauses.responsabilite.complete');
      break;
    case 'contrat_travail':
      modules.push('clauses.responsabilite.limitee');
      break;
  }

  return modules;
};

// Fonction pour valider les données du formulaire
export const validateFormData = (fields, data) => {
  const missingFields = fields
    .filter(field => field.required && !data[field.id])
    .map(field => field.label);

  if (missingFields.length > 0) {
    throw new Error(`Champs requis manquants : ${missingFields.join(', ')}`);
  }

  return true;
};

// Fonction pour formater les données du formulaire
export const formatFormData = (fields, data) => {
  const formatted = fields.reduce((acc, field) => {
    // Formater la valeur selon le type de champ
    let value = data[field.id] || '';
    
    // Nettoyage et validation des données
    value = value.trim();
    
    // Formatage spécifique selon le type de champ
    switch (field.type) {
      case 'textarea':
        // Assurer un formatage cohérent des paragraphes
        value = value.replace(/\n+/g, '\n\n').trim();
        break;
      case 'text':
        // Capitaliser la première lettre pour les champs texte
        value = value.charAt(0).toUpperCase() + value.slice(1);
        break;
    }
    
    acc[field.id] = value;
    return acc;
  }, {});

  // Ajouter des métadonnées utiles
  formatted.date_generation = new Date().toLocaleDateString('fr-FR');
  formatted.version_document = '1.0';

  return formatted;
};
