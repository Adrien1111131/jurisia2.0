import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RedigerMiseEnDemeure = () => {
  return (
    <PageTemplate 
      title="Rédiger une mise en demeure" 
      description="Utilisez notre assistant pour rédiger une mise en demeure efficace ou téléchargez un modèle existant à modifier."
      showTextInput={true}
      textInputPlaceholder="Décrivez la situation nécessitant une mise en demeure (objet du litige, montant dû, délai de paiement souhaité, etc.)"
      showFileUploader={true}
    />
  );
};

export default RedigerMiseEnDemeure;
