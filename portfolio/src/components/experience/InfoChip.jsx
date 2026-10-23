import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function InfoChip({
  icon,
  children,
  className = '',
  delay = 0,
  inView = true,
  ariaLabel,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={`experience-info-chip ${className}`}
      aria-label={ariaLabel}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.94 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 10, scale: 0.94 }
      }
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="info-chip-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="info-chip-text">{children}</span>
    </motion.span>
  );
}
