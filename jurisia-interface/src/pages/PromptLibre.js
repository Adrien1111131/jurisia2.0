import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaUpload, FaFile, FaCheck, FaMagic, FaSpinner } from 'react-icons/fa';
import PromptService from '../services/promptService';

const PromptContainer = styled.div`
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
  
  @media (max-width: 576px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
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

const ImproveButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(106, 17, 203, 0.6);
  color: var(--text-primary);
  box-shadow: 0 4px 10px rgba(106, 17, 203, 0.1);
  
  &:hover {
    background: rgba(106, 17, 203, 0.1);
    border-color: rgba(106, 17, 203, 0.8);
    color: white;
    box-shadow: 0 6px 15px rgba(106, 17, 203, 0.2);
  }
  
  svg {
    color: var(--primary-color);
  }
`;

const ImprovedPromptContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: rgba(106, 17, 203, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const ImprovedPromptTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
  
  svg {
    color: var(--primary-color);
    margin-right: 8px;
  }
`;

const ImprovedPromptText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const UseImprovedButton = styled.button`
  background: transparent;
  color: var(--primary-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(106, 17, 203, 0.1);
    text-decoration: underline;
  }
  
  svg {
    margin-right: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const FileUploadButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(106, 17, 203, 0.3);
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: var(--primary-color);
  }
  
  &:hover {
    background: rgba(106, 17, 203, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(106, 17, 203, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(106, 17, 203, 0.2);
  }
  
  @media (max-width: 576px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 5px 10px;
  background: rgba(106, 17, 203, 0.1);
  border-radius: 8px;
  
  svg {
    color: var(--primary-color);
    margin-right: 8px;
    font-size: 1rem;
  }
`;

const FileName = styled.span`
  color: var(--text-primary);
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const HiddenInput = styled.input`
  display: none;
`;



// Composant pour afficher la réponse
const ResponseContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(42, 47, 69, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const ResponseTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: var(--primary-color);
  }
`;

const ResponseContent = styled.div`
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

const PromptLibre = () => {
  const [file, setFile] = useState(null);
  const [promptText, setPromptText] = useState('Rédigez une mise en demeure pour un loyer impayé');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [showImproved, setShowImproved] = useState(false);
  const fileInputRef = useRef(null);
  
  // États pour gérer les résultats, le chargement et les erreurs
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handlePromptChange = (e) => {
    setPromptText(e.target.value);
    // Réinitialiser le prompt amélioré si l'utilisateur modifie le texte
    if (showImproved) {
      setShowImproved(false);
    }
  };
  
  const improvePrompt = async () => {
    // Vérifier si le prompt est vide
    if (!promptText.trim()) {
      setError("Veuillez entrer un prompt à améliorer.");
      return;
    }
    
    // Réinitialiser les états
    setError(null);
    setIsImproving(true);
    
    try {
      // Appeler le service d'amélioration de prompt
      const result = await PromptService.improvePrompt(promptText);
      setImprovedPrompt(result.improvedPrompt);
      setShowImproved(true);
    } catch (error) {
      console.error("Erreur lors de l'amélioration du prompt:", error);
      setError(error.message || "Une erreur est survenue lors de l'amélioration du prompt.");
    } finally {
      setIsImproving(false);
    }
  };
  
  const useImprovedPrompt = () => {
    setPromptText(improvedPrompt);
    setShowImproved(false);
  };
  
  const handleSubmit = async () => {
    // Vérifier si le prompt est vide
    if (!promptText.trim()) {
      setError("Veuillez entrer un prompt avant de soumettre.");
      return;
    }
    
    // Réinitialiser les états
    setResponse(null);
    setError(null);
    setIsLoading(true);
    
    try {
      // Appeler le service de traitement de prompt
      const result = await PromptService.processPrompt(promptText, file);
      setResponse(result);
    } catch (error) {
      console.error("Erreur lors du traitement du prompt:", error);
      setError(error.message || "Une erreur est survenue lors du traitement du prompt.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PromptContainer>
      <Title>Prompt Libre</Title>
      <Card>
        <TextArea 
          placeholder="Entrez votre prompt juridique ici... (ex: Rédigez une mise en demeure pour un loyer impayé)" 
          value={promptText}
          onChange={handlePromptChange}
        />
        
        {showImproved ? (
          <ImprovedPromptContainer>
            <ImprovedPromptTitle>
              <FaMagic />
              Prompt amélioré
            </ImprovedPromptTitle>
            <ImprovedPromptText>
              {improvedPrompt.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </ImprovedPromptText>
            <UseImprovedButton onClick={useImprovedPrompt}>
              <FaCheck />
              Utiliser ce prompt
            </UseImprovedButton>
          </ImprovedPromptContainer>
        ) : null}
        
        {/* Afficher les erreurs */}
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        
        <ButtonContainer>
          {file && (
            <FileInfo>
              <FaFile />
              <FileName>{file.name}</FileName>
            </FileInfo>
          )}
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <FaSpinner />
                Traitement...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Soumettre
              </>
            )}
          </Button>
          <ImproveButton onClick={improvePrompt} disabled={isImproving} title="Améliorer le prompt">
            {isImproving ? (
              <>
                <FaSpinner />
                Amélioration...
              </>
            ) : (
              <>
                <FaMagic />
                Améliorer
              </>
            )}
          </ImproveButton>
          <FileUploadButton onClick={handleFileButtonClick} title="Joindre un document">
            <FaUpload />
          </FileUploadButton>
          <HiddenInput 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
        </ButtonContainer>
        
        {/* Afficher le chargement */}
        {isLoading && (
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        )}
        
        {/* Afficher la réponse */}
        {response && !isLoading && (
          <ResponseContainer>
            <ResponseTitle>
              <FaPaperPlane />
              Réponse
            </ResponseTitle>
            <ResponseContent>{response.response}</ResponseContent>
          </ResponseContainer>
        )}
      </Card>
    </PromptContainer>
  );
};

export default PromptLibre;
