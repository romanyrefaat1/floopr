
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Testimonials', href: '#testimonials' }
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-floopr-purple">
              Floopr
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-floopr-purple font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            
            <Button 
              asChild
              variant="outline" 
              className="border-floopr-purple text-floopr-purple hover:bg-floopr-purple/5 hover:text-floopr-purple-dark"
            >
              <a href="https://app.floopr.io/login">
                Log In
              </a>
            </Button>
            
            <Button
              asChild
              className="bg-floopr-purple hover:bg-floopr-purple-dark text-white"
            >
              <a href="#cta">
                Join Waitlist
              </a>
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - slide in from right */}
      <div className={`slide-in-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-bold text-floopr-purple">Floopr</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-6 flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-medium text-gray-800 hover:text-floopr-purple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto">
            <Button 
              asChild
              variant="outline" 
              className="w-full justify-center border-floopr-purple text-floopr-purple hover:bg-floopr-purple/5"
            >
              <a href="https://app.floopr.io/login">
                Log In
              </a>
            </Button>
            
            <Button
              asChild
              className="w-full justify-center bg-floopr-purple hover:bg-floopr-purple-dark text-white"
            >
              <a 
                href="#cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Waitlist
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
