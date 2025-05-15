import React, { useState } from 'react';
import styled from 'styled-components';
import FileUploader from './FileUploader';

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

const Card = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 35px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    min-height: 250px;
  }
`;

const EmptyText = styled.p`
  color: var(--text-secondary);
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.6;
  max-width: 600px;
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  padding: 20px;
  color: var(--text-primary);
  font-size: 16px;
  resize: vertical;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  @media (max-width: 576px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const PageTemplate = ({ 
  title, 
  description, 
  showFileUploader = false, 
  showTextInput = false,
  textInputPlaceholder = "Entrez des informations supplémentaires ici..."
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log('Fichier chargé:', file.name);
    // Ici, vous pourriez envoyer le fichier à une API ou effectuer d'autres opérations
  };
  
  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };
  
  return (
    <PageContainer>
      <Title>{title}</Title>
      <Card>
        <EmptyText>{description || "Cette page est en cours de développement."}</EmptyText>
        
        {showTextInput && (
          <TextArea 
            placeholder={textInputPlaceholder}
            value={textInput}
            onChange={handleTextChange}
          />
        )}
        
        {showFileUploader && (
          <FileUploader onFileUpload={handleFileUpload} />
        )}
      </Card>
    </PageContainer>
  );
};

export default PageTemplate;
