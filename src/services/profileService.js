import { getProfile } from '../repository/profileRepository.js';
import { getLatestPeriodExperience } from './experienceService.js';

/**
 * Business logic for profile data.
 * Combines profile data with dynamic status badge from experience data.
 */

/** Compute status badge based on latest period experience. */
function computeStatusBadge(latestExperience) {
  if (!latestExperience) {
    return { active: false, text: 'Terbuka untuk Peluang Baru' };
  }

  const now = new Date();
  const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  if (!latestExperience.endDate || latestExperience.endDate >= nowYM) {
    return { active: true, text: `Saat ini di ${latestExperience.organizer}` };
  }

  return { active: false, text: 'Terbuka untuk Peluang Baru' };
}

/** Get complete profile data including dynamic status badge. */
export function getProfileData() {
  const profile = getProfile();
  const latestExperience = getLatestPeriodExperience();
  const statusBadge = computeStatusBadge(latestExperience);

  return {
    ...profile,
    statusBadge,
  };
}
