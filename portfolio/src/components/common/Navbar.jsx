import React from 'react';
import { NAV_LINKS } from '../../data/navigation';

export default function Navbar({ isLightMode, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/ramesh.ico" alt="ico" className="logo" />
      </div>
      <div className="nav-center">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {isLightMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}
