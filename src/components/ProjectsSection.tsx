
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  // {
  //   title: "E-commerce Platform",
  //   description: "A full-featured e-commerce platform with product management, shopping cart, and payment integration.",
  //   image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400",
  //   technologies: ["Vue.js", "Vuex", "Node.js", "Express", "MongoDB"],
  //   links: {
  //     demo: "#",
  //     github: "#"
  //   }
  // },
  // {
  //   title: "Task Management App",
  //   description: "A collaborative task management application with real-time updates and team collaboration features.",
  //   image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400",
  //   technologies: ["React.js", "Redux", "Firebase", "Material UI"],
  //   links: {
  //     demo: "#",
  //     github: "#"
  //   }
  // },
  // {
  //   title: "Real Estate Marketplace",
  //   description: "A platform for property listings with advanced search features and interactive maps.",
  //   image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400",
  //   technologies: ["Vue.js", "Nuxt.js", "Laravel", "MySQL", "Google Maps API"],
  //   links: {
  //     demo: "#",
  //     github: "#"
  //   }
  // },
  // {
  //   title: "Social Media Dashboard",
  //   description: "An analytics dashboard for monitoring social media metrics and engagement.",
  //   image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400",
  //   technologies: ["React.js", "Chart.js", "Node.js", "Express", "Social Media APIs"],
  //   links: {
  //     demo: "#",
  //     github: "#"
  //   }
  // },
  // {
  //   title: "Healthcare Portal",
  //   description: "A patient management system for healthcare providers with appointment scheduling and medical records.",
  //   image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400",
  //   technologies: ["Vue.js", "Express.js", "MongoDB", "Socket.io"],
  //   links: {
  //     demo: "#",
  //     github: "#"
  //   }
  // }
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Calculate card tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!cardsRef.current) return;
    
    const card = cardsRef.current.children[index] as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation values
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    
    // Apply the transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  // Reset card tilt on mouse leave
  const handleMouseLeave = (index: number) => {
    if (!cardsRef.current) return;
    
    const card = cardsRef.current.children[index] as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };
  
  return (
    <section id="projects">
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          A selection of my recent work and personal projects
        </p>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden flex flex-col h-full transition-all duration-300 will-change-transform ${
                activeProject === index ? 'shadow-lg shadow-primary/20 dark:shadow-primary/10' : 'hover:shadow-md'
              }`}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => {
                setActiveProject(null);
                handleMouseLeave(index);
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
            >
              <div className="h-48 overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                      View Details
                    </Button>
                  </div>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col bg-card">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="bg-primary/5 transition-colors duration-300 hover:bg-primary/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto pt-4 border-t">
                  <a 
                    href={project.links.demo} 
                    className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      Live Demo
                    </span>
                  </a>
                  <a 
                    href={project.links.github} 
                    className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      Source Code
                    </span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
