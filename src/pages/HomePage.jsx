// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KnowledgeList from '../components/KnowledgeList';
import KnowledgeForm from '../components/KnowledgeForm';
import { listKnowledge } from '../services/api';
import './HomePage.css'; // Import CSS for HomePage

const HomePage = () => {
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const knowledgeResponse = await listKnowledge();
        const knowledgeData = knowledgeResponse.data.data;

        const updatedKnowledgeList = await Promise.all(
          knowledgeData.map(async (knowledge) => {
            const documentsResponse = await fetchDocuments(knowledge.id);
            return {
              ...knowledge,
              documents: documentsResponse.data,
            };
          })
        );

        setKnowledgeList(updatedKnowledgeList);
      } catch (error) {
        console.error("Error fetching knowledge or documents:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const fetchDocuments = async (datasetId) => {
    try {
      const response = await fetch(
        `http://13.212.220.128/v1/datasets/${datasetId}/documents`,
        {
          headers: {
            Authorization: `Bearer dataset-03Z9UFsnQMyzR9Z6ToG4RgMK`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching documents:", error);
      return { data: [] };
    }
  };

  const addKnowledge = (newKnowledge) => {
    setKnowledgeList((prevList) => [newKnowledge, ...prevList]);
  };

  const handleKnowledgeUpdate = (updatedKnowledge) => {
    setKnowledgeList((prevList) =>
      prevList.map((knowledge) => {
        if (knowledge.id === updatedKnowledge.id) {
          if (updatedKnowledge.deleted) {
            // If the entire knowledge is deleted
            return null;
          } else if (updatedKnowledge.documentId) {
            // If a document is deleted
            return {
              ...knowledge,
              documents: knowledge.documents.filter(
                (doc) => doc.id !== updatedKnowledge.documentId
              ),
            };
          } else {
            // If knowledge is updated
            return updatedKnowledge;
          }
        }
        return knowledge;
      }).filter(Boolean) // Remove null entries (deleted knowledge)
    );
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <h1>Knowledge Management</h1>
      <KnowledgeForm addKnowledge={addKnowledge} />
      <KnowledgeList
        knowledgeList={knowledgeList}
        handleKnowledgeUpdate={handleKnowledgeUpdate}
      />
      <Link to="/upload">
        <button className="navigate-button">Go to Document Upload</button>
      </Link>
    </div>
  );
};

export default HomePage;
