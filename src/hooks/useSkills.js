import { getSkills } from '../services/skillService.js';

/**
 * Hook for skill data.
 * Components should use this hook instead of importing JSON directly.
 */
export default function useSkills() {
  const skills = getSkills();
  return { skills };
}
