import React from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo';

export default function HeroSection() {
  return (
    <section id="hero" className="hero">
      <h1 className="title">{PERSONAL_INFO.heroTitle}</h1>

      <div className="left-text">
        <h2 className="ai">AI</h2>
        <h2 className="and">&</h2>
        <h2 className="ml">ML</h2>
        <p className="ent">Enthusiast</p>
      </div>

      <div className="right-text">
        <p className="small">Passionate</p>
        <h2>Full-Stack</h2>
        <p className="small">Developer</p>
      </div>
      <div className="img">
        <img
          src={PERSONAL_INFO.heroProfileImg}
          alt="Ramesh"
          className="profile"
        />
      </div>
    </section>
  );
}
