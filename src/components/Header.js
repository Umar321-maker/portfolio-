'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,5,0,0.95)' : 'rgba(10,5,0,0.6)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(234,88,12,0.2)' : '1px solid transparent',
      }}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight"
              style={{ background: 'linear-gradient(90deg,#ea580c,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Umar Farook
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.name} onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                style={{ color: '#a8a29e' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
                onMouseLeave={e => e.currentTarget.style.color = '#a8a29e'}>
                {item.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: '#ea580c' }} />
              </button>
            ))}
            <button onClick={() => scrollToSection('#contact')}
              className="ml-4 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)', boxShadow: '0 0 20px rgba(234,88,12,0.3)' }}>
              Hire Me
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg" style={{ color: '#a8a29e' }}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t" style={{ borderColor: 'rgba(234,88,12,0.15)' }}>
            <div className="pt-3 space-y-1">
              {navItems.map((item) => (
                <button key={item.name} onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                  style={{ color: '#a8a29e' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fb923c'; e.currentTarget.style.background = 'rgba(234,88,12,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#a8a29e'; e.currentTarget.style.background = 'transparent'; }}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
