import { useEffect, useState } from "react";
import skillsetData from "../../assets/Data/skillset.json";

const skills = ({ onSeeDetail }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const buildRows = () => {
      const data = shuffle(skillsetData.skillset);
      const rowCount = window.innerWidth < 768 ? 4 : 3;
      const perRow = Math.ceil(data.length / rowCount);

      // Bagi data ke beberapa baris
      let grouped = Array.from({ length: rowCount }, (_, i) =>
        data.slice(i * perRow, (i + 1) * perRow)
      );

      // Untuk tiap baris, shift array dengan offset berbeda
      grouped = grouped.map((row, i) => {
        const offset = i * 2;
        const shifted = [...row.slice(offset), ...row.slice(0, offset)];
        // Gandakan biar infinite loop mulus
        return [...shifted, ...shifted, ...shifted, ...shifted];
      });

      setRows(grouped);
    };

    buildRows();
    window.addEventListener("resize", buildRows);
    return () => window.removeEventListener("resize", buildRows);
  }, []);

  return (
    <div className="w-full py-10 relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="space-y-16">
        {rows.map((row, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="flex animate-marquee space-x-10"
            style={{
              animationDuration: `${20 + i * 5}s`,
            }}
          >
            {row.map((skill, idx) => (
              <img
                key={idx}
                src={`/skills/${skill.img}`}
                alt={skill.name}
                className="h-12 w-auto object-contain"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onSeeDetail}
          data-aos="fade-up"
          className="cursor-pointer px-5 py-2 rounded-lg bg-sky-500 text-white dark:text-gray-900 font-medium hover:bg-sky-600 transition"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default skills;
