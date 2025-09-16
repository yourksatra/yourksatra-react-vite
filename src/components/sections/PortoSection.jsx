import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Experience from "../layout/experience";

export default function PortoSection({ selectedTab, setActivePage }) {
  const [activeTab, setActiveTab] = useState(selectedTab || "project");

  useEffect(() => {
    if (selectedTab) setActiveTab(selectedTab);
  }, [selectedTab]);

  const tabs = ["experience", "project", "skills"];

  const renderContent = () => {
    switch (activeTab) {
      case "experience":
        return <Experience jmlhdisplay={6} onSeeMore={() => setActivePage("ExperienceSection")} />;
      case "project":
        return (
          <div className="p-6 text-center text-blue-400">
            Project Coming Soon
          </div>
        );
      case "skills":
        return (
          <div className="p-6 text-center text-blue-400">
            Skills Coming Soon
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="portfolio"
      className="min-h-[100svh] flex flex-col items-center bg-white dark:bg-gray-900"
    >
      {/* Title */}
      <div
        data-aos="fade-up"
        className="h-15 w-full flex items-center justify-center bg-sky-500 md:h-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900">
          PORTOFOLIO
        </h2>
      </div>
      {/* tabs */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex gap-6 mt-6 border-b border-gray-300 dark:border-gray-700"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 px-4 text-sm md:text-base font-medium text-center transition relative ${
              activeTab === tab
                ? "text-sky-500 border-b-2 border-sky-500"
                : "text-gray-500 hover:text-sky-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content with animation */}
      <div className="mt-8 mb-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
