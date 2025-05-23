import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import DocumentGenerator from '../components/DocumentGenerator';
import CustomSelect from '../components/CustomSelect';
import DynamicForm from '../components/DynamicForm';
import { documentTypes } from '../config/documentTypes';
import styled from 'styled-components';

const SelectContainer = styled.div`
  margin: 20px 0;
  max-width: 600px;
`;

const CorrespondanceClient = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState(null);

  const categories = documentTypes.correspondance_client?.options || {};
  const categoryOptions = Object.entries(categories).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const handleCategoryChange = (option) => {
    setSelectedCategory(option.value);
    setSelectedType('');
    setFormData(null);
    setGeneratedDocument(null);
  };

  const handleTypeChange = (option) => {
    setSelectedType(option.value);
    setFormData(null);
    setGeneratedDocument(null);
  };

  const getTypeOptions = () => {
    if (!selectedCategory || !categories[selectedCategory]) return [];
    const categoryData = categories[selectedCategory];
    
    return Object.entries(categoryData.types || {}).map(([key, value]) => ({
      value: key,
      label: value.label
    }));
  };

  const getDocumentFields = () => {
    if (!selectedCategory || !selectedType) return null;
    const categoryData = categories[selectedCategory];
    if (!categoryData?.types?.[selectedType]) return null;
    return categoryData.types[selectedType].fields;
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const fields = getDocumentFields();

  return (
    <PageTemplate>
      <h1>Correspondance et relation client</h1>
      <p>
        Sélectionnez le type de document que vous souhaitez générer et remplissez les informations nécessaires.
      </p>
      <SelectContainer>
        <CustomSelect
          label="Type de correspondance"
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Sélectionnez un type de correspondance"
        />
        {selectedCategory && (
          <CustomSelect
            label="Modèle de document"
            options={getTypeOptions()}
            value={selectedType}
            onChange={handleTypeChange}
            placeholder="Sélectionnez un modèle"
          />
        )}
      </SelectContainer>
      
      {fields && (
        <DynamicForm 
          fields={fields}
          onSubmit={handleFormSubmit}
        />
      )}

      {formData && (
        <DocumentGenerator 
          documentType="correspondance_client" 
          category={selectedCategory}
          type={selectedType}
          fields={fields}
          formData={formData}
        />
      )}
    </PageTemplate>
  );
};

export default CorrespondanceClient;
