import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentGenerator from '../components/DocumentGenerator';
import { FaFileAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(106, 17, 203, 0.3);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const TemplateSelector = styled.div`
  margin-bottom: 30px;
`;

const TemplateCategory = styled.div`
  background: rgba(48, 54, 82, 0.6);
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(106, 17, 203, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(48, 54, 82, 0.8);
    border-color: rgba(106, 17, 203, 0.4);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      color: var(--secondary-color);
    }
  }
`;

const TemplateOptions = styled.div`
  padding-left: 20px;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  margin-bottom: ${({ $isOpen }) => ($isOpen ? '20px' : '0')};
`;

const TemplateOption = styled.div`
  padding: 12px 20px;
  margin: 8px 0;
  background: rgba(42, 47, 69, 0.7);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: rgba(48, 54, 82, 0.9);
    border-left: 3px solid var(--primary-color);
    transform: translateX(5px);
  }
  
  h4 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }
  
  p {
    margin: 5px 0 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const ModeleContratsStandards = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };
  
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };
  
  const templates = {
    nda: {
      name: 'NDA (Accord de confidentialité)',
      description: 'Protégez vos informations confidentielles lors de négociations ou collaborations.',
      options: [
        { id: 'nda_standard', name: 'NDA Standard', description: 'Version classique pour la plupart des situations' },
        { id: 'nda_unilateral', name: 'NDA Unilatéral', description: 'Quand une seule partie divulgue des informations' },
        { id: 'nda_bilateral', name: 'NDA Bilatéral', description: 'Quand les deux parties échangent des informations confidentielles' }
      ]
    },
    prestation: {
      name: 'Contrats de prestation',
      description: 'Encadrez juridiquement vos prestations de services.',
      options: [
        { id: 'prestation_standard', name: 'Contrat de prestation standard', description: 'Pour la plupart des prestations de services' },
        { id: 'prestation_consulting', name: 'Contrat de consulting', description: 'Spécifique aux missions de conseil' },
        { id: 'prestation_developpement', name: 'Contrat de développement', description: 'Pour les prestations de développement informatique' }
      ]
    },
    travail: {
      name: 'Contrats de travail',
      description: 'Formalisez la relation employeur-employé.',
      options: [
        { id: 'travail_cdi', name: 'CDI', description: 'Contrat à durée indéterminée' },
        { id: 'travail_cdd', name: 'CDD', description: 'Contrat à durée déterminée' },
        { id: 'travail_cadre', name: 'Contrat cadre', description: 'Pour les postes à responsabilité' }
      ]
    },
    bail: {
      name: 'Baux',
      description: 'Sécurisez vos locations immobilières.',
      options: [
        { id: 'bail_habitation', name: 'Bail d\'habitation', description: 'Pour la location de logements' },
        { id: 'bail_commercial', name: 'Bail commercial', description: 'Pour les locaux professionnels' },
        { id: 'bail_professionnel', name: 'Bail professionnel', description: 'Pour les professions libérales' }
      ]
    },
    cgv: {
      name: 'CGV/CGU',
      description: 'Définissez les conditions d\'utilisation de vos services ou produits.',
      options: [
        { id: 'cgv_ecommerce', name: 'CGV E-commerce', description: 'Pour les sites de vente en ligne' },
        { id: 'cgu_site', name: 'CGU Site web', description: 'Conditions d\'utilisation d\'un site internet' },
        { id: 'cgu_application', name: 'CGU Application', description: 'Pour les applications mobiles' }
      ]
    }
  };
  
  return (
    <PageContainer>
      <Title>Modèles de contrats standards</Title>
      <Description>
        Sélectionnez un type de contrat standard ci-dessous pour générer un document adapté à vos besoins. 
        Nos modèles sont régulièrement mis à jour pour refléter les dernières évolutions législatives et jurisprudentielles.
      </Description>
      
      <TemplateSelector>
        {Object.entries(templates).map(([key, category]) => (
          <div key={key}>
            <TemplateCategory onClick={() => toggleCategory(key)}>
              <h3><FaFileAlt /> {category.name}</h3>
              {openCategory === key ? <FaChevronDown /> : <FaChevronRight />}
            </TemplateCategory>
            
            <TemplateOptions $isOpen={openCategory === key}>
              {category.options.map(option => (
                <TemplateOption 
                  key={option.id} 
                  onClick={() => selectTemplate(option.id)}
                >
                  <h4>{option.name}</h4>
                  <p>{option.description}</p>
                </TemplateOption>
              ))}
            </TemplateOptions>
          </div>
        ))}
      </TemplateSelector>
      
      {selectedTemplate && (
        <ContractCustomizationForm 
          templateId={selectedTemplate} 
          templateCategory={openCategory}
        />
      )}
    </PageContainer>
  );
};

// Formulaire de personnalisation du contrat
const ContractCustomizationForm = ({ templateId, templateCategory }) => {
  const [formData, setFormData] = useState({
    parties: '',
    objet: '',
    duree: '',
    details: ''
  });
  
  // Déterminer les champs spécifiques en fonction du template sélectionné
  const getTemplateSpecificFields = () => {
    const fields = [];
    
    // Champs communs à tous les templates
    fields.push(
      { id: 'parties', label: 'Parties concernées', type: 'text', placeholder: 'Ex: Société X (Client), Société Y (Prestataire)', required: true },
      { id: 'objet', label: 'Objet du contrat', type: 'text', placeholder: 'Ex: Développement d\'un site web', required: true },
      { id: 'duree', label: 'Durée du contrat', type: 'text', placeholder: 'Ex: 6 mois à compter du 01/01/2025', required: true }
    );
    
    // Champs spécifiques en fonction du type de template
    if (templateCategory === 'nda') {
      fields.push(
        { id: 'informations_confidentielles', label: 'Définition des informations confidentielles', type: 'textarea', placeholder: 'Précisez la nature des informations confidentielles couvertes par l\'accord', required: true },
        { id: 'duree_confidentialite', label: 'Durée de l\'obligation de confidentialité', type: 'text', placeholder: 'Ex: 5 ans après la fin du contrat', required: true },
        { id: 'exclusions', label: 'Exclusions de confidentialité', type: 'textarea', placeholder: 'Précisez les exclusions à l\'obligation de confidentialité', required: false }
      );
    } else if (templateCategory === 'prestation') {
      fields.push(
        { id: 'description_services', label: 'Description détaillée des services', type: 'textarea', placeholder: 'Décrivez précisément les services à fournir', required: true },
        { id: 'livrables', label: 'Livrables attendus', type: 'textarea', placeholder: 'Listez les livrables attendus et leurs spécifications', required: true },
        { id: 'conditions_paiement', label: 'Conditions de paiement', type: 'textarea', placeholder: 'Ex: 30% à la signature, 30% à mi-parcours, 40% à la livraison', required: true },
        { id: 'propriete_intellectuelle', label: 'Régime de propriété intellectuelle', type: 'select', options: [
          { value: 'cession_totale', label: 'Cession totale au client' },
          { value: 'cession_partielle', label: 'Cession partielle au client' },
          { value: 'licence', label: 'Licence d\'utilisation' }
        ], required: true }
      );
    } else if (templateCategory === 'travail') {
      fields.push(
        { id: 'poste', label: 'Intitulé du poste', type: 'text', placeholder: 'Ex: Développeur Full Stack', required: true },
        { id: 'remuneration', label: 'Rémunération', type: 'text', placeholder: 'Ex: 60 000 € brut annuel', required: true },
        { id: 'horaires', label: 'Horaires de travail', type: 'text', placeholder: 'Ex: 39h hebdomadaires, du lundi au vendredi', required: true },
        { id: 'avantages', label: 'Avantages sociaux', type: 'textarea', placeholder: 'Ex: Mutuelle, tickets restaurant, etc.', required: false },
        { id: 'periode_essai', label: 'Période d\'essai', type: 'text', placeholder: 'Ex: 3 mois renouvelable une fois', required: true }
      );
    } else if (templateCategory === 'bail') {
      fields.push(
        { id: 'description_bien', label: 'Description du bien', type: 'textarea', placeholder: 'Décrivez précisément le bien immobilier (adresse, surface, équipements, etc.)', required: true },
        { id: 'loyer', label: 'Montant du loyer', type: 'text', placeholder: 'Ex: 1 500 € par mois hors charges', required: true },
        { id: 'charges', label: 'Charges', type: 'textarea', placeholder: 'Détaillez les charges et leur répartition', required: true },
        { id: 'depot_garantie', label: 'Dépôt de garantie', type: 'text', placeholder: 'Ex: 2 mois de loyer hors charges', required: true },
        { id: 'etat_des_lieux', label: 'État des lieux', type: 'textarea', placeholder: 'Précisez les modalités de l\'état des lieux', required: true }
      );
    } else if (templateCategory === 'cgv') {
      fields.push(
        { id: 'description_services', label: 'Description des produits/services', type: 'textarea', placeholder: 'Décrivez précisément les produits ou services concernés', required: true },
        { id: 'processus_commande', label: 'Processus de commande', type: 'textarea', placeholder: 'Détaillez le processus de commande', required: true },
        { id: 'prix_paiement', label: 'Prix et modalités de paiement', type: 'textarea', placeholder: 'Précisez les prix et les modalités de paiement', required: true },
        { id: 'livraison', label: 'Livraison', type: 'textarea', placeholder: 'Précisez les modalités de livraison', required: false },
        { id: 'garanties', label: 'Garanties', type: 'textarea', placeholder: 'Détaillez les garanties offertes', required: true }
      );
    }
    
    // Champ de détails supplémentaires pour tous les templates
    fields.push(
      { id: 'details', label: 'Clauses spécifiques ou détails supplémentaires', type: 'textarea', placeholder: 'Précisez ici toutes les clauses spécifiques, conditions particulières, etc.', required: false }
    );
    
    return fields;
  };
  
  const fields = getTemplateSpecificFields();
  
  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Vérifier si le formulaire est valide
  const isFormValid = () => {
    // Vérifier que les champs requis sont remplis
    const requiredFields = fields.filter(field => field.required);
    return requiredFields.every(field => formData[field.id] && formData[field.id].trim() !== '');
  };
  
  // Obtenir le nom du template pour l'affichage
  const getTemplateName = () => {
    switch (templateCategory) {
      case 'nda':
        if (templateId === 'nda_standard') return 'NDA Standard';
        if (templateId === 'nda_unilateral') return 'NDA Unilatéral';
        if (templateId === 'nda_bilateral') return 'NDA Bilatéral';
        break;
      case 'prestation':
        if (templateId === 'prestation_standard') return 'Contrat de prestation standard';
        if (templateId === 'prestation_consulting') return 'Contrat de consulting';
        if (templateId === 'prestation_developpement') return 'Contrat de développement';
        break;
      case 'travail':
        if (templateId === 'travail_cdi') return 'Contrat de travail CDI';
        if (templateId === 'travail_cdd') return 'Contrat de travail CDD';
        if (templateId === 'travail_cadre') return 'Contrat de travail cadre';
        break;
      case 'bail':
        if (templateId === 'bail_habitation') return 'Bail d\'habitation';
        if (templateId === 'bail_commercial') return 'Bail commercial';
        if (templateId === 'bail_professionnel') return 'Bail professionnel';
        break;
      case 'cgv':
        if (templateId === 'cgv_ecommerce') return 'CGV E-commerce';
        if (templateId === 'cgu_site') return 'CGU Site web';
        if (templateId === 'cgu_application') return 'CGU Application';
        break;
      default:
        return 'Modèle de contrat';
    }
    return 'Modèle de contrat';
  };
  
  // Styles pour le formulaire
  const FormContainer = styled.div`
    background: rgba(42, 47, 69, 0.7);
    border-radius: 12px;
    padding: 25px;
    margin-top: 30px;
    border: 1px solid rgba(106, 17, 203, 0.3);
  `;
  
  const FormTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 12px;
      color: var(--secondary-color);
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
  
  // Rendu des champs du formulaire
  const renderFields = () => {
    return fields.map(field => (
      <FormGroup key={field.id}>
        <Label htmlFor={field.id}>{field.label}{field.required ? ' *' : ''}</Label>
        
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
    <FormContainer>
      <FormTitle>
        <FaFileAlt />
        Personnalisation du {getTemplateName()}
      </FormTitle>
      
      {renderFields()}
      
      <DocumentGenerator 
        documentType="contrat" 
        initialData={{ 
          type: templateId,
          ...formData
        }} 
      />
    </FormContainer>
  );
};

export default ModeleContratsStandards;
