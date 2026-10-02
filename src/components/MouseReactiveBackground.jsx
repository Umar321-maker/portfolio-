'use client';

import { useEffect, useRef, useState } from 'react';

export default function MouseReactiveBackground() {
  const containerRef = useRef(null);
  const [dimensionsReady, setDimensionsReady] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Generate particles client-side only to avoid hydration mismatch
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 2.5 + Math.random() * 3.5,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const t = setTimeout(() => setDimensionsReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!dimensionsReady) return;
    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.current.x = (e.clientX / w) * 2 - 1;
      target.current.y = (e.clientY / h) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [dimensionsReady]);

  useEffect(() => {
    if (!dimensionsReady) return;
    const el = containerRef.current;
    if (!el) return;

    const animate = () => {
      const ease = 0.09;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      const x = current.current.x;
      const y = current.current.y;
      const positionX = x * 18;
      const positionY = y * 14;
      const rotateY = x * 10;
      const rotateX = -y * 8;
      const rotateZ = x * 2;
      const scale = 1.0 + Math.abs(x) * 0.01;

      el.style.transform = `translate3d(${positionX}px, ${positionY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [dimensionsReady]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 opacity-40" />
      <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-orange-500/40 mix-blend-soft-light blur-3xl" />
      <div className="absolute top-10 right-[-6rem] w-80 h-80 rounded-full bg-amber-500/35 mix-blend-soft-light blur-3xl" />
      <div className="absolute bottom-[-7rem] left-1/3 w-72 h-72 rounded-full bg-yellow-500/30 mix-blend-soft-light blur-3xl" />

      <div className="absolute inset-0 opacity-60">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-orange-300/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.65; }
          50% { transform: translate3d(0, -18px, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
