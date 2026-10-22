import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import CountUp from '../common/CountUp';
import FloatingStatCard from './FloatingStatCard';

export default function PhotoFrame({ inView = true }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches;
      setIsTouch(touchCheck);
    }
  }, []);

  // Smooth springs for 3D tilt & parallax
  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Parallax offsets for floating cards (cards move slightly more than photo)
  const card1ParallaxX = useSpring(0, { damping: 22, stiffness: 150 });
  const card1ParallaxY = useSpring(0, { damping: 22, stiffness: 150 });

  const card2ParallaxX = useSpring(0, { damping: 22, stiffness: 150 });
  const card2ParallaxY = useSpring(0, { damping: 22, stiffness: 150 });

  const bubbleParallaxX = useSpring(0, { damping: 22, stiffness: 150 });
  const bubbleParallaxY = useSpring(0, { damping: 22, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    // Frame 3D tilt (max 6 degrees)
    rotateX.set(-normY * 6);
    rotateY.set(normX * 6);

    // Spotlight cursor coords
    setMousePos({ x, y, opacity: 1 });

    // Floating cards parallax
    card1ParallaxX.set(normX * 18);
    card1ParallaxY.set(normY * 18);

    card2ParallaxX.set(-normX * 16);
    card2ParallaxY.set(-normY * 16);

    bubbleParallaxX.set(normX * 12);
    bubbleParallaxY.set(normY * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    card1ParallaxX.set(0);
    card1ParallaxY.set(0);
    card2ParallaxX.set(0);
    card2ParallaxY.set(0);
    bubbleParallaxX.set(0);
    bubbleParallaxY.set(0);
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      className="about-photo-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Animated Gradient Glow */}
      <div className="about-photo-glow" aria-hidden="true" />

      {/* Main 3D Tilted Photo Frame */}
      <motion.div
        className="about-photo-frame"
        style={
          prefersReducedMotion || isTouch
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, scale: 0.92, filter: 'blur(8px)' }
        }
        animate={
          inView
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 0.92, filter: 'blur(8px)' }
        }
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Cursor Spotlight Overlay (disabled on touch/reduced motion) */}
        {!prefersReducedMotion && !isTouch && (
          <div
            className="about-frame-spotlight"
            aria-hidden="true"
            style={{
              opacity: mousePos.opacity,
              background: `radial-gradient(circle 260px at ${mousePos.x}px ${mousePos.y}px, rgba(97, 218, 251, 0.2), transparent 75%)`,
            }}
          />
        )}

        {/* Real Portrait Photo */}
        <div className="about-photo-inner">
          <img
            src={PERSONAL_INFO.aboutImg}
            alt={PERSONAL_INFO.name}
            className="about-photo-img"
            loading="eager"
          />
          {/* Subtle Glass Sheen / Specular Ring */}
          <div className="about-photo-sheen" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Floating Card 1: Top Right (Projects Completed) */}
      <FloatingStatCard
        className="about-card-stat about-card-top-right"
        parallaxX={card1ParallaxX}
        parallaxY={card1ParallaxY}
        popDelay={0.35}
        floatDistance={8}
        floatDuration={4.8}
        floatDelay={0}
        inView={inView}
      >
        <div className="about-stat-number">
          <CountUp end={4} suffix="+" inView={inView} />
        </div>
        <div className="about-stat-label-group">
          <span className="about-stat-title">Projects</span>
          <span className="about-stat-subtitle">Completed</span>
        </div>
      </FloatingStatCard>

      {/* Floating Card 2: Bottom Right (Tech & Frameworks with Line Chart) */}
      <FloatingStatCard
        className="about-card-stat about-card-chart about-card-bottom-right"
        parallaxX={card2ParallaxX}
        parallaxY={card2ParallaxY}
        popDelay={0.5}
        floatDistance={9}
        floatDuration={6.2}
        floatDelay={0.8}
        inView={inView}
      >
        <div className="about-chart-header">
          <span className="about-chart-label">Tech &amp; Frameworks</span>
          <span className="about-chart-value">
            <CountUp end={13} suffix="+" inView={inView} />
          </span>
        </div>
        <div className="about-chart-body" aria-hidden="true">
          <svg
            viewBox="0 0 130 38"
            className="about-sparkline-svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aboutSparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#61dafb" />
                <stop offset="50%" stopColor="#9d4edd" />
                <stop offset="100%" stopColor="#ff006e" />
              </linearGradient>
              <linearGradient id="aboutSparklineFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#61dafb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Soft filled area under curve */}
            <motion.path
              d="M 5,30 Q 30,28 50,20 T 90,14 T 125,5 L 125,38 L 5,38 Z"
              fill="url(#aboutSparklineFill)"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            {/* Animated Path */}
            <motion.path
              d="M 5,30 Q 30,28 50,20 T 90,14 T 125,5"
              fill="none"
              stroke="url(#aboutSparklineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
            />
            {/* Pulsing indicator node at line end */}
            <motion.circle
              cx="125"
              cy="5"
              r="3.5"
              fill="#ff006e"
              initial={prefersReducedMotion ? false : { scale: 0 }}
              animate={
                inView && !prefersReducedMotion
                  ? { scale: [1, 1.4, 1] }
                  : { scale: 1 }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </svg>
        </div>
      </FloatingStatCard>

      {/* Floating Card 3: Lower Left (Glass Sparkle Bubble) */}
      <FloatingStatCard
        className="about-bubble-orb about-card-lower-left"
        parallaxX={bubbleParallaxX}
        parallaxY={bubbleParallaxY}
        popDelay={0.65}
        floatDistance={7}
        floatDuration={5.4}
        floatDelay={0.4}
        inView={inView}
        ariaHidden={true}
      >
        <div className="about-bubble-inner">
          <svg
            className="about-bubble-star"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
          </svg>
        </div>
      </FloatingStatCard>
    </div>
  );
}
