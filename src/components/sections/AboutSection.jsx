import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useProjects from "../../hooks/useProjects";
import useProfile from "../../hooks/useProfile";
import heroPhoto from "../../assets/Img/Hero1.png";

/* ── Animated Counter ── */
function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    const step = Math.max(target / (duration * 60), 0.5);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ── About Section ── */
export default function AboutSection() {
  const projects = useProjects();
  const profile = useProfile();
  const totalProjects = projects.length;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center px-6 py-24 md:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Subtle top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-sky-600/20" />

      <div className="max-w-5xl w-full">
        {/* Section label */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2"
          >
            About Me
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Tentang Saya
          </motion.h2>
        </motion.div>

        {/* ── Main content: Photo + Text ── */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Photo */}
          <motion.div variants={fadeUp} custom={2} className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-sky-600/20 to-blue-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={heroPhoto}
                alt="N. Satria Bagass"
                className="relative w-48 h-48 md:w-56 md:h-62 rounded-2xl object-cover object-top shadow-lg"
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed"
            >
              {profile.bio.split(new RegExp(`(${profile.bioHighlights.map(h => h.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')})`, 'g')).map((part, i) =>
                profile.bioHighlights.includes(part) ? (
                  <span key={i} className="font-semibold text-slate-900 dark:text-white">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex items-center justify-center md:justify-start gap-8 mt-7"
            >
              {/* Project count */}
              <div className="text-center md:text-left">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-black gradient-text">
                    <AnimatedCounter target={totalProjects} />
                  </span>
                  <Plus className="w-5 h-5 text-sky-600" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  Project
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />

              {/* Enterprise projects */}
              <div className="text-center md:text-left">
                <span className="text-3xl font-black gradient-text">{profile.stats.enterpriseProjects}</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  Proyek Enterprise
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />

              {/* SonarQube */}
              <div className="text-center md:text-left">
                <span className="text-3xl font-black text-green-500">✓</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  SonarQube Pass
                </p>
              </div>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="flex flex-wrap justify-center md:justify-start gap-2 mt-6"
            >
              {profile.techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg glass-card font-medium text-slate-600 dark:text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
