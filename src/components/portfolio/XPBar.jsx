import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'achievements', 'terminal', 'github', 'contact'];

export default function XPBar() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const visited = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visited.current.has(entry.target.id)) {
            visited.current.add(entry.target.id);
            setXp(Math.round((visited.current.size / SECTIONS.length) * 100));
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLevel(Math.max(1, Math.floor(xp / 20) + 1));
  }, [xp]);

  return (
    <div className="fixed bottom-6 left-6 z-40 glass-strong rounded-xl px-4 py-2.5 hidden md:flex items-center gap-3">
      <div className="font-mono text-xs text-cyber">LVL {level}</div>
      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${xp}%`,
            background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)',
          }}
        />
      </div>
      <div className="font-mono text-xs text-muted-data">{xp}% XP</div>
    </div>
  );
}