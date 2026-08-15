/**
 * Base API client for future REST API integration.
 * Currently a placeholder — not yet active.
 *
 * Usage: When Dashboard API is ready, configure BASE_URL
 * via environment variable VITE_API_BASE_URL.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Generic GET request wrapper.
 * @param {string} endpoint - API endpoint path (e.g., '/projects')
 * @returns {Promise<object>} Response data following contract format { success, data }
 */
export async function get(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.message || 'API returned unsuccessful response');
    }

    return json;
  } catch (error) {
    console.error(`[apiClient] GET ${endpoint} failed:`, error);
    return { success: false, data: null, error: error.message };
  }
}
