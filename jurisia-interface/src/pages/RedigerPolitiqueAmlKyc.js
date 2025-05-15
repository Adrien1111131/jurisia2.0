import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RedigerPolitiqueAmlKyc = () => {
  return (
    <PageTemplate 
      title="Politique AML / KYC" 
      description="Utilisez notre assistant pour rédiger des politiques Anti-Money Laundering (AML) et Know Your Customer (KYC) conformes aux réglementations en vigueur."
      showTextInput={true}
      textInputPlaceholder="Décrivez les exigences spécifiques de votre politique AML/KYC (procédures de vérification d'identité, évaluation des risques, surveillance des transactions, conservation des documents, etc.) et incluez les informations relatives à votre secteur d'activité."
      showFileUploader={true}
    />
  );
};

export default RedigerPolitiqueAmlKyc;
