import { get } from './apiClient.js';

/**
 * REST API datasource for experience data.
 * Placeholder — activate when Dashboard API is ready.
 */
export async function getAll() {
  const response = await get('/experiences');
  return response?.data || [];
}
