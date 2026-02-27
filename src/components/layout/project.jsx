import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../reusable/ProjectCard";
import ProjectModal from "../reusable/ProjectModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectLayout({ limit = 6, onSeeMore }) {
  const all = useProjects();
  const projects = useMemo(() => all.slice(0, limit), [all, limit]);

  const [index, setIndex] = useState(2);
  const [transitioning, setTransitioning] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const perView =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const extendedProjects = [
    ...projects.slice(-2),
    ...projects,
    ...projects.slice(0, 3),
  ];

  const handleNext = () => {
    if (!transitioning) { setTransitioning(true); setIndex((prev) => prev + 1); }
  };
  const handlePrev = () => {
    if (!transitioning) { setTransitioning(true); setIndex((prev) => prev - 1); }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (index >= projects.length + 2) {
      const timeout = setTimeout(() => { setTransitioning(false); setIndex(2); }, 550);
      return () => clearTimeout(timeout);
    }
    if (index <= 1) {
      const timeout = setTimeout(() => { setTransitioning(false); setIndex(projects.length + 1); }, 500);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setTransitioning(false), 600);
    return () => clearTimeout(timeout);
  }, [index, projects.length, isMobile]);

  return (
    <section className="w-full py-4 relative">
      <div className="max-w-8xl mx-auto md:mx-12 lg:mx-16">
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-xl glass-card-strong flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-600 hover:border-sky-600/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-xl glass-card-strong flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-600 hover:border-sky-600/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Container */}
        <div
          className={`relative ${isMobile
            ? "flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 pb-4"
            : "overflow-hidden"
            }`}
        >
          {isMobile ? (
            projects.map((p, i) => (
              <div key={`${p.title}-${i}`} className="flex-shrink-0 w-80 mx-2 snap-center">
                <ProjectCard project={p} onOpen={(proj) => setOpenProject(proj)} />
              </div>
            ))
          ) : (
            <motion.div
              className="flex gap-4 mx-1"
              animate={{ x: `-${index * (104 / perView)}%` }}
              transition={
                transitioning
                  ? { duration: 0.6, ease: "easeInOut" }
                  : { duration: 0 }
              }
            >
              {extendedProjects.map((p, i) => (
                <div
                  key={`${p.title}-${i}`}
                  className={`w-full ${perView === 3 ? "md:w-1/3" : "w-full"} flex-shrink-0 my-2`}
                >
                  <ProjectCard project={p} onOpen={(proj) => setOpenProject(proj)} />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View all button */}
        <div className="mt-4 mb-2 text-center">
          <button
            onClick={onSeeMore}
            className="cursor-pointer px-8 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Lihat semua proyek
          </button>
        </div>
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}
