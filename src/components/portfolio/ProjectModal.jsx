import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Lightbulb, Target, Wrench, CheckCircle2, AlertTriangle, BarChart3, GraduationCap } from 'lucide-react';

const SECTION_CONFIG = [
  { key: 'overview', label: 'Overview', icon: Cpu },
  { key: 'problem', label: 'Problem', icon: AlertTriangle },
  { key: 'solution', label: 'Solution', icon: Lightbulb },
  { key: 'architecture', label: 'Architecture', icon: Cpu },
  { key: 'techStack', label: 'Tech Stack', icon: Wrench },
  { key: 'features', label: 'Features', icon: CheckCircle2 },
  { key: 'challenges', label: 'Challenges', icon: Target },
  { key: 'results', label: 'Results', icon: BarChart3 },
  { key: 'learnings', label: 'Learnings', icon: GraduationCap },
];

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-obsidian/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl max-w-3xl w-full my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 glass-strong border-b border-white/5 px-6 py-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-cyber">{project.category}</span>
                <span className="text-muted-data">·</span>
                <span className="font-mono text-xs text-muted-data">Complexity {project.complexity}%</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-silver">{project.title}</h2>
              <p className="text-sm text-muted-data mt-1">{project.tagline}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-muted-data hover:text-silver hover:bg-white/5 transition-all shrink-0" aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={16} className="text-cyber" />
                <h3 className="font-mono text-sm font-semibold text-cyber uppercase tracking-wider">Overview</h3>
              </div>
              <p className="text-silver text-sm leading-relaxed">{project.description}</p>
            </section>

            {/* Problem */}
            {project.problem && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <h3 className="font-mono text-sm font-semibold text-amber-400 uppercase tracking-wider">Problem</h3>
                </div>
                <p className="text-muted-data text-sm leading-relaxed">{project.problem}</p>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-cyber" />
                  <h3 className="font-mono text-sm font-semibold text-cyber uppercase tracking-wider">Solution</h3>
                </div>
                <p className="text-silver text-sm leading-relaxed">{project.solution}</p>
              </section>
            )}

            {/* Architecture */}
            {project.architecture && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={16} className="text-violet" />
                  <h3 className="font-mono text-sm font-semibold text-violet uppercase tracking-wider">Architecture</h3>
                </div>
                <div className="glass rounded-xl p-4 border border-violet/10">
                  <p className="font-mono text-xs text-silver leading-relaxed">{project.architecture}</p>
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={16} className="text-cyber" />
                <h3 className="font-mono text-sm font-semibold text-cyber uppercase tracking-wider">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono text-violet border border-violet/20 bg-violet/5">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <h3 className="font-mono text-sm font-semibold text-emerald-400 uppercase tracking-wider">Features</h3>
                </div>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-silver">
                      <span className="text-emerald-400 mt-0.5">▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-amber-400" />
                  <h3 className="font-mono text-sm font-semibold text-amber-400 uppercase tracking-wider">Challenges</h3>
                </div>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-data">
                      <span className="text-amber-400 mt-0.5">▸</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={16} className="text-cyber" />
                  <h3 className="font-mono text-sm font-semibold text-cyber uppercase tracking-wider">Results</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.results.map((r, i) => (
                    <div key={i} className="glass rounded-lg p-3 flex items-center gap-2">
                      <BarChart3 size={14} className="text-cyber shrink-0" />
                      <span className="text-sm text-silver">{r}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Learnings */}
            {project.learnings && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={16} className="text-violet" />
                  <h3 className="font-mono text-sm font-semibold text-violet uppercase tracking-wider">Learnings</h3>
                </div>
                <p className="text-muted-data text-sm leading-relaxed italic">"{project.learnings}"</p>
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 glass-strong border-t border-white/5 px-6 py-4 flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass text-sm font-mono text-silver hover:text-cyber hover:border-cyber/20 transition-all"
              >
                <Github size={16} /> View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber/10 text-sm font-mono text-cyber hover:bg-cyber/20 transition-all"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            <button
              onClick={onClose}
              className="ml-auto px-4 py-2.5 rounded-lg font-mono text-sm text-muted-data hover:text-silver transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}