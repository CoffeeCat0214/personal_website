import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Data Analytics Dashboard',
      description: 'A comprehensive dashboard for visualizing business metrics and KPIs with interactive charts and filters.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'Express'],
      image: '/projects/data-dashboard.jpg', // Placeholder - you'll need to add actual images
      link: 'https://github.com/CoffeeCat0214/data-dashboard'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with product catalog, shopping cart, payment processing, and user authentication.',
      technologies: ['Next.js', 'MongoDB', 'Stripe API', 'Tailwind CSS', 'Auth0'],
      image: '/projects/ecommerce.jpg', // Placeholder
      link: 'https://github.com/CoffeeCat0214/ecommerce-platform'
    },
    {
      id: 3,
      title: 'Machine Learning Pipeline',
      description: 'An end-to-end ML pipeline for data processing, model training, evaluation, and deployment with automated workflows.',
      technologies: ['Python', 'TensorFlow', 'AWS Lambda', 'Docker', 'Kubernetes'],
      image: '/projects/ml-pipeline.jpg', // Placeholder
      link: 'https://github.com/CoffeeCat0214/ml-pipeline'
    },
    {
      id: 4,
      title: 'Personal Finance Tracker',
      description: 'A web application that helps users manage expenses, track investments, and set financial goals with visualization tools.',
      technologies: ['React', 'Firebase', 'Chart.js', 'Material UI', 'PWA'],
      image: '/projects/finance-tracker.jpg', // Placeholder
      link: 'https://github.com/CoffeeCat0214/finance-tracker'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Projects</h2>
        
        <p className="mb-12 text-lg max-w-3xl">
          Here are some of the projects I've worked on, showcasing my skills in software development,
          data engineering, and creative problem-solving.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass-card overflow-hidden futuristic-border">
              <div className="h-48 bg-[var(--primary)]/10 relative">
                {/* Placeholder for project images */}
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
                
                <Link 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-md hover:bg-[var(--primary)]/10 transition-colors"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="https://github.com/CoffeeCat0214" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary)]/90 transition-colors"
          >
            See More on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects; 