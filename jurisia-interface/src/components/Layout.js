import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--dark-bg);
  background-image: radial-gradient(circle at top right, rgba(106, 17, 203, 0.08), transparent 500px);
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
