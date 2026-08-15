import data from '../../assets/Data/proyek.json';

/**
 * JSON datasource for project data.
 * This is the ONLY file that knows the location of proyek.json.
 */
export function getAll() {
  return data?.projects || [];
}
