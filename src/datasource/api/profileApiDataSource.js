import { get } from './apiClient.js';

/**
 * REST API datasource for profile data.
 * Placeholder — activate when Dashboard API is ready.
 */
export async function getAll() {
  const response = await get('/profile');
  return response?.data || {};
}
