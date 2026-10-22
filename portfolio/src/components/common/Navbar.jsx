import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../data/navigation';

export default function Navbar({ isLightMode, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      const sections = NAV_LINKS.map((link) => {
        const id = link.href.replace('#', '');
        const el =
          document.getElementById(id) ||
          (id === 'aboutme' ? document.getElementById('about') : null);

        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return {
          href: link.href,
          top,
          bottom: top + el.offsetHeight,
        };
      }).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          setActiveSection(sections[i].href);
          return;
        }
      }
      setActiveSection('#hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/ramesh.ico" alt="ico" className="logo" />
      </div>
      <div className="nav-center">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={isActive ? 'active' : ''}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={
          isLightMode ? 'Switch to dark mode' : 'Switch to light mode'
        }
      >
        {isLightMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}
