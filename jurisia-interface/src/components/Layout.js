import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--dark-bg);
  background-image: radial-gradient(circle at top right, rgba(106, 17, 203, 0.08), transparent 500px);
`;

const AccessCodeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--dark-bg);
  background-image: radial-gradient(circle at top right, rgba(106, 17, 203, 0.08), transparent 500px);
  color: var(--text-primary);
`;

const AccessCodeForm = styled.div`
  background: rgba(72, 84, 120, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid rgba(106, 17, 203, 0.4);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 40px;
  color: var(--text-primary);
  position: relative;
  
  /* Effet subtil de vignette sur les bords */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    margin-left: 240px;
    padding: 30px;
  }
  
  @media (max-width: 576px) {
    margin-left: 200px;
    padding: 20px;
  }
`;

const Layout = ({ children }) => {
  const { isAuthenticated, checkAccessCode } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkAccessCode(code)) {
      setError('');
    } else {
      setError('Code d\'accès incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <AccessCodeScreen>
        <AccessCodeForm>
          <h2>Accès Sécurisé</h2>
          <p>Veuillez entrer le code d'accès pour continuer</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="password" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              placeholder="Code d'accès"
              style={{
                width: '100%',
                padding: '12px',
                margin: '20px 0',
                backgroundColor: 'rgba(72, 84, 120, 0.8)',
                border: '1px solid rgba(106, 17, 203, 0.5)',
                borderRadius: '4px',
                color: 'white',
                fontWeight: '500'
              }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--primary)',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Accéder
            </button>
          </form>
        </AccessCodeForm>
      </AccessCodeScreen>
    );
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
