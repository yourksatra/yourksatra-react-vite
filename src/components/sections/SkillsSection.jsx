import skillsetData from "../../assets/Data/skillset.json";
import Breadcrumb from "../reusable/breadcrumb";

const groups = ["Di Gunakan", "Belajar", "Lainnya"];

const SkillsSection = ({ setActivePage }) => {
  return (
    <section className="flex flex-col items-center min-w-full bg-white dark:bg-gray-900">
      <div className="w-full mt-16">
        <Breadcrumb title="Skills" setActivePage={setActivePage} />
      </div>
      <div className="my-16">
        {groups.map((group) => {
          const filtered = skillsetData.skillset.filter(
            (s) => s.group === group
          );
          if (filtered.length === 0) return null;

          return (
            <div key={group} className="mb-10">
              <h3 data-aos="fade-up" className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{group}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filtered.map((skill, i) => (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                  >
                    <img
                      src={`/skills/${skill.img}`}
                      alt={skill.name}
                      className="h-14 mb-3 object-contain"
                    />
                    <p className="font-medium text-sky-500">
                      {skill.name}{" "}
                      <span className="text-gray-500">({skill.level})</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.type}
                    </p>
                  </div>
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
