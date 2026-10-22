import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TimelineDot({ inView = true, delay = 0.25 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="timeline-dot-wrapper" aria-hidden="true">
      {/* Outer ripple ring */}
      {!prefersReducedMotion && (
        <span className="timeline-dot-ripple" />
      )}

      {/* Main glowing dot */}
      <motion.div
        className="timeline-dot-pip"
        initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
        animate={
          inView
            ? { scale: 1, opacity: 1 }
            : prefersReducedMotion
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 18,
          delay,
        }}
      >
        <span className="timeline-dot-core" />
      </motion.div>
    </div>
  );
}
