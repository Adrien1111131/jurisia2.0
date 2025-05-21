import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFileWord, FaSpinner, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import DocumentGeneratorService from '../services/documentGeneratorService';

// Styles
const GeneratorContainer = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 0 8px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: var(--primary-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background: linear-gradient(45deg, #7b21dc, #3585ff);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(106, 17, 203, 0.4);
  }
  
  &:disabled {
    background: #4a4a6a;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  &.loading {
    background: rgba(37, 117, 252, 0.1);
    color: #2575fc;
    border: 1px solid rgba(37, 117, 252, 0.3);
  }
  
  &.success {
    background: rgba(39, 174, 96, 0.1);
    color: #27ae60;
    border: 1px solid rgba(39, 174, 96, 0.3);
  }
  
  &.error {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
    border: 1px solid rgba(231, 76, 60, 0.3);
  }
`;

const DocumentPreview = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(42, 47, 69, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(106, 17, 203, 0.3);
  white-space: pre-line;
  max-height: 300px;
  overflow-y: auto;
  
  h3 {
    margin-bottom: 15px;
    color: var(--text-primary);
    font-size: 1.2rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

// Composant principal
const DocumentGenerator = ({ documentType }) => {
  // États
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    parties: '',
    objet: '',
    duree: '',
    details: ''
  });
  
  // Déterminer les champs à afficher en fonction du type de document
  const [fields, setFields] = useState([]);
  
  // Effet pour initialiser les champs en fonction du type de document
  useEffect(() => {
    if (!documentType) return;
    
    let typeFields = [];
    
    switch (documentType.toLowerCase()) {
      case 'contrat':
        typeFields = [
          { id: 'type', label: 'Type de contrat', type: 'select', options: [
            { value: 'prestation_services', label: 'Prestation de services' },
            { value: 'vente', label: 'Vente' },
            { value: 'bail', label: 'Bail' },
            { value: 'travail', label: 'Contrat de travail' },
            { value: 'confidentialite', label: 'Confidentialité' },
            { value: 'autre', label: 'Autre' }
          ]},
          { id: 'parties', label: 'Parties concernées', type: 'text', placeholder: 'Ex: Société X (Client), Société Y (Prestataire)' },
          { id: 'objet', label: 'Objet du contrat', type: 'text', placeholder: 'Ex: Développement d\'un site web' },
          { id: 'duree', label: 'Durée du contrat', type: 'text', placeholder: 'Ex: 6 mois à compter du 01/01/2025' },
          { id: 'details', label: 'Détails supplémentaires', type: 'textarea', placeholder: 'Précisez ici toutes les clauses spécifiques, conditions particulières, etc.' }
        ];
        break;
      case 'mise en demeure':
        typeFields = [
          { id: 'creancier', label: 'Créancier', type: 'text', placeholder: 'Nom et coordonnées du créancier' },
          { id: 'debiteur', label: 'Débiteur', type: 'text', placeholder: 'Nom et coordonnées du débiteur' },
          { id: 'objet', label: 'Objet de la mise en demeure', type: 'text', placeholder: 'Ex: Impayé de facture' },
          { id: 'montant', label: 'Montant dû', type: 'text', placeholder: 'Ex: 1500 EUR' },
          { id: 'delai', label: 'Délai accordé', type: 'text', placeholder: 'Ex: 15 jours à compter de la réception' },
          { id: 'details', label: 'Détails supplémentaires', type: 'textarea', placeholder: 'Précisez ici les références des factures, contrats, etc.' }
        ];
        break;
      case 'courrier':
        typeFields = [
          { id: 'expediteur', label: 'Expéditeur', type: 'text', placeholder: 'Nom et coordonnées de l\'expéditeur' },
          { id: 'destinataire', label: 'Destinataire', type: 'text', placeholder: 'Nom et coordonnées du destinataire' },
          { id: 'objet', label: 'Objet du courrier', type: 'text', placeholder: 'Ex: Demande de résiliation de contrat' },
          { id: 'details', label: 'Contenu du courrier', type: 'textarea', placeholder: 'Détaillez ici le contenu de votre courrier' }
        ];
        break;
      case 'politique aml kyc':
        typeFields = [
          { id: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'Nom de l\'entreprise concernée' },
          { id: 'secteur', label: 'Secteur d\'activité', type: 'select', options: [
            { value: 'banque', label: 'Banque' },
            { value: 'assurance', label: 'Assurance' },
            { value: 'crypto', label: 'Crypto-monnaies' },
            { value: 'immobilier', label: 'Immobilier' },
            { value: 'autre', label: 'Autre' }
          ]},
          { id: 'juridiction', label: 'Juridiction principale', type: 'select', options: [
            { value: 'suisse', label: 'Suisse' },
            { value: 'ue', label: 'Union Européenne' },
            { value: 'usa', label: 'États-Unis' },
            { value: 'autre', label: 'Autre' }
          ]},
          { id: 'details', label: 'Exigences spécifiques', type: 'textarea', placeholder: 'Précisez ici les exigences spécifiques à votre entreprise' }
        ];
        break;
      case 'conformité finma':
        typeFields = [
          { id: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'Nom de l\'entreprise concernée' },
          { id: 'type', label: 'Type d\'entité', type: 'select', options: [
            { value: 'banque', label: 'Banque' },
            { value: 'assurance', label: 'Assurance' },
            { value: 'gestionnaire', label: 'Gestionnaire d\'actifs' },
            { value: 'autre', label: 'Autre' }
          ]},
          { id: 'circulaire', label: 'Circulaire FINMA concernée', type: 'text', placeholder: 'Ex: 2017/01 Gouvernance d\'entreprise' },
          { id: 'details', label: 'Exigences spécifiques', type: 'textarea', placeholder: 'Précisez ici les exigences spécifiques à votre entreprise' }
        ];
        break;
      default:
        typeFields = [
          { id: 'type', label: 'Type de document', type: 'text', placeholder: 'Précisez le type de document' },
          { id: 'details', label: 'Détails', type: 'textarea', placeholder: 'Précisez ici les détails du document' }
        ];
    }
    
    setFields(typeFields);
    
    // Initialiser formData avec les champs par défaut
    const initialData = {};
    typeFields.forEach(field => {
      initialData[field.id] = '';
    });
    setFormData(initialData);
    
  }, [documentType]);
  
  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Générer le document
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setDocumentContent('');

    try {
      // Préparer les paramètres en fonction du type de document
      const parameters = { ...formData };
      
      // Ajouter la date actuelle
      parameters.date = new Date().toLocaleDateString();
      
      // Générer le document
      const result = await DocumentGeneratorService.generateDocument(documentType, parameters);

      if (result.success) {
        setSuccess(true);
        setDocumentContent(result.content);
        console.log(`Document généré: ${result.fileName}`);
      } else {
        setError('Échec de la génération du document.');
      }
    } catch (err) {
      console.error('Erreur dans le composant DocumentGenerator:', err);
      setError(`Erreur lors de la génération du document: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Vérifier si le formulaire est valide
  const isFormValid = () => {
    // Vérifier que les champs requis sont remplis
    const requiredFields = fields.filter(field => field.required !== false);
    return requiredFields.every(field => formData[field.id] && formData[field.id].trim() !== '');
  };

  // Rendu des champs du formulaire
  const renderFields = () => {
    return fields.map(field => (
      <FormGroup key={field.id}>
        <Label htmlFor={field.id}>{field.label}</Label>
        
        {field.type === 'text' && (
          <Input
            type="text"
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder || ''}
          />
        )}
        
        {field.type === 'textarea' && (
          <TextArea
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleInputChange}
            placeholder={field.placeholder || ''}
          />
        )}
        
        {field.type === 'select' && (
          <Select
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez une option</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </FormGroup>
    ));
  };

  return (
    <GeneratorContainer>
      <Title>
        <FaFileWord />
        Générateur de {documentType || 'Document'}
      </Title>
      
      {renderFields()}
      
      <Button 
        onClick={handleGenerate}
        disabled={loading || !isFormValid()}
      >
        {loading ? (
          <>
            <FaSpinner />
            Génération en cours...
          </>
        ) : (
          <>
            <FaFileWord />
            Générer le document
          </>
        )}
      </Button>
      
      {loading && (
        <StatusMessage className="loading">
          <FaSpinner />
          Génération du document en cours...
        </StatusMessage>
      )}
      
      {error && (
        <StatusMessage className="error">
          <FaExclamationTriangle />
          Erreur: {error}
        </StatusMessage>
      )}
      
      {success && !loading && (
        <StatusMessage className="success">
          <FaCheck />
          Document généré avec succès ! Vérifiez vos téléchargements.
        </StatusMessage>
      )}
      
      {documentContent && (
        <DocumentPreview>
          <h3>Aperçu du document</h3>
          <p>{documentContent}</p>
        </DocumentPreview>
      )}
    </GeneratorContainer>
  );
};

export default DocumentGenerator;
