import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaFile, FaCheck } from 'react-icons/fa';

const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const UploadArea = styled.div`
  width: 100%;
  border: 2px dashed rgba(106, 17, 203, 0.4);
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(26, 31, 46, 0.3);
  
  &:hover {
    border-color: rgba(106, 17, 203, 0.8);
    background: rgba(26, 31, 46, 0.5);
  }
  
  input {
    display: none;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  
  svg {
    filter: drop-shadow(0 0 8px rgba(106, 17, 203, 0.5));
  }
`;

const UploadText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const UploadHint = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const RestrictedFormatHint = styled(UploadHint)`
  color: #ffcc00;
  font-weight: 500;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background: linear-gradient(45deg, #7b21dc, #3585ff);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(106, 17, 203, 0.4);
  }
  
  &:disabled {
    background: #4a4a6a;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 10px 15px;
  background: rgba(106, 17, 203, 0.1);
  border-radius: 8px;
  width: 100%;
  
  svg {
    color: var(--primary-color);
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const FileName = styled.span`
  color: var(--text-primary);
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const FileSize = styled.span`
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-left: auto;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  color: #4caf50;
  margin-top: 15px;
  font-size: 0.95rem;
  
  svg {
    margin-right: 8px;
  }
`;

const FileUploader = ({ onFileUpload, acceptedFileTypes = ".pdf,.doc,.docx,.txt,.xlsx,.xls" }) => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsUploaded(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setIsUploaded(false);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleUpload = () => {
    if (file && onFileUpload) {
      onFileUpload(file);
      setIsUploaded(true);
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <UploaderContainer>
      <UploadArea 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input 
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept={acceptedFileTypes}
        />
        <UploadIcon>
          <FaUpload />
        </UploadIcon>
        <UploadText>Glissez-déposez votre fichier ici ou cliquez pour parcourir</UploadText>
        {acceptedFileTypes === ".txt,.docx" ? (
          <RestrictedFormatHint>Formats acceptés: TXT, DOCX uniquement</RestrictedFormatHint>
        ) : (
          <UploadHint>Formats acceptés: PDF, DOC, DOCX, TXT, XLSX, XLS</UploadHint>
        )}
      </UploadArea>
      
      {file && (
        <FileInfo>
          <FaFile />
          <FileName>{file.name}</FileName>
          <FileSize>{formatFileSize(file.size)}</FileSize>
        </FileInfo>
      )}
      
      {isUploaded && (
        <SuccessMessage>
          <FaCheck />
          Fichier chargé avec succès
        </SuccessMessage>
      )}
      
      <Button 
        onClick={handleUpload}
        disabled={!file || isUploaded}
      >
        <FaUpload />
        {isUploaded ? 'Fichier chargé' : 'Charger le fichier'}
      </Button>
    </UploaderContainer>
  );
};

export default FileUploader;
