import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x: y, y: x });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="glass rounded-2xl overflow-hidden group hover:border-cyber/20 transition-all duration-500 relative"
    >
      {project.featured && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl scanline opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-cyber/10 text-cyber border border-cyber/20">
                <Sparkles size={10} /> Featured
              </span>
            )}
            {project.hasDemo && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-violet/10 text-violet border border-violet/20">
                Interactive Demo
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-data hover:text-cyber hover:bg-cyber/10 transition-all"
                aria-label={`${project.title} GitHub`}
              >
                <Github size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-data hover:text-violet hover:bg-violet/10 transition-all"
                aria-label={`${project.title} Demo`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-heading text-xl md:text-2xl font-bold text-silver group-hover:text-cyber transition-colors mb-3">
          {project.title}
        </h3>

        <p className="text-muted-data text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono text-violet border border-violet/20 bg-violet/5">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-data">
            COMPLEXITY: <span className="text-cyber">{'█'.repeat(Math.round(project.complexity / 10))}{'░'.repeat(10 - Math.round(project.complexity / 10))} {project.complexity}%</span>
          </span>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 font-mono text-xs text-cyber hover:text-glow-cyan transition-all group/btn"
          >
            Details <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}