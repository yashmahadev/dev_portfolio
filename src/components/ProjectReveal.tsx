
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    demo: string;
    github: string;
  };
  details?: string;
}

interface ProjectRevealProps {
  projects: Project[];
}

const ProjectReveal: React.FC<ProjectRevealProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [detailsView, setDetailsView] = useState<number | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (detailsView !== null) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (detailsView !== null) return;
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  const openDetails = (index: number) => {
    setDetailsView(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeDetails = () => {
    setDetailsView(null);
    document.body.style.overflow = '';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 relative">
      {projects.map((project, index) => (
        <Card 
          key={index} 
          className={`overflow-hidden flex flex-col h-full transition-all duration-300 will-change-transform hover-card ${
            activeProject === index ? 'shadow-lg shadow-primary/20 dark:shadow-primary/10' : 'hover:shadow-md'
          }`}
          onMouseEnter={() => setActiveProject(index)}
          onMouseLeave={() => {
            setActiveProject(null);
            handleMouseLeave;
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          style={{ 
            transformStyle: 'preserve-3d', 
            transition: 'transform 0.2s ease-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out' 
          }}
        >
          <div className="h-48 overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-background/80 backdrop-blur-sm"
                  onClick={() => openDetails(index)}
                >
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
          <div className="p-6 flex-grow flex flex-col bg-card">
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
          </div>
        </Card>
      ))}
      
      {/* Project Details Modal */}
      {detailsView !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div 
            className="bg-card w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-2xl p-6 relative"
            style={{
              transform: 'translateY(0)',
              animation: 'modal-in 0.3s ease-out'
            }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-4 top-4 z-10"
              onClick={closeDetails}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 md:h-full overflow-hidden rounded-lg">
                <img 
                  src={projects[detailsView].image} 
                  alt={projects[detailsView].title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-4">{projects[detailsView].title}</h2>
                <p className="text-muted-foreground mb-6">{projects[detailsView].description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[detailsView].technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                
                <p className="mb-6">{projects[detailsView].details || "Detailed project information coming soon."}</p>
                
                <div className="flex gap-4 mt-auto">
                  <Button asChild>
                    <a href={projects[detailsView].links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={projects[detailsView].links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectReveal;
