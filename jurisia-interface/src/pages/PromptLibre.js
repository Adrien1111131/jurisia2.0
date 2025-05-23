import React, { useState } from 'react';
import styled from 'styled-components';
import { FaComment } from 'react-icons/fa';
import { generateFreePrompt } from '../services/promptService';

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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 15px;
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1.1rem;
  resize: vertical;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
  }
`;

const Button = styled.button`
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

const ResponseContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(106, 17, 203, 0.3);
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const PromptLibre = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Appel à l'API via notre service
      const result = await generateFreePrompt(prompt);
      setResponse(result);
    } catch (error) {
      console.error('Erreur:', error);
      setResponse('Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard ou contacter le support technique.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>
        <FaComment style={{ marginRight: '15px' }} />
        Prompt libre
      </Title>
      <Description>
        Posez votre question juridique ou décrivez votre besoin. Notre assistant juridique vous aidera à trouver la réponse appropriée.
      </Description>

      <form onSubmit={handleSubmit}>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre question ou votre demande ici..."
          required
        />
        <Button type="submit" disabled={isLoading || !prompt.trim()}>
          {isLoading ? 'Traitement en cours...' : 'Envoyer'}
        </Button>
      </form>

      {response && (
        <ResponseContainer>
          {response}
        </ResponseContainer>
      )}
    </PageContainer>
  );
};

export default PromptLibre;
