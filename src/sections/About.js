'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { title: 'UI/UX Design', desc: 'Pixel-perfect interfaces with Figma, wireframes & prototypes.', icon: '🎨' },
    { title: 'Clean Code', desc: 'Maintainable and scalable code for long-term success.', icon: '💻' },
    { title: 'Creative Design', desc: 'Modern UI with smooth, accessible user experiences.', icon: '✨' },
    { title: 'Problem Solving', desc: 'Innovative solutions for complex challenges.', icon: '⚡' },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0600 0%, #1a0900 50%, #0f0600 100%)' }}>

      <div className="absolute top-20 left-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)' }} />

      <div className={`max-w-5xl mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase border"
            style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.25)', color: '#fb923c' }}>
            Who I Am
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">About Me</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#a8a29e' }}>
            I am a passionate Backend Developer and Creative Problem Solver with a knack for creating efficient and scalable backend solutions. My expertise lies in transforming complex problems into elegant solutions, ensuring seamless performance across all platforms.  
          </p>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, #ea580c, #d97706)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Backend Developer</h3>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>
              I specialize in building robust backend systems using Node.js, Python, and modern backend technologies. My focus is on creating scalable APIs, efficient database management, and seamless integration with frontend applications.
            </p>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>
              With a strong eye for design and expertise in React, Next.js, and Node.js, I create products that are both beautiful and performant.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {highlights.map((item, index) => (
                <div key={index} className="p-4 rounded-xl transition-all duration-300 border"
                  style={{ background: 'rgba(234,88,12,0.06)', borderColor: 'rgba(234,88,12,0.15)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,88,12,0.12)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(234,88,12,0.06)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.15)'; }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs leading-snug" style={{ color: '#78716c' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              { skill: 'UI/UX Design', level: 75 },
              { skill: 'Frontend Development', level: 50 },
              { skill: 'Backend Development', level: 95 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">{item.skill}</span>
                  <span className="text-sm font-semibold" style={{ color: '#ea580c' }}>{item.level}%</span>
                </div>
                <div className="w-full rounded-full h-2.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${item.level}%` : '0%', transitionDelay: `${index * 200}ms`, background: 'linear-gradient(90deg, #ea580c, #d97706)' }} />
                </div>
              </div>
            ))}

            <div className="mt-8 p-5 rounded-2xl border"
              style={{ background: 'rgba(234,88,12,0.06)', borderColor: 'rgba(234,88,12,0.2)' }}>
              <p className="text-sm font-semibold text-white mb-3">Design Process</p>
              <div className="flex flex-wrap gap-2">
                {['Research', 'Wireframe', 'Prototype', 'Test', 'Ship'].map((step, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium border"
                    style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.2)', color: '#fb923c' }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: 'rgba(234,88,12,0.3)' }}>{i + 1}</span>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
