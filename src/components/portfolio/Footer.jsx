import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-sm text-cyber tracking-wider">AB<span className="text-violet">_</span></span>
            <p className="text-xs text-muted-data mt-1 font-mono">
              Designed & built by Aditya Bhandari
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/Neverask1121', icon: Github, label: 'GitHub' },
              { href: 'https://linkedin.com/in/a4ab6i', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:20252501002@iiitvadodara.ac.in', icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-2 rounded-lg text-muted-data hover:text-cyber hover:bg-cyber/5 transition-all"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-data font-mono">
            Made with <Heart size={12} className="text-red-400" /> and lots of code
          </div>
        </div>
      </div>
    </footer>
  );
}