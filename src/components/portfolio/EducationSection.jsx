import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 02. EDUCATION"
          title="Academic Path"
          subtitle="System initialization log"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyber via-violet to-transparent" />

          <div className="relative pl-16 md:pl-20">
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-6 top-8 w-4 h-4 rounded-full bg-cyber shadow-[0_0_15px_rgba(0,240,255,0.5)] border-2 border-obsidian" />

            <div className="glass rounded-2xl p-8 md:p-10 hover:border-cyber/20 transition-all duration-500 group">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="font-mono text-xs text-cyber mb-2">
                    {'>'} SYSTEM_LOG: EDUCATION_INITIALIZED
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-silver group-hover:text-cyber transition-colors">
                    IIIT Vadodara
                  </h3>
                  <p className="text-violet font-mono text-sm mt-1">
                    B.Tech — Computer Science Engineering
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-cyber bg-cyber/10 px-3 py-1 rounded-full">
                    <Calendar size={12} /> 2025 – Present
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-data">
                    <MapPin size={12} /> Vadodara, India
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-data">
                  <GraduationCap size={16} className="text-violet" />
                  <span>Pursuing core CS fundamentals with focus on AI/ML and Software Engineering</span>
                </div>
                <div className="font-mono text-xs text-muted-data/60 mt-4 pt-4 border-t border-white/5">
                  <span className="text-emerald-400">STATUS:</span> ACTIVE &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span className="text-cyber">MODULE:</span> YEAR_1 &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span className="text-violet">BRANCH:</span> CSE
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}