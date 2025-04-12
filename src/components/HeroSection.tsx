import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/contexts/PortfolioContext';

const HeroSection = () => {
  const { data, loading } = usePortfolio();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Track mouse for text effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Get dimensions and position of hero section
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to hero section
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
      
      // Apply text tilt effect with reduced intensity for better readability
      if (textRef.current) {
        const tiltX = y * 3; // Further reduced tilt for stability
        const tiltY = -x * 3; // Further reduced tilt for stability
        textRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    };
    
    // Initialize animation
    setIsLoaded(true);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Letter splitting for text animation
  const renderAnimatedText = (text: string, delay: number = 0) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="inline-block opacity-0 animate-fade-in" 
        style={{ 
          animationDelay: `${delay + (index * 50)}ms`,
          animationFillMode: 'forwards' 
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };
  
  // If data is loading, show a simple loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const { hero } = data;
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 
              ref={textRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-transform duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="block mb-2 overflow-hidden text-foreground">
                {isLoaded && renderAnimatedText("Hi, I'm", 300)}
              </span> 
              <span className="block overflow-hidden bg-clip-text bg-gradient-to-r from-primary to-accent font-extrabold drop-shadow-md">
                {isLoaded && renderAnimatedText(hero.name, 800)}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 overflow-hidden">
              {hero.title} specializing in
              <span className="block font-mono text-primary font-semibold mt-2 animate-typing">
                <span className="inline-block">
                  {hero.specialization}
                </span>
              </span>
            </p>
            
            <p className="text-muted-foreground mb-8 max-w-lg opacity-0 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
              {hero.description}
            </p>
            
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}>
              <Button asChild className="gap-2 relative overflow-hidden group">
                <a href="#contact" className="relative z-10">
                  <span className="absolute inset-0 w-0 bg-accent group-hover:w-full transition-all duration-300 z-0"></span>
                  <Mail className="h-4 w-4 relative z-10" /> 
                  <span className="relative z-10">{hero.callToAction}</span>
                </a>
              </Button>
              
              <Button variant="outline" asChild className="gap-2 relative overflow-hidden group">
                <a href="#projects" className="relative z-10">
                  <span className="absolute inset-0 w-0 bg-primary/10 group-hover:w-full transition-all duration-300 z-0"></span>
                  <span className="relative z-10">{hero.secondaryAction}</span>
                </a>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '1800ms', animationFillMode: 'forwards' }}>
              {hero.socials.map((social, index) => {
                const IconComponent = social.platform === 'github' ? Github : Linkedin;
                return (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 duration-300"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center relative">
            <div 
              className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/70 to-accent/40 backdrop-blur-sm animate-float opacity-0 ${isLoaded ? 'opacity-100 transition-opacity duration-1000 delay-300' : ''}`}
              style={{ 
                transform: isLoaded ? `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` : 'none',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="absolute inset-2 rounded-full bg-background/90 flex items-center justify-center overflow-hidden">
                <div 
                  className="w-full h-full flex items-center justify-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary/70 animate-text-shimmer"
                  style={{ backgroundSize: '200% auto' }}
                >
                  {hero.initials}
                </div>
              </div>
              
              {/* Animated glow orbs */}
              <div className="absolute -inset-4 opacity-40 blur-3xl bg-primary/80 rounded-full animate-pulse-slow"></div>
              <div className="absolute -inset-4 opacity-20 blur-2xl bg-accent/80 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Decorative particles */}
            <div className="absolute w-full h-full">
              {Array.from({ length: 8 }).map((_, index) => (
                <div 
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-primary/40 animate-float"
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
          <a 
            href="#about" 
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Background Effect Elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute w-full whitespace-nowrap font-mono text-5xl opacity-5 animate-scroll-x">
          {Array(10).fill("HTML CSS JAVASCRIPT TYPESCRIPT REACT VUEJS NODEJS").join(" ")}
        </div>
        <div className="absolute top-1/3 w-full whitespace-nowrap font-mono text-5xl opacity-5 animate-scroll-x" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
          {Array(10).fill("FRONTEND BACKEND DATABASE API UI/UX RESPONSIVE").join(" ")}
        </div>
        <div className="absolute bottom-1/4 w-full whitespace-nowrap font-mono text-5xl opacity-5 animate-scroll-x" style={{ animationDuration: '35s' }}>
          {Array(10).fill("DEVELOPER ENGINEER DESIGNER PROGRAMMER CODER").join(" ")}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
