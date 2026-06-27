import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase } from 'lucide-react';
import { useRecruiterMode } from './RecruiterModeContext';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { recruiterMode, toggle } = useRecruiterMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`fixed top-1 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${
        scrolled ? 'glass-strong rounded-2xl py-3 px-6 mx-4' : ''
      }`}>
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-mono text-cyber text-sm tracking-wider hover:text-glow-cyan transition-all">
            AB<span className="text-violet">_</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-mono text-muted-data hover:text-cyber transition-colors duration-300 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}

            {/* Recruiter Mode toggle */}
            <button
              onClick={toggle}
              className={`ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-mono rounded-lg transition-all duration-300 ${
                recruiterMode
                  ? 'bg-cyber text-obsidian font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'glass text-muted-data hover:text-cyber'
              }`}
              aria-label="Toggle Recruiter Mode"
              title="Toggle Recruiter Mode — simplifies UI for quick review"
            >
              <Briefcase size={14} />
              {recruiterMode ? 'Recruiter' : 'Standard'}
            </button>

            <a
              href="#terminal"
              className={`ml-2 px-4 py-2 text-sm font-mono rounded-lg transition-all duration-300 ${
                recruiterMode ? 'hidden' : 'bg-cyber text-obsidian hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              }`}
            >
              Terminal
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className={`p-2 rounded-lg transition-all ${
                recruiterMode ? 'bg-cyber/20 text-cyber' : 'text-muted-data'
              }`}
              aria-label="Toggle Recruiter Mode"
            >
              <Briefcase size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-silver md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-strong mx-4 mt-2 rounded-2xl p-4"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 text-sm font-mono text-silver hover:text-cyber transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#terminal"
              onClick={() => setMobileOpen(false)}
              className={`block mt-2 py-3 px-4 text-sm font-mono text-obsidian bg-cyber rounded-lg text-center ${recruiterMode ? 'hidden' : ''}`}
            >
              Terminal
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}