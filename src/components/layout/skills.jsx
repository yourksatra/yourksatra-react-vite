import { useEffect, useState } from "react";
import skillsetData from "../../assets/Data/skillset.json";

const Skills = ({ onSeeDetail }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const buildRows = () => {
      const data = shuffle(skillsetData.skillset);
      const rowCount = window.innerWidth < 768 ? 4 : 3;
      const perRow = Math.ceil(data.length / rowCount);

      let grouped = Array.from({ length: rowCount }, (_, i) =>
        data.slice(i * perRow, (i + 1) * perRow)
      );

      grouped = grouped.map((row, i) => {
        const offset = i * 2;
        const shifted = [...row.slice(offset), ...row.slice(0, offset)];
        return [...shifted, ...shifted, ...shifted, ...shifted];
      });

      setRows(grouped);
    };

    buildRows();
    window.addEventListener("resize", buildRows);
    return () => window.removeEventListener("resize", buildRows);
  }, []);

  return (
    <div className="w-full py-8 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/50">
      <div className="space-y-12">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex animate-marquee space-x-4 md:space-x-8"
            style={{ animationDuration: `${20 + i * 5}s` }}
          >
            {row.map((skill, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-4 py-2 rounded-xl glass-card flex items-center gap-2"
              >
                <img
                  src={`${import.meta.env.BASE_URL}/skills/${skill.img}`}
                  alt={skill.name}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap hidden md:inline">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onSeeDetail}
          className="cursor-pointer px-8 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default Skills;
