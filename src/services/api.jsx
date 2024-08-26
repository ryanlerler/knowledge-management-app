import axios from "axios";

const API_KEY = "dataset-03Z9UFsnQMyzR9Z6ToG4RgMK";
// CORS proxy URL
const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/";
// Base URL for the API
const BASE_URL = "http://13.212.220.128/v1";

const api = axios.create({
  baseURL: `${CORS_PROXY}${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

// API functions

// Create an empty Knowledge
export const createEmptyKnowledge = (name) => api.post("/datasets", { name });

// List Knowledge with pagination and limit
export const listKnowledge = (page = 1, limit = 20) =>
  api.get("/datasets", { params: { page, limit } });

// Create a document by text in a specific Knowledge
export const uploadDocument = (datasetId, formData) =>
    axios.post(`${BASE_URL}/datasets/${datasetId}/document/create_by_file`, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'multipart/form-data'
      }
    });

// Delete a Knowledge by ID
export const deleteKnowledge = (datasetId) =>
  api.delete(`/datasets/${datasetId}`);

// Delete a document by ID from a specific Knowledge
export const deleteDocument = (datasetId, documentId) =>
  api.delete(`/datasets/${datasetId}/documents/${documentId}`);
