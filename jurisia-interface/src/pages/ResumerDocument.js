import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ResumerDocument = () => {
  return (
    <PageTemplate 
      title="Résumer un document" 
      description="Téléchargez un document juridique pour en obtenir un résumé automatique."
      showFileUploader={true}
    />
  );
};

export default ResumerDocument;
