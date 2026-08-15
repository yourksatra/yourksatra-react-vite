import { getAllProjects } from '../repository/projectRepository.js';

/**
 * Business logic for project data.
 */

/** Get all projects. */
export function getProjects() {
  return getAllProjects();
}

/** Get project count. */
export function getProjectCount() {
  return getAllProjects().length;
}
