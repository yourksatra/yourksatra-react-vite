import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen }) {
  const getImagePath = () =>
    project.images?.thumbnail
      ? `/projectFile/${project.images.folder}/${project.images.thumbnail}`
      : `/projectFile/${project.images.folder}/0.png`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="h-[100%] bg-white w-full dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={getImagePath()}
          alt={project.title}
          className="w-full h-56 md:h-64 object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onOpen(project)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition"
          >
            Selengkapnya
          </button>
        </div>
      </div>
    </motion.article>
  );
}