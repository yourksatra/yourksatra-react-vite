import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useExperience from "../../hooks/useExperience";

export default function Experience({ jmlhdisplay, onSeeMore }) {
  const { experiences } = useExperience();
  const [selected, setSelected] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const modalContentRef = useRef(null);
  const intervalRef = useRef(null);

  const sorted = experiences;

  const displayList = sorted.slice(0, jmlhdisplay || sorted.length);

  useEffect(() => {
    if (selected === null) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    const len = (displayList[selected]?.Img || []).length;
    if (len <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImg((p) => (p + 1) % len);
    }, 30000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selected]);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setCurrentImg(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handlePrev = () => {
    if (selected === null) return;
    const len = displayList[selected]?.Img?.length || 1;
    setCurrentImg((p) => (p === 0 ? len - 1 : p - 1));
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  const handleNext = () => {
    if (selected === null) return;
    const len = displayList[selected]?.Img?.length || 1;
    setCurrentImg((p) => (p + 1) % len);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  const handleBackdropClick = (e) => {
    if (!modalContentRef.current) { setSelected(null); return; }
    if (!modalContentRef.current.contains(e.target)) setSelected(null);
  };

  return (
    <section id="experience">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-3 md:gap-3 w-full">
        {displayList.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative cursor-pointer overflow-hidden rounded-xl group"
            onClick={() => { setSelected(idx); setCurrentImg(0); }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            {exp.Img && exp.Img.length > 0 ? (
              <img
                src={`/pengalaman/${exp.directory}/${exp.Img[0]}`}
                alt={exp.title}
                className="w-full h-44 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-44 md:h-72 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-slate-400 font-semibold text-sm">{exp.organizer}</p>
                  <p className="text-slate-500 text-xs mt-1">{exp.title}</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-semibold text-sm">{exp.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && displayList[selected] && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-6"
          onMouseDown={handleBackdropClick}
          onTouchStart={handleBackdropClick}
        >
          <div
            ref={modalContentRef}
            className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-xl md:max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={() => setSelected(null)}
              className="cursor-pointer absolute top-3 right-3 p-2 rounded-full glass-card-strong z-20 hover:bg-white/20 transition"
              aria-label="Close modal"
            >
              <X size={18} className="text-slate-700 dark:text-slate-200" />
            </button>

            {/* Slideshow */}
            <div className="relative flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
              {(displayList[selected].Img || []).length > 0 ? (
                <>
                  <img
                    src={`/pengalaman/${displayList[selected].directory}/${displayList[selected].Img[currentImg]}`}
                    alt={displayList[selected].caption?.[currentImg] || ""}
                    className="w-full h-44 md:w-full md:h-[60vh] object-contain rounded-lg"
                  />
                  <p className="absolute text-xs bottom-0 left-1 right-1 md:bottom-3 md:left-4 md:right-4 md:text-sm text-white bg-black/50 backdrop-blur-sm rounded-lg text-center py-1 px-2">
                    {displayList[selected].caption?.[currentImg] || ""}
                  </p>
                  {displayList[selected].Img.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition"
                        aria-label="Next"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-44 md:h-[60vh] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-slate-400 font-semibold">{displayList[selected].organizer}</p>
                    <p className="text-slate-500 text-sm mt-1">{displayList[selected].title}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 md:p-8 overflow-y-auto text-sm md:text-base">
              <h3 className="text-lg md:text-2xl font-bold mb-3 gradient-text">
                {displayList[selected].title}
              </h3>
              <div className="flex flex-col mb-3 text-slate-600 dark:text-slate-300">
                <div className="font-medium text-slate-800 dark:text-slate-200">
                  {displayList[selected].organizer}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {displayList[selected].location}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {displayList[selected].type === "period"
                    ? `${displayList[selected].startDate} s.d ${displayList[selected].endDate ?? ""}`
                    : displayList[selected].date}
                </div>
              </div>
              <p className="text-justify text-slate-700 dark:text-slate-300 leading-relaxed">
                {displayList[selected].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {displayList.length < 7 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={onSeeMore}
            className="cursor-pointer px-8 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Lihat lainnya..
          </button>
        </div>
      )}
    </section>
  );
}
