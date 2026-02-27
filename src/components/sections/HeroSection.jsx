import { motion } from "framer-motion";
import { FaDownload, FaReact } from "react-icons/fa";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiCodeigniter,
  SiLaravel,
} from "react-icons/si";
import heroFoto from "../../assets/Img/FOTO.png";

export default function HeroSection() {

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* ── Desktop Layout ── */}
      <div className="hidden md:flex relative z-10 min-h-screen max-w-7xl mx-auto px-6 lg:px-8 items-center">
        {/* Left: Text */}
        <motion.div
          className="w-1/2 flex flex-col justify-center pr-12"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3"
          >
            Hai, saya
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            N. Satria Bagass,{" "}
            <span className="gradient-text">S.Kom</span>
          </motion.h1>

          <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                FULLSTACK WEB DEVELOPER
              </h2>
              <div className="flex items-center gap-1.5">
                {[FaReact, SiLaravel, SiCodeigniter].map((Icon, i) => (
                  <div key={i} className="p-1.5 rounded-lg glass-card">
                    <Icon className="text-slate-500 dark:text-slate-400 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-3 mt-8">
            <a
              href="#contact&focus"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Hubungi Sekarang
            </a>
            <a
              href="/CV/Resume.pdf"
              download="Resume_Yourksatra.pdf"
              className="px-6 py-2.5 rounded-xl glass-card font-semibold text-sm text-slate-700 dark:text-slate-300 hover:border-sky-600/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Download CV
              <FaDownload className="text-xs" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          className="w-1/2 flex items-end justify-center relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-br from-sky-600/20 to-blue-500/20 rounded-3xl blur-2xl" />

            <div className="relative overflow-hidden">
              <img
                src={heroFoto}
                alt="Satria Bagas"
                className="h-[75vh] w-auto object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="md:hidden relative z-10 min-h-screen flex flex-col">
        {/* Image top */}
        <motion.div
          className="flex-1 relative flex items-end justify-center pt-20 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-sky-600/15 to-blue-500/15 rounded-2xl blur-xl" />
            <div className="relative overflow-hidden">
              <img
                src={heroFoto}
                alt="Satria Bagas"
                className="h-[45vh] w-auto object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Text bottom */}
        <motion.div
          className="px-6 py-8 space-y-4"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400"
          >
            Hi, saya
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            N. Satria Bagass, <span className="gradient-text">S.Kom</span>
          </motion.h1>

          <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Fullstack Web Developer
            </p>
            <div className="flex items-center gap-1">
              {[FaReact, SiLaravel, SiCodeigniter].map((Icon, i) => (
                <div key={i} className="p-1 rounded-md glass-card">
                  <Icon className="text-slate-500 dark:text-slate-400 text-xs" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-3 pt-2">
            <a
              href="#contact&focus"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 transition-all"
            >
              Hubungi Sekarang
            </a>
            <a
              href="/CV/Resume.pdf"
              download="Resume_Yourksatra.pdf"
              className="px-4 py-2 rounded-xl glass-card font-semibold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-all"
            >
              Download CV
              <FaDownload className="text-xs" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
