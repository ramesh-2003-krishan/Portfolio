import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function FloatingStatCard({
  children,
  className = '',
  style = {},
  parallaxX = 0,
  parallaxY = 0,
  floatDistance = 8,
  floatDuration = 5,
  floatDelay = 0,
  popDelay = 0.3,
  inView = true,
  ariaHidden = false,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={`about-floating-card ${className}`}
        style={style}
        aria-hidden={ariaHidden}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`about-floating-card-wrapper ${className}-wrapper`}
      style={{
        ...style,
        x: parallaxX,
        y: parallaxY,
      }}
      initial={{ opacity: 0, scale: 0.75, y: 20 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.75, y: 20 }
      }
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 18,
        delay: popDelay,
      }}
      aria-hidden={ariaHidden}
    >
      <motion.div
        className={`about-floating-card ${className}`}
        animate={{
          y: [0, -floatDistance, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
