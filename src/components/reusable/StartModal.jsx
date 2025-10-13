"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StartModal({ isOpen, onClose, onStart }) {
  const [selectedTime, setSelectedTime] = useState(1);
  const [keyboardLayout, setKeyboardLayout] = useState("123");

  const times = [1, 2, 5];
  const layouts = [
    { value: "123", label: "123" },
    { value: "789", label: "789" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 mx-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-sky-500 mb-2 text-center">
              Tes Koran
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 text-justify">
              Pilih waktu dan tata letak keyboard sebelum memulai. Jumlahkan dua angka yang ditampilkan dan pilih/klik angka belakangnya saja. Contoh: <br /> 9+5=14 klik angka 4 <br /> 1+5=6 klik angka 6
            </p>

            {/* Pilih Waktu */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm font-medium">
                Pilih Durasi Tes
              </label>
              <div className="flex gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`cursor-pointer flex-1 py-2 rounded-lg font-medium border transition ${
                      selectedTime === time
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {time} Menit
                  </button>
                ))}
              </div>
            </div>

            {/* Pilih Layout Keyboard */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm font-medium">
                Pilih Layout Keyboard
              </label>
              <div className="flex gap-2">
                {layouts.map((layout) => (
                  <button
                    key={layout.value}
                    onClick={() => setKeyboardLayout(layout.value)}
                    className={`cursor-pointer flex-1 py-2 rounded-lg font-medium border transition ${
                      keyboardLayout === layout.value
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Batal
              </button>
              <button
                onClick={() => onStart(selectedTime, keyboardLayout)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-400 transition"
              >
                Mulai
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}