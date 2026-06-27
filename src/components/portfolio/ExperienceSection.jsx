import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Briefcase, Award, Zap, Users } from 'lucide-react';

const EXPERIENCES = [
  {
    type: 'role',
    title: 'Google Student Ambassador',
    org: 'Google',
    period: '2025',
    description: 'Selected as a Google Student Ambassador, representing the university in Google developer programs and mentoring peers in tech communities.',
    icon: Award,
    color: 'cyber',
  },
  {
    type: 'role',
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    period: '2025',
    description: 'Actively contributed to open-source projects during GSSoC, collaborating with developers worldwide and improving codebases across multiple repositories.',
    icon: Users,
    color: 'violet',
  },
  {
    type: 'internship',
    title: 'AI Annotator / Data Specialist',
    org: 'Indika AI',
    period: '2024',
    description: 'Worked on AI data annotation, training data curation, and quality assurance for machine learning model development pipelines.',
    icon: Briefcase,
    color: 'cyber',
  },
  {
    type: 'internship',
    title: 'Tech Intern',
    org: 'InAmigos Foundation',
    period: '2024',
    description: 'Contributed to technology-driven social impact projects, building solutions for community development and educational access.',
    icon: Briefcase,
    color: 'violet',
  },
  {
    type: 'hackathon',
    title: 'Hackathon Participant',
    org: 'India Runs · HackPrix · COMSYS OCR Challenge · Smart India Hackathon',
    period: '2024–2025',
    description: 'Competed in multiple national-level hackathons, building innovative solutions under time pressure and presenting to industry panels.',
    icon: Zap,
    color: 'cyber',
  },
];

const colorStyles = {
  cyber: {
    dot: 'bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  violet: {
    dot: 'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    iconBg: 'bg-violet-500/10 text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 05. EXPERIENCE"
          title="Quest Log"
          subtitle="Missions completed and campaigns in progress"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyber via-violet to-transparent" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => {
              const c = colorStyles[exp.color];
              const IconComp = exp.icon;
              return (
                <motion.div
                  key={exp.title + exp.org}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Dot */}
                  <div className={`absolute left-4 md:left-6 top-8 w-4 h-4 rounded-full ${c.dot} border-2 border-obsidian z-10`} />

                  <div className="glass rounded-2xl p-6 md:p-8 hover:border-cyber/15 transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${c.iconBg}`}>
                          <IconComp size={18} />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-silver group-hover:text-cyber transition-colors">
                            {exp.title}
                          </h3>
                          <p className="font-mono text-sm text-muted-data">{exp.org}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${c.badge} whitespace-nowrap`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-data text-sm leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-4 font-mono text-xs text-muted-data/50">
                      TYPE: <span className="text-cyber uppercase">{exp.type}</span> &nbsp;|&nbsp;
                      STATUS: <span className="text-emerald-400">COMPLETED</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}