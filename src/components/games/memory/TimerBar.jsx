/**
 * TimerBar — Visual countdown progress bar
 * Props:
 *   percentage: 0-100 (100 = full, 0 = empty)
 *   formatted: "MM:SS" string
 *   danger: boolean (< 25% remaining)
 */
export default function TimerBar({ percentage, formatted, danger }) {
    return (
        <div className="w-full mx-auto">
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    ⏱ Waktu
                </span>
                <span
                    className={`text-xl font-bold tabular-nums transition-colors duration-500 ${danger ? "text-rose-500" : "text-sky-500"
                        }`}
                >
                    {formatted}
                </span>
            </div>

            {/* Bar track */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${danger
                        ? "bg-gradient-to-r from-rose-500 to-orange-400"
                        : "bg-gradient-to-r from-sky-500 to-blue-500"
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
