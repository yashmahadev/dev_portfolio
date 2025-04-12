
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MicroInteractionsProps {
  children: React.ReactNode;
}

const MicroInteractions: React.FC<MicroInteractionsProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState('/');
  
  useEffect(() => {
    // Set isLoaded after a small delay for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Track page changes
    const handlePageChange = () => {
      setActivePage(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePageChange);
    
    // Add interactive classes to elements
    const addInteractiveClasses = () => {
      // Add hover effects to buttons
      document.querySelectorAll('button, a').forEach(el => {
        el.classList.add('interactive');
        
        el.addEventListener('mouseenter', (e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(-2px)';
          target.style.transition = 'transform 0.2s ease-out';
        });
        
        el.addEventListener('mouseleave', (e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(0)';
        });
        
        el.addEventListener('mousedown', (e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        el.addEventListener('mouseup', (e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(-2px) scale(1)';
        });
      });
      
      // Add tilt effect to cards - proper typing for MouseEvent
      document.querySelectorAll('.hover-card').forEach(el => {
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (centerY - y) / 20;
          const rotateY = (x - centerX) / 20;
          
          target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', (e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
      });
    };
    
    // Run after DOM is loaded
    if (document.readyState === 'complete') {
      addInteractiveClasses();
    } else {
      window.addEventListener('load', addInteractiveClasses);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePageChange);
      window.removeEventListener('load', addInteractiveClasses);
    };
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoaded ? children : (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360], 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MicroInteractions;
