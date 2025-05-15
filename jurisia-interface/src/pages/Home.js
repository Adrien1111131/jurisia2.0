import React from 'react';
import styled from 'styled-components';
import { FaBalanceScale, FaFileAlt, FaSearch, FaComments, FaEdit, FaShieldAlt, FaLock } from 'react-icons/fa';

const HomeContainer = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3.2rem;
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
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2.4rem;
  }
`;

const Card = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 35px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(106, 17, 203, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
  
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #e6e6e6;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 12px;
    color: #6a11cb;
  }
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FeatureCard = styled.div`
  background: rgba(42, 47, 69, 0.6);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(106, 17, 203, 0.3);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #6a11cb;
  }
`;

const FeatureText = styled.p`
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const LegalSection = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(106, 17, 203, 0.2);
`;

const LegalTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #6a11cb;
  }
`;

const LegalText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const LegalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const LegalCard = styled.div`
  background: rgba(42, 47, 69, 0.4);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(106, 17, 203, 0.15);
`;

const LegalCardTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #6a11cb;
  }
`;

const LegalCardText = styled.p`
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Bienvenue sur Jurisia</Title>
      <Card>
        <Subtitle>
          <FaBalanceScale />
          Votre assistant juridique intelligent
        </Subtitle>
        <Text>
          Jurisia vous aide à rédiger, résumer et rechercher des documents juridiques 
          avec l'aide de l'intelligence artificielle. Utilisez la barre latérale pour 
          naviguer entre les différentes fonctionnalités.
        </Text>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureTitle>
              <FaFileAlt />
              Résumer des documents
            </FeatureTitle>
            <FeatureText>
              Obtenez des résumés clairs et concis de vos documents juridiques complexes.
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <FaEdit />
              Rédiger des documents
            </FeatureTitle>
            <FeatureText>
              Créez des contrats, mises en demeure et courriers juridiques professionnels.
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <FaSearch />
              Rechercher des documents
            </FeatureTitle>
            <FeatureText>
              Accédez à la jurisprudence, doctrine et législation pertinente pour votre cas.
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <FaComments />
              Prompt libre
            </FeatureTitle>
            <FeatureText>
              Posez vos questions juridiques et obtenez des réponses précises et fiables.
            </FeatureText>
          </FeatureCard>
        </FeatureGrid>
        
        <LegalSection>
          <LegalTitle>
            <FaShieldAlt />
            Sécurité et conformité
          </LegalTitle>
          
          <LegalGrid>
            <LegalCard>
              <LegalCardTitle>
                <FaShieldAlt />
                <span className="gradient-text">Optimisé pour les exigences FINMA / LSFin / Droit Suisse</span>
              </LegalCardTitle>
              <LegalCardText>
                Notre solution est spécialement conçue pour répondre aux exigences réglementaires 
                suisses, notamment celles de la FINMA et de la LSFin, garantissant une conformité 
                optimale pour les professionnels du droit et de la finance en Suisse.
              </LegalCardText>
            </LegalCard>
            
            <LegalCard>
              <LegalCardTitle>
                <FaLock />
                Traitement 100% Local - Données non exportées vers le Cloud
              </LegalCardTitle>
              <LegalCardText>
                Notre IA fonctionne entièrement en local sur vos systèmes. Vos données juridiques 
                sensibles ne quittent jamais votre cabinet et ne sont jamais exportées vers le cloud, 
                éliminant ainsi les risques liés au transfert de données vers des serveurs externes.
              </LegalCardText>
            </LegalCard>
          </LegalGrid>
          
          <LegalCard style={{ marginTop: '20px', textAlign: 'center' }}>
            <LegalCardTitle style={{ justifyContent: 'center' }}>
              <FaShieldAlt />
              Sécurité et confidentialité garanties
            </LegalCardTitle>
            <LegalCardText>
              Jurisia garantit la sécurité et la confidentialité de vos données juridiques, 
              respectant les plus hauts standards de protection des informations sensibles.
              Pour toute situation juridique complexe, nous vous recommandons de consulter un avocat qualifié.
            </LegalCardText>
          </LegalCard>
        </LegalSection>
      </Card>
    </HomeContainer>
  );
};

export default Home;
