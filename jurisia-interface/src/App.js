import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ResumerDocument from './pages/ResumerDocument';
import RedigerContrat from './pages/RedigerContrat';
import RedigerMiseEnDemeure from './pages/RedigerMiseEnDemeure';
import RedigerCourrier from './pages/RedigerCourrier';
import RedigerConformiteFinma from './pages/RedigerConformiteFinma';
import RedigerPolitiqueAmlKyc from './pages/RedigerPolitiqueAmlKyc';
import RechercherJurisprudence from './pages/RechercherJurisprudence';
import RechercherDoctrine from './pages/RechercherDoctrine';
import RechercherLegislation from './pages/RechercherLegislation';
import RechercherEsgDroitsHumains from './pages/RechercherEsgDroitsHumains';
import PromptLibre from './pages/PromptLibre';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumer" element={<ResumerDocument />} />
          <Route path="/rediger/contrat" element={<RedigerContrat />} />
          <Route path="/rediger/mise-en-demeure" element={<RedigerMiseEnDemeure />} />
          <Route path="/rediger/courrier" element={<RedigerCourrier />} />
          <Route path="/rediger/conformite-finma" element={<RedigerConformiteFinma />} />
          <Route path="/rediger/politique-aml-kyc" element={<RedigerPolitiqueAmlKyc />} />
          <Route path="/rechercher/jurisprudence" element={<RechercherJurisprudence />} />
          <Route path="/rechercher/doctrine" element={<RechercherDoctrine />} />
          <Route path="/rechercher/legislation" element={<RechercherLegislation />} />
          <Route path="/rechercher/esg-droits-humains" element={<RechercherEsgDroitsHumains />} />
          <Route path="/prompt" element={<PromptLibre />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
