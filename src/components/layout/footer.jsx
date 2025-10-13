import React from "react";
import icon3D from "../../assets/Icon/icon3D.png";
import { FaFilm, FaMusic } from "react-icons/fa";

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

  const handleNavClick = (section, link) => {
    if (section) {
      setActivePage(section);

      if (section === "home" && link) {
        setTimeout(() => {
          const target = document.getElementById(link);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (link) {
      const target = document.getElementById(link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-t border-sky-500 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={icon3D}
            alt="logo"
            className="w-16 h-16 rounded-lg mb-3 object-cover"
          />
          <h3 className="font-bold text-lg text-black dark:text-white">
            Satria Bagas
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Alias:{" "}
            <span className="text-gray-900 dark:text-white">Yourksatra</span>
          </p>
          <p className="text-sm flex items-center gap-1 mt-1">
            <span>Hobi:</span> Entertainment Enjoyer
            <FaFilm className="inline text-gray-400" />
            <FaMusic className="inline text-gray-400" />
          </p>
          <p className="hidden text-xs md:block text-gray-500 mt-4">
            © 2025 Yourksatra. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg text-black dark:text-white mb-3">
            Navigasi
          </h3>
          <ul className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item.section, item.link)}
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-2 text-sm transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <p className="text-xs text-center text-gray-500 mt-4">
            © 2025 Yourksatra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
