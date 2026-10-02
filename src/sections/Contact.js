'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 4000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { icon: '📧', title: 'Email', value: 'umarkyamkhani04@gmail.com', link: 'mailto:umarkyamkhani04@gmail.com' },
    { icon: '📱', title: 'Phone', value: '7240172591', link: 'tel:7240172591' },
    { icon: '📍', title: 'Location', value: 'Gujarat, Ahmedabad', link: '#' },
  ];

  const inputStyle = { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(234,88,12,0.2)', color: '#fff' };

  return (
    <section id="contact" className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0900 0%, #0f0600 100%)' }}>

      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 tracking-wide uppercase border"
            style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.25)', color: '#fb923c' }}>
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#ea580c,#d97706)' }} />
          <p className="mt-4 max-w-2xl mx-auto text-sm" style={{ color: '#a8a29e' }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Let&apos;s talk about your project</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border"
                    style={{ background: 'rgba(234,88,12,0.1)', borderColor: 'rgba(234,88,12,0.2)' }}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{method.title}</h4>
                    <a href={method.link} className="text-sm transition-colors duration-200" style={{ color: '#a8a29e' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ea580c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#a8a29e'}>
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="font-semibold text-white mb-4">Follow me on</h4>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com/Umar321' },
                  { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/umar-farook-jatu-1b8b0b1b8/' },
                  { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com' },
                ].map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 border"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(234,88,12,0.2)', color: '#a8a29e' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#ea580c'; e.currentTarget.style.boxShadow = '0 0 20px rgba(234,88,12,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#a8a29e'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                    aria-label={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {['name', 'email'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2 capitalize" style={{ color: '#d6d3d1' }}>{field} *</label>
                    <input type={field === 'email' ? 'email' : 'text'} name={field} value={formData[field]}
                      onChange={handleChange} required
                      placeholder={field === 'email' ? 'your@email.com' : 'Your Name'}
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 placeholder-stone-600"
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = '#ea580c'}
                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)'} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#d6d3d1' }}>Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  placeholder="Project Discussion"
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 placeholder-stone-600"
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#ea580c'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)'} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#d6d3d1' }}>Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 resize-none placeholder-stone-600"
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = '#ea580c'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)'} />
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)', boxShadow: '0 0 30px rgba(234,88,12,0.3)' }}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="px-4 py-3 rounded-xl border text-sm"
                  style={{ background: 'rgba(22,163,74,0.1)', borderColor: 'rgba(22,163,74,0.3)', color: '#4ade80' }}>
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="px-4 py-3 rounded-xl border text-sm"
                  style={{ background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#f87171' }}>
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
