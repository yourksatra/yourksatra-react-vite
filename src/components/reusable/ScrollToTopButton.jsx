import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl glass-card-strong flex items-center justify-center shadow-lg hover:shadow-xl hover:border-indigo-500/30 transition-all duration-200 group"
        >
          <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
