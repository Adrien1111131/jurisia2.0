import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentGenerator from '../components/DocumentGenerator';
import { FaBuilding, FaHandshake, FaLaptopCode, FaCopyright, FaHome, FaChevronDown, FaChevronRight } from 'react-icons/fa';

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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const CategoryCard = styled.div`
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

const ContratsSpecifiques = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const categories = [
    {
      id: 'ma',
      name: 'M&A',
      icon: <FaBuilding />,
      description: 'Contrats spécifiques pour les fusions et acquisitions d\'entreprises.',
      templates: [
        { id: 'ma_spa', name: 'Contrat d\'acquisition d\'actions (SPA)', description: 'Pour l\'achat d\'actions d\'une société' },
        { id: 'ma_apa', name: 'Contrat d\'acquisition d\'actifs (APA)', description: 'Pour l\'achat d\'actifs spécifiques d\'une entreprise' },
        { id: 'ma_merger', name: 'Traité de fusion', description: 'Pour la fusion de deux entités juridiques' },
        { id: 'ma_loi', name: 'Lettre d\'intention', description: 'Document préliminaire non contraignant' }
      ]
    },
    {
      id: 'financement',
      name: 'Financement',
      icon: <FaHandshake />,
      description: 'Contrats pour les opérations de financement et d\'investissement.',
      templates: [
        { id: 'fin_pret', name: 'Contrat de prêt', description: 'Pour les prêts entre entreprises ou avec des institutions financières' },
        { id: 'fin_invest', name: 'Contrat d\'investissement', description: 'Pour l\'entrée d\'investisseurs au capital' },
        { id: 'fin_garantie', name: 'Contrat de garantie', description: 'Pour sécuriser un financement' },
        { id: 'fin_crowdfunding', name: 'Contrat de crowdfunding', description: 'Pour le financement participatif' }
      ]
    },
    {
      id: 'it',
      name: 'IT',
      icon: <FaLaptopCode />,
      description: 'Contrats spécifiques au secteur des technologies de l\'information.',
      templates: [
        { id: 'it_dev', name: 'Contrat de développement logiciel', description: 'Pour la création de logiciels sur mesure' },
        { id: 'it_saas', name: 'Contrat SaaS', description: 'Pour la fourniture de logiciels en tant que service' },
        { id: 'it_maintenance', name: 'Contrat de maintenance', description: 'Pour la maintenance de systèmes informatiques' },
        { id: 'it_cloud', name: 'Contrat d\'hébergement cloud', description: 'Pour les services d\'hébergement en nuage' }
      ]
    },
    {
      id: 'ip',
      name: 'IP',
      icon: <FaCopyright />,
      description: 'Contrats relatifs à la propriété intellectuelle.',
      templates: [
        { id: 'ip_licence', name: 'Contrat de licence', description: 'Pour l\'utilisation de droits de propriété intellectuelle' },
        { id: 'ip_cession', name: 'Contrat de cession', description: 'Pour le transfert de droits de propriété intellectuelle' },
        { id: 'ip_marque', name: 'Contrat de licence de marque', description: 'Pour l\'utilisation d\'une marque déposée' },
        { id: 'ip_brevet', name: 'Contrat de licence de brevet', description: 'Pour l\'exploitation d\'un brevet' }
      ]
    },
    {
      id: 'immobilier',
      name: 'Immobilier',
      icon: <FaHome />,
      description: 'Contrats spécifiques aux transactions immobilières.',
      templates: [
        { id: 'immo_vente', name: 'Promesse de vente', description: 'Engagement préalable à la vente d\'un bien immobilier' },
        { id: 'immo_bail_co', name: 'Bail commercial', description: 'Pour la location de locaux à usage commercial' },
        { id: 'immo_construction', name: 'Contrat de construction', description: 'Pour la réalisation de travaux de construction' },
        { id: 'immo_promotion', name: 'Contrat de promotion immobilière', description: 'Pour les opérations de promotion immobilière' }
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
      <Title>Contrats spécifiques</Title>
      <Description>
        Sélectionnez un domaine d'expertise ci-dessous pour accéder à des modèles de contrats spécifiques adaptés à vos besoins professionnels.
        Nos modèles sont rédigés par des experts et régulièrement mis à jour pour refléter les dernières évolutions législatives et jurisprudentielles.
      </Description>
      
      <CategoryGrid>
        {categories.map(category => (
          <CategoryCard 
            key={category.id} 
            onClick={() => handleCategorySelect(category)}
          >
            <h3>{category.icon} {category.name}</h3>
            <p>{category.description}</p>
          </CategoryCard>
        ))}
      </CategoryGrid>
      
      {selectedCategory && (
        <TemplateSelector>
          <SelectorHeader>
            <h2>{selectedCategory.icon} Contrats {selectedCategory.name}</h2>
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
          documentType="contrat_specifique" 
          initialData={{ 
            type: selectedTemplate.id,
            // Autres données initiales en fonction du template sélectionné
          }} 
        />
      )}
    </PageContainer>
  );
};

export default ContratsSpecifiques;
