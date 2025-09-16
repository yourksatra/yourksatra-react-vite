import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import LoadingScreen from "./components/reusable/LoadingScreen";
import Navbar from "./components/layout/navbar";
import AboutSection from "./components/sections/AboutSection";
import HeroSection from "./components/sections/HeroSection";
import PortoSection from "./components/sections/PortoSection";
import ContactSection from "./components/sections/ContactSection";
import ExperienceSection from "./components/sections/ExperienceSection";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [selectedTab, setSelectedTab] = useState("project");

  useEffect(() => {
    // loading 2500ms sesuai LoadingScreen
    const timer = setTimeout(() => {
      setLoading(false);

      // init AOS setelah loading selesai
      AOS.init({
        duration: 800,
        offset: 50,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activePage !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePage]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
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
              <ContactSection />
              <ExperienceSection />
            </>
          )}
          {activePage === "ExperienceSection" && (
            <ExperienceSection setActivePage={setActivePage} />
          )}
        </>
      )}
    </>
  );
}
