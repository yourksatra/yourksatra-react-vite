import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../reusable/ProjectCard";
import ProjectModal from "../reusable/ProjectModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectLayout({ limit = 5, onSeeMore }) {
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
    if (!transitioning) {
      setTransitioning(true);
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!transitioning) {
      setTransitioning(true);
      setIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🔁 Loop dua sisi
  useEffect(() => {
    if (isMobile) return; // tidak pakai animasi loop di mobile

    if (index >= projects.length + 2) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setIndex(2);
      }, 550);
      return () => clearTimeout(timeout);
    }

    if (index <= 1) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setIndex(projects.length + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setTransitioning(false), 600);
    return () => clearTimeout(timeout);
  }, [index, projects.length, isMobile]);

  return (
    <section data-aos="fade-up" className="w-full relative">
      <div className="max-w-7xl mx-auto">
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                cursor-pointer text-sky-500 hover:text-sky-600"
            >
              <ChevronLeft className="w-13 h-20" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                cursor-pointer text-sky-500 hover:text-sky-600"
            >
              <ChevronRight className="w-13 h-20" />
            </button>
          </>
        )}

        {/* Container Card */}
        <div
          className={`relative ${
            isMobile
              ? "flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 pb-4"
              : "overflow-hidden"
          }`}
        >
          {isMobile ? (
            // 🟢 Mode scroll manual (mobile)
            projects.map((p, i) => (
              <div
                key={`${p.title}-${i}`}
                className="flex-shrink-0 w-80 mx-2 snap-center"
              >
                <ProjectCard project={p} onOpen={(proj) => setOpenProject(proj)} />
              </div>
            ))
          ) : (
            // 🟦 Mode animasi loop (desktop)
            <motion.div
              className="flex gap-4 mx-2"
              animate={{ x: `-${index * (105 / perView)}%` }}
              transition={
                transitioning
                  ? { duration: 0.6, ease: "easeInOut" }
                  : { duration: 0 }
              }
            >
              {extendedProjects.map((p, i) => (
                <div
                  key={`${p.title}-${i}`}
                  className={`w-full ${
                    perView === 3 ? "md:w-1/3" : "w-full"
                  } flex-shrink-0 my-2`}
                >
                  <ProjectCard
                    project={p}
                    onOpen={(proj) => setOpenProject(proj)}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="mt-8 pb-6 text-center">
          <button
            onClick={onSeeMore}
            className="cursor-pointer px-6 py-2 rounded-md bg-sky-500 text-white font-medium 
              hover:bg-sky-600 transition-colors duration-200"
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