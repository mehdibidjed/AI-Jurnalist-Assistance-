import apiClient from './apiClient';

/**
 * @param {string} text - The news content to verify
 * Matches: POST http://localhost:8000/api/fact-check
 */

export const analyzeFact = (text) => {
  return apiClient.post('/fact-check', { 
    article_text: text  // This must match your FastAPI pydantic model
  });
};