import { motion } from "framer-motion";

/**
 * Card — Individual memory card with 3D CSS flip animation
 * Props:
 *   card: { id, symbol, isFlipped, isMatched }
 *   onClick: fn
 */
export default function Card({ card, onClick }) {
    const { symbol, isFlipped, isMatched } = card;

    return (
        <motion.div
            className="relative cursor-pointer select-none"
            style={{ perspective: "1000px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => !isMatched && onClick(card.id)}
        >
            {/* Flip wrapper */}
            <div
                className="relative w-full transition-transform duration-500"
                style={{
                    paddingBottom: "100%",
                    transformStyle: "preserve-3d",
                    transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Back (hidden) */}
                <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center glass-card border border-sky-500/20 bg-slate-800/60"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <span className="text-3xl opacity-40 text-sky-400">?</span>
                </div>

                {/* Front (revealed) */}
                <div
                    className={`absolute inset-0 rounded-2xl flex items-center justify-center
            ${isMatched
                            ? "bg-gradient-to-br from-emerald-500/30 to-green-600/20 border border-emerald-400/40 shadow-lg shadow-emerald-500/20"
                            : "bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/40"
                        }
          `}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <span className="lg:text-4xl text-2xl drop-shadow-md">{symbol}</span>
                    {isMatched && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-emerald-400/60"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
