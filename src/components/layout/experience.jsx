// components/Experience.jsx
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import data from "../../assets/data/experience.json";

export default function Experience({ jmlhdisplay, onSeeMore }) {
  const [selected, setSelected] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const modalContentRef = useRef(null);
  const intervalRef = useRef(null);

  // 1) Sort data berdasarkan tanggal (newest -> oldest)
  const sorted = (data?.experience || []).slice().sort((a, b) => {
    const getDateKey = (item) => {
      try {
        if (item.type === "period") {
          const d = item.endDate || item.startDate;
          return d ? new Date(d.length === 7 ? d + "-01" : d) : new Date(0);
        }
        if (item.type === "onetime") {
          return item.date ? new Date(item.date) : new Date(0);
        }
        return new Date(0);
      } catch {
        return new Date(0);
      }
    };
    return getDateKey(b) - getDateKey(a);
  });

  const displayList = sorted.slice(0, jmlhdisplay || sorted.length);

  useEffect(() => {
    if (selected === null) return;
    // clear existing
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handlePrev = () => {
    if (selected === null) return;
    const len = displayList[selected]?.Img?.length || 1;
    setCurrentImg((p) => (p === 0 ? len - 1 : p - 1));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    if (selected === null) return;
    const len = displayList[selected]?.Img?.length || 1;
    setCurrentImg((p) => (p + 1) % len);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleBackdropClick = (e) => {
    if (!modalContentRef.current) {
      setSelected(null);
      return;
    }
    if (!modalContentRef.current.contains(e.target)) {
      setSelected(null);
    }
  };

  return (
    <section id="experience">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 w-full">
        {displayList.map((exp, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer overflow-hidden rounded-sm group"
            onClick={() => {
              setSelected(idx);
              setCurrentImg(0);
            }}
          >
            <img
              data-aos="fade-up"
              data-aos-delay="200"
              src={`/pengalaman/${exp.directory}/${exp.Img[0]}`}
              alt={exp.title}
              className="w-full h-45 md:h-80 border border-sky-500 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white font-semibold">Lihat detail</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && displayList[selected] && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-6"
          onMouseDown={handleBackdropClick}
          onTouchStart={handleBackdropClick}
        >
          <div
            ref={modalContentRef}
            className="bg-white dark:bg-gray-800 rounded-md w-full max-w-xl
            md:max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={() => setSelected(null)}
              className="cursor-pointer absolute top-3 right-3 p-2 rounded-full text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-700/60 z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Slideshow kiri */}
            <div className="relative flex items-center justify-center bg-black/5 p-4">
              <img
                src={`/pengalaman/${displayList[selected].directory}/${displayList[selected].Img[currentImg]}`}
                alt={displayList[selected].caption?.[currentImg] || ""}
                className="w-full h-45 md:w-full md:h-[60vh] object-contain"
              />
              {/* caption */}
              <p className="absolute text-xs bottom-0 left-1 right-1 md:bottom-3 md:left-4 md:right-4 md:text-sm text-white bg-gray-600 rounded-sm text-center">
                {displayList[selected].caption?.[currentImg] || ""}
              </p>

              {/* prev/next */}
              {(displayList[selected].Img || []).length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Info kanan */}
            <div className="p-4 md:p-6 overflow-y-auto text-sm md:text-base">
              <h3 className="text-lg md:text-2xl font-bold mb-2 text-sky-500">
                {displayList[selected].title}
              </h3>
              <div className="flex flex-col mb-2 text-gray-700 dark:text-gray-300">
                <div className="font-medium">
                  {displayList[selected].organizer}
                </div>
                <div className="text-sm text-gray-500">
                  {displayList[selected].location}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {displayList[selected].type === "period"
                    ? `${displayList[selected].startDate} s.d ${
                        displayList[selected].endDate ?? ""
                      }`
                    : displayList[selected].date}
                </div>
              </div>

              <p className="text-justify text-gray-800 dark:text-gray-200 leading-relaxed">
                {displayList[selected].description}
              </p>
            </div>
          </div>
        </div>
      )}
      {displayList.length < 7 && (
        <div data-aos="fade-up" className="flex justify-center mt-2">
          <button
            onClick={onSeeMore}
            className="cursor-pointer bg-sky-500 w-full text-white py-2 px-4 hover:bg-sky-600 transition-colors"
          >
            Lihat lainnya..
          </button>
        </div>
      )}
    </section>
  );
}
