import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Shield, Star, BookOpen, Brain, GitBranch, Trophy } from 'lucide-react';

const ACHIEVEMENTS = [
  { title: 'Google Student Ambassador', description: 'Selected for Google\'s campus program', icon: Star, color: 'from-cyan-400 to-blue-500' },
  { title: 'GSSoC Contributor', description: 'Open source contributions via GirlScript', icon: GitBranch, color: 'from-violet-400 to-purple-500' },
  { title: 'Harvard CS50x', description: 'Completed Harvard\'s CS50 Introduction to CS', icon: BookOpen, color: 'from-cyan-400 to-emerald-500' },
  { title: 'AI Developer', description: 'Building production AI/ML systems', icon: Brain, color: 'from-violet-400 to-pink-500' },
  { title: 'Open Source Contributor', description: 'Active in open-source communities', icon: Shield, color: 'from-cyan-400 to-teal-500' },
  { title: 'Hackathon Participant', description: '5+ national hackathons competed', icon: Trophy, color: 'from-violet-400 to-amber-500' },
];

const BADGE_BG = 'https://media.base44.com/images/public/6a3cea769e46af5ee9b12e8c/9b9322a92_generated_4fd862e0.png';

export default function AchievementsSection() {
  const [unlockedToast, setUnlockedToast] = useState(null);
  const sectionRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered.current) {
        hasTriggered.current = true;
        setTimeout(() => {
          setUnlockedToast('STALKER NO. 1');
          setTimeout(() => setUnlockedToast(null), 3000);
        }, 800);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src={BADGE_BG} alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          tag="// 06. ACHIEVEMENTS"
          title="Badges Unlocked"
          subtitle="Milestones and recognitions earned"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((ach, i) => {
            const IconComp = ach.icon;
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:border-cyber/20 transition-all duration-500 relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${ach.color}`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${ach.color} p-3 shadow-lg`}>
                    <IconComp className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-silver mb-1 group-hover:text-cyber transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-muted-data font-mono">{ach.description}</p>
                  <div className="mt-3 text-xs font-mono text-emerald-400">
                    ✓ UNLOCKED
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Achievement toast */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 z-50 glass-strong rounded-xl px-5 py-3 flex items-center gap-3 glow-cyan"
          >
            <Trophy className="text-cyber" size={18} />
            <div>
              <div className="font-mono text-xs text-cyber">ACHIEVEMENT UNLOCKED</div>
              <div className="text-sm text-silver font-heading font-semibold">{unlockedToast}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}