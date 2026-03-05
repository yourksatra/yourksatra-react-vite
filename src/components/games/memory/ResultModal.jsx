import { motion, AnimatePresence } from "framer-motion";

/**
 * ResultModal — end-of-game analytics overlay
 * Props:
 *   isOpen: boolean
 *   isWon: boolean (true = matched all pairs, false = time ran out)
 *   accuracyRate: 0-100
 *   timeLeft: seconds remaining (for bonus score display)
 *   totalMatches: number of matched pairs
 *   totalPairs: total pairs in the deck
 *   onReplay: fn
 *   onBack: fn  (navigate back to GamesSection)
 */
export default function ResultModal({
    isOpen,
    isWon,
    accuracyRate,
    timeLeft,
    totalMatches,
    totalPairs,
    onReplay,
    onBack,
}) {
    const score = totalMatches * 100 + timeLeft * 5;

    const stats = [
        {
            label: "Accuracy Rate",
            value: `${accuracyRate}%`,
            icon: "🎯",
            hint: "Efisiensi memori kamu",
            color: accuracyRate >= 70 ? "text-emerald-400" : "text-orange-400",
        },
        {
            label: "Pasangan Ditemukan",
            value: `${totalMatches} / ${totalPairs}`,
            icon: "🃏",
            hint: "Pasangan cocok",
            color: "text-sky-400",
        },
        {
            label: "Bonus Waktu",
            value: `+${timeLeft * 5} pts`,
            icon: "⚡",
            hint: `${timeLeft}s tersisa × 5 poin`,
            color: "text-yellow-400",
        },
        {
            label: "Total Skor",
            value: score,
            icon: "🏆",
            hint: "Matches×100 + Bonus",
            color: "text-violet-400",
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl border border-sky-500/20"
                        initial={{ scale: 0.85, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <span className="text-6xl block mb-3">
                                {isWon ? "🎉" : "⏰"}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {isWon ? "Luar Biasa!" : "Waktu Habis!"}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                {isWon
                                    ? "Kamu berhasil mencocokkan semua kartu."
                                    : `Kamu mencocokkan ${totalMatches} dari ${totalPairs} pasangan.`}
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-4 text-center"
                                >
                                    <span className="text-2xl block mb-1">{stat.icon}</span>
                                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                                        {stat.label}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">
                                        {stat.hint}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onBack}
                                className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl glass-card text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-sky-600/30 transition-all"
                            >
                                ← Keluar
                            </button>
                            <button
                                onClick={onReplay}
                                className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 transition-all"
                            >
                                🔄 Main Lagi
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
