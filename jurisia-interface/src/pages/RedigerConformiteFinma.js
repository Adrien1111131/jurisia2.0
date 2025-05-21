import React from 'react';
import styled from 'styled-components';
import DocumentGenerator from '../components/DocumentGenerator';

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

const RedigerConformiteFinma = () => {
  return (
    <PageContainer>
      <Title>Document de Conformité FINMA</Title>
      <Description>
        Utilisez notre assistant pour rédiger des documents de conformité conformes aux exigences de l'Autorité fédérale de surveillance des marchés financiers (FINMA). Remplissez le formulaire ci-dessous avec les informations nécessaires, et notre IA générera un document adapté à votre établissement financier.
      </Description>
      <DocumentGenerator documentType="conformité finma" />
    </PageContainer>
  );
};

export default RedigerConformiteFinma;
