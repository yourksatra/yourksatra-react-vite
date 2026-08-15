import { getAll } from '../datasource/json/profileDataSource.js';

/**
 * Data abstraction for profile.
 * Validates and returns profile data from the datasource.
 */
export function getProfile() {
  const data = getAll();
  if (!data || typeof data !== 'object') {
    return {
      name: '',
      degree: '',
      greeting: '',
      title: '',
      description: '',
      specialties: [],
      bio: '',
      bioHighlights: [],
      resumeUrl: '',
      resumeFilename: '',
      stats: { enterpriseProjects: 0, sonarQubePass: false },
      techBadges: [],
    };
  }
  return data;
}
