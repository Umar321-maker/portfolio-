'use client';

import { GitHubIcon, LinkedInIcon, TwitterIcon } from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Umar321', icon: <GitHubIcon className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/umar-farook-jatu-1b8b0b1b8/', icon: <LinkedInIcon className="w-5 h-5" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <TwitterIcon className="w-5 h-5" /> },
  ];

  return (
    <footer className="relative py-10 border-t"
      style={{ background: '#0a0500', borderColor: 'rgba(234,88,12,0.15)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-lg font-bold mb-1"
              style={{ background: 'linear-gradient(90deg,#ea580c,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Umar Farook
            </h2>
            <p className="text-xs" style={{ color: '#57534e' }}>Backend Developer</p>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(234,88,12,0.2)', color: '#78716c' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 15px rgba(234,88,12,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#78716c'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                aria-label={link.name}>
                {link.icon}
              </a>
            ))}
          </div>

          <p className="text-xs" style={{ color: '#57534e' }}>
            © {currentYear} Umar Farook. Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
