import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 gradient-text">About Me</h2>
        
        <div className="glass-card p-8 mb-10">
          <p className="mb-6 text-lg">
            I am a passionate software professional with a diverse background in engineering, 
            data analysis, and agile methodologies. With a strong foundation in both technical 
            and leadership skills, I excel at bridging the gap between complex technical concepts 
            and business needs.
          </p>
          <p className="mb-6 text-lg">
            My experience spans across full-stack development, data engineering, and project 
            management, allowing me to approach problems with a holistic perspective. I'm 
            dedicated to creating efficient, scalable solutions that drive business value while 
            maintaining high standards of code quality.
          </p>
          <p className="text-lg">
            When I'm not coding, I enjoy expanding my knowledge through continuous learning, 
            participating in tech communities, and exploring new technologies that push the 
            boundaries of what's possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 futuristic-border">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 
                'AWS', 'Docker', 'Data Analysis', 'Agile Methodologies', 
                'Project Management', 'CI/CD'].map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6 futuristic-border">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="mb-4">
              <h4 className="font-medium">Master's in Computer Science</h4>
              <p className="text-sm opacity-80">University of Utah, 2018-2020</p>
            </div>
            <div>
              <h4 className="font-medium">Bachelor's in Business Administration</h4>
              <p className="text-sm opacity-80">University of Phoenix, 2014-2018</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 