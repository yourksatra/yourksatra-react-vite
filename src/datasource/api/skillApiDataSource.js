import { get } from './apiClient.js';

/**
 * REST API datasource for skill data.
 * Placeholder — activate when Dashboard API is ready.
 */
export async function getAll() {
  const response = await get('/skills');
  return response?.data || [];
}
