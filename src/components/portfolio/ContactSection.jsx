import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Mail, Phone, Github, Linkedin, Code, ExternalLink } from 'lucide-react';

const LINKS = [
  { label: 'Email', value: '20252501002@iiitvadodara.ac.in', href: 'mailto:20252501002@iiitvadodara.ac.in', icon: Mail, color: 'cyber' },
  { label: 'Phone', value: '+91 9492266127', href: 'tel:+919492266127', icon: Phone, color: 'violet' },
  { label: 'GitHub', value: 'Neverask1121', href: 'https://github.com/Neverask1121', icon: Github, color: 'cyber' },
  { label: 'LinkedIn', value: 'a4ab6i', href: 'https://linkedin.com/in/a4ab6i', icon: Linkedin, color: 'violet' },
  { label: 'Codeforces', value: 'ADITYA1B2', href: 'https://codeforces.com/profile/ADITYA1B2', icon: Code, color: 'cyber' },
  { label: 'LeetCode', value: 'A4A_B6I', href: 'https://leetcode.com/A4A_B6I', icon: ExternalLink, color: 'violet' },
];

const colorStyles = {
  cyber: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/15',
  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/15',
};

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 09. CONTACT"
          title="Get In Touch"
          subtitle="Let's build something amazing together"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="font-mono text-xs text-cyber mb-6">{'>'} Establishing secure connection...</div>

          <h3 className="font-heading text-2xl md:text-3xl font-bold text-silver mb-4">
            Aditya Bhandari
          </h3>
          <p className="text-muted-data text-base max-w-lg mx-auto mb-10">
            I'm always open to new opportunities, collaborations, and conversations about 
            technology. Feel free to reach out through any of these channels.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LINKS.map((link, i) => {
              const IconComp = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 group ${colorStyles[link.color]}`}
                >
                  <IconComp size={18} className="shrink-0" />
                  <div className="text-left min-w-0">
                    <div className="font-mono text-xs text-muted-data">{link.label}</div>
                    <div className="text-sm text-silver truncate group-hover:text-white transition-colors">
                      {link.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <a
              href="mailto:20252501002@iiitvadodara.ac.in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm bg-cyber text-obsidian font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300"
            >
              <Mail size={16} /> Send a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}