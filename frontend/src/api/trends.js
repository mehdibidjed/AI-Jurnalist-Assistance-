import apiClient from './apiClient';

/**
 * Matches: GET http://localhost:8000/api/trends/trends
 */
export const getTrends = () => {
  return apiClient.get('/trends/trends');
};