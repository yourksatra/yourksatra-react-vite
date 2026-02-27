"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/yourksatra" },
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/yourksatra" },
    { icon: <FaFacebook />, label: "Facebook", href: "https://facebook.com/yourksatra" },
    { icon: <FaXTwitter />, label: "X (Twitter)", href: "https://x.com/satriabagass_" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com/yourksatra" },
    { icon: <FaTiktok />, label: "Tiktok", href: "https://tiktok.com/@yourksatra" },
  ];

  const validate = () => {
    let newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Nama hanya boleh berisi huruf dan spasi.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid.";
    }
    if (!/^[A-Za-z0-9\s,.?!/]+$/.test(formData.message)) {
      newErrors.message = "Pesan hanya boleh huruf, angka, spasi, dan simbol , . ? ! /";
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      {/* Section heading */}
      <motion.div
        className="relative z-10 mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-xs font-semibold uppercase tracking-widest text-indigo-200 dark:text-indigo-400 mb-2"
        >
          Get In Touch
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-3xl md:text-4xl font-bold tracking-tight text-white"
        >
          Let&apos;s Connect
        </motion.h2>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Left: Social links */}
        <motion.div
          className="hidden md:flex flex-col gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialLinks.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
            >
              <span className="text-lg">{s.icon}</span>
              {s.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Right: Contact form */}
        <motion.div
          className="glass-card-strong rounded-2xl p-6 md:p-8 bg-white/10 dark:bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
            {errors.name && <p className="text-red-300 text-xs">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-sm"
            />
            {errors.email && <p className="text-red-300 text-xs">{errors.email}</p>}

            <textarea
              name="message"
              rows="4"
              placeholder="Pesan Anda..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 text-sm resize-none"
            />
            {errors.message && <p className="text-red-300 text-xs">{errors.message}</p>}

            <button
              type="submit"
              className="cursor-pointer w-full px-4 py-3 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
            >
              Kirim Pesan
            </button>

            {success && (
              <p className="mt-2 text-green-300 text-center font-medium text-sm">
                ✅ Terima kasih, pesan Anda berhasil dikirim!
              </p>
            )}
          </form>

          {/* Mobile social icons */}
          <div className="flex md:hidden justify-center gap-3 mt-6">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
