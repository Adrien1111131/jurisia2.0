import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 20px 0;
  max-width: 800px;
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
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(106, 17, 203, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(106, 17, 203, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const FieldsetContainer = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(106, 17, 203, 0.2);
  padding-bottom: 20px;
  
  &:last-of-type {
    border-bottom: none;
  }
`;

const FieldsetTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    margin-right: 10px;
    border-radius: 2px;
  }
`;

// Fonction pour déterminer la section d'un champ en fonction de son ID
const getFieldSection = (fieldId, documentType) => {
  // Sections pour les contrats de prestation
  if (documentType === 'contrat_prestation') {
    if (['prestataire', 'client', 'siren_prestataire', 'siren_client', 'rcs_prestataire', 'rcs_client', 
         'capital_prestataire', 'siege_prestataire', 'siege_client', 'representant_prestataire', 'representant_client'].includes(fieldId)) {
      return 'Identification des parties';
    } else if (['services', 'duree'].includes(fieldId)) {
      return 'Objet du contrat';
    } else if (['remuneration', 'modalites_paiement'].includes(fieldId)) {
      return 'Conditions financières';
    } else if (['lieu_signature', 'nombre_exemplaires'].includes(fieldId)) {
      return 'Formalités';
    }
  }
  
  // Sections pour les contrats de travail
  else if (documentType === 'contrat_travail') {
    if (['employeur', 'siren_employeur', 'rcs_employeur', 'capital_employeur', 'siege_employeur', 'representant_employeur'].includes(fieldId)) {
      return 'Informations employeur';
    } else if (['employe'].includes(fieldId)) {
      return 'Informations salarié';
    } else if (['poste', 'convention_collective', 'salaire', 'date_debut', 'periode_essai'].includes(fieldId)) {
      return 'Conditions d\'emploi';
    } else if (['duree_travail', 'lieu_travail', 'avantages'].includes(fieldId)) {
      return 'Temps de travail et avantages';
    } else if (['lieu_signature'].includes(fieldId)) {
      return 'Formalités';
    }
  }
  
  // Sections pour les baux
  else if (documentType === 'bail') {
    if (['bailleur', 'locataire'].includes(fieldId)) {
      return 'Identification des parties';
    } else if (['bien', 'adresse_bien', 'surface_habitable'].includes(fieldId)) {
      return 'Identification du bien';
    } else if (['dpe_reference', 'dpe_classe'].includes(fieldId)) {
      return 'Diagnostics';
    } else if (['loyer', 'charges', 'depot_garantie', 'indexation', 'indice_reference', 'periodicite_revision'].includes(fieldId)) {
      return 'Conditions financières';
    } else if (['duree', 'date_debut'].includes(fieldId)) {
      return 'Durée du bail';
    } else if (['assurance_numero', 'assurance_compagnie', 'garanties', 'etat_lieux'].includes(fieldId)) {
      return 'Garanties et assurances';
    } else if (['lieu_signature'].includes(fieldId)) {
      return 'Formalités';
    }
  }
  
  // Sections pour les NDA
  else if (documentType === 'nda') {
    if (['parties'].includes(fieldId)) {
      return 'Identification des parties';
    } else if (['objet', 'obligations'].includes(fieldId)) {
      return 'Objet et obligations';
    } else if (['duree'].includes(fieldId)) {
      return 'Durée et conditions';
    }
  }
  
  // Sections pour les actes juridiques
  else if (documentType === 'cession_parts') {
    if (['cedant', 'cessionnaire'].includes(fieldId)) {
      return 'Identification des parties';
    } else if (['parts', 'prix'].includes(fieldId)) {
      return 'Objet de la cession';
    }
  }
  
  // Par défaut, pas de section
  return null;
};

// Fonction pour regrouper les champs par section
const groupFieldsBySection = (fields, documentType) => {
  const sections = {};
  
  // Regrouper les champs par section
  fields.forEach(field => {
    const section = getFieldSection(field.id, documentType);
    if (section) {
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(field);
    } else {
      if (!sections['Autres']) {
        sections['Autres'] = [];
      }
      sections['Autres'].push(field);
    }
  });
  
  return sections;
};

const DynamicForm = ({ fields, onSubmit, documentType }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, field) => {
    setFormData(prev => ({
      ...prev,
      [field.id]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Regrouper les champs par section si un type de document est spécifié
  const sections = documentType ? groupFieldsBySection(fields, documentType) : { 'Informations': fields };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        {Object.entries(sections).map(([sectionName, sectionFields]) => (
          <FieldsetContainer key={sectionName}>
            <FieldsetTitle>{sectionName}</FieldsetTitle>
            {sectionFields.map((field) => (
              <FormGroup key={field.id}>
                <Label>{field.label}{field.required && ' *'}</Label>
                {field.type === 'textarea' ? (
                  <TextArea
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                    placeholder={`Entrez ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.id] || field.defaultValue || ''}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                    placeholder={`Entrez ${field.label.toLowerCase()}`}
                  />
                )}
              </FormGroup>
            ))}
          </FieldsetContainer>
        ))}
        <SubmitButton type="submit">
          Générer le document
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default DynamicForm;
