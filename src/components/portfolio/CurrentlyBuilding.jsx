import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Rocket, BookOpen, Cpu, Cloud, Brain, Terminal } from 'lucide-react';

const BUILDING = [
  {
    icon: Brain,
    title: 'Advanced Multi-Agent Systems',
    description: 'Exploring LangGraph orchestration patterns, autonomous agent workflows, and RAG pipeline optimization for production AI.',
    status: 'ACTIVE',
    progress: 65,
    color: 'cyber',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Learning Docker containerization, AWS deployment, CI/CD pipelines, and scalable infrastructure for ML workloads.',
    status: 'ACTIVE',
    progress: 45,
    color: 'violet',
  },
  {
    icon: Terminal,
    title: 'Competitive Programming',
    description: 'Daily problem solving on Codeforces and LeetCode. Targeting Specialist rank (1600+) by end of year.',
    status: 'ACTIVE',
    progress: 55,
    color: 'cyber',
  },
  {
    icon: Cpu,
    title: 'Deep Learning & Computer Vision',
    description: 'Studying transformer architectures, attention mechanisms, and real-time object detection for edge devices.',
    status: 'LEARNING',
    progress: 40,
    color: 'violet',
  },
];

const colorMap = {
  cyber: { text: 'text-cyber', border: 'border-cyber/20', bg: 'bg-cyber/5', bar: 'from-cyber to-cyber/60' },
  violet: { text: 'text-violet', border: 'border-violet/20', bg: 'bg-violet/5', bar: 'from-violet to-violet/60' },
};

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 06. BUILDING"
          title="Currently Building"
          subtitle="What I'm learning and creating right now"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {BUILDING.map((item, i) => {
            const c = colorMap[item.color];
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 group hover:${c.border} transition-all duration-500`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <Icon size={18} className={c.text} />
                  </div>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-silver mb-2">{item.title}</h3>
                <p className="text-muted-data text-sm leading-relaxed mb-4">{item.description}</p>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${c.bar}`}
                    />
                  </div>
                  <span className={`font-mono text-xs ${c.text}`}>{item.progress}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Status banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 glass rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex-1">
            <span className="font-mono text-xs text-emerald-400">SYSTEM_STATUS:</span>
            <span className="font-mono text-sm text-silver ml-2">Actively building, learning, and shipping — open to collaborations and opportunities.</span>
          </div>
          <Rocket size={18} className="text-cyber shrink-0 hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
}