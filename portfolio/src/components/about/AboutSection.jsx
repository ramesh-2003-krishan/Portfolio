import React from 'react';
import { useInView } from '../../hooks/useInView';
import AboutIntro from './AboutIntro';
import PhotoFrame from './PhotoFrame';
import InfoList from './InfoList';
import './About.css';

export default function AboutSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      {/* Anchor for backward compatibility with existing navbar link #aboutme */}
      <div id="aboutme" className="about-anchor-target" aria-hidden="true" />

      <div className="about-container">
        <div className="about-grid">
          {/* Left Column: Intro text, CTAs, and Tech logos */}
          <AboutIntro inView={inView} />

          {/* Right Column: Photo frame with 3D tilt, floating cards, and contact info */}
          <div className="about-visual-col">
            <PhotoFrame inView={inView} />
            <InfoList inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
