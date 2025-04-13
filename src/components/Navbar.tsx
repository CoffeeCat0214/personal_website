'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
      scrolled ? 'backdrop-filter backdrop-blur-md bg-[var(--background)]/80 shadow-lg' : ''
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="font-bold text-xl"
        >
          <span className="gradient-text">Kyrstin Kauchak</span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-md transition-all relative ${
                activeSection === item.href.replace('/', '') || (item.href === '/' && activeSection === 'home')
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text)] hover:text-[var(--primary)]'
              }`}
            >
              {item.name}
              {(activeSection === item.href.replace('/', '') || (item.href === '/' && activeSection === 'home')) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)] rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
} 