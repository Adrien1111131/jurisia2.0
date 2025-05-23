/**
 * Exigences légales pour les différents types de documents
 */
export const legalRequirements = {
  // Exigences légales générales
  general: `
Exigences légales générales :
1. Respecter les principes fondamentaux du droit des contrats (articles 1101 et suivants du Code civil)
2. Vérifier la capacité juridique des parties (articles 1145 et suivants du Code civil)
3. S'assurer de l'absence de vices du consentement (articles 1130 et suivants du Code civil)
4. Respecter l'ordre public et les bonnes mœurs (article 6 du Code civil)
5. Inclure les mentions légales obligatoires spécifiques au type de document
6. Respecter les règles de forme imposées par la loi pour certains actes
7. Vérifier la licéité de l'objet et de la cause du contrat (articles 1162 et suivants du Code civil)`,

  // Exigences légales pour les contrats
  contrats: `
Exigences légales pour les contrats :
1. Identifier clairement les parties au contrat
2. Définir précisément l'objet du contrat
3. Déterminer les obligations de chaque partie
4. Préciser les conditions financières (prix, modalités de paiement)
5. Fixer la durée du contrat et les conditions de renouvellement
6. Prévoir les conditions de résiliation
7. Inclure une clause de règlement des litiges
8. Mentionner la loi applicable et la juridiction compétente
9. Prévoir les cas de force majeure (article 1218 du Code civil)
10. Inclure les clauses de responsabilité et leurs limitations (article 1231-3 du Code civil)`,

  // Exigences légales pour les actes juridiques
  actes: `
Exigences légales pour les actes juridiques :
1. Respecter les formalités légales spécifiques à chaque type d'acte
2. Inclure les mentions obligatoires prévues par la loi
3. Vérifier les conditions de validité propres à chaque acte
4. Respecter les délais légaux
5. Prévoir les modalités de publicité et d'opposabilité aux tiers
6. S'assurer de la conformité avec les dispositions légales et réglementaires applicables
7. Vérifier les pouvoirs des signataires`
};

/**
 * Mentions légales obligatoires pour les différents types de documents
 */
export const legalMentions = {
  // Mentions légales pour les contrats de prestation
  contratPrestation: [
    "Identité complète des parties (dénomination sociale, forme juridique, siège social, numéro SIREN/SIRET, RCS)",
    "Objet précis de la prestation",
    "Prix et modalités de paiement (article L441-6 du Code de commerce)",
    "Délais d'exécution",
    "Conditions de réception des livrables",
    "Clause de propriété intellectuelle (articles L111-1 et suivants du Code de la propriété intellectuelle)",
    "Clause de confidentialité",
    "Conditions de résiliation",
    "Clause de non-sollicitation",
    "Juridiction compétente en cas de litige",
    "Mention des pénalités de retard (article L441-6 du Code de commerce)"
  ],

  // Mentions légales pour les contrats de travail
  contratTravail: [
    "Identité des parties",
    "Lieu de travail",
    "Titre, grade, nature de l'emploi",
    "Date de début du contrat",
    "Durée de la période d'essai",
    "Montant de la rémunération et périodicité de versement",
    "Durée du travail",
    "Convention collective applicable",
    "Caisse de retraite complémentaire",
    "Organisme de prévoyance",
    "Clause de non-concurrence (si applicable)",
    "Clause de mobilité (si applicable)"
  ],

  // Mentions légales pour les baux
  bail: [
    "Identité complète du bailleur et du locataire",
    "Description précise du logement (adresse, surface habitable, nombre de pièces)",
    "Destination des locaux",
    "Montant du loyer et modalités de paiement",
    "Montant du dépôt de garantie",
    "Date de prise d'effet du bail",
    "Durée du bail",
    "Conditions de révision du loyer",
    "Charges locatives et leur répartition",
    "Diagnostic de performance énergétique (DPE)",
    "État des lieux d'entrée",
    "Assurance obligatoire du locataire",
    "Clause résolutoire",
    "Mention de la loi applicable (loi du 6 juillet 1989 pour les baux d'habitation)"
  ],

  // Mentions légales pour les NDA
  nda: [
    "Définition précise des informations confidentielles",
    "Obligations de confidentialité",
    "Exceptions à la confidentialité",
    "Durée de l'obligation de confidentialité",
    "Sanctions en cas de violation",
    "Restitution ou destruction des informations confidentielles",
    "Référence aux articles 1112-11 et 1112-2 du Code civil sur la confidentialité des négociations"
  ]
};

/**
 * Formules juridiques consacrées
 */
export const legalFormulas = {
  // Formules d'introduction
  introduction: [
    "Entre les soussignés,",
    "Il a été préalablement exposé ce qui suit :",
    "Il est préalablement rappelé ce qui suit :"
  ],

  // Formules de conclusion
  conclusion: [
    "Fait à [lieu], le [date], en [nombre] exemplaires originaux.",
    "En foi de quoi, les parties ont signé le présent contrat.",
    "En foi de quoi les parties ont signé le présent acte pour valoir ce que de droit."
  ],

  // Formules de signatures
  signatures: [
    "Pour [partie], Nom, qualité, signature précédée de la mention 'Lu et approuvé'",
    "Bon pour accord, [signature]",
    "Fait pour servir et valoir ce que de droit."
  ]
};
