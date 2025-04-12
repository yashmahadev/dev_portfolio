
import React, { useEffect, useRef, useState } from 'react';

interface ParallaxBackgroundProps {
  className?: string;
  intensity?: number;
  useGyroscope?: boolean;
  cursorGlow?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  className, 
  intensity = 1,
  useGyroscope = true,
  cursorGlow = false // Set default to false since we're removing the feature
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse-based parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage of screen
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;
      
      setMousePosition({ x: xPos, y: yPos });
      
      // Apply parallax effect to the background elements with reduced intensity
      const elements = backgroundRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.2 * intensity); // Further reduced speed
        const htmlEl = el as HTMLElement;
        
        const xOffset = xPos * speed * 15; // Further reduced movement
        const yOffset = yPos * speed * 15; // Further reduced movement
        const scaleOffset = 1 + Math.abs(xPos * yPos) * 0.03; // Further reduced scale effect
        
        htmlEl.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scaleOffset})`;
      });
    };
    
    // Handle device orientation for mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!backgroundRef.current || !useGyroscope) return;
      if (e.beta === null || e.gamma === null) return;
      
      // Convert orientation to normalized values (-0.5 to 0.5)
      const xPos = (e.gamma || 0) / 60; // -30 to 30 degrees
      const yPos = (e.beta || 0) / 180; // -90 to 90 degrees
      
      // Apply parallax effect with reduced intensity
      const elements = backgroundRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.2 * intensity); // Further reduced speed
        const htmlEl = el as HTMLElement;
        
        const xOffset = xPos * speed * 15; // Further reduced movement
        const yOffset = yPos * speed * 15; // Further reduced movement
        const scaleOffset = 1 + Math.abs(xPos * yPos) * 0.03; // Further reduced scale effect
        
        htmlEl.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scaleOffset})`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    if (useGyroscope) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    // Mouse enter/leave for background elements
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    if (backgroundRef.current) {
      backgroundRef.current.addEventListener('mouseenter', handleMouseEnter);
      backgroundRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (useGyroscope) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      
      if (backgroundRef.current) {
        backgroundRef.current.removeEventListener('mouseenter', handleMouseEnter);
        backgroundRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [intensity, useGyroscope, cursorGlow]);
  
  return (
    <>
      <div ref={backgroundRef} className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-background opacity-98" />
        
        {/* Enhanced background elements with better visibility */}
        <div className="parallax-element absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl top-1/3 left-1/4 
                      transition-transform duration-700 animate-float" />
        <div className="parallax-element absolute w-80 h-80 rounded-full bg-accent/5 blur-3xl bottom-1/4 right-1/3 
                      transition-transform duration-700 animate-float" style={{ animationDelay: '1s' }} />
        <div className="parallax-element absolute w-72 h-72 rounded-full bg-secondary/5 blur-3xl top-1/2 right-1/4 
                      transition-transform duration-700 animate-float" style={{ animationDelay: '2s' }} />
        <div className="parallax-element absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl bottom-1/3 left-1/3
                      transition-transform duration-700 animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Interactive elements with better visibility */}
        <div className="parallax-element absolute w-40 h-40 rounded-full bg-primary/5 blur-xl 
                      top-1/4 right-1/5 animate-pulse-slow transition-transform duration-700" />
        <div className="parallax-element absolute w-32 h-32 rounded-full bg-accent/5 blur-xl 
                      bottom-1/5 left-1/5 animate-pulse-slow transition-transform duration-700" 
             style={{ animationDelay: '1.5s' }} />
        
        {/* Increased opacity of the background gradient for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent opacity-98" />
        
        {/* Animated grid pattern with subtle visibility */}
        <div className="absolute inset-0 bg-grid-pattern opacity-3 animate-slide-slow pointer-events-none" />
      </div>
      
      {/* Restore normal cursor behavior */}
      <style>
        {`
          body {
            cursor: auto;
          }
          
          a, button, .interactive {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default ParallaxBackground;
