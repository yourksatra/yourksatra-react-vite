import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Experience from "../layout/experience";
import Skills from "../layout/skills";
import Projects from "../layout/project";

export default function PortoSection({ selectedTab, setActivePage }) {
  const [activeTab, setActiveTab] = useState(selectedTab || "project");

  useEffect(() => {
    if (selectedTab) setActiveTab(selectedTab);
  }, [selectedTab]);

  const tabs = [
    { id: "experience", label: "Experience" },
    { id: "project", label: "Project" },
    { id: "skills", label: "Skills" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "experience":
        return <Experience jmlhdisplay={6} onSeeMore={() => setActivePage("ExperienceSection")} />;
      case "project":
        return <Projects onSeeMore={() => setActivePage("ProjectSection")} />;
      case "skills":
        return <Skills onSeeDetail={() => setActivePage("SkillsSection")} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="portfolio"
      className="relative min-h-[100svh] flex flex-col items-center bg-slate-50 dark:bg-slate-950 overflow-hidden py-20"
    >
      {/* Background accents — sama dengan section lain */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-indigo-500/30" />

      {/* Section Heading */}
      <motion.div
        className="w-full text-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
          My Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Portofolio
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
          Perjalanan, proyek, dan keahlian yang telah saya kembangkan
        </p>
      </motion.div>

      {/* Tab Navigation — mirip navbar pill */}
      <motion.div
        className="flex gap-1 p-1 rounded-2xl glass-card mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === tab.id
                ? "text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content with animation */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

