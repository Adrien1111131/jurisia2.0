// Service de recherche pour les différentes bases de données juridiques

export class SearchService {
  constructor() {
    // Initialisation du service
    this.jurisprudenceData = [
      {
        title: 'Arrêt de la Cour de cassation, chambre civile 1',
        reference: 'Cass. civ. 1, 15 janvier 2023, n° 21-12.345',
        date: '2023-01-15',
        juridiction: 'cass',
        chambre: 'civ1',
        solution: 'cassation',
        articleCode: '1382 code civil',
        summary: 'La Cour de cassation rappelle que la responsabilité délictuelle suppose la preuve d\'une faute, d\'un dommage et d\'un lien de causalité entre les deux.'
      },
      {
        title: 'Arrêt du Conseil d\'État, 5ème chambre',
        reference: 'CE, 20 février 2023, n° 456789',
        date: '2023-02-20',
        juridiction: 'ce',
        chambre: '',
        solution: 'annulation',
        articleCode: 'L. 121-1 code de l\'environnement',
        summary: 'Le Conseil d\'État annule un arrêté préfectoral pour erreur manifeste d\'appréciation dans l\'application du principe de précaution en matière environnementale.'
      },
      {
        title: 'Arrêt de la Cour de cassation, chambre commerciale',
        reference: 'Cass. com., 10 mars 2023, n° 22-10.456',
        date: '2023-03-10',
        juridiction: 'cass',
        chambre: 'com',
        solution: 'rejet',
        articleCode: 'L. 442-1 code de commerce',
        summary: 'La Cour rejette le pourvoi et confirme que la rupture brutale de relations commerciales établies est caractérisée par l\'absence de préavis suffisant.'
      },
      {
        title: 'Arrêt de la Cour d\'appel de Paris',
        reference: 'CA Paris, 5 avril 2023, n° 22/12345',
        date: '2023-04-05',
        juridiction: 'ca',
        chambre: '',
        solution: '',
        articleCode: '1240 code civil',
        summary: 'La Cour d\'appel confirme le jugement de première instance en matière de responsabilité civile pour faute.'
      }
    ];
    
    this.doctrineData = [
      {
        title: 'La réforme du droit des contrats : bilan et perspectives',
        author: 'Jean Dupont',
        publication: 'Recueil Dalloz',
        date: '2023-03-10',
        typePublication: 'article',
        annee: '2023',
        domaineJuridique: 'civil',
        summary: 'Analyse approfondie des conséquences pratiques de la réforme du droit des contrats et des perspectives d\'évolution jurisprudentielle.'
      },
      {
        title: 'Droit des sociétés et gouvernance d\'entreprise',
        author: 'Marie Martin',
        publication: 'JCP',
        date: '2023-04-05',
        typePublication: 'article',
        annee: '2023',
        domaineJuridique: 'commercial',
        summary: 'Étude des évolutions récentes en matière de gouvernance d\'entreprise et leurs implications sur le droit des sociétés.'
      },
      {
        title: 'Traité de droit fiscal des affaires',
        author: 'Pierre Durand',
        publication: '',
        date: '2022-11-15',
        typePublication: 'ouvrage',
        annee: '2022',
        domaineJuridique: 'fiscal',
        summary: 'Ouvrage de référence sur la fiscalité des entreprises, intégrant les dernières réformes et jurisprudences.'
      },
      {
        title: 'La protection des données personnelles en droit du travail',
        author: 'Sophie Legrand',
        publication: 'RTD Civ.',
        date: '2023-02-20',
        typePublication: 'article',
        annee: '2023',
        domaineJuridique: 'travail',
        summary: 'Analyse des enjeux de la protection des données personnelles dans les relations de travail à l\'ère du numérique.'
      }
    ];
    
    this.legislationData = [
      {
        title: 'Article 1240 du Code civil',
        reference: 'Art. 1240 C. civ.',
        text: 'Tout fait quelconque de l\'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer.',
        typeTexte: '',
        code: 'civil',
        article: '1240',
        datePromulgation: '2016-02-10',
        etat: 'en_vigueur'
      },
      {
        title: 'Article L. 442-1 du Code de commerce',
        reference: 'Art. L. 442-1 C. com.',
        text: 'I. - Engage la responsabilité de son auteur et l\'oblige à réparer le préjudice causé le fait, dans le cadre de la négociation commerciale, de la conclusion ou de l\'exécution d\'un contrat, par toute personne exerçant des activités de production, de distribution ou de services : 1° D\'obtenir ou de tenter d\'obtenir de l\'autre partie un avantage ne correspondant à aucune contrepartie ou manifestement disproportionné au regard de la valeur de la contrepartie consentie ; 2° De soumettre ou de tenter de soumettre l\'autre partie à des obligations créant un déséquilibre significatif dans les droits et obligations des parties.',
        typeTexte: 'loi',
        code: 'commerce',
        article: 'L. 442-1',
        datePromulgation: '2019-04-24',
        etat: 'en_vigueur'
      },
      {
        title: 'Directive (UE) 2019/790 sur le droit d\'auteur',
        reference: 'Directive (UE) 2019/790',
        text: 'Directive sur le droit d\'auteur et les droits voisins dans le marché unique numérique et modifiant les directives 96/9/CE et 2001/29/CE.',
        typeTexte: 'directive',
        code: '',
        article: '',
        datePromulgation: '2019-04-17',
        etat: 'en_vigueur'
      },
      {
        title: 'Article L. 1231-1 du Code du travail',
        reference: 'Art. L. 1231-1 C. trav.',
        text: 'Le contrat de travail à durée indéterminée peut être rompu à l\'initiative de l\'employeur ou du salarié, ou d\'un commun accord, dans les conditions prévues par les dispositions du présent titre. Ces dispositions ne sont pas applicables pendant la période d\'essai.',
        typeTexte: '',
        code: 'travail',
        article: 'L. 1231-1',
        datePromulgation: '2008-05-01',
        etat: 'en_vigueur'
      }
    ];
    
    this.esgData = [
      {
        title: 'Principes directeurs de l\'OCDE à l\'intention des entreprises multinationales',
        type: 'Recommandation',
        organization: 'OCDE',
        date: '2011-05-25',
        typeDocument: 'recommandation',
        organisation: 'ocde',
        secteur: '',
        pays: '',
        thematique: 'droits_humains',
        summary: 'Recommandations adressées par les gouvernements aux entreprises multinationales opérant dans ou depuis les pays adhérents.'
      },
      {
        title: 'Rapport sur les risques climatiques dans le secteur financier',
        type: 'Rapport',
        organization: 'Union Européenne',
        date: '2023-06-20',
        typeDocument: 'rapport',
        organisation: 'ue',
        secteur: 'finance',
        pays: 'Europe',
        thematique: 'environnement',
        summary: 'Analyse des risques liés au changement climatique pour les institutions financières et recommandations pour leur gestion.'
      },
      {
        title: 'Guide de mise en œuvre des Principes directeurs des Nations Unies relatifs aux entreprises et aux droits de l\'homme',
        type: 'Guide',
        organization: 'ONU',
        date: '2022-03-15',
        typeDocument: 'guide',
        organisation: 'onu',
        secteur: '',
        pays: '',
        thematique: 'droits_humains',
        summary: 'Guide pratique pour l\'application des Principes directeurs des Nations Unies relatifs aux entreprises et aux droits de l\'homme.'
      },
      {
        title: 'Directive sur le devoir de vigilance des entreprises en matière de durabilité',
        type: 'Directive',
        organization: 'Union Européenne',
        date: '2023-02-10',
        typeDocument: 'directive',
        organisation: 'ue',
        secteur: '',
        pays: 'Europe',
        thematique: 'gouvernance',
        summary: 'Directive établissant des règles relatives au devoir de vigilance des entreprises en matière de durabilité et à la responsabilité des entreprises.'
      }
    ];
  }

  /**
   * Filtre les résultats en fonction des critères
   * @param {Array} data - Données à filtrer
   * @param {Object} criteria - Critères de filtrage
   * @returns {Array} Résultats filtrés
   */
  filterResults(data, criteria) {
    return data.filter(item => {
      // Filtrer par requête de recherche
      if (criteria.query && !this.matchesQuery(item, criteria.query)) {
        return false;
      }
      
      // Filtrer par les autres critères spécifiques
      for (const [key, value] of Object.entries(criteria)) {
        if (key === 'query' || !value) continue; // Ignorer la requête et les valeurs vides
        
        if (item[key] && item[key].toString().toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }
      
      // Filtrage spécial pour les dates
      if (criteria.dateDebut && new Date(item.date) < new Date(criteria.dateDebut)) {
        return false;
      }
      if (criteria.dateFin && new Date(item.date) > new Date(criteria.dateFin)) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Vérifie si un élément correspond à la requête de recherche
   * @param {Object} item - Élément à vérifier
   * @param {string} query - Requête de recherche
   * @returns {boolean} Vrai si l'élément correspond à la requête
   */
  matchesQuery(item, query) {
    const queryLower = query.toLowerCase();
    
    // Vérifier dans tous les champs textuels
    return Object.values(item).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(queryLower);
      }
      return false;
    });
  }

  /**
   * Recherche de jurisprudence
   * @param {Object} criteria - Critères de recherche
   * @returns {Promise<Array>} Résultats de la recherche
   */
  async searchJurisprudence(criteria) {
    try {
      console.log('Recherche de jurisprudence avec critères:', criteria);
      
      // Simulation d'une recherche avec filtrage
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = this.filterResults(this.jurisprudenceData, criteria);
          resolve(results);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la recherche de jurisprudence:', error);
      throw error;
    }
  }

  /**
   * Recherche de doctrine
   * @param {Object} criteria - Critères de recherche
   * @returns {Promise<Array>} Résultats de la recherche
   */
  async searchDoctrine(criteria) {
    try {
      console.log('Recherche de doctrine avec critères:', criteria);
      
      // Simulation d'une recherche avec filtrage
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = this.filterResults(this.doctrineData, criteria);
          resolve(results);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la recherche de doctrine:', error);
      throw error;
    }
  }

  /**
   * Recherche de législation
   * @param {Object} criteria - Critères de recherche
   * @returns {Promise<Array>} Résultats de la recherche
   */
  async searchLegislation(criteria) {
    try {
      console.log('Recherche de législation avec critères:', criteria);
      
      // Simulation d'une recherche avec filtrage
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = this.filterResults(this.legislationData, criteria);
          resolve(results);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la recherche de législation:', error);
      throw error;
    }
  }

  /**
   * Recherche ESG et droits humains
   * @param {Object} criteria - Critères de recherche
   * @returns {Promise<Array>} Résultats de la recherche
   */
  async searchEsgHumanRights(criteria) {
    try {
      console.log('Recherche ESG avec critères:', criteria);
      
      // Simulation d'une recherche avec filtrage
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = this.filterResults(this.esgData, criteria);
          resolve(results);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la recherche ESG:', error);
      throw error;
    }
  }
}

export const searchService = new SearchService();
