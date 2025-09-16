import { useEffect, useState } from "react";
import { FaDownload, FaReact } from "react-icons/fa";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiCodeigniter,
  SiLaravel,
} from "react-icons/si";
import gambarSatu from "../../assets/Img/hero1.png";
import gambarDua from "../../assets/Img/hero2.png";

export default function HeroSection() {
  const images = [gambarSatu, gambarDua];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % images.length;
        // console.log("Changing slide:", next); // cek perubahan index
        return next;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
      <div className="hidden md:flex absolute inset-0">
        {/* Bagian kiri */}
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          data-once="true"
          className="w-1/2 flex items-center"
        >
          <div className="relative z-10 flex flex-col justify-center h-full px-5 md:px-12 min-w-3xl">
            <h3 className="text-2xl text-gray-600 dark:text-gray-300">
              Hai, saya
            </h3>
            <h1 className="text-4xl underline md:text-6xl font-bold text-sky-500 dark:text-sky-500">
              N. Satria Bagass, S.Kom
            </h1>
            <div className="space-y-0 mt-5">
              <div className="flex items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl text-gray-900 dark:text-white font-bold">
                  FULLSTACK WEB DEVELOPER
                </h2>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gray-100/60 dark:bg-gray-800">
                    <FaReact className="text-gray-900 dark:text-white text-lg" />
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100/60 dark:bg-gray-800">
                    <SiLaravel className="text-gray-900 dark:text-white text-lg" />
                  </div>
                  <div className="p-2 rounded-lg bg-gray-100/60 dark:bg-gray-800">
                    <SiCodeigniter className="text-gray-900 dark:text-white text-lg" />
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <h2 className="text-xl md:text-xl text-gray-900 dark:text-white font-semibold">
                  ASSETS CREATOR
                </h2>
                <div className="flex items-center gap-2">
                  <SiAdobephotoshop className="text-gray-900 dark:text-white text-lg" />
                  <SiAdobeillustrator className="text-gray-900 dark:text-white text-lg" />
                </div>
              </div>
            </div>
            <div className="flex items-end-safe gap-2 mt-5">
              <button
                className="cursor-pointer px-3 py-1 rounded-lg border bg-sky-500 border-sky-500 text-white dark:text-gray-900 
    hover:bg-white hover:text-gray-900 hover:border-gray-900 
    dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white 
    font-medium flex items-center gap-2 transition-colors duration-200"
              >
                KONTAK SEKARANG
              </button>
              <button
                className="cursor-pointer px-2 py-1 rounded-lg border border-gray-900 dark:border-white 
    text-gray-900 dark:text-white 
    hover:bg-sky-500 hover:border-sky-500 hover:text-white 
    dark:hover:text-gray-900
    font-medium flex items-center gap-2 transition-colors duration-200"
              >
                Download CV
                <FaDownload className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Bagian kanan */}
        <div
          data-aos="slide-up"
          data-aos-delay="200"
          data-once="true"
          className="w-1/2 relative bg-sky-500 clip-diagonal"
        >
          <div className="absolute bottom-0 left-3/5 transform -translate-x-1/2 z-10 w-full flex justify-center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Hero ${index}`}
                className={`absolute bottom-0 -translate-x-1/2 h-[90vh] w-auto drop-shadow-2xl transition-all duration-1000 ease-in-out
        ${
          index === current
            ? "opacity-0 translate-x-0"
            : "opacity-100 -translate-x-10"
        }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Version */}
      <div className="md:hidden relative h-screen w-full bg-sky-500 overflow-hidden">
        {/* Gambar full background */}
        <div
          data-aos="fade-in"
          data-once="true"
          className="absolute inset-0"
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero ${index}`}
              className={`h-[90vh] absolute bottom-0 w-full object-cover transition-opacity duration-1000 ease-in-out
          ${index === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        {/* Overlay text di atas gambar */}
        <div
          data-aos="slide-up"
          data-aos-delay="300"
          data-once="true"
          className="h-[35vh] w-[101%] absolute bottom-0 left-0 right-0 px-6 pt-10 
                bg-white/75 dark:bg-gray-900/75 backdrop-blur-sm overlay-diagonal
                flex flex-row justify-between items-center"
        >
          {/* Bagian informasi di kiri */}
          <div className="flex flex-col justify-center mt-10">
            <p className="text-sm text-gray-700 dark:text-gray-300">Hi, saya</p>
            <h1 className="text-3xl font-bold underline text-sky-500 dark:text-sky-500">
              N. Satria Bagass, S.Kom
            </h1>
            <div className="flex items-center mt-2 mb-2 gap-2 max-w-fit rounded-lg">
              <p className="text-m font-bold text-gray-900 dark:text-white">
                Fullstack Web Developer
              </p>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-sm bg-gray-100/50 dark:bg-gray-800">
                  <FaReact className="text-gray-900 dark:text-white text-sm" />
                </div>
                <div className="p-1 rounded-sm bg-gray-100/50 dark:bg-gray-800">
                  <SiLaravel className="text-gray-900 dark:text-white text-sm" />
                </div>
                <div className="p-1 rounded-sm bg-gray-100/50 dark:bg-gray-800">
                  <SiCodeigniter className="text-gray-900 dark:text-white text-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer px-3 py-1 rounded-lg border bg-sky-600 dark:bg-sky-400 border-sky-600 dark:border-sky-400 text-white dark:text-gray-900 
    hover:bg-white hover:text-gray-900 hover:border-gray-900 
    dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white 
    text-sm font-medium flex items-center gap-2 transition-colors duration-200"
              >
                KONTAK SEKARANG
              </button>

              <button
                className="cursor-pointer px-2 py-1 rounded-lg border border-gray-900 dark:border-white 
    text-gray-900 dark:text-white 
    hover:bg-sky-600 hover:border-sky-600 hover:text-white 
    dark:hover:bg-sky-400 dark:hover:border-sky-400 dark:hover:text-gray-900
    text-sm font-medium flex items-center gap-2 transition-colors duration-200"
              >
                Download CV
                <FaDownload className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
