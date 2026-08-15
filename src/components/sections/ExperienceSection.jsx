import Experience from "../layout/experience";
import Breadcrumb from "../reusable/Breadcrumb";
import { motion } from "framer-motion";
import useExperience from "../../hooks/useExperience";

export default function ExperienceSection({ setActivePage }) {
  const { hasData } = useExperience();

  return (
    <section className="min-h-[100svh] flex flex-col items-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full mt-16">
        <Breadcrumb title="Experience" setActivePage={setActivePage} />
      </div>
      <div className="my-10 w-full max-w-6xl mx-auto px-4">
        {hasData ? (
          <Experience />
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 gradient-border">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Belum Ada Data
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
              Data pengalaman sedang dalam proses pengisian. Pantau terus untuk update terbaru!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

