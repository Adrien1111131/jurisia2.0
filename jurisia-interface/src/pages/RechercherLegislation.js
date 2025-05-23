import React from 'react';
import styled from 'styled-components';
import SearchInterface from '../components/SearchInterface';

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
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 800px;
  line-height: 1.6;
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

const RechercherLegislation = () => {
  return (
    <PageContainer>
      <Title>Rechercher de la législation</Title>
      <Description>
        Consultez les lois, codes et règlements en vigueur en France et en Europe. 
        Utilisez la recherche précise pour trouver un texte spécifique ou la recherche assistée 
        pour explorer la législation sur un sujet juridique particulier.
      </Description>
      <Card>
        <SearchInterface type="legislation" placeholder="Rechercher des lois, codes et règlements..." />
      </Card>
    </PageContainer>
  );
};

export default RechercherLegislation;
