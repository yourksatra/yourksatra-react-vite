// src/components/ScrollToTopButton.jsx
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Mendeteksi posisi scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 z-50 rounded-full bg-sky-500 p-3 shadow-lg transition hover:bg-sky-600"
        >
          <ArrowUp className="text-white dark:text-gray-900 w-5 h-5" />
        </button>
      )}
    </>
  );
}
