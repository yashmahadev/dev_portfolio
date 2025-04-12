
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClass?: string;
  charClass?: string;
  highlightWords?: string[];
  lineHeight?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className, 
  wordClass,
  charClass,
  highlightWords = [],
  lineHeight = "leading-tight"
}) => {
  const words = children.split(' ');
  
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => {
        const isHighlighted = highlightWords.includes(word);
        
        return (
          <span 
            key={i} 
            className={cn(
              "inline-block mr-[0.25em] last:mr-0", 
              wordClass,
              isHighlighted && "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
            )}
          >
            {word.split('').map((char, j) => (
              <span 
                key={j} 
                className={cn(
                  "inline-block transition-all", 
                  charClass,
                  lineHeight
                )}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
};

interface TypographyFocusProps {
  className?: string;
}

const TypographyFocus: React.FC<TypographyFocusProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const elements = containerRef.current.querySelectorAll('.text-animate');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = (
          rect.top <= window.innerHeight * 0.8 && 
          rect.bottom >= window.innerHeight * 0.2
        );
        
        if (isInView) {
          el.classList.add('animate-in');
        } else {
          el.classList.remove('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div ref={containerRef} className={cn("typography-focus", className)}>
      <style>{`
        .text-animate .char {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          transition-delay: calc(var(--char-index) * 30ms);
        }
        
        .text-animate.animate-in .char {
          opacity: 1;
          transform: translateY(0);
        }
        
        .text-animate .word {
          overflow: hidden;
        }
        
        .gradient-text {
          background-image: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .text-shadow-md {
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
};

export { TypographyFocus, SplitText };
