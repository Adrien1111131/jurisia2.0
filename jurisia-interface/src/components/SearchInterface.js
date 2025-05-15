import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaLightbulb, FaHistory, FaBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  color: var(--primary-color);
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    margin-left: 5px;
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

const SearchInterface = ({ documentType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantQuery, setAssistantQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Simuler des recherches récentes
  const recentSearches = [
    "Responsabilité médicale",
    "Article 1240 code civil",
    "Cass. civ. 1re, 12 juin 2020",
    "Bail commercial covid",
    "Rupture abusive contrat"
  ];
  
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
  
  const handleSearch = () => {
    console.log('Recherche:', searchQuery);
    console.log('Filtres:', filters);
    // Ici, vous pourriez appeler une API pour effectuer la recherche
  };
  
  const handleAssistantSearch = () => {
    console.log('Recherche assistée:', assistantQuery);
    // Ici, vous pourriez appeler une API pour effectuer la recherche assistée
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
  
  // Déterminer les filtres rapides à afficher en fonction du type de document
  const renderQuickFilters = () => {
    switch(documentType) {
      case 'jurisprudence':
        return (
          <>
            <FilterButton>Cour de cassation</FilterButton>
            <FilterButton>Conseil d'État</FilterButton>
            <FilterButton>Derniers 6 mois</FilterButton>
            <FilterButton>Décisions importantes</FilterButton>
          </>
        );
      case 'doctrine':
        return (
          <>
            <FilterButton>Articles récents</FilterButton>
            <FilterButton>Commentaires d'arrêts</FilterButton>
            <FilterButton>Revues prestigieuses</FilterButton>
            <FilterButton>Thèses</FilterButton>
          </>
        );
      case 'legislation':
        return (
          <>
            <FilterButton>Code civil</FilterButton>
            <FilterButton>Code de commerce</FilterButton>
            <FilterButton>Lois récentes</FilterButton>
            <FilterButton>Projets de loi</FilterButton>
          </>
        );
      case 'esg':
        return (
          <>
            <FilterButton>Droits Humains</FilterButton>
            <FilterButton>OCDE Guidelines</FilterButton>
            <FilterButton>Environnement</FilterButton>
            <FilterButton>Gouvernance</FilterButton>
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
        return "Rechercher une décision (ex: responsabilité médicale, Cass. civ. 1re, 12 juin 2020...)";
      case 'doctrine':
        return "Rechercher un article, commentaire ou analyse juridique...";
      case 'legislation':
        return "Rechercher une loi, un code ou un règlement...";
      case 'esg':
        return "Rechercher des normes ESG, directives sur les droits humains ou principes OCDE...";
      default:
        return "Rechercher...";
    }
  };
  
  // Déterminer le placeholder de la recherche assistée en fonction du type de document
  const getAssistantPlaceholder = () => {
    switch(documentType) {
      case 'jurisprudence':
        return "Décrivez ce que vous recherchez ou posez une question juridique (ex: Je cherche des arrêts récents sur la responsabilité médicale en cas d'erreur de diagnostic...)";
      case 'doctrine':
        return "Décrivez ce que vous recherchez ou posez une question juridique (ex: Je cherche des analyses sur l'évolution récente du droit des contrats...)";
      case 'legislation':
        return "Décrivez ce que vous recherchez ou posez une question juridique (ex: Quelles sont les dispositions légales concernant le délai de rétractation pour un achat en ligne ?)";
      case 'esg':
        return "Décrivez ce que vous recherchez ou posez une question (ex: Quelles sont les obligations de diligence raisonnable en matière de droits humains pour les entreprises suisses ?)";
      default:
        return "Décrivez ce que vous recherchez...";
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
          <SearchButton onClick={handleSearch}>
            <FaSearch />
            Rechercher
          </SearchButton>
        </ButtonContainer>
        
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
          <SearchButton onClick={handleAssistantSearch}>
            <FaLightbulb />
            Rechercher avec l'assistant
          </SearchButton>
        </ButtonContainer>
      </SearchBox>
    </SearchContainer>
  );
};

export default SearchInterface;
