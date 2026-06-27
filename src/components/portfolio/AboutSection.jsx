import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Code2, Brain, Globe, Trophy } from 'lucide-react';

function AnimatedCounter({ end, label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered) {
        setTriggered(true);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(end / 40);
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [triggered, end, delay]);

  return (
    <div ref={ref} className="glass rounded-2xl p-6 text-center group hover:border-cyber/20 transition-all duration-500">
      <Icon className="w-5 h-5 text-cyber mx-auto mb-3 group-hover:scale-110 transition-transform" />
      <div className="font-heading text-3xl md:text-4xl font-bold text-silver mb-1">
        {count}<span className="text-cyber">+</span>
      </div>
      <div className="font-mono text-xs text-muted-data uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="// 01. ABOUT"
          title="About Me"
          subtitle="The person behind the code"
        />

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-2xl p-8 md:p-10">
              <div className="font-mono text-xs text-cyber mb-4">{'>'} cat about.md</div>
              <p className="text-silver text-base md:text-lg leading-relaxed mb-6">
                I'm a <span className="text-cyber font-semibold">B.Tech CSE student at IIIT Vadodara</span> passionate about 
                building technology that makes a real difference. My journey spans across 
                <span className="text-violet font-semibold"> AI, Machine Learning, Software Engineering, and Full Stack Development</span>.
              </p>
              <p className="text-muted-data text-base leading-relaxed mb-6">
                I thrive in competitive programming environments, hackathons, and open-source 
                communities. Whether it's architecting a multi-agent AI system for misinformation 
                detection or contributing to open-source projects, I'm driven by the challenge 
                of solving complex problems with elegant solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI/ML', 'Full Stack', 'Open Source', 'Competitive Programming', 'Hackathons', 'Product Building'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono text-cyber border border-cyber/20 bg-cyber/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 grid grid-cols-2 gap-4"
          >
            <AnimatedCounter end={8} label="Projects" icon={Code2} delay={0} />
            <AnimatedCounter end={5} label="Hackathons" icon={Trophy} delay={100} />
            <AnimatedCounter end={6} label="Tech Stacks" icon={Globe} delay={200} />
            <AnimatedCounter end={3} label="AI Models" icon={Brain} delay={300} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}