import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useTheme from "../../hooks/useTheme";
import iconWhite from "../../assets/Icon/iconWhite.svg";
import iconBlack from "../../assets/Icon/iconBlack.svg";
import sunIcon from "../../assets/Icon/sun.svg";
import moonIcon from "../../assets/Icon/moon.svg";
import { ChevronDown } from "lucide-react";

export default function Navbar({ setSelectedTab, activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    setMenuMaxHeight(isMenuOpen ? menuRef.current.scrollHeight : 0);
  }, [isMenuOpen, openDropdown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !navRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const MenuLink = ({ to, children }) => {
    const handleClick = (e) => {
      e.preventDefault();
      setActivePage("home");
      setTimeout(() => {
        const el = document.querySelector(to);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setIsMenuOpen(false);
      setOpenDropdown(false);
    };

    return (
      <a
        href={to}
        onClick={handleClick}
        className="relative py-2 md:py-0 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 text-center md:text-left group"
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-600 to-blue-500 group-hover:w-full transition-all duration-300 hidden md:block" />
      </a>
    );
  };

  const handlePortfolioNav = (e, tab) => {
    e.preventDefault();
    setActivePage("home");
    setTimeout(() => {
      const el = document.querySelector("#portfolio");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
      setSelectedTab(tab);
      setIsMenuOpen(false);
      setOpenDropdown(false);
    }, 100);
  };

  const showBg = isScrolled || isMenuOpen || activePage !== "home";

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <nav
        ref={navRef}
        className={`transition-all duration-500 ${showBg
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-white/5"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-end gap-2.5">
              <img
                src={theme === "light" ? iconBlack : iconWhite}
                alt="Brand"
                className="h-8 w-8"
              />
              <span className="hidden sm:block font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Yourksatra
              </span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center font-medium gap-8 text-sm">
              <MenuLink to="#about">Tentang</MenuLink>

              {/* Portfolio dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className="cursor-pointer flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
                >
                  Portofolio
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${openDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-44 rounded-xl glass-card-strong shadow-xl p-1.5 animate-slide-down">
                    {["experience", "project", "skills"].map((tab) => (
                      <a
                        key={tab}
                        href="#portfolio"
                        onClick={(e) => handlePortfolioNav(e, tab)}
                        className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-white/5 rounded-lg transition-all duration-150"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <MenuLink to="#games">Game&apos;s</MenuLink>
              <MenuLink to="#contact">Kontak</MenuLink>

              {/* Theme toggle */}
              <button
                onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                className={`cursor-pointer p-2 rounded-full transition-colors duration-200 ${showBg
                  ? "hover:bg-slate-100 dark:hover:bg-white/10"
                  : "hover:bg-white/10"
                  }`}
                aria-label="Toggle Theme"
                title={theme === "light" ? "Dark Mode" : "Light Mode"}
              >
                <img
                  src={theme === "light" ? moonIcon : sunIcon}
                  alt={theme === "light" ? "Dark Mode" : "Light Mode"}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className={`cursor-pointer p-2 rounded-full transition-colors duration-200 ${showBg
                  ? "hover:bg-slate-100 dark:hover:bg-white/10"
                  : "hover:bg-white/10"
                  }`}
                aria-label="Toggle Theme"
              >
                <img
                  src={theme === "light" ? moonIcon : sunIcon}
                  alt="Theme"
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition"
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
              >
                <div className="space-y-1.5">
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className="md:hidden overflow-hidden text-center transition-[max-height,opacity] duration-300 ease-out"
            style={{ maxHeight: menuMaxHeight, opacity: isMenuOpen ? 1 : 0 }}
          >
            <div ref={menuRef} className="pb-4 pt-2 text-base font-medium space-y-1">
              <MenuLink to="#about">Tentang</MenuLink>

              {/* Dropdown mobile */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className="cursor-pointer flex justify-center items-center w-full py-2 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition"
                >
                  Portofolio
                  <ChevronDown
                    size={14}
                    className={`ml-1 transition-transform duration-200 ${openDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown && (
                  <div className="flex flex-col items-center text-sm font-normal glass-card rounded-xl mx-4 p-1 animate-slide-down">
                    {["experience", "project", "skills"].map((tab) => (
                      <a
                        key={tab}
                        href="#portfolio"
                        onClick={(e) => handlePortfolioNav(e, tab)}
                        className="w-full px-4 py-2.5 text-center rounded-lg text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-white/5 transition-colors"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <MenuLink to="#contact">Kontak</MenuLink>
            </div>
          </div>
        </div>
      </nav>
    </motion.span>
  );
}
