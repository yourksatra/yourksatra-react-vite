// src/components/sections/ProjectSection.jsx
import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import ProjectCard from "../reusable/ProjectCard";
import ProjectModal from "../reusable/ProjectModal";
import Breadcrumb from "../reusable/Breadcrumb";

export default function ProjectSection({setActivePage}) {
  const projects = useProjects();
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" className="flex flex-col items-center min-w-full bg-white dark:bg-gray-900">
      <div className="w-full mt-16">
        <Breadcrumb title="Project" setActivePage={setActivePage} />
      </div>
      <div className="my-16">
      <div className="max-w-7xl mx-auto px-4 md:px-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={i}>
              <ProjectCard
                project={p}
                onOpen={(proj) => setOpenProject(proj)}
              />
            </div>
          ))}
        </div>

        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </div>
      </div>
    </section>
  );
}
