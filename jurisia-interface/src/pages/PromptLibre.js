import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaUpload, FaFile, FaCheck, FaMagic } from 'react-icons/fa';

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



const PromptLibre = () => {
  const [file, setFile] = useState(null);
  const [promptText, setPromptText] = useState('Rédigez une mise en demeure pour un loyer impayé');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [showImproved, setShowImproved] = useState(false);
  const fileInputRef = useRef(null);
  
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
  
  const improvePrompt = () => {
    console.log("Amélioration du prompt:", promptText);
    
    // Si le promptText est vide, utiliser un exemple pour la démonstration
    const textToImprove = promptText.trim() || "Rédigez une mise en demeure pour un loyer impayé";
    
    // Simuler l'amélioration du prompt (dans un cas réel, cela pourrait faire appel à une API)
    const improved = enhancePrompt(textToImprove);
    console.log("Prompt amélioré:", improved);
    
    setImprovedPrompt(improved);
    setShowImproved(true);
  };
  
  const useImprovedPrompt = () => {
    setPromptText(improvedPrompt);
    setShowImproved(false);
  };
  
  // Fonction qui simule l'amélioration du prompt
  const enhancePrompt = (originalPrompt) => {
    // Cette fonction pourrait être remplacée par un appel API à un service d'IA
    // Pour l'instant, nous ajoutons simplement des éléments pour rendre le prompt plus précis
    
    let improved = originalPrompt;
    
    // Ajouter des précisions juridiques si elles ne sont pas présentes
    if (!improved.toLowerCase().includes('date')) {
      improved += '\n\nVeuillez inclure les dates pertinentes.';
    }
    
    if (!improved.toLowerCase().includes('partie') && !improved.toLowerCase().includes('parties')) {
      improved += '\n\nPrécisez les parties concernées avec leurs informations complètes.';
    }
    
    if (!improved.toLowerCase().includes('montant') && 
        !improved.toLowerCase().includes('somme') && 
        !improved.toLowerCase().includes('euros') && 
        !improved.toLowerCase().includes('€')) {
      improved += '\n\nIndiquez les montants précis si applicable.';
    }
    
    // Ajouter une demande de format spécifique
    improved += '\n\nStructurez la réponse avec: introduction, faits, analyse juridique, et conclusion.';
    
    // Ajouter une demande de références juridiques
    improved += '\n\nCitez les articles de loi et jurisprudences pertinents.';
    
    return improved;
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
        
        <ButtonContainer>
          {file && (
            <FileInfo>
              <FaFile />
              <FileName>{file.name}</FileName>
            </FileInfo>
          )}
          <Button>
            <FaPaperPlane />
            Soumettre
          </Button>
          <ImproveButton onClick={improvePrompt} title="Améliorer le prompt">
            <FaMagic />
            Améliorer
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
      </Card>
    </PromptContainer>
  );
};

export default PromptLibre;
