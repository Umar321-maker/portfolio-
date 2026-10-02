'use client';

import { useEffect, useRef, useState } from 'react';

export default function Skills() {
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

  const skillCategories = [
    {
      title: 'Frontend', icon: '💻',
      skills: [
        { name: 'React', level: 75, color: 'linear-gradient(90deg,#3b82f6,#1d4ed8)' },
        { name: 'Next.js', level: 70, color: 'linear-gradient(90deg,#6b7280,#374151)' },
        { name: 'JavaScript', level: 82, color: 'linear-gradient(90deg,#eab308,#a16207)' },
        { name: 'Tailwind CSS', level: 88, color: 'linear-gradient(90deg,#06b6d4,#0e7490)' },
        { name: 'HTML/CSS', level: 96, color: 'linear-gradient(90deg,#ea580c,#c2410c)' },
      ]
    },
    {
      title: 'Backend & Tools', icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 88, color: 'linear-gradient(90deg,#22c55e,#15803d)' },
        { name: 'Express', level: 85, color: 'linear-gradient(90deg,#6b7280,#374151)' },
        { name: 'MongoDB', level: 70, color: 'linear-gradient(90deg,#16a34a,#14532d)' },
        { name: 'Git', level: 92, color: 'linear-gradient(90deg,#ea580c,#c2410c)' },
        { name: 'Docker', level: 75, color: 'linear-gradient(90deg,#ea580c,#c2410c)' },
      ]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0900 0%, #0f0600 50%, #1a0900 100%)' }}>

      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase border"
              style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.25)', color: '#fb923c' }}>
              What I bring to the table
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#ea580c,#d97706)' }} />
            <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: '#a8a29e' }}>
              I specialize in building robust backend systems and APIs, while also having a strong grasp of frontend technologies. My skill set includes Node.js, Express, MongoDB, React, Next.js, and Tailwind CSS. I am passionate about creating efficient, scalable, and maintainable code that delivers exceptional user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}
                className="rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(234,88,12,0.15)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.4)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(234,88,12,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-sm" style={{ color: '#d6d3d1' }}>{skill.name}</span>
                        <span className="font-semibold text-sm" style={{ color: '#ea580c' }}>{skill.level}%</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: isVisible ? `${skill.level}%` : '0%', background: skill.color, transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="mb-6 text-sm" style={{ color: '#78716c' }}>Always learning · Always designing · Always shipping</p>
            <a href="/resume.pdf" download
              className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)', boxShadow: '0 0 30px rgba(234,88,12,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 45px rgba(234,88,12,0.5)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(234,88,12,0.3)'}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
