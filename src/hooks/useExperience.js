import { getExperiencesSorted, getExperiences, hasExperiences } from '../services/experienceService.js';

/**
 * Hook for experience data.
 * Components should use this hook instead of importing JSON directly.
 */
export default function useExperience(limit) {
  const experiences = limit ? getExperiences(limit) : getExperiencesSorted();
  const hasData = hasExperiences();

  return { experiences, hasData };
}
