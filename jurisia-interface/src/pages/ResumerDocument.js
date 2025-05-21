import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ResumerDocument = () => {
  return (
    <PageTemplate 
      title="Résumer un document" 
      description="Téléchargez un document juridique pour en obtenir un résumé automatique. Pour de meilleurs résultats, utilisez uniquement des fichiers TXT ou DOCX."
      showFileUploader={true}
      acceptedFileTypes=".txt,.docx"
      fileUploaderMessage="Pour un résumé optimal, seuls les formats TXT et DOCX sont pris en charge."
    />
  );
};

export default ResumerDocument;
