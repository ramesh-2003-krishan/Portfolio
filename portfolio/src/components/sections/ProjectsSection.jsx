import React from 'react';
import ProjectCard from '../cards/ProjectCard';
import { PROJECTS } from '../../data/projects';

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects">
      <div className="project">
        <div>
          <h2 className="project-title">Projects</h2>
          <p className="line"></p>
        </div>
        <div className="project-cards">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
