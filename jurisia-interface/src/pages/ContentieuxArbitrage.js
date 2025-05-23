import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGavel, FaBalanceScale } from 'react-icons/fa';
import { documentTypes } from '../config/documentTypes';
import DocumentGenerator from '../components/DocumentGenerator';
import CustomSelect from '../components/CustomSelect';

const PageContainer = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 20px rgba(106, 17, 203, 0.3);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  background: rgba(42, 47, 69, 0.7);
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
  border: 1px solid rgba(106, 17, 203, 0.3);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(48, 54, 82, 0.8);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background: rgba(48, 54, 82, 0.6);
  border: 1px solid rgba(106, 17, 203, 0.3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(106, 17, 203, 0.3);
    background: rgba(48, 54, 82, 0.8);
  }
`;

const ContentieuxArbitrage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({});

  const categoryOptions = Object.entries(documentTypes.contentieux_arbitrage?.options || {}).map(([value, data]) => ({
    value,
    label: data.label
  }));

  const getTypeOptions = () => {
    if (!selectedCategory || !documentTypes.contentieux_arbitrage?.options[selectedCategory]?.types) return [];
    return Object.entries(documentTypes.contentieux_arbitrage.options[selectedCategory].types).map(([value, data]) => ({
      value,
      label: data.label
    }));
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option.value);
    setSelectedType('');
    setFormData({});
  };

  const handleTypeChange = (option) => {
    setSelectedType(option.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSelectedFields = () => {
    if (!selectedCategory || !selectedType || 
        !documentTypes.contentieux_arbitrage?.options[selectedCategory]?.types[selectedType]) {
      return [];
    }
    return documentTypes.contentieux_arbitrage.options[selectedCategory].types[selectedType].fields || [];
  };

  return (
    <PageContainer>
      <Title>
        <FaBalanceScale style={{ marginRight: '15px' }} />
        Contentieux et arbitrage
      </Title>
      <Description>
        Sélectionnez le type de document procédural que vous souhaitez générer et remplissez les informations nécessaires.
      </Description>

      <FormContainer>
        <FormGroup>
          <Label>Catégorie de document</Label>
          <CustomSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Sélectionnez une catégorie"
          />
        </FormGroup>

        {selectedCategory && (
          <FormGroup>
            <Label>Type de document</Label>
            <CustomSelect
              options={getTypeOptions()}
              value={selectedType}
              onChange={handleTypeChange}
              placeholder="Sélectionnez un type de document"
            />
          </FormGroup>
        )}

        {selectedType && (
          <div>
            {getSelectedFields().map(field => (
              <FormGroup key={field.id}>
                <Label htmlFor={field.id}>
                  {field.label}{field.required ? ' *' : ''}
                </Label>
                {field.type === 'textarea' ? (
                  <TextArea
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                ) : (
                  <Input
                    type="text"
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                )}
              </FormGroup>
            ))}
            <DocumentGenerator
              category="contentieux_arbitrage"
              option={selectedCategory}
              type={selectedType}
              fields={getSelectedFields()}
              formData={formData}
            />
          </div>
        )}
      </FormContainer>
    </PageContainer>
  );
};

export default ContentieuxArbitrage;
