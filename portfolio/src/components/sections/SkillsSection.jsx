import React from 'react';
import SkillCard from '../cards/SkillCard';
import { SKILL_CATEGORIES } from '../../data/skills';

export default function SkillsSection({ openMenu, toggleMenu }) {
  return (
    <section id="skills" className="skills">
      <div className="skill">
        <div className="skill-tit">
          <h2 className="skill-head">Skills</h2>
          <p className="linee"></p>
        </div>
        <div className="cards">
          {SKILL_CATEGORIES.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isOpen={openMenu === skill.id}
              onToggle={() => toggleMenu(skill.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
