'use client';

import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'CodeHuskAI',
      description: 'An AI-driven code refactoring agent that analyzes repositories, enforces best practices, and suggests automated improvements without introducing breaking changes. Inspired by AI-driven learning and evaluation tools.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'Git Integration', 'CI/CD'],
      color: 'from-[var(--primary)]/20 to-[var(--secondary)]/20',
      link: 'https://github.com/CoffeeCat0214/CodeHuskAI'
    },
    {
      id: 2,
      title: 'CremeAI',
      description: 'Inspired by my cat, Crème Brûlée, CremeAI is an intelligent Discord chatbot powered by OpenAI. Built on a serverless AWS Lambda architecture, it leverages OpenAI\'s language models for natural interactions, integrates DynamoDB caching for fast responses, and implements rate limiting for fair usage.',
      technologies: ['AWS Lambda', 'DynamoDB', 'OpenAI API', 'Discord API', 'CloudWatch'],
      color: 'from-[var(--secondary)]/20 to-[var(--accent)]/20',
      link: 'https://github.com/CoffeeCat0214/CremeAI'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Projects</h2>
        
        <p className="mb-12 text-lg max-w-3xl">
          Here are some of the projects I've worked on, showcasing my skills in software development,
          AI integration, and cloud architecture.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass-card overflow-hidden futuristic-border">
              <div className={`h-48 bg-gradient-to-br ${project.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl opacity-70">{project.title}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4 text-[var(--text)]/80">{project.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/CoffeeCat0214" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary)]/90 transition-colors"
          >
            See More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 