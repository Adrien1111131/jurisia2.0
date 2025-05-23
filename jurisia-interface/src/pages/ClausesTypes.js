import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaExclamationTriangle, FaLock, FaGavel, FaBalanceScale, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(106, 17, 203, 0.3);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const ClauseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ClauseCard = styled.div`
  background: rgba(48, 54, 82, 0.6);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(106, 17, 203, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(48, 54, 82, 0.8);
    border-color: rgba(106, 17, 203, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0 0 15px;
    font-size: 1.3rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 10px;
      color: var(--secondary-color);
      font-size: 1.5rem;
    }
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
    flex-grow: 1;
  }
`;

const ClauseEditor = styled.div`
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 12px;
      color: var(--secondary-color);
    }
  }
`;

const OptionsContainer = styled.div`
  margin-bottom: 25px;
`;

const OptionGroup = styled.div`
  margin-bottom: 20px;
`;

const OptionLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
`;

const OptionSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(26, 31, 46, 0.7);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(42, 47, 69, 0.8);
  }
`;

const ClausePreview = styled.div`
  background: rgba(30, 35, 50, 0.8);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgba(106, 17, 203, 0.2);
  white-space: pre-line;
  
  h3 {
    margin: 0 0 15px;
    font-size: 1.2rem;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
  margin-top: 20px;
  
  &:hover {
    background: linear-gradient(45deg, #7b21dc, #3585ff);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
  }
`;

const VariantSelector = styled.div`
  margin-bottom: 20px;
`;

const VariantOption = styled.div`
  padding: 10px 15px;
  margin: 5px 0;
  background: ${({ $isSelected }) => $isSelected ? 'rgba(106, 17, 203, 0.2)' : 'rgba(42, 47, 69, 0.5)'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid ${({ $isSelected }) => $isSelected ? 'var(--primary-color)' : 'transparent'};
  
  &:hover {
    background: ${({ $isSelected }) => $isSelected ? 'rgba(106, 17, 203, 0.3)' : 'rgba(42, 47, 69, 0.7)'};
  }
  
  h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-primary);
  }
`;

const ClausesTypes = () => {
  const [selectedClause, setSelectedClause] = useState(null);
  const [clauseOptions, setClauseOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [clauseText, setClauseText] = useState('');
  
  const clauses = [
    {
      id: 'limitation_responsabilite',
      name: 'Limitation de responsabilité',
      icon: <FaShieldAlt />,
      description: 'Limitez votre responsabilité en cas de dommages ou préjudices.',
      variants: [
        { id: 'standard', name: 'Standard', description: 'Limitation générale de responsabilité' },
        { id: 'plafonnee', name: 'Plafonnée', description: 'Limitation avec plafond financier' },
        { id: 'exoneratoire', name: 'Exonératoire', description: 'Exonération de responsabilité' }
      ],
      options: [
        { id: 'montant', name: 'Montant du plafond', type: 'input', placeholder: 'Ex: 10 000 €' },
        { id: 'duree', name: 'Durée de la limitation', type: 'select', options: [
          { value: '6_mois', label: '6 mois' },
          { value: '1_an', label: '1 an' },
          { value: '2_ans', label: '2 ans' },
          { value: '5_ans', label: '5 ans' }
        ]}
      ]
    },
    {
      id: 'force_majeure',
      name: 'Force majeure',
      icon: <FaExclamationTriangle />,
      description: 'Définissez les cas de force majeure et leurs conséquences sur le contrat.',
      variants: [
        { id: 'standard', name: 'Standard', description: 'Clause classique de force majeure' },
        { id: 'detaillee', name: 'Détaillée', description: 'Liste exhaustive des cas de force majeure' },
        { id: 'pandemie', name: 'Pandémie', description: 'Spécifique aux situations de pandémie' }
      ],
      options: [
        { id: 'duree_suspension', name: 'Durée maximale de suspension', type: 'select', options: [
          { value: '1_mois', label: '1 mois' },
          { value: '3_mois', label: '3 mois' },
          { value: '6_mois', label: '6 mois' },
          { value: '1_an', label: '1 an' }
        ]},
        { id: 'notification', name: 'Délai de notification', type: 'select', options: [
          { value: '24h', label: '24 heures' },
          { value: '48h', label: '48 heures' },
          { value: '72h', label: '72 heures' },
          { value: '7j', label: '7 jours' }
        ]}
      ]
    },
    {
      id: 'confidentialite',
      name: 'Confidentialité',
      icon: <FaLock />,
      description: 'Protégez vos informations confidentielles et définissez les obligations des parties.',
      variants: [
        { id: 'standard', name: 'Standard', description: 'Clause générale de confidentialité' },
        { id: 'renforcee', name: 'Renforcée', description: 'Protection renforcée avec obligations détaillées' },
        { id: 'unilaterale', name: 'Unilatérale', description: 'Protection pour une seule partie' }
      ],
      options: [
        { id: 'duree', name: 'Durée de confidentialité', type: 'select', options: [
          { value: '1_an', label: '1 an après la fin du contrat' },
          { value: '3_ans', label: '3 ans après la fin du contrat' },
          { value: '5_ans', label: '5 ans après la fin du contrat' },
          { value: 'indefinie', label: 'Durée indéfinie' }
        ]},
        { id: 'penalite', name: 'Pénalité en cas de violation', type: 'input', placeholder: 'Ex: 50 000 €' }
      ]
    },
    {
      id: 'droit_applicable',
      name: 'Droit applicable',
      icon: <FaGavel />,
      description: 'Spécifiez le droit applicable au contrat en cas de litige.',
      variants: [
        { id: 'standard', name: 'Standard', description: 'Clause simple de droit applicable' },
        { id: 'international', name: 'International', description: 'Pour les contrats internationaux' },
        { id: 'specifique', name: 'Spécifique', description: 'Avec dispositions particulières' }
      ],
      options: [
        { id: 'pays', name: 'Pays du droit applicable', type: 'select', options: [
          { value: 'france', label: 'France' },
          { value: 'suisse', label: 'Suisse' },
          { value: 'belgique', label: 'Belgique' },
          { value: 'luxembourg', label: 'Luxembourg' },
          { value: 'autre', label: 'Autre' }
        ]}
      ]
    },
    {
      id: 'resolution_litiges',
      name: 'Résolution des litiges',
      icon: <FaBalanceScale />,
      description: 'Définissez la procédure de résolution des litiges entre les parties.',
      variants: [
        { id: 'mediation', name: 'Médiation préalable', description: 'Médiation obligatoire avant saisine des tribunaux' },
        { id: 'arbitrage', name: 'Arbitrage', description: 'Résolution par tribunal arbitral' },
        { id: 'judiciaire', name: 'Judiciaire', description: 'Résolution par les tribunaux' }
      ],
      options: [
        { id: 'tribunal', name: 'Tribunal compétent', type: 'select', options: [
          { value: 'commerce', label: 'Tribunal de commerce' },
          { value: 'grande_instance', label: 'Tribunal de grande instance' },
          { value: 'arbitral', label: 'Tribunal arbitral' }
        ]},
        { id: 'ville', name: 'Ville du tribunal', type: 'input', placeholder: 'Ex: Paris' }
      ]
    }
  ];
  
  const handleClauseSelect = (clause) => {
    setSelectedClause(clause);
    setSelectedVariant(clause.variants[0].id);
    setClauseOptions({});
    
    // Générer un texte de clause fictif
    generateClauseText(clause, clause.variants[0].id, {});
  };
  
  const handleVariantSelect = (variantId) => {
    setSelectedVariant(variantId);
    
    // Mettre à jour le texte de la clause
    generateClauseText(selectedClause, variantId, clauseOptions);
  };
  
  const handleOptionChange = (optionId, value) => {
    const newOptions = { ...clauseOptions, [optionId]: value };
    setClauseOptions(newOptions);
    
    // Mettre à jour le texte de la clause
    generateClauseText(selectedClause, selectedVariant, newOptions);
  };
  
  const generateClauseText = (clause, variantId, options) => {
    if (!clause) return;
    
    // Logique pour générer le texte de la clause en fonction du type, de la variante et des options
    let text = '';
    
    switch (clause.id) {
      case 'limitation_responsabilite':
        text = generateLimitationResponsabiliteText(variantId, options);
        break;
      case 'force_majeure':
        text = generateForceMajeureText(variantId, options);
        break;
      case 'confidentialite':
        text = generateConfidentialiteText(variantId, options);
        break;
      case 'droit_applicable':
        text = generateDroitApplicableText(variantId, options);
        break;
      case 'resolution_litiges':
        text = generateResolutionLitigesText(variantId, options);
        break;
      default:
        text = 'Texte de la clause à générer...';
    }
    
    setClauseText(text);
  };
  
  const generateLimitationResponsabiliteText = (variantId, options) => {
    const montant = options.montant || '10 000 €';
    const duree = options.duree ? options.duree.replace('_', ' ') : '1 an';
    
    switch (variantId) {
      case 'standard':
        return `ARTICLE [X] - LIMITATION DE RESPONSABILITÉ\n\nLa responsabilité de chaque Partie au titre du présent Contrat est limitée aux dommages directs. En aucun cas, l'une ou l'autre des Parties ne pourra être tenue responsable des dommages indirects, tels que perte de chiffre d'affaires, perte de clientèle, atteinte à l'image ou perte de données.\n\nCette limitation de responsabilité s'applique pendant toute la durée du Contrat et pendant une période de ${duree} suivant sa résiliation ou son expiration.`;
        
      case 'plafonnee':
        return `ARTICLE [X] - LIMITATION DE RESPONSABILITÉ\n\nLa responsabilité de chaque Partie au titre du présent Contrat est limitée aux dommages directs et ne pourra excéder, tous préjudices confondus, le montant total de ${montant}.\n\nEn aucun cas, l'une ou l'autre des Parties ne pourra être tenue responsable des dommages indirects, tels que perte de chiffre d'affaires, perte de clientèle, atteinte à l'image ou perte de données.\n\nCette limitation de responsabilité s'applique pendant toute la durée du Contrat et pendant une période de ${duree} suivant sa résiliation ou son expiration.`;
        
      case 'exoneratoire':
        return `ARTICLE [X] - EXONÉRATION DE RESPONSABILITÉ\n\nDans les limites autorisées par la loi applicable, le Prestataire est exonéré de toute responsabilité pour les dommages de quelque nature que ce soit, directs ou indirects, matériels ou immatériels, résultant de l'exécution du présent Contrat.\n\nCette exonération ne s'applique pas en cas de faute lourde ou intentionnelle, de dol, ou en cas de dommages corporels.\n\nCette exonération de responsabilité s'applique pendant toute la durée du Contrat et pendant une période de ${duree} suivant sa résiliation ou son expiration.`;
        
      default:
        return 'Texte de la clause à générer...';
    }
  };
  
  const generateForceMajeureText = (variantId, options) => {
    const duree_suspension = options.duree_suspension ? options.duree_suspension.replace('_', ' ') : '3 mois';
    const notification = options.notification || '48h';
    
    switch (variantId) {
      case 'standard':
        return `ARTICLE [X] - FORCE MAJEURE\n\nAucune des Parties ne pourra être tenue pour responsable de l'inexécution de ses obligations contractuelles si cette inexécution est due à un cas de force majeure tel que défini par la jurisprudence des tribunaux compétents.\n\nLa Partie invoquant un cas de force majeure devra en informer l'autre Partie dans un délai de ${notification} à compter de la survenance de l'événement.\n\nLes obligations contractuelles affectées par le cas de force majeure seront suspendues pendant toute la durée de ce dernier et reprendront à compter de sa cessation. Toutefois, si le cas de force majeure persiste au-delà d'une durée de ${duree_suspension}, chaque Partie aura la faculté de résilier le Contrat sans indemnité.`;
        
      case 'detaillee':
        return `ARTICLE [X] - FORCE MAJEURE\n\nAucune des Parties ne pourra être tenue pour responsable de l'inexécution de ses obligations contractuelles si cette inexécution est due à un cas de force majeure.\n\nSont considérés comme cas de force majeure, sans que cette liste soit limitative : les catastrophes naturelles, tremblements de terre, tempêtes, inondations, incendies, épidémies ; les conflits armés, guerres, attentats, émeutes, troubles civils ; les grèves générales ou sectorielles ; les blocages des moyens de transport ou d'approvisionnement ; les restrictions gouvernementales ou légales ; les pannes d'électricité prolongées ; et plus généralement, tout événement imprévisible, irrésistible et extérieur à la volonté des Parties.\n\nLa Partie invoquant un cas de force majeure devra en informer l'autre Partie dans un délai de ${notification} à compter de la survenance de l'événement, par tout moyen permettant d'en accuser réception.\n\nLes obligations contractuelles affectées par le cas de force majeure seront suspendues pendant toute la durée de ce dernier et reprendront à compter de sa cessation. Toutefois, si le cas de force majeure persiste au-delà d'une durée de ${duree_suspension}, chaque Partie aura la faculté de résilier le Contrat sans indemnité, par lettre recommandée avec accusé de réception.`;
        
      case 'pandemie':
        return `ARTICLE [X] - FORCE MAJEURE ET PANDÉMIE\n\nAucune des Parties ne pourra être tenue pour responsable de l'inexécution de ses obligations contractuelles si cette inexécution est due à un cas de force majeure tel que défini par la jurisprudence des tribunaux compétents.\n\nLes Parties reconnaissent expressément que les situations de pandémie (telle que la COVID-19) et leurs conséquences, notamment les mesures gouvernementales restrictives (confinement, couvre-feu, fermeture administrative, etc.), constituent des cas de force majeure lorsqu'elles rendent impossible l'exécution des obligations contractuelles.\n\nLa Partie invoquant un cas de force majeure devra en informer l'autre Partie dans un délai de ${notification} à compter de la survenance de l'événement, par tout moyen permettant d'en accuser réception.\n\nLes obligations contractuelles affectées par le cas de force majeure seront suspendues pendant toute la durée de ce dernier et reprendront à compter de sa cessation. Toutefois, si le cas de force majeure persiste au-delà d'une durée de ${duree_suspension}, chaque Partie aura la faculté de résilier le Contrat sans indemnité, par lettre recommandée avec accusé de réception.`;
        
      default:
        return 'Texte de la clause à générer...';
    }
  };
  
  const generateConfidentialiteText = (variantId, options) => {
    const duree = options.duree ? options.duree.replace('_', ' ') : '3 ans';
    const penalite = options.penalite || '50 000 €';
    
    switch (variantId) {
      case 'standard':
        return `ARTICLE [X] - CONFIDENTIALITÉ\n\nChaque Partie s'engage à considérer comme confidentielles toutes les informations qui lui seront transmises par l'autre Partie dans le cadre de l'exécution du présent Contrat, et à ne pas les divulguer à des tiers sans l'accord préalable écrit de l'autre Partie.\n\nCet engagement de confidentialité s'applique pendant toute la durée du Contrat et se poursuivra pendant une période de ${duree} après sa résiliation ou son expiration, quelle qu'en soit la cause.\n\nNe sont pas considérées comme confidentielles les informations qui sont déjà dans le domaine public ou qui y tombent sans faute de la Partie réceptrice, ainsi que les informations développées indépendamment par la Partie réceptrice.`;
        
      case 'renforcee':
        return `ARTICLE [X] - CONFIDENTIALITÉ\n\nChaque Partie s'engage à considérer comme strictement confidentielles toutes les informations, documents, données, savoir-faire, méthodes, logiciels, spécifications techniques, plans d'affaires, stratégies commerciales et financières, et plus généralement toutes informations de quelque nature que ce soit, sous quelque forme que ce soit, qui lui seront transmis par l'autre Partie ou dont elle aura connaissance dans le cadre de l'exécution du présent Contrat (ci-après les "Informations Confidentielles").\n\nChaque Partie s'engage à :\n- ne pas utiliser les Informations Confidentielles à d'autres fins que l'exécution du présent Contrat ;\n- ne pas divulguer les Informations Confidentielles à des tiers sans l'accord préalable écrit de l'autre Partie ;\n- ne communiquer les Informations Confidentielles qu'aux membres de son personnel ayant à en connaître pour l'exécution du Contrat, et à s'assurer que ces personnes respectent la présente obligation de confidentialité ;\n- prendre toutes les mesures nécessaires pour protéger les Informations Confidentielles contre toute divulgation non autorisée.\n\nEn cas de violation de cette obligation de confidentialité, la Partie défaillante sera tenue de verser à l'autre Partie une pénalité forfaitaire de ${penalite}, sans préjudice de tous autres dommages et intérêts.\n\nCet engagement de confidentialité s'applique pendant toute la durée du Contrat et se poursuivra pendant une période de ${duree} après sa résiliation ou son expiration, quelle qu'en soit la cause.`;
        
      case 'unilaterale':
        return `ARTICLE [X] - CONFIDENTIALITÉ\n\nLe Récepteur s'engage à considérer comme strictement confidentielles toutes les informations, documents, données, savoir-faire, méthodes, logiciels, spécifications techniques, plans d'affaires, stratégies commerciales et financières, et plus généralement toutes informations de quelque nature que ce soit, sous quelque forme que ce soit, qui lui seront transmis par le Divulgateur ou dont il aura connaissance dans le cadre de l'exécution du présent Contrat (ci-après les "Informations Confidentielles").\n\nLe Récepteur s'engage à :\n- ne pas utiliser les Informations Confidentielles à d'autres fins que l'exécution du présent Contrat ;\n- ne pas divulguer les Informations Confidentielles à des tiers sans l'accord préalable écrit du Divulgateur ;\n- ne communiquer les Informations Confidentielles qu'aux membres de son personnel ayant à en connaître pour l'exécution du Contrat, et à s'assurer que ces personnes respectent la présente obligation de confidentialité ;\n- prendre toutes les mesures nécessaires pour protéger les Informations Confidentielles contre toute divulgation non autorisée.\n\nEn cas de violation de cette obligation de confidentialité, le Récepteur sera tenu de verser au Divulgateur une pénalité forfaitaire de ${penalite}, sans préjudice de tous autres dommages et intérêts.\n\nCet engagement de confidentialité s'applique pendant toute la durée du Contrat et se poursuivra pendant une période de ${duree} après sa résiliation ou son expiration, quelle qu'en soit la cause.`;
        
      default:
        return 'Texte de la clause à générer...';
    }
  };
  
  const generateDroitApplicableText = (variantId, options) => {
    const pays = options.pays ? options.pays.charAt(0).toUpperCase() + options.pays.slice(1) : 'France';
    
    switch (variantId) {
      case 'standard':
        return `ARTICLE [X] - DROIT APPLICABLE\n\nLe présent Contrat est soumis au droit ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'français' : pays === 'Suisse' ? 'suisse' : pays === 'Belgique' ? 'belge' : pays === 'Luxembourg' ? 'luxembourgeois' : '[préciser]'}.\n\nTout litige relatif à la formation, l'interprétation, l'exécution ou la résiliation du présent Contrat sera soumis à la compétence exclusive des tribunaux compétents de ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'Paris' : pays === 'Suisse' ? 'Genève' : pays === 'Belgique' ? 'Bruxelles' : pays === 'Luxembourg' ? 'Luxembourg' : '[préciser]'}.`;
        
      case 'international':
        return `ARTICLE [X] - DROIT APPLICABLE ET JURIDICTION COMPÉTENTE\n\nLe présent Contrat est soumis au droit ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'français' : pays === 'Suisse' ? 'suisse' : pays === 'Belgique' ? 'belge' : pays === 'Luxembourg' ? 'luxembourgeois' : '[préciser]'}.\n\nLa Convention des Nations Unies sur les contrats de vente internationale de marchandises (Convention de Vienne) est expressément exclue.\n\nTout litige, différend ou réclamation né du présent Contrat ou se rapportant au présent Contrat, y compris la validité, la nullité, d'éventuelles violations du Contrat ou sa résiliation, sera tranché par les tribunaux compétents de ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'Paris' : pays === 'Suisse' ? 'Genève' : pays === 'Belgique' ? 'Bruxelles' : pays === 'Luxembourg' ? 'Luxembourg' : '[préciser]'}.`;
        
      case 'specifique':
        return `ARTICLE [X] - DROIT APPLICABLE ET JURIDICTION COMPÉTENTE\n\nLe présent Contrat est soumis au droit ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'français' : pays === 'Suisse' ? 'suisse' : pays === 'Belgique' ? 'belge' : pays === 'Luxembourg' ? 'luxembourgeois' : '[préciser]'}, à l'exclusion de ses règles de conflit de lois.\n\nLes Parties s'efforceront de résoudre à l'amiable tout différend relatif à la validité, l'interprétation, l'exécution ou la résiliation du présent Contrat.\n\nÀ défaut d'accord amiable dans un délai de trente (30) jours à compter de la notification du différend par l'une des Parties à l'autre, tout litige sera soumis à la compétence exclusive des tribunaux compétents de ${pays === 'Autre' ? '[préciser]' : pays === 'France' ? 'Paris' : pays === 'Suisse' ? 'Genève' : pays === 'Belgique' ? 'Bruxelles' : pays === 'Luxembourg' ? 'Luxembourg' : '[préciser]'}.`;
        
      default:
        return 'Texte de la clause à générer...';
    }
  };
  
  const generateResolutionLitigesText = (variantId, options) => {
    const tribunal = options.tribunal ? options.tribunal.replace('_', ' ') : 'commerce';
    const ville = options.ville || 'Paris';
    
    switch (variantId) {
      case 'mediation':
        return `ARTICLE [X] - RÉSOLUTION DES LITIGES\n\nEn cas de différend entre les Parties relatif à la validité, l'interprétation, l'exécution ou la résiliation du présent Contrat, les Parties s'engagent à se soumettre à une procédure de médiation préalable à toute action judiciaire.\n\nÀ cet effet, la Partie la plus diligente saisira un médiateur choisi d'un commun accord entre les Parties ou, à défaut d'accord, désigné par le Centre de Médiation et d'Arbitrage de Paris (CMAP) selon son règlement.\n\nLes Parties s'engagent à participer de bonne foi à la médiation et à y consacrer le temps et l'attention nécessaires.\n\nÀ défaut d'accord dans un délai de trois (3) mois à compter de la désignation du médiateur, les Parties retrouveront leur liberté d'action et pourront saisir le Tribunal de ${tribunal} de ${ville}, auquel les Parties attribuent compétence exclusive.`;
        
      case 'arbitrage':
        return `ARTICLE [X] - RÉSOLUTION DES LITIGES\n\nTout différend découlant du présent Contrat ou en relation avec celui-ci, y compris concernant sa validité, son interprétation, son exécution ou sa résiliation, sera résolu définitivement par voie d'arbitrage conformément au Règlement d'arbitrage de la Chambre de Commerce Internationale (CCI) par un ou trois arbitres nommés conformément à ce Règlement.\n\nLe siège de l'arbitrage sera ${ville}.\n\nLa langue de l'arbitrage sera le français.\n\nLe droit applicable au fond du litige sera le droit français.\n\nLa sentence arbitrale sera définitive et liera les Parties, qui s'engagent à l'exécuter sans délai.`;
        
      case 'judiciaire':
        return `ARTICLE [X] - RÉSOLUTION DES LITIGES\n\nTout litige relatif à la formation, la validité, l'interprétation, l'exécution ou la résiliation du présent Contrat sera soumis à la compétence exclusive du Tribunal de ${tribunal} de ${ville}, nonobstant pluralité de défendeurs ou appel en garantie.\n\nCette clause s'applique même en cas de référé, de demande incidente, de pluralité de défendeurs ou d'appel en garantie, et quels que soient le mode et les modalités de paiement.`;
        
      default:
        return 'Texte de la clause à générer...';
    }
  };
  
  // Rendu du composant
  return (
    <PageContainer>
      <Title>Clauses types</Title>
      <Description>
        Sélectionnez une clause type ci-dessous pour générer un texte juridique adapté à vos besoins.
        Personnalisez les options pour obtenir une clause sur mesure, prête à être intégrée dans vos contrats.
      </Description>
      
      <ClauseGrid>
        {clauses.map(clause => (
          <ClauseCard 
            key={clause.id} 
            onClick={() => handleClauseSelect(clause)}
          >
            <h3>{clause.icon} {clause.name}</h3>
            <p>{clause.description}</p>
          </ClauseCard>
        ))}
      </ClauseGrid>
      
      {selectedClause && (
        <ClauseEditor>
          <EditorHeader>
            <h2>{selectedClause.icon} {selectedClause.name}</h2>
          </EditorHeader>
          
          <VariantSelector>
            {selectedClause.variants.map(variant => (
              <VariantOption 
                key={variant.id} 
                $isSelected={selectedVariant === variant.id}
                onClick={() => handleVariantSelect(variant.id)}
              >
                <h4>{variant.name}</h4>
              </VariantOption>
            ))}
          </VariantSelector>
          
          <OptionsContainer>
            {selectedClause.options.map(option => (
              <OptionGroup key={option.id}>
                <OptionLabel htmlFor={option.id}>{option.name}</OptionLabel>
                
                {option.type === 'select' ? (
                  <OptionSelect 
                    id={option.id}
                    value={clauseOptions[option.id] || ''}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  >
                    <option value="">Sélectionnez une option</option>
                    {option.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </OptionSelect>
                ) : (
                  <OptionInput 
                    id={option.id}
                    type="text"
                    placeholder={option.placeholder}
                    value={clauseOptions[option.id] || ''}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  />
                )}
              </OptionGroup>
            ))}
          </OptionsContainer>
          
          <ClausePreview>
            <h3>Aperçu de la clause</h3>
            <p>{clauseText}</p>
          </ClausePreview>
          
          <Button>
            Copier la clause
          </Button>
        </ClauseEditor>
      )}
    </PageContainer>
  );
};

export default ClausesTypes;
