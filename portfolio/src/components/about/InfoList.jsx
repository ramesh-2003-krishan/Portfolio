import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import MagneticWrapper from '../common/MagneticWrapper';

export default function InfoList({ inView = true }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="about-socials-pill"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
    >
      <span className="about-socials-label">Connect with me:</span>
      <div className="about-social-links" role="list">
        {SOCIAL_LINKS.map((link) => (
          <MagneticWrapper
            key={`about-social-${link.name}`}
            strength={0.25}
            radius={35}
            className="about-social-magnetic"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${link.name} in new tab`}
              className="about-social-link"
              role="listitem"
            >
              <img
                src={link.icon}
                alt={link.name}
                className="about-social-icon"
                loading="lazy"
              />
              <span className="about-social-tooltip">{link.name}</span>
            </a>
          </MagneticWrapper>
        ))}
      </div>
    </motion.div>
  );
}
