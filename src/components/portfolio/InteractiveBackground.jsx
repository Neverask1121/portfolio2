import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Lightweight, 60 FPS interactive particle background.
 * - Flowing particles with connecting nodes
 * - Cursor attraction + click ripples
 * - Scroll parallax + window resize handling
 * - Scales particle count by viewport for performance
 */
export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const scrollRef = useRef(0);
  const rafRef = useRef(null);

  const initParticles = useCallback((w, h) => {
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.3 + 0.1,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    initParticles(w, h);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles(w, h);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 0.5,
      });
      if (ripplesRef.current.length > 8) ripplesRef.current.shift();
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastTime = performance.now();

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const scrollOffset = scrollRef.current * 0.02;

      // Draw mesh gradient blobs (subtle, parallax)
      const blob1X = w * 0.2 + Math.sin(now * 0.0002) * 50 - scrollOffset;
      const blob1Y = h * 0.3 + Math.cos(now * 0.0003) * 40;
      const blob2X = w * 0.8 + Math.cos(now * 0.00025) * 60;
      const blob2Y = h * 0.7 + Math.sin(now * 0.0003) * 50 - scrollOffset;

      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, 300);
      grad1.addColorStop(0, 'rgba(0, 240, 255, 0.04)');
      grad1.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, 350);
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.04)');
      grad2.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Cursor attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (1 - dist / 150) * 0.02 * dt;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Velocity damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw particle
        const alpha = mouse.active ? Math.min(p.baseAlpha + 0.15, 0.6) : p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse cursor light trail
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
      }

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 3 * dt;
        r.alpha -= 0.008 * dt;
        if (r.alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}