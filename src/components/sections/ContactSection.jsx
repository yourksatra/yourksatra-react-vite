"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTiktok,
} from "react-icons/fa6";

export default function ContactSection() {
  const nameInputRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Hero button handler
  useEffect(() => {
    const handleHashFocus = () => {
      if (window.location.hash === "#contact&focus" && nameInputRef.current) {
        nameInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setTimeout(() => nameInputRef.current.focus(), 600);
      }
    };
    handleHashFocus();
    window.addEventListener("hashchange", handleHashFocus);
    return () => window.removeEventListener("hashchange", handleHashFocus);
  }, []);

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nugrahsatriabagassabirin",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/yourksatra",
    },
    {
      icon: <FaFacebook />,
      label: "Facebook",
      href: "https://facebook.com/yourksatra",
    },
    {
      icon: <FaXTwitter />,
      label: "X (Twitter)",
      href: "https://x.com/satriabagass_",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/yourksatra",
    },
    {
      icon: <FaTiktok />,
      label: "Tiktok",
      href: "https://tiktok.com/@yourksatra",
    },
  ];

  // Validasi form
  const validate = () => {
    let newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Nama hanya boleh berisi huruf dan spasi.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid.";
    }
    if (!/^[A-Za-z0-9\s,.?!/]+$/.test(formData.message)) {
      newErrors.message =
        "Pesan hanya boleh huruf, angka, spasi, dan simbol , . ? ! /";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    try {
      await fetch("https://formsubmit.co/ajax/sb130074@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-[90svh] flex flex-col items-center justify-center bg-sky-500 dark:bg-sky-500 px-4 py-10"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900">
          Kontak Saya
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Card kiri: Sosial Media */}
        <div className="hidden md:flex flex-col gap-4">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.href}
              data-aos="fade-up"
              data-aos-delay="{i} - 100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-white text-gray-800 dark:bg-gray-900 dark:text-white rounded-xl shadow-md 
                hover:scale-105 hover:shadow-lg transition-transform duration-200 font-medium"
            >
              <span className="text-xl">{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Card kanan: Form Kontak */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:text-sky-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:text-sky-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <textarea
              name="message"
              rows="4"
              placeholder="Pesan Anda..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 dark:text-sky-500 outline-none"
            ></textarea>

            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full px-4 py-2 bg-sky-500 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-sky-600 transition-colors"
            >
              Kirim Pesan
            </button>

            {success && (
              <p className="mt-2 text-green-600 text-center font-medium text-sm md:text-lg">
                ✅ Terima kasih, pesan Anda berhasil dikirim!
              </p>
            )}
          </form>

          {/* Sosmed versi mobile */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white dark:text-gray-900 bg-sky-600 p-2 rounded-full hover:scale-110 transition-transform"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
