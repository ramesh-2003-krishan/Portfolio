import React from 'react';
import { useInView } from '../../hooks/useInView';
import { PERSONAL_INFO } from '../../data/personalInfo';
import { SOCIAL_LINKS } from '../../data/socialLinks';

export default function ContactSection() {
  const [contactRef, contactVisible] = useInView({ threshold: 0.3 });

  return (
    <section id="contact" className="contact">
      <div className="contact-section">
        <div>
          <h2 className="contact-title">Contact</h2>
          <p className="line"> </p>
        </div>
        <div className="contact-info">
          <div>
            <p className="liine"></p>
          </div>
          <div ref={contactRef} className="typing-wrapper">
            <p className={`word ${contactVisible ? 'typewriter' : ''}`}>
              Hire Me your{' '}
            </p>
            <p
              className={`wword ${contactVisible ? 'typewriter-delayed' : ''}`}
            >
              Next Project!
            </p>
          </div>
          <div className="contact-links">
            <p className="cname">Name: {PERSONAL_INFO.contactName}</p>
            <p className="cemail">Gmail: {PERSONAL_INFO.contactEmail}</p>
            <p className="cphone">Phone: {PERSONAL_INFO.contactPhone}</p>
            <div className="ogo">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={`contact-${link.name}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <img src={link.icon} alt={link.name} className="logs" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
