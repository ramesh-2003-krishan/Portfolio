import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/navigation';

/**
 * Custom hook to track the currently active section based on scroll position.
 * Used by Navbar for active section highlighting.
 */
export function useActiveSection(offset = 180) {
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

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
  }, [offset]);

  return activeSection;
}
