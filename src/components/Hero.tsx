'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Software Engineer | Data Professional | Agile Leader';
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 75);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 pt-16">
      <div className="max-w-4xl w-full glass-card p-8 md:p-12 futuristic-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="gradient-text">Kyrstin Kauchak</span>
            </h1>
            
            <div className="h-8 mb-6">
              <p className="text-xl text-[var(--secondary)] opacity-80">
                {typedText}<span className="animate-pulse">|</span>
              </p>
            </div>
            
            <p className="text-lg mb-8 text-[var(--text)]/80 leading-relaxed">
              A passionate software professional with expertise in creating innovative solutions that drive business value.
              I combine technical skills with strategic thinking to deliver impactful results.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Contact Me
              </Link>
              <Link href="/projects" className="px-6 py-2 border border-[var(--accent)] text-[var(--accent)] font-semibold rounded-md transition-all hover:bg-[var(--accent)]/10">
                View My Work
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 relative">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/50 via-[var(--secondary)]/30 to-[var(--accent)]/40 mix-blend-overlay" />
              <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center">
                <span className="text-6xl">KK</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-center space-x-8">
          <a href="https://github.com/CoffeeCat0214" target="_blank" rel="noopener noreferrer" className="text-[var(--text)]/70 hover:text-[var(--accent)] transition-colors">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/kyrstin-mariko-kauchak/" target="_blank" rel="noopener noreferrer" className="text-[var(--text)]/70 hover:text-[var(--accent)] transition-colors">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="mailto:your-email@example.com" className="text-[var(--text)]/70 hover:text-[var(--accent)] transition-colors">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 