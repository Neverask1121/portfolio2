import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { PROJECTS } from '@/data/portfolio';

const PROJECT_BG = 'https://media.base44.com/images/public/6a3cea769e46af5ee9b12e8c/578aac479_generated_13012429.png';

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={PROJECT_BG} alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          tag="// 04. PROJECTS"
          title="Featured Projects"
          subtitle="A curated collection of things I've built"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}