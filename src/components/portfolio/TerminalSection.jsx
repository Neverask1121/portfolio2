import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const COMMANDS = {
  help: () => [
    'Available commands:',
    '  help       — Show available commands',
    '  about      — Who is Aditya?',
    '  skills     — Technical stack',
    '  projects   — Featured projects',
    '  education  — Academic background',
    '  contact    — How to reach me',
    '  resume     — Download resume',
    '  github     — GitHub profile',
    '  whoami     — Identity check',
    '  hire       — 🎉 Hiring info',
    '  coffee     — ☕ Fuel status',
    '  hackathon  — 🏆 Competition mode',
    '  clear      — Clear terminal',
    '  + hidden easter eggs... try "secret"',
  ],
  about: () => [
    '┌─────────────────────────────────────────┐',
    '│  ADITYA BHANDARI                        │',
    '│  B.Tech CSE @ IIIT Vadodara             │',
    '│                                         │',
    '│  Passionate about AI, ML, Full Stack,   │',
    '│  Competitive Programming & Open Source.  │',
    '│  Building impactful tech since 2024.     │',
    '└─────────────────────────────────────────┘',
  ],
  skills: () => [
    '> Languages:  C, C++, Python, JavaScript, SQL',
    '> Frontend:   React, HTML, CSS, Bootstrap, Vite',
    '> Backend:    Node.js, Express.js, Flask',
    '> AI/ML:      TensorFlow, Keras, NumPy, CV, OCR, NLP',
    '> Databases:  PostgreSQL, SQLite',
    '> Tools:      Git, GitHub, Linux, VS Code, REST APIs',
  ],
  projects: () => [
    '★ ShadowTrace — Multi-agent AI misinformation detection',
    '  Resume Sorting AI — NLP resume screening',
    '  OCR Recognition — YOLO + Deep Learning',
    '  CodeSentinel — Cybersecurity demo platform',
    '  Plant Disease Detection — TensorFlow CNN',
    '  Employee Data Storage — Flask + SQLite',
    '  Password Manager — Secure credential mgmt',
    '  Portfolio Website — This site!',
  ],
  education: () => [
    '[2025–PRESENT] > IIIT Vadodara',
    '                B.Tech Computer Science Engineering',
    '                STATUS: ACTIVE | MODULE: YEAR_1',
  ],
  contact: () => [
    'Email:      20252501002@iiitvadodara.ac.in',
    'Phone:      +91 9492266127',
    'GitHub:     github.com/Neverask1121',
    'LinkedIn:   linkedin.com/in/a4ab6i',
    'Codeforces: ADITYA1B2',
    'LeetCode:   A4A_B6I',
  ],
  resume: () => ['Opening resume... (link will open in new tab)'],
  github: () => ['Opening github.com/Neverask1121...'],
  whoami: () => [
    'aditya@quantum-terminal:~$',
    '',
    'User: Aditya Bhandari',
    'Role: AI Developer | Full Stack Engineer',
    'Location: IIIT Vadodara, India',
    'Level: Rising ★',
    'XP: ████████░░ 80%',
  ],
  hire: () => [
    '╔═══════════════════════════════════════════╗',
    '║  🎉 ADITYA IS AVAILABLE FOR HIRE!          ║',
    '║                                           ║',
    '║  Role: AI Developer / Full Stack Engineer  ║',
    '║  Status: Open to opportunities             ║',
    '║  Location: IIIT Vadodara, India (Remote)   ║',
    '║                                           ║',
    '║  📧 20252501002@iiitvadodara.ac.in         ║',
    '║  📱 +91 9492266127                         ║',
    '║  💼 linkedin.com/in/a4ab6i                 ║',
    '║                                           ║',
    '║  Type "contact" for all channels.          ║',
    '╚═══════════════════════════════════════════╝',
  ],
  coffee: () => [
    '    ( (',
    '     ) )',
    '  ........',
    '  |      |]   ☕',
    '  \\      /',
    "   \'----\'",
    '',
    '> Coffee: the fuel that powers this developer.',
    '> Status: Currently brewing... 0xCAFEBABE',
  ],
  hackathon: () => [
    '🏆 HACKATHON MODE: ACTIVATED',
    '',
    '> Loading build tools... ████████████ 100%',
    '> Connecting to caffeine source... ✓',
    '> Importing sleep deprivation module... ✓',
    '> Deploying pizza tracker... ✓',
    '',
    '"Hackathons are where ideas become reality overnight."',
    '- Aditya, probably at 3 AM',
  ],
  sudo: () => [
    'aditya is not in the sudoers file. This incident will be reported.',
    '',
    '> Just kidding. You don\'t need sudo here.',
    '> Try "hire" instead — that command always works. 😏',
  ],
  matrix: () => [
    'Wake up, Neo...',
    '',
    '01001000 01100101 01101100 01101100 01101111',
    '01100100 01101111 01110111 01101111 01110010 01101100 01100100',
    '',
    '> The Matrix has you...',
    '> Follow the white rabbit. 🐇',
  ],
  secret: () => [
    '> You found a secret!',
    '',
    '> Achievement Unlocked: Curious Explorer 🏆',
    '> XP +100',
    '',
    '> Hint: There are more easter eggs hidden in this terminal.',
    '> Try: hire, coffee, hackathon, sudo, matrix, hack',
  ],
  hack: () => [
    '██████████████████████████████████████████████',
    '█  HACKING IN PROGRESS...                    █',
    '█  ████████████████████████ 100%             █',
    '█                                            █',
    '█  Just kidding! 😄                          █',
    '█  I build secure apps, not break them.      █',
    '█  Check out CodeSentinel for security demos █',
    '██████████████████████████████████████████████',
  ],
  joke: () => [
    '> Why do programmers prefer dark mode?',
    '',
    '> Because light attracts bugs. 🐛',
  ],
  ls: () => [
    'about.md       projects/      skills.json',
    'experience.log achievements/  contact.vcf',
    'education.txt  shadowtrace.py resume.pdf',
    '',
    '> Use "help" to explore these sections.',
  ],
  cat: () => [
    'cat: requires a filename. Try "about" instead.',
    '> Or type "help" to see available commands.',
  ],
  echo: () => [
    'echo: echo echo echo echo...',
    '',
    '> (Yes, this is a real terminal. Try "help" for useful commands.)',
  ],
};

export default function TerminalSection() {
  const [history, setHistory] = useState([
    { type: 'system', lines: ['Quantum Terminal v2.0 — Type "help" for commands.'] },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', lines: [`visitor@aditya:~$ ${cmd}`] }];

    if (cmd === 'clear') {
      setHistory([{ type: 'system', lines: ['Terminal cleared.'] }]);
      setInput('');
      return;
    }

    if (cmd === 'github') {
      window.open('https://github.com/Neverask1121', '_blank');
    }

    if (cmd === 'resume') {
      window.open('mailto:20252501002@iiitvadodara.ac.in?subject=Resume%20Request', '_blank');
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      newHistory.push({ type: 'output', lines: handler() });
    } else {
      newHistory.push({ type: 'error', lines: [`Command not found: ${cmd}. Type "help" for available commands.`] });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <section id="terminal" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 07. TERMINAL"
          title="Command Line"
          subtitle="Explore my profile through the terminal"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden glow-cyan"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-muted-data ml-2">quantum-terminal — bash</span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-4 md:p-6 h-80 md:h-96 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.lines.map((line, j) => (
                  <div
                    key={j}
                    className={
                      entry.type === 'input' ? 'text-cyber' :
                      entry.type === 'error' ? 'text-red-400' :
                      entry.type === 'system' ? 'text-muted-data' :
                      'text-silver'
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-cyber whitespace-nowrap">visitor@aditya:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-silver caret-cyber font-mono text-sm"
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}