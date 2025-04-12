
import React, { useState, useEffect } from 'react';
import { useScrollAnimation, AnimationDirection } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

type AnimationType = 
  'fade-up' | 'fade-down' | 'fade-in' | 
  'slide-in' | 'scale-in' | 'slide-right' | 
  'slide-left' | 'bounce' | 'rotate' | 
  'flip' | 'blur-in' | 'split-reveal' | 
  'glitch' | 'elastic' | 'wipe';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  direction?: AnimationDirection;
  distance?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  startVisible?: boolean;
}

const AnimatedSection = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
  direction = 'up',
  distance = 50,
  staggerChildren = false,
  staggerDelay = 100,
  startVisible = false
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold, 
    once,
    animationDelay: delay 
  });
  
  const [shouldRender, setShouldRender] = useState(startVisible);

  useEffect(() => {
    if (isVisible || startVisible) {
      setShouldRender(true);
    }
  }, [isVisible, startVisible]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return `opacity-0 translate-y-[${distance}px]`;
      case 'fade-down':
        return `opacity-0 -translate-y-[${distance}px]`;
      case 'fade-in':
        return 'opacity-0';
      case 'slide-in':
        return `opacity-0 -translate-x-[${distance}px]`;
      case 'scale-in':
        return 'opacity-0 scale-95';
      case 'slide-right':
        return `opacity-0 -translate-x-[${distance}px]`;
      case 'slide-left':
        return `opacity-0 translate-x-[${distance}px]`;
      case 'bounce':
        return 'opacity-0 -translate-y-full';
      case 'rotate':
        return 'opacity-0 rotate-12';
      case 'flip':
        return 'opacity-0 rotateX-90';
      case 'blur-in':
        return 'opacity-0 blur-xl';
      case 'split-reveal':
        return 'opacity-0 scale-y-0';
      case 'glitch':
        return 'opacity-0 skew-x-12 scale-90';
      case 'elastic':
        return 'opacity-0 scale-50';
      case 'wipe':
        return 'opacity-0 clip-path-right';
      default:
        return 'opacity-0 translate-y-10';
    }
  };

  // Apply staggered animation to children
  const childrenWithStagger = staggerChildren
    ? React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              child.props.className,
              "transition-all",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            ),
            style: {
              ...child.props.style,
              transitionDelay: `${delay + (index * staggerDelay)}ms`,
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }
          });
        }
        return child;
      })
    : children;

  return (
    <div
      ref={ref}
      className={cn(
        className,
        shouldRender
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 blur-0 skew-x-0'
          : getAnimationClass(),
        'transition-all will-change-transform',
        duration && `duration-${duration}`
      )}
      style={{
        transitionDelay: staggerChildren ? '0ms' : `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {staggerChildren ? childrenWithStagger : children}
    </div>
  );
};

export default AnimatedSection;
