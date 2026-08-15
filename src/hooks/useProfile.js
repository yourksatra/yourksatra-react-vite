import { getProfileData } from '../services/profileService.js';

/**
 * Hook for profile data including dynamic status badge.
 * Components should use this hook to access profile information.
 */
export default function useProfile() {
  return getProfileData();
}
