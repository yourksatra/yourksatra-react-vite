"use client";
import { useState } from "react";
import StartModal from "../reusable/StartModal";
import KraepelinGame from "../games/KraepelinGame";

export default function GamesSection() {
  const [showModal, setShowModal] = useState(false);
  const [gameConfig, setGameConfig] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = (time, layout) => {
    setGameConfig({ duration: time, layout });
    setIsPlaying(true);
    setShowModal(false);
  };

  const handleGameEnd = (result) => {
    console.log("Hasil akhir game:", result);
    setIsPlaying(false);
    setGameConfig(null);
  };

  return (
    <section
      id="games"
      className="min-h-[100svh] flex flex-col bg-white dark:bg-gray-900 border-t border-sky-500 transition-colors duration-100 relative"
    >
      {/* Heading Section */}
      <div className="w-full text-center pt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
          Game&apos;s
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base"
        >
          Ayo bermain untuk mengisi waktu luang dan melatih fokus.
        </p>
      </div>

      {/* Game Box */}
      <div className="flex-1 flex justify-center items-start mt-5 px-2 mb:px-0">
        {!isPlaying ? (
          <div
            className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Tes Koran (Kraepelin Test)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
              Latih kecepatan, ketelitian, keajegan, dan ketahanan kamu dengan
              menjumlahkan dua angka secara cepat dan tepat.
            </p>
            <button
              className="cursor-pointer bg-sky-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-sky-400 transition"
              onClick={() => setShowModal(true)}
            >
              Play
            </button>
          </div>
        ) : (
          <KraepelinGame
            duration={gameConfig.duration}
            layout={gameConfig.layout}
            onEnd={handleGameEnd}
          />
        )}
      </div>

      <StartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStart={handleStart}
      />
    </section>
  );
}