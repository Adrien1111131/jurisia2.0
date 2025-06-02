import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaFileAlt, FaEdit, FaSearch, FaComments, FaChevronDown, FaChevronRight, FaSun, FaMoon } from 'react-icons/fa';
import logoImage from '../assets/logo-new.png';
import plumeIcon from '../assets/plume.png';
import epeIcon from '../assets/epe.png';
import homeIcon from '../assets/home.png';
import couroneIcon from '../assets/courone.png';
import bouclierIcon from '../assets/bouclier.png';
import { ThemeContext } from '../contexts/ThemeContext';

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
  transition: background 0.3s ease, color 0.3s ease;
  
  .light & {
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    border-right: 1px solid #f0f0f0;
  }
  
  @media (max-width: 768px) {
    width: 240px;
  }
  
  @media (max-width: 576px) {
    width: 200px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #2d2d42;
  
  .light & {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(106, 17, 203, 0.2);
  }
  
  .light &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    filter: drop-shadow(0 0 3px rgba(37, 117, 252, 0.3));
  }
  
  .light & svg {
    filter: none;
    color: #555555;
  }
`;

const Logo = styled.div`
  padding: 10px 20px 20px;
  margin-bottom: 20px;
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
  
  .light & {
    &:hover {
      background: #f8f9fa;
      border-left: 3px solid var(--primary-color);
      box-shadow: none;
    }
    
    &.active {
      background: #f8f9fa;
      border-left: 3px solid var(--primary-color);
    }
    
    svg {
      color: var(--primary-color);
      filter: none;
    }
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
  
  .light & {
    color: #444444;
    font-weight: 500;
    
    &.active {
      color: var(--primary-color);
      background: none;
      -webkit-text-fill-color: var(--primary-color);
      font-weight: 600;
    }
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '1000px' : '0')};
  transition: all 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  background: rgba(30, 35, 50, 0.7);
  border-left: 1px solid rgba(106, 17, 203, 0.2);
  margin-left: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  
  .light & {
    background: rgba(248, 249, 250, 0.9);
    border-left: 1px solid rgba(106, 17, 203, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
`;

const SubMenuItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
  margin: 2px 0;
  
  &:hover {
    background: rgba(48, 54, 82, 0.6);
    border-left: 2px solid var(--primary-color);
    box-shadow: inset 0 0 8px rgba(106, 17, 203, 0.1);
  }
  
  .light & {
    &:hover {
      background: rgba(106, 17, 203, 0.1);
      border-left: 2px solid var(--primary-color);
      box-shadow: none;
    }
  }
  
  @media (max-width: 576px) {
    padding: 12px 15px;
  }
`;

const Sidebar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState({
    rediger: false,
    rechercher: false,
    prompt: false
  });
  
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleSubMenu = (menu) => {
    setSubMenuOpen({
      ...subMenuOpen,
      [menu]: !subMenuOpen[menu]
    });
  };

  return (
    <SidebarContainer>
      <TopBar>
        <ThemeToggle onClick={toggleTheme} title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </TopBar>
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
      
      <MenuItem onClick={() => toggleSubMenu('rediger')} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', color: 'var(--text-secondary)' }}>
          <FaEdit style={{ marginRight: '12px' }} />
          Rédiger un document
          {subMenuOpen.rediger ? <FaChevronDown style={{ marginLeft: 'auto' }} /> : <FaChevronRight style={{ marginLeft: 'auto' }} />}
        </div>
      </MenuItem>
      <SubMenu $isOpen={subMenuOpen.rediger} style={{ maxHeight: subMenuOpen.rediger ? '1000px' : '0' }}>
        <SubMenuItem>
          <MenuLink to="/contrats-et-actes">
            <img src={plumeIcon} alt="Contrats" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
            Contrats et actes
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/contentieux-arbitrage">
            <img src={epeIcon} alt="Contentieux" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
            Contentieux et arbitrage
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/documents-internes">
            <img src={homeIcon} alt="Documents" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
            Documents internes et organisationnels
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/correspondance-client">
            <img src={couroneIcon} alt="Correspondance" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
            Correspondance et relation client
          </MenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <MenuLink to="/conformite-deontologie">
            <img src={bouclierIcon} alt="Conformité" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
            Conformité et déontologie
          </MenuLink>
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
