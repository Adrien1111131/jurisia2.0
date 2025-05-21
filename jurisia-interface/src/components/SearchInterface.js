import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaLightbulb, FaHistory, FaBookmark, FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import SearchService from '../services/searchService';

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SearchBox = styled.div`
  background: var(--card-bg);
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px var(--shadow-color);
  
  &:hover {
    border-color: rgba(106, 17, 203, 0.6);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    background: linear-gradient(to bottom right, var(--card-bg), rgba(55, 62, 95, 0.8));
  }
`;

const SearchTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: var(--primary-color);
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  padding-left: ${props => props.$hasIcon ? '50px' : '20px'};
  background: var(--input-bg);
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(60, 68, 105, 0.9);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  font-size: 18px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background: ${props => props.active ? 'rgba(106, 17, 203, 0.2)' : 'rgba(48, 54, 82, 0.4)'};
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 6px;
  padding: 8px 15px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(106, 17, 203, 0.15);
    border-color: rgba(106, 17, 203, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    margin-right: 8px;
    color: var(--primary-color);
  }
`;

const AdvancedFiltersToggle = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 5px;
    color: var(--primary-color);
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdvancedFiltersContainer = styled.div`
  margin-top: 15px;
  display: ${props => props.$isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: var(--text-secondary);
`;

const FilterSelect = styled.select`
  background: var(--input-bg);
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 6px;
  padding: 8px 12px;
  color: var(--text-primary);
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(60, 68, 105, 0.9);
  }
`;

const FilterInput = styled.input`
  background: var(--input-bg);
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 6px;
  padding: 8px 12px;
  color: var(--text-primary);
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(60, 68, 105, 0.9);
  }
`;

const AssistantTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: var(--input-bg);
  border: 1px solid rgba(106, 17, 203, 0.4);
  border-radius: 8px;
  padding: 15px;
  color: var(--text-primary);
  font-size: 16px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(60, 68, 105, 0.9);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const SearchButton = styled.button`
  background: var(--gradient);
  color: white;
  border: none;
  padding: 12px 25px;
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
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background: var(--hover-gradient);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(106, 17, 203, 0.4);
  }
`;

const RecentSearchesContainer = styled.div`
  margin-top: 20px;
`;

const RecentSearchesTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: var(--primary-color);
  }
`;

const RecentSearchesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RecentSearchItem = styled.button`
  background: rgba(48, 54, 82, 0.5);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 20px;
  padding: 6px 12px;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(106, 17, 203, 0.15);
    border-color: rgba(106, 17, 203, 0.5);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Composant pour afficher les résultats de recherche
const ResultsContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(42, 47, 69, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const ResultsTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const ResultsContent = styled.div`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  
  svg {
    animation: spin 1s linear infinite;
    color: var(--primary-color);
    font-size: 2rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const SearchInterface = ({ documentType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantQuery, setAssistantQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // États pour gérer les résultats, le chargement et les erreurs
  const [searchResults, setSearchResults] = useState(null);
  const [assistantResults, setAssistantResults] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [assistantError, setAssistantError] = useState(null);
  
  // État pour les recherches récentes
  const [recentSearches, setRecentSearches] = useState([]);
  
  // Fonction pour ajouter une recherche récente
  const addRecentSearch = (query) => {
    // Vérifier si la requête est déjà dans les recherches récentes
    if (!recentSearches.includes(query) && query.trim() !== '') {
      // Ajouter la nouvelle requête au début du tableau et limiter à 5 éléments
      setRecentSearches(prev => [query, ...prev.filter(item => item !== query)].slice(0, 5));
    }
  };
  
  // État pour les filtres spécifiques à chaque type de document
  const [filters, setFilters] = useState({
    // Filtres communs
    dateDebut: '',
    dateFin: '',
    
    // Filtres spécifiques à la jurisprudence
    juridiction: '',
    chambre: '',
    
    // Filtres spécifiques à la doctrine
    auteur: '',
    revue: '',
    
    // Filtres spécifiques à la législation
    code: '',
    article: '',
    
    // Filtres spécifiques à ESG
    categorie: '',
    organisation: '',
    pays: ''
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearch = async () => {
    // Vérifier si la requête est vide
    if (!searchQuery.trim()) {
      setSearchError("Veuillez entrer une requête de recherche.");
      return;
    }
    
    // Réinitialiser les états
    setSearchResults(null);
    setSearchError(null);
    setIsSearchLoading(true);
    
    try {
      // Appeler le service de recherche
      const results = await SearchService.search(documentType, searchQuery, filters);
      setSearchResults(results);
      
      // Ajouter la requête aux recherches récentes
      addRecentSearch(searchQuery);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setSearchError(error.message || "Une erreur est survenue lors de la recherche.");
    } finally {
      setIsSearchLoading(false);
    }
  };
  
  const handleAssistantSearch = async () => {
    // Vérifier si la requête est vide
    if (!assistantQuery.trim()) {
      setAssistantError("Veuillez entrer une requête pour la recherche assistée.");
      return;
    }
    
    // Réinitialiser les états
    setAssistantResults(null);
    setAssistantError(null);
    setIsAssistantLoading(true);
    
    try {
      // Appeler le service de recherche assistée
      const results = await SearchService.assistedSearch(documentType, assistantQuery);
      setAssistantResults(results);
      
      // Ajouter la requête aux recherches récentes
      addRecentSearch(assistantQuery);
    } catch (error) {
      console.error("Erreur lors de la recherche assistée:", error);
      setAssistantError(error.message || "Une erreur est survenue lors de la recherche assistée.");
    } finally {
      setIsAssistantLoading(false);
    }
  };
  
  // Déterminer les filtres à afficher en fonction du type de document
  const renderSpecificFilters = () => {
    switch(documentType) {
      case 'jurisprudence':
        return (
          <>
            <FilterGroup>
              <FilterLabel>Juridiction</FilterLabel>
              <FilterSelect name="juridiction" value={filters.juridiction} onChange={handleFilterChange}>
                <option value="">Toutes</option>
                <option value="cass">Cour de cassation</option>
                <option value="ce">Conseil d'État</option>
                <option value="ca">Cour d'appel</option>
                <option value="cc">Conseil constitutionnel</option>
                <option value="tgi">Tribunal judiciaire</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Chambre</FilterLabel>
              <FilterSelect name="chambre" value={filters.chambre} onChange={handleFilterChange}>
                <option value="">Toutes</option>
                <option value="civ1">Première chambre civile</option>
                <option value="civ2">Deuxième chambre civile</option>
                <option value="civ3">Troisième chambre civile</option>
                <option value="com">Chambre commerciale</option>
                <option value="soc">Chambre sociale</option>
                <option value="crim">Chambre criminelle</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Numéro de pourvoi</FilterLabel>
              <FilterInput type="text" placeholder="Ex: 19-12.345" />
            </FilterGroup>
          </>
        );
      case 'doctrine':
        return (
          <>
            <FilterGroup>
              <FilterLabel>Auteur</FilterLabel>
              <FilterInput 
                type="text" 
                name="auteur" 
                value={filters.auteur} 
                onChange={handleFilterChange} 
                placeholder="Nom de l'auteur" 
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Revue</FilterLabel>
              <FilterSelect name="revue" value={filters.revue} onChange={handleFilterChange}>
                <option value="">Toutes</option>
                <option value="rtdciv">RTD Civ.</option>
                <option value="rtdcom">RTD Com.</option>
                <option value="jcp">JCP G</option>
                <option value="d">Recueil Dalloz</option>
                <option value="ajda">AJDA</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Type de publication</FilterLabel>
              <FilterSelect>
                <option value="">Tous</option>
                <option value="article">Article</option>
                <option value="commentaire">Commentaire</option>
                <option value="chronique">Chronique</option>
                <option value="these">Thèse</option>
              </FilterSelect>
            </FilterGroup>
          </>
        );
      case 'legislation':
        return (
          <>
            <FilterGroup>
              <FilterLabel>Code</FilterLabel>
              <FilterSelect name="code" value={filters.code} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="civil">Code civil</option>
                <option value="commerce">Code de commerce</option>
                <option value="penal">Code pénal</option>
                <option value="travail">Code du travail</option>
                <option value="conso">Code de la consommation</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Article</FilterLabel>
              <FilterInput 
                type="text" 
                name="article" 
                value={filters.article} 
                onChange={handleFilterChange} 
                placeholder="Ex: 1240" 
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Version en vigueur</FilterLabel>
              <FilterSelect>
                <option value="current">Actuelle</option>
                <option value="date">À une date précise</option>
                <option value="future">Future</option>
              </FilterSelect>
            </FilterGroup>
          </>
        );
      case 'esg':
        return (
          <>
            <FilterGroup>
              <FilterLabel>Catégorie</FilterLabel>
              <FilterSelect name="categorie" value={filters.categorie} onChange={handleFilterChange}>
                <option value="">Toutes</option>
                <option value="environnement">Environnement</option>
                <option value="social">Social</option>
                <option value="gouvernance">Gouvernance</option>
                <option value="droits-humains">Droits Humains</option>
                <option value="ocde">OCDE Guidelines</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Organisation</FilterLabel>
              <FilterSelect name="organisation" value={filters.organisation} onChange={handleFilterChange}>
                <option value="">Toutes</option>
                <option value="onu">ONU</option>
                <option value="ocde">OCDE</option>
                <option value="ue">Union Européenne</option>
                <option value="oit">OIT</option>
                <option value="autres">Autres</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Pays/Région</FilterLabel>
              <FilterSelect name="pays" value={filters.pays} onChange={handleFilterChange}>
                <option value="">Tous</option>
                <option value="suisse">Suisse</option>
                <option value="ue">Union Européenne</option>
                <option value="usa">États-Unis</option>
                <option value="international">International</option>
              </FilterSelect>
            </FilterGroup>
          </>
        );
      default:
        return null;
    }
  };
  
  // Fonction pour ajouter un filtre rapide à la recherche
  const handleQuickFilterClick = (filterText) => {
    // Si la barre de recherche est vide, on ajoute simplement le filtre
    // Sinon, on ajoute le filtre avec un espace avant
    const newSearchQuery = searchQuery.trim() === '' 
      ? filterText 
      : `${searchQuery} ${filterText}`;
    
    setSearchQuery(newSearchQuery);
  };
  
  // Déterminer les filtres rapides à afficher en fonction du type de document
  const renderQuickFilters = () => {
    switch(documentType) {
      case 'jurisprudence':
        return (
          <>
            <FilterButton onClick={() => handleQuickFilterClick("Cour de cassation")}>
              Cour de cassation
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Conseil d'État")}>
              Conseil d'État
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Derniers 6 mois")}>
              Derniers 6 mois
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Décisions importantes")}>
              Décisions importantes
            </FilterButton>
          </>
        );
      case 'doctrine':
        return (
          <>
            <FilterButton onClick={() => handleQuickFilterClick("Articles récents")}>
              Articles récents
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Commentaires d'arrêts")}>
              Commentaires d'arrêts
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Revues prestigieuses")}>
              Revues prestigieuses
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Thèses")}>
              Thèses
            </FilterButton>
          </>
        );
      case 'legislation':
        return (
          <>
            <FilterButton onClick={() => handleQuickFilterClick("Code civil")}>
              Code civil
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Code de commerce")}>
              Code de commerce
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Lois récentes")}>
              Lois récentes
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Projets de loi")}>
              Projets de loi
            </FilterButton>
          </>
        );
      case 'esg':
        return (
          <>
            <FilterButton onClick={() => handleQuickFilterClick("Droits Humains")}>
              Droits Humains
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("OCDE Guidelines")}>
              OCDE Guidelines
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Environnement")}>
              Environnement
            </FilterButton>
            <FilterButton onClick={() => handleQuickFilterClick("Gouvernance")}>
              Gouvernance
            </FilterButton>
          </>
        );
      default:
        return null;
    }
  };
  
  // Déterminer le placeholder de la recherche en fonction du type de document
  const getSearchPlaceholder = () => {
    switch(documentType) {
      case 'jurisprudence':
        return "Rechercher une décision (ex: Cass. civ. 1re, pourvoi n°18-23.471, responsabilité médicale)";
      case 'doctrine':
        return "Rechercher un article, commentaire ou analyse (ex: Dalloz 2023, p.145, réforme du droit des contrats)";
      case 'legislation':
        return "Rechercher une loi, un code ou un règlement (ex: Code civil art. 1240, responsabilité délictuelle)";
      case 'esg':
        return "Rechercher des normes ESG (ex: Principes directeurs OCDE 2011, devoir de vigilance)";
      default:
        return "Rechercher...";
    }
  };
  
  // Déterminer le placeholder de la recherche assistée en fonction du type de document
  const getAssistantPlaceholder = () => {
    switch(documentType) {
      case 'jurisprudence':
        return "Décrivez précisément votre recherche (ex: Je cherche les arrêts de la Cour de cassation de 2022-2023 sur la responsabilité médicale en cas d'erreur de diagnostic ayant entraîné un préjudice d'anxiété)";
      case 'doctrine':
        return "Décrivez précisément votre recherche (ex: Je recherche des commentaires doctrinaux récents sur l'article 1195 du Code civil relatif à l'imprévision dans les contrats commerciaux, particulièrement ceux publiés dans la Revue Trimestrielle de Droit Civil)";
      case 'legislation':
        return "Décrivez précisément votre recherche (ex: Je souhaite connaître les dispositions du Code de la consommation concernant le délai de rétractation pour les achats en ligne, ainsi que les modifications législatives récentes sur ce sujet)";
      case 'esg':
        return "Décrivez précisément votre recherche (ex: Je recherche les obligations de diligence raisonnable en matière de droits humains pour les entreprises suisses selon la loi fédérale et les principes directeurs de l'OCDE, notamment concernant les chaînes d'approvisionnement)";
      default:
        return "Décrivez précisément ce que vous recherchez...";
    }
  };
  
  return (
    <SearchContainer>
      {/* Recherche précise */}
      <SearchBox>
        <SearchTitle>
          <FaSearch />
          Recherche précise
        </SearchTitle>
        <SearchInputContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            $hasIcon 
            type="text" 
            placeholder={getSearchPlaceholder()} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputContainer>
        
        <FilterContainer>
          {renderQuickFilters()}
        </FilterContainer>
        
        <AdvancedFiltersToggle onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
          Filtres avancés {showAdvancedFilters ? <FaChevronUp /> : <FaChevronDown />}
        </AdvancedFiltersToggle>
        
        <AdvancedFiltersContainer $isOpen={showAdvancedFilters}>
          <FilterGroup>
            <FilterLabel>Date de début</FilterLabel>
            <FilterInput 
              type="date" 
              name="dateDebut" 
              value={filters.dateDebut} 
              onChange={handleFilterChange} 
            />
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Date de fin</FilterLabel>
            <FilterInput 
              type="date" 
              name="dateFin" 
              value={filters.dateFin} 
              onChange={handleFilterChange} 
            />
          </FilterGroup>
          
          {renderSpecificFilters()}
        </AdvancedFiltersContainer>
        
        <ButtonContainer>
          <SearchButton onClick={handleSearch} disabled={isSearchLoading}>
            {isSearchLoading ? (
              <>
                <FaSpinner />
                Recherche en cours...
              </>
            ) : (
              <>
                <FaSearch />
                Rechercher
              </>
            )}
          </SearchButton>
        </ButtonContainer>
        
        {/* Afficher les erreurs de recherche */}
        {searchError && (
          <ErrorMessage>{searchError}</ErrorMessage>
        )}
        
        {/* Afficher les résultats de recherche */}
        {isSearchLoading && (
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        )}
        
        {searchResults && !isSearchLoading && (
          <ResultsContainer>
            <ResultsTitle>Résultats de recherche pour "{searchResults.query}"</ResultsTitle>
            <ResultsContent>{searchResults.results}</ResultsContent>
          </ResultsContainer>
        )}
        
        {/* Afficher les recherches récentes seulement s'il y en a */}
        {recentSearches.length > 0 && (
          <RecentSearchesContainer>
            <RecentSearchesTitle>
              <FaHistory />
              Recherches récentes
            </RecentSearchesTitle>
            <RecentSearchesList>
              {recentSearches.map((search, index) => (
                <RecentSearchItem key={index} onClick={() => setSearchQuery(search)}>
                  {search}
                </RecentSearchItem>
              ))}
            </RecentSearchesList>
          </RecentSearchesContainer>
        )}
      </SearchBox>
      
      {/* Recherche assistée */}
      <SearchBox>
        <SearchTitle>
          <FaLightbulb />
          Recherche assistée
        </SearchTitle>
        <AssistantTextArea 
          placeholder={getAssistantPlaceholder()}
          value={assistantQuery}
          onChange={(e) => setAssistantQuery(e.target.value)}
        />
        <ButtonContainer>
          <SearchButton onClick={handleAssistantSearch} disabled={isAssistantLoading}>
            {isAssistantLoading ? (
              <>
                <FaSpinner />
                Recherche en cours...
              </>
            ) : (
              <>
                <FaLightbulb />
                Rechercher avec l'assistant
              </>
            )}
          </SearchButton>
        </ButtonContainer>
        
        {/* Afficher les erreurs de recherche assistée */}
        {assistantError && (
          <ErrorMessage>{assistantError}</ErrorMessage>
        )}
        
        {/* Afficher les résultats de recherche assistée */}
        {isAssistantLoading && (
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        )}
        
        {assistantResults && !isAssistantLoading && (
          <ResultsContainer>
            <ResultsTitle>Résultats de la recherche assistée</ResultsTitle>
            <ResultsContent>{assistantResults.results}</ResultsContent>
          </ResultsContainer>
        )}
      </SearchBox>
    </SearchContainer>
  );
};

export default SearchInterface;
