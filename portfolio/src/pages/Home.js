import '../style/Home.css';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/sections/HeroSection';
import TechMarquee from '../components/sections/TechMarquee';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/experience/ExperienceSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  const { isLightMode, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(null);

  function toggleMenu(menuId) {
    setOpenMenu(openMenu === menuId ? null : menuId);
  }

  return (
    <>
      <div className="home-page">
        <Navbar isLightMode={isLightMode} toggleTheme={toggleTheme} />
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection openMenu={openMenu} toggleMenu={toggleMenu} />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}
