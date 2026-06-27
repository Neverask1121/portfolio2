import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ChevronDown, ArrowRight } from 'lucide-react';

const ROLES = [
  'Computer Science Student',
  'AI Developer',
  'Full Stack Developer',
  'Competitive Programmer',
  'Problem Solver',
];

function useTypingEffect(strings, typeSpeed = 60, deleteSpeed = 40, pause = 2000) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeout = setTimeout(() => {
        setText(isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
      }, isDeleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, index, isDeleting, strings, typeSpeed, deleteSpeed, pause]);

  return text;
}

function MagneticButton({ children, href, variant = 'glass', className = '' }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setOffset({ x, y });
  }, []);

  const base = variant === 'primary'
    ? 'bg-cyber text-obsidian font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]'
    : 'glass text-silver hover:text-cyber hover:border-cyber/30';

  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono transition-all duration-300 ${base} ${className}`}
    >
      {children}
    </motion.a>
  );
}

const HERO_BG = 'https://media.base44.com/images/public/6a3cea769e46af5ee9b12e8c/fad949f83_generated_9a1ae79c.png';

export default function HeroSection() {
  const typedRole = useTypingEffect(ROLES);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Abstract neural network visualization"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
      </div>

      {/* Mouse follow glow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-muted-data">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-silver via-white to-silver">
              ADITYA
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber via-violet to-cyber bg-[length:200%_auto] animate-gradient-x">
              BHANDARI
            </span>
          </h1>

          {/* Typing role */}
          <div className="h-8 mb-10">
            <span className="font-mono text-base md:text-lg text-cyber">
              {'> '}
              <span className="text-silver">{typedRole}</span>
              <span className="typing-cursor" />
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <MagneticButton href="#projects" variant="primary">
              <ArrowRight size={16} /> Projects
            </MagneticButton>
            <MagneticButton href="#">
              <FileText size={16} /> Resume
            </MagneticButton>
            <MagneticButton href="https://github.com/Neverask1121">
              <Github size={16} /> GitHub
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/a4ab6i">
              <Linkedin size={16} /> LinkedIn
            </MagneticButton>
            <MagneticButton href="#contact">
              <Mail size={16} /> Contact
            </MagneticButton>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-data hover:text-cyber transition-colors"
          aria-label="Scroll down"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}