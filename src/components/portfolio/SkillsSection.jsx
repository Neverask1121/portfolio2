import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const SKILL_CATEGORIES = [
  {
    name: 'Languages',
    color: 'cyber',
    items: ['C', 'C++', 'Python', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frontend',
    color: 'violet',
    items: ['HTML', 'CSS', 'React', 'Bootstrap', 'Vite'],
  },
  {
    name: 'Backend',
    color: 'cyber',
    items: ['Node.js', 'Express.js', 'Flask'],
  },
  {
    name: 'Databases',
    color: 'violet',
    items: ['PostgreSQL', 'SQLite'],
  },
  {
    name: 'AI / ML',
    color: 'cyber',
    items: ['TensorFlow', 'Keras', 'NumPy', 'Computer Vision', 'OCR', 'NLP'],
  },
  {
    name: 'Tools',
    color: 'violet',
    items: ['Git', 'GitHub', 'Linux', 'VS Code', 'REST APIs'],
  },
];

const colorMap = {
  cyber: {
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    text: 'text-cyan-400',
    dot: 'bg-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
    glow: 'group-hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]',
  },
  violet: {
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    text: 'text-violet-400',
    dot: 'bg-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    glow: 'group-hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]',
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="// 03. SKILLS"
          title="Tech Stack"
          subtitle="Technologies and tools I build with"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => {
            const c = colorMap[cat.color];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 group ${c.hoverBorder} transition-all duration-500 ${c.glow}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse-glow`} />
                  <h3 className={`font-mono text-sm font-semibold tracking-wider uppercase ${c.text}`}>
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg text-sm font-mono ${c.border} ${c.bg} ${c.text} border transition-all duration-300 hover:scale-105`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}