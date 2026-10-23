import React from 'react';
import { NAV_LINKS } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';

export default function Navbar({ isLightMode, toggleTheme }) {
  const activeSection = useActiveSection(180);

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
