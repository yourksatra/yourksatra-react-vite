import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMemoryGame from "../../hooks/useMemoryGame";
import useTimer from "../../hooks/useTimer";
import Card from "./memory/Card";
import TimerBar from "./memory/TimerBar";
import ResultModal from "./memory/ResultModal";
import ThemeSwitcher, { THEMES } from "./memory/ThemeSwitcher";

const GAME_DURATION = 75;

/**
 * MemoryGame — Full-page memory card game (Tech Edition)
 * Props:
 *   setActivePage: fn (to navigate back or to home)
 */
export default function MemoryGame({ setActivePage }) {
    // "theme-select" | "playing" | "result"
    const [screen, setScreen] = useState("theme-select");
    const [selectedTheme, setSelectedTheme] = useState(null);

    const theme = selectedTheme ? THEMES[selectedTheme] : null;

    const {
        cards,
        flipCard,
        totalClicks,
        totalMatches,
        totalPairs,
        accuracyRate,
        isWon,
        reset: resetGame,
    } = useMemoryGame(theme?.symbols ?? []);

    const handleTimeUp = () => {
        if (screen === "playing") setScreen("result");
    };

    const {
        timeLeft,
        formatted,
        percentage,
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
    } = useTimer(GAME_DURATION, handleTimeUp);

    // When all pairs matched → stop timer and show result
    useEffect(() => {
        // Only trigger result if the screen is still 'playing' and the game is actually won.
        // We ensure we don't trigger this right after a game is reset (where totalPairs might be 0 momentarily).
        if (isWon && screen === "playing" && totalPairs > 0) {
            stopTimer();
            setScreen("result");
        }
    }, [isWon, screen, stopTimer, totalPairs]);

    const handleThemeStart = (themeKey) => {
        setSelectedTheme(themeKey);
        setScreen("playing");
    };

    // Start timer only when entering the playing screen
    useEffect(() => {
        if (screen === "playing") {
            startTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screen]);

    const handleReplay = () => {
        stopTimer();
        resetTimer();
        resetGame();
        setSelectedTheme(null);
        setScreen("theme-select");
    };

    const handleBackToGames = () => {
        stopTimer();
        resetTimer();
        resetGame();
        setSelectedTheme(null);
        setScreen("theme-select");
        setActivePage("home");
        // Scroll to #games section after navigation
        setTimeout(() => {
            document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <AnimatePresence mode="wait">
            {/* ───── Theme Select ───── */}
            {screen === "theme-select" && (
                <motion.div
                    key="theme-select"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ThemeSwitcher
                        onStart={handleThemeStart}
                        onBack={handleBackToGames}
                        setActivePage={setActivePage}
                    />
                </motion.div>
            )}

            {/* ───── Playing ───── */}
            {screen === "playing" && (
                <motion.div
                    key="playing"
                    className="min-h-[100svh] flex flex-col bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background accents */}
                    <div className="absolute inset-0 dot-pattern opacity-40" />
                    <div className="absolute top-20 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-8 gap-6 min-h-[100svh]">
                        {/* Top bar */}
                        <div className="mt-10 w-full max-w-4xl flex items-center justify-between">
                            <button
                                onClick={handleBackToGames}
                                className="cursor-pointer px-4 py-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-sky-600/30 transition-all"
                            >
                                ← Keluar
                            </button>

                            <div className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-xl">
                                <span className="text-lg">{theme?.icon}</span>
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    {theme?.label}
                                </span>
                            </div>

                            <div className="px-3 py-1.5 glass-card rounded-xl">
                                <span className="text-xs font-bold text-sky-500">
                                    {totalMatches}/{totalPairs} pasang
                                </span>
                            </div>
                        </div>

                        {/* Timer bar */}
                        <div className="w-full max-w-4xl">
                            <TimerBar
                                percentage={percentage}
                                formatted={formatted}
                                danger={percentage <= 25}
                            />
                        </div>

                        {/* Card grid — 6×4 for 12 pairs */}
                        <div className="grid grid-cols-6 gap-2 sm:gap-4 w-full max-w-4xl">
                            {cards.map((card) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    onClick={flipCard}
                                />
                            ))}
                        </div>

                        {/* Click stat */}
                        <p className="text-xs text-slate-400 dark:text-slate-600">
                            Total Klik: <span className="text-slate-500 dark:text-slate-500 font-semibold">{totalClicks}</span>
                            {" · "}
                            Akurasi: <span className="text-sky-500 font-semibold">{accuracyRate}%</span>
                        </p>
                    </div>

                    {/* Result modal (layered on top of playing screen) */}
                    <ResultModal
                        isOpen={screen === "result"}
                        isWon={isWon}
                        accuracyRate={accuracyRate}
                        timeLeft={timeLeft}
                        totalMatches={totalMatches}
                        totalPairs={totalPairs}
                        onReplay={handleReplay}
                        onBack={handleBackToGames}
                    />
                </motion.div>
            )}

            {/* ───── Result (standalone overlay — triggered via isOpen on ResultModal) ───── */}
            {screen === "result" && (
                <motion.div
                    key="result-bg"
                    className="min-h-[100svh] flex flex-col bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 dot-pattern opacity-40" />
                    <div className="absolute top-20 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 -left-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />

                    {/* Card grid (blurred/disabled in background) */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-8 gap-6 opacity-30 pointer-events-none min-h-[100svh]">
                        <div className="grid grid-cols-6 gap-2 sm:gap-4 w-full max-w-4xl">
                            {cards.map((card) => (
                                <Card key={card.id} card={card} onClick={() => { }} />
                            ))}
                        </div>
                    </div>

                    <ResultModal
                        isOpen={true}
                        isWon={isWon}
                        accuracyRate={accuracyRate}
                        timeLeft={timeLeft}
                        totalMatches={totalMatches}
                        totalPairs={totalPairs}
                        onReplay={handleReplay}
                        onBack={handleBackToGames}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
