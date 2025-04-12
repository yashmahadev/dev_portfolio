
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Monitor, Sparkles } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-secondary/50">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          I'm a dedicated software engineer with a passion for building web applications that deliver exceptional user experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Frontend Development</h3>
              <p className="text-muted-foreground">
                Specialized in building modern, responsive user interfaces using Vue.js, React.js, and other frontend technologies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Stack Development</h3>
              <p className="text-muted-foreground">
                Experienced in both frontend and backend technologies, including Node.js, Express, and various databases.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">UI/UX Focus</h3>
              <p className="text-muted-foreground">
                Committed to creating intuitive, accessible, and visually appealing user interfaces with attention to detail.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="py-6">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg mb-4">
                  I'm a software engineer with over 5 years of experience in web development. My journey in technology started with a passion for creating intuitive user interfaces, and has evolved into expertise across the full development stack.
                </p>
                <p className="text-lg mb-4">
                  My professional experience includes working at Eminenture and Biz4Group, where I've contributed to various projects ranging from e-commerce platforms to enterprise applications.
                </p>
                <p className="text-lg">
                  When I'm not coding, I enjoy staying updated with the latest technology trends, contributing to open-source projects, and continuously improving my skills through learning and experimentation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
