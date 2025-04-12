
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const skills = {
  frontend: [
    'Vue.js', 'React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3',
    'Tailwind CSS', 'SASS/SCSS', 'Redux', 'Context API', 'Webpack'
  ],
  backend: [
    'Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'PHP', 'Laravel',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'
  ],
  tools: [
    'Git', 'GitHub', 'GitLab', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Figma',
    'VS Code', 'Postman', 'Jest', 'Cypress'
  ]
};

const SkillsSection = () => {
  return (
    <section id="skills">
      <div className="section-container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          My technical toolkit includes a range of technologies, frameworks, and methodologies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 text-center">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 text-center">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 text-center">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
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
