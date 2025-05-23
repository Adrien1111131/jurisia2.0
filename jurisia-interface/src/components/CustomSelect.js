import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  z-index: 1001;
  
  &:focus-within {
    z-index: 1002;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SelectButton = styled.div`
  width: 100%;
  padding: 15px;
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(48, 54, 82, 0.8);
    border-color: var(--primary-color);
  }

  ${props => props.$isOpen && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
  `}
`;

const ChevronIcon = styled(FaChevronDown)`
  transition: transform 0.3s ease;
  ${props => props.$isOpen && 'transform: rotate(180deg);'}
`;

const OptionsContainer = styled.div`
  position: fixed;
  left: ${props => props.$position?.left}px;
  right: auto;
  width: ${props => props.$position?.width}px;
  background: rgba(42, 47, 69, 0.95);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 4px 0;
  
  ${props => props.$position?.upward ? `
    bottom: ${props.$position?.bottom}px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  ` : `
    top: ${props.$position?.top}px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `}
  
  /* Styles de la barre de défilement */
  scrollbar-width: thin;
  scrollbar-color: rgba(106, 17, 203, 0.5) rgba(42, 47, 69, 0.95);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(42, 47, 69, 0.95);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(106, 17, 203, 0.5);
    border-radius: 4px;
    
    &:hover {
      background: rgba(106, 17, 203, 0.8);
    }
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Option = styled.div`
  padding: 12px 15px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: rgba(106, 17, 203, 0.3);
  }

  ${props => props.$isSelected && `
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    color: white;
  `}
`;

const Placeholder = styled.span`
  color: var(--text-secondary);
  opacity: 0.7;
`;

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Sélectionnez une option",
  getOptionLabel = option => option.label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceAbove = rect.top;
      const menuHeight = Math.min(500, options.length * 40 + 8); // Hauteur estimée du menu

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        // Afficher le menu au-dessus si plus d'espace en haut
        setPosition({
          top: 'auto',
          bottom: windowHeight - rect.top,
          left: rect.left,
          width: rect.width,
          upward: true
        });
      } else {
        // Afficher le menu en dessous
        setPosition({
          top: rect.bottom,
          bottom: 'auto',
          left: rect.left,
          width: rect.width,
          upward: false
        });
      }
    }
  }, [isOpen, options.length]);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
      >
        {selectedOption ? (
          getOptionLabel(selectedOption)
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
        <ChevronIcon $isOpen={isOpen} />
      </SelectButton>

      {isOpen && (
        <OptionsContainer $position={position}>
          <OptionsList>
          {options.map((option, index) => (
            <Option
              key={option.value || index}
              onClick={() => handleOptionClick(option)}
              $isSelected={option.value === value}
            >
              {getOptionLabel(option)}
            </Option>
          ))}
          </OptionsList>
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
