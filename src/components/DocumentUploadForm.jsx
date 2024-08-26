// src/components/DocumentUploadForm.js
import React, { useState, useEffect } from 'react';
import { uploadDocument, createEmptyKnowledge, listKnowledge } from '../services/api';
import './DocumentUploadForm.css'; // Import CSS for DocumentUploadForm

const DocumentUploadForm = () => {
  const [file, setFile] = useState(null);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState('');
  const [newKnowledgeName, setNewKnowledgeName] = useState('');

  useEffect(() => {
    listKnowledge().then((res) => setKnowledgeList(res.data.data));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({ 
      indexing_technique: "high_quality", 
      process_rule: { 
        rules: { 
          pre_processing_rules: [
            { id: "remove_extra_spaces", enabled: true },
            { id: "remove_urls_emails", enabled: true }
          ],
          segmentation: { separator: "###", max_tokens: 500 }
        },
        mode: "custom"
      }
    }));

    if (selectedKnowledge) {
      uploadDocument(selectedKnowledge, formData)
        .then(() => alert('Document Uploaded!'))
        .catch((error) => alert('Error uploading document: ' + error.message));
    } else if (newKnowledgeName) {
      createEmptyKnowledge(newKnowledgeName).then((res) => {
        const newKnowledgeId = res.data.id;
        uploadDocument(newKnowledgeId, formData)
          .then(() => alert('Document Uploaded to New Knowledge!'))
          .catch((error) => alert('Error uploading document: ' + error.message));
      });
    } else {
      alert('Please select existing knowledge or enter a name for a new knowledge.');
    }
  };

  return (
    <div className="document-upload-form">
      <form onSubmit={handleUpload}>

        <div className="form-group">
          <label htmlFor="knowledge-select">Select Knowledge:</label>
          <select id="knowledge-select" value={selectedKnowledge} onChange={(e) => setSelectedKnowledge(e.target.value)}>
            <option value="">Select Knowledge</option>
            {knowledgeList.map((knowledge) => (
              <option key={knowledge.id} value={knowledge.id}>
                {knowledge.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Choose File:</label>
          <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className="form-group">
          <label htmlFor="new-knowledge">Create New Knowledge (if not in the dropdown above):</label>
          <input
            id="new-knowledge"
            type="text"
            value={newKnowledgeName}
            onChange={(e) => setNewKnowledgeName(e.target.value)}
            placeholder="Enter name for new knowledge"
          />
        </div>

        <button className="upload-button" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
