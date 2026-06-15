import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen }) {
  const hasImage = project.images && project.images.thumbnail;
  const getImagePath = () =>
    hasImage
      ? `/projectFile/${project.images.folder}/${project.images.thumbnail}`
      : "";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="h-full bg-white dark:bg-slate-800/50 w-full rounded-xl glass-card overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-52 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {hasImage ? (
          <img
            src={getImagePath()}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent blur-xl"></div>
             <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">Private Repository</span>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techInformation?.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => onOpen(project)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-500 text-white text-sm font-medium shadow-md shadow-sky-600/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Selengkapnya
          </button>
        </div>
      </div>
    </motion.article>
  );
}
