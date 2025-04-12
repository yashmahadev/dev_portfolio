import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Monitor, Sparkles, LucideIcon } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';

const AboutSection = () => {
  const { data, loading } = usePortfolio();
  
  if (loading) {
    return <div className="min-h-screen bg-secondary/50 flex items-center justify-center">Loading...</div>;
  }
  
  const { about } = data;
  
  // Map icon strings to icon components
  const getIconComponent = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      Code,
      Monitor,
      Sparkles
    };
    
    return icons[iconName as keyof typeof icons] || Code;
  };
  
  return (
    <section id="about" className="bg-secondary/50">
      <div className="section-container">
        <h2 className="section-title">{about.title}</h2>
        <p className="section-subtitle">
          {about.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {about.skills.map((skill, index) => {
            const IconComponent = getIconComponent(skill.icon);
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-16">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="py-6">
              <div className="max-w-3xl mx-auto">
                {about.bio.map((paragraph, index) => (
                  <p key={index} className="text-lg mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
