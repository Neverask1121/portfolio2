import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16 md:mb-20"
    >
      <div className="font-mono text-xs text-cyber tracking-[0.3em] uppercase mb-3">
        {tag}
      </div>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-silver mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-data text-base md:text-lg max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyber to-transparent" />
    </motion.div>
  );
}