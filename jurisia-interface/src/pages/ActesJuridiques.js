import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentGenerator from '../components/DocumentGenerator';
import { FaFileContract, FaUsers, FaFileAlt, FaUserTie, FaChevronDown, FaChevronRight } from 'react-icons/fa';

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

const ActeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ActeCard = styled.div`
  background: rgba(48, 54, 82, 0.6);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(48, 54, 82, 0.8);
    border-color: rgba(106, 17, 203, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0 0 15px;
    font-size: 1.3rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      color: var(--secondary-color);
      font-size: 1.5rem;
    }
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
    flex-grow: 1;
  }
`;

const TemplateSelector = styled.div`
  margin-top: 30px;
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  padding: 25px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const SelectorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 12px;
      color: var(--secondary-color);
    }
  }
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

const ActesJuridiques = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const categories = [
    {
      id: 'cession',
      name: 'Cessions de parts',
      icon: <FaFileContract />,
      description: 'Actes juridiques relatifs aux cessions de parts sociales ou d\'actions.',
      templates: [
        { id: 'cession_parts_sarl', name: 'Cession de parts de SARL', description: 'Pour la cession de parts sociales d\'une SARL' },
        { id: 'cession_actions_sas', name: 'Cession d\'actions de SAS', description: 'Pour la cession d\'actions d\'une SAS' },
        { id: 'cession_actions_sa', name: 'Cession d\'actions de SA', description: 'Pour la cession d\'actions d\'une SA' },
        { id: 'promesse_cession', name: 'Promesse de cession', description: 'Engagement préalable à une cession' }
      ]
    },
    {
      id: 'pv',
      name: 'PV d\'AG',
      icon: <FaUsers />,
      description: 'Procès-verbaux d\'assemblées générales pour différents types de sociétés.',
      templates: [
        { id: 'pv_ago_sarl', name: 'PV d\'AGO de SARL', description: 'Approbation des comptes, affectation du résultat, etc.' },
        { id: 'pv_age_sarl', name: 'PV d\'AGE de SARL', description: 'Modification des statuts, transfert de siège, etc.' },
        { id: 'pv_ago_sas', name: 'PV d\'AGO de SAS', description: 'Approbation des comptes, affectation du résultat, etc.' },
        { id: 'pv_age_sas', name: 'PV d\'AGE de SAS', description: 'Modification des statuts, transfert de siège, etc.' }
      ]
    },
    {
      id: 'statuts',
      name: 'Statuts',
      icon: <FaFileAlt />,
      description: 'Statuts pour différents types de sociétés.',
      templates: [
        { id: 'statuts_sarl', name: 'Statuts de SARL', description: 'Société à responsabilité limitée' },
        { id: 'statuts_sas', name: 'Statuts de SAS', description: 'Société par actions simplifiée' },
        { id: 'statuts_sa', name: 'Statuts de SA', description: 'Société anonyme' },
        { id: 'statuts_sci', name: 'Statuts de SCI', description: 'Société civile immobilière' }
      ]
    },
    {
      id: 'delegation',
      name: 'Délégations de pouvoirs',
      icon: <FaUserTie />,
      description: 'Actes de délégation de pouvoirs au sein d\'une entreprise.',
      templates: [
        { id: 'delegation_generale', name: 'Délégation générale', description: 'Délégation générale de pouvoirs' },
        { id: 'delegation_specifique', name: 'Délégation spécifique', description: 'Délégation pour une mission précise' },
        { id: 'delegation_signature', name: 'Délégation de signature', description: 'Autorisation de signature au nom de la société' },
        { id: 'subdelegation', name: 'Subdélégation', description: 'Délégation secondaire de pouvoirs' }
      ]
    }
  ];
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setOpenCategory(category.id);
    setSelectedTemplate(null);
  };
  
  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };
  
  return (
    <PageContainer>
      <Title>Actes juridiques</Title>
      <Description>
        Sélectionnez un type d'acte juridique ci-dessous pour générer un document adapté à vos besoins.
        Nos modèles sont rédigés par des experts en droit des sociétés et régulièrement mis à jour pour refléter les dernières évolutions législatives.
      </Description>
      
      <ActeGrid>
        {categories.map(category => (
          <ActeCard 
            key={category.id} 
            onClick={() => handleCategorySelect(category)}
          >
            <h3>{category.icon} {category.name}</h3>
            <p>{category.description}</p>
          </ActeCard>
        ))}
      </ActeGrid>
      
      {selectedCategory && (
        <TemplateSelector>
          <SelectorHeader>
            <h2>{selectedCategory.icon} {selectedCategory.name}</h2>
          </SelectorHeader>
          
          {categories.map(category => (
            <div key={category.id}>
              <TemplateCategory onClick={() => toggleCategory(category.id)}>
                <h3>{category.icon} {category.name}</h3>
                {openCategory === category.id ? <FaChevronDown /> : <FaChevronRight />}
              </TemplateCategory>
              
              <TemplateOptions $isOpen={openCategory === category.id}>
                {category.templates.map(template => (
                  <TemplateOption 
                    key={template.id} 
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </TemplateOption>
                ))}
              </TemplateOptions>
            </div>
          ))}
        </TemplateSelector>
      )}
      
      {selectedTemplate && (
        <DocumentGenerator 
          documentType="acte-juridique" 
          initialData={{ 
            type: selectedTemplate.id,
            // Autres données initiales en fonction du template sélectionné
          }} 
        />
      )}
    </PageContainer>
  );
};

export default ActesJuridiques;
