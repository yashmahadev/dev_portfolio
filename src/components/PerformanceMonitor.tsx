
import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number | null;
  loadTime: number;
}

const PerformanceMonitor: React.FC<{ showMetrics?: boolean }> = ({ showMetrics = false }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: null,
    loadTime: 0
  });
  
  useEffect(() => {
    if (!showMetrics) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    let frameId: number;
    
    // Record page load time
    const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    
    const calculateFps = (now: number) => {
      frameCount++;
      
      // Update FPS every second
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(frameCount * 1000 / (now - lastTime)),
          // Try to get memory info if available
          memory: (performance as any).memory?.usedJSHeapSize ? 
                  Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024)) : null
        }));
        
        frameCount = 0;
        lastTime = now;
      }
      
      frameId = requestAnimationFrame(calculateFps);
    };
    
    // Start measuring FPS
    frameId = requestAnimationFrame(calculateFps);
    
    // Set initial load time
    setMetrics(prev => ({
      ...prev,
      loadTime: pageLoadTime
    }));
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [showMetrics]);
  
  // Optimize rendering by reducing repaints
  useEffect(() => {
    if (!showMetrics) return;
    
    // Implement resource hint preloading for common assets
    const links = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' }
    ];
    
    links.forEach(linkData => {
      const link = document.createElement('link');
      link.rel = linkData.rel;
      link.href = linkData.href;
      if (linkData.crossOrigin) {
        link.crossOrigin = linkData.crossOrigin;
      }
      document.head.appendChild(link);
    });
    
    // Lazy load images that are off-screen
    const lazyLoadImages = () => {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
          const imgEl = img as HTMLImageElement;
          imgEl.src = imgEl.dataset.src || '';
          imgEl.removeAttribute('data-src');
        });
      }
    };
    
    lazyLoadImages();
    
  }, [showMetrics]);
  
  if (!showMetrics) return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded text-xs font-mono text-muted-foreground z-50">
      <div>FPS: {metrics.fps}</div>
      {metrics.memory !== null && <div>Memory: {metrics.memory}MB</div>}
      <div>Load: {metrics.loadTime}ms</div>
    </div>
  );
};

export default PerformanceMonitor;
