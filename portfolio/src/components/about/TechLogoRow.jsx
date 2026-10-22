import React from 'react';
import { motion } from 'framer-motion';
import { TECH_LOGOS } from '../../data/techLogos';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TechLogoRow({ inView = true }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="about-tech-section">
      <p className="about-tech-heading">Tech I Use</p>
      <div className="about-tech-track" role="list" aria-label="Technologies and tools I use">
        {TECH_LOGOS.map((logo, index) => {
          const content = (
            <img
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              className="about-tech-logo"
              loading="lazy"
            />
          );

          if (prefersReducedMotion) {
            return (
              <div
                key={`tech-logo-${logo.name}-${index}`}
                className="about-tech-item"
                role="listitem"
              >
                {content}
                <span className="about-tech-tooltip">{logo.name}</span>
              </div>
            );
          }

          return (
            <motion.div
              key={`tech-logo-${logo.name}-${index}`}
              className="about-tech-item"
              role="listitem"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.9 }
              }
              transition={{
                duration: 0.4,
                delay: 0.35 + index * 0.04,
                ease: 'easeOut',
              }}
              whileHover={{
                scale: 1.18,
                y: -3,
                transition: { duration: 0.2 },
              }}
            >
              {content}
              <span className="about-tech-tooltip">{logo.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
