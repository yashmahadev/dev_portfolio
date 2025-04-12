import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { usePortfolio } from '@/contexts/PortfolioContext';

const SkillsSection = () => {
  const { data, loading } = usePortfolio();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const { skills } = data;
  
  // Helper function to render skill level bar
  const renderSkillLevel = (level: number) => {
    return (
      <div className="w-full bg-secondary h-2 rounded-full mt-1">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    );
  };
  
  return (
    <section id="skills">
      <div className="section-container">
        <h2 className="section-title">{skills.title}</h2>
        <p className="section-subtitle">
          {skills.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {skills.categories.map((category, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6 text-center">{category.name}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center">
                        <span>{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      {renderSkillLevel(skill.level)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Core Strengths</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Modern JavaScript frameworks (Vue.js, React.js)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Responsive UI design and implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>API integration and state management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Frontend performance optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Component-based architecture</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Additional Skills</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Project management and task prioritization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Technical documentation and code reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Agile/Scrum methodologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Problem-solving and debugging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Team collaboration and communication</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
