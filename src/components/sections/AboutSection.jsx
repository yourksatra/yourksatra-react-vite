import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useProjects from "../../hooks/useProjects";

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  // Tambahkan margin negative agar trigger sedikit lebih cepat/konsisten
  const isInView = useInView(ref, { once: true, amount: "all" });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    // Gunakan Math.max untuk memastikan step setidaknya 1 jika target kecil
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

export default function AboutSection() {
  const projects = useProjects();
  const totalProjects = projects.length;
  const sectionRef = useRef(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-sky-600/30" />

      <div className="max-w-6xl w-full" ref={sectionRef}>
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
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
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto"
          >
            Sekilas mengenai perjalanan dan pengalaman saya di dunia teknologi
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Large intro card */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="glass-card rounded-2xl p-8 md:p-10 glow-shadow"
          >
            <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
              Saya memiliki ketertarikan yang kuat dalam bidang pengembangan
              website, khususnya di sisi{" "}
              <span className="font-semibold gradient-text">
                Back-End Development
              </span>
              . Spesialisasi saya adalah membangun aplikasi web yang efisien dan
              skalabel menggunakan{" "}
              <span className="font-semibold text-slate-900 dark:text-white">Laravel</span>{" "}
              maupun{" "}
              <span className="font-semibold text-slate-900 dark:text-white">CodeIgniter</span>.
              Saya terbiasa mengelola basis data menggunakan{" "}
              <span className="font-semibold text-slate-900 dark:text-white">MySQL</span> dan
              juga menguasai bahasa pemrograman lain seperti{" "}
              <span className="font-semibold text-slate-900 dark:text-white">JavaScript</span>,{" "}
              <span className="font-semibold text-slate-900 dark:text-white">Python</span>,
              serta{" "}
              <span className="font-semibold text-slate-900 dark:text-white">C++</span>.
            </p>
          </motion.div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Philosophy card */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="md:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-center"
            >
              <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                Saya adalah pembelajar yang proaktif dan detail-oriented,
                menjunjung tinggi praktik penulisan kode yang bersih dan
                kolaborasi tim. Bagi saya, setiap baris kode adalah jembatan
                menuju inovasi, dan setiap teknologi baru adalah pintu untuk
                memperluas pengetahuan.
              </p>
            </motion.div>

            {/* Stat card */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center gradient-border"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-start">
                  <h2 className="text-6xl md:text-7xl font-black gradient-text">
                    <AnimatedCounter target={totalProjects} />
                  </h2>
                  <Plus className="mt-1 w-8 h-8 text-sky-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                  Project Selesai
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
