import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  // images list
  const images =
    project.images && project.images.total > 1
      ? Array.from({ length: project.images.total }, (_, i) => `${i + 1}.png`)
      : project.images && project.images.thumbnail
      ? [project.images.thumbnail]
      : ["1.png"];

  const getImagePath = (img) => `/projectFile/${project.images.folder}/${img}`;

  // Auto slideshow
  useEffect(() => {
    if (images.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 15000);
    }
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  // ESC close & arrow navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  const handleBackdrop = (e) => {
    if (!modalRef.current.contains(e.target)) onClose();
  };

  // Scroll indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
      onMouseDown={handleBackdrop}
      onTouchStart={handleBackdrop}
    >
      <div
        ref={modalRef}
        className="relative max-w-6xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
      >
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 cursor-pointer"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        {/* === DESKTOP VIEW === */}
        <div className="hidden md:grid md:grid-cols-2 gap-2">
          <div className="relative flex flex-col items-center justify-between bg-gray-100 dark:bg-gray-900 p-4">
            {/* Main Image */}
            <div className="relative w-full h-auto aspect-video overflow-hidden rounded-lg">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={getImagePath(img)}
                  alt={`${project.title}-${i}`}
                  className={`absolute inset-0 w-full h-auto object-cover transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full cursor-pointer"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full cursor-pointer"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Preview / Button */}
            {images.length > 1 ? (
              <div className="w-full flex items-center justify-center">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex gap-2 overflow-x-auto scrollbar-hide"
                >
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={getImagePath(img)}
                      alt={`thumb-${i}`}
                      onClick={() => setIndex(i)}
                      className={`w-28 h-15 rounded-md object-cover cursor-pointer border ${
                        i === index
                          ? "border-sky-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              project.button?.active && (
                <a
                  href={project.button.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-3 rounded-lg bg-sky-500 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  {project.button.title || "Buka Sumber"} <FaExternalLinkAlt />
                </a>
              )
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold text-sky-500 mb-3 border-b border-gray-300 pb-1">
              {project.title}
            </h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm mb-6 text-justify">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techInformation?.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* === MOBILE VIEW === */}
        <div className="flex flex-col md:hidden p-4">
          <h3 className="text-xl font-bold text-center text-sky-500  pb-1 mb-3">
            {project.title}
          </h3>

          <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={getImagePath(img)}
                alt={`${project.title}-${i}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full cursor-pointer"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full cursor-pointer"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          <p className="text-sm text-gray-800 dark:text-gray-200 text-justify mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techInformation?.map((t, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {t}
              </span>
            ))}
          </div>

          {project.button?.active && (
            <a
              href={project.button.link}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-3 rounded-lg bg-sky-500 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {project.button.title || "Buka Sumber"} <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}