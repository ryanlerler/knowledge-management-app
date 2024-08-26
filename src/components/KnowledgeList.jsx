// src/components/KnowledgeList.js
import React, { useState } from "react";
import { deleteKnowledge, deleteDocument } from "../services/api";
import './KnowledgeList.css';

const KnowledgeList = ({ knowledgeList, handleKnowledgeUpdate }) => {
  const [selectedDocument, setSelectedDocument] = useState({ datasetId: null, documentId: null });

  const handleDeleteKnowledge = (id) => {
    deleteKnowledge(id)
      .then(() => {
        handleKnowledgeUpdate({ id, deleted: true });
        alert('Knowledge deleted successfully!');
      })
      .catch(() => alert('Failed to delete knowledge.'));
  };

  const handleDeleteDocument = (datasetId, documentId) => {
    deleteDocument(datasetId, documentId)
      .then(() => {
        handleKnowledgeUpdate({ id: datasetId, documentId, deleted: false });
        setSelectedDocument({ datasetId: null, documentId: null });
        alert('Document deleted!')
      })
      .catch(() => alert('Failed to delete document.'));
  };

  const handleDropdownChange = (event, datasetId) => {
    const documentId = event.target.value;
    setSelectedDocument({ datasetId, documentId });
  };

  const handleDeleteSelectedDocument = () => {
    if (selectedDocument.datasetId && selectedDocument.documentId) {
      handleDeleteDocument(selectedDocument.datasetId, selectedDocument.documentId);
    }
  };

  return (
    <div className="knowledge-list">
      <h2>Knowledge List</h2>
      <ul>
        {knowledgeList.map((knowledge) => (
          <li key={knowledge.id}>
            <h3>{knowledge.name}</h3>
            <button onClick={() => handleDeleteKnowledge(knowledge.id)}>Delete Knowledge</button>
            {knowledge.documents && knowledge.documents.length > 0 && (
              <div>
                <select
                  onChange={(e) => handleDropdownChange(e, knowledge.id)}
                  value={selectedDocument.datasetId === knowledge.id ? selectedDocument.documentId : ""}
                >
                  <option value="">Select a document to delete</option>
                  {knowledge.documents.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name || "No Title Available"}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleDeleteSelectedDocument}
                  disabled={!selectedDocument.datasetId || !selectedDocument.documentId}
                >
                  Delete Selected Document
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeList;