import data from '../../assets/Data/skillset.json';

/**
 * JSON datasource for skill data.
 * This is the ONLY file that knows the location of skillset.json.
 */
export function getAll() {
  return data?.skillset || [];
}
