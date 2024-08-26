// src/components/KnowledgeForm.js
import React, { useState } from 'react';
import { createEmptyKnowledge } from '../services/api';
import './KnowledgeForm.css'; // Import CSS for KnowledgeForm

const KnowledgeForm = ({ addKnowledge }) => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim() === '') {
      alert('Please enter a name for the knowledge.');
      return;
    }

    createEmptyKnowledge(name)
      .then((response) => {
        alert('Knowledge Created!');
        const newKnowledge = response.data; // Assume response.data contains the new knowledge item
        addKnowledge(newKnowledge);
        setName('');
      })
      .catch((error) => {
        console.error('Error creating knowledge:', error.response?.data?.message || error.message);
        alert('Failed to create knowledge.');
      });
  };

  return (
    <div className="knowledge-form">
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter knowledge name"
        />
        <button onClick={handleCreate}>Create Knowledge</button>
      </div>
    </div>
  );
};

export default KnowledgeForm;
