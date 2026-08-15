import { motion } from "framer-motion";
import useSkills from "../../hooks/useSkills";
import Breadcrumb from "../reusable/Breadcrumb";

const groups = ["Backend & Database", "Tools & Infrastructure", "Frontend Development"];

const levelConfig = {
  Basic: { value: 20, color: "#94a3b8", label: "Basic" },
  Intermediate: { value: 45, color: "#6366f1", label: "Intermediate" },
  Advanced: { value: 90, color: "#8b5cf6", label: "Advanced" },
};

function SkillLevelChart({ level }) {
  const config = levelConfig[level] || levelConfig["Basic"];

  return (
    <div className="w-full mt-2">
      {/* Label + Nilai */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {config.label}
        </span>
        <span className="text-[10px] font-bold" style={{ color: config.color }}>
          {config.value}%
        </span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: config.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${config.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const SkillsSection = ({ setActivePage }) => {
  const { skills } = useSkills();
  return (
    <section className="flex flex-col items-center min-w-full bg-slate-50 dark:bg-slate-950">
      <div className="w-full mt-16">
        <Breadcrumb title="Skills" setActivePage={setActivePage} />
      </div>
      <div className="my-16 max-w-6xl mx-auto px-4 w-full">

        {/* Recharts Legend/Overview */}
        <motion.div
          className="mb-12 glass-card rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">Skill Level Legend</p>
          <div className="flex flex-wrap gap-6">
            {Object.entries(levelConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${cfg.value}%`, backgroundColor: cfg.color }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {cfg.label} — <span className="font-bold" style={{ color: cfg.color }}>{cfg.value}%</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            * Persentase merepresentasikan tingkat kecakapan relatif, bukan nilai absolut.
          </p>
        </motion.div>

        {groups.map((group) => {
          const filtered = skills.filter(
            (s) => s.group === group
          );
          if (filtered.length === 0) return null;

          return (
            <div key={group} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-sky-600 to-blue-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {group}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {filtered.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="glass-card rounded-xl p-4 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg hover:border-sky-600/20 transition-all duration-200 group"
                  >
                    <img
                      src={`/skills/${skill.img}`}
                      alt={skill.name}
                      className="h-12 mb-3 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                    <p className="font-semibold text-sm text-slate-800 dark:text-white leading-tight mb-0.5">
                      {skill.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {skill.type}
                    </p>
                    <div className="w-full">
                      <SkillLevelChart level={skill.level} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;

