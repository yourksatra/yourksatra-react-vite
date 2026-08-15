import { getAllSkills } from '../repository/skillRepository.js';

/**
 * Business logic for skill data.
 */

/** Get all skills. */
export function getSkills() {
  return getAllSkills();
}

/** Get skills filtered by group. */
export function getSkillsByGroup(group) {
  return getAllSkills().filter((s) => s.group === group);
}
