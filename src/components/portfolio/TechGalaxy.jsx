import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

/**
 * Interactive Tech Galaxy — animated skill nodes orbiting a central core.
 * Canvas-based, 60 FPS, nodes react to cursor proximity.
 */

const SKILL_NODES = [
  // Core
  { label: 'AI/ML', x: 0, y: 0, r: 0, size: 22, color: '#00F0FF', isCore: true },
  // Orbit 1 — Languages
  { label: 'Python', x: 0, y: 0, r: 90, speed: 0.008, size: 14, color: '#00F0FF', phase: 0 },
  { label: 'C++', x: 0, y: 0, r: 90, speed: 0.008, size: 12, color: '#00F0FF', phase: 1.2 },
  { label: 'JavaScript', x: 0, y: 0, r: 90, speed: 0.008, size: 13, color: '#00F0FF', phase: 2.4 },
  { label: 'SQL', x: 0, y: 0, r: 90, speed: 0.008, size: 11, color: '#00F0FF', phase: 3.6 },
  // Orbit 2 — Frameworks
  { label: 'React', x: 0, y: 0, r: 150, speed: -0.005, size: 14, color: '#8B5CF6', phase: 0.5 },
  { label: 'Flask', x: 0, y: 0, r: 150, speed: -0.005, size: 12, color: '#8B5CF6', phase: 1.8 },
  { label: 'Node.js', x: 0, y: 0, r: 150, speed: -0.005, size: 13, color: '#8B5CF6', phase: 3.1 },
  { label: 'TensorFlow', x: 0, y: 0, r: 150, speed: -0.005, size: 13, color: '#8B5CF6', phase: 4.4 },
  // Orbit 3 — Tools
  { label: 'Git', x: 0, y: 0, r: 210, speed: 0.003, size: 11, color: '#00F0FF', phase: 1 },
  { label: 'Linux', x: 0, y: 0, r: 210, speed: 0.003, size: 12, color: '#00F0FF', phase: 2.5 },
  { label: 'Docker', x: 0, y: 0, r: 210, speed: 0.003, size: 11, color: '#00F0FF', phase: 4 },
  { label: 'Keras', x: 0, y: 0, r: 210, speed: 0.003, size: 11, color: '#00F0FF', phase: 5.5 },
];

export default function TechGalaxy() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const nodesRef = useRef(SKILL_NODES.map((n) => ({ ...n, angle: n.phase || 0, curX: 0, curY: 0, curSize: n.size })));
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState('');
  // hovered is reserved for future label tooltip integration

  const draw = useCallback((ctx, w, h) => {
    const cx = w / 2;
    const cy = h / 2;
    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, w, h);

    // Draw orbit rings
    [90, 150, 210].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Update node positions
    nodes.forEach((n) => {
      if (n.isCore) {
        n.curX = cx;
        n.curY = cy;
        return;
      }
      n.angle += n.speed;
      n.curX = cx + Math.cos(n.angle) * n.r;
      n.curY = cy + Math.sin(n.angle) * n.r;

      // Mouse proximity boost
      const dx = mouse.x - n.curX;
      const dy = mouse.y - n.curY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      n.curSize = dist < 60 ? n.size + 4 : n.size;
    });

    // Draw connections from core to nodes
    nodes.forEach((n) => {
      if (n.isCore) return;
      ctx.beginPath();
      ctx.moveTo(nodes[0].curX, nodes[0].curY);
      ctx.lineTo(n.curX, n.curY);
      ctx.strokeStyle = n.color === '#00F0FF'
        ? 'rgba(0, 240, 255, 0.08)'
        : 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((n) => {
      // Glow
      const glowR = n.curSize * 2.5;
      const grad = ctx.createRadialGradient(n.curX, n.curY, 0, n.curX, n.curY, glowR);
      const rgb = n.color === '#00F0FF' ? '0, 240, 255' : '139, 92, 246';
      grad.addColorStop(0, `rgba(${rgb}, 0.3)`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.curX, n.curY, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Node circle
      ctx.beginPath();
      ctx.arc(n.curX, n.curY, n.curSize, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Label
      ctx.font = `${n.isCore ? 'bold ' : ''}${n.isCore ? 11 : 9}px JetBrains Mono, monospace`;
      ctx.fillStyle = n.isCore ? '#E2E8F0' : 'rgba(226, 232, 240, 0.7)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.curX, n.isCore ? n.curY : n.curY - n.curSize - 8);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.min(rect.height, 500);
    };
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    const animate = () => {
      draw(ctx, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <section id="tech-galaxy" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// 03b. GALAXY"
          title="Tech Galaxy"
          subtitle="My skills visualized as an interactive constellation"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div ref={containerRef} className="relative" style={{ height: 500 }}>
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 font-mono text-xs text-muted-data">
              {'>'} Hover nodes to interact
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber" />
            <span className="font-mono text-xs text-muted-data">Core Skills & Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet" />
            <span className="font-mono text-xs text-muted-data">Frameworks & Tools</span>
          </div>
        </div>
      </div>
    </section>
  );
}