import { getProjects } from '../services/projectService.js';

/**
 * useProjects
 * - Mengembalikan array projects.
 * - Data diambil melalui service layer, bukan langsung dari JSON.
 */
export default function useProjects() {
  return getProjects();
}