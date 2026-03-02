import { lazy, Suspense, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import LoadingScreen from "./components/reusable/LoadingScreen";
import AboutSection from "./components/sections/AboutSection";
import HeroSection from "./components/sections/HeroSection";
import PortoSection from "./components/sections/PortoSection";
import ContactSection from "./components/sections/ContactSection";
import GamesSection from "./components/sections/GamesSection";
import ScrollToTopButton from "./components/reusable/ScrollToTopButton";

// Lazy-loaded: hanya ditampilkan saat navigasi, bukan di home
const ExperienceSection = lazy(() => import("./components/sections/ExperienceSection"));
const SkillsSection = lazy(() => import("./components/sections/SkillsSection"));
const ProjectSection = lazy(() => import("./components/sections/ProjectSection"));

// Fallback spinner saat lazy section sedang dimuat
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-8 h-8 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
    </div>
  );
}


export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [selectedTab, setSelectedTab] = useState("project");

  const LOADING_DURATION = 2500; // ms — satu-satunya sumber timer loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      AOS.init({ duration: 600, offset: 50, once: true });
    }, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activePage !== "home") {
      window.scrollTo({ top: 0 });
    }
  }, [activePage]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {loading ? (
        <LoadingScreen duration={LOADING_DURATION} />
      ) : (
        <>
          <ScrollToTopButton />
          <Navbar
            setSelectedTab={setSelectedTab}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          {activePage === "home" && (
            <>
              <HeroSection />
              <AboutSection />
              <PortoSection
                selectedTab={selectedTab}
                setActivePage={setActivePage}
              />
              <GamesSection />
              <ContactSection />
            </>
          )}
          {activePage === "ExperienceSection" && (
            <Suspense fallback={<PageLoader />}>
              <ExperienceSection setActivePage={setActivePage} />
            </Suspense>
          )}
          {activePage === "SkillsSection" && (
            <Suspense fallback={<PageLoader />}>
              <SkillsSection setActivePage={setActivePage} />
            </Suspense>
          )}
          {activePage === "ProjectSection" && (
            <Suspense fallback={<PageLoader />}>
              <ProjectSection setActivePage={setActivePage} />
            </Suspense>
          )}
          <Footer setActivePage={setActivePage} />
        </>
      )}
    </div>
  );
}
