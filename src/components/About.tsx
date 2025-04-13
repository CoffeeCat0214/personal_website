import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 gradient-text">About Me</h2>
        
        <div className="glass-card p-8 mb-10">
          <p className="text-lg">
            Backend Software Engineer with 3+ years of experience designing scalable, data-driven systems in cloud-native environments (AWS). 
            Proven track record building distributed Spark-based ETL pipelines and performant APIs used across high-traffic adtech platforms. 
            Proficient in Java, Scala, and Python, with a focus on system efficiency, observability, and iterative, test-driven development. 
            Skilled at working across the stack—from infrastructure to application logic—and passionate about building resilient microservices 
            and ML-adjacent data systems that connect people with meaningful outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 futuristic-border">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Scala', 'Python', 'AWS', 'Spark', 'ETL', 
                'Microservices', 'API Design', 'Test-Driven Development', 
                'Cloud-Native', 'Data Systems', 'Observability'].map((skill) => (
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
            <div>
              <h4 className="font-medium">Bachelor of Science in Software Engineering</h4>
              <p className="text-sm opacity-80">Miami University, Oxford, OH | 2019-2022</p>
              <ul className="mt-2 text-sm opacity-80 list-disc list-inside">
                <li>Cumulative GPA: 4.00/4.00</li>
                <li>Latin Honors: Summa Cum Laude</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 