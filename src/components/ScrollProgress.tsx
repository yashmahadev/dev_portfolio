
import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewSection, setViewSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page we've scrolled
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx * 100;
      
      setScrollProgress(scrolled);
      
      // Determine which section is currently in view
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setViewSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      <div className="h-64 w-1 bg-muted/20 rounded-full relative overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <div className="text-xs font-mono text-muted-foreground rotate-90 origin-center mt-4">
        {viewSection.toUpperCase()}
      </div>
    </div>
  );
};

export default ScrollProgress;
