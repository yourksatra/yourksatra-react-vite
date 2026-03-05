import { motion } from "framer-motion";
import Breadcrumb from "../../reusable/Breadcrumb";

/**
 * Deck themes for the Theme Switcher
 */
export const THEMES = {
    Alphabet: {
        label: "Alphabet",
        description: "Good for beginners",
        icon: "🆎",
        symbols: ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST", "UV", "WX"],
    },
    Binaries: {
        label: "Binaries",
        description: "You're here for a challenge",
        icon: "⁉️",
        symbols: ["10000", "10001", "10010", "10011", "10100", "10101", "10110", "10111", "11000", "11001", "11010", "11011"],
    },
    Iconify: {
        label: "Icons",
        description: "You here, cuz you're weak",
        icon: "⚙️",
        symbols: ["🐍", "🗄️", "🐘", "🐙", "🛢️", "☁️", "🐳", "🔒", "🧬", "📡", "🔗", "🗝️"],
    },
};

/**
 * ThemeSwitcher — pre-game screen to pick card deck
 * Props:
 *   onStart: fn(theme: string)
 *   onBack: fn  (back to GamesSection)
 */
export default function ThemeSwitcher({ onStart, onBack }) {
    return (
        <div className="min-h-[100svh] flex flex-col bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 dot-pattern opacity-40" />
            <div className="absolute top-20 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />

            <div className="w-full mt-16 z-20 relative">
                <Breadcrumb title="Memory Matrix" setActivePage={onBack} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">
                        Memory Matrix · Tech Edition
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                        🧩 Pilih Tema Deck
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                        Setiap deck berisi ikon dari dunia teknologi. Pilih favoritmu dan mulai game!
                    </p>
                </motion.div>

                {/* Theme cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
                    {Object.entries(THEMES).map(([key, theme], i) => (
                        <motion.button
                            key={key}
                            onClick={() => onStart(key)}
                            className="glass-card gradient-border rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-600/10 transition-all duration-300 cursor-pointer group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                        >
                            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {theme.icon}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                {theme.label}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                {theme.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-1">
                                {theme.symbols.slice(0, 4).map((s, idx) => (
                                    <span
                                        key={idx}
                                        className="text-lg px-1.5 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-600/10"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Tags */}
                <motion.div
                    className="flex gap-2 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    {["Memori", "Strategi", "Kognitif Thinking"].map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-600/10 text-sky-600 dark:text-sky-400 font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
