import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RedigerContrat = () => {
  return (
    <PageTemplate 
      title="Rédiger un contrat" 
      description="Utilisez notre assistant pour rédiger un contrat personnalisé ou téléchargez un modèle existant à modifier."
      showTextInput={true}
      textInputPlaceholder="Décrivez le type de contrat et les informations importantes à inclure (parties concernées, objet du contrat, durée, clauses spécifiques, etc.)"
      showFileUploader={true}
    />
  );
};

export default RedigerContrat;
