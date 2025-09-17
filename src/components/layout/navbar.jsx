import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";

// LOGO
import iconWhite from "../../assets/Icon/iconWhite.svg";
import iconBlack from "../../assets/Icon/iconBlack.svg";

// ICON THEME
import sunIcon from "../../assets/Icon/sun.svg";
import moonIcon from "../../assets/Icon/moon.svg";

// ICON DROPDOWN
import { ChevronDown } from "lucide-react";

export default function navbar({ setSelectedTab, activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const navRef = useRef(null);
  const menuRef = useRef(null);

  // efek scroll -> ubah background & shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // animasi slide: ukur tinggi menu saat buka/tutup
  useEffect(() => {
    if (!menuRef.current) return;
    if (isMenuOpen) {
      const h = menuRef.current.scrollHeight;
      setMenuMaxHeight(h);
    } else {
      setMenuMaxHeight(0);
    }
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

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const MenuLink = ({ to, children, setActivePage }) => {
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
        className="block py-2 md:py-0 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition text-center md:text-left"
      >
        {children}
      </a>
    );
  };

  const handlePortfolioNav = (e, tab, setActivePage) => {
    e.preventDefault();

    // balik dulu ke home
    setActivePage("home");

    setTimeout(() => {
      const el = document.querySelector("#portfolio");
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY - 64;

      window.scrollTo({ top, behavior: "smooth" });

      // set tab di PortoSection
      setSelectedTab(tab);
      setIsMenuOpen(false);
      setOpenDropdown(false);
    }, 100);
  };

  return (
    <span
      data-aos="fade-in"
      data-once="false"
      data-aos-delay="800"
      className="fixed top-0 left-0 w-full z-50"
    >
      <nav
        ref={navRef}
        className={`transition-all duration-300 ${
          isScrolled || isMenuOpen || activePage !== "home"
            ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bar utama */}
          <div className="flex items-center justify-between h-16">
            {/* Logo & Branding */}
            <div className="flex items-end gap-2">
              <img
                src={theme === "light" ? iconBlack : iconWhite}
                alt="Brand"
                className="h-8 w-8"
              />
              <span className="sm:block font-bold text-2xl text-gray-900 dark:text-white hidden">
                Yourksatra
              </span>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center font-medium gap-6">
              <MenuLink to="#about" setActivePage={setActivePage}>
                Tentang
              </MenuLink>

              {/* Dropdown Portofolio */}
              <div className="relative group">
                <button
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className="cursor-pointer flex items-center gap-1 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  Portofolio
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown && (
                  <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 animate-[fadeInDown_0.3s_ease-out]">
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "experience", setActivePage)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Experience
                    </a>
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "project", setActivePage)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Project
                    </a>
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "skills", setActivePage)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Skills
                    </a>
                  </div>
                )}
              </div>

              <MenuLink to="#contact" setActivePage={setActivePage}>
                Kontak
              </MenuLink>

              {/* Toggle theme */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className={`cursor-pointer p-2 rounded-full transition ${
                  isScrolled || isMenuOpen || activePage !== "home"
                    ? "hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "hover:bg-sky-400 dark:hover:bg-sky-600"
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

            {/* Hamburger + theme (mobile) */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`cursor-pointer p-2 rounded-full transition ${
                  isScrolled || isMenuOpen || activePage !== "home"
                    ? "hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "hover:bg-sky-400 dark:hover:bg-sky-600"
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
              {/* toggle hamburger */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
              >
                <div className="space-y-1.5">
                  <span
                    className={`block h-0.5 w-6 bg-current transition-transform ${
                      isMenuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-opacity ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-transform ${
                      isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          <div
            className="md:hidden overflow-hidden text-center transition-[max-height,opacity] duration-300 ease-out"
            style={{ maxHeight: menuMaxHeight, opacity: isMenuOpen ? 1 : 0 }}
          >
            <div
              ref={menuRef}
              className="pb-3 pt-2 text-lg font-semibold border-gray-200 dark:border-gray-800"
            >
              <MenuLink to="#about" setActivePage={setActivePage}>
                Tentang
              </MenuLink>

              {/* Dropdown Portofolio Mobile */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown((prev) => !prev)}
                  className="cursor-pointer flex justify-center items-center w-full gap-1 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Portofolio
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown && (
                  <div className="flex flex-col items-center text-sm font-normal border border-gray-200 dark:border-gray-800 animate-[fadeInDown_0.3s_ease-out] w-full">
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "experience", setActivePage)}
                      className="w-full px-4 py-2 text-center rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Experience
                    </a>
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "project", setActivePage)}
                      className="w-full px-4 py-2 text-center rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Project
                    </a>
                    <a
                      href="#portfolio"
                      onClick={(e) => handlePortfolioNav(e, "skills", setActivePage)}
                      className="w-full px-4 py-2 text-center rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Skills
                    </a>
                  </div>
                )}
              </div>
              <MenuLink to="#contact" setActivePage={setActivePage}>
                Kontak
              </MenuLink>
            </div>
          </div>
        </div>
      </nav>
    </span>
  );
}
