import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileAlt } from 'react-icons/fa';
import PageTemplate from '../components/PageTemplate';
import { resumeService } from '../services/resumeService';

const ResultContainer = styled.div`
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
  border: 1px solid rgba(106, 17, 203, 0.3);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Content = styled.div`
  color: var(--text-primary);
  line-height: 1.6;
  white-space: pre-wrap;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    
    &:before {
      content: "•";
      color: var(--primary-color);
      position: absolute;
      left: 0;
    }
  }
`;

const LoadingMessage = styled.div`
  color: var(--text-secondary);
  text-align: center;
  padding: 20px;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid rgba(255, 68, 68, 0.3);
`;

const ResumerDocument = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      // Lire le contenu du fichier
      const content = await resumeService.readFile(file);
      
      // Générer le résumé structuré
      const structuredSummary = await resumeService.generateStructuredSummary(content);
      
      // Extraire les points clés
      const keyPoints = await resumeService.extractKeyPoints(content);
      
      // Combiner les résultats
      setSummary({
        ...structuredSummary,
        keyPoints
      });
      
    } catch (error) {
      console.error('Erreur lors du traitement du document:', error);
      setError('Une erreur est survenue lors de l\'analyse du document. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate 
      title="Résumer un document" 
      description="Téléchargez un document juridique pour en obtenir un résumé automatique. Pour de meilleurs résultats, utilisez uniquement des fichiers TXT ou DOCX."
      icon={FaFileAlt}
      showFileUploader={true}
      acceptedFileTypes=".txt,.docx"
      fileUploaderMessage="Pour un résumé optimal, seuls les formats TXT et DOCX sont pris en charge."
      onFileUpload={handleFileUpload}
    >
      {loading && (
        <LoadingMessage>
          Analyse du document en cours...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {summary && (
        <ResultContainer>
          <Section>
            <SectionTitle>Type de document</SectionTitle>
            <Content>{summary.title}</Content>
          </Section>

          <Section>
            <SectionTitle>Résumé</SectionTitle>
            <Content>{summary.summary}</Content>
          </Section>

          <Section>
            <SectionTitle>Points clés</SectionTitle>
            <List>
              {summary.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </List>
          </Section>

          {summary.recommendations && summary.recommendations.length > 0 && (
            <Section>
              <SectionTitle>Recommandations</SectionTitle>
              <List>
                {summary.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </List>
            </Section>
          )}
        </ResultContainer>
      )}
    </PageTemplate>
  );
};

export default ResumerDocument;
