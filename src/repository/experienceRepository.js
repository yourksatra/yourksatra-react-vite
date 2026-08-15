import { getAll } from '../datasource/json/experienceDataSource.js';

/**
 * Data abstraction for experiences.
 * Validates and returns experience data from the datasource.
 */
export function getAllExperiences() {
  const data = getAll();
  if (!Array.isArray(data)) return [];
  return data;
}
