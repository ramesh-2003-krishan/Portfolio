import React from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { SOCIAL_LINKS } from '../../data/socialLinks';

export default function AboutSection() {
  return (
    <section id="aboutme" className="aboutme">
      <div className="about">
        <div>
          <h2 className="who-title">Who Am I?</h2>
          <p className="line"> </p>
        </div>
        <div className="cardd">
          <div className="card-img">
            <img
              src={PERSONAL_INFO.aboutImg}
              alt="About Me"
              className="about-img"
            />
          </div>
          <div className="card-content">
            <h2 className="about-title">{PERSONAL_INFO.aboutTitle}</h2>
            <h3 className="about-subtitle">{PERSONAL_INFO.aboutSubtitle}</h3>
            <p className="about-desc">{PERSONAL_INFO.aboutDesc}</p>
            <div className="info-boxes">
              {PERSONAL_INFO.infoBoxes.map((box) => (
                <div key={box.label} className="info-box">
                  <label>{box.label}</label>
                  <span>{box.value}</span>
                </div>
              ))}
              <div className="cv">
                <button
                  className="cv-button"
                  onClick={() => window.open(PERSONAL_INFO.cvPath, '_blank')}
                >
                  Download CV
                </button>
              </div>
              <div className="llogo">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <img src={link.icon} alt={link.name} className="logos" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
