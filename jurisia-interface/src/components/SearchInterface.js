import React, { useState } from 'react';
import styled from 'styled-components';
import { searchService } from '../services/searchService';

const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 45px;
  background: rgba(72, 84, 120, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(72, 84, 120, 1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  
  &:before {
    content: '🔍';
    font-size: 18px;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(106, 17, 203, 0.3);
`;

const ResultsCount = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const ResultsContainer = styled.div`
  display: grid;
  gap: 20px;
`;

const ResultCard = styled.div`
  padding: 25px;
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(106, 17, 203, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(106, 17, 203, 0.6);
  }
`;

const ResultTitle = styled.h3`
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
`;

const ResultMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 15px;
  
  span {
    background: rgba(106, 17, 203, 0.1);
    padding: 4px 10px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
  }
  
  .reference:before {
    content: '📋';
    margin-right: 5px;
  }
  
  .date:before {
    content: '📅';
    margin-right: 5px;
  }
  
  .author:before {
    content: '👤';
    margin-right: 5px;
  }
  
  .publication:before {
    content: '📚';
    margin-right: 5px;
  }
  
  .organization:before {
    content: '🏢';
    margin-right: 5px;
  }
`;

const ResultSummary = styled.p`
  color: var(--text-primary);
  margin: 0;
  line-height: 1.6;
  font-size: 1.05rem;
`;

const ResultActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid rgba(106, 17, 203, 0.3);
  color: var(--text-primary);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(106, 17, 203, 0.1);
    border-color: rgba(106, 17, 203, 0.6);
  }
  
  &.primary {
    background: rgba(106, 17, 203, 0.2);
    border-color: rgba(106, 17, 203, 0.4);
    
    &:hover {
      background: rgba(106, 17, 203, 0.3);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(106, 17, 203, 0.1);
  border-top: 5px solid rgba(106, 17, 203, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 30px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 30px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  
  &:before {
    content: '🔍';
    display: block;
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 12px;
  color: #ff4444;
  margin-bottom: 20px;
  
  &:before {
    content: '⚠️';
    margin-right: 10px;
  }
`;

const AdvancedSearchToggle = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;
  align-self: flex-start;
  
  &:hover {
    color: var(--text-primary);
  }
  
  &:before {
    content: ${props => props.isOpen ? '"▼"' : '"►"'};
    margin-right: 5px;
    font-size: 0.8rem;
  }
`;

const FiltersContainer = styled.div`
  display: ${props => props.isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(72, 84, 120, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(106, 17, 203, 0.4);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 8px 10px;
  background: rgba(72, 84, 120, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.5);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  option {
    background: rgba(72, 84, 120, 1);
    color: white;
  }
`;

const FilterInput = styled.input`
  padding: 8px 10px;
  background: rgba(72, 84, 120, 0.8);
  border: 1px solid rgba(106, 17, 203, 0.5);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  
  span {
    color: white;
  }
`;

const SearchInterface = ({ type, placeholder = "Rechercher..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({});

  // Initialiser les filtres spécifiques au type de recherche
  React.useEffect(() => {
    switch (type) {
      case 'jurisprudence':
        setFilters({
          juridiction: '',
          chambre: '',
          dateDebut: '',
          dateFin: '',
          solution: '',
          articleCode: ''
        });
        break;
      case 'doctrine':
        setFilters({
          typePublication: '',
          auteur: '',
          revue: '',
          annee: '',
          domaineJuridique: ''
        });
        break;
      case 'legislation':
        setFilters({
          typeTexte: '',
          code: '',
          article: '',
          datePromulgation: '',
          etat: 'en_vigueur'
        });
        break;
      case 'esg':
        setFilters({
          typeDocument: '',
          organisation: '',
          secteur: '',
          pays: '',
          thematique: ''
        });
        break;
      default:
        setFilters({});
    }
  }, [type]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      console.log(`Recherche de type "${type}" avec la requête: "${query}" et filtres:`, filters);
      
      let searchResults;
      switch (type) {
        case 'jurisprudence':
          searchResults = await searchService.searchJurisprudence({ query, ...filters });
          break;
        case 'doctrine':
          searchResults = await searchService.searchDoctrine({ query, ...filters });
          break;
        case 'legislation':
          searchResults = await searchService.searchLegislation({ query, ...filters });
          break;
        case 'esg':
          searchResults = await searchService.searchEsgHumanRights({ query, ...filters });
          break;
        default:
          throw new Error(`Type de recherche non supporté: ${type}`);
      }
      
      console.log(`Résultats obtenus: ${searchResults.length}`);
      setResults(searchResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setError(`Une erreur est survenue lors de la recherche: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderJurisprudenceFilters = () => (
    <>
      <FilterGroup>
        <FilterLabel htmlFor="juridiction">Juridiction</FilterLabel>
        <FilterSelect 
          id="juridiction" 
          name="juridiction" 
          value={filters.juridiction} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="cass">Cour de cassation</option>
          <option value="ce">Conseil d'État</option>
          <option value="ca">Cour d'appel</option>
          <option value="tj">Tribunal judiciaire</option>
          <option value="ta">Tribunal administratif</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="chambre">Chambre</FilterLabel>
        <FilterSelect 
          id="chambre" 
          name="chambre" 
          value={filters.chambre} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="civ1">1ère chambre civile</option>
          <option value="civ2">2ème chambre civile</option>
          <option value="civ3">3ème chambre civile</option>
          <option value="com">Chambre commerciale</option>
          <option value="soc">Chambre sociale</option>
          <option value="crim">Chambre criminelle</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Période</FilterLabel>
        <DateRangeContainer>
          <FilterInput 
            type="date" 
            name="dateDebut" 
            value={filters.dateDebut} 
            onChange={handleFilterChange} 
            placeholder="Date début"
          />
          <span>à</span>
          <FilterInput 
            type="date" 
            name="dateFin" 
            value={filters.dateFin} 
            onChange={handleFilterChange} 
            placeholder="Date fin"
          />
        </DateRangeContainer>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="solution">Solution</FilterLabel>
        <FilterSelect 
          id="solution" 
          name="solution" 
          value={filters.solution} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="cassation">Cassation</option>
          <option value="rejet">Rejet</option>
          <option value="annulation">Annulation</option>
          <option value="qpc">QPC</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="articleCode">Article de code cité</FilterLabel>
        <FilterInput 
          type="text" 
          id="articleCode" 
          name="articleCode" 
          value={filters.articleCode} 
          onChange={handleFilterChange} 
          placeholder="Ex: 1382 code civil"
        />
      </FilterGroup>
    </>
  );

  const renderDoctrineFilters = () => (
    <>
      <FilterGroup>
        <FilterLabel htmlFor="typePublication">Type de publication</FilterLabel>
        <FilterSelect 
          id="typePublication" 
          name="typePublication" 
          value={filters.typePublication} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="article">Article</option>
          <option value="ouvrage">Ouvrage</option>
          <option value="these">Thèse</option>
          <option value="commentaire">Commentaire</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="auteur">Auteur</FilterLabel>
        <FilterInput 
          type="text" 
          id="auteur" 
          name="auteur" 
          value={filters.auteur} 
          onChange={handleFilterChange} 
          placeholder="Nom de l'auteur"
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="revue">Revue</FilterLabel>
        <FilterSelect 
          id="revue" 
          name="revue" 
          value={filters.revue} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="recueil_dalloz">Recueil Dalloz</option>
          <option value="jcp">JCP</option>
          <option value="rtd_civ">RTD Civ.</option>
          <option value="rtd_com">RTD Com.</option>
          <option value="ajda">AJDA</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="annee">Année</FilterLabel>
        <FilterInput 
          type="number" 
          id="annee" 
          name="annee" 
          value={filters.annee} 
          onChange={handleFilterChange} 
          placeholder="Année de publication"
          min="1900" 
          max="2025"
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="domaineJuridique">Domaine juridique</FilterLabel>
        <FilterSelect 
          id="domaineJuridique" 
          name="domaineJuridique" 
          value={filters.domaineJuridique} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="civil">Droit civil</option>
          <option value="commercial">Droit commercial</option>
          <option value="penal">Droit pénal</option>
          <option value="administratif">Droit administratif</option>
          <option value="travail">Droit du travail</option>
          <option value="fiscal">Droit fiscal</option>
        </FilterSelect>
      </FilterGroup>
    </>
  );

  const renderLegislationFilters = () => (
    <>
      <FilterGroup>
        <FilterLabel htmlFor="typeTexte">Type de texte</FilterLabel>
        <FilterSelect 
          id="typeTexte" 
          name="typeTexte" 
          value={filters.typeTexte} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="loi">Loi</option>
          <option value="ordonnance">Ordonnance</option>
          <option value="decret">Décret</option>
          <option value="arrete">Arrêté</option>
          <option value="directive">Directive UE</option>
          <option value="reglement">Règlement UE</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="code">Code</FilterLabel>
        <FilterSelect 
          id="code" 
          name="code" 
          value={filters.code} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="civil">Code civil</option>
          <option value="commerce">Code de commerce</option>
          <option value="penal">Code pénal</option>
          <option value="travail">Code du travail</option>
          <option value="conso">Code de la consommation</option>
          <option value="assurances">Code des assurances</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="article">Article</FilterLabel>
        <FilterInput 
          type="text" 
          id="article" 
          name="article" 
          value={filters.article} 
          onChange={handleFilterChange} 
          placeholder="Numéro d'article"
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="datePromulgation">Date de promulgation</FilterLabel>
        <FilterInput 
          type="date" 
          id="datePromulgation" 
          name="datePromulgation" 
          value={filters.datePromulgation} 
          onChange={handleFilterChange}
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="etat">État</FilterLabel>
        <FilterSelect 
          id="etat" 
          name="etat" 
          value={filters.etat} 
          onChange={handleFilterChange}
        >
          <option value="en_vigueur">En vigueur</option>
          <option value="abroge">Abrogé</option>
          <option value="modifie">Modifié</option>
          <option value="tous">Tous</option>
        </FilterSelect>
      </FilterGroup>
    </>
  );

  const renderEsgFilters = () => (
    <>
      <FilterGroup>
        <FilterLabel htmlFor="typeDocument">Type de document</FilterLabel>
        <FilterSelect 
          id="typeDocument" 
          name="typeDocument" 
          value={filters.typeDocument} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="rapport">Rapport</option>
          <option value="directive">Directive</option>
          <option value="recommandation">Recommandation</option>
          <option value="guide">Guide</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="organisation">Organisation</FilterLabel>
        <FilterSelect 
          id="organisation" 
          name="organisation" 
          value={filters.organisation} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="onu">ONU</option>
          <option value="ocde">OCDE</option>
          <option value="ue">Union Européenne</option>
          <option value="oit">OIT</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="secteur">Secteur d'activité</FilterLabel>
        <FilterSelect 
          id="secteur" 
          name="secteur" 
          value={filters.secteur} 
          onChange={handleFilterChange}
        >
          <option value="">Tous</option>
          <option value="finance">Finance</option>
          <option value="energie">Énergie</option>
          <option value="industrie">Industrie</option>
          <option value="tech">Technologie</option>
          <option value="sante">Santé</option>
        </FilterSelect>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="pays">Pays/Région</FilterLabel>
        <FilterInput 
          type="text" 
          id="pays" 
          name="pays" 
          value={filters.pays} 
          onChange={handleFilterChange} 
          placeholder="Pays ou région"
        />
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="thematique">Thématique</FilterLabel>
        <FilterSelect 
          id="thematique" 
          name="thematique" 
          value={filters.thematique} 
          onChange={handleFilterChange}
        >
          <option value="">Toutes</option>
          <option value="environnement">Environnement</option>
          <option value="droits_humains">Droits humains</option>
          <option value="gouvernance">Gouvernance</option>
          <option value="corruption">Anti-corruption</option>
          <option value="travail">Conditions de travail</option>
        </FilterSelect>
      </FilterGroup>
    </>
  );

  const renderFilters = () => {
    switch (type) {
      case 'jurisprudence':
        return renderJurisprudenceFilters();
      case 'doctrine':
        return renderDoctrineFilters();
      case 'legislation':
        return renderLegislationFilters();
      case 'esg':
        return renderEsgFilters();
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'jurisprudence': return 'décisions';
      case 'doctrine': return 'articles';
      case 'legislation': return 'textes législatifs';
      case 'esg': return 'documents';
      default: return 'résultats';
    }
  };

  const handleCopyReference = (reference) => {
    navigator.clipboard.writeText(reference);
    alert(`Référence "${reference}" copiée dans le presse-papier`);
  };

  const renderResult = (result) => {
    return (
      <ResultCard key={result.reference || result.title}>
        <ResultTitle>{result.title}</ResultTitle>
        <ResultMeta>
          {result.reference && <span className="reference" onClick={() => handleCopyReference(result.reference)}>{result.reference}</span>}
          {result.date && <span className="date">{result.date}</span>}
          {result.author && <span className="author">{result.author}</span>}
          {result.publication && <span className="publication">{result.publication}</span>}
          {result.organization && <span className="organization">{result.organization}</span>}
        </ResultMeta>
        <ResultSummary>{result.summary || result.text}</ResultSummary>
        <ResultActions>
          <ActionButton>Citer</ActionButton>
          <ActionButton>Télécharger</ActionButton>
          <ActionButton className="primary">Voir le document complet</ActionButton>
        </ResultActions>
      </ResultCard>
    );
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSearch}>
        <SearchRow>
          <SearchInputContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              required
              autoFocus
            />
          </SearchInputContainer>
          <SearchButton type="submit" disabled={isLoading || !query.trim()}>
            {isLoading ? 'Recherche...' : 'Rechercher'}
          </SearchButton>
        </SearchRow>
        
        <AdvancedSearchToggle 
          type="button" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          isOpen={showAdvanced}
        >
          Recherche avancée
        </AdvancedSearchToggle>
        
        <FiltersContainer isOpen={showAdvanced}>
          {renderFilters()}
        </FiltersContainer>
      </SearchForm>

      {isLoading && <LoadingSpinner />}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!isLoading && !error && results.length > 0 && (
        <>
          <ResultsHeader>
            <ResultsCount>{results.length} {getTypeLabel()} trouvé{results.length > 1 ? 's' : ''}</ResultsCount>
          </ResultsHeader>
          <ResultsContainer>
            {results.map(renderResult)}
          </ResultsContainer>
        </>
      )}
      
      {!isLoading && !error && results.length === 0 && query.trim() !== '' && (
        <NoResults>
          Aucun résultat trouvé pour votre recherche.
          <br />
          Essayez de modifier vos termes de recherche ou d'élargir vos critères.
        </NoResults>
      )}
    </SearchContainer>
  );
};

export default SearchInterface;
