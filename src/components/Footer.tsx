
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-xl text-primary mb-2">
              Yash<span className="text-foreground">Mahadevwala</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Software Engineer specializing in frontend development
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors mb-4"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-primary" />
            </button>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Yash Mahadevwala. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
