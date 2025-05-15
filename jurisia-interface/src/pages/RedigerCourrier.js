import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RedigerCourrier = () => {
  return (
    <PageTemplate 
      title="Rédiger un courrier juridique" 
      description="Utilisez notre assistant pour rédiger un courrier juridique professionnel ou téléchargez un modèle existant à modifier."
      showTextInput={true}
      textInputPlaceholder="Décrivez l'objet de votre courrier juridique (destinataire, contexte, demande spécifique, etc.)"
      showFileUploader={true}
    />
  );
};

export default RedigerCourrier;
