import Image from 'next/image';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
// We'll need to create Experience and Contact components later

export default function Home() {
  return (
    <>
      <Hero catImage={{
        src: "/images/cat-profile.png",
        alt: "My coding buddy"
      }} />
      <About />
      <Projects />
      {/* Experience and Contact sections will be added here */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Experience</h2>
          <div className="glass-card p-8">
            <div className="space-y-8">
              <div className="border-l-2 border-[var(--primary)] pl-6 relative">
                <div className="absolute w-4 h-4 bg-[var(--primary)] rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-semibold">Software Engineer II</h3>
                <p className="text-[var(--secondary)] mb-2">Data Engineering | 2022- Present</p>
                <p className="text-[var(--text)]/80">Led the development of microservices architecture, improving system reliability by 40%. Mentored junior developers and implemented CI/CD pipelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Contact Me</h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 futuristic-border">
              <p className="mb-8 text-lg">
                Interested in working together or have a question? Feel free to reach out!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <a href="mailto:kauchakmk@gmail.com" className="text-[var(--text)] hover:text-[var(--primary)]">
                    kauchakmk@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <a href="https://github.com/CoffeeCat0214" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                    github.com/CoffeeCat0214
                  </a>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <a href="https://www.linkedin.com/in/kyrstin-mariko-kauchak/" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--primary)]">
                    linkedin.com/in/kyrstin-mariko-kauchak
                  </a>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <span className="text-[var(--text)]">New York, New York</span>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="mailto:kauchakmk@gmail.com" 
                  className="btn-primary inline-block"
                >
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
