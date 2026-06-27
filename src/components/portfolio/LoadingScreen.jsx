import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('boot');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setPhase('init');
    if (progress > 60) setPhase('load');
    if (progress > 90) setPhase('ready');
  }, [progress]);

  const logs = [
    { threshold: 0, text: '> Initializing neural interface...' },
    { threshold: 15, text: '> Loading quantum modules...' },
    { threshold: 30, text: '> Establishing secure connection...' },
    { threshold: 45, text: '> Compiling skill matrix...' },
    { threshold: 60, text: '> Rendering project repository...' },
    { threshold: 75, text: '> Activating achievement system...' },
    { threshold: 90, text: '> System ready. Welcome.' },
  ];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian"
        >
          <div className="noise-overlay" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 max-w-md w-full px-6"
          >
            <div className="font-mono text-cyber text-sm tracking-widest uppercase">
              Quantum Terminal v2.0
            </div>

            <div className="w-full space-y-3">
              <div className="w-full h-1 bg-glass rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)',
                    width: `${Math.min(progress, 100)}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-muted-data">
                <span>{phase.toUpperCase()}</span>
                <span>{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>

            <div className="w-full font-mono text-xs space-y-1.5 text-left">
              {logs.map((log, i) => (
                progress > log.threshold && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={progress > log.threshold + 15 ? 'text-muted-data' : 'text-cyber'}
                  >
                    {log.text}
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}