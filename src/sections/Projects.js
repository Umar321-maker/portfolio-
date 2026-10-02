'use client';

import { useEffect, useRef, useState } from 'react';

export default function Projects() {
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

  const projects = [
    {
      title: 'UI/UX Design System',
      description: 'A comprehensive design system with reusable components, color tokens, typography scales, and interactive prototypes built in Figma and implemented in React.',
      technologies: ['Figma', 'React', 'Tailwind CSS', 'Storybook'],
      github: 'https://github.com/Umar321',
      live: 'https://example.com',
      badge: 'Design', badgeColor: '#7c3aed', emoji: '🎨',
    },
    {
      title: 'Defense Prep App',
      description: 'A focused preparation platform for defense exam aspirants with structured study plans, practice tests, and progress tracking to streamline their exam readiness.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      github: 'https://github.com/Umar321/Defense-Prep-App.git',
      live: 'https://defense-prep-app.vercel.app/',
      badge: 'Live', badgeColor: '#16a34a', emoji: '🎖️',
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing projects and skills with modern animations, 3D backgrounds, and clean design principles.',
      technologies: ['Next.js', 'Tailwind CSS', 'Three.js', 'Vercel'],
      github: 'https://github.com/Umar321/Portfolio.git',
      live: 'https://example.com',
      badge: 'Live', badgeColor: '#16a34a', emoji: '🚀',
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0600 0%, #1a0900 50%, #0f0600 100%)' }}>

      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase border"
              style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.25)', color: '#fb923c' }}>
              My Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#ea580c,#d97706)' }} />
            <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: '#a8a29e' }}>
              A mix of UI/UX design work and full-stack development projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index}
                className="group rounded-2xl overflow-hidden transition-all duration-300 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(234,88,12,0.15)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${index * 100}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.45)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(234,88,12,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>

                <div className="relative h-48 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1c0a00, #2d1200)' }}>
                  <span className="text-5xl">{project.emoji}</span>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-white text-xs font-semibold rounded-full"
                      style={{ background: project.badgeColor }}>{project.badge}</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.06), transparent)' }} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm line-clamp-3" style={{ color: '#a8a29e' }}>{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full border"
                        style={{ background: 'rgba(234,88,12,0.08)', borderColor: 'rgba(234,88,12,0.2)', color: '#fb923c' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                      </svg>
                      Code
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(234,88,12,0.45)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border"
              style={{ borderColor: '#ea580c', color: '#fb923c' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fb923c'; }}>
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
