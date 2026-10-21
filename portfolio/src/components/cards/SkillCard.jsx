import React from 'react';

export default function SkillCard({ skill, isOpen, onToggle }) {
  return (
    <div>
      <button
        className={skill.cardClass}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`${skill.title} skills`}
      >
        <img src={skill.icon} alt={skill.iconAlt} className="logoo" />
        <h4>{skill.title}</h4>
      </button>
      <div className={`${skill.subMenuClass} ${isOpen ? 'active' : ''}`}>
        {skill.subSkills.map((sub, idx) => (
          <img
            key={`${skill.id}-sub-${idx}-${sub.name}`}
            src={sub.src}
            alt={sub.name}
            className="loggo"
          />
        ))}
      </div>
    </div>
  );
}
