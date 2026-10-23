import React, { useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import InfoChip from './InfoChip';
import { calculateDuration } from '../../data/experience';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function ExperienceCard({ job, inView = true, delay = 0.3 }) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [logoLoadError, setLogoLoadError] = useState(false);

  // 3D Tilt (max 4 degrees on desktop only)
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, isHovered: false });
  const springConfig = { damping: 22, stiffness: 220 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotateX.set(-normY * 4);
    rotateY.set(normX * 4);
    setSpotlight({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSpotlight((prev) => ({ ...prev, isHovered: false }));
  };

  const durationStr = calculateDuration(job.startDate, job.endDate);
  const isCurrent = job.current || job.endDate === 'Present';

  return (
    <motion.article
      ref={cardRef}
      className="experience-card-outer"
      style={
        prefersReducedMotion || !isDesktop
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
          : { opacity: 0, x: 40, filter: 'blur(8px)' }
      }
      animate={
        inView
          ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : prefersReducedMotion
          ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, x: 40, filter: 'blur(8px)' }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="experience-card">
        {/* Dynamic Spotlight Follower */}
        {!prefersReducedMotion && isDesktop && (
          <div
            className="experience-card-spotlight"
            aria-hidden="true"
            style={{
              opacity: spotlight.isHovered ? 1 : 0,
              background: `radial-gradient(circle 320px at ${spotlight.x}px ${spotlight.y}px, rgba(97, 218, 251, 0.16), transparent 75%)`,
            }}
          />
        )}

        {/* Card Header: Logo, Role, Company, Badges */}
        <div className="experience-header">
          {/* Company Logo Badge */}
          <div className="experience-logo-box">
            {!logoLoadError && job.logo ? (
              <img
                src={process.env.PUBLIC_URL + job.logo}
                alt={`${job.company} logo`}
                className="experience-logo-img"
                onError={() => setLogoLoadError(true)}
              />
            ) : (
              <div
                className="experience-logo-fallback"
                aria-label={`${job.company} initials logo`}
              >
                <span>{job.logoInitials || 'SLT'}</span>
              </div>
            )}
          </div>

          {/* Role & Company Headings */}
          <div className="experience-title-group">
            <div className="experience-role-row">
              <h3 className="experience-role">{job.role}</h3>

              {/* Status Badges */}
              <div className="experience-badges-wrap">
                <span className="experience-type-pill">{job.type}</span>

                {isCurrent && (
                  <span className="experience-current-pill" aria-hidden="true">
                    <span className="current-pulse-dot" />
                    <span>Current</span>
                  </span>
                )}
                {isCurrent && (
                  <span className="sr-only">Current role</span>
                )}
              </div>
            </div>

            <p className="experience-company-wrap">
              <span className="experience-company">{job.company}</span>
            </p>
          </div>
        </div>

        {/* Info Chips Row: Date with Dynamic Duration, Location, Work Mode */}
        <div className="experience-chips-row" role="group" aria-label="Role details">
          {/* Date Chip */}
          <InfoChip
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
            delay={delay + 0.1}
            inView={inView}
          >
            <time dateTime={job.startDate}>Sep 2026</time> - Present · {durationStr}
          </InfoChip>

          {/* Location Chip */}
          <InfoChip
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            delay={delay + 0.16}
            inView={inView}
          >
            {job.locationShort || job.location}
          </InfoChip>

          {/* Work Mode Chip */}
          <InfoChip
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
            delay={delay + 0.22}
            inView={inView}
          >
            {job.workMode}
          </InfoChip>
        </div>

        {/* Optional Description / Highlights Area: only rendered when content is provided */}
        {job.description && (
          <p className="experience-desc">{job.description}</p>
        )}

        {Array.isArray(job.highlights) && job.highlights.length > 0 && (
          <ul className="experience-highlights">
            {job.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="experience-skills-wrap">
            {job.skills.map((skill, idx) => (
              <span key={idx} className="experience-skill-badge">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
