import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPrint, FaDownload, FaCopy } from 'react-icons/fa';
import { documentGeneratorService } from '../services/documentGeneratorService';

const Container = styled.div`
  margin-top: 20px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 10px;
  margin: 10px 0;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.3);
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1.2em;
  }
`;

const DocumentGenerator = ({ category, option, type, fields, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState(null);
  const documentRef = useRef(null);

  // Valider les données du formulaire
  const validateFormData = (fields, formData) => {
    const missingFields = [];
    
    // Vérifier les champs requis
    fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        missingFields.push(field.label);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Les champs suivants sont requis : ${missingFields.join(', ')}`);
    }

    // Vérifier que les données sont valides
    fields.forEach(field => {
      const value = formData[field.id];
      if (value && typeof value !== 'string') {
        throw new Error(`Le champ "${field.label}" contient une valeur invalide`);
      }
      if (value && value.trim().length === 0) {
        throw new Error(`Le champ "${field.label}" ne peut pas être vide`);
      }
    });

    return true;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Valider les données avant de générer le document
      validateFormData(fields, formData);

      console.log('Tentative de génération avec:', {
        category,
        option,
        type,
        fields,
        formData
      });

      // Générer le document en utilisant les données reçues en props
      const generatedDoc = await documentGeneratorService.generateDocument(
        category,
        option,
        type,
        formData
      );
      
      setDocument(generatedDoc);
    } catch (err) {
      console.error('Erreur lors de la génération:', err);
      setError(err.message || 'Une erreur est survenue lors de la génération du document');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Ouvrir la boîte de dialogue d'impression pour sauvegarder en PDF
    window.print();
  };

  const handleCopy = async () => {
    if (documentRef.current) {
      try {
        // Copier le texte sans le HTML
        const text = documentRef.current.innerText;
        await navigator.clipboard.writeText(text);
        alert('Document copié dans le presse-papiers');
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
        alert('Impossible de copier le document dans le presse-papiers');
      }
    }
  };

  // Vérifier que toutes les props nécessaires sont présentes
  if (!category || !option || !type || !fields || !formData) {
    return (
      <ErrorMessage>
        Erreur : Informations manquantes pour générer le document
      </ErrorMessage>
    );
  }

  return (
    <Container>
      <ActionButton onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Génération en cours...' : 'Générer le document'}
      </ActionButton>

      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      {error && (
        <ErrorMessage>
          Erreur : {error}
        </ErrorMessage>
      )}

      {document && (
        <>
          <DocumentActions>
            <ActionButton onClick={handlePrint}>
              <FaPrint /> Imprimer
            </ActionButton>
            <ActionButton onClick={handleDownload}>
              <FaDownload /> PDF
            </ActionButton>
            <ActionButton onClick={handleCopy}>
              <FaCopy /> Copier
            </ActionButton>
          </DocumentActions>
          
          <div
            ref={documentRef}
            dangerouslySetInnerHTML={{ __html: document }}
          />
        </>
      )}
    </Container>
  );
};

export default DocumentGenerator;
