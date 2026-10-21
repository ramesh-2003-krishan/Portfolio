import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  spotlightColor = 'rgba(97, 218, 251, 0.12)',
}) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;

    rotateX.set(-normalizedY * maxTilt);
    rotateY.set(normalizedX * maxTilt);
    setMousePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="tilt-spotlight"
        aria-hidden="true"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
