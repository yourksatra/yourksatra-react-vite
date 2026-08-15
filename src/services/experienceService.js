import { getAllExperiences } from '../repository/experienceRepository.js';

/**
 * Business logic for experience data.
 */

/** Get all experiences sorted by date (newest first). */
export function getExperiencesSorted() {
  const experiences = getAllExperiences();
  return experiences.slice().sort((a, b) => {
    const getDateKey = (item) => {
      try {
        if (item.type === 'period') {
          const d = item.endDate || item.startDate;
          return d ? new Date(d.length === 7 ? d + '-01' : d) : new Date(0);
        }
        if (item.type === 'onetime') {
          return item.date ? new Date(item.date) : new Date(0);
        }
        return new Date(0);
      } catch {
        return new Date(0);
      }
    };
    return getDateKey(b) - getDateKey(a);
  });
}

/** Get experiences with optional limit. */
export function getExperiences(limit) {
  const sorted = getExperiencesSorted();
  if (limit && limit > 0) {
    return sorted.slice(0, limit);
  }
  return sorted;
}

/** Get the latest experience with type 'period'. */
export function getLatestPeriodExperience() {
  const experiences = getAllExperiences()
    .filter((e) => e.type === 'period' && e.startDate)
    .sort((a, b) => {
      const endA = a.endDate || a.startDate;
      const endB = b.endDate || b.startDate;
      return endB.localeCompare(endA);
    });
  return experiences[0] || null;
}

/** Check if experience data exists. */
export function hasExperiences() {
  return getAllExperiences().length > 0;
}
