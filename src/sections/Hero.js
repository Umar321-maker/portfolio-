'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

function FloatingGeometry() {
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += (mouseRef.current.y * 0.4 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mouseRef.current.x * 0.4 - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh position={[3, 0.5, -2]}>
          <torusGeometry args={[1.2, 0.25, 16, 100]} />
          <meshStandardMaterial color="#ea580c" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[-3, 1, -3]}>
          <octahedronGeometry args={[0.9]} />
          <meshStandardMaterial color="#c2410c" wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[0, -2, -2]}>
          <icosahedronGeometry args={[0.7]} />
          <meshStandardMaterial color="#d97706" wireframe />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[-1.5, -1, -1]}>
          <tetrahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#b45309" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const ref = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0008;
    ref.current.rotation.x += (mouseRef.current.y * 0.15 - ref.current.rotation.x) * 0.03;
    ref.current.rotation.y += mouseRef.current.x * 0.008;
  });

  const count = 1200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#d97706" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Backend Developer'];
  const fullText = roles[roleIndex];
  const rolesLength = roles.length;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
      const pause = setTimeout(() => {
        setIsTypingComplete(false);
        setDisplayText('');
        setCurrentIndex(0);
        setRoleIndex((prev) => (prev + 1) % rolesLength);
      }, 2000);
      return () => clearTimeout(pause);
    }
  }, [currentIndex, fullText, rolesLength]);

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0500 0%, #1a0800 40%, #0f0500 70%, #1c0a00 100%)' }}>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 70 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ea580c" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d97706" />
          <Suspense fallback={null}>
            <Stars radius={80} depth={50} count={2500} factor={4} saturation={0} fade speed={0.8} />
            <FloatingGeometry />
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(234,88,12,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
              style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ea580c' }}></span>
              <span className="text-sm font-medium" style={{ color: '#fb923c' }}>Available for work</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hello, I&apos;m{' '}
              <span style={{ background: 'linear-gradient(90deg, #ea580c, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Umar Farook
              </span>
            </h1>

            <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 min-h-[4rem] flex items-center justify-center lg:justify-start">
              <span className="font-mono rounded-lg px-4 py-2 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(234,88,12,0.25)' }}>
                {displayText}
                <span className={`inline-block w-0.5 h-6 ml-1 ${isTypingComplete ? 'opacity-0' : 'animate-pulse'}`}
                  style={{ background: '#ea580c' }}></span>
              </span>
            </div>

            <p className="text-lg mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ color: '#a8a29e' }}>
              I design intuitive interfaces and build full-stack applications — bridging the gap between
              beautiful design and clean, performant code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button onClick={() => scrollToSection('#projects')}
                className="group relative text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden shadow-lg"
                style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 0 30px rgba(234,88,12,0.3)' }}>
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <button onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2"
                style={{ borderColor: '#ea580c', color: '#fb923c' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fb923c'; }}>
                Get In Touch
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in-down">
            <div className="relative w-full max-w-md">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-orange-500/30 mx-auto flex items-center justify-center text-4xl font-bold"
                style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.2), rgba(15,6,0,0.95))', boxShadow: '0 0 40px rgba(234,88,12,0.25)' }}>
                UF
              </div>
              <div className="absolute inset-0 rounded-full border animate-spin"
                style={{ borderColor: 'rgba(234,88,12,0.2)', animationDuration: '8s' }}></div>
              <div className="absolute -inset-4 rounded-full border animate-spin"
                style={{ borderColor: 'rgba(217,119,6,0.1)', animationDuration: '12s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-1">
          <div className="w-6 h-10 rounded-full flex justify-center border-2" style={{ borderColor: 'rgba(234,88,12,0.4)' }}>
            <div className="w-0.5 h-3 mt-2 animate-pulse rounded-full" style={{ background: '#ea580c' }}></div>
          </div>
          <span className="text-xs" style={{ color: '#57534e' }}>scroll</span>
        </div>
      </div>
    </section>
  );
}
