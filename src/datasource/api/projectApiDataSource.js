import { get } from './apiClient.js';

/**
 * REST API datasource for project data.
 * Placeholder — activate when Dashboard API is ready.
 */
export async function getAll() {
  const response = await get('/projects');
  return response?.data || [];
}
