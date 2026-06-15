import icon3D from "../../assets/Icon/icon3D.png";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer({ setActivePage }) {
  const navItems = [
    { name: "Home", section: "home", link: "home" },
    { name: "Tentang", section: "home", link: "about" },
    { name: "Experience", section: "ExperienceSection" },
    { name: "Project", section: "ProjectSection" },
    { name: "Skills", section: "SkillsSection" },
    { name: "Game's", section: "home", link: "games" },
    { name: "Kontak", section: "home", link: "contact" },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/yourksatra", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/yourksatra", label: "GitHub" },
    { icon: <FaInstagram />, href: "https://instagram.com/yourksatra", label: "Instagram" },
  ];

  const handleNavClick = (section, link) => {
    if (section) {
      setActivePage(section);
      if (section === "home" && link) {
        setTimeout(() => {
          const target = document.getElementById(link);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (link) {
      const target = document.getElementById(link);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/5">
      {/* Gradient accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-sky-600 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start">
            <img src={icon3D} alt="logo" className="w-12 h-12 rounded-xl mb-3 object-cover" />
            <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Satria Bagas
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Backend Developer
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Navigasi
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(item.section, item.link)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-600/30 transition-all duration-200"
                >
                  <span className="text-lg">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/5 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Yourksatra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
