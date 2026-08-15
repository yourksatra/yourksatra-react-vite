import { getAll } from '../datasource/json/projectDataSource.js';

/**
 * Data abstraction for projects.
 * Validates and returns project data from the datasource.
 */
export function getAllProjects() {
  const data = getAll();
  if (!Array.isArray(data)) return [];
  return data;
}
