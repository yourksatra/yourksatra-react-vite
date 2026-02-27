"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartModal from "../reusable/StartModal";
import KraepelinGame from "../games/KraepelinGame";

// ── Game Registry ──────────────────────────────────────────────
// Untuk menambahkan game baru, cukup tambahkan objek ke array ini
// dan import komponen game-nya. Tidak perlu ubah layout/UI section.
const gameRegistry = [
  {
    id: "kraepelin",
    title: "Tes Koran (Kraepelin)",
    description:
      "Latih kecepatan, ketelitian, keajegan, dan ketahanan dengan menjumlahkan dua angka secara cepat dan tepat.",
    icon: "🧠",
    tags: ["Fokus", "Matematika", "Kecepatan"],
    component: "kraepelin",
    hasConfig: true,
  },
  // Contoh slot kosong untuk game berikutnya (hapus comment ini saat ditambah):
  // {
  //   id: "memory",
  //   title: "Memory Match",
  //   description: "...",
  //   icon: "🃏",
  //   tags: ["Memori", "Strategi"],
  //   component: "memory",
  //   hasConfig: false,
  // },
];

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameConfig, setGameConfig] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardClick = (game) => {
    setActiveGame(game);
    if (game.hasConfig) {
      setShowModal(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handleStart = (time, layout) => {
    setGameConfig({ duration: time, layout });
    setIsPlaying(true);
    setShowModal(false);
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    setGameConfig(null);
    setActiveGame(null);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="games"
      className="relative min-h-[100svh] flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-20 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Section heading */}
      <motion.div
        className="relative z-10 w-full text-center pt-16 md:pt-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
          Mini Games
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Game&apos;s
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
          Ayo bermain untuk mengisi waktu luang dan melatih fokus.
        </p>
      </motion.div>

      {/* Game Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-start items-center mt-10 pb-16 px-4">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div
              key="game-grid"
              className="w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Game Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gameRegistry.map((game, i) => (
                  <motion.div
                    key={game.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="glass-card rounded-2xl p-6 gradient-border glow-shadow flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleCardClick(game)}
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-4">{game.icon}</div>

                    {/* Title & Desc */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                      {game.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                      {game.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {game.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Play Button */}
                    <button className="cursor-pointer w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all duration-200">
                      ▶ Play
                    </button>
                  </motion.div>
                ))}

                {/* Coming Soon placeholder — selalu tampil */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={gameRegistry.length}
                  className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed min-h-52"
                >
                  <span className="text-4xl mb-3 opacity-40">🎮</span>
                  <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    Coming Soon
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
                    Game baru segera hadir
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-play"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeGame?.component === "kraepelin" && (
                <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
                  <button
                    onClick={handleGameEnd}
                    className="self-start cursor-pointer px-4 py-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-indigo-500/30 transition-all"
                  >
                    ← Kembali ke Game List
                  </button>
                  <KraepelinGame
                    duration={gameConfig?.duration}
                    layout={gameConfig?.layout}
                    onEnd={handleGameEnd}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStart={handleStart}
      />
    </section>
  );
}
