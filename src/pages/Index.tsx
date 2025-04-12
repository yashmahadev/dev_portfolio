
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxBackground from '@/components/ParallaxBackground';
import ScrollProgress from '@/components/ScrollProgress';
import MicroInteractions from '@/components/MicroInteractions';
import { TypographyFocus } from '@/components/TypographyFocus';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set loaded after a short delay to allow for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Animation variants for initial page load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <MicroInteractions>
      <motion.div 
        className="min-h-screen relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Reduced intensity for better content visibility, and disabled cursor glow */}
        <ParallaxBackground intensity={0.3} useGyroscope={true} cursorGlow={false} />
        
        <TypographyFocus />
        <ScrollProgress />
        <PerformanceMonitor showMetrics={false} />
        
        <motion.div variants={childVariants}>
          <Navbar />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <HeroSection />
        </motion.div>
        
        <AnimatedSection 
          animation="fade-up" 
          duration={900} 
          threshold={0.1} 
          delay={200} 
          distance={50}
        >
          <AboutSection />
        </AnimatedSection>
        
        <AnimatedSection 
          animation="slide-right" 
          duration={1000} 
          threshold={0.15} 
          delay={300} 
          distance={100}
        >
          <SkillsSection />
        </AnimatedSection>
        
        <AnimatedSection 
          animation="fade-in" 
          duration={800} 
          threshold={0.1} 
          delay={200} 
          staggerChildren={true} 
          staggerDelay={150}
        >
          <ExperienceSection />
        </AnimatedSection>
        
        <AnimatedSection 
          animation="slide-left" 
          duration={1000} 
          threshold={0.15} 
          delay={300} 
          distance={100}
        >
          <ProjectsSection />
        </AnimatedSection>
        
        <AnimatedSection 
          animation="scale-in" 
          duration={900} 
          threshold={0.1} 
          delay={200}
        >
          <ContactSection />
        </AnimatedSection>
        
        <motion.div variants={childVariants}>
          <Footer />
        </motion.div>
      </motion.div>
    </MicroInteractions>
  );
};

export default Index;
