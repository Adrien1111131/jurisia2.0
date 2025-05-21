import React, { useState } from 'react';
import styled from 'styled-components';
import FileUploader from './FileUploader';
import ResumeService from '../services/resumeService';
import { FaSpinner } from 'react-icons/fa';

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

// Composant pour afficher le résumé
const ResultContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(42, 47, 69, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const ResultTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const ResultContent = styled.div`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  
  svg {
    animation: spin 1s linear infinite;
    color: var(--primary-color);
    font-size: 2rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 12px 25px;
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
  margin-top: 20px;
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background: linear-gradient(45deg, #7b21dc, #3585ff);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(106, 17, 203, 0.4);
  }
  
  &:disabled {
    background: #4a4a6a;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const InfoMessage = styled.div`
  background: rgba(37, 117, 252, 0.1);
  color: white;
  border: 1px solid rgba(37, 117, 252, 0.3);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 20px;
  font-size: 0.95rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const PageTemplate = ({ 
  title, 
  description, 
  showFileUploader = false, 
  showTextInput = false,
  textInputPlaceholder = "Entrez des informations supplémentaires ici...",
  acceptedFileTypes,
  fileUploaderMessage
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  
  // États pour gérer les résultats, le chargement et les erreurs
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log('Fichier chargé:', file.name);
    
    // Si le titre est "Résumer un document", traiter le fichier automatiquement
    if (title === "Résumer un document") {
      handleProcessFile(file);
    }
  };
  
  const handleProcessFile = async (file) => {
    // Réinitialiser les états
    setResult(null);
    setError(null);
    setIsLoading(true);
    
    try {
      // Appeler le service de résumé
      const result = await ResumeService.resumeDocument(file);
      setResult(result);
    } catch (error) {
      console.error("Erreur lors du traitement du fichier:", error);
      setError(error.message || "Une erreur est survenue lors du traitement du fichier.");
    } finally {
      setIsLoading(false);
    }
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
          <>
            {fileUploaderMessage && (
              <InfoMessage>{fileUploaderMessage}</InfoMessage>
            )}
            <FileUploader 
              onFileUpload={handleFileUpload} 
              acceptedFileTypes={acceptedFileTypes}
            />
          </>
        )}
        
        {/* Afficher les erreurs */}
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        
        {/* Afficher le chargement */}
        {isLoading && (
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        )}
        
        {/* Afficher le résultat */}
        {result && !isLoading && (
          <ResultContainer>
            <ResultTitle>Résumé du document: {result.fileName}</ResultTitle>
            <ResultContent>{result.summary}</ResultContent>
          </ResultContainer>
        )}
      </Card>
    </PageContainer>
  );
};

export default PageTemplate;
