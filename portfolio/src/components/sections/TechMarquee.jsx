import React from 'react';
import { TECH_LOGOS } from '../../data/techLogos';

export default function TechMarquee() {
  return (
    <section className="bar">
      <div className="animated-bar-container">
        <div className="animated-bar">
          {TECH_LOGOS.map((logo, idx) =>
            logo.href ? (
              <a
                key={`marquee-1-${idx}-${logo.name}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo.src} alt={logo.name} className="logo" />
              </a>
            ) : (
              <img
                key={`marquee-1-${idx}-${logo.name}`}
                src={logo.src}
                alt={logo.name}
                className="logo"
              />
            )
          )}
          {TECH_LOGOS.map((logo, idx) =>
            logo.href ? (
              <a
                key={`marquee-2-${idx}-${logo.name}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo.src} alt={logo.name} className="logo" />
              </a>
            ) : (
              <img
                key={`marquee-2-${idx}-${logo.name}`}
                src={logo.src}
                alt={logo.name}
                className="logo"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
