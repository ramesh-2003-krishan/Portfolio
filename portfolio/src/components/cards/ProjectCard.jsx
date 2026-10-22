import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import MagneticWrapper from '../common/MagneticWrapper';

export default function ProjectCard({
  project,
  index = 0,
  total = 4,
  scrollYProgress,
  enableScrollDepth = true,
  enableTilt = true,
}) {
  const [cardRef, inView] = useInView({ threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isTouch, setIsTouch] = useState(false);

  // Each card has its own unique videoRef
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadSource, setShouldLoadSource] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches;
      setIsTouch(touchCheck);
    }
  }, []);

  // Lazy-load video source when near viewport
  useEffect(() => {
    if (inView && !shouldLoadSource) {
      setShouldLoadSource(true);
    }
  }, [inView, shouldLoadSource]);

  // Autoplay video only while in view, pause when off-screen
  useEffect(() => {
    if (!videoRef.current || !shouldLoadSource) return;

    if (inView) {
      videoRef.current.play().catch((err) => {
        // Handle browser autoplay policy restrictions gracefully
      });
    } else {
      videoRef.current.pause();
    }
  }, [inView, shouldLoadSource]);

  // Scroll-linked stacking depth:
  // As a newer card slides over the previous one, the covered card scales down to 0.94,
  // dims, and gets a very light blur. Dynamically scales with total number of projects.
  const segment = 1 / total;
  const startProgress = Math.max(0, index * segment + segment * 0.15);
  const endProgress = Math.min(1, (index + 1) * segment);
  const isCoverable = index < total - 1;

  // Fallback MotionValue if scrollYProgress is not passed
  const fallbackProgress = useSpring(0);
  const progressToUse = scrollYProgress || fallbackProgress;

  const depthScale = useTransform(
    progressToUse,
    isCoverable ? [startProgress, endProgress] : [0, 1],
    isCoverable ? [1, 0.94] : [1, 1]
  );

  const depthDim = useTransform(
    progressToUse,
    isCoverable ? [startProgress, endProgress] : [0, 1],
    isCoverable ? [0, 0.32] : [0, 0]
  );

  const depthFilter = useTransform(
    progressToUse,
    isCoverable ? [startProgress, endProgress] : [0, 1],
    isCoverable ? ['blur(0px)', 'blur(2px)'] : ['blur(0px)', 'blur(0px)']
  );

  // 3D Tilt toward cursor (max 5 degrees) & Cursor Light Reflection
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, isHovered: false });
  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouch || !enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotateX.set(-normY * 5);
    rotateY.set(normX * 5);
    setSpotlight({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSpotlight((prev) => ({ ...prev, isHovered: false }));
  };

  const content = (
    <div className="projectA-img">
      {/* Video Container with Lazy-Load & Shimmer Skeleton */}
      <div className="project-video-container">
        {!isVideoLoaded && (
          <div className="video-skeleton-loader" aria-hidden="true" />
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          controls
          playsInline
          preload="metadata"
          className={project.videoClass}
          style={{ opacity: isVideoLoaded ? 1 : 0.6 }}
          onLoadedData={() => setIsVideoLoaded(true)}
          aria-label={
            project.videoAriaLabel || `${project.title} video preview`
          }
        >
          {shouldLoadSource && (
            <source
              src={process.env.PUBLIC_URL + project.videoSrc}
              type="video/mp4"
            />
          )}
        </video>
      </div>

      <div className="fghub-desc">
        <motion.p
          className={project.videoDescClass}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.45, delay: 0.24 }}
        >
          {project.fullDesc}
        </motion.p>
        <ul className="features">
          {project.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="features"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : prefersReducedMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{
                duration: 0.4,
                delay: 0.28 + idx * 0.05,
              }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Magnetic Link Icon on Desktop with Shine Sweep */}
      <MagneticWrapper
        strength={0.25}
        radius={45}
        className="project-link-magnetic"
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            project.linkAriaLabel ||
            `${project.title} project link (opens in new tab)`
          }
          className="lllogo"
        >
          <img
            src={project.linkIcon}
            alt={project.linkAlt}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <span className="project-link-shine" aria-hidden="true" />
        </a>
      </MagneticWrapper>
    </div>
  );

  return (
    <div
      id={`project-${project.id}`}
      ref={cardRef}
      className={project.wrapperClass}
    >
      {/*
        Inner Motion Wrapper:
        Handles entrance fade/slide, scroll-linked stacking depth (scale down to 0.94, dim, light blur),
        and subtle 3D tilt. The sticky wrapper itself receives ZERO transforms, guaranteeing
        100% stable sticky stacking.
      */}
      <motion.div
        className="project-depth-wrapper"
        style={
          prefersReducedMotion || !isDesktop
            ? {}
            : {
                scale: enableScrollDepth ? depthScale : 1,
                filter: enableScrollDepth ? depthFilter : 'none',
                rotateX: enableTilt && !isTouch ? rotateX : 0,
                rotateY: enableTilt && !isTouch ? rotateY : 0,
              }
        }
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: 35, filter: 'blur(6px)' }
        }
        animate={
          inView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : prefersReducedMotion
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 35, filter: 'blur(6px)' }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={project.cardClass}>
          {/* Stacking Depth Darkening Overlay */}
          {enableScrollDepth && !prefersReducedMotion && isDesktop && (
            <motion.div
              className="project-depth-dimmer"
              aria-hidden="true"
              style={{ opacity: depthDim }}
            />
          )}

          {/* Cursor Spotlight Reflection */}
          {!prefersReducedMotion && !isTouch && (
            <div
              className="project-spotlight"
              aria-hidden="true"
              style={{
                opacity: spotlight.isHovered ? 1 : 0,
                background: `radial-gradient(circle 280px at ${spotlight.x}px ${spotlight.y}px, rgba(97, 218, 251, 0.16), transparent 75%)`,
              }}
            />
          )}

          <motion.h4
            className={project.titleClass}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {project.title}
          </motion.h4>
          <motion.p
            className={project.descClass}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            {project.shortDesc}
          </motion.p>
          {project.hasOuterImgDiv ? (
            <div className={project.outerImgClass}>{content}</div>
          ) : (
            content
          )}
        </div>
      </motion.div>
    </div>
  );
}
