// src/pages/UploadPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import DocumentUploadForm from '../components/DocumentUploadForm';
import './UploadPage.css'; // Import CSS for UploadPage

const UploadPage = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="upload-page">
      <h1>Upload Document</h1>
      <DocumentUploadForm />
      <button className="navigate-button" onClick={handleGoHome}>Back to Home</button>
    </div>
  );
};

export default UploadPage;
