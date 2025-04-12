
import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  triggerOnce?: boolean;
  animationDelay?: number;
}

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    once = true,
    triggerOnce = false,
    animationDelay = 0
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If triggerOnce is true and element has already animated, don't change visibility
        if (triggerOnce && hasAnimated) return;
        
        if (entry.isIntersecting) {
          // Delay the animation if specified
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, animationDelay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
          
          if (once && ref.current) {
            // Once animated, no need to observe anymore
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          // If not using 'once', toggle visibility when out of view
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, once, triggerOnce, hasAnimated, animationDelay]);

  return { ref, isVisible, hasAnimated };
}
