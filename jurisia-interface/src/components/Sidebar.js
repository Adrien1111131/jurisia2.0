import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaFileAlt, FaEdit, FaSearch, FaComments, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import logoImage from '../assets/logo-new.png';

// Composant Sidebar stylisé
const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: var(--darker-bg);
  color: var(--text-secondary);
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-right: 1px solid rgba(106, 17, 203, 0.2);
  background-image: linear-gradient(to bottom, var(--darker-bg), rgba(42, 47, 69, 0.95));
  
  @media (max-width: 768px) {
    width: 240px;
  }
  
  @media (max-width: 576px) {
    width: 200px;
  }
`;

const Logo = styled.div`
  padding: 10px 20px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #2d2d42;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
    filter: drop-shadow(0 0 10px rgba(106, 17, 203, 0.3));
  }
  
  @media (max-width: 576px) {
    img {
      max-height: 60px;
    }
  }
`;

const MenuItem = styled.div`
  padding: 14px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  margin: 2px 0;
  border-left: 3px solid transparent;
  
  &:hover {
    background: linear-gradient(90deg, rgba(106, 17, 203, 0.2), rgba(37, 117, 252, 0.05));
    border-left: 3px solid var(--primary-color);
    box-shadow: inset 0 0 10px rgba(106, 17, 203, 0.1);
  }
  
  &.active {
    background: linear-gradient(90deg, rgba(106, 17, 203, 0.3), rgba(37, 117, 252, 0.15));
    border-left: 3px solid var(--secondary-color);
  }
  
  svg {
    margin-right: 12px;
    font-size: 18px;
    color: var(--secondary-color);
    filter: drop-shadow(0 0 3px rgba(37, 117, 252, 0.3));
  }
  
  @media (max-width: 576px) {
    padding: 12px 15px;
    
    svg {
      margin-right: 8px;
    }
  }
`;

const MenuLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.5px;
  
  &.active {
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  background: rgba(30, 35, 50, 0.7);
  border-left: 1px solid rgba(106, 17, 203, 0.2);
  margin-left: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubMenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
  
  &:hover {
    background: rgba(48, 54, 82, 0.6);
    border-left: 2px solid var(--primary-color);
    box-shadow: inset 0 0 8px rgba(106, 17, 203, 0.1);
  }
  
  @media (max-width: 576px) {
    padding: 10px 15px;
  }
`;


const Sidebar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState({
    rediger: false,
    rechercher: false,
    prompt: false
  });

  const toggleSubMenu = (menu) => {
    setSubMenuOpen({
      ...subMenuOpen,
      [menu]: !subMenuOpen[menu]
    });
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src={logoImage} alt="Jurisia Logo" />
      </Logo>
      
      <MenuItem>
        <MenuLink to="/">
          <FaHome />
          Accueil
        </MenuLink>
      </MenuItem>
      
      <MenuItem>
        <MenuLink to="/resumer">
          <FaFileAlt />
          Résumer un document
        </MenuLink>
      </MenuItem>
      
      <MenuItem onClick={() => toggleSubMenu('rediger')}>
        <FaEdit />
        Rédiger un document
        {subMenuOpen.rediger ? <FaChevronDown style={{ marginLeft: 'auto' }} /> : <FaChevronRight style={{ marginLeft: 'auto' }} />}
      </MenuItem>
      <SubMenu $isOpen={subMenuOpen.rediger}>
        <SubMenuItem>
          <MenuLink to="/rediger/contrat">Contrat</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rediger/mise-en-demeure">Mise en demeure</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rediger/courrier">Courrier juridique</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rediger/conformite-finma">Document de Conformité FINMA</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rediger/politique-aml-kyc">Politique AML / KYC</MenuLink>
        </SubMenuItem>
      </SubMenu>
      
      <MenuItem onClick={() => toggleSubMenu('rechercher')}>
        <FaSearch />
        Rechercher un document
        {subMenuOpen.rechercher ? <FaChevronDown style={{ marginLeft: 'auto' }} /> : <FaChevronRight style={{ marginLeft: 'auto' }} />}
      </MenuItem>
      <SubMenu $isOpen={subMenuOpen.rechercher}>
        <SubMenuItem>
          <MenuLink to="/rechercher/jurisprudence">Jurisprudence</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rechercher/doctrine">Doctrine</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rechercher/legislation">Législation</MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/rechercher/esg-droits-humains">ESG / Droits Humains / OCDE Guidelines</MenuLink>
        </SubMenuItem>
      </SubMenu>
      
      <MenuItem>
        <MenuLink to="/prompt">
          <FaComments />
          Prompt libre
        </MenuLink>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
