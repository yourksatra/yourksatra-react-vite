export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-6 bg-white dark:bg-gray-900"
    >
      {/* Heading */}
      <div className="text-center mb-5">
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl md:text-4xl font-bold text-sky-500 dark:text-sky-400"
        >
          Tentang Saya
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base"
        >
          Sekilas mengenai perjalanan dan pengalaman saya di dunia teknologi
        </p>
      </div>

      {/* Card Utama */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="max-w-6xl w-full space-y-6"
      >
        {/* Intro */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                        shadow-xl rounded-lg p-6 md:p-10"
        >
          <p className="text-justify text-gray-900 dark:text-gray-100 text-sm md:text-base leading-relaxed">
            Saya memiliki ketertarikan yang kuat dalam bidang pengembangan
            website, khususnya di sisi{" "}
            <span className="font-semibold text-sky-500">
              Back-End Development
            </span>
            . Spesialisasi saya adalah membangun aplikasi web yang efisien dan
            skalabel menggunakan <span className="font-semibold">Laravel</span>{" "}
            maupun <span className="font-semibold">CodeIgniter</span>. Saya
            terbiasa mengelola basis data menggunakan{" "}
            <span className="font-semibold">MySQL</span> dan juga menguasai
            bahasa pemrograman lain seperti{" "}
            <span className="font-semibold">JavaScript</span>,{" "}
            <span className="font-semibold">Python</span>, serta{" "}
            <span className="font-semibold">C++</span>.
          </p>
        </div>

        {/* Grid Bawah */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Text */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="md:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 
                          dark:border-gray-700 shadow-xl rounded-lg p-6 md:p-10 flex flex-col justify-center"
          >
            <p className="text-justify text-gray-900 dark:text-gray-100 text-sm md:text-base leading-relaxed">
              Saya adalah pembelajar yang proaktif dan detail-oriented,
              menjunjung tinggi praktik penulisan kode yang bersih dan
              kolaborasi tim. Bagi saya, setiap baris kode adalah jembatan
              menuju inovasi, dan setiap teknologi baru adalah pintu untuk
              memperluas pengetahuan.
            </p>
          </div>

          {/* Right Stat */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-sky-500">18</h1>
            <p className="mt-2 text-base md:text-lg font-semibold text-sky-500">
              Project Selesai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
