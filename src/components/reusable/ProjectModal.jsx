import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const hasImages = project.images && project.images.thumbnail;
  const images =
    hasImages && project.images.total > 1
      ? Array.from({ length: project.images.total }, (_, i) => `${i + 1}.png`)
      : hasImages
        ? [project.images.thumbnail]
        : []; // empty array for no images

  const getImagePath = (img) =>
    hasImages ? `/projectFile/${project.images.folder}/${img}` : "";

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

  const [scrollProgress, setScrollProgress] = useState(0);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onMouseDown={handleBackdrop}
      onTouchStart={handleBackdrop}
    >
      <div
        ref={modalRef}
        className="relative max-w-6xl w-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full glass-card-strong cursor-pointer hover:bg-white/20 transition"
          aria-label="Tutup"
        >
          <X size={18} className="text-slate-700 dark:text-slate-200" />
        </button>

        {/* === DESKTOP VIEW === */}
        <div className="hidden md:grid md:grid-cols-2">
          <div className="relative flex flex-col items-center justify-between bg-slate-100 dark:bg-slate-900 p-4">
            {/* Main Image */}
            <div className="relative w-full h-auto aspect-video overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {images.length > 0 ? (
                <>
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={getImagePath(img)}
                      alt={`${project.title}-${i}`}
                      className={`absolute inset-0 w-full h-[50svh] object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  ))}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full cursor-pointer hover:bg-black/60 transition"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={() => setIndex((i) => (i + 1) % images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full cursor-pointer hover:bg-black/60 transition"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent blur-xl"></div>
                   <span className="text-slate-500 font-mono text-lg tracking-widest uppercase">Private Repository</span>
                </div>
              )}
            </div>

            {/* Thumbnails / Button */}
            <div className="w-full my-2 rounded-lg">
              {images.length > 1 ? (
                <div className="w-full flex items-center justify-center">
                  <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-2 overflow-x-auto"
                  >
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={getImagePath(img)}
                        alt={`thumb-${i}`}
                        onClick={() => setIndex(i)}
                        className={`w-24 h-14 rounded-lg object-cover cursor-pointer border-2 mb-1 transition-all duration-200 ${i === index
                          ? "border-sky-600 shadow-md shadow-sky-600/20"
                          : "border-transparent opacity-60 hover:opacity-100"
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
                    className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-600/20 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {project.button.title || "Buka Sumber"}{" "}
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.techInformation?.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-lg glass-card font-medium text-slate-600 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.button?.active && images.length > 1 && (
              <a
                href={project.button.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                {project.button.title || "Buka Sumber"}{" "}
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </div>

        {/* === MOBILE VIEW === */}
        <div className="flex flex-col md:hidden p-4">
          <h3 className="text-xl font-bold text-center gradient-text pb-2 mb-3">
            {project.title}
          </h3>

          <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            {images.length > 0 ? (
              <>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={getImagePath(img)}
                    alt={`${project.title}-${i}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                      }`}
                  />
                ))}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setIndex((i) => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent blur-xl"></div>
                   <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">Private Repository</span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techInformation?.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-lg glass-card font-medium text-slate-600 dark:text-slate-300"
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
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {project.button.title || "Buka Sumber"} <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
