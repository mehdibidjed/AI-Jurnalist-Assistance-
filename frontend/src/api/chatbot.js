import apiClient from './apiClient';

/**
 * @param {string} prompt - The topic for the AI
 * @param {string} tone - The writing style (default: neutral)
 * Matches: POST http://localhost:8000/api/content
 */
export const generateResponse = (prompt) => {
  return apiClient.post('/chatbot', { prompt });
};