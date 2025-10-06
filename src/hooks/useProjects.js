import proyekData from "../assets/Data/proyek.json";

/**
 * useProjects
 * - Mengembalikan array projects (urut tetap seperti di JSON).
 * - Bisa ditambah filtering / sorting di sini.
 */
export default function useProjects() {
  // jika ingin sort, lakukan di sini, contoh: terbaru dulu jika ada key date
  // const sorted = proyekData.projects.slice().sort(...)

  return proyekData.projects || [];
}