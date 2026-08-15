import { getAll } from '../datasource/json/skillDataSource.js';

/**
 * Data abstraction for skills.
 * Validates and returns skill data from the datasource.
 */
export function getAllSkills() {
  const data = getAll();
  if (!Array.isArray(data)) return [];
  return data;
}
