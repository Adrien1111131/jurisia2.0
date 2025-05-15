import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RedigerConformiteFinma = () => {
  return (
    <PageTemplate 
      title="Document de Conformité FINMA" 
      description="Utilisez notre assistant pour rédiger des documents de conformité conformes aux exigences de l'Autorité fédérale de surveillance des marchés financiers (FINMA)."
      showTextInput={true}
      textInputPlaceholder="Décrivez le type de document de conformité FINMA requis (rapport annuel, évaluation des risques, procédures internes, etc.) et incluez les informations spécifiques à votre établissement financier."
      showFileUploader={true}
    />
  );
};

export default RedigerConformiteFinma;
