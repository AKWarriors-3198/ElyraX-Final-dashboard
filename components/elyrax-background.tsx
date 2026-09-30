"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ElyraXBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const count = Math.min(80, Math.floor((width * height) / 25000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.08,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 0.5;
      const spacing = 80;
      const offset = (Date.now() * 0.003) % spacing;

      for (let x = -spacing + offset; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -spacing + offset; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.008;
          p.vx -= dx * force * 0.01;
          p.vy -= dy * force * 0.01;
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawLightStreaks = () => {
      const time = Date.now() * 0.0001;

      // Horizontal streak
      const streakY = height * 0.3 + Math.sin(time * 2) * height * 0.1;
      const streakX = ((time * 50) % (width + 400)) - 200;
      const gradient = ctx.createLinearGradient(streakX - 150, 0, streakX + 150, 0);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.015)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(streakX - 150, streakY - 1, 300, 2);

      // Diagonal accent streak
      const diagX = ((time * 30) % (width + 600)) - 300;
      const diagGradient = ctx.createLinearGradient(diagX - 100, 0, diagX + 100, height);
      diagGradient.addColorStop(0, "rgba(139, 92, 246, 0)");
      diagGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.008)");
      diagGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = diagGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawAmbientGlow = () => {
      // Top-right subtle glow
      const grd1 = ctx.createRadialGradient(
        width * 0.85, height * 0.1, 0,
        width * 0.85, height * 0.1, width * 0.4
      );
      grd1.addColorStop(0, "rgba(255, 255, 255, 0.015)");
      grd1.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, width, height);

      // Bottom-left accent glow
      const grd2 = ctx.createRadialGradient(
        width * 0.1, height * 0.9, 0,
        width * 0.1, height * 0.9, width * 0.35
      );
      grd2.addColorStop(0, "rgba(139, 92, 246, 0.02)");
      grd2.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawAmbientGlow();
      drawGrid();
      drawLightStreaks();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
