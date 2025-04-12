import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

// Only show editor in development
const isDev = import.meta.env.DEV;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || mobileMenuOpen
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-background/20 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" className="font-bold text-xl text-primary">
              YM<span className="text-foreground">.</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {isDev && (
                <Link
                  to="/editor"
                  className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  <span>Edit Data</span>
                </Link>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Solid background for better visibility */}
        <div className="absolute inset-0 bg-background shadow-lg"></div>
        
        {/* Mobile menu container */}
        <div className="mobile-menu-container relative h-full flex flex-col z-10">
          {/* Close button */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <button 
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col items-stretch bg-background">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-6 py-4 text-lg font-medium border-b border-border hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {isDev && (
              <Link
                to="/editor"
                className="px-6 py-4 text-lg font-medium border-b border-border hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Edit Portfolio Data
              </Link>
            )}
          </div>
          
          {/* Footer section in mobile menu */}
          <div className="mt-auto p-6 text-center text-sm text-muted-foreground">
            <p>© 2025 Yash Mahadevwala</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;