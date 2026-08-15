import data from '../../assets/Data/profile.json';

/**
 * JSON datasource for profile data.
 * This is the ONLY file that knows the location of profile.json.
 */
export function getAll() {
  return data?.profile || {};
}
