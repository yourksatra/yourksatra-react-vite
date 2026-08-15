import data from '../../assets/Data/experience.json';

/**
 * JSON datasource for experience data.
 * This is the ONLY file that knows the location of experience.json.
 */
export function getAll() {
  return data?.experience || [];
}
