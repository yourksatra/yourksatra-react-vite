import { useState } from "react";
import { motion } from "framer-motion";
import useProjects from "../../hooks/useProjects";
import ProjectModal from "../reusable/ProjectModal";
import Breadcrumb from "../reusable/Breadcrumb";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectSection({ setActivePage }) {
  const projects = useProjects();
  const [openProject, setOpenProject] = useState(null);

  const getImagePath = (project) =>
    project.images?.thumbnail
      ? `/projectFile/${project.images.folder}/${project.images.thumbnail}`
      : null;

  return (
    <section id="projects" className="flex flex-col items-center min-w-full bg-slate-50 dark:bg-slate-950">
      <div className="w-full mt-16">
        <Breadcrumb title="Project" setActivePage={setActivePage} />
      </div>

      <div className="my-12 w-full max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 group">
                  <div className="relative overflow-hidden rounded-2xl glass-card glow-shadow">
                    {getImagePath(project) ? (
                      <img
                        src={getImagePath(project)}
                        alt={project.title}
                        className="w-full h-56 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-56 md:h-72 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent blur-xl"></div>
                        <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">Private Repository</span>
                      </div>
                    )}
                    {/* Tech badge overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techInformation?.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-sky-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">
                    Project #{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techInformation?.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 rounded-lg glass-card font-medium text-slate-600 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOpenProject(project)}
                      className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-600/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                    >
                      Lihat Detail
                    </button>
                    {project.button?.active && (
                      <a
                        href={project.button.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer px-5 py-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2 hover:border-sky-600/30 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {project.button.title || "Buka"} <FaExternalLinkAlt className="text-xs" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </div>
    </section>
  );
}

