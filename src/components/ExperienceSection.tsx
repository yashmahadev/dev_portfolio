
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Eminenture",
    location: "Vadodara, Gujarat, India",
    period: "August 2021 - Present",
    description: [
      "Lead frontend development for multiple client projects using Vue.js and React.js",
      "Architect and implement scalable frontend solutions with focus on performance and user experience",
      "Collaborate with cross-functional teams to deliver high-quality web applications",
      "Mentor junior developers and conduct code reviews to ensure code quality",
      "Implement CI/CD pipelines and optimize deployment processes"
    ],
    technologies: ["Vue.js", "React.js", "Node.js", "TypeScript", "RESTful APIs", "MongoDB"]
  },
  {
    title: "Software Engineer",
    company: "Biz4Group",
    location: "Surat, Gujarat, India",
    period: "June 2019 - July 2021",
    description: [
      "Developed responsive web applications using Vue.js, React.js, and Node.js",
      "Created and integrated RESTful APIs for client-server communication",
      "Implemented state management solutions using Vuex and Redux",
      "Contributed to UI/UX design and implementation processes",
      "Worked closely with backend teams to ensure seamless integration"
    ],
    technologies: ["Vue.js", "React.js", "JavaScript", "CSS3", "SASS", "Node.js", "MySQL"]
  },
  {
    title: "Junior Web Developer",
    company: "Startup Experience",
    location: "Remote",
    period: "January 2018 - May 2019",
    description: [
      "Assisted in the development of web applications using JavaScript and PHP",
      "Created responsive UI layouts using HTML5, CSS3, and Bootstrap",
      "Participated in code reviews and implemented feedback",
      "Collaborated with designers to implement UI components",
      "Learned and applied modern web development practices"
    ],
    technologies: ["JavaScript", "PHP", "HTML5", "CSS3", "Bootstrap", "jQuery", "MySQL"]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-secondary/50">
      <div className="section-container">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          My professional journey in software development
        </p>
        
        <div className="space-y-8 mt-12 relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"></div>
              
              <Card className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} bg-card/50 backdrop-blur-sm relative z-20`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  
                  <div className="flex items-center mt-2 mb-4">
                    <Building className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{exp.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                      <span className="text-muted-foreground">{exp.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                      <span className="text-muted-foreground">{exp.location}</span>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2 text-sm">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
