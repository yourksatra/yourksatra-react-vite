import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ title, setActivePage }) {
  return (
    <div className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-white/5">
      <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
        <button
          onClick={() => setActivePage("home")}
          className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
        >
          Home
        </button>
        <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
        <span className="font-semibold gradient-text">{title}</span>
      </div>
    </div>
  );
}
