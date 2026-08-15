import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import { SiLaravel, SiNodedotjs, SiMysql, SiPhp } from "react-icons/si";
import useProfile from "../../hooks/useProfile";

/* ────────────────────────────────────────────
   Test Terminal — overlapping mini terminal
   Shows `php artisan test` output
   ──────────────────────────────────────────── */
function TestTerminal() {
  const lines = [
    { text: "$ php artisan test", cls: "text-green-400 font-medium" },
    { text: "", cls: "" },
    { text: "  PASS  Tests\\Unit\\AuctionServiceTest", cls: "text-green-400 font-medium" },
    { text: "  ✓ can place bid successfully ............ 0.12s", cls: "text-green-300" },
    { text: "  ✓ validates bid amount .................. 0.08s", cls: "text-green-300" },
    { text: "  ✓ prevents duplicate bids ............... 0.05s", cls: "text-green-300" },
    { text: "", cls: "" },
    { text: "  Tests:  3 passed (3 assertions)", cls: "text-white font-medium" },
    { text: "  Time:   0.45s", cls: "text-slate-400" },
  ];

  return (
    <div className="code-terminal shadow-xl w-64 lg:w-72">
      <div className="code-terminal-bar !py-2.5 !px-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-[10px] text-slate-500 font-medium tracking-wide">
          Terminal
        </span>
      </div>
      <div className="p-3 text-[10px] lg:text-[11px] leading-[1.7]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 + i * 0.12, duration: 0.25 }}
            className={`whitespace-pre min-h-[1.4em] ${line.cls}`}
          >
            {line.text || "\u00A0"}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Code Terminal — main AuctionService.php
   ──────────────────────────────────────────── */
function CodeTerminal() {
  const codeLines = [
    <span className="text-slate-500">{"// AuctionService.php"}</span>,
    null,
    <>
      <span className="text-purple-400">{"class "}</span>
      <span className="text-yellow-300">{"AuctionService"}</span>
    </>,
    <span className="text-cyan-300">{"{"}</span>,
    <>
      <span className="text-slate-600">{"    "}</span>
      <span className="text-purple-400">{"public function "}</span>
      <span className="text-blue-300">{"placeBid"}</span>
      <span className="text-cyan-300">{"("}</span>
      <span className="text-purple-400">{"array "}</span>
      <span className="text-orange-300">{"$data"}</span>
      <span className="text-cyan-300">{"): "}</span>
      <span className="text-yellow-300">{"Bid"}</span>
    </>,
    <>
      <span className="text-slate-600">{"    "}</span>
      <span className="text-cyan-300">{"{"}</span>
    </>,
    <>
      <span className="text-slate-600">{"        "}</span>
      <span className="text-purple-400">{"return "}</span>
      <span className="text-yellow-300">{"DB"}</span>
      <span className="text-cyan-300">{"::"}</span>
      <span className="text-blue-300">{"transaction"}</span>
      <span className="text-cyan-300">{"("}</span>
      <span className="text-purple-400">{"function "}</span>
      <span className="text-cyan-300">{"() {"}</span>
    </>,
    <>
      <span className="text-slate-600">{"            "}</span>
      <span className="text-orange-300">{"$auction"}</span>
      <span className="text-cyan-300">{" = "}</span>
      <span className="text-yellow-300">{"Auction"}</span>
      <span className="text-cyan-300">{"::"}</span>
      <span className="text-blue-300">{"lockForUpdate"}</span>
      <span className="text-cyan-300">{"()"}</span>
    </>,
    <>
      <span className="text-slate-600">{"                "}</span>
      <span className="text-cyan-300">{"->"}</span>
      <span className="text-blue-300">{"findOrFail"}</span>
      <span className="text-cyan-300">{"("}</span>
      <span className="text-orange-300">{"$data"}</span>
      <span className="text-cyan-300">{"["}</span>
      <span className="text-green-400">{"'id'"}</span>
      <span className="text-cyan-300">{"]);"}</span>
    </>,
    null,
    <>
      <span className="text-slate-600">{"            "}</span>
      <span className="text-purple-400">{"return "}</span>
      <span className="text-orange-300">{"$auction"}</span>
      <span className="text-cyan-300">{"->"}</span>
      <span className="text-blue-300">{"bids"}</span>
      <span className="text-cyan-300">{"()->"}</span>
      <span className="text-blue-300">{"create"}</span>
      <span className="text-cyan-300">{"(["}</span>
    </>,
    <>
      <span className="text-slate-600">{"                "}</span>
      <span className="text-green-400">{"'user_id'"}</span>
      <span className="text-cyan-300">{" => "}</span>
      <span className="text-blue-300">{"auth"}</span>
      <span className="text-cyan-300">{"()->"}</span>
      <span className="text-blue-300">{"id"}</span>
      <span className="text-cyan-300">{"(),"}</span>
    </>,
    <>
      <span className="text-slate-600">{"                "}</span>
      <span className="text-green-400">{"'amount'"}</span>
      <span className="text-cyan-300">{"  => "}</span>
      <span className="text-orange-300">{"$data"}</span>
      <span className="text-cyan-300">{"["}</span>
      <span className="text-green-400">{"'amount'"}</span>
      <span className="text-cyan-300">{"],"}</span>
    </>,
    <>
      <span className="text-slate-600">{"            "}</span>
      <span className="text-cyan-300">{"]);"}</span>
    </>,
    <>
      <span className="text-slate-600">{"        "}</span>
      <span className="text-cyan-300">{"});"}</span>
    </>,
    <>
      <span className="text-slate-600">{"    "}</span>
      <span className="text-cyan-300">{"}"}</span>
    </>,
    <span className="text-cyan-300">{"}"}</span>,
  ];

  return (
    <div className="code-terminal shadow-2xl w-full max-w-lg">
      <div className="code-terminal-bar">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs text-slate-500 font-medium tracking-wide">
          AuctionService.php
        </span>
      </div>
      <div className="p-5 text-[12.5px] md:text-[13px] leading-[1.8]">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.35, ease: "easeOut" }}
            className="whitespace-pre min-h-[1.8em]"
          >
            {line}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 + codeLines.length * 0.1 + 0.4 }}
          className="inline-block w-[8px] h-[16px] bg-sky-400/80 cursor-blink mt-1 rounded-sm"
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Hero Section
   ──────────────────────────────────────────── */
export default function HeroSection() {
  const profile = useProfile();
  const status = profile.statusBadge;
  const [frontTerminal, setFrontTerminal] = useState("test"); // "code" | "test"

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.13, duration: 0.6, ease: "easeOut" },
    }),
  };

  const techIcons = [SiPhp, SiLaravel, SiNodedotjs, SiMysql];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-60" />

      {/* Gradient orbs — animated */}
      <div className="hidden md:block absolute top-20 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl animate-float-slow" />
      <div className="hidden md:block absolute bottom-20 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse" />

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-sky-600/10 rounded-2xl rotate-12 animate-float-slow hidden lg:block" />
      <div className="absolute bottom-1/3 left-[15%] w-16 h-16 border border-blue-500/10 rounded-xl -rotate-6 animate-float-reverse hidden lg:block" />
      <div className="absolute top-1/2 right-[15%] w-8 h-8 bg-sky-600/5 rounded-lg rotate-45 animate-float-slow hidden lg:block" />

      {/* ── Desktop Layout ── */}
      <div className="hidden md:flex relative z-10 min-h-screen max-w-7xl mx-auto px-6 lg:px-8 items-center gap-8 lg:gap-12">
        {/* Left: Text */}
        <motion.div
          className="w-1/2 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
        >
          {/* Dynamic status badge */}
          <motion.div variants={fadeUp} custom={0} className="mb-5">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium ${
                status.active
                  ? "text-slate-600 dark:text-slate-400"
                  : "text-sky-600 dark:text-sky-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status.active
                    ? "bg-green-500 status-dot"
                    : "bg-sky-500 animate-pulse"
                }`}
              />
              {status.text}
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-sm font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3"
          >
            {profile.greeting}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={2}
            className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            {profile.name},{" "}
            <span className="gradient-text">{profile.degree}</span>
          </motion.h1>

          <motion.div variants={fadeUp} custom={3} className="mt-5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                {profile.title}
              </h2>
              <div className="flex items-center gap-1.5">
                {techIcons.map((Icon, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg glass-card hover:scale-110 transition-transform duration-200"
                  >
                    <Icon className="text-slate-500 dark:text-slate-400 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed"
          >
            {profile.description}{" "}
            {profile.specialties.map((s, i) => (
              <span key={i}>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{s}</span>
                {i < profile.specialties.length - 1 ? " · " : ""}
              </span>
            ))}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="flex items-center gap-3 mt-8"
          >
            <a
              href="#portfolio"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Lihat Project
              <FaArrowRight className="text-xs" />
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFilename}
              className="px-6 py-2.5 rounded-xl glass-card font-semibold text-sm text-slate-700 dark:text-slate-300 hover:border-sky-600/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Download CV
              <FaDownload className="text-xs" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Stacked Terminals — click to swap front/back */}
        <div className="w-1/2 relative flex items-center justify-center top-5">
          {/* Glow behind terminals */}
          <div className="absolute -inset-8 bg-gradient-to-br from-sky-600/15 to-blue-500/15 rounded-3xl blur-2xl" />
          <div className="absolute -inset-4 animate-shimmer rounded-3xl" />

          {/* Terminal stack container */}
          <div className="relative">
            {/* Code terminal — anchors layout */}
            <motion.div
              className="relative end-3 cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: frontTerminal === "code" ? 1.02 : 1,
                zIndex: frontTerminal === "code" ? 20 : 10,
              }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              onClick={() => setFrontTerminal("code")}
              whileHover={{ scale: frontTerminal === "code" ? 1.02 : 1.01 }}
              style={{ filter: frontTerminal === "code" ? "none" : "brightness(0.85)" }}
            >
              <CodeTerminal />
            </motion.div>

            {/* Test terminal — overlapping floating-right */}
            <motion.div
              className="absolute mt-35 -top-0 -right-10 lg:-right-18 cursor-pointer hidden lg:block"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: frontTerminal === "test" ? 1.02 : 0.97,
                zIndex: frontTerminal === "test" ? 20 : 10,
              }}
              transition={{ duration: 0.4, delay: 2.5, ease: "easeOut" }}
              onClick={() => setFrontTerminal("test")}
              whileHover={{ scale: frontTerminal === "test" ? 1.02 : 1.0 }}
              style={{ filter: frontTerminal === "test" ? "none" : "brightness(0.85)" }}
            >
              <TestTerminal />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="md:hidden relative z-10 min-h-screen flex flex-col justify-center px-5 py-16">
        <motion.div
          className="w-full bg-slate-900 dark:bg-[#0d1117] border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-slate-800/80 dark:bg-[#161b22] border-b border-slate-700/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <p className="flex-1 text-center text-[10px] font-mono text-slate-400 font-medium tracking-widest uppercase">
              guest@yourksatra:~
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs sm:text-sm">
            {/* Command 1: whoami */}
            <motion.div variants={fadeUp} custom={0}>
              <p className="text-slate-300">
                <span className="text-emerald-400 font-semibold">guest</span>
                <span className="text-slate-500">:</span>
                <span className="text-blue-400 font-semibold">~</span>
                <span className="text-slate-300">$ </span>
                <span className="text-white">whoami</span>
              </p>
              <p className="mt-2 text-slate-400 font-sans">
                <span className="text-xl sm:text-2xl font-bold text-slate-100">{profile.name}, </span>
                <span className="text-lg sm:text-xl font-bold text-sky-400">{profile.degree}</span>
              </p>
            </motion.div>

            {/* Command 2: role */}
            <motion.div variants={fadeUp} custom={1} className="mt-5">
              <p className="text-slate-300">
                <span className="text-emerald-400 font-semibold">guest</span>
                <span className="text-slate-500">:</span>
                <span className="text-blue-400 font-semibold">~</span>
                <span className="text-slate-300">$ </span>
                <span className="text-white">cat role.txt</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-base sm:text-lg font-bold text-sky-300 tracking-wide font-sans">{profile.title}</p>
                <div className="flex items-center gap-1.5 ml-1 border-l border-slate-700 pl-2">
                  {techIcons.map((Icon, i) => (
                    <Icon key={i} className="text-slate-400 text-sm" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Command 3: status */}
            <motion.div variants={fadeUp} custom={2} className="mt-5">
              <p className="text-slate-300">
                <span className="text-emerald-400 font-semibold">guest</span>
                <span className="text-slate-500">:</span>
                <span className="text-blue-400 font-semibold">~</span>
                <span className="text-slate-300">$ </span>
                <span className="text-white">systemctl status</span>
              </p>
              <div className="mt-2 flex items-start gap-2">
                <span className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${status.active ? "bg-green-500 status-dot" : "bg-sky-500 animate-pulse"}`} />
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  <span className={status.active ? "text-green-400 font-medium" : "text-sky-400 font-medium"}>
                    [{status.text}]
                  </span>
                  <br />
                  <span className="text-slate-500">{profile.description}</span>
                </p>
              </div>
            </motion.div>

            {/* Cursor */}
            <motion.div variants={fadeUp} custom={3} className="mt-6 flex items-center gap-1">
              <span className="text-emerald-400 font-semibold">guest</span>
              <span className="text-slate-500">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-slate-300">$ </span>
              <span className="w-2 h-4 bg-sky-400 cursor-blink ml-1" />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="mt-6 grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="#portfolio"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 active:scale-95 transition-transform"
          >
            Lihat Project
            <FaArrowRight className="text-[10px]" />
          </a>
          <a
            href={profile.resumeUrl}
            download={profile.resumeFilename}
            className="w-full py-3.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-300 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Download CV
            <FaDownload className="text-[10px]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
